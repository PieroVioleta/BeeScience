import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";

class Tarea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            startDate: "2021-01-01",
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
                      this.scheduler.message("Tarea : " + args.e.data.text);
                  }}
                  onEventResized={args => {
                      console.log("Event resized: ", args.e.data.id, args.newStart, args.newEnd);
                      this.scheduler.message("Tarea cambio tamaño: " + args.e.data.text);
                  }}
                  onTimeRangeSelected={args => {
                    DayPilot.Modal.prompt("Nombre de nueva tarea", "Event").then(modal => {
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

export default Tarea;

