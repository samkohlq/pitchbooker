import React from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import firebase from "../firebase";

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null };
  }

  componentDidMount() {
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", e => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("signed out");
          // this is where we want to redirect to root url
          // BUG(Perry): Upon signing out and redirecting to '/', when i log in again, nothing seems to happen, the url becomes '/?mode=select'.
          this.setState({ redirect: "/" });
        });
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div>
        <Button variant="link" id="logout">
          Logout
        </Button>
      </div>
    );
  }
}
