const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const response = require("../config/response");

// get
const getFoodType = async (req, res) => {
    try {
        let data = await model.food_type.findAll();
        response.successCode(res, data, "get success!");
    } catch (err) {
        response.errorCode(res, "loi ket loi");
    }
}
// post
const createFoodType = async (req, res) => {
    try {
        let { type_id, type_name } = req.body;
        let result = await model.food_type.create({
            type_name
        })
        res.send(result);
        console.log("create success");
    } catch (err) {
        console.log(err);
    }
}

// put
const updateFoodType = async (req, res) => {
    try {
        let { type_id } = req.params;
        let { type_name } = req.body;

        let check = await model.food_type.findOne({
            where: { type_id }
        })
        if (check) {
            let result = await model.food_type.update({
                type_name
            }, {
                where: {
                    type_id
                }
            });
            res.send(result);
        } else {
            console.log('khong tin id')
        }
    } catch (error) {
        console.log("update fail");
    }
}

// remove
const removeFoodType = async (req, res) => {
    try {
        let { type_id } = req.params;
        let { type_name } = req.body;

        let check = await model.food_type.findOne({
            where: { type_id }
        })

        if (check) {
            let result = await model.food_type.destroy({
                where: {
                    type_id
                }
            });
            res.send('xoa thanh cong');
        } else {
            console.log('khong tim id')
        }
    } catch (error) {
        console.log("delete fail");
    }
}


module.exports = { getFoodType, createFoodType, updateFoodType, removeFoodType };