const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid').v4;
const cors = require('cors');

//Initializations
const app = express();
require('./database');

//Settings
app.set('port', process.env.port || 8080);
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//Importing routes
const termsRouter = require('./routes/terms');
const coursesRouter = require('./routes/courses');
const gradesRouter = require('./routes/grades');
const questionRouter = require('./routes/questions');
const taskRouter = require('./routes/agenda')
//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/File/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname) );
  }
})
app.use(multer({ storage: storage }).single('file'));
//Global variables

//Routes
app.use(require('./routes/index'));
app.use('/terms', termsRouter);
app.use('/courses', coursesRouter);
app.use('/grades', gradesRouter);
app.use('/question', questionRouter);
app.use('/agenda',taskRouter);
//static files

//Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});