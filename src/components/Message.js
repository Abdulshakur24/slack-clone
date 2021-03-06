import React from "react";
import styled from "styled-components";
import "./Message.css";

function Message({ message, timestamp, user, userImage, value }) {
  return (
    <MessageContainer
      className={value ? "MessageContainerDark" : "MessageContainerLight"}
    >
      <img src={userImage} />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  h4 span {
    color: gray;
    font-weight: 300;
    margin: 4px;
    font-size: 10px;
  }
`;
