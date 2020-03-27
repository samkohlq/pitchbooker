import React from "react";
import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
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

function Login() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <NavDropdown.Item
        variant="primary"
        onClick={() => {
          handleShow();
        }}
      >
        Login
      </NavDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Modal.Body>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  );
}

export default Login;
