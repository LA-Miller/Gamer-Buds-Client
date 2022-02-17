import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import PostCreate, { postProps } from "./components/PostCreate";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Avatar from "./assets/default-profile-icon-0.jpg";

export type AppState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  sessionToken: string | null;
  userId: number | string;
  setUserId: (userId: number | string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  email: string;
  setEmail: (email: string) => void;
  profilePic: string;
  discord: string;
  setDiscord: (discord: string) => void;
  clearToken: () => void;
  updateToken: (newToken: string) => void;
  setSessionToken: (sessionToken: string | null) => void;
  avatar: string;
  navigate: (arg0: string, arg1: object) => void;
  redirect: boolean;
  setRedirect: (redirect: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  adminPwd: string;
  setAdminPwd: (adminPwd: string) => void;
  postId: number | string;
  setPostId: (postId: number | string) => void;
  game: string;
  setGame: (game: string) => void;
  content: string;
  setContent: (content: string) => void;
};

const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<string | null>("");
  const [userId, setUserId] = useState<number | string>(0);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [postId, setPostId] = useState<number | string>(0);
  const [profilePic, setProfilePic] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminPwd, setAdminPwd] = useState<string>("");
  const [game, setGame] = useState<string>("");
  const [content, setContent] = useState<string>("");

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
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("username", username);
    localStorage.setItem("isAdmin", isAdmin.toString());
    localStorage.setItem("discord", discord);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <NavbarComponent
        postId={postId}
        setPostId={setPostId}
        setUserId={setUserId}
        userId={userId}
        setUsername={setUsername}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
        sessionToken={sessionToken}
        clearToken={clearToken}
        setSessionToken={setSessionToken}
        redirect={redirect}
        setRedirect={setRedirect}
      ></NavbarComponent>

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              redirect={redirect}
              setRedirect={setRedirect}
              setPassword={setPassword}
              password={password}
              userId={userId}
              username={username}
              setUserId={setUserId}
              sessionToken={sessionToken}
              updateToken={updateToken}
              setUsername={setUsername}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            ></Login>
          }
        />

        <Route
          path="/register"
          element={
            <Register
              userId={userId}
              setUserId={setUserId}
              discord={discord}
              setDiscord={setDiscord}
              adminPwd={adminPwd}
              setAdminPwd={setAdminPwd}
              email={email}
              setEmail={setEmail}
              setPassword={setPassword}
              password={password}
              username={username}
              setUsername={setUsername}
              redirect={redirect}
              setRedirect={setRedirect}
              sessionToken={sessionToken}
              updateToken={updateToken}
              profilePic={profilePic}
            ></Register>
          }
        />

        <Route
          path="/create"
          element={
            <PostCreate
              sessionToken={sessionToken}
              updateToken={updateToken}
            ></PostCreate>
          }
        />

        <Route
          path="/profile"
          element={
            <Profile
              game={game}
              setGame={setGame}
              content={content}
              setContent={setContent}
              sessionToken={sessionToken}
              username={username}
              discord={discord}
              profilePic={profilePic}
              avatar={avatar}
              userId={userId}
            />
          }
        ></Route>

        <Route
          path="/"
          element={
            <Home
              sessionToken={sessionToken}
              updateToken={updateToken}
              profilePic={profilePic}
              avatar={avatar}
              setRedirect={setRedirect}
            ></Home>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
