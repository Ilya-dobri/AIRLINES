import { configureStore } from '@reduxjs/toolkit';
import FilterSlise from './slice/FilterSlise';
import cartReducer from '../redux/slice/CardSlise';



const store = configureStore({
  reducer: {
    FilterSlise,
    cart: cartReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;