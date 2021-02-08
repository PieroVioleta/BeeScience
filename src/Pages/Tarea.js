import { HomeOutlined } from '@material-ui/icons';
import React, {Component} from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';
import Celda from './Celda'
import Celda2 from './Celda2'
import Celda3 from './Celda3'
import ComponentTarea from './ComponentTarea'


const user_id = "5ffa6b98f96818c0e006c1a9"
class Tarea extends Component { 
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
        //this.handleClickButton = this.handleClickButton.bind(this);
        this.state = {
            tareas: []  
        }
    }
    
    async componentDidMount(){

        const res = await axios.get('http://localhost:8080/agenda/' + user_id)
        console.log(res)
        this.setState({tareas:res.data})
        console.log(this.state.tareas)
        
    }
     
    handleClick(id) {
        if(window.confirm("Desea eliminar esta tarea?")){
            axios.delete('http://localhost:8080/agenda/delete/'+ id)
            let index = this.state.tareas.findIndex((elem) => elem._id === id)
            console.log("indice",index)
            console.log("tareas antes:",this.state.tareas)
            this.setState(this.state.tareas.splice(index,1))
        }
     }
      
      
    
    render(){   
        
        console.log(this.state)
        let day = new Date().getDate();
        let month = new Date().getMonth()+1;
        let year = new Date().getFullYear()
        const week = ['1','2','3','4','5','6','7']; 
        return( <div class = "Schedule">
                <table class="Agenda">
                <thead>
                    <tr> 
                    <th>Importancia </th>
                    {week.map((value,index)=>{
                        return <th>{day+index}/{month}/{year}</th>
                    })}
                    </tr>
                </thead>
                <tbody className = "tbody"> 
                    <tr>
                        <th>Normal</th>
                        {week.map((value,index)=>{
                            return <Celda name = '' id= {index} />
                    })} 
                    </tr>
                    <tr>
                        <th>Importante</th>
                        {week.map((value,index)=>{
                            return <Celda2 name = ' ' id= {index}/>
                    })} 
                    </tr>
                    <tr>
                        <th>Urgente</th>
                        {week.map((value,index)=>{
                            return <Celda3 name = ' ' id={index}/>
                    })} 
                    </tr>
                </tbody>
                </table>
                    <div className="listaTareasTitle">
                        <h1>
                            Lista de tareas
                        </h1>
                        <div className="boxTareas   " >
                        {this.state.tareas.map(elem =>{
                            console.log(elem)
                            return <ComponentTarea 
                            name =  {elem.name} 
                            priority = {elem.priority}
                            initialDate = {elem.initialDate}
                            id = {elem._id}
                            onClick = {() => this.handleClick(elem._id)}
                            />
                        })} 
                        </div>
                    </div>
                    
                        
                   
                
            </div>
            
        );
    }
    
}


export default Tarea;

