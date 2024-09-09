import Web3 from "web3";
import { INFURA_CONFIG } from "../config";
import { SetStateAction } from "react";

interface Window {
    ethereum?: any;
}

declare const window: Window;

let web3: Web3;
export let metaMaskAccount: any;
if(window.ethereum) {

    web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) metaMaskAccount = accounts[0];

} else {

    const url = `${INFURA_CONFIG.URL}/${INFURA_CONFIG.PROJECT_ID}`;
    web3 = new Web3(new Web3.providers.HttpProvider(url));
}

export default web3;