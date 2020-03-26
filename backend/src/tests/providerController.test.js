import request from "supertest";
import app from "../app";
import models from "../db/models";

jest.mock("firebase-admin", () => ({
  credential: {
    cert(serviceaccount) {
      return true;
    }
  },
  initializeApp(credential) {
    return jest.fn();
  },
  auth() {
    return {
      verifyIdToken(idToken) {
        return new Promise((resolve, reject) => {
          process.nextTick(() =>
            idToken
              ? resolve(idToken)
              : reject({
                  error: "idToken not found."
                })
          );
        });
      }
    };
  }
}));

jest.mock(
  "../serviceAccountKey.json",
  () => ({
    type: "",
    project_id: "",
    private_key_id: "",
    private_key: "",
    client_email: "",
    client_id: "",
    auth_uri: "",
    token_uri: "",
    auth_provider_x509_cert_url: "",
    client_x509_cert_url: ""
  }),
  { virtual: true }
);

afterEach(async () => {
  await models.Provider.destroy({
    where: {}
  });
});

afterAll(() => {
  models.sequelize.close();
});

test("create provider API to create new entry in provider table in the database", async () => {
  const createProviderResponse = await request(app)
    .post("/providers/createProvider")
    .send({
      name: "Test Provider Name",
      address: "Test Provider Road",
      email: "testprovider@testprovider.com",
      phoneNum: "12345678",
      currentUserUid: "abcde"
    })
    .set("Accept", "application/json");
  expect(createProviderResponse.statusCode).toBe(200);
  expect(createProviderResponse.body[0].name).toBe("Test Provider Name");
  expect(createProviderResponse.body[0].address).toBe("Test Provider Road");
  expect(createProviderResponse.body[0].email).toBe(
    "testprovider@testprovider.com"
  );
  expect(createProviderResponse.body[0].phoneNum).toBe("12345678");
  expect(createProviderResponse.body[0].uid).toBe("abcde");
});

test("retrieve provider API retrieve provider details if provider details exist in database, else return a null id", async () => {
  const createProviderResponse = await request(app)
    .post("/providers/createProvider")
    .send({
      name: "Test Provider Name",
      address: "Test Provider Road",
      email: "testprovider@testprovider.com",
      phoneNum: "12345678",
      currentUserUid: "abcde"
    })
    .set("Accept", "application/json");
  expect(createProviderResponse.statusCode).toBe(200);
  const retrieveProviderabcResponse = await request(app)
    .get("/providers/retrieveProvider?currentUserUid=abc")
    .set("Authorization", "Bearer 123");
  expect(retrieveProviderabcResponse.statusCode).toBe(200);
  expect(retrieveProviderabcResponse.body.id).toBe(null);
  const retrieveProviderabcdeResponse = await request(app)
    .get("/providers/retrieveProvider?currentUserUid=abcde")
    .set("Authorization", "Bearer 123");
  expect(retrieveProviderabcdeResponse.statusCode).toBe(200);
  expect(retrieveProviderabcdeResponse.body.name).toBe("Test Provider Name");
  expect(retrieveProviderabcdeResponse.body.address).toBe("Test Provider Road");
  expect(retrieveProviderabcdeResponse.body.email).toBe(
    "testprovider@testprovider.com"
  );
  expect(retrieveProviderabcdeResponse.body.phoneNum).toBe("12345678");
  expect(retrieveProviderabcdeResponse.body.uid).toBe("abcde");
  const retrieveProviderabcdeResponseNotAuthorized = await request(app).get(
    "/providers/retrieveProvider?currentUserUid=abcde"
  );
  expect(retrieveProviderabcdeResponseNotAuthorized.statusCode).toBe(401);
});
