var { Router} = require('express');
const router = Router();

const CourseReport = require('../models/courseReport');
const Course = require('../models/course');
const EvaluationSystem = require('../models/evaluationSystem');

//Parametros: Id del reporte de ciclo
//Devuelve: Los reportes de cursos que pertenecen al reporte del ciclo
router.get('/:id', async(req, res) => {
    const termReport_id = req.params.id;
    await CourseReport.find({termReport_id})
        .then(courses => {
            res.json(courses)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Parametros: Id del reporte del ciclo y codigo del curso que se desea agregar
//Devuelve: El documento creado correspondiente al nuevo reporte del curso
router.post('/add', async(req, res) => {
    const termReport_id = req.body.termReport_id;
    const course_code = req.body.course_code;
    let course = await Course.findOne({code: course_code});
    if(course === null) {
        res.json(null);
        return;
    }
    let evaluationSystem = await EvaluationSystem.findOne({code: course.evaluationSystemCode}, "testsWeight midtermWeight finalWeight")

    const newCourseReport = new CourseReport({
        termReport_id,
        course_code,
        course_name: course.name,
        course_weight: course.weight,
        numberQuizzes: course.numberQuizzes,
        numberLabs: course.numberLabs,
        removableQuizzes: course.removableQuizzes,
        removableLabs: course.removableLabs,
        evaluationSystem: evaluationSystem
    });

    await newCourseReport.save()
        .then(() => {
            res.json(newCourseReport);
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

//Parametros: Id del curso que se desea eliminar
//Devuelve: -
router.delete('/delete/:id', async(req, res) => {
    const _id = req.params.id;
    await CourseReport.findByIdAndDelete(_id)
        .then(() => res.json('Course deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//Parametros: Id del reporte del curso al que se le quiere actualizar el promedio de prácticas y la nota del promedio de practicas
//Devuelve: -
router.post('/update/testsGrade', async(req, res) => {
    const _id = req.body._id;
    const testsGrade = req.body.testsGrade;
    await CourseReport.updateOne({_id}, {$set: {testsGrade}})
        .then(() => res.json('Tests grade updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Parametros: Id del reporte del curso al que se le quiere actualizar la nota final y la nota final
//Devuelve: -
router.post('/update/courseGrade', async(req, res) => {
    const _id = req.body._id;
    const courseGrade = req.body.courseGrade;
    await CourseReport.updateOne({_id}, {$set: {courseGrade}})
        .then(() => res.json('Course grade updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;