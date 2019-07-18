import Axios from "axios";
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_USUARIO,
  CAMBIO_TITULO,
  AGREGAR_TAREA,
  ACTUALIZAR_TAREA
} from "../types/tareasTypes";

export const traerTodas = () => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    const respuesta = await Axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {};

    respuesta.data.map(
      tar =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar
          }
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    });
  } catch (error) {
    console.log("Error: ", error.message);
    dispatch({
      type: ERROR,
      payload: `Informacion de tareas no disponible. Detalle error: ${
        error.message
      }`
    });
  }
};

export const cambioUsuarioId = usarioId => dispatch => {
  try {
    dispatch({
      type: CAMBIO_USUARIO,
      payload: usarioId
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: `Error al cambiar el usuario id. Detalle error: ${error.message}`
    });
  }
};

export const cambioTitulo = titulo => dispatch => {
  try {
    dispatch({
      type: CAMBIO_TITULO,
      payload: titulo
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: `Error al cambiar el titulo. Detalle error: ${error.message}`
    });
  }
};

export const agregar = nuevaTarea => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    const respuesta = await Axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nuevaTarea
    );
    console.log(respuesta);
    dispatch({
      type: AGREGAR_TAREA
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: `Error al guardar la nueva tarea. Detalle error: ${
        error.message
      }`
    });
  }
};

export const editar = tarea_editada => async dispatch => {
  dispatch({
    type: CARGANDO
  });
  try {
    const respuesta = await Axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
      tarea_editada
    );
    console.log(respuesta);
    dispatch({
      type: AGREGAR_TAREA
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: `Error al editar la tarea. Detalle error: ${error.message}`
    });
  }
};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
  try {
    const { tareas } = getState().tareasReducer;

    const seleccionada = tareas[usu_id][tar_id];

    const actualizadas = {
      ...tareas
    };

    actualizadas[usu_id] = {
      ...tareas[usu_id]
    };

    actualizadas[usu_id][tar_id] = {
      ...tareas[usu_id][tar_id],
      completed: !seleccionada.completed
    };

    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: actualizadas
    })


  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
      payload: `Error al cambiar check de la tarea. Detalle error: ${
        error.message
      }`
    });
  }
};
