import React, { Component } from "react";
import { connect } from "react-redux";
import * as tareasAction from "../../actions/tareasActions";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { Redirect } from "react-router-dom";

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id }
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma
    } = this.props;

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    }
    else{
      limpiarForma();
    }
  }

  handleCambioUsuarioId = event => {
    this.props.cambioUsuarioId(event.target.value);
    console.log(event.target.value);
  };

  handleCambioTitulo = event => {
    this.props.cambioTitulo(event.target.value);
    console.log(event.target.value);
  };

  handleGuardar = () => {
    const {
      usuario_id,
      titulo,
      agregar,
      match: {
        params: { usu_id, tar_id }
      },
      tareas,
      editar
    } = this.props;

    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nuevaTarea,
        completed: tarea.completed,
        id: tarea.id
      };
      editar(tarea_editada);
    } else {
      agregar(nuevaTarea);
    }
  };

  deshabilitar = () => {
    const { titulo, usuario_id, cargando } = this.props;
    if (cargando) {
      return true;
    }
    if (!usuario_id || !titulo) {
      return true;
    }

    return false;
  };

  mostrarAccion = () => {
    const { error, cargando } = this.props;
    if (error) {
      return <Fatal mensaje={error} />;
    }
    if (cargando) {
      return <Spinner />;
    }
  };

  render() {
    return (
      <div>
        {this.props.regresar ? <Redirect to="/tareas" /> : ""}
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
        <button onClick={this.handleGuardar} disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}
const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(
  mapStateToProps,
  tareasAction
)(Guardar);
