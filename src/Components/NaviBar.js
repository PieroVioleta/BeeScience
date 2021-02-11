import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class NaviBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      user: (localStorage.getItem("session")) ? JSON.parse(localStorage.getItem("session")) : null,
      redirect: false
    }
  }

  handleLogout() {
    localStorage.removeItem("session");
    this.setState({redirect: true});
  }

  render() {
    if(this.state.redirect === true) {
      return <Redirect to="./" />;
    }
    
    return (
      <div id="navigation-panel">
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>
        <ul id="nav" className="nav">
          <li className="current">
            <a className="smoothscroll" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="./#about">
              About
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="/ForUni">
              ForUni
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="/GestorNotas">
              Gestor de Notas
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="/Tarea">
              Tareas
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="/Recursos">
              Recursos
            </a>
          </li>
        </ul>
        <div>
{
    (this.props.user === undefined) ? (
      (this.state.user !== null) ? <button id="logout" type="button" onClick={this.handleLogout}>Cerrar sesión</button> : null
    ) :
    (
      (this.props.user !== null) ? <button id="logout" type="button" onClick={this.props.logout}>Cerrar sesión</button> : null
    )
}
        {/* {(this.state.user !== null) ? <button id="logout" type="button" onClick={(this.props.logout) ? this.props.logout : this.handleLogout}>Cerrar sesión</button> : null} */}
      </div>
      </nav>
      </div>
    );
  }
}
export default NaviBar;
