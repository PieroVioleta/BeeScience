import React, { Component } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Question from './ComponentsForUni/Question'
class ForUni extends Component{
    render(){
        function enviarPregunta() {
            // var element = document.getElementById("entradaTexto")
            // var questionText = element.value
            // var preguntas = document.getElementById("seccion-preguntas")
            // preguntas.innerHTML += "<Question pregunta={questionText}/>"
        }
        return(
            <div>
                <div id="contenedor-pregunta">
                    <form id="form_pregunta">
                        <span id="descripcionPregunta">Realiza una pregunta</span>
                        <input id="entradaTexto" type="text" name="name" size="100"/>
                        <button id="boton" type="button" onClick={enviarPregunta}>Preguntar</button>
                    </form>
                </div>
                <div id="seccion-preguntas">
                    <Question/>
                    <Question/>
                    <Question/>
                    <Question/>
                    <Question/>
                    <Question/>
                    <Question/>

                </div>
            </div>
            
            );
    }
}
export default ForUni;
    