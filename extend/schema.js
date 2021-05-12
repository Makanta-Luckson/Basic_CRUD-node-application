const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Pizza_schema = new Schema({
    name : {
        type : String,
        required : true
    },
    ingridients : {
        type : String,
        required : true
    }
}, {timestamps : true});

const Pizza_model = mongoose.model('pizza', Pizza_schema);
module.exports = Pizza_model;