import { stringify } from "querystring";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { AppState } from "../App";

export type LoginProps = {
  sessionToken: AppState["sessionToken"];
  updateToken: AppState["updateToken"];
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
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  // FETCH
  loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("https://lam-gamer-buds-server.herokuapp.com/user/login", {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        this.props.updateToken(data.sessionToken);
      })
      .catch((error) => console.log("Error:", error));
  };

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
              value={this.state.username}
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
              value={this.state.password}
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
