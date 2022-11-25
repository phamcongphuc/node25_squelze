// tạo ra các API trong các đối tượng Route
const { application } = require("express");
const express = require('express');
const userRoute = express.Router();
const { getUser,
    createUser,
    updateUser,
    deleteUser,
    uploadUser, signUp, login } = require('../controllers/userController');
const { upload } = require('../middlewares/upload');
const { checkToken, verifyToken } = require('../middlewares/baseToken');

// upload base64
userRoute.post("/upload_base", upload.single("dataUpload"), uploadUser);

// post image upload.single upload 1 file, array nhieu file
userRoute.post("/upload", upload.single("dataUpload"), (req, res) => {
    console.log(req.file); // lưu database
    // lưu req.file.filename 
});

// GET user 
userRoute.get("/getUser", verifyToken, getUser);
//post create user
userRoute.post("/createUser", verifyToken, createUser);
// put update user
userRoute.put("/updateUser/:user_id",verifyToken, updateUser);
// delete user 
userRoute.delete("/deleteUser/:user_id", deleteUser);

// sign up
userRoute.post("/signUp", signUp);
userRoute.get("/login", login);

module.exports = userRoute;