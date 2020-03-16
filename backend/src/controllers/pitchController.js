import { Pitch, Provider } from "../db/models";

export const createPitch = async (req, res) => {
  const [newPitch, associatedProvider] = await Promise.all([
    Pitch.create({
      pricePerHour: req.body.pricePerHour,
      address: req.body.address,
      maxNumPlayersPerSide: req.body.maxNumPlayersPerSide
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
