import React, { Component } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';

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
      bio: 'Este página ha sido creada como proyecto de ciclo del curso Desarrollo de Software (CC3S2)'
    }
    return (
      <div className="App">
        <Header data={information_site} />
        <About data={information_site}/> 
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;
