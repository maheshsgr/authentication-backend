const User = require('../../models/user');

module.exports = async (req, res) => {
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
};
