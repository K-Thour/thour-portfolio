import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, type RootState } from "./store/store";
import { AppToaster } from "./components/ui/toast/AppToaster";
import AppRoutes from "./layouts/routes/AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import { fetchPublicUser } from "./services/api";

function TitleSync() {
  useEffect(() => {
    const loadTitle = async () => {
      try {
        const data = await fetchPublicUser();
        if (data && data.name) {
          document.title = `${data.name} Portfolio CMS`;
        } else {
          document.title = "Karanveer Thour Portfolio CMS";
        }
      } catch (err) {
        console.error("Failed to load CMS title:", err);
        document.title = "Karanveer Thour Portfolio CMS";
      }
    };

    loadTitle();

    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.name) {
        document.title = `${customEvent.detail.name} Portfolio CMS`;
      }
    };

    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  return null;
}

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
          <TitleSync />
          <AppRoutes />
          <AppToaster />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
