import { ERROR_MESSAGES } from "../../constants/error-messages";
import { VatData } from "../../interfaces/vat-data";
import vatContract from "../contracts/vat-contract";

/**
 * Retrieves informations about the specified collateral type from the contract
 * using `ilks` method.
 *
 * @param {string} collateral - The identifier of the collateral type.
 * @returns {Promise<VatData>} - A promise that resovles to an `VatData` object.
 * @throws {Error} - If the fetching data fails.
 */
export async function getCollateralInfo(collateral: string): Promise<VatData> {

    if ( !vatContract ) throw new Error(ERROR_MESSAGES.CONTRACTS.CONTRACT_NOT_AVAILABLE);
    
    try {
        let vat: any = await vatContract.methods.ilks(collateral).call();
        return vat;
    } catch (error: any) {
        console.error(ERROR_MESSAGES.CONTRACTS.FETCH_FAILED, error.message || error);
        throw new Error(ERROR_MESSAGES.CONTRACTS.FETCH_FAILED);
    }
}

/**
 *
 * Retrieves a specific property of the specified collateral type from the `vatContract`
 * using @see getCollateralInfo
 *
 * @param {strin} collateral - The identifier of the collateral type.
 * @param {keyof VatData} prop - Collateral data property to retrieve.
 * @returns {any} - A promise that resolves to the value of the specified property.
 * @throws {Error} - If the fetching data fails.
 * 
*/
export async function getCollateralInfoProp(collateral: string, prop: keyof VatData ): Promise<any> {
    const data: VatData = await getCollateralInfo(collateral);
    return data[prop];
}