import React, { useEffect, useRef } from "react";
import "./Chat.css";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import db from "../Firebase";
import SideSlidebar from "./SideSlidebar";

function Chat({ value }) {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer
      className={`"chat" ${value ? "dark" : "light"}`}
      style={{ background: value && "#111", color: value && "white" }}
    >
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>{`# ${roomDetails?.data().name}`}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                  value={value}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            value={value}
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
      <SideSlidebar />
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
    font-size: 1rem;
  }

  h4 .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  display: flex;

  p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
`;

const ChatContainer = styled.div`
  overflow-y: auto;
  padding-bottom: 150px;
  &.dark::-webkit-scrollbar {
    width: 10px;
  }
  /*Dark mode*/
  &.dark::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  &.dark::-webkit-scrollbar-track {
    background: rgb(70, 70, 70);
  }
  /* Handle */
  &.dark::-webkit-scrollbar-thumb {
    background: rgb(26, 26, 26);
    border-left: 1px solid #262626;
  }
  /* Handle on hover */
  &.dark::-webkit-scrollbar-thumb:hover {
    background: #111;
  }
  /*Light mode*/
  &.light::-webkit-scrollbar {
    width: 10px;
  }
  /* Track */
  &.light::-webkit-scrollbar-track {
    background: rgb(70, 70, 70);
  }
  /* Handle */
  &.light::-webkit-scrollbar-thumb {
    background: rgb(26, 26, 26);
    border-left: 1px solid #262626;
  }
  /* Handle on hover */
  &.light::-webkit-scrollbar-thumb:hover {
    background: #111;
  }

  width: 75%;
  transition: all 300ms ease-in-out;
  @media only screen and (max-width: 52.85rem) {
    width: 100%;
    padding-bottom: 100px;
  }
`;

const ChatMessages = styled.div`
  @media only screen and (max-width: 52.85rem) {
    :last-child {
      padding-bottom: 100px;
    }
  }
  :last-child {
    padding-bottom: 150px;
  }
`;
