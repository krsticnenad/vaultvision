import { VAULT_DETAILS } from "../../constants/vault-details";

export type CollateralType = "ETH-A" | "USDC-A" | "WBTC-A";

/**
 * Calculates the maximum amount of collateral that can be withdrawn from a vault 
 * without triggering liquidation, based on the collateral type and amount.
 * 
 * @param {CollateralType} collateralType - The type of collateral
 * @param {number} collateralAmount - The current amount of collateral available in the vault.
 * @returns {string} - The maximum withdrawable amount of collateral
 *
 */
export const calculateMaxWithdrawLiquidation = (collateralType: CollateralType, collateralAmount: number) => {
    const { price, liquidationRatio } = VAULT_DETAILS[collateralType];
    if ( price && liquidationRatio ) {
        return ((collateralAmount * price) / (liquidationRatio / 100)).toFixed(2);
    }
}