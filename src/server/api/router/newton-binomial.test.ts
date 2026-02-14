import { expect, test, describe } from 'vitest'
import { generateBinomialString } from './newton-binomial'

/**
 * Testing to verify the correct functioning of the function that generates the binomial expansion string.
 * The tests include:
 * - Testing the expansion of (a+b)^2, which should return "x^2 + 2xy + y^2".
 * - Testing the expansion of (a+b)^0, which should return "1".
 * - Testing the function with a negative exponent, which should throw an error.
 */
describe('Newton\'s Binomial Testing', () => {

  test('Try (a+b)^2',  () => {
    const result =   generateBinomialString(2)
    expect(result).toBe("x^2 + 2xy + y^2")
  })

  test('Try (a+b)^0',  () => {
    const result =   generateBinomialString(0)
    expect(result).toBe("1")
  });

  test('Try (a+b)^-2',  () => {
    expect(() => generateBinomialString(-2)).toThrow("L'esponente deve essere un numero intero non negativo.");
  });
})