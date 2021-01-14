const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const termReportSchema = new Schema({
    user_id: String,
    termCode: {
        type: String,
        required: true
    },
    termGrade: {
        type: Number,
        default: 0.000
    }
});

module.exports = mongoose.model('termReport', termReportSchema);