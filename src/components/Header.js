import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import ScheduleIcon from "@material-ui/icons/Schedule";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { IconButton } from "@material-ui/core";
//Functional components
import HeaderSearch from "./subHeaders/HeaderSearch";
import HeaderHistory from "./subHeaders/HeaderHistory";
import HeaderHelp from "./subHeaders/HeaderHelp";
import HeaderProfile from "./subHeaders/HeaderProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import SwitchToggle from "./SwitchToggle";
import { useDispatch, useSelector } from "react-redux";
import { slideInAndOut } from "../features/SlideStatus";
import { darkOrLight } from "../features/Theme";

//useSearchVisibility
function useSearchVisibility(initialIsVisible) {
  const [isSearchVisible, setIsSearchVisible] = useState(initialIsVisible);
  const searchRef = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsSearchVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { searchRef, isSearchVisible, setIsSearchVisible };
}

//UseHistoryVisibility
function useHistoryVisibility(initialIsVisible) {
  const [isHistoryVisible, setIsHistoryVisible] = useState(initialIsVisible);
  const historyRef = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsHistoryVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (historyRef.current && !historyRef.current.contains(event.target)) {
      setIsHistoryVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { historyRef, isHistoryVisible, setIsHistoryVisible };
}

//useHelpVisibility
function useHelpVisibility(initialIsVisible) {
  const [isHelpVisible, setIsHelpVisible] = useState(initialIsVisible);
  const helpRef = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsHelpVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (helpRef.current && !helpRef.current.contains(event.target)) {
      setIsHelpVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { helpRef, isHelpVisible, setIsHelpVisible };
}

//useProfiileVisibility
function useProfiileVisibility(initialIsVisible) {
  const [isProfileVisible, setIsProfileVisible] = useState(initialIsVisible);
  const profileRef = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setIsProfileVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { profileRef, isProfileVisible, setIsProfileVisible };
}

function Header({ value, setValue }) {
  const [user] = useAuthState(auth);
  const {
    historyRef,
    isHistoryVisible,
    setIsHistoryVisible,
  } = useHistoryVisibility(false);

  const {
    searchRef,
    isSearchVisible,
    setIsSearchVisible,
  } = useSearchVisibility(false);

  const { helpRef, isHelpVisible, setIsHelpVisible } = useHelpVisibility(false);

  const {
    profileRef,
    isProfileVisible,
    setIsProfileVisible,
  } = useProfiileVisibility(false);

  //const [on, setOn] = useState(false);
  const on = useSelector((state) => state.slideState.isSlideOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(darkOrLight(value));
  }, [value]);

  return (
    <div
      className={`header ${value ? "headerDark" : ""}`}
      style={{ backgroundColor: value && "#111" }}
    >
      <div className="header_leftSide">
        <div className="header_siderBar">
          <SwitchToggle
            value={value}
            setValue={setValue}
            isOn={value}
            handleToggle={() => setValue(!value)}
          />
          <IconButton
            className="header_iconButton"
            onClick={() => setIsHistoryVisible(!isHistoryVisible)}
          >
            <ScheduleIcon className="header_ScheduleIcon" />
          </IconButton>
        </div>

        {isHistoryVisible && (
          <HeaderHistory value={value} historyRef={historyRef} />
        )}

        <div className="header_search_container">
          <button
            style={{
              backgroundColor: value && "#111",
              border: value && "1px solid gray",
            }}
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <span>Search</span>
          </button>
        </div>

        {isSearchVisible && (
          <HeaderSearch
            value={value}
            searchRef={searchRef}
            searchVisibility={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />
        )}

        <div className="header_markQuestion">
          <IconButton
            className="header_iconButton"
            onClick={() => setIsHelpVisible(!isHelpVisible)}
          >
            <HelpOutlineOutlinedIcon className="header_HelpOutlineOutlinedIcon" />
          </IconButton>
        </div>

        {isHelpVisible && <HeaderHelp value={value} helpRef={helpRef} />}
      </div>
      <div className="header_rightSide">
        <button
          style={{ display: "flex" }}
          onClick={() => setIsProfileVisible(!isProfileVisible)}
        >
          <img src={user?.photoURL} />
        </button>
        {isProfileVisible && (
          <HeaderProfile value={value} profileRef={profileRef} />
        )}

        <a
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "0.5rem",
          }}
          href="#"
          className={`header__toggle ${
            on ? "open" : "close"
          } hide-for-desktosp`}
          onClick={() => dispatch(slideInAndOut(!on))}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
    </div>
  );
}

export default Header;
