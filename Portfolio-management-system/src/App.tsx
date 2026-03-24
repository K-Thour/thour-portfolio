import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, type RootState } from "./store/store";
import { AppToaster } from "./components/ui/toast/AppToaster";
import AppRoutes from "./layouts/routes/AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";

function ThemeSync() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ThemeSync />
          <AppRoutes />
          <AppToaster />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
