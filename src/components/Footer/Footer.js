import React from "react";
import { SocialIcon } from "react-social-icons";
import { FaExternalLinkAlt } from "react-icons/fa";
import styled from "styled-components";
import * as s from "../../styles/global";
import { useApplicationContext } from "../../context/applicationContext";
import {
  Box,
  Container,
  FooterLink,
  Heading,
  Row,
} from "./FooterStyle";
import { shortenAddress } from "../../utils/utils";


const Copyright = styled.p`
  margin: 0 0 0.2rem 0;
  text-align: center;
  ${({ pale }) => (pale ? `opacity: 0.92; font-size: 0.96em;` : '')}

  a {
    color: var(--primary);
    text-decoration: none;
  }
`

const Footer = () => {
  const {
    domainSettings: {
      projectName,
      socialLinks,
      isLockerEnabled,
      disableSourceCopyright,
    },
    networkExplorer,
    IDOFactoryAddress,
    TokenLockerFactoryAddress,
  } = useApplicationContext();

  const year = new Date().getFullYear()
  const copyright = `© ${"MerlinPad"} ${year}`
  const SourceCopyright = (
    <>
      Powered by{' '}
      <a href="https://merlinchain.io/" className="font-FuturaXBlkItBT" target="_blank" rel="noopener noreferrer">
      Merlinchain
      </a>
    </>
  );

  return (
    <Box className="font-FuturaXBlkItBT">
      {/* <hr
        style={{
          color: "#ffffff",
          backgroundColor: "#ffffff",
          height: 1,
          borderColor: "#ffffff",
        }}
      /> */}
      <Container style={{ padding: 30 }}>
        <Row fd="column" ai="center">
          <Heading className="font-FuturaXBlkItBT">Contract Addresses</Heading>
          {IDOFactoryAddress &&         <FooterLink
          className="font-FuturaXBlkItBT"
            target="_blank"
            href={
              networkExplorer +
              "/address/" +
              IDOFactoryAddress
            }
          >
            IDO Factory: {shortenAddress(IDOFactoryAddress)} <FaExternalLinkAlt size=".75em" />
          </FooterLink>}
 
          {
            isLockerEnabled && TokenLockerFactoryAddress && (
              <FooterLink
              className="font-FuturaXBlkItBT"
                target="_blank"
                href={
                  networkExplorer +
                  "/address/" +
                  TokenLockerFactoryAddress
                }
              >
                Locker Factory: {shortenAddress(TokenLockerFactoryAddress)} <FaExternalLinkAlt size=".75em" />
              </FooterLink>
            )
          }
        </Row>

        <s.SpacerMedium />

        <Row jc="space-evenly" >
          {socialLinks?.length > 0 && socialLinks.map((link, i) => (
            <SocialIcon
              key={i}
              url={link}
              target="_blank"
              bgColor="#fff"
              fgColor="#000000"
            />
          ))}
        </Row>

        <s.SpacerMedium />

        <Row fd="column" ai="center" className="font-FuturaXBlkItBT">
          {<Copyright className="font-FuturaXBlkItBT">{copyright}</Copyright>}
          {!disableSourceCopyright && <Copyright pale className="font-FuturaXBlkItBT">{SourceCopyright}</Copyright>}
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
