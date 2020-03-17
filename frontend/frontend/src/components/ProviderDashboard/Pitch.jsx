import React from "react";
import { Button } from "react-bootstrap";

// TODO(samkohlq): figure out how to pass in pitches from PitchesList
class Pitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pitches: []
    };
  }

  render() {
    return (
      <tr>
        <td>Pitch 1</td>
        <td>$200</td>
        <td>8</td>
        <td>2 Tessensohn Rd, Singapore 217646</td>
        <td>
          <Button className="float-right" size="sm">
            Edit settings
          </Button>
        </td>
      </tr>
    );
  }
}

export default Pitch;
