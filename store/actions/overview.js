import axios from "axios";
import Cookies from "js-cookie";

const tokenConfig = () => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

export const createShortCode = (data) => async (dispatch) => {
  dispatch({ type: "SHORTCODE_CREATE_BEGIN" });
  try {
    const response = await axios.post(
      "https://shortify-u856.onrender.com/shorten",
      data,
      tokenConfig()
    );

    dispatch({
      type: "SHORTCODE_CREATE_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "SHORTCODE_CREATE_FAIL",
      payload: error.response.data,
    });
  }
};

export const deleteShortCode = (shortcode) => async (dispatch) => {
  dispatch({ type: "SHORTCODE_DELETE_BEGIN" });
  try {
    const response = await axios.delete(
      `https://shortify-u856.onrender.com/delete/${shortcode}`,
      tokenConfig()
    );

    dispatch({
      type: "SHORTCODE_DELETE_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "SHORTCODE_DELETE_FAIL",
      payload: error.response.data,
    });
  }
};

export const fetchShortenedUrls = () => async (dispatch) => {
  dispatch({ type: "FETCH_SHORTENED_URLS_BEGIN" });
  try {
    const response = await axios.get(
      "https://shortify-u856.onrender.com/shorten",
      tokenConfig()
    );

    dispatch({
      type: "FETCH_SHORTENED_URLS_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_SHORTENED_URLS_FAIL",
      payload: error.response.data,
    });
  }
};
