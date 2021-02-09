import React, { Component } from "react";
import "../App.css";
// import ParticlesBg  from "particles-bg";

import NaviBar from "./NaviBar";

class Header extends Component {
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var description = this.props.data.description;
    }

    return (
      <div className="container">
        <header id="home">
          {/* <ParticlesBg type="circle" bg={true} /> */}

          <NaviBar />
          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">{name}</h1>
              {this.props.user === null ? (
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
              ) : (
                <h3 id="welcome">Bienvenido {this.props.user.userName}</h3>
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
