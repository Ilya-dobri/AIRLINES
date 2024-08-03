import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticket } from './FilterSlise';

interface CartSliceState {
  totalPrice: number;
  items: { ticket: Ticket, count: number }[];
  totalCount: number;
}

const initialState: CartSliceState = {
  totalPrice: parseFloat(localStorage.getItem('totalPrice') || '0'),
  totalCount: parseInt(localStorage.getItem('totalCount') || '0', 10),
  items: JSON.parse(localStorage.getItem('items') || '[]'),
};

const saveToLocalStorage = (state: CartSliceState) => {
  localStorage.setItem('totalPrice', state.totalPrice.toString());
  localStorage.setItem('totalCount', state.totalCount.toString());
  localStorage.setItem('items', JSON.stringify(state.items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.totalPrice = 0;
      state.totalCount = 0;
      state.items = [];
      saveToLocalStorage(state);
    },
    addItem: (state, action: PayloadAction<Ticket>) => {
      const existingItem = state.items.find(item => item.ticket.id === action.payload.id);
      if (existingItem) {
        existingItem.count++;
      } else {
        state.items.push({ ticket: action.payload, count: 1 });
      }
      state.totalPrice += action.payload.price;
      state.totalCount++;
      saveToLocalStorage(state);
    },
    removeItemCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.ticket.id === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        state.totalPrice -= item.ticket.price;
        state.totalCount -= 1;

        if (item.count > 1) {
          item.count--;
        } else {
          state.items.splice(index, 1);
        }
        saveToLocalStorage(state);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item.ticket.id === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        state.totalPrice -= item.ticket.price * item.count;
        state.totalCount -= item.count;
        state.items.splice(index, 1);
        saveToLocalStorage(state);
      }
    },
  },
});

export const { addItem, removeItem, removeItemCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
