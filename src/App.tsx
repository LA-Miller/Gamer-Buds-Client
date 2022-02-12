import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import PostCreate from "./components/PostCreate";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Avatar from './assets/default-profile-icon-0.jpg';


export type AppState = {
  isLoggedIn: boolean;
  sessionToken: string | null;
  userId: number;
  username: string;
  email: string;
  profilePic: string;
  discord: string;
  clearToken: () => void;
  updateToken: (newToken: string) => void;
  setSessionToken: (sessionToken: string | null) => void;
  avatar: string;
};

const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<string | null>("");
  const [userId, setUserId] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [postData, setPostData] = useState<[]>([]);
  const [profilePic, setProfilePic] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
      setAvatar(Avatar);
    }
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    setIsLoggedIn(false);
  };

  return (    
    <Router>
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        userName={username}
        sessionToken={sessionToken}
        clearToken={clearToken}
        setSessionToken={setSessionToken}
      ></NavbarComponent>

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              userId={userId}
              username={username}
              setUserId={setUserId}
              sessionToken={sessionToken}
              updateToken={updateToken}
              setUsername={setUsername}
            ></Login>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/register"
          element={
            <Register
              sessionToken={sessionToken}
              updateToken={updateToken}
              profilePic={profilePic}
            ></Register>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/create"
          element={
            <PostCreate
              sessionToken={sessionToken}
              updateToken={updateToken}
            ></PostCreate>
          }
        />
      </Routes>

      <Routes>
        <Route
          path="/"
          element={
            <Home sessionToken={sessionToken} updateToken={updateToken} profilePic={profilePic} avatar={avatar} ></Home>
          }
        />
      </Routes>

      <Routes>
        <Route
        path="/profile"
        element={
          <Profile sessionToken={sessionToken} username={username} discord={discord} profilePic={profilePic} avatar={avatar} userId={userId}/>
        }
        >
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
