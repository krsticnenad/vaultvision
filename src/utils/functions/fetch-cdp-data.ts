import vaultContract from "../contracts/vault-contract";
import { bytesToString } from '@defisaver/tokens/esm/utils';
import { ERROR_MESSAGES } from "../../constants/error-messages";
import { CdpData, SearchResult } from "../../interfaces/cdp-data";
import { getCollateralInfoProp } from "./get-collateral-info";
import { calculateDebtWithRate } from "./calculate-debt-with-rate";

/**
 *
 * Fetches the CDP (Collateralized Debt Position) data for a specific CDP ID.
 *
 * This function retrieves the details of a CDP by calling the `getCdpInfo` method
 * on a smart contract.
 *
 * @param {number} cdpId - The unique identifier of the CDP to fetch.
 * @returns {Promise<CdpData>} - A promise that resolves to the CDP data
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export async function fetchCdpById(
  cdpId: number
): Promise<CdpData> {

    if ( !vaultContract ) throw new Error(ERROR_MESSAGES.CONTRACTS.CONTRACT_NOT_AVAILABLE);

    try {
        let cdpData: CdpData = await vaultContract.methods.getCdpInfo(cdpId).call();
        const rate = await getCollateralInfoProp(cdpData.ilk, 'rate');
        cdpData.debt = calculateDebtWithRate(cdpData.debt, rate);
        return cdpData;
    } catch (error: any) {
        console.error(ERROR_MESSAGES.CONTRACTS.FETCH_FAILED, error.message || error);
        throw new Error(ERROR_MESSAGES.CONTRACTS.FETCH_FAILED);
    }
}

/**
 *
 * Fetches CDP data matching the specified `collateralType` around a base `cdpId`.
 *
 * Uses @see fetchCdpById to retrieve CDP data, incrementing or decrementing the `cdpId` in each iteration
 * to find up to `count` CDPs of the given `collateralType`.
 *
 * @param {number} cdpId - Base ID for the CDP search.
 * @param {string} collateralType - Collateral type to match
 * @param {number} [count=20] - Number of CDPs to fetch.
 * @param {number} [requestLimit=5] - Maximum requests per iteration.
 * @returns {Promise<SearchResult>} - Resolves to an array of matching CDP data.
 * @throws {Error} - Throws an error if fetching fails.
 *
 */
export async function fetchCdpData(
    cdpId: number,
    collateralType: string,
    updateProgress?: (progress: number) => void,
    count: number = 20,
    requestLimit: number = 5,
  ): Promise<SearchResult> {

    let result: SearchResult = { data: [], notFound: false };
    let step: number = 1;
    let attemtps: number = 0;

    if ( updateProgress ) updateProgress(0);

    // try {

    //   const requestedId = await fetchCdpById(cdpId).then((resp) => ({
    //       ...resp,
    //       id: cdpId,
    //     }));
    //     if (bytesToString(requestedId.ilk) === collateralType) {
    //       result.data.push(requestedId);
    //       if (updateProgress) updateProgress((result.data.length / count) * 100);
    //     }
    //   } catch (error: any) {
    //     return { data: [], notFound: true };
    //   }
    
      while ( result.data.length < count ) {

          if ( attemtps >= 20 && result.data.length < 1 ) {
            result = { data: [], notFound: true };
            break;
          }

          try {

            const requests: Promise<CdpData>[] = [];

            if ( result.data.length < count ) {
              requests.push(fetchCdpById(cdpId + step)
                      .then(resp => ({...resp, id: cdpId + step})));
            }

            if ( result.data.length < count ) {
              requests.push(fetchCdpById(cdpId + step + 1)
                      .then(resp => ({...resp, id: cdpId + step + 1})));
            }

            if ( result.data.length < count && cdpId - step >= 0 ) {
              requests.push(fetchCdpById(cdpId - step)
                      .then(resp => ({...resp, id: cdpId - step})));
            }

            if ( result.data.length < count && cdpId - step - 1 >= 0 ) {
              requests.push(fetchCdpById(cdpId - step - 1)
                      .then(resp => ({...resp, id: cdpId - step - 1})));
            }

            const fetchedData: CdpData[] = await Promise.all(requests.slice(0, requestLimit));

            for ( const data of fetchedData ) {
              if ( bytesToString(data.ilk) === collateralType ) {
                result.data.push(data);
                if ( updateProgress ) updateProgress((result.data.length / count) * 100);
                if ( result.data.length >= count ) break;
              }
            }

            step += 2;
            attemtps++;

        } catch ( error: any ) {
            throw new Error(ERROR_MESSAGES.CONTRACTS.FETCH_FAILED);
        }
      }
    return result;
}

