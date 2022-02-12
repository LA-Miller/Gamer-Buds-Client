import { stringify } from "querystring";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { AppState } from "../App";
import APIURL from "../helpers/environment";

export type LoginProps = {
  sessionToken: AppState["sessionToken"];
  updateToken: AppState["updateToken"];
  setUserId: (e: number) => void;
  setUsername: (e: string) => void;
  setPassword: (e: string) => void;
  username: AppState["username"];
  password: AppState["password"];
  userId: AppState["userId"];
  isAdmin: AppState["isAdmin"];
  setIsAdmin: AppState["setIsAdmin"];
};

//                                   props    ,  state
class Login extends React.Component<
  LoginProps,
  {
    username: string;
    password: string;
  }
> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.loginUser = this.loginUser.bind(this);
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      this.props.setUsername(e.target.value);
    } else {
      this.props.setPassword(e.target.value);
    }
    console.log(this.props.username);
    console.log(this.props.userId);
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
        this.props.updateToken(data.sessionToken);
      })
      .catch((error) => console.log("Error:", error));
  };

  componentWillUnmount() {}

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
