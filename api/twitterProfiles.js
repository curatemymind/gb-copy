const axios = require('axios');

module.exports = async (req, res) => {
  const { screen_name } = req.query;
  const url = `https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev`;
 // https://api.twitter.com/1.1/users/show.json?screen_name=twitterdev

  const headers = {
    'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
  };

  try {
    console.log("hello")
    const response = await axios.get(url, { headers });
    //const { profile_image_url_https } = response.data;
    //const profileImageUrl = profile_image_url_https.replace('_normal', '');
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
