import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import FieldForm from "./components/FieldForm";
import Login from "./components/Login";
import ProviderDashboard from "./components/ProviderDashboard/ProviderDashboard";
import TopNavbar from "./components/TopNavbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <TopNavbar />
        <ProviderDashboard />
        <Login />
        <FieldForm />
      </div>
    );
  }
}
export default App;
