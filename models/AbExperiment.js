var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AbExperimentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  variants: [{ type: String, required: true }],
  distribution: {
    variantA: { type: Number, required: true },
    variantB: { type: Number, required: true },
  },
  target_sample_size: { type: Number, required: true },
  created_at: { type: Date },
});

module.exports = mongoose.model('AbExperiment', AbExperimentSchema);
