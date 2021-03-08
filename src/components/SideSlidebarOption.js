import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { enterRoom } from "../features/appSlice";

function SideSlidebarOption({ Icon, id, title, addChannelOption }) {
  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.theme.isDark);

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
    <SideSlidebarOptionBody
      onClick={addChannelOption ? "addChannel" : selectChannel}
      className={isDark ? "dark" : "light"}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannelMobile>
          <span>#</span>
          {title}
        </SidebarOptionChannelMobile>
      )}
    </SideSlidebarOptionBody>
  );
}

export default SideSlidebarOption;

const SideSlidebarOptionBody = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &.marginBottom {
    margin-bottom: 8px;
  }

  &.dark {
    :hover {
      background-color: black;
    }
  }

  &.light {
    :hover {
      background-color: #350d36;
      color: white;
    }
  }
`;
const SidebarOptionChannelMobile = styled.div`
  padding-left: 8px;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
