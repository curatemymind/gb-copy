import { Configuration, OpenAIApi } from "openai"

export default async (req, res) => {
  try {

    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImageEdit(
      fs.createReadStream("otter.png"),
      fs.createReadStream("mask.png"),
      "A cute baby sea otter wearing a beret",
      2,
      "1024x1024"
    );
        
    const data = {
      success: true,
      
    };
    res.send(data);
  } catch (err) {
    res.send(err); // send the thrown error
  }
};
