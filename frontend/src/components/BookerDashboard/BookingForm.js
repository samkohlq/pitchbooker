import React from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookerName: "",
      bookerEmail: "",
      bookerPhoneNum: "",
      bookingStartDate: "",
      bookingEndDate: "",
      pitchAddress: "",
      pitchName: "",
      redirect: null
    };
  }

  handleNameInputChange = e => {
    this.setState({ bookerName: e.target.value });
  };

  handleEmailInputChange = e => {
    this.setState({ bookerEmail: e.target.value });
  };

  handlePhoneNumInputChange = e => {
    this.setState({ bookerPhoneNum: e.target.value });
  };

  handleClick = e => {
    fetch(
      `${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/bookings/createBooking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookerName: this.state.bookerName,
          bookerEmail: this.state.bookerEmail,
          bookerPhoneNum: this.state.bookerPhoneNum,
          bookingStartDateTime: this.props.bookingStartTime,
          bookingEndDateTime: this.props.bookingEndTime,
          pitchId: this.props.pitch.id
        })
      }
    )
      .then(response => {
        return response.json();
      })
      .then(pitchBook => {
        this.setState({
          bookingStartDate: pitchBook.newBooking.bookingStartDateTime,
          bookingEndDate: pitchBook.newBooking.bookingEndDateTime,
          pitchAddress: pitchBook.associatedPitch.address,
          pitchName: pitchBook.associatedPitch.name,
          redirect: "/success"
        });
      });
    this.props.onClose();
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/success",
            state: {
              bookingStartDate: this.state.bookingStartDate,
              bookingEndDate: this.state.bookingEndDate,
              pitchAddress: this.state.pitchAddress,
              pitchName: this.state.pitchName
            }
          }}
        />
      );
    }
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
          onClick={this.props.onClose}
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
            You have selected a booking of {this.props.pitch.name} from{" "}
            {this.props.bookingStartTime.toString()} to{" "}
            {this.props.bookingEndTime.toString()}.
            <Form.Group style={{ paddingTop: 10 }}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
                value={this.state.bookerName}
                onChange={this.handleNameInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                value={this.state.bookerEmail}
                onChange={this.handleEmailInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                placeholder="Enter phone number"
                value={this.state.bookerPhoneNum}
                onChange={this.handlePhoneNumInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleClick}>
              Book
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default BookingForm;
