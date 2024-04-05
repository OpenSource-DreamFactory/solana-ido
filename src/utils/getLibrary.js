import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import * as SolanaWeb3 from "@solana/web3.js";
const solanaRpcNet = "https://api.devnet.solana.com";

// 开发网络：https://api.devnet.solana.com
// 测试网络：https://api.testnet.solana.com
// 主网络：https://api.mainnet-beta.solana.com
export const getWeb3Library = (provider) => {
  return new Web3(provider);
};

export default function getLibrary(provider) {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 15000;
  library.web3 = getWeb3Library(provider);
  return library;
}

export const getSolanaLibrary = (provider) => {
  //  const solanaLibrary = new web3.Connection(solanaRpcNet)

  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 15000;
  library.web3 = getWeb3Library(provider);
  return library;
};
