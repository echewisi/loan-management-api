const bcrypt = require('bcryptjs');
const { readStaffsData } = require('../config/database');
const { generateToken } = require('../config/auth');

// Login controller
exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    // Check if user exists && password is correct
    const users = readStaffsData();
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // In a real-world app, we would use bcrypt.compare(password, user.password) 
    // For simplicity, we're doing a direct comparison here
    const isPasswordCorrect = password === user.password;

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // If everything is ok, send token to client
    const token = generateToken(user.id, user.role);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Logout controller
exports.logout = (req, res) => {
  // In a token-based authentication system like JWT,
  // the server doesn't actually maintain session state.
  // Logging out is typically handled on the client-side by removing the token.
  // However, we can indicate to the client that they should clear the token sha...
  
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
};