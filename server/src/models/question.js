const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const question = new Schema({
    questionText: String,
    comments: {
        type: [],
        default: []
    } 
});

module.exports = mongoose.model('question', question);