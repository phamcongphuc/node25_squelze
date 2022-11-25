const {application} = require("express");
const express = require('express');
const foodRoute = express.Router();

const {getFood, createFood, updateFood, deleteFood}  = require("../controllers/FoodController");

foodRoute.get("/getFood", getFood);
foodRoute.post("/createFood", createFood);
foodRoute.put("/updateFood/:food_id", updateFood);
foodRoute.delete("/deleteFood/:food_id", deleteFood);
module.exports = foodRoute;