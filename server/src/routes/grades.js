const router = require('express').Router();
const CourseReport = require('../models/courseReport');

//Parametros: Id del reporte del curso al cual se le quiere agregar una nota de evaluacion y el objeto Grade que representa la nota (nombre de la evaluacion, nota, si es eliminable)
//Devuelve: -
router.post('/add/:id', async(req, res) => {
    const _id = req.params.id;   //Id del reporte del curso
    const newGrade = req.body.newGrade;
    let evaluationType= newGrade.evaluationName.substr(0, 2);

    switch(evaluationType) {
        case "PC":
            await CourseReport.updateOne({_id}, {$addToSet: {quizzes: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "LA":
            await CourseReport.updateOne({_id}, {$addToSet: {labs: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "EP":
            await CourseReport.updateOne({_id}, {$set: {midtermGrade: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "EF":
            await CourseReport.updateOne({_id}, {$set: {finalGrade: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "ES":
            await CourseReport.updateOne({_id}, {$set: {makeUpGrade: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
    }
});

//Parametros: Id del reporte del curso al cual se le quiere quitar una nota y el nombre de la evaluación que se desea eliminar
//Devuelve: -
router.post('/delete/:id', async(req, res) => {
    const _id = req.params.id;   //Id del reporte del curso
    const evaluationName = req.body.evaluationName;
    const evaluationType = evaluationName.substr(0, 2);

    switch(evaluationType) {
        case "PC":
            await CourseReport.updateOne({_id}, {$pull: {quizzes: {evaluationName}}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "LA":
            await CourseReport.updateOne({_id}, {$pull: {labs: {evaluationName}}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "EP":
            await CourseReport.updateOne({_id}, {$set: {midtermGrade: null}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "EF":
            await CourseReport.updateOne({_id}, {$set: {finalGrade: null}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "ES":
            await CourseReport.updateOne({_id}, {$set: {makeUpGrade: null}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
    }
});

module.exports = router;