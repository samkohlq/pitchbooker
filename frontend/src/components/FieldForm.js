import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// This component only asks for name and phonenum for now, and sends it to the createProvider api.
// TODO(Perry): Only render this component when user is logged in. Then send the user email, idToken, and address.
export default class FieldForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null, phoneNum: null, address: "null", email: "null" };
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
    await fetch("http://localhost:5001/providers/createProvider", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        phoneNum: this.state.phoneNum,
        address: this.state.address,
        email: this.state.email
      })
    });
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

        <Form.Group controlId="formBasicPassword" onChange={this.handleChange}>
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            placeholder="Enter your mobile Number"
            name="phoneNum"
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleClick}>
          Submit
        </Button>
      </Form>
    );
  }
}
