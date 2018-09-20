'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonCache = require('./jsonCache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testJsonCache = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var data, finalResult;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = [{
                            id: 1,
                            name: 'demo 1'
                        }, {
                            id: 2,
                            name: 'demo 2'
                        }];


                        _jsonCache.jsonCache.write(data, 'demo');

                        _context.next = 4;
                        return _jsonCache.jsonCache.getMostRecentFile('demo');

                    case 4:
                        finalResult = _context.sent;


                        console.log(finalResult);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function testJsonCache() {
        return _ref.apply(this, arguments);
    };
}();

testJsonCache();