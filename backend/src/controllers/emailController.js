const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendBookingConfirmationEmail = (req, res) => {
  const msg = {
    to: req.body.bookerEmail,
    from: "samkohlq@gmail.com",
    subject: "We have confirmed your booking",
    text: `Hello ${req.body.bookerName}! We have confirmed your booking from ${req.body.bookingStartDateTime} to ${req.body.bookingEndDateTime}`
  };
  sgMail.send(msg).then(() => {}, console.error);
  res.send(msg);
};
