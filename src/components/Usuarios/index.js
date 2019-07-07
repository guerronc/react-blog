import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";

class Usuarios extends Component {
  /* constructor() {
    super();
    this.state = {
      usuarios: []
    };
  }

  async componentDidMount() {
    const respuesta = await Axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    this.setState({
      usuarios: respuesta.data
    });
  } */

  ponerFilas = () =>
    this.props.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));

  render() {
    return (
      <div>
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>{this.ponerFilas()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducers;
};

export default connect(
  mapStateToProps,
  {}
)(Usuarios);
