
import aws from "aws-sdk";
import bodyParser from 'body-parser';
import multer from "multer"

const currentDate = new Date(); 
const timestamp = currentDate. getTime();



const accessKey = process.env.OUR_AWS_ACCESS_KEY;
const secretAccessKey = process.env.OUR_AWS_SECRET_ACCESS_KEY;

const configuration = {
  apiVersion: "2006-03-01",
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
};

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: 'file', maxCount: 1 },
  { name: 'username', maxCount: 1 }
]);
;

export default async (req, res) => {
  try {
    const s3 = new aws.S3(configuration);

    var okay = null;

    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.status(400).send('Error uploading file');
      } else {

        //console.log(req.file); // log the uploaded file
        var s3Params = null;

        if(req.body.file !== "")
        {
         s3Params = {
          Bucket: "gb-collective-submissions",
          Key: timestamp + "_" + req.files.file[0].originalname,
          Body: req.files.file[0].buffer,
          ACL: "public-read",
          Metadata: {
            username: req.body.username,
            wallet: req.body.wallet,
            link: req.body.link,

          }
          
        };
      }
      else {

        s3Params = {
          Bucket: "gb-collective-submissions",
          Key: timestamp + "_" + "noFile",
          Body: "check metadata",
          ACL: "public-read",
          Metadata: {
            username: req.body.username,
            wallet: req.body.wallet,
            link: req.body.link,

          }
          
        };

      }

        s3.upload(s3Params, (err, data) => {
          if (err) {
              //console.log(err);
              res.send({"successful": false});
          } else {
              //console.log(`File uploaded successfully. ${data.Location}`);
              res.send({"successful": true});
          }
      });
      }


  
    });
  } catch (err) {
    console.log(err)
    res.send(err); // send the thrown error
  }
};