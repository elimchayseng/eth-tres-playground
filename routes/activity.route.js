const express = require('express')
const axios = require("axios");
const router = express.Router()

const stravaUrl = process.env.STRAVA_BASE_URL
const stravaAPIKey = process.env.STRAVA_KEY

router.get('/', async (req, res) => {
    const activities = await getLastActivity(req, res)
    res.render('activities/activity', {
        activityName: activities[0].name,
        activityType: activities[0].type
    })
})


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

    if (response.status == 200) {
        return response.data
    }

    return []
}


module.exports = router;
