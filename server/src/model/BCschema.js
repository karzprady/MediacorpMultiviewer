const mongoose = require('mongoose');

const BCschema = new mongoose.Schema({
    Title :{
        type: String,
        required: true
    },
    VideoEntity :{
        type: String,
        required: true
    }}, {timestamps: true})

const BCmodel = mongoose.model('BCSchema', BCschema);

module.exports = BCmodel;
