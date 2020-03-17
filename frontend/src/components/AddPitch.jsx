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

class AddPitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pitchName: null,
      maxNumPlayersPerSide: null,
      pricePerHour: null,
      address: null
    };
  }

  handleChange = event => {
    if (event.target) {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    }
  };

  handleClick = () => {
    fetch(`http://localhost:5001/pitches/createPitch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.pitchName,
        maxNumPlayersPerSide: this.state.maxNumPlayersPerSide,
        pricePerHour: this.state.pricePerHour,
        address: this.state.address,
        providerId: 1
      })
    });
  };

  render() {
    return (
      <Row className="my-5">
        <Col xs sm="12" md="6" lg="4" className="ml-5">
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Add a new pitch
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <InputGroup
                    className="mb-3"
                    size="sm"
                    onChange={this.handleChange}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>Pitch name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl name="pitchName" />
                  </InputGroup>
                  <InputGroup
                    className="mb-3"
                    size="sm"
                    onChange={this.handleChange}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>Max no. of players</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl name="maxNumPlayersPerSide" />
                    <InputGroup.Append>
                      <InputGroup.Text>per side</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup
                    className="mb-3"
                    size="sm"
                    onChange={this.handleChange}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl name="pricePerHour" />
                    <InputGroup.Append>
                      <InputGroup.Text>per hour</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                  <InputGroup
                    className="mb-3"
                    size="sm"
                    onChange={this.handleChange}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text>Address</InputGroup.Text>
                    </InputGroup.Prepend>
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
