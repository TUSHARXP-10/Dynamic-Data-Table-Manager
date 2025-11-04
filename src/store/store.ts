import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from './tableSlice';

const tablePersistConfig = {
  key: 'table',
  storage,
  whitelist: ['columnVisibility', 'columnOrder'],
};

const persistedTableReducer = persistReducer(tablePersistConfig, tableReducer);

export const store = configureStore({
  reducer: {
    table: persistedTableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
