import { Provider } from "../db/models";

export const createProvider = async (req, res) => {
  const newProvider = await Promise.all([
    Provider.create({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phoneNum: req.body.phoneNum,
      uid: req.body.currentUserUid
    })
  ]).catch(error => {
    console.log(error);
  });
  res.send(newProvider);
};

export const retrieveProviders = async (req, res) => {
  const provider = await Provider.findAll({
    where: {
      uid: req.query.currentUserUid
    }
  });
  res.send(provider);
};
