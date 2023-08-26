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
  experimentVariantAssignedUsersCount,
  totalUserLengthAlreadyAssigned,
  targetSampleSetSize
) {
  if (targetSampleSetSize <= experimentVariantAssignedUsersCount) {
    return 1;
  }
  var ratioSum = ratioNumber1 + ratioNumber2;
  var targetUserNumber = totalUserLengthAlreadyAssigned + 1;

  // for initail users
  if (targetUserNumber <= ratioSum) {
    return variantCalculator(ratioNumber1, targetUserNumber);
  }

  //when users grow
  var currentModeNumber = ((targetUserNumber - 1) % ratioSum) + 1;

  return variantCalculator(ratioNumber1, currentModeNumber);
}
var targetSampleSet = 50;
for (var i = 0; i < 100; i++) {
  var nextVariant = getVariantForNextUser(1, 4, i, i, 50);
  console.log(
    'SkidoVariantUtil | nextVariant ::',
    i,
    'variant ->',
    nextVariant
  );
}
