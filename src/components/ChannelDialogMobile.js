import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { Button, IconButton, Input } from "@material-ui/core";
import { useSelector } from "react-redux";
import db from "../Firebase";

function ChannelDialogMobile({ isOpen, setIsOpen }) {
  const isDark = useSelector((state) => state.theme.isDark);
  const [channelName, setChannelName] = useState("");

  const addChannel = () => {
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
      setIsOpen(false);
      setChannelName("");
    }
  };

  return (
    <ChannelDialogMobileBody
      className={`${isOpen ? "show" : "hide"} ${isDark ? "dark" : "light"}`}
    >
      <div className={`container`}>
        <header>
          <h4>New Channel</h4>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <CloseIcon />
          </IconButton>
        </header>
        <div className="contents">
          <p>
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </p>
          <Input
            placeholder="Enter channel name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />

          <div className="buttons">
            <Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
            <Button
              disabled={channelName.trim() ? false : true}
              style={channelName.trim() ? {} : { color: "gray" }}
              onClick={addChannel}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </ChannelDialogMobileBody>
  );
}

export default ChannelDialogMobile;

const ChannelDialogMobileBody = styled.div`
  display: block;
  position: fixed;
  transition: all 300ms ease-in-out;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0);
  overflow: auto;
  .container {
    width: 100%;
    height: 100%;
    .contents {
      display: flex;
      flex-direction: column;

      p {
        margin-bottom: 1rem;
      }

      .MuiInputBase-root {
        margin-bottom: 1rem;
      }

      .buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

  &.dark {
    background-color: rgb(17 17 17);
    header {
      .MuiIconButton-root {
        color: white;
      }
    }

    .container {
      .contents {
        .MuiInputBase-root {
          color: white;
        }

        .MuiInput-underline:before {
          border-bottom: 1px solid gray;
        }

        .MuiInput-underline:after {
          border-bottom: 2px solid white;
        }
        .buttons {
          .MuiButton-root {
            color: white;
          }
        }
      }
    }
  }

  &.light {
    color: black;
    background-color: white;
  }

  .container {
    padding-left: 0.85rem;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .contents {
      .MuiInput-underline:after {
        border-bottom: 2px solid #111;
      }
    }
  }

  &.show {
    transform: translateY(0%);
  }

  &.hide {
    transform: translateY(-100%);
  }
`;
