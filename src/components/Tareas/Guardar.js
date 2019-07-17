import React, { Component } from "react";
import { connect } from "react-redux";
import * as tareasAction from "../../actions/tareasActions";

class Guardar extends Component {
  handleCambioUsuarioId = event => {
    this.props.cambioUsuarioId(event.target.value);
    console.log(event.target.value);
  };

  handleCambioTitulo = event => {
    this.props.cambioTitulo(event.target.value);
    console.log(event.target.value);
  };

  handleGuardar = () => {
    const { usuario_id, titulo, agregar } = this.props;

    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };

    agregar(nuevaTarea);

  };

  render() {
    return (
      <div>
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.handleCambioUsuarioId}
        />
        <br />
        Titulo:
        <input
          type="text"
          value={this.props.titulo}
          onChange={this.handleCambioTitulo}
        />
        <br />
        <button onClick={this.handleGuardar}>Guardar</button>
      </div>
    );
  }
}
const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(
  mapStateToProps,
  tareasAction
)(Guardar);
