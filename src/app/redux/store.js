import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/app/features/auth/authSlice';
// import salesReducer from '@/features/sales/salesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // sales: salesReducer,
  },
});
