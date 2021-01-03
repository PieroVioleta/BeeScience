import React from "react";
import GradeSection from "../gradeSection/gradeSection.jsx";
import "./courseReportSection.css";

class CourseReportSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreCurso: "Desarrollo de Software",
    };
  }
  render() {
    return (
      <div className="course-report-section">
        <h2>{this.props.curso.nombreCurso} - {this.props.curso.codigoCurso}</h2>
        <p>Promedio del Curso: {this.props.curso.promedioCurso.toFixed(2)}</p>
        <p>Promedio de Prácticas: {this.props.curso.promedioPracticas.toFixed(2)}</p>
        <table className="grades-table">
          <tr className="grades-table-headers">
            <th>Evaluación</th>
            <th>Nota</th>
            <th className="removeable">¿Es eliminable?</th>
            <th></th>
            <th></th>
          </tr>
          {/* Por cada nota agregar una fila */}
            <GradeSection isFilled={true} onClick={() => this.handleClick()}/>
            <GradeSection isFilled={false} />
        </table>
      </div>
    );
  }
}

export default CourseReportSection;
