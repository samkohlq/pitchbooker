import { Booking, Pitch, Provider } from "../db/models";
import admin from "../firebase";
const Sequelize = require("sequelize");

export const createPitch = async (req, res) => {
  let idToken = req.headers["authorization"];

  if (idToken) {
    if (idToken.startsWith("Bearer ")) {
      idToken = idToken.slice(7, idToken.length);
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async function(decodedToken) {
        const associatedProvider = await Provider.findOne({
          where: {
            uid: req.query.currentUserUid
          }
        });
        const providerId = await associatedProvider.get("id");
        const newPitch = await Pitch.create({
          name: req.body.name,
          pricePerHour: req.body.pricePerHour,
          address: req.body.address,
          maxNumPlayersPerSide: req.body.maxNumPlayersPerSide,
          ProviderId: providerId
        });
        await newPitch.setProvider(associatedProvider);
        res.send(newPitch);
      })
      .catch(function(error) {
        res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
};

export const retrievePitches = async (req, res) => {
  let idToken = req.headers["authorization"];

  if (idToken) {
    if (idToken.startsWith("Bearer ")) {
      idToken = idToken.slice(7, idToken.length);
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async function(decodedToken) {
        if (req.query.currentUserUid) {
          const provider = await Provider.findOne({
            where: {
              uid: req.query.currentUserUid
            }
          });
          const pitches = await provider.getPitches();
          res.send(pitches);
        }
      })
      .catch(function(error) {
        res.sendStatus(401);
      });
  } else {
    const startDateTime = new Date(req.query.startDateTime);
    const endDateTime = new Date(req.query.endDateTime);
    if (startDateTime >= Date.now() && endDateTime >= Date.now()) {
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
        },
        order: [["pricePerHour", "ASC"]]
      });
      res.send(pitches);
    } else {
      res.send([]);
    }
  }
};

export const deletePitch = async (req, res) => {
  let idToken = req.headers["authorization"];

  if (idToken) {
    if (idToken.startsWith("Bearer ")) {
      idToken = idToken.slice(7, idToken.length);
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async function(decodedToken) {
        const deleteSuccess = await Pitch.destroy({
          where: { id: req.query.pitchId }
        });
        if (deleteSuccess) {
          res.send("Delete success!");
        }
      })
      .catch(function(error) {
        res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
};

export const updatePitch = async (req, res) => {
  let idToken = req.headers["authorization"];

  if (idToken) {
    if (idToken.startsWith("Bearer ")) {
      idToken = idToken.slice(7, idToken.length);
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async function(decodedToken) {
        const pitchUpdate = await Pitch.update(
          {
            name: req.body.name,
            pricePerHour: req.body.pricePerHour,
            address: req.body.address,
            maxNumPlayersPerSide: req.body.maxNumPlayersPerSide
          },
          {
            where: { id: req.body.pitchId }
          }
        );
        res.send(pitchUpdate);
      })
      .catch(function(error) {
        res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
};
