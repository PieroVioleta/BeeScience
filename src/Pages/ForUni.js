import React, { Component } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Question from './ComponentsForUni/Question'


class ForUni extends Component{
    constructor(props) {
        super(props)
        this.state = {info: ['', '', '']}
    }

    enviarPregunta() {
        var element = document.getElementById("entradaTexto")
        var questionText = element.value
        var elm = this.state.info
        elm = [questionText].concat(elm)
        this.setState({info:elm})
    }
    render(){
        return(
            <div>
                <div id="contenedor-pregunta">
                    <form id="form_pregunta">
                        <span id="descripcionPregunta">Realiza una pregunta</span>
                        <input id="entradaTexto" type="text" name="name" size="100"/>
                        <button id="boton" type="button" onClick={()=>this.enviarPregunta(  )}>Preguntar</button>
                    </form>
                </div>
                <div id="seccion-preguntas">
                    {this.state.info.map(elm => <Question pregunta={elm}/>) }
                </div>
            </div>          
            );
    }
}
export default ForUni;
    