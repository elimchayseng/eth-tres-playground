const express = require('express')
const axios = require("axios");
const router = express.Router()

const stravaUrl = process.env.STRAVA_BASE_URL
const stravaAPIKey = process.env.STRAVA_KEY

router.get('/', async (req, res) => {
    const activity = await getLastActivity()
    res.render('activities/activity', { activity: activity })
})


function getLastActivity() {
    return async (req, res) => {
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
    }
}

module.exports = router;
