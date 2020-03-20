import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import BookingForm from "./BookingForm";

class PitchesList extends React.Component {
  state = {
    bookingFormVisible: false,
    pitchToBeBooked: []
  };

  handleClick = pitch => e => {
    this.setState({
      bookingFormVisible: !this.state.bookingFormVisible,
      pitchToBeBooked: pitch
    });
  };

  handleBookingFormClick = e => {
    this.setState({
      bookingFormVisible: !this.state.bookingFormVisible
    });
  };

  render() {
    return (
      <div>
        {" "}
        {this.props.pitches.length > 0 && (
          <Row className="my-5">
            <Col xs sm="12" md lg="10" className="ml-5">
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Pitch name</th>
                    <th>Address</th>
                    <th>Price per hour</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.pitches.map((pitch, i) => (
                    <tr key={i}>
                      <td>{pitch.name}</td>
                      <td>{pitch.address}</td>
                      <td>{pitch.pricePerHour}</td>
                      <td>
                        <Button
                          className="float-right"
                          size="sm"
                          onClick={this.handleClick(pitch)}
                        >
                          Book
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <BookingForm
                show={this.state.bookingFormVisible}
                onClose={this.handleBookingFormClick}
                pitch={this.state.pitchToBeBooked}
                bookingStartTime={this.props.bookingStartTime}
                bookingEndTime={this.props.bookingEndTime}
              ></BookingForm>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default PitchesList;
