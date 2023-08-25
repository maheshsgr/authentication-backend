const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/jwt');

router.get('/', (req, res) => {
  res.status(201).json({
    message: 'Welcome to the API.',
  });
});

// user routes
router.post('/login', require('./user/Login'));
router.post('/register', require('./user/Register'));
router.get('/user', auth.checkToken, require('./user/User'));
router.get('/user/:id', auth.checkToken, require('./user/UserDetails'));

//experiment routes
router.post('/createExperiment', require('./abexperiment/AbExperiment'));
module.exports = router;
