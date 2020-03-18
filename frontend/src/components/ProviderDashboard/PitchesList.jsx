import * as firebase from "firebase";
import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import Pitch from "./Pitch";

class PitchesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pitches: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const currentUserUid = user.uid;
      fetch(
        `http://localhost:5001/pitches/retrievePitches?currentUserUid=${currentUserUid}`
      )
        .then(response => response.json())
        .then(json => {
          this.setState({
            pitches: json
          });
        });
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
                <Pitch key={i} pitch={pitch} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default PitchesList;
