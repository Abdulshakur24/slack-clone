import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import db, { auth } from "../Firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./ChatInput.css";
import { IconButton } from "@material-ui/core";
//Icons
import FlashOnIcon from "@material-ui/icons/FlashOn";
import CodeIcon from "@material-ui/icons/Code";
import AttachmentIcon from "@material-ui/icons/Attachment";
import TocIcon from "@material-ui/icons/Toc";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import AttachFileIcon from "@material-ui/icons/AttachFile";

function ChatInput({ channelName, channelId, chatRef, value }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });
    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form>
        <div className="ChatInputSubContainer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <div
            className={`ChatIconSection ${
              value ? "ChatIconSectionDark" : "ChatIconSectionLight"
            }`}
          >
            <div className="ChatIconLeft">
              <IconButton>
                <FlashOnIcon />
              </IconButton>
              <IconButton>
                <h4>B</h4>
              </IconButton>
              <IconButton>
                <em>I</em>
              </IconButton>
              <IconButton>
                <CodeIcon />
              </IconButton>
              <IconButton>
                <AttachmentIcon />
              </IconButton>
              <IconButton>
                <TocIcon />
              </IconButton>
            </div>
            <div className="ChatIconRight">
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
              <IconButton>
                <p>Aa</p>
              </IconButton>
              <IconButton>
                <p>@</p>
              </IconButton>
              <IconButton>
                <SentimentSatisfiedIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    display: flex;
    position: relative;
    justify-content: center;
  }

  form input {
    border-top: 0;
    border: none;

    border-bottom: 1px solid gray;

    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none;
  }
`;

const IconsSection = styled.div`
  background-color: "#111";
`;
