const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendBookingConfirmationEmail = async (req, res) => {
  const msg = {
    to: req.body.bookerEmail,
    from: "samkohlq@gmail.com",
    subject: "We have confirmed your pitch booking",
    text: `Hello ${req.body.bookerName}! We have confirmed your booking from ${req.body.bookingStartDateTime} to ${req.body.bookingEndDateTime}`
  };
  await sgMail.send(msg).catch(error => {
    console.log(error);
  });
  res.send(msg);
};
