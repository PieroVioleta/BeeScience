import React, { Component } from 'react';

class Comentario  extends Component {
    render() {
        const pregunta = this.props.pregunta
        const autor = this.props.autor
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
                                <span className="pregunta-detalle">Preguntado hace 1 día por <a>{autor}</a> </span>
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
                                <p className="pregunta" href="google.com"> Comentario de prueba </p>                
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

export default Comentario;
