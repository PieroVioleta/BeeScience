import React, { Component } from 'react';
import NaviBar from '../Components/NaviBar'

let evento1 = {
    id : 'nose',
    start : '12AM',
    end : '3PM',
    color : 'B0413E'
};

let events = [];
events.push(evento1);
const renderHorario = (events)=>{
    return(
        <tr>
            <td>{events.id}</td>
            <td>{events.id}</td>
            <td>{events.id}</td>
            <td>{events.id}</td>
            <td></td>
            <td></td>
            <td></td>    
        </tr>
    )
} 
class Horario extends Component{
    
    render(){
        return(<div>
            <div>
            <NaviBar/>
            </div>
            <div  className='Schedule'>
            <thead>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miercoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
                <th>Domingo</th>
            </thead>
            <tbody>
                {events.map(renderHorario)}
            </tbody>
            </div>
            </div>);
    }
}
export default Horario;
    