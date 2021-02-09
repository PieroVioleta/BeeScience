import React from "react";
import "../App.css";
import axios from "axios";

class LogIn extends React.Component {
  login() {
    let userName = document.getElementById("login-user").value;
    let password = document.getElementById("login-password").value;

    axios
      .get("http://localhost:8080/user/usr=" + userName + "&pass=" + password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

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

  render() {
    return (
      <div id="general-container">
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
              <button>Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
