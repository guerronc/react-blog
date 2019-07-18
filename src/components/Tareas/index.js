import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import * as tareasActions from "../../actions/tareasActions";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";

class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }

  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;

    if (error) {
      return <Fatal mensaje={error} />;
    }

    if (cargando) {
      return <Spinner />;
    }

    return Object.keys(tareas).map(user_id => (
      <div key={user_id}>
        <h2>Usuario {user_id}</h2>
        <div className="contenedor_tareas">{this.ponerTareas(user_id)}</div>
      </div>
    ));
  };

  ponerTareas = user_id => {
    const { tareas, cambioCheck } = this.props;
    const por_usuario = {
      ...tareas[user_id]
    };

    return Object.keys(por_usuario).map(tarea_id => (
      <div key={tarea_id}>
        <input
          type="checkbox"
          defaultChecked={por_usuario[tarea_id].completed}
          onChange={()=> cambioCheck(user_id, tarea_id)}
        />
        {por_usuario[tarea_id].title}
        <button className='m_left'>
          <Link to={`/tareas/guardar/${user_id}/${tarea_id}`}>
          Editar
          </Link></button>
        <button className='m_left'>Eliminar</button>
      </div>
    ));
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <button>
          <Link to="/tareas/guardar">Agregar</Link>
        </button>
        {this.mostrarContenido()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(
  mapStateToProps,
  tareasActions
)(Tareas);
