import { mount } from "enzyme";
import React from "react";
import PitchSettingsForm from "../components/ProviderDashboard/PitchSettingsForm";

it("Pitch settings form can render without crashing", () => {
  const onCloseMock = jest.fn();
  const pitch = {
    name: "test",
    pricePerHour: "123",
    maxNumPlayersPerSide: "7",
    address: "123"
  };
  const show = true;
  const wrapper = mount(
    <PitchSettingsForm show={show} onClose={onCloseMock} pitch={pitch} />
  );
  expect(
    wrapper
      .find("#pitchNameLabel")
      .first()
      .text()
  ).toEqual("Pitch Name");
  expect(
    wrapper
      .find("#pricePerHourLabel")
      .first()
      .text()
  ).toEqual("Price Per Hour");
  expect(
    wrapper
      .find("#addressLabel")
      .first()
      .text()
  ).toEqual("Address");
  wrapper.unmount();
});
