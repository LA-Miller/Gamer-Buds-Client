import { stringify } from "querystring";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { AppState } from "../App";
import APIURL from "../helpers/environment";

export type LoginProps = {
  sessionToken: AppState["sessionToken"];
  updateToken: AppState["updateToken"];
  password: AppState["password"];
  setPassword: (e: string) => void;
  username: AppState["username"];
  setUsername: (e: string) => void;
  userId: AppState["userId"];
  setUserId: (e: number) => void;
  isAdmin: AppState["isAdmin"];
  setIsAdmin: AppState["setIsAdmin"];
  redirect: AppState["redirect"];
  setRedirect: AppState["setRedirect"];
  setIsLoggedIn: AppState["setIsLoggedIn"];
};

//                                   props    ,  state
class Login extends React.Component<
  LoginProps, {}
> {
  constructor(props: LoginProps) {
    super(props);

  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      this.props.setUsername(e.target.value);
    } else {
      this.props.setPassword(e.target.value);
    }
  };

  // FETCH
  loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: this.props.username,
          password: this.props.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);

        this.props.setUserId(data.user.id);
        this.props.setUsername(data.user.username);
        this.props.setIsAdmin(data.user.isAdmin);
        this.props.setRedirect(true);
        this.props.setIsLoggedIn(true);
        this.props.updateToken(data.sessionToken);
      })
      .catch((error) => console.log("Error:", error));
  };

  componentWillUnmount() {}

  // Changes
  render(): React.ReactNode {
    return (
      <div>
        <h1 className="login-h1">Login</h1>
        <Form onSubmit={this.loginUser}>
          <FormGroup>
            <Label id="username-label" htmlFor="username">
              Username
            </Label>
            <Input
              onChange={this.handleChange}
              name="username"
              value={this.props.username}
              id="login-username"
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <Label id="pass-label" htmlFor="password">
              Password
            </Label>
            <Input
              onChange={this.handleChange}
              type="password"
              name="password"
              value={this.props.password}
              id="login-pass"
              required={true}
            />
          </FormGroup>
          <Button id="login-btn" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
