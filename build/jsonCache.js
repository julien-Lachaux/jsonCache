'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsonCache = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * json cache system
 */
var jsonCache = exports.jsonCache = {
    /**
     * path: path of the cache directory
     * dateFormat: format of the date for the name of cache file
     * maxCacheSize: max files into each type of cache
     */
    path: 'data/',
    dateFormat: 'DD-MM-YY--HH:mm:ss',
    maxCacheSize: 5, // max nbr of json files

    /**
     * write
     * cache an array or a javascript object into a json files
     * @param {Array|Object} data 
     * @param {string} dataType 
     */
    write: function write(data, dataType) {
        var _this = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var dir, cacheDate, cachePath;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            dir = _this.path + '/' + dataType;

                            if (!_fs2.default.existsSync(dir)) {
                                _fs2.default.mkdirSync(dir);
                            }
                            cacheDate = (0, _moment2.default)().format(_this.dateFormat);
                            cachePath = dir + '/' + dataType + '_' + cacheDate + '.json';
                            _context2.next = 6;
                            return _fs2.default.writeFile(cachePath, JSON.stringify(data), function () {
                                var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err) {
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context.next = 2;
                                                        break;
                                                    }

                                                    throw err;

                                                case 2:
                                                    console.log('Write cache at ' + _this.path + dataType + '/' + dataType + '_' + cacheDate + '.json with ' + data.length + ' entries -- ' + cacheDate + ') \r');

                                                    _context.next = 5;
                                                    return _this.clean(dataType);

                                                case 5:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                }));

                                return function (_x) {
                                    return _ref.apply(this, arguments);
                                };
                            }());

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }))();
    },


    /**
     * clean
     * remove files under the max files limit
     * @param {string} dataType type of cache to clean
     */
    clean: function clean(dataType) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var dataTypePath, success, files, nbrOfFileToClean, i, olderFile, olderFilePath;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            dataTypePath = '' + _this2.path + dataType;
                            success = true;

                            console.log('cleaning cache of ' + dataType + ' ! \r');

                            files = _fs2.default.readdirSync(dataTypePath);

                            if (!(files.length > 5)) {
                                _context3.next = 19;
                                break;
                            }

                            nbrOfFileToClean = files.length - 5;


                            console.log('cleaning needed for ' + nbrOfFileToClean + ' files ! \r');
                            console.log('cleaning started... \r');

                            i = 0;

                        case 9:
                            if (!(i < nbrOfFileToClean)) {
                                _context3.next = 19;
                                break;
                            }

                            _context3.next = 12;
                            return _this2.getOldestFile(dataType);

                        case 12:
                            olderFile = _context3.sent;
                            olderFilePath = dataTypePath + '/' + olderFile;

                            _fs2.default.unlinkSync(olderFilePath);

                            if (_fs2.default.existsSync(olderFilePath)) {
                                console.log('cleaning failed to delete this file: ' + olderFilePath + ' \r');
                                console.log('cleaning abort, number of files remaining to clean: ' + (nbrOfFileToClean - i) + ' \r');
                                success = false;
                            } else {
                                console.log('cleaning this file with succes: ' + olderFilePath + ', ' + (nbrOfFileToClean - (i + 1)) + ' files remaining \r');
                            }

                        case 16:
                            i++;
                            _context3.next = 9;
                            break;

                        case 19:

                            if (success) {
                                console.log('cleaning finish with success \r');
                            }

                        case 20:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }))();
    },


    /**
     * getOldestFile
     * return the oldest cached files from the dataType specified
     * @param {string} dataType 
     */
    getOldestFile: function getOldestFile(dataType) {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            var dataTypePath, files, oldestFile;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            dataTypePath = '' + _this3.path + dataType;
                            files = _fs2.default.readdirSync(dataTypePath);
                            oldestFile = undefined;


                            files.forEach(function (file) {
                                if (oldestFile !== undefined) {
                                    var date = (0, _moment2.default)(file.substring(file.indexOf('_') + 1, file.indexOf('.')), _this3.dateFormat);
                                    var oldestFileDate = (0, _moment2.default)(oldestFile.substring(oldestFile.indexOf('_') + 1, oldestFile.indexOf('.')), _this3.dateFormat);

                                    if (date.isBefore(oldestFileDate)) {
                                        oldestFile = file;
                                    }
                                } else {
                                    oldestFile = file;
                                }
                            });

                            return _context4.abrupt('return', oldestFile);

                        case 5:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this3);
        }))();
    },


    /**
     * getMostRecentFile
     * return the most recent cached files from the dataType specified
     * @param {string} dataType 
     */
    getMostRecentFile: function getMostRecentFile(dataType) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            var dataTypePath, mostRecentFile, files;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            dataTypePath = '' + _this4.path + dataType;
                            mostRecentFile = undefined;
                            files = _fs2.default.readdirSync(dataTypePath);


                            files.forEach(function (file) {
                                if (mostRecentFile !== undefined) {
                                    var date = (0, _moment2.default)(file.substring(file.indexOf('_') + 1, file.indexOf('.')), _this4.dateFormat);
                                    var mostRecentFileDate = (0, _moment2.default)(mostRecentFile.substring(mostRecentFile.indexOf('_') + 1, mostRecentFile.indexOf('.')), _this4.dateFormat);

                                    if (date.isAfter(mostRecentFileDate)) {
                                        mostRecentFile = file;
                                    }
                                } else {
                                    mostRecentFile = file;
                                }
                            });

                            return _context5.abrupt('return', mostRecentFile);

                        case 5:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this4);
        }))();
    }
};