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
    //TODO(samkohlq): figure out how to pass logged-in user's providerId in GET request
    // fetch(`http://localhost:5001/pitches/retrievePitches`);
    // set state with response from backend
  }

  render() {
    return (
      <Row className="my-5">
        <Col xs sm="12" md lg="10" className="ml-5">
          <Table responsive="sm">
            <thead>
              <th>Pitch name</th>
              <th>Price per hour</th>
              <th>Max players per side</th>
              <th>Address</th>
              <th></th>
            </thead>
            <tbody>
              {/* TODO(samkohlq): map pitches from state and pass values into Pitch component each time */}
              <Pitch />
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default PitchesList;
