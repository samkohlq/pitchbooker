import request from "supertest";
import app from "../app";
import models from "../db/models";

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
  const retrieveProviderabcResponse = await request(app).get(
    "/providers/retrieveProvider?currentUserUid=abc"
  );
  expect(retrieveProviderabcResponse.statusCode).toBe(200);
  expect(retrieveProviderabcResponse.body.id).toBe(null);
  const retrieveProviderabcdeResponse = await request(app).get(
    "/providers/retrieveProvider?currentUserUid=abcde"
  );
  expect(retrieveProviderabcdeResponse.statusCode).toBe(200);
  expect(retrieveProviderabcdeResponse.body.name).toBe("Test Provider Name");
  expect(retrieveProviderabcdeResponse.body.address).toBe("Test Provider Road");
  expect(retrieveProviderabcdeResponse.body.email).toBe(
    "testprovider@testprovider.com"
  );
  expect(retrieveProviderabcdeResponse.body.phoneNum).toBe("12345678");
  expect(retrieveProviderabcdeResponse.body.uid).toBe("abcde");
});