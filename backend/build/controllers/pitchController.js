"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveOwnPitches = exports.createPitch = void 0;

var _models = require("../db/models");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createPitch = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _ref2, _ref3, newPitch, associatedProvider;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([_models.Pitch.create({
              pricePerHour: req.body.pricePerHour,
              address: req.body.address,
              maxNumPlayersPerSide: req.body.maxNumPlayersPerSide
            }), _models.Provider.findOne({
              where: {
                id: req.body.providerId
              }
            })]);

          case 2:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            newPitch = _ref3[0];
            associatedProvider = _ref3[1];
            _context.next = 8;
            return newPitch.setProvider(associatedProvider);

          case 8:
            res.send(newPitch);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createPitch(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createPitch = createPitch;

var retrieveOwnPitches = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var provider, pitches;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.Provider.findOne({
              where: {
                id: req.query.providerId
              }
            });

          case 2:
            provider = _context2.sent;
            _context2.next = 5;
            return provider.getPitches();

          case 5:
            pitches = _context2.sent;
            res.send(pitches);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function retrieveOwnPitches(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.retrieveOwnPitches = retrieveOwnPitches;
//# sourceMappingURL=pitchController.js.map