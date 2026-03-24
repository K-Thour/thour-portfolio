import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "theme",
  storage,
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    theme: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
