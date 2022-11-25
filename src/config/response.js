// định nghĩa status - thông báo lỗi

// 200, 400, 500

const response = {
    //200
    successCode: (res, data, message) => {
        res.status(200).json({
            message,
            content: data
        })
    },

    //400
    failCode: (res, data, message) => {
        res.status(400).json({
            message,
            content: data
        })
    },

    //500
    errorCode: (res, message) => {
        res.status(500).send(message);
    }
}

module.exports = response;