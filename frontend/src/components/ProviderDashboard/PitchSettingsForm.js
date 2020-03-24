import React from "react";
import { Button, Form } from "react-bootstrap";

class PitchSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pitchName: "",
      pricePerHour: "",
      address: "",
      maxNumPlayersPerSide: ""
    };
  }

  handlePitchNameInputChange = e => {
    this.setState({ pitchName: e.target.value });
  };

  handlePricePerHourInputChange = e => {
    this.setState({ pricePerHour: e.target.value });
  };

  handleAddressInputChange = e => {
    this.setState({ address: e.target.value });
  };

  handleMaxNumPlayersPerSideInputChange = e => {
    this.setState({ maxNumPlayersPerSide: e.target.value });
  };

  handleClick = e => {
    fetch(
      `${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/pitches/updatePitch`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.pitchName
            ? this.state.pitchName
            : this.props.pitch.name,
          pricePerHour: this.state.pricePerHour
            ? this.state.pricePerHour
            : this.props.pitch.pricePerHour,
          address: this.state.address
            ? this.state.address
            : this.props.pitch.address,
          maxNumPlayersPerSide: this.state.maxNumPlayersPerSide
            ? this.state.maxNumPlayersPerSide
            : this.props.pitch.maxNumPlayersPerSide,
          pitchId: this.props.pitch.id
        })
      }
    ).then(response => {
      return response.json();
    });
    this.props.onClose();
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "30%",
          backgroundColor: "rgba(0,0,0,0.3)",
          padding: "2px"
        }}
      >
        <Button
          onClick={this.props.onClose(this.props.pitchId)}
          style={{
            float: "right",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0.3)"
          }}
        >
          x
        </Button>
        <div
          style={{
            backgroundColor: "#fff",
            maxWidth: 500,
            minHeight: 300,
            margin: "0 auto",
            padding: 30
          }}
        >
          <Form>
            <Form.Group style={{ paddingTop: 10 }}>
              <Form.Label id="pitchNameLabel">Pitch Name</Form.Label>
              <Form.Control
                placeholder={this.props.pitch.name}
                value={this.state.pitchName}
                onChange={this.handlePitchNameInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="pricePerHourLabel">Price Per Hour</Form.Label>
              <Form.Control
                placeholder={this.props.pitch.pricePerHour}
                value={this.state.pricePerHour}
                onChange={this.handlePricePerHourInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="maxPlayersPerSideLabel">
                Max Players Per Side
              </Form.Label>
              <Form.Control
                placeholder={this.props.pitch.maxNumPlayersPerSide}
                value={this.state.maxNumPlayersPerSide}
                onChange={this.handleMaxNumPlayersPerSideInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label id="addressLabel">Address</Form.Label>
              <Form.Control
                placeholder={this.props.pitch.address}
                value={this.state.address}
                onChange={this.handleAddressInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleClick}>
              Update
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default PitchSettingsForm;
