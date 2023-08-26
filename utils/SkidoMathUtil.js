// Function to calculate the greatest common divisor (GCD) of two numbers
function calculateGCD(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Function to simplify a ratio and return the lowest form
function simplifyRatio(numerator, denominator) {
  const gcd = calculateGCD(numerator, denominator);
  const simplifiedNumerator = numerator / gcd;
  const simplifiedDenominator = denominator / gcd;
  return [simplifiedNumerator, simplifiedDenominator];
}

module.exports = {
  calculateGCD,
  simplifyRatio,
};
