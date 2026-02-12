const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/authUser');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'user already exist' });
    }
    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'user registered succes', user });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ error: 'internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({ error: 'invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({ message: 'user logged in succesfullt', token });
  } catch (err) {
    console.error('Login ERROR:', err);
    res.status(500).json({ error: 'internal server error' });
  }
});

module.exports = router;
