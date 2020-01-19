const mongoose = require('mongoose');;

const newOne = new mongoose.Schema({
    webUrl: { type: String },
    cssLinks: [],
    jsLinks: []
})
module.exports = new mongoose.model('webdevtest', newOne);