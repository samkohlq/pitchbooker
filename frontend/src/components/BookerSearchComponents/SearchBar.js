import React from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PitchesList from "./PitchesList";

class SearchBar extends React.Component {
  state = {
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    maxNumPlayersPerSide: 5,
    pitches: []
  };

  selectDate = date => {
    this.setState({
      date
    });
  };

  selectStartTime = startTime => {
    this.setState({
      startTime
    });
  };

  selectEndTime = endTime => {
    this.setState({
      endTime
    });
  };

  handleClick = e => {
    const startDateTime = new Date(
      this.state.startTime.getUTCFullYear(),
      this.state.startTime.getUTCMonth(),
      this.state.startTime.getUTCDate(),
      this.state.startTime.getUTCHours(),
      this.state.startTime.getUTCMinutes(),
      this.state.startTime.getUTCSeconds()
    );
    const endDateTime = new Date(
      this.state.endTime.getUTCFullYear(),
      this.state.endTime.getUTCMonth(),
      this.state.endTime.getUTCDate(),
      this.state.endTime.getUTCHours(),
      this.state.endTime.getUTCMinutes(),
      this.state.endTime.getUTCSeconds()
    );
    const maxNumPlayersPerSide = this.state.maxNumPlayersPerSide;
    fetch(
      `http://localhost:5001/pitches/retrievePitches?startDateTime=${startDateTime}&endDateTime=${endDateTime}&maxNumPlayersPerSide=${maxNumPlayersPerSide}`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          pitches: json
        });
      });
  };

  handleSelectChange = e => {
    this.setState({
      maxNumPlayersPerSide: e.target.value
    });
  };

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.startTime}
          onChange={this.selectStartTime}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
        <DatePicker
          selected={this.state.endTime}
          onChange={this.selectEndTime}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
        <Form>
          <Form.Group>
            <Form.Control
              as="select"
              onChange={this.handleSelectChange}
              defaultValue={5}
            >
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="11">11</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button onClick={this.handleClick}>Search</Button>
        <PitchesList
          pitches={this.state.pitches}
          bookingStartTime={this.state.startTime}
          bookingEndTime={this.state.endTime}
        />
      </div>
    );
  }
}

export default SearchBar;
