const mongoose = require('mongoose');

const YTschema = new mongoose.Schema({
    Title :{
        type: String,
        required: true
    },
    VideoEntity :{
        type: String,
        required: true
    }}, {timestamps: true})

const YTmodel = mongoose.model('YTschema', YTschema);

module.exports = YTmodel;
