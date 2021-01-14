const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evaluationSystemSchema = new Schema({
    code: {
        type: String,
        match: /[A-J]|[M-N]/,
        required: true
    },
    testsWeight: Number,
    midtermWeight: Number,
    finalWeight: Number
});

module.exports = mongoose.model('evaluationSystem', evaluationSystemSchema);