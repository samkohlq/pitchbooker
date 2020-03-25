import * as firebase from "firebase";
import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import Pitch from "./Pitch";
import PitchSettingsForm from "./PitchSettingsForm";

class PitchesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pitches: [],
      pitchSettingsFormVisible: false,
      pitchToBeEdited: null
    };
  }

  handleEditClick = pitch => e => {
    this.setState({
      pitchSettingsFormVisible: !this.state.pitchSettingsFormVisible,
      pitchToBeEdited: pitch
    });
  };

  fetchPitches(currentUserUid) {
    return fetch(
      `${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/pitches/retrievePitches?currentUserUid=${currentUserUid}`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          pitches: json
        });
      });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const currentUserUid = user.uid;
      this.fetchPitches(currentUserUid);
    });
  }

  render() {
    return (
      <Row className="my-5">
        <Col xs sm="12" md lg="10" className="ml-5">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Pitch name</th>
                <th>Price per hour</th>
                <th>Max players per side</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.pitches.map((pitch, i) => (
                <Pitch id="pitch" key={i} pitch={pitch} that={this} />
              ))}
            </tbody>
          </Table>
          <PitchSettingsForm
            show={this.state.pitchSettingsFormVisible}
            onClose={this.handleEditClick}
            pitch={this.state.pitchToBeEdited}
          ></PitchSettingsForm>
        </Col>
      </Row>
    );
  }
}

export default PitchesList;
