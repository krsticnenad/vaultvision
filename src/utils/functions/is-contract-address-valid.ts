/**
 * Checks if a given string is a valid Ethereum contract address.
 *
 * @param {string} contractAddress - The address to validate.
 * @returns {boolean} - `true` if the address is valid, otherwise `false`.
 *
 */
export function isContractAddressValid(contractAddress: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(contractAddress);
}

export type ContractAddress = `0x${string}`

