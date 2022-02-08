import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { AppState } from "../App";

export type RegisterProps = {
  sessionToken: AppState["sessionToken"];
  updateToken: AppState["updateToken"];
};

class Register extends React.Component<
  RegisterProps,
  {
    email: string;
    username: string;
    password: string;
    isAdmin: boolean;
  }
> {
  constructor(props: RegisterProps) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      isAdmin: false,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  //  POST
  registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("https://lam-gamer-buds-server.herokuapp.com/user/register", {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          isAdmin: this.state.isAdmin,
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
        <h1 className="register-h1">Sign Up</h1>
        <Form onSubmit={this.registerUser}>
          <FormGroup>
            <Label id="email-label" htmlFor="email">
              Email
            </Label>
            <Input
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
              id="register-email"
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <Label id="username-label" htmlFor="username">
              Username
            </Label>
            <Input
              onChange={this.handleChange}
              name="username"
              value={this.state.username}
              id="register-username"
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <Label id="password-label" htmlFor="password">
              Password
            </Label>
            <Input
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              id="register-password"
              required={true}
            />
          </FormGroup>
          <Button id="register-btn" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
