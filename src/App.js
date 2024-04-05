import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import Web3ReactManager from "./components/Web3ReactManager";
// import Connection from "./pages/Connection";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navbar";
import Account from "./pages/account";
import Home from "./pages/home.js";
import Launchpad from "./pages/launchpad.js";
import LaunchpadInfo from "./pages/launchpadInfo";
import Locker from "./pages/locker";
import LockerInfo from "./pages/lockerInfo";
import LockToken from "./pages/lockToken";
import Publish from "./pages/publish";
import { fetchContract } from "./redux/contract/contractAction";
import * as s from "./styles/global";
import { useApplicationContext } from "./context/applicationContext";
// import Loader from "./components/Loader";
import Manage from "./pages/Manage";
import viedoSmall from "./assets/viedoSmall.mp4";
import viedo from "./assets/viedo.mp4";

// import viedoImg from "./assets/images/bgimg.jpg";

function App() {
  const dispatch = useDispatch();
  const { active, chainId, account } = useWeb3React();
  const videoRef = useRef(null);
  // const {
  //   isAdmin,
  //   isAppConfigured,
  //   domainSettings,
  // } = useApplicationContext();

  // account：当前连接的以太坊账户地址。
  // library：一个 web3 实例，你可以用它来执行以太坊操作。
  // chainId：当前连接的区块链的 ID。
  // activate：一个函数，当调用时，会触发钱包连接流程。
  // deactivate：一个函数，当调用时，会断开与当前钱包的连接。
  // active：一个布尔值，表示当前是否已连接到一个钱包。
  // error：如果在连接钱包或执行其他操作时发生错误，这里会包含错误信息。
  console.log(active, chainId, account);
  const {
    isAppConfigured,
    domainSettings: { networks, contracts, isLockerEnabled },
    isDomainDataFetching,
    isDomainDataFetched,
    solanaInfo,
  } = useApplicationContext();
  console.log("solana", solanaInfo);
  const style = {
    width: "100vw", // 视口宽度
    height: "100vh", // 视口高度
    position: "fixed", // 固定定位
    top: 0,
    left: 0,
    zIndex: -1, // 设置z-index为-1使其位于其他内容下方
    backgroundSize: "cover", // 如果视频尺寸不匹配，确保视频覆盖整个区域
    objectFit: "cover", // 确保视频内容覆盖整个元素区域
  };
  useEffect(() => {
    if (chainId && isAppConfigured) {
      dispatch(fetchContract(chainId, networks, contracts));
    }
  }, [dispatch, account, chainId, isAppConfigured, networks, contracts]);
  const videoTag = useRef(null);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  return (
    <Web3ReactManager>
      <s.Screen>
        {isMobile ? (
          // 移动端（可能包括iOS）渲染这个video标签
          <video
            style={style}
            ref={videoTag}
            autoPlay
            loop
            muted
            src={viedoSmall}
            playsInline
          />
        ) : (
          // 非移动端（包括PC）渲染这个video标签
          <video
            style={style}
            ref={videoTag}
            autoPlay
            loop
            muted
            src={viedo}
            playsInline
          />
        )}
        {/* <video
          id="myVideo"
          ref={videoRef}
          style={style}
          src={viedoSmall}
          loop
          autoPlay
          muted
          playsInline
        ></video> */}
        <>
          <Navigation />
          <s.Container ai="center">
            <s.Container w="85%" style={{ minHeight: 600 }}>
              {/* <Outlet /> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/launchpad" element={<Launchpad />} />
                <Route path="/home" element={<Home />} />
                <Route path="/manage" element={<Manage />} />
                <Route
                  path="/launchpad/:idoAddress"
                  element={<LaunchpadInfo />}
                />
                <Route path="/publish" element={<Publish />} />
                <Route path="/lock" element={<LockToken />} />
                <Route path="/account" element={<Account />} />
                {isLockerEnabled && (
                  <Route path="/locker" element={<Locker />} />
                )}
                {isLockerEnabled && (
                  <Route
                    path="/locker/:lockerAddress"
                    element={<LockerInfo />}
                  />
                )}
              </Routes>
              <s.SpacerLarge />
            </s.Container>
            <Footer />
          </s.Container>
        </>
      </s.Screen>
    </Web3ReactManager>
  );
}
//{!active ? (
//<Connection />
// ) : isDomainDataFetching || !isDomainDataFetched ? (
//   <s.LoaderWrapper>
//     <Loader size="2.8rem" />
//   </s.LoaderWrapper>
// ) : !isAppConfigured ? (
//   <Manage />
// ) : (
//   <>
//     <Navigation />
//     <s.Container ai="center">
//       <s.Container w="85%" style={{ minHeight: 600 }}>
//         <Outlet />
//         <Routes>
//           <Route path="/" element={<Launchpad />} />
//           <Route path="/launchpad" element={<Launchpad />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/manage" element={<Manage />} />
//           <Route
//             path="/launchpad/:idoAddress"
//             element={<LaunchpadInfo />}
//           />
//           <Route path="/publish" element={<Publish />} /> */}
//           <Route path="/lock" element={<LockToken />} />
//           <Route path="/account" element={<Account />} />
//           {isLockerEnabled && (
//             <Route path="/locker" element={<Locker />} />
//           )}
//           {isLockerEnabled && (
//             <Route
//               path="/locker/:lockerAddress"
//               element={<LockerInfo />}
//             />
//           )}
//         </Routes>
//         <s.SpacerLarge />
//       </s.Container>
//       <Footer />
//     </s.Container>
//   </>
// )
// }
export default App;
