var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  created_at: { type: Date },
});

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      email: this.email,
      userId: this._id,
    },
    process.env.SECRET,
    {
      expiresIn: '12h',
    }
  );

  return token;
};

module.exports = mongoose.model('User', userSchema);
