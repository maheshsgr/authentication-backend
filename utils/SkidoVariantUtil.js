const { simplifyRatio } = require('./SkidoMathUtil');

const VARIANT_A = 'variantA';
const VARIANT_B = 'variantB';

function variantCalculator(ratioNumber1, userTobeAssigned) {
  if (userTobeAssigned <= ratioNumber1) {
    return VARIANT_A;
  }

  return VARIANT_B;
}

function getVariantForNextUser(
  ratioNumber1,
  ratioNumber2,
  varaintBAssignedCount,
  totalUserLengthAlreadyAssigned,
  targetSampleSetSize
) {
  if (targetSampleSetSize <= varaintBAssignedCount) {
    return VARIANT_A;
  }
  const [minRatio1, minRatio2] = simplifyRatio(ratioNumber1, ratioNumber2);
  console.log('SkidoVariantUtil | minRatio1 ::', minRatio1, minRatio2);
  var ratioSum = minRatio1 + minRatio2;
  var targetUserNumber = totalUserLengthAlreadyAssigned + 1;

  // for initail users
  if (targetUserNumber <= ratioSum) {
    return variantCalculator(minRatio1, targetUserNumber);
  }

  //when users grow
  var currentModeNumber = ((targetUserNumber - 1) % ratioSum) + 1;

  return variantCalculator(minRatio1, currentModeNumber);
}

module.exports = { getVariantForNextUser };
