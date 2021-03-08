import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { slideInAndOut } from "../features/SlideStatus";
import db, { auth } from "../Firebase";
import SideSlidebarOption from "./SideSlidebarOption";
//Icons
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import ChannelDialog from "./ChannelDialog";
import ChannelDialogMobile from "./ChannelDialogMobile";
import { IconButton } from "@material-ui/core";

function SideSlidebar() {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  const on = useSelector((state) => state.slideState.isSlideOpen);
  const value = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState();

  return (
    <SideSlidebarBody
      onClick={() => dispatch(slideInAndOut(!on))}
      className={`${on ? "slideOpen" : "slideClose"} `}
    >
      <SideSlideContainer
        className={`${value ? "darkMode" : "lightMode"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`contents ${value ? "dark" : "light"}`}>
          <div className="slideWorkSpaceHeader">
            <div>
              <h3>Workspace</h3>
              <p>{user?.displayName}</p>
            </div>
            <CreateIcon />
          </div>

          <SideSlidebarOption Icon={InsertCommentIcon} title="Threads" />
          <SideSlidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
          <SideSlidebarOption Icon={DraftsIcon} title="Saved items" />
          <SideSlidebarOption
            Icon={BookmarkBorderIcon}
            title="Channel browser"
          />
          <SideSlidebarOption
            Icon={PeopleAltIcon}
            title="People & user groups"
          />
          <SideSlidebarOption Icon={AppsIcon} title="Apps" />
          <SideSlidebarOption Icon={FileCopyIcon} title="File browser" />
          <SideSlidebarOption Icon={ExpandLessIcon} title="Show less" />
          <SideSlidebarOption Icon={ExpandMoreIcon} title="Show more" />
          <div className={`addChannelContainer`}>
            <h3>Channel</h3>
            <IconButton onClick={() => setIsOpen(true)}>
              <AddIcon />
            </IconButton>
          </div>

          <ChannelDialogMobile isOpen={isOpen} setIsOpen={setIsOpen} />

          {channels?.docs.map((doc) => (
            <SideSlidebarOption
              id={doc.id}
              key={doc.id}
              title={doc.data().name}
            />
          ))}
        </div>
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
  height: 100%;
  width: 70%;
  overflow: auto;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0px 3px 24px 9px rgb(0 0 0 / 30%);
  z-index: 20;

  .contents {
    backdrop-filter: blur(50px);
    background-color: rgba(255, 255, 255, 0);
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .slideWorkSpaceHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.85rem;
    }

    .addChannelContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.85rem;
    }

    &.dark {
      color: white;
      background-color: transparent;

      .addChannelContainer {
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        .MuiIconButton-root {
          color: white;
        }
      }

      .slideWorkSpaceHeader {
        .MuiSvgIcon-root {
          padding: 8px;
          background-color: white;
          color: black;
          border-radius: 100%;
        }
      }
    }

    &.light {
      color: white;
      background-color: #3f0e40;

      .addChannelContainer {
        border-top: 1px solid #350d36;
        border-bottom: 1px solid #350d36;
        .MuiIconButton-root {
          color: white;
        }
      }

      .slideWorkSpaceHeader {
        color: white;
        background-color: #350d36;
        border-bottom: 1px solid #330c34;

        .MuiSvgIcon-root {
          padding: 8px;
          background-color: white;
          color: #350d36;
          border-radius: 100%;
        }
      }
    }
  }

  &.darkMode {
    border-right: 1px solid #484848;
  }
  &.lightMode {
    border-right: 1px solid #330c33;
  }
`;
