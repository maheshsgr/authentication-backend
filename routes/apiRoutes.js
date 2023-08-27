const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/jwt');
const {
  createExperiment,
  getExperimentVariant,
} = require('../controllers/abexperiment');
router.get('/', (req, res) => {
  res.status(201).json({
    message: 'Welcome to the SKIDO API.',
  });
});

// user routes
router.post('/login', require('../controllers/user/Login'));
router.post('/register', require('../controllers/user/Register'));
router.get('/user', auth.checkToken, require('../controllers/user/User'));
router.get(
  '/user/:id',
  auth.checkToken,
  require('../controllers/user/UserDetails')
);

//experiment routes
router.post('/createExperiment', createExperiment);
router.post('/getExperimentVariant', getExperimentVariant);
module.exports = router;
