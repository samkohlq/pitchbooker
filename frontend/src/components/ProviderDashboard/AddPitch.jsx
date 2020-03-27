import React from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Row
} from "react-bootstrap";
import firebase from "../../firebase";

class AddPitch extends React.Component {
  // define attributes in local state
  constructor(props) {
    super(props);
    this.state = {
      pitchName: null,
      maxNumPlayersPerSide: null,
      pricePerHour: null,
      address: null
    };
  }

  // set state when there are changes to inputs in form
  handleChange = event => {
    if (event.target) {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    }
  };

  // send HTTP POST request to backend when user clicks "submit"
  handleClick = async () => {
    const currentUserUid = firebase.auth().currentUser.uid;
    const idToken = await firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function(idToken) {
        return idToken;
      });
    fetch(
      `${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/pitches/createPitch?currentUserUid=${currentUserUid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({
          name: this.state.pitchName,
          maxNumPlayersPerSide: this.state.maxNumPlayersPerSide,
          pricePerHour: this.state.pricePerHour,
          address: this.state.address
        })
      }
    );
    window.location.href = "/providerdashboard";
  };

  render() {
    return (
      <Row className="my-5">
        <Col xs sm="12" md="6" lg="4" className="ml-5">
          {/* Render an accordion which expands only if user chooses to add a new pitch */}
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Add a new pitch
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {/* form input field 1: pitch name */}
                  <InputGroup
                    className="mb-3"
                    size="sm"
                    onChange={this.handleChange}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>Pitch name</InputGroup.Text>
                    </InputGroup.Prepend>
                    {/* gives the input a HTML name attribute with value "pitchName"
                    so we can reference it in handleChange event */}
                    <FormControl name="pitchName" />
                  </InputGroup>
                  {/* form input field 2: max number of players */}
                  <InputGroup
                    className="mb-3"
                    size="sm"
                    onChange={this.handleChange}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>Max no. of players</InputGroup.Text>
                    </InputGroup.Prepend>
                    {/* gives the input a HTML name attribute with value "maxNumPlayersPerSide"
                    so we can reference it in handleChange event */}
                    <FormControl name="maxNumPlayersPerSide" />
                    <InputGroup.Append>
                      <InputGroup.Text>per side</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  {/* form input field 3: price per hour */}
                  <InputGroup
                    className="mb-3"
                    size="sm"
                    onChange={this.handleChange}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    {/* gives the input a HTML name attribute with value "pricePerHour"
                    so we can reference it in handleChange event */}
                    <FormControl name="pricePerHour" />
                    <InputGroup.Append>
                      <InputGroup.Text>per hour</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  {/* form input field 4: address */}
                  <InputGroup
                    className="mb-3"
                    size="sm"
                    onChange={this.handleChange}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>Address</InputGroup.Text>
                    </InputGroup.Prepend>
                    {/* gives the input a HTML name attribute with value "address"
                    so we can reference it in handleChange event */}
                    <FormControl name="address" />
                  </InputGroup>
                  <Button
                    variant="primary"
                    type="submit"
                    size="sm"
                    className="float-right mb-3"
                    onClick={this.handleClick}
                  >
                    Add pitch
                  </Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    );
  }
}

export default AddPitch;
