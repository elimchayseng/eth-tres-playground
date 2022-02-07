const express = require('express');
const activityRoute = require('./activity.route');
const articlesRoute = require('./articles.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/activity',
        route: activityRoute,
    },
    {
        path: '/articles',
        route: articlesRoute,
    },
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;