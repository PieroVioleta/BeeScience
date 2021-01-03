import React from "react";
import "./termSelectionSection.css";

class TermSelectionSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addTermFormActivated: false,
    };
  }

  handleRemoveTerm() {
    let term = document.getElementById("term-selection").value;
    this.props.removeTerm(term);
  }

  handleChangeTerm() {
    //   Set the term selected as the current term
    let term = document.getElementById("term-selection").value;
    this.props.selectTerm(term);
  }

  handleAddTerm() {
    // Add term to the terms registered
      let term = document.getElementById("term-code-input").value;
      this.props.addCiclo(term);
      this.setState({ addTermFormActivated: false });
  }

  render() {
    return (
        <div class="term-selection-section">
          <div class="section-header">
            <div className="section-header-buttons">
              <button
                type="button"
                id="add-term-btn"
                className="grade-report-btn"
                onClick={() => this.setState({ addTermFormActivated: true })}
              >
                Agregar Ciclo
              </button>
              <button
                type="button"
                id="remove-term-btn"
                className="grade-report-btn"
                onClick={() => this.handleRemoveTerm()}
              >
                Eliminar Ciclo
              </button>
            </div>
            <select
              id="term-selection"
              onChange={() => this.handleChangeTerm()}
              value={
                // Cambia codigoCiclo por termCode
                // Display currentTerm by default
                this.props.currentTerm !== null
                  ? this.props.currentTerm.codigoCiclo
                  : "default"
              }
            >
              <option value="default" key="default">
                ---------
              </option>
              {/* Cambiar ciclos por terms */}
              {this.props.ciclos.map((term) => (
                <option value={term.codigoCiclo} key={term.codigoCiclo}>
                  {term.codigoCiclo}
                </option>
              ))}
            </select>
          </div>
          {(this.state.addTermFormActivated === true) ? 
            <div className="add-term-form">
              <div className="form">
                <label id="term-code-label" for="term-code-input">
                  Código del ciclo:{" "}
                </label>
                <input
                  id="term-code-input"
                  placeholder="Ingrese el código del ciclo"
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
              	  onClick={() => this.setState({ addTermFormActivated: false })}
              	>
              	  Cancelar
              	</button>
              </div>
            </div>
           : null}
        </div>
    );
  }
}

export default TermSelectionSection;
