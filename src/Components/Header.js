import React, { Component } from 'react';
import ParticlesBg  from "particles-bg";

import NaviBar from './NaviBar';
class Header extends Component {
  render() {

    if(this.props.data){
       var project = this.props.data.project;
       var github = this.props.data.github;
      var name = this.props.data.name;
      var description= this.props.data.description;
     
    }
  
  
   

    return (
      <header id="home">
      <ParticlesBg type="circle" bg={true} />
      <NaviBar/>

      <div className="row banner">
      
         <div className="banner-text">
            <h1 className="responsive-headline">{name}</h1>
            <h3>{description}.</h3>
            <hr />
            <ul className="social">
            <a href={github} className="button btn github-btn"><i class="fa fa-sign-in" aria-hidden="true"></i>Iniciar sesión</a>
               <a href={project} className="button btn project-btn">Registrarse</a>
            </ul>
         </div>
      </div>

      <p className="scrolldown">
         <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
      </p>

   </header>
    );
  }
}

export default Header;

