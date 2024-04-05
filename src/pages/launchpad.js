import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IDOList from "../components/Modal/idoList";
import * as s from "../styles/global";
import { utils } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import WalletModal from "../components/WalletModal";

const Launchpad = (props) => {
  const [address, setAddress] = useState("");
  const contract = useSelector((state) => state.contract);

  const location = useLocation();
  const navigate = useNavigate();
  const [isWaleltModalOpen, setIsWaleltModalOpen] = useState(false);
  const { account } = useWeb3React();

  useEffect(() => {
    console.log("account", account);
    if (!account) {
      setIsWaleltModalOpen(true);
    } else {
      setIsWaleltModalOpen(false);
    }
    // if (location.pathname === '/launchpad') navigate('/launchpad');
  }, [account]);

  if (!contract.web3) {
    return null;
  }

  return (
    <>
      {!account && (
        <WalletModal
          isOpen={isWaleltModalOpen}
          closeModal={() => setIsWaleltModalOpen(false)}
        />
      )}
      {account && (
        <s.Container ai="center">
          <s.TextTitle>Launchpad</s.TextTitle>
          <s.SpacerMedium />
          <TextField
            fullWidth
            label={"Search by token address "}
            onChange={async (e) => {
              e.preventDefault();
              await utils.typewatch(2000);
              setAddress(e.target.value);
            }}
          />
          <IDOList tokenAddress={address} />
        </s.Container>
      )}
    </>
  );
};

export default Launchpad;
