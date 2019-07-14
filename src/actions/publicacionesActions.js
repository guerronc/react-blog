import Axios from "axios";
import {
  TRAER_POR_USUARIO,
  CARGANDO,
  ERROR
} from "../types/publicacionesTypes";

import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = key => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO
  });
  try {
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id;

    const respuesta = await Axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
    );

    const publicaciones_actualizadas = [...publicaciones, respuesta.data];

    const publicaciones_key = publicaciones_actualizadas.length - 1;

    const usuarios_actualizados = [...usuarios];

    dispatch({
      type: TRAER_POR_USUARIO,
      payload: publicaciones_actualizadas
    });

    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key
    };

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: ERROR,
      payload: `Informacion de publicaciones no disponible. Detalle error: ${error.message}`
    });
  }
};
