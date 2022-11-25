const sequelize = require("../models/index");
const init_models = require("../models/init-models");
const model = init_models(sequelize);
const response = require("../config/response");

// get list
const getFood = async (req, res) => {
    try {
        let data = await model.food.findAll({
            include:["type"]
        });
        response.successCode(res, data, "thanh cong");
    } catch (error) {
        response.errorCode(res, "loi");
    }

}
//create
const createFood = async (req, res) => {
    try {
        let { food_name, image, price, desc, type_id } = req.body;
        let data = await model.food.create({
            food_name, image, price, desc, type_id
        })
        response.successCode(res, data, "create success!");
    } catch (error) {
        response.errorCode(res, "create fail");
    }
}




// update 
const updateFood = async (req, res) => {
    try {
        let { food_id } = req.params;
        let { food_name, image, price, desc, type_id } = req.body;
        let check = await model.food.findOne({
            where: { food_id }
        })
        console.log(food_id);
        if (check) {
            let data = await model.food.update({
                food_name, image, price, desc, type_id
            }, {
                where: {
                    food_id
                }
            });
           // res.send(data);
             response.successCode(res, data, "update success!");
        } else {
            response.errorCode(res, "update fail!");
        }
    } catch (error) {

    }
}

//delete
const deleteFood = async (req, res) =>{
    try {
         let {food_id} = req.params ;
        let check = await model.food.findOne({
            where:{food_id}
        })
        if (check) {
            let data = await model.food.destroy({
                where:{food_id}
             }) 
             response.successCode(res, data, "delete success!");
        } else {
            response.errorCode(res, "NOT FIND ID");
        }

    } catch (error) {
        response.errorCode(res, "detele fail");
    }
}


module.exports = { getFood, updateFood, createFood, deleteFood };