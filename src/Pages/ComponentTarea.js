import React, {Component} from 'react';
import axios from 'axios'

class ComponentTarea extends Component{
    constructor(props){
        super(props);
        //  this.handleClick = this.handleClick.bind(this);

        this.state = {
            name: props.name, 
            priority: props.priority,
            initialDate: props.initialDate,
            _id:props.id
        }
    }
    /*
    handleClick() {
        if(window.confirm("Desea eliminar esta tarea?")){
            console.log(this.state._id)
            axios.delete('http://localhost:8080/agenda/delete/'+ this.state._id)
        }
     }
    */

    render(){
        return(
            <div  className='taskL' onClick = {this.props.onClick}  >
                {this.state.name} <br/>
                prioridad={this.state.priority}<br/>
                fecha = {this.state.initialDate }
            </div>
        )
    }
}
export default ComponentTarea;   