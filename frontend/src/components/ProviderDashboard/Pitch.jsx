import * as firebase from "firebase";
import React from "react";
import { Button } from "react-bootstrap";

const Pitch = props => {
  const handleDeleteClick = pitchId => e => {
    e.preventDefault();
    fetch(`http://localhost:5001/pitches/deletePitch?pitchId=${pitchId}`).then(
      response => {
        props.that.fetchPitches(firebase.auth().currentUser.uid);
      }
    );
  };
  const { name, pricePerHour, maxNumPlayersPerSide, address, id } = props.pitch;
  return (
    <tr>
      <td>{name}</td>
      <td>{pricePerHour}</td>
      <td>{maxNumPlayersPerSide}</td>
      <td>{address}</td>
      <td>
        <Button
          className="float-right"
          size="sm"
          onClick={handleDeleteClick(id)}
        >
          Delete Pitch
        </Button>
        <Button
          className="float-right"
          size="sm"
          style={{ marginRight: "10px" }}
        >
          Edit settings
        </Button>
      </td>
    </tr>
  );
};

export default Pitch;
