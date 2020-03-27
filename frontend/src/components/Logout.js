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
