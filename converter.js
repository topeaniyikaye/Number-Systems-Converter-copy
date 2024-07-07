// Converts a decimal number to binary representation
function decimalToBinary(decimal) {
    return (decimal >>> 0).toString(2);
}

// Converts a decimal number to hexadecimal representation
function decimalToHexadecimal(decimal) {
    return decimal.toString(16).toUpperCase();
}

// Converts a decimal number to octal representation
function decimalToOctal(decimal) {
    return decimal.toString(8);
}

// Converts a binary number (as a string) to decimal representation
function binaryToDecimal(binary) {
    return parseInt(binary, 2);
}

// Converts a hexadecimal number (as a string) to decimal representation
function hexadecimalToDecimal(hexadecimal) {
    return parseInt(hexadecimal, 16);
}

// Converts an octal number (as a string) to decimal representation
function octalToDecimal(octal) {
    return parseInt(octal, 8);
}

// Exporting the conversion functions for use in other modules
module.exports = {
    decimalToBinary,
    decimalToHexadecimal,
    decimalToOctal,
    binaryToDecimal,
    hexadecimalToDecimal,
    octalToDecimal,
};

