import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {z} from "zod";

/**
 * Recursive function to calcolate the factorial of a number n.
 * @param n The number to calcolate the factorial.
 * @returns  The factorial of n.
 * @throws TRPCError if n is less than 1.
 */
const factorial = (n: number): number => {
    if (n == 1)
        return 1;
    if (n == 0)
        return 1;
    return n * factorial(n - 1);
}

/**
 * Function to calcolate the binomial coefficient C(n, k) = n! / (k! * (n - k)!).
 * @param n Number of items.
 * @param k Number of items to choose.
 * @returns The binomial coefficient C(n, k).
 * @throws TRPCError if n is less than 0, k is less than 0 or k is greater than n.
 */
const coefficient = (n: number, k: number): number => {
    if (k < 0 || n < 0 || k > n) 
        throw new TRPCError({code: 'BAD_REQUEST', message: 'Invalid input: n must be >= 0, k must be >= 0 and k must be <= n.'});
    
    return factorial(n) / (factorial(k) * factorial(n - k));
}

/**
 * Function to calcolate all the binomial coefficients C(n, k) for k = 0, 1, ..., n.
 * @param exp The exponent of the binomial expansion.
 * @returns An array of binomial coefficients C(n, k) for k = 0, 1, ..., n.
*/
export const asyncCalculateAllCoefficients = async (exp: number): Promise<number[]> => {
    const coefficients: number[] = [];
    for (let k = 0; k <= exp; k++) {
        coefficients.push(coefficient(exp, k));
    }
    return coefficients;
}

/**
 * Function to generate the binomial expansion string for (x + y)^n.
 * @param n The exponent of the binomial expansion.
 * @returns The binomial expansion string for (x + y)^n.
 * @throws TRPCError if n is less than 0.
 */
export const generateBinomialString =  (n: number): string => {
    if(n < 0)
        throw new TRPCError({code: 'BAD_REQUEST', message: "L'esponente deve essere un numero intero non negativo."});
    const terms: string[] = [];
    for (let k = 0; k <= n; k++) {
        const coef =  coefficient(n, k);
        const pX = n - k;
        const pY = k;

        const sCoef = coef === 1 && n !== 0 ? "" : coef;
        const sX = pX === 0 ? "" : pX === 1 ? "x" : `x^${pX}`;
        const sY = pY === 0 ? "" : pY === 1 ? "y" : `y^${pY}`;
        
        terms.push(`${sCoef}${sX}${sY}`);
    }
    return terms.join(' + ');
}



export const newtonBinomialRouter = createTRPCRouter({
    calculate: publicProcedure
        .input(z.object({
            exponent: z.number().int().nonnegative(),
        }))
        .mutation(async ({input}) => {
            try{
                const {exponent} = input;
                return generateBinomialString(exponent);
            } catch (error) {
                throw new TRPCError({code: 'INTERNAL_SERVER_ERROR', message: 'Failed to calculate binomial coefficients.', cause: error});
            }
        }),
});