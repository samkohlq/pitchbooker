import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import firebase from "../../firebase";

// This component sends email, name, phoneNum, and pitch address to the createProvider api
class ProviderInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phoneNum: null,
      address: null,
      email: null
    };
  }

  handleChange = event => {
    if (event.target) {
      console.log(event.target.name);
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    }
  };

  handleClick = async () => {
    const currentUserUid = firebase.auth().currentUser.uid;
    const idToken = await firebase
      .auth()
      .currentUser.getIdToken()
      .then(function(idToken) {
        return idToken;
      });
    fetch(
      `${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/providers/createProvider`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({
          name: this.state.name,
          phoneNum: this.state.phoneNum,
          address: this.state.address,
          email: this.state.email,
          currentUserUid: currentUserUid
        })
      }
    );
    window.location.href = "/providerdashboard";
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const providerEmail = user.email;
      this.setState({ email: providerEmail });
    });
  }

  render() {
    return (
      <Container>
        <h2 className="mt-5">Thanks for joining us!</h2>
        <h6 className="my-3">We just need a few more details</h6>
        <Row>
          <Col xs sm="10" md lg="5">
            <Form
              className="mt-4"
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

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control readOnly defaultValue={this.state.email} />
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
                <Form.Control
                  placeholder="Enter your pitch address"
                  name="address"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={this.handleClick}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProviderInfoForm;
