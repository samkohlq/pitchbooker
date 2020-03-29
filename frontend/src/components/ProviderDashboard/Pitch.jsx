import React from "react";
import { Button } from "react-bootstrap";
import firebase from "../../firebase";

const Pitch = props => {
  const handleDeleteClick = pitchId => async e => {
    e.preventDefault();
    const idToken = await firebase
      .auth()
      .currentUser.getIdToken()
      .then(function(idToken) {
        return idToken;
      });
    fetch(
      `${process.env.REACT_APP_PITCH_BOOKER_API_SERVER_BASE_URL}/pitches/deletePitch?pitchId=${pitchId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        }
      }
    ).then(response => {
      props.that.fetchPitches(firebase.auth().currentUser.uid);
    });
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
          onClick={props.that.handleEditClick(props.pitch)}
        >
          Edit settings
        </Button>
      </td>
    </tr>
  );
};

export default Pitch;
