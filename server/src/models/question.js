const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = {
    textComment: String,
    author: String
}

const question = new Schema({
    user_id: String,
    userName: String,
    questionText: String,
    comments: {
        type: [comment],
        default: []
    } 
});

module.exports = mongoose.model('question', question);