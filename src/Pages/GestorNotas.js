import React, { Component } from 'react';
import MainSection from '../Components/mainSection/mainSection.jsx'
import { Redirect } from 'react-router-dom';

class GestorNotas extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        if(localStorage.getItem("session")) {
            return(
                <MainSection user_id={this.props.user_id}/>
                );
        }
        else {
            return <Redirect to= "/LogIn"/>
        }

    }
}
export default GestorNotas;
    