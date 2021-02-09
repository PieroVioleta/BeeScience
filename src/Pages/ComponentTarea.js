import React, {Component} from 'react';
import axios from 'axios'

class ComponentTarea extends Component{
    constructor(props){
        super(props);
      

    }
    

    render(){
        let taskS
        if(this.props.priority == 'Normal')
            taskS = 'taskN'
        else if(this.props.priority == 'Importante')
            taskS = 'taskI'
        else if(this.props.priority == 'Urgente')
            taskS = 'taskU'
    
        return(
            <div  className= {taskS}  onClick = {this.props.onClick}  >
                {this.props .name} <br/>
                fecha = {this.props.initialDate }
            </div>
        )
    }
}
export default ComponentTarea;   