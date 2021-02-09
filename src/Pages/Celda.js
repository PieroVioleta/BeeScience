import React, {Component} from 'react';


class Celda extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            id: props.id, 
            tareas: []
        }
    }
    
    

    render(){
        return(
            <td className='task' onClick = {this.props.onClick}  >{this.state.name}</td>
        )
    }
}
export default Celda;   