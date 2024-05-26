import React, { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";
const socket = io("http://localhost:5000");

let roomCurrent = 0;
function Chat({ setEditProd }) {
  // check login
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      url: "http://localhost:5000/auth/check",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      if (res.data.status !== 200) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    setEditProd(null);
  });

  const [chats, setChats] = useState(null);
  const [roomChat, setRoomChat] = useState(null);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/chat",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setChats(res.data.data);
          setRoomChat(res.data.data[roomCurrent]);
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });

    // thiết lâp socket.on vào useEffect có dependeci là [] cho nên nó chỉ chạy 1 lần, nếu đặt nó bên ngoài se có hiện tượng rerender nhiều lần ko mong muốn
    socket.on("chat message", (chats) => {
      setChats(chats);
      setRoomChat(chats[roomCurrent]);
      message.current.value = "";
    });
  }, []);

  // ------------

  const handleRoomChat = (e) => {
    roomCurrent = e.target.id;
    setRoomChat(chats[roomCurrent]);
  };

  const message = useRef();
  const handleSend = () => {
    if (message.current.value !== "") {
      socket.emit("chat message", {
        msgAdmin: message.current.value,
        roomId: roomChat.roomId,
      });
    } else {
      alert("vui lòng nhập tin nhắn");
    }
  };

  // sroll end
  useEffect(() => {
    const contentChat = document.querySelector("#scoroll_end");
    if (contentChat) {
      contentChat.scrollTop = contentChat.scrollHeight;
    }
  });

  return (
    <>
      <h1>Chat</h1>
      <p>Apps/chat</p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <input
              className="form-control"
              type="text"
              placeholder="search..."
            />
            <ul className="list-unstyled">
              {chats &&
                chats.map((userChat, i) => {
                  return (
                    <li
                      key={userChat._id}
                      className="border p-2 my-2"
                      id={i}
                      content={JSON.stringify(userChat.content)}
                      onClick={handleRoomChat}
                    >
                      khách hàng: <span className="mx-2">{i}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div
            className="col-9 border position-relative "
            style={{ height: "70vh" }}
          >
            <div id="scoroll_end" className="h-100 overflow-scroll pb-5">
              <div className="chat my-4 ">
                {roomChat &&
                  roomChat.content.map((mess, i) => {
                    return (
                      <Fragment key={i}>
                        {"msgClient" in mess && (
                          <div className=" d-flex justify-content-start mb-3">
                            <div className="d-flex flex-column align-items-start w-75">
                              <p className="mb-0 px-3 py-2 bg-danger rounded-3">
                                {/* client: chat */}
                                {mess.msgClient}
                              </p>
                            </div>
                          </div>
                        )}

                        {"msgAdmin" in mess && (
                          <div className=" d-flex justify-content-end mb-3 ">
                            <div className="d-flex flex-column align-items-end w-75">
                              <p className="mb-0 px-3 py-2 bg-success rounded-3">
                                {/* user: chat */}
                                {mess.msgAdmin}
                              </p>
                            </div>
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
              </div>

              <div className="position-absolute bottom-0 start-0 w-100 ">
                <input
                  ref={message}
                  type="text"
                  className="form-control w-75 d-inline me-3 border-bottom-0"
                  placeholder="soạn tin nhắn..."
                  // nhấn enter để gửi tin nhắn tin nhắn
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                />
                <button className="btn btn-white border" onClick={handleSend}>
                  {/* <i class="fa-solid fa-paper-plane text-success"></i> */}
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
