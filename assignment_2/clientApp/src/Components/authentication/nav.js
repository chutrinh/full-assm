import "../home/Navbar/NavBar.css"; // import file navbar css vào để css cho component hiện tại

// tạo component navbar
function Nav({ setLogin }) {
  const handleRegis = () => {
    setLogin(false);
  };
  const handleLogin = () => {
    setLogin(true);
  };
  return (
    <div className="nav-bar">
      <div className="nav-container">
        <div className="nav-user">
          <h2>Booking Website</h2>
          <div>
            <button onClick={handleRegis} className="btn-nav">
              Register
            </button>
            <button onClick={handleLogin} className="btn-nav">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Nav; // xuất dữ liệu ra ngoài
