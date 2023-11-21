import React, { useEffect, useState } from "react";
import "./App.css";
import Logo from "./svgs/Logo";
import Line from "./svgs/Line";
import TwitterLogo from "./svgs/TwitterLogo";
import { trackAmplitude } from "./utilities/amplitude";
import GhostListIcon from "./svgs/GhostListIcon";

const App = () => {
  const [success, setSuccess] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const [walletsThatAnswered, setWalletsThatAnswered] = useState<string[]>([]);
  const [apiFail, setApiFail] = useState(false);
  const [communityWhitelist, setCommunityWhitelist] = useState<String[]>([]);
  const [partnerWhitelist, setPartnerWhitelist] = useState<String[]>([]);
  const [whichWhitelist, setWhichWhitelist] = useState("partner");

  const submitForm = async (answer: string, wallet: string) => {
    try {
      const response = await fetch(
        `/api/formSubmit?answer=${answer}&wallet=${wallet}`
      );
      let responseJson = await response.json();
      setSuccess(responseJson.response);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  const checkStatus = async () => {
    try {
      const response = await fetch(`/api/checkStatus`);
      let responseJson = await response.json();

      var walls = responseJson.walletsThatAnswered;

      for (var i = 0; i < walls.length; i++) {
        //console.log(walls[i])
        walletsThatAnswered.push(walls[i]);
      }

      //setIsClosed(responseJson.response)

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  const pullWhitelist = async () => {
    try {
      const response = await fetch(`/api/pullWhitelist`);
      let responseJson = await response.json();

      if (responseJson.data.success === false) {
        console.log("odd response");
        setApiFail(true);
        return false;
      } else {
        var communityWl = responseJson.data.communityWhitelist;
        var partnerWl = responseJson.data.partnerWhitelist;

        setCommunityWhitelist([...communityWhitelist, ...communityWl]);
        setPartnerWhitelist([...partnerWhitelist, ...partnerWl]);

        return true;
      }
    } catch (error) {
      console.log(error);
      setApiFail(true);
      return false;
    }
  };

  return (
    <div className="xl:max-w-[1000px] m-auto ">
      <div className="xl:w-[40%] lg:w-[40%] m:w-[40%] sm:w-[60%] m-auto pt-14 ">
        <Logo></Logo>
      </div>

      {apiFail === false ? (
        <div>
          <div className="mt-16 xl:w-[90%] lg:w-[90%] md:w-[90%] sm:w-[80%] m-auto">
            <h2 className="xl:text-[100px] lg:text-[90px] md:text-[80px] sm:text-[50px] text-center m-auto">
              <label
                className="relative text-gray-400 focus-within:text-gray-600 block text-center w-fit m-auto"
                role="button"
                onClick={(e) => {
                  window.location.href = "/ghostlist";
                }}
              >
                <div className="pointer-events-none xl:w-[80px] lg:w-[70px] md:w-[70px] sm:w-[60px] xl:h-10 lg:h-10 md:h-9 sm:h-8 absolute bottom-0 transform -translate-y-1/2 m-auto">
                  <GhostListIcon />
                </div>

                <div className="ml-20">ghost list</div>
              </label>

              <h2 className="xl:text-[80px] lg:text-[70px] md:text-[60px] sm:text-[50px] text-center m-auto mt-12">
                check twitter for updates
              </h2>
              <div className="xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[15%] m-auto pt-16">
                <TwitterLogo></TwitterLogo>
              </div>
            </h2>
          </div>
          <div className="block mb-10"></div>
        </div>
      ) : (
        <div>
          <div className="mt-20 w-[90%] m-auto">
            <h2 className="xl:text-[80px] lg:text-[70px] md:text-[60px] sm:text-[50px] text-center m-auto">
              an error occured. refresh and check twitter for updates
            </h2>
            <div className="xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[15%] m-auto pt-10">
              <TwitterLogo></TwitterLogo>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
