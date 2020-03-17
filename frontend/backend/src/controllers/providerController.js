import { Provider } from "../db/models";

export const createProvider = async (req, res) => {
  const newProvider = await Promise.all([
    Provider.create({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phoneNum: req.body.phoneNum
    })
  ]);
  res.send(newProvider);
};

export const retrieveProviders = async (req, res) => {
  const provider = await Provider.findAll({
    where: {
      id: req.query.providerId
    }
  });
  res.send(provider);
};
