import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "./routes/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  );
}

export default App;
