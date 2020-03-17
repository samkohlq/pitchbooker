import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ProviderDashboard from "./components/ProviderDashboard";

function App() {
  return (
    <div>
      <TopNavbar />
      <ProviderDashboard />
    </div>
  );
}

export default App;
