import { useState } from "react";
import Banner from "../components/Home/Banner";
import InforOrther from "../components/Home/InforOrther";
import Products from "../components/Home/Products";
import PropUp from "../components/Home/PropUp";
import TrendingProducts from "../components/Home/TrendingProducts";
// tạo home page
function Home() {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      <Banner />
      <Products />
      <TrendingProducts
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
      <InforOrther />
      {isShowModal && (
        <PropUp isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      )}
    </>
  );
}
export default Home;
