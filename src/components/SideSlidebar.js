import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { slideInAndOut } from "../features/SlideStatus";
import db, { auth } from "../Firebase";
import SidebarOption from "./SidebarOption";

function SideSlidebar() {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  const on = useSelector((state) => state.slideState.value);
  const value = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  return (
    <SideSlidebarBody
      onClick={() => dispatch(slideInAndOut(!on))}
      className={`${on ? "slideOpen" : "slideClose"} `}
    >
      <SideSlideContainer
        className={`${value ? "darkMode" : "lightMode"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="slideWorkSpaceHeader">
          Workspace <p>{user?.displayName}</p>
        </div>
        {channels?.docs.map((doc) => (
          <SidebarOption id={doc.id} key={doc.id} title={doc.data().name} />
        ))}
      </SideSlideContainer>
    </SideSlidebarBody>
  );
}

export default SideSlidebar;

const SideSlidebarBody = styled.div`
  display: none;
  @media only screen and (max-width: 52.85rem) {
    display: block;
    position: fixed;
    background-color: transparent;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transform: translateX(-100%);
    transition: all 300ms ease-in-out;

    &.slideOpen {
      transform: translateX(0%);
    }
  }
`;

const SideSlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  padding: 0rem 1rem;
  overflow: auto;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0px 3px 24px 9px rgb(0 0 0 / 30%);

  .slideWorkSpaceHeader {
    display: flex;
    flex-direction: column;
  }

  &.darkMode {
    border-right: 1px solid #484848;
  }
  &.lightMode {
    border-right: 1px solid #484848;
  }
`;
