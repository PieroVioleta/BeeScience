import React from "react";
import "./termSelectionSection.css";

class TermSelectionSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTermFormActivated: false,
      removeTermFormActivated: false
    };
  }

  handleActivateAddForm() {
    this.setState({ addTermFormActivated: true });
    this.setState({ removeTermFormActivated: false });
  }

  handleActivateRemoveForm() {
    this.setState({ addTermFormActivated: false });
    this.setState({ removeTermFormActivated: true });
  }

  handleChangeTerm() {
    //   Set the term selected as the current term
    let termCode = document.getElementById("term-selection").value;
    this.props.selectTerm(termCode);
    this.handleCancelForm();
  }

  handleRemoveTerm() {
    let termCode = document.getElementById("term-code-input").value;
    let year = parseInt(termCode.substr(0, 4), 10);
    let dash = termCode.substr(4, 1);
    let part = parseInt(termCode.substr(5, 1), 10);
    if(termCode.length === 6 && 1950 < year && year < 2050 && dash === '-' && 0 <= part && part <= 3) {
      this.props.removeTerm(termCode);
    }
    else {
      alert("Reporte del ciclo no eliminado. Ingrese un código válido.")
    }
    this.setState({ removeTermFormActivated: false });
  }

  handleAddTerm() {
    // Add term to the terms registered
    let termCode = document.getElementById("term-code-input").value;
    let year = parseInt(termCode.substr(0, 4), 10);
    let dash = termCode.substr(4, 1);
    let part = parseInt(termCode.substr(5, 1), 10);
    if(termCode.length === 6 && 1950 < year && year < 2050 && dash === '-' && 0 <= part && part <= 3) {
      this.props.addTerm(termCode);
    }
    else {
      alert("Reporte del ciclo no añadido. Ingrese un código válido.")
    }
    this.setState({ addTermFormActivated: false });
  }

  handleCancelForm() {
    this.setState({ addTermFormActivated: false });
    this.setState({ removeTermFormActivated: false });
  }

  render() {
    return (
      <div className="term-selection-section">
        <div className="section-header">
          <div className="section-header-buttons">
            <button
              type="button"
              id="add-term-btn"
              className="grade-report-btn"
              onClick={() => this.handleActivateAddForm()}
            >
              Agregar Ciclo
            </button>
            <button
              type="button"
              id="remove-term-btn"
              className="grade-report-btn"
              onClick={() => this.handleActivateRemoveForm()}
            >
              Eliminar Ciclo
            </button>
          </div>
          <select
            id="term-selection"
            onChange={() => this.handleChangeTerm()}
            value={
              this.props.currentTerm !== null
                ? this.props.currentTerm.termCode
                : "default"
            }
          >
            <option value="default" key="default">
              ---------
            </option>
            {this.props.terms.map((term) => (
              <option value={term} key={term}>
                {term}
              </option>
            ))}
          </select>
        </div>
        {this.state.addTermFormActivated === true ? (
          <div className="add-term-form">
            <div className="form">
              <label id="term-code-label" htmlFor="term-code-input">
                Código del ciclo:{" "}
              </label>
              <input
                id="term-code-input"
                placeholder="Ingrese el código Ej. 2020-2"
                type="text"
              ></input>
            </div>
            <div className="buttons">
              <button
                type="button"
                className="grade-report-btn confirm-btn"
                onClick={() => this.handleAddTerm()}
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
        {this.state.removeTermFormActivated === true ? (
          <div className="add-term-form">
            <div className="form">
              <label id="term-code-label" htmlFor="term-code-input">
                Código del ciclo:{" "}
              </label>
              <input
                id="term-code-input"
                placeholder="Ingrese el código Ej. 2020-2"
                type="text"
              ></input>
            </div>
            <div className="buttons">
              <button
                type="button"
                className="grade-report-btn confirm-btn"
                onClick={() => this.handleRemoveTerm()}
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

export default TermSelectionSection;
