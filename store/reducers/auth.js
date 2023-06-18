import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token"),
  isLoading: false,
  message: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN_BEGIN":
    case "REGISTER_BEGIN":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      Cookies.set("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      Cookies.remove("token");
      return {
        ...state,
        token: null,
        isLoading: false,
        message: action.payload.message,
      };
    case "LOGOUT_SUCCESS":
      Cookies.remove("token");
      return {
        ...state,
        token: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
