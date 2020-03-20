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

export const providerExists = async (req, res) => {
  const providerExists = await Provider.findOne({
    where: {
      uid: req.query.currentUserUid
    }
  });
  if (providerExists) {
    res.send(true);
  } else {
    res.send(false);
  }
};

export const retrieveProvider = async (req, res) => {
  const provider = await Provider.findOne({
    where: {
      uid: req.query.currentUserUid
    }
  }).catch(error => {
    console.log(error);
  });
  if (provider) {
    res.send(provider);
  } else {
    res.send({ id: null });
  }
};
