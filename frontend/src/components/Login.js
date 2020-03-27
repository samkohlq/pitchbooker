import React from "react";
import { Container } from "react-bootstrap";
import firebase from "../firebase";

var firebaseui = require("firebaseui");

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true;
    }
  },
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInSuccessUrl: "/providerdashboard",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

export const loginFunction = () => {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", uiConfig);
};

export default class Login extends React.Component {
  render() {
    return (
      <Container>
        <div id="firebaseui-auth-container"></div>
      </Container>
    );
  }
}
