import React, { useState } from "react";
import "./HeaderHistory.css";

function HeaderHistory({ historyRef, value }) {
  const [recent, setRecent] = useState(true);
  return (
    <div
      className="headerHistory"
      ref={historyRef}
      style={value ? { backgroundColor: "#111", color: "white" } : {}}
    >
      <div className="headerHistory_container">
        <div>
          <h1>Recent</h1>
        </div>

        {recent ? (
          <div className="headerHistory_noHistory">
            <p>You don't have any history </p>
          </div>
        ) : (
          <div>
            <p>you post to ...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderHistory;
