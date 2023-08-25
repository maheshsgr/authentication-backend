const User = require('../../models/User');

module.exports = async (req, res) => {
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

    const token = user.generateToken();

    res.status(201).json({
      message: 'User created.',
      user: {
        email: newUser.email,
        _id: newUser._id,
      },
      token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'An error has occured.',
    });
  }
};
