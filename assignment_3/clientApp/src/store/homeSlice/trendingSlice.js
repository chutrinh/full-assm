import { createSlice } from "@reduxjs/toolkit";
// tạo nơi chứa các state toàn cục cho trending
const initialState = { isShow: false };
const trendingSlice = createSlice({
  name: "trendingSlice",
  initialState: initialState,
  reducers: {
    openModal(state) {
      state.isShow = true;
    },
    hidenModal(state) {
      state.isShow = false;
    },
  },
});
export const trendingAction = trendingSlice.actions;
export default trendingSlice.reducer;
