import React from "react";
import { NavDropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import firebase from "../firebase";

// In this component will contain both login and create account component, and the state will contain the organization name if logged in
var firebaseui = require("firebaseui");
var ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true;
    }
  },
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

const createAccount = () => {
  ui.start("#firebaseui-auth-container", uiConfig);
};

export default class TopNavbar extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Navbar
            className="justify-content-between"
            fixed="top"
            bg="light"
            expand="lg"
          >
            <Navbar.Brand>Pitch Booker</Navbar.Brand>
            <NavDropdown title="Field Providers">
              <NavDropdown.Item onClick={() => createAccount()}>
                Login
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar>
        </div>
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}
