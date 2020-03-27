import request from "supertest";
import app from "../app";
import models from "../db/models";

afterEach(async () => {
  await models.Pitch.destroy({
    where: {}
  });
});

afterAll(() => {
  models.sequelize.close();
});

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
            idToken === "testIdToken"
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

test("create pitch API creates new entry in Pitches table", async () => {
  const createProviderResponse = await request(app)
    .post("/providers/createProvider")
    .send({
      name: "Test Provider Name",
      address: "Test Provider Road",
      email: "testprovider@testprovider.com",
      phoneNum: "12345678",
      currentUserUid: "abcde"
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(createProviderResponse.statusCode).toBe(200);
  const createPitchResponseWrongToken = await request(app)
    .post("/pitches/createPitch?currentUserUid=abcde")
    .send({
      name: "Test Pitch",
      pricePerHour: "123",
      address: "Test Pitch Road",
      maxNumPlayersPerSide: "10"
    })
    .set({ Accept: "application/json", Authorization: "Bearer abc" });
  expect(createPitchResponseWrongToken.statusCode).toBe(401);
  const createPitchResponse = await request(app)
    .post("/pitches/createPitch?currentUserUid=abcde")
    .send({
      name: "Test Pitch",
      pricePerHour: "123",
      address: "Test Pitch Road",
      maxNumPlayersPerSide: "10"
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(createPitchResponse.statusCode).toBe(200);
  expect(createPitchResponse.body.name).toBe("Test Pitch");
  expect(createPitchResponse.body.pricePerHour).toBe(123);
  expect(createPitchResponse.body.address).toBe("Test Pitch Road");
  expect(createPitchResponse.body.maxNumPlayersPerSide).toBe(10);
});

test("retrieve pitches API to return pitch details if query has currentUserUid, else return pitches based on maximum number of players per side and booking availability.", async () => {
  const createProviderResponse = await request(app)
    .post("/providers/createProvider")
    .send({
      name: "Test Provider Name",
      address: "Test Provider Road",
      email: "testprovider@testprovider.com",
      phoneNum: "12345678",
      currentUserUid: "abcde"
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(createProviderResponse.statusCode).toBe(200);
  const createPitchResponse = await request(app)
    .post("/pitches/createPitch?currentUserUid=abcde")
    .send({
      name: "Test Pitch",
      pricePerHour: "123",
      address: "Test Pitch Road",
      maxNumPlayersPerSide: "9"
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(createPitchResponse.statusCode).toBe(200);
  const retrievePitchResponseWrongToken = await request(app)
    .get("/pitches/retrievePitches?currentUserUid=abcde")
    .set({ Authorization: "Bearer abc" });
  expect(retrievePitchResponseWrongToken.statusCode).toBe(401);
  const retrievePitchResponse = await request(app)
    .get("/pitches/retrievePitches?currentUserUid=abcde")
    .set({ Authorization: "Bearer testIdToken" });
  expect(retrievePitchResponse.statusCode).toBe(200);
  expect(retrievePitchResponse.body[0].name).toBe("Test Pitch");
  expect(retrievePitchResponse.body[0].pricePerHour).toBe(123);
  expect(retrievePitchResponse.body[0].address).toBe("Test Pitch Road");
  expect(retrievePitchResponse.body[0].maxNumPlayersPerSide).toBe(9);
  const startDateTime = new Date(Date.now() + 1000 * 60 * 60);
  const endDateTime = new Date(Date.now() + 1000 * 60 * 60);
  let maxNumPlayersPerSide = 8;
  const retrievePitchResponseWithoutUserUidDiffMaxNumPlayersPerSide = await request(
    app
  ).get(
    `/pitches/retrievePitches?startDateTime=${startDateTime}&endDateTime=${endDateTime}&maxNumPlayersPerSide=${maxNumPlayersPerSide}`
  );
  expect(
    retrievePitchResponseWithoutUserUidDiffMaxNumPlayersPerSide.statusCode
  ).toBe(200);
  const empty = [];
  expect(
    retrievePitchResponseWithoutUserUidDiffMaxNumPlayersPerSide.body
  ).toStrictEqual(empty);
  maxNumPlayersPerSide = 9;
  const retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSide = await request(
    app
  ).get(
    `/pitches/retrievePitches?startDateTime=${startDateTime}&endDateTime=${endDateTime}&maxNumPlayersPerSide=${maxNumPlayersPerSide}`
  );
  expect(
    retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSide.statusCode
  ).toBe(200);
  expect(
    retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSide.body[0].name
  ).toBe("Test Pitch");
  expect(
    retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSide.body[0]
      .pricePerHour
  ).toBe(123);
  expect(
    retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSide.body[0].address
  ).toBe("Test Pitch Road");
  expect(
    retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSide.body[0]
      .maxNumPlayersPerSide
  ).toBe(9);
  const pastDate = new Date(
    Date.now() + 1000 * 60 * 60 * (new Date().getTimezoneOffset() / 60 - 1)
  );
  const retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSidePastDate = await request(
    app
  ).get(
    `/pitches/retrievePitches?startDateTime=${pastDate}&endDateTime=${pastDate}&maxNumPlayersPerSide=${maxNumPlayersPerSide}`
  );
  expect(
    retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSidePastDate.statusCode
  ).toBe(200);
  expect(
    retrievePitchResponseWithoutUserUidSameMaxNumPlayersPerSidePastDate.body
  ).toStrictEqual(empty);
});

test("update pitches API to update pitch details based on information in the request body.", async () => {
  const createProviderResponse = await request(app)
    .post("/providers/createProvider")
    .send({
      name: "Test Provider Name",
      address: "Test Provider Road",
      email: "testprovider@testprovider.com",
      phoneNum: "12345678",
      currentUserUid: "abcde"
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(createProviderResponse.statusCode).toBe(200);
  const createPitchResponse = await request(app)
    .post("/pitches/createPitch?currentUserUid=abcde")
    .send({
      name: "Test Pitch",
      pricePerHour: "123",
      address: "Test Pitch Road",
      maxNumPlayersPerSide: "9"
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(createPitchResponse.statusCode).toBe(200);
  const retrievePitchResponseWrongToken = await request(app)
    .get("/pitches/retrievePitches?currentUserUid=abcde")
    .set({ Authorization: "Bearer abc" });
  expect(retrievePitchResponseWrongToken.statusCode).toBe(401);
  const retrievePitchResponse = await request(app)
    .get("/pitches/retrievePitches?currentUserUid=abcde")
    .set({ Authorization: "Bearer testIdToken" });
  expect(retrievePitchResponse.statusCode).toBe(200);
  expect(retrievePitchResponse.body[0].name).toBe("Test Pitch");
  expect(retrievePitchResponse.body[0].pricePerHour).toBe(123);
  expect(retrievePitchResponse.body[0].address).toBe("Test Pitch Road");
  expect(retrievePitchResponse.body[0].maxNumPlayersPerSide).toBe(9);
  const pitchId = retrievePitchResponse.body[0].id;
  const updatePitchResponseWrongToken = await request(app)
    .put("/pitches/updatePitch")
    .send({
      name: "Test Pitch 2",
      pricePerHour: "1234",
      address: "Test Pitch Road 2",
      maxNumPlayersPerSide: "10",
      pitchId: pitchId
    })
    .set({ Accept: "application/json", Authorization: "Bearer abc" });
  expect(updatePitchResponseWrongToken.statusCode).toBe(401);
  const updatePitchResponse = await request(app)
    .put("/pitches/updatePitch")
    .send({
      name: "Test Pitch 2",
      pricePerHour: "1234",
      address: "Test Pitch Road 2",
      maxNumPlayersPerSide: "10",
      pitchId: pitchId
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(updatePitchResponse.statusCode).toBe(200);
  const retrievePitchResponseAfterUpdate = await request(app)
    .get("/pitches/retrievePitches?currentUserUid=abcde")
    .set({ Authorization: "Bearer testIdToken" });
  expect(retrievePitchResponseAfterUpdate.statusCode).toBe(200);
  expect(retrievePitchResponseAfterUpdate.body[0].name).toBe("Test Pitch 2");
  expect(retrievePitchResponseAfterUpdate.body[0].pricePerHour).toBe(1234);
  expect(retrievePitchResponseAfterUpdate.body[0].address).toBe(
    "Test Pitch Road 2"
  );
  expect(retrievePitchResponseAfterUpdate.body[0].maxNumPlayersPerSide).toBe(
    10
  );
});

test("delete pitches API to delete pitch on information in the request body.", async () => {
  const createProviderResponse = await request(app)
    .post("/providers/createProvider")
    .send({
      name: "Test Provider Name",
      address: "Test Provider Road",
      email: "testprovider@testprovider.com",
      phoneNum: "12345678",
      currentUserUid: "abcde"
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(createProviderResponse.statusCode).toBe(200);
  const createPitchResponse = await request(app)
    .post("/pitches/createPitch?currentUserUid=abcde")
    .send({
      name: "Test Pitch",
      pricePerHour: "123",
      address: "Test Pitch Road",
      maxNumPlayersPerSide: "9"
    })
    .set({ Accept: "application/json", Authorization: "Bearer testIdToken" });
  expect(createPitchResponse.statusCode).toBe(200);
  const retrievePitchResponse = await request(app)
    .get("/pitches/retrievePitches?currentUserUid=abcde")
    .set({ Authorization: "Bearer testIdToken" });
  expect(retrievePitchResponse.statusCode).toBe(200);
  expect(retrievePitchResponse.body[0].name).toBe("Test Pitch");
  expect(retrievePitchResponse.body[0].pricePerHour).toBe(123);
  expect(retrievePitchResponse.body[0].address).toBe("Test Pitch Road");
  expect(retrievePitchResponse.body[0].maxNumPlayersPerSide).toBe(9);
  const pitchId = retrievePitchResponse.body[0].id;
  const deletePitchResponseWrongToken = await request(app)
    .delete(`/pitches/deletePitch?pitchId=${pitchId}`)
    .set({ Authorization: "Bearer abc" });
  expect(deletePitchResponseWrongToken.statusCode).toBe(401);
  const deletePitchResponse = await request(app)
    .delete(`/pitches/deletePitch?pitchId=${pitchId}`)
    .set({ Authorization: "Bearer testIdToken" });
  expect(deletePitchResponse.statusCode).toBe(200);
  expect(deletePitchResponse.text).toBe("Delete success!");
});
