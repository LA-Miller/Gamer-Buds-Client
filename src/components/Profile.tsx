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
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";
import { isJsxOpeningElement } from "typescript";

export type profileProps = {
  sessionToken: AppState["sessionToken"];
  discord: AppState["discord"];
  profilePic: AppState["profilePic"];
  userId: AppState["userId"];
  username: AppState["username"];
  avatar: AppState["avatar"];
  game: AppState["game"];
  setGame: AppState["setGame"];
  content: AppState["content"];
  setContent: AppState["setContent"];
};

export type gameAPI = {
  game: string;
  content: string;
  id: number;
  userId: number;
};

class Profile extends React.Component<
  profileProps,
  {
    data: [];
    isOpen: boolean;
    editMode: boolean;
  }
> {
  constructor(props: profileProps) {
    super(props);

    this.state = {
      data: [],
      isOpen: false,
      editMode: false,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "game") {
      this.props.setGame(e.target.value);
    } else if (e.target.name === "content") {
      this.props.setContent(e.target.value);
    }
  };

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
        console.log(data);
        if (data.user[0].posts) {
          this.setState({
            data: data.user[0].posts,
          });
        } else {
          this.setState({
            data: [],
          });
        }

        console.log("data:", this.state.data);
      })
      .catch((error) => console.log("Error:", error));
  };

  updatePost = (postId: number) => {
    fetch(`${APIURL}/post/update/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        post: {
          game: this.props.game,
          content: this.props.content,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((json) => console.log(json.json()))
      .then(() => {
        this.setState({
          data: [],
        });
        this.fetchProfileInfo();
      })
      .catch((err) => console.log(err));
  };

  deletePost = (postId: number) => {
    fetch(`${APIURL}/post/${postId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    }).then(() => this.fetchProfileInfo());
  };

  componentDidMount() {
    this.fetchProfileInfo();
  }

  renderModal = (item: gameAPI, index: number) => {
    return (
      <Container>
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card
              style={{ width: "100", height: "100", margin: "20px" }}
              key={index}
              className="box"
            >
              <CardImg variant="top" src={this.props.avatar} />
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Game:
                  <Input
                    onChange={this.handleChange}
                    name="game"
                    contentEditable={true}
                    placeholder={item.game}
                    value={this.props.game}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  Content:
                  <Input
                    onChange={this.handleChange}
                    name="content"
                    contentEditable={true}
                    placeholder={item.content}
                    value={this.props.content}
                  />
                </ListGroupItem>
              </ListGroup>
              <div id="edit-card-btns">
                <Button
                  style={{ backgroundColor: "green" }}
                  id="update-btn"
                  onClick={() => this.updatePost(item.id)}
                >
                  Update Post
                </Button>
                <Button
                  style={{ backgroundColor: "red" }}
                  id="delete-btn"
                  onClick={() => this.deletePost(item.id)}
                >
                  Delete Post
                </Button>
              </div>
            </Card>
          </Col>
          <Col md="2"></Col>
        </Row>
      </Container>
    );
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render(): React.ReactNode {
    return (
      <div>
        <p style={{ margin: "20px" }}>{localStorage.getItem("username")}</p>
        <p></p>
        <p>{this.props.discord}</p>
        <img src={this.props.avatar} style={{ margin: "20px" }}></img>
        <Button>Edit Profile</Button>
        {this.state.data ? (
          <div>{this.state.data.map(this.renderModal)}</div>
        ) : null}
      </div>
    );
  }
}

export default Profile;
