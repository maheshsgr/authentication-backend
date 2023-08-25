var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var abExperimentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  variants: [{ type: String, required: true }],
  distribution: { type: Object, required: true },
  target_sample_size: { type: Number, required: true },
  created_at: { type: Date },
});

module.exports = mongoose.model('AbExperiment', abExperimentSchema);
