module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/Honour', {
        useNewUrlParser: true,
        useFindAndModify: false
    })

    require('require-all')(__dirname + '/../models')
}