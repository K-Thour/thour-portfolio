import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.slice";
import pageEnableReducer from "./slices/pageEnable.slice";
import resumeReducer from "./slices/resume.slice";
import settingsReducer from "./slices/settings.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const themePersistConfig = {
  key: "theme",
  storage,
};

const settingsPersistConfig = {
  key: "settings",
  storage,
};

const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedSettingsReducer = persistReducer(
  settingsPersistConfig,
  settingsReducer,
);

export const store = configureStore({
  reducer: {
    theme: persistedThemeReducer,
    pageEnable: pageEnableReducer,
    resume: resumeReducer,
    settings: persistedSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
