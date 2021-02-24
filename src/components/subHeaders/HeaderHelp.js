import React from "react";
import "./HeaderHelp.css";
import LaunchIcon from "@material-ui/icons/Launch";

function HeaderHelp(props) {
  console.log(props);
  return (
    <div
      className={`headerHelp ${props.value ? "headerHelpDark" : ""}`}
      ref={props.helpRef}
    >
      <div>
        <p>Get help</p>
      </div>
      <a
        href="https://slack.com/intl/en-ke/resources/using-slack/your-quick-start-guide-to-slack?utm_medium=help-icon&utm_source=in-prod&utm_campaign=cd_help-icon_in-prod"
        target="blank"
      >
        <div>
          <p>Quick start guide</p>
          <LaunchIcon />
        </div>
      </a>
      <a
        href="https://slack.com/intl/en-ke/help/categories/360000049063"
        target="blank"
      >
        <div>
          <p>Tutorial</p>
          <LaunchIcon />
        </div>
      </a>
      <a>
        <div>
          <p>what's new</p>
        </div>
      </a>
      <a>
        <div>
          <p>Keyboard shortcuts</p>
          <p>Ctrl+/</p>
        </div>
      </a>
    </div>
  );
}

export default HeaderHelp;
