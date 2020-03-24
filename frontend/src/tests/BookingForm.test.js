import React from "react";
import ReactDOM from "react-dom";
import BookingForm from "../components/BookerDashboard/BookingForm";

it("Booking form can render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BookingForm />, div);
});
