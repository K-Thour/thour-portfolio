import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, type RootState } from "./store/store";
import { AppToaster } from "./components/ui/toast/AppToaster";
import AppRoutes from "./layouts/routes/AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import { fetchPublicUser } from "./services/api";
import {
  updateFavicon,
  getLoadingFaviconSvg,
  createCircularAvatarFavicon,
} from "./utils/favicon";

function TitleSync() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";

  useEffect(() => {
    let active = true;
    document.title = "Loading...";
    updateFavicon(getLoadingFaviconSvg(isDark));

    const loadTitle = async () => {
      try {
        const data = await fetchPublicUser();
        if (!active) return;
        if (data && data.name) {
          document.title = `${data.name} Portfolio CMS`;
        } else {
          document.title = "Karanveer Thour Portfolio CMS";
        }

        const avatarUrl =
          data?.image?.url ||
          (typeof data?.image === "string" ? data.image : "");
        if (avatarUrl) {
          createCircularAvatarFavicon(avatarUrl, isDark).then((fav) => {
            if (active) updateFavicon(fav);
          });
        } else {
          updateFavicon("/favicon.png");
        }
      } catch (err) {
        console.error("Failed to load CMS title and favicon:", err);
        if (active) {
          document.title = "Karanveer Thour Portfolio CMS";
          updateFavicon("/favicon.png");
        }
      }
    };

    loadTitle();

    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.name) {
        document.title = `${customEvent.detail.name} Portfolio CMS`;
      }
      const newAvatar =
        customEvent.detail?.image?.url ||
        (typeof customEvent.detail?.image === "string"
          ? customEvent.detail.image
          : "");
      if (newAvatar) {
        createCircularAvatarFavicon(newAvatar, isDark).then((fav) => {
          if (active) updateFavicon(fav);
        });
      }
    };

    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => {
      active = false;
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, [isDark]);

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
