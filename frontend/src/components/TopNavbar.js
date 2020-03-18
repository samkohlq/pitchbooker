import React from "react";
import { NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import firebase from "../firebase";
import { loginFunction } from "./Login";

export default class TopNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    const providerLogin = this.state.loggedIn ? (
      <div className="top-navbar-container">
        <Navbar className="justify-content-between" bg="light" expand="lg">
          <Navbar.Brand>Pitch Booker</Navbar.Brand>
          <Navbar.Brand>{firebase.auth().currentUser.displayName}</Navbar.Brand>
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
