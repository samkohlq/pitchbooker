import { mount } from "enzyme";
import React from "react";
import BookingForm from "../components/BookerDashboard/BookingForm";

it("Booking form can render without crashing", () => {
  let onCloseMock = jest.fn();
  const pitch = {
    name: "test",
    pricePerHour: "123",
    maxNumPlayersPerSide: "7",
    address: "123"
  };
  const show = true;
  const bookingStartTime = new Date();
  const bookingEndTime = new Date();
  const wrapper = mount(
    <BookingForm
      show={show}
      onClose={onCloseMock}
      pitch={pitch}
      bookingStartTime={bookingStartTime}
      bookingEndTime={bookingEndTime}
    />
  );
  expect(
    wrapper
      .find("#nameLabel")
      .first()
      .text()
  ).toEqual("Name");
  expect(
    wrapper
      .find("#emailLabel")
      .first()
      .text()
  ).toEqual("Email");
  expect(
    wrapper
      .find("#phoneNumLabel")
      .first()
      .text()
  ).toEqual("Phone Number");
  wrapper.unmount();
});
