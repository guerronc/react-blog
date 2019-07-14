//Componente funcional o state less

import React from "react";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import { connect } from "react-redux";

const Comentarios = props => {
  console.log("estos son los promps de componentes: ", props);

  if (props.cargando) {
    return <Spinner />;
  }

  if (props.error) {
    return <Fatal mensaje={props.error} />;
  }
  const ponerComentarios = () =>
    props.comentarios.map(comentario => (
      <li key={comentario.id}>
        <b>
          <u>{comentario.email}</u>
        </b>
        <br />
        {comentario.body}
      </li>
    ));

  return <ul>{ponerComentarios()}</ul>;
};

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);
