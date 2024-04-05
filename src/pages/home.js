import React from "react";
import * as s from "../styles/global";
import logonTitle from "../assets/images/logoContent.png";
const Home = () => {
  return (
    <s.homeContent>
      <s.LogoTitle src={logonTitle} />
      {/* <div className="font-bold	text-white	text-center	font-sans lg:text-4xl	  md:text-xl	 "> Merlin's first launchpad</div> */}
      {/* <s.LogoTitleName> Merlin's first launchpad</s.LogoTitleName> */}
    </s.homeContent>
  );
};
export default Home;
