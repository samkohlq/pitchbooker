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
      newBooking: null,
      associatedPitch: null,
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
      // pitchBooking is an object containing the new booking and the associated pitch
      .then(pitchBooking => {
        this.setState({
          newBooking: pitchBooking.newBooking,
          associatedPitch: pitchBooking.associatedPitch,
          redirect: "/bookingsuccess"
        });
      })
      .then(
        fetch(
          `${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/emails/sendBookingConfirmationEmail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              bookerName: this.state.bookerName,
              bookerEmail: this.state.bookerEmail,
              bookingStartDateTime: this.props.bookingStartTime,
              bookingEndDateTime: this.props.bookingEndTime
            })
          }
        )
      );
    this.props.onClose();
  };

  render() {
    let totalHours = 0;
    if (this.props.bookingEndTime && this.props.bookingStartTime) {
      totalHours =
        (this.props.bookingEndTime.getTime() -
          this.props.bookingStartTime.getTime()) /
        1000 /
        60 /
        60;
    }
    const totalPrice = this.props.pitch
      ? `$${(this.props.pitch.pricePerHour * totalHours).toFixed(2)}`
      : "";
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/bookingsuccess",
            state: {
              bookingStartDate: this.state.newBooking.bookingStartDateTime,
              bookingEndDate: this.state.newBooking.bookingEndDateTime,
              pitchAddress: this.state.associatedPitch.address,
              pitchName: this.state.associatedPitch.name,
              totalPrice: totalPrice
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
            {`You have selected a booking of ${this.props.pitch.name} from 
            ${this.props.bookingStartTime.toString()} to 
            ${this.props.bookingEndTime.toString()}. \n Total price: ${totalPrice}`}
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
