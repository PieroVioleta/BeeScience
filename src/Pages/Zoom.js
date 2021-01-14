import React, {Component} from 'react';

class Zoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: "month"
        }
    }

    change(ev) {
        var newLevel = ev.target.value;

        this.setState({
            level: newLevel
        });

        if (this.props.onChange) {
            this.props.onChange({level: newLevel})
        }

    }

    render() {
        return (
            <span className="toolbar-item">
                Elegir modo:
                <label><input type="radio" name="zoom" value="month" onChange={ev => this.change(ev)} checked={this.state.level === "month"} /> Mes</label>
                <label><input type="radio" name="zoom" value="week"  onChange={ev => this.change(ev)} checked={this.state.level === "week"} /> Semana</label>
            </span>
        );
    }
}

export default Zoom;