import React, { useState } from "react";
import "./HomeScreen.css";
import Header from "./Header";
import SideBar from "./SideBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import Spinner from "react-spinkit";

function HomeScreen() {
  const [user, loading] = useAuthState(auth);
  const [value, setValue] = useState(false);
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="homeScreen">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header value={value} setValue={setValue} />
            <div className="homeScreen_body">
              <SideBar value={value} />
              <Switch>
                <Route path="/" exact>
                  <Chat value={value} />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default HomeScreen;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
