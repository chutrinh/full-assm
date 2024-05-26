import { Link } from "react-router-dom";
import banner from "../../images/banner1.jpg";
// import file css
import "./Banner.css";

// tạo banner cho home page
function Banner() {
  return (
    <>
      <div className="banner">
        <img src={banner} />
        <div className="banner-infor">
          <p>NEW INSPIRATION 2020</p>
          <h2>20% OFF ON NEW SEASON</h2>
          <Link to="/shop">
            <button>
              <i>Browser collections</i>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Banner;
