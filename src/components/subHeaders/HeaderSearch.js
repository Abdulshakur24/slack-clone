import React from "react";
import "./HeaderSearch.css";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";

function HeaderSearch(props) {
  return (
    <div
      className={`headerSearch ${props.value ? "headerSearchDark" : ""}`}
      ref={props.searchRef}
    >
      <div className="headerSearch_open_container">
        <div className="headerSearch_header">
          <IconButton>
            <SearchIcon style={props.value ? { color: "white" } : {}} />
          </IconButton>
          <input
            style={
              props.value ? { color: "white", backgroundColor: "#111" } : {}
            }
            placeholder="Search messages, files, around corners, under rugs, etc."
          />
          <IconButton
            onClick={() => props.setIsSearchVisible(!props.searchVisibility)}
          >
            <CloseOutlinedIcon style={props.value ? { color: "white" } : {}} />
          </IconButton>
        </div>
        <div
          className={`haederSearch_body ${
            props.value ? "headerSearchDark" : ""
          }`}
        >
          <div
            className="headerSearch_bodyUpper"
            style={props.value ? { backgroundColor: "#111" } : {}}
          >
            <h1
              style={
                props.value
                  ? {
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.25rem",
                      fontSize: "1.2rem",
                      fontWeight: "400",
                    }
                  : {
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.25rem",
                      fontSize: "1.2rem",
                      fontWeight: "400",
                    }
              }
            >
              <WbIncandescentIcon
                style={
                  props.value
                    ? { marginRight: "1rem", color: "yellow" }
                    : {
                        color: "#f1c644",
                        marginRight: "1rem",
                      }
                }
              />
              Search messages, files, and more
            </h1>
            <p style={props.value ? { color: "gray" } : {}}>
              Looking for a particular message, doc, or decision? If it happened
              in Slack, you can find it in search.
            </p>
          </div>
          <div className="headerSearch_bodyLower">
            <p style={{ marginBottom: "1rem" }}>From our help center</p>
            <div className="headerSearch_helpOne">
              <HelpOutlineOutlinedIcon
                style={{ width: "1rem", marginRight: "1rem" }}
              />
              <a
                className={
                  props.value ? `headerSearchDark` : `headerSearchLight`
                }
                href="https://slack.com/intl/en-ke/help/articles/202528808-Search-in-Slack"
                target="blank"
              >
                <h4 style={{ fontWeight: "600" }}>
                  How to Search in slack{" "}
                  <small style={{ fontWeight: "400" }}>
                    Access the right information instantly
                  </small>
                </h4>
              </a>
            </div>
            <div className="headerSearch_helpTwo">
              <HelpOutlineOutlinedIcon
                style={{ width: "1rem", marginRight: "1rem" }}
              />
              <a
                className={
                  props.value ? `headerSearchDark` : `headerSearchLight`
                }
                href="https://slack.com/intl/en-ke/help/categories/200111606"
                target="blank"
              >
                <h4 style={{ fontWeight: "600" }}>
                  Using slack{" "}
                  <small style={{ fontWeight: "400" }}>
                    Learn how slack works from top to bottom
                  </small>
                </h4>
              </a>
            </div>
          </div>
        </div>
        <div
          className={`headerSearch_footer ${
            props.value ? "headerSearch_footerDark" : "headerSearch_footerLight"
          }`}
        >
          <p>Not the resutls you expected? </p>
          <a
            className={props.value ? `headerSearchDark` : `headerSearchLight`}
            style={{ marginLeft: "0.25rem" }}
            href="https://testing-boy-workspace.slack.com/intl/en-ke/help?geocode=en-ke"
            target="blank"
          >
            <small style={{ color: props.value && "white" }}>
              {" "}
              Give feedback
            </small>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeaderSearch;
