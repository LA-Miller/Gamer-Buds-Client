import React from "react";
import { AppState } from "../App";
import { Link } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    Button,
} from "reactstrap";

export type NavbarProps = {
    isLoggedIn: AppState['isLoggedIn'],
    userName: AppState["userName"],
    sessionToken: AppState['sessionToken'],
    clearToken: AppState['clearToken'],
    setSessionToken: AppState['setSessionToken']
}

class NavbarComponent extends React.Component<NavbarProps, {}>{
    constructor(props: NavbarProps) {
        super(props)
    }

    render(): React.ReactNode {
        return(
           <Navbar>
               <Link to='/'>Home</Link>
               {this.props.sessionToken ? null : <Link to='/login'>Login</Link>}
               {this.props.sessionToken ? null : <Link to='/register'>Register</Link>}
               {this.props.sessionToken ? <Link to='/create'>Create A Post</Link> : null}
               {this.props.sessionToken ? <Button onClick={this.props.clearToken}>Logout</Button> : null}
           </Navbar>
        )
    }
}

export default NavbarComponent;