import React, {Component} from 'react';
import axios from 'axios'

class Celda3 extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            name: props.name, 
            id : props.id,
            tareas: []
        }
    }
    handleClick(e) {
        if(e.target.innerText == ''){
        let name = prompt("Ingrese el nombre de la tarea")
        e.target.innerText = name

        let day = (new Date().getDate()+this.state.id).toString();
        let month = (new Date().getMonth()+1).toString();
        let year = new Date().getFullYear().toString();
        let today = day+'/'+month+'/'+year

        let dummyData = {}
        dummyData.initialDate = today
        dummyData.name = name
        dummyData.priority ='urgente'// priority
        dummyData.user_id = "5ffa6b98f96818c0e006c1a9"
        axios.post('http://localhost:8080/agenda/add',dummyData)
        .then(res =>{
            const newTask = res.data
            //console.log(res.data)
            console.log(this)
            const newTasks = this.state.tareas
            newTasks.push(newTask)
            this.setState({tareas:newTasks})
            
        })
        }
        // else{
        //     let task = this.state.tareas.find(element => element.name == e.target.innerText)
        //     let taskId = task._id
        //     let name = prompt("Ingrese el nuevo nombre de la tarea")
        //     e.target.innerText = name
        //     task.name = name
        //     axios.post('http://localhost:8080/agenda/update/' + taskId,task)
        // }
        

        /*
        let text = React.createElement('div',{onClick:this.handleClick},name)            
        let trash = React.createElement("button",{className : "btn tam"},
            React.createElement("i",{className : "fa fa-trash-o " , onClick: this.handleClickButton})
            
        ); 
        let cont = React.createElement('div',{className:"celda"},[text,trash])
        ReactDOM.render(cont,e.target)
        */
     }
    

    render(){
        return(
            <td className='task' onClick = {this.handleClick}  >{this.state.name}</td>
        )
    }
}
export default Celda3;   