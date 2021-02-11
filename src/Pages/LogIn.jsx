import React from "react";
import axios from 'axios'
import { Redirect } from "react-router-dom";
import "../App.css";
import NaviBar from "../Components/NaviBar";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this)
    this.state = {
      redirect: false
    }
  }

  login(e) {
    e.preventDefault();
    let userName = document.getElementById("login-user").value;
    let password = document.getElementById("login-password").value;

    if(userName === "" || password === "") {
      alert("Complete todos los campos requeridos para iniciar sesión");
      return;
    }

    axios
      .post("http://localhost:8080/user/checkUser/", {
        userName:userName,
        password:password
      })
      .then((response) => {
        let res = response.data;
        if(res.login === false) {
          alert(res.msg);
          return;
        }
        else {
          localStorage.setItem("session", JSON.stringify(res.user))
          this.setState({redirect: true})
          // guarda la sesion en el localStorage
        }
      })
      .catch((error) => console.log(error));
  }

  // localStorage.setItem("user", JSON.stringify(obj))
// JSON.parse("{'hola' : 'hola'}")
// localStorage.removeItem("user")

  showPasswordLogin() {
    let passwordInput = document.getElementById("login-password");
    let checkbox = document.getElementById("login-show-password");
    if (checkbox.checked === true) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  showPasswordSignup() {
    let passwordInput = document.getElementById("signup-password");
    let checkbox = document.getElementById("signup-show-password");
    if (checkbox.checked === true) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  }

  signUp() {
    let userName = document.getElementById("signup-user").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    axios.post('http://localhost:8080/user/add/', {
            userName:userName,
            email:email,
            password:password
        })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    
  }
  render() {
    if(this.state.redirect === true) {
      return <Redirect to="./" />;
    }
    if(localStorage.getItem("session")){
      return <Redirect to= "./"/>
    }else{
      return (
        <div id="general-container">
          <NaviBar />
          <div id="forms-container">
            <div id="login-container">
              <form id="login">
                <h2>Iniciar Sesión</h2>
                <label htmlFor="login-user" id="login-user-label">
                  Usuario:{" "}
                </label>
                <input
                  id="login-user"
                  type="text"
                  placeholder="Ingrese su usuario"
                  required
                />
                <label htmlFor="login-password" id="login-password-label">
                  Contraseña:{" "}
                </label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  required
                />
                <div id="login-show-password-box">
                  <label
                    htmlFor="login-show-password"
                    id="login-show-password-label"
                  >
                    Mostrar contraseña{" "}
                  </label>
                  <input
                    id="login-show-password"
                    type="checkbox"
                    onClick={this.showPasswordLogin}
                  />
                </div>
                <button onClick={this.login}>Ingresar</button>
              </form>
            </div>
            <div id="signup-container">
              <form id="signup">
                <h2>Registrarse</h2>
                <label htmlFor="signup-user" id="signup-user-label">
                  Usuario:{" "}
                </label>
                <input
                  id="signup-user"
                  type="text"
                  placeholder="Ingrese su usuario"
                  required
                />
                <label htmlFor="signup-email" id="signup-email-label">
                  Correo electrónico:{" "}
                </label>
                <input
                  id="signup-email"
                  type="text"
                  placeholder="Ingrese su correo electrónico"
                  required
                />
                <label htmlFor="signup-password" id="signup-password-label">
                  Contraseña:{" "}
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  required
                />
                <div id="signup-show-password-box">
                  <label
                    htmlFor="signup-show-password"
                    id="signup-show-password-label"
                  >
                    Mostrar contraseña{" "}
                  </label>
                  <input
                    id="signup-show-password"
                    type="checkbox"
                    onClick={this.showPasswordSignup}
                  />
                </div>
                <button onClick={this.signUp}>Registrarse</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
    
  }
}

export default LogIn;
