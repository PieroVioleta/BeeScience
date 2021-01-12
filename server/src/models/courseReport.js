const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grade = {
    evaluationName: String,
    grade: Number,
    isRemovable: {
        type: Boolean,
        default: true
    }
}

const system = {
    testsWeight: Number,
    midtermWeight: Number,
    finalWeight: Number
}

const courseReportSchema = new Schema({
    termReport_id: String,
    course_code: String,
    course_name: String,
    course_weight: Number,
    numberQuizzes: Number,
    numberLabs: Number,
    removableQuizzes: Number,
    removableLabs: Number,
    evaluationSystem: system,
    quizzes: {
        type: [grade],
        default: []
    },
    labs: {
        type: [grade],
        default: []
    },
    courseGrade: {
        type: Number,
        default: 0
    },
    testsGrade: {
        type: Number,
        default: 0
    },
    midtermGrade: {
        type: grade,
        default: null
    },
    finalGrade: {
        type: grade,
        default: null
    },
    makeUpGrade: {
        type: grade,
        default: null
    }
});

module.exports = mongoose.model('courseReport', courseReportSchema);