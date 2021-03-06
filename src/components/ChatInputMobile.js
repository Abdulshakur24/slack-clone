import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "@material-ui/core/Input";
//Icons
import AddIcon from "@material-ui/icons/Add";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import db, { auth } from "../Firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInputMobile({ channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const whichTheme = useSelector((state) => state.theme.value);

  useEffect(() => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [input]);

  const buttonsend = (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input.trim(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    setInput("");
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <ChatInputMobileBody>
      <div className="container">
        <div className={`contents ${whichTheme ? "dark" : "light"}`}>
          <IconButton>
            <AddIcon />
          </IconButton>
          <div className="inputField">
            <Input
              placeholder="Message..."
              value={input}
              onChange={handleOnChange}
            />
          </div>
          {input.trim() ? (
            <div
              className={`Sendbutton ${
                input.trim() ? "showButton" : "hideButton"
              }`}
            >
              <IconButton onClick={buttonsend}>
                <SendIcon />
              </IconButton>
            </div>
          ) : (
            <div
              className={`icons ${input.trim() ? "hideIcons" : "showIcons"}`}
            >
              <IconButton>
                <CameraAltIcon />
              </IconButton>
              <IconButton>
                <MicIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </ChatInputMobileBody>
  );
}

export default ChatInputMobile;

const ChatInputMobileBody = styled.div`
  display: none;
  @media only screen and (max-width: 52.85rem) {
    display: block;
    position: fixed;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    transition: all 300ms ease-in-out !important;

    .container {
      display: flex;
      justify-content: flex-end;
      background: transparent;

      .inputField {
        display: flex;
      }

      .contents {
        display: flex;
        align-items: center;
        width: 18.75rem;
        border-radius: 8px;
        padding-bottom: 5px;
        transition: all 300ms ease-in-out;

        &.dark {
          background: black;

          .MuiIconButton-root {
            color: white;
          }

          .MuiInputBase-input {
            color: white;
          }

          .MuiInput-underline:before {
            border-bottom: 1px solid gray;
          }

          .MuiInput-underline:hover:not(.Mui-disabled):before {
            border-bottom: 2px solid gray;
          }

          .MuiInput-underline:after {
            border-bottom: 2px solid white;
          }
        }

        &.light {
          background-color: whitesmoke;

          .MuiIconButton-root {
            color: black;
          }

          .MuiInputBase-input {
            color: black;
          }

          .MuiInput-underline:after {
            border-bottom: 2px solid black;
          }
        }

        .icons {
          display: flex;
        }

        @keyframes fadeOutIcons {
          0% {
            opacity: 1;
          }
          100% {
            visibility: hidden;
            opacity: 0;
          }
        }
        @keyframes fadeOutButton {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        .hideButton {
          animation: fadeOutButton 200ms forwards;
        }

        .hideIcons {
          animation: fadeOutIcons 200ms forwards;
        }
      }
    }
  }
`;
