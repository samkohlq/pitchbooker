import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ProviderDashboard from "./components/ProviderDashboard/ProviderDashboard";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <div>
      <TopNavbar />
      <ProviderDashboard />
    </div>
  );
}

export default App;
