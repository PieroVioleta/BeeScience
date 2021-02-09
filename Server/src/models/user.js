const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    userName: String,
    email: String,
    password: String
});

module.exports = mongoose.model('user', user);