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
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//Middlewares
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
app.use(require('./routes/terms'));
app.use(require('./routes/courses'));
app.use(require('./routes/grades'));

//static files

//Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});