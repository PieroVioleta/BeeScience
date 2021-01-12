import React from "react";
import CourseReportSection from "../courseReportSection/courseReportSection.jsx";
import TermReportHeader from "../termReportHeader/termReportHeader.jsx";
import "./termReportSection.css";

class TermReportSection extends React.Component {
  render() {
    return this.props.currentTerm === null ? (
      <div className="term-report-section noTerm">
        <h3>No hay registros. Seleccione o agregue un reporte de un ciclo.</h3>
      </div>
    ) : (
      <div className="term-report-section">
        <TermReportHeader
          currentTerm={this.props.currentTerm}
          addCourse={(courseCode) => this.props.addCourse(courseCode)}
          removeCourse={(courseCode) => this.props.removeCourse(courseCode)}
        />
        <h4 className="final-term-grade">
          Promedio del Ciclo: {this.props.currentTerm.termGrade.toFixed(3)}
        </h4>
        {this.props.courses.map((course) => (
            <CourseReportSection key={course.course_code} course={course} addGrade={this.props.addGrade} removeGrade={this.props.removeGrade}/>
        ))}
      </div>
    );
  }
}

export default TermReportSection;
