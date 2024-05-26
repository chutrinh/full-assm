// import file css và hook, reac-dom
import { useEffect, useRef, useState } from "react";
import classes from "./ChatBox.module.css";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");
// tạo ô chat với admin
function ChatBox() {
  const isShowChatBox = useSelector((state) => state.appSlice.isShowChatBox);
  const message = useRef();

  const handleSendMessage = () => {
    if (message.current.value !== "") {
      if (!localStorage.getItem("roomId")) {
        const roomId = Math.random();
        localStorage.setItem("roomId", JSON.stringify(roomId));
      }
      if (message.current.value.toLocaleLowerCase() === "/end") {
        setChats(null);
        localStorage.removeItem("roomId");
        return (message.current.value = "");
      }
      const roomId = JSON.parse(localStorage.getItem("roomId"));
      socket.emit("chat message", {
        msgClient: message.current.value,
        roomId: roomId,
      });
    } else {
      alert("vui lòng nhận tin nhắn");
    }
  };

  const [chats, setChats] = useState(null);
  useEffect(() => {
    axios({
      url: "http://localhost:5000/chatClient",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 200) {
          const roomId = JSON.parse(localStorage.getItem("roomId"));
          const chatRoom = res.data.data.find(
            (roomChat) => roomChat.roomId.toString() === roomId.toString()
          );

          if (chatRoom) {
            setChats(chatRoom);
          }
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        // alert(err.message);
      });

    socket.on("chat message", (message) => {
      const roomId = JSON.parse(localStorage.getItem("roomId"));
      const chatRoom = message.find(
        (roomChat) => roomChat.roomId.toString() === roomId.toString()
      );

      if (chatRoom) {
        setChats(chatRoom);
        document.querySelector("#chatbox").value = "";
        const contentChat = document.querySelector(
          ".ChatBox_content-chat__ZOCFz"
        );
        if (contentChat) {
          contentChat.scrollTop = contentChat.scrollHeight;
        }
      }
    });
  }, []);

  useEffect(() => {
    const contentChat = document.querySelector(".ChatBox_content-chat__ZOCFz");
    if (contentChat) {
      contentChat.scrollTop = contentChat.scrollHeight;
    }
  });

  return (
    <>
      {isShowChatBox &&
        ReactDOM.createPortal(
          <div id="chat-box" className={classes["chat-box"]}>
            <div>
              <div className={classes["col-1"]}>
                <h3>Custemer Support</h3>
                <p>Let's chat app</p>
              </div>
              <div className={classes["col-2"]}>
                <div className={`${classes["content-chat"]}  `}>
                  {chats &&
                    chats.content.map((message, i) => {
                      if ("msgClient" in message) {
                        return (
                          <div key={i} className={classes["users"]}>
                            <p>
                              <span>{message.msgClient}</span>
                            </p>
                          </div>
                        );
                      }
                      if ("msgAdmin" in message) {
                        return (
                          <div key={i} className={classes["admin"]}>
                            <div className={classes["admin-content"]}>
                              <i className="fa-solid fa-user"></i>
                              <span>{message.msgAdmin}</span>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
                <div className={classes["write-content"]}>
                  <div>
                    <i className="fa-solid fa-user"></i>
                    <input
                      id="chatbox"
                      ref={message}
                      type="text"
                      placeholder="Enter your message"
                      // nhấn enter để gửi tin nhắn tin nhắn
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <i className="fa-solid fa-paperclip"></i>
                    <i className="fa-solid fa-face-smile"></i>
                    <i
                      onClick={handleSendMessage}
                      style={{ color: "blue" }}
                      className="fa-solid fa-paper-plane"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.querySelector("#popup")
        )}
    </>
  );
}
export default ChatBox;
