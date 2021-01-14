const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
    },
    numberQuizzes: {
        type: Number,
        default: 6
    },
    numberLabs: {
        type: Number,
        default: 0
    },
    removableQuizzes: {
        type: Number,
        default: 0
    },
    removableLabs: {
        type: Number,
        default: 0
    },
    evaluationSystemCode: {
        type: String,
        match: /[A-J]|[M-N]/,
        required: true
    }
});

module.exports = mongoose.model('course', courseSchema);


// {
//     name: "Desarrollo de Software",
//     code: "CC344",
//     weight: 4,
//     numberQuizzes: 5,
//     numberLabs: 0,
//     removableQuizzes: 1,
//     removableLabs: 0,
//     evaluationSystemCode: "G"
// }