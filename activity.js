const axios = require("axios");

const stravaUrl = process.env.STRAVA_BASE_URL
const stravaAPIKey = process.env.STRAVA_KEY

//this file is any function that interacts with activity
const getLastActivity = async (req, res) => {
  const options = {
    method: "get",
    url: stravaUrl,
    headers: {
      Authorization: "Bearer " + stravaAPIKey,
    },
    params: {
      per_page: 1,
    },
  };

  let response = await axios(options);

  return res.status(200).json(response.data);
};

module.exports = {
  getLastActivity,
};
