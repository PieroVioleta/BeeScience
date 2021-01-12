const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const URI = "mongodb+srv://cooper73:BeeScience@cluster0.ma4no.mongodb.net/BeeScience?retryWrites=true&w=majority";

// Connection to db
mongoose.connect(URI)
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));

// Importing routes
// const indexRoutes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 8080);

// Routes
// app.use('/', indexRoutes);

// Starting the server
server.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));
const TermReport = require('./models/termReport');
const CourseReport = require('./models/courseReport');
const Course = require('./models/course');
const EvaluationSystem = require('./models/evaluationSystem');

let user_id = "";
let terms = [];
let courses = [];
let currentTerm = null;


//REcibe el id del usuario mandado desde el front
io.use(async (socket, next) => {
    var handshakeData = socket.request;
    user_id = handshakeData._query['user_id'];
    // console.log("user_id:", user_id);
    terms = await TermReport.find({user_id: user_id});
    next();
});


// Starting socket.io
io.on('connection', socket => {
    // console.log('Alguien se ha conectado con sockets');
    socket.emit('getTerms', {termsData: terms, currentTerm: currentTerm});
    socket.emit('getCourses', courses);
    // socket.emit('getReports', reports);

    // socket.on('renderGradesManager', () => {});
    socket.on('postTerm', postTerm);
    socket.on('setCurrentTerm', setCurrentTerm);
    socket.on('deleteTerm', deleteTerm);
    socket.on('postCourse', postCourse);
    socket.on('deleteCourse', deleteCourse);
    socket.on('postGrade', postGrade);
    // socket.on('updateGrade', () => {});
    socket.on('removeGrade', removeGrade);
});

const postTerm = async (data) => {
    const termReport = new TermReport(data);
    currentTerm = termReport;
    await termReport.save();
    terms = await TermReport.find({user_id: user_id});
    io.sockets.emit('getTerms', {termsData: terms, currentTerm: currentTerm});
    courses = await CourseReport.find({termReport_id: currentTerm._id});
    io.sockets.emit('getCourses', courses);
}

const deleteTerm = async (term_id) => {
    await TermReport.remove({_id: term_id});
    terms = await TermReport.find({user_id: user_id});
    currentTerm = (terms.length === 0) ? null : terms[0];
    io.sockets.emit('getTerms', {termsData: terms, currentTerm: currentTerm});
    courses = await CourseReport.find({termReport_id: currentTerm._id});
    io.sockets.emit('getCourses', courses);
}

const setCurrentTerm = async (term_id) => {
    if(term_id === "" || term_id === undefined) {
        currentTerm = null;
        return;
    }
    currentTerm = await TermReport.find({_id: term_id});
    currentTerm = currentTerm[0];
    courses = await CourseReport.find({termReport_id: term_id});
    io.sockets.emit('getCourses', courses);
}

const postCourse = async (data) => {
    let course = await Course.findOne({code: data.course_code});
    if(course === null) {
        io.sockets.emit('courseNotFound', data.course_code);
        return;
    }
    let evaluationSystem = await EvaluationSystem.findOne({code: course.evaluationSystemCode}, "testsWeight midtermWeight finalWeight")
    data = {
        ...data,
        course_name: course.name,
        course_weight: course.weight,
        numberQuizzes: course.numberQuizzes,
        numberLabs: course.numberLabs,
        removableQuizzes: course.removableQuizzes,
        removableLabs: course.removableLabs,
        evaluationSystem: evaluationSystem
    }
    const courseReport = new CourseReport(data);
    await courseReport.save();
    console.log(courseReport);
    courses.push(courseReport);
    calculateTermGrade();
    updateTerm();
}

const deleteCourse = async (course_id) => {
    await CourseReport.remove({_id: course_id});
    courses = await CourseReport.find({termReport_id: currentTerm._id})
    calculateTermGrade();
    updateTerm();
}

const updateTerm = async () => {
    let termGrade = currentTerm.termGrade;
    await TermReport.updateOne({_id: currentTerm._id}, {$set: {termGrade: termGrade}});
    courses = await CourseReport.find({termReport_id: currentTerm._id})
    io.sockets.emit('getTerms', {termsData: terms, currentTerm: currentTerm});
    io.sockets.emit('getCourses', courses);
}

