import { Contract } from "web3";
import { isContractAddressValid } from "../functions/is-contract-address-valid";
import web3 from "../web3";
import { VAULT_CONTRACT_CONFIG } from "../../config";

let vaultContract: Contract<typeof VAULT_CONTRACT_CONFIG.ABI> | null = null;

if (isContractAddressValid(VAULT_CONTRACT_CONFIG.ADDRESS)) {
    vaultContract = new web3.eth.Contract(VAULT_CONTRACT_CONFIG.ABI, VAULT_CONTRACT_CONFIG.ADDRESS);
}

export default vaultContract;
