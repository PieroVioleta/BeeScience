import React, { Component } from "react";
import MainSection from "../Components/mainSection/mainSection.jsx";
import { Redirect } from "react-router-dom";
import NaviBar from "../Components/NaviBar";

class GestorNotas extends Component {
  render() {
    if (localStorage.getItem("session")) {
      return (
        <React.Fragment>
          <NaviBar />
          <MainSection user_id={this.props.user.id} />
        </React.Fragment>
      );
    } else {
      return <Redirect to="/LogIn" />;
    }
  }
}
export default GestorNotas;
