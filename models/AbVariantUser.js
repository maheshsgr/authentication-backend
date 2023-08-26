var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AbVariantUserSchema = new Schema({
  experiment_id: { type: String, required: true },
  users: [
    {
      user_id: { type: String, required: true },
      variant: { type: String, required: true },
    },
  ],
  created_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
  winner_variant: { type: String },
  purged_at: { type: Date },
});

module.exports = mongoose.model('AbVariant', AbVariantUserSchema);
