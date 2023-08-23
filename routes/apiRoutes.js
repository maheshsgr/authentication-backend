const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/jwt');

router.get('/', (req, res) => {
  res.status(201).json({
    message: 'Welcome to the API.',
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Invalid request',
    });
  }

  try {
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) {
      return res.status(400).json({
        message: 'user with the email does not exist',
      });
    }

    if (!user.validPassword(password)) {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }

    if (user) {
      console.log('logged in');
      const token = user.generateToken();

      return res.status(200).json({
        message: 'Auth successful',
        token: token,
        _id: user._id,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Invalid request',
    });
  }

  try {
    const user = new User();

    const existingUser = await User.findOne({ email: email }).select(
      '+password'
    );

    if (existingUser) {
      return res.status(400).json({
        message: 'User with the email alreay exist',
      });
    }

    user.email = email;
    user.password = user.encryptPassword(password);
    user.created_at = Date.now();

    const newUser = await user.save();

    console.log('newUser', newUser);

    res.status(201).json({
      message: 'User created.',
      user: {
        email: user.email,
        _id: user._id,
      },
      token: 'asd',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'An error has occured.',
    });
  }
});

router.get('/user', auth.checkToken, async (req, res) => {
  try {
    const user = await User.find({});

    if (!user || !user.length) {
      return res.status(400).json({
        message: 'User does not exist.',
      });
    }

    res.status(200).json({
      message: 'user found',
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.get('/user/:id', auth.checkToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        message: 'User does not exist.',
      });
    }

    res.status(200).json({
      message: 'user found',
      uid: user._id,
      email: user.email,
      joined: user.created_At,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
