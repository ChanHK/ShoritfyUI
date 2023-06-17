import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token"),
  isAuthenticated: null,
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
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGIN_FAIL":
    case "LOGOUT_SUCCESS":
    case "REGISTER_FAIL":
      console.log(action.payload.message)
      Cookies.remove("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        message: action.payload.message,
      };
    default:
      return state;
  }
}
