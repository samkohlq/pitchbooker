import { shallow } from "enzyme";
import React from "react";
import AddPitch from "../../components/ProviderDashboard/AddPitch";
import PitchesList from "../../components/ProviderDashboard/PitchesList";
import ProviderDashboard from "../../components/ProviderDashboard/ProviderDashboard";
import ProviderInfoForm from "../../components/ProviderDashboard/ProviderInfoForm";

it("existing provider sees dashboard upon login", () => {
  // replace componentDidMount
  const shallowRenderOptions = { disableLifecycleMethods: true };
  const providerDashboardWrapper = shallow(
    <ProviderDashboard />,
    shallowRenderOptions
  );
  providerDashboardWrapper.setState({
    providerSubmittedOrgnisationInfo: true,
    loading: false
  });
  expect(
    providerDashboardWrapper.containsAllMatchingElements([
      <AddPitch />,
      <PitchesList />
    ])
  ).toEqual(true);
});

it("new provider sees dashboard upon login", () => {
  // replace componentDidMount
  const shallowRenderOptions = { disableLifecycleMethods: true };
  const providerDashboardWrapper = shallow(
    <ProviderDashboard />,
    shallowRenderOptions
  );
  providerDashboardWrapper.setState({
    providerSubmittedOrgnisationInfo: false,
    loading: false
  });
  expect(
    providerDashboardWrapper.containsAllMatchingElements([<ProviderInfoForm />])
  ).toEqual(true);
});
