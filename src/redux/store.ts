import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// for auth slice

// const dispatch = useAppDispatch();
// const user = useAppSelector((state) => state.auth.user);

// const handleAddAuthData = () => {
//   dispatch(addAuthData({ id: '1', name: 'John Doe', email: 'john@example.com' }));
// };

// const handleRemoveAuthData = () => {
//   dispatch(removeAuthData());
// };


// for cart slice

// const dispatch = useAppDispatch();
// const cartItems = useAppSelector((state) => state.cart.items);

// const handleAddCartItem = () => {
//   dispatch(addCartItem({ id: '1', name: 'Product 1', quantity: 1, price: 100 }));
// };

// const handleUpdateCartItem = () => {
//   dispatch(updateCartItem({ id: '1', changes: { quantity: 2 } }));
// };

// const handleRemoveCartItem = () => {
//   dispatch(removeCartItem('1'));
// };