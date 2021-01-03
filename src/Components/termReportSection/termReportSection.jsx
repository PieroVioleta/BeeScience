import React from "react";
import CourseReportSection from "../courseReportSection/courseReportSection.jsx";
import TermReportHeader from "../termReportHeader/termReportHeader.jsx";
import "./termReportSection.css";

var courseReport = {
  name: "Desarrollo de Software",
  code: "CC3S2",
  evaluations: ["PC", "EP", "EF", "ES"]
};

class TermReportSection extends React.Component {
  render() {
    return this.props.cicloActual === null ? (
      <div className="term-report-section noTerm">
        <h3>No hay registros. Seleccione o agregue un reporte de un ciclo.</h3>
      </div>
    ) : (
      <div className="term-report-section">
        <TermReportHeader
          currentTerm={this.props.cicloActual}
          addCourse={(codigo) => this.props.addCurso(codigo)}
          removeCourse={(codigo) => this.props.removeCurso(codigo)}
        />
        <h4 className="promedioCiclo">
          Promedio del Ciclo: {this.props.cicloActual.promedioCiclo.toFixed(3)}
        </h4>
        {this.props.cicloActual.cursos.map((curso) => (
          <div>
            <CourseReportSection key={curso.codigoCurso} curso={curso} />
            <CourseReportSection key={curso.codigoCurso} curso={curso} />
            <CourseReportSection key={curso.codigoCurso} curso={curso} />
          
          </div>))}
      </div>
    );
  }
}

export default TermReportSection;
