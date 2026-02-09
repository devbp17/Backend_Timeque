const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Terlalu banyak percobaan login, coba lagi nanti"
  }
});

module.exports = authLimiter;
