const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Home api route');
  res.status(201).json({
    message: 'Welcome to the API Home.',
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Invalid request for login',
    });
  }
  res.status(201).json({
    message: 'Welcome to Login Route',
  });
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Invalid request for register',
    });
  }
  res.status(201).json({
    message: 'Welcome to the Register Route.',
  });
});

module.exports = router;
