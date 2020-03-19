import React from "react";
import { Button } from "react-bootstrap";

class Pitch extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.pitch.name}</td>
        <td>{this.props.pitch.address}</td>
        <td>{this.props.pitch.pricePerHour}</td>
        <td>
          <Button className="float-right" size="sm" onClick={this.handleClick}>
            Book
          </Button>
        </td>
      </tr>
    );
  }
}

export default Pitch;
