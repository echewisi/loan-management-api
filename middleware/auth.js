const { verifyToken } = require('../config/auth');
const { readStaffsData } = require('../config/database');

const authenticate = (req, res, next) => {
  try {
    // Get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid token or token has expired'
      });
    }

    // Check if user still exists
    const users = readStaffsData();
    const currentUser = users.find(user => user.id === decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists'
      });
    }

    // Grant access to protected route
    req.user = {
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role
    };
    
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Authentication failed'
    });
  }
};

module.exports = authenticate;