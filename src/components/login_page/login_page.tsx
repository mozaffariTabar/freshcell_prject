import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import InputText from "../input_text/input_text";
import InputButton from "../input_button/input_button";
import Notification from "../notification/notification";
import { getUserLoginQuery, SERVER_URI } from "../../queries/user";
import Cookies from "universal-cookie";
import axios from "axios";
import "./login_page.scss";

const LoginPage = () => {
  const [emailAddress, setEmailAddress] = useState(""); // test@freshcells.de
  const [password, setPassword] = useState(""); // KTKwXm2grV4wHzW
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const handleLogin = async () => {
    // login by backend
    const queryResult = await axios.post(SERVER_URI, {
      query: getUserLoginQuery(emailAddress, password),
    });
    const result = queryResult.data.data;

    setNotificationText("");
    setTimeout(() => {
      if (result) {
        const cookies = new Cookies();
        cookies.set("freshcell_token", result.login.jwt, { path: "/" });
        setNotificationText("You have entered correctly");
        setTimeout(() => setIsLogedIn(true), 2500);
      } else {
        setNotificationText("Something went wrong. Try again!");
      }
    }, 1);
  };

  if (isLogedIn) {
    return <Navigate to='user_info' />;
  }

  return (
    <div>
      <div id='login-page'>
        <InputText
          label='email address'
          type='email'
          initValue={emailAddress}
          required={true}
          changeAction={(value: string) => setEmailAddress(value)}
          iconName='envelope'
        />
        <InputText
          label='password'
          type='password'
          allowShowPassword={true}
          required={true}
          changeAction={(value: string) => setPassword(value)}
          iconName='lock'
          initValue={password}
        />
        <hr />
        <InputButton
          text='login'
          primary={true}
          clickAction={handleLogin}
          disabled={!emailAddress || !password}
        />
        <InputButton text='signup' href='signup' />
        <Link to='/reset_password' className='small'>
          forget password
        </Link>
      </div>
      <Notification message={notificationText} />
    </div>
  );
};

export default LoginPage;
