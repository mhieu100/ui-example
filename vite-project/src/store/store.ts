import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice.ts';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice.ts';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    chat: chatReducer,
  },
});

export default store;