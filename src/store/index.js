import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 