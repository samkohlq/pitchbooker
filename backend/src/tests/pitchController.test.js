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
});
