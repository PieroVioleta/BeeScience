const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grade = {
    evaluationName: String,
    grade: Number,
    isRemovable: {
        type: Boolean,
        default: true
    }
}

const System = {
    testsWeight: Number,
    midtermWeight: Number,
    finalWeight: Number
}

const courseReportSchema = new Schema({
    termReport_id: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    course_weight: {
        type: Number,
        required: true
    },
    numberQuizzes: {
        type: Number,
        required: true
    },
    numberLabs: {
        type: Number,
        required: true
    },
    removableQuizzes: {
        type: Number,
        required: true
    },
    removableLabs: {
        type: Number,
        required: true
    },
    evaluationSystem: {
        type: System,
        required: true
    },
    quizzes: {
        type: [Grade],
        default: []
    },
    labs: {
        type: [Grade],
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
        type: Grade,
        default: null
    },
    finalGrade: {
        type: Grade,
        default: null
    },
    makeUpGrade: {
        type: Grade,
        default: null
    }
});

module.exports = mongoose.model('courseReport', courseReportSchema);