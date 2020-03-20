import React from "react";
// TODO: Render venue, address, start date, end date, and total of booking
export default class BookingSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // bookingStartDate: props.location.state.bookingStartDate,
      // bookingEndDate: props.location.state.bookingEndDate
    };
  }
  // TODO: Read from BookingFrom state and render here
  render() {
    return (
      <div>
        <h1>Successfully Booked!</h1>
      </div>
    );
  }
}
