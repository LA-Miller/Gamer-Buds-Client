import React from "react";
import { AppState } from "../App";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export type postProps = {
    sessionToken: AppState["sessionToken"];
    updateToken: AppState["updateToken"];
}

class PostCreate extends React.Component<
    postProps,
{
    game: string,
    content: string,
}> {
    constructor(props: postProps) {
        super(props)

        this.state = {
            game: '',
            content: '',
        }
    }

    postFetch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("https://lam-gamer-buds-server.herokuapp.com/post/create", {
            method: "POST",
            body: JSON.stringify({
                post: {
                    game: this.state.game,
                    content: this.state.content
                },
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.sessionToken}`,
            })    
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data:", data);
        })
        .catch((error) => console.log("Error:", error));
    } 

   
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

    render(): React.ReactNode {
        return(
            <div>
                <h1>Create A Post</h1>
                <Form onSubmit={this.postFetch}>
                    <FormGroup>
                        <Label id="game-label" htmlFor="email">
                            Game
                        </Label>
                        <Input  
                            onChange={this.handleChange}
                            name="game"
                            value={this.state.game}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label id="content-label" htmlFor="content">
                            Content
                        </Label>
                        <Input
                            onChange={this.handleChange}
                            name="content"
                            value={this.state.content}
                            required={true}
                        />
                    </FormGroup>
                    <Button id="post-btn" type="submit">
                        Post
                    </Button>
                </Form>
            </div>
        )
    }

}

export default PostCreate;