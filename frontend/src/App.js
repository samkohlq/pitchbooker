import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Login from "./components/Login";
import ProviderDashboard from "./components/ProviderDashboard/ProviderDashboard";
import ProviderInfoForm from "./components/ProviderInfoForm";
import TopNavbar from "./components/TopNavbar";
import firebase from "./firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    const homepage = this.state.loggedIn ? (
      <div>
        <ProviderDashboard />
        <ProviderInfoForm />
      </div>
    ) : (
      <div>
        <Login />
        <BookerSearchBar />
      </div>
    );
    return (
      <Router>
        <TopNavbar />
        <Switch>
          <Route exact path="/">
            {homepage}
          </Route>
          <Route path="/success">
            <BookingSuccess />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
