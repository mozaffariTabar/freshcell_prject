import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login_page/login_page";
import SignupPage from "./components/signup_page/sign_page";
import ResetPasswordPage from "./components/reset_password_page/reset_password_page";
import UserInfo from "./components/user_info/user_info";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/reset_password' element={<ResetPasswordPage />} />
          <Route path='/user_info' element={<UserInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
