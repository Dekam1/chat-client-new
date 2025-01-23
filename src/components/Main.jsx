import { ConfigProvider, Input } from "antd";
import RoomsItem from "./RoomsItem";
import React from "react";
import CreateButton from "./CreateButton";
import JoinButton from "./JoinButton";
import useChat from "../hooks/useChat";
import { Navigate } from "react-router-dom";

const styles = {
  components: {
    Input: {
      colorPrimaryHover: "#6900C6",
      lineWidth: 2,
      colorPrimary: "#6900C6",
    },
    Button: {
      defaultBg: "#6900C6",
      defaultBorderColor: "#6900C6",
      defaultColor: "#fff",
      contentFontSize: 17,
      fontWeight: 500,
      colorPrimaryHover: "",
      borderColorDisabled: "gray",
      colorBgContainerDisabled: "gray",
      colorTextDisabled: "#fff",
    },
  },
};

export default function Main() {
  const userId = localStorage.getItem("userId");
  const { data, createRoom, joinRoom } = useChat();
  const [createItemValue, setCreateItemValue] = React.useState("");
  const [itemSelect, setItemSelect] = React.useState(null);
  const [switchValue, setSwitchValue] = React.useState("JOIN");

  const userJoined = data.find((room) =>
    room.users.some((user) => user === userId)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    switchValue === "JOIN" ? joinRoom(itemSelect) : createRoom(createItemValue);
  };

  const activeClass = (value) => {
    return switchValue === value
      ? "switch__item switch__item_active"
      : "switch__item";
  };

  const handleSwitch = (param) => {
    setCreateItemValue("");
    setItemSelect(null);
    setSwitchValue(param);
  };

  if (userJoined) {
    return <Navigate to={`/chat/${userJoined.roomId}`} replace={false} />;
  }

  return (
    <ConfigProvider theme={styles}>
      <main className="main-page">
        <form onSubmit={handleSubmit} className="main-page__form form">
          <div className="form__header">
            <h1 className="main-page__title">Добро пожаловать</h1>
            <div className="form__switch switch">
              <span
                onClick={() => handleSwitch("JOIN")}
                className={activeClass("JOIN")}
              >
                Войти
              </span>
              <span
                onClick={() => handleSwitch("CREATE")}
                className={activeClass("CREATE")}
              >
                Создать
              </span>
            </div>
          </div>
          <div className="form__body">
            {switchValue === "JOIN" ? (
              <>
                <h3 className="main-page__subtitle">Темы</h3>
                <ul className="rooms">
                  {data
                    .filter((room) => room.users.length !== 2)
                    .map((room) => (
                      <RoomsItem
                        activeRoom={itemSelect}
                        handleSelect={() => setItemSelect(room.roomId)}
                        key={room.roomId}
                        {...room}
                      />
                    ))}
                </ul>
              </>
            ) : (
              <Input
                onChange={(e) => {
                  setCreateItemValue(e.target.value);
                }}
                size="large"
                placeholder="Название темы"
              />
            )}
          </div>
          <div className="form__footer">
            {switchValue === "JOIN" ? (
              <JoinButton disabled={itemSelect} />
            ) : (
              <CreateButton disabled={createItemValue.trim()} />
            )}
          </div>
        </form>
      </main>
    </ConfigProvider>
  );
}
