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
} from "reactstrap";

export type NavbarProps = {
  redirect: AppState["redirect"];
  setRedirect: AppState["setRedirect"];
  isLoggedIn: AppState["isLoggedIn"];
  userName: AppState["username"];
  sessionToken: AppState["sessionToken"];
  clearToken: AppState["clearToken"];
  setSessionToken: AppState["setSessionToken"];
};

class NavbarComponent extends React.Component<NavbarProps, { toggle: boolean }> {
  constructor(props: NavbarProps) {
    super(props);

    this.state = {
        toggle: false
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
