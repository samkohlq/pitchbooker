import React from "react";
import Card from "react-bootstrap/Card";
export default class BookingSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingStartDate: props.location.state.bookingStartDate,
      bookingEndDate: props.location.state.bookingEndDate,
      pitchAddress: props.location.state.pitchAddress,
      pitchName: props.location.state.pitchName
    };
  }
  //Todo(Perry): Calculate total and display it in confirmation page. Make this card centered.
  render() {
    console.log(this.state.bookingStartDate);
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Your booking has been confirmed!</Card.Title>
            <Card.Text>From: {this.state.bookingStartDate}</Card.Text>
            <Card.Text>To: {this.state.bookingStartDate}</Card.Text>
            <Card.Text>Address: {this.state.bookingStartDate}</Card.Text>
            <Card.Text>Venue: {this.state.bookingStartDate}</Card.Text>
            <Card.Text>Total:</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
