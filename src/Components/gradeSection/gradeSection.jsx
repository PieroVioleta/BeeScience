import React from "react";
import "./gradeSection.css";

class GradeData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: "PC-1",
      grade: 20,
      isRemovable: true,
    };
  }
  render() {
    return (
      <tr className="grades-table-data">
        <td>
          {this.state.exam}
        </td>
        <td className="grade">
          <div className="passed">
          	{this.state.grade}
          </div>
        </td>
        <td className="removeable">
          {this.state.isRemovable ? (
            <input type="checkbox" disabled checked />
          ) : (
            <input type="checkbox" disabled />
          )}
        </td>
        <td>
          <button className="grade-report-btn grade-btn">Modificar</button>
        </td>
        <td>
          <button className="grade-report-btn grade-btn">Eliminar</button>
        </td>
      </tr>
    );
  }
}

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      practs: [1, 2, 3, 4, 5, 6],
      labs: [1, 2, 3, 4],
    };
  }

  handleClick() {
        
  }

  render() {
    return (
      <tr className="grades-table-data">
        <td>
          <select className="evaluation-selection">
            {this.state.practs.map((pract) => (
              <option key={"PC-" + pract} value={"PC-" + pract}>{"PC-" + pract}</option>
            ))}
            {this.state.labs.map((lab) => (
              <option key={"Lab-" + lab} value={"Lab-" + lab}>{"Lab-" + lab}</option>
            ))}
          </select>
        </td>
        <td>
            <input id="grade-input" type="text" placeholder="Ingresar nota"/>
        </td>
        <td className="removeable">
          <input type="checkbox" defaultChecked />
        </td>
        <td>
          <button className="grade-report-btn grade-btn" onClick={() => this.handleClick()}>Agregar</button>
        </td>
        <td>
          <button className="grade-report-btn grade-btn" >Cancelar</button>
        </td>
      </tr>
    );
  }
}

class GradeSection extends React.Component {
  render() {
    return this.props.isFilled ? <GradeData /> : <GradeForm />;
  }
}

export default GradeSection;
