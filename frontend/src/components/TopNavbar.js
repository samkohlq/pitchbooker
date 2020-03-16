import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

// In this component will contain both login and create account component, and the state will contain the organization name if logged in

export default class TopNavbar extends React.Component {
  render() {
    return (
      <div>
        <Navbar fixed="top" bg="light" expand="lg">
          <Navbar.Brand>Pitch Booker</Navbar.Brand>
          <Navbar>
            <Button variant="primary">Create Account</Button>
            <Button variant="primary">Login</Button>
          </Navbar>
        </Navbar>
      </div>
    );
  }
}
