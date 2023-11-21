import React, { useEffect, useState } from "react";
import "./App.css";
import Logo from "./svgs/Logo";
import Line from "./svgs/Line";
import TwitterLogo from "./svgs/TwitterLogo";

const Ghostlist = () => {
  const [success, setSuccess] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const [walletsThatAnswered, setWalletsThatAnswered] = useState<string[]>([]);
  const [apiFail, setApiFail] = useState(false);
  const [communityWhitelist, setCommunityWhitelist] = useState<String[]>([]);
  const [partnerWhitelist, setPartnerWhitelist] = useState<String[]>([]);
  const [whichWhitelist, setWhichWhitelist] = useState("community");

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

  useEffect(() => {
    pullWhitelist();

    //checkStatus()
  }, []);

  return (
    <div className="xl:max-w-[1000px] m-auto">
      <div className="xl:w-[40%] lg:w-[40%] m:w-[40%] sm:w-[60%] m-auto pt-14 ">
        <Logo></Logo>
      </div>
      {success === false && isClosed === false && (
        <div className="mt-28 w-[90%] m-auto">
          <h2 className="xl:text-[80px] lg:text-[70px] md:text-[60px] sm:text-[50px] text-center m-auto">
            IT'S NOT DEATH WE FEAR, IT'S
            <br></br>
            <label className="relative text-gray-400 focus-within:text-gray-600 block text-center w-[60%] m-auto">
              <div className="pointer-events-none w-[100%] xl:h-8 lg:h-7 md:h-6 sm:h-5 absolute bottom-0 transform -translate-y-1/2">
                <Line />
              </div>

              <input
                name="answer"
                id="answer"
                placeholder=""
                className="form-input pb-4 text-black appearance-none w-full block text-center focus:outline-none uppercase"
              />
            </label>
          </h2>

          <h2 className="xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] text-center m-auto ">
            <label className="relative text-gray-400 focus-within:text-gray-600 block text-center w-[40%] m-auto">
              <div className="pointer-events-none w-[100%] xl:h-7 lg:h-6 md:h-5 sm:h-4 absolute bottom-0 transform -translate-y-1/2">
                <Line />
              </div>

              <input
                name="wallet"
                id="wallet"
                placeholder="wallet"
                className="form-input pb-4 text-black appearance-none w-full block text-center focus:outline-none lowercase"
              />
            </label>
            <span className="block mb-1"></span>
            <button
              id="submitButton"
              role="button"
              onClick={() => {
                var answer = (
                  document.getElementById("answer") as HTMLInputElement
                )?.value;
                var wallet = (
                  document.getElementById("wallet") as HTMLInputElement
                )?.value;

                if (answer === "" || wallet === "") {
                  alert("fill out the form!");
                } else {
                  //console.log(walletsThatAnswered)
                  if (walletsThatAnswered.includes(wallet.toLowerCase())) {
                    alert("oops... looks like you've submitted already");
                  } else {
                    submitForm(answer, wallet);
                  }
                }
              }}
            >
              SUBMIT
            </button>
          </h2>
        </div>
      )}

      {success === true && (
        <div>
          <div className="mt-32 w-[90%] m-auto">
            <h2 className="xl:text-[80px] lg:text-[70px] md:text-[60px] sm:text-[50px] text-center m-auto">
              stay tuned on twitter for more information on the ghost list
            </h2>
            <div className="xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[15%] m-auto pt-10">
              <TwitterLogo></TwitterLogo>
            </div>
          </div>
        </div>
      )}

      {isClosed === false && (
        <div>
          <div className="mt-20 w-[90%] m-auto">
            <h2 className="xl:text-[80px] lg:text-[70px] md:text-[60px] sm:text-[50px] text-center m-auto">
              a lot of traffic... will be back soon. check twitter for updates.
            </h2>
            <div className="xl:w-[10%] lg:w-[10%] md:w-[10%] sm:w-[15%] m-auto pt-10">
              <TwitterLogo></TwitterLogo>
            </div>
          </div>
        </div>
      )}

      {apiFail === false ? (
        <div>
          <div className="mt-8 xl:w-[90%] lg:w-[90%] md:w-[90%] sm:w-[80%] m-auto">
            <h2 className="xl:text-[80px] lg:text-[70px] md:text-[60px] sm:text-[50px] text-center m-auto">
              current ghost listed addresses
            </h2>
            {/*<br></br>
            <span className="block mb-8"></span>
            <h2 className="w-[80%] xl:text-[50px] lg:text-[40px] md:text-[30px] sm:text-[20px] text-center m-auto opacity-60">
              THERE ARE 2 LISTS, ONE FOR PARTNER COLLECTIONS, ONE FOR GIVEAWAYS
              TO GHOSTBOY COMMUNITY
              <br></br>
              <span className="block mb-8"></span>
              BOTH LISTS ARE CREATED EQUALLY, BUT MIGHT HAVE DIFFERENT TOTALS
      </h2>*/}
            <br></br>
            <span className="block mb-8"></span>

            <h2 className="xl:[text-100px] lg:text-[90px] md:text-[80px] sm:text-[40px] text-center m-auto">
             {/* <div className="flex w-fit m-auto max-w-[90%] break-all">
                <label
                  className="relative text-gray-400 focus-within:text-gray-600 block text-center m-auto w-fit"
                  onClick={() => {
                    setWhichWhitelist("partner");
                  }}
                  role="button"
                >
                  <div className="pointer-events-none w-[100%] xl:h-1 lg:h-1 md:h-1 sm:h-1 absolute bottom-0 transform -translate-y-0">
                    <div className="w-[90%] m-auto">
                      {whichWhitelist === "partner" && <Line />}
                    </div>
                  </div>

                  <div className="xl:pl-8 xl:pr-8 lg:pl-8 lg:pr-8 md:pl-8 md:pr-8 sm:pr-2 sm:pl-2">
                    partner
                  </div>
                </label>
                <label
                  className="relative text-gray-400 focus-within:text-gray-600 block text-center m-auto w-fit"
                  onClick={() => {
                    setWhichWhitelist("community");
                  }}
                  role="button"
                >
                  <div className="pointer-events-none w-[100%] xl:h-1 lg:h-1 md:h-1 sm:h-1 absolute bottom-0 transform -translate-y-0">
                    <div className="w-[90%] m-auto">
                      {whichWhitelist === "community" && <Line />}
                    </div>
                  </div>

                  <div className="xl:pl-8 xl:pr-8 lg:pl-8 lg:pr-8 md:pl-8 md:pr-8 sm:pr-2 sm:pl-2">
                    community
                  </div>
                </label>
                </div>*/}
            </h2>

            <span className="block mb-3"></span>

            <div className="w-fit m-auto break-all">
              {whichWhitelist === "partner" &&
                partnerWhitelist.map((item, i) => (
                  <div className="xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] m-auto text-left">
                    {item}
                    <span className="mt-4"></span>
                  </div>
                ))}

              {whichWhitelist === "community" &&
                communityWhitelist.map((item, i) => (
                  <div className="xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[30px] m-auto text-left">
                    {item}
                    <span className="mt-4"></span>
                  </div>
                ))}
            </div>
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
export default Ghostlist;
