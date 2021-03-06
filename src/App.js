import React, { Component } from 'react';
import { useState} from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import LogIn from './Pages/LogIn';
import ForUni from './Pages/ForUni';
import GestorNotas from './Pages/GestorNotas';
import Tarea from './Pages/Tarea';
import Recursos from './Pages/Recursos';
import RecursoPorArea from './Pages/PagesRecursos/RecursoPorArea';
import FilePage from './Pages/PagesRecursos/FileUploadPage';
import Pregunta from './Pages/Pregunta';
import Curso from './Pages/PagesRecursos/Curso';
import Pdf from './Pages/PagesRecursos/Pdf';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: (localStorage.getItem("session")) ? JSON.parse(localStorage.getItem("session")) : null
    };
  }

  render() {
    
    const information_site = {
      name: 'Bee Science',
      github: 'https://github.com/PieroVioleta/BeeScience',
      description: 'Un sitio web multi-uso para los estudiantes de la Facultad de Ciencias',
      project: 'https://github.com/PieroVioleta/BeeScience',
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      integrantes: ['Piero Violeta', 'Roberto Cerna', 'Juan Carlos Cotrina', 'Cristhian Cruz'],
      bio: 'Este página ha sido creada como proyecto de ciclo del curso de Desarrollo de Software (CC3S2)',
      social: [
        {
          "name":"facebook",
          "url":"https://www.facebook.com/Facultad-de-Ciencias-UNI-183409708573",
          "className":"fa fa-facebook"
        },
        {
          "name":"github",
          "url":"https://github.com/PieroVioleta/BeeScience",
          "className":"fa fa-github"
        }
      ]
    }
    return (
      <div className="App">
        <Router>
          <Switch>
          <Route path="/" exact>
            <Header classname='Cabezara' data={information_site}/>
            <About data={information_site}/>  
            <Footer data={information_site}/>
          </Route>
          <Route path="/login">
            <LogIn/>
          </Route>
          <Route path="/forUni">
            <ForUni/>
          </Route>
          <Route path="/pregunta">
            <Pregunta/>
          </Route>
          <Route path="/GestorNotas">
            <GestorNotas user={(this.state.user === null) ? "" : this.state.user} /> 
          </Route>
          <Route path="/Tarea" >
            <Tarea user={(this.state.user === null) ? "" : this.state.user}/>
          </Route>
          <Route path="/Recursos">
            <Recursos/>
          </Route>
          <Route path="/RecursosPorCarrera">
            <RecursoPorArea />
          </Route>
          <Route path="/Curso">
            <Curso/>
          </Route>
          <Route path="/SubirArchivo">
            <FilePage/>
          </Route>
          <Route path="/pdf">
            <Pdf/>
          </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
