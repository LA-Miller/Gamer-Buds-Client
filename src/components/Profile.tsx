import React from "react";
import { AppState } from "../App";

export type profileProps = {
    sessionToken: AppState["sessionToken"]
    discord: AppState["discord"];
    profilePic: AppState["profilePic"];
    userId: AppState["userId"];
    username: AppState["username"];
    avatar: AppState["avatar"];
}

class Profile extends React.Component<
    profileProps, {}
> {
    constructor(props: profileProps) {
        super(props)

    }

    fetchProfileInfo = () => {
        fetch(`https://lam-gamer-buds-server.herokuapp.com/user/${this.props.userId}`, {
            method: "GET",
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

    componentDidMount() {
        this.fetchProfileInfo();
    }

    render(): React.ReactNode {
        return(
            <div>
                <img src={this.props.avatar}></img>
                <p>{this.props.username}</p>
                <p></p>
                
            </div>
        )
    }
}

export default Profile;