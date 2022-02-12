import React from "react";
import { AppState } from "../App";
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
import Avatar from '../assets/default-profile-icon-0.jpg'


export type homeProps = {
    sessionToken: AppState["sessionToken"];
    updateToken: AppState["updateToken"];
    profilePic: AppState["profilePic"];
    avatar: AppState["avatar"];
}

export type gameAPI = {
    game: string,
    content: string,
    id: number,
    userId: number,
}

class Home extends React.Component<
    homeProps, 
{
    data: [],
    game: string,
    content: string,
    avatar: string,
} > {
    constructor(props: homeProps) {
        super(props)

        this.state = {
            data: [],
            game: "",
            content: "",
            avatar: Avatar,
        }
    }

    fetchPosts = () => {
        fetch("https://lam-gamer-buds-server.herokuapp.com/post/", {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
        .then((res) => {
            const body = res.json();
            return body;
        })
        .then((data) => {
            this.setState({
                data: data,
            })
            console.log(typeof this.state.data);
            console.log(data)
        })
    } 
    
    renderCard = (item: gameAPI, index: number) => {
        return(
            <Card
                style={{ width: "300px", height: "100%", margin: "25px"}}
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
                <ListGroupItem>
                    <h5><b>Game:</b></h5> {item.game}
                </ListGroupItem>
                <ListGroupItem>
                    <h5><b>Content:</b></h5>{item.content}
                </ListGroupItem>
                </ListGroup>
            </Card>
        )
    }

    // componentWillMount() {
    //     this.fetchPosts();
    // }

    componentDidMount() {
        this.fetchPosts();
    }

    render(): React.ReactNode {
        return(
            <div>
                {this.state.data.map(this.renderCard)}
            </div>
        )
    } 

}

export default Home;
