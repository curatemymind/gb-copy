import React, { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import Countdown, {
  CountdownRendererFn,
  CountdownRenderProps,
} from "react-countdown";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { useAccount, useSigner } from "wagmi";
import _ from "lodash";
import { getDefaultProvider } from "ethers";

import ghostBoyContract from "../utilities/contracts/GhostBoy.sol/GhostBoy.json";

import { GhostBoy } from "../utilities/types";
import Start from "./mint/Start";
import InProgress from "./mint/InProgress";
import Successful from "./mint/Successful";
import Header from "./mint/Header";
import StartMobile from "./mint/mobile/StartMobile";
import InProgressMobile from "./mint/mobile/InProgressMobile";
import SuccessfulMobile from "./mint/mobile/SuccessfulMobile";

import { trackAmplitude } from "../utilities/amplitude";

const ghostBoyContractAddress =
  process.env.REACT_APP_GHOSTBOY_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

interface ComponentProps {
  mobile: any;
  playing: any;
  toggle: any;
  muted: any;
  toggleMuted: any;
}

const Mint: React.FC<ComponentProps> = (props: ComponentProps) => {
  const [signerAvailable, setSignerAvailable] = useState(false);
  const [isGhostlistLive, setIsGhostlistLive] = useState(false);
  const [ghostListStart, setGhostListStart] = useState<Date>();
  const [ghostListEnd, setGhostListEnd] = useState<Date>(new Date());
  const [inGhostlist, setInGhostlist] = useState(false);
  const [informationText, setInformationText] = useState("");
  const [tokensMinted, setTokensMinted] = useState(0);

  const [mintStates, setMintStates] = useState("not_started"); // possible values: not_started, in_progress, success, fail

  const { address, connector, isConnected } = useAccount();
  const {
    data: signer,
    isError,
    isLoading,
  } = useSigner({
    onSuccess(data) {
      setSignerAvailable(true);
    },
  });

  useEffect(() => {
    const loadApplication = async (signer: ethers.Signer) => {
      initializeTimes(signer);
      checkIfUserInGhostlist(signer);
      listeningForMintSuccess(signer);
      fetchTokensMinted(signer);
    };

    if (signer) {
      loadApplication(signer);
    }
  }, [signerAvailable]);

  const resetState = () => setTimeout(() => setMintStates("not_started"), 3000);

  useEffect(() => {
    switch (mintStates) {
      case "not_started":
        setInformationText("Not started");
        break;
      case "in_progress":
        setInformationText("In progress");
        break;
      case "success":
        setInformationText("Mint successful");
        //resetState();
        break;
      case "failed":
        setInformationText("Not started");
        //setInformationText("Mint failed");
        //resetState();
        break;
      default:
        setInformationText("Unknown");
        resetState();
        break;
    }
  }, [mintStates]);

  const fetchTokensMinted = async (signer: ethers.Signer) => {
    const ghostBoy = new ethers.Contract(
      ghostBoyContractAddress,
      ghostBoyContract.abi,
      signer
    ) as GhostBoy;

    const minted = (await ghostBoy.totalSupply()).toNumber();
    setTokensMinted(minted);
  };

  const listeningForMintSuccess = async (signer: ethers.Signer) => {
    const ghostBoy = new ethers.Contract(
      ghostBoyContractAddress,
      ghostBoyContract.abi,
      signer
    ) as GhostBoy;

    const userAddress = await signer.getAddress();
    const filterTo = ghostBoy.filters.Transfer(null, userAddress);

    ghostBoy.on(filterTo, (from: any, to: any, token: any) => {
      console.log(from, to, token);
      trackAmplitude("Mint Success");
      setMintStates("success");
    });
  };

  const initializeTimes = async (signer: ethers.Signer) => {
    const ghostBoy = new ethers.Contract(
      ghostBoyContractAddress,
      ghostBoyContract.abi,
      signer
    ) as GhostBoy;

    const startTime = (await ghostBoy.mintStart()).toNumber() * 1000;
    const start = new Date(startTime);
    setGhostListStart(start);

    const ghostlistDuration =
      (await ghostBoy.ghostlistDuration()).toNumber() * 1000;

    const end = new Date(startTime + ghostlistDuration);
    setGhostListEnd(end);
  };

  useEffect(() => {
    const now = new Date(Date.now());
    if (ghostListStart && now > ghostListStart) {
      console.log("ghostlist is live");
      setIsGhostlistLive(true);
    }
  }, [ghostListStart]);

  const pullWhitelist = async () => {
    try {
      const response = await fetch(`/api/pullWhitelist`);
      const responseJson = await response.json();

      const communityWhitelist = responseJson.data
        .communityWhitelist as Array<string>;

      return communityWhitelist;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const generateProof = async (signer: ethers.Signer) => {
    const whitelist = await pullWhitelist();
    const address = ethers.utils.getAddress(await signer.getAddress());
    const leaves = whitelist.map((leaf) =>
      ethers.utils.solidityKeccak256(["address"], [leaf])
    );
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const index = whitelist.indexOf(address);
    return tree.getHexProof(leaves[index]);
  };

  const checkIfUserInGhostlist = async (signer: ethers.Signer) => {
    const ghostBoy = new ethers.Contract(
      ghostBoyContractAddress,
      ghostBoyContract.abi,
      signer
    ) as GhostBoy;

    const address = await signer.getAddress();
    const proof = await generateProof(signer);
    const ghostlisted = await ghostBoy.isGhostlisted(address, proof);
    setInGhostlist(ghostlisted);
  };

  const mintHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("here");
    trackAmplitude("Mint Clicked");
    mintToken(signer!);
  };

  const mintToken = async (signer: ethers.Signer): Promise<void> => {
    const ghostBoy = new ethers.Contract(
      ghostBoyContractAddress,
      ghostBoyContract.abi,
      signer
    ) as GhostBoy;

    const mintPrice = ethers.utils.parseEther("0.025");
    const options = { value: mintPrice };

    if (isGhostlistLive) {
      const proof = await generateProof(signer);
      try {
        const receipt = await ghostBoy.mint(proof, options);
        setMintStates("in_progress");
        trackAmplitude("Mint Approved");
        console.log(receipt);
      } catch (e) {
        setMintStates("failed");
        trackAmplitude("Mint Failed");
        console.log(e);
      }
    } else {
      // This flow is disabled at the moment because we don't
      // anticipate going public
      // await ghostBoy.mint([], options);
    }
  };

  const ghostTimer = !isGhostlistLive ? (
    <div style={{ fontFamily: "sans-serif", marginTop: "20px" }}>
      Ghostlist opens in <Countdown date={ghostListStart} />
    </div>
  ) : (
    <div style={{ fontFamily: "sans-serif", marginTop: "20px" }}>
      Ghostlist is live
    </div>
  );

  const ghostlistStatus = inGhostlist ? (
    <div style={{ fontFamily: "sans-serif", marginTop: "20px" }}>
      You are in the ghostlist
    </div>
  ) : (
    <div style={{ fontFamily: "sans-serif", marginTop: "20px" }}>
      You are NOT in the ghostlist
    </div>
  );

  const totalMinted = (
    <div style={{ fontFamily: "sans-serif", marginTop: "20px" }}>
      Total minted: {tokensMinted}/6666
    </div>
  );

  return (
    <div className="minty">
      <Header mobile={props.mobile} playing={props.playing} toggle={props.toggle} muted={props.muted} toggleMuted={props.toggleMuted}/>

      {!props.mobile ? (
        <div>
          {" "}
          {informationText === "Not started" && (
            <Start
              tokensMinted={tokensMinted}
              inGhostlist={inGhostlist}
              mintHandler={mintHandler}
            />
          )}
          {informationText === "In progress" && <InProgress />}
          {informationText === "Mint successful" && <Successful />}
        </div>
      ) : (
        <div>
          {informationText === "Not started" && (
            <StartMobile
              tokensMinted={tokensMinted}
              inGhostlist={inGhostlist}
              mintHandler={mintHandler}
            />
          )}
          {informationText === "In progress" && <InProgressMobile />}
          {informationText === "Mint successful" && <SuccessfulMobile />}
        </div>
      )}
    </div>
  );
};

export default Mint;

/*
{/*<div style={{ fontFamily: "sans-serif", margin: "50px" }}>
      <div style={{ fontSize: "100px" }}>Mint Page</div>
      {totalMinted}
      {ghostlistStatus}
      {ghostTimer}
      <button
        onClick={mintHandler}
        style={{
          marginTop: "40px",
          backgroundColor: "lightblue",
          padding: "20px",
        }}
      >
        Mint
      </button>
      <div style={{ fontFamily: "sans-serif", marginTop: "20px" }}>
        {informationText}
      </div>
      </div>*/
