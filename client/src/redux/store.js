import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers (in case you add more later)
const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }),
});

// Persistor to sync storage
export const persistor = persistStore(store);
