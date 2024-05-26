// import file css và hooks
import classes from "./LiveChat.module.css";
import ReactDOM from "react-dom";
import { appAction } from "../../store/homeSlice/appSlice";
import { useDispatch } from "react-redux";

// tạo icon message live chat khi click vào sẽ mở modal
function LiveChat() {
  const dispatch = useDispatch();
  const handleShowLiveChat = () => {
    dispatch(appAction.SHOW_CHAT());
  };

  return ReactDOM.createPortal(
    <div className={classes["live-chat"]}>
      <i
        onClick={handleShowLiveChat}
        className="fa-brands fa-facebook-messenger fa-3x"
      ></i>
    </div>,
    document.querySelector("#popup")
  );
}
export default LiveChat;
