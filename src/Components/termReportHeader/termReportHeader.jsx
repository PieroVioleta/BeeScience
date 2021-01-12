import React from "react";
import "./termReportHeader.css";

class TermReportHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCourseFormActivated: false,
      removeCourseFormActivated: false
    };
  }

  handleActivateAddForm() {
    this.setState({ addCourseFormActivated: true });
    this.setState({ removeCourseFormActivated: false });
  }

  handleActivateRemoveForm() {
    this.setState({ addCourseFormActivated: false });
    this.setState({ removeCourseFormActivated: true });
  }

  handleAddCourse() {
    let courseCode = document.getElementById("course-code-input").value;
    this.props.addCourse(courseCode.toUpperCase());
    this.setState({ addCourseFormActivated: false });
  }

  handleCancelForm() {
    this.setState({ addCourseFormActivated: false });
    this.setState({ removeCourseFormActivated: false });
  }

  handleRemoveCourse() {
    let courseCode = document.getElementById("course-code-input").value;
    this.props.removeCourse(courseCode.toUpperCase());
    this.setState({ removeCourseFormActivated: false });
  }

  render() {
    return (
      <div className="term-report-header">
        <div className="term-report-header-title">
          <h1 id="term-title">Ciclo {this.props.currentTerm.termCode}</h1>
          <button
            type="button"
            className="grade-report-btn"
            onClick={() => this.handleActivateAddForm()}
          >
            Agregar Curso
          </button>
          <button
            type="button"
            className="grade-report-btn"
            onClick={() => this.handleActivateRemoveForm()}
          >
            Eliminar Curso
          </button>
        </div>
        {this.state.addCourseFormActivated === true ? (
          <div className="term-report-header-form">
            <div className="course-form">
              <label className="course-code-label" htmlFor="course-code-input">
                Código del curso:{" "}
              </label>
              <input
                id="course-code-input"
                placeholder="Escriba el código del curso"
                type="text"
              ></input>{" "}
            </div>
            <div className="course-form-buttons">
              <button
                type="button"
                className="grade-report-btn confirm-btn"
                onClick={() => this.handleAddCourse()}
              >
                Agregar
              </button>
              <button
                type="button"
                className="grade-report-btn cancel-btn"
                onClick={() => this.handleCancelForm()}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : null}
        {this.state.removeCourseFormActivated === true ? (
          <div className="term-report-header-form">
            <div className="form">
              <label className="course-code-label" htmlFor="course-code-input">
                Código del curso:{" "}
              </label>
              <input
                id="course-code-input"
                placeholder="Escriba el código del curso"
                type="text"
              ></input>{" "}
            </div>
            <div className="buttons">
              <button
                type="button"
                className="grade-report-btn confirm-btn"
                onClick={() => this.handleRemoveCourse()}
              >
                Eliminar
              </button>
              <button
                type="button"
                className="grade-report-btn cancel-btn"
                onClick={() => this.handleCancelForm()}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TermReportHeader;
