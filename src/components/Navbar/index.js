import BigNumber from "bignumber.js";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../../App.css";
import { useApplicationContext } from "../../context/applicationContext";
import styled from "styled-components";
import * as s from "../../styles/global";
import { Web3Status } from "../Web3Status";
import Loader from "../Loader";
import { useWeb3React } from "@web3-react/core";
import { CURRENCY } from "../../assets/images";
import { Paper } from "@mui/material";
import LOGO from "../../assets/images/logo.png";
import solanaLogo from "../../assets/images/solana.jpg";

const NetworkCard = styled(Paper)`
  display: flex;
  justify-content: center;
  padding: 0 0.75rem 0 0.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 0.4rem;
  align-items: center;
  justify-content: center;

  & > img,
  span {
    height: ${({ size }) => (size ? size + "px" : "24px")};
    width: ${({ size }) => (size ? size + "px" : "24px")};
  }
`;

const Navigation = () => {
  const {
    domainSettings: { isLockerEnabled, logoUrl },
    isAdmin,
    chainName,
    networkExplorer,
    baseCurrencySymbol,
    ETHamount,
    isNativeCoinBalanceFetching,
    FeeTokenAddress,
    FeeTokenamount,
    FeeTokenSymbol,
    isFeeTokenDataFetching,
  } = useApplicationContext();

  const { chainId, account } = useWeb3React();

  const mockCompanyLogo = LOGO;

  const hasFeeToken =
    !isFeeTokenDataFetching && FeeTokenSymbol && FeeTokenAddress;

  const getNetworkInfo = () => {
    if (!chainId) return null;

    const networkImage = CURRENCY[chainId];

    return (
      chainName && (
        // TODO: make some wrapped card
        <NetworkCard elevation={2} title={`${chainName} network`}>
          {!!networkImage && (
            <IconWrapper size={20}>
              <img src={solanaLogo} alt="network logo" />
            </IconWrapper>
          )}
          {"solana"}
        </NetworkCard>
      )
    );
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ margin: 15 }}>
      <Container style={{ maxWidth: "100%" }}>
        {/* <s.LogoTitle src={logoUrl || mockCompanyLogo} />
        <s.LogoTitleName>MerlinPad</s.LogoTitleName> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/launchpad">
              <Nav.Link>Launchpad</Nav.Link>
            </LinkContainer>
            <Nav.Link href="https://twitter.com/merlinpad_io" target="_blank">
              Twitter
            </Nav.Link>
            <LinkContainer to="/locker">
              <Nav.Link>Locker</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/account">
              <Nav.Link>Account</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/manage">
              <Nav.Link>Manage</Nav.Link>
            </LinkContainer>
            <Nav.Link href="https://merlinswap.org/trade/swap" target="_blank">
              Swap
            </Nav.Link>

            <NavDropdown title="Bridge" id="collasible-nav-dropdown">
              <Nav.Link
                href="https://merlinchain.io/bridge"
                target="_blank"
                className="link-style"
              >
                Merlin Bridge
              </Nav.Link>
              {/* <NavDropdown.Item href="#action/3.3"></NavDropdown.Item> */}
              <NavDropdown.Divider />
              <Nav.Link
                href="https://meson.fi/"
                target="_blank"
                className="link-style"
              >
                Meson
              </Nav.Link>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>{getNetworkInfo()}</Nav.Link>
            {account &&
              (!hasFeeToken ? (
                <Nav.Link className="link-style">
                  {isNativeCoinBalanceFetching ? (
                    <Loader />
                  ) : (
                    `$Sol ` +
                    BigNumber(ETHamount)
                      .dividedBy(10 ** 18)
                      .toFormat(2)
                  )}
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={
                    isNativeCoinBalanceFetching ? (
                      <Loader />
                    ) : (
                      `$Sol ` +
                      BigNumber(ETHamount)
                        .dividedBy(10 ** 18)
                        .toFormat(2)
                    )
                  }
                  id="collasible-nav-dropdown"
                >
                  <Nav.Link
                    href={`${networkExplorer}/address/${FeeTokenAddress}`}
                    target="_blank"
                    className="link-style"
                  >
                    {isFeeTokenDataFetching ? (
                      <Loader />
                    ) : (
                      `$${FeeTokenSymbol} ` +
                      BigNumber(FeeTokenamount)
                        .dividedBy(10 ** 18)
                        .toFormat(0)
                    )}
                  </Nav.Link>
                  {/* <NavDropdown.Item href="#action/3.3"></NavDropdown.Item> */}
                  <NavDropdown.Divider />
                </NavDropdown>
              ))}
          </Nav>
          <Web3Status />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
