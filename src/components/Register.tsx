import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { AppState } from "../App";
import { validEmail, validPassword } from "./Regex";
import { useEffect } from "react";

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
    emailErr: boolean;
    pwdError: boolean;
    usernameErr: boolean;
    adminPwd: string;
    adminErrMsg: string;
    isAdminFieldVisible: boolean;
    isAdminFieldValid: boolean | null;
  }
> {
  constructor(props: RegisterProps) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      isAdmin: false,
      emailErr: false,
      pwdError: false,
      usernameErr: false,
      adminPwd: "",
      adminErrMsg: "",
      isAdminFieldVisible: false,
      isAdminFieldValid: null,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
    console.log(process.env.REACT_APP_ADMIN_KEY)
  };

  //  POST
  registerUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.validate();
    this.AdminPasswordValidation();
    
    console.log(this.state.isAdminFieldValid);

    if (
      this.state.emailErr === false &&
      this.state.pwdError === false &&
      this.state.usernameErr === false &&
      (this.state.isAdminFieldValid === true || this.state.isAdminFieldValid === null)
    ) {
      fetch("https://lam-gamer-buds-server.herokuapp.com/user/register", {
        method: "POST",
        body: JSON.stringify({
          user: {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            isAdmin: this.AdminPasswordValidation(),
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
    } else {
      console.log("One or more fields are invalid");
    }
  };

  AdminPasswordValidation = () => {
    if (this.state.adminPwd.length === 0) {
      console.log("Admin password is empty. Registering as standard user.");
      this.setState({
        isAdminFieldValid: true,
      })
      return false;
    } else if (this.state.adminPwd != process.env.REACT_APP_ADMIN_KEY) {
      console.log("Incorrect admin password! Try again or leave blank.");
      this.setState({
        adminErrMsg:
          "Incorrect admin password. Try again or leave this field blank if you wish to register as a standard user.",
        isAdminFieldValid: false,
      });
      return false;
    } else if (this.state.adminPwd === process.env.REACT_APP_ADMIN_KEY) {
      console.log("Correct admin password");
      this.setState({
        isAdminFieldValid: true,
      });
      return true;
    }
  };

  validate = () => {
    if (!validEmail.test(this.state.email)) {
      this.setState({
        emailErr: true,
      });
    } else {
      this.setState({
        emailErr: false,
      });
    }
    if (!validPassword.test(this.state.password)) {
      this.setState({
        pwdError: true,
      });
    } else {
      this.setState({
        pwdError: false,
      });
    }
    if (this.state.username.length <= 3) {
      this.setState({
        usernameErr: true,
      });
    } else {
      this.setState({
        usernameErr: false,
      });
    }
  };

  handleAdminCheckbox = () => {
    if (this.state.isAdminFieldVisible === false) {
      console.log("AdminFieldVisible: Admin checkbox is checked!");
      this.setState({
        isAdminFieldVisible: true,
      });
    } else {
      console.log("Admin checkbox is unchecked");
      this.setState({
        isAdminFieldVisible: false,
      });
    }
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
          {this.state.emailErr && <p>Your email is invalid</p>}
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
          {this.state.usernameErr && (
            <p>Username must be greater than 3 characters</p>
          )}
          <FormGroup>
            <Label id="password-label" htmlFor="password">
              Password
            </Label>
            <Input
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              id="register-password"
              type="password"
              required={true}
            />
          </FormGroup>
          {this.state.pwdError && <p>Your password is invalid</p>}

          <div id="admin-radio">
            <Input
              id="isAdminFieldVisible"
              name="isAdminFieldVisible"
              type="checkbox"
              checked={this.state.isAdminFieldVisible}
              onChange={this.handleAdminCheckbox}
            />
            <Label htmlFor="isAdminFieldVisible" id="isAdmin-label">
              Admin?
            </Label>
            <div id="admin-tooltip" role="tooltip">
              Leave this field blank if you are not an admin.
            </div>
            {this.state.isAdminFieldVisible && (
              <div>
                <Label htmlFor="adminPwd" id="admin-pwd-label">
                  Admin Authorization Code
                </Label>
                <Input
                  onChange={this.handleChange}
                  id="adminPwd-Input"
                  name="adminPwd"
                  type="password"
                  value={this.state.adminPwd}
                />
              </div>
            )}
          </div>
          <Button id="register-btn" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
