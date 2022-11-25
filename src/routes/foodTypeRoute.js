const {application} = require("express");
const express = require("express");

const foodTypeRoute = express.Router();

const {getFoodType ,createFoodType, updateFoodType, removeFoodType} = require("../controllers/foodTypeController");

// get foodType
foodTypeRoute.get("/getFoodType", getFoodType);

// post foodType
foodTypeRoute.post("/createFoodType", createFoodType);

// put foodType
foodTypeRoute.put("/updateFoodType/:type_id", updateFoodType);
// delete foodType
foodTypeRoute.delete("/removeFoodType/:type_id", removeFoodType);

module.exports = foodTypeRoute;