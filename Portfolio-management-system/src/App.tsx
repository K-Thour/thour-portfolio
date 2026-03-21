import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppToaster } from "./components/ui/toast/AppToaster";
import AppRoutes from "./layouts/routes/AppRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
        <AppToaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
