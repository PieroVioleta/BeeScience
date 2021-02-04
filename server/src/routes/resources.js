var { Router} = require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs');
const File = require('../models/File');


router.get('/upload', (req, res) => {
  res.send('form upload');
});

router.post('/upload', async(req, res) => {
  
  const file = new File();
  file.course_code = req.body.course_code;
  file.type_exam = req.body.type_exam;
  file.year = req.body.year;
  file.filename = req.file.filename;
  file.path = '/File/uploads/' + req.file.filename;
  file.originalname = req.file.originalname;
  file.mimetype = req.file.mimetype;
  file.size = req.file.size;

  // console.log(file);
  await file.save();

  res.send('file uploaded');
});


router.get('/file', async(req, res) => {
  const file = await File.find();
  console.log(file);
  res.send(file);
});

router.get('/file/:id', async(req, res) => {
  const {id} = req.params;
  if(id.length == 24){
    const file = await File.findById(id);
    console.log(file);
    res.send(file);
  }else{
    res.send(`el tamaño es ${id.length} deberia tener un tamaño de 24`);
  }
  
  // res.send('Profile File');
});

router.get('/file/:id/delete', async(req, res) => {
  const {id} = req.params;
  if(id.length == 24){
    const file = await File.findByIdAndDelete(id);
    unlink(path.resolve('../public/File/uploads' + file.path ));
    res.send('File delete');
  }else{
    res.send(`el tamaño es ${id.length} deberia tener un tamaño de 24`);
  }
});

module.exports = router;
