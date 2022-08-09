import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./user_info.scss";
import InputButton from "../input_button/input_button";
import Notification from "../notification/notification";
import Cookies from "universal-cookie";
import axios from "axios";
import { getUserFetchDataQuery, SERVER_URI } from "../../queries/user";
import Loading from "../loading/loading";

const UserInfo = () => {
  const [notificationText, setNotificationText] = useState("");
  const [token, setToken] = useState(true);
  const [userData, setUserData] = useState(null);
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("freshcell_token");
    setToken(token);
    getUserData();
  }, [token]);

  const getUserData = async () => {
    const queryResult = await axios.post(
      SERVER_URI,
      { query: getUserFetchDataQuery() },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const result = queryResult.data.data;
    if (result) {
      const user = result.user;
      setUserData(user);
    }
  };

  const handleSignout = () => {
    setNotificationText("You have loged out correctly");
    cookies.remove("freshcell_token");
    setTimeout(() => setToken(false), 2000);
  };

  if (!token) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div>
      <div id='user-info-page'>
        {!userData && <Loading />}
        {userData && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>first name</th>
                  <th>last name</th>
                  <th>email addess</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userData["id"]}</td>
                  <td>{userData["firstName"]}</td>
                  <td>{userData["lastName"]}</td>
                  <td>{userData["email"]}</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <InputButton
              text='sign out'
              primary={true}
              clickAction={handleSignout}
            />
          </div>
        )}
      </div>
      <Notification message={notificationText} />
    </div>
  );
};

export default UserInfo;
