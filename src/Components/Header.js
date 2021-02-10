import React, { Component } from "react";
import "../App.css";
import NaviBar from "./NaviBar";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      user: (localStorage.getItem("session")) ? JSON.parse(localStorage.getItem("session")) : null
    }
  }

  handleLogout() {
    localStorage.removeItem("session");
    this.setState({user: null});
  }

  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var description = this.props.data.description;
    }

    return (
      <div className="container">
        <NaviBar user={this.state.user} logout={this.handleLogout}/>
        <header id="home">
          <div className="row banner">
            <div className="banner-text">
              <h1 id="title" className="responsive-headline">{name}</h1>
              {(localStorage.getItem("session")) ? (
                <h3 id="welcome">Bienvenido {this.state.user.username}</h3>
              ) : (
                <React.Fragment>
                  <h3>{description}</h3>
                  <hr />
                  <ul className="social">
                    <a className="button btn github-btn" href="/LogIn">
                      <i className="fa fa-sign-in" aria-hidden="true"></i>
                      Iniciar sesión
                    </a>
                    <a className="button btn project-btn" href="/LogIn">
                      Registrarse
                    </a>
                  </ul>
                </React.Fragment>
              )}
            </div>
          </div>

          <p className="scrolldown">
            <a className="smoothscroll" href="#about">
              <i className="icon-down-circle"></i>
            </a>
          </p>
        </header>
      </div>
    );
  }
}

export default Header;
