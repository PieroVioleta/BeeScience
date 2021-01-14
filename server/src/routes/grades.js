const router = require('express').Router();
const CourseReport = require('../models/courseReport');

router.post('/gradesManager/grades/add', async(req, res) => {
    const _id = req.body._id;   //Id del reporte del curso
    const newGrade = req.body.newGrade;
    let evaluationName = newGrade.evaluationName.substr(0, 2);

    switch(evaluationName) {
        case "PC":
            await CourseReport.findByIdAndUpdate({_id}, {$addToSet: {quizzes: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "LA":
            await CourseReport.findByIdAndUpdate({_id}, {$addToSet: {labs: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "EP":
            await CourseReport.findByIdAndUpdate({_id}, {$set: {midtermGrade: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "EF":
            await CourseReport.findByIdAndUpdate({_id}, {$set: {finalGrade: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "ES":
            await CourseReport.findByIdAndUpdate({_id}, {$set: {makeUpGrade: newGrade}})
                .then(() => res.json('Grade added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
    }
});

router.delete('/gradesManager/grades/delete', async(req, res) => {
    const _id = req.body._id;   //Id del reporte del curso
    const evaluationName = req.body.evaluationName.substr(0, 2);

    switch(evaluationName) {
        case "PC":
            await CourseReport.findByIdAndUpdate({_id}, {$pull: {quizzes: {evaluationName}}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "LA":
            await CourseReport.findByIdAndUpdate({_id}, {$pull: {labs: {evaluationName}}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "EP":
            await CourseReport.findByIdAndUpdate({_id}, {$set: {midtermGrade: null}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "EF":
            await CourseReport.findByIdAndUpdate({_id}, {$set: {finalGrade: null}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
        case "ES":
            await CourseReport.findByIdAndUpdate({_id}, {$set: {makeUpGrade: null}})
                .then(() => res.json('Grade removed!'))
                .catch(err => res.status(400).json('Error: ' + err));
            break;
    }
});

module.exports = router;