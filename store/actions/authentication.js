import axios from "axios";

export const login = (data) => async (dispatch) => {
  dispatch({ type: "LOGIN_BEGIN" });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://shortify-u856.onrender.com/login",
      data,
      config
    );

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response.data,
    });
  }
};

export const register = (data) => async (dispatch) => {
  dispatch({ type: "REGISTER_BEGIN" });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://shortify-u856.onrender.com/register",
      data,
      config
    );

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload: error.response.data,
    });
  }
};
