const User = require('../../models/User');

module.exports = async (req, res) => {
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
};
