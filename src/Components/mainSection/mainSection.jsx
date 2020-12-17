import React from "react";
import SectionGradesReport from "../sectionGradesReport/sectionGradesReport";
import "./mainSection.css";

let sistemas = {
  D: {
    pesoPracticas: 1,
    pesoParcial: 0,
    pesoFinal: 0,
  },
  F: {
    pesoPracticas: 1,
    pesoParcial: 1,
    pesoFinal: 2,
  },
  G: {
    pesoPracticas: 1,
    pesoParcial: 1,
    pesoFinal: 2,
  },
};

let cursos = [
  {
    codigoCurso: "CC3S2",
    nombreCurso: "Desarrollo de Software",
    sistCalificacion: "F",
    numeroCreditos: 4,
    calificadas: true,
    laboratorios: false,
    parcial: true,
    final: true,
    sustitutorio: false,
  },
];

class Nota {
  constructor(nombreEvaluacion, nota, esEliminable) {
    this.nombreEvaluacion = nombreEvaluacion;
    this.nota = nota;
    this.esEliminable = esEliminable;
  }
  setNombre(nuevoNombre) {
    this.nombreEvaluacion = nuevoNombre;
  }
  setNota(nuevaNota) {
    this.nota = nuevaNota;
  }
  setEsEliminable(flag) {
    this.nota = flag;
  }
}

class ReporteCurso {
  constructor(codigoCurso) {
    let curso = cursos.filter((curso) => curso.codigoCurso === codigoCurso)[0];
    this.codigoCurso = curso.codigoCurso;
    this.nombreCurso = curso.nombreCurso;
    this.sistCalificacion = curso.sistCalificacion;
    this.numeroCreditos = curso.numeroCreditos;
    this.notas = {
      PC: [],
      PL: [],
      EP: [],
      EF: [],
      ES: [],
    }; //Arreglo de objetos Notas
    this.practicas = curso.calificadas;
    this.laboratorios = curso.laboratorios;
    this.parcial = curso.parcial;
    this.final = curso.final;
    this.sustitutorio = curso.sustitutorio;
    this.promedioPracticas = 0.0;
    this.promedioLaboratorios = 0.0;
    this.notaParcial = 0.0;
    this.notaFinal = 0.0;
    this.notaSustitutorio = 0.0;
    this.promedioCurso = 0.0;
  }
}

class ReporteCiclo {
  constructor(codigoCiclo) {
    this.codigoCiclo = codigoCiclo;
    this.promedioCiclo = 0.0;
    this.cursos = []; //Arreglo de objetos reporteCursos
  }
}

let initialInfo = [new ReporteCiclo("2020-1"), new ReporteCiclo("2020-2")];

class SelectSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formAddTermActivated: false,
    };
  }

  render() {
    return (
      <div>
        <div className="selectCiclo">
          <button
            className="btn"
            onClick={() => this.setState({ formAddTermActivated: true })}
          >
            Agregar Reporte de Notas
          </button>
          <button
            className="btn"
            onClick={() => {
              let ciclo = document.getElementById("selection").value;
              this.props.removeCiclo(ciclo);
            }}
          >
            Eliminar Reporte de Notas
          </button>
          <select
            id="selection"
            className="selectReport"
            onChange={() => {
              let ciclo = document.getElementById("selection").value;
              this.props.selectCiclo(ciclo);
            }}
            value={
              this.props.cicloActual !== null
                ? this.props.cicloActual.codigoCiclo
                : "default"
            }
          >
            <option value="default" key="default">
              ------
            </option>
            {this.props.ciclos.map((ciclo) => (
              <option value={ciclo.codigoCiclo} key={ciclo.codigoCiclo}>
                {ciclo.codigoCiclo}
              </option>
            ))}
          </select>
        </div>
        {this.state.formAddTermActivated ? (
          <div className="addCicloForm">
            <input
              className="inputCiclo"
              id="codCiclo"
              placeholder="(año)-(periodo) Ej. 2020-2"
              type="text"
            ></input>
            <button
              className="btn"
              onClick={() => {
                let ciclo = document.getElementById("codCiclo").value;
                this.props.addCiclo(ciclo);
                this.setState({ formAddTermActivated: false });
              }}
            >
              Agregar
            </button>
            <button
              className="btn"
              onClick={() => this.setState({ formAddTermActivated: false })}
            >
              Cancelar
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

class MainSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: initialInfo,
      cicloActual:
        initialInfo.length !== 0 ? initialInfo[initialInfo.length - 1] : null,
      sistemas: sistemas,
    };
  }

  handleSelectCiclo(codCiclo) {
    if (codCiclo === "default") {
      this.setState({ cicloActual: null });
      return;
    }
    let cicloSeleccionado = this.state.info.filter(
      (ciclo) => ciclo.codigoCiclo === codCiclo
    )[0];
    this.setState({ cicloActual: cicloSeleccionado });
  }

  handleAddCiclo(codCiclo) {
    let oldCiclo = this.state.info.filter(
      (ciclo) => ciclo.codigoCiclo === codCiclo
    );
    if (oldCiclo.length !== 0) return;
    let nuevosCiclos = this.state.info;
    let nuevoCiclo = new ReporteCiclo(codCiclo);
    nuevosCiclos = nuevosCiclos.concat([nuevoCiclo]);
    this.setState({ info: nuevosCiclos });
    this.setState({ cicloActual: nuevoCiclo });
  }

  handleRemoveCiclo(codCiclo) {
    if (codCiclo === "default") return;
    let nuevosCiclos = this.state.info.filter(
      (ciclo) => ciclo.codigoCiclo !== codCiclo
    );
    this.setState({ info: nuevosCiclos });
    this.setState({
      cicloActual:
        nuevosCiclos.length !== 0
          ? nuevosCiclos[nuevosCiclos.length - 1]
          : null,
    });
  }

  handleAddCurso(codCurso) {
    let oldCourse = this.state.cicloActual.cursos.filter(
      (curso) => curso.codigoCurso === codCurso
    );
    if (oldCourse.length !== 0) {
      alert("El curso ya añadió anteriormente");
      return;
    }
    let reporteCurso = new ReporteCurso(codCurso);
    let reportesCursos = this.state.cicloActual.cursos;
    reportesCursos = reportesCursos.concat([reporteCurso]);
    let nuevoReporteCicloActual = {
      ...this.state.cicloActual,
      cursos: reportesCursos,
    };
    let nuevoReportesCiclos = this.state.info;
    nuevoReportesCiclos = nuevoReportesCiclos.map((reporte) =>
      reporte.codigoCiclo === this.state.cicloActual.codigoCiclo
        ? nuevoReporteCicloActual
        : reporte
    );
    this.setState({ cicloActual: nuevoReporteCicloActual });
    this.setState({ info: nuevoReportesCiclos });
  }

  handleRemoveCurso(codCurso) {
    let nuevosCursos = this.state.cicloActual.cursos;
    nuevosCursos = nuevosCursos.filter(
      (curso) => curso.codigoCurso !== codCurso
    );
    console.log(nuevosCursos);
    if (nuevosCursos.length === this.state.cicloActual.cursos.length) {
      alert("El curso que se desea eliminar no se encuentra registrado");
      return;
    }
    let nuevoReporteCicloActual = {
      ...this.state.cicloActual,
      cursos: nuevosCursos,
    };
    let nuevoReportesCiclos = this.state.info;
    nuevoReportesCiclos = nuevoReportesCiclos.map((reporte) =>
      reporte.codigoCiclo === this.state.cicloActual.codigoCiclo
        ? nuevoReporteCicloActual
        : reporte
    );
    this.setState({ cicloActual: nuevoReporteCicloActual });
    this.setState({ info: nuevoReportesCiclos });
  }

  handleAddNota(nombreEvaluacion) {
    let tipo = nombreEvaluacion.splice(0, 3);
    // let notas
    this.notas = {
      PC: [],
      PL: [],
      EP: [],
      EF: [],
      ES: [],
    };
    console.log(tipo);
  }

  handleModifyNota() {}

  handleRemoveNota() {}

  render() {
    return (
      <div class="todo">
        <SelectSection
          ciclos={this.state.info}
          cicloActual={this.state.cicloActual}
          selectCiclo={(codigo) => this.handleSelectCiclo(codigo)}
          addCiclo={(codigo) => this.handleAddCiclo(codigo)}
          removeCiclo={(codigo) => this.handleRemoveCiclo(codigo)}
        />
        <SectionGradesReport
          cicloActual={this.state.cicloActual}
          addCurso={(codigo) => this.handleAddCurso(codigo)}
          removeCurso={(codigo) => this.handleRemoveCurso(codigo)}
        />
      </div>
    );
  }
}

export default MainSection;
