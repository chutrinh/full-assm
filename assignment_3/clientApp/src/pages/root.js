import Mainnavigation from "../components/Home/MainNavigation";
import MainFooter from "../components/Home/MainFooter";
import LiveChat from "../components/LiveChat/LiveChat";
import ChatBox from "../components/LiveChat/ChatBox";

// tạo root layout trang web
function Rootlayout({ children, isLogin, setIsLogin }) {
  return (
    <>
      <header style={{ width: "1200px", margin: "0 auto" }}>
        <Mainnavigation isLogin={isLogin} setIsLogin={setIsLogin} />
        <main>{children}</main>
      </header>
      <LiveChat />
      <ChatBox />
      <footer
        style={{
          backgroundColor: "black",
          color: "white",
          fontStyle: "italic",
        }}
      >
        <MainFooter />
      </footer>
    </>
  );
}
export default Rootlayout;
