import React, { useEffect, useState } from "react";
import "./App.css";
import Logo from "./svgs/Logo";
import Line from "./svgs/Line";
import ArtistHero from "./components/ArtistHero";
import TwitterLogo from "./svgs/TwitterLogo";
import DeskNav from "./svgs/landingPage/DeskNav";
import MainHero from "./components/Main";
import Utility from "./components/Utility";
import Team from "./components/Team";
import GhostlistHero from "./components/GhostlistHero";
import FooterHero from "./components/FooterHero";
import { slide as Menu } from "react-burger-menu";
import BurgerMenu from "./components/mobileHeros/BurgerMenu";
import MainMobile from "./components/mobileHeros/MainMobile";
import ArtistMobile from "./components/mobileHeros/ArtistMobile";
import UtilityMobile from "./components/mobileHeros/UtilityMobile";
import ArtMobile from "./components/mobileHeros/ArtMobile";
import TeamMobile from "./components/mobileHeros/TeamMobile";
import GhostlistMobile from "./components/mobileHeros/GhostlistMobile";
import FooterMobile from "./components/mobileHeros/FooterMobile";
import NewDeskNav from "./svgs/landingPage/NewDeskNav";
import NewBurgerMenu from "./components/mobileHeros/NewBurgerMenu";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "36px",
    float: "right",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#000000",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#FFFFFF",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const LandingPage = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setMobile(true);
    }

    document
      .getElementById("start")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
  }, []);

  return (
    <div className="m-auto bg-ghostBlue h-auto" id="start">
      {!mobile ? (
        <div>
          {" "}
          {/*className='md:block lg:block xl:block sm:hidden' */}
          <span className="block pt-6"></span>
          <NewDeskNav />
          <div className="w-[100%]" id="Home-Anchor">
            <MainHero />
          </div>
          <div className="w-[100%] pt-10" id="TheArtist-Anchor">
            <ArtistHero />
          </div>
          <div className="w-[100%] pt-10" id="Utility-Anchor">
            <Utility />
          </div>
          <div className="w-[100%]" id="Team-Anchor">
            <Team />
          </div>
          <div className="w-[100%]" id="Ghostlist-Anchor">
            <GhostlistHero />
          </div>
          <div className="w-[100%]">
            <FooterHero />
          </div>
        </div>
      ) : (
        <div>
          {" "}
          {/*className='md:hidden lg:hidden xl:hidden sm:block'*/}
          <Menu right styles={styles} width={"60%"}>
            <div className="w-[100%]">
              <NewBurgerMenu />
            </div>
          </Menu>
          <div id="Home">
            <MainMobile />
          </div>
          <div id="MobileTheArtist-Anchor">
            <ArtistMobile />
          </div>
          <div id="MobileUtility-Anchor">
            <UtilityMobile />
          </div>
          <div id="MobileArt-Anchor">
            <ArtMobile />
          </div>
          <div id="MobileTeam-Anchor">
            <TeamMobile />
          </div>
          <div id="MobileGhostlist-Anchor">
            <GhostlistMobile />
          </div>
          <div>
            <FooterMobile />
          </div>
        </div>
      )}
    </div>
  );
};
export default LandingPage;
