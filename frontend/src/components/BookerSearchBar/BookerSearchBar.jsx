import React from "react";
import { Button, Col, Container, Form, Jumbotron } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PitchesList from "../BookerSearchComponents/PitchesList";
import "./BookerSearchBar.css";

class BookerSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDateTime: new Date(),
      endDateTime: new Date(),
      maxNumPlayersPerSide: null,
      pitches: []
    };
  }

  handleChange = event => {
    if (event.target) {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    }
  };

  handleDateTimeChange = (fieldName, userInput) => {
    if (userInput) {
      this.setState({
        ...this.state,
        [fieldName]: userInput
      });
    }
  };

  handleClick = () => {
    const startDateTime = new Date(
      this.state.startDateTime.getUTCFullYear(),
      this.state.startDateTime.getUTCMonth(),
      this.state.startDateTime.getUTCDate(),
      this.state.startDateTime.getUTCHours(),
      this.state.startDateTime.getUTCMinutes(),
      this.state.startDateTime.getUTCSeconds()
    );
    const endDateTime = new Date(
      this.state.endDateTime.getUTCFullYear(),
      this.state.endDateTime.getUTCMonth(),
      this.state.endDateTime.getUTCDate(),
      this.state.endDateTime.getUTCHours(),
      this.state.endDateTime.getUTCMinutes(),
      this.state.endDateTime.getUTCSeconds()
    );
    const maxNumPlayersPerSide = this.state.maxNumPlayersPerSide;
    fetch(
      `http://localhost:5001/pitches/retrievePitches?startDateTime=
      ${startDateTime}&endDateTime=${endDateTime}&maxNumPlayersPerSide=${maxNumPlayersPerSide}`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          pitches: json
        });
      });
  };

  render() {
    return (
      <Container>
        <Jumbotron className="my-5">
          <h1 className="mb-4">Search for a soccer pitch</h1>
          <Form>
            <Form.Row className="float-left">
              <Form.Group as={Col}>
                <Form.Text className="text-muted ml-1 mb-1">From</Form.Text>
                <DatePicker
                  className="react-datepicker-container"
                  selected={this.state.startDateTime}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="dd/MM/yy hh:mm aa"
                  onChange={date => {
                    this.handleDateTimeChange("startDateTime", date);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Text className="text-muted ml-1 mb-1">To</Form.Text>
                <DatePicker
                  className="react-datepicker-container"
                  selected={this.state.endDateTime}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="dd/MM/yy hh:mm aa"
                  onChange={date => {
                    this.handleDateTimeChange("endDateTime", date);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Text className="text-muted ml-1 mb-1">
                  Pitch size
                </Form.Text>
                <Form.Control
                  as="select"
                  name="maxNumPlayersPerSide"
                  onChange={this.handleChange}
                >
                  <option selected disabled>
                    --
                  </option>
                  <option value="5">5-a-side</option>
                  <option value="6">6-a-side</option>
                  <option value="7">7-a-side</option>
                  <option value="8">8-a-side</option>
                  <option value="9">9-a-side</option>
                  <option value="10">10-a-side</option>
                  <option value="11">11-a-side</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <Form.Text className="text-muted ml-1 mb-1">&nbsp;</Form.Text>
                <Button className="ml-2" onClick={this.handleClick}>
                  Search
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Jumbotron>
        <PitchesList
          pitches={this.state.pitches}
          bookingStartTime={this.state.startDateTime}
          bookingEndTime={this.state.endDateTime}
        />
      </Container>
    );
  }
}

export default BookerSearchBar;
