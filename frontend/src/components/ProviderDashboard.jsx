import React from "react";
import AddPitch from "./AddPitch";

class ProviderDashboard extends React.Component {
  render() {
    return (
      <div className="border border-danger">
        <AddPitch />
      </div>
    );
  }
}

export default ProviderDashboard;
