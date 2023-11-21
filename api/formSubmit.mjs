

import { GoogleSpreadsheet } from "google-spreadsheet";

//const url = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"

const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

async function submitAnswers(answer, wallet) {
  // Check if 0xshah.eth owns a Bored Ape.
  //console.log(answer)
  //console.log(wallet)
  //console.log(process.env.REACT_APP_INFURA_API_KEY)

  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    // loads document properties and worksheets-
    await doc.loadInfo();

    var sheet = doc.sheetsById["0"];

    //console.log(sheet)

    try {
      /*await sheet.addRows([
        { Answer: answer,  Wallet: wallet}])*/
    } catch (e) {
      console.log(e)
    }
    

   
    return true
    
  } catch (error) { 
    
    return false }
  // Print NFTs
  //console.log(nfts); // Return random lyrics
}

export default async (req, res) => { // this function will be launched when the API is called.
  try {
    const status = await submitAnswers(req.query.answer, req.query.wallet)
    res.send({"response": status}) // send the lyrics
  } catch (err) {
    res.send(err) // send the thrown error
  }
}



//had to add type : module to package.json
//export default is the anatomy