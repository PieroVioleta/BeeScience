const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const question = new Schema({
    user_id: String,
    questionText: String,
    comments: {
        type: [],
        default: []
    } 
});

module.exports = mongoose.model('question', question);