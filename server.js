require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./database');
const auth = require('./routes/auth');
const adminMiddleware = require('./authmiddleware/adminMiddleware');
const authMiddleware = require('./authmiddleware/authMiddleware');
const User = require('./models/authUser');
const AuthLimit = require('./ratelimit');
const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use('/auth', AuthLimit, auth);
app.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the dashboard', userid: req.user.id, role: req.user.role });
});
``
app.delete("/delete/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
      const userid = req.params.id;

      const user = await User.findById(userid);
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      await User.findByIdAndDelete(userid);
      res.json({ message: "User deleted successfully" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
})
