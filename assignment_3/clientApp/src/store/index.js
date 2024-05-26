// import các slice
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./homeSlice/appSlice";
import trendingReducer from "./homeSlice/trendingSlice";
import catagoriesReducer from "./shopSlice/catagoriesSlice";
import detailReducer from "./detailSlice/detailSlice";
import cartReducer from "./homeSlice/cartSlice";

const store = configureStore({
  reducer: {
    appSlice: appReducer,
    trendingSlice: trendingReducer,
    catagoriesSlice: catagoriesReducer,
    detailSlice: detailReducer,
    cartSlice: cartReducer,
  },
});
export default store;
