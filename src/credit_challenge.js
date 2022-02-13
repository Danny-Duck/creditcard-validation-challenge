/** 
 * @description A helper function that takes a number and returns it split into an array of 
 * individual digits
 * @param number A number to be split into individual digits 
 * @example getArrayFromNumber(123897) => [1, 2, 3, 8, 9, 7]
*/
const getArrayFromNumber = (number) => String(number).split("").map((idx) => Number(idx))

/** 
 * @description A helper function that takes a number and returns the sum of it's digits
 * @param number A number to have it's individual digits summed 
 * @example 
 * let number = 125
 * // 1 + 2 + 5
 * getDigitSum(number) => 8
*/
const getDigitSum = (number) =>
    getArrayFromNumber(number).reduce((prev, curr) => prev + curr)

/** @description A helper function to get a credit card numbers checksum.
 *  To get a checksum, we have to implement Luhn's algorithm
*/
export const getChecksum = (creditCardNumber) =>
    getArrayFromNumber(creditCardNumber)
        .reverse()
        .reduce((previous, current, index) => {
            if (index % 2 == 0) {
                return previous + current
            } else {
                return previous + getDigitSum(current * 2)
            }
        })

const isValidChecksum = (checksum) => checksum % 10 == 0

/** 
 * @description Validates AMEX, VISA, MASTERCARD credit card numbers using Luhn's Algorithm
 * @param number A number to be validated
 * @returns "INVALID" | "AMEX" | "VISA" | "MASTERCARD"
 * @example 
 * let potentiallyMastercardNumber = 5105105105105100
 * validateCreditCardNumber(potentiallyMastercardNumber) => "MASTERCARD" 
 * let potentiallyVisaNumber = 4111111111111113
 * validateCreditCardNumber(potentiallyVisaNumber) => "INVALID" 
*/
export const validateCreditCardNumber = (number) => {
    const cc_numberArray = getArrayFromNumber(number)
    const checksum = getChecksum(number)

    if (!isValidChecksum(checksum)) return "INVALID"

    switch (cc_numberArray[0]) {
        case 3:
            // AMEX cards must begin with 34 or 37 and be of length 15
            if (cc_numberArray.length == 15 && cc_numberArray[1] == 7 || cc_numberArray[1] == 4)
                return "AMEX"
        case 4:
            // VISA cards must begin with 4 and be of length 13 or 16
            if (cc_numberArray.length == 13 || cc_numberArray.length == 16)
                return "VISA"
        case 5:
            // MASTERCARD cards must begin with 51, 52, 53, 54 or 55 and be of length 16
            if (cc_numberArray[1] >= 1 && cc_numberArray[1] <= 5 && cc_numberArray.length == 16)
                return "MASTERCARD"
        default:
            return "INVALID"
    }
}

module.exports = { getChecksum, validateCreditCardNumber };