const {Sequelize} = require('sequelize');
const config =  require('../config/index');


const sequelize = new Sequelize(
    config.db_name, config.db_user, config.db_pass, {
    host: config.db_host,
    dialect: config.db_dialect,
    port: config.db_port,
})

module.exports = sequelize;

// tạo model bằng lệnh: npx sequelize-auto -h localhost -d db_food -u root -x 1234 -p 3306 --dialect mysql -o ./src/models -l es6