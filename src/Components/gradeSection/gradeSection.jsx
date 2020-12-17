import React from "react";

class AddedGrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: "PC1",
      grade: 20,
      isRemovable: true,
    };
  }
  render() {
    return (
      <div>
        <span>{this.state.exam} </span>
        <span>{this.state.grade}</span>
        {this.state.isRemovable ? (
          <input type="checkbox" disabled checked />
        ) : (
          <input type="checkbox" disabled />
        )}
        <button>Modificar nota</button>
        <button>Eliminar nota</button>
      </div>
    );
  }
}

class AddGradeForm extends React.Component {
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
      <div>
        <select>
          {this.state.practs.map((pract) => (
            <option key={"PC-" + pract} value={"PC-" + pract}>{"PC-" + pract}</option>
          ))}
          {this.state.labs.map((lab) => (
            <option key={"Lab-" + lab} value={"Lab-" + lab}>{"Lab-" + lab}</option>
          ))}
        </select>
        <input type="number" placeholder="Nota" min="0" max="20" />
        <input type="checkbox" defaultChecked />
        <button onClick={() => this.handleClick()}>Agregar calificación</button>
      </div>
    );
  }
}

class GradeSection extends React.Component {
  render() {
    return <div>{this.props.isFilled ? <AddedGrade /> : <AddGradeForm />}</div>;
  }
}

// class Evaluation {
//   constructor(exam, grade, isRemovable) {
//     this.exam = exam;
//     this.grade = grade;
//     this.isRemovable = isRemovable;
//   }
// }

export default GradeSection;
