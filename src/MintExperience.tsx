import React, { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import Countdown, {
  CountdownRendererFn,
  CountdownRenderProps,
} from "react-countdown";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { createClient, useAccount, useSigner, WagmiConfig } from "wagmi";
import _ from "lodash";
import { getDefaultProvider } from "ethers";
import ghostBoyContract from "./utilities/contracts/GhostBoy.sol/GhostBoy.json";

import { GhostBoy } from "./utilities/types";
import { ConnectKitProvider } from "connectkit";

import { ConnectKitButton, getDefaultClient } from "connectkit";
import { mainnet, goerli } from "wagmi/chains";


const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
const PRODUCTION = process.env.REACT_APP_ENV == "production";



const ghostBoyContractAddress =
  process.env.REACT_APP_GHOSTBOY_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

interface ComponentProps {}

const MintExperience: React.FC<ComponentProps> = (props: ComponentProps) => {
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
        resetState();
        break;
      case "failed":
        setInformationText("Mint failed");
        resetState();
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
    const whitelist = [
      "0xBb6f397d9d8bf128dDa607005397F539B43CD710",
      "0x90ac4c6EaFCAe524149F8B223E27118ff523E411",
    ].sort();
    return whitelist;
    try {
      const provider = getDefaultProvider();
      const response = await fetch(`/api/pullWhitelist`);
      const responseJson = await response.json();

      const communityWhitelist = responseJson.data.communityWhitelist;
      const partnerWhitelist = responseJson.data.partnerWhitelist;

      const concattedList: Array<string> =
        communityWhitelist.concat(partnerWhitelist);
      const uniqueList = _.uniq(concattedList);
      const resolvedList = _.compact(
        await Promise.all(
          uniqueList.map((name) => provider.resolveName(name).catch(() => null))
        )
      ) as string[];
      const sorted = _(resolvedList)
        .compact()
        .map(ethers.utils.getAddress)
        .uniq()
        .sort()
        .value();

      return sorted;
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
        console.log(receipt);
      } catch (e) {
        setMintStates("failed");
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

  const supportedChains = () => {
    if (PRODUCTION) {
      return [mainnet];
    } else {
      return [goerli];
    }
  };
  
  const wagmiClient = createClient(
    getDefaultClient({
      appName: "GhostBoy",
      alchemyId: ALCHEMY_API_KEY,
      chains: supportedChains(),
    })
  );

  return (
    <div>

<div className="bg-mint">
    <WagmiConfig client={wagmiClient}>
      <ConnectKitProvider>
     

     
     
  <ConnectKitButton/>
      </ConnectKitProvider>
    </WagmiConfig>
    </div>

    </div>
  );
};

export default MintExperience;
