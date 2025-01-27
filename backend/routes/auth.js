const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { firstName, lastName, gender, hobbies, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ firstName, lastName, gender, hobbies, email, password: hashedPassword, role });
  await user.save();
  res.status(201).json({ message: 'User created' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
