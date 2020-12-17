import React from "react";
import GradeSection from "../gradeSection/gradeSection.jsx";
import "./courseReport.css";

class CourseReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreCurso: "Desarrollo de Software",
    };
  }
  render() {
    return (
      <div className="courseGradeSection">
        <h4>{this.props.curso.nombreCurso} - {this.props.curso.codigoCurso}</h4>
        <p>Promedio del Curso: {this.props.curso.promedioCurso.toFixed(2)}</p>
        <p>Promedio de Prácticas: </p>
        <p>Promedio de Laboratorio: </p>
        <ul>
          <li key="prov">
            <GradeSection isFilled={true} onClick={() => this.handleClick()}/>
          </li>
          <li key="prov1">
            <GradeSection isFilled={false} />
          </li>
        </ul>
      </div>
    );
  }
}

export default CourseReport;
