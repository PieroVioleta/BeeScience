import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import Dropzone from 'react-dropzone';

const API_BASE = "http://localhost:8080"
const user_id = "5ffa6b98f96818c0e006c1a9"

const useStyles = makeStyles((theme) => ({

    title: {
        backgroundColor: 'lightblue',
        padding: theme.spacing(8, 0, 6),
    },

    content: {
        margin: '20px auto' ,
        width: 500,
        height: 550,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
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

function FileUploadPage() {

    const classes = useStyles();
    
    const [file, setFile] = useState(null);
    const [course_code, setCourseCode] = useState("");
    const [type_exam, setTypeExam] = useState("");
    const [year, setYear] = useState("");
    
    function upload(){
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", user_id);
        formData.append("course_code", course_code);
        formData.append("type_exam", type_exam);
        formData.append("year", year);
       
        submitForm("multipart/form-data", formData, (msg) => console.log(msg));
        }


    return (
        <main>
            <div className={classes.title}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Subir Archivo
                </Typography>
            </div>
            
            <div className={classes.content}>
                <form>
                    <label>
                        Codigo del Curso
                    <input type="text" value={course_code}
                    onChange={(e) => { setCourseCode(e.target.value)}}/>
                    </label>

                    <label>
                        Año
                        <input type="text" value={year}
                        onChange={(e) => {setYear(e.target.value)}}/>
                    </label>

                    <label>
                        Tipo de Examen
                        <input type="text" value={type_exam}
                        onChange={(e) => {setTypeExam(e.target.value)}}/>
                    </label>
                    
                    <label>
                        <input type="file" name="file" 
                        onChange={(e) => {setFile(e.target.files[0])}}/>
                    </label>
                    
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>


                    <Link to="/Recursos">
                        <input type="button" value="Subir" onClick={upload}/>
                    </Link>
                    
                </form>
            </div>

        </main>
    );

}

export default FileUploadPage;