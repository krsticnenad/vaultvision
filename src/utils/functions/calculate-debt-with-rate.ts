/**
 * Calculate the debt based on the provided debt amount and rate
 *
 * @param {string | bigint} debt - The initial amount of the debt
 * @param {bigint} rate - The rate used for calculating the debt
 * @returns {bigint} - The calculated debt
 *
 */
export const calculateDebtWithRate = (debt: string | bigint, rate: bigint): bigint => {
    return BigInt(Number(debt) * Number(rate) / 1e27);
}