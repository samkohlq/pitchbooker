import React from "react";
import AddPitch from "./AddPitch";
import PitchesList from "./PitchesList";

class ProviderDashboard extends React.Component {
  render() {
    return (
      <div>
        <AddPitch />
        <PitchesList />
      </div>
    );
  }
}

export default ProviderDashboard;
