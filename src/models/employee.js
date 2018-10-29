const mongoose = require('mongoose');

const employee = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    designation:{
    	type: String,
    },
    country:{
    	type: String,
    },
    state:{
    	type: String,
    },
    city:{
    	type: String,
    },
});

module.exports = mongoose.model('Employee', employee);