import { VAULT_DETAILS } from "../../constants/vault-details";
import { CollateralType } from "./calculate-max-debt-without-liquidation";

/**
 * Calculates the maximum amount of collateral that can be withdrawn from a vault 
 * without causing liquidation, based on the current debt and collateral type.
 *
 * @param {CollateralType} collateralType - The type of collateral
 * @param {number} collateralAmount - The current amount of collateral in the vault.
 * @param {string} debt - The current debt in the vault, expressed as a string.
 * @returns {string} - The maximum withdrawable collateral amount
 *
 */
export const calculateMaxWithdrawCollateral = (collateralType: CollateralType, collateralAmount: number, debt: string) => {
    const { price, liquidationRatio } = VAULT_DETAILS[collateralType];
    if(price && liquidationRatio) {
        return (collateralAmount - (Number(debt) * (liquidationRatio / 100)) / price).toFixed(2);
    }
    
}