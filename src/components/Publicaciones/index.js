import React, { Component } from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosActions";

class Publicaciones extends Component {
  componentDidMount() {
    if (!this.props.usuarios.length) {
      console.log("traser usuarios");
      this.props.traerTodos();
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Publicaciones de </h1>
        <div>{this.props.match.params.key}</div>
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducers;
};

export default connect(
  mapStateToProps,
  usuariosActions
)(Publicaciones);
