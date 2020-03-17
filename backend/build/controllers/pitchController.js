"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrievePitches = exports.createPitch = void 0;

var _models = require("../db/models");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Sequelize = require("sequelize");

var createPitch = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _ref2, _ref3, newPitch, associatedProvider;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([_models.Pitch.create({
              name: req.body.name,
              pricePerHour: req.body.pricePerHour,
              address: req.body.address,
              maxNumPlayersPerSide: req.body.maxNumPlayersPerSide,
              ProviderId: req.body.providerId
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

var retrievePitches = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var provider, pitches, startDateTime, endDateTime, pitchIdsBookedAtTimeslot;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!req.query.providerId) {
              _context2.next = 10;
              break;
            }

            _context2.next = 3;
            return _models.Provider.findByPk(req.query.providerId);

          case 3:
            provider = _context2.sent;
            _context2.next = 6;
            return provider.getPitches();

          case 6:
            pitches = _context2.sent;
            res.send(pitches);
            _context2.next = 16;
            break;

          case 10:
            startDateTime = new Date(req.query.startDateTime);
            endDateTime = new Date(req.query.endDateTime);
            _context2.next = 14;
            return _models.Booking.findAll({
              attributes: ["PitchId"],
              where: {
                bookingStartDateTime: _defineProperty({}, Sequelize.Op.gte, startDateTime),
                bookingEndDateTime: _defineProperty({}, Sequelize.Op.lte, endDateTime)
              }
            });

          case 14:
            pitchIdsBookedAtTimeslot = _context2.sent;
            res.send(pitchIdsBookedAtTimeslot);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function retrievePitches(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.retrievePitches = retrievePitches;
//# sourceMappingURL=pitchController.js.map