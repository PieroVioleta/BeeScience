import React, { Component } from 'react';
import ParticlesBg  from "particles-bg";
import { render } from 'react-dom';
import {Link} from 'react-router-dom';

class NaviBar extends Component{
    render(){
        return(
        <nav id="nav-wrap">
         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	      <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
            
         <ul id="nav" className="nav">
            <Link to="/">
            <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
            </Link>
            <li><a className="smoothscroll" href="#about">About</a></li>
            <Link to="/ForUni">
               <li><a className="smoothscroll">ForUni</a></li>
            </Link>
            <Link to="/GestorNotas">
            <li><a className="smoothscroll" >Gestor de Notas</a></li>
            </Link>
            <Link to="/Tarea">
            <li><a className="smoothscroll" >Tareas</a></li>
            </Link>
            <Link to="/Recursos">
            <li><a className="smoothscroll" href="/Recursos" >Recursos</a></li>
            </Link>
         </ul>
      </nav>);
    }
}
export default NaviBar