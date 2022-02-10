import React, { useState, useEffect } from "react";
import "./App.css";
// import Signup from "./components/Signup";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import PostCreate from "./components/PostCreate";
import Home from "./components/Home";


export type AppState = {
  isLoggedIn: boolean;
  sessionToken: string | null;
  userId: string | null;
  userName: string | null;
  email: string;
  clearToken: () => void;
  updateToken: (newToken: string) => void;
  setSessionToken: (sessionToken: string | null) => void;
};

const App: React.FunctionComponent = () => {
  const [sessionToken, setSessionToken] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>("");
  const [userName, setUsername] = useState<string | null>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [postData, setPostData] = useState<[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
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
        userName={userName}
        sessionToken={sessionToken}
        clearToken={clearToken}
        setSessionToken={setSessionToken}
      ></NavbarComponent>

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              sessionToken={sessionToken}
              updateToken={updateToken}
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
            <Home sessionToken={sessionToken} updateToken={updateToken}></Home>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
