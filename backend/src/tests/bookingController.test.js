import request from "supertest";
import app from "../app";
import models from "../db/models";

afterEach(async () => {
  await models.Booking.destroy({
    where: {}
  });
});

afterAll(() => {
  models.sequelize.close();
});

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
