import { ethers, BigNumber } from "ethers";
import fetch from "node-fetch";

export default async (req, res) => {
  try {
    const result = await fetch(
      "https://ghost-boy.s3.us-east-2.amazonaws.com/GhostBoy.json"
    );
    const ghostBoy = await result.json();

    const PRIVATE_KEY = process.env.READONLY_PRIVATE_KEY;
    const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY;
    const CONTRACT_ADDRESS = process.env.REACT_APP_GHOSTBOY_CONTRACT_ADDRESS;
    const network = process.env.NETWORK;

    const provider = new ethers.providers.AlchemyProvider(
      network,
      ALCHEMY_API_KEY
    );

    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const gb_contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ghostBoy.abi,
      signer
    );

    const root = await gb_contract.ghostlistRoot();
    const shortenedRoot = root.slice(0, 10);

    let whitelist = [];
    if (req.query.latest) {
      const response = await fetch(
        "https://ghost-boy.s3.us-east-2.amazonaws.com/latest.json"
      );
      whitelist = await response.json();
    } else {
      const response = await fetch(
        "https://ghost-boy.s3.us-east-2.amazonaws.com/" +
          shortenedRoot +
          ".json"
      );
      whitelist = await response.json();
    }

    const data = {
      success: true,
      data: {
        communityWhitelist: whitelist,
        partnerWhitelist: [],
      },
    };
    res.send(data);
  } catch (err) {
    res.send(err); // send the thrown error
  }
};
