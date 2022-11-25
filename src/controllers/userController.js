// const User = require('../models/user');
// const Food = require('../models/food');
// const food_type = require('../models/food_type');

const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const response = require("../config/response");
const fs = require('fs');
const { parseToken } = require('../middlewares/baseToken');
// các hàm xử lý chức năng BE trong controller

// get
const getUser = async (req, res) => {
    try {
        let data = await model.user.findAll();
        // res.send(data);
        response.successCode(res, data, "show success!");
    } catch (error) {
        errorCode(res, "loi khong ket noi!")
    }
}

// post
const createUser = async (req, res) => {
    try {
        let { full_name, email, passWord } = req.body;
        // Trả về danh sách []
        let checkEmail = await model.user.findAll({
            where: {
                email
            }
        })
        // trả về object
        let checkEmailOject = await model.user.findOne({
            where: {
                email
            }
        })
        if (checkEmail.length > 0) {
            res.send("email đã tồn tại");
        } else {
            let result = await model.user.create({
                full_name,
                email,
                passWord
            });
            console.log(result);
            res.send(result);
        }

    } catch (err) {
        res.status(500).send(err.errors[0].message);
        console.log("loi");
    }
}

// put update
const updateUser = async (req, res) => {
    try {
        let { user_id } = req.params;

        let { full_name, email, passWord } = req.body;

        // trả về object
        let checkUser = await model.user.findOne({
            where: {
                user_id
            }
        })
        if (checkUser) {
            let result = await model.user.update({
                full_name,
                email,
                passWord
            }, {
                where: {
                    user_id
                }
            });
            res.send(result);
        } else {
            res.send("user không tồn tại");
        }

    } catch (err) {
        res.status(500).send(err.errors[0].message);
        console.log("loi");
    }
}

// delete
const deleteUser = async (req, res) => {
    try {
        let { user_id } = req.params;

        let { full_name, email, passWord } = req.body;

        // trả về object
        let checkUser = await model.user.findOne({
            where: {
                user_id
            }
        })
        if (checkUser) {
            let result = await model.user.destroy({
                where: {
                    user_id
                }
            });
            res.send("xoa thanh cong");
        } else {
            res.send("user không tồn tại");
        }

    } catch (err) {
        //res.status(500).send(err.errors[0].message);
        console.log("loi");
    }
}


// upload user
const uploadUser = async (req, res) => {
    if (req.file.size >= 400000) {
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send("quá dung lượng 4MB");
        return;
    }

    if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg") {
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send("Sai định dạng");
    }
    fs.readFile(process.cwd() + "/public/img/" + req.file.filename, (err, data) => {
        let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
        // lưu xuống database

        // xử lý xóa file 
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send(dataBase);
    })
}

const bcrypt = require("bcrypt");
// signUp
const signUp = async (req, res) => {
    try {
        let { full_name, email, pass_word } = req.body;
        // mã hóa pass
        let passWordHash = bcrypt.hashSync(pass_word, 10);
        let checkEmail = await model.user.findOne({
            where: {
                email
            }
        })
        if (checkEmail) {
            response.failCode(res, "", "Email đã tồn tại");
        } else {
            let data = await model.user.create({
                full_name,
                email,
                pass_word: passWordHash
            });
            response.successCode(res, data, "đăng ký thành công");
        }

    } catch (error) {
        response.errorCode(res, "lỗi backend");
    }

}

// login
const login = async (req, res) => {
    try {
        let { email, pass_word } = req.body;
        let checkLogin = await model.user.findOne({
            where: {
                email
            }
        })
        if (checkLogin) {
            let checkPass = bcrypt.compareSync(
                pass_word,
                checkLogin.pass_word
            );
            //true ==> khớp
            if (checkPass) {
                response.successCode(res, parseToken(checkLogin), "Login thành công");
            } else {
                response.failCode(res, "", "mật khẩu sai");
            }
        } else {
            response.failCode(res, "", "Email sai");
        }

    } catch (error) {
        response.errorCode(res, "lỗi back-end");
    }


}


// commonjs module
module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    uploadUser,
    signUp, login
}