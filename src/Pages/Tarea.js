import { HomeOutlined } from '@material-ui/icons';
import React, {Component} from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';
import Celda from './Celda'
import Celda2 from './Celda2'
import Celda3 from './Celda3'
import ComponentTarea from './ComponentTarea'
import { Redirect } from 'react-router-dom';
import NaviBar from "../Components/NaviBar";


const user_id = "5ffa6b98f96818c0e006c1a9"
class Tarea extends Component { 
    constructor(props) {
        super(props);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            tareas: []  
        }
    }
    
    async componentDidMount(){

        const res = await axios.get('http://localhost:8080/agenda/' + user_id)
        let array = []
        
        array = res.data
        
        for(let i=0;i<array.length-1;i++){
            for(let j=i+1;j<array.length;j++){
                let swap
                if(array[i].priority === 'Normal' && (array[j].priority === 'Urgente' || array[j].priority === 'Importante')){
                    swap = array[i]
                    array[i] = array[j]
                    array[j] = swap
                }
                else if(array[i].priority === 'Importante' && array[j].priority === 'Urgente'){
                    swap = array[i]
                    array[i] = array[j]
                    array[j] = swap
                }
            }
        }
        this.setState({tareas:res.data})   
    }
    
    async handleClick(id) {
        if(window.confirm("Desea eliminar esta tarea?")){
            await axios.delete('http://localhost:8080/agenda/delete/'+ id)
            .then(
            ()=>{
                const tareas = this.state.tareas
                const index = tareas.findIndex(elem =>elem._id === id)
                tareas.splice(index,1)
                this.setState({tareas:tareas})
            })
        }
    }

    async handleClick1(id,priority){
        let name = prompt("Ingrese el nombre de la tarea")
        let day = (new Date().getDate()+id).toString();
        let month = (new Date().getMonth()+1).toString();
        let year = new Date().getFullYear().toString();
        let today = day+'/'+month+'/'+year

        let dummyData = {}
        dummyData.initialDate = today

        dummyData.name = name
        dummyData.priority = priority // priority 
        dummyData.user_id = "5ffa6b98f96818c0e006c1a9"
        if(this.state.tareas.length<16){
        await axios.post('http://localhost:8080/agenda/add',dummyData)
        .then(res =>{
            console.log(res)
            const newTask = res.data
            const newTasks = [...this.state.tareas]
            //console.log("newTasks:",newTasks)
            newTasks.push(newTask)
            //console.log("newTasksP:",newTasks)
            for(let i=0;i<newTasks.length-1;i++){
                for(let j=i+1;j<newTasks.length;j++){
                    let swap
                    if(newTasks[i].priority === 'Normal' && (newTasks[j].priority === 'Urgente' || newTasks[j].priority === 'Importante')){
                        swap = newTasks[i]
                        newTasks[i] = newTasks[j]
                        newTasks[j] = swap
                    }
                    else if(newTasks[i].priority === 'Importante' && newTasks[j].priority === 'Urgente'){
                        swap = newTasks[i]
                        newTasks[i] = newTasks[j]
                        newTasks[j] = swap
                    }
                }
            }
            console.log("newTasks afeter:",newTasks)
            this.setState({tareas:newTasks})
            
        })
        .catch(err =>{
            console.log(err)
        })
        }
        else{
            alert("Máximo número de tareas alcanzado")
        }
    }
      
      
    
    render(){   
        console.log("render method",this.state.tareas)
        let day = new Date().getDate();
        let month = new Date().getMonth()+1;
        let year = new Date().getFullYear()
        const week = ['1','2','3','4','5','6','7']; 

        if(localStorage.getItem("session")) {
            return( 
            <React.Fragment>

            
                <NaviBar />
            <div class = "Schedule">
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
                <tr >
                    <th className="Green">Normal</th>
                    {week.map((value,index)=>{
                        return <Celda name = '' id= {index} onClick = {() => this.handleClick1(index,"Normal")} />
                })} 
                </tr>
                <tr>
                    <th className="Yellow">Importante</th>
                    {week.map((value,index)=>{
                        return <Celda2 name = ' ' id= {index}  onClick ={()=>this.handleClick1(index,"Importante")} />
                })} 
                </tr>
                <tr >
                    <th className="Red">Urgente</th>
                    {week.map((value,index)=>{
                        return <Celda3 name = ' ' id={index} onClick ={()=>this.handleClick1(index,"Urgente")}/>
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
                    })
                    } 
                    </div>
                </div>
                
                    
               
            
        </div>
        </React.Fragment>
    );
        }
        else {
            return <Redirect to= "/LogIn"/>
        }
    }
    
}


export default Tarea;

