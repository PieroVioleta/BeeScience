const {Schema, model} = require('mongoose');

const fileSchema = new Schema({
    course_code: { type: String },
    type_exam: { type:String },
    year: { type:String },
    filename: { type: String},
    path: { type: String},
    originalname: { type: String},
    mimetype: { type: String},
    size: { type: Number},
    created_at: { type: Date, default: Date.now()}
});

module.exports = model('File', fileSchema);