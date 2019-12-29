const mongoose = require('mongoose')

const Itemschema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String }
})

module.exports = mongoose.model('Item', Itemschema)