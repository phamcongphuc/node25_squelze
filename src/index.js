require('dotenv').config();
const express = require('express');
const app  = express();
// middel ware chuyển data json từ FE xuống express
app.use(express.json());
// định nghĩa lại url để sử dụng tài nguyên
app.use(express.static("./public"));
const cors= require('cors');
app.use(cors());

// domain
app.listen(8080);



// const mysql = require('mysql2');
// //kết nối CSDL
// const conn = mysql.createConnection({
//    host:"localhost",
//    user: "root",
//     password: "1234",
//     database:"phuc", // doi lai
//     port: 3306
// })

const rootRoute = require('./routes');
app.use('/api', rootRoute);


// truy vấn dữ liệu
//app.get("/getUser")

// tim user
app.get("/search/:ten", (req, res) =>{
    let {ten} = req.params;
    conn.query(`SELECt * from users where first_name like '%${ten}'`, (err, result) =>{
        res.send(result);
    })
})


// 200 thành công
// 400 lỗi FE hoặc BE
// 401 lỗi phân quyền
// 500 lỗi BE

// tạo API GET, path
// app.get("/ping/:id", (req, res) =>{
//     try {
//         //query
//         //let {hoTen, lopHoc} = req.query;

//         // params
//         let {id} = req.params;

//         // body
//         console.log(req.body);
//         let {hoTen, lopHoc} = req.body;

//         // gửi giá trị BE -> FE
//         res.send(id, hoTen, lopHoc);
//     } catch{
//         res.status(500).send("có lỗi");
//     }
// })

// app.get("/getUser", (req, res) =>{
//     conn.query("SELECT * from users where da_xoa = 0", (err, result) =>{
//         res.send(result);
//         // console.log(result);
//     })
// })