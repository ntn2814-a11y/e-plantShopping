import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === product.name || item.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const productKey = action.payload?.name ?? action.payload?.id ?? action.payload;
      state.items = state.items.filter(
        (item) => item.name !== productKey && item.id !== productKey,
      );
    },
    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.id !== id && item.name !== name,
        );
        return;
      }

      const item = state.items.find(
        (cartItem) => cartItem.id === id || cartItem.name === name,
      );
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
