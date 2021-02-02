import React, { Component } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Question from './ComponentsForUni/Question'
import Comentario from './ComponentsForUni/Comentario'


class Pregunta extends Component{
    constructor(props) {
        super(props)
        this.state = {info: ['', '', '']}
    }

    render(){
      return(
        <div>
            <div className="pregunta-margen">
                <Question pregunta={"pregunta de prueba"}/>
            </div>
            <div className="contenedor-comentarios">
                <p className="titulo-comentarios">Comentarios:</p>
                <div className="seccion-comentarios">
                    {this.state.info.map(elm => <Comentario pregunta={elm}/>) }
                </div>
            </div>
        </div>          
        );
            
    }
}
export default Pregunta;
    