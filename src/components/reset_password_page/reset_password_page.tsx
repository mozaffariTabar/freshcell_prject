import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import InputText from "../input_text/input_text";
import InputButton from "../input_button/input_button";
import Notification from "../notification/notification";
import "./reset_password_page.scss";

const ResetPasswordPage = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [isReseted, setIsReseted] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const handleResetPassword = () => {
    // reset password by backend
    const isReseted = true;

    if (isReseted) {
      setNotificationText("Your password has been reset correctly");
      setTimeout(() => setIsReseted(true), 2500);
    } else {
      setNotificationText("Something went wrong. Try again!");
    }
    setEmailAddress("");
  };

  if (isReseted) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div>
      <div id='reset-password-page'>
        <InputText
          label='email address'
          type='email'
          required={true}
          changeAction={(value: string) => setEmailAddress(value)}
          iconName='envelope'
        />
        <hr />
        <InputButton
          text='reset'
          primary={true}
          disabled={!emailAddress}
          clickAction={handleResetPassword}
        />
        <Link to='/' className='small'>
          login
        </Link>
        <Link to='/signup' className='small'>
          signup
        </Link>
      </div>
      <Notification message={notificationText} />
    </div>
  );
};

export default ResetPasswordPage;
