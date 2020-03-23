import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import firebase from "../firebase";

// This component sends email, name, phoneNum, and pitch address to the createProvider api
// TODO(Perry): Only render this component when user is logged in
export default class FieldForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phoneNum: null,
      address: null,
      email: null,
      currentUserUid: null
    };
  }
  handleChange = e => {
    if (e.target) {
      console.log(e.target.name);
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value
      });
    }
    console.log(this.state);
  };

  handleClick = async () => {
    console.log(firebase.auth().currentUser.uid);
    await this.setState({ email: firebase.auth().currentUser.email });
    await this.setState({ currentUserUid: firebase.auth().currentUser.uid });
    fetch(
      "${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/providers/createProvider",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          phoneNum: this.state.phoneNum,
          address: this.state.address,
          email: this.state.email,
          currentUserUid: this.state.currentUserUid
        })
      }
    );
  };

  render() {
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Form.Group onChange={this.handleChange}>
          <Form.Label>Organisation</Form.Label>
          <Form.Control
            placeholder="Enter your organisation name"
            name="name"
          />
        </Form.Group>

        <Form.Group onChange={this.handleChange}>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            placeholder="Enter your mobile Number"
            name="phoneNum"
          />
        </Form.Group>
        <Form.Group onChange={this.handleChange}>
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Enter your pitch address" name="address" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleClick}>
          Submit
        </Button>
      </Form>
    );
  }
}
