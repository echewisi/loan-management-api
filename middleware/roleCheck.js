// Middleware to restrict access based on user roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // Check if the user's role is included in the required roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: 'fail',
          message: 'You do not have permission to perform this action'
        });
      }
      next();
    };
  };