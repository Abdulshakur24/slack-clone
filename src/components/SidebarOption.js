import React from "react";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../Firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import "./SidebarOption.css";

function SidebarOption({ Icon, title, addChannelOption, id, value }) {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const dispatch = useDispatch();
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      className={value ? "sidebarOption_dark" : "sidebarOption_light"}
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel
          className={value ? "sidebarOption_dark" : "sidebarOption_light"}
        >
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background: #340e36;
  }

  h3 {
    font-weight: 500;
  }

  h3 span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
