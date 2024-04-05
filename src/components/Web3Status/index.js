import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  NetworkContextName,
  //   ZERO_ADDRESS,
} from "../../constants";

import WalletModal from "../WalletModal";

import * as s from "../../styles/global";
import { shortenAddress } from "../../utils/utils";
import { useApplicationContext } from "../../context/applicationContext";

const sliceStr = (str) => {
  const len = str.length;
  if (len < 7) return str;
  return `${str.slice(0, 4)}...${str.slice(-4)}`;
};

export function Web3Status() {
  const {
    active,
    // chainId,
    account,
    // connector,
    // error,
  } = useWeb3React();

  const { solanaInfo } = useApplicationContext();

  const [isWaleltModalOpen, setIsWaleltModalOpen] = useState(false);

  const contextNetwork = useWeb3React(NetworkContextName);

  // const toggleWalletModal = useWalletModalToggle()

  if (!contextNetwork.active && !active) {
    return null;
  }

  return (
    <>
      <s.Container ai="center">
        {account == null ? (
          <s.button
            onClick={() => {
              setIsWaleltModalOpen(true);
            }}
          >
            CONNECT
          </s.button>
        ) : (
          <s.button
            className="address text-collapse"
            onClick={() => {
              setIsWaleltModalOpen(true);
            }}
          >
            {solanaInfo.publicKey
              ? sliceStr(solanaInfo.publicKey)
              : shortenAddress(account)}
          </s.button>
        )}
      </s.Container>
      <WalletModal
        isOpen={isWaleltModalOpen}
        closeModal={() => setIsWaleltModalOpen(false)}
      />
    </>
  );
}
