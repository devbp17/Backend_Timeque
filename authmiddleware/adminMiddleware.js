const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      res.status(403).json({
        message: 'You are not authorized to access this resource'
      })
    }
    next();
  }catch(err){
    res.status(400).json({
      message: 'Invalid token'
    });
  }
}
