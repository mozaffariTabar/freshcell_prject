import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import InputText from "../input_text/input_text";
import InputButton from "../input_button/input_button";
import Notification from "../notification/notification";
import "./sign_page.scss";

const SignupPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const handleRegister = () => {
    // do register by backend
    const isRegistered = true;

    if (isRegistered) {
      setNotificationText("You have successfuly registered!");
      setTimeout(() => setIsRegistered(true), 2500);
    } else {
      setNotificationText("Something went wrong. Try again!");
    }

    setFirstname("");
    setLastname("");
    setEmailAddress("");
    setPassword("");
  };

  if (isRegistered) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div>
      <div id='signup-page'>
        <InputText
          label='firstname'
          type='text'
          required={true}
          changeAction={(value: string) => setFirstname(value)}
          iconName='user'
        />
        <InputText
          label='lastname'
          type='text'
          required={true}
          changeAction={(value: string) => setLastname(value)}
          iconName='user'
        />
        <InputText
          label='e-mail address'
          type='email'
          required={true}
          changeAction={(value: string) => setEmailAddress(value)}
          iconName='envelope'
        />
        <InputText
          label='password'
          type='password'
          required={true}
          changeAction={(value: string) => setPassword(value)}
          iconName='lock'
          allowShowPassword={true}
        />

        <hr />
        <InputButton
          text='register'
          primary={true}
          clickAction={handleRegister}
          disabled={!firstname || !lastname || !emailAddress || !password}
        />
        <Link to='/' className='small'>
          login
        </Link>
      </div>
      <Notification message={notificationText} />
    </div>
  );
};

export default SignupPage;
