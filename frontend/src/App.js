import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookerSearchBar from "./components/BookerDashboard/BookerSearchBar";
import BookingSuccess from "./components/BookerDashboard/BookingSuccess";
import Login from "./components/Login";
import ProviderDashboard from "./components/ProviderDashboard/ProviderDashboard";
import TopNavbar from "./components/TopNavbar";
import firebase from "./firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { providerLoggedIn: false };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ providerLoggedIn: true });
      } else {
        this.setState({ providerLoggedIn: false });
      }
    });
  }

  render() {
    const homepage = this.state.providerLoggedIn ? (
      <div>
        <ProviderDashboard />
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
          <Route path="/success" component={BookingSuccess}></Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
