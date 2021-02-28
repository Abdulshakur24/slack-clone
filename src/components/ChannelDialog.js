import React, { useRef, useState } from "react";
import "./ChannelDialog.css";
import { IconButton, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import db from "../Firebase";

function ChannelDialog({ isOpen, setIsOpen, value }) {
  const [channelName, setChannelName] = useState(null);
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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginLeft: "1rem",
        }}
      >
        <h1 style={{ fontSize: "1rem" }}>Add Channel</h1>

        <IconButton
          style={{ color: "white" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div
        style={
          isOpen
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {}
        }
        onClick={() => setIsOpen(false)}
        className={`homeScreen_dialog ${
          isOpen ? "openedDialog" : "closedDialog"
        }`}
      >
        <div className="DialogContainer" onClick={(e) => e.stopPropagation()}>
          <div className="headerChannel_dialog">
            <h1>New Channel</h1>
          </div>
          <div className="bodyChannel_dialog">
            <p>
              Channels are where your team communicates. They’re best when
              organized around a topic — #marketing, for example.
            </p>
            <Input
              color="primary"
              placeholder="Enter channel name"
              required={true}
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <div className="buttonChannel_dialog">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={addChannel}>Add</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelDialog;
