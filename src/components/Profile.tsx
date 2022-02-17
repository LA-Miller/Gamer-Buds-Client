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
  setDiscord: AppState["setDiscord"];
  profilePic: AppState["profilePic"];
  userId: AppState["userId"];
  username: AppState["username"];
  setUsername: AppState["setUsername"];
  avatar: AppState["avatar"];
  game: AppState["game"];
  setGame: AppState["setGame"];
  content: AppState["content"];
  setContent: AppState["setContent"];
  email: AppState["email"];
  setEmail: AppState["setEmail"];
  password: AppState["password"];
  setPassword: AppState["setPassword"];
};

export type gameAPI = {
  game: string;
  content: string;
  id: number;
  userId: number;
};

export type profileAPI = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePic: string;
  discord: string;
};

class Profile extends React.Component<
  profileProps,
  {
    postData: [];
    profileData: [];
    isOpen: boolean;
    editMode: boolean;
    profileEditMode: boolean;
  }
> {
  constructor(props: profileProps) {
    super(props);

    this.state = {
      postData: [],
      profileData: [],
      isOpen: false,
      editMode: false,
      profileEditMode: false,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "game") {
      this.props.setGame(e.target.value);
    } else if (e.target.name === "content") {
      this.props.setContent(e.target.value);
    } else if (e.target.name === "username") {
      this.props.setUsername(e.target.value);
    } else if (e.target.name === "email") {
      this.props.setEmail(e.target.value);
    } else if (e.target.name === "discord") {
      this.props.setDiscord(e.target.value);
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
            postData: data.user[0].posts,
          });
        } else {
          this.setState({
            postData: [],
          });
        }

        this.props.setUsername(data.user[0].username);
        this.props.setEmail(data.user[0].email);
        this.props.setDiscord(data.user[0].discord);

        console.log("postData:", this.state.postData);
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
          postData: [],
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

  updateProfile = (userId: number | string) => {
    fetch(`${APIURL}/user/update/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          username: this.props.username,
          email: this.props.email,
          discord: this.props.discord,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((json) => console.log(json.json()))
      .then(this.fetchProfileInfo)
      .catch((err) => console.log(err));
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

  toggleProfileEdit = () => {
    this.setState({
      profileEditMode: !this.state.profileEditMode,
    });
  };

  render(): React.ReactNode {
    return (
      <div>
        <p style={{ margin: "20px" }}>{localStorage.getItem("username")}</p>
        <p></p>
        <p>{this.props.discord}</p>
        <img src={this.props.avatar} style={{ margin: "20px" }}></img>
        <Button onClick={this.toggleProfileEdit}>Edit Profile</Button>
        {this.state.profileEditMode ? (
          <Modal
            centered
            fullscreen="xl"
            scrollable
            size="xl"
            toggle={this.toggleProfileEdit}
            isOpen={this.state.profileEditMode}
          >
            <ModalHeader>Your Profile Info</ModalHeader>
            <ModalBody>
              <ListGroup>
                <ListGroupItem>
                  Username:
                  <Input
                    onChange={this.handleChange}
                    name="username"
                    contentEditable={true}
                    placeholder={this.props.username}
                    value={this.props.username}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  Email:
                  <Input
                    onChange={this.handleChange}
                    name="email"
                    contentEditable={true}
                    placeholder={this.props.email}
                    value={this.props.username}
                  />
                </ListGroupItem>
                <ListGroupItem>
                  Discord:
                  <Input
                    onChange={this.handleChange}
                    name="discord"
                    contentEditable={true}
                    placeholder={this.props.discord}
                    value={this.props.discord}
                  />
                </ListGroupItem>
              </ListGroup>
              <Button
                style={{ backgroundColor: "green" }}
                id="update-btn"
                onClick={() => this.updateProfile(this.props.userId)}
              >
                Update Profile
              </Button>
              <Button
                style={{ backgroundColor: "red" }}
                id="update-btn"
                onClick={this.toggleProfileEdit}
              >
                Cancel Changes
              </Button>
            </ModalBody>
          </Modal>
        ) : null}
        {this.state.postData ? (
          <div>{this.state.postData.map(this.renderModal)}</div>
        ) : null}
      </div>
    );
  }
}

export default Profile;
