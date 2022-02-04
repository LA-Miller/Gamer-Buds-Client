import React, { useState, useEffect } from "react";
import "./App.css";
// import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export type AppState = {
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  return (
  <div className="App">
    <Login sessionToken={sessionToken} updateToken={updateToken}/>
  </div>
  );
};

export default App;
