import React from "react";
import { AppState } from "../App";
import { Link, Navigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  Input,
  Form,
} from "reactstrap";
import APIURL from "../helpers/environment";

export type NavbarProps = {
  redirect: AppState["redirect"];
  setRedirect: AppState["setRedirect"];
  isLoggedIn: AppState["isLoggedIn"];
  username: AppState["username"];
  sessionToken: AppState["sessionToken"];
  clearToken: AppState["clearToken"];
  setSessionToken: AppState["setSessionToken"];
  setUsername: AppState["setUsername"];
  setUserId: AppState["setUserId"];
  userId: AppState["userId"];
};

class NavbarComponent extends React.Component<
  NavbarProps,
  { toggle: boolean }
> {
  constructor(props: NavbarProps) {
    super(props);

    this.state = {
      toggle: false,
    };
  }

    deleteUser = () => {
        if(localStorage.getItem("isAdmin") === "true") {
            console.log("User Deleted");
            fetch(`${APIURL}/user/${this.props.userId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }),
            })
        }
    }

  render(): React.ReactNode {
    return this.props.redirect ? (
      <Navigate to="/" replace={true} />
    ) : (
      <Navbar>
        <Link to="/">Home</Link>
        {this.props.sessionToken ? null : <Link to="/login">Login</Link>}
        {this.props.sessionToken ? null : <Link to="/register">Register</Link>}
        {this.props.sessionToken ? (
          <Link to="/create">Create A Post</Link>
        ) : null}
        {this.props.sessionToken ? (
          <Link to="/profile">Your Profile</Link>
        ) : null}
        {localStorage.getItem("isAdmin") === "true" ? (
          <div>
              <Input
                type="number"
                onChange={(e) => this.props.setUserId(e.target.value)}
                name="userId"
                value={this.props.userId}
                required={true}
              />
              <Button
              onClick={this.deleteUser}
              >Delete User</Button>
          </div>
        ) : null}
        {this.props.sessionToken ? (
          <Button
            onClick={() => {
              this.props.setRedirect(true);
              this.props.clearToken();
              //   this.setState({
              //       toggle: !this.state.toggle
              //   })
            }}
          >
            Logout
          </Button>
        ) : null}
      </Navbar>
    );
  }
}

export default NavbarComponent;
