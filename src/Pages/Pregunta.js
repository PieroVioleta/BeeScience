import React, { Component } from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

import { Button, TextField, Grid } from '@material-ui/core';
import Question from './ComponentsForUni/Question'
import Comentario from './ComponentsForUni/Comentario'
import { Redirect } from 'react-router-dom';



function Pregunta() {
    const [textQuestion, setTextQuestion] = useState("");
    const [comments, setComments] = useState([]);
    // this.state = {info: ['', '', '']}
    const user_id = "5ffa6b98f96818c0e006c1a9";
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
            comments.reverse();
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
    

    const enviarComentario = () => {
        var element = document.getElementById("entradaTexto")
        var newComment = element.value
        axios.post('http://localhost:8080/question/addComment/' + id_question, {
            comment:newComment
        })
            .then(function (response) {
                var elm = comments
                elm = [newComment].concat(elm)
                setComments(elm)
               console.log(response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    if(localStorage.getItem("session")) {
        return(
            <div>
                <div className="pregunta-margen">
                    <Question pregunta={textQuestion}/>
                </div>
                <div className="contenedor-comentarios">
                <div id="contenedor-pregunta">
                    <form id="form_pregunta">
                        <span id="descripcionPregunta">Realiza un comentario</span>
                        <input id="entradaTexto" type="text" name="name" size="100"/>
                        <button id="boton" type="button" onClick={()=>{enviarComentario()}}>Comentar</button>
                    </form>
                </div>
                    <p className="titulo-comentarios">Comentarios:</p>
                    <div className="seccion-comentarios">
                        {comments.map(elm => <Comentario pregunta={elm}/>) }
                    </div>
                </div>
            </div>          
            );
    } else {
        return <Redirect to= "/LogIn"/>
    }
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
    