import { ContractConfig, InfuraConfig } from "./interfaces/contract";
import { VAT_ABI } from "./utils/contracts/abi/vat-abi";
import { VAULT_ABI } from "./utils/contracts/abi/vault-abi";

export const VAULT_CONTRACT_CONFIG: ContractConfig = {
  ADDRESS: import.meta.env.VITE_VAULT_CONTRACT_ADDRESS,
  ABI: VAULT_ABI,
}

export const VAT_CONTRACT_CONFIG: ContractConfig = {
  ADDRESS: import.meta.env.VITE_VAT_CONTRACT_ADDRESS,
  ABI: VAT_ABI,
}

export const INFURA_CONFIG: InfuraConfig = {
  URL: 'https://mainnet.infura.io/v3',
  PROJECT_ID: import.meta.env.VITE_INFURA_PROJECT_ID,
}