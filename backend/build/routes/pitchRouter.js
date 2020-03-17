"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _pitchController = require("../controllers/pitchController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // create pitch


router.post("/createPitch", function (req, res) {
  return (0, _pitchController.createPitch)(req, res);
});
router.get("/retrieveOwnPitches", function (req, res) {
  return (0, _pitchController.retrieveOwnPitches)(req, res);
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=pitchRouter.js.map