const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const escuelas = new Schema({
    user_id: String,
    escuela: String,
    ciclo: String,
    courses: {
        course: {
            codigo: String,
            materia: String,
        }
    } 
});

module.exports = mongoose.model('escuelas', escuelas);