const postGrade = async (data) => {
    let course_code = data.course_code;
    let newGrade = data.newGrade;
    let type = newGrade.evaluationName.substr(0, 2);
    let idx_course;
    for(let i = 0; i < courses.length; i++) {
        if(courses[i].course_code === course_code)  idx_course = i;
    }
    let courseReport = courses[idx_course];
    // let courseReport = await CourseReport.findOne({termReport_id: currentTerm._id, course_code: course_code});
    let flag = false; //Flag to determine if quizzesGrades should be updated or not
    switch(type) {
        case "PC":
            let newQuizzes = courseReport.quizzes;
            newQuizzes = newQuizzes.concat(newGrade);
            courses[idx_course].quizzes = newQuizzes;
            flag = true;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {quizzes: newQuizzes}});
            break;
        case "LA":
            let newLabs = courseReport.labs;
            newLabs = newLabs.concat(newGrade);
            courses[idx_course].labs = newLabs;
            flag = true;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {labs: newLabs}});
            break;
        case "EP":
            courses[idx_course].midtermGrade = newGrade;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {midtermGrade: newGrade}});
            break;
        case "EF":
            courses[idx_course].finalGrade = newGrade;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {finalGrade: newGrade}});
            break;
        case "ES":
            courses[idx_course].makeUpGrade = newGrade;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {makeUpGrade: newGrade}});
            break;
    }
    if(flag === true)   calculateTestsGrade(courseReport);
    calculateCourseGrade(courseReport);
    calculateTermGrade();
    updateCourses(course_code);    
}

const removeGrade = async (data) => {
    let course_code = data.course_code;
    let grade = data.grade;
    let type = grade.evaluationName.substr(0, 2);
    let idx_course;
    for(let i = 0; i < courses.length; i++) {
        if(courses[i].course_code === course_code)  idx_course = i;
    }
    let courseReport = courses[idx_course];
    // let courseReport = await CourseReport.findOne({termReport_id: currentTerm._id, course_code: course_code});
    let flag = false; //Flag to determine if quizzesGrades should be updated or not
    switch(type) {
        case "PC":
            let newQuizzes = courseReport.quizzes;
            newQuizzes = newQuizzes.filter(quiz => quiz.evaluationName !== grade.evaluationName);
            flag = true;
            courses[idx_course].quizzes = newQuizzes;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {quizzes: newQuizzes}});
            break;
        case "LA":
            let newLabs = courseReport.labs;
            newLabs = newLabs.filter(lab => lab.evaluationName !== grade.evaluationName);
            flag = true;
            courses[idx_course].labs = newLabs;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {labs: newLabs}});
            break;
        case "EP":
            courses[idx_course].midTermGrade = null;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {midtermGrade: null}});
            break;
        case "EF":
            courses[idx_course].finalGrade = null;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {finalGrade: null}});
            break;
        case "ES":
            courses[idx_course].makeUpGrade = null;
            await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: course_code}, {$set: {makeUpGrade: null}});
            break;
    }
    if(flag === true)   calculateTestsGrade(courseReport);
    calculateCourseGrade(courseReport);
    calculateTermGrade();
    updateCourses(course_code);  
}

const updateCourses = async (course_code) => {
    let idx_course;
    for(let i = 0; i < courses.length; i++) {
        if(courses[i].course_code === course_code)  idx_course = i;
    }
    let courseReport = courses[idx_course];
    let testsGrade = courseReport.testsGrade;
    let courseGrade = courseReport.courseGrade;
    let termGrade = currentTerm.termGrade;
    await TermReport.updateOne({_id: currentTerm._id}, {$set: {termGrade: termGrade}});
    await CourseReport.updateOne({termReport_id: currentTerm._id,course_code: courseReport.course_code}, {$set: {testsGrade: testsGrade, courseGrade: courseGrade}})
    courses = await CourseReport.find({termReport_id: currentTerm._id})
    io.sockets.emit('getTerms', {termsData: terms, currentTerm: currentTerm});
    io.sockets.emit('getCourses', courses);
}

