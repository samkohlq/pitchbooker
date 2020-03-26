import * as firebase from "firebase";
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import TopNavbar from "../TopNavbar";
import AddPitch from "./AddPitch";
import PitchesList from "./PitchesList";
import ProviderInfoForm from "./ProviderInfoForm";

class ProviderDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { providerSubmittedOrgnisationInfo: false, loading: true };
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const currentUserUid = user.uid;
        const idToken = await firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(function(idToken) {
            return idToken;
          });
        fetch(
          `${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/providers/retrieveProvider?currentUserUid=${currentUserUid}`,
          {
            headers: { Authorization: `Bearer ${idToken}` }
          }
        )
          .then(response => response.json())
          .then(provider => {
            if (provider.id) {
              this.setState({ providerSubmittedOrgnisationInfo: true });
            } else {
              this.setState({ providerSubmittedOrgnisationInfo: false });
            }
            this.setState({ loading: false });
          });
      }
    });
  }

  render() {
    let providerDashboard;
    if (this.state.loading) {
      providerDashboard = (
        <Container>
          <Spinner
            className="my-5"
            animation="border"
            role="status"
            variant="secondary"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      );
    } else if (this.state.providerSubmittedOrgnisationInfo) {
      providerDashboard = (
        <div>
          <AddPitch />
          <PitchesList />
        </div>
      );
    } else {
      providerDashboard = (
        <div>
          <ProviderInfoForm />
        </div>
      );
    }
    return (
      <div>
        <TopNavbar />
        {providerDashboard}
      </div>
    );
  }
}

export default ProviderDashboard;
