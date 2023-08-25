const AbExperiment = require('../../models/AbExperiment');

module.exports = async (req, res) => {
  console.log('AbExperiment | req.body ::', req.body);
  const { name, variants, distribution, targetSampleSize } = req.body;

  if (!name || !variants || !distribution || !targetSampleSize) {
    return res.status(400).json({
      message: 'Invalid request',
    });
  }

  try {
    const newExperiment = new AbExperiment();
    newExperiment.name = name;
    newExperiment.variants = variants;
    newExperiment.distribution = distribution;
    newExperiment.target_sample_size = targetSampleSize;
    await newExperiment.save();
    return res.status(200).json({
      message: 'Experiment create successfully',
      _id: newExperiment._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};
