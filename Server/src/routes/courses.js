var { Router} = require('express');
const router = Router();

const CourseReport = require('../models/courseReport');
const Course = require('../models/course');
const EvaluationSystem = require('../models/evaluationSystem');


router.get('/gradesManager/courses/:id', async(req, res) => {
    const termReport_id = req.params.id;
    await CourseReport.find({termReport_id})
        .then(courses => {
            console.log(courses);
            res.json(courses)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/gradesManager/courses/add',async(req, res) => {
    const termReport_id = req.body.termReport_id;
    const course_code = req.body.course_code;
    let course = await Course.findOne({code: course_code});
    if(course === null) {
        res.status(404).json('Error: Course is not registered');
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
            console.log('Course added!');
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

router.delete('/gradesManager/courses/delete/:id', async(req, res) => {
    const _id = req.params.id;
    await CourseReport.findByIdAndDelete(_id)
        .then(() => res.json('Course deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/gradesManager/courses/update/testsGrade', async(req, res) => {
    const _id = req.body._id;
    const testsGrade = req.body.testsGrade;
    await CourseReport.findByIdAndUpdate({_id}, {$set: {testsGrade}})
        .then(() => res.json('Tests grade updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/gradesManager/courses/update/courseGrade', async(req, res) => {
    const _id = req.body._id;
    const courseGrade = req.body.courseGrade;
    await CourseReport.findByIdAndUpdate({_id}, {$set: {courseGrade}})
        .then(() => res.json('Course grade updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;