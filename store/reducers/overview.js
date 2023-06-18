const initialState = {
  isLoading: false,
  message: null,
  shortenData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_SHORTENED_URLS_BEGIN":
    case "SHORTCODE_CREATE_BEGIN":
    case "SHORTCODE_DELETE_BEGIN":
      return {
        ...state,
        isLoading: true,
      };
    case "SHORTCODE_CREATE_SUCCESS":
    case "SHORTCODE_DELETE_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };
    case "FETCH_SHORTENED_URLS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        shortenData: action.payload,
      };
    case "FETCH_SHORTENED_URLS_FAIL":
    case "SHORTCODE_CREATE_FAIL":
    case "SHORTCODE_DELETE_FAIL":
      return {
        ...state,
        isLoading: false,
        shortenData: null,
        message: action.payload.message,
      };
    default:
      return state;
  }
}
