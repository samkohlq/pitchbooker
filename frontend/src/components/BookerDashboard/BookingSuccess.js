import React from "react";
import Card from "react-bootstrap/Card";
import TopNavbar from "../TopNavbar";

export default class BookingSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingStartDate: new Date(props.location.state.bookingStartDate),
      bookingEndDate: new Date(props.location.state.bookingEndDate),
      pitchAddress: props.location.state.pitchAddress,
      pitchName: props.location.state.pitchName,
      totalPrice: props.location.state.totalPrice
    };
  }

  //Todo(Perry): Calculate total and display it in confirmation page. Make this card centered.
  render() {
    return (
      <div>
        <TopNavbar />
        <Card className="m-5" id="card-container" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title id="card-title">
              Your booking has been confirmed!
            </Card.Title>
            <Card.Text id="booking-start-date">
              From: {this.state.bookingStartDate.toLocaleString()}
            </Card.Text>
            <Card.Text id="booking-end-date">
              To: {this.state.bookingEndDate.toLocaleString()}
            </Card.Text>
            <Card.Text id="pitch-address">
              Address: {this.state.pitchAddress}
            </Card.Text>
            <Card.Text id="pitch-name">Venue: {this.state.pitchName}</Card.Text>
            <Card.Text id="total-price">
              Total: {this.state.totalPrice}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
