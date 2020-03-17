"use strict";

require("core-js/stable");

var _cors = _interopRequireDefault(require("cors"));

require("regenerator-runtime/runtime");

var _pitchRouter = _interopRequireDefault(require("./routes/pitchRouter"));

var _providerRouter = _interopRequireDefault(require("./routes/providerRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require("express");

var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/users");

var app = express();
app.use(logger("dev"));
app.use((0, _cors["default"])());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pitches", _pitchRouter["default"]);
app.use("/providers", _providerRouter["default"]);
module.exports = app;
//# sourceMappingURL=app.js.map