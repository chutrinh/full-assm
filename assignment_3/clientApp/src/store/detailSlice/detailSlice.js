import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// tạo nơi chứa các state toàn cục cho page detail
export const initialState = {
  listProducts: [],
  filterData: null,
  filterRelated: [],
  amount: 0,
};
const detailSlice = createSlice({
  name: "detailSlice",
  initialState: initialState,
  reducers: {
    updateListProducts(state, action) {
      const list = action.payload;
      state.listProducts = list;
    },
    // filter sản phẩm
    filterProducts(state, action) {
      const product = action.payload;
      state.filterData = product;
      let temp = product.category;
      let id = product._id;
      state.filterRelated = state.listProducts.filter((item) => {
        if (item && item.name) {
          if (item.category === temp) {
            if (item._id !== id) {
              return item;
            }
          }
        }
      });
    },
    // tăng/giảm số lượng
    COUTER_UP(state, action) {
      state.amount = state.amount + 1;
    },
    COUTER_DOWN(state, action) {
      state.amount = state.amount - 1;
    },
    // reset amount
    RESET(state, action) {
      state.amount = 0;
    },
  },
});
export const detaiAction = detailSlice.actions;
export default detailSlice.reducer;
