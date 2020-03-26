import React from "react";
import Card from "react-bootstrap/Card";
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
        <Card id="card-container" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title id="card-title">
              Your booking has been confirmed!
            </Card.Title>
            <Card.Text>
              From: {this.state.bookingStartDate.toLocaleString()}
            </Card.Text>
            <Card.Text>
              To: {this.state.bookingEndDate.toLocaleString()}
            </Card.Text>
            <Card.Text>Address: {this.state.pitchAddress}</Card.Text>
            <Card.Text>Venue: {this.state.pitchName}</Card.Text>
            <Card.Text>Total:{this.state.totalPrice} </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
