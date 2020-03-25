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
    .set("Accept", "application/json");
  expect(createProviderResponse.statusCode).toBe(200);
  const createPitchResponse = await request(app)
    .post("/pitches/createPitch?currentUserUid=abcde")
    .send({
      name: "Test Pitch",
      pricePerHour: "123",
      address: "Test Pitch Road",
      maxNumPlayersPerSide: "9"
    })
    .set("Accept", "application/json");
  expect(createPitchResponse.statusCode).toBe(200);
  const retrievePitchResponse = await request(app).get(
    "/pitches/retrievePitches?currentUserUid=abcde"
  );
  expect(retrievePitchResponse.statusCode).toBe(200);
  expect(retrievePitchResponse.body[0].name).toBe("Test Pitch");
  expect(retrievePitchResponse.body[0].pricePerHour).toBe(123);
  expect(retrievePitchResponse.body[0].address).toBe("Test Pitch Road");
  expect(retrievePitchResponse.body[0].maxNumPlayersPerSide).toBe(9);
  const startDateTime = new Date();
  const endDateTime = new Date();
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
    .set("Accept", "application/json");
  expect(createProviderResponse.statusCode).toBe(200);
  const createPitchResponse = await request(app)
    .post("/pitches/createPitch?currentUserUid=abcde")
    .send({
      name: "Test Pitch",
      pricePerHour: "123",
      address: "Test Pitch Road",
      maxNumPlayersPerSide: "9"
    })
    .set("Accept", "application/json");
  expect(createPitchResponse.statusCode).toBe(200);
  const retrievePitchResponse = await request(app).get(
    "/pitches/retrievePitches?currentUserUid=abcde"
  );
  expect(retrievePitchResponse.statusCode).toBe(200);
  expect(retrievePitchResponse.body[0].name).toBe("Test Pitch");
  expect(retrievePitchResponse.body[0].pricePerHour).toBe(123);
  expect(retrievePitchResponse.body[0].address).toBe("Test Pitch Road");
  expect(retrievePitchResponse.body[0].maxNumPlayersPerSide).toBe(9);
  const pitchId = retrievePitchResponse.body[0].id;
  const updatePitchResponse = await request(app)
    .put("/pitches/updatePitch")
    .send({
      name: "Test Pitch 2",
      pricePerHour: "1234",
      address: "Test Pitch Road 2",
      maxNumPlayersPerSide: "10",
      pitchId: pitchId
    })
    .set("Accept", "application/json");
  expect(updatePitchResponse.statusCode).toBe(200);
  const retrievePitchResponseAfterUpdate = await request(app).get(
    "/pitches/retrievePitches?currentUserUid=abcde"
  );
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
    .set("Accept", "application/json");
  expect(createProviderResponse.statusCode).toBe(200);
  const createPitchResponse = await request(app)
    .post("/pitches/createPitch?currentUserUid=abcde")
    .send({
      name: "Test Pitch",
      pricePerHour: "123",
      address: "Test Pitch Road",
      maxNumPlayersPerSide: "9"
    })
    .set("Accept", "application/json");
  expect(createPitchResponse.statusCode).toBe(200);
  const retrievePitchResponse = await request(app).get(
    "/pitches/retrievePitches?currentUserUid=abcde"
  );
  expect(retrievePitchResponse.statusCode).toBe(200);
  expect(retrievePitchResponse.body[0].name).toBe("Test Pitch");
  expect(retrievePitchResponse.body[0].pricePerHour).toBe(123);
  expect(retrievePitchResponse.body[0].address).toBe("Test Pitch Road");
  expect(retrievePitchResponse.body[0].maxNumPlayersPerSide).toBe(9);
  const pitchId = retrievePitchResponse.body[0].id;
  const deletePitchResponse = await request(app).delete(
    `/pitches/deletePitch?pitchId=${pitchId}`
  );
  expect(deletePitchResponse.statusCode).toBe(200);
  expect(deletePitchResponse.text).toBe("Delete success!");
});
