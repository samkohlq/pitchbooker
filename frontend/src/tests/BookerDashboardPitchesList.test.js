import { mount } from "enzyme";
import React from "react";
import PitchLists from "../components/BookerDashboard/PitchesList";

const fakePitches = [
  {
    name: "Test Pitch 1",
    pricePerHour: "1",
    maxNumPlayersPerSide: "1",
    address: "Test Pitch 1 Road",
    id: "1"
  },
  {
    name: "Test Pitch 2",
    pricePerHour: "2",
    maxNumPlayersPerSide: "2",
    address: "Test Pitch 2 Road",
    id: "2"
  }
];

it("renders pitches data", async () => {
  const wrapper = mount(
    <PitchLists
      pitches={fakePitches}
      bookingStartTime={new Date()}
      bookingEndTime={new Date()}
    />
  );
  expect(wrapper.find("BookingForm").html()).toBe(null);
  wrapper
    .find("#bookbutton1")
    .first()
    .simulate("click");
  expect(wrapper.find("BookingForm").html()).not.toBe(null);
  wrapper.unmount();
});