const calculateTestsGrade = async (courseReport) => {
    let numberOfTypes = 0;
    let testsGrade = 0;
    let quizzes = courseReport.quizzes;
    let labs = courseReport.labs;
    let quizzesMeanGrade = 0, labsMeanGrade = 0;
    let numberQuizzes = courseReport.numberQuizzes;
    let numberLabs = courseReport.numberLabs;
    let removableQuizzes = courseReport.removableQuizzes;
    let removableLabs = courseReport.removableLabs;
    if(numberQuizzes !== 0) {
        let sumQuizGrades = (quizzes.reduce((acc, quiz) => {
            return acc + (quiz.grade);
        }, 0));
        quizzes = quizzes.filter(quiz => quiz.isRemovable === true);
        quizzes.sort((quizA, quizB) => {
            return quizA.grade - quizB.grade;
        });
        let numRemovableGrades = ((quizzes.length >= removableQuizzes) ? removableQuizzes : quizzes.length) - (numberQuizzes - courseReport.quizzes.length);
        for(let i = 0; i < numRemovableGrades; i++) {
            sumQuizGrades -= quizzes[i].grade;
        }
        quizzesMeanGrade = (sumQuizGrades) / (numberQuizzes - removableQuizzes);
        numberOfTypes++;
    }
    if(numberLabs !== 0) {
        let sumLabGrades = (labs.reduce((acc, lab) => {
            return acc + (lab.grade);
        }, 0));
        labs = labs.filter(lab => lab.isRemovable === true);
        labs.sort((labA, labB) => {
            return labA.grade - labB.grade;
        });
        let numRemovableGrades = (labs.length >= removableLabs) ? removableLabs : labs.length - (numberLabs - courseReport.labs.length);
        for(let i = 0; i < numRemovableGrades; i++) {
            sumLabGrades -= labs[i].grade;
        }
        labsMeanGrade = (sumLabGrades) / (numberLabs - removableLabs);
        numberOfTypes++;
    }
    if(numberOfTypes !== 0) testsGrade = (quizzesMeanGrade + labsMeanGrade) / numberOfTypes;
    for(let i = 0; i < courses.length; i++) {
        if(courses[i].course_code === courseReport.course_code) courses[i].testsGrade = testsGrade;
    }
}

const calculateCourseGrade = async (courseReport) => {
    let courseGrade;
    let testsWeight = courseReport.evaluationSystem.testsWeight;
    let midtermWeight = courseReport.evaluationSystem.midtermWeight;
    let finalWeight = courseReport.evaluationSystem.finalWeight;
    let testsGrade = courseReport.testsGrade;
    let midtermGrade = courseReport.midtermGrade;
    let finalGrade = courseReport.finalGrade;
    let makeUpGrade = courseReport.makeUpGrade;
    let weightsSum = testsWeight + midtermWeight + finalWeight;
    let gradesSum = 0;
    if(makeUpGrade !== null) {
        //Reemplazar susti
        if(testsGrade !== null) gradesSum += testsWeight * testsGrade;
        let gradesSum1 = gradesSum, gradesSum2 = gradesSum;
        //Reemplazar parcial
        gradesSum1 += midtermWeight * makeUpGrade.grade;
        if(finalGrade !== null) gradesSum1 += finalWeight * finalGrade.grade;
        //Reemplazar final
        if(midtermGrade !== null) gradesSum2 += midtermWeight * midtermGrade.grade;
        gradesSum2 += finalWeight * makeUpGrade.grade;
        gradesSum = Math.max(gradesSum1, gradesSum2);
    }
    else {
        if(testsGrade !== null) gradesSum += testsWeight * testsGrade;
        if(midtermGrade !== null) gradesSum += midtermWeight * midtermGrade.grade;
        if(finalGrade !== null) gradesSum += finalWeight * finalGrade.grade;
    }
    courseGrade = gradesSum / weightsSum;
    for(let i = 0; i < courses.length; i++) {
        if(courses[i].course_code === courseReport.course_code) courses[i].courseGrade = courseGrade;
    }
}

const calculateTermGrade = async (courseReport) => {
    let totalWeight = courses.reduce((acc, course) => {
        return acc + course.course_weight;
    }, 0);
    console.log("weight: ", totalWeight);
    calculatedTermGrade = courses.reduce((acc, course) => {
        return acc + (course.courseGrade) * (course.course_weight / totalWeight);
    }, 0);
    console.log("calculated", calculatedTermGrade);
    currentTerm.termGrade = calculatedTermGrade;
    return;
}