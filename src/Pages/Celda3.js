import React, {Component} from 'react';
import axios from 'axios'

class Celda3 extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name, 
            id : props.id,
            tareas: []
        }
    }
    
    

    render(){
        return(
            <td className='task' onClick =  {this.props.onClick} >{this.state.name}</td>
        )
    }
}
export default Celda3;   