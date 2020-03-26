import request from "supertest";
import app from "../app";
import models from "../db/models";

afterEach(async () => {
  await models.Booking.destroy({
    where: {}
  });
  await models.Pitch.destroy({
    where: {}
  });
  await models.Provider.destroy({
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

test("create booking API creates new booking", async () => {
  const date = new Date();
  const response = await request(app)
    .post("/bookings/createBooking")
    .send({
      bookerName: "Test Booker Name",
      bookerEmail: "TestBooker@TestBooker.com",
      bookerPhoneNum: "12345678",
      bookingStartDateTime: date,
      bookingEndDateTime: date,
      pitchId: 1
    })
    .set("Accept", "application/json");
  expect(response.statusCode).toBe(200);
  expect(response.body.newBooking.bookerName).toBe("Test Booker Name");
  expect(response.body.newBooking.bookerEmail).toBe(
    "TestBooker@TestBooker.com"
  );
  expect(response.body.newBooking.bookerPhoneNum).toBe("12345678");
});

test("retrieve booking API retrieve existing booking", async () => {
  const date = new Date();
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
  const pitchId = retrievePitchResponse.body[0].id;
  const response = await request(app)
    .post("/bookings/createBooking")
    .send({
      bookerName: "Test Booker Name",
      bookerEmail: "TestBooker@TestBooker.com",
      bookerPhoneNum: "12345678",
      bookingStartDateTime: date,
      bookingEndDateTime: date,
      pitchId: pitchId
    })
    .set("Accept", "application/json");
  expect(response.statusCode).toBe(200);
  const retrieveBookingResponse = await request(app).get(
    `/bookings/retrieveBookings?pitchId=${pitchId}`
  );
  expect(retrieveBookingResponse.statusCode).toBe(200);
  expect(retrieveBookingResponse.body[0].bookerName).toBe("Test Booker Name");
  expect(retrieveBookingResponse.body[0].bookerEmail).toBe(
    "TestBooker@TestBooker.com"
  );
  expect(retrieveBookingResponse.body[0].bookerPhoneNum).toBe("12345678");
});
