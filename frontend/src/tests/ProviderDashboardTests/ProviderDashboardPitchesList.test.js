import { mount } from "enzyme";
import React from "react";
import PitchesList from "../../components/ProviderDashboard/PitchesList";

jest.mock("../../firebase", () => ({
  auth() {
    return {
      onAuthStateChanged() {
        const user = { user: { uid: "1" } };
        return new Promise((resolve, reject) => {
          process.nextTick(() => resolve(user));
        });
      },
      currentUser: {
        getIdToken(status) {
          return new Promise((resolve, reject) => {
            process.nextTick(() => resolve(status));
          });
        }
      }
    };
  }
}));

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
jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakePitches)
  })
);

it("renders pitches data", async () => {
  const wrapper = mount(<PitchesList />);
  await wrapper.instance().fetchPitches(1);
  expect(wrapper.state("pitches")).toBe(fakePitches);
  wrapper.unmount();
  global.fetch.mockRestore();
});
