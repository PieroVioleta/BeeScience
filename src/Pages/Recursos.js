import React, { useState, createRef } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dropzone,{useDropzone} from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';

const API_BASE = "http://localhost:8080";
const user_id = "5ffa6b98f96818c0e006c1a9";
const dropzoneRef = createRef();

const openDialog = () => {
  if(dropzoneRef.current) {
    dropzoneRef.current.open()
  }
};

const useStyles = makeStyles((theme) => ({
  icono:{
    marginLeft: '90%',
    backgroundColor: '#EE6C4D',
    color: 'white',
  },
  heroContent: {
    backgroundColor: 'lightblue',
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#cccccc',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  
}));

function submitForm(contentType, data, setResponse) {
  axios({
      url: `${API_BASE}/resources/upload`,
      method: 'POST',
      data: data,
      headers: {
          'Content-Type': contentType
      }
  }).then((response) => {
      setResponse(response.data);
  }).catch((error) => {
      setResponse("error");
  });
}

const cards = [
    {index: 1, 
      enlace: "#RecursoComputacion",
      escuela: "Ciencia de la computación", 
      link:"https://images.unsplash.com/photo-1600267147646-33cf514b5f3e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1030&q=80"},
    {index: 2, 
      enlace: "#RecursoQuimica",
      escuela: "Química", 
      link:"https://images.unsplash.com/photo-1581091012184-7e0cdfbb6797?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    {index: 3, 
      enlace: "#RecursoFisica",
      escuela: "Física", 
      link:"https://images.unsplash.com/photo-1607988795691-3d0147b43231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    {index: 4, 
      enlace: "#RecursoMatematica",
      escuela: "Matemática", 
      link:"https://images.unsplash.com/photo-1581089778245-3ce67677f718?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"},
    {index: 5, 
      enlace: "#RecursoIngFisica",
      escuela: "Ingenieria física",
      link:"https://images.unsplash.com/photo-1568754690048-73d7d3a6bf32?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"},
];

export default function Album() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [course_code, setCourseCode] = useState("");
  const [type_exam, setTypeExam] = useState("");
  const [year, setYear] = useState("");

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFile(null);
    setCourseCode("");
    setTypeExam("");
    setYear("");
    setOpen(false);
  };
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
  } = useDropzone({
    accept: 'image/jpeg, image/png, application/pdf',
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
    }
  }); 

  const acceptedFileItems =  acceptedFiles.map(file => (
    <li key={file.name} >
      {file.name} - {file.size} bytes
    </li>
  ));
  
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  function upload(){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user_id);
    formData.append("course_code", course_code);
    formData.append("type_exam", type_exam);
    formData.append("year", year);
   
    submitForm("multipart/form-data", formData, (msg) => {
      if(msg === 'error'){
        alert("El archivo no se pudo subir")
      }else{
        alert("Se subió correctamente");
      }
    });

    setFile(null);
    setCourseCode("");
    setTypeExam("");
    setYear("");
    setOpen(false);

    }

  return (
    <div id="Recursos">
      
      <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Recursos 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              En esta sección encontrarás recursos educativos de las diferentes carreras profesionales 
              que ofrece la facultad de ciencias de la Universidad Nacional de Ingenieria.
            </Typography>
            
          </Container>
        </div>       
        
        <Container className={classes.cardGrid} maxWidth="md" >
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.index} xs={12} sm={6} md={4} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.link}
                    title={card.escuela}
                  />
                  <Link to={{ pathname: "/RecursosPorCarrera", state:{id:card.escuela}}}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2" align="center">
                        {card.escuela}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div >
          <label htmlFor="contained-button-file">
            <Button className={classes.icono} variant="contained" component="span" onClick={handleClickOpen}>
              Subir
            </Button>
          </label>
        </div>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subir Archivo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Elija los documentos que desea compartir con la comunidad, puede subir imagenes formato JPG, 
              PNG , o también documentos en formato pdf.
            </DialogContentText>
          </DialogContent>
          <DialogContent dividers>
            <DialogTitle>Codigo del Curso</DialogTitle>
              <TextField
              autoFocus
              value={course_code}
              type="text"
              onChange={(e) => { setCourseCode(e.target.value) }}
              fullWidth
              />
            <DialogTitle>Año</DialogTitle>
              <TextField
              autoFocus
              value={year}
              type="text"
              onChange={(e) => { setYear(e.target.value) }}
              fullWidth
              />
            <DialogTitle>Tipo de Examen</DialogTitle>
            <TextField
              autoFocus
              value={type_exam}
              type="text"
              onChange={(e) => { setTypeExam(e.target.value) }}
              fullWidth
              />
            <Dropzone ref={dropzoneRef} noClick noKeyboard>
                {({getInputProps}) => (
                              <div className="container_">
                              <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()}/>
                                <p>arrastra aquí un archivo</p>
                                <button
                                  type="button"
                                  onClick={openDialog}
                                >
                                  Abrir Archivo
                                </button>
                              </div>
                              <aside>
                                <h4>Formato de archivo permitido</h4>
                                <ul>{acceptedFileItems}</ul>
                                <h4>Formato de archivo no permitido</h4>
                                <ul>{fileRejectionItems}</ul>
                              </aside>
                            </div>
                          )}
              </Dropzone>
          </DialogContent> 
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button value="Subir" onClick={upload} color="primary">
              Subir
            </Button>
          </DialogActions>
        </Dialog>
        </Container>       
      </main>
    </React.Fragment>
    </div>
    
  );
}