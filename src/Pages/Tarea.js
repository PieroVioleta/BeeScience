import { HomeOutlined } from '@material-ui/icons';
import React, {Component} from 'react';
import axios from 'axios'
import ReactDOM from 'react-dom';
import Celda from './Celda'
//import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
//import Zoom from "./Zoom";


const user_id = "5ffa6b98f96818c0e006c1a9"
class Tarea extends Component { 
    constructor(props) {
        super(props);
        
        
        //this.handleClickButton = this.handleClickButton.bind(this);
        this.state = {
            tareas: []
        }
    }
    
    componentDidUpdate(){
        axios.get('http://localhost:8080/agenda/' + user_id)
        .then(res=>{
            const Tareas = res.data 
            this.setState({ tareas:Tareas})
        })
      
    }
     
    
      
      
    
    render(){   
        
        console.log(this.state)
        let day = new Date().getDate();
        console.log(day)
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
                <tbody>
                    <tr>
                        <th>Prioridad 1</th>
                        {week.map(()=>{
                            return <Celda name = ' ' priority = '2' />
                    })} 
                    </tr>
                    <tr>
                        <th>Prioridad 2</th>
                        {week.map(()=>{
                            return <Celda name = ' ' priority = '2' />
                    })} 
                    </tr>
                    <tr>
                        <th>Prioridad 3</th>
                        {week.map(()=>{
                            return <Celda name = ' ' priority = '2' />
                    })} 
                    </tr>
                    <tr>
                        <th>Prioridad 4</th>
                        {week.map(()=>{
                            return <Celda name = ' ' priority = '2' />
                    })} 
                    </tr>
                    <tr>
                        <th>Prioridad 5</th>
                        {week.map(()=>{
                            return <Celda name = ' ' priority = '2' />
                    })} 
                    </tr>
                    <tr>
                        <th>Prioridad 6</th>
                        {week.map(()=>{
                            return <Celda name = ' ' priority = '2' />
                    })} 
                    </tr>
                    <tr>
                        <th>Prioridad 7</th>
                        {week.map(()=>{
                            return <Celda name = ' ' priority = '2' />
                    })} 
                    </tr>
                    <tr>
                        <th>Prioridad 8</th>
                        {week.map(()=>{
                            return <Celda name = ' ' priority = '2' />
                    })} 
                    </tr>
                    <tr>
                        <th>Prioridad 9</th>
                        {week.map(()=>{
                            return <Celda name =  ' '  priority = '2' />
                    })} 
                    </tr>
                    
                    
                        
                   
                </tbody>
                </table>
            </div>
            
        );
    }
    
}

/*
class Tarea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            startDate: "2021-10-01",
            days: 31,
            scale: "Day",
            timeHeaders: [
                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}
            ],
            cellWidthSpec: "Auto",
            cellWidth: 50,
            eventHeight :75,
            resources: [
                {name: "Prioridad 1", id: "A"},
                    {name: "Prioridad 2", id: "B"},
                    {name: "Prioridad 3", id: "C"},
                    {name: "Prioridad 4", id: "D"},
                    {name: "Prioridad 5", id: "E"},
                    {name: "Prioridad 6", id: "F"},
                    {name: "Prioridad 7", id: "G"}
            ],
            bubble: new DayPilot.Bubble({
                onBeforeDomAdd: function(args) {
                    let e = args.source;
                    args.element = <div>JSX callout for Scheduler event:<br/> {e.data.text}</div>;
                }
              }),
              eventDoubleClickHandling : "Enabled",
              eventDeleteHandling : "Update",
            events: []
        };
    }

    zoomChange(args) {
        switch (args.level) {
            case "month":
                this.setState({
                    startDate: DayPilot.Date.today().firstDayOfMonth(),
                    days: DayPilot.Date.today().daysInMonth(),
                    scale: "Day"
                });
                break;
            case "week":
                this.setState({
                    startDate: DayPilot.Date.today().firstDayOfWeek(),
                    days: 7,
                    scale: "Day"
                });
                break;
            default:
                throw new Error("Invalid zoom level");
        }
    }

    cellWidthChange(ev) {
        var checked = ev.target.checked;
        this.setState({
            cellWidthSpec: checked ? "Auto" : "Fixed"
        });
    }

    render() {
        var {...config} = this.state;
        return (
            <div className='Schedule'>

                <div className="toolbar">
                    <Zoom onChange={args => this.zoomChange(args)} />
                </div>

                <DayPilotScheduler
                  {...config}
                  onEventMoved={args => {
                      console.log("Event moved: ", args.e.data.id, args.newStart, args.newEnd, args.newResource);
                      this.scheduler.message("Event moved: " + args.e.data.text);
                  }}
                  onEventResized={args => {
                      console.log("Event resized: ", args.e.data.id, args.newStart, args.newEnd);
                      this.scheduler.message("Event resized: " + args.e.data.text);
                  }}
                  onTimeRangeSelected={args => {
                    DayPilot.Modal.prompt("New event name", "Event").then(modal => {
                      this.scheduler.clearSelection();
                      if (!modal.result) {
                        return;
                      }
                      this.scheduler.events.add({
                        id: DayPilot.guid(),
                        text: modal.result,
                        start: args.start,
                        end: args.end,
                        resource: args.resource
                      });
                    });
                  }}

                  ref={component => { this.scheduler = component && component.control; }}
                  
                />
            </div>
        );
    }
}
*/
export default Tarea;

