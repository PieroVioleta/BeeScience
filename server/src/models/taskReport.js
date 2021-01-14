const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskReportSchema= new Schema({
    user_id: String,
    initialDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model('taskReport', taskReportSchema);