import { createSlice } from "@reduxjs/toolkit";
// tạo nơi chứa các state toàn cục cho app
const initialState = {
  listProducts: [{}],
  isLogin: false,
  isShowChatBox: false,
};
const appSlice = createSlice({
  name: "appsSlice",
  initialState: initialState,
  reducers: {
    getProducts(state, action) {
      state.listProducts = action.payload;
    },
    Login(state, action) {
      const isLogin = JSON.parse(localStorage.getItem("isLogin"));
      state.isLogin = isLogin;
    },
    LogOut(state, action) {
      const isLogin = localStorage.removeItem("isLogin");
      state.isLogin = isLogin;
    },
    SHOW_CHAT(state, action) {
      state.isShowChatBox = !state.isShowChatBox;
    },
  },
});
export const appAction = appSlice.actions;
export default appSlice.reducer;
