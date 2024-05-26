// import file css
import "./MainFooter.css";

// tạo phần footer cho trang web
function MainFooter() {
  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <div className="col-footer-1">
            <h3>CUSTOMER SERIVICE</h3>
            <p>Help & Contact Us</p>
            <p>Return & Refunds</p>
            <p>Online Store</p>
            <p>Tems & Condition</p>
          </div>
          <div className="col-footer-2">
            <h3>COMPANY</h3>
            <p>What We Do</p>
            <p>Avaiable Service</p>
            <p>Lates Past</p>
            <p>FAQs</p>
          </div>
          <div className="col-footer-3">
            <h3>SOCIAL MEDIA</h3>
            <p>Twttter</p>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>pinterest</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainFooter;
