import { getChecksum, validateCreditCardNumber } from "./credit_challenge"

const creditCardTestCases = [
    { number: "378282246310005", expected: "AMEX" },
    { number: "371449635398431", expected: "AMEX" },
    { number: "5555555555554444", expected: "MASTERCARD" },
    { number: "5105105105105100", expected: "MASTERCARD" },
    { number: "4111111111111111", expected: "VISA" },
    { number: "4012888888881881", expected: "VISA" },
    { number: "4222222222222", expected: "VISA" },
    { number: "1234567890", expected: "INVALID" },
    { number: "369421438430814", expected: "INVALID" },
    { number: "4062901840", expected: "INVALID" },
    { number: "5673598276138003", expected: "INVALID" },
    { number: "4111111111111113", expected: "INVALID" },
    { number: "4222222222223", expected: "INVALID" }
]

describe("checksum validation", () => {
    it("should return the correct checksum", () => {
        expect(getChecksum(4003600000000014)).toEqual(20)
    })
})

describe("credit card validation", () => {
    test.each(creditCardTestCases)('identifies $number as $expected', ({ number, expected }) => {
        expect(validateCreditCardNumber(number)).toBe(expected);
    });
})