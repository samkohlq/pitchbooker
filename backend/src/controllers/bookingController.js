import { Booking, Pitch } from "../db/models";

export const createBooking = async (req, res) => {
  const bookingStartDateTime = new Date(req.body.bookingStartDateTime);
  const bookingEndDateTime = new Date(req.body.bookingEndDateTime);
  const [newBooking, associatedPitch] = await Promise.all([
    Booking.create({
      bookerName: req.body.bookerName,
      bookerEmail: req.body.bookerEmail,
      bookerPhoneNum: req.body.bookerPhoneNum,
      bookingStartDateTime,
      bookingEndDateTime
    }),
    Pitch.findOne({
      where: {
        id: req.body.pitchId
      }
    })
  ]);
  const pitchBooking = { newBooking, associatedPitch };
  await newBooking.setPitch(associatedPitch);
  res.send(pitchBooking);
};

export const retrieveBookings = async (req, res) => {
  const pitch = await Pitch.findByPk(req.query.pitchId);
  const bookings = await pitch.getBookings();
  res.send(bookings);
};
