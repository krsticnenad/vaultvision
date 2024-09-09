import { Contract } from "web3";
import { isContractAddressValid } from "../functions/is-contract-address-valid";
import web3 from "../web3";
import { VAT_CONTRACT_CONFIG } from "../../config";

let vatContract: Contract<typeof VAT_CONTRACT_CONFIG.ABI> | null = null;

if (isContractAddressValid(VAT_CONTRACT_CONFIG.ADDRESS)) {
    vatContract = new web3.eth.Contract(VAT_CONTRACT_CONFIG.ABI, VAT_CONTRACT_CONFIG.ADDRESS);
}

export default vatContract;
