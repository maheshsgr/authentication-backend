const { getLowestRatio } = require('./SkidoMathUtil');

function variantCalculator(ratioNumber1, userTobeAssigned) {
  //   console.log(
  //     'SkidoVariantUtil | variantCalculator :: ratioNumber1, userTobeAssigned',
  //     ratioNumber1,
  //     userTobeAssigned
  //   );
  if (userTobeAssigned <= ratioNumber1) {
    return 1;
  }

  return 2;
}
function getVariantForNextUser(
  ratioNumber1,
  ratioNumber2,
  varaintBAssignedCount,
  totalUserLengthAlreadyAssigned,
  targetSampleSetSize
) {
  const nextVariant = calculateVariantForNextUser(
    ratioNumber1,
    ratioNumber2,
    varaintBAssignedCount,
    totalUserLengthAlreadyAssigned,
    targetSampleSetSize
  );
  if (nextVariant === 1) {
    return 'variantA';
  } else {
    return 'variantB';
  }
}
function calculateVariantForNextUser(
  ratioNumber1,
  ratioNumber2,
  varaintBAssignedCount,
  totalUserLengthAlreadyAssigned,
  targetSampleSetSize
) {
  // console.log('SkidoVariantUtil', {
  //   ratioNumber1,
  //   ratioNumber2,
  //   varaintBAssignedCount,
  //   totalUserLengthAlreadyAssigned,
  //   targetSampleSetSize,
  // });
  if (targetSampleSetSize <= varaintBAssignedCount) {
    return 1;
  }
  const [minRatio1, inRatio2] = getLowestRatio(ratioNumber1, ratioNumber2);
  var ratioSum = minRatio1 + inRatio2;
  var targetUserNumber = totalUserLengthAlreadyAssigned + 1;

  // for initail users
  if (targetUserNumber <= ratioSum) {
    return variantCalculator(minRatio1, targetUserNumber);
  }

  //when users grow
  var currentModeNumber = ((targetUserNumber - 1) % ratioSum) + 1;

  return variantCalculator(minRatio1, currentModeNumber);
}
var targetSampleSet = 50;
for (var i = 0; i < 100; i++) {
  var nextVariant = getVariantForNextUser(80, 20, i, i, targetSampleSet);
  console.log(
    'SkidoVariantUtil | nextVariant ::',
    i,
    'variant ->',
    nextVariant
  );
}

module.exports = { getVariantForNextUser };
