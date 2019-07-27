module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost/Hok', {
        useNewUrlParser:true
    })
}