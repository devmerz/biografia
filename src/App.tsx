import { useEffect, useState } from "react";
import "./App.css";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { ProfileInterface, User } from "./interfaces/types";
import Principal from "./components/Principal";
import { Button } from "antd";

function App() {
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<ProfileInterface>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setProfile(undefined);
  };

  useEffect(() => {
    if (user) {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [user]);

  return (
    <div className="App">
      {profile ? (
        <div>
          <center>
            <img src={profile.picture} alt="user image" />
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <Button type="primary" onClick={logOut} danger>
              Logout
            </Button>
          </center>
          <br />

          <Principal profile={profile}></Principal>
        </div>
      ) : (
        <center>
          <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </center>
      )}
    </div>
  );
}

export default App;
