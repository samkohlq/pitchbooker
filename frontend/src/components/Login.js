import React from "react";
import firebase from "../firebase";

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

export const loginFunction = () => {
  ui.start("#firebaseui-auth-container", uiConfig);
};

export default class Login extends React.Component {
  render() {
    return <div id="firebaseui-auth-container"></div>;
  }
}
