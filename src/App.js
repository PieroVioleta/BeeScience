import React, { Component } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import NaviBar from './Components/NaviBar';
import Portfolio from './Components/Portfolio';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import ForUni from './Pages/ForUni'
import GestorNotas from './Pages/GestorNotas';
import Horario from './Pages/Horario';
import Recursos from './Pages/Recursos';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

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
        {/* <Header data={information_site} />
        <About data={information_site}/>  
          <Footer data={information_site}/> */}
        
        <Router>
        <NaviBar/>
          <Switch>
          <Route path="/" exact>  
            <Header data={information_site} />
            <About data={information_site}/>  
            <Footer data={information_site}/>
          </Route>
          <Route path="/forUni">
            <ForUni/>
          </Route>
          <Route path="/GestorNotas">
            <GestorNotas/>
          </Route>
          <Route path="/Horario">
            <Horario/>
          </Route>
          <Route path="/Recursos">
            <Recursos/>
          </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
