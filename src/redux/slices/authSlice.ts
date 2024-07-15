import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuthData: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    removeAuthData: (state) => {
      state.user = null;
    },
  },
});

export const { addAuthData, removeAuthData } = authSlice.actions;
export default authSlice.reducer;
