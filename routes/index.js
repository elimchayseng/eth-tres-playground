const express = require('express');
const activityRoute = require('./activity.route');
const articlesRoute = require('./articles.route');
const homeRoute = require('./home.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/',
        route: homeRoute,
    },
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