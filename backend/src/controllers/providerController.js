import { Provider } from "../db/models";
import admin from "../firebase";

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

export const retrieveProvider = async (req, res) => {
  let idToken = req.headers["authorization"];

  if (idToken) {
    if (idToken.startsWith("Bearer ")) {
      idToken = idToken.slice(7, idToken.length);
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async function(decodedToken) {
        const provider = await Provider.findOne({
          where: {
            uid: req.query.currentUserUid
          }
        }).catch(error => {
          res.send(error);
        });
        if (provider) {
          res.send(provider);
        } else {
          res.send({ id: null });
        }
      })
      .catch(function(error) {
        res.send(error);
      });
  } else {
    res.send(401);
  }
};
