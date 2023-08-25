var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var abVariantSchema = new Schema({
  name: { type: String, required: true, unique: true },
  experiment_id: [{ type: String, required: true }],
  users: [{ type: String, required: true }],
  created_at: { type: Date },
});

module.exports = mongoose.model('AbVariant', abVariantSchema);
