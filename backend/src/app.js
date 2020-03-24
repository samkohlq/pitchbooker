var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
import "core-js/stable";
import cors from "cors";
import "regenerator-runtime/runtime";
import bookingRouter from "./routes/bookingRouter";
import emailRouter from "./routes/emailRouter";
import pitchRouter from "./routes/pitchRouter";
import providerRouter from "./routes/providerRouter";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pitches", pitchRouter);
app.use("/providers", providerRouter);
app.use("/bookings", bookingRouter);
app.use("/emails", emailRouter);

module.exports = app;
