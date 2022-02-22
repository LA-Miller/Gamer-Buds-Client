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
  postId: AppState["postId"];
  setPostId: AppState["setPostId"];
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
  setIsLoggedIn: AppState["setIsLoggedIn"];
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
    if (localStorage.getItem("isAdmin") === "true") {
      console.log("User Deleted");
      fetch(`${APIURL}/user/${this.props.userId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      });
    }
  };

  deletePost = () => {
    if (localStorage.getItem("isAdmin") === "true") {
      console.log("Post Deleted");
      fetch(`${APIURL}/post/${this.props.postId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      });
    }
  };

//   displayLoggedOutNavbar = () => {
//     return (
//       <Navbar>
//         <Link to="/">Home</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/register">Register</Link>
//       </Navbar>
//     );
//   };

//   componentDidUpdate() {
//     this.displayLoggedOutNavbar();
//   }

  render(): React.ReactNode {
    return this.props.redirect ? (
      <Navigate to="/" replace={true} />
    ) : (
      <Navbar>
        <Link to="/">GamerBuds</Link>
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
            <Button onClick={this.deleteUser}>Delete User</Button>
            <Input
              type="number"
              onChange={(e) => this.props.setPostId(e.target.value)}
              name="postId"
              value={this.props.postId}
              required={true}
            />
            <Button onClick={this.deletePost}>Delete A Post</Button>
          </div>
        ) : null}
        {this.props.sessionToken ? (
          <Button
            onClick={() => {
              this.props.setRedirect(true);
              this.props.setIsLoggedIn(false);
              this.props.clearToken();
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
