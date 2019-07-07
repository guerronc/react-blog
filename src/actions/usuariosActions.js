import Axios from "axios";

export const traerTodos = () => async dispatch => {
  const respuesta = await Axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  dispatch({
    type: "traer_usuarios",
    payload: respuesta.data
  });
};
