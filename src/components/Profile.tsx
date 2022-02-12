import React from "react";
import { AppState } from "../App";
import APIURL from "../helpers/environment";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  ListGroup,
  ListGroupItem,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";

export type profileProps = {
  sessionToken: AppState["sessionToken"];
  discord: AppState["discord"];
  profilePic: AppState["profilePic"];
  userId: AppState["userId"];
  username: AppState["username"];
  avatar: AppState["avatar"];
};

export type gameAPI = {
  game: string;
  content: string;
  id: number;
  userId: number;
};

class Profile extends React.Component<profileProps, { data: [] }> {
  constructor(props: profileProps) {
    super(props);

    this.state = {
      data: [],
    };
  }

  fetchProfileInfo = () => {
    fetch(`${APIURL}/user/find/${localStorage.getItem("userId")}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user[0].posts) {
          this.setState({
            data: data.user[0].posts,
          });
        } else {
            this.setState({
                data: []
            })
        }

        console.log("data:", this.state.data);
      })
      .catch((error) => console.log("Error:", error));
  };

  componentDidMount() {
    this.fetchProfileInfo();
  }

  renderCard = (item: gameAPI, index: number) => {
    return (
      <Card
        style={{ width: "300px", height: "100%", margin: "25px" }}
        key={index}
        id="card"
        className="box"
      >
        <CardImg
          variant="top"
          src={this.props.avatar}
          style={{ maxHeight: "200px", minHeight: "200px" }}
          id="card-img"
        ></CardImg>
        <ListGroup className="list-group-flush">
          {/* <ListGroupItem>
                    <h5><b>User:</b></h5> {item.username}
                </ListGroupItem> */}
          <ListGroupItem>
            <h5>
              <b>Game:</b>
            </h5>{" "}
            {item.game}
          </ListGroupItem>
          <ListGroupItem>
            <h5>
              <b>Content:</b>
            </h5>
            {item.content}
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  };

  render(): React.ReactNode {
    return (
      <div>
        <img src={this.props.avatar}></img>
        <p>{localStorage.getItem("username")}</p>
        {this.state.data ? <div>{this.state.data.map(this.renderCard)}</div> : null}
      </div>
    );
  }
}

export default Profile;
