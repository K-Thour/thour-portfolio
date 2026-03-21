import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, type RootState } from "./store/store";
import { AppToaster } from "./components/ui/toast/AppToaster";
import AppRoutes from "./layouts/routes/AppRoutes";

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
      <BrowserRouter>
        <ThemeSync />
        <AppRoutes />
        <AppToaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
