import React, { Component } from 'react';

class Question extends Component {
    render() {
        const pregunta = this.props.pregunta
        if(pregunta) {
            return (
                <div>
                    <div className="pregunta-container">
                        <div className="contenedor-perfil">
                            <a href="google.com">
                                <img className="perfil-foto" src="https://i.pinimg.com/originals/53/32/53/53325364090c7e2140b6033ea26150db.png"/>
                            </a>       
                        </div>
                        <div>
                            <div>
                                <a className="pregunta" href="google.com">{pregunta}</a>                
                            </div>
                            <div>
                                <span className="pregunta-detalle">Preguntado hace 1 día por <a>Usuario desconocido</a> </span>
                            </div>
                        </div>    
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="pregunta-container">
                        <div className="contenedor-perfil">
                            <a href="google.com">
                                <img className="perfil-foto" src="https://i.pinimg.com/originals/53/32/53/53325364090c7e2140b6033ea26150db.png"/>
                            </a>       
                        </div>
                        <div>
                            <div>
                                <a className="pregunta" href="google.com">Soy ingresante, quisiera saber si es posible egresar en 5 años o es un mito solamente:(</a>                
                            </div>
                            <div>
                                <span className="pregunta-detalle">Preguntado hace 1 día por <a>Usuario desconocido</a> </span>
                            </div>
                        </div>    
                    </div>
                </div>
            );
        }
        
  }
}

export default Question;

