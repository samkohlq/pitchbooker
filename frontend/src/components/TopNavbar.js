import React from "react";
import { NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import firebase from "../firebase";
import Login from "./Login";
import Logout from "./Logout";

export default class TopNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: firebase.auth().currentUser ? true : false,
      organisationName: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
        fetch(
          `${
            process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL
          }/providers/retrieveProvider?currentUserUid=${
            firebase.auth().currentUser.uid
          }`
        ).then(response => {
          if (response) {
            response.json().then(json => {
              if (json.id != null) {
                this.setState({
                  organisationName: json.name
                });
              }
            });
          }
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    const providerLogin = this.state.loggedIn ? (
      <div className="top-navbar-container">
        <Navbar className="justify-content-between" bg="light" expand="med">
          <Navbar.Brand>Pitch Booker</Navbar.Brand>
          {/* BUG(Perry): i put the two component below in a nested navbar to squeeze it to the right. however, it makes the main navbar bigger than normal */}
          <Navbar expand="sm">
            <Logout />
            <Navbar.Brand>
              {this.state.organisationName
                ? this.state.organisationName
                : firebase.auth().currentUser.displayName}
            </Navbar.Brand>
          </Navbar>
        </Navbar>
      </div>
    ) : (
      <div className="top-navbar-container">
        <Navbar className="justify-content-between" bg="light" expand="lg">
          <Navbar.Brand href="/">Pitch Booker</Navbar.Brand>
          <NavDropdown title="Field Providers">
            <NavDropdown.Item>
              <Login />
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      </div>
    );
    return providerLogin;
  }
}
