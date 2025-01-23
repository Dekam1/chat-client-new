import React from "react";
import { ConfigProvider, Input, Button, Spin } from "antd";
import { SendOutlined, DisconnectOutlined } from "@ant-design/icons";
import { Navigate, useParams } from "react-router-dom";
import MessageItem from "./MessageItem";
import useChat from "../hooks/useChat";

const styles = {
  components: {
    Input: {
      colorPrimaryHover: "",
      colorBorder: "#202124",
      activeBg: "#202124",
      colorPrimary: "",
      activeShadow: "",
      colorText: "#fff",
      fontSize: 17,
      lineWidth: 5,
      colorBgContainer: "#202124",
      colorTextPlaceholder: "#fff",
    },
    Button: {
      defaultBg: "#6900C6",
      defaultBorderColor: "#6900C6",
      defaultColor: "#fff",
      colorPrimaryHover: "",
      borderColorDisabled: "gray",
      colorBgContainerDisabled: "gray",
      colorTextDisabled: "#fff",
    },
  },
};

export default function Chat() {
  const scroll = React.useRef(null);
  const [userId, setUserId] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const { roomId } = useParams();
  const { messages, data, addMessage, removeRoom } = useChat(roomId);

  React.useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  React.useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addMessage({ text: inputValue, senderId: userId });
      setInputValue("");
    }
  };

  const currentRoom = data.find((room) => roomId === room.roomId) || {
    users: [userId],
  };

  const { creator } = currentRoom;

  const currentUser = creator === userId;

  if (!messages) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="chat-page">
      {currentRoom?.users.length < 2 ? (
        <div className="chat-page__loader">
          <Spin
            fullscreen
            tip={currentUser ? "Ожидание собеседника" : "Загрузка"}
            size="large"
          >
            <div className="content"></div>
          </Spin>
          <ConfigProvider theme={styles}>
            {creator === userId ? (
              <Button
                onClick={() => removeRoom()}
                size="large"
                shape="circle"
                icon={<DisconnectOutlined />}
                style={{ zIndex: 1000 }}
              />
            ) : null}
          </ConfigProvider>
        </div>
      ) : (
        <div className="chat-page__wrapper">
          <div style={{ height: window.innerHeight }} className="chat">
            <div className="chat__body">
              <ul className="messages">
                {messages.map((message) => (
                  <MessageItem
                    currentUser={message.senderId === userId}
                    text={message.text}
                  />
                ))}
                <span ref={scroll} />
              </ul>
            </div>
            <div className="chat__footer">
              <ConfigProvider theme={styles}>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Сообщение"
                  color="fff"
                />
                <Button
                  htmlType="submit"
                  size="large"
                  shape="circle"
                  icon={<SendOutlined />}
                />
                <Button
                  onClick={() => removeRoom()}
                  size="large"
                  shape="circle"
                  icon={<DisconnectOutlined />}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
