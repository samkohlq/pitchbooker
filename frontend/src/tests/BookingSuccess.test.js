import { shallow } from "enzyme";
import React from "react";
import BookingSuccess from "../components/BookerDashboard/BookingSuccess";

it("Booking Success component can render without crashing", () => {
  const state = {
    bookingStartDate: "this.state.newBooking.bookingStartDateTime",
    bookingEndDate: "this.state.newBooking.bookingEndDateTime",
    pitchAddress: "this.state.associatedPitch.address",
    pitchName: "this.state.associatedPitch.name",
    totalPrice: "totalPrice"
  };
  const wrapper = shallow(<BookingSuccess />);
  console.log(wrapper.props.location);
  wrapper.setProps({
    location: state
    // props.location.state is the state object in the redirect component from BookingForm.js
    // i want to define a new dummy state object, and pass it in to props.location
  });
  // wrapper.setState({
  //   bookingStartDate: "000000",
  //   bookingEndDate: "1111111",
  //   pitchAddress: "Singapore",
  //   pitchName: "Name",
  //   totalPrice: "$5"
  // });

  // expect(
  //   wrapper
  //     .find("#card-title")
  //     .first()
  //     .text()
  //     .toEqual("Your booking has been confirmed!")
  // );
  wrapper.unmount();
});
