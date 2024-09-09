import { ContractAbi } from "web3";
import { ContractAddress } from "../utils/functions/is-contract-address-valid";

export interface ContractConfig {
    ADDRESS: ContractAddress;
    ABI: ContractAbi;
}

export interface InfuraConfig {
    URL: string
    PROJECT_ID: number
}