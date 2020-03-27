import { shallow } from "enzyme";
import React from "react";
import BookingForm from "../../components/BookerDashboard/BookingForm";

it("fetches emails/sendBookingConfirmationEmail API when 'Book' button clicked", async () => {
  const pitchBooking = {
    newBooking: "new booking",
    associatedPitch: "associated pitch"
  };
  const spy = jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(pitchBooking)
    })
  );
  let onCloseMock = jest.fn();
  const show = true;
  const pitch = {
    name: "test",
    pricePerHour: "123",
    maxNumPlayersPerSide: "7",
    address: "123"
  };
  const bookingStartTime = new Date();
  const bookingEndTime = new Date();
  // render booking form
  const bookingFormWrapper = shallow(
    <BookingForm
      show={show}
      onClose={onCloseMock}
      pitch={pitch}
      bookingStartTime={bookingStartTime}
      bookingEndTime={bookingEndTime}
    />
  );
  // create instance of booking form wrapper
  const bookingFormWrapperInstance = bookingFormWrapper.instance();
  await bookingFormWrapperInstance.handleClick();

  // expect callback function to be called
  expect(spy).toHaveBeenCalledTimes(2);
  spy.mockRestore();
});

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
  const wrapper = shallow(
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
