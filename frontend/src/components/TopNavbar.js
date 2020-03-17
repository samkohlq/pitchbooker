import React from "react";
import { NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { loginFunction } from "./Login";
import "./TopNavbar.css";

export default class TopNavbar extends React.Component {
  // TODO(Perry): Make a onAuthStateChange in ComponentDidMount to ask for organisation name and phone number to send to the backend
  render() {
    return (
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
  }
}
