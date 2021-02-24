import React from "react";
import "./HeaderProfile.css";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase";

function HeaderProfile(props) {
  const [user] = useAuthState(auth);

  return (
    <div className="headerProfile" ref={props.profileRef}>
      <div className="headerProfile_header">
        <img src={user?.photoURL} alt={user?.displayName} />
        <div className="headerProfile_name">
          <h4>{user?.displayName}</h4>
          <small>Active</small>
        </div>
      </div>
      <div className="headerProfile_updateStatus">
        <button>
          <SentimentSatisfiedOutlinedIcon style={{ marginRight: "1rem" }} />
          <p>Update your status</p>
        </button>
      </div>
      <div className="headerProfile_setYourself headerProfile_hover">
        <p>Set yourselt as away</p>
      </div>
      <div className="headerProfile_pauseNotifications headerProfile_hover">
        <p>Pause notifications</p>
      </div>
      <hr
        style={{
          margin: "0.125rem 0rem",
          height: "1px",
          border: "none",
          backgroundColor: "#d5d5d5",
        }}
      />
      <div className="headerProfile_editProfile headerProfile_hover">
        <p>Edit profile</p>
      </div>
      <div className="headerProfile_viewProfile headerProfile_hover">
        <p>View profile</p>
      </div>
      <div className="headerProfile_preferences headerProfile_hover">
        <p>Preferences</p>
      </div>
      <div
        onClick={() => auth.signOut()}
        className="headerProfile_signOut headerProfile_hover"
      >
        <p>Sign out</p>
      </div>
    </div>
  );
}

export default HeaderProfile;
