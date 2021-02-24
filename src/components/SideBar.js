import React from "react";
import "./SideBar.css";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
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
import SidebarOption from "./SidebarOption";
import db, { auth } from "../Firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function SideBar({ value }) {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  return (
    <div className={`sideBar ${value ? "sidebarScrollDark" : "sidebarScroll"}`}>
      <SidebarContainer style={{ backgroundColor: value && "#111" }}>
        <SidebarHeader className={`${value ? "sidebarDark" : ""}`}>
          <SidebarInfo>
            <h2>Workspace</h2>
            <h3>
              <FiberManualRecordIcon />
              {user?.displayName}
            </h3>
          </SidebarInfo>
          <CreateIcon style={value ? { color: "black" } : {}} />
        </SidebarHeader>
        <SidebarOption value={value} Icon={InsertCommentIcon} title="Threads" />
        <SidebarOption
          value={value}
          Icon={InboxIcon}
          title="Mentions & Reactions"
        />
        <SidebarOption value={value} Icon={DraftsIcon} title="Saved items" />
        <SidebarOption
          value={value}
          Icon={BookmarkBorderIcon}
          title="Channel browser"
        />
        <SidebarOption
          value={value}
          Icon={PeopleAltIcon}
          title="Peaple & user groups"
        />
        <SidebarOption value={value} Icon={AppsIcon} title="Apps" />
        <SidebarOption value={value} Icon={FileCopyIcon} title="File browser" />
        <SidebarOption value={value} Icon={ExpandLessIcon} title="show less" />
        <hr className={`${value ? "hrDark" : "hr"}`} />
        <SidebarOption Icon={ExpandMoreIcon} title="Channel" />
        <hr className={`${value ? "hrDark" : "hr"}`} />
        <SidebarOption
          value={value}
          Icon={AddIcon}
          addChannelOption
          title="Add channel"
        />
        {channels?.docs.map((doc) => (
          <SidebarOption id={doc.id} key={doc.id} title={doc.data().name} />
        ))}
      </SidebarContainer>
    </div>
  );
}

export default SideBar;

const SidebarContainer = styled.div`
  transition: all 300ms ease-in-out;
  color: white;
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    background-color: white;
    border-radius: 100%;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-weight: 900;
    font-size: 15px;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
