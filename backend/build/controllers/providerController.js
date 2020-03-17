"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveProvider = exports.createProvider = void 0;

var _models = require("../db/models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createProvider = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var newProvider;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all([_models.Provider.create({
              name: req.body.name,
              address: req.body.address,
              email: req.body.email,
              phoneNum: req.body.phoneNum
            })]);

          case 2:
            newProvider = _context.sent;
            res.send(newProvider);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createProvider(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProvider = createProvider;

var retrieveProvider = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var provider;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.Provider.findAll({
              where: {
                id: req.query.providerId
              }
            });

          case 2:
            provider = _context2.sent;
            res.send(provider);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function retrieveProvider(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.retrieveProvider = retrieveProvider;
//# sourceMappingURL=providerController.js.map