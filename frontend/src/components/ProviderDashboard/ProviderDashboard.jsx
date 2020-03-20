import * as firebase from "firebase";
import React from "react";
import AddPitch from "./AddPitch";
import PitchesList from "./PitchesList";
import ProviderInfoForm from "./ProviderInfoForm";

class ProviderDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { providerSubmittedOrgnisationInfo: false };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const currentUserUid = user.uid;
      fetch(
        `http://localhost:5001/providers/retrieveProvider?currentUserUid=${currentUserUid}`
      )
        .then(response => response.json())
        .then(provider => {
          if (provider.id) {
            this.setState({ providerSubmittedOrgnisationInfo: true });
          } else {
            this.setState({ providerSubmittedOrgnisationInfo: false });
          }
        });
    });
  }

  render() {
    const providerDashboard = this.state.providerSubmittedOrgnisationInfo ? (
      <div>
        <AddPitch />
        <PitchesList />
      </div>
    ) : (
      <div>
        <ProviderInfoForm />
      </div>
    );
    return <div>{providerDashboard}</div>;
  }
}

export default ProviderDashboard;
