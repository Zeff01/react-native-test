import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import globalReducer from "./globalSlice";

const reducers = combineReducers({
  global: globalReducer,
});

const reduxStorage = {
  setItem: (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = AsyncStorage.getItem(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    AsyncStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "root",
  storage: reduxStorage,
  whitelist: ["global"], // Assuming global contains the data you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export { store, persistor };
