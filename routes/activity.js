const express = require('express')
const axios = require("axios");
const router = express.Router()

const stravaUrl = process.env.STRAVA_BASE_URL
const stravaAPIKey = process.env.STRAVA_KEY

router.get('activities/activity', async (req, res) => {
  const activity = await getLastActivity()
  res.render('/activity', {activity: activity}) 
})


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

module.exports = router;
