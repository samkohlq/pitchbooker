import React from "react";
import { Route, Switch } from "react-router-dom";
import BookerDashboard from "../components/BookerDashboard/BookerDashboard";
import BookingSuccess from "../components/BookerDashboard/BookingSuccess";
import ProviderDashboard from "../components/ProviderDashboard/ProviderDashboard";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={BookerDashboard} />
      <Route path="/providerdashboard" component={ProviderDashboard} />
      <Route path="/bookingsuccess" component={BookingSuccess} />
      <Route component={BookerDashboard} />
    </Switch>
  );
}
