import React, { Component } from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

import { Button, TextField, Grid } from '@material-ui/core';
import Question from './ComponentsForUni/Question'
import Comentario from './ComponentsForUni/Comentario'



function Pregunta() {
    const [textQuestion, setTextQuestion] = useState("");
    const [comments, setComments] = useState([]);
    // this.state = {info: ['', '', '']}
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id_question = url.searchParams.get("id");
    // console.log(id_question);
    var temporal = ['', '', '']
    

    useEffect(()=>{
        axios.get('http://localhost:8080/question/getQuestion/'+id_question)
        .then(function (response) {
            let textQuestion = response.data.questionText;
            let comments = response.data.comments;
            // console.log(comments);
            setTextQuestion(textQuestion);
            setComments(comments);
            // console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])
    


    return(
        <div>
            <div className="pregunta-margen">
                <Question pregunta={textQuestion}/>
            </div>
            <div className="contenedor-comentarios">
                <p className="titulo-comentarios">Comentarios:</p>
                <div className="seccion-comentarios">
                    {comments.map(elm => <Comentario pregunta={elm}/>) }
                </div>
            </div>
        </div>          
        );
}
// class Pregunta extends Component{
//     constructor(props) {
//         super(props)
//         this.state = {info: ['', '', '']}
//     }
//     render(){
//       return(
//         <div>
//             <div className="pregunta-margen">
//                 <Question pregunta={"pregunta de prueba"}/>
//             </div>
//             <div className="contenedor-comentarios">
//                 <p className="titulo-comentarios">Comentarios:</p>
//                 <div className="seccion-comentarios">
//                     {this.state.info.map(elm => <Comentario pregunta={elm}/>) }
//                 </div>
//             </div>
//         </div>          
//         );
            
//     }
// }
export default Pregunta;
    