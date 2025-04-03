const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

module.exports = {
  jwtSecret,
  jwtExpiresIn,
  
  generateToken: (userId, role) => {
    return jwt.sign(
      { id: userId, role },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );
  },
  
  verifyToken: (token) => {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (error) {
      return null;
    }
  }
};