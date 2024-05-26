// import file css
import classes from "./BannerCheckOut.module.css";
import { Link } from "react-router-dom";

// tạo banner cho checkout
function BannerCheckOut() {
  return (
    <>
      <div className={classes.banner}>
        <h1>CheckOut</h1>
        <p>
          <Link className={classes["link"]} to={"/"}>
            Home
          </Link>
          /
          <Link className={classes["link"]} to={"/cart"}>
            Cart
          </Link>
          / Checkout
        </p>
      </div>
    </>
  );
}
export default BannerCheckOut;
