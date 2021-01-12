import React from "react";
import "./gradeSection.css";

class GradeData extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  handleRemoveGrade() {
    this.props.removeGrade(this.props.courseCode, this.props.grade);
    document.getElementById("add-btn-" + this.props.courseCode).disabled = false;
  }

  render() {
    return (
      <tr className="grades-table-data">
        <td>{this.props.grade.evaluationName}</td>
        <td className="grade">
          <div className={(this.props.grade.grade >= 10) ? "passed" : "failed"}>{this.props.grade.grade}</div>
        </td>
        <td className="removeable">
          {this.props.grade.isRemovable ? (
            <input type="checkbox" disabled checked />
          ) : (
            <input type="checkbox" disabled />
          )}
        </td>
        <td colSpan="2">
          <button
            className="grade-report-btn grade-btn"
            onClick={() => this.handleRemoveGrade()}
          >
            Eliminar
          </button>
        </td>
      </tr>
    );
  }
}

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addGrade: (this.props.quizzes.length === 0 && this.props.labs.length === 0 && this.props.midterm !== null && this.props.final !== null && this.props.makeUp !== null) ? false : true
    }
  }

  handleAddGrade() {
    let courseCode = this.props.courseCode;
    let evaluationName = document.getElementById(
      "evaluation-input-" + courseCode
    ).value;
    let grade = document.getElementById("grade-input-" + courseCode).value;
    if(grade === "" || grade.length > 2) {
      alert("Ingrese una nota válida");
      this.handleCancel();
      return;
    }
    grade = parseInt(grade, 10);
    if(grade >= 0 && grade <= 20) {
      let activated = document.getElementById("removeable-input-" + courseCode).checked;
      let newGrade = {
        evaluationName: evaluationName,
        grade: grade,
        isRemovable: activated
      };
      this.props.addGrade(courseCode, newGrade);
    }
    else {
      alert("Ingrese una nota válida en el campo requerido");
    }
    this.handleCancel();
  }

  handleCancel() {
    let courseCode = this.props.courseCode;
    let input = document.getElementById("grade-input-" + courseCode);
    input.value = "";
    let checkbox = document.getElementById("removeable-input-" + courseCode);
    checkbox.checked = true;
    return;
  }

  render() {
    return (
      <tr className="grades-table-data">
        <td>
          <select
            id={"evaluation-input-" + this.props.courseCode}
            className="evaluation-selection"
          >
            <option value="default" key="default">
              Escoge una opción
            </option>
            {this.props.quizzes.map((pract) => (
              <option key={"PC-" + pract} value={"PC-" + pract}>
                {"PC-" + pract}
              </option>
            ))}
            {this.props.labs.map((lab) => (
              <option key={"LAB-" + lab} value={"LAB-" + lab}>
                {"LAB-" + lab}
              </option>
            ))}
            {(this.props.midterm === null) ? <option key={"EP"} value={"EP"}>
              {"EP"}
            </option> : null}
            {(this.props.final === null) ? <option key={"EF"} value={"EF"}>
              {"EF"}
            </option> : null}
            {(this.props.makeUp === null) ? <option key={"ES"} value={"ES"}>
              {"ES"}
            </option> : null}
          </select>
        </td>
        <td id="input">
          <input
            id={"grade-input-" + this.props.courseCode}
            className="grade-input"
            type="text"
            placeholder="Ingresar nota"
          />
        </td>
        <td className="removeable">
          <input
            id={"removeable-input-" + this.props.courseCode}
            type="checkbox"
            defaultChecked
          />
        </td>
        <td>
          <button
            id={"add-btn-" + this.props.courseCode}
            className="grade-report-btn grade-btn"
            onClick={() => this.handleAddGrade()}
            disabled={!this.state.addGrade}
          >
            Agregar
          </button>
        </td>
        <td>
          <button
            className="grade-report-btn grade-btn"
            onClick={() => this.handleCancel()}
          >
            Cancelar
          </button>
        </td>
      </tr>
    );
  }
}

class GradeSection extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return this.props.isFilled ? (
      <GradeData
        grade={this.props.grade}
        courseCode={this.props.courseCode}
        removeGrade={this.props.removeGrade}
      />
    ) : (
      <GradeForm
        courseCode={this.props.courseCode}
        addGrade={this.props.addGrade}
        quizzes={this.props.quizzes}
        labs={this.props.labs}
        midterm={this.props.midterm}
        final={this.props.final}
        makeUp={this.props.makeUp}
      />
    );
  }
}

export default GradeSection;
