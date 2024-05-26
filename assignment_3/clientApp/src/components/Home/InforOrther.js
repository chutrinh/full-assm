// import file css
import "./InforOrther.css";

// tạo component chứa các dịch vụ
function InforOrther() {
  return (
    <>
      <div className="service">
        <div className="free-shipping">
          <h2>FREE SPIPING</h2>
          <i>Free shipping worlwide</i>
        </div>
        <div className="service-24x7">
          <h2>24/7 SERVICE</h2>
          <i>Free shipping worlwide</i>
        </div>
        <div className="festival-offer">
          <h2>FESTIVAL-OFFER</h2>
          <i>Free shipping worlwide</i>
        </div>
      </div>
      <div className="form-service">
        <div>
          <h3>LET'S BE FRIENDS!</h3>
          <i>Nisi nisi tempor consequat laboris nisi.</i>
        </div>
        <div className="email">
          <input type="email" placeholder="Enter your email address" />
          <button>Subsribe</button>
        </div>
      </div>
    </>
  );
}
export default InforOrther;
