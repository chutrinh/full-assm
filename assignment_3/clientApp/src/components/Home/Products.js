// import file css và các imgs sản phẩm
import "./Products.css";
import iphone from "../../images/product_1.png";
import macBook from "../../images/product_2.png";
import ipad from "../../images/product_3.png";
import smartWatch from "../../images/product_4.png";
import airPods from "../../images/product_5.png";

// tạo danh mục sản phẩn
function Products() {
  return (
    <>
      <div className="title-products">
        <p>CAREFULLY CREATED COLLISTION</p>
        <h2>BROWSER OUT CATEGORIES</h2>
      </div>
      <div className="macbook-smartphone">
        <img src={iphone} />
        <img src={macBook} />
      </div>
      <div className="ipad-airpods">
        <img src={ipad} />
        <img src={smartWatch} />
        <img src={airPods} />
      </div>
    </>
  );
}
export default Products;
