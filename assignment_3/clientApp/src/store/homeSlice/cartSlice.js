import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listProducts: [],
  total: 0,
};
// tạo nơi chứa các state toàn cục cho cart
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    // UPDATE_TOTAL
    UPDATE_TOTAL(state, actions) {
      state.total = actions.payload;
    },
  },
});
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
