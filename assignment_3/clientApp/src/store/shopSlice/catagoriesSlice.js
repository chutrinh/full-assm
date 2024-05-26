import { createSlice } from "@reduxjs/toolkit";
// tạo nơi lưu các state toàn cục cho shop
const initialState = {
  listProducts: [],
  filterData: [],
  isStart: true,
  numberList: 1,
};
const catagoriesSlice = createSlice({
  name: "catagoriesSlice",
  initialState: initialState,
  reducers: {
    updateListProducts(state, action) {
      state.listProducts = action.payload;
    },
    filterProducts(state, action) {
      state.isStart = false;
      if (action.payload !== "All") {
        state.filterData = state.listProducts.filter((item) => {
          if (item.category === action.payload) {
            return item;
          }
        });
      }
      if (action.payload === "All") {
        state.filterData = state.listProducts;
      }
    },

    // reset update
    REST_isStart(state, action) {
      state.isStart = true;
    },

    // sang trang sản phẩm kế tiếp
    COUNTER_UP(state, action) {
      state.isStart = false;
      const { inexProduct } = action.payload;
      state.numberList += 1;
      const nameProduct = inexProduct[state.numberList];
      if (nameProduct !== "All") {
        state.filterData = state.listProducts.filter((item) => {
          if (item.category === nameProduct) {
            return item;
          }
        });
      }
      if (nameProduct === "All") {
        state.filterData = state.listProducts;
      }
    },
    // lùi lại trang sản phẩm trước
    COUNTER_DOWN(state, action) {
      state.isStart = false;
      const { inexProduct } = action.payload;
      state.numberList -= 1;
      const nameProduct = inexProduct[state.numberList];
      if (nameProduct !== "All") {
        state.filterData = state.listProducts.filter((item) => {
          if (item.category === nameProduct) {
            return item;
          }
        });
      }
      if (nameProduct === "All") {
        state.filterData = state.listProducts;
      }
    },

    // setnumber
    SET_NUMBER(state, action) {
      state.numberList = action.payload;
    },

    // tìm kiếm sản phẩm
    FIND_PRODUCTS(state, action) {
      state.isStart = false;
      const valueFindInput = action.payload;
      state.filterData = state.listProducts.filter((item) => {
        if (
          item.name
            .toLocaleLowerCase()
            .includes(valueFindInput.toLocaleLowerCase())
        ) {
          return item;
        }
      });
    },
  },
});
export const catagoriesAction = catagoriesSlice.actions;
export default catagoriesSlice.reducer;
