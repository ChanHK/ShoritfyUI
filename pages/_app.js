import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "../store";
import useRouterHistory from "../utils/history";

function MyApp({ Component, pageProps }) {
  const router = useRouterHistory();

  return (
    <Provider store={store}>
      <Component {...pageProps} router={router} />
    </Provider>
  );
}

export default MyApp;
