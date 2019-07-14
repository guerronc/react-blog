import Axios from "axios";
import {
  TRAER_POR_USUARIO,
  CARGANDO,
  ERROR
} from "../types/publicacionesTypes";

import * as usuariosTypes from "../types/usuariosTypes";

/**
 * Contante para traer los tipos(enumeradores) utilizados por usuarios
 */
const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

/**
 * Traer las publicaciones de un usuario especifico
 * @param {number} key Key del usuario para buscar las publicaciones 
 */
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

    const nuevas = respuesta.data.map(publicacion => ({
      ...publicacion,
      comentarios: [],
      abierto: false
    }));

    const publicaciones_actualizadas = [...publicaciones, nuevas];

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
      payload: `Informacion de publicaciones no disponible. Detalle error: ${
        error.message
      }`
    });
  }
};

/**
 * Buscar los comentarios de las publicaciones seleccionadas
 * @param {number} pub_key Key del usuario 
 * @param {number} com_key Key de la publicacion seleccionada
 */
export const abrirCerrar = (pub_key,com_key) => (dispatch) =>{
  try {
    console.log(pub_key,com_key);
  } catch (error) {
    console.log(error);
  }
}
