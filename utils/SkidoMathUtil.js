function GCDTwoNumbers(number1, number2) {
  var a, b, temp;
  var isDivisible = false;
  if (number1 > number2) {
    a = number1;
    b = number2;
  } else {
    a = number2;
    b = number1;
  }

  while (b != 0) {
    //50!=0 condition true
    temp = b; // temp=50 then b=20
    b = a % b; // b=50%30 b=20 again b= 30%20 b=10
    a = temp; //a=10
  }
  console.log('GFC', a);
  return a;
}
function getLowestRatio(number1, number2) {
  var GCD = GCDTwoNumbers(number1, number2);
  return [number1 / GCD, number2 / GCD];
}
console.log('SkidoMathUtil | lowestRation ::', lowestRatio);
module.exports = { getLowestRatio };
