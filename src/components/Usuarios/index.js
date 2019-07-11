import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Tabla from "./Tabla";

class Usuarios extends Component {
  componentDidMount() {
    this.props.traerTodos();
  }

  /**
   * Poner contenido de la tabla de usuarios
   */
  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <Fatal mensaje={this.props.error} />;
    }

    return <Tabla/>;
  };

  render() {
    console.log(this.props.cargando);
    console.log(this.props.error);
    return <div>{this.ponerContenido()}</div>;
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(
  mapStateToProps,
  usuariosActions
)(Usuarios);
