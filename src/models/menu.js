const mongoose = require('mongoose');

const menu = new mongoose.Schema({
    title: {
        type: String,
    }
});

module.exports = mongoose.model('Menu', menu);