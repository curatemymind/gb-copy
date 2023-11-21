

import { GoogleSpreadsheet } from "google-spreadsheet";

//const url = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"

const SPREADSHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

async function checkStatus() {
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
    var row = sheet.getRows();
    
    var correctAnswers = 0;
    var walletsThatAnswered = []

         await row.then((value) => {
          
         for(var i = 0; i < value.length; i++)
          {
            // eslint-disable-next-line
            walletsThatAnswered.push(String(value[i]['_rawData'][1]).toLowerCase())

            var res = String(value[i]['_rawData'][0]).toLowerCase()
            if(res === "the unknown" || res === "unknown" || res === "unkown" || res === "the unkown")
            {
              correctAnswers++;
            }
            //updateMyArray(myArray => [...myArray, String(value[i]['_rawData'][0])]);
          }
        })

        //console.log(correctAnswers)

    if(correctAnswers >= 200)
    {
      return {status: true, wallets: walletsThatAnswered}
    }
    else
    {
     // console.log(correctAnswers)
      return {status: false, wallets: walletsThatAnswered}
    }
    
  } catch (error) { 

    console.log(error.message)
    
    return {status: true, wallets: walletsThatAnswered} }
  // Print NFTs
  //console.log(nfts); // Return random lyrics
}

export default async (req, res) => { // this function will be launched when the API is called.
  try {
    const status = await checkStatus()
    res.send({"response": status.status, "walletsThatAnswered": status.wallets}) // send the lyrics
  } catch (err) {
    res.send(err) // send the thrown error
  }
}



//had to add type : module to package.json
//export default is the anatomy