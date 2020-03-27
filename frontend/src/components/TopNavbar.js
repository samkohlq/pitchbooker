import React from "react";
import { NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import firebase from "../firebase";
import { loginFunction } from "./Login";
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
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const idToken = await firebase
          .auth()
          .currentUser.getIdToken()
          .then(function(idToken) {
            return idToken;
          });
        this.setState({ loggedIn: true });
        fetch(
          `${
            process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL
          }/providers/retrieveProvider?currentUserUid=${
            firebase.auth().currentUser.uid
          }`,
          {
            headers: { Authorization: `Bearer ${idToken}` }
          }
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
                : firebase.auth().currentUser
                ? firebase.auth().currentUser.displayName
                : ""}
            </Navbar.Brand>
          </Navbar>
        </Navbar>
      </div>
    ) : (
      <div className="top-navbar-container">
        <Navbar className="justify-content-between" bg="light" expand="lg">
          <Navbar.Brand>Pitch Booker</Navbar.Brand>
          <NavDropdown title="Field Providers">
            <NavDropdown.Item onClick={() => loginFunction()}>
              Login
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      </div>
    );
    return providerLogin;
  }
}
