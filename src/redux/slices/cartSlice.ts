import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    updateCartItem: (state, action: PayloadAction<{ id: string; changes: Partial<CartItem> }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        Object.assign(item, action.payload.changes);
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addCartItem, updateCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
