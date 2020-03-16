var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
import "core-js/stable";
import "regenerator-runtime/runtime";
import pitchRouter from "./routes/pitchRouter";
import providerRouter from "./routes/providerRouter";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", pitchRouter);
app.use("/providers", providerRouter);

module.exports = app;
