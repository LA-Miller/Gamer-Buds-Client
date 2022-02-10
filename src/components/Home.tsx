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

export type homeProps = {
    sessionToken: AppState["sessionToken"];
    updateToken: AppState["updateToken"];
}

export type gameAPI = {
    game: string,
    content: string,
    id: number,
    userId: number
}

class Home extends React.Component<
    homeProps, 
{
    data: [],
    game: string,
    content: string,
} > {
    constructor(props: homeProps) {
        super(props)

        this.state = {
            data: [],
            game: "",
            content: ""
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
            >
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

    componentWillMount() {
        this.fetchPosts();
    }

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
