"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _providerController = require("../controllers/providerController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // create provider


router.post("/createProvider", function (req, res) {
  return (0, _providerController.createProvider)(req, res);
});
router.get("/retrieveProvider", function (req, res) {
  return (0, _providerController.retrieveProvider)(req, res);
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=providerRouter.js.map