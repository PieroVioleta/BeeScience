import React, { Component } from 'react';
import MainSection from '../Components/mainSection/mainSection.jsx'

class GestorNotas extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <MainSection user_id={this.props.user_id}/>
            );
    }
}
export default GestorNotas;
    