import { Booking, Pitch, Provider } from "../db/models";
const Sequelize = require("sequelize");

export const createPitch = async (req, res) => {
  const [newPitch, associatedProvider] = await Promise.all([
    Pitch.create({
      name: req.body.name,
      pricePerHour: req.body.pricePerHour,
      address: req.body.address,
      maxNumPlayersPerSide: req.body.maxNumPlayersPerSide,
      ProviderId: req.body.providerId
    }),
    Provider.findOne({
      where: {
        id: req.body.providerId
      }
    })
  ]);
  await newPitch.setProvider(associatedProvider);
  res.send(newPitch);
};

export const retrievePitches = async (req, res) => {
  if (req.query.currentUserUid) {
    const provider = await Provider.findOne({
      where: {
        uid: req.query.currentUserUid
      }
    });
    const pitches = await provider.getPitches();
    res.send(pitches);
  } else {
    const startDateTime = new Date(req.query.startDateTime);
    const endDateTime = new Date(req.query.endDateTime);
    const pitchIdsBookedAtTimeslot = await Booking.findAll({
      attributes: ["PitchId"],
      where: {
        [Sequelize.Op.or]: [
          {
            bookingStartDateTime: {
              [Sequelize.Op.lte]: startDateTime
            },
            bookingEndDateTime: {
              [Sequelize.Op.gte]: endDateTime
            }
          },
          {
            bookingStartDateTime: {
              [Sequelize.Op.between]: [startDateTime, endDateTime]
            }
          },
          {
            bookingEndDateTime: {
              [Sequelize.Op.between]: [startDateTime, endDateTime]
            }
          }
        ]
      }
    }).map(pitchId => pitchId.get("PitchId"));
    const pitches = await Pitch.findAll({
      where: {
        id: { [Sequelize.Op.not]: pitchIdsBookedAtTimeslot },
        maxNumPlayersPerSide: req.query.maxNumPlayersPerSide
      }
    });
    res.send(pitches);
  }
};
