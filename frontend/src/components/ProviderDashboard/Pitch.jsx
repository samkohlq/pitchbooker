import React from "react";
import { Button } from "react-bootstrap";

const Pitch = props => {
  const { name, pricePerHour, maxNumPlayersPerSide, address } = props.pitch;
  return (
    <tr>
      <td>{name}</td>
      <td>{pricePerHour}</td>
      <td>{maxNumPlayersPerSide}</td>
      <td>{address}</td>
      <td>
        <Button className="float-right" size="sm">
          Edit settings
        </Button>
      </td>
    </tr>
  );
};

export default Pitch;
