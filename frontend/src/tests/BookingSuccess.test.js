import { mount } from "enzyme";
import React from "react";
import BookingSuccess from "../components/BookerDashboard/BookingSuccess";

it("Booking Success component can render without crashing", () => {
  const wrapper = mount(
    <BookingSuccess
      location={{
        state: {
          bookerName: "Booker name",
          bookingStartDate: new Date(),
          bookingEndDate: new Date(),
          totalPrice: 500,
          pitchName: "Pitch name",
          pitchAddress: "Address"
        }
      }}
    />
  );
  expect(
    // Test that it renders the card title
    wrapper
      .find("#card-title")
      .first()
      .text()
  ).toEqual("Your booking has been confirmed!");
  expect(
    // Test that it renders the start date correctly
    wrapper
      .find("#booking-start-date")
      .first()
      .text()
  ).toEqual(`From: ${wrapper.state().bookingStartDate.toLocaleString()}`);
  expect(
    // Test that it renders the end date correctly
    wrapper
      .find("#booking-end-date")
      .first()
      .text()
  ).toEqual(`To: ${wrapper.state().bookingEndDate.toLocaleString()}`);
  expect(
    // Test that it renders the address correctly
    wrapper
      .find("#pitch-address")
      .first()
      .text()
  ).toEqual(`Address: ${wrapper.state().pitchAddress}`);
  expect(
    // Test that it renders the pitch venue correctly
    wrapper
      .find("#pitch-name")
      .first()
      .text()
  ).toEqual(`Venue: ${wrapper.state().pitchName}`);
  expect(
    // Test that it renders the total correctly
    wrapper
      .find("#total-price")
      .first()
      .text()
  ).toEqual(`Total: ${wrapper.state().totalPrice}`);

  wrapper.unmount();
});
