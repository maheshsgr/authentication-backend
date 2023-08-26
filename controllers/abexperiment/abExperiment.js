const AbExperiment = require('../../models/AbExperiment');
const AbVariantUser = require('../../models/AbVariantUser');
const { use } = require('../../routes/apiRoutes');
const { getVariantForNextUser } = require('../../utils/SkidoVariantUtil');
const createExperiment = async (req, res) => {
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
    console.log('distribution', distribution);
    // const distributionObject = JSON.parse(distribution);
    // console.log('distributionObject ::', distributionObject);
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
      error: err.message,
    });
  }
};

const getExperimentVariant = async (req, res) => {
  try {
    const { experimentId, userId } = req.body;

    const experiment = await AbExperiment.findById(experimentId);

    let abVariantUser = await AbVariantUser.findOne({
      experiment_id: experimentId,
    });

    if (!abVariantUser) {
      abVariantUser = new AbVariantUser({ experiment_id: experimentId });
      await abVariantUser.save();
    }

    let userVariant = 'variantA';

    const userAlreadyAssigned = abVariantUser.users.find(
      (user) => user.user_id === userId
    );

    if (!userAlreadyAssigned) {
      const usersAssignedVariantBCount = await AbVariantUser.countDocuments({
        'users.variant': 'variantB',
        experiment_id: experimentId,
      });

      const { variantA, variantB } = experiment.distribution;

      userVariant = getVariantForNextUser(
        variantA,
        variantB,
        usersAssignedVariantBCount,
        abVariantUser.users.length,
        experiment.target_sample_size
      );

      abVariantUser.users.push({ user_id: userId, variant: userVariant });

      await abVariantUser.save();
    } else {
      userVariant = userAlreadyAssigned.variant;
    }

    return res.status(200).json({
      message: 'Variant assigned successfully',
      userVariant,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { createExperiment, getExperimentVariant };
