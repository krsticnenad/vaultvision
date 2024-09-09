import web3 from "../web3";

/**
 * Converts an amount from `Wei` to `Ether`.
 *
 * @param {bigint | string} wei - Amount in Wei to be converted.
 * @param {number} [decimals] - Number of decimal places to round
 * @returns {string} - The equivalent amount in Ether, rounded to the nearest integer.
 *
 */
export const convertWeiToEther = (wei: bigint | string, decimals: number = 2): string => {
    return parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(decimals);
}