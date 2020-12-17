import React from "react";
import CourseReport from "../courseReport/courseReport.jsx";
import "./sectionGradesReport.css";

class SectionGradesReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formAddCourseActivated: false,
      formRemoveCourseActivated: false,
    };
  }
  render() {
    return (
      <div className="reportSection">
        {this.props.cicloActual === null ? (
          <div>
            <h3 className="nothingFound">No hay registros. Seleccione o agregue un reporte de notas</h3>
          </div>
        ) : (
          <div>
            <span className="headerCiclo">
              <h2 className="reportSection-title">
                Ciclo {this.props.cicloActual.codigoCiclo}
              </h2>
              <button
                className="btn"
                onClick={() => {
                  this.setState({ formAddCourseActivated: true });
                  this.setState({ formRemoveCourseActivated: false });
                }}
              >
                Agregar Reporte del Curso
              </button>
              <button
              className="btn"
                onClick={() =>
                  {
                    this.setState({ formAddCourseActivated: false });
                    this.setState({ formRemoveCourseActivated: true });
                  }
                }
              >
                Eliminar Reporte del Curso
              </button>
            </span>
              {this.state.formAddCourseActivated ? (
                <div className="addCourseForm">
                  <input
                    id="codCurso"
                    placeholder="Escriba el codigo del curso"
                    type="text"
                  ></input>{" "}
                  <button className="btn"
                    onClick={() => {
                      let curso = document.getElementById("codCurso").value;
                      this.props.addCurso(curso);
                      this.setState({ formAddCourseActivated: false });
                    }}
                  >
                    Agregar
                  </button>
                  <button className="btn"
                    onClick={() =>
                      this.setState({ formAddCourseActivated: false })
                    }
                  >
                    Cancelar
                  </button>
                </div>
              ) : null}
              {this.state.formRemoveCourseActivated ? (
                <div className="addCourseForm">
                  <input
                    id="codCurso"
                    placeholder="Escriba el codigo del curso"
                    type="text"
                  ></input>{" "}
                  <button className="btn"
                    onClick={() => {
                      let curso = document.getElementById("codCurso").value;
                      this.props.removeCurso(curso);
                      this.setState({ formRemoveCourseActivated: false });
                    }}
                  >
                    Eliminar
                  </button>
                  <button className="btn"
                    onClick={() =>
                      this.setState({ formRemoveCourseActivated: false })
                    }
                  >
                    Cancelar
                  </button>
                </div>
              ) : null}

            <p className="promedioCiclo">
              Promedio del Ciclo:{" "}
              {this.props.cicloActual.promedioCiclo.toFixed(3)}
            </p>
            {this.props.cicloActual.cursos.map((curso) => (
              <CourseReport key={curso.codigoCurso} curso={curso}/>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SectionGradesReport;
