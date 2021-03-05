import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, provider } from "../Firebase";

function Login() {
  const [value, setValue] = useState(false);
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <LoginContainer
      className={value ? "LoginContainerDark" : "LoginContainerLight"}
    >
      <LoginInnerContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Sign in</h1>
        <p>Slack.com</p>

        <Button type="submit" onClick={signIn}>
          Sign In with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;

  img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;
