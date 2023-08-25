const User = require('../../models/user');

module.exports = async (req, res) => {
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
};
