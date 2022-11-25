const express = require('express');
const rootRoute = express.Router();
const userRoute = require('./userRoute');
const foodTypeRoute = require('./foodTypeRoute');
const foodRoute = require('./foodRoute');
const { verifyToken } = require('../middlewares/baseToken');

rootRoute.use("/user",verifyToken, userRoute);
rootRoute.use("/food", foodTypeRoute);
rootRoute.use("/food",foodRoute);

module.exports = rootRoute;