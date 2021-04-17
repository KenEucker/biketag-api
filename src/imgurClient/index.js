;(function webpackUniversalModuleDefinition(root, factory) {
  //CommonJS2 Comment
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  //AMD Comment
  else if (typeof define === 'function' && define.amd) define([], factory)
  //CommonJS Comment
  else if (typeof exports === 'object') exports['imgur'] = factory()
  //Root Comment
  else root['imgur'] = factory()
})(typeof self !== 'undefined' ? self : this, function () {
  return /******/ (() => {
    // webpackBootstrap
    /******/ var __webpack_modules__ = {
      /***/ './node_modules/array-filter/index.js':
        /*!********************************************!*\
  !*** ./node_modules/array-filter/index.js ***!
  \********************************************/
        /***/ (module) => {
          /**
           * Array#filter.
           *
           * @param {Array} arr
           * @param {Function} fn
           * @param {Object=} self
           * @return {Array}
           * @throw TypeError
           */

          module.exports = function (arr, fn, self) {
            if (arr.filter) return arr.filter(fn, self)
            if (void 0 === arr || null === arr) throw new TypeError()
            if ('function' != typeof fn) throw new TypeError()
            var ret = []
            for (var i = 0; i < arr.length; i++) {
              if (!hasOwn.call(arr, i)) continue
              var val = arr[i]
              if (fn.call(self, val, i, arr)) ret.push(val)
            }
            return ret
          }

          var hasOwn = Object.prototype.hasOwnProperty

          /***/
        },

      /***/ './node_modules/assert/build/assert.js':
        /*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'
          /* provided dependency */ var process = __webpack_require__(
            /*! process/browser */ './node_modules/process/browser.js'
          )
          /* provided dependency */ var console = __webpack_require__(
            /*! console-browserify */ './node_modules/console-browserify/index.js'
          )
          // Currently in sync with Node.js lib/assert.js
          // https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
          // Originally from narwhal.js (http://narwhaljs.org)
          // Copyright (c) 2009 Thomas Robinson <280north.com>
          //
          // Permission is hereby granted, free of charge, to any person obtaining a copy
          // of this software and associated documentation files (the 'Software'), to
          // deal in the Software without restriction, including without limitation the
          // rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
          // sell copies of the Software, and to permit persons to whom the Software is
          // furnished to do so, subject to the following conditions:
          //
          // The above copyright notice and this permission notice shall be included in
          // all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          // AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

          function _typeof(obj) {
            if (
              typeof Symbol === 'function' &&
              typeof Symbol.iterator === 'symbol'
            ) {
              _typeof = function _typeof(obj) {
                return typeof obj
              }
            } else {
              _typeof = function _typeof(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj
              }
            }
            return _typeof(obj)
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError('Cannot call a class as a function')
            }
          }

          var _require = __webpack_require__(
              /*! ./internal/errors */ './node_modules/assert/build/internal/errors.js'
            ),
            _require$codes = _require.codes,
            ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
            ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
            ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
            ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
            ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS

          var AssertionError = __webpack_require__(
            /*! ./internal/assert/assertion_error */ './node_modules/assert/build/internal/assert/assertion_error.js'
          )

          var _require2 = __webpack_require__(
              /*! util/ */ './node_modules/util/util.js'
            ),
            inspect = _require2.inspect

          var _require$types = __webpack_require__(
              /*! util/ */ './node_modules/util/util.js'
            ).types,
            isPromise = _require$types.isPromise,
            isRegExp = _require$types.isRegExp

          var objectAssign = Object.assign
            ? Object.assign
            : __webpack_require__(
                /*! es6-object-assign */ './node_modules/es6-object-assign/index.js'
              ).assign
          var objectIs = Object.is
            ? Object.is
            : __webpack_require__(
                /*! object-is */ './node_modules/object-is/index.js'
              )
          var errorCache = new Map()
          var isDeepEqual
          var isDeepStrictEqual
          var parseExpressionAt
          var findNodeAround
          var decoder

          function lazyLoadComparison() {
            var comparison = __webpack_require__(
              /*! ./internal/util/comparisons */ './node_modules/assert/build/internal/util/comparisons.js'
            )

            isDeepEqual = comparison.isDeepEqual
            isDeepStrictEqual = comparison.isDeepStrictEqual
          } // Escape control characters but not \n and \t to keep the line breaks and
          // indentation intact.
          // eslint-disable-next-line no-control-regex

          var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g
          var meta = [
            '\\u0000',
            '\\u0001',
            '\\u0002',
            '\\u0003',
            '\\u0004',
            '\\u0005',
            '\\u0006',
            '\\u0007',
            '\\b',
            '',
            '',
            '\\u000b',
            '\\f',
            '',
            '\\u000e',
            '\\u000f',
            '\\u0010',
            '\\u0011',
            '\\u0012',
            '\\u0013',
            '\\u0014',
            '\\u0015',
            '\\u0016',
            '\\u0017',
            '\\u0018',
            '\\u0019',
            '\\u001a',
            '\\u001b',
            '\\u001c',
            '\\u001d',
            '\\u001e',
            '\\u001f',
          ]

          var escapeFn = function escapeFn(str) {
            return meta[str.charCodeAt(0)]
          }

          var warned = false // The assert module provides functions that throw
          // AssertionError's when particular conditions are not met. The
          // assert module must conform to the following interface.

          var assert = (module.exports = ok)
          var NO_EXCEPTION_SENTINEL = {} // All of the following functions must throw an AssertionError
          // when a corresponding condition is not met, with a message that
          // may be undefined if not provided. All assertion methods provide
          // both the actual and expected values to the assertion error for
          // display purposes.

          function innerFail(obj) {
            if (obj.message instanceof Error) throw obj.message
            throw new AssertionError(obj)
          }

          function fail(actual, expected, message, operator, stackStartFn) {
            var argsLen = arguments.length
            var internalMessage

            if (argsLen === 0) {
              internalMessage = 'Failed'
            } else if (argsLen === 1) {
              message = actual
              actual = undefined
            } else {
              if (warned === false) {
                warned = true
                var warn = process.emitWarning
                  ? process.emitWarning
                  : console.warn.bind(console)
                warn(
                  'assert.fail() with more than one argument is deprecated. ' +
                    'Please use assert.strictEqual() instead or only pass a message.',
                  'DeprecationWarning',
                  'DEP0094'
                )
              }

              if (argsLen === 2) operator = '!='
            }

            if (message instanceof Error) throw message
            var errArgs = {
              actual: actual,
              expected: expected,
              operator: operator === undefined ? 'fail' : operator,
              stackStartFn: stackStartFn || fail,
            }

            if (message !== undefined) {
              errArgs.message = message
            }

            var err = new AssertionError(errArgs)

            if (internalMessage) {
              err.message = internalMessage
              err.generatedMessage = true
            }

            throw err
          }

          assert.fail = fail // The AssertionError is defined in internal/error.

          assert.AssertionError = AssertionError

          function innerOk(fn, argLen, value, message) {
            if (!value) {
              var generatedMessage = false

              if (argLen === 0) {
                generatedMessage = true
                message = 'No value argument passed to `assert.ok()`'
              } else if (message instanceof Error) {
                throw message
              }

              var err = new AssertionError({
                actual: value,
                expected: true,
                message: message,
                operator: '==',
                stackStartFn: fn,
              })
              err.generatedMessage = generatedMessage
              throw err
            }
          } // Pure assertion tests whether a value is truthy, as determined
          // by !!value.

          function ok() {
            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key]
            }

            innerOk.apply(void 0, [ok, args.length].concat(args))
          }

          assert.ok = ok // The equality assertion tests shallow, coercive equality with ==.

          /* eslint-disable no-restricted-properties */

          assert.equal = function equal(actual, expected, message) {
            if (arguments.length < 2) {
              throw new ERR_MISSING_ARGS('actual', 'expected')
            } // eslint-disable-next-line eqeqeq

            if (actual != expected) {
              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: '==',
                stackStartFn: equal,
              })
            }
          } // The non-equality assertion tests for whether two objects are not
          // equal with !=.

          assert.notEqual = function notEqual(actual, expected, message) {
            if (arguments.length < 2) {
              throw new ERR_MISSING_ARGS('actual', 'expected')
            } // eslint-disable-next-line eqeqeq

            if (actual == expected) {
              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: '!=',
                stackStartFn: notEqual,
              })
            }
          } // The equivalence assertion tests a deep equality relation.

          assert.deepEqual = function deepEqual(actual, expected, message) {
            if (arguments.length < 2) {
              throw new ERR_MISSING_ARGS('actual', 'expected')
            }

            if (isDeepEqual === undefined) lazyLoadComparison()

            if (!isDeepEqual(actual, expected)) {
              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: 'deepEqual',
                stackStartFn: deepEqual,
              })
            }
          } // The non-equivalence assertion tests for any deep inequality.

          assert.notDeepEqual = function notDeepEqual(
            actual,
            expected,
            message
          ) {
            if (arguments.length < 2) {
              throw new ERR_MISSING_ARGS('actual', 'expected')
            }

            if (isDeepEqual === undefined) lazyLoadComparison()

            if (isDeepEqual(actual, expected)) {
              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: 'notDeepEqual',
                stackStartFn: notDeepEqual,
              })
            }
          }
          /* eslint-enable */

          assert.deepStrictEqual = function deepStrictEqual(
            actual,
            expected,
            message
          ) {
            if (arguments.length < 2) {
              throw new ERR_MISSING_ARGS('actual', 'expected')
            }

            if (isDeepEqual === undefined) lazyLoadComparison()

            if (!isDeepStrictEqual(actual, expected)) {
              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: 'deepStrictEqual',
                stackStartFn: deepStrictEqual,
              })
            }
          }

          assert.notDeepStrictEqual = notDeepStrictEqual

          function notDeepStrictEqual(actual, expected, message) {
            if (arguments.length < 2) {
              throw new ERR_MISSING_ARGS('actual', 'expected')
            }

            if (isDeepEqual === undefined) lazyLoadComparison()

            if (isDeepStrictEqual(actual, expected)) {
              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: 'notDeepStrictEqual',
                stackStartFn: notDeepStrictEqual,
              })
            }
          }

          assert.strictEqual = function strictEqual(actual, expected, message) {
            if (arguments.length < 2) {
              throw new ERR_MISSING_ARGS('actual', 'expected')
            }

            if (!objectIs(actual, expected)) {
              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: 'strictEqual',
                stackStartFn: strictEqual,
              })
            }
          }

          assert.notStrictEqual = function notStrictEqual(
            actual,
            expected,
            message
          ) {
            if (arguments.length < 2) {
              throw new ERR_MISSING_ARGS('actual', 'expected')
            }

            if (objectIs(actual, expected)) {
              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: 'notStrictEqual',
                stackStartFn: notStrictEqual,
              })
            }
          }

          var Comparison = function Comparison(obj, keys, actual) {
            var _this = this

            _classCallCheck(this, Comparison)

            keys.forEach(function (key) {
              if (key in obj) {
                if (
                  actual !== undefined &&
                  typeof actual[key] === 'string' &&
                  isRegExp(obj[key]) &&
                  obj[key].test(actual[key])
                ) {
                  _this[key] = actual[key]
                } else {
                  _this[key] = obj[key]
                }
              }
            })
          }

          function compareExceptionKey(
            actual,
            expected,
            key,
            message,
            keys,
            fn
          ) {
            if (
              !(key in actual) ||
              !isDeepStrictEqual(actual[key], expected[key])
            ) {
              if (!message) {
                // Create placeholder objects to create a nice output.
                var a = new Comparison(actual, keys)
                var b = new Comparison(expected, keys, actual)
                var err = new AssertionError({
                  actual: a,
                  expected: b,
                  operator: 'deepStrictEqual',
                  stackStartFn: fn,
                })
                err.actual = actual
                err.expected = expected
                err.operator = fn.name
                throw err
              }

              innerFail({
                actual: actual,
                expected: expected,
                message: message,
                operator: fn.name,
                stackStartFn: fn,
              })
            }
          }

          function expectedException(actual, expected, msg, fn) {
            if (typeof expected !== 'function') {
              if (isRegExp(expected)) return expected.test(actual) // assert.doesNotThrow does not accept objects.

              if (arguments.length === 2) {
                throw new ERR_INVALID_ARG_TYPE(
                  'expected',
                  ['Function', 'RegExp'],
                  expected
                )
              } // Handle primitives properly.

              if (_typeof(actual) !== 'object' || actual === null) {
                var err = new AssertionError({
                  actual: actual,
                  expected: expected,
                  message: msg,
                  operator: 'deepStrictEqual',
                  stackStartFn: fn,
                })
                err.operator = fn.name
                throw err
              }

              var keys = Object.keys(expected) // Special handle errors to make sure the name and the message are compared
              // as well.

              if (expected instanceof Error) {
                keys.push('name', 'message')
              } else if (keys.length === 0) {
                throw new ERR_INVALID_ARG_VALUE(
                  'error',
                  expected,
                  'may not be an empty object'
                )
              }

              if (isDeepEqual === undefined) lazyLoadComparison()
              keys.forEach(function (key) {
                if (
                  typeof actual[key] === 'string' &&
                  isRegExp(expected[key]) &&
                  expected[key].test(actual[key])
                ) {
                  return
                }

                compareExceptionKey(actual, expected, key, msg, keys, fn)
              })
              return true
            } // Guard instanceof against arrow functions as they don't have a prototype.

            if (
              expected.prototype !== undefined &&
              actual instanceof expected
            ) {
              return true
            }

            if (Error.isPrototypeOf(expected)) {
              return false
            }

            return expected.call({}, actual) === true
          }

          function getActual(fn) {
            if (typeof fn !== 'function') {
              throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn)
            }

            try {
              fn()
            } catch (e) {
              return e
            }

            return NO_EXCEPTION_SENTINEL
          }

          function checkIsPromise(obj) {
            // Accept native ES6 promises and promises that are implemented in a similar
            // way. Do not accept thenables that use a function as `obj` and that have no
            // `catch` handler.
            // TODO: thenables are checked up until they have the correct methods,
            // but according to documentation, the `then` method should receive
            // the `fulfill` and `reject` arguments as well or it may be never resolved.
            return (
              isPromise(obj) ||
              (obj !== null &&
                _typeof(obj) === 'object' &&
                typeof obj.then === 'function' &&
                typeof obj.catch === 'function')
            )
          }

          function waitForActual(promiseFn) {
            return Promise.resolve().then(function () {
              var resultPromise

              if (typeof promiseFn === 'function') {
                // Return a rejected promise if `promiseFn` throws synchronously.
                resultPromise = promiseFn() // Fail in case no promise is returned.

                if (!checkIsPromise(resultPromise)) {
                  throw new ERR_INVALID_RETURN_VALUE(
                    'instance of Promise',
                    'promiseFn',
                    resultPromise
                  )
                }
              } else if (checkIsPromise(promiseFn)) {
                resultPromise = promiseFn
              } else {
                throw new ERR_INVALID_ARG_TYPE(
                  'promiseFn',
                  ['Function', 'Promise'],
                  promiseFn
                )
              }

              return Promise.resolve()
                .then(function () {
                  return resultPromise
                })
                .then(function () {
                  return NO_EXCEPTION_SENTINEL
                })
                .catch(function (e) {
                  return e
                })
            })
          }

          function expectsError(stackStartFn, actual, error, message) {
            if (typeof error === 'string') {
              if (arguments.length === 4) {
                throw new ERR_INVALID_ARG_TYPE(
                  'error',
                  ['Object', 'Error', 'Function', 'RegExp'],
                  error
                )
              }

              if (_typeof(actual) === 'object' && actual !== null) {
                if (actual.message === error) {
                  throw new ERR_AMBIGUOUS_ARGUMENT(
                    'error/message',
                    'The error message "'.concat(
                      actual.message,
                      '" is identical to the message.'
                    )
                  )
                }
              } else if (actual === error) {
                throw new ERR_AMBIGUOUS_ARGUMENT(
                  'error/message',
                  'The error "'.concat(actual, '" is identical to the message.')
                )
              }

              message = error
              error = undefined
            } else if (
              error != null &&
              _typeof(error) !== 'object' &&
              typeof error !== 'function'
            ) {
              throw new ERR_INVALID_ARG_TYPE(
                'error',
                ['Object', 'Error', 'Function', 'RegExp'],
                error
              )
            }

            if (actual === NO_EXCEPTION_SENTINEL) {
              var details = ''

              if (error && error.name) {
                details += ' ('.concat(error.name, ')')
              }

              details += message ? ': '.concat(message) : '.'
              var fnType =
                stackStartFn.name === 'rejects' ? 'rejection' : 'exception'
              innerFail({
                actual: undefined,
                expected: error,
                operator: stackStartFn.name,
                message: 'Missing expected '.concat(fnType).concat(details),
                stackStartFn: stackStartFn,
              })
            }

            if (
              error &&
              !expectedException(actual, error, message, stackStartFn)
            ) {
              throw actual
            }
          }

          function expectsNoError(stackStartFn, actual, error, message) {
            if (actual === NO_EXCEPTION_SENTINEL) return

            if (typeof error === 'string') {
              message = error
              error = undefined
            }

            if (!error || expectedException(actual, error)) {
              var details = message ? ': '.concat(message) : '.'
              var fnType =
                stackStartFn.name === 'doesNotReject'
                  ? 'rejection'
                  : 'exception'
              innerFail({
                actual: actual,
                expected: error,
                operator: stackStartFn.name,
                message:
                  'Got unwanted '.concat(fnType).concat(details, '\n') +
                  'Actual message: "'.concat(actual && actual.message, '"'),
                stackStartFn: stackStartFn,
              })
            }

            throw actual
          }

          assert.throws = function throws(promiseFn) {
            for (
              var _len2 = arguments.length,
                args = new Array(_len2 > 1 ? _len2 - 1 : 0),
                _key2 = 1;
              _key2 < _len2;
              _key2++
            ) {
              args[_key2 - 1] = arguments[_key2]
            }

            expectsError.apply(
              void 0,
              [throws, getActual(promiseFn)].concat(args)
            )
          }

          assert.rejects = function rejects(promiseFn) {
            for (
              var _len3 = arguments.length,
                args = new Array(_len3 > 1 ? _len3 - 1 : 0),
                _key3 = 1;
              _key3 < _len3;
              _key3++
            ) {
              args[_key3 - 1] = arguments[_key3]
            }

            return waitForActual(promiseFn).then(function (result) {
              return expectsError.apply(void 0, [rejects, result].concat(args))
            })
          }

          assert.doesNotThrow = function doesNotThrow(fn) {
            for (
              var _len4 = arguments.length,
                args = new Array(_len4 > 1 ? _len4 - 1 : 0),
                _key4 = 1;
              _key4 < _len4;
              _key4++
            ) {
              args[_key4 - 1] = arguments[_key4]
            }

            expectsNoError.apply(
              void 0,
              [doesNotThrow, getActual(fn)].concat(args)
            )
          }

          assert.doesNotReject = function doesNotReject(fn) {
            for (
              var _len5 = arguments.length,
                args = new Array(_len5 > 1 ? _len5 - 1 : 0),
                _key5 = 1;
              _key5 < _len5;
              _key5++
            ) {
              args[_key5 - 1] = arguments[_key5]
            }

            return waitForActual(fn).then(function (result) {
              return expectsNoError.apply(
                void 0,
                [doesNotReject, result].concat(args)
              )
            })
          }

          assert.ifError = function ifError(err) {
            if (err !== null && err !== undefined) {
              var message = 'ifError got unwanted exception: '

              if (
                _typeof(err) === 'object' &&
                typeof err.message === 'string'
              ) {
                if (err.message.length === 0 && err.constructor) {
                  message += err.constructor.name
                } else {
                  message += err.message
                }
              } else {
                message += inspect(err)
              }

              var newErr = new AssertionError({
                actual: err,
                expected: null,
                operator: 'ifError',
                message: message,
                stackStartFn: ifError,
              }) // Make sure we actually have a stack trace!

              var origStack = err.stack

              if (typeof origStack === 'string') {
                // This will remove any duplicated frames from the error frames taken
                // from within `ifError` and add the original error frames to the newly
                // created ones.
                var tmp2 = origStack.split('\n')
                tmp2.shift() // Filter all frames existing in err.stack.

                var tmp1 = newErr.stack.split('\n')

                for (var i = 0; i < tmp2.length; i++) {
                  // Find the first occurrence of the frame.
                  var pos = tmp1.indexOf(tmp2[i])

                  if (pos !== -1) {
                    // Only keep new frames.
                    tmp1 = tmp1.slice(0, pos)
                    break
                  }
                }

                newErr.stack = ''
                  .concat(tmp1.join('\n'), '\n')
                  .concat(tmp2.join('\n'))
              }

              throw newErr
            }
          } // Expose a strict only variant of assert

          function strict() {
            for (
              var _len6 = arguments.length, args = new Array(_len6), _key6 = 0;
              _key6 < _len6;
              _key6++
            ) {
              args[_key6] = arguments[_key6]
            }

            innerOk.apply(void 0, [strict, args.length].concat(args))
          }

          assert.strict = objectAssign(strict, assert, {
            equal: assert.strictEqual,
            deepEqual: assert.deepStrictEqual,
            notEqual: assert.notStrictEqual,
            notDeepEqual: assert.notDeepStrictEqual,
          })
          assert.strict.strict = assert.strict

          /***/
        },

      /***/ './node_modules/assert/build/internal/assert/assertion_error.js':
        /*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'
          /* provided dependency */ var process = __webpack_require__(
            /*! process/browser */ './node_modules/process/browser.js'
          )
          // Currently in sync with Node.js lib/internal/assert/assertion_error.js
          // https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c

          function _objectSpread(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i] != null ? arguments[i] : {}
              var ownKeys = Object.keys(source)
              if (typeof Object.getOwnPropertySymbols === 'function') {
                ownKeys = ownKeys.concat(
                  Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(
                      source,
                      sym
                    ).enumerable
                  })
                )
              }
              ownKeys.forEach(function (key) {
                _defineProperty(target, key, source[key])
              })
            }
            return target
          }

          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
              })
            } else {
              obj[key] = value
            }
            return obj
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError('Cannot call a class as a function')
            }
          }

          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i]
              descriptor.enumerable = descriptor.enumerable || false
              descriptor.configurable = true
              if ('value' in descriptor) descriptor.writable = true
              Object.defineProperty(target, descriptor.key, descriptor)
            }
          }

          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps)
            if (staticProps) _defineProperties(Constructor, staticProps)
            return Constructor
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === 'object' || typeof call === 'function')
            ) {
              return call
            }
            return _assertThisInitialized(self)
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              )
            }
            return self
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== 'function' && superClass !== null) {
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              }
            )
            if (superClass) _setPrototypeOf(subClass, superClass)
          }

          function _wrapNativeSuper(Class) {
            var _cache = typeof Map === 'function' ? new Map() : undefined
            _wrapNativeSuper = function _wrapNativeSuper(Class) {
              if (Class === null || !_isNativeFunction(Class)) return Class
              if (typeof Class !== 'function') {
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              }
              if (typeof _cache !== 'undefined') {
                if (_cache.has(Class)) return _cache.get(Class)
                _cache.set(Class, Wrapper)
              }
              function Wrapper() {
                return _construct(
                  Class,
                  arguments,
                  _getPrototypeOf(this).constructor
                )
              }
              Wrapper.prototype = Object.create(Class.prototype, {
                constructor: {
                  value: Wrapper,
                  enumerable: false,
                  writable: true,
                  configurable: true,
                },
              })
              return _setPrototypeOf(Wrapper, Class)
            }
            return _wrapNativeSuper(Class)
          }

          function isNativeReflectConstruct() {
            if (typeof Reflect === 'undefined' || !Reflect.construct)
              return false
            if (Reflect.construct.sham) return false
            if (typeof Proxy === 'function') return true
            try {
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              )
              return true
            } catch (e) {
              return false
            }
          }

          function _construct(Parent, args, Class) {
            if (isNativeReflectConstruct()) {
              _construct = Reflect.construct
            } else {
              _construct = function _construct(Parent, args, Class) {
                var a = [null]
                a.push.apply(a, args)
                var Constructor = Function.bind.apply(Parent, a)
                var instance = new Constructor()
                if (Class) _setPrototypeOf(instance, Class.prototype)
                return instance
              }
            }
            return _construct.apply(null, arguments)
          }

          function _isNativeFunction(fn) {
            return Function.toString.call(fn).indexOf('[native code]') !== -1
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p
                return o
              }
            return _setPrototypeOf(o, p)
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o)
                }
            return _getPrototypeOf(o)
          }

          function _typeof(obj) {
            if (
              typeof Symbol === 'function' &&
              typeof Symbol.iterator === 'symbol'
            ) {
              _typeof = function _typeof(obj) {
                return typeof obj
              }
            } else {
              _typeof = function _typeof(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj
              }
            }
            return _typeof(obj)
          }

          var _require = __webpack_require__(
              /*! util/ */ './node_modules/util/util.js'
            ),
            inspect = _require.inspect

          var _require2 = __webpack_require__(
              /*! ../errors */ './node_modules/assert/build/internal/errors.js'
            ),
            ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith

          function endsWith(str, search, this_len) {
            if (this_len === undefined || this_len > str.length) {
              this_len = str.length
            }

            return str.substring(this_len - search.length, this_len) === search
          } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat

          function repeat(str, count) {
            count = Math.floor(count)
            if (str.length == 0 || count == 0) return ''
            var maxCount = str.length * count
            count = Math.floor(Math.log(count) / Math.log(2))

            while (count) {
              str += str
              count--
            }

            str += str.substring(0, maxCount - str.length)
            return str
          }

          var blue = ''
          var green = ''
          var red = ''
          var white = ''
          var kReadableOperator = {
            deepStrictEqual: 'Expected values to be strictly deep-equal:',
            strictEqual: 'Expected values to be strictly equal:',
            strictEqualObject:
              'Expected "actual" to be reference-equal to "expected":',
            deepEqual: 'Expected values to be loosely deep-equal:',
            equal: 'Expected values to be loosely equal:',
            notDeepStrictEqual:
              'Expected "actual" not to be strictly deep-equal to:',
            notStrictEqual: 'Expected "actual" to be strictly unequal to:',
            notStrictEqualObject:
              'Expected "actual" not to be reference-equal to "expected":',
            notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
            notEqual: 'Expected "actual" to be loosely unequal to:',
            notIdentical: 'Values identical but not reference-equal:',
          } // Comparing short primitives should just show === / !== instead of using the
          // diff.

          var kMaxShortLength = 10

          function copyError(source) {
            var keys = Object.keys(source)
            var target = Object.create(Object.getPrototypeOf(source))
            keys.forEach(function (key) {
              target[key] = source[key]
            })
            Object.defineProperty(target, 'message', {
              value: source.message,
            })
            return target
          }

          function inspectValue(val) {
            // The util.inspect default values could be changed. This makes sure the
            // error messages contain the necessary information nevertheless.
            return inspect(val, {
              compact: false,
              customInspect: false,
              depth: 1000,
              maxArrayLength: Infinity,
              // Assert compares only enumerable properties (with a few exceptions).
              showHidden: false,
              // Having a long line as error is better than wrapping the line for
              // comparison for now.
              // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
              // have meta information about the inspected properties (i.e., know where
              // in what line the property starts and ends).
              breakLength: Infinity,
              // Assert does not detect proxies currently.
              showProxy: false,
              sorted: true,
              // Inspect getters as we also check them when comparing entries.
              getters: true,
            })
          }

          function createErrDiff(actual, expected, operator) {
            var other = ''
            var res = ''
            var lastPos = 0
            var end = ''
            var skipped = false
            var actualInspected = inspectValue(actual)
            var actualLines = actualInspected.split('\n')
            var expectedLines = inspectValue(expected).split('\n')
            var i = 0
            var indicator = '' // In case both values are objects explicitly mark them as not reference equal
            // for the `strictEqual` operator.

            if (
              operator === 'strictEqual' &&
              _typeof(actual) === 'object' &&
              _typeof(expected) === 'object' &&
              actual !== null &&
              expected !== null
            ) {
              operator = 'strictEqualObject'
            } // If "actual" and "expected" fit on a single line and they are not strictly
            // equal, check further special handling.

            if (
              actualLines.length === 1 &&
              expectedLines.length === 1 &&
              actualLines[0] !== expectedLines[0]
            ) {
              var inputLength = actualLines[0].length + expectedLines[0].length // If the character length of "actual" and "expected" together is less than
              // kMaxShortLength and if neither is an object and at least one of them is
              // not `zero`, use the strict equal comparison to visualize the output.

              if (inputLength <= kMaxShortLength) {
                if (
                  (_typeof(actual) !== 'object' || actual === null) &&
                  (_typeof(expected) !== 'object' || expected === null) &&
                  (actual !== 0 || expected !== 0)
                ) {
                  // -0 === +0
                  return (
                    ''.concat(kReadableOperator[operator], '\n\n') +
                    ''
                      .concat(actualLines[0], ' !== ')
                      .concat(expectedLines[0], '\n')
                  )
                }
              } else if (operator !== 'strictEqualObject') {
                // If the stderr is a tty and the input length is lower than the current
                // columns per line, add a mismatch indicator below the output. If it is
                // not a tty, use a default value of 80 characters.
                var maxLength =
                  process.stderr && process.stderr.isTTY
                    ? process.stderr.columns
                    : 80

                if (inputLength < maxLength) {
                  while (actualLines[0][i] === expectedLines[0][i]) {
                    i++
                  } // Ignore the first characters.

                  if (i > 2) {
                    // Add position indicator for the first mismatch in case it is a
                    // single line and the input length is less than the column length.
                    indicator = '\n  '.concat(repeat(' ', i), '^')
                    i = 0
                  }
                }
              }
            } // Remove all ending lines that match (this optimizes the output for
            // readability by reducing the number of total changed lines).

            var a = actualLines[actualLines.length - 1]
            var b = expectedLines[expectedLines.length - 1]

            while (a === b) {
              if (i++ < 2) {
                end = '\n  '.concat(a).concat(end)
              } else {
                other = a
              }

              actualLines.pop()
              expectedLines.pop()
              if (actualLines.length === 0 || expectedLines.length === 0) break
              a = actualLines[actualLines.length - 1]
              b = expectedLines[expectedLines.length - 1]
            }

            var maxLines = Math.max(actualLines.length, expectedLines.length) // Strict equal with identical objects that are not identical by reference.
            // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

            if (maxLines === 0) {
              // We have to get the result again. The lines were all removed before.
              var _actualLines = actualInspected.split('\n') // Only remove lines in case it makes sense to collapse those.
              // TODO: Accept env to always show the full error.

              if (_actualLines.length > 30) {
                _actualLines[26] = ''.concat(blue, '...').concat(white)

                while (_actualLines.length > 27) {
                  _actualLines.pop()
                }
              }

              return ''
                .concat(kReadableOperator.notIdentical, '\n\n')
                .concat(_actualLines.join('\n'), '\n')
            }

            if (i > 3) {
              end = '\n'.concat(blue, '...').concat(white).concat(end)
              skipped = true
            }

            if (other !== '') {
              end = '\n  '.concat(other).concat(end)
              other = ''
            }

            var printedLines = 0
            var msg =
              kReadableOperator[operator] +
              '\n'
                .concat(green, '+ actual')
                .concat(white, ' ')
                .concat(red, '- expected')
                .concat(white)
            var skippedMsg = ' '
              .concat(blue, '...')
              .concat(white, ' Lines skipped')

            for (i = 0; i < maxLines; i++) {
              // Only extra expected lines exist
              var cur = i - lastPos

              if (actualLines.length < i + 1) {
                // If the last diverging line is more than one line above and the
                // current line is at least line three, add some of the former lines and
                // also add dots to indicate skipped entries.
                if (cur > 1 && i > 2) {
                  if (cur > 4) {
                    res += '\n'.concat(blue, '...').concat(white)
                    skipped = true
                  } else if (cur > 3) {
                    res += '\n  '.concat(expectedLines[i - 2])
                    printedLines++
                  }

                  res += '\n  '.concat(expectedLines[i - 1])
                  printedLines++
                } // Mark the current line as the last diverging one.

                lastPos = i // Add the expected line to the cache.

                other += '\n'
                  .concat(red, '-')
                  .concat(white, ' ')
                  .concat(expectedLines[i])
                printedLines++ // Only extra actual lines exist
              } else if (expectedLines.length < i + 1) {
                // If the last diverging line is more than one line above and the
                // current line is at least line three, add some of the former lines and
                // also add dots to indicate skipped entries.
                if (cur > 1 && i > 2) {
                  if (cur > 4) {
                    res += '\n'.concat(blue, '...').concat(white)
                    skipped = true
                  } else if (cur > 3) {
                    res += '\n  '.concat(actualLines[i - 2])
                    printedLines++
                  }

                  res += '\n  '.concat(actualLines[i - 1])
                  printedLines++
                } // Mark the current line as the last diverging one.

                lastPos = i // Add the actual line to the result.

                res += '\n'
                  .concat(green, '+')
                  .concat(white, ' ')
                  .concat(actualLines[i])
                printedLines++ // Lines diverge
              } else {
                var expectedLine = expectedLines[i]
                var actualLine = actualLines[i] // If the lines diverge, specifically check for lines that only diverge by
                // a trailing comma. In that case it is actually identical and we should
                // mark it as such.

                var divergingLines =
                  actualLine !== expectedLine &&
                  (!endsWith(actualLine, ',') ||
                    actualLine.slice(0, -1) !== expectedLine) // If the expected line has a trailing comma but is otherwise identical,
                // add a comma at the end of the actual line. Otherwise the output could
                // look weird as in:
                //
                //   [
                //     1         // No comma at the end!
                // +   2
                //   ]
                //

                if (
                  divergingLines &&
                  endsWith(expectedLine, ',') &&
                  expectedLine.slice(0, -1) === actualLine
                ) {
                  divergingLines = false
                  actualLine += ','
                }

                if (divergingLines) {
                  // If the last diverging line is more than one line above and the
                  // current line is at least line three, add some of the former lines and
                  // also add dots to indicate skipped entries.
                  if (cur > 1 && i > 2) {
                    if (cur > 4) {
                      res += '\n'.concat(blue, '...').concat(white)
                      skipped = true
                    } else if (cur > 3) {
                      res += '\n  '.concat(actualLines[i - 2])
                      printedLines++
                    }

                    res += '\n  '.concat(actualLines[i - 1])
                    printedLines++
                  } // Mark the current line as the last diverging one.

                  lastPos = i // Add the actual line to the result and cache the expected diverging
                  // line so consecutive diverging lines show up as +++--- and not +-+-+-.

                  res += '\n'
                    .concat(green, '+')
                    .concat(white, ' ')
                    .concat(actualLine)
                  other += '\n'
                    .concat(red, '-')
                    .concat(white, ' ')
                    .concat(expectedLine)
                  printedLines += 2 // Lines are identical
                } else {
                  // Add all cached information to the result before adding other things
                  // and reset the cache.
                  res += other
                  other = '' // If the last diverging line is exactly one line above or if it is the
                  // very first line, add the line to the result.

                  if (cur === 1 || i === 0) {
                    res += '\n  '.concat(actualLine)
                    printedLines++
                  }
                }
              } // Inspected object to big (Show ~20 rows max)

              if (printedLines > 20 && i < maxLines - 2) {
                return (
                  ''
                    .concat(msg)
                    .concat(skippedMsg, '\n')
                    .concat(res, '\n')
                    .concat(blue, '...')
                    .concat(white)
                    .concat(other, '\n') + ''.concat(blue, '...').concat(white)
                )
              }
            }

            return ''
              .concat(msg)
              .concat(skipped ? skippedMsg : '', '\n')
              .concat(res)
              .concat(other)
              .concat(end)
              .concat(indicator)
          }

          var AssertionError =
            /*#__PURE__*/
            (function (_Error) {
              _inherits(AssertionError, _Error)

              function AssertionError(options) {
                var _this

                _classCallCheck(this, AssertionError)

                if (_typeof(options) !== 'object' || options === null) {
                  throw new ERR_INVALID_ARG_TYPE('options', 'Object', options)
                }

                var message = options.message,
                  operator = options.operator,
                  stackStartFn = options.stackStartFn
                var actual = options.actual,
                  expected = options.expected
                var limit = Error.stackTraceLimit
                Error.stackTraceLimit = 0

                if (message != null) {
                  _this = _possibleConstructorReturn(
                    this,
                    _getPrototypeOf(AssertionError).call(this, String(message))
                  )
                } else {
                  if (process.stderr && process.stderr.isTTY) {
                    // Reset on each call to make sure we handle dynamically set environment
                    // variables correct.
                    if (
                      process.stderr &&
                      process.stderr.getColorDepth &&
                      process.stderr.getColorDepth() !== 1
                    ) {
                      blue = '\x1B[34m'
                      green = '\x1B[32m'
                      white = '\x1B[39m'
                      red = '\x1B[31m'
                    } else {
                      blue = ''
                      green = ''
                      white = ''
                      red = ''
                    }
                  } // Prevent the error stack from being visible by duplicating the error
                  // in a very close way to the original in case both sides are actually
                  // instances of Error.

                  if (
                    _typeof(actual) === 'object' &&
                    actual !== null &&
                    _typeof(expected) === 'object' &&
                    expected !== null &&
                    'stack' in actual &&
                    actual instanceof Error &&
                    'stack' in expected &&
                    expected instanceof Error
                  ) {
                    actual = copyError(actual)
                    expected = copyError(expected)
                  }

                  if (
                    operator === 'deepStrictEqual' ||
                    operator === 'strictEqual'
                  ) {
                    _this = _possibleConstructorReturn(
                      this,
                      _getPrototypeOf(AssertionError).call(
                        this,
                        createErrDiff(actual, expected, operator)
                      )
                    )
                  } else if (
                    operator === 'notDeepStrictEqual' ||
                    operator === 'notStrictEqual'
                  ) {
                    // In case the objects are equal but the operator requires unequal, show
                    // the first object and say A equals B
                    var base = kReadableOperator[operator]
                    var res = inspectValue(actual).split('\n') // In case "actual" is an object, it should not be reference equal.

                    if (
                      operator === 'notStrictEqual' &&
                      _typeof(actual) === 'object' &&
                      actual !== null
                    ) {
                      base = kReadableOperator.notStrictEqualObject
                    } // Only remove lines in case it makes sense to collapse those.
                    // TODO: Accept env to always show the full error.

                    if (res.length > 30) {
                      res[26] = ''.concat(blue, '...').concat(white)

                      while (res.length > 27) {
                        res.pop()
                      }
                    } // Only print a single input.

                    if (res.length === 1) {
                      _this = _possibleConstructorReturn(
                        this,
                        _getPrototypeOf(AssertionError).call(
                          this,
                          ''.concat(base, ' ').concat(res[0])
                        )
                      )
                    } else {
                      _this = _possibleConstructorReturn(
                        this,
                        _getPrototypeOf(AssertionError).call(
                          this,
                          ''.concat(base, '\n\n').concat(res.join('\n'), '\n')
                        )
                      )
                    }
                  } else {
                    var _res = inspectValue(actual)

                    var other = ''
                    var knownOperators = kReadableOperator[operator]

                    if (
                      operator === 'notDeepEqual' ||
                      operator === 'notEqual'
                    ) {
                      _res = ''
                        .concat(kReadableOperator[operator], '\n\n')
                        .concat(_res)

                      if (_res.length > 1024) {
                        _res = ''.concat(_res.slice(0, 1021), '...')
                      }
                    } else {
                      other = ''.concat(inspectValue(expected))

                      if (_res.length > 512) {
                        _res = ''.concat(_res.slice(0, 509), '...')
                      }

                      if (other.length > 512) {
                        other = ''.concat(other.slice(0, 509), '...')
                      }

                      if (operator === 'deepEqual' || operator === 'equal') {
                        _res = ''
                          .concat(knownOperators, '\n\n')
                          .concat(_res, '\n\nshould equal\n\n')
                      } else {
                        other = ' '.concat(operator, ' ').concat(other)
                      }
                    }

                    _this = _possibleConstructorReturn(
                      this,
                      _getPrototypeOf(AssertionError).call(
                        this,
                        ''.concat(_res).concat(other)
                      )
                    )
                  }
                }

                Error.stackTraceLimit = limit
                _this.generatedMessage = !message
                Object.defineProperty(_assertThisInitialized(_this), 'name', {
                  value: 'AssertionError [ERR_ASSERTION]',
                  enumerable: false,
                  writable: true,
                  configurable: true,
                })
                _this.code = 'ERR_ASSERTION'
                _this.actual = actual
                _this.expected = expected
                _this.operator = operator

                if (Error.captureStackTrace) {
                  // eslint-disable-next-line no-restricted-syntax
                  Error.captureStackTrace(
                    _assertThisInitialized(_this),
                    stackStartFn
                  )
                } // Create error message including the error code in the name.

                _this.stack // Reset the name.

                _this.name = 'AssertionError'
                return _possibleConstructorReturn(_this)
              }

              _createClass(AssertionError, [
                {
                  key: 'toString',
                  value: function toString() {
                    return ''
                      .concat(this.name, ' [')
                      .concat(this.code, ']: ')
                      .concat(this.message)
                  },
                },
                {
                  key: inspect.custom,
                  value: function value(recurseTimes, ctx) {
                    // This limits the `actual` and `expected` property default inspection to
                    // the minimum depth. Otherwise those values would be too verbose compared
                    // to the actual error message which contains a combined view of these two
                    // input values.
                    return inspect(
                      this,
                      _objectSpread({}, ctx, {
                        customInspect: false,
                        depth: 0,
                      })
                    )
                  },
                },
              ])

              return AssertionError
            })(_wrapNativeSuper(Error))

          module.exports = AssertionError

          /***/
        },

      /***/ './node_modules/assert/build/internal/errors.js':
        /*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'
          // Currently in sync with Node.js lib/internal/errors.js
          // https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

          /* eslint node-core/documented-errors: "error" */

          /* eslint node-core/alphabetize-errors: "error" */

          /* eslint node-core/prefer-util-format-errors: "error" */
          // The whole point behind this internal module is to allow Node.js to no
          // longer be forced to treat every error message change as a semver-major
          // change. The NodeError classes here all expose a `code` property whose
          // value statically and permanently identifies the error. While the error
          // message may change, the code should not.

          function _typeof(obj) {
            if (
              typeof Symbol === 'function' &&
              typeof Symbol.iterator === 'symbol'
            ) {
              _typeof = function _typeof(obj) {
                return typeof obj
              }
            } else {
              _typeof = function _typeof(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj
              }
            }
            return _typeof(obj)
          }

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError('Cannot call a class as a function')
            }
          }

          function _possibleConstructorReturn(self, call) {
            if (
              call &&
              (_typeof(call) === 'object' || typeof call === 'function')
            ) {
              return call
            }
            return _assertThisInitialized(self)
          }

          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              )
            }
            return self
          }

          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function _getPrototypeOf(o) {
                  return o.__proto__ || Object.getPrototypeOf(o)
                }
            return _getPrototypeOf(o)
          }

          function _inherits(subClass, superClass) {
            if (typeof superClass !== 'function' && superClass !== null) {
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            }
            subClass.prototype = Object.create(
              superClass && superClass.prototype,
              {
                constructor: {
                  value: subClass,
                  writable: true,
                  configurable: true,
                },
              }
            )
            if (superClass) _setPrototypeOf(subClass, superClass)
          }

          function _setPrototypeOf(o, p) {
            _setPrototypeOf =
              Object.setPrototypeOf ||
              function _setPrototypeOf(o, p) {
                o.__proto__ = p
                return o
              }
            return _setPrototypeOf(o, p)
          }

          var codes = {} // Lazy loaded

          var assert
          var util

          function createErrorType(code, message, Base) {
            if (!Base) {
              Base = Error
            }

            function getMessage(arg1, arg2, arg3) {
              if (typeof message === 'string') {
                return message
              } else {
                return message(arg1, arg2, arg3)
              }
            }

            var NodeError =
              /*#__PURE__*/
              (function (_Base) {
                _inherits(NodeError, _Base)

                function NodeError(arg1, arg2, arg3) {
                  var _this

                  _classCallCheck(this, NodeError)

                  _this = _possibleConstructorReturn(
                    this,
                    _getPrototypeOf(NodeError).call(
                      this,
                      getMessage(arg1, arg2, arg3)
                    )
                  )
                  _this.code = code
                  return _this
                }

                return NodeError
              })(Base)

            codes[code] = NodeError
          } // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js

          function oneOf(expected, thing) {
            if (Array.isArray(expected)) {
              var len = expected.length
              expected = expected.map(function (i) {
                return String(i)
              })

              if (len > 2) {
                return (
                  'one of '
                    .concat(thing, ' ')
                    .concat(expected.slice(0, len - 1).join(', '), ', or ') +
                  expected[len - 1]
                )
              } else if (len === 2) {
                return 'one of '
                  .concat(thing, ' ')
                  .concat(expected[0], ' or ')
                  .concat(expected[1])
              } else {
                return 'of '.concat(thing, ' ').concat(expected[0])
              }
            } else {
              return 'of '.concat(thing, ' ').concat(String(expected))
            }
          } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith

          function startsWith(str, search, pos) {
            return (
              str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search
            )
          } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith

          function endsWith(str, search, this_len) {
            if (this_len === undefined || this_len > str.length) {
              this_len = str.length
            }

            return str.substring(this_len - search.length, this_len) === search
          } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes

          function includes(str, search, start) {
            if (typeof start !== 'number') {
              start = 0
            }

            if (start + search.length > str.length) {
              return false
            } else {
              return str.indexOf(search, start) !== -1
            }
          }

          createErrorType(
            'ERR_AMBIGUOUS_ARGUMENT',
            'The "%s" argument is ambiguous. %s',
            TypeError
          )
          createErrorType(
            'ERR_INVALID_ARG_TYPE',
            function (name, expected, actual) {
              if (assert === undefined)
                assert = __webpack_require__(
                  /*! ../assert */ './node_modules/assert/build/assert.js'
                )
              assert(typeof name === 'string', "'name' must be a string") // determiner: 'must be' or 'must not be'

              var determiner

              if (
                typeof expected === 'string' &&
                startsWith(expected, 'not ')
              ) {
                determiner = 'must not be'
                expected = expected.replace(/^not /, '')
              } else {
                determiner = 'must be'
              }

              var msg

              if (endsWith(name, ' argument')) {
                // For cases like 'first argument'
                msg = 'The '
                  .concat(name, ' ')
                  .concat(determiner, ' ')
                  .concat(oneOf(expected, 'type'))
              } else {
                var type = includes(name, '.') ? 'property' : 'argument'
                msg = 'The "'
                  .concat(name, '" ')
                  .concat(type, ' ')
                  .concat(determiner, ' ')
                  .concat(oneOf(expected, 'type'))
              } // TODO(BridgeAR): Improve the output by showing `null` and similar.

              msg += '. Received type '.concat(_typeof(actual))
              return msg
            },
            TypeError
          )
          createErrorType(
            'ERR_INVALID_ARG_VALUE',
            function (name, value) {
              var reason =
                arguments.length > 2 && arguments[2] !== undefined
                  ? arguments[2]
                  : 'is invalid'
              if (util === undefined)
                util = __webpack_require__(
                  /*! util/ */ './node_modules/util/util.js'
                )
              var inspected = util.inspect(value)

              if (inspected.length > 128) {
                inspected = ''.concat(inspected.slice(0, 128), '...')
              }

              return "The argument '"
                .concat(name, "' ")
                .concat(reason, '. Received ')
                .concat(inspected)
            },
            TypeError,
            RangeError
          )
          createErrorType(
            'ERR_INVALID_RETURN_VALUE',
            function (input, name, value) {
              var type

              if (value && value.constructor && value.constructor.name) {
                type = 'instance of '.concat(value.constructor.name)
              } else {
                type = 'type '.concat(_typeof(value))
              }

              return (
                'Expected '
                  .concat(input, ' to be returned from the "')
                  .concat(name, '"') + ' function but got '.concat(type, '.')
              )
            },
            TypeError
          )
          createErrorType(
            'ERR_MISSING_ARGS',
            function () {
              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                args[_key] = arguments[_key]
              }

              if (assert === undefined)
                assert = __webpack_require__(
                  /*! ../assert */ './node_modules/assert/build/assert.js'
                )
              assert(args.length > 0, 'At least one arg needs to be specified')
              var msg = 'The '
              var len = args.length
              args = args.map(function (a) {
                return '"'.concat(a, '"')
              })

              switch (len) {
                case 1:
                  msg += ''.concat(args[0], ' argument')
                  break

                case 2:
                  msg += ''
                    .concat(args[0], ' and ')
                    .concat(args[1], ' arguments')
                  break

                default:
                  msg += args.slice(0, len - 1).join(', ')
                  msg += ', and '.concat(args[len - 1], ' arguments')
                  break
              }

              return ''.concat(msg, ' must be specified')
            },
            TypeError
          )
          module.exports.codes = codes

          /***/
        },

      /***/ './node_modules/assert/build/internal/util/comparisons.js':
        /*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'
          // Currently in sync with Node.js lib/internal/util/comparisons.js
          // https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

          function _slicedToArray(arr, i) {
            return (
              _arrayWithHoles(arr) ||
              _iterableToArrayLimit(arr, i) ||
              _nonIterableRest()
            )
          }

          function _nonIterableRest() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance'
            )
          }

          function _iterableToArrayLimit(arr, i) {
            var _arr = []
            var _n = true
            var _d = false
            var _e = undefined
            try {
              for (
                var _i = arr[Symbol.iterator](), _s;
                !(_n = (_s = _i.next()).done);
                _n = true
              ) {
                _arr.push(_s.value)
                if (i && _arr.length === i) break
              }
            } catch (err) {
              _d = true
              _e = err
            } finally {
              try {
                if (!_n && _i['return'] != null) _i['return']()
              } finally {
                if (_d) throw _e
              }
            }
            return _arr
          }

          function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr
          }

          function _typeof(obj) {
            if (
              typeof Symbol === 'function' &&
              typeof Symbol.iterator === 'symbol'
            ) {
              _typeof = function _typeof(obj) {
                return typeof obj
              }
            } else {
              _typeof = function _typeof(obj) {
                return obj &&
                  typeof Symbol === 'function' &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj
              }
            }
            return _typeof(obj)
          }

          var regexFlagsSupported = /a/g.flags !== undefined

          var arrayFromSet = function arrayFromSet(set) {
            var array = []
            set.forEach(function (value) {
              return array.push(value)
            })
            return array
          }

          var arrayFromMap = function arrayFromMap(map) {
            var array = []
            map.forEach(function (value, key) {
              return array.push([key, value])
            })
            return array
          }

          var objectIs = Object.is
            ? Object.is
            : __webpack_require__(
                /*! object-is */ './node_modules/object-is/index.js'
              )
          var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols
            ? Object.getOwnPropertySymbols
            : function () {
                return []
              }
          var numberIsNaN = Number.isNaN
            ? Number.isNaN
            : __webpack_require__(
                /*! is-nan */ './node_modules/is-nan/index.js'
              )

          function uncurryThis(f) {
            return f.call.bind(f)
          }

          var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty)
          var propertyIsEnumerable = uncurryThis(
            Object.prototype.propertyIsEnumerable
          )
          var objectToString = uncurryThis(Object.prototype.toString)

          var _require$types = __webpack_require__(
              /*! util/ */ './node_modules/util/util.js'
            ).types,
            isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
            isArrayBufferView = _require$types.isArrayBufferView,
            isDate = _require$types.isDate,
            isMap = _require$types.isMap,
            isRegExp = _require$types.isRegExp,
            isSet = _require$types.isSet,
            isNativeError = _require$types.isNativeError,
            isBoxedPrimitive = _require$types.isBoxedPrimitive,
            isNumberObject = _require$types.isNumberObject,
            isStringObject = _require$types.isStringObject,
            isBooleanObject = _require$types.isBooleanObject,
            isBigIntObject = _require$types.isBigIntObject,
            isSymbolObject = _require$types.isSymbolObject,
            isFloat32Array = _require$types.isFloat32Array,
            isFloat64Array = _require$types.isFloat64Array

          function isNonIndex(key) {
            if (key.length === 0 || key.length > 10) return true

            for (var i = 0; i < key.length; i++) {
              var code = key.charCodeAt(i)
              if (code < 48 || code > 57) return true
            } // The maximum size for an array is 2 ** 32 -1.

            return key.length === 10 && key >= Math.pow(2, 32)
          }

          function getOwnNonIndexProperties(value) {
            return Object.keys(value)
              .filter(isNonIndex)
              .concat(
                objectGetOwnPropertySymbols(value).filter(
                  Object.prototype.propertyIsEnumerable.bind(value)
                )
              )
          } // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
          // original notice:

          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
           * @license  MIT
           */

          function compare(a, b) {
            if (a === b) {
              return 0
            }

            var x = a.length
            var y = b.length

            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i]
                y = b[i]
                break
              }
            }

            if (x < y) {
              return -1
            }

            if (y < x) {
              return 1
            }

            return 0
          }

          var ONLY_ENUMERABLE = undefined
          var kStrict = true
          var kLoose = false
          var kNoIterator = 0
          var kIsArray = 1
          var kIsSet = 2
          var kIsMap = 3 // Check if they have the same source and flags

          function areSimilarRegExps(a, b) {
            return regexFlagsSupported
              ? a.source === b.source && a.flags === b.flags
              : RegExp.prototype.toString.call(a) ===
                  RegExp.prototype.toString.call(b)
          }

          function areSimilarFloatArrays(a, b) {
            if (a.byteLength !== b.byteLength) {
              return false
            }

            for (var offset = 0; offset < a.byteLength; offset++) {
              if (a[offset] !== b[offset]) {
                return false
              }
            }

            return true
          }

          function areSimilarTypedArrays(a, b) {
            if (a.byteLength !== b.byteLength) {
              return false
            }

            return (
              compare(
                new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
                new Uint8Array(b.buffer, b.byteOffset, b.byteLength)
              ) === 0
            )
          }

          function areEqualArrayBuffers(buf1, buf2) {
            return (
              buf1.byteLength === buf2.byteLength &&
              compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0
            )
          }

          function isEqualBoxedPrimitive(val1, val2) {
            if (isNumberObject(val1)) {
              return (
                isNumberObject(val2) &&
                objectIs(
                  Number.prototype.valueOf.call(val1),
                  Number.prototype.valueOf.call(val2)
                )
              )
            }

            if (isStringObject(val1)) {
              return (
                isStringObject(val2) &&
                String.prototype.valueOf.call(val1) ===
                  String.prototype.valueOf.call(val2)
              )
            }

            if (isBooleanObject(val1)) {
              return (
                isBooleanObject(val2) &&
                Boolean.prototype.valueOf.call(val1) ===
                  Boolean.prototype.valueOf.call(val2)
              )
            }

            if (isBigIntObject(val1)) {
              return (
                isBigIntObject(val2) &&
                BigInt.prototype.valueOf.call(val1) ===
                  BigInt.prototype.valueOf.call(val2)
              )
            }

            return (
              isSymbolObject(val2) &&
              Symbol.prototype.valueOf.call(val1) ===
                Symbol.prototype.valueOf.call(val2)
            )
          } // Notes: Type tags are historical [[Class]] properties that can be set by
          // FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
          // and retrieved using Object.prototype.toString.call(obj) in JS
          // See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
          // for a list of tags pre-defined in the spec.
          // There are some unspecified tags in the wild too (e.g. typed array tags).
          // Since tags can be altered, they only serve fast failures
          //
          // Typed arrays and buffers are checked by comparing the content in their
          // underlying ArrayBuffer. This optimization requires that it's
          // reasonable to interpret their underlying memory in the same way,
          // which is checked by comparing their type tags.
          // (e.g. a Uint8Array and a Uint16Array with the same memory content
          // could still be different because they will be interpreted differently).
          //
          // For strict comparison, objects should have
          // a) The same built-in type tags
          // b) The same prototypes.

          function innerDeepEqual(val1, val2, strict, memos) {
            // All identical values are equivalent, as determined by ===.
            if (val1 === val2) {
              if (val1 !== 0) return true
              return strict ? objectIs(val1, val2) : true
            } // Check more closely if val1 and val2 are equal.

            if (strict) {
              if (_typeof(val1) !== 'object') {
                return (
                  typeof val1 === 'number' &&
                  numberIsNaN(val1) &&
                  numberIsNaN(val2)
                )
              }

              if (
                _typeof(val2) !== 'object' ||
                val1 === null ||
                val2 === null
              ) {
                return false
              }

              if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
                return false
              }
            } else {
              if (val1 === null || _typeof(val1) !== 'object') {
                if (val2 === null || _typeof(val2) !== 'object') {
                  // eslint-disable-next-line eqeqeq
                  return val1 == val2
                }

                return false
              }

              if (val2 === null || _typeof(val2) !== 'object') {
                return false
              }
            }

            var val1Tag = objectToString(val1)
            var val2Tag = objectToString(val2)

            if (val1Tag !== val2Tag) {
              return false
            }

            if (Array.isArray(val1)) {
              // Check for sparse arrays and general fast path
              if (val1.length !== val2.length) {
                return false
              }

              var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE)
              var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE)

              if (keys1.length !== keys2.length) {
                return false
              }

              return keyCheck(val1, val2, strict, memos, kIsArray, keys1)
            } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
            // wan't to early return out of the rest of the checks. However we can check
            // if the second value is one of these values and the first isn't.

            if (val1Tag === '[object Object]') {
              // return keyCheck(val1, val2, strict, memos, kNoIterator);
              if (
                (!isMap(val1) && isMap(val2)) ||
                (!isSet(val1) && isSet(val2))
              ) {
                return false
              }
            }

            if (isDate(val1)) {
              if (
                !isDate(val2) ||
                Date.prototype.getTime.call(val1) !==
                  Date.prototype.getTime.call(val2)
              ) {
                return false
              }
            } else if (isRegExp(val1)) {
              if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
                return false
              }
            } else if (isNativeError(val1) || val1 instanceof Error) {
              // Do not compare the stack as it might differ even though the error itself
              // is otherwise identical.
              if (val1.message !== val2.message || val1.name !== val2.name) {
                return false
              }
            } else if (isArrayBufferView(val1)) {
              if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
                if (!areSimilarFloatArrays(val1, val2)) {
                  return false
                }
              } else if (!areSimilarTypedArrays(val1, val2)) {
                return false
              } // Buffer.compare returns true, so val1.length === val2.length. If they both
              // only contain numeric keys, we don't need to exam further than checking
              // the symbols.

              var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE)

              var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE)

              if (_keys.length !== _keys2.length) {
                return false
              }

              return keyCheck(val1, val2, strict, memos, kNoIterator, _keys)
            } else if (isSet(val1)) {
              if (!isSet(val2) || val1.size !== val2.size) {
                return false
              }

              return keyCheck(val1, val2, strict, memos, kIsSet)
            } else if (isMap(val1)) {
              if (!isMap(val2) || val1.size !== val2.size) {
                return false
              }

              return keyCheck(val1, val2, strict, memos, kIsMap)
            } else if (isAnyArrayBuffer(val1)) {
              if (!areEqualArrayBuffers(val1, val2)) {
                return false
              }
            } else if (
              isBoxedPrimitive(val1) &&
              !isEqualBoxedPrimitive(val1, val2)
            ) {
              return false
            }

            return keyCheck(val1, val2, strict, memos, kNoIterator)
          }

          function getEnumerables(val, keys) {
            return keys.filter(function (k) {
              return propertyIsEnumerable(val, k)
            })
          }

          function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
            // For all remaining Object pairs, including Array, objects and Maps,
            // equivalence is determined by having:
            // a) The same number of owned enumerable properties
            // b) The same set of keys/indexes (although not necessarily the same order)
            // c) Equivalent values for every corresponding key/index
            // d) For Sets and Maps, equal contents
            // Note: this accounts for both named and indexed properties on Arrays.
            if (arguments.length === 5) {
              aKeys = Object.keys(val1)
              var bKeys = Object.keys(val2) // The pair must have the same number of owned properties.

              if (aKeys.length !== bKeys.length) {
                return false
              }
            } // Cheap key test

            var i = 0

            for (; i < aKeys.length; i++) {
              if (!hasOwnProperty(val2, aKeys[i])) {
                return false
              }
            }

            if (strict && arguments.length === 5) {
              var symbolKeysA = objectGetOwnPropertySymbols(val1)

              if (symbolKeysA.length !== 0) {
                var count = 0

                for (i = 0; i < symbolKeysA.length; i++) {
                  var key = symbolKeysA[i]

                  if (propertyIsEnumerable(val1, key)) {
                    if (!propertyIsEnumerable(val2, key)) {
                      return false
                    }

                    aKeys.push(key)
                    count++
                  } else if (propertyIsEnumerable(val2, key)) {
                    return false
                  }
                }

                var symbolKeysB = objectGetOwnPropertySymbols(val2)

                if (
                  symbolKeysA.length !== symbolKeysB.length &&
                  getEnumerables(val2, symbolKeysB).length !== count
                ) {
                  return false
                }
              } else {
                var _symbolKeysB = objectGetOwnPropertySymbols(val2)

                if (
                  _symbolKeysB.length !== 0 &&
                  getEnumerables(val2, _symbolKeysB).length !== 0
                ) {
                  return false
                }
              }
            }

            if (
              aKeys.length === 0 &&
              (iterationType === kNoIterator ||
                (iterationType === kIsArray && val1.length === 0) ||
                val1.size === 0)
            ) {
              return true
            } // Use memos to handle cycles.

            if (memos === undefined) {
              memos = {
                val1: new Map(),
                val2: new Map(),
                position: 0,
              }
            } else {
              // We prevent up to two map.has(x) calls by directly retrieving the value
              // and checking for undefined. The map can only contain numbers, so it is
              // safe to check for undefined only.
              var val2MemoA = memos.val1.get(val1)

              if (val2MemoA !== undefined) {
                var val2MemoB = memos.val2.get(val2)

                if (val2MemoB !== undefined) {
                  return val2MemoA === val2MemoB
                }
              }

              memos.position++
            }

            memos.val1.set(val1, memos.position)
            memos.val2.set(val2, memos.position)
            var areEq = objEquiv(
              val1,
              val2,
              strict,
              aKeys,
              memos,
              iterationType
            )
            memos.val1.delete(val1)
            memos.val2.delete(val2)
            return areEq
          }

          function setHasEqualElement(set, val1, strict, memo) {
            // Go looking.
            var setValues = arrayFromSet(set)

            for (var i = 0; i < setValues.length; i++) {
              var val2 = setValues[i]

              if (innerDeepEqual(val1, val2, strict, memo)) {
                // Remove the matching element to make sure we do not check that again.
                set.delete(val2)
                return true
              }
            }

            return false
          } // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
          // Sadly it is not possible to detect corresponding values properly in case the
          // type is a string, number, bigint or boolean. The reason is that those values
          // can match lots of different string values (e.g., 1n == '+00001').

          function findLooseMatchingPrimitives(prim) {
            switch (_typeof(prim)) {
              case 'undefined':
                return null

              case 'object':
                // Only pass in null as object!
                return undefined

              case 'symbol':
                return false

              case 'string':
                prim = +prim
              // Loose equal entries exist only if the string is possible to convert to
              // a regular number and not NaN.
              // Fall through

              case 'number':
                if (numberIsNaN(prim)) {
                  return false
                }
            }

            return true
          }

          function setMightHaveLoosePrim(a, b, prim) {
            var altValue = findLooseMatchingPrimitives(prim)
            if (altValue != null) return altValue
            return b.has(altValue) && !a.has(altValue)
          }

          function mapMightHaveLoosePrim(a, b, prim, item, memo) {
            var altValue = findLooseMatchingPrimitives(prim)

            if (altValue != null) {
              return altValue
            }

            var curB = b.get(altValue)

            if (
              (curB === undefined && !b.has(altValue)) ||
              !innerDeepEqual(item, curB, false, memo)
            ) {
              return false
            }

            return !a.has(altValue) && innerDeepEqual(item, curB, false, memo)
          }

          function setEquiv(a, b, strict, memo) {
            // This is a lazily initiated Set of entries which have to be compared
            // pairwise.
            var set = null
            var aValues = arrayFromSet(a)

            for (var i = 0; i < aValues.length; i++) {
              var val = aValues[i] // Note: Checking for the objects first improves the performance for object
              // heavy sets but it is a minor slow down for primitives. As they are fast
              // to check this improves the worst case scenario instead.

              if (_typeof(val) === 'object' && val !== null) {
                if (set === null) {
                  set = new Set()
                } // If the specified value doesn't exist in the second set its an not null
                // object (or non strict only: a not matching primitive) we'll need to go
                // hunting for something thats deep-(strict-)equal to it. To make this
                // O(n log n) complexity we have to copy these values in a new set first.

                set.add(val)
              } else if (!b.has(val)) {
                if (strict) return false // Fast path to detect missing string, symbol, undefined and null values.

                if (!setMightHaveLoosePrim(a, b, val)) {
                  return false
                }

                if (set === null) {
                  set = new Set()
                }

                set.add(val)
              }
            }

            if (set !== null) {
              var bValues = arrayFromSet(b)

              for (var _i = 0; _i < bValues.length; _i++) {
                var _val = bValues[_i] // We have to check if a primitive value is already
                // matching and only if it's not, go hunting for it.

                if (_typeof(_val) === 'object' && _val !== null) {
                  if (!setHasEqualElement(set, _val, strict, memo)) return false
                } else if (
                  !strict &&
                  !a.has(_val) &&
                  !setHasEqualElement(set, _val, strict, memo)
                ) {
                  return false
                }
              }

              return set.size === 0
            }

            return true
          }

          function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
            // To be able to handle cases like:
            //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
            // ... we need to consider *all* matching keys, not just the first we find.
            var setValues = arrayFromSet(set)

            for (var i = 0; i < setValues.length; i++) {
              var key2 = setValues[i]

              if (
                innerDeepEqual(key1, key2, strict, memo) &&
                innerDeepEqual(item1, map.get(key2), strict, memo)
              ) {
                set.delete(key2)
                return true
              }
            }

            return false
          }

          function mapEquiv(a, b, strict, memo) {
            var set = null
            var aEntries = arrayFromMap(a)

            for (var i = 0; i < aEntries.length; i++) {
              var _aEntries$i = _slicedToArray(aEntries[i], 2),
                key = _aEntries$i[0],
                item1 = _aEntries$i[1]

              if (_typeof(key) === 'object' && key !== null) {
                if (set === null) {
                  set = new Set()
                }

                set.add(key)
              } else {
                // By directly retrieving the value we prevent another b.has(key) check in
                // almost all possible cases.
                var item2 = b.get(key)

                if (
                  (item2 === undefined && !b.has(key)) ||
                  !innerDeepEqual(item1, item2, strict, memo)
                ) {
                  if (strict) return false // Fast path to detect missing string, symbol, undefined and null
                  // keys.

                  if (!mapMightHaveLoosePrim(a, b, key, item1, memo))
                    return false

                  if (set === null) {
                    set = new Set()
                  }

                  set.add(key)
                }
              }
            }

            if (set !== null) {
              var bEntries = arrayFromMap(b)

              for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
                var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
                  key = _bEntries$_i[0],
                  item = _bEntries$_i[1]

                if (_typeof(key) === 'object' && key !== null) {
                  if (!mapHasEqualEntry(set, a, key, item, strict, memo))
                    return false
                } else if (
                  !strict &&
                  (!a.has(key) ||
                    !innerDeepEqual(a.get(key), item, false, memo)) &&
                  !mapHasEqualEntry(set, a, key, item, false, memo)
                ) {
                  return false
                }
              }

              return set.size === 0
            }

            return true
          }

          function objEquiv(a, b, strict, keys, memos, iterationType) {
            // Sets and maps don't have their entries accessible via normal object
            // properties.
            var i = 0

            if (iterationType === kIsSet) {
              if (!setEquiv(a, b, strict, memos)) {
                return false
              }
            } else if (iterationType === kIsMap) {
              if (!mapEquiv(a, b, strict, memos)) {
                return false
              }
            } else if (iterationType === kIsArray) {
              for (; i < a.length; i++) {
                if (hasOwnProperty(a, i)) {
                  if (
                    !hasOwnProperty(b, i) ||
                    !innerDeepEqual(a[i], b[i], strict, memos)
                  ) {
                    return false
                  }
                } else if (hasOwnProperty(b, i)) {
                  return false
                } else {
                  // Array is sparse.
                  var keysA = Object.keys(a)

                  for (; i < keysA.length; i++) {
                    var key = keysA[i]

                    if (
                      !hasOwnProperty(b, key) ||
                      !innerDeepEqual(a[key], b[key], strict, memos)
                    ) {
                      return false
                    }
                  }

                  if (keysA.length !== Object.keys(b).length) {
                    return false
                  }

                  return true
                }
              }
            } // The pair must have equivalent values for every corresponding key.
            // Possibly expensive deep test:

            for (i = 0; i < keys.length; i++) {
              var _key = keys[i]

              if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
                return false
              }
            }

            return true
          }

          function isDeepEqual(val1, val2) {
            return innerDeepEqual(val1, val2, kLoose)
          }

          function isDeepStrictEqual(val1, val2) {
            return innerDeepEqual(val1, val2, kStrict)
          }

          module.exports = {
            isDeepEqual: isDeepEqual,
            isDeepStrictEqual: isDeepStrictEqual,
          }

          /***/
        },

      /***/ './node_modules/available-typed-arrays/index.js':
        /*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var filter = __webpack_require__(
            /*! array-filter */ './node_modules/array-filter/index.js'
          )

          module.exports = function availableTypedArrays() {
            return filter(
              [
                'BigInt64Array',
                'BigUint64Array',
                'Float32Array',
                'Float64Array',
                'Int16Array',
                'Int32Array',
                'Int8Array',
                'Uint16Array',
                'Uint32Array',
                'Uint8Array',
                'Uint8ClampedArray',
              ],
              function (typedArray) {
                return typeof __webpack_require__.g[typedArray] === 'function'
              }
            )
          }

          /***/
        },

      /***/ './node_modules/axios/index.js':
        /*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          module.exports = __webpack_require__(
            /*! ./lib/axios */ './node_modules/axios/lib/axios.js'
          )

          /***/
        },

      /***/ './node_modules/axios/lib/adapters/xhr.js':
        /*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )
          var settle = __webpack_require__(
            /*! ./../core/settle */ './node_modules/axios/lib/core/settle.js'
          )
          var cookies = __webpack_require__(
            /*! ./../helpers/cookies */ './node_modules/axios/lib/helpers/cookies.js'
          )
          var buildURL = __webpack_require__(
            /*! ./../helpers/buildURL */ './node_modules/axios/lib/helpers/buildURL.js'
          )
          var buildFullPath = __webpack_require__(
            /*! ../core/buildFullPath */ './node_modules/axios/lib/core/buildFullPath.js'
          )
          var parseHeaders = __webpack_require__(
            /*! ./../helpers/parseHeaders */ './node_modules/axios/lib/helpers/parseHeaders.js'
          )
          var isURLSameOrigin = __webpack_require__(
            /*! ./../helpers/isURLSameOrigin */ './node_modules/axios/lib/helpers/isURLSameOrigin.js'
          )
          var createError = __webpack_require__(
            /*! ../core/createError */ './node_modules/axios/lib/core/createError.js'
          )

          module.exports = function xhrAdapter(config) {
            return new Promise(function dispatchXhrRequest(resolve, reject) {
              var requestData = config.data
              var requestHeaders = config.headers

              if (utils.isFormData(requestData)) {
                delete requestHeaders['Content-Type'] // Let the browser set it
              }

              var request = new XMLHttpRequest()

              // HTTP basic authentication
              if (config.auth) {
                var username = config.auth.username || ''
                var password = config.auth.password
                  ? unescape(encodeURIComponent(config.auth.password))
                  : ''
                requestHeaders.Authorization =
                  'Basic ' + btoa(username + ':' + password)
              }

              var fullPath = buildFullPath(config.baseURL, config.url)
              request.open(
                config.method.toUpperCase(),
                buildURL(fullPath, config.params, config.paramsSerializer),
                true
              )

              // Set the request timeout in MS
              request.timeout = config.timeout

              // Listen for ready state
              request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                  return
                }

                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (
                  request.status === 0 &&
                  !(
                    request.responseURL &&
                    request.responseURL.indexOf('file:') === 0
                  )
                ) {
                  return
                }

                // Prepare the response
                var responseHeaders =
                  'getAllResponseHeaders' in request
                    ? parseHeaders(request.getAllResponseHeaders())
                    : null
                var responseData =
                  !config.responseType || config.responseType === 'text'
                    ? request.responseText
                    : request.response
                var response = {
                  data: responseData,
                  status: request.status,
                  statusText: request.statusText,
                  headers: responseHeaders,
                  config: config,
                  request: request,
                }

                settle(resolve, reject, response)

                // Clean up request
                request = null
              }

              // Handle browser request cancellation (as opposed to a manual cancellation)
              request.onabort = function handleAbort() {
                if (!request) {
                  return
                }

                reject(
                  createError(
                    'Request aborted',
                    config,
                    'ECONNABORTED',
                    request
                  )
                )

                // Clean up request
                request = null
              }

              // Handle low level network errors
              request.onerror = function handleError() {
                // Real errors are hidden from us by the browser
                // onerror should only fire if it's a network error
                reject(createError('Network Error', config, null, request))

                // Clean up request
                request = null
              }

              // Handle timeout
              request.ontimeout = function handleTimeout() {
                var timeoutErrorMessage =
                  'timeout of ' + config.timeout + 'ms exceeded'
                if (config.timeoutErrorMessage) {
                  timeoutErrorMessage = config.timeoutErrorMessage
                }
                reject(
                  createError(
                    timeoutErrorMessage,
                    config,
                    'ECONNABORTED',
                    request
                  )
                )

                // Clean up request
                request = null
              }

              // Add xsrf header
              // This is only done if running in a standard browser environment.
              // Specifically not if we're in a web worker, or react-native.
              if (utils.isStandardBrowserEnv()) {
                // Add xsrf header
                var xsrfValue =
                  (config.withCredentials || isURLSameOrigin(fullPath)) &&
                  config.xsrfCookieName
                    ? cookies.read(config.xsrfCookieName)
                    : undefined

                if (xsrfValue) {
                  requestHeaders[config.xsrfHeaderName] = xsrfValue
                }
              }

              // Add headers to the request
              if ('setRequestHeader' in request) {
                utils.forEach(
                  requestHeaders,
                  function setRequestHeader(val, key) {
                    if (
                      typeof requestData === 'undefined' &&
                      key.toLowerCase() === 'content-type'
                    ) {
                      // Remove Content-Type if data is undefined
                      delete requestHeaders[key]
                    } else {
                      // Otherwise add header to the request
                      request.setRequestHeader(key, val)
                    }
                  }
                )
              }

              // Add withCredentials to request if needed
              if (!utils.isUndefined(config.withCredentials)) {
                request.withCredentials = !!config.withCredentials
              }

              // Add responseType to request if needed
              if (config.responseType) {
                try {
                  request.responseType = config.responseType
                } catch (e) {
                  // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                  // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                  if (config.responseType !== 'json') {
                    throw e
                  }
                }
              }

              // Handle progress if needed
              if (typeof config.onDownloadProgress === 'function') {
                request.addEventListener('progress', config.onDownloadProgress)
              }

              // Not all browsers support upload events
              if (
                typeof config.onUploadProgress === 'function' &&
                request.upload
              ) {
                request.upload.addEventListener(
                  'progress',
                  config.onUploadProgress
                )
              }

              if (config.cancelToken) {
                // Handle cancellation
                config.cancelToken.promise.then(function onCanceled(cancel) {
                  if (!request) {
                    return
                  }

                  request.abort()
                  reject(cancel)
                  // Clean up request
                  request = null
                })
              }

              if (!requestData) {
                requestData = null
              }

              // Send the request
              request.send(requestData)
            })
          }

          /***/
        },

      /***/ './node_modules/axios/lib/axios.js':
        /*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./utils */ './node_modules/axios/lib/utils.js'
          )
          var bind = __webpack_require__(
            /*! ./helpers/bind */ './node_modules/axios/lib/helpers/bind.js'
          )
          var Axios = __webpack_require__(
            /*! ./core/Axios */ './node_modules/axios/lib/core/Axios.js'
          )
          var mergeConfig = __webpack_require__(
            /*! ./core/mergeConfig */ './node_modules/axios/lib/core/mergeConfig.js'
          )
          var defaults = __webpack_require__(
            /*! ./defaults */ './node_modules/axios/lib/defaults.js'
          )

          /**
           * Create an instance of Axios
           *
           * @param {Object} defaultConfig The default config for the instance
           * @return {Axios} A new instance of Axios
           */
          function createInstance(defaultConfig) {
            var context = new Axios(defaultConfig)
            var instance = bind(Axios.prototype.request, context)

            // Copy axios.prototype to instance
            utils.extend(instance, Axios.prototype, context)

            // Copy context to instance
            utils.extend(instance, context)

            return instance
          }

          // Create the default instance to be exported
          var axios = createInstance(defaults)

          // Expose Axios class to allow class inheritance
          axios.Axios = Axios

          // Factory for creating new instances
          axios.create = function create(instanceConfig) {
            return createInstance(mergeConfig(axios.defaults, instanceConfig))
          }

          // Expose Cancel & CancelToken
          axios.Cancel = __webpack_require__(
            /*! ./cancel/Cancel */ './node_modules/axios/lib/cancel/Cancel.js'
          )
          axios.CancelToken = __webpack_require__(
            /*! ./cancel/CancelToken */ './node_modules/axios/lib/cancel/CancelToken.js'
          )
          axios.isCancel = __webpack_require__(
            /*! ./cancel/isCancel */ './node_modules/axios/lib/cancel/isCancel.js'
          )

          // Expose all/spread
          axios.all = function all(promises) {
            return Promise.all(promises)
          }
          axios.spread = __webpack_require__(
            /*! ./helpers/spread */ './node_modules/axios/lib/helpers/spread.js'
          )

          // Expose isAxiosError
          axios.isAxiosError = __webpack_require__(
            /*! ./helpers/isAxiosError */ './node_modules/axios/lib/helpers/isAxiosError.js'
          )

          module.exports = axios

          // Allow use of default import syntax in TypeScript
          module.exports.default = axios

          /***/
        },

      /***/ './node_modules/axios/lib/cancel/Cancel.js':
        /*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * A `Cancel` is an object that is thrown when an operation is canceled.
           *
           * @class
           * @param {string=} message The message.
           */
          function Cancel(message) {
            this.message = message
          }

          Cancel.prototype.toString = function toString() {
            return 'Cancel' + (this.message ? ': ' + this.message : '')
          }

          Cancel.prototype.__CANCEL__ = true

          module.exports = Cancel

          /***/
        },

      /***/ './node_modules/axios/lib/cancel/CancelToken.js':
        /*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var Cancel = __webpack_require__(
            /*! ./Cancel */ './node_modules/axios/lib/cancel/Cancel.js'
          )

          /**
           * A `CancelToken` is an object that can be used to request cancellation of an operation.
           *
           * @class
           * @param {Function} executor The executor function.
           */
          function CancelToken(executor) {
            if (typeof executor !== 'function') {
              throw new TypeError('executor must be a function.')
            }

            var resolvePromise
            this.promise = new Promise(function promiseExecutor(resolve) {
              resolvePromise = resolve
            })

            var token = this
            executor(function cancel(message) {
              if (token.reason) {
                // Cancellation has already been requested
                return
              }

              token.reason = new Cancel(message)
              resolvePromise(token.reason)
            })
          }

          /**
           * Throws a `Cancel` if cancellation has been requested.
           */
          CancelToken.prototype.throwIfRequested = function throwIfRequested() {
            if (this.reason) {
              throw this.reason
            }
          }

          /**
           * Returns an object that contains a new `CancelToken` and a function that, when called,
           * cancels the `CancelToken`.
           */
          CancelToken.source = function source() {
            var cancel
            var token = new CancelToken(function executor(c) {
              cancel = c
            })
            return {
              token: token,
              cancel: cancel,
            }
          }

          module.exports = CancelToken

          /***/
        },

      /***/ './node_modules/axios/lib/cancel/isCancel.js':
        /*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
        /***/ (module) => {
          'use strict'

          module.exports = function isCancel(value) {
            return !!(value && value.__CANCEL__)
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/Axios.js':
        /*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )
          var buildURL = __webpack_require__(
            /*! ../helpers/buildURL */ './node_modules/axios/lib/helpers/buildURL.js'
          )
          var InterceptorManager = __webpack_require__(
            /*! ./InterceptorManager */ './node_modules/axios/lib/core/InterceptorManager.js'
          )
          var dispatchRequest = __webpack_require__(
            /*! ./dispatchRequest */ './node_modules/axios/lib/core/dispatchRequest.js'
          )
          var mergeConfig = __webpack_require__(
            /*! ./mergeConfig */ './node_modules/axios/lib/core/mergeConfig.js'
          )

          /**
           * Create a new instance of Axios
           *
           * @param {Object} instanceConfig The default config for the instance
           */
          function Axios(instanceConfig) {
            this.defaults = instanceConfig
            this.interceptors = {
              request: new InterceptorManager(),
              response: new InterceptorManager(),
            }
          }

          /**
           * Dispatch a request
           *
           * @param {Object} config The config specific for this request (merged with this.defaults)
           */
          Axios.prototype.request = function request(config) {
            /*eslint no-param-reassign:0*/
            // Allow for axios('example/url'[, config]) a la fetch API
            if (typeof config === 'string') {
              config = arguments[1] || {}
              config.url = arguments[0]
            } else {
              config = config || {}
            }

            config = mergeConfig(this.defaults, config)

            // Set config.method
            if (config.method) {
              config.method = config.method.toLowerCase()
            } else if (this.defaults.method) {
              config.method = this.defaults.method.toLowerCase()
            } else {
              config.method = 'get'
            }

            // Hook up interceptors middleware
            var chain = [dispatchRequest, undefined]
            var promise = Promise.resolve(config)

            this.interceptors.request.forEach(
              function unshiftRequestInterceptors(interceptor) {
                chain.unshift(interceptor.fulfilled, interceptor.rejected)
              }
            )

            this.interceptors.response.forEach(
              function pushResponseInterceptors(interceptor) {
                chain.push(interceptor.fulfilled, interceptor.rejected)
              }
            )

            while (chain.length) {
              promise = promise.then(chain.shift(), chain.shift())
            }

            return promise
          }

          Axios.prototype.getUri = function getUri(config) {
            config = mergeConfig(this.defaults, config)
            return buildURL(
              config.url,
              config.params,
              config.paramsSerializer
            ).replace(/^\?/, '')
          }

          // Provide aliases for supported request methods
          utils.forEach(
            ['delete', 'get', 'head', 'options'],
            function forEachMethodNoData(method) {
              /*eslint func-names:0*/
              Axios.prototype[method] = function (url, config) {
                return this.request(
                  mergeConfig(config || {}, {
                    method: method,
                    url: url,
                    data: (config || {}).data,
                  })
                )
              }
            }
          )

          utils.forEach(
            ['post', 'put', 'patch'],
            function forEachMethodWithData(method) {
              /*eslint func-names:0*/
              Axios.prototype[method] = function (url, data, config) {
                return this.request(
                  mergeConfig(config || {}, {
                    method: method,
                    url: url,
                    data: data,
                  })
                )
              }
            }
          )

          module.exports = Axios

          /***/
        },

      /***/ './node_modules/axios/lib/core/InterceptorManager.js':
        /*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          function InterceptorManager() {
            this.handlers = []
          }

          /**
           * Add a new interceptor to the stack
           *
           * @param {Function} fulfilled The function to handle `then` for a `Promise`
           * @param {Function} rejected The function to handle `reject` for a `Promise`
           *
           * @return {Number} An ID used to remove interceptor later
           */
          InterceptorManager.prototype.use = function use(fulfilled, rejected) {
            this.handlers.push({
              fulfilled: fulfilled,
              rejected: rejected,
            })
            return this.handlers.length - 1
          }

          /**
           * Remove an interceptor from the stack
           *
           * @param {Number} id The ID that was returned by `use`
           */
          InterceptorManager.prototype.eject = function eject(id) {
            if (this.handlers[id]) {
              this.handlers[id] = null
            }
          }

          /**
           * Iterate over all the registered interceptors
           *
           * This method is particularly useful for skipping over any
           * interceptors that may have become `null` calling `eject`.
           *
           * @param {Function} fn The function to call for each interceptor
           */
          InterceptorManager.prototype.forEach = function forEach(fn) {
            utils.forEach(this.handlers, function forEachHandler(h) {
              if (h !== null) {
                fn(h)
              }
            })
          }

          module.exports = InterceptorManager

          /***/
        },

      /***/ './node_modules/axios/lib/core/buildFullPath.js':
        /*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var isAbsoluteURL = __webpack_require__(
            /*! ../helpers/isAbsoluteURL */ './node_modules/axios/lib/helpers/isAbsoluteURL.js'
          )
          var combineURLs = __webpack_require__(
            /*! ../helpers/combineURLs */ './node_modules/axios/lib/helpers/combineURLs.js'
          )

          /**
           * Creates a new URL by combining the baseURL with the requestedURL,
           * only when the requestedURL is not already an absolute URL.
           * If the requestURL is absolute, this function returns the requestedURL untouched.
           *
           * @param {string} baseURL The base URL
           * @param {string} requestedURL Absolute or relative URL to combine
           * @returns {string} The combined full path
           */
          module.exports = function buildFullPath(baseURL, requestedURL) {
            if (baseURL && !isAbsoluteURL(requestedURL)) {
              return combineURLs(baseURL, requestedURL)
            }
            return requestedURL
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/createError.js':
        /*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var enhanceError = __webpack_require__(
            /*! ./enhanceError */ './node_modules/axios/lib/core/enhanceError.js'
          )

          /**
           * Create an Error with the specified message, config, error code, request and response.
           *
           * @param {string} message The error message.
           * @param {Object} config The config.
           * @param {string} [code] The error code (for example, 'ECONNABORTED').
           * @param {Object} [request] The request.
           * @param {Object} [response] The response.
           * @returns {Error} The created error.
           */
          module.exports = function createError(
            message,
            config,
            code,
            request,
            response
          ) {
            var error = new Error(message)
            return enhanceError(error, config, code, request, response)
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/dispatchRequest.js':
        /*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )
          var transformData = __webpack_require__(
            /*! ./transformData */ './node_modules/axios/lib/core/transformData.js'
          )
          var isCancel = __webpack_require__(
            /*! ../cancel/isCancel */ './node_modules/axios/lib/cancel/isCancel.js'
          )
          var defaults = __webpack_require__(
            /*! ../defaults */ './node_modules/axios/lib/defaults.js'
          )

          /**
           * Throws a `Cancel` if cancellation has been requested.
           */
          function throwIfCancellationRequested(config) {
            if (config.cancelToken) {
              config.cancelToken.throwIfRequested()
            }
          }

          /**
           * Dispatch a request to the server using the configured adapter.
           *
           * @param {object} config The config that is to be used for the request
           * @returns {Promise} The Promise to be fulfilled
           */
          module.exports = function dispatchRequest(config) {
            throwIfCancellationRequested(config)

            // Ensure headers exist
            config.headers = config.headers || {}

            // Transform request data
            config.data = transformData(
              config.data,
              config.headers,
              config.transformRequest
            )

            // Flatten headers
            config.headers = utils.merge(
              config.headers.common || {},
              config.headers[config.method] || {},
              config.headers
            )

            utils.forEach(
              ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
              function cleanHeaderConfig(method) {
                delete config.headers[method]
              }
            )

            var adapter = config.adapter || defaults.adapter

            return adapter(config).then(
              function onAdapterResolution(response) {
                throwIfCancellationRequested(config)

                // Transform response data
                response.data = transformData(
                  response.data,
                  response.headers,
                  config.transformResponse
                )

                return response
              },
              function onAdapterRejection(reason) {
                if (!isCancel(reason)) {
                  throwIfCancellationRequested(config)

                  // Transform response data
                  if (reason && reason.response) {
                    reason.response.data = transformData(
                      reason.response.data,
                      reason.response.headers,
                      config.transformResponse
                    )
                  }
                }

                return Promise.reject(reason)
              }
            )
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/enhanceError.js':
        /*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Update an Error with the specified config, error code, and response.
           *
           * @param {Error} error The error to update.
           * @param {Object} config The config.
           * @param {string} [code] The error code (for example, 'ECONNABORTED').
           * @param {Object} [request] The request.
           * @param {Object} [response] The response.
           * @returns {Error} The error.
           */
          module.exports = function enhanceError(
            error,
            config,
            code,
            request,
            response
          ) {
            error.config = config
            if (code) {
              error.code = code
            }

            error.request = request
            error.response = response
            error.isAxiosError = true

            error.toJSON = function toJSON() {
              return {
                // Standard
                message: this.message,
                name: this.name,
                // Microsoft
                description: this.description,
                number: this.number,
                // Mozilla
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                // Axios
                config: this.config,
                code: this.code,
              }
            }
            return error
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/mergeConfig.js':
        /*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ../utils */ './node_modules/axios/lib/utils.js'
          )

          /**
           * Config-specific merge-function which creates a new config-object
           * by merging two configuration objects together.
           *
           * @param {Object} config1
           * @param {Object} config2
           * @returns {Object} New object resulting from merging config2 to config1
           */
          module.exports = function mergeConfig(config1, config2) {
            // eslint-disable-next-line no-param-reassign
            config2 = config2 || {}
            var config = {}

            var valueFromConfig2Keys = ['url', 'method', 'data']
            var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params']
            var defaultToConfig2Keys = [
              'baseURL',
              'transformRequest',
              'transformResponse',
              'paramsSerializer',
              'timeout',
              'timeoutMessage',
              'withCredentials',
              'adapter',
              'responseType',
              'xsrfCookieName',
              'xsrfHeaderName',
              'onUploadProgress',
              'onDownloadProgress',
              'decompress',
              'maxContentLength',
              'maxBodyLength',
              'maxRedirects',
              'transport',
              'httpAgent',
              'httpsAgent',
              'cancelToken',
              'socketPath',
              'responseEncoding',
            ]
            var directMergeKeys = ['validateStatus']

            function getMergedValue(target, source) {
              if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
                return utils.merge(target, source)
              } else if (utils.isPlainObject(source)) {
                return utils.merge({}, source)
              } else if (utils.isArray(source)) {
                return source.slice()
              }
              return source
            }

            function mergeDeepProperties(prop) {
              if (!utils.isUndefined(config2[prop])) {
                config[prop] = getMergedValue(config1[prop], config2[prop])
              } else if (!utils.isUndefined(config1[prop])) {
                config[prop] = getMergedValue(undefined, config1[prop])
              }
            }

            utils.forEach(
              valueFromConfig2Keys,
              function valueFromConfig2(prop) {
                if (!utils.isUndefined(config2[prop])) {
                  config[prop] = getMergedValue(undefined, config2[prop])
                }
              }
            )

            utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties)

            utils.forEach(
              defaultToConfig2Keys,
              function defaultToConfig2(prop) {
                if (!utils.isUndefined(config2[prop])) {
                  config[prop] = getMergedValue(undefined, config2[prop])
                } else if (!utils.isUndefined(config1[prop])) {
                  config[prop] = getMergedValue(undefined, config1[prop])
                }
              }
            )

            utils.forEach(directMergeKeys, function merge(prop) {
              if (prop in config2) {
                config[prop] = getMergedValue(config1[prop], config2[prop])
              } else if (prop in config1) {
                config[prop] = getMergedValue(undefined, config1[prop])
              }
            })

            var axiosKeys = valueFromConfig2Keys
              .concat(mergeDeepPropertiesKeys)
              .concat(defaultToConfig2Keys)
              .concat(directMergeKeys)

            var otherKeys = Object.keys(config1)
              .concat(Object.keys(config2))
              .filter(function filterAxiosKeys(key) {
                return axiosKeys.indexOf(key) === -1
              })

            utils.forEach(otherKeys, mergeDeepProperties)

            return config
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/settle.js':
        /*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var createError = __webpack_require__(
            /*! ./createError */ './node_modules/axios/lib/core/createError.js'
          )

          /**
           * Resolve or reject a Promise based on response status.
           *
           * @param {Function} resolve A function that resolves the promise.
           * @param {Function} reject A function that rejects the promise.
           * @param {object} response The response.
           */
          module.exports = function settle(resolve, reject, response) {
            var validateStatus = response.config.validateStatus
            if (
              !response.status ||
              !validateStatus ||
              validateStatus(response.status)
            ) {
              resolve(response)
            } else {
              reject(
                createError(
                  'Request failed with status code ' + response.status,
                  response.config,
                  null,
                  response.request,
                  response
                )
              )
            }
          }

          /***/
        },

      /***/ './node_modules/axios/lib/core/transformData.js':
        /*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          /**
           * Transform the data for a request or a response
           *
           * @param {Object|String} data The data to be transformed
           * @param {Array} headers The headers for the request or response
           * @param {Array|Function} fns A single function or Array of functions
           * @returns {*} The resulting transformed data
           */
          module.exports = function transformData(data, headers, fns) {
            /*eslint no-param-reassign:0*/
            utils.forEach(fns, function transform(fn) {
              data = fn(data, headers)
            })

            return data
          }

          /***/
        },

      /***/ './node_modules/axios/lib/defaults.js':
        /*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'
          /* provided dependency */ var process = __webpack_require__(
            /*! process/browser */ './node_modules/process/browser.js'
          )

          var utils = __webpack_require__(
            /*! ./utils */ './node_modules/axios/lib/utils.js'
          )
          var normalizeHeaderName = __webpack_require__(
            /*! ./helpers/normalizeHeaderName */ './node_modules/axios/lib/helpers/normalizeHeaderName.js'
          )

          var DEFAULT_CONTENT_TYPE = {
            'Content-Type': 'application/x-www-form-urlencoded',
          }

          function setContentTypeIfUnset(headers, value) {
            if (
              !utils.isUndefined(headers) &&
              utils.isUndefined(headers['Content-Type'])
            ) {
              headers['Content-Type'] = value
            }
          }

          function getDefaultAdapter() {
            var adapter
            if (typeof XMLHttpRequest !== 'undefined') {
              // For browsers use XHR adapter
              adapter = __webpack_require__(
                /*! ./adapters/xhr */ './node_modules/axios/lib/adapters/xhr.js'
              )
            } else if (
              typeof process !== 'undefined' &&
              Object.prototype.toString.call(process) === '[object process]'
            ) {
              // For node use HTTP adapter
              adapter = __webpack_require__(
                /*! ./adapters/http */ './node_modules/axios/lib/adapters/xhr.js'
              )
            }
            return adapter
          }

          var defaults = {
            adapter: getDefaultAdapter(),

            transformRequest: [
              function transformRequest(data, headers) {
                normalizeHeaderName(headers, 'Accept')
                normalizeHeaderName(headers, 'Content-Type')
                if (
                  utils.isFormData(data) ||
                  utils.isArrayBuffer(data) ||
                  utils.isBuffer(data) ||
                  utils.isStream(data) ||
                  utils.isFile(data) ||
                  utils.isBlob(data)
                ) {
                  return data
                }
                if (utils.isArrayBufferView(data)) {
                  return data.buffer
                }
                if (utils.isURLSearchParams(data)) {
                  setContentTypeIfUnset(
                    headers,
                    'application/x-www-form-urlencoded;charset=utf-8'
                  )
                  return data.toString()
                }
                if (utils.isObject(data)) {
                  setContentTypeIfUnset(
                    headers,
                    'application/json;charset=utf-8'
                  )
                  return JSON.stringify(data)
                }
                return data
              },
            ],

            transformResponse: [
              function transformResponse(data) {
                /*eslint no-param-reassign:0*/
                if (typeof data === 'string') {
                  try {
                    data = JSON.parse(data)
                  } catch (e) {
                    /* Ignore */
                  }
                }
                return data
              },
            ],

            /**
             * A timeout in milliseconds to abort a request. If set to 0 (default) a
             * timeout is not created.
             */
            timeout: 0,

            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',

            maxContentLength: -1,
            maxBodyLength: -1,

            validateStatus: function validateStatus(status) {
              return status >= 200 && status < 300
            },
          }

          defaults.headers = {
            common: {
              Accept: 'application/json, text/plain, */*',
            },
          }

          utils.forEach(
            ['delete', 'get', 'head'],
            function forEachMethodNoData(method) {
              defaults.headers[method] = {}
            }
          )

          utils.forEach(
            ['post', 'put', 'patch'],
            function forEachMethodWithData(method) {
              defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE)
            }
          )

          module.exports = defaults

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/bind.js':
        /*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
        /***/ (module) => {
          'use strict'

          module.exports = function bind(fn, thisArg) {
            return function wrap() {
              var args = new Array(arguments.length)
              for (var i = 0; i < args.length; i++) {
                args[i] = arguments[i]
              }
              return fn.apply(thisArg, args)
            }
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/buildURL.js':
        /*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          function encode(val) {
            return encodeURIComponent(val)
              .replace(/%3A/gi, ':')
              .replace(/%24/g, '$')
              .replace(/%2C/gi, ',')
              .replace(/%20/g, '+')
              .replace(/%5B/gi, '[')
              .replace(/%5D/gi, ']')
          }

          /**
           * Build a URL by appending params to the end
           *
           * @param {string} url The base of the url (e.g., http://www.google.com)
           * @param {object} [params] The params to be appended
           * @returns {string} The formatted url
           */
          module.exports = function buildURL(url, params, paramsSerializer) {
            /*eslint no-param-reassign:0*/
            if (!params) {
              return url
            }

            var serializedParams
            if (paramsSerializer) {
              serializedParams = paramsSerializer(params)
            } else if (utils.isURLSearchParams(params)) {
              serializedParams = params.toString()
            } else {
              var parts = []

              utils.forEach(params, function serialize(val, key) {
                if (val === null || typeof val === 'undefined') {
                  return
                }

                if (utils.isArray(val)) {
                  key = key + '[]'
                } else {
                  val = [val]
                }

                utils.forEach(val, function parseValue(v) {
                  if (utils.isDate(v)) {
                    v = v.toISOString()
                  } else if (utils.isObject(v)) {
                    v = JSON.stringify(v)
                  }
                  parts.push(encode(key) + '=' + encode(v))
                })
              })

              serializedParams = parts.join('&')
            }

            if (serializedParams) {
              var hashmarkIndex = url.indexOf('#')
              if (hashmarkIndex !== -1) {
                url = url.slice(0, hashmarkIndex)
              }

              url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
            }

            return url
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/combineURLs.js':
        /*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Creates a new URL by combining the specified URLs
           *
           * @param {string} baseURL The base URL
           * @param {string} relativeURL The relative URL
           * @returns {string} The combined URL
           */
          module.exports = function combineURLs(baseURL, relativeURL) {
            return relativeURL
              ? baseURL.replace(/\/+$/, '') +
                  '/' +
                  relativeURL.replace(/^\/+/, '')
              : baseURL
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/cookies.js':
        /*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          module.exports = utils.isStandardBrowserEnv()
            ? // Standard browser envs support document.cookie
              (function standardBrowserEnv() {
                return {
                  write: function write(
                    name,
                    value,
                    expires,
                    path,
                    domain,
                    secure
                  ) {
                    var cookie = []
                    cookie.push(name + '=' + encodeURIComponent(value))

                    if (utils.isNumber(expires)) {
                      cookie.push('expires=' + new Date(expires).toGMTString())
                    }

                    if (utils.isString(path)) {
                      cookie.push('path=' + path)
                    }

                    if (utils.isString(domain)) {
                      cookie.push('domain=' + domain)
                    }

                    if (secure === true) {
                      cookie.push('secure')
                    }

                    document.cookie = cookie.join('; ')
                  },

                  read: function read(name) {
                    var match = document.cookie.match(
                      new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
                    )
                    return match ? decodeURIComponent(match[3]) : null
                  },

                  remove: function remove(name) {
                    this.write(name, '', Date.now() - 86400000)
                  },
                }
              })()
            : // Non standard browser env (web workers, react-native) lack needed support.
              (function nonStandardBrowserEnv() {
                return {
                  write: function write() {},
                  read: function read() {
                    return null
                  },
                  remove: function remove() {},
                }
              })()

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/isAbsoluteURL.js':
        /*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Determines whether the specified URL is absolute
           *
           * @param {string} url The URL to test
           * @returns {boolean} True if the specified URL is absolute, otherwise false
           */
          module.exports = function isAbsoluteURL(url) {
            // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
            // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
            // by any combination of letters, digits, plus, period, or hyphen.
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/isAxiosError.js':
        /*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Determines whether the payload is an error thrown by Axios
           *
           * @param {*} payload The value to test
           * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
           */
          module.exports = function isAxiosError(payload) {
            return typeof payload === 'object' && payload.isAxiosError === true
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/isURLSameOrigin.js':
        /*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          module.exports = utils.isStandardBrowserEnv()
            ? // Standard browser envs have full support of the APIs needed to test
              // whether the request URL is of the same origin as current location.
              (function standardBrowserEnv() {
                var msie = /(msie|trident)/i.test(navigator.userAgent)
                var urlParsingNode = document.createElement('a')
                var originURL

                /**
                 * Parse a URL to discover it's components
                 *
                 * @param {String} url The URL to be parsed
                 * @returns {Object}
                 */
                function resolveURL(url) {
                  var href = url

                  if (msie) {
                    // IE needs attribute set twice to normalize properties
                    urlParsingNode.setAttribute('href', href)
                    href = urlParsingNode.href
                  }

                  urlParsingNode.setAttribute('href', href)

                  // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
                  return {
                    href: urlParsingNode.href,
                    protocol: urlParsingNode.protocol
                      ? urlParsingNode.protocol.replace(/:$/, '')
                      : '',
                    host: urlParsingNode.host,
                    search: urlParsingNode.search
                      ? urlParsingNode.search.replace(/^\?/, '')
                      : '',
                    hash: urlParsingNode.hash
                      ? urlParsingNode.hash.replace(/^#/, '')
                      : '',
                    hostname: urlParsingNode.hostname,
                    port: urlParsingNode.port,
                    pathname:
                      urlParsingNode.pathname.charAt(0) === '/'
                        ? urlParsingNode.pathname
                        : '/' + urlParsingNode.pathname,
                  }
                }

                originURL = resolveURL(window.location.href)

                /**
                 * Determine if a URL shares the same origin as the current location
                 *
                 * @param {String} requestURL The URL to test
                 * @returns {boolean} True if URL shares the same origin, otherwise false
                 */
                return function isURLSameOrigin(requestURL) {
                  var parsed = utils.isString(requestURL)
                    ? resolveURL(requestURL)
                    : requestURL
                  return (
                    parsed.protocol === originURL.protocol &&
                    parsed.host === originURL.host
                  )
                }
              })()
            : // Non standard browser envs (web workers, react-native) lack needed support.
              (function nonStandardBrowserEnv() {
                return function isURLSameOrigin() {
                  return true
                }
              })()

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/normalizeHeaderName.js':
        /*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ../utils */ './node_modules/axios/lib/utils.js'
          )

          module.exports = function normalizeHeaderName(
            headers,
            normalizedName
          ) {
            utils.forEach(headers, function processHeader(value, name) {
              if (
                name !== normalizedName &&
                name.toUpperCase() === normalizedName.toUpperCase()
              ) {
                headers[normalizedName] = value
                delete headers[name]
              }
            })
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/parseHeaders.js':
        /*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var utils = __webpack_require__(
            /*! ./../utils */ './node_modules/axios/lib/utils.js'
          )

          // Headers whose duplicates are ignored by node
          // c.f. https://nodejs.org/api/http.html#http_message_headers
          var ignoreDuplicateOf = [
            'age',
            'authorization',
            'content-length',
            'content-type',
            'etag',
            'expires',
            'from',
            'host',
            'if-modified-since',
            'if-unmodified-since',
            'last-modified',
            'location',
            'max-forwards',
            'proxy-authorization',
            'referer',
            'retry-after',
            'user-agent',
          ]

          /**
           * Parse headers into an object
           *
           * ```
           * Date: Wed, 27 Aug 2014 08:58:49 GMT
           * Content-Type: application/json
           * Connection: keep-alive
           * Transfer-Encoding: chunked
           * ```
           *
           * @param {String} headers Headers needing to be parsed
           * @returns {Object} Headers parsed into an object
           */
          module.exports = function parseHeaders(headers) {
            var parsed = {}
            var key
            var val
            var i

            if (!headers) {
              return parsed
            }

            utils.forEach(headers.split('\n'), function parser(line) {
              i = line.indexOf(':')
              key = utils.trim(line.substr(0, i)).toLowerCase()
              val = utils.trim(line.substr(i + 1))

              if (key) {
                if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                  return
                }
                if (key === 'set-cookie') {
                  parsed[key] = (parsed[key] ? parsed[key] : []).concat([val])
                } else {
                  parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
                }
              }
            })

            return parsed
          }

          /***/
        },

      /***/ './node_modules/axios/lib/helpers/spread.js':
        /*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
        /***/ (module) => {
          'use strict'

          /**
           * Syntactic sugar for invoking a function and expanding an array for arguments.
           *
           * Common use case would be to use `Function.prototype.apply`.
           *
           *  ```js
           *  function f(x, y, z) {}
           *  var args = [1, 2, 3];
           *  f.apply(null, args);
           *  ```
           *
           * With `spread` this example can be re-written.
           *
           *  ```js
           *  spread(function(x, y, z) {})([1, 2, 3]);
           *  ```
           *
           * @param {Function} callback
           * @returns {Function}
           */
          module.exports = function spread(callback) {
            return function wrap(arr) {
              return callback.apply(null, arr)
            }
          }

          /***/
        },

      /***/ './node_modules/axios/lib/utils.js':
        /*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var bind = __webpack_require__(
            /*! ./helpers/bind */ './node_modules/axios/lib/helpers/bind.js'
          )

          /*global toString:true*/

          // utils is a library of generic helper functions non-specific to axios

          var toString = Object.prototype.toString

          /**
           * Determine if a value is an Array
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is an Array, otherwise false
           */
          function isArray(val) {
            return toString.call(val) === '[object Array]'
          }

          /**
           * Determine if a value is undefined
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if the value is undefined, otherwise false
           */
          function isUndefined(val) {
            return typeof val === 'undefined'
          }

          /**
           * Determine if a value is a Buffer
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Buffer, otherwise false
           */
          function isBuffer(val) {
            return (
              val !== null &&
              !isUndefined(val) &&
              val.constructor !== null &&
              !isUndefined(val.constructor) &&
              typeof val.constructor.isBuffer === 'function' &&
              val.constructor.isBuffer(val)
            )
          }

          /**
           * Determine if a value is an ArrayBuffer
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is an ArrayBuffer, otherwise false
           */
          function isArrayBuffer(val) {
            return toString.call(val) === '[object ArrayBuffer]'
          }

          /**
           * Determine if a value is a FormData
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is an FormData, otherwise false
           */
          function isFormData(val) {
            return typeof FormData !== 'undefined' && val instanceof FormData
          }

          /**
           * Determine if a value is a view on an ArrayBuffer
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
           */
          function isArrayBufferView(val) {
            var result
            if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
              result = ArrayBuffer.isView(val)
            } else {
              result = val && val.buffer && val.buffer instanceof ArrayBuffer
            }
            return result
          }

          /**
           * Determine if a value is a String
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a String, otherwise false
           */
          function isString(val) {
            return typeof val === 'string'
          }

          /**
           * Determine if a value is a Number
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Number, otherwise false
           */
          function isNumber(val) {
            return typeof val === 'number'
          }

          /**
           * Determine if a value is an Object
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is an Object, otherwise false
           */
          function isObject(val) {
            return val !== null && typeof val === 'object'
          }

          /**
           * Determine if a value is a plain Object
           *
           * @param {Object} val The value to test
           * @return {boolean} True if value is a plain Object, otherwise false
           */
          function isPlainObject(val) {
            if (toString.call(val) !== '[object Object]') {
              return false
            }

            var prototype = Object.getPrototypeOf(val)
            return prototype === null || prototype === Object.prototype
          }

          /**
           * Determine if a value is a Date
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Date, otherwise false
           */
          function isDate(val) {
            return toString.call(val) === '[object Date]'
          }

          /**
           * Determine if a value is a File
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a File, otherwise false
           */
          function isFile(val) {
            return toString.call(val) === '[object File]'
          }

          /**
           * Determine if a value is a Blob
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Blob, otherwise false
           */
          function isBlob(val) {
            return toString.call(val) === '[object Blob]'
          }

          /**
           * Determine if a value is a Function
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Function, otherwise false
           */
          function isFunction(val) {
            return toString.call(val) === '[object Function]'
          }

          /**
           * Determine if a value is a Stream
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a Stream, otherwise false
           */
          function isStream(val) {
            return isObject(val) && isFunction(val.pipe)
          }

          /**
           * Determine if a value is a URLSearchParams object
           *
           * @param {Object} val The value to test
           * @returns {boolean} True if value is a URLSearchParams object, otherwise false
           */
          function isURLSearchParams(val) {
            return (
              typeof URLSearchParams !== 'undefined' &&
              val instanceof URLSearchParams
            )
          }

          /**
           * Trim excess whitespace off the beginning and end of a string
           *
           * @param {String} str The String to trim
           * @returns {String} The String freed of excess whitespace
           */
          function trim(str) {
            return str.replace(/^\s*/, '').replace(/\s*$/, '')
          }

          /**
           * Determine if we're running in a standard browser environment
           *
           * This allows axios to run in a web worker, and react-native.
           * Both environments support XMLHttpRequest, but not fully standard globals.
           *
           * web workers:
           *  typeof window -> undefined
           *  typeof document -> undefined
           *
           * react-native:
           *  navigator.product -> 'ReactNative'
           * nativescript
           *  navigator.product -> 'NativeScript' or 'NS'
           */
          function isStandardBrowserEnv() {
            if (
              typeof navigator !== 'undefined' &&
              (navigator.product === 'ReactNative' ||
                navigator.product === 'NativeScript' ||
                navigator.product === 'NS')
            ) {
              return false
            }
            return (
              typeof window !== 'undefined' && typeof document !== 'undefined'
            )
          }

          /**
           * Iterate over an Array or an Object invoking a function for each item.
           *
           * If `obj` is an Array callback will be called passing
           * the value, index, and complete array for each item.
           *
           * If 'obj' is an Object callback will be called passing
           * the value, key, and complete object for each property.
           *
           * @param {Object|Array} obj The object to iterate
           * @param {Function} fn The callback to invoke for each item
           */
          function forEach(obj, fn) {
            // Don't bother if no value provided
            if (obj === null || typeof obj === 'undefined') {
              return
            }

            // Force an array if not already something iterable
            if (typeof obj !== 'object') {
              /*eslint no-param-reassign:0*/
              obj = [obj]
            }

            if (isArray(obj)) {
              // Iterate over array values
              for (var i = 0, l = obj.length; i < l; i++) {
                fn.call(null, obj[i], i, obj)
              }
            } else {
              // Iterate over object keys
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                  fn.call(null, obj[key], key, obj)
                }
              }
            }
          }

          /**
           * Accepts varargs expecting each argument to be an object, then
           * immutably merges the properties of each object and returns result.
           *
           * When multiple objects contain the same key the later object in
           * the arguments list will take precedence.
           *
           * Example:
           *
           * ```js
           * var result = merge({foo: 123}, {foo: 456});
           * console.log(result.foo); // outputs 456
           * ```
           *
           * @param {Object} obj1 Object to merge
           * @returns {Object} Result of all merge properties
           */
          function merge(/* obj1, obj2, obj3, ... */) {
            var result = {}
            function assignValue(val, key) {
              if (isPlainObject(result[key]) && isPlainObject(val)) {
                result[key] = merge(result[key], val)
              } else if (isPlainObject(val)) {
                result[key] = merge({}, val)
              } else if (isArray(val)) {
                result[key] = val.slice()
              } else {
                result[key] = val
              }
            }

            for (var i = 0, l = arguments.length; i < l; i++) {
              forEach(arguments[i], assignValue)
            }
            return result
          }

          /**
           * Extends object a by mutably adding to it the properties of object b.
           *
           * @param {Object} a The object to be extended
           * @param {Object} b The object to copy properties from
           * @param {Object} thisArg The object to bind function to
           * @return {Object} The resulting value of object a
           */
          function extend(a, b, thisArg) {
            forEach(b, function assignValue(val, key) {
              if (thisArg && typeof val === 'function') {
                a[key] = bind(val, thisArg)
              } else {
                a[key] = val
              }
            })
            return a
          }

          /**
           * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
           *
           * @param {string} content with BOM
           * @return {string} content value without BOM
           */
          function stripBOM(content) {
            if (content.charCodeAt(0) === 0xfeff) {
              content = content.slice(1)
            }
            return content
          }

          module.exports = {
            isArray: isArray,
            isArrayBuffer: isArrayBuffer,
            isBuffer: isBuffer,
            isFormData: isFormData,
            isArrayBufferView: isArrayBufferView,
            isString: isString,
            isNumber: isNumber,
            isObject: isObject,
            isPlainObject: isPlainObject,
            isUndefined: isUndefined,
            isDate: isDate,
            isFile: isFile,
            isBlob: isBlob,
            isFunction: isFunction,
            isStream: isStream,
            isURLSearchParams: isURLSearchParams,
            isStandardBrowserEnv: isStandardBrowserEnv,
            forEach: forEach,
            merge: merge,
            extend: extend,
            trim: trim,
            stripBOM: stripBOM,
          }

          /***/
        },

      /***/ './node_modules/call-bind/callBound.js':
        /*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var GetIntrinsic = __webpack_require__(
            /*! get-intrinsic */ './node_modules/get-intrinsic/index.js'
          )

          var callBind = __webpack_require__(
            /*! ./ */ './node_modules/call-bind/index.js'
          )

          var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'))

          module.exports = function callBoundIntrinsic(name, allowMissing) {
            var intrinsic = GetIntrinsic(name, !!allowMissing)
            if (
              typeof intrinsic === 'function' &&
              $indexOf(name, '.prototype.') > -1
            ) {
              return callBind(intrinsic)
            }
            return intrinsic
          }

          /***/
        },

      /***/ './node_modules/call-bind/index.js':
        /*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var bind = __webpack_require__(
            /*! function-bind */ './node_modules/function-bind/index.js'
          )
          var GetIntrinsic = __webpack_require__(
            /*! get-intrinsic */ './node_modules/get-intrinsic/index.js'
          )

          var $apply = GetIntrinsic('%Function.prototype.apply%')
          var $call = GetIntrinsic('%Function.prototype.call%')
          var $reflectApply =
            GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply)

          var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true)
          var $defineProperty = GetIntrinsic('%Object.defineProperty%', true)
          var $max = GetIntrinsic('%Math.max%')

          if ($defineProperty) {
            try {
              $defineProperty({}, 'a', { value: 1 })
            } catch (e) {
              // IE 8 has a broken defineProperty
              $defineProperty = null
            }
          }

          module.exports = function callBind(originalFunction) {
            var func = $reflectApply(bind, $call, arguments)
            if ($gOPD && $defineProperty) {
              var desc = $gOPD(func, 'length')
              if (desc.configurable) {
                // original length, plus the receiver, minus any additional arguments (after the receiver)
                $defineProperty(func, 'length', {
                  value:
                    1 +
                    $max(0, originalFunction.length - (arguments.length - 1)),
                })
              }
            }
            return func
          }

          var applyBind = function applyBind() {
            return $reflectApply(bind, $apply, arguments)
          }

          if ($defineProperty) {
            $defineProperty(module.exports, 'apply', { value: applyBind })
          } else {
            module.exports.apply = applyBind
          }

          /***/
        },

      /***/ './node_modules/console-browserify/index.js':
        /*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          /*global window, global*/
          var util = __webpack_require__(
            /*! util */ './node_modules/util/util.js'
          )
          var assert = __webpack_require__(
            /*! assert */ './node_modules/assert/build/assert.js'
          )
          function now() {
            return new Date().getTime()
          }

          var slice = Array.prototype.slice
          var console
          var times = {}

          if (
            typeof __webpack_require__.g !== 'undefined' &&
            __webpack_require__.g.console
          ) {
            console = __webpack_require__.g.console
          } else if (typeof window !== 'undefined' && window.console) {
            console = window.console
          } else {
            console = {}
          }

          var functions = [
            [log, 'log'],
            [info, 'info'],
            [warn, 'warn'],
            [error, 'error'],
            [time, 'time'],
            [timeEnd, 'timeEnd'],
            [trace, 'trace'],
            [dir, 'dir'],
            [consoleAssert, 'assert'],
          ]

          for (var i = 0; i < functions.length; i++) {
            var tuple = functions[i]
            var f = tuple[0]
            var name = tuple[1]

            if (!console[name]) {
              console[name] = f
            }
          }

          module.exports = console

          function log() {}

          function info() {
            console.log.apply(console, arguments)
          }

          function warn() {
            console.log.apply(console, arguments)
          }

          function error() {
            console.warn.apply(console, arguments)
          }

          function time(label) {
            times[label] = now()
          }

          function timeEnd(label) {
            var time = times[label]
            if (!time) {
              throw new Error('No such label: ' + label)
            }

            delete times[label]
            var duration = now() - time
            console.log(label + ': ' + duration + 'ms')
          }

          function trace() {
            var err = new Error()
            err.name = 'Trace'
            err.message = util.format.apply(null, arguments)
            console.error(err.stack)
          }

          function dir(object) {
            console.log(util.inspect(object) + '\n')
          }

          function consoleAssert(expression) {
            if (!expression) {
              var arr = slice.call(arguments, 1)
              assert.ok(false, util.format.apply(null, arr))
            }
          }

          /***/
        },

      /***/ './node_modules/define-properties/index.js':
        /*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var keys = __webpack_require__(
            /*! object-keys */ './node_modules/object-keys/index.js'
          )
          var hasSymbols =
            typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol'

          var toStr = Object.prototype.toString
          var concat = Array.prototype.concat
          var origDefineProperty = Object.defineProperty

          var isFunction = function (fn) {
            return (
              typeof fn === 'function' && toStr.call(fn) === '[object Function]'
            )
          }

          var arePropertyDescriptorsSupported = function () {
            var obj = {}
            try {
              origDefineProperty(obj, 'x', { enumerable: false, value: obj })
              // eslint-disable-next-line no-unused-vars, no-restricted-syntax
              for (var _ in obj) {
                // jscs:ignore disallowUnusedVariables
                return false
              }
              return obj.x === obj
            } catch (e) {
              /* this is IE 8. */
              return false
            }
          }
          var supportsDescriptors =
            origDefineProperty && arePropertyDescriptorsSupported()

          var defineProperty = function (object, name, value, predicate) {
            if (name in object && (!isFunction(predicate) || !predicate())) {
              return
            }
            if (supportsDescriptors) {
              origDefineProperty(object, name, {
                configurable: true,
                enumerable: false,
                value: value,
                writable: true,
              })
            } else {
              object[name] = value
            }
          }

          var defineProperties = function (object, map) {
            var predicates = arguments.length > 2 ? arguments[2] : {}
            var props = keys(map)
            if (hasSymbols) {
              props = concat.call(props, Object.getOwnPropertySymbols(map))
            }
            for (var i = 0; i < props.length; i += 1) {
              defineProperty(
                object,
                props[i],
                map[props[i]],
                predicates[props[i]]
              )
            }
          }

          defineProperties.supportsDescriptors = !!supportsDescriptors

          module.exports = defineProperties

          /***/
        },

      /***/ './node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js':
        /*!**********************************************************************!*\
  !*** ./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js ***!
  \**********************************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var GetIntrinsic = __webpack_require__(
            /*! get-intrinsic */ './node_modules/get-intrinsic/index.js'
          )

          var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%')
          if ($gOPD) {
            try {
              $gOPD([], 'length')
            } catch (e) {
              // IE 8 has a broken gOPD
              $gOPD = null
            }
          }

          module.exports = $gOPD

          /***/
        },

      /***/ './node_modules/es6-object-assign/index.js':
        /*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
        /***/ (module) => {
          'use strict'
          /**
           * Code refactored from Mozilla Developer Network:
           * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
           */

          function assign(target, firstSource) {
            if (target === undefined || target === null) {
              throw new TypeError('Cannot convert first argument to object')
            }

            var to = Object(target)
            for (var i = 1; i < arguments.length; i++) {
              var nextSource = arguments[i]
              if (nextSource === undefined || nextSource === null) {
                continue
              }

              var keysArray = Object.keys(Object(nextSource))
              for (
                var nextIndex = 0, len = keysArray.length;
                nextIndex < len;
                nextIndex++
              ) {
                var nextKey = keysArray[nextIndex]
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey)
                if (desc !== undefined && desc.enumerable) {
                  to[nextKey] = nextSource[nextKey]
                }
              }
            }
            return to
          }

          function polyfill() {
            if (!Object.assign) {
              Object.defineProperty(Object, 'assign', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: assign,
              })
            }
          }

          module.exports = {
            assign: assign,
            polyfill: polyfill,
          }

          /***/
        },

      /***/ './node_modules/events/events.js':
        /*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'
          /* provided dependency */ var console = __webpack_require__(
            /*! console-browserify */ './node_modules/console-browserify/index.js'
          )
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var R = typeof Reflect === 'object' ? Reflect : null
          var ReflectApply =
            R && typeof R.apply === 'function'
              ? R.apply
              : function ReflectApply(target, receiver, args) {
                  return Function.prototype.apply.call(target, receiver, args)
                }

          var ReflectOwnKeys
          if (R && typeof R.ownKeys === 'function') {
            ReflectOwnKeys = R.ownKeys
          } else if (Object.getOwnPropertySymbols) {
            ReflectOwnKeys = function ReflectOwnKeys(target) {
              return Object.getOwnPropertyNames(target).concat(
                Object.getOwnPropertySymbols(target)
              )
            }
          } else {
            ReflectOwnKeys = function ReflectOwnKeys(target) {
              return Object.getOwnPropertyNames(target)
            }
          }

          function ProcessEmitWarning(warning) {
            if (console && console.warn) console.warn(warning)
          }

          var NumberIsNaN =
            Number.isNaN ||
            function NumberIsNaN(value) {
              return value !== value
            }

          function EventEmitter() {
            EventEmitter.init.call(this)
          }
          module.exports = EventEmitter
          module.exports.once = once

          // Backwards-compat with node 0.10.x
          EventEmitter.EventEmitter = EventEmitter

          EventEmitter.prototype._events = undefined
          EventEmitter.prototype._eventsCount = 0
          EventEmitter.prototype._maxListeners = undefined

          // By default EventEmitters will print a warning if more than 10 listeners are
          // added to it. This is a useful default which helps finding memory leaks.
          var defaultMaxListeners = 10

          function checkListener(listener) {
            if (typeof listener !== 'function') {
              throw new TypeError(
                'The "listener" argument must be of type Function. Received type ' +
                  typeof listener
              )
            }
          }

          Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
            enumerable: true,
            get: function () {
              return defaultMaxListeners
            },
            set: function (arg) {
              if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
                throw new RangeError(
                  'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    arg +
                    '.'
                )
              }
              defaultMaxListeners = arg
            },
          })

          EventEmitter.init = function () {
            if (
              this._events === undefined ||
              this._events === Object.getPrototypeOf(this)._events
            ) {
              this._events = Object.create(null)
              this._eventsCount = 0
            }

            this._maxListeners = this._maxListeners || undefined
          }

          // Obviously not all Emitters should be limited to 10. This function allows
          // that to be increased. Set to zero for unlimited.
          EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
            if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
              throw new RangeError(
                'The value of "n" is out of range. It must be a non-negative number. Received ' +
                  n +
                  '.'
              )
            }
            this._maxListeners = n
            return this
          }

          function _getMaxListeners(that) {
            if (that._maxListeners === undefined)
              return EventEmitter.defaultMaxListeners
            return that._maxListeners
          }

          EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
            return _getMaxListeners(this)
          }

          EventEmitter.prototype.emit = function emit(type) {
            var args = []
            for (var i = 1; i < arguments.length; i++) args.push(arguments[i])
            var doError = type === 'error'

            var events = this._events
            if (events !== undefined)
              doError = doError && events.error === undefined
            else if (!doError) return false

            // If there is no 'error' event listener then throw.
            if (doError) {
              var er
              if (args.length > 0) er = args[0]
              if (er instanceof Error) {
                // Note: The comments on the `throw` lines are intentional, they show
                // up in Node's output if this results in an unhandled exception.
                throw er // Unhandled 'error' event
              }
              // At least give some kind of context to the user
              var err = new Error(
                'Unhandled error.' + (er ? ' (' + er.message + ')' : '')
              )
              err.context = er
              throw err // Unhandled 'error' event
            }

            var handler = events[type]

            if (handler === undefined) return false

            if (typeof handler === 'function') {
              ReflectApply(handler, this, args)
            } else {
              var len = handler.length
              var listeners = arrayClone(handler, len)
              for (var i = 0; i < len; ++i)
                ReflectApply(listeners[i], this, args)
            }

            return true
          }

          function _addListener(target, type, listener, prepend) {
            var m
            var events
            var existing

            checkListener(listener)

            events = target._events
            if (events === undefined) {
              events = target._events = Object.create(null)
              target._eventsCount = 0
            } else {
              // To avoid recursion in the case that type === "newListener"! Before
              // adding it to the listeners, first emit "newListener".
              if (events.newListener !== undefined) {
                target.emit(
                  'newListener',
                  type,
                  listener.listener ? listener.listener : listener
                )

                // Re-assign `events` because a newListener handler could have caused the
                // this._events to be assigned to a new object
                events = target._events
              }
              existing = events[type]
            }

            if (existing === undefined) {
              // Optimize the case of one listener. Don't need the extra array object.
              existing = events[type] = listener
              ++target._eventsCount
            } else {
              if (typeof existing === 'function') {
                // Adding the second element, need to change to array.
                existing = events[type] = prepend
                  ? [listener, existing]
                  : [existing, listener]
                // If we've already got an array, just append.
              } else if (prepend) {
                existing.unshift(listener)
              } else {
                existing.push(listener)
              }

              // Check for listener leak
              m = _getMaxListeners(target)
              if (m > 0 && existing.length > m && !existing.warned) {
                existing.warned = true
                // No error code for this since it is a Warning
                // eslint-disable-next-line no-restricted-syntax
                var w = new Error(
                  'Possible EventEmitter memory leak detected. ' +
                    existing.length +
                    ' ' +
                    String(type) +
                    ' listeners ' +
                    'added. Use emitter.setMaxListeners() to ' +
                    'increase limit'
                )
                w.name = 'MaxListenersExceededWarning'
                w.emitter = target
                w.type = type
                w.count = existing.length
                ProcessEmitWarning(w)
              }
            }

            return target
          }

          EventEmitter.prototype.addListener = function addListener(
            type,
            listener
          ) {
            return _addListener(this, type, listener, false)
          }

          EventEmitter.prototype.on = EventEmitter.prototype.addListener

          EventEmitter.prototype.prependListener = function prependListener(
            type,
            listener
          ) {
            return _addListener(this, type, listener, true)
          }

          function onceWrapper() {
            if (!this.fired) {
              this.target.removeListener(this.type, this.wrapFn)
              this.fired = true
              if (arguments.length === 0) return this.listener.call(this.target)
              return this.listener.apply(this.target, arguments)
            }
          }

          function _onceWrap(target, type, listener) {
            var state = {
              fired: false,
              wrapFn: undefined,
              target: target,
              type: type,
              listener: listener,
            }
            var wrapped = onceWrapper.bind(state)
            wrapped.listener = listener
            state.wrapFn = wrapped
            return wrapped
          }

          EventEmitter.prototype.once = function once(type, listener) {
            checkListener(listener)
            this.on(type, _onceWrap(this, type, listener))
            return this
          }

          EventEmitter.prototype.prependOnceListener = function prependOnceListener(
            type,
            listener
          ) {
            checkListener(listener)
            this.prependListener(type, _onceWrap(this, type, listener))
            return this
          }

          // Emits a 'removeListener' event if and only if the listener was removed.
          EventEmitter.prototype.removeListener = function removeListener(
            type,
            listener
          ) {
            var list, events, position, i, originalListener

            checkListener(listener)

            events = this._events
            if (events === undefined) return this

            list = events[type]
            if (list === undefined) return this

            if (list === listener || list.listener === listener) {
              if (--this._eventsCount === 0) this._events = Object.create(null)
              else {
                delete events[type]
                if (events.removeListener)
                  this.emit('removeListener', type, list.listener || listener)
              }
            } else if (typeof list !== 'function') {
              position = -1

              for (i = list.length - 1; i >= 0; i--) {
                if (list[i] === listener || list[i].listener === listener) {
                  originalListener = list[i].listener
                  position = i
                  break
                }
              }

              if (position < 0) return this

              if (position === 0) list.shift()
              else {
                spliceOne(list, position)
              }

              if (list.length === 1) events[type] = list[0]

              if (events.removeListener !== undefined)
                this.emit('removeListener', type, originalListener || listener)
            }

            return this
          }

          EventEmitter.prototype.off = EventEmitter.prototype.removeListener

          EventEmitter.prototype.removeAllListeners = function removeAllListeners(
            type
          ) {
            var listeners, events, i

            events = this._events
            if (events === undefined) return this

            // not listening for removeListener, no need to emit
            if (events.removeListener === undefined) {
              if (arguments.length === 0) {
                this._events = Object.create(null)
                this._eventsCount = 0
              } else if (events[type] !== undefined) {
                if (--this._eventsCount === 0)
                  this._events = Object.create(null)
                else delete events[type]
              }
              return this
            }

            // emit removeListener for all listeners on all events
            if (arguments.length === 0) {
              var keys = Object.keys(events)
              var key
              for (i = 0; i < keys.length; ++i) {
                key = keys[i]
                if (key === 'removeListener') continue
                this.removeAllListeners(key)
              }
              this.removeAllListeners('removeListener')
              this._events = Object.create(null)
              this._eventsCount = 0
              return this
            }

            listeners = events[type]

            if (typeof listeners === 'function') {
              this.removeListener(type, listeners)
            } else if (listeners !== undefined) {
              // LIFO order
              for (i = listeners.length - 1; i >= 0; i--) {
                this.removeListener(type, listeners[i])
              }
            }

            return this
          }

          function _listeners(target, type, unwrap) {
            var events = target._events

            if (events === undefined) return []

            var evlistener = events[type]
            if (evlistener === undefined) return []

            if (typeof evlistener === 'function')
              return unwrap ? [evlistener.listener || evlistener] : [evlistener]

            return unwrap
              ? unwrapListeners(evlistener)
              : arrayClone(evlistener, evlistener.length)
          }

          EventEmitter.prototype.listeners = function listeners(type) {
            return _listeners(this, type, true)
          }

          EventEmitter.prototype.rawListeners = function rawListeners(type) {
            return _listeners(this, type, false)
          }

          EventEmitter.listenerCount = function (emitter, type) {
            if (typeof emitter.listenerCount === 'function') {
              return emitter.listenerCount(type)
            } else {
              return listenerCount.call(emitter, type)
            }
          }

          EventEmitter.prototype.listenerCount = listenerCount
          function listenerCount(type) {
            var events = this._events

            if (events !== undefined) {
              var evlistener = events[type]

              if (typeof evlistener === 'function') {
                return 1
              } else if (evlistener !== undefined) {
                return evlistener.length
              }
            }

            return 0
          }

          EventEmitter.prototype.eventNames = function eventNames() {
            return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : []
          }

          function arrayClone(arr, n) {
            var copy = new Array(n)
            for (var i = 0; i < n; ++i) copy[i] = arr[i]
            return copy
          }

          function spliceOne(list, index) {
            for (; index + 1 < list.length; index++)
              list[index] = list[index + 1]
            list.pop()
          }

          function unwrapListeners(arr) {
            var ret = new Array(arr.length)
            for (var i = 0; i < ret.length; ++i) {
              ret[i] = arr[i].listener || arr[i]
            }
            return ret
          }

          function once(emitter, name) {
            return new Promise(function (resolve, reject) {
              function errorListener(err) {
                emitter.removeListener(name, resolver)
                reject(err)
              }

              function resolver() {
                if (typeof emitter.removeListener === 'function') {
                  emitter.removeListener('error', errorListener)
                }
                resolve([].slice.call(arguments))
              }

              eventTargetAgnosticAddListener(emitter, name, resolver, {
                once: true,
              })
              if (name !== 'error') {
                addErrorHandlerIfEventEmitter(emitter, errorListener, {
                  once: true,
                })
              }
            })
          }

          function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
            if (typeof emitter.on === 'function') {
              eventTargetAgnosticAddListener(emitter, 'error', handler, flags)
            }
          }

          function eventTargetAgnosticAddListener(
            emitter,
            name,
            listener,
            flags
          ) {
            if (typeof emitter.on === 'function') {
              if (flags.once) {
                emitter.once(name, listener)
              } else {
                emitter.on(name, listener)
              }
            } else if (typeof emitter.addEventListener === 'function') {
              // EventTarget does not have `error` event semantics like Node
              // EventEmitters, we do not listen for `error` events here.
              emitter.addEventListener(name, function wrapListener(arg) {
                // IE does not have builtin `{ once: true }` support so we
                // have to do it manually.
                if (flags.once) {
                  emitter.removeEventListener(name, wrapListener)
                }
                listener(arg)
              })
            } else {
              throw new TypeError(
                'The "emitter" argument must be of type EventEmitter. Received type ' +
                  typeof emitter
              )
            }
          }

          /***/
        },

      /***/ './node_modules/foreach/index.js':
        /*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
        /***/ (module) => {
          var hasOwn = Object.prototype.hasOwnProperty
          var toString = Object.prototype.toString

          module.exports = function forEach(obj, fn, ctx) {
            if (toString.call(fn) !== '[object Function]') {
              throw new TypeError('iterator must be a function')
            }
            var l = obj.length
            if (l === +l) {
              for (var i = 0; i < l; i++) {
                fn.call(ctx, obj[i], i, obj)
              }
            } else {
              for (var k in obj) {
                if (hasOwn.call(obj, k)) {
                  fn.call(ctx, obj[k], k, obj)
                }
              }
            }
          }

          /***/
        },

      /***/ './node_modules/form-data/lib/browser.js':
        /*!***********************************************!*\
  !*** ./node_modules/form-data/lib/browser.js ***!
  \***********************************************/
        /***/ (module) => {
          /* eslint-env browser */
          module.exports =
            typeof self == 'object' ? self.FormData : window.FormData

          /***/
        },

      /***/ './node_modules/function-bind/implementation.js':
        /*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
        /***/ (module) => {
          'use strict'

          /* eslint no-invalid-this: 1 */

          var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible '
          var slice = Array.prototype.slice
          var toStr = Object.prototype.toString
          var funcType = '[object Function]'

          module.exports = function bind(that) {
            var target = this
            if (
              typeof target !== 'function' ||
              toStr.call(target) !== funcType
            ) {
              throw new TypeError(ERROR_MESSAGE + target)
            }
            var args = slice.call(arguments, 1)

            var bound
            var binder = function () {
              if (this instanceof bound) {
                var result = target.apply(
                  this,
                  args.concat(slice.call(arguments))
                )
                if (Object(result) === result) {
                  return result
                }
                return this
              } else {
                return target.apply(that, args.concat(slice.call(arguments)))
              }
            }

            var boundLength = Math.max(0, target.length - args.length)
            var boundArgs = []
            for (var i = 0; i < boundLength; i++) {
              boundArgs.push('$' + i)
            }

            bound = Function(
              'binder',
              'return function (' +
                boundArgs.join(',') +
                '){ return binder.apply(this,arguments); }'
            )(binder)

            if (target.prototype) {
              var Empty = function Empty() {}
              Empty.prototype = target.prototype
              bound.prototype = new Empty()
              Empty.prototype = null
            }

            return bound
          }

          /***/
        },

      /***/ './node_modules/function-bind/index.js':
        /*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var implementation = __webpack_require__(
            /*! ./implementation */ './node_modules/function-bind/implementation.js'
          )

          module.exports = Function.prototype.bind || implementation

          /***/
        },

      /***/ './node_modules/get-intrinsic/index.js':
        /*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var undefined

          var $SyntaxError = SyntaxError
          var $Function = Function
          var $TypeError = TypeError

          // eslint-disable-next-line consistent-return
          var getEvalledConstructor = function (expressionSyntax) {
            try {
              return $Function(
                '"use strict"; return (' + expressionSyntax + ').constructor;'
              )()
            } catch (e) {}
          }

          var $gOPD = Object.getOwnPropertyDescriptor
          if ($gOPD) {
            try {
              $gOPD({}, '')
            } catch (e) {
              $gOPD = null // this is IE 8, which has a broken gOPD
            }
          }

          var throwTypeError = function () {
            throw new $TypeError()
          }
          var ThrowTypeError = $gOPD
            ? (function () {
                try {
                  // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
                  arguments.callee // IE 8 does not throw here
                  return throwTypeError
                } catch (calleeThrows) {
                  try {
                    // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
                    return $gOPD(arguments, 'callee').get
                  } catch (gOPDthrows) {
                    return throwTypeError
                  }
                }
              })()
            : throwTypeError

          var hasSymbols = __webpack_require__(
            /*! has-symbols */ './node_modules/has-symbols/index.js'
          )()

          var getProto =
            Object.getPrototypeOf ||
            function (x) {
              return x.__proto__
            } // eslint-disable-line no-proto

          var needsEval = {}

          var TypedArray =
            typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array)

          var INTRINSICS = {
            '%AggregateError%':
              typeof AggregateError === 'undefined'
                ? undefined
                : AggregateError,
            '%Array%': Array,
            '%ArrayBuffer%':
              typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
            '%ArrayIteratorPrototype%': hasSymbols
              ? getProto([][Symbol.iterator]())
              : undefined,
            '%AsyncFromSyncIteratorPrototype%': undefined,
            '%AsyncFunction%': needsEval,
            '%AsyncGenerator%': needsEval,
            '%AsyncGeneratorFunction%': needsEval,
            '%AsyncIteratorPrototype%': needsEval,
            '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
            '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
            '%Boolean%': Boolean,
            '%DataView%':
              typeof DataView === 'undefined' ? undefined : DataView,
            '%Date%': Date,
            '%decodeURI%': decodeURI,
            '%decodeURIComponent%': decodeURIComponent,
            '%encodeURI%': encodeURI,
            '%encodeURIComponent%': encodeURIComponent,
            '%Error%': Error,
            '%eval%': eval, // eslint-disable-line no-eval
            '%EvalError%': EvalError,
            '%Float32Array%':
              typeof Float32Array === 'undefined' ? undefined : Float32Array,
            '%Float64Array%':
              typeof Float64Array === 'undefined' ? undefined : Float64Array,
            '%FinalizationRegistry%':
              typeof FinalizationRegistry === 'undefined'
                ? undefined
                : FinalizationRegistry,
            '%Function%': $Function,
            '%GeneratorFunction%': needsEval,
            '%Int8Array%':
              typeof Int8Array === 'undefined' ? undefined : Int8Array,
            '%Int16Array%':
              typeof Int16Array === 'undefined' ? undefined : Int16Array,
            '%Int32Array%':
              typeof Int32Array === 'undefined' ? undefined : Int32Array,
            '%isFinite%': isFinite,
            '%isNaN%': isNaN,
            '%IteratorPrototype%': hasSymbols
              ? getProto(getProto([][Symbol.iterator]()))
              : undefined,
            '%JSON%': typeof JSON === 'object' ? JSON : undefined,
            '%Map%': typeof Map === 'undefined' ? undefined : Map,
            '%MapIteratorPrototype%':
              typeof Map === 'undefined' || !hasSymbols
                ? undefined
                : getProto(new Map()[Symbol.iterator]()),
            '%Math%': Math,
            '%Number%': Number,
            '%Object%': Object,
            '%parseFloat%': parseFloat,
            '%parseInt%': parseInt,
            '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
            '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
            '%RangeError%': RangeError,
            '%ReferenceError%': ReferenceError,
            '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
            '%RegExp%': RegExp,
            '%Set%': typeof Set === 'undefined' ? undefined : Set,
            '%SetIteratorPrototype%':
              typeof Set === 'undefined' || !hasSymbols
                ? undefined
                : getProto(new Set()[Symbol.iterator]()),
            '%SharedArrayBuffer%':
              typeof SharedArrayBuffer === 'undefined'
                ? undefined
                : SharedArrayBuffer,
            '%String%': String,
            '%StringIteratorPrototype%': hasSymbols
              ? getProto(''[Symbol.iterator]())
              : undefined,
            '%Symbol%': hasSymbols ? Symbol : undefined,
            '%SyntaxError%': $SyntaxError,
            '%ThrowTypeError%': ThrowTypeError,
            '%TypedArray%': TypedArray,
            '%TypeError%': $TypeError,
            '%Uint8Array%':
              typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
            '%Uint8ClampedArray%':
              typeof Uint8ClampedArray === 'undefined'
                ? undefined
                : Uint8ClampedArray,
            '%Uint16Array%':
              typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
            '%Uint32Array%':
              typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
            '%URIError%': URIError,
            '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
            '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
            '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
          }

          var doEval = function doEval(name) {
            var value
            if (name === '%AsyncFunction%') {
              value = getEvalledConstructor('async function () {}')
            } else if (name === '%GeneratorFunction%') {
              value = getEvalledConstructor('function* () {}')
            } else if (name === '%AsyncGeneratorFunction%') {
              value = getEvalledConstructor('async function* () {}')
            } else if (name === '%AsyncGenerator%') {
              var fn = doEval('%AsyncGeneratorFunction%')
              if (fn) {
                value = fn.prototype
              }
            } else if (name === '%AsyncIteratorPrototype%') {
              var gen = doEval('%AsyncGenerator%')
              if (gen) {
                value = getProto(gen.prototype)
              }
            }

            INTRINSICS[name] = value

            return value
          }

          var LEGACY_ALIASES = {
            '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
            '%ArrayPrototype%': ['Array', 'prototype'],
            '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
            '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
            '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
            '%ArrayProto_values%': ['Array', 'prototype', 'values'],
            '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
            '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
            '%AsyncGeneratorPrototype%': [
              'AsyncGeneratorFunction',
              'prototype',
              'prototype',
            ],
            '%BooleanPrototype%': ['Boolean', 'prototype'],
            '%DataViewPrototype%': ['DataView', 'prototype'],
            '%DatePrototype%': ['Date', 'prototype'],
            '%ErrorPrototype%': ['Error', 'prototype'],
            '%EvalErrorPrototype%': ['EvalError', 'prototype'],
            '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
            '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
            '%FunctionPrototype%': ['Function', 'prototype'],
            '%Generator%': ['GeneratorFunction', 'prototype'],
            '%GeneratorPrototype%': [
              'GeneratorFunction',
              'prototype',
              'prototype',
            ],
            '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
            '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
            '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
            '%JSONParse%': ['JSON', 'parse'],
            '%JSONStringify%': ['JSON', 'stringify'],
            '%MapPrototype%': ['Map', 'prototype'],
            '%NumberPrototype%': ['Number', 'prototype'],
            '%ObjectPrototype%': ['Object', 'prototype'],
            '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
            '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
            '%PromisePrototype%': ['Promise', 'prototype'],
            '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
            '%Promise_all%': ['Promise', 'all'],
            '%Promise_reject%': ['Promise', 'reject'],
            '%Promise_resolve%': ['Promise', 'resolve'],
            '%RangeErrorPrototype%': ['RangeError', 'prototype'],
            '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
            '%RegExpPrototype%': ['RegExp', 'prototype'],
            '%SetPrototype%': ['Set', 'prototype'],
            '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
            '%StringPrototype%': ['String', 'prototype'],
            '%SymbolPrototype%': ['Symbol', 'prototype'],
            '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
            '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
            '%TypeErrorPrototype%': ['TypeError', 'prototype'],
            '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
            '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
            '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
            '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
            '%URIErrorPrototype%': ['URIError', 'prototype'],
            '%WeakMapPrototype%': ['WeakMap', 'prototype'],
            '%WeakSetPrototype%': ['WeakSet', 'prototype'],
          }

          var bind = __webpack_require__(
            /*! function-bind */ './node_modules/function-bind/index.js'
          )
          var hasOwn = __webpack_require__(
            /*! has */ './node_modules/has/src/index.js'
          )
          var $concat = bind.call(Function.call, Array.prototype.concat)
          var $spliceApply = bind.call(Function.apply, Array.prototype.splice)
          var $replace = bind.call(Function.call, String.prototype.replace)
          var $strSlice = bind.call(Function.call, String.prototype.slice)

          /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
          var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g
          var reEscapeChar = /\\(\\)?/g /** Used to match backslashes in property paths. */
          var stringToPath = function stringToPath(string) {
            var first = $strSlice(string, 0, 1)
            var last = $strSlice(string, -1)
            if (first === '%' && last !== '%') {
              throw new $SyntaxError(
                'invalid intrinsic syntax, expected closing `%`'
              )
            } else if (last === '%' && first !== '%') {
              throw new $SyntaxError(
                'invalid intrinsic syntax, expected opening `%`'
              )
            }
            var result = []
            $replace(
              string,
              rePropName,
              function (match, number, quote, subString) {
                result[result.length] = quote
                  ? $replace(subString, reEscapeChar, '$1')
                  : number || match
              }
            )
            return result
          }
          /* end adaptation */

          var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
            var intrinsicName = name
            var alias
            if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
              alias = LEGACY_ALIASES[intrinsicName]
              intrinsicName = '%' + alias[0] + '%'
            }

            if (hasOwn(INTRINSICS, intrinsicName)) {
              var value = INTRINSICS[intrinsicName]
              if (value === needsEval) {
                value = doEval(intrinsicName)
              }
              if (typeof value === 'undefined' && !allowMissing) {
                throw new $TypeError(
                  'intrinsic ' +
                    name +
                    ' exists, but is not available. Please file an issue!'
                )
              }

              return {
                alias: alias,
                name: intrinsicName,
                value: value,
              }
            }

            throw new $SyntaxError('intrinsic ' + name + ' does not exist!')
          }

          module.exports = function GetIntrinsic(name, allowMissing) {
            if (typeof name !== 'string' || name.length === 0) {
              throw new $TypeError('intrinsic name must be a non-empty string')
            }
            if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
              throw new $TypeError('"allowMissing" argument must be a boolean')
            }

            var parts = stringToPath(name)
            var intrinsicBaseName = parts.length > 0 ? parts[0] : ''

            var intrinsic = getBaseIntrinsic(
              '%' + intrinsicBaseName + '%',
              allowMissing
            )
            var intrinsicRealName = intrinsic.name
            var value = intrinsic.value
            var skipFurtherCaching = false

            var alias = intrinsic.alias
            if (alias) {
              intrinsicBaseName = alias[0]
              $spliceApply(parts, $concat([0, 1], alias))
            }

            for (var i = 1, isOwn = true; i < parts.length; i += 1) {
              var part = parts[i]
              var first = $strSlice(part, 0, 1)
              var last = $strSlice(part, -1)
              if (
                (first === '"' ||
                  first === "'" ||
                  first === '`' ||
                  last === '"' ||
                  last === "'" ||
                  last === '`') &&
                first !== last
              ) {
                throw new $SyntaxError(
                  'property names with quotes must have matching quotes'
                )
              }
              if (part === 'constructor' || !isOwn) {
                skipFurtherCaching = true
              }

              intrinsicBaseName += '.' + part
              intrinsicRealName = '%' + intrinsicBaseName + '%'

              if (hasOwn(INTRINSICS, intrinsicRealName)) {
                value = INTRINSICS[intrinsicRealName]
              } else if (value != null) {
                if (!(part in value)) {
                  if (!allowMissing) {
                    throw new $TypeError(
                      'base intrinsic for ' +
                        name +
                        ' exists, but the property is not available.'
                    )
                  }
                  return void undefined
                }
                if ($gOPD && i + 1 >= parts.length) {
                  var desc = $gOPD(value, part)
                  isOwn = !!desc

                  // By convention, when a data property is converted to an accessor
                  // property to emulate a data property that does not suffer from
                  // the override mistake, that accessor's getter is marked with
                  // an `originalValue` property. Here, when we detect this, we
                  // uphold the illusion by pretending to see that original data
                  // property, i.e., returning the value rather than the getter
                  // itself.
                  if (
                    isOwn &&
                    'get' in desc &&
                    !('originalValue' in desc.get)
                  ) {
                    value = desc.get
                  } else {
                    value = value[part]
                  }
                } else {
                  isOwn = hasOwn(value, part)
                  value = value[part]
                }

                if (isOwn && !skipFurtherCaching) {
                  INTRINSICS[intrinsicRealName] = value
                }
              }
            }
            return value
          }

          /***/
        },

      /***/ './node_modules/has-symbols/index.js':
        /*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var origSymbol = typeof Symbol !== 'undefined' && Symbol
          var hasSymbolSham = __webpack_require__(
            /*! ./shams */ './node_modules/has-symbols/shams.js'
          )

          module.exports = function hasNativeSymbols() {
            if (typeof origSymbol !== 'function') {
              return false
            }
            if (typeof Symbol !== 'function') {
              return false
            }
            if (typeof origSymbol('foo') !== 'symbol') {
              return false
            }
            if (typeof Symbol('bar') !== 'symbol') {
              return false
            }

            return hasSymbolSham()
          }

          /***/
        },

      /***/ './node_modules/has-symbols/shams.js':
        /*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
        /***/ (module) => {
          'use strict'

          /* eslint complexity: [2, 18], max-statements: [2, 33] */
          module.exports = function hasSymbols() {
            if (
              typeof Symbol !== 'function' ||
              typeof Object.getOwnPropertySymbols !== 'function'
            ) {
              return false
            }
            if (typeof Symbol.iterator === 'symbol') {
              return true
            }

            var obj = {}
            var sym = Symbol('test')
            var symObj = Object(sym)
            if (typeof sym === 'string') {
              return false
            }

            if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
              return false
            }
            if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
              return false
            }

            // temp disabled per https://github.com/ljharb/object.assign/issues/17
            // if (sym instanceof Symbol) { return false; }
            // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
            // if (!(symObj instanceof Symbol)) { return false; }

            // if (typeof Symbol.prototype.toString !== 'function') { return false; }
            // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

            var symVal = 42
            obj[sym] = symVal
            for (sym in obj) {
              return false
            } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
            if (
              typeof Object.keys === 'function' &&
              Object.keys(obj).length !== 0
            ) {
              return false
            }

            if (
              typeof Object.getOwnPropertyNames === 'function' &&
              Object.getOwnPropertyNames(obj).length !== 0
            ) {
              return false
            }

            var syms = Object.getOwnPropertySymbols(obj)
            if (syms.length !== 1 || syms[0] !== sym) {
              return false
            }

            if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
              return false
            }

            if (typeof Object.getOwnPropertyDescriptor === 'function') {
              var descriptor = Object.getOwnPropertyDescriptor(obj, sym)
              if (
                descriptor.value !== symVal ||
                descriptor.enumerable !== true
              ) {
                return false
              }
            }

            return true
          }

          /***/
        },

      /***/ './node_modules/has/src/index.js':
        /*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var bind = __webpack_require__(
            /*! function-bind */ './node_modules/function-bind/index.js'
          )

          module.exports = bind.call(
            Function.call,
            Object.prototype.hasOwnProperty
          )

          /***/
        },

      /***/ './node_modules/inherits/inherits_browser.js':
        /*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
        /***/ (module) => {
          if (typeof Object.create === 'function') {
            // implementation from standard node.js 'util' module
            module.exports = function inherits(ctor, superCtor) {
              if (superCtor) {
                ctor.super_ = superCtor
                ctor.prototype = Object.create(superCtor.prototype, {
                  constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true,
                  },
                })
              }
            }
          } else {
            // old school shim for old browsers
            module.exports = function inherits(ctor, superCtor) {
              if (superCtor) {
                ctor.super_ = superCtor
                var TempCtor = function () {}
                TempCtor.prototype = superCtor.prototype
                ctor.prototype = new TempCtor()
                ctor.prototype.constructor = ctor
              }
            }
          }

          /***/
        },

      /***/ './node_modules/is-arguments/index.js':
        /*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var hasToStringTag =
            typeof Symbol === 'function' &&
            typeof Symbol.toStringTag === 'symbol'
          var callBound = __webpack_require__(
            /*! call-bind/callBound */ './node_modules/call-bind/callBound.js'
          )

          var $toString = callBound('Object.prototype.toString')

          var isStandardArguments = function isArguments(value) {
            if (
              hasToStringTag &&
              value &&
              typeof value === 'object' &&
              Symbol.toStringTag in value
            ) {
              return false
            }
            return $toString(value) === '[object Arguments]'
          }

          var isLegacyArguments = function isArguments(value) {
            if (isStandardArguments(value)) {
              return true
            }
            return (
              value !== null &&
              typeof value === 'object' &&
              typeof value.length === 'number' &&
              value.length >= 0 &&
              $toString(value) !== '[object Array]' &&
              $toString(value.callee) === '[object Function]'
            )
          }

          var supportsStandardArguments = (function () {
            return isStandardArguments(arguments)
          })()

          isStandardArguments.isLegacyArguments = isLegacyArguments // for tests

          module.exports = supportsStandardArguments
            ? isStandardArguments
            : isLegacyArguments

          /***/
        },

      /***/ './node_modules/is-generator-function/index.js':
        /*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
        /***/ (module) => {
          'use strict'

          var toStr = Object.prototype.toString
          var fnToStr = Function.prototype.toString
          var isFnRegex = /^\s*(?:function)?\*/
          var hasToStringTag =
            typeof Symbol === 'function' &&
            typeof Symbol.toStringTag === 'symbol'
          var getProto = Object.getPrototypeOf
          var getGeneratorFunc = function () {
            // eslint-disable-line consistent-return
            if (!hasToStringTag) {
              return false
            }
            try {
              return Function('return function*() {}')()
            } catch (e) {}
          }
          var generatorFunc = getGeneratorFunc()
          var GeneratorFunction =
            getProto && generatorFunc ? getProto(generatorFunc) : false

          module.exports = function isGeneratorFunction(fn) {
            if (typeof fn !== 'function') {
              return false
            }
            if (isFnRegex.test(fnToStr.call(fn))) {
              return true
            }
            if (!hasToStringTag) {
              var str = toStr.call(fn)
              return str === '[object GeneratorFunction]'
            }
            return getProto && getProto(fn) === GeneratorFunction
          }

          /***/
        },

      /***/ './node_modules/is-nan/implementation.js':
        /*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
        /***/ (module) => {
          'use strict'

          /* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

          module.exports = function isNaN(value) {
            return value !== value
          }

          /***/
        },

      /***/ './node_modules/is-nan/index.js':
        /*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var callBind = __webpack_require__(
            /*! call-bind */ './node_modules/call-bind/index.js'
          )
          var define = __webpack_require__(
            /*! define-properties */ './node_modules/define-properties/index.js'
          )

          var implementation = __webpack_require__(
            /*! ./implementation */ './node_modules/is-nan/implementation.js'
          )
          var getPolyfill = __webpack_require__(
            /*! ./polyfill */ './node_modules/is-nan/polyfill.js'
          )
          var shim = __webpack_require__(
            /*! ./shim */ './node_modules/is-nan/shim.js'
          )

          var polyfill = callBind(getPolyfill(), Number)

          /* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

          define(polyfill, {
            getPolyfill: getPolyfill,
            implementation: implementation,
            shim: shim,
          })

          module.exports = polyfill

          /***/
        },

      /***/ './node_modules/is-nan/polyfill.js':
        /*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var implementation = __webpack_require__(
            /*! ./implementation */ './node_modules/is-nan/implementation.js'
          )

          module.exports = function getPolyfill() {
            if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
              return Number.isNaN
            }
            return implementation
          }

          /***/
        },

      /***/ './node_modules/is-nan/shim.js':
        /*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var define = __webpack_require__(
            /*! define-properties */ './node_modules/define-properties/index.js'
          )
          var getPolyfill = __webpack_require__(
            /*! ./polyfill */ './node_modules/is-nan/polyfill.js'
          )

          /* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

          module.exports = function shimNumberIsNaN() {
            var polyfill = getPolyfill()
            define(Number, { isNaN: polyfill }, {
              isNaN: function testIsNaN() {
                return Number.isNaN !== polyfill
              },
            })
            return polyfill
          }

          /***/
        },

      /***/ './node_modules/is-typed-array/index.js':
        /*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var forEach = __webpack_require__(
            /*! foreach */ './node_modules/foreach/index.js'
          )
          var availableTypedArrays = __webpack_require__(
            /*! available-typed-arrays */ './node_modules/available-typed-arrays/index.js'
          )
          var callBound = __webpack_require__(
            /*! call-bind/callBound */ './node_modules/call-bind/callBound.js'
          )

          var $toString = callBound('Object.prototype.toString')
          var hasSymbols = __webpack_require__(
            /*! has-symbols */ './node_modules/has-symbols/index.js'
          )()
          var hasToStringTag =
            hasSymbols && typeof Symbol.toStringTag === 'symbol'

          var typedArrays = availableTypedArrays()

          var $indexOf =
            callBound('Array.prototype.indexOf', true) ||
            function indexOf(array, value) {
              for (var i = 0; i < array.length; i += 1) {
                if (array[i] === value) {
                  return i
                }
              }
              return -1
            }
          var $slice = callBound('String.prototype.slice')
          var toStrTags = {}
          var gOPD = __webpack_require__(
            /*! es-abstract/helpers/getOwnPropertyDescriptor */ './node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js'
          )
          var getPrototypeOf = Object.getPrototypeOf // require('getprototypeof');
          if (hasToStringTag && gOPD && getPrototypeOf) {
            forEach(typedArrays, function (typedArray) {
              var arr = new __webpack_require__.g[typedArray]()
              if (!(Symbol.toStringTag in arr)) {
                throw new EvalError(
                  'this engine has support for Symbol.toStringTag, but ' +
                    typedArray +
                    ' does not have the property! Please report this.'
                )
              }
              var proto = getPrototypeOf(arr)
              var descriptor = gOPD(proto, Symbol.toStringTag)
              if (!descriptor) {
                var superProto = getPrototypeOf(proto)
                descriptor = gOPD(superProto, Symbol.toStringTag)
              }
              toStrTags[typedArray] = descriptor.get
            })
          }

          var tryTypedArrays = function tryAllTypedArrays(value) {
            var anyTrue = false
            forEach(toStrTags, function (getter, typedArray) {
              if (!anyTrue) {
                try {
                  anyTrue = getter.call(value) === typedArray
                } catch (e) {
                  /**/
                }
              }
            })
            return anyTrue
          }

          module.exports = function isTypedArray(value) {
            if (!value || typeof value !== 'object') {
              return false
            }
            if (!hasToStringTag) {
              var tag = $slice($toString(value), 8, -1)
              return $indexOf(typedArrays, tag) > -1
            }
            if (!gOPD) {
              return false
            }
            return tryTypedArrays(value)
          }

          /***/
        },

      /***/ './node_modules/object-is/implementation.js':
        /*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
        /***/ (module) => {
          'use strict'

          var numberIsNaN = function (value) {
            return value !== value
          }

          module.exports = function is(a, b) {
            if (a === 0 && b === 0) {
              return 1 / a === 1 / b
            }
            if (a === b) {
              return true
            }
            if (numberIsNaN(a) && numberIsNaN(b)) {
              return true
            }
            return false
          }

          /***/
        },

      /***/ './node_modules/object-is/index.js':
        /*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var define = __webpack_require__(
            /*! define-properties */ './node_modules/define-properties/index.js'
          )
          var callBind = __webpack_require__(
            /*! call-bind */ './node_modules/call-bind/index.js'
          )

          var implementation = __webpack_require__(
            /*! ./implementation */ './node_modules/object-is/implementation.js'
          )
          var getPolyfill = __webpack_require__(
            /*! ./polyfill */ './node_modules/object-is/polyfill.js'
          )
          var shim = __webpack_require__(
            /*! ./shim */ './node_modules/object-is/shim.js'
          )

          var polyfill = callBind(getPolyfill(), Object)

          define(polyfill, {
            getPolyfill: getPolyfill,
            implementation: implementation,
            shim: shim,
          })

          module.exports = polyfill

          /***/
        },

      /***/ './node_modules/object-is/polyfill.js':
        /*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var implementation = __webpack_require__(
            /*! ./implementation */ './node_modules/object-is/implementation.js'
          )

          module.exports = function getPolyfill() {
            return typeof Object.is === 'function' ? Object.is : implementation
          }

          /***/
        },

      /***/ './node_modules/object-is/shim.js':
        /*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var getPolyfill = __webpack_require__(
            /*! ./polyfill */ './node_modules/object-is/polyfill.js'
          )
          var define = __webpack_require__(
            /*! define-properties */ './node_modules/define-properties/index.js'
          )

          module.exports = function shimObjectIs() {
            var polyfill = getPolyfill()
            define(Object, { is: polyfill }, {
              is: function testObjectIs() {
                return Object.is !== polyfill
              },
            })
            return polyfill
          }

          /***/
        },

      /***/ './node_modules/object-keys/implementation.js':
        /*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var keysShim
          if (!Object.keys) {
            // modified from https://github.com/es-shims/es5-shim
            var has = Object.prototype.hasOwnProperty
            var toStr = Object.prototype.toString
            var isArgs = __webpack_require__(
              /*! ./isArguments */ './node_modules/object-keys/isArguments.js'
            ) // eslint-disable-line global-require
            var isEnumerable = Object.prototype.propertyIsEnumerable
            var hasDontEnumBug = !isEnumerable.call(
              { toString: null },
              'toString'
            )
            var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype')
            var dontEnums = [
              'toString',
              'toLocaleString',
              'valueOf',
              'hasOwnProperty',
              'isPrototypeOf',
              'propertyIsEnumerable',
              'constructor',
            ]
            var equalsConstructorPrototype = function (o) {
              var ctor = o.constructor
              return ctor && ctor.prototype === o
            }
            var excludedKeys = {
              $applicationCache: true,
              $console: true,
              $external: true,
              $frame: true,
              $frameElement: true,
              $frames: true,
              $innerHeight: true,
              $innerWidth: true,
              $onmozfullscreenchange: true,
              $onmozfullscreenerror: true,
              $outerHeight: true,
              $outerWidth: true,
              $pageXOffset: true,
              $pageYOffset: true,
              $parent: true,
              $scrollLeft: true,
              $scrollTop: true,
              $scrollX: true,
              $scrollY: true,
              $self: true,
              $webkitIndexedDB: true,
              $webkitStorageInfo: true,
              $window: true,
            }
            var hasAutomationEqualityBug = (function () {
              /* global window */
              if (typeof window === 'undefined') {
                return false
              }
              for (var k in window) {
                try {
                  if (
                    !excludedKeys['$' + k] &&
                    has.call(window, k) &&
                    window[k] !== null &&
                    typeof window[k] === 'object'
                  ) {
                    try {
                      equalsConstructorPrototype(window[k])
                    } catch (e) {
                      return true
                    }
                  }
                } catch (e) {
                  return true
                }
              }
              return false
            })()
            var equalsConstructorPrototypeIfNotBuggy = function (o) {
              /* global window */
              if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
                return equalsConstructorPrototype(o)
              }
              try {
                return equalsConstructorPrototype(o)
              } catch (e) {
                return false
              }
            }

            keysShim = function keys(object) {
              var isObject = object !== null && typeof object === 'object'
              var isFunction = toStr.call(object) === '[object Function]'
              var isArguments = isArgs(object)
              var isString =
                isObject && toStr.call(object) === '[object String]'
              var theKeys = []

              if (!isObject && !isFunction && !isArguments) {
                throw new TypeError('Object.keys called on a non-object')
              }

              var skipProto = hasProtoEnumBug && isFunction
              if (isString && object.length > 0 && !has.call(object, 0)) {
                for (var i = 0; i < object.length; ++i) {
                  theKeys.push(String(i))
                }
              }

              if (isArguments && object.length > 0) {
                for (var j = 0; j < object.length; ++j) {
                  theKeys.push(String(j))
                }
              } else {
                for (var name in object) {
                  if (
                    !(skipProto && name === 'prototype') &&
                    has.call(object, name)
                  ) {
                    theKeys.push(String(name))
                  }
                }
              }

              if (hasDontEnumBug) {
                var skipConstructor = equalsConstructorPrototypeIfNotBuggy(
                  object
                )

                for (var k = 0; k < dontEnums.length; ++k) {
                  if (
                    !(skipConstructor && dontEnums[k] === 'constructor') &&
                    has.call(object, dontEnums[k])
                  ) {
                    theKeys.push(dontEnums[k])
                  }
                }
              }
              return theKeys
            }
          }
          module.exports = keysShim

          /***/
        },

      /***/ './node_modules/object-keys/index.js':
        /*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var slice = Array.prototype.slice
          var isArgs = __webpack_require__(
            /*! ./isArguments */ './node_modules/object-keys/isArguments.js'
          )

          var origKeys = Object.keys
          var keysShim = origKeys
            ? function keys(o) {
                return origKeys(o)
              }
            : __webpack_require__(
                /*! ./implementation */ './node_modules/object-keys/implementation.js'
              )

          var originalKeys = Object.keys

          keysShim.shim = function shimObjectKeys() {
            if (Object.keys) {
              var keysWorksWithArguments = (function () {
                // Safari 5.0 bug
                var args = Object.keys(arguments)
                return args && args.length === arguments.length
              })(1, 2)
              if (!keysWorksWithArguments) {
                Object.keys = function keys(object) {
                  // eslint-disable-line func-name-matching
                  if (isArgs(object)) {
                    return originalKeys(slice.call(object))
                  }
                  return originalKeys(object)
                }
              }
            } else {
              Object.keys = keysShim
            }
            return Object.keys || keysShim
          }

          module.exports = keysShim

          /***/
        },

      /***/ './node_modules/object-keys/isArguments.js':
        /*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
        /***/ (module) => {
          'use strict'

          var toStr = Object.prototype.toString

          module.exports = function isArguments(value) {
            var str = toStr.call(value)
            var isArgs = str === '[object Arguments]'
            if (!isArgs) {
              isArgs =
                str !== '[object Array]' &&
                value !== null &&
                typeof value === 'object' &&
                typeof value.length === 'number' &&
                value.length >= 0 &&
                toStr.call(value.callee) === '[object Function]'
            }
            return isArgs
          }

          /***/
        },

      /***/ './node_modules/process/browser.js':
        /*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
        /***/ (module) => {
          // shim for using process in browser
          var process = (module.exports = {})

          // cached from whatever global is present so that test runners that stub it
          // don't break things.  But we need to wrap it in a try catch in case it is
          // wrapped in strict mode code which doesn't define any globals.  It's inside a
          // function because try/catches deoptimize in certain engines.

          var cachedSetTimeout
          var cachedClearTimeout

          function defaultSetTimout() {
            throw new Error('setTimeout has not been defined')
          }
          function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined')
          }
          ;(function () {
            try {
              if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout
              } else {
                cachedSetTimeout = defaultSetTimout
              }
            } catch (e) {
              cachedSetTimeout = defaultSetTimout
            }
            try {
              if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout
              } else {
                cachedClearTimeout = defaultClearTimeout
              }
            } catch (e) {
              cachedClearTimeout = defaultClearTimeout
            }
          })()
          function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
              //normal enviroments in sane situations
              return setTimeout(fun, 0)
            }
            // if setTimeout wasn't available but was latter defined
            if (
              (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
              setTimeout
            ) {
              cachedSetTimeout = setTimeout
              return setTimeout(fun, 0)
            }
            try {
              // when when somebody has screwed with setTimeout but no I.E. maddness
              return cachedSetTimeout(fun, 0)
            } catch (e) {
              try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0)
              } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0)
              }
            }
          }
          function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
              //normal enviroments in sane situations
              return clearTimeout(marker)
            }
            // if clearTimeout wasn't available but was latter defined
            if (
              (cachedClearTimeout === defaultClearTimeout ||
                !cachedClearTimeout) &&
              clearTimeout
            ) {
              cachedClearTimeout = clearTimeout
              return clearTimeout(marker)
            }
            try {
              // when when somebody has screwed with setTimeout but no I.E. maddness
              return cachedClearTimeout(marker)
            } catch (e) {
              try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker)
              } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker)
              }
            }
          }
          var queue = []
          var draining = false
          var currentQueue
          var queueIndex = -1

          function cleanUpNextTick() {
            if (!draining || !currentQueue) {
              return
            }
            draining = false
            if (currentQueue.length) {
              queue = currentQueue.concat(queue)
            } else {
              queueIndex = -1
            }
            if (queue.length) {
              drainQueue()
            }
          }

          function drainQueue() {
            if (draining) {
              return
            }
            var timeout = runTimeout(cleanUpNextTick)
            draining = true

            var len = queue.length
            while (len) {
              currentQueue = queue
              queue = []
              while (++queueIndex < len) {
                if (currentQueue) {
                  currentQueue[queueIndex].run()
                }
              }
              queueIndex = -1
              len = queue.length
            }
            currentQueue = null
            draining = false
            runClearTimeout(timeout)
          }

          process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1)
            if (arguments.length > 1) {
              for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i]
              }
            }
            queue.push(new Item(fun, args))
            if (queue.length === 1 && !draining) {
              runTimeout(drainQueue)
            }
          }

          // v8 likes predictible objects
          function Item(fun, array) {
            this.fun = fun
            this.array = array
          }
          Item.prototype.run = function () {
            this.fun.apply(null, this.array)
          }
          process.title = 'browser'
          process.browser = true
          process.env = {}
          process.argv = []
          process.version = '' // empty string to avoid regexp issues
          process.versions = {}

          function noop() {}

          process.on = noop
          process.addListener = noop
          process.once = noop
          process.off = noop
          process.removeListener = noop
          process.removeAllListeners = noop
          process.emit = noop
          process.prependListener = noop
          process.prependOnceListener = noop

          process.listeners = function (name) {
            return []
          }

          process.binding = function (name) {
            throw new Error('process.binding is not supported')
          }

          process.cwd = function () {
            return '/'
          }
          process.chdir = function (dir) {
            throw new Error('process.chdir is not supported')
          }
          process.umask = function () {
            return 0
          }

          /***/
        },

      /***/ './node_modules/querystring/decode.js':
        /*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
        /***/ (module) => {
          'use strict'
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          // If obj.hasOwnProperty has been overridden, then calling
          // obj.hasOwnProperty(prop) will break.
          // See: https://github.com/joyent/node/issues/1707
          function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop)
          }

          module.exports = function (qs, sep, eq, options) {
            sep = sep || '&'
            eq = eq || '='
            var obj = {}

            if (typeof qs !== 'string' || qs.length === 0) {
              return obj
            }

            var regexp = /\+/g
            qs = qs.split(sep)

            var maxKeys = 1000
            if (options && typeof options.maxKeys === 'number') {
              maxKeys = options.maxKeys
            }

            var len = qs.length
            // maxKeys <= 0 means that we should not limit keys count
            if (maxKeys > 0 && len > maxKeys) {
              len = maxKeys
            }

            for (var i = 0; i < len; ++i) {
              var x = qs[i].replace(regexp, '%20'),
                idx = x.indexOf(eq),
                kstr,
                vstr,
                k,
                v

              if (idx >= 0) {
                kstr = x.substr(0, idx)
                vstr = x.substr(idx + 1)
              } else {
                kstr = x
                vstr = ''
              }

              k = decodeURIComponent(kstr)
              v = decodeURIComponent(vstr)

              if (!hasOwnProperty(obj, k)) {
                obj[k] = v
              } else if (Array.isArray(obj[k])) {
                obj[k].push(v)
              } else {
                obj[k] = [obj[k], v]
              }
            }

            return obj
          }

          /***/
        },

      /***/ './node_modules/querystring/encode.js':
        /*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
        /***/ (module) => {
          'use strict'
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var stringifyPrimitive = function (v) {
            switch (typeof v) {
              case 'string':
                return v

              case 'boolean':
                return v ? 'true' : 'false'

              case 'number':
                return isFinite(v) ? v : ''

              default:
                return ''
            }
          }

          module.exports = function (obj, sep, eq, name) {
            sep = sep || '&'
            eq = eq || '='
            if (obj === null) {
              obj = undefined
            }

            if (typeof obj === 'object') {
              return Object.keys(obj)
                .map(function (k) {
                  var ks = encodeURIComponent(stringifyPrimitive(k)) + eq
                  if (Array.isArray(obj[k])) {
                    return obj[k]
                      .map(function (v) {
                        return ks + encodeURIComponent(stringifyPrimitive(v))
                      })
                      .join(sep)
                  } else {
                    return ks + encodeURIComponent(stringifyPrimitive(obj[k]))
                  }
                })
                .join(sep)
            }

            if (!name) return ''
            return (
              encodeURIComponent(stringifyPrimitive(name)) +
              eq +
              encodeURIComponent(stringifyPrimitive(obj))
            )
          }

          /***/
        },

      /***/ './node_modules/querystring/index.js':
        /*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          exports.decode = exports.parse = __webpack_require__(
            /*! ./decode */ './node_modules/querystring/decode.js'
          )
          exports.encode = exports.stringify = __webpack_require__(
            /*! ./encode */ './node_modules/querystring/encode.js'
          )

          /***/
        },

      /***/ './src/album/getAlbum.ts':
        /*!*******************************!*\
  !*** ./src/album/getAlbum.ts ***!
  \*******************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getAlbum = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          async function getAlbum(client, albumHash) {
            const url = `${endpoints_1.ALBUM_ENDPOINT}/${albumHash}`
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url })
            )
          }
          exports.getAlbum = getAlbum

          /***/
        },

      /***/ './src/album/index.ts':
        /*!****************************!*\
  !*** ./src/album/index.ts ***!
  \****************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          tslib_1.__exportStar(
            __webpack_require__(/*! ./getAlbum */ './src/album/getAlbum.ts'),
            exports
          )

          /***/
        },

      /***/ './src/client.ts':
        /*!***********************!*\
  !*** ./src/client.ts ***!
  \***********************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.ImgurClient = void 0
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          const events_1 = __webpack_require__(
            /*! events */ './node_modules/events/events.js'
          )
          const getAuthorizationHeader_1 = __webpack_require__(
            /*! ./getAuthorizationHeader */ './src/getAuthorizationHeader.ts'
          )
          const image_1 = __webpack_require__(
            /*! ./image */ './src/image/index.ts'
          )
          const gallery_1 = __webpack_require__(
            /*! ./gallery */ './src/gallery/index.ts'
          )
          const album_1 = __webpack_require__(
            /*! ./album */ './src/album/index.ts'
          )
          const endpoints_1 = __webpack_require__(
            /*! ./common/endpoints */ './src/common/endpoints.ts'
          )
          const USERAGENT =
            'imgur/next (https://github.com/kaimallea/node-imgur)'
          const axios_1 = tslib_1.__importDefault(
            __webpack_require__(/*! axios */ './node_modules/axios/index.js')
          )
          class ImgurClient extends events_1.EventEmitter {
            constructor(credentials) {
              super()
              this.credentials = credentials
              this.fetcher = axios_1.default.create({
                baseURL: endpoints_1.IMGUR_API_PREFIX,
                headers: {
                  'user-agent': USERAGENT,
                },
                responseType: 'json',
                // hooks: {
                //   beforeRequest: [
                //     async (options: any) => {
                //       options.headers['authorization'] = await getAuthorizationHeader(
                //         this
                //       )
                //     },
                //   ],
                // },
              })
              this.fetcher.interceptors.request.use(
                async (config) => {
                  // return new Promise(async resolve => {
                  config.headers = config.headers ? config.headers : {}
                  config.headers.authorization = await getAuthorizationHeader_1.getAuthorizationHeader(
                    this
                  )
                  // resolve(config)
                  // })
                  return config
                },
                (e) => Promise.reject(e)
              )
            }
            request(options = {}) {
              return this.fetcher(options)
            }
            deleteImage(imageHash) {
              return image_1.deleteImage(this, imageHash)
            }
            favoriteImage(imageHash) {
              return image_1.favoriteImage(this, imageHash)
            }
            getAlbum(albumHash) {
              return album_1.getAlbum(this, albumHash)
            }
            getGallery(options) {
              return gallery_1.getGallery(this, options)
            }
            getSubredditGallery(options) {
              return gallery_1.getSubredditGallery(this, options)
            }
            searchGallery(options) {
              return gallery_1.searchGallery(this, options)
            }
            getImage(imageHash) {
              return image_1.getImage(this, imageHash)
            }
            updateImage(payload) {
              return image_1.updateImage(this, payload)
            }
            upload(payload) {
              return image_1.upload(this, payload)
            }
          }
          exports.ImgurClient = ImgurClient

          /***/
        },

      /***/ './src/common/endpoints.ts':
        /*!*********************************!*\
  !*** ./src/common/endpoints.ts ***!
  \*********************************/
        /***/ (__unused_webpack_module, exports) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.SEARCH_GALLERY_ENDPOINT = exports.SUBREDDIT_GALLERY_ENDPOINT = exports.GALLERY_ENDPOINT = exports.UPLOAD_ENDPOINT = exports.IMAGE_ENDPOINT = exports.ALBUM_ENDPOINT = exports.AUTHORIZE_ENDPOINT = exports.API_VERSION = exports.IMGUR_API_PREFIX = void 0
          exports.IMGUR_API_PREFIX = 'https://api.imgur.com'
          exports.API_VERSION = '3'
          exports.AUTHORIZE_ENDPOINT = 'oauth2/authorize'
          exports.ALBUM_ENDPOINT = `${exports.API_VERSION}/album`
          exports.IMAGE_ENDPOINT = `${exports.API_VERSION}/image`
          exports.UPLOAD_ENDPOINT = `${exports.API_VERSION}/upload`
          exports.GALLERY_ENDPOINT = `${exports.API_VERSION}/gallery`
          exports.SUBREDDIT_GALLERY_ENDPOINT = `${exports.API_VERSION}/gallery/r`
          exports.SEARCH_GALLERY_ENDPOINT = `${exports.API_VERSION}/gallery/search`

          /***/
        },

      /***/ './src/common/types.ts':
        /*!*****************************!*\
  !*** ./src/common/types.ts ***!
  \*****************************/
        /***/ (__unused_webpack_module, exports) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.isLogin = exports.isClientId = exports.isAccessToken = void 0
          function isAccessToken(arg) {
            return arg.accessToken !== undefined
          }
          exports.isAccessToken = isAccessToken
          function isClientId(arg) {
            return arg.clientId !== undefined
          }
          exports.isClientId = isClientId
          function isLogin(arg) {
            return (
              arg.clientId !== undefined &&
              arg.username !== undefined &&
              arg.password !== undefined
            )
          }
          exports.isLogin = isLogin

          /***/
        },

      /***/ './src/common/utils.ts':
        /*!*****************************!*\
  !*** ./src/common/utils.ts ***!
  \*****************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getImgurApiResponseFromResponse = exports.createForm = exports.getSource = exports.isVideo = void 0
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          const form_data_1 = tslib_1.__importDefault(
            __webpack_require__(
              /*! form-data */ './node_modules/form-data/lib/browser.js'
            )
          )
          function isVideo(payload) {
            if (typeof payload === 'string') {
              return false
            }
            return typeof payload.video !== 'undefined'
          }
          exports.isVideo = isVideo
          function getSource(payload) {
            if (typeof payload === 'string') {
              return payload
            }
            if (isVideo(payload)) {
              return payload.video
            } else if (typeof payload.stream !== 'undefined') {
              return payload.stream
            } else {
              return payload.image
            }
          }
          exports.getSource = getSource
          function createForm(payload) {
            const form = new form_data_1.default()
            if (typeof payload === 'string') {
              // TODO: change this to url upload?
              form.append('image', payload)
              return form
            }
            for (const [key, value] of Object.entries(payload)) {
              if (key === 'image' || key === 'video') {
                if (!payload.type || payload.type === 'stream')
                  form.append(key, payload)
              } else {
                form.append(key, value)
              }
            }
            return form
          }
          exports.createForm = createForm
          function getImgurApiResponseFromResponse(response) {
            var _a, _b
            if (
              typeof ((_a = response.data) === null || _a === void 0
                ? void 0
                : _a.status) !== 'undefined' &&
              typeof ((_b = response.data) === null || _b === void 0
                ? void 0
                : _b.success) !== 'undefined'
            ) {
              return response.data
            }
            return {
              data: response.data,
              success: true,
              status: response.status,
            }
          }
          exports.getImgurApiResponseFromResponse = getImgurApiResponseFromResponse

          /***/
        },

      /***/ './src/gallery/getGallery.ts':
        /*!***********************************!*\
  !*** ./src/gallery/getGallery.ts ***!
  \***********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getGallery = exports.constructGalleryUrl = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const url_1 = __webpack_require__(
            /*! url */ './node_modules/url/url.js'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          const defaultOptions = {
            section: 'hot',
            sort: 'viral',
          }
          function constructGalleryUrl(options) {
            const mergedOptions = Object.assign({}, defaultOptions, options)
            let uri = `${mergedOptions.section}`
            if (mergedOptions.sort) {
              uri += `/${mergedOptions.sort}`
            }
            if (mergedOptions.section === 'top' && mergedOptions.window) {
              uri += `/${mergedOptions.window}`
            }
            if (mergedOptions.page) {
              uri += `/${mergedOptions.page}`
            }
            const url = new url_1.URL(
              `${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.GALLERY_ENDPOINT}/${uri}`
            )
            if (mergedOptions.showViral !== undefined) {
              url.searchParams.append(
                'showViral',
                mergedOptions.showViral.toString()
              )
            }
            if (mergedOptions.mature !== undefined) {
              url.searchParams.append('mature', mergedOptions.mature.toString())
            }
            if (mergedOptions.album_previews !== undefined) {
              url.searchParams.append(
                'album_previews',
                mergedOptions.album_previews.toString()
              )
            }
            return url
          }
          exports.constructGalleryUrl = constructGalleryUrl
          async function getGallery(client, options = defaultOptions) {
            const { pathname } = constructGalleryUrl(options)
            // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
            const finalPathname = pathname.slice(1)
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url: finalPathname })
            )
          }
          exports.getGallery = getGallery

          /***/
        },

      /***/ './src/gallery/getSubredditGallery.ts':
        /*!********************************************!*\
  !*** ./src/gallery/getSubredditGallery.ts ***!
  \********************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getSubredditGallery = exports.constructSubredditGalleryUrl = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const url_1 = __webpack_require__(
            /*! url */ './node_modules/url/url.js'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          function constructSubredditGalleryUrl(options) {
            let uri = `${options.subreddit}`
            if (options.sort) {
              uri += `/${options.sort}`
            }
            if (options.sort === 'top' && options.window) {
              uri += `/${options.window}`
            }
            if (options.page) {
              uri += `/${options.page}`
            }
            const url = new url_1.URL(
              `${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.SUBREDDIT_GALLERY_ENDPOINT}/${uri}`
            )
            return url
          }
          exports.constructSubredditGalleryUrl = constructSubredditGalleryUrl
          async function getSubredditGallery(client, options) {
            const { pathname } = constructSubredditGalleryUrl(options)
            // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
            const finalPathname = pathname.slice(1)
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url: finalPathname })
            )
          }
          exports.getSubredditGallery = getSubredditGallery

          /***/
        },

      /***/ './src/gallery/index.ts':
        /*!******************************!*\
  !*** ./src/gallery/index.ts ***!
  \******************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./getGallery */ './src/gallery/getGallery.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./getSubredditGallery */ './src/gallery/getSubredditGallery.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./searchGallery */ './src/gallery/searchGallery.ts'
            ),
            exports
          )

          /***/
        },

      /***/ './src/gallery/searchGallery.ts':
        /*!**************************************!*\
  !*** ./src/gallery/searchGallery.ts ***!
  \**************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.searchGallery = exports.constructSearchGalleryUrl = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          const url_1 = __webpack_require__(
            /*! url */ './node_modules/url/url.js'
          )
          const advancedParameters = [
            'q_all',
            'q_any',
            'q_exactly',
            'q_not',
            'q_type',
            'q_size_px',
          ]
          function constructSearchGalleryUrl(options) {
            let uri = ''
            if (options.sort) {
              uri += `/${options.sort}`
            }
            if (options.sort === 'top' && options.window) {
              uri += `/${options.window}`
            }
            if (options.page) {
              uri += `/${options.page}`
            }
            const url = new url_1.URL(
              `${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.SEARCH_GALLERY_ENDPOINT}${uri}`
            )
            advancedParameters.forEach((param) => {
              var _a
              if (
                (_a = options[param]) === null || _a === void 0
                  ? void 0
                  : _a.length
              ) {
                url.searchParams.append(param, options[param])
              }
            })
            if (!url.search) {
              const query = options.q || options.query
              if (!query) {
                throw new Error('No query was provided')
              }
              url.searchParams.append('q', query)
            }
            return url
          }
          exports.constructSearchGalleryUrl = constructSearchGalleryUrl
          async function searchGallery(client, options) {
            const { pathname } = constructSearchGalleryUrl(options)
            // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
            const finalPathname = pathname.slice(1)
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url: finalPathname })
            )
          }
          exports.searchGallery = searchGallery

          /***/
        },

      /***/ './src/getAuthorizationHeader.ts':
        /*!***************************************!*\
  !*** ./src/getAuthorizationHeader.ts ***!
  \***************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getAuthorizationHeader = void 0
          const types_1 = __webpack_require__(
            /*! ./common/types */ './src/common/types.ts'
          )
          const endpoints_1 = __webpack_require__(
            /*! ./common/endpoints */ './src/common/endpoints.ts'
          )
          async function getAuthorizationHeader(client) {
            if (types_1.isAccessToken(client.credentials)) {
              return `Bearer ${client.credentials.accessToken}`
            }
            if (
              types_1.isClientId(client.credentials) &&
              !types_1.isLogin(client.credentials)
            ) {
              return `Client-ID ${client.credentials.clientId}`
            }
            const { clientId, username, password } = client.credentials
            const options = {
              url: endpoints_1.AUTHORIZE_ENDPOINT,
              baseURL: endpoints_1.IMGUR_API_PREFIX,
              params: {
                client_id: clientId,
                response_type: 'token',
              },
            }
            let response = await client.request(options)
            const cookies = Array.isArray(response.headers['set-cookie'])
              ? response.headers['set-cookie'][0]
              : response.headers['set-cookie']
            if (!cookies) {
              throw new Error('No cookies were set during authorization')
            }
            const matches = cookies.match('(^|;)[s]*authorize_token=([^;]*)')
            if (!matches || matches.length < 3) {
              throw new Error('Unable to find authorize_token cookie')
            }
            return `Bearer 123accesstoken456`
            const authorizeToken = matches[2]
            options.method = 'POST'
            options.form = {
              username,
              password,
              allow: authorizeToken,
            }
            options.url = endpoints_1.AUTHORIZE_ENDPOINT
            options.followRedirect = false
            options.headers = {
              cookie: `authorize_token=${authorizeToken}`,
            }
            response = await client.request(options)
            const location = response.headers.location
            if (!location) {
              throw new Error('Unable to parse location')
            }
            const token = JSON.parse(
              '{"' +
                decodeURI(location.slice(location.indexOf('#') + 1))
                  .replace(/"/g, '\\"')
                  .replace(/&/g, '","')
                  .replace(/=/g, '":"') +
                '"}'
            )
            const accessToken = token.access_token
            client.credentials.accessToken = accessToken
            return `Bearer ${accessToken}`
          }
          exports.getAuthorizationHeader = getAuthorizationHeader

          /***/
        },

      /***/ './src/image/deleteImage.ts':
        /*!**********************************!*\
  !*** ./src/image/deleteImage.ts ***!
  \**********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.deleteImage = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          async function deleteImage(client, imageHash) {
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}`
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url, method: 'DELETE' })
            )
          }
          exports.deleteImage = deleteImage

          /***/
        },

      /***/ './src/image/favoriteImage.ts':
        /*!************************************!*\
  !*** ./src/image/favoriteImage.ts ***!
  \************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.favoriteImage = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          async function favoriteImage(client, imageHash) {
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}/favorite`
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url, method: 'POST' })
            )
          }
          exports.favoriteImage = favoriteImage

          /***/
        },

      /***/ './src/image/getImage.ts':
        /*!*******************************!*\
  !*** ./src/image/getImage.ts ***!
  \*******************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.getImage = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          async function getImage(client, imageHash) {
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}`
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({ url })
            )
          }
          exports.getImage = getImage

          /***/
        },

      /***/ './src/image/index.ts':
        /*!****************************!*\
  !*** ./src/image/index.ts ***!
  \****************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./deleteImage */ './src/image/deleteImage.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./favoriteImage */ './src/image/favoriteImage.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(/*! ./getImage */ './src/image/getImage.ts'),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(
              /*! ./updateImage */ './src/image/updateImage.ts'
            ),
            exports
          )
          tslib_1.__exportStar(
            __webpack_require__(/*! ./upload */ './src/image/upload.ts'),
            exports
          )

          /***/
        },

      /***/ './src/image/updateImage.ts':
        /*!**********************************!*\
  !*** ./src/image/updateImage.ts ***!
  \**********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.updateImage = void 0
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          function isValidUpdatePayload(p) {
            return (
              typeof p.title === 'string' || typeof p.description === 'string'
            )
          }
          async function updateImage(client, payload) {
            if (Array.isArray(payload)) {
              const promises = payload.map((p) => {
                if (!isValidUpdatePayload(p)) {
                  throw new Error('Update requires a title and/or description')
                }
                const url = `${endpoints_1.IMAGE_ENDPOINT}/${p.imageHash}`
                const form = utils_1.createForm(p)
                return new Promise(async (resolve) => {
                  return resolve(
                    utils_1.getImgurApiResponseFromResponse(
                      await client.request({
                        url,
                        method: 'POST',
                        data: form,
                        // resolveBodyOnly: true,
                      })
                    )
                  )
                })
              })
              return await Promise.all(promises)
            }
            if (!isValidUpdatePayload(payload)) {
              throw new Error('Update requires a title and/or description')
            }
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${payload.imageHash}`
            const form = utils_1.createForm(payload)
            return utils_1.getImgurApiResponseFromResponse(
              await client.request({
                url,
                method: 'POST',
                data: form,
                // resolveBodyOnly: true,
              })
            )
          }
          exports.updateImage = updateImage

          /***/
        },

      /***/ './src/image/upload.ts':
        /*!*****************************!*\
  !*** ./src/image/upload.ts ***!
  \*****************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.upload = void 0
          // import { createForm, getSource } from '../common/utils';
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          // import { Progress } from 'got';
          async function upload(client, payload) {
            if (Array.isArray(payload)) {
              const promises = payload.map((p) => {
                const form = utils_1.createForm(p)
                // const id = getSource(p);
                // req.on('uploadProgress', (progress: Progress) => {
                //   client.emit('uploadProgress', { ...progress, id });
                // });
                return new Promise(async (resolve) => {
                  return resolve(
                    utils_1.getImgurApiResponseFromResponse(
                      await client.request({
                        url: endpoints_1.UPLOAD_ENDPOINT,
                        method: 'POST',
                        data: form,
                        // resolveBodyOnly: true,
                      })
                    )
                  )
                })
              })
              return await Promise.all(promises)
            }
            const form = utils_1.createForm(payload)
            const request = await client.request({
              url: endpoints_1.UPLOAD_ENDPOINT,
              method: 'POST',
              data: form,
              // resolveBodyOnly: true,
            })
            // const id = getSource(payload);
            // req.on('uploadProgress', (progress) => {
            //   client.emit('uploadProgress', { ...progress, id });
            // });
            return Promise.resolve(
              utils_1.getImgurApiResponseFromResponse(request)
            )
          }
          exports.upload = upload

          /***/
        },

      /***/ './node_modules/tslib/tslib.es6.js':
        /*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__
        ) => {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ __extends: () => /* binding */ __extends,
            /* harmony export */ __assign: () => /* binding */ __assign,
            /* harmony export */ __rest: () => /* binding */ __rest,
            /* harmony export */ __decorate: () => /* binding */ __decorate,
            /* harmony export */ __param: () => /* binding */ __param,
            /* harmony export */ __metadata: () => /* binding */ __metadata,
            /* harmony export */ __awaiter: () => /* binding */ __awaiter,
            /* harmony export */ __generator: () => /* binding */ __generator,
            /* harmony export */ __createBinding: () =>
              /* binding */ __createBinding,
            /* harmony export */ __exportStar: () => /* binding */ __exportStar,
            /* harmony export */ __values: () => /* binding */ __values,
            /* harmony export */ __read: () => /* binding */ __read,
            /* harmony export */ __spread: () => /* binding */ __spread,
            /* harmony export */ __spreadArrays: () =>
              /* binding */ __spreadArrays,
            /* harmony export */ __await: () => /* binding */ __await,
            /* harmony export */ __asyncGenerator: () =>
              /* binding */ __asyncGenerator,
            /* harmony export */ __asyncDelegator: () =>
              /* binding */ __asyncDelegator,
            /* harmony export */ __asyncValues: () =>
              /* binding */ __asyncValues,
            /* harmony export */ __makeTemplateObject: () =>
              /* binding */ __makeTemplateObject,
            /* harmony export */ __importStar: () => /* binding */ __importStar,
            /* harmony export */ __importDefault: () =>
              /* binding */ __importDefault,
            /* harmony export */ __classPrivateFieldGet: () =>
              /* binding */ __classPrivateFieldGet,
            /* harmony export */ __classPrivateFieldSet: () =>
              /* binding */ __classPrivateFieldSet,
            /* harmony export */
          })
          /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
          /* global Reflect, Promise */

          var extendStatics = function (d, b) {
            extendStatics =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (d, b) {
                  d.__proto__ = b
                }) ||
              function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
              }
            return extendStatics(d, b)
          }

          function __extends(d, b) {
            extendStatics(d, b)
            function __() {
              this.constructor = d
            }
            d.prototype =
              b === null
                ? Object.create(b)
                : ((__.prototype = b.prototype), new __())
          }

          var __assign = function () {
            __assign =
              Object.assign ||
              function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i]
                  for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
                }
                return t
              }
            return __assign.apply(this, arguments)
          }

          function __rest(s, e) {
            var t = {}
            for (var p in s)
              if (
                Object.prototype.hasOwnProperty.call(s, p) &&
                e.indexOf(p) < 0
              )
                t[p] = s[p]
            if (s != null && typeof Object.getOwnPropertySymbols === 'function')
              for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
              ) {
                if (
                  e.indexOf(p[i]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                  t[p[i]] = s[p[i]]
              }
            return t
          }

          function __decorate(decorators, target, key, desc) {
            var c = arguments.length,
              r =
                c < 3
                  ? target
                  : desc === null
                  ? (desc = Object.getOwnPropertyDescriptor(target, key))
                  : desc,
              d
            if (
              typeof Reflect === 'object' &&
              typeof Reflect.decorate === 'function'
            )
              r = Reflect.decorate(decorators, target, key, desc)
            else
              for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                  r =
                    (c < 3
                      ? d(r)
                      : c > 3
                      ? d(target, key, r)
                      : d(target, key)) || r
            return c > 3 && r && Object.defineProperty(target, key, r), r
          }

          function __param(paramIndex, decorator) {
            return function (target, key) {
              decorator(target, key, paramIndex)
            }
          }

          function __metadata(metadataKey, metadataValue) {
            if (
              typeof Reflect === 'object' &&
              typeof Reflect.metadata === 'function'
            )
              return Reflect.metadata(metadataKey, metadataValue)
          }

          function __awaiter(thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function (resolve) {
                    resolve(value)
                  })
            }
            return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value))
                } catch (e) {
                  reject(e)
                }
              }
              function rejected(value) {
                try {
                  step(generator['throw'](value))
                } catch (e) {
                  reject(e)
                }
              }
              function step(result) {
                result.done
                  ? resolve(result.value)
                  : adopt(result.value).then(fulfilled, rejected)
              }
              step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
              )
            })
          }

          function __generator(thisArg, body) {
            var _ = {
                label: 0,
                sent: function () {
                  if (t[0] & 1) throw t[1]
                  return t[1]
                },
                trys: [],
                ops: [],
              },
              f,
              y,
              t,
              g
            return (
              (g = { next: verb(0), throw: verb(1), return: verb(2) }),
              typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function () {
                  return this
                }),
              g
            )
            function verb(n) {
              return function (v) {
                return step([n, v])
              }
            }
            function step(op) {
              if (f) throw new TypeError('Generator is already executing.')
              while (_)
                try {
                  if (
                    ((f = 1),
                    y &&
                      (t =
                        op[0] & 2
                          ? y['return']
                          : op[0]
                          ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                          : y.next) &&
                      !(t = t.call(y, op[1])).done)
                  )
                    return t
                  if (((y = 0), t)) op = [op[0] & 2, t.value]
                  switch (op[0]) {
                    case 0:
                    case 1:
                      t = op
                      break
                    case 4:
                      _.label++
                      return { value: op[1], done: false }
                    case 5:
                      _.label++
                      y = op[1]
                      op = [0]
                      continue
                    case 7:
                      op = _.ops.pop()
                      _.trys.pop()
                      continue
                    default:
                      if (
                        !((t = _.trys),
                        (t = t.length > 0 && t[t.length - 1])) &&
                        (op[0] === 6 || op[0] === 2)
                      ) {
                        _ = 0
                        continue
                      }
                      if (
                        op[0] === 3 &&
                        (!t || (op[1] > t[0] && op[1] < t[3]))
                      ) {
                        _.label = op[1]
                        break
                      }
                      if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1]
                        t = op
                        break
                      }
                      if (t && _.label < t[2]) {
                        _.label = t[2]
                        _.ops.push(op)
                        break
                      }
                      if (t[2]) _.ops.pop()
                      _.trys.pop()
                      continue
                  }
                  op = body.call(thisArg, _)
                } catch (e) {
                  op = [6, e]
                  y = 0
                } finally {
                  f = t = 0
                }
              if (op[0] & 5) throw op[1]
              return { value: op[0] ? op[1] : void 0, done: true }
            }
          }

          function __createBinding(o, m, k, k2) {
            if (k2 === undefined) k2 = k
            o[k2] = m[k]
          }

          function __exportStar(m, exports) {
            for (var p in m)
              if (p !== 'default' && !exports.hasOwnProperty(p))
                exports[p] = m[p]
          }

          function __values(o) {
            var s = typeof Symbol === 'function' && Symbol.iterator,
              m = s && o[s],
              i = 0
            if (m) return m.call(o)
            if (o && typeof o.length === 'number')
              return {
                next: function () {
                  if (o && i >= o.length) o = void 0
                  return { value: o && o[i++], done: !o }
                },
              }
            throw new TypeError(
              s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            )
          }

          function __read(o, n) {
            var m = typeof Symbol === 'function' && o[Symbol.iterator]
            if (!m) return o
            var i = m.call(o),
              r,
              ar = [],
              e
            try {
              while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value)
            } catch (error) {
              e = { error: error }
            } finally {
              try {
                if (r && !r.done && (m = i['return'])) m.call(i)
              } finally {
                if (e) throw e.error
              }
            }
            return ar
          }

          function __spread() {
            for (var ar = [], i = 0; i < arguments.length; i++)
              ar = ar.concat(__read(arguments[i]))
            return ar
          }

          function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++)
              s += arguments[i].length
            for (var r = Array(s), k = 0, i = 0; i < il; i++)
              for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j]
            return r
          }

          function __await(v) {
            return this instanceof __await
              ? ((this.v = v), this)
              : new __await(v)
          }

          function __asyncGenerator(thisArg, _arguments, generator) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.')
            var g = generator.apply(thisArg, _arguments || []),
              i,
              q = []
            return (
              (i = {}),
              verb('next'),
              verb('throw'),
              verb('return'),
              (i[Symbol.asyncIterator] = function () {
                return this
              }),
              i
            )
            function verb(n) {
              if (g[n])
                i[n] = function (v) {
                  return new Promise(function (a, b) {
                    q.push([n, v, a, b]) > 1 || resume(n, v)
                  })
                }
            }
            function resume(n, v) {
              try {
                step(g[n](v))
              } catch (e) {
                settle(q[0][3], e)
              }
            }
            function step(r) {
              r.value instanceof __await
                ? Promise.resolve(r.value.v).then(fulfill, reject)
                : settle(q[0][2], r)
            }
            function fulfill(value) {
              resume('next', value)
            }
            function reject(value) {
              resume('throw', value)
            }
            function settle(f, v) {
              if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1])
            }
          }

          function __asyncDelegator(o) {
            var i, p
            return (
              (i = {}),
              verb('next'),
              verb('throw', function (e) {
                throw e
              }),
              verb('return'),
              (i[Symbol.iterator] = function () {
                return this
              }),
              i
            )
            function verb(n, f) {
              i[n] = o[n]
                ? function (v) {
                    return (p = !p)
                      ? { value: __await(o[n](v)), done: n === 'return' }
                      : f
                      ? f(v)
                      : v
                  }
                : f
            }
          }

          function __asyncValues(o) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.')
            var m = o[Symbol.asyncIterator],
              i
            return m
              ? m.call(o)
              : ((o =
                  typeof __values === 'function'
                    ? __values(o)
                    : o[Symbol.iterator]()),
                (i = {}),
                verb('next'),
                verb('throw'),
                verb('return'),
                (i[Symbol.asyncIterator] = function () {
                  return this
                }),
                i)
            function verb(n) {
              i[n] =
                o[n] &&
                function (v) {
                  return new Promise(function (resolve, reject) {
                    ;(v = o[n](v)), settle(resolve, reject, v.done, v.value)
                  })
                }
            }
            function settle(resolve, reject, d, v) {
              Promise.resolve(v).then(function (v) {
                resolve({ value: v, done: d })
              }, reject)
            }
          }

          function __makeTemplateObject(cooked, raw) {
            if (Object.defineProperty) {
              Object.defineProperty(cooked, 'raw', { value: raw })
            } else {
              cooked.raw = raw
            }
            return cooked
          }

          function __importStar(mod) {
            if (mod && mod.__esModule) return mod
            var result = {}
            if (mod != null)
              for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
            result.default = mod
            return result
          }

          function __importDefault(mod) {
            return mod && mod.__esModule ? mod : { default: mod }
          }

          function __classPrivateFieldGet(receiver, privateMap) {
            if (!privateMap.has(receiver)) {
              throw new TypeError(
                'attempted to get private field on non-instance'
              )
            }
            return privateMap.get(receiver)
          }

          function __classPrivateFieldSet(receiver, privateMap, value) {
            if (!privateMap.has(receiver)) {
              throw new TypeError(
                'attempted to set private field on non-instance'
              )
            }
            privateMap.set(receiver, value)
            return value
          }

          /***/
        },

      /***/ './node_modules/url/node_modules/punycode/punycode.js':
        /*!************************************************************!*\
  !*** ./node_modules/url/node_modules/punycode/punycode.js ***!
  \************************************************************/
        /***/ function (module, exports, __webpack_require__) {
          /* module decorator */ module = __webpack_require__.nmd(module)
          var __WEBPACK_AMD_DEFINE_RESULT__ /*! https://mths.be/punycode v1.3.2 by @mathias */
          ;(function (root) {
            /** Detect free variables */
            var freeExports = true && exports && !exports.nodeType && exports
            var freeModule = true && module && !module.nodeType && module
            var freeGlobal =
              typeof __webpack_require__.g == 'object' && __webpack_require__.g
            if (
              freeGlobal.global === freeGlobal ||
              freeGlobal.window === freeGlobal ||
              freeGlobal.self === freeGlobal
            ) {
              root = freeGlobal
            }

            /**
             * The `punycode` object.
             * @name punycode
             * @type Object
             */
            var punycode,
              /** Highest positive signed 32-bit float value */
              maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
              /** Bootstring parameters */
              base = 36,
              tMin = 1,
              tMax = 26,
              skew = 38,
              damp = 700,
              initialBias = 72,
              initialN = 128, // 0x80
              delimiter = '-', // '\x2D'
              /** Regular expressions */
              regexPunycode = /^xn--/,
              regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
              regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
              /** Error messages */
              errors = {
                overflow: 'Overflow: input needs wider integers to process',
                'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                'invalid-input': 'Invalid input',
              },
              /** Convenience shortcuts */
              baseMinusTMin = base - tMin,
              floor = Math.floor,
              stringFromCharCode = String.fromCharCode,
              /** Temporary variable */
              key

            /*--------------------------------------------------------------------------*/

            /**
             * A generic error utility function.
             * @private
             * @param {String} type The error type.
             * @returns {Error} Throws a `RangeError` with the applicable error message.
             */
            function error(type) {
              throw RangeError(errors[type])
            }

            /**
             * A generic `Array#map` utility function.
             * @private
             * @param {Array} array The array to iterate over.
             * @param {Function} callback The function that gets called for every array
             * item.
             * @returns {Array} A new array of values returned by the callback function.
             */
            function map(array, fn) {
              var length = array.length
              var result = []
              while (length--) {
                result[length] = fn(array[length])
              }
              return result
            }

            /**
             * A simple `Array#map`-like wrapper to work with domain name strings or email
             * addresses.
             * @private
             * @param {String} domain The domain name or email address.
             * @param {Function} callback The function that gets called for every
             * character.
             * @returns {Array} A new string of characters returned by the callback
             * function.
             */
            function mapDomain(string, fn) {
              var parts = string.split('@')
              var result = ''
              if (parts.length > 1) {
                // In email addresses, only the domain name should be punycoded. Leave
                // the local part (i.e. everything up to `@`) intact.
                result = parts[0] + '@'
                string = parts[1]
              }
              // Avoid `split(regex)` for IE8 compatibility. See #17.
              string = string.replace(regexSeparators, '\x2E')
              var labels = string.split('.')
              var encoded = map(labels, fn).join('.')
              return result + encoded
            }

            /**
             * Creates an array containing the numeric code points of each Unicode
             * character in the string. While JavaScript uses UCS-2 internally,
             * this function will convert a pair of surrogate halves (each of which
             * UCS-2 exposes as separate characters) into a single code point,
             * matching UTF-16.
             * @see `punycode.ucs2.encode`
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode.ucs2
             * @name decode
             * @param {String} string The Unicode input string (UCS-2).
             * @returns {Array} The new array of code points.
             */
            function ucs2decode(string) {
              var output = [],
                counter = 0,
                length = string.length,
                value,
                extra
              while (counter < length) {
                value = string.charCodeAt(counter++)
                if (value >= 0xd800 && value <= 0xdbff && counter < length) {
                  // high surrogate, and there is a next character
                  extra = string.charCodeAt(counter++)
                  if ((extra & 0xfc00) == 0xdc00) {
                    // low surrogate
                    output.push(
                      ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000
                    )
                  } else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value)
                    counter--
                  }
                } else {
                  output.push(value)
                }
              }
              return output
            }

            /**
             * Creates a string based on an array of numeric code points.
             * @see `punycode.ucs2.decode`
             * @memberOf punycode.ucs2
             * @name encode
             * @param {Array} codePoints The array of numeric code points.
             * @returns {String} The new Unicode string (UCS-2).
             */
            function ucs2encode(array) {
              return map(array, function (value) {
                var output = ''
                if (value > 0xffff) {
                  value -= 0x10000
                  output += stringFromCharCode(
                    ((value >>> 10) & 0x3ff) | 0xd800
                  )
                  value = 0xdc00 | (value & 0x3ff)
                }
                output += stringFromCharCode(value)
                return output
              }).join('')
            }

            /**
             * Converts a basic code point into a digit/integer.
             * @see `digitToBasic()`
             * @private
             * @param {Number} codePoint The basic numeric code point value.
             * @returns {Number} The numeric value of a basic code point (for use in
             * representing integers) in the range `0` to `base - 1`, or `base` if
             * the code point does not represent a value.
             */
            function basicToDigit(codePoint) {
              if (codePoint - 48 < 10) {
                return codePoint - 22
              }
              if (codePoint - 65 < 26) {
                return codePoint - 65
              }
              if (codePoint - 97 < 26) {
                return codePoint - 97
              }
              return base
            }

            /**
             * Converts a digit/integer into a basic code point.
             * @see `basicToDigit()`
             * @private
             * @param {Number} digit The numeric value of a basic code point.
             * @returns {Number} The basic code point whose value (when used for
             * representing integers) is `digit`, which needs to be in the range
             * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
             * used; else, the lowercase form is used. The behavior is undefined
             * if `flag` is non-zero and `digit` has no uppercase form.
             */
            function digitToBasic(digit, flag) {
              //  0..25 map to ASCII a..z or A..Z
              // 26..35 map to ASCII 0..9
              return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5)
            }

            /**
             * Bias adaptation function as per section 3.4 of RFC 3492.
             * http://tools.ietf.org/html/rfc3492#section-3.4
             * @private
             */
            function adapt(delta, numPoints, firstTime) {
              var k = 0
              delta = firstTime ? floor(delta / damp) : delta >> 1
              delta += floor(delta / numPoints)
              for (
                ;
                /* no initialization */ delta > (baseMinusTMin * tMax) >> 1;
                k += base
              ) {
                delta = floor(delta / baseMinusTMin)
              }
              return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew))
            }

            /**
             * Converts a Punycode string of ASCII-only symbols to a string of Unicode
             * symbols.
             * @memberOf punycode
             * @param {String} input The Punycode string of ASCII-only symbols.
             * @returns {String} The resulting string of Unicode symbols.
             */
            function decode(input) {
              // Don't use UCS-2
              var output = [],
                inputLength = input.length,
                out,
                i = 0,
                n = initialN,
                bias = initialBias,
                basic,
                j,
                index,
                oldi,
                w,
                k,
                digit,
                t,
                /** Cached calculation results */
                baseMinusT

              // Handle the basic code points: let `basic` be the number of input code
              // points before the last delimiter, or `0` if there is none, then copy
              // the first basic code points to the output.

              basic = input.lastIndexOf(delimiter)
              if (basic < 0) {
                basic = 0
              }

              for (j = 0; j < basic; ++j) {
                // if it's not a basic code point
                if (input.charCodeAt(j) >= 0x80) {
                  error('not-basic')
                }
                output.push(input.charCodeAt(j))
              }

              // Main decoding loop: start just after the last delimiter if any basic code
              // points were copied; start at the beginning otherwise.

              for (
                index = basic > 0 ? basic + 1 : 0;
                index < inputLength /* no final expression */;

              ) {
                // `index` is the index of the next character to be consumed.
                // Decode a generalized variable-length integer into `delta`,
                // which gets added to `i`. The overflow checking is easier
                // if we increase `i` as we go, then subtract off its starting
                // value at the end to obtain `delta`.
                for (
                  oldi = i, w = 1, k = base /* no condition */;
                  ;
                  k += base
                ) {
                  if (index >= inputLength) {
                    error('invalid-input')
                  }

                  digit = basicToDigit(input.charCodeAt(index++))

                  if (digit >= base || digit > floor((maxInt - i) / w)) {
                    error('overflow')
                  }

                  i += digit * w
                  t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias

                  if (digit < t) {
                    break
                  }

                  baseMinusT = base - t
                  if (w > floor(maxInt / baseMinusT)) {
                    error('overflow')
                  }

                  w *= baseMinusT
                }

                out = output.length + 1
                bias = adapt(i - oldi, out, oldi == 0)

                // `i` was supposed to wrap around from `out` to `0`,
                // incrementing `n` each time, so we'll fix that now:
                if (floor(i / out) > maxInt - n) {
                  error('overflow')
                }

                n += floor(i / out)
                i %= out

                // Insert `n` at position `i` of the output
                output.splice(i++, 0, n)
              }

              return ucs2encode(output)
            }

            /**
             * Converts a string of Unicode symbols (e.g. a domain name label) to a
             * Punycode string of ASCII-only symbols.
             * @memberOf punycode
             * @param {String} input The string of Unicode symbols.
             * @returns {String} The resulting Punycode string of ASCII-only symbols.
             */
            function encode(input) {
              var n,
                delta,
                handledCPCount,
                basicLength,
                bias,
                j,
                m,
                q,
                k,
                t,
                currentValue,
                output = [],
                /** `inputLength` will hold the number of code points in `input`. */
                inputLength,
                /** Cached calculation results */
                handledCPCountPlusOne,
                baseMinusT,
                qMinusT

              // Convert the input in UCS-2 to Unicode
              input = ucs2decode(input)

              // Cache the length
              inputLength = input.length

              // Initialize the state
              n = initialN
              delta = 0
              bias = initialBias

              // Handle the basic code points
              for (j = 0; j < inputLength; ++j) {
                currentValue = input[j]
                if (currentValue < 0x80) {
                  output.push(stringFromCharCode(currentValue))
                }
              }

              handledCPCount = basicLength = output.length

              // `handledCPCount` is the number of code points that have been handled;
              // `basicLength` is the number of basic code points.

              // Finish the basic string - if it is not empty - with a delimiter
              if (basicLength) {
                output.push(delimiter)
              }

              // Main encoding loop:
              while (handledCPCount < inputLength) {
                // All non-basic code points < n have been handled already. Find the next
                // larger one:
                for (m = maxInt, j = 0; j < inputLength; ++j) {
                  currentValue = input[j]
                  if (currentValue >= n && currentValue < m) {
                    m = currentValue
                  }
                }

                // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                // but guard against overflow
                handledCPCountPlusOne = handledCPCount + 1
                if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                  error('overflow')
                }

                delta += (m - n) * handledCPCountPlusOne
                n = m

                for (j = 0; j < inputLength; ++j) {
                  currentValue = input[j]

                  if (currentValue < n && ++delta > maxInt) {
                    error('overflow')
                  }

                  if (currentValue == n) {
                    // Represent delta as a generalized variable-length integer
                    for (q = delta, k = base /* no condition */; ; k += base) {
                      t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias
                      if (q < t) {
                        break
                      }
                      qMinusT = q - t
                      baseMinusT = base - t
                      output.push(
                        stringFromCharCode(
                          digitToBasic(t + (qMinusT % baseMinusT), 0)
                        )
                      )
                      q = floor(qMinusT / baseMinusT)
                    }

                    output.push(stringFromCharCode(digitToBasic(q, 0)))
                    bias = adapt(
                      delta,
                      handledCPCountPlusOne,
                      handledCPCount == basicLength
                    )
                    delta = 0
                    ++handledCPCount
                  }
                }

                ++delta
                ++n
              }
              return output.join('')
            }

            /**
             * Converts a Punycode string representing a domain name or an email address
             * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
             * it doesn't matter if you call it on a string that has already been
             * converted to Unicode.
             * @memberOf punycode
             * @param {String} input The Punycoded domain name or email address to
             * convert to Unicode.
             * @returns {String} The Unicode representation of the given Punycode
             * string.
             */
            function toUnicode(input) {
              return mapDomain(input, function (string) {
                return regexPunycode.test(string)
                  ? decode(string.slice(4).toLowerCase())
                  : string
              })
            }

            /**
             * Converts a Unicode string representing a domain name or an email address to
             * Punycode. Only the non-ASCII parts of the domain name will be converted,
             * i.e. it doesn't matter if you call it with a domain that's already in
             * ASCII.
             * @memberOf punycode
             * @param {String} input The domain name or email address to convert, as a
             * Unicode string.
             * @returns {String} The Punycode representation of the given domain name or
             * email address.
             */
            function toASCII(input) {
              return mapDomain(input, function (string) {
                return regexNonASCII.test(string)
                  ? 'xn--' + encode(string)
                  : string
              })
            }

            /*--------------------------------------------------------------------------*/

            /** Define the public API */
            punycode = {
              /**
               * A string representing the current Punycode.js version number.
               * @memberOf punycode
               * @type String
               */
              version: '1.3.2',
              /**
               * An object of methods to convert from JavaScript's internal character
               * representation (UCS-2) to Unicode code points, and back.
               * @see <https://mathiasbynens.be/notes/javascript-encoding>
               * @memberOf punycode
               * @type Object
               */
              ucs2: {
                decode: ucs2decode,
                encode: ucs2encode,
              },
              decode: decode,
              encode: encode,
              toASCII: toASCII,
              toUnicode: toUnicode,
            }

            /** Expose `punycode` */
            // Some AMD build optimizers, like r.js, check for specific condition patterns
            // like the following:
            if (true) {
              !((__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return punycode
              }.call(exports, __webpack_require__, exports, module)),
              __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
                (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
            } else {
            }
          })(this)

          /***/
        },

      /***/ './node_modules/url/url.js':
        /*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var punycode = __webpack_require__(
            /*! punycode */ './node_modules/url/node_modules/punycode/punycode.js'
          )
          var util = __webpack_require__(
            /*! ./util */ './node_modules/url/util.js'
          )

          exports.parse = urlParse
          exports.resolve = urlResolve
          exports.resolveObject = urlResolveObject
          exports.format = urlFormat

          exports.Url = Url

          function Url() {
            this.protocol = null
            this.slashes = null
            this.auth = null
            this.host = null
            this.port = null
            this.hostname = null
            this.hash = null
            this.search = null
            this.query = null
            this.pathname = null
            this.path = null
            this.href = null
          }

          // Reference: RFC 3986, RFC 1808, RFC 2396

          // define these here so at least they only have to be
          // compiled once on the first module load.
          var protocolPattern = /^([a-z0-9.+-]+:)/i,
            portPattern = /:[0-9]*$/,
            // Special case for a simple path URL
            simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
            // RFC 2396: characters reserved for delimiting URLs.
            // We actually just auto-escape these.
            delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
            // RFC 2396: characters not allowed for various reasons.
            unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
            // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
            autoEscape = ["'"].concat(unwise),
            // Characters that are never ever allowed in a hostname.
            // Note that any invalid chars are also handled, but these
            // are the ones that are *expected* to be seen, so we fast-path
            // them.
            nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
            hostEndingChars = ['/', '?', '#'],
            hostnameMaxLen = 255,
            hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
            hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            // protocols that can allow "unsafe" and "unwise" chars.
            unsafeProtocol = {
              javascript: true,
              'javascript:': true,
            },
            // protocols that never have a hostname.
            hostlessProtocol = {
              javascript: true,
              'javascript:': true,
            },
            // protocols that always contain a // bit.
            slashedProtocol = {
              http: true,
              https: true,
              ftp: true,
              gopher: true,
              file: true,
              'http:': true,
              'https:': true,
              'ftp:': true,
              'gopher:': true,
              'file:': true,
            },
            querystring = __webpack_require__(
              /*! querystring */ './node_modules/querystring/index.js'
            )

          function urlParse(url, parseQueryString, slashesDenoteHost) {
            if (url && util.isObject(url) && url instanceof Url) return url

            var u = new Url()
            u.parse(url, parseQueryString, slashesDenoteHost)
            return u
          }

          Url.prototype.parse = function (
            url,
            parseQueryString,
            slashesDenoteHost
          ) {
            if (!util.isString(url)) {
              throw new TypeError(
                "Parameter 'url' must be a string, not " + typeof url
              )
            }

            // Copy chrome, IE, opera backslash-handling behavior.
            // Back slashes before the query string get converted to forward slashes
            // See: https://code.google.com/p/chromium/issues/detail?id=25916
            var queryIndex = url.indexOf('?'),
              splitter =
                queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
              uSplit = url.split(splitter),
              slashRegex = /\\/g
            uSplit[0] = uSplit[0].replace(slashRegex, '/')
            url = uSplit.join(splitter)

            var rest = url

            // trim before proceeding.
            // This is to support parse stuff like "  http://foo.com  \n"
            rest = rest.trim()

            if (!slashesDenoteHost && url.split('#').length === 1) {
              // Try fast path regexp
              var simplePath = simplePathPattern.exec(rest)
              if (simplePath) {
                this.path = rest
                this.href = rest
                this.pathname = simplePath[1]
                if (simplePath[2]) {
                  this.search = simplePath[2]
                  if (parseQueryString) {
                    this.query = querystring.parse(this.search.substr(1))
                  } else {
                    this.query = this.search.substr(1)
                  }
                } else if (parseQueryString) {
                  this.search = ''
                  this.query = {}
                }
                return this
              }
            }

            var proto = protocolPattern.exec(rest)
            if (proto) {
              proto = proto[0]
              var lowerProto = proto.toLowerCase()
              this.protocol = lowerProto
              rest = rest.substr(proto.length)
            }

            // figure out if it's got a host
            // user@server is *always* interpreted as a hostname, and url
            // resolution will treat //foo/bar as host=foo,path=bar because that's
            // how the browser resolves relative URLs.
            if (
              slashesDenoteHost ||
              proto ||
              rest.match(/^\/\/[^@\/]+@[^@\/]+/)
            ) {
              var slashes = rest.substr(0, 2) === '//'
              if (slashes && !(proto && hostlessProtocol[proto])) {
                rest = rest.substr(2)
                this.slashes = true
              }
            }

            if (
              !hostlessProtocol[proto] &&
              (slashes || (proto && !slashedProtocol[proto]))
            ) {
              // there's a hostname.
              // the first instance of /, ?, ;, or # ends the host.
              //
              // If there is an @ in the hostname, then non-host chars *are* allowed
              // to the left of the last @ sign, unless some host-ending character
              // comes *before* the @-sign.
              // URLs are obnoxious.
              //
              // ex:
              // http://a@b@c/ => user:a@b host:c
              // http://a@b?@c => user:a host:c path:/?@c

              // v0.12 TODO(isaacs): This is not quite how Chrome does things.
              // Review our test case against browsers more comprehensively.

              // find the first instance of any hostEndingChars
              var hostEnd = -1
              for (var i = 0; i < hostEndingChars.length; i++) {
                var hec = rest.indexOf(hostEndingChars[i])
                if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                  hostEnd = hec
              }

              // at this point, either we have an explicit point where the
              // auth portion cannot go past, or the last @ char is the decider.
              var auth, atSign
              if (hostEnd === -1) {
                // atSign can be anywhere.
                atSign = rest.lastIndexOf('@')
              } else {
                // atSign must be in auth portion.
                // http://a@b/c@d => host:b auth:a path:/c@d
                atSign = rest.lastIndexOf('@', hostEnd)
              }

              // Now we have a portion which is definitely the auth.
              // Pull that off.
              if (atSign !== -1) {
                auth = rest.slice(0, atSign)
                rest = rest.slice(atSign + 1)
                this.auth = decodeURIComponent(auth)
              }

              // the host is the remaining to the left of the first non-host char
              hostEnd = -1
              for (var i = 0; i < nonHostChars.length; i++) {
                var hec = rest.indexOf(nonHostChars[i])
                if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                  hostEnd = hec
              }
              // if we still have not hit it, then the entire thing is a host.
              if (hostEnd === -1) hostEnd = rest.length

              this.host = rest.slice(0, hostEnd)
              rest = rest.slice(hostEnd)

              // pull out port.
              this.parseHost()

              // we've indicated that there is a hostname,
              // so even if it's empty, it has to be present.
              this.hostname = this.hostname || ''

              // if hostname begins with [ and ends with ]
              // assume that it's an IPv6 address.
              var ipv6Hostname =
                this.hostname[0] === '[' &&
                this.hostname[this.hostname.length - 1] === ']'

              // validate a little.
              if (!ipv6Hostname) {
                var hostparts = this.hostname.split(/\./)
                for (var i = 0, l = hostparts.length; i < l; i++) {
                  var part = hostparts[i]
                  if (!part) continue
                  if (!part.match(hostnamePartPattern)) {
                    var newpart = ''
                    for (var j = 0, k = part.length; j < k; j++) {
                      if (part.charCodeAt(j) > 127) {
                        // we replace non-ASCII char with a temporary placeholder
                        // we need this to make sure size of hostname is not
                        // broken by replacing non-ASCII by nothing
                        newpart += 'x'
                      } else {
                        newpart += part[j]
                      }
                    }
                    // we test again with ASCII char only
                    if (!newpart.match(hostnamePartPattern)) {
                      var validParts = hostparts.slice(0, i)
                      var notHost = hostparts.slice(i + 1)
                      var bit = part.match(hostnamePartStart)
                      if (bit) {
                        validParts.push(bit[1])
                        notHost.unshift(bit[2])
                      }
                      if (notHost.length) {
                        rest = '/' + notHost.join('.') + rest
                      }
                      this.hostname = validParts.join('.')
                      break
                    }
                  }
                }
              }

              if (this.hostname.length > hostnameMaxLen) {
                this.hostname = ''
              } else {
                // hostnames are always lower case.
                this.hostname = this.hostname.toLowerCase()
              }

              if (!ipv6Hostname) {
                // IDNA Support: Returns a punycoded representation of "domain".
                // It only converts parts of the domain name that
                // have non-ASCII characters, i.e. it doesn't matter if
                // you call it with a domain that already is ASCII-only.
                this.hostname = punycode.toASCII(this.hostname)
              }

              var p = this.port ? ':' + this.port : ''
              var h = this.hostname || ''
              this.host = h + p
              this.href += this.host

              // strip [ and ] from the hostname
              // the host field still retains them, though
              if (ipv6Hostname) {
                this.hostname = this.hostname.substr(
                  1,
                  this.hostname.length - 2
                )
                if (rest[0] !== '/') {
                  rest = '/' + rest
                }
              }
            }

            // now rest is set to the post-host stuff.
            // chop off any delim chars.
            if (!unsafeProtocol[lowerProto]) {
              // First, make 100% sure that any "autoEscape" chars get
              // escaped, even if encodeURIComponent doesn't think they
              // need to be.
              for (var i = 0, l = autoEscape.length; i < l; i++) {
                var ae = autoEscape[i]
                if (rest.indexOf(ae) === -1) continue
                var esc = encodeURIComponent(ae)
                if (esc === ae) {
                  esc = escape(ae)
                }
                rest = rest.split(ae).join(esc)
              }
            }

            // chop off from the tail first.
            var hash = rest.indexOf('#')
            if (hash !== -1) {
              // got a fragment string.
              this.hash = rest.substr(hash)
              rest = rest.slice(0, hash)
            }
            var qm = rest.indexOf('?')
            if (qm !== -1) {
              this.search = rest.substr(qm)
              this.query = rest.substr(qm + 1)
              if (parseQueryString) {
                this.query = querystring.parse(this.query)
              }
              rest = rest.slice(0, qm)
            } else if (parseQueryString) {
              // no query string, but parseQueryString still requested
              this.search = ''
              this.query = {}
            }
            if (rest) this.pathname = rest
            if (
              slashedProtocol[lowerProto] &&
              this.hostname &&
              !this.pathname
            ) {
              this.pathname = '/'
            }

            //to support http.request
            if (this.pathname || this.search) {
              var p = this.pathname || ''
              var s = this.search || ''
              this.path = p + s
            }

            // finally, reconstruct the href based on what has been validated.
            this.href = this.format()
            return this
          }

          // format a parsed object into a url string
          function urlFormat(obj) {
            // ensure it's an object, and not a string url.
            // If it's an obj, this is a no-op.
            // this way, you can call url_format() on strings
            // to clean up potentially wonky urls.
            if (util.isString(obj)) obj = urlParse(obj)
            if (!(obj instanceof Url)) return Url.prototype.format.call(obj)
            return obj.format()
          }

          Url.prototype.format = function () {
            var auth = this.auth || ''
            if (auth) {
              auth = encodeURIComponent(auth)
              auth = auth.replace(/%3A/i, ':')
              auth += '@'
            }

            var protocol = this.protocol || '',
              pathname = this.pathname || '',
              hash = this.hash || '',
              host = false,
              query = ''

            if (this.host) {
              host = auth + this.host
            } else if (this.hostname) {
              host =
                auth +
                (this.hostname.indexOf(':') === -1
                  ? this.hostname
                  : '[' + this.hostname + ']')
              if (this.port) {
                host += ':' + this.port
              }
            }

            if (
              this.query &&
              util.isObject(this.query) &&
              Object.keys(this.query).length
            ) {
              query = querystring.stringify(this.query)
            }

            var search = this.search || (query && '?' + query) || ''

            if (protocol && protocol.substr(-1) !== ':') protocol += ':'

            // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
            // unless they had them to begin with.
            if (
              this.slashes ||
              ((!protocol || slashedProtocol[protocol]) && host !== false)
            ) {
              host = '//' + (host || '')
              if (pathname && pathname.charAt(0) !== '/')
                pathname = '/' + pathname
            } else if (!host) {
              host = ''
            }

            if (hash && hash.charAt(0) !== '#') hash = '#' + hash
            if (search && search.charAt(0) !== '?') search = '?' + search

            pathname = pathname.replace(/[?#]/g, function (match) {
              return encodeURIComponent(match)
            })
            search = search.replace('#', '%23')

            return protocol + host + pathname + search + hash
          }

          function urlResolve(source, relative) {
            return urlParse(source, false, true).resolve(relative)
          }

          Url.prototype.resolve = function (relative) {
            return this.resolveObject(urlParse(relative, false, true)).format()
          }

          function urlResolveObject(source, relative) {
            if (!source) return relative
            return urlParse(source, false, true).resolveObject(relative)
          }

          Url.prototype.resolveObject = function (relative) {
            if (util.isString(relative)) {
              var rel = new Url()
              rel.parse(relative, false, true)
              relative = rel
            }

            var result = new Url()
            var tkeys = Object.keys(this)
            for (var tk = 0; tk < tkeys.length; tk++) {
              var tkey = tkeys[tk]
              result[tkey] = this[tkey]
            }

            // hash is always overridden, no matter what.
            // even href="" will remove it.
            result.hash = relative.hash

            // if the relative url is empty, then there's nothing left to do here.
            if (relative.href === '') {
              result.href = result.format()
              return result
            }

            // hrefs like //foo/bar always cut to the protocol.
            if (relative.slashes && !relative.protocol) {
              // take everything except the protocol from relative
              var rkeys = Object.keys(relative)
              for (var rk = 0; rk < rkeys.length; rk++) {
                var rkey = rkeys[rk]
                if (rkey !== 'protocol') result[rkey] = relative[rkey]
              }

              //urlParse appends trailing / to urls like http://www.example.com
              if (
                slashedProtocol[result.protocol] &&
                result.hostname &&
                !result.pathname
              ) {
                result.path = result.pathname = '/'
              }

              result.href = result.format()
              return result
            }

            if (relative.protocol && relative.protocol !== result.protocol) {
              // if it's a known url protocol, then changing
              // the protocol does weird things
              // first, if it's not file:, then we MUST have a host,
              // and if there was a path
              // to begin with, then we MUST have a path.
              // if it is file:, then the host is dropped,
              // because that's known to be hostless.
              // anything else is assumed to be absolute.
              if (!slashedProtocol[relative.protocol]) {
                var keys = Object.keys(relative)
                for (var v = 0; v < keys.length; v++) {
                  var k = keys[v]
                  result[k] = relative[k]
                }
                result.href = result.format()
                return result
              }

              result.protocol = relative.protocol
              if (!relative.host && !hostlessProtocol[relative.protocol]) {
                var relPath = (relative.pathname || '').split('/')
                while (relPath.length && !(relative.host = relPath.shift()));
                if (!relative.host) relative.host = ''
                if (!relative.hostname) relative.hostname = ''
                if (relPath[0] !== '') relPath.unshift('')
                if (relPath.length < 2) relPath.unshift('')
                result.pathname = relPath.join('/')
              } else {
                result.pathname = relative.pathname
              }
              result.search = relative.search
              result.query = relative.query
              result.host = relative.host || ''
              result.auth = relative.auth
              result.hostname = relative.hostname || relative.host
              result.port = relative.port
              // to support http.request
              if (result.pathname || result.search) {
                var p = result.pathname || ''
                var s = result.search || ''
                result.path = p + s
              }
              result.slashes = result.slashes || relative.slashes
              result.href = result.format()
              return result
            }

            var isSourceAbs =
                result.pathname && result.pathname.charAt(0) === '/',
              isRelAbs =
                relative.host ||
                (relative.pathname && relative.pathname.charAt(0) === '/'),
              mustEndAbs =
                isRelAbs || isSourceAbs || (result.host && relative.pathname),
              removeAllDots = mustEndAbs,
              srcPath = (result.pathname && result.pathname.split('/')) || [],
              relPath =
                (relative.pathname && relative.pathname.split('/')) || [],
              psychotic = result.protocol && !slashedProtocol[result.protocol]

            // if the url is a non-slashed url, then relative
            // links like ../.. should be able
            // to crawl up to the hostname, as well.  This is strange.
            // result.protocol has already been set by now.
            // Later on, put the first path part into the host field.
            if (psychotic) {
              result.hostname = ''
              result.port = null
              if (result.host) {
                if (srcPath[0] === '') srcPath[0] = result.host
                else srcPath.unshift(result.host)
              }
              result.host = ''
              if (relative.protocol) {
                relative.hostname = null
                relative.port = null
                if (relative.host) {
                  if (relPath[0] === '') relPath[0] = relative.host
                  else relPath.unshift(relative.host)
                }
                relative.host = null
              }
              mustEndAbs =
                mustEndAbs && (relPath[0] === '' || srcPath[0] === '')
            }

            if (isRelAbs) {
              // it's absolute.
              result.host =
                relative.host || relative.host === ''
                  ? relative.host
                  : result.host
              result.hostname =
                relative.hostname || relative.hostname === ''
                  ? relative.hostname
                  : result.hostname
              result.search = relative.search
              result.query = relative.query
              srcPath = relPath
              // fall through to the dot-handling below.
            } else if (relPath.length) {
              // it's relative
              // throw away the existing file, and take the new path instead.
              if (!srcPath) srcPath = []
              srcPath.pop()
              srcPath = srcPath.concat(relPath)
              result.search = relative.search
              result.query = relative.query
            } else if (!util.isNullOrUndefined(relative.search)) {
              // just pull out the search.
              // like href='?foo'.
              // Put this after the other two cases because it simplifies the booleans
              if (psychotic) {
                result.hostname = result.host = srcPath.shift()
                //occationaly the auth can get stuck only in host
                //this especially happens in cases like
                //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
                var authInHost =
                  result.host && result.host.indexOf('@') > 0
                    ? result.host.split('@')
                    : false
                if (authInHost) {
                  result.auth = authInHost.shift()
                  result.host = result.hostname = authInHost.shift()
                }
              }
              result.search = relative.search
              result.query = relative.query
              //to support http.request
              if (
                !util.isNull(result.pathname) ||
                !util.isNull(result.search)
              ) {
                result.path =
                  (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '')
              }
              result.href = result.format()
              return result
            }

            if (!srcPath.length) {
              // no path at all.  easy.
              // we've already handled the other stuff above.
              result.pathname = null
              //to support http.request
              if (result.search) {
                result.path = '/' + result.search
              } else {
                result.path = null
              }
              result.href = result.format()
              return result
            }

            // if a url ENDs in . or .., then it must get a trailing slash.
            // however, if it ends in anything else non-slashy,
            // then it must NOT get a trailing slash.
            var last = srcPath.slice(-1)[0]
            var hasTrailingSlash =
              ((result.host || relative.host || srcPath.length > 1) &&
                (last === '.' || last === '..')) ||
              last === ''

            // strip single dots, resolve double dots to parent dir
            // if the path tries to go above the root, `up` ends up > 0
            var up = 0
            for (var i = srcPath.length; i >= 0; i--) {
              last = srcPath[i]
              if (last === '.') {
                srcPath.splice(i, 1)
              } else if (last === '..') {
                srcPath.splice(i, 1)
                up++
              } else if (up) {
                srcPath.splice(i, 1)
                up--
              }
            }

            // if the path is allowed to go above the root, restore leading ..s
            if (!mustEndAbs && !removeAllDots) {
              for (; up--; up) {
                srcPath.unshift('..')
              }
            }

            if (
              mustEndAbs &&
              srcPath[0] !== '' &&
              (!srcPath[0] || srcPath[0].charAt(0) !== '/')
            ) {
              srcPath.unshift('')
            }

            if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
              srcPath.push('')
            }

            var isAbsolute =
              srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/')

            // put the host back
            if (psychotic) {
              result.hostname = result.host = isAbsolute
                ? ''
                : srcPath.length
                ? srcPath.shift()
                : ''
              //occationaly the auth can get stuck only in host
              //this especially happens in cases like
              //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
              var authInHost =
                result.host && result.host.indexOf('@') > 0
                  ? result.host.split('@')
                  : false
              if (authInHost) {
                result.auth = authInHost.shift()
                result.host = result.hostname = authInHost.shift()
              }
            }

            mustEndAbs = mustEndAbs || (result.host && srcPath.length)

            if (mustEndAbs && !isAbsolute) {
              srcPath.unshift('')
            }

            if (!srcPath.length) {
              result.pathname = null
              result.path = null
            } else {
              result.pathname = srcPath.join('/')
            }

            //to support request.http
            if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
              result.path =
                (result.pathname ? result.pathname : '') +
                (result.search ? result.search : '')
            }
            result.auth = relative.auth || result.auth
            result.slashes = result.slashes || relative.slashes
            result.href = result.format()
            return result
          }

          Url.prototype.parseHost = function () {
            var host = this.host
            var port = portPattern.exec(host)
            if (port) {
              port = port[0]
              if (port !== ':') {
                this.port = port.substr(1)
              }
              host = host.substr(0, host.length - port.length)
            }
            if (host) this.hostname = host
          }

          /***/
        },

      /***/ './node_modules/url/util.js':
        /*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
        /***/ (module) => {
          'use strict'

          module.exports = {
            isString: function (arg) {
              return typeof arg === 'string'
            },
            isObject: function (arg) {
              return typeof arg === 'object' && arg !== null
            },
            isNull: function (arg) {
              return arg === null
            },
            isNullOrUndefined: function (arg) {
              return arg == null
            },
          }

          /***/
        },

      /***/ './node_modules/util/support/isBufferBrowser.js':
        /*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
        /***/ (module) => {
          module.exports = function isBuffer(arg) {
            return (
              arg &&
              typeof arg === 'object' &&
              typeof arg.copy === 'function' &&
              typeof arg.fill === 'function' &&
              typeof arg.readUInt8 === 'function'
            )
          }

          /***/
        },

      /***/ './node_modules/util/support/types.js':
        /*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          'use strict'
          // Currently in sync with Node.js lib/internal/util/types.js
          // https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

          var isArgumentsObject = __webpack_require__(
            /*! is-arguments */ './node_modules/is-arguments/index.js'
          )
          var isGeneratorFunction = __webpack_require__(
            /*! is-generator-function */ './node_modules/is-generator-function/index.js'
          )
          var whichTypedArray = __webpack_require__(
            /*! which-typed-array */ './node_modules/which-typed-array/index.js'
          )
          var isTypedArray = __webpack_require__(
            /*! is-typed-array */ './node_modules/is-typed-array/index.js'
          )

          function uncurryThis(f) {
            return f.call.bind(f)
          }

          var BigIntSupported = typeof BigInt !== 'undefined'
          var SymbolSupported = typeof Symbol !== 'undefined'

          var ObjectToString = uncurryThis(Object.prototype.toString)

          var numberValue = uncurryThis(Number.prototype.valueOf)
          var stringValue = uncurryThis(String.prototype.valueOf)
          var booleanValue = uncurryThis(Boolean.prototype.valueOf)

          if (BigIntSupported) {
            var bigIntValue = uncurryThis(BigInt.prototype.valueOf)
          }

          if (SymbolSupported) {
            var symbolValue = uncurryThis(Symbol.prototype.valueOf)
          }

          function checkBoxedPrimitive(value, prototypeValueOf) {
            if (typeof value !== 'object') {
              return false
            }
            try {
              prototypeValueOf(value)
              return true
            } catch (e) {
              return false
            }
          }

          exports.isArgumentsObject = isArgumentsObject
          exports.isGeneratorFunction = isGeneratorFunction
          exports.isTypedArray = isTypedArray

          // Taken from here and modified for better browser support
          // https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
          function isPromise(input) {
            return (
              (typeof Promise !== 'undefined' && input instanceof Promise) ||
              (input !== null &&
                typeof input === 'object' &&
                typeof input.then === 'function' &&
                typeof input.catch === 'function')
            )
          }
          exports.isPromise = isPromise

          function isArrayBufferView(value) {
            if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
              return ArrayBuffer.isView(value)
            }

            return isTypedArray(value) || isDataView(value)
          }
          exports.isArrayBufferView = isArrayBufferView

          function isUint8Array(value) {
            return whichTypedArray(value) === 'Uint8Array'
          }
          exports.isUint8Array = isUint8Array

          function isUint8ClampedArray(value) {
            return whichTypedArray(value) === 'Uint8ClampedArray'
          }
          exports.isUint8ClampedArray = isUint8ClampedArray

          function isUint16Array(value) {
            return whichTypedArray(value) === 'Uint16Array'
          }
          exports.isUint16Array = isUint16Array

          function isUint32Array(value) {
            return whichTypedArray(value) === 'Uint32Array'
          }
          exports.isUint32Array = isUint32Array

          function isInt8Array(value) {
            return whichTypedArray(value) === 'Int8Array'
          }
          exports.isInt8Array = isInt8Array

          function isInt16Array(value) {
            return whichTypedArray(value) === 'Int16Array'
          }
          exports.isInt16Array = isInt16Array

          function isInt32Array(value) {
            return whichTypedArray(value) === 'Int32Array'
          }
          exports.isInt32Array = isInt32Array

          function isFloat32Array(value) {
            return whichTypedArray(value) === 'Float32Array'
          }
          exports.isFloat32Array = isFloat32Array

          function isFloat64Array(value) {
            return whichTypedArray(value) === 'Float64Array'
          }
          exports.isFloat64Array = isFloat64Array

          function isBigInt64Array(value) {
            return whichTypedArray(value) === 'BigInt64Array'
          }
          exports.isBigInt64Array = isBigInt64Array

          function isBigUint64Array(value) {
            return whichTypedArray(value) === 'BigUint64Array'
          }
          exports.isBigUint64Array = isBigUint64Array

          function isMapToString(value) {
            return ObjectToString(value) === '[object Map]'
          }
          isMapToString.working =
            typeof Map !== 'undefined' && isMapToString(new Map())

          function isMap(value) {
            if (typeof Map === 'undefined') {
              return false
            }

            return isMapToString.working
              ? isMapToString(value)
              : value instanceof Map
          }
          exports.isMap = isMap

          function isSetToString(value) {
            return ObjectToString(value) === '[object Set]'
          }
          isSetToString.working =
            typeof Set !== 'undefined' && isSetToString(new Set())
          function isSet(value) {
            if (typeof Set === 'undefined') {
              return false
            }

            return isSetToString.working
              ? isSetToString(value)
              : value instanceof Set
          }
          exports.isSet = isSet

          function isWeakMapToString(value) {
            return ObjectToString(value) === '[object WeakMap]'
          }
          isWeakMapToString.working =
            typeof WeakMap !== 'undefined' && isWeakMapToString(new WeakMap())
          function isWeakMap(value) {
            if (typeof WeakMap === 'undefined') {
              return false
            }

            return isWeakMapToString.working
              ? isWeakMapToString(value)
              : value instanceof WeakMap
          }
          exports.isWeakMap = isWeakMap

          function isWeakSetToString(value) {
            return ObjectToString(value) === '[object WeakSet]'
          }
          isWeakSetToString.working =
            typeof WeakSet !== 'undefined' && isWeakSetToString(new WeakSet())
          function isWeakSet(value) {
            return isWeakSetToString(value)
          }
          exports.isWeakSet = isWeakSet

          function isArrayBufferToString(value) {
            return ObjectToString(value) === '[object ArrayBuffer]'
          }
          isArrayBufferToString.working =
            typeof ArrayBuffer !== 'undefined' &&
            isArrayBufferToString(new ArrayBuffer())
          function isArrayBuffer(value) {
            if (typeof ArrayBuffer === 'undefined') {
              return false
            }

            return isArrayBufferToString.working
              ? isArrayBufferToString(value)
              : value instanceof ArrayBuffer
          }
          exports.isArrayBuffer = isArrayBuffer

          function isDataViewToString(value) {
            return ObjectToString(value) === '[object DataView]'
          }
          isDataViewToString.working =
            typeof ArrayBuffer !== 'undefined' &&
            typeof DataView !== 'undefined' &&
            isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
          function isDataView(value) {
            if (typeof DataView === 'undefined') {
              return false
            }

            return isDataViewToString.working
              ? isDataViewToString(value)
              : value instanceof DataView
          }
          exports.isDataView = isDataView

          function isSharedArrayBufferToString(value) {
            return ObjectToString(value) === '[object SharedArrayBuffer]'
          }
          isSharedArrayBufferToString.working =
            typeof SharedArrayBuffer !== 'undefined' &&
            isSharedArrayBufferToString(new SharedArrayBuffer())
          function isSharedArrayBuffer(value) {
            if (typeof SharedArrayBuffer === 'undefined') {
              return false
            }

            return isSharedArrayBufferToString.working
              ? isSharedArrayBufferToString(value)
              : value instanceof SharedArrayBuffer
          }
          exports.isSharedArrayBuffer = isSharedArrayBuffer

          function isAsyncFunction(value) {
            return ObjectToString(value) === '[object AsyncFunction]'
          }
          exports.isAsyncFunction = isAsyncFunction

          function isMapIterator(value) {
            return ObjectToString(value) === '[object Map Iterator]'
          }
          exports.isMapIterator = isMapIterator

          function isSetIterator(value) {
            return ObjectToString(value) === '[object Set Iterator]'
          }
          exports.isSetIterator = isSetIterator

          function isGeneratorObject(value) {
            return ObjectToString(value) === '[object Generator]'
          }
          exports.isGeneratorObject = isGeneratorObject

          function isWebAssemblyCompiledModule(value) {
            return ObjectToString(value) === '[object WebAssembly.Module]'
          }
          exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule

          function isNumberObject(value) {
            return checkBoxedPrimitive(value, numberValue)
          }
          exports.isNumberObject = isNumberObject

          function isStringObject(value) {
            return checkBoxedPrimitive(value, stringValue)
          }
          exports.isStringObject = isStringObject

          function isBooleanObject(value) {
            return checkBoxedPrimitive(value, booleanValue)
          }
          exports.isBooleanObject = isBooleanObject

          function isBigIntObject(value) {
            return BigIntSupported && checkBoxedPrimitive(value, bigIntValue)
          }
          exports.isBigIntObject = isBigIntObject

          function isSymbolObject(value) {
            return SymbolSupported && checkBoxedPrimitive(value, symbolValue)
          }
          exports.isSymbolObject = isSymbolObject

          function isBoxedPrimitive(value) {
            return (
              isNumberObject(value) ||
              isStringObject(value) ||
              isBooleanObject(value) ||
              isBigIntObject(value) ||
              isSymbolObject(value)
            )
          }
          exports.isBoxedPrimitive = isBoxedPrimitive

          function isAnyArrayBuffer(value) {
            return (
              typeof Uint8Array !== 'undefined' &&
              (isArrayBuffer(value) || isSharedArrayBuffer(value))
            )
          }
          exports.isAnyArrayBuffer = isAnyArrayBuffer

          ;['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(
            function (method) {
              Object.defineProperty(exports, method, {
                enumerable: false,
                value: function () {
                  throw new Error(method + ' is not supported in userland')
                },
              })
            }
          )

          /***/
        },

      /***/ './node_modules/util/util.js':
        /*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
        /***/ (__unused_webpack_module, exports, __webpack_require__) => {
          /* provided dependency */ var process = __webpack_require__(
            /*! process/browser */ './node_modules/process/browser.js'
          )
          /* provided dependency */ var console = __webpack_require__(
            /*! console-browserify */ './node_modules/console-browserify/index.js'
          )
          // Copyright Joyent, Inc. and other Node contributors.
          //
          // Permission is hereby granted, free of charge, to any person obtaining a
          // copy of this software and associated documentation files (the
          // "Software"), to deal in the Software without restriction, including
          // without limitation the rights to use, copy, modify, merge, publish,
          // distribute, sublicense, and/or sell copies of the Software, and to permit
          // persons to whom the Software is furnished to do so, subject to the
          // following conditions:
          //
          // The above copyright notice and this permission notice shall be included
          // in all copies or substantial portions of the Software.
          //
          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
          // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
          // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
          // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          // USE OR OTHER DEALINGS IN THE SOFTWARE.

          var getOwnPropertyDescriptors =
            Object.getOwnPropertyDescriptors ||
            function getOwnPropertyDescriptors(obj) {
              var keys = Object.keys(obj)
              var descriptors = {}
              for (var i = 0; i < keys.length; i++) {
                descriptors[keys[i]] = Object.getOwnPropertyDescriptor(
                  obj,
                  keys[i]
                )
              }
              return descriptors
            }

          var formatRegExp = /%[sdj%]/g
          exports.format = function (f) {
            if (!isString(f)) {
              var objects = []
              for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]))
              }
              return objects.join(' ')
            }

            var i = 1
            var args = arguments
            var len = args.length
            var str = String(f).replace(formatRegExp, function (x) {
              if (x === '%%') return '%'
              if (i >= len) return x
              switch (x) {
                case '%s':
                  return String(args[i++])
                case '%d':
                  return Number(args[i++])
                case '%j':
                  try {
                    return JSON.stringify(args[i++])
                  } catch (_) {
                    return '[Circular]'
                  }
                default:
                  return x
              }
            })
            for (var x = args[i]; i < len; x = args[++i]) {
              if (isNull(x) || !isObject(x)) {
                str += ' ' + x
              } else {
                str += ' ' + inspect(x)
              }
            }
            return str
          }

          // Mark that a method should not be used.
          // Returns a modified function which warns once by default.
          // If --no-deprecation is set, then it is a no-op.
          exports.deprecate = function (fn, msg) {
            if (
              typeof process !== 'undefined' &&
              process.noDeprecation === true
            ) {
              return fn
            }

            // Allow for deprecating things in the process of starting up.
            if (typeof process === 'undefined') {
              return function () {
                return exports.deprecate(fn, msg).apply(this, arguments)
              }
            }

            var warned = false
            function deprecated() {
              if (!warned) {
                if (process.throwDeprecation) {
                  throw new Error(msg)
                } else if (process.traceDeprecation) {
                  console.trace(msg)
                } else {
                  console.error(msg)
                }
                warned = true
              }
              return fn.apply(this, arguments)
            }

            return deprecated
          }

          var debugs = {}
          var debugEnvRegex = /^$/

          if (process.env.NODE_DEBUG) {
            var debugEnv = process.env.NODE_DEBUG
            debugEnv = debugEnv
              .replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
              .replace(/\*/g, '.*')
              .replace(/,/g, '$|^')
              .toUpperCase()
            debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i')
          }
          exports.debuglog = function (set) {
            set = set.toUpperCase()
            if (!debugs[set]) {
              if (debugEnvRegex.test(set)) {
                var pid = process.pid
                debugs[set] = function () {
                  var msg = exports.format.apply(exports, arguments)
                  console.error('%s %d: %s', set, pid, msg)
                }
              } else {
                debugs[set] = function () {}
              }
            }
            return debugs[set]
          }

          /**
           * Echos the value of a value. Trys to print the value out
           * in the best way possible given the different types.
           *
           * @param {Object} obj The object to print out.
           * @param {Object} opts Optional options object that alters the output.
           */
          /* legacy: obj, showHidden, depth, colors*/
          function inspect(obj, opts) {
            // default options
            var ctx = {
              seen: [],
              stylize: stylizeNoColor,
            }
            // legacy...
            if (arguments.length >= 3) ctx.depth = arguments[2]
            if (arguments.length >= 4) ctx.colors = arguments[3]
            if (isBoolean(opts)) {
              // legacy...
              ctx.showHidden = opts
            } else if (opts) {
              // got an "options" object
              exports._extend(ctx, opts)
            }
            // set default options
            if (isUndefined(ctx.showHidden)) ctx.showHidden = false
            if (isUndefined(ctx.depth)) ctx.depth = 2
            if (isUndefined(ctx.colors)) ctx.colors = false
            if (isUndefined(ctx.customInspect)) ctx.customInspect = true
            if (ctx.colors) ctx.stylize = stylizeWithColor
            return formatValue(ctx, obj, ctx.depth)
          }
          exports.inspect = inspect

          // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
          inspect.colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39],
          }

          // Don't use 'blue' not visible on cmd.exe
          inspect.styles = {
            special: 'cyan',
            number: 'yellow',
            boolean: 'yellow',
            undefined: 'grey',
            null: 'bold',
            string: 'green',
            date: 'magenta',
            // "name": intentionally not styling
            regexp: 'red',
          }

          function stylizeWithColor(str, styleType) {
            var style = inspect.styles[styleType]

            if (style) {
              return (
                '\u001b[' +
                inspect.colors[style][0] +
                'm' +
                str +
                '\u001b[' +
                inspect.colors[style][1] +
                'm'
              )
            } else {
              return str
            }
          }

          function stylizeNoColor(str, styleType) {
            return str
          }

          function arrayToHash(array) {
            var hash = {}

            array.forEach(function (val, idx) {
              hash[val] = true
            })

            return hash
          }

          function formatValue(ctx, value, recurseTimes) {
            // Provide a hook for user-specified inspect functions.
            // Check that value is an object with an inspect function on it
            if (
              ctx.customInspect &&
              value &&
              isFunction(value.inspect) &&
              // Filter out the util module, it's inspect function is special
              value.inspect !== exports.inspect &&
              // Also filter out any prototype objects using the circular check.
              !(value.constructor && value.constructor.prototype === value)
            ) {
              var ret = value.inspect(recurseTimes, ctx)
              if (!isString(ret)) {
                ret = formatValue(ctx, ret, recurseTimes)
              }
              return ret
            }

            // Primitive types cannot have properties
            var primitive = formatPrimitive(ctx, value)
            if (primitive) {
              return primitive
            }

            // Look up the keys of the object.
            var keys = Object.keys(value)
            var visibleKeys = arrayToHash(keys)

            if (ctx.showHidden) {
              keys = Object.getOwnPropertyNames(value)
            }

            // IE doesn't make error fields non-enumerable
            // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
            if (
              isError(value) &&
              (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)
            ) {
              return formatError(value)
            }

            // Some type of object without properties can be shortcutted.
            if (keys.length === 0) {
              if (isFunction(value)) {
                var name = value.name ? ': ' + value.name : ''
                return ctx.stylize('[Function' + name + ']', 'special')
              }
              if (isRegExp(value)) {
                return ctx.stylize(
                  RegExp.prototype.toString.call(value),
                  'regexp'
                )
              }
              if (isDate(value)) {
                return ctx.stylize(Date.prototype.toString.call(value), 'date')
              }
              if (isError(value)) {
                return formatError(value)
              }
            }

            var base = '',
              array = false,
              braces = ['{', '}']

            // Make Array say that they are Array
            if (isArray(value)) {
              array = true
              braces = ['[', ']']
            }

            // Make functions say that they are functions
            if (isFunction(value)) {
              var n = value.name ? ': ' + value.name : ''
              base = ' [Function' + n + ']'
            }

            // Make RegExps say that they are RegExps
            if (isRegExp(value)) {
              base = ' ' + RegExp.prototype.toString.call(value)
            }

            // Make dates with properties first say the date
            if (isDate(value)) {
              base = ' ' + Date.prototype.toUTCString.call(value)
            }

            // Make error with message first say the error
            if (isError(value)) {
              base = ' ' + formatError(value)
            }

            if (keys.length === 0 && (!array || value.length == 0)) {
              return braces[0] + base + braces[1]
            }

            if (recurseTimes < 0) {
              if (isRegExp(value)) {
                return ctx.stylize(
                  RegExp.prototype.toString.call(value),
                  'regexp'
                )
              } else {
                return ctx.stylize('[Object]', 'special')
              }
            }

            ctx.seen.push(value)

            var output
            if (array) {
              output = formatArray(ctx, value, recurseTimes, visibleKeys, keys)
            } else {
              output = keys.map(function (key) {
                return formatProperty(
                  ctx,
                  value,
                  recurseTimes,
                  visibleKeys,
                  key,
                  array
                )
              })
            }

            ctx.seen.pop()

            return reduceToSingleString(output, base, braces)
          }

          function formatPrimitive(ctx, value) {
            if (isUndefined(value)) return ctx.stylize('undefined', 'undefined')
            if (isString(value)) {
              var simple =
                "'" +
                JSON.stringify(value)
                  .replace(/^"|"$/g, '')
                  .replace(/'/g, "\\'")
                  .replace(/\\"/g, '"') +
                "'"
              return ctx.stylize(simple, 'string')
            }
            if (isNumber(value)) return ctx.stylize('' + value, 'number')
            if (isBoolean(value)) return ctx.stylize('' + value, 'boolean')
            // For some reason typeof null is "object", so special case here.
            if (isNull(value)) return ctx.stylize('null', 'null')
          }

          function formatError(value) {
            return '[' + Error.prototype.toString.call(value) + ']'
          }

          function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
            var output = []
            for (var i = 0, l = value.length; i < l; ++i) {
              if (hasOwnProperty(value, String(i))) {
                output.push(
                  formatProperty(
                    ctx,
                    value,
                    recurseTimes,
                    visibleKeys,
                    String(i),
                    true
                  )
                )
              } else {
                output.push('')
              }
            }
            keys.forEach(function (key) {
              if (!key.match(/^\d+$/)) {
                output.push(
                  formatProperty(
                    ctx,
                    value,
                    recurseTimes,
                    visibleKeys,
                    key,
                    true
                  )
                )
              }
            })
            return output
          }

          function formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            array
          ) {
            var name, str, desc
            desc = Object.getOwnPropertyDescriptor(value, key) || {
              value: value[key],
            }
            if (desc.get) {
              if (desc.set) {
                str = ctx.stylize('[Getter/Setter]', 'special')
              } else {
                str = ctx.stylize('[Getter]', 'special')
              }
            } else {
              if (desc.set) {
                str = ctx.stylize('[Setter]', 'special')
              }
            }
            if (!hasOwnProperty(visibleKeys, key)) {
              name = '[' + key + ']'
            }
            if (!str) {
              if (ctx.seen.indexOf(desc.value) < 0) {
                if (isNull(recurseTimes)) {
                  str = formatValue(ctx, desc.value, null)
                } else {
                  str = formatValue(ctx, desc.value, recurseTimes - 1)
                }
                if (str.indexOf('\n') > -1) {
                  if (array) {
                    str = str
                      .split('\n')
                      .map(function (line) {
                        return '  ' + line
                      })
                      .join('\n')
                      .substr(2)
                  } else {
                    str =
                      '\n' +
                      str
                        .split('\n')
                        .map(function (line) {
                          return '   ' + line
                        })
                        .join('\n')
                  }
                }
              } else {
                str = ctx.stylize('[Circular]', 'special')
              }
            }
            if (isUndefined(name)) {
              if (array && key.match(/^\d+$/)) {
                return str
              }
              name = JSON.stringify('' + key)
              if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                name = name.substr(1, name.length - 2)
                name = ctx.stylize(name, 'name')
              } else {
                name = name
                  .replace(/'/g, "\\'")
                  .replace(/\\"/g, '"')
                  .replace(/(^"|"$)/g, "'")
                name = ctx.stylize(name, 'string')
              }
            }

            return name + ': ' + str
          }

          function reduceToSingleString(output, base, braces) {
            var numLinesEst = 0
            var length = output.reduce(function (prev, cur) {
              numLinesEst++
              if (cur.indexOf('\n') >= 0) numLinesEst++
              return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1
            }, 0)

            if (length > 60) {
              return (
                braces[0] +
                (base === '' ? '' : base + '\n ') +
                ' ' +
                output.join(',\n  ') +
                ' ' +
                braces[1]
              )
            }

            return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1]
          }

          // NOTE: These type checking functions intentionally don't use `instanceof`
          // because it is fragile and can be easily faked with `Object.create()`.
          exports.types = __webpack_require__(
            /*! ./support/types */ './node_modules/util/support/types.js'
          )

          function isArray(ar) {
            return Array.isArray(ar)
          }
          exports.isArray = isArray

          function isBoolean(arg) {
            return typeof arg === 'boolean'
          }
          exports.isBoolean = isBoolean

          function isNull(arg) {
            return arg === null
          }
          exports.isNull = isNull

          function isNullOrUndefined(arg) {
            return arg == null
          }
          exports.isNullOrUndefined = isNullOrUndefined

          function isNumber(arg) {
            return typeof arg === 'number'
          }
          exports.isNumber = isNumber

          function isString(arg) {
            return typeof arg === 'string'
          }
          exports.isString = isString

          function isSymbol(arg) {
            return typeof arg === 'symbol'
          }
          exports.isSymbol = isSymbol

          function isUndefined(arg) {
            return arg === void 0
          }
          exports.isUndefined = isUndefined

          function isRegExp(re) {
            return isObject(re) && objectToString(re) === '[object RegExp]'
          }
          exports.isRegExp = isRegExp
          exports.types.isRegExp = isRegExp

          function isObject(arg) {
            return typeof arg === 'object' && arg !== null
          }
          exports.isObject = isObject

          function isDate(d) {
            return isObject(d) && objectToString(d) === '[object Date]'
          }
          exports.isDate = isDate
          exports.types.isDate = isDate

          function isError(e) {
            return (
              isObject(e) &&
              (objectToString(e) === '[object Error]' || e instanceof Error)
            )
          }
          exports.isError = isError
          exports.types.isNativeError = isError

          function isFunction(arg) {
            return typeof arg === 'function'
          }
          exports.isFunction = isFunction

          function isPrimitive(arg) {
            return (
              arg === null ||
              typeof arg === 'boolean' ||
              typeof arg === 'number' ||
              typeof arg === 'string' ||
              typeof arg === 'symbol' || // ES6 symbol
              typeof arg === 'undefined'
            )
          }
          exports.isPrimitive = isPrimitive

          exports.isBuffer = __webpack_require__(
            /*! ./support/isBuffer */ './node_modules/util/support/isBufferBrowser.js'
          )

          function objectToString(o) {
            return Object.prototype.toString.call(o)
          }

          function pad(n) {
            return n < 10 ? '0' + n.toString(10) : n.toString(10)
          }

          var months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ]

          // 26 Feb 16:19:34
          function timestamp() {
            var d = new Date()
            var time = [
              pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds()),
            ].join(':')
            return [d.getDate(), months[d.getMonth()], time].join(' ')
          }

          // log is just a thin wrapper to console.log that prepends a timestamp
          exports.log = function () {
            console.log(
              '%s - %s',
              timestamp(),
              exports.format.apply(exports, arguments)
            )
          }

          /**
           * Inherit the prototype methods from one constructor into another.
           *
           * The Function.prototype.inherits from lang.js rewritten as a standalone
           * function (not on Function.prototype). NOTE: If this file is to be loaded
           * during bootstrapping this function needs to be rewritten using some native
           * functions as prototype setup using normal JavaScript does not work as
           * expected during bootstrapping (see mirror.js in r114903).
           *
           * @param {function} ctor Constructor function which needs to inherit the
           *     prototype.
           * @param {function} superCtor Constructor function to inherit prototype from.
           */
          exports.inherits = __webpack_require__(
            /*! inherits */ './node_modules/inherits/inherits_browser.js'
          )

          exports._extend = function (origin, add) {
            // Don't do anything if add isn't an object
            if (!add || !isObject(add)) return origin

            var keys = Object.keys(add)
            var i = keys.length
            while (i--) {
              origin[keys[i]] = add[keys[i]]
            }
            return origin
          }

          function hasOwnProperty(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop)
          }

          var kCustomPromisifiedSymbol =
            typeof Symbol !== 'undefined'
              ? Symbol('util.promisify.custom')
              : undefined

          exports.promisify = function promisify(original) {
            if (typeof original !== 'function')
              throw new TypeError(
                'The "original" argument must be of type Function'
              )

            if (
              kCustomPromisifiedSymbol &&
              original[kCustomPromisifiedSymbol]
            ) {
              var fn = original[kCustomPromisifiedSymbol]
              if (typeof fn !== 'function') {
                throw new TypeError(
                  'The "util.promisify.custom" argument must be of type Function'
                )
              }
              Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                value: fn,
                enumerable: false,
                writable: false,
                configurable: true,
              })
              return fn
            }

            function fn() {
              var promiseResolve, promiseReject
              var promise = new Promise(function (resolve, reject) {
                promiseResolve = resolve
                promiseReject = reject
              })

              var args = []
              for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i])
              }
              args.push(function (err, value) {
                if (err) {
                  promiseReject(err)
                } else {
                  promiseResolve(value)
                }
              })

              try {
                original.apply(this, args)
              } catch (err) {
                promiseReject(err)
              }

              return promise
            }

            Object.setPrototypeOf(fn, Object.getPrototypeOf(original))

            if (kCustomPromisifiedSymbol)
              Object.defineProperty(fn, kCustomPromisifiedSymbol, {
                value: fn,
                enumerable: false,
                writable: false,
                configurable: true,
              })
            return Object.defineProperties(
              fn,
              getOwnPropertyDescriptors(original)
            )
          }

          exports.promisify.custom = kCustomPromisifiedSymbol

          function callbackifyOnRejected(reason, cb) {
            // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
            // Because `null` is a special error value in callbacks which means "no error
            // occurred", we error-wrap so the callback consumer can distinguish between
            // "the promise rejected with null" or "the promise fulfilled with undefined".
            if (!reason) {
              var newReason = new Error(
                'Promise was rejected with a falsy value'
              )
              newReason.reason = reason
              reason = newReason
            }
            return cb(reason)
          }

          function callbackify(original) {
            if (typeof original !== 'function') {
              throw new TypeError(
                'The "original" argument must be of type Function'
              )
            }

            // We DO NOT return the promise as it gives the user a false sense that
            // the promise is actually somehow related to the callback's execution
            // and that the callback throwing will reject the promise.
            function callbackified() {
              var args = []
              for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i])
              }

              var maybeCb = args.pop()
              if (typeof maybeCb !== 'function') {
                throw new TypeError(
                  'The last argument must be of type Function'
                )
              }
              var self = this
              var cb = function () {
                return maybeCb.apply(self, arguments)
              }
              // In true node style we process the callback on `nextTick` with all the
              // implications (stack, `uncaughtException`, `async_hooks`)
              original.apply(this, args).then(
                function (ret) {
                  process.nextTick(cb.bind(null, null, ret))
                },
                function (rej) {
                  process.nextTick(callbackifyOnRejected.bind(null, rej, cb))
                }
              )
            }

            Object.setPrototypeOf(
              callbackified,
              Object.getPrototypeOf(original)
            )
            Object.defineProperties(
              callbackified,
              getOwnPropertyDescriptors(original)
            )
            return callbackified
          }
          exports.callbackify = callbackify

          /***/
        },

      /***/ './node_modules/which-typed-array/index.js':
        /*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
        /***/ (module, __unused_webpack_exports, __webpack_require__) => {
          'use strict'

          var forEach = __webpack_require__(
            /*! foreach */ './node_modules/foreach/index.js'
          )
          var availableTypedArrays = __webpack_require__(
            /*! available-typed-arrays */ './node_modules/available-typed-arrays/index.js'
          )
          var callBound = __webpack_require__(
            /*! call-bind/callBound */ './node_modules/call-bind/callBound.js'
          )

          var $toString = callBound('Object.prototype.toString')
          var hasSymbols = __webpack_require__(
            /*! has-symbols */ './node_modules/has-symbols/index.js'
          )()
          var hasToStringTag =
            hasSymbols && typeof Symbol.toStringTag === 'symbol'

          var typedArrays = availableTypedArrays()

          var $slice = callBound('String.prototype.slice')
          var toStrTags = {}
          var gOPD = __webpack_require__(
            /*! es-abstract/helpers/getOwnPropertyDescriptor */ './node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js'
          )
          var getPrototypeOf = Object.getPrototypeOf // require('getprototypeof');
          if (hasToStringTag && gOPD && getPrototypeOf) {
            forEach(typedArrays, function (typedArray) {
              if (typeof __webpack_require__.g[typedArray] === 'function') {
                var arr = new __webpack_require__.g[typedArray]()
                if (!(Symbol.toStringTag in arr)) {
                  throw new EvalError(
                    'this engine has support for Symbol.toStringTag, but ' +
                      typedArray +
                      ' does not have the property! Please report this.'
                  )
                }
                var proto = getPrototypeOf(arr)
                var descriptor = gOPD(proto, Symbol.toStringTag)
                if (!descriptor) {
                  var superProto = getPrototypeOf(proto)
                  descriptor = gOPD(superProto, Symbol.toStringTag)
                }
                toStrTags[typedArray] = descriptor.get
              }
            })
          }

          var tryTypedArrays = function tryAllTypedArrays(value) {
            var foundName = false
            forEach(toStrTags, function (getter, typedArray) {
              if (!foundName) {
                try {
                  var name = getter.call(value)
                  if (name === typedArray) {
                    foundName = name
                  }
                } catch (e) {}
              }
            })
            return foundName
          }

          var isTypedArray = __webpack_require__(
            /*! is-typed-array */ './node_modules/is-typed-array/index.js'
          )

          module.exports = function whichTypedArray(value) {
            if (!isTypedArray(value)) {
              return false
            }
            if (!hasToStringTag) {
              return $slice($toString(value), 8, -1)
            }
            return tryTypedArrays(value)
          }

          /***/
        },

      /******/
    } // The module cache
    /************************************************************************/
    /******/ /******/ var __webpack_module_cache__ = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/ var cachedModule = __webpack_module_cache__[moduleId]
      /******/ if (cachedModule !== undefined) {
        /******/ return cachedModule.exports
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
        /******/ id: moduleId,
        /******/ loaded: false,
        /******/ exports: {},
        /******/
      }) // Execute the module function
      /******/
      /******/ /******/ __webpack_modules__[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ) // Flag the module as loaded
      /******/
      /******/ /******/ module.loaded = true // Return the exports of the module
      /******/
      /******/ /******/ return module.exports
      /******/
    } /* webpack/runtime/define property getters */
    /******/
    /************************************************************************/
    /******/ /******/ ;(() => {
      /******/ // define getter functions for harmony exports
      /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            })
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    })() /* webpack/runtime/global */
    /******/
    /******/ /******/ ;(() => {
      /******/ __webpack_require__.g = (function () {
        /******/ if (typeof globalThis === 'object') return globalThis
        /******/ try {
          /******/ return this || new Function('return this')()
          /******/
        } catch (e) {
          /******/ if (typeof window === 'object') return window
          /******/
        }
        /******/
      })()
      /******/
    })() /* webpack/runtime/hasOwnProperty shorthand */
    /******/
    /******/ /******/ ;(() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop)
      /******/
    })() /* webpack/runtime/make namespace object */
    /******/
    /******/ /******/ ;(() => {
      /******/ // define __esModule on exports
      /******/ __webpack_require__.r = (exports) => {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module',
          })
          /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true })
        /******/
      }
      /******/
    })() /* webpack/runtime/node module decorator */
    /******/
    /******/ /******/ ;(() => {
      /******/ __webpack_require__.nmd = (module) => {
        /******/ module.paths = []
        /******/ if (!module.children) module.children = []
        /******/ return module
        /******/
      }
      /******/
    })()
    /******/
    /************************************************************************/
    var __webpack_exports__ = {}
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    ;(() => {
      'use strict'
      var exports = __webpack_exports__
      /*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

      Object.defineProperty(exports, '__esModule', { value: true })
      exports.ImgurClient = void 0
      var client_1 = __webpack_require__(/*! ./client */ './src/client.ts')
      Object.defineProperty(exports, 'ImgurClient', {
        enumerable: true,
        get: function () {
          return client_1.ImgurClient
        },
      })
    })()

    /******/ return __webpack_exports__
    /******/
  })()
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbWd1ci1hcGkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hcnJheS1maWx0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9hc3NlcnQuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvZXJyb3JzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXZhaWxhYmxlLXR5cGVkLWFycmF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZGVmaW5lLXByb3BlcnRpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L2hlbHBlcnMvZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9lczYtb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZm9yZWFjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZm9ybS1kYXRhL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9nZXQtaW50cmluc2ljL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9oYXMtc3ltYm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvc2hhbXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2lzLWFyZ3VtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtZ2VuZXJhdG9yLWZ1bmN0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9pcy1uYW4vaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtbmFuL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9pcy1uYW4vc2hpbS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtdHlwZWQtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9zaGltLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2RlY29kZS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmcvZW5jb2RlLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvYWxidW0vZ2V0QWxidW0udHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2FsYnVtL2luZGV4LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2NvbW1vbi9lbmRwb2ludHMudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2NvbW1vbi90eXBlcy50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvY29tbW9uL3V0aWxzLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9nYWxsZXJ5L2dldEdhbGxlcnkudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2dhbGxlcnkvZ2V0U3VicmVkZGl0R2FsbGVyeS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvZ2FsbGVyeS9pbmRleC50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvZ2FsbGVyeS9zZWFyY2hHYWxsZXJ5LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9nZXRBdXRob3JpemF0aW9uSGVhZGVyLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9pbWFnZS9kZWxldGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvZmF2b3JpdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvZ2V0SW1hZ2UudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2ltYWdlL2luZGV4LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9pbWFnZS91cGRhdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvdXBsb2FkLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC9ub2RlX21vZHVsZXMvcHVueWNvZGUvcHVueWNvZGUuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC91cmwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC91dGlsLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvd2hpY2gtdHlwZWQtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ltZ3VyLWFwaS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNhOztBQUViLHVCQUF1QiwyRUFBMkUsa0NBQWtDLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxrQ0FBa0MsOEhBQThILEdBQUcsRUFBRSxxQkFBcUI7O0FBRTdWLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLGVBQWUsbUJBQU8sQ0FBQyx5RUFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixtQkFBTyxDQUFDLHlHQUFtQzs7QUFFaEUsZ0JBQWdCLG1CQUFPLENBQUMsMENBQU87QUFDL0I7O0FBRUEscUJBQXFCLHFFQUFzQjtBQUMzQztBQUNBOztBQUVBLG1EQUFtRCxnR0FBbUM7QUFDdEYsdUNBQXVDLG1CQUFPLENBQUMsb0RBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsNkZBQTZCOztBQUV4RDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGlCQUFpQixPQUFPLGVBQWUsT0FBTyxlQUFlLE9BQU8sV0FBVyxPQUFPO0FBQ3RGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUI7O0FBRW5COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTtBQUNBLHFFQUFxRSxhQUFhO0FBQ2xGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxlQUFlOztBQUVmOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7O0FBRWY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQix1QkFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIOztBQUVBLFFBQVEsa0JBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsd0JBQXdCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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ZDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNB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QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFD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O0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsT0FBTztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzN0QmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUNMQTtBQUNBOztBQUVhOztBQUViLHdCQUF3QixtQkFBTyxDQUFDLDBEQUFjO0FBQzlDLDBCQUEwQixtQkFBTyxDQUFDLDRFQUF1QjtBQUN6RCxzQkFBc0IsbUJBQU8sQ0FBQyxvRUFBbUI7QUFDakQsbUJBQW1CLG1CQUFPLENBQUMsOERBQWdCOztBQUUzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCO0FBQ3pCLDJCQUEyQjtBQUMzQixvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOzs7QUFHekI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qjs7QUFFdkI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOztBQUV0QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qjs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCOztBQUV4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzNVRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhLE9BQU8sb0JBQW9CLE9BQU87QUFDL0M7QUFDQTs7QUFFQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakI7QUFDQSxPQUFPLFVBQVUsT0FBTztBQUN4QixRQUFRLE9BQU87QUFDZixPQUFPO0FBQ1AsUUFBUSxPQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBLElBQUksT0FBTztBQUNYLGlCQUFpQixPQUFPO0FBQ3hCLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxRQUFRLE9BQU87QUFDZjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7O0FBR2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QyxLQUFLOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0Esa0dBQTBDOztBQUUxQztBQUNBO0FBQ0E7QUFDQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjs7QUFFaEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLHNCQUFzQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Qsb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZiwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkIsa0hBQWdEOztBQUVoRDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLFdBQVc7QUFDWCxFQUFFLE9BQU87QUFDVDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EscUdBQXNDOztBQUV0QyxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCOztBQUV4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLENBQUMsT0FBTyxxQ0FBcUM7QUFDeEUsMkJBQTJCLENBQUMsT0FBTyxzREFBc0Q7QUFDekY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7O0FDMXNCTjs7QUFFYixjQUFjLG1CQUFPLENBQUMsZ0RBQVM7QUFDL0IsMkJBQTJCLG1CQUFPLENBQUMsOEVBQXdCO0FBQzNELGdCQUFnQixtQkFBTyxDQUFDLGtFQUFxQjs7QUFFN0M7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyx3REFBYTtBQUN0Qzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxtQkFBTyxDQUFDLG9IQUE4QztBQUNqRSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBLGFBQWEscUJBQU07QUFDbkIsaUJBQWlCLHFCQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUEsbUJBQW1CLG1CQUFPLENBQUMsOERBQWdCOztBQUUzQztBQUNBLDRCQUE0QixjQUFjO0FBQzFDLHVCQUF1Qix3Q0FBd0M7QUFDL0Q7QUFDQTs7Ozs7OztVQ3ZEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0EsQ0FBQyxJOzs7OztXQ1BELHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7O0FDSkEsc0VBQXVDO0FBQTlCLGlIQUFXIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdC8vQ29tbW9uSlMyIENvbW1lbnRcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHQvL0FNRCBDb21tZW50XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdC8vQ29tbW9uSlMgQ29tbWVudFxuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiaW1ndXJcIl0gPSBmYWN0b3J5KCk7XG5cdC8vUm9vdCBDb21tZW50XG5cdGVsc2Vcblx0XHRyb290W1wiaW1ndXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiXG4vKipcbiAqIEFycmF5I2ZpbHRlci5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdD19IHNlbGZcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHRocm93IFR5cGVFcnJvclxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyciwgZm4sIHNlbGYpIHtcbiAgaWYgKGFyci5maWx0ZXIpIHJldHVybiBhcnIuZmlsdGVyKGZuLCBzZWxmKTtcbiAgaWYgKHZvaWQgMCA9PT0gYXJyIHx8IG51bGwgPT09IGFycikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIGZuKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICB2YXIgcmV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd24uY2FsbChhcnIsIGkpKSBjb250aW51ZTtcbiAgICB2YXIgdmFsID0gYXJyW2ldO1xuICAgIGlmIChmbi5jYWxsKHNlbGYsIHZhbCwgaSwgYXJyKSkgcmV0LnB1c2godmFsKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4iLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2Fzc2VydC5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8yYTUxYWU0MjRhNTEzZWM5YTZhYTM0NjZiYWEwY2MxZDU1ZGQ0ZjNiXG4vLyBPcmlnaW5hbGx5IGZyb20gbmFyd2hhbC5qcyAoaHR0cDovL25hcndoYWxqcy5vcmcpXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgVGhvbWFzIFJvYmluc29uIDwyODBub3J0aC5jb20+XG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgJ1NvZnR3YXJlJyksIHRvXG4vLyBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuLy8gcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4vLyBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICdBUyBJUycsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTlxuLy8gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxuLy8gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvZXJyb3JzJyksXG4gICAgX3JlcXVpcmUkY29kZXMgPSBfcmVxdWlyZS5jb2RlcyxcbiAgICBFUlJfQU1CSUdVT1VTX0FSR1VNRU5UID0gX3JlcXVpcmUkY29kZXMuRVJSX0FNQklHVU9VU19BUkdVTUVOVCxcbiAgICBFUlJfSU5WQUxJRF9BUkdfVFlQRSA9IF9yZXF1aXJlJGNvZGVzLkVSUl9JTlZBTElEX0FSR19UWVBFLFxuICAgIEVSUl9JTlZBTElEX0FSR19WQUxVRSA9IF9yZXF1aXJlJGNvZGVzLkVSUl9JTlZBTElEX0FSR19WQUxVRSxcbiAgICBFUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUsXG4gICAgRVJSX01JU1NJTkdfQVJHUyA9IF9yZXF1aXJlJGNvZGVzLkVSUl9NSVNTSU5HX0FSR1M7XG5cbnZhciBBc3NlcnRpb25FcnJvciA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvYXNzZXJ0L2Fzc2VydGlvbl9lcnJvcicpO1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgndXRpbC8nKSxcbiAgICBpbnNwZWN0ID0gX3JlcXVpcmUyLmluc3BlY3Q7XG5cbnZhciBfcmVxdWlyZSR0eXBlcyA9IHJlcXVpcmUoJ3V0aWwvJykudHlwZXMsXG4gICAgaXNQcm9taXNlID0gX3JlcXVpcmUkdHlwZXMuaXNQcm9taXNlLFxuICAgIGlzUmVnRXhwID0gX3JlcXVpcmUkdHlwZXMuaXNSZWdFeHA7XG5cbnZhciBvYmplY3RBc3NpZ24gPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbiA6IHJlcXVpcmUoJ2VzNi1vYmplY3QtYXNzaWduJykuYXNzaWduO1xudmFyIG9iamVjdElzID0gT2JqZWN0LmlzID8gT2JqZWN0LmlzIDogcmVxdWlyZSgnb2JqZWN0LWlzJyk7XG52YXIgZXJyb3JDYWNoZSA9IG5ldyBNYXAoKTtcbnZhciBpc0RlZXBFcXVhbDtcbnZhciBpc0RlZXBTdHJpY3RFcXVhbDtcbnZhciBwYXJzZUV4cHJlc3Npb25BdDtcbnZhciBmaW5kTm9kZUFyb3VuZDtcbnZhciBkZWNvZGVyO1xuXG5mdW5jdGlvbiBsYXp5TG9hZENvbXBhcmlzb24oKSB7XG4gIHZhciBjb21wYXJpc29uID0gcmVxdWlyZSgnLi9pbnRlcm5hbC91dGlsL2NvbXBhcmlzb25zJyk7XG5cbiAgaXNEZWVwRXF1YWwgPSBjb21wYXJpc29uLmlzRGVlcEVxdWFsO1xuICBpc0RlZXBTdHJpY3RFcXVhbCA9IGNvbXBhcmlzb24uaXNEZWVwU3RyaWN0RXF1YWw7XG59IC8vIEVzY2FwZSBjb250cm9sIGNoYXJhY3RlcnMgYnV0IG5vdCBcXG4gYW5kIFxcdCB0byBrZWVwIHRoZSBsaW5lIGJyZWFrcyBhbmRcbi8vIGluZGVudGF0aW9uIGludGFjdC5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XG5cblxudmFyIGVzY2FwZVNlcXVlbmNlc1JlZ0V4cCA9IC9bXFx4MDAtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZdL2c7XG52YXIgbWV0YSA9IFtcIlxcXFx1MDAwMFwiLCBcIlxcXFx1MDAwMVwiLCBcIlxcXFx1MDAwMlwiLCBcIlxcXFx1MDAwM1wiLCBcIlxcXFx1MDAwNFwiLCBcIlxcXFx1MDAwNVwiLCBcIlxcXFx1MDAwNlwiLCBcIlxcXFx1MDAwN1wiLCAnXFxcXGInLCAnJywgJycsIFwiXFxcXHUwMDBiXCIsICdcXFxcZicsICcnLCBcIlxcXFx1MDAwZVwiLCBcIlxcXFx1MDAwZlwiLCBcIlxcXFx1MDAxMFwiLCBcIlxcXFx1MDAxMVwiLCBcIlxcXFx1MDAxMlwiLCBcIlxcXFx1MDAxM1wiLCBcIlxcXFx1MDAxNFwiLCBcIlxcXFx1MDAxNVwiLCBcIlxcXFx1MDAxNlwiLCBcIlxcXFx1MDAxN1wiLCBcIlxcXFx1MDAxOFwiLCBcIlxcXFx1MDAxOVwiLCBcIlxcXFx1MDAxYVwiLCBcIlxcXFx1MDAxYlwiLCBcIlxcXFx1MDAxY1wiLCBcIlxcXFx1MDAxZFwiLCBcIlxcXFx1MDAxZVwiLCBcIlxcXFx1MDAxZlwiXTtcblxudmFyIGVzY2FwZUZuID0gZnVuY3Rpb24gZXNjYXBlRm4oc3RyKSB7XG4gIHJldHVybiBtZXRhW3N0ci5jaGFyQ29kZUF0KDApXTtcbn07XG5cbnZhciB3YXJuZWQgPSBmYWxzZTsgLy8gVGhlIGFzc2VydCBtb2R1bGUgcHJvdmlkZXMgZnVuY3Rpb25zIHRoYXQgdGhyb3dcbi8vIEFzc2VydGlvbkVycm9yJ3Mgd2hlbiBwYXJ0aWN1bGFyIGNvbmRpdGlvbnMgYXJlIG5vdCBtZXQuIFRoZVxuLy8gYXNzZXJ0IG1vZHVsZSBtdXN0IGNvbmZvcm0gdG8gdGhlIGZvbGxvd2luZyBpbnRlcmZhY2UuXG5cbnZhciBhc3NlcnQgPSBtb2R1bGUuZXhwb3J0cyA9IG9rO1xudmFyIE5PX0VYQ0VQVElPTl9TRU5USU5FTCA9IHt9OyAvLyBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiBBbGwgYXNzZXJ0aW9uIG1ldGhvZHMgcHJvdmlkZVxuLy8gYm90aCB0aGUgYWN0dWFsIGFuZCBleHBlY3RlZCB2YWx1ZXMgdG8gdGhlIGFzc2VydGlvbiBlcnJvciBmb3Jcbi8vIGRpc3BsYXkgcHVycG9zZXMuXG5cbmZ1bmN0aW9uIGlubmVyRmFpbChvYmopIHtcbiAgaWYgKG9iai5tZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHRocm93IG9iai5tZXNzYWdlO1xuICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3Iob2JqKTtcbn1cblxuZnVuY3Rpb24gZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvciwgc3RhY2tTdGFydEZuKSB7XG4gIHZhciBhcmdzTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGludGVybmFsTWVzc2FnZTtcblxuICBpZiAoYXJnc0xlbiA9PT0gMCkge1xuICAgIGludGVybmFsTWVzc2FnZSA9ICdGYWlsZWQnO1xuICB9IGVsc2UgaWYgKGFyZ3NMZW4gPT09IDEpIHtcbiAgICBtZXNzYWdlID0gYWN0dWFsO1xuICAgIGFjdHVhbCA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIHtcbiAgICBpZiAod2FybmVkID09PSBmYWxzZSkge1xuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICAgIHZhciB3YXJuID0gcHJvY2Vzcy5lbWl0V2FybmluZyA/IHByb2Nlc3MuZW1pdFdhcm5pbmcgOiBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcbiAgICAgIHdhcm4oJ2Fzc2VydC5mYWlsKCkgd2l0aCBtb3JlIHRoYW4gb25lIGFyZ3VtZW50IGlzIGRlcHJlY2F0ZWQuICcgKyAnUGxlYXNlIHVzZSBhc3NlcnQuc3RyaWN0RXF1YWwoKSBpbnN0ZWFkIG9yIG9ubHkgcGFzcyBhIG1lc3NhZ2UuJywgJ0RlcHJlY2F0aW9uV2FybmluZycsICdERVAwMDk0Jyk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3NMZW4gPT09IDIpIG9wZXJhdG9yID0gJyE9JztcbiAgfVxuXG4gIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHRocm93IG1lc3NhZ2U7XG4gIHZhciBlcnJBcmdzID0ge1xuICAgIGFjdHVhbDogYWN0dWFsLFxuICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICBvcGVyYXRvcjogb3BlcmF0b3IgPT09IHVuZGVmaW5lZCA/ICdmYWlsJyA6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGbjogc3RhY2tTdGFydEZuIHx8IGZhaWxcbiAgfTtcblxuICBpZiAobWVzc2FnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZXJyQXJncy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgfVxuXG4gIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyQXJncyk7XG5cbiAgaWYgKGludGVybmFsTWVzc2FnZSkge1xuICAgIGVyci5tZXNzYWdlID0gaW50ZXJuYWxNZXNzYWdlO1xuICAgIGVyci5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgfVxuXG4gIHRocm93IGVycjtcbn1cblxuYXNzZXJ0LmZhaWwgPSBmYWlsOyAvLyBUaGUgQXNzZXJ0aW9uRXJyb3IgaXMgZGVmaW5lZCBpbiBpbnRlcm5hbC9lcnJvci5cblxuYXNzZXJ0LkFzc2VydGlvbkVycm9yID0gQXNzZXJ0aW9uRXJyb3I7XG5cbmZ1bmN0aW9uIGlubmVyT2soZm4sIGFyZ0xlbiwgdmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHZhciBnZW5lcmF0ZWRNZXNzYWdlID0gZmFsc2U7XG5cbiAgICBpZiAoYXJnTGVuID09PSAwKSB7XG4gICAgICBnZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2UgPSAnTm8gdmFsdWUgYXJndW1lbnQgcGFzc2VkIHRvIGBhc3NlcnQub2soKWAnO1xuICAgIH0gZWxzZSBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB0aHJvdyBtZXNzYWdlO1xuICAgIH1cblxuICAgIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgYWN0dWFsOiB2YWx1ZSxcbiAgICAgIGV4cGVjdGVkOiB0cnVlLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnPT0nLFxuICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgIH0pO1xuICAgIGVyci5nZW5lcmF0ZWRNZXNzYWdlID0gZ2VuZXJhdGVkTWVzc2FnZTtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn0gLy8gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISF2YWx1ZS5cblxuXG5mdW5jdGlvbiBvaygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlubmVyT2suYXBwbHkodm9pZCAwLCBbb2ssIGFyZ3MubGVuZ3RoXS5jb25jYXQoYXJncykpO1xufVxuXG5hc3NlcnQub2sgPSBvazsgLy8gVGhlIGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzaGFsbG93LCBjb2VyY2l2ZSBlcXVhbGl0eSB3aXRoID09LlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXMgKi9cblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXG5cbiAgaWYgKGFjdHVhbCAhPSBleHBlY3RlZCkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJz09JyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZXF1YWxcbiAgICB9KTtcbiAgfVxufTsgLy8gVGhlIG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHdoZXRoZXIgdHdvIG9iamVjdHMgYXJlIG5vdFxuLy8gZXF1YWwgd2l0aCAhPS5cblxuXG5hc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiBub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cblxuICBpZiAoYWN0dWFsID09IGV4cGVjdGVkKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnIT0nLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3RFcXVhbFxuICAgIH0pO1xuICB9XG59OyAvLyBUaGUgZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGEgZGVlcCBlcXVhbGl0eSByZWxhdGlvbi5cblxuXG5hc3NlcnQuZGVlcEVxdWFsID0gZnVuY3Rpb24gZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuXG4gIGlmICghaXNEZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdkZWVwRXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBkZWVwRXF1YWxcbiAgICB9KTtcbiAgfVxufTsgLy8gVGhlIG5vbi1lcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgZm9yIGFueSBkZWVwIGluZXF1YWxpdHkuXG5cblxuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uIG5vdERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcblxuICBpZiAoaXNEZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdub3REZWVwRXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3REZWVwRXF1YWxcbiAgICB9KTtcbiAgfVxufTtcbi8qIGVzbGludC1lbmFibGUgKi9cblxuXG5hc3NlcnQuZGVlcFN0cmljdEVxdWFsID0gZnVuY3Rpb24gZGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuXG4gIGlmICghaXNEZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdkZWVwU3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBkZWVwU3RyaWN0RXF1YWxcbiAgICB9KTtcbiAgfVxufTtcblxuYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbCA9IG5vdERlZXBTdHJpY3RFcXVhbDtcblxuZnVuY3Rpb24gbm90RGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuXG4gIGlmIChpc0RlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ25vdERlZXBTdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdERlZXBTdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59XG5cbmFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIHN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKCFvYmplY3RJcyhhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ3N0cmljdEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogc3RyaWN0RXF1YWxcbiAgICB9KTtcbiAgfVxufTtcblxuYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gbm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cblxuICBpZiAob2JqZWN0SXMoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdub3RTdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdFN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbnZhciBDb21wYXJpc29uID0gZnVuY3Rpb24gQ29tcGFyaXNvbihvYmosIGtleXMsIGFjdHVhbCkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb21wYXJpc29uKTtcblxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoYWN0dWFsICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGFjdHVhbFtrZXldID09PSAnc3RyaW5nJyAmJiBpc1JlZ0V4cChvYmpba2V5XSkgJiYgb2JqW2tleV0udGVzdChhY3R1YWxba2V5XSkpIHtcbiAgICAgICAgX3RoaXNba2V5XSA9IGFjdHVhbFtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXNba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBjb21wYXJlRXhjZXB0aW9uS2V5KGFjdHVhbCwgZXhwZWN0ZWQsIGtleSwgbWVzc2FnZSwga2V5cywgZm4pIHtcbiAgaWYgKCEoa2V5IGluIGFjdHVhbCkgfHwgIWlzRGVlcFN0cmljdEVxdWFsKGFjdHVhbFtrZXldLCBleHBlY3RlZFtrZXldKSkge1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgLy8gQ3JlYXRlIHBsYWNlaG9sZGVyIG9iamVjdHMgdG8gY3JlYXRlIGEgbmljZSBvdXRwdXQuXG4gICAgICB2YXIgYSA9IG5ldyBDb21wYXJpc29uKGFjdHVhbCwga2V5cyk7XG4gICAgICB2YXIgYiA9IG5ldyBDb21wYXJpc29uKGV4cGVjdGVkLCBrZXlzLCBhY3R1YWwpO1xuICAgICAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICAgIGFjdHVhbDogYSxcbiAgICAgICAgZXhwZWN0ZWQ6IGIsXG4gICAgICAgIG9wZXJhdG9yOiAnZGVlcFN0cmljdEVxdWFsJyxcbiAgICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgICAgfSk7XG4gICAgICBlcnIuYWN0dWFsID0gYWN0dWFsO1xuICAgICAgZXJyLmV4cGVjdGVkID0gZXhwZWN0ZWQ7XG4gICAgICBlcnIub3BlcmF0b3IgPSBmbi5uYW1lO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogZm4ubmFtZSxcbiAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkLCBtc2csIGZuKSB7XG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoaXNSZWdFeHAoZXhwZWN0ZWQpKSByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpOyAvLyBhc3NlcnQuZG9lc05vdFRocm93IGRvZXMgbm90IGFjY2VwdCBvYmplY3RzLlxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnZXhwZWN0ZWQnLCBbJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBleHBlY3RlZCk7XG4gICAgfSAvLyBIYW5kbGUgcHJpbWl0aXZlcyBwcm9wZXJseS5cblxuXG4gICAgaWYgKF90eXBlb2YoYWN0dWFsKSAhPT0gJ29iamVjdCcgfHwgYWN0dWFsID09PSBudWxsKSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKHtcbiAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgICAgbWVzc2FnZTogbXNnLFxuICAgICAgICBvcGVyYXRvcjogJ2RlZXBTdHJpY3RFcXVhbCcsXG4gICAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICAgIH0pO1xuICAgICAgZXJyLm9wZXJhdG9yID0gZm4ubmFtZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV4cGVjdGVkKTsgLy8gU3BlY2lhbCBoYW5kbGUgZXJyb3JzIHRvIG1ha2Ugc3VyZSB0aGUgbmFtZSBhbmQgdGhlIG1lc3NhZ2UgYXJlIGNvbXBhcmVkXG4gICAgLy8gYXMgd2VsbC5cblxuICAgIGlmIChleHBlY3RlZCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBrZXlzLnB1c2goJ25hbWUnLCAnbWVzc2FnZScpO1xuICAgIH0gZWxzZSBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVkFMVUUoJ2Vycm9yJywgZXhwZWN0ZWQsICdtYXkgbm90IGJlIGFuIGVtcHR5IG9iamVjdCcpO1xuICAgIH1cblxuICAgIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKHR5cGVvZiBhY3R1YWxba2V5XSA9PT0gJ3N0cmluZycgJiYgaXNSZWdFeHAoZXhwZWN0ZWRba2V5XSkgJiYgZXhwZWN0ZWRba2V5XS50ZXN0KGFjdHVhbFtrZXldKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbXBhcmVFeGNlcHRpb25LZXkoYWN0dWFsLCBleHBlY3RlZCwga2V5LCBtc2csIGtleXMsIGZuKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBHdWFyZCBpbnN0YW5jZW9mIGFnYWluc3QgYXJyb3cgZnVuY3Rpb25zIGFzIHRoZXkgZG9uJ3QgaGF2ZSBhIHByb3RvdHlwZS5cblxuXG4gIGlmIChleHBlY3RlZC5wcm90b3R5cGUgIT09IHVuZGVmaW5lZCAmJiBhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKEVycm9yLmlzUHJvdG90eXBlT2YoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGV4cGVjdGVkLmNhbGwoe30sIGFjdHVhbCkgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldEFjdHVhbChmbikge1xuICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdmbicsICdGdW5jdGlvbicsIGZuKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgZm4oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBlO1xuICB9XG5cbiAgcmV0dXJuIE5PX0VYQ0VQVElPTl9TRU5USU5FTDtcbn1cblxuZnVuY3Rpb24gY2hlY2tJc1Byb21pc2Uob2JqKSB7XG4gIC8vIEFjY2VwdCBuYXRpdmUgRVM2IHByb21pc2VzIGFuZCBwcm9taXNlcyB0aGF0IGFyZSBpbXBsZW1lbnRlZCBpbiBhIHNpbWlsYXJcbiAgLy8gd2F5LiBEbyBub3QgYWNjZXB0IHRoZW5hYmxlcyB0aGF0IHVzZSBhIGZ1bmN0aW9uIGFzIGBvYmpgIGFuZCB0aGF0IGhhdmUgbm9cbiAgLy8gYGNhdGNoYCBoYW5kbGVyLlxuICAvLyBUT0RPOiB0aGVuYWJsZXMgYXJlIGNoZWNrZWQgdXAgdW50aWwgdGhleSBoYXZlIHRoZSBjb3JyZWN0IG1ldGhvZHMsXG4gIC8vIGJ1dCBhY2NvcmRpbmcgdG8gZG9jdW1lbnRhdGlvbiwgdGhlIGB0aGVuYCBtZXRob2Qgc2hvdWxkIHJlY2VpdmVcbiAgLy8gdGhlIGBmdWxmaWxsYCBhbmQgYHJlamVjdGAgYXJndW1lbnRzIGFzIHdlbGwgb3IgaXQgbWF5IGJlIG5ldmVyIHJlc29sdmVkLlxuICByZXR1cm4gaXNQcm9taXNlKG9iaikgfHwgb2JqICE9PSBudWxsICYmIF90eXBlb2Yob2JqKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouY2F0Y2ggPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIHdhaXRGb3JBY3R1YWwocHJvbWlzZUZuKSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0UHJvbWlzZTtcblxuICAgIGlmICh0eXBlb2YgcHJvbWlzZUZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBSZXR1cm4gYSByZWplY3RlZCBwcm9taXNlIGlmIGBwcm9taXNlRm5gIHRocm93cyBzeW5jaHJvbm91c2x5LlxuICAgICAgcmVzdWx0UHJvbWlzZSA9IHByb21pc2VGbigpOyAvLyBGYWlsIGluIGNhc2Ugbm8gcHJvbWlzZSBpcyByZXR1cm5lZC5cblxuICAgICAgaWYgKCFjaGVja0lzUHJvbWlzZShyZXN1bHRQcm9taXNlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFKCdpbnN0YW5jZSBvZiBQcm9taXNlJywgJ3Byb21pc2VGbicsIHJlc3VsdFByb21pc2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hlY2tJc1Byb21pc2UocHJvbWlzZUZuKSkge1xuICAgICAgcmVzdWx0UHJvbWlzZSA9IHByb21pc2VGbjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdwcm9taXNlRm4nLCBbJ0Z1bmN0aW9uJywgJ1Byb21pc2UnXSwgcHJvbWlzZUZuKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBOT19FWENFUFRJT05fU0VOVElORUw7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXhwZWN0c0Vycm9yKHN0YWNrU3RhcnRGbiwgYWN0dWFsLCBlcnJvciwgbWVzc2FnZSkge1xuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2Vycm9yJywgWydPYmplY3QnLCAnRXJyb3InLCAnRnVuY3Rpb24nLCAnUmVnRXhwJ10sIGVycm9yKTtcbiAgICB9XG5cbiAgICBpZiAoX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwpIHtcbiAgICAgIGlmIChhY3R1YWwubWVzc2FnZSA9PT0gZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVSUl9BTUJJR1VPVVNfQVJHVU1FTlQoJ2Vycm9yL21lc3NhZ2UnLCBcIlRoZSBlcnJvciBtZXNzYWdlIFxcXCJcIi5jb25jYXQoYWN0dWFsLm1lc3NhZ2UsIFwiXFxcIiBpcyBpZGVudGljYWwgdG8gdGhlIG1lc3NhZ2UuXCIpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFjdHVhbCA9PT0gZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfQU1CSUdVT1VTX0FSR1VNRU5UKCdlcnJvci9tZXNzYWdlJywgXCJUaGUgZXJyb3IgXFxcIlwiLmNvbmNhdChhY3R1YWwsIFwiXFxcIiBpcyBpZGVudGljYWwgdG8gdGhlIG1lc3NhZ2UuXCIpKTtcbiAgICB9XG5cbiAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgZXJyb3IgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoZXJyb3IgIT0gbnVsbCAmJiBfdHlwZW9mKGVycm9yKSAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdlcnJvcicsIFsnT2JqZWN0JywgJ0Vycm9yJywgJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBlcnJvcik7XG4gIH1cblxuICBpZiAoYWN0dWFsID09PSBOT19FWENFUFRJT05fU0VOVElORUwpIHtcbiAgICB2YXIgZGV0YWlscyA9ICcnO1xuXG4gICAgaWYgKGVycm9yICYmIGVycm9yLm5hbWUpIHtcbiAgICAgIGRldGFpbHMgKz0gXCIgKFwiLmNvbmNhdChlcnJvci5uYW1lLCBcIilcIik7XG4gICAgfVxuXG4gICAgZGV0YWlscyArPSBtZXNzYWdlID8gXCI6IFwiLmNvbmNhdChtZXNzYWdlKSA6ICcuJztcbiAgICB2YXIgZm5UeXBlID0gc3RhY2tTdGFydEZuLm5hbWUgPT09ICdyZWplY3RzJyA/ICdyZWplY3Rpb24nIDogJ2V4Y2VwdGlvbic7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogdW5kZWZpbmVkLFxuICAgICAgZXhwZWN0ZWQ6IGVycm9yLFxuICAgICAgb3BlcmF0b3I6IHN0YWNrU3RhcnRGbi5uYW1lLFxuICAgICAgbWVzc2FnZTogXCJNaXNzaW5nIGV4cGVjdGVkIFwiLmNvbmNhdChmblR5cGUpLmNvbmNhdChkZXRhaWxzKSxcbiAgICAgIHN0YWNrU3RhcnRGbjogc3RhY2tTdGFydEZuXG4gICAgfSk7XG4gIH1cblxuICBpZiAoZXJyb3IgJiYgIWV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXJyb3IsIG1lc3NhZ2UsIHN0YWNrU3RhcnRGbikpIHtcbiAgICB0aHJvdyBhY3R1YWw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwZWN0c05vRXJyb3Ioc3RhY2tTdGFydEZuLCBhY3R1YWwsIGVycm9yLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT09IE5PX0VYQ0VQVElPTl9TRU5USU5FTCkgcmV0dXJuO1xuXG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgbWVzc2FnZSA9IGVycm9yO1xuICAgIGVycm9yID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFlcnJvciB8fCBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGVycm9yKSkge1xuICAgIHZhciBkZXRhaWxzID0gbWVzc2FnZSA/IFwiOiBcIi5jb25jYXQobWVzc2FnZSkgOiAnLic7XG4gICAgdmFyIGZuVHlwZSA9IHN0YWNrU3RhcnRGbi5uYW1lID09PSAnZG9lc05vdFJlamVjdCcgPyAncmVqZWN0aW9uJyA6ICdleGNlcHRpb24nO1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBlcnJvcixcbiAgICAgIG9wZXJhdG9yOiBzdGFja1N0YXJ0Rm4ubmFtZSxcbiAgICAgIG1lc3NhZ2U6IFwiR290IHVud2FudGVkIFwiLmNvbmNhdChmblR5cGUpLmNvbmNhdChkZXRhaWxzLCBcIlxcblwiKSArIFwiQWN0dWFsIG1lc3NhZ2U6IFxcXCJcIi5jb25jYXQoYWN0dWFsICYmIGFjdHVhbC5tZXNzYWdlLCBcIlxcXCJcIiksXG4gICAgICBzdGFja1N0YXJ0Rm46IHN0YWNrU3RhcnRGblxuICAgIH0pO1xuICB9XG5cbiAgdGhyb3cgYWN0dWFsO1xufVxuXG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24gdGhyb3dzKHByb21pc2VGbikge1xuICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gIH1cblxuICBleHBlY3RzRXJyb3IuYXBwbHkodm9pZCAwLCBbdGhyb3dzLCBnZXRBY3R1YWwocHJvbWlzZUZuKV0uY29uY2F0KGFyZ3MpKTtcbn07XG5cbmFzc2VydC5yZWplY3RzID0gZnVuY3Rpb24gcmVqZWN0cyhwcm9taXNlRm4pIHtcbiAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICBhcmdzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xuICB9XG5cbiAgcmV0dXJuIHdhaXRGb3JBY3R1YWwocHJvbWlzZUZuKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gZXhwZWN0c0Vycm9yLmFwcGx5KHZvaWQgMCwgW3JlamVjdHMsIHJlc3VsdF0uY29uY2F0KGFyZ3MpKTtcbiAgfSk7XG59O1xuXG5hc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24gZG9lc05vdFRocm93KGZuKSB7XG4gIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNCA+IDEgPyBfbGVuNCAtIDEgOiAwKSwgX2tleTQgPSAxOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgYXJnc1tfa2V5NCAtIDFdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgfVxuXG4gIGV4cGVjdHNOb0Vycm9yLmFwcGx5KHZvaWQgMCwgW2RvZXNOb3RUaHJvdywgZ2V0QWN0dWFsKGZuKV0uY29uY2F0KGFyZ3MpKTtcbn07XG5cbmFzc2VydC5kb2VzTm90UmVqZWN0ID0gZnVuY3Rpb24gZG9lc05vdFJlamVjdChmbikge1xuICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjUgPiAxID8gX2xlbjUgLSAxIDogMCksIF9rZXk1ID0gMTsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgIGFyZ3NbX2tleTUgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gIH1cblxuICByZXR1cm4gd2FpdEZvckFjdHVhbChmbikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIGV4cGVjdHNOb0Vycm9yLmFwcGx5KHZvaWQgMCwgW2RvZXNOb3RSZWplY3QsIHJlc3VsdF0uY29uY2F0KGFyZ3MpKTtcbiAgfSk7XG59O1xuXG5hc3NlcnQuaWZFcnJvciA9IGZ1bmN0aW9uIGlmRXJyb3IoZXJyKSB7XG4gIGlmIChlcnIgIT09IG51bGwgJiYgZXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdpZkVycm9yIGdvdCB1bndhbnRlZCBleGNlcHRpb246ICc7XG5cbiAgICBpZiAoX3R5cGVvZihlcnIpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXJyLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoZXJyLm1lc3NhZ2UubGVuZ3RoID09PSAwICYmIGVyci5jb25zdHJ1Y3Rvcikge1xuICAgICAgICBtZXNzYWdlICs9IGVyci5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSArPSBlcnIubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSArPSBpbnNwZWN0KGVycik7XG4gICAgfVxuXG4gICAgdmFyIG5ld0VyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICBhY3R1YWw6IGVycixcbiAgICAgIGV4cGVjdGVkOiBudWxsLFxuICAgICAgb3BlcmF0b3I6ICdpZkVycm9yJyxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBzdGFja1N0YXJ0Rm46IGlmRXJyb3JcbiAgICB9KTsgLy8gTWFrZSBzdXJlIHdlIGFjdHVhbGx5IGhhdmUgYSBzdGFjayB0cmFjZSFcblxuICAgIHZhciBvcmlnU3RhY2sgPSBlcnIuc3RhY2s7XG5cbiAgICBpZiAodHlwZW9mIG9yaWdTdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoaXMgd2lsbCByZW1vdmUgYW55IGR1cGxpY2F0ZWQgZnJhbWVzIGZyb20gdGhlIGVycm9yIGZyYW1lcyB0YWtlblxuICAgICAgLy8gZnJvbSB3aXRoaW4gYGlmRXJyb3JgIGFuZCBhZGQgdGhlIG9yaWdpbmFsIGVycm9yIGZyYW1lcyB0byB0aGUgbmV3bHlcbiAgICAgIC8vIGNyZWF0ZWQgb25lcy5cbiAgICAgIHZhciB0bXAyID0gb3JpZ1N0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAgIHRtcDIuc2hpZnQoKTsgLy8gRmlsdGVyIGFsbCBmcmFtZXMgZXhpc3RpbmcgaW4gZXJyLnN0YWNrLlxuXG4gICAgICB2YXIgdG1wMSA9IG5ld0Vyci5zdGFjay5zcGxpdCgnXFxuJyk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG1wMi5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBGaW5kIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBmcmFtZS5cbiAgICAgICAgdmFyIHBvcyA9IHRtcDEuaW5kZXhPZih0bXAyW2ldKTtcblxuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xuICAgICAgICAgIC8vIE9ubHkga2VlcCBuZXcgZnJhbWVzLlxuICAgICAgICAgIHRtcDEgPSB0bXAxLnNsaWNlKDAsIHBvcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmV3RXJyLnN0YWNrID0gXCJcIi5jb25jYXQodG1wMS5qb2luKCdcXG4nKSwgXCJcXG5cIikuY29uY2F0KHRtcDIuam9pbignXFxuJykpO1xuICAgIH1cblxuICAgIHRocm93IG5ld0VycjtcbiAgfVxufTsgLy8gRXhwb3NlIGEgc3RyaWN0IG9ubHkgdmFyaWFudCBvZiBhc3NlcnRcblxuXG5mdW5jdGlvbiBzdHJpY3QoKSB7XG4gIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiksIF9rZXk2ID0gMDsgX2tleTYgPCBfbGVuNjsgX2tleTYrKykge1xuICAgIGFyZ3NbX2tleTZdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgfVxuXG4gIGlubmVyT2suYXBwbHkodm9pZCAwLCBbc3RyaWN0LCBhcmdzLmxlbmd0aF0uY29uY2F0KGFyZ3MpKTtcbn1cblxuYXNzZXJ0LnN0cmljdCA9IG9iamVjdEFzc2lnbihzdHJpY3QsIGFzc2VydCwge1xuICBlcXVhbDogYXNzZXJ0LnN0cmljdEVxdWFsLFxuICBkZWVwRXF1YWw6IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwsXG4gIG5vdEVxdWFsOiBhc3NlcnQubm90U3RyaWN0RXF1YWwsXG4gIG5vdERlZXBFcXVhbDogYXNzZXJ0Lm5vdERlZXBTdHJpY3RFcXVhbFxufSk7XG5hc3NlcnQuc3RyaWN0LnN0cmljdCA9IGFzc2VydC5zdHJpY3Q7IiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzA4MTc4NDBmNzc1MDMyMTY5ZGRkNzBjODVhYzA1OWYxOGZmY2M4MWNcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307IHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTsgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7IG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7IH0pKTsgfSBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTsgfSk7IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHsgdmFyIF9jYWNoZSA9IHR5cGVvZiBNYXAgPT09IFwiZnVuY3Rpb25cIiA/IG5ldyBNYXAoKSA6IHVuZGVmaW5lZDsgX3dyYXBOYXRpdmVTdXBlciA9IGZ1bmN0aW9uIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpIHsgaWYgKENsYXNzID09PSBudWxsIHx8ICFfaXNOYXRpdmVGdW5jdGlvbihDbGFzcykpIHJldHVybiBDbGFzczsgaWYgKHR5cGVvZiBDbGFzcyAhPT0gXCJmdW5jdGlvblwiKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBpZiAodHlwZW9mIF9jYWNoZSAhPT0gXCJ1bmRlZmluZWRcIikgeyBpZiAoX2NhY2hlLmhhcyhDbGFzcykpIHJldHVybiBfY2FjaGUuZ2V0KENsYXNzKTsgX2NhY2hlLnNldChDbGFzcywgV3JhcHBlcik7IH0gZnVuY3Rpb24gV3JhcHBlcigpIHsgcmV0dXJuIF9jb25zdHJ1Y3QoQ2xhc3MsIGFyZ3VtZW50cywgX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yKTsgfSBXcmFwcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBXcmFwcGVyLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyByZXR1cm4gX3NldFByb3RvdHlwZU9mKFdyYXBwZXIsIENsYXNzKTsgfTsgcmV0dXJuIF93cmFwTmF0aXZlU3VwZXIoQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKFJlZmxlY3QuY29uc3RydWN0KERhdGUsIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXG5mdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHsgaWYgKGlzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpKSB7IF9jb25zdHJ1Y3QgPSBSZWZsZWN0LmNvbnN0cnVjdDsgfSBlbHNlIHsgX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykgeyB2YXIgYSA9IFtudWxsXTsgYS5wdXNoLmFwcGx5KGEsIGFyZ3MpOyB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7IHZhciBpbnN0YW5jZSA9IG5ldyBDb25zdHJ1Y3RvcigpOyBpZiAoQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgQ2xhc3MucHJvdG90eXBlKTsgcmV0dXJuIGluc3RhbmNlOyB9OyB9IHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7IH1cblxuZnVuY3Rpb24gX2lzTmF0aXZlRnVuY3Rpb24oZm4pIHsgcmV0dXJuIEZ1bmN0aW9uLnRvU3RyaW5nLmNhbGwoZm4pLmluZGV4T2YoXCJbbmF0aXZlIGNvZGVdXCIpICE9PSAtMTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbnZhciBfcmVxdWlyZSA9IHJlcXVpcmUoJ3V0aWwvJyksXG4gICAgaW5zcGVjdCA9IF9yZXF1aXJlLmluc3BlY3Q7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCcuLi9lcnJvcnMnKSxcbiAgICBFUlJfSU5WQUxJRF9BUkdfVFlQRSA9IF9yZXF1aXJlMi5jb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVFlQRTsgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2VuZHNXaXRoXG5cblxuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzZWFyY2gsIHRoaXNfbGVuKSB7XG4gIGlmICh0aGlzX2xlbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXNfbGVuID4gc3RyLmxlbmd0aCkge1xuICAgIHRoaXNfbGVuID0gc3RyLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKHRoaXNfbGVuIC0gc2VhcmNoLmxlbmd0aCwgdGhpc19sZW4pID09PSBzZWFyY2g7XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9yZXBlYXRcblxuXG5mdW5jdGlvbiByZXBlYXQoc3RyLCBjb3VudCkge1xuICBjb3VudCA9IE1hdGguZmxvb3IoY291bnQpO1xuICBpZiAoc3RyLmxlbmd0aCA9PSAwIHx8IGNvdW50ID09IDApIHJldHVybiAnJztcbiAgdmFyIG1heENvdW50ID0gc3RyLmxlbmd0aCAqIGNvdW50O1xuICBjb3VudCA9IE1hdGguZmxvb3IoTWF0aC5sb2coY291bnQpIC8gTWF0aC5sb2coMikpO1xuXG4gIHdoaWxlIChjb3VudCkge1xuICAgIHN0ciArPSBzdHI7XG4gICAgY291bnQtLTtcbiAgfVxuXG4gIHN0ciArPSBzdHIuc3Vic3RyaW5nKDAsIG1heENvdW50IC0gc3RyLmxlbmd0aCk7XG4gIHJldHVybiBzdHI7XG59XG5cbnZhciBibHVlID0gJyc7XG52YXIgZ3JlZW4gPSAnJztcbnZhciByZWQgPSAnJztcbnZhciB3aGl0ZSA9ICcnO1xudmFyIGtSZWFkYWJsZU9wZXJhdG9yID0ge1xuICBkZWVwU3RyaWN0RXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgc3RyaWN0bHkgZGVlcC1lcXVhbDonLFxuICBzdHJpY3RFcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBzdHJpY3RseSBlcXVhbDonLFxuICBzdHJpY3RFcXVhbE9iamVjdDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgdG8gYmUgcmVmZXJlbmNlLWVxdWFsIHRvIFwiZXhwZWN0ZWRcIjonLFxuICBkZWVwRXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgbG9vc2VseSBkZWVwLWVxdWFsOicsXG4gIGVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIGxvb3NlbHkgZXF1YWw6JyxcbiAgbm90RGVlcFN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiBub3QgdG8gYmUgc3RyaWN0bHkgZGVlcC1lcXVhbCB0bzonLFxuICBub3RTdHJpY3RFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgdG8gYmUgc3RyaWN0bHkgdW5lcXVhbCB0bzonLFxuICBub3RTdHJpY3RFcXVhbE9iamVjdDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgbm90IHRvIGJlIHJlZmVyZW5jZS1lcXVhbCB0byBcImV4cGVjdGVkXCI6JyxcbiAgbm90RGVlcEVxdWFsOiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiBub3QgdG8gYmUgbG9vc2VseSBkZWVwLWVxdWFsIHRvOicsXG4gIG5vdEVxdWFsOiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiB0byBiZSBsb29zZWx5IHVuZXF1YWwgdG86JyxcbiAgbm90SWRlbnRpY2FsOiAnVmFsdWVzIGlkZW50aWNhbCBidXQgbm90IHJlZmVyZW5jZS1lcXVhbDonXG59OyAvLyBDb21wYXJpbmcgc2hvcnQgcHJpbWl0aXZlcyBzaG91bGQganVzdCBzaG93ID09PSAvICE9PSBpbnN0ZWFkIG9mIHVzaW5nIHRoZVxuLy8gZGlmZi5cblxudmFyIGtNYXhTaG9ydExlbmd0aCA9IDEwO1xuXG5mdW5jdGlvbiBjb3B5RXJyb3Ioc291cmNlKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIHRhcmdldCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSkpO1xuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCAnbWVzc2FnZScsIHtcbiAgICB2YWx1ZTogc291cmNlLm1lc3NhZ2VcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGluc3BlY3RWYWx1ZSh2YWwpIHtcbiAgLy8gVGhlIHV0aWwuaW5zcGVjdCBkZWZhdWx0IHZhbHVlcyBjb3VsZCBiZSBjaGFuZ2VkLiBUaGlzIG1ha2VzIHN1cmUgdGhlXG4gIC8vIGVycm9yIG1lc3NhZ2VzIGNvbnRhaW4gdGhlIG5lY2Vzc2FyeSBpbmZvcm1hdGlvbiBuZXZlcnRoZWxlc3MuXG4gIHJldHVybiBpbnNwZWN0KHZhbCwge1xuICAgIGNvbXBhY3Q6IGZhbHNlLFxuICAgIGN1c3RvbUluc3BlY3Q6IGZhbHNlLFxuICAgIGRlcHRoOiAxMDAwLFxuICAgIG1heEFycmF5TGVuZ3RoOiBJbmZpbml0eSxcbiAgICAvLyBBc3NlcnQgY29tcGFyZXMgb25seSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgKHdpdGggYSBmZXcgZXhjZXB0aW9ucykuXG4gICAgc2hvd0hpZGRlbjogZmFsc2UsXG4gICAgLy8gSGF2aW5nIGEgbG9uZyBsaW5lIGFzIGVycm9yIGlzIGJldHRlciB0aGFuIHdyYXBwaW5nIHRoZSBsaW5lIGZvclxuICAgIC8vIGNvbXBhcmlzb24gZm9yIG5vdy5cbiAgICAvLyBUT0RPKEJyaWRnZUFSKTogYGJyZWFrTGVuZ3RoYCBzaG91bGQgYmUgbGltaXRlZCBhcyBzb29uIGFzIHNvb24gYXMgd2VcbiAgICAvLyBoYXZlIG1ldGEgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGluc3BlY3RlZCBwcm9wZXJ0aWVzIChpLmUuLCBrbm93IHdoZXJlXG4gICAgLy8gaW4gd2hhdCBsaW5lIHRoZSBwcm9wZXJ0eSBzdGFydHMgYW5kIGVuZHMpLlxuICAgIGJyZWFrTGVuZ3RoOiBJbmZpbml0eSxcbiAgICAvLyBBc3NlcnQgZG9lcyBub3QgZGV0ZWN0IHByb3hpZXMgY3VycmVudGx5LlxuICAgIHNob3dQcm94eTogZmFsc2UsXG4gICAgc29ydGVkOiB0cnVlLFxuICAgIC8vIEluc3BlY3QgZ2V0dGVycyBhcyB3ZSBhbHNvIGNoZWNrIHRoZW0gd2hlbiBjb21wYXJpbmcgZW50cmllcy5cbiAgICBnZXR0ZXJzOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFcnJEaWZmKGFjdHVhbCwgZXhwZWN0ZWQsIG9wZXJhdG9yKSB7XG4gIHZhciBvdGhlciA9ICcnO1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciBsYXN0UG9zID0gMDtcbiAgdmFyIGVuZCA9ICcnO1xuICB2YXIgc2tpcHBlZCA9IGZhbHNlO1xuICB2YXIgYWN0dWFsSW5zcGVjdGVkID0gaW5zcGVjdFZhbHVlKGFjdHVhbCk7XG4gIHZhciBhY3R1YWxMaW5lcyA9IGFjdHVhbEluc3BlY3RlZC5zcGxpdCgnXFxuJyk7XG4gIHZhciBleHBlY3RlZExpbmVzID0gaW5zcGVjdFZhbHVlKGV4cGVjdGVkKS5zcGxpdCgnXFxuJyk7XG4gIHZhciBpID0gMDtcbiAgdmFyIGluZGljYXRvciA9ICcnOyAvLyBJbiBjYXNlIGJvdGggdmFsdWVzIGFyZSBvYmplY3RzIGV4cGxpY2l0bHkgbWFyayB0aGVtIGFzIG5vdCByZWZlcmVuY2UgZXF1YWxcbiAgLy8gZm9yIHRoZSBgc3RyaWN0RXF1YWxgIG9wZXJhdG9yLlxuXG4gIGlmIChvcGVyYXRvciA9PT0gJ3N0cmljdEVxdWFsJyAmJiBfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIF90eXBlb2YoZXhwZWN0ZWQpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwgJiYgZXhwZWN0ZWQgIT09IG51bGwpIHtcbiAgICBvcGVyYXRvciA9ICdzdHJpY3RFcXVhbE9iamVjdCc7XG4gIH0gLy8gSWYgXCJhY3R1YWxcIiBhbmQgXCJleHBlY3RlZFwiIGZpdCBvbiBhIHNpbmdsZSBsaW5lIGFuZCB0aGV5IGFyZSBub3Qgc3RyaWN0bHlcbiAgLy8gZXF1YWwsIGNoZWNrIGZ1cnRoZXIgc3BlY2lhbCBoYW5kbGluZy5cblxuXG4gIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPT09IDEgJiYgZXhwZWN0ZWRMaW5lcy5sZW5ndGggPT09IDEgJiYgYWN0dWFsTGluZXNbMF0gIT09IGV4cGVjdGVkTGluZXNbMF0pIHtcbiAgICB2YXIgaW5wdXRMZW5ndGggPSBhY3R1YWxMaW5lc1swXS5sZW5ndGggKyBleHBlY3RlZExpbmVzWzBdLmxlbmd0aDsgLy8gSWYgdGhlIGNoYXJhY3RlciBsZW5ndGggb2YgXCJhY3R1YWxcIiBhbmQgXCJleHBlY3RlZFwiIHRvZ2V0aGVyIGlzIGxlc3MgdGhhblxuICAgIC8vIGtNYXhTaG9ydExlbmd0aCBhbmQgaWYgbmVpdGhlciBpcyBhbiBvYmplY3QgYW5kIGF0IGxlYXN0IG9uZSBvZiB0aGVtIGlzXG4gICAgLy8gbm90IGB6ZXJvYCwgdXNlIHRoZSBzdHJpY3QgZXF1YWwgY29tcGFyaXNvbiB0byB2aXN1YWxpemUgdGhlIG91dHB1dC5cblxuICAgIGlmIChpbnB1dExlbmd0aCA8PSBrTWF4U2hvcnRMZW5ndGgpIHtcbiAgICAgIGlmICgoX3R5cGVvZihhY3R1YWwpICE9PSAnb2JqZWN0JyB8fCBhY3R1YWwgPT09IG51bGwpICYmIChfdHlwZW9mKGV4cGVjdGVkKSAhPT0gJ29iamVjdCcgfHwgZXhwZWN0ZWQgPT09IG51bGwpICYmIChhY3R1YWwgIT09IDAgfHwgZXhwZWN0ZWQgIT09IDApKSB7XG4gICAgICAgIC8vIC0wID09PSArMFxuICAgICAgICByZXR1cm4gXCJcIi5jb25jYXQoa1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdLCBcIlxcblxcblwiKSArIFwiXCIuY29uY2F0KGFjdHVhbExpbmVzWzBdLCBcIiAhPT0gXCIpLmNvbmNhdChleHBlY3RlZExpbmVzWzBdLCBcIlxcblwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wZXJhdG9yICE9PSAnc3RyaWN0RXF1YWxPYmplY3QnKSB7XG4gICAgICAvLyBJZiB0aGUgc3RkZXJyIGlzIGEgdHR5IGFuZCB0aGUgaW5wdXQgbGVuZ3RoIGlzIGxvd2VyIHRoYW4gdGhlIGN1cnJlbnRcbiAgICAgIC8vIGNvbHVtbnMgcGVyIGxpbmUsIGFkZCBhIG1pc21hdGNoIGluZGljYXRvciBiZWxvdyB0aGUgb3V0cHV0LiBJZiBpdCBpc1xuICAgICAgLy8gbm90IGEgdHR5LCB1c2UgYSBkZWZhdWx0IHZhbHVlIG9mIDgwIGNoYXJhY3RlcnMuXG4gICAgICB2YXIgbWF4TGVuZ3RoID0gcHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuaXNUVFkgPyBwcm9jZXNzLnN0ZGVyci5jb2x1bW5zIDogODA7XG5cbiAgICAgIGlmIChpbnB1dExlbmd0aCA8IG1heExlbmd0aCkge1xuICAgICAgICB3aGlsZSAoYWN0dWFsTGluZXNbMF1baV0gPT09IGV4cGVjdGVkTGluZXNbMF1baV0pIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH0gLy8gSWdub3JlIHRoZSBmaXJzdCBjaGFyYWN0ZXJzLlxuXG5cbiAgICAgICAgaWYgKGkgPiAyKSB7XG4gICAgICAgICAgLy8gQWRkIHBvc2l0aW9uIGluZGljYXRvciBmb3IgdGhlIGZpcnN0IG1pc21hdGNoIGluIGNhc2UgaXQgaXMgYVxuICAgICAgICAgIC8vIHNpbmdsZSBsaW5lIGFuZCB0aGUgaW5wdXQgbGVuZ3RoIGlzIGxlc3MgdGhhbiB0aGUgY29sdW1uIGxlbmd0aC5cbiAgICAgICAgICBpbmRpY2F0b3IgPSBcIlxcbiAgXCIuY29uY2F0KHJlcGVhdCgnICcsIGkpLCBcIl5cIik7XG4gICAgICAgICAgaSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gUmVtb3ZlIGFsbCBlbmRpbmcgbGluZXMgdGhhdCBtYXRjaCAodGhpcyBvcHRpbWl6ZXMgdGhlIG91dHB1dCBmb3JcbiAgLy8gcmVhZGFiaWxpdHkgYnkgcmVkdWNpbmcgdGhlIG51bWJlciBvZiB0b3RhbCBjaGFuZ2VkIGxpbmVzKS5cblxuXG4gIHZhciBhID0gYWN0dWFsTGluZXNbYWN0dWFsTGluZXMubGVuZ3RoIC0gMV07XG4gIHZhciBiID0gZXhwZWN0ZWRMaW5lc1tleHBlY3RlZExpbmVzLmxlbmd0aCAtIDFdO1xuXG4gIHdoaWxlIChhID09PSBiKSB7XG4gICAgaWYgKGkrKyA8IDIpIHtcbiAgICAgIGVuZCA9IFwiXFxuICBcIi5jb25jYXQoYSkuY29uY2F0KGVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG90aGVyID0gYTtcbiAgICB9XG5cbiAgICBhY3R1YWxMaW5lcy5wb3AoKTtcbiAgICBleHBlY3RlZExpbmVzLnBvcCgpO1xuICAgIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPT09IDAgfHwgZXhwZWN0ZWRMaW5lcy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgIGEgPSBhY3R1YWxMaW5lc1thY3R1YWxMaW5lcy5sZW5ndGggLSAxXTtcbiAgICBiID0gZXhwZWN0ZWRMaW5lc1tleHBlY3RlZExpbmVzLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgdmFyIG1heExpbmVzID0gTWF0aC5tYXgoYWN0dWFsTGluZXMubGVuZ3RoLCBleHBlY3RlZExpbmVzLmxlbmd0aCk7IC8vIFN0cmljdCBlcXVhbCB3aXRoIGlkZW50aWNhbCBvYmplY3RzIHRoYXQgYXJlIG5vdCBpZGVudGljYWwgYnkgcmVmZXJlbmNlLlxuICAvLyBFLmcuLCBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHsgYTogU3ltYm9sKCkgfSwgeyBhOiBTeW1ib2woKSB9KVxuXG4gIGlmIChtYXhMaW5lcyA9PT0gMCkge1xuICAgIC8vIFdlIGhhdmUgdG8gZ2V0IHRoZSByZXN1bHQgYWdhaW4uIFRoZSBsaW5lcyB3ZXJlIGFsbCByZW1vdmVkIGJlZm9yZS5cbiAgICB2YXIgX2FjdHVhbExpbmVzID0gYWN0dWFsSW5zcGVjdGVkLnNwbGl0KCdcXG4nKTsgLy8gT25seSByZW1vdmUgbGluZXMgaW4gY2FzZSBpdCBtYWtlcyBzZW5zZSB0byBjb2xsYXBzZSB0aG9zZS5cbiAgICAvLyBUT0RPOiBBY2NlcHQgZW52IHRvIGFsd2F5cyBzaG93IHRoZSBmdWxsIGVycm9yLlxuXG5cbiAgICBpZiAoX2FjdHVhbExpbmVzLmxlbmd0aCA+IDMwKSB7XG4gICAgICBfYWN0dWFsTGluZXNbMjZdID0gXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcblxuICAgICAgd2hpbGUgKF9hY3R1YWxMaW5lcy5sZW5ndGggPiAyNykge1xuICAgICAgICBfYWN0dWFsTGluZXMucG9wKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiXCIuY29uY2F0KGtSZWFkYWJsZU9wZXJhdG9yLm5vdElkZW50aWNhbCwgXCJcXG5cXG5cIikuY29uY2F0KF9hY3R1YWxMaW5lcy5qb2luKCdcXG4nKSwgXCJcXG5cIik7XG4gIH1cblxuICBpZiAoaSA+IDMpIHtcbiAgICBlbmQgPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpLmNvbmNhdChlbmQpO1xuICAgIHNraXBwZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYgKG90aGVyICE9PSAnJykge1xuICAgIGVuZCA9IFwiXFxuICBcIi5jb25jYXQob3RoZXIpLmNvbmNhdChlbmQpO1xuICAgIG90aGVyID0gJyc7XG4gIH1cblxuICB2YXIgcHJpbnRlZExpbmVzID0gMDtcbiAgdmFyIG1zZyA9IGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXSArIFwiXFxuXCIuY29uY2F0KGdyZWVuLCBcIisgYWN0dWFsXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChyZWQsIFwiLSBleHBlY3RlZFwiKS5jb25jYXQod2hpdGUpO1xuICB2YXIgc2tpcHBlZE1zZyA9IFwiIFwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUsIFwiIExpbmVzIHNraXBwZWRcIik7XG5cbiAgZm9yIChpID0gMDsgaSA8IG1heExpbmVzOyBpKyspIHtcbiAgICAvLyBPbmx5IGV4dHJhIGV4cGVjdGVkIGxpbmVzIGV4aXN0XG4gICAgdmFyIGN1ciA9IGkgLSBsYXN0UG9zO1xuXG4gICAgaWYgKGFjdHVhbExpbmVzLmxlbmd0aCA8IGkgKyAxKSB7XG4gICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBtb3JlIHRoYW4gb25lIGxpbmUgYWJvdmUgYW5kIHRoZVxuICAgICAgLy8gY3VycmVudCBsaW5lIGlzIGF0IGxlYXN0IGxpbmUgdGhyZWUsIGFkZCBzb21lIG9mIHRoZSBmb3JtZXIgbGluZXMgYW5kXG4gICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgIGlmIChjdXIgPiAxICYmIGkgPiAyKSB7XG4gICAgICAgIGlmIChjdXIgPiA0KSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgc2tpcHBlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VyID4gMykge1xuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGV4cGVjdGVkTGluZXNbaSAtIDJdKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGV4cGVjdGVkTGluZXNbaSAtIDFdKTtcbiAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICB9IC8vIE1hcmsgdGhlIGN1cnJlbnQgbGluZSBhcyB0aGUgbGFzdCBkaXZlcmdpbmcgb25lLlxuXG5cbiAgICAgIGxhc3RQb3MgPSBpOyAvLyBBZGQgdGhlIGV4cGVjdGVkIGxpbmUgdG8gdGhlIGNhY2hlLlxuXG4gICAgICBvdGhlciArPSBcIlxcblwiLmNvbmNhdChyZWQsIFwiLVwiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRMaW5lc1tpXSk7XG4gICAgICBwcmludGVkTGluZXMrKzsgLy8gT25seSBleHRyYSBhY3R1YWwgbGluZXMgZXhpc3RcbiAgICB9IGVsc2UgaWYgKGV4cGVjdGVkTGluZXMubGVuZ3RoIDwgaSArIDEpIHtcbiAgICAgIC8vIElmIHRoZSBsYXN0IGRpdmVyZ2luZyBsaW5lIGlzIG1vcmUgdGhhbiBvbmUgbGluZSBhYm92ZSBhbmQgdGhlXG4gICAgICAvLyBjdXJyZW50IGxpbmUgaXMgYXQgbGVhc3QgbGluZSB0aHJlZSwgYWRkIHNvbWUgb2YgdGhlIGZvcm1lciBsaW5lcyBhbmRcbiAgICAgIC8vIGFsc28gYWRkIGRvdHMgdG8gaW5kaWNhdGUgc2tpcHBlZCBlbnRyaWVzLlxuICAgICAgaWYgKGN1ciA+IDEgJiYgaSA+IDIpIHtcbiAgICAgICAgaWYgKGN1ciA+IDQpIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICAgICAgICBza2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXIgPiAzKSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZXNbaSAtIDJdKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAxXSk7XG4gICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgfSAvLyBNYXJrIHRoZSBjdXJyZW50IGxpbmUgYXMgdGhlIGxhc3QgZGl2ZXJnaW5nIG9uZS5cblxuXG4gICAgICBsYXN0UG9zID0gaTsgLy8gQWRkIHRoZSBhY3R1YWwgbGluZSB0byB0aGUgcmVzdWx0LlxuXG4gICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoZ3JlZW4sIFwiK1wiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoYWN0dWFsTGluZXNbaV0pO1xuICAgICAgcHJpbnRlZExpbmVzKys7IC8vIExpbmVzIGRpdmVyZ2VcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV4cGVjdGVkTGluZSA9IGV4cGVjdGVkTGluZXNbaV07XG4gICAgICB2YXIgYWN0dWFsTGluZSA9IGFjdHVhbExpbmVzW2ldOyAvLyBJZiB0aGUgbGluZXMgZGl2ZXJnZSwgc3BlY2lmaWNhbGx5IGNoZWNrIGZvciBsaW5lcyB0aGF0IG9ubHkgZGl2ZXJnZSBieVxuICAgICAgLy8gYSB0cmFpbGluZyBjb21tYS4gSW4gdGhhdCBjYXNlIGl0IGlzIGFjdHVhbGx5IGlkZW50aWNhbCBhbmQgd2Ugc2hvdWxkXG4gICAgICAvLyBtYXJrIGl0IGFzIHN1Y2guXG5cbiAgICAgIHZhciBkaXZlcmdpbmdMaW5lcyA9IGFjdHVhbExpbmUgIT09IGV4cGVjdGVkTGluZSAmJiAoIWVuZHNXaXRoKGFjdHVhbExpbmUsICcsJykgfHwgYWN0dWFsTGluZS5zbGljZSgwLCAtMSkgIT09IGV4cGVjdGVkTGluZSk7IC8vIElmIHRoZSBleHBlY3RlZCBsaW5lIGhhcyBhIHRyYWlsaW5nIGNvbW1hIGJ1dCBpcyBvdGhlcndpc2UgaWRlbnRpY2FsLFxuICAgICAgLy8gYWRkIGEgY29tbWEgYXQgdGhlIGVuZCBvZiB0aGUgYWN0dWFsIGxpbmUuIE90aGVyd2lzZSB0aGUgb3V0cHV0IGNvdWxkXG4gICAgICAvLyBsb29rIHdlaXJkIGFzIGluOlxuICAgICAgLy9cbiAgICAgIC8vICAgW1xuICAgICAgLy8gICAgIDEgICAgICAgICAvLyBObyBjb21tYSBhdCB0aGUgZW5kIVxuICAgICAgLy8gKyAgIDJcbiAgICAgIC8vICAgXVxuICAgICAgLy9cblxuICAgICAgaWYgKGRpdmVyZ2luZ0xpbmVzICYmIGVuZHNXaXRoKGV4cGVjdGVkTGluZSwgJywnKSAmJiBleHBlY3RlZExpbmUuc2xpY2UoMCwgLTEpID09PSBhY3R1YWxMaW5lKSB7XG4gICAgICAgIGRpdmVyZ2luZ0xpbmVzID0gZmFsc2U7XG4gICAgICAgIGFjdHVhbExpbmUgKz0gJywnO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGl2ZXJnaW5nTGluZXMpIHtcbiAgICAgICAgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgbW9yZSB0aGFuIG9uZSBsaW5lIGFib3ZlIGFuZCB0aGVcbiAgICAgICAgLy8gY3VycmVudCBsaW5lIGlzIGF0IGxlYXN0IGxpbmUgdGhyZWUsIGFkZCBzb21lIG9mIHRoZSBmb3JtZXIgbGluZXMgYW5kXG4gICAgICAgIC8vIGFsc28gYWRkIGRvdHMgdG8gaW5kaWNhdGUgc2tpcHBlZCBlbnRyaWVzLlxuICAgICAgICBpZiAoY3VyID4gMSAmJiBpID4gMikge1xuICAgICAgICAgIGlmIChjdXIgPiA0KSB7XG4gICAgICAgICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICAgICAgICAgIHNraXBwZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VyID4gMykge1xuICAgICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZXNbaSAtIDJdKTtcbiAgICAgICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAxXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH0gLy8gTWFyayB0aGUgY3VycmVudCBsaW5lIGFzIHRoZSBsYXN0IGRpdmVyZ2luZyBvbmUuXG5cblxuICAgICAgICBsYXN0UG9zID0gaTsgLy8gQWRkIHRoZSBhY3R1YWwgbGluZSB0byB0aGUgcmVzdWx0IGFuZCBjYWNoZSB0aGUgZXhwZWN0ZWQgZGl2ZXJnaW5nXG4gICAgICAgIC8vIGxpbmUgc28gY29uc2VjdXRpdmUgZGl2ZXJnaW5nIGxpbmVzIHNob3cgdXAgYXMgKysrLS0tIGFuZCBub3QgKy0rLSstLlxuXG4gICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChncmVlbiwgXCIrXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChhY3R1YWxMaW5lKTtcbiAgICAgICAgb3RoZXIgKz0gXCJcXG5cIi5jb25jYXQocmVkLCBcIi1cIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkTGluZSk7XG4gICAgICAgIHByaW50ZWRMaW5lcyArPSAyOyAvLyBMaW5lcyBhcmUgaWRlbnRpY2FsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGQgYWxsIGNhY2hlZCBpbmZvcm1hdGlvbiB0byB0aGUgcmVzdWx0IGJlZm9yZSBhZGRpbmcgb3RoZXIgdGhpbmdzXG4gICAgICAgIC8vIGFuZCByZXNldCB0aGUgY2FjaGUuXG4gICAgICAgIHJlcyArPSBvdGhlcjtcbiAgICAgICAgb3RoZXIgPSAnJzsgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgZXhhY3RseSBvbmUgbGluZSBhYm92ZSBvciBpZiBpdCBpcyB0aGVcbiAgICAgICAgLy8gdmVyeSBmaXJzdCBsaW5lLCBhZGQgdGhlIGxpbmUgdG8gdGhlIHJlc3VsdC5cblxuICAgICAgICBpZiAoY3VyID09PSAxIHx8IGkgPT09IDApIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gSW5zcGVjdGVkIG9iamVjdCB0byBiaWcgKFNob3cgfjIwIHJvd3MgbWF4KVxuXG5cbiAgICBpZiAocHJpbnRlZExpbmVzID4gMjAgJiYgaSA8IG1heExpbmVzIC0gMikge1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KG1zZykuY29uY2F0KHNraXBwZWRNc2csIFwiXFxuXCIpLmNvbmNhdChyZXMsIFwiXFxuXCIpLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpLmNvbmNhdChvdGhlciwgXCJcXG5cIikgKyBcIlwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBcIlwiLmNvbmNhdChtc2cpLmNvbmNhdChza2lwcGVkID8gc2tpcHBlZE1zZyA6ICcnLCBcIlxcblwiKS5jb25jYXQocmVzKS5jb25jYXQob3RoZXIpLmNvbmNhdChlbmQpLmNvbmNhdChpbmRpY2F0b3IpO1xufVxuXG52YXIgQXNzZXJ0aW9uRXJyb3IgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9FcnJvcikge1xuICBfaW5oZXJpdHMoQXNzZXJ0aW9uRXJyb3IsIF9FcnJvcik7XG5cbiAgZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3Iob3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBc3NlcnRpb25FcnJvcik7XG5cbiAgICBpZiAoX3R5cGVvZihvcHRpb25zKSAhPT0gJ29iamVjdCcgfHwgb3B0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdvcHRpb25zJywgJ09iamVjdCcsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHZhciBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlLFxuICAgICAgICBvcGVyYXRvciA9IG9wdGlvbnMub3BlcmF0b3IsXG4gICAgICAgIHN0YWNrU3RhcnRGbiA9IG9wdGlvbnMuc3RhY2tTdGFydEZuO1xuICAgIHZhciBhY3R1YWwgPSBvcHRpb25zLmFjdHVhbCxcbiAgICAgICAgZXhwZWN0ZWQgPSBvcHRpb25zLmV4cGVjdGVkO1xuICAgIHZhciBsaW1pdCA9IEVycm9yLnN0YWNrVHJhY2VMaW1pdDtcbiAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSAwO1xuXG4gICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCkge1xuICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQXNzZXJ0aW9uRXJyb3IpLmNhbGwodGhpcywgU3RyaW5nKG1lc3NhZ2UpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9jZXNzLnN0ZGVyciAmJiBwcm9jZXNzLnN0ZGVyci5pc1RUWSkge1xuICAgICAgICAvLyBSZXNldCBvbiBlYWNoIGNhbGwgdG8gbWFrZSBzdXJlIHdlIGhhbmRsZSBkeW5hbWljYWxseSBzZXQgZW52aXJvbm1lbnRcbiAgICAgICAgLy8gdmFyaWFibGVzIGNvcnJlY3QuXG4gICAgICAgIGlmIChwcm9jZXNzLnN0ZGVyciAmJiBwcm9jZXNzLnN0ZGVyci5nZXRDb2xvckRlcHRoICYmIHByb2Nlc3Muc3RkZXJyLmdldENvbG9yRGVwdGgoKSAhPT0gMSkge1xuICAgICAgICAgIGJsdWUgPSBcIlxceDFCWzM0bVwiO1xuICAgICAgICAgIGdyZWVuID0gXCJcXHgxQlszMm1cIjtcbiAgICAgICAgICB3aGl0ZSA9IFwiXFx4MUJbMzltXCI7XG4gICAgICAgICAgcmVkID0gXCJcXHgxQlszMW1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBibHVlID0gJyc7XG4gICAgICAgICAgZ3JlZW4gPSAnJztcbiAgICAgICAgICB3aGl0ZSA9ICcnO1xuICAgICAgICAgIHJlZCA9ICcnO1xuICAgICAgICB9XG4gICAgICB9IC8vIFByZXZlbnQgdGhlIGVycm9yIHN0YWNrIGZyb20gYmVpbmcgdmlzaWJsZSBieSBkdXBsaWNhdGluZyB0aGUgZXJyb3JcbiAgICAgIC8vIGluIGEgdmVyeSBjbG9zZSB3YXkgdG8gdGhlIG9yaWdpbmFsIGluIGNhc2UgYm90aCBzaWRlcyBhcmUgYWN0dWFsbHlcbiAgICAgIC8vIGluc3RhbmNlcyBvZiBFcnJvci5cblxuXG4gICAgICBpZiAoX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwgJiYgX3R5cGVvZihleHBlY3RlZCkgPT09ICdvYmplY3QnICYmIGV4cGVjdGVkICE9PSBudWxsICYmICdzdGFjaycgaW4gYWN0dWFsICYmIGFjdHVhbCBpbnN0YW5jZW9mIEVycm9yICYmICdzdGFjaycgaW4gZXhwZWN0ZWQgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBhY3R1YWwgPSBjb3B5RXJyb3IoYWN0dWFsKTtcbiAgICAgICAgZXhwZWN0ZWQgPSBjb3B5RXJyb3IoZXhwZWN0ZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3BlcmF0b3IgPT09ICdkZWVwU3RyaWN0RXF1YWwnIHx8IG9wZXJhdG9yID09PSAnc3RyaWN0RXF1YWwnKSB7XG4gICAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEFzc2VydGlvbkVycm9yKS5jYWxsKHRoaXMsIGNyZWF0ZUVyckRpZmYoYWN0dWFsLCBleHBlY3RlZCwgb3BlcmF0b3IpKSk7XG4gICAgICB9IGVsc2UgaWYgKG9wZXJhdG9yID09PSAnbm90RGVlcFN0cmljdEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ25vdFN0cmljdEVxdWFsJykge1xuICAgICAgICAvLyBJbiBjYXNlIHRoZSBvYmplY3RzIGFyZSBlcXVhbCBidXQgdGhlIG9wZXJhdG9yIHJlcXVpcmVzIHVuZXF1YWwsIHNob3dcbiAgICAgICAgLy8gdGhlIGZpcnN0IG9iamVjdCBhbmQgc2F5IEEgZXF1YWxzIEJcbiAgICAgICAgdmFyIGJhc2UgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl07XG4gICAgICAgIHZhciByZXMgPSBpbnNwZWN0VmFsdWUoYWN0dWFsKS5zcGxpdCgnXFxuJyk7IC8vIEluIGNhc2UgXCJhY3R1YWxcIiBpcyBhbiBvYmplY3QsIGl0IHNob3VsZCBub3QgYmUgcmVmZXJlbmNlIGVxdWFsLlxuXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ25vdFN0cmljdEVxdWFsJyAmJiBfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPT0gbnVsbCkge1xuICAgICAgICAgIGJhc2UgPSBrUmVhZGFibGVPcGVyYXRvci5ub3RTdHJpY3RFcXVhbE9iamVjdDtcbiAgICAgICAgfSAvLyBPbmx5IHJlbW92ZSBsaW5lcyBpbiBjYXNlIGl0IG1ha2VzIHNlbnNlIHRvIGNvbGxhcHNlIHRob3NlLlxuICAgICAgICAvLyBUT0RPOiBBY2NlcHQgZW52IHRvIGFsd2F5cyBzaG93IHRoZSBmdWxsIGVycm9yLlxuXG5cbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAzMCkge1xuICAgICAgICAgIHJlc1syNl0gPSBcIlwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuXG4gICAgICAgICAgd2hpbGUgKHJlcy5sZW5ndGggPiAyNykge1xuICAgICAgICAgICAgcmVzLnBvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBPbmx5IHByaW50IGEgc2luZ2xlIGlucHV0LlxuXG5cbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBcIlwiLmNvbmNhdChiYXNlLCBcIiBcIikuY29uY2F0KHJlc1swXSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBcIlwiLmNvbmNhdChiYXNlLCBcIlxcblxcblwiKS5jb25jYXQocmVzLmpvaW4oJ1xcbicpLCBcIlxcblwiKSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgX3JlcyA9IGluc3BlY3RWYWx1ZShhY3R1YWwpO1xuXG4gICAgICAgIHZhciBvdGhlciA9ICcnO1xuICAgICAgICB2YXIga25vd25PcGVyYXRvcnMgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl07XG5cbiAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnbm90RGVlcEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ25vdEVxdWFsJykge1xuICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl0sIFwiXFxuXFxuXCIpLmNvbmNhdChfcmVzKTtcblxuICAgICAgICAgIGlmIChfcmVzLmxlbmd0aCA+IDEwMjQpIHtcbiAgICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChfcmVzLnNsaWNlKDAsIDEwMjEpLCBcIi4uLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3RoZXIgPSBcIlwiLmNvbmNhdChpbnNwZWN0VmFsdWUoZXhwZWN0ZWQpKTtcblxuICAgICAgICAgIGlmIChfcmVzLmxlbmd0aCA+IDUxMikge1xuICAgICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KF9yZXMuc2xpY2UoMCwgNTA5KSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG90aGVyLmxlbmd0aCA+IDUxMikge1xuICAgICAgICAgICAgb3RoZXIgPSBcIlwiLmNvbmNhdChvdGhlci5zbGljZSgwLCA1MDkpLCBcIi4uLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdkZWVwRXF1YWwnIHx8IG9wZXJhdG9yID09PSAnZXF1YWwnKSB7XG4gICAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoa25vd25PcGVyYXRvcnMsIFwiXFxuXFxuXCIpLmNvbmNhdChfcmVzLCBcIlxcblxcbnNob3VsZCBlcXVhbFxcblxcblwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3RoZXIgPSBcIiBcIi5jb25jYXQob3BlcmF0b3IsIFwiIFwiKS5jb25jYXQob3RoZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEFzc2VydGlvbkVycm9yKS5jYWxsKHRoaXMsIFwiXCIuY29uY2F0KF9yZXMpLmNvbmNhdChvdGhlcikpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBFcnJvci5zdGFja1RyYWNlTGltaXQgPSBsaW1pdDtcbiAgICBfdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gIW1lc3NhZ2U7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCAnbmFtZScsIHtcbiAgICAgIHZhbHVlOiAnQXNzZXJ0aW9uRXJyb3IgW0VSUl9BU1NFUlRJT05dJyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBfdGhpcy5jb2RlID0gJ0VSUl9BU1NFUlRJT04nO1xuICAgIF90aGlzLmFjdHVhbCA9IGFjdHVhbDtcbiAgICBfdGhpcy5leHBlY3RlZCA9IGV4cGVjdGVkO1xuICAgIF90aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XG5cbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIHN0YWNrU3RhcnRGbik7XG4gICAgfSAvLyBDcmVhdGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGUgaW4gdGhlIG5hbWUuXG5cblxuICAgIF90aGlzLnN0YWNrOyAvLyBSZXNldCB0aGUgbmFtZS5cblxuICAgIF90aGlzLm5hbWUgPSAnQXNzZXJ0aW9uRXJyb3InO1xuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQXNzZXJ0aW9uRXJyb3IsIFt7XG4gICAga2V5OiBcInRvU3RyaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KHRoaXMubmFtZSwgXCIgW1wiKS5jb25jYXQodGhpcy5jb2RlLCBcIl06IFwiKS5jb25jYXQodGhpcy5tZXNzYWdlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IGluc3BlY3QuY3VzdG9tLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZShyZWN1cnNlVGltZXMsIGN0eCkge1xuICAgICAgLy8gVGhpcyBsaW1pdHMgdGhlIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgIHByb3BlcnR5IGRlZmF1bHQgaW5zcGVjdGlvbiB0b1xuICAgICAgLy8gdGhlIG1pbmltdW0gZGVwdGguIE90aGVyd2lzZSB0aG9zZSB2YWx1ZXMgd291bGQgYmUgdG9vIHZlcmJvc2UgY29tcGFyZWRcbiAgICAgIC8vIHRvIHRoZSBhY3R1YWwgZXJyb3IgbWVzc2FnZSB3aGljaCBjb250YWlucyBhIGNvbWJpbmVkIHZpZXcgb2YgdGhlc2UgdHdvXG4gICAgICAvLyBpbnB1dCB2YWx1ZXMuXG4gICAgICByZXR1cm4gaW5zcGVjdCh0aGlzLCBfb2JqZWN0U3ByZWFkKHt9LCBjdHgsIHtcbiAgICAgICAgY3VzdG9tSW5zcGVjdDogZmFsc2UsXG4gICAgICAgIGRlcHRoOiAwXG4gICAgICB9KSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFzc2VydGlvbkVycm9yO1xufShfd3JhcE5hdGl2ZVN1cGVyKEVycm9yKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXNzZXJ0aW9uRXJyb3I7IiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9pbnRlcm5hbC9lcnJvcnMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvM2IwNDQ5NjJjNDhmZTMxMzkwNTg3N2E5NmI1ZDA4OTRhNTQwNGY2ZlxuXG4vKiBlc2xpbnQgbm9kZS1jb3JlL2RvY3VtZW50ZWQtZXJyb3JzOiBcImVycm9yXCIgKi9cblxuLyogZXNsaW50IG5vZGUtY29yZS9hbHBoYWJldGl6ZS1lcnJvcnM6IFwiZXJyb3JcIiAqL1xuXG4vKiBlc2xpbnQgbm9kZS1jb3JlL3ByZWZlci11dGlsLWZvcm1hdC1lcnJvcnM6IFwiZXJyb3JcIiAqL1xuJ3VzZSBzdHJpY3QnOyAvLyBUaGUgd2hvbGUgcG9pbnQgYmVoaW5kIHRoaXMgaW50ZXJuYWwgbW9kdWxlIGlzIHRvIGFsbG93IE5vZGUuanMgdG8gbm9cbi8vIGxvbmdlciBiZSBmb3JjZWQgdG8gdHJlYXQgZXZlcnkgZXJyb3IgbWVzc2FnZSBjaGFuZ2UgYXMgYSBzZW12ZXItbWFqb3Jcbi8vIGNoYW5nZS4gVGhlIE5vZGVFcnJvciBjbGFzc2VzIGhlcmUgYWxsIGV4cG9zZSBhIGBjb2RlYCBwcm9wZXJ0eSB3aG9zZVxuLy8gdmFsdWUgc3RhdGljYWxseSBhbmQgcGVybWFuZW50bHkgaWRlbnRpZmllcyB0aGUgZXJyb3IuIFdoaWxlIHRoZSBlcnJvclxuLy8gbWVzc2FnZSBtYXkgY2hhbmdlLCB0aGUgY29kZSBzaG91bGQgbm90LlxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbnZhciBjb2RlcyA9IHt9OyAvLyBMYXp5IGxvYWRlZFxuXG52YXIgYXNzZXJ0O1xudmFyIHV0aWw7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVycm9yVHlwZShjb2RlLCBtZXNzYWdlLCBCYXNlKSB7XG4gIGlmICghQmFzZSkge1xuICAgIEJhc2UgPSBFcnJvcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE1lc3NhZ2UoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWVzc2FnZShhcmcxLCBhcmcyLCBhcmczKTtcbiAgICB9XG4gIH1cblxuICB2YXIgTm9kZUVycm9yID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0Jhc2UpIHtcbiAgICBfaW5oZXJpdHMoTm9kZUVycm9yLCBfQmFzZSk7XG5cbiAgICBmdW5jdGlvbiBOb2RlRXJyb3IoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTm9kZUVycm9yKTtcblxuICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoTm9kZUVycm9yKS5jYWxsKHRoaXMsIGdldE1lc3NhZ2UoYXJnMSwgYXJnMiwgYXJnMykpKTtcbiAgICAgIF90aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIHJldHVybiBOb2RlRXJyb3I7XG4gIH0oQmFzZSk7XG5cbiAgY29kZXNbY29kZV0gPSBOb2RlRXJyb3I7XG59IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL3YxMC44LjAvbGliL2ludGVybmFsL2Vycm9ycy5qc1xuXG5cbmZ1bmN0aW9uIG9uZU9mKGV4cGVjdGVkLCB0aGluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheShleHBlY3RlZCkpIHtcbiAgICB2YXIgbGVuID0gZXhwZWN0ZWQubGVuZ3RoO1xuICAgIGV4cGVjdGVkID0gZXhwZWN0ZWQubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKGkpO1xuICAgIH0pO1xuXG4gICAgaWYgKGxlbiA+IDIpIHtcbiAgICAgIHJldHVybiBcIm9uZSBvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWQuc2xpY2UoMCwgbGVuIC0gMSkuam9pbignLCAnKSwgXCIsIG9yIFwiKSArIGV4cGVjdGVkW2xlbiAtIDFdO1xuICAgIH0gZWxzZSBpZiAobGVuID09PSAyKSB7XG4gICAgICByZXR1cm4gXCJvbmUgb2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkWzBdLCBcIiBvciBcIikuY29uY2F0KGV4cGVjdGVkWzFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwib2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkWzBdKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwib2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KFN0cmluZyhleHBlY3RlZCkpO1xuICB9XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9zdGFydHNXaXRoXG5cblxuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHIsIHNlYXJjaCwgcG9zKSB7XG4gIHJldHVybiBzdHIuc3Vic3RyKCFwb3MgfHwgcG9zIDwgMCA/IDAgOiArcG9zLCBzZWFyY2gubGVuZ3RoKSA9PT0gc2VhcmNoO1xufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvZW5kc1dpdGhcblxuXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaCwgdGhpc19sZW4pIHtcbiAgaWYgKHRoaXNfbGVuID09PSB1bmRlZmluZWQgfHwgdGhpc19sZW4gPiBzdHIubGVuZ3RoKSB7XG4gICAgdGhpc19sZW4gPSBzdHIubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHN0ci5zdWJzdHJpbmcodGhpc19sZW4gLSBzZWFyY2gubGVuZ3RoLCB0aGlzX2xlbikgPT09IHNlYXJjaDtcbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2luY2x1ZGVzXG5cblxuZnVuY3Rpb24gaW5jbHVkZXMoc3RyLCBzZWFyY2gsIHN0YXJ0KSB7XG4gIGlmICh0eXBlb2Ygc3RhcnQgIT09ICdudW1iZXInKSB7XG4gICAgc3RhcnQgPSAwO1xuICB9XG5cbiAgaWYgKHN0YXJ0ICsgc2VhcmNoLmxlbmd0aCA+IHN0ci5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKHNlYXJjaCwgc3RhcnQpICE9PSAtMTtcbiAgfVxufVxuXG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9BTUJJR1VPVVNfQVJHVU1FTlQnLCAnVGhlIFwiJXNcIiBhcmd1bWVudCBpcyBhbWJpZ3VvdXMuICVzJywgVHlwZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0lOVkFMSURfQVJHX1RZUEUnLCBmdW5jdGlvbiAobmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCkge1xuICBpZiAoYXNzZXJ0ID09PSB1bmRlZmluZWQpIGFzc2VydCA9IHJlcXVpcmUoJy4uL2Fzc2VydCcpO1xuICBhc3NlcnQodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnLCBcIiduYW1lJyBtdXN0IGJlIGEgc3RyaW5nXCIpOyAvLyBkZXRlcm1pbmVyOiAnbXVzdCBiZScgb3IgJ211c3Qgbm90IGJlJ1xuXG4gIHZhciBkZXRlcm1pbmVyO1xuXG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT09ICdzdHJpbmcnICYmIHN0YXJ0c1dpdGgoZXhwZWN0ZWQsICdub3QgJykpIHtcbiAgICBkZXRlcm1pbmVyID0gJ211c3Qgbm90IGJlJztcbiAgICBleHBlY3RlZCA9IGV4cGVjdGVkLnJlcGxhY2UoL15ub3QgLywgJycpO1xuICB9IGVsc2Uge1xuICAgIGRldGVybWluZXIgPSAnbXVzdCBiZSc7XG4gIH1cblxuICB2YXIgbXNnO1xuXG4gIGlmIChlbmRzV2l0aChuYW1lLCAnIGFyZ3VtZW50JykpIHtcbiAgICAvLyBGb3IgY2FzZXMgbGlrZSAnZmlyc3QgYXJndW1lbnQnXG4gICAgbXNnID0gXCJUaGUgXCIuY29uY2F0KG5hbWUsIFwiIFwiKS5jb25jYXQoZGV0ZXJtaW5lciwgXCIgXCIpLmNvbmNhdChvbmVPZihleHBlY3RlZCwgJ3R5cGUnKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHR5cGUgPSBpbmNsdWRlcyhuYW1lLCAnLicpID8gJ3Byb3BlcnR5JyA6ICdhcmd1bWVudCc7XG4gICAgbXNnID0gXCJUaGUgXFxcIlwiLmNvbmNhdChuYW1lLCBcIlxcXCIgXCIpLmNvbmNhdCh0eXBlLCBcIiBcIikuY29uY2F0KGRldGVybWluZXIsIFwiIFwiKS5jb25jYXQob25lT2YoZXhwZWN0ZWQsICd0eXBlJykpO1xuICB9IC8vIFRPRE8oQnJpZGdlQVIpOiBJbXByb3ZlIHRoZSBvdXRwdXQgYnkgc2hvd2luZyBgbnVsbGAgYW5kIHNpbWlsYXIuXG5cblxuICBtc2cgKz0gXCIuIFJlY2VpdmVkIHR5cGUgXCIuY29uY2F0KF90eXBlb2YoYWN0dWFsKSk7XG4gIHJldHVybiBtc2c7XG59LCBUeXBlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfSU5WQUxJRF9BUkdfVkFMVUUnLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgdmFyIHJlYXNvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJ2lzIGludmFsaWQnO1xuICBpZiAodXRpbCA9PT0gdW5kZWZpbmVkKSB1dGlsID0gcmVxdWlyZSgndXRpbC8nKTtcbiAgdmFyIGluc3BlY3RlZCA9IHV0aWwuaW5zcGVjdCh2YWx1ZSk7XG5cbiAgaWYgKGluc3BlY3RlZC5sZW5ndGggPiAxMjgpIHtcbiAgICBpbnNwZWN0ZWQgPSBcIlwiLmNvbmNhdChpbnNwZWN0ZWQuc2xpY2UoMCwgMTI4KSwgXCIuLi5cIik7XG4gIH1cblxuICByZXR1cm4gXCJUaGUgYXJndW1lbnQgJ1wiLmNvbmNhdChuYW1lLCBcIicgXCIpLmNvbmNhdChyZWFzb24sIFwiLiBSZWNlaXZlZCBcIikuY29uY2F0KGluc3BlY3RlZCk7XG59LCBUeXBlRXJyb3IsIFJhbmdlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUnLCBmdW5jdGlvbiAoaW5wdXQsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0eXBlO1xuXG4gIGlmICh2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgdHlwZSA9IFwiaW5zdGFuY2Ugb2YgXCIuY29uY2F0KHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBcInR5cGUgXCIuY29uY2F0KF90eXBlb2YodmFsdWUpKTtcbiAgfVxuXG4gIHJldHVybiBcIkV4cGVjdGVkIFwiLmNvbmNhdChpbnB1dCwgXCIgdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgXFxcIlwiKS5jb25jYXQobmFtZSwgXCJcXFwiXCIpICsgXCIgZnVuY3Rpb24gYnV0IGdvdCBcIi5jb25jYXQodHlwZSwgXCIuXCIpO1xufSwgVHlwZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX01JU1NJTkdfQVJHUycsIGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChhc3NlcnQgPT09IHVuZGVmaW5lZCkgYXNzZXJ0ID0gcmVxdWlyZSgnLi4vYXNzZXJ0Jyk7XG4gIGFzc2VydChhcmdzLmxlbmd0aCA+IDAsICdBdCBsZWFzdCBvbmUgYXJnIG5lZWRzIHRvIGJlIHNwZWNpZmllZCcpO1xuICB2YXIgbXNnID0gJ1RoZSAnO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIGFyZ3MgPSBhcmdzLm1hcChmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQoYSwgXCJcXFwiXCIpO1xuICB9KTtcblxuICBzd2l0Y2ggKGxlbikge1xuICAgIGNhc2UgMTpcbiAgICAgIG1zZyArPSBcIlwiLmNvbmNhdChhcmdzWzBdLCBcIiBhcmd1bWVudFwiKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAyOlxuICAgICAgbXNnICs9IFwiXCIuY29uY2F0KGFyZ3NbMF0sIFwiIGFuZCBcIikuY29uY2F0KGFyZ3NbMV0sIFwiIGFyZ3VtZW50c1wiKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG1zZyArPSBhcmdzLnNsaWNlKDAsIGxlbiAtIDEpLmpvaW4oJywgJyk7XG4gICAgICBtc2cgKz0gXCIsIGFuZCBcIi5jb25jYXQoYXJnc1tsZW4gLSAxXSwgXCIgYXJndW1lbnRzXCIpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQobXNnLCBcIiBtdXN0IGJlIHNwZWNpZmllZFwiKTtcbn0sIFR5cGVFcnJvcik7XG5tb2R1bGUuZXhwb3J0cy5jb2RlcyA9IGNvZGVzOyIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8xMTJjYzdjMjc1NTEyNTRhYTJiMTcwOThmYjc3NDg2N2YwNWVkMGQ5XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgcmVnZXhGbGFnc1N1cHBvcnRlZCA9IC9hL2cuZmxhZ3MgIT09IHVuZGVmaW5lZDtcblxudmFyIGFycmF5RnJvbVNldCA9IGZ1bmN0aW9uIGFycmF5RnJvbVNldChzZXQpIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBhcnJheS5wdXNoKHZhbHVlKTtcbiAgfSk7XG4gIHJldHVybiBhcnJheTtcbn07XG5cbnZhciBhcnJheUZyb21NYXAgPSBmdW5jdGlvbiBhcnJheUZyb21NYXAobWFwKSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIHJldHVybiBhcnJheS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0pO1xuICByZXR1cm4gYXJyYXk7XG59O1xuXG52YXIgb2JqZWN0SXMgPSBPYmplY3QuaXMgPyBPYmplY3QuaXMgOiByZXF1aXJlKCdvYmplY3QtaXMnKTtcbnZhciBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFtdO1xufTtcbnZhciBudW1iZXJJc05hTiA9IE51bWJlci5pc05hTiA/IE51bWJlci5pc05hTiA6IHJlcXVpcmUoJ2lzLW5hbicpO1xuXG5mdW5jdGlvbiB1bmN1cnJ5VGhpcyhmKSB7XG4gIHJldHVybiBmLmNhbGwuYmluZChmKTtcbn1cblxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlKTtcbnZhciBvYmplY3RUb1N0cmluZyA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpO1xuXG52YXIgX3JlcXVpcmUkdHlwZXMgPSByZXF1aXJlKCd1dGlsLycpLnR5cGVzLFxuICAgIGlzQW55QXJyYXlCdWZmZXIgPSBfcmVxdWlyZSR0eXBlcy5pc0FueUFycmF5QnVmZmVyLFxuICAgIGlzQXJyYXlCdWZmZXJWaWV3ID0gX3JlcXVpcmUkdHlwZXMuaXNBcnJheUJ1ZmZlclZpZXcsXG4gICAgaXNEYXRlID0gX3JlcXVpcmUkdHlwZXMuaXNEYXRlLFxuICAgIGlzTWFwID0gX3JlcXVpcmUkdHlwZXMuaXNNYXAsXG4gICAgaXNSZWdFeHAgPSBfcmVxdWlyZSR0eXBlcy5pc1JlZ0V4cCxcbiAgICBpc1NldCA9IF9yZXF1aXJlJHR5cGVzLmlzU2V0LFxuICAgIGlzTmF0aXZlRXJyb3IgPSBfcmVxdWlyZSR0eXBlcy5pc05hdGl2ZUVycm9yLFxuICAgIGlzQm94ZWRQcmltaXRpdmUgPSBfcmVxdWlyZSR0eXBlcy5pc0JveGVkUHJpbWl0aXZlLFxuICAgIGlzTnVtYmVyT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNOdW1iZXJPYmplY3QsXG4gICAgaXNTdHJpbmdPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc1N0cmluZ09iamVjdCxcbiAgICBpc0Jvb2xlYW5PYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc0Jvb2xlYW5PYmplY3QsXG4gICAgaXNCaWdJbnRPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc0JpZ0ludE9iamVjdCxcbiAgICBpc1N5bWJvbE9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzU3ltYm9sT2JqZWN0LFxuICAgIGlzRmxvYXQzMkFycmF5ID0gX3JlcXVpcmUkdHlwZXMuaXNGbG9hdDMyQXJyYXksXG4gICAgaXNGbG9hdDY0QXJyYXkgPSBfcmVxdWlyZSR0eXBlcy5pc0Zsb2F0NjRBcnJheTtcblxuZnVuY3Rpb24gaXNOb25JbmRleChrZXkpIHtcbiAgaWYgKGtleS5sZW5ndGggPT09IDAgfHwga2V5Lmxlbmd0aCA+IDEwKSByZXR1cm4gdHJ1ZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjb2RlID0ga2V5LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPCA0OCB8fCBjb2RlID4gNTcpIHJldHVybiB0cnVlO1xuICB9IC8vIFRoZSBtYXhpbXVtIHNpemUgZm9yIGFuIGFycmF5IGlzIDIgKiogMzIgLTEuXG5cblxuICByZXR1cm4ga2V5Lmxlbmd0aCA9PT0gMTAgJiYga2V5ID49IE1hdGgucG93KDIsIDMyKTtcbn1cblxuZnVuY3Rpb24gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkuZmlsdGVyKGlzTm9uSW5kZXgpLmNvbmNhdChvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsdWUpLmZpbHRlcihPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmJpbmQodmFsdWUpKSk7XG59IC8vIFRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvYmxvYi82ODBlOWU1ZTQ4OGYyMmFhYzI3NTk5YTU3ZGM4NDRhNjMxNTkyOGRkL2luZGV4LmpzXG4vLyBvcmlnaW5hbCBub3RpY2U6XG5cbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuXG5mdW5jdGlvbiBjb21wYXJlKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciB4ID0gYS5sZW5ndGg7XG4gIHZhciB5ID0gYi5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV07XG4gICAgICB5ID0gYltpXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGlmICh5IDwgeCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbnZhciBPTkxZX0VOVU1FUkFCTEUgPSB1bmRlZmluZWQ7XG52YXIga1N0cmljdCA9IHRydWU7XG52YXIga0xvb3NlID0gZmFsc2U7XG52YXIga05vSXRlcmF0b3IgPSAwO1xudmFyIGtJc0FycmF5ID0gMTtcbnZhciBrSXNTZXQgPSAyO1xudmFyIGtJc01hcCA9IDM7IC8vIENoZWNrIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBzb3VyY2UgYW5kIGZsYWdzXG5cbmZ1bmN0aW9uIGFyZVNpbWlsYXJSZWdFeHBzKGEsIGIpIHtcbiAgcmV0dXJuIHJlZ2V4RmxhZ3NTdXBwb3J0ZWQgPyBhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiYgYS5mbGFncyA9PT0gYi5mbGFncyA6IFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSA9PT0gUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGIpO1xufVxuXG5mdW5jdGlvbiBhcmVTaW1pbGFyRmxvYXRBcnJheXMoYSwgYikge1xuICBpZiAoYS5ieXRlTGVuZ3RoICE9PSBiLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBhLmJ5dGVMZW5ndGg7IG9mZnNldCsrKSB7XG4gICAgaWYgKGFbb2Zmc2V0XSAhPT0gYltvZmZzZXRdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGFyZVNpbWlsYXJUeXBlZEFycmF5cyhhLCBiKSB7XG4gIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBjb21wYXJlKG5ldyBVaW50OEFycmF5KGEuYnVmZmVyLCBhLmJ5dGVPZmZzZXQsIGEuYnl0ZUxlbmd0aCksIG5ldyBVaW50OEFycmF5KGIuYnVmZmVyLCBiLmJ5dGVPZmZzZXQsIGIuYnl0ZUxlbmd0aCkpID09PSAwO1xufVxuXG5mdW5jdGlvbiBhcmVFcXVhbEFycmF5QnVmZmVycyhidWYxLCBidWYyKSB7XG4gIHJldHVybiBidWYxLmJ5dGVMZW5ndGggPT09IGJ1ZjIuYnl0ZUxlbmd0aCAmJiBjb21wYXJlKG5ldyBVaW50OEFycmF5KGJ1ZjEpLCBuZXcgVWludDhBcnJheShidWYyKSkgPT09IDA7XG59XG5cbmZ1bmN0aW9uIGlzRXF1YWxCb3hlZFByaW1pdGl2ZSh2YWwxLCB2YWwyKSB7XG4gIGlmIChpc051bWJlck9iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc051bWJlck9iamVjdCh2YWwyKSAmJiBvYmplY3RJcyhOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSwgTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMikpO1xuICB9XG5cbiAgaWYgKGlzU3RyaW5nT2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzU3RyaW5nT2JqZWN0KHZhbDIpICYmIFN0cmluZy5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuXG4gIGlmIChpc0Jvb2xlYW5PYmplY3QodmFsMSkpIHtcbiAgICByZXR1cm4gaXNCb29sZWFuT2JqZWN0KHZhbDIpICYmIEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpO1xuICB9XG5cbiAgaWYgKGlzQmlnSW50T2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzQmlnSW50T2JqZWN0KHZhbDIpICYmIEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuXG4gIHJldHVybiBpc1N5bWJvbE9iamVjdCh2YWwyKSAmJiBTeW1ib2wucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG59IC8vIE5vdGVzOiBUeXBlIHRhZ3MgYXJlIGhpc3RvcmljYWwgW1tDbGFzc11dIHByb3BlcnRpZXMgdGhhdCBjYW4gYmUgc2V0IGJ5XG4vLyBGdW5jdGlvblRlbXBsYXRlOjpTZXRDbGFzc05hbWUoKSBpbiBDKysgb3IgU3ltYm9sLnRvU3RyaW5nVGFnIGluIEpTXG4vLyBhbmQgcmV0cmlldmVkIHVzaW5nIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopIGluIEpTXG4vLyBTZWUgaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuLy8gZm9yIGEgbGlzdCBvZiB0YWdzIHByZS1kZWZpbmVkIGluIHRoZSBzcGVjLlxuLy8gVGhlcmUgYXJlIHNvbWUgdW5zcGVjaWZpZWQgdGFncyBpbiB0aGUgd2lsZCB0b28gKGUuZy4gdHlwZWQgYXJyYXkgdGFncykuXG4vLyBTaW5jZSB0YWdzIGNhbiBiZSBhbHRlcmVkLCB0aGV5IG9ubHkgc2VydmUgZmFzdCBmYWlsdXJlc1xuLy9cbi8vIFR5cGVkIGFycmF5cyBhbmQgYnVmZmVycyBhcmUgY2hlY2tlZCBieSBjb21wYXJpbmcgdGhlIGNvbnRlbnQgaW4gdGhlaXJcbi8vIHVuZGVybHlpbmcgQXJyYXlCdWZmZXIuIFRoaXMgb3B0aW1pemF0aW9uIHJlcXVpcmVzIHRoYXQgaXQnc1xuLy8gcmVhc29uYWJsZSB0byBpbnRlcnByZXQgdGhlaXIgdW5kZXJseWluZyBtZW1vcnkgaW4gdGhlIHNhbWUgd2F5LFxuLy8gd2hpY2ggaXMgY2hlY2tlZCBieSBjb21wYXJpbmcgdGhlaXIgdHlwZSB0YWdzLlxuLy8gKGUuZy4gYSBVaW50OEFycmF5IGFuZCBhIFVpbnQxNkFycmF5IHdpdGggdGhlIHNhbWUgbWVtb3J5IGNvbnRlbnRcbi8vIGNvdWxkIHN0aWxsIGJlIGRpZmZlcmVudCBiZWNhdXNlIHRoZXkgd2lsbCBiZSBpbnRlcnByZXRlZCBkaWZmZXJlbnRseSkuXG4vL1xuLy8gRm9yIHN0cmljdCBjb21wYXJpc29uLCBvYmplY3RzIHNob3VsZCBoYXZlXG4vLyBhKSBUaGUgc2FtZSBidWlsdC1pbiB0eXBlIHRhZ3Ncbi8vIGIpIFRoZSBzYW1lIHByb3RvdHlwZXMuXG5cblxuZnVuY3Rpb24gaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcykge1xuICAvLyBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmICh2YWwxID09PSB2YWwyKSB7XG4gICAgaWYgKHZhbDEgIT09IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBzdHJpY3QgPyBvYmplY3RJcyh2YWwxLCB2YWwyKSA6IHRydWU7XG4gIH0gLy8gQ2hlY2sgbW9yZSBjbG9zZWx5IGlmIHZhbDEgYW5kIHZhbDIgYXJlIGVxdWFsLlxuXG5cbiAgaWYgKHN0cmljdCkge1xuICAgIGlmIChfdHlwZW9mKHZhbDEpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwxID09PSAnbnVtYmVyJyAmJiBudW1iZXJJc05hTih2YWwxKSAmJiBudW1iZXJJc05hTih2YWwyKTtcbiAgICB9XG5cbiAgICBpZiAoX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcgfHwgdmFsMSA9PT0gbnVsbCB8fCB2YWwyID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwxKSAhPT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh2YWwxID09PSBudWxsIHx8IF90eXBlb2YodmFsMSkgIT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodmFsMiA9PT0gbnVsbCB8fCBfdHlwZW9mKHZhbDIpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG4gICAgICAgIHJldHVybiB2YWwxID09IHZhbDI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodmFsMiA9PT0gbnVsbCB8fCBfdHlwZW9mKHZhbDIpICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHZhciB2YWwxVGFnID0gb2JqZWN0VG9TdHJpbmcodmFsMSk7XG4gIHZhciB2YWwyVGFnID0gb2JqZWN0VG9TdHJpbmcodmFsMik7XG5cbiAgaWYgKHZhbDFUYWcgIT09IHZhbDJUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwxKSkge1xuICAgIC8vIENoZWNrIGZvciBzcGFyc2UgYXJyYXlzIGFuZCBnZW5lcmFsIGZhc3QgcGF0aFxuICAgIGlmICh2YWwxLmxlbmd0aCAhPT0gdmFsMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIga2V5czEgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMSwgT05MWV9FTlVNRVJBQkxFKTtcbiAgICB2YXIga2V5czIgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMiwgT05MWV9FTlVNRVJBQkxFKTtcblxuICAgIGlmIChrZXlzMS5sZW5ndGggIT09IGtleXMyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNBcnJheSwga2V5czEpO1xuICB9IC8vIFticm93c2VyaWZ5XSBUaGlzIHRyaWdnZXJzIG9uIGNlcnRhaW4gdHlwZXMgaW4gSUUgKE1hcC9TZXQpIHNvIHdlIGRvbid0XG4gIC8vIHdhbid0IHRvIGVhcmx5IHJldHVybiBvdXQgb2YgdGhlIHJlc3Qgb2YgdGhlIGNoZWNrcy4gSG93ZXZlciB3ZSBjYW4gY2hlY2tcbiAgLy8gaWYgdGhlIHNlY29uZCB2YWx1ZSBpcyBvbmUgb2YgdGhlc2UgdmFsdWVzIGFuZCB0aGUgZmlyc3QgaXNuJ3QuXG5cblxuICBpZiAodmFsMVRhZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAvLyByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IpO1xuICAgIGlmICghaXNNYXAodmFsMSkgJiYgaXNNYXAodmFsMikgfHwgIWlzU2V0KHZhbDEpICYmIGlzU2V0KHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzRGF0ZSh2YWwxKSkge1xuICAgIGlmICghaXNEYXRlKHZhbDIpIHx8IERhdGUucHJvdG90eXBlLmdldFRpbWUuY2FsbCh2YWwxKSAhPT0gRGF0ZS5wcm90b3R5cGUuZ2V0VGltZS5jYWxsKHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzUmVnRXhwKHZhbDEpKSB7XG4gICAgaWYgKCFpc1JlZ0V4cCh2YWwyKSB8fCAhYXJlU2ltaWxhclJlZ0V4cHModmFsMSwgdmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNOYXRpdmVFcnJvcih2YWwxKSB8fCB2YWwxIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAvLyBEbyBub3QgY29tcGFyZSB0aGUgc3RhY2sgYXMgaXQgbWlnaHQgZGlmZmVyIGV2ZW4gdGhvdWdoIHRoZSBlcnJvciBpdHNlbGZcbiAgICAvLyBpcyBvdGhlcndpc2UgaWRlbnRpY2FsLlxuICAgIGlmICh2YWwxLm1lc3NhZ2UgIT09IHZhbDIubWVzc2FnZSB8fCB2YWwxLm5hbWUgIT09IHZhbDIubmFtZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0FycmF5QnVmZmVyVmlldyh2YWwxKSkge1xuICAgIGlmICghc3RyaWN0ICYmIChpc0Zsb2F0MzJBcnJheSh2YWwxKSB8fCBpc0Zsb2F0NjRBcnJheSh2YWwxKSkpIHtcbiAgICAgIGlmICghYXJlU2ltaWxhckZsb2F0QXJyYXlzKHZhbDEsIHZhbDIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFhcmVTaW1pbGFyVHlwZWRBcnJheXModmFsMSwgdmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IC8vIEJ1ZmZlci5jb21wYXJlIHJldHVybnMgdHJ1ZSwgc28gdmFsMS5sZW5ndGggPT09IHZhbDIubGVuZ3RoLiBJZiB0aGV5IGJvdGhcbiAgICAvLyBvbmx5IGNvbnRhaW4gbnVtZXJpYyBrZXlzLCB3ZSBkb24ndCBuZWVkIHRvIGV4YW0gZnVydGhlciB0aGFuIGNoZWNraW5nXG4gICAgLy8gdGhlIHN5bWJvbHMuXG5cblxuICAgIHZhciBfa2V5cyA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwxLCBPTkxZX0VOVU1FUkFCTEUpO1xuXG4gICAgdmFyIF9rZXlzMiA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwyLCBPTkxZX0VOVU1FUkFCTEUpO1xuXG4gICAgaWYgKF9rZXlzLmxlbmd0aCAhPT0gX2tleXMyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrTm9JdGVyYXRvciwgX2tleXMpO1xuICB9IGVsc2UgaWYgKGlzU2V0KHZhbDEpKSB7XG4gICAgaWYgKCFpc1NldCh2YWwyKSB8fCB2YWwxLnNpemUgIT09IHZhbDIuc2l6ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNTZXQpO1xuICB9IGVsc2UgaWYgKGlzTWFwKHZhbDEpKSB7XG4gICAgaWYgKCFpc01hcCh2YWwyKSB8fCB2YWwxLnNpemUgIT09IHZhbDIuc2l6ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrSXNNYXApO1xuICB9IGVsc2UgaWYgKGlzQW55QXJyYXlCdWZmZXIodmFsMSkpIHtcbiAgICBpZiAoIWFyZUVxdWFsQXJyYXlCdWZmZXJzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQm94ZWRQcmltaXRpdmUodmFsMSkgJiYgIWlzRXF1YWxCb3hlZFByaW1pdGl2ZSh2YWwxLCB2YWwyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrTm9JdGVyYXRvcik7XG59XG5cbmZ1bmN0aW9uIGdldEVudW1lcmFibGVzKHZhbCwga2V5cykge1xuICByZXR1cm4ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gcHJvcGVydHlJc0VudW1lcmFibGUodmFsLCBrKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGl0ZXJhdGlvblR5cGUsIGFLZXlzKSB7XG4gIC8vIEZvciBhbGwgcmVtYWluaW5nIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5LCBvYmplY3RzIGFuZCBNYXBzLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5IGhhdmluZzpcbiAgLy8gYSkgVGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIGVudW1lcmFibGUgcHJvcGVydGllc1xuICAvLyBiKSBUaGUgc2FtZSBzZXQgb2Yga2V5cy9pbmRleGVzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpXG4gIC8vIGMpIEVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleS9pbmRleFxuICAvLyBkKSBGb3IgU2V0cyBhbmQgTWFwcywgZXF1YWwgY29udGVudHNcbiAgLy8gTm90ZTogdGhpcyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDUpIHtcbiAgICBhS2V5cyA9IE9iamVjdC5rZXlzKHZhbDEpO1xuICAgIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKHZhbDIpOyAvLyBUaGUgcGFpciBtdXN0IGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMuXG5cbiAgICBpZiAoYUtleXMubGVuZ3RoICE9PSBiS2V5cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gLy8gQ2hlYXAga2V5IHRlc3RcblxuXG4gIHZhciBpID0gMDtcblxuICBmb3IgKDsgaSA8IGFLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2YWwyLCBhS2V5c1tpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RyaWN0ICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDUpIHtcbiAgICB2YXIgc3ltYm9sS2V5c0EgPSBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsMSk7XG5cbiAgICBpZiAoc3ltYm9sS2V5c0EubGVuZ3RoICE9PSAwKSB7XG4gICAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgc3ltYm9sS2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGtleSA9IHN5bWJvbEtleXNBW2ldO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwxLCBrZXkpKSB7XG4gICAgICAgICAgaWYgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwyLCBrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYUtleXMucHVzaChrZXkpO1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHlJc0VudW1lcmFibGUodmFsMiwga2V5KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc3ltYm9sS2V5c0IgPSBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsMik7XG5cbiAgICAgIGlmIChzeW1ib2xLZXlzQS5sZW5ndGggIT09IHN5bWJvbEtleXNCLmxlbmd0aCAmJiBnZXRFbnVtZXJhYmxlcyh2YWwyLCBzeW1ib2xLZXlzQikubGVuZ3RoICE9PSBjb3VudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfc3ltYm9sS2V5c0IgPSBvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHModmFsMik7XG5cbiAgICAgIGlmIChfc3ltYm9sS2V5c0IubGVuZ3RoICE9PSAwICYmIGdldEVudW1lcmFibGVzKHZhbDIsIF9zeW1ib2xLZXlzQikubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYUtleXMubGVuZ3RoID09PSAwICYmIChpdGVyYXRpb25UeXBlID09PSBrTm9JdGVyYXRvciB8fCBpdGVyYXRpb25UeXBlID09PSBrSXNBcnJheSAmJiB2YWwxLmxlbmd0aCA9PT0gMCB8fCB2YWwxLnNpemUgPT09IDApKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gVXNlIG1lbW9zIHRvIGhhbmRsZSBjeWNsZXMuXG5cblxuICBpZiAobWVtb3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG1lbW9zID0ge1xuICAgICAgdmFsMTogbmV3IE1hcCgpLFxuICAgICAgdmFsMjogbmV3IE1hcCgpLFxuICAgICAgcG9zaXRpb246IDBcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIFdlIHByZXZlbnQgdXAgdG8gdHdvIG1hcC5oYXMoeCkgY2FsbHMgYnkgZGlyZWN0bHkgcmV0cmlldmluZyB0aGUgdmFsdWVcbiAgICAvLyBhbmQgY2hlY2tpbmcgZm9yIHVuZGVmaW5lZC4gVGhlIG1hcCBjYW4gb25seSBjb250YWluIG51bWJlcnMsIHNvIGl0IGlzXG4gICAgLy8gc2FmZSB0byBjaGVjayBmb3IgdW5kZWZpbmVkIG9ubHkuXG4gICAgdmFyIHZhbDJNZW1vQSA9IG1lbW9zLnZhbDEuZ2V0KHZhbDEpO1xuXG4gICAgaWYgKHZhbDJNZW1vQSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgdmFsMk1lbW9CID0gbWVtb3MudmFsMi5nZXQodmFsMik7XG5cbiAgICAgIGlmICh2YWwyTWVtb0IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdmFsMk1lbW9BID09PSB2YWwyTWVtb0I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb3MucG9zaXRpb24rKztcbiAgfVxuXG4gIG1lbW9zLnZhbDEuc2V0KHZhbDEsIG1lbW9zLnBvc2l0aW9uKTtcbiAgbWVtb3MudmFsMi5zZXQodmFsMiwgbWVtb3MucG9zaXRpb24pO1xuICB2YXIgYXJlRXEgPSBvYmpFcXVpdih2YWwxLCB2YWwyLCBzdHJpY3QsIGFLZXlzLCBtZW1vcywgaXRlcmF0aW9uVHlwZSk7XG4gIG1lbW9zLnZhbDEuZGVsZXRlKHZhbDEpO1xuICBtZW1vcy52YWwyLmRlbGV0ZSh2YWwyKTtcbiAgcmV0dXJuIGFyZUVxO1xufVxuXG5mdW5jdGlvbiBzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCB2YWwxLCBzdHJpY3QsIG1lbW8pIHtcbiAgLy8gR28gbG9va2luZy5cbiAgdmFyIHNldFZhbHVlcyA9IGFycmF5RnJvbVNldChzZXQpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0VmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbDIgPSBzZXRWYWx1ZXNbaV07XG5cbiAgICBpZiAoaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBtYXRjaGluZyBlbGVtZW50IHRvIG1ha2Ugc3VyZSB3ZSBkbyBub3QgY2hlY2sgdGhhdCBhZ2Fpbi5cbiAgICAgIHNldC5kZWxldGUodmFsMik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59IC8vIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L0VxdWFsaXR5X2NvbXBhcmlzb25zX2FuZF9zYW1lbmVzcyNMb29zZV9lcXVhbGl0eV91c2luZ1xuLy8gU2FkbHkgaXQgaXMgbm90IHBvc3NpYmxlIHRvIGRldGVjdCBjb3JyZXNwb25kaW5nIHZhbHVlcyBwcm9wZXJseSBpbiBjYXNlIHRoZVxuLy8gdHlwZSBpcyBhIHN0cmluZywgbnVtYmVyLCBiaWdpbnQgb3IgYm9vbGVhbi4gVGhlIHJlYXNvbiBpcyB0aGF0IHRob3NlIHZhbHVlc1xuLy8gY2FuIG1hdGNoIGxvdHMgb2YgZGlmZmVyZW50IHN0cmluZyB2YWx1ZXMgKGUuZy4sIDFuID09ICcrMDAwMDEnKS5cblxuXG5mdW5jdGlvbiBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSkge1xuICBzd2l0Y2ggKF90eXBlb2YocHJpbSkpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgLy8gT25seSBwYXNzIGluIG51bGwgYXMgb2JqZWN0IVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcHJpbSA9ICtwcmltO1xuICAgIC8vIExvb3NlIGVxdWFsIGVudHJpZXMgZXhpc3Qgb25seSBpZiB0aGUgc3RyaW5nIGlzIHBvc3NpYmxlIHRvIGNvbnZlcnQgdG9cbiAgICAvLyBhIHJlZ3VsYXIgbnVtYmVyIGFuZCBub3QgTmFOLlxuICAgIC8vIEZhbGwgdGhyb3VnaFxuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGlmIChudW1iZXJJc05hTihwcmltKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBzZXRNaWdodEhhdmVMb29zZVByaW0oYSwgYiwgcHJpbSkge1xuICB2YXIgYWx0VmFsdWUgPSBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSk7XG4gIGlmIChhbHRWYWx1ZSAhPSBudWxsKSByZXR1cm4gYWx0VmFsdWU7XG4gIHJldHVybiBiLmhhcyhhbHRWYWx1ZSkgJiYgIWEuaGFzKGFsdFZhbHVlKTtcbn1cblxuZnVuY3Rpb24gbWFwTWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHByaW0sIGl0ZW0sIG1lbW8pIHtcbiAgdmFyIGFsdFZhbHVlID0gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pO1xuXG4gIGlmIChhbHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGFsdFZhbHVlO1xuICB9XG5cbiAgdmFyIGN1ckIgPSBiLmdldChhbHRWYWx1ZSk7XG5cbiAgaWYgKGN1ckIgPT09IHVuZGVmaW5lZCAmJiAhYi5oYXMoYWx0VmFsdWUpIHx8ICFpbm5lckRlZXBFcXVhbChpdGVtLCBjdXJCLCBmYWxzZSwgbWVtbykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gIWEuaGFzKGFsdFZhbHVlKSAmJiBpbm5lckRlZXBFcXVhbChpdGVtLCBjdXJCLCBmYWxzZSwgbWVtbyk7XG59XG5cbmZ1bmN0aW9uIHNldEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtbykge1xuICAvLyBUaGlzIGlzIGEgbGF6aWx5IGluaXRpYXRlZCBTZXQgb2YgZW50cmllcyB3aGljaCBoYXZlIHRvIGJlIGNvbXBhcmVkXG4gIC8vIHBhaXJ3aXNlLlxuICB2YXIgc2V0ID0gbnVsbDtcbiAgdmFyIGFWYWx1ZXMgPSBhcnJheUZyb21TZXQoYSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbCA9IGFWYWx1ZXNbaV07IC8vIE5vdGU6IENoZWNraW5nIGZvciB0aGUgb2JqZWN0cyBmaXJzdCBpbXByb3ZlcyB0aGUgcGVyZm9ybWFuY2UgZm9yIG9iamVjdFxuICAgIC8vIGhlYXZ5IHNldHMgYnV0IGl0IGlzIGEgbWlub3Igc2xvdyBkb3duIGZvciBwcmltaXRpdmVzLiBBcyB0aGV5IGFyZSBmYXN0XG4gICAgLy8gdG8gY2hlY2sgdGhpcyBpbXByb3ZlcyB0aGUgd29yc3QgY2FzZSBzY2VuYXJpbyBpbnN0ZWFkLlxuXG4gICAgaWYgKF90eXBlb2YodmFsKSA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH0gLy8gSWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBkb2Vzbid0IGV4aXN0IGluIHRoZSBzZWNvbmQgc2V0IGl0cyBhbiBub3QgbnVsbFxuICAgICAgLy8gb2JqZWN0IChvciBub24gc3RyaWN0IG9ubHk6IGEgbm90IG1hdGNoaW5nIHByaW1pdGl2ZSkgd2UnbGwgbmVlZCB0byBnb1xuICAgICAgLy8gaHVudGluZyBmb3Igc29tZXRoaW5nIHRoYXRzIGRlZXAtKHN0cmljdC0pZXF1YWwgdG8gaXQuIFRvIG1ha2UgdGhpc1xuICAgICAgLy8gTyhuIGxvZyBuKSBjb21wbGV4aXR5IHdlIGhhdmUgdG8gY29weSB0aGVzZSB2YWx1ZXMgaW4gYSBuZXcgc2V0IGZpcnN0LlxuXG5cbiAgICAgIHNldC5hZGQodmFsKTtcbiAgICB9IGVsc2UgaWYgKCFiLmhhcyh2YWwpKSB7XG4gICAgICBpZiAoc3RyaWN0KSByZXR1cm4gZmFsc2U7IC8vIEZhc3QgcGF0aCB0byBkZXRlY3QgbWlzc2luZyBzdHJpbmcsIHN5bWJvbCwgdW5kZWZpbmVkIGFuZCBudWxsIHZhbHVlcy5cblxuICAgICAgaWYgKCFzZXRNaWdodEhhdmVMb29zZVByaW0oYSwgYiwgdmFsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgfVxuXG4gICAgICBzZXQuYWRkKHZhbCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNldCAhPT0gbnVsbCkge1xuICAgIHZhciBiVmFsdWVzID0gYXJyYXlGcm9tU2V0KGIpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGJWYWx1ZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX3ZhbCA9IGJWYWx1ZXNbX2ldOyAvLyBXZSBoYXZlIHRvIGNoZWNrIGlmIGEgcHJpbWl0aXZlIHZhbHVlIGlzIGFscmVhZHlcbiAgICAgIC8vIG1hdGNoaW5nIGFuZCBvbmx5IGlmIGl0J3Mgbm90LCBnbyBodW50aW5nIGZvciBpdC5cblxuICAgICAgaWYgKF90eXBlb2YoX3ZhbCkgPT09ICdvYmplY3QnICYmIF92YWwgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKCFzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCBfdmFsLCBzdHJpY3QsIG1lbW8pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgIWEuaGFzKF92YWwpICYmICFzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCBfdmFsLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2V0LnNpemUgPT09IDA7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gbWFwSGFzRXF1YWxFbnRyeShzZXQsIG1hcCwga2V5MSwgaXRlbTEsIHN0cmljdCwgbWVtbykge1xuICAvLyBUbyBiZSBhYmxlIHRvIGhhbmRsZSBjYXNlcyBsaWtlOlxuICAvLyAgIE1hcChbW3t9LCAnYSddLCBbe30sICdiJ11dKSB2cyBNYXAoW1t7fSwgJ2InXSwgW3t9LCAnYSddXSlcbiAgLy8gLi4uIHdlIG5lZWQgdG8gY29uc2lkZXIgKmFsbCogbWF0Y2hpbmcga2V5cywgbm90IGp1c3QgdGhlIGZpcnN0IHdlIGZpbmQuXG4gIHZhciBzZXRWYWx1ZXMgPSBhcnJheUZyb21TZXQoc2V0KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNldFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkyID0gc2V0VmFsdWVzW2ldO1xuXG4gICAgaWYgKGlubmVyRGVlcEVxdWFsKGtleTEsIGtleTIsIHN0cmljdCwgbWVtbykgJiYgaW5uZXJEZWVwRXF1YWwoaXRlbTEsIG1hcC5nZXQoa2V5MiksIHN0cmljdCwgbWVtbykpIHtcbiAgICAgIHNldC5kZWxldGUoa2V5Mik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG1hcEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtbykge1xuICB2YXIgc2V0ID0gbnVsbDtcbiAgdmFyIGFFbnRyaWVzID0gYXJyYXlGcm9tTWFwKGEpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYUVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX2FFbnRyaWVzJGkgPSBfc2xpY2VkVG9BcnJheShhRW50cmllc1tpXSwgMiksXG4gICAgICAgIGtleSA9IF9hRW50cmllcyRpWzBdLFxuICAgICAgICBpdGVtMSA9IF9hRW50cmllcyRpWzFdO1xuXG4gICAgaWYgKF90eXBlb2Yoa2V5KSA9PT0gJ29iamVjdCcgJiYga2V5ICE9PSBudWxsKSB7XG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH1cblxuICAgICAgc2V0LmFkZChrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCeSBkaXJlY3RseSByZXRyaWV2aW5nIHRoZSB2YWx1ZSB3ZSBwcmV2ZW50IGFub3RoZXIgYi5oYXMoa2V5KSBjaGVjayBpblxuICAgICAgLy8gYWxtb3N0IGFsbCBwb3NzaWJsZSBjYXNlcy5cbiAgICAgIHZhciBpdGVtMiA9IGIuZ2V0KGtleSk7XG5cbiAgICAgIGlmIChpdGVtMiA9PT0gdW5kZWZpbmVkICYmICFiLmhhcyhrZXkpIHx8ICFpbm5lckRlZXBFcXVhbChpdGVtMSwgaXRlbTIsIHN0cmljdCwgbWVtbykpIHtcbiAgICAgICAgaWYgKHN0cmljdCkgcmV0dXJuIGZhbHNlOyAvLyBGYXN0IHBhdGggdG8gZGV0ZWN0IG1pc3Npbmcgc3RyaW5nLCBzeW1ib2wsIHVuZGVmaW5lZCBhbmQgbnVsbFxuICAgICAgICAvLyBrZXlzLlxuXG4gICAgICAgIGlmICghbWFwTWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIGtleSwgaXRlbTEsIG1lbW8pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldC5hZGQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc2V0ICE9PSBudWxsKSB7XG4gICAgdmFyIGJFbnRyaWVzID0gYXJyYXlGcm9tTWFwKGIpO1xuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgYkVudHJpZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIF9iRW50cmllcyRfaSA9IF9zbGljZWRUb0FycmF5KGJFbnRyaWVzW19pMl0sIDIpLFxuICAgICAgICAgIGtleSA9IF9iRW50cmllcyRfaVswXSxcbiAgICAgICAgICBpdGVtID0gX2JFbnRyaWVzJF9pWzFdO1xuXG4gICAgICBpZiAoX3R5cGVvZihrZXkpID09PSAnb2JqZWN0JyAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKCFtYXBIYXNFcXVhbEVudHJ5KHNldCwgYSwga2V5LCBpdGVtLCBzdHJpY3QsIG1lbW8pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgKCFhLmhhcyhrZXkpIHx8ICFpbm5lckRlZXBFcXVhbChhLmdldChrZXkpLCBpdGVtLCBmYWxzZSwgbWVtbykpICYmICFtYXBIYXNFcXVhbEVudHJ5KHNldCwgYSwga2V5LCBpdGVtLCBmYWxzZSwgbWVtbykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXQuc2l6ZSA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBzdHJpY3QsIGtleXMsIG1lbW9zLCBpdGVyYXRpb25UeXBlKSB7XG4gIC8vIFNldHMgYW5kIG1hcHMgZG9uJ3QgaGF2ZSB0aGVpciBlbnRyaWVzIGFjY2Vzc2libGUgdmlhIG5vcm1hbCBvYmplY3RcbiAgLy8gcHJvcGVydGllcy5cbiAgdmFyIGkgPSAwO1xuXG4gIGlmIChpdGVyYXRpb25UeXBlID09PSBrSXNTZXQpIHtcbiAgICBpZiAoIXNldEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGl0ZXJhdGlvblR5cGUgPT09IGtJc01hcCkge1xuICAgIGlmICghbWFwRXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXRlcmF0aW9uVHlwZSA9PT0ga0lzQXJyYXkpIHtcbiAgICBmb3IgKDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eShhLCBpKSkge1xuICAgICAgICBpZiAoIWhhc093blByb3BlcnR5KGIsIGkpIHx8ICFpbm5lckRlZXBFcXVhbChhW2ldLCBiW2ldLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShiLCBpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBcnJheSBpcyBzcGFyc2UuXG4gICAgICAgIHZhciBrZXlzQSA9IE9iamVjdC5rZXlzKGEpO1xuXG4gICAgICAgIGZvciAoOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c0FbaV07XG5cbiAgICAgICAgICBpZiAoIWhhc093blByb3BlcnR5KGIsIGtleSkgfHwgIWlubmVyRGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlzQS5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBUaGUgcGFpciBtdXN0IGhhdmUgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LlxuICAvLyBQb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0OlxuXG5cbiAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX2tleSA9IGtleXNbaV07XG5cbiAgICBpZiAoIWlubmVyRGVlcEVxdWFsKGFbX2tleV0sIGJbX2tleV0sIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRGVlcEVxdWFsKHZhbDEsIHZhbDIpIHtcbiAgcmV0dXJuIGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIGtMb29zZSk7XG59XG5cbmZ1bmN0aW9uIGlzRGVlcFN0cmljdEVxdWFsKHZhbDEsIHZhbDIpIHtcbiAgcmV0dXJuIGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIGtTdHJpY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNEZWVwRXF1YWw6IGlzRGVlcEVxdWFsLFxuICBpc0RlZXBTdHJpY3RFcXVhbDogaXNEZWVwU3RyaWN0RXF1YWxcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmlsdGVyID0gcmVxdWlyZSgnYXJyYXktZmlsdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXZhaWxhYmxlVHlwZWRBcnJheXMoKSB7XG5cdHJldHVybiBmaWx0ZXIoW1xuXHRcdCdCaWdJbnQ2NEFycmF5Jyxcblx0XHQnQmlnVWludDY0QXJyYXknLFxuXHRcdCdGbG9hdDMyQXJyYXknLFxuXHRcdCdGbG9hdDY0QXJyYXknLFxuXHRcdCdJbnQxNkFycmF5Jyxcblx0XHQnSW50MzJBcnJheScsXG5cdFx0J0ludDhBcnJheScsXG5cdFx0J1VpbnQxNkFycmF5Jyxcblx0XHQnVWludDMyQXJyYXknLFxuXHRcdCdVaW50OEFycmF5Jyxcblx0XHQnVWludDhDbGFtcGVkQXJyYXknXG5cdF0sIGZ1bmN0aW9uICh0eXBlZEFycmF5KSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBnbG9iYWxbdHlwZWRBcnJheV0gPT09ICdmdW5jdGlvbic7XG5cdH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLmF1dGgucGFzc3dvcmQpKSA6ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFyZXF1ZXN0RGF0YSkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lzQXhpb3NFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1xuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAnZGF0YSddO1xuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eScsICdwYXJhbXMnXTtcbiAgdmFyIGRlZmF1bHRUb0NvbmZpZzJLZXlzID0gW1xuICAgICdiYXNlVVJMJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsXG4gICAgJ3RpbWVvdXQnLCAndGltZW91dE1lc3NhZ2UnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJyxcbiAgICAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnZGVjb21wcmVzcycsXG4gICAgJ21heENvbnRlbnRMZW5ndGgnLCAnbWF4Qm9keUxlbmd0aCcsICdtYXhSZWRpcmVjdHMnLCAndHJhbnNwb3J0JywgJ2h0dHBBZ2VudCcsXG4gICAgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCcsICdyZXNwb25zZUVuY29kaW5nJ1xuICBdO1xuICB2YXIgZGlyZWN0TWVyZ2VLZXlzID0gWyd2YWxpZGF0ZVN0YXR1cyddO1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHV0aWxzLmZvckVhY2goZGVmYXVsdFRvQ29uZmlnMktleXMsIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKGRpcmVjdE1lcmdlS2V5cywgZnVuY3Rpb24gbWVyZ2UocHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGF4aW9zS2V5cyA9IHZhbHVlRnJvbUNvbmZpZzJLZXlzXG4gICAgLmNvbmNhdChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cylcbiAgICAuY29uY2F0KGRlZmF1bHRUb0NvbmZpZzJLZXlzKVxuICAgIC5jb25jYXQoZGlyZWN0TWVyZ2VLZXlzKTtcblxuICB2YXIgb3RoZXJLZXlzID0gT2JqZWN0XG4gICAgLmtleXMoY29uZmlnMSlcbiAgICAuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xuICAgIH0pO1xuXG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gKHR5cGVvZiBwYXlsb2FkID09PSAnb2JqZWN0JykgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdmFyIG9yaWdpblVSTDtcblxuICAgICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAodG9TdHJpbmcuY2FsbCh2YWwpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGU7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W2tleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuZnVuY3Rpb24gc3RyaXBCT00oY29udGVudCkge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkYXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHklJyk7XG52YXIgJGNhbGwgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCUnKTtcbnZhciAkcmVmbGVjdEFwcGx5ID0gR2V0SW50cmluc2ljKCclUmVmbGVjdC5hcHBseSUnLCB0cnVlKSB8fCBiaW5kLmNhbGwoJGNhbGwsICRhcHBseSk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJywgdHJ1ZSk7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmRlZmluZVByb3BlcnR5JScsIHRydWUpO1xudmFyICRtYXggPSBHZXRJbnRyaW5zaWMoJyVNYXRoLm1heCUnKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQob3JpZ2luYWxGdW5jdGlvbikge1xuXHR2YXIgZnVuYyA9ICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG5cdGlmICgkZ09QRCAmJiAkZGVmaW5lUHJvcGVydHkpIHtcblx0XHR2YXIgZGVzYyA9ICRnT1BEKGZ1bmMsICdsZW5ndGgnKTtcblx0XHRpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcblx0XHRcdC8vIG9yaWdpbmFsIGxlbmd0aCwgcGx1cyB0aGUgcmVjZWl2ZXIsIG1pbnVzIGFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyAoYWZ0ZXIgdGhlIHJlY2VpdmVyKVxuXHRcdFx0JGRlZmluZVByb3BlcnR5KFxuXHRcdFx0XHRmdW5jLFxuXHRcdFx0XHQnbGVuZ3RoJyxcblx0XHRcdFx0eyB2YWx1ZTogMSArICRtYXgoMCwgb3JpZ2luYWxGdW5jdGlvbi5sZW5ndGggLSAoYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB9XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuYztcbn07XG5cbnZhciBhcHBseUJpbmQgPSBmdW5jdGlvbiBhcHBseUJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRhcHBseSwgYXJndW1lbnRzKTtcbn07XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0JGRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnYXBwbHknLCB7IHZhbHVlOiBhcHBseUJpbmQgfSk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cy5hcHBseSA9IGFwcGx5QmluZDtcbn1cbiIsIi8qZ2xvYmFsIHdpbmRvdywgZ2xvYmFsKi9cbnZhciB1dGlsID0gcmVxdWlyZShcInV0aWxcIilcbnZhciBhc3NlcnQgPSByZXF1aXJlKFwiYXNzZXJ0XCIpXG5mdW5jdGlvbiBub3coKSB7IHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSB9XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxudmFyIGNvbnNvbGVcbnZhciB0aW1lcyA9IHt9XG5cbmlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jb25zb2xlKSB7XG4gICAgY29uc29sZSA9IGdsb2JhbC5jb25zb2xlXG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmNvbnNvbGUpIHtcbiAgICBjb25zb2xlID0gd2luZG93LmNvbnNvbGVcbn0gZWxzZSB7XG4gICAgY29uc29sZSA9IHt9XG59XG5cbnZhciBmdW5jdGlvbnMgPSBbXG4gICAgW2xvZywgXCJsb2dcIl0sXG4gICAgW2luZm8sIFwiaW5mb1wiXSxcbiAgICBbd2FybiwgXCJ3YXJuXCJdLFxuICAgIFtlcnJvciwgXCJlcnJvclwiXSxcbiAgICBbdGltZSwgXCJ0aW1lXCJdLFxuICAgIFt0aW1lRW5kLCBcInRpbWVFbmRcIl0sXG4gICAgW3RyYWNlLCBcInRyYWNlXCJdLFxuICAgIFtkaXIsIFwiZGlyXCJdLFxuICAgIFtjb25zb2xlQXNzZXJ0LCBcImFzc2VydFwiXVxuXVxuXG5mb3IgKHZhciBpID0gMDsgaSA8IGZ1bmN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0dXBsZSA9IGZ1bmN0aW9uc1tpXVxuICAgIHZhciBmID0gdHVwbGVbMF1cbiAgICB2YXIgbmFtZSA9IHR1cGxlWzFdXG5cbiAgICBpZiAoIWNvbnNvbGVbbmFtZV0pIHtcbiAgICAgICAgY29uc29sZVtuYW1lXSA9IGZcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29uc29sZVxuXG5mdW5jdGlvbiBsb2coKSB7fVxuXG5mdW5jdGlvbiBpbmZvKCkge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gd2FybigpIHtcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG59XG5cbmZ1bmN0aW9uIGVycm9yKCkge1xuICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG59XG5cbmZ1bmN0aW9uIHRpbWUobGFiZWwpIHtcbiAgICB0aW1lc1tsYWJlbF0gPSBub3coKVxufVxuXG5mdW5jdGlvbiB0aW1lRW5kKGxhYmVsKSB7XG4gICAgdmFyIHRpbWUgPSB0aW1lc1tsYWJlbF1cbiAgICBpZiAoIXRpbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VjaCBsYWJlbDogXCIgKyBsYWJlbClcbiAgICB9XG5cbiAgICBkZWxldGUgdGltZXNbbGFiZWxdXG4gICAgdmFyIGR1cmF0aW9uID0gbm93KCkgLSB0aW1lXG4gICAgY29uc29sZS5sb2cobGFiZWwgKyBcIjogXCIgKyBkdXJhdGlvbiArIFwibXNcIilcbn1cblxuZnVuY3Rpb24gdHJhY2UoKSB7XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcigpXG4gICAgZXJyLm5hbWUgPSBcIlRyYWNlXCJcbiAgICBlcnIubWVzc2FnZSA9IHV0aWwuZm9ybWF0LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjaylcbn1cblxuZnVuY3Rpb24gZGlyKG9iamVjdCkge1xuICAgIGNvbnNvbGUubG9nKHV0aWwuaW5zcGVjdChvYmplY3QpICsgXCJcXG5cIilcbn1cblxuZnVuY3Rpb24gY29uc29sZUFzc2VydChleHByZXNzaW9uKSB7XG4gICAgaWYgKCFleHByZXNzaW9uKSB7XG4gICAgICAgIHZhciBhcnIgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICAgICAgYXNzZXJ0Lm9rKGZhbHNlLCB1dGlsLmZvcm1hdC5hcHBseShudWxsLCBhcnIpKVxuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSByZXF1aXJlKCdvYmplY3Qta2V5cycpO1xudmFyIGhhc1N5bWJvbHMgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2woJ2ZvbycpID09PSAnc3ltYm9sJztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xudmFyIG9yaWdEZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4pIHtcblx0cmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnZhciBhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgb2JqID0ge307XG5cdHRyeSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iaiwgJ3gnLCB7IGVudW1lcmFibGU6IGZhbHNlLCB2YWx1ZTogb2JqIH0pO1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFycywgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0XHRmb3IgKHZhciBfIGluIG9iaikgeyAvLyBqc2NzOmlnbm9yZSBkaXNhbGxvd1VudXNlZFZhcmlhYmxlc1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gb2JqLnggPT09IG9iajtcblx0fSBjYXRjaCAoZSkgeyAvKiB0aGlzIGlzIElFIDguICovXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHN1cHBvcnRzRGVzY3JpcHRvcnMgPSBvcmlnRGVmaW5lUHJvcGVydHkgJiYgYXJlUHJvcGVydHlEZXNjcmlwdG9yc1N1cHBvcnRlZCgpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lLCB2YWx1ZSwgcHJlZGljYXRlKSB7XG5cdGlmIChuYW1lIGluIG9iamVjdCAmJiAoIWlzRnVuY3Rpb24ocHJlZGljYXRlKSB8fCAhcHJlZGljYXRlKCkpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGlmIChzdXBwb3J0c0Rlc2NyaXB0b3JzKSB7XG5cdFx0b3JpZ0RlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdG9iamVjdFtuYW1lXSA9IHZhbHVlO1xuXHR9XG59O1xuXG52YXIgZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmplY3QsIG1hcCkge1xuXHR2YXIgcHJlZGljYXRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDoge307XG5cdHZhciBwcm9wcyA9IGtleXMobWFwKTtcblx0aWYgKGhhc1N5bWJvbHMpIHtcblx0XHRwcm9wcyA9IGNvbmNhdC5jYWxsKHByb3BzLCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG1hcCkpO1xuXHR9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BzW2ldLCBtYXBbcHJvcHNbaV1dLCBwcmVkaWNhdGVzW3Byb3BzW2ldXSk7XG5cdH1cbn07XG5cbmRlZmluZVByb3BlcnRpZXMuc3VwcG9ydHNEZXNjcmlwdG9ycyA9ICEhc3VwcG9ydHNEZXNjcmlwdG9ycztcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0aWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgJGdPUEQgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJScpO1xuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoW10sICdsZW5ndGgnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGdPUERcblx0XHQkZ09QRCA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSAkZ09QRDtcbiIsIi8qKlxuICogQ29kZSByZWZhY3RvcmVkIGZyb20gTW96aWxsYSBEZXZlbG9wZXIgTmV0d29yazpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIGZpcnN0U291cmNlKSB7XG4gIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3QnKTtcbiAgfVxuXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgIGlmIChuZXh0U291cmNlID09PSB1bmRlZmluZWQgfHwgbmV4dFNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGtleXNBcnJheSA9IE9iamVjdC5rZXlzKE9iamVjdChuZXh0U291cmNlKSk7XG4gICAgZm9yICh2YXIgbmV4dEluZGV4ID0gMCwgbGVuID0ga2V5c0FycmF5Lmxlbmd0aDsgbmV4dEluZGV4IDwgbGVuOyBuZXh0SW5kZXgrKykge1xuICAgICAgdmFyIG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuZXh0U291cmNlLCBuZXh0S2V5KTtcbiAgICAgIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvO1xufVxuXG5mdW5jdGlvbiBwb2x5ZmlsbCgpIHtcbiAgaWYgKCFPYmplY3QuYXNzaWduKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgJ2Fzc2lnbicsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogYXNzaWduXG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzc2lnbjogYXNzaWduLFxuICBwb2x5ZmlsbDogcG9seWZpbGxcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwiXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9yRWFjaCAob2JqLCBmbiwgY3R4KSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwoZm4pICE9PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgbCA9IG9iai5sZW5ndGg7XG4gICAgaWYgKGwgPT09ICtsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBmbi5jYWxsKGN0eCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChvYmosIGspKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjdHgsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyA/IHNlbGYuRm9ybURhdGEgOiB3aW5kb3cuRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBuby1pbnZhbGlkLXRoaXM6IDEgKi9cblxudmFyIEVSUk9SX01FU1NBR0UgPSAnRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgY2FsbGVkIG9uIGluY29tcGF0aWJsZSAnO1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmdW5jVHlwZSA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZCh0aGF0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicgfHwgdG9TdHIuY2FsbCh0YXJnZXQpICE9PSBmdW5jVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEVSUk9SX01FU1NBR0UgKyB0YXJnZXQpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIHZhciBib3VuZDtcbiAgICB2YXIgYmluZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChPYmplY3QocmVzdWx0KSA9PT0gcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGF0LFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJvdW5kTGVuZ3RoID0gTWF0aC5tYXgoMCwgdGFyZ2V0Lmxlbmd0aCAtIGFyZ3MubGVuZ3RoKTtcbiAgICB2YXIgYm91bmRBcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3VuZExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvdW5kQXJncy5wdXNoKCckJyArIGkpO1xuICAgIH1cblxuICAgIGJvdW5kID0gRnVuY3Rpb24oJ2JpbmRlcicsICdyZXR1cm4gZnVuY3Rpb24gKCcgKyBib3VuZEFyZ3Muam9pbignLCcpICsgJyl7IHJldHVybiBiaW5kZXIuYXBwbHkodGhpcyxhcmd1bWVudHMpOyB9JykoYmluZGVyKTtcblxuICAgIGlmICh0YXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgIHZhciBFbXB0eSA9IGZ1bmN0aW9uIEVtcHR5KCkge307XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IHRhcmdldC5wcm90b3R5cGU7XG4gICAgICAgIGJvdW5kLnByb3RvdHlwZSA9IG5ldyBFbXB0eSgpO1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBib3VuZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBpbXBsZW1lbnRhdGlvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVuZGVmaW5lZDtcblxudmFyICRTeW50YXhFcnJvciA9IFN5bnRheEVycm9yO1xudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxudmFyIGdldEV2YWxsZWRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uU3ludGF4KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuICRGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdHRocm93IG5ldyAkVHlwZUVycm9yKCk7XG59O1xudmFyIFRocm93VHlwZUVycm9yID0gJGdPUERcblx0PyAoZnVuY3Rpb24gKCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1jYWxsZXIsIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuXHRcdFx0YXJndW1lbnRzLmNhbGxlZTsgLy8gSUUgOCBkb2VzIG5vdCB0aHJvdyBoZXJlXG5cdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0fSBjYXRjaCAoY2FsbGVlVGhyb3dzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJRSA4IHRocm93cyBvbiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFyZ3VtZW50cywgJycpXG5cdFx0XHRcdHJldHVybiAkZ09QRChhcmd1bWVudHMsICdjYWxsZWUnKS5nZXQ7XG5cdFx0XHR9IGNhdGNoIChnT1BEdGhyb3dzKSB7XG5cdFx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH0oKSlcblx0OiB0aHJvd1R5cGVFcnJvcjtcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5fX3Byb3RvX187IH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxudmFyIG5lZWRzRXZhbCA9IHt9O1xuXG52YXIgVHlwZWRBcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKFVpbnQ4QXJyYXkpO1xuXG52YXIgSU5UUklOU0lDUyA9IHtcblx0JyVBZ2dyZWdhdGVFcnJvciUnOiB0eXBlb2YgQWdncmVnYXRlRXJyb3IgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQWdncmVnYXRlRXJyb3IsXG5cdCclQXJyYXklJzogQXJyYXksXG5cdCclQXJyYXlCdWZmZXIlJzogdHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFycmF5QnVmZmVyLFxuXHQnJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGcm9tU3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Z1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBuZWVkc0V2YWwsXG5cdCclQXRvbWljcyUnOiB0eXBlb2YgQXRvbWljcyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBdG9taWNzLFxuXHQnJUJpZ0ludCUnOiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ0ludCxcblx0JyVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGUlJzogRGF0ZSxcblx0JyVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCclZW5jb2RlVVJJJSc6IGVuY29kZVVSSSxcblx0JyVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJUVycm9yJSc6IEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6IE9iamVjdCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbnZhciBkb0V2YWwgPSBmdW5jdGlvbiBkb0V2YWwobmFtZSkge1xuXHR2YXIgdmFsdWU7XG5cdGlmIChuYW1lID09PSAnJUFzeW5jRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yJScpIHtcblx0XHR2YXIgZm4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpO1xuXHRcdGlmIChmbikge1xuXHRcdFx0dmFsdWUgPSBmbi5wcm90b3R5cGU7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnKSB7XG5cdFx0dmFyIGdlbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yJScpO1xuXHRcdGlmIChnZW4pIHtcblx0XHRcdHZhbHVlID0gZ2V0UHJvdG8oZ2VuLnByb3RvdHlwZSk7XG5cdFx0fVxuXHR9XG5cblx0SU5UUklOU0lDU1tuYW1lXSA9IHZhbHVlO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBMRUdBQ1lfQUxJQVNFUyA9IHtcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXMnKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIEFycmF5LnByb3RvdHlwZS5jb25jYXQpO1xudmFyICRzcGxpY2VBcHBseSA9IGJpbmQuY2FsbChGdW5jdGlvbi5hcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciAkc3RyU2xpY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5zbGljZSk7XG5cbi8qIGFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iLzQuMTcuMTUvZGlzdC9sb2Rhc2guanMjTDY3MzUtTDY3NDQgKi9cbnZhciByZVByb3BOYW1lID0gL1teJS5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwlJCkpL2c7XG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7IC8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IGZ1bmN0aW9uIHN0cmluZ1RvUGF0aChzdHJpbmcpIHtcblx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHN0cmluZywgMCwgMSk7XG5cdHZhciBsYXN0ID0gJHN0clNsaWNlKHN0cmluZywgLTEpO1xuXHRpZiAoZmlyc3QgPT09ICclJyAmJiBsYXN0ICE9PSAnJScpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnZhbGlkIGludHJpbnNpYyBzeW50YXgsIGV4cGVjdGVkIGNsb3NpbmcgYCVgJyk7XG5cdH0gZWxzZSBpZiAobGFzdCA9PT0gJyUnICYmIGZpcnN0ICE9PSAnJScpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnZhbGlkIGludHJpbnNpYyBzeW50YXgsIGV4cGVjdGVkIG9wZW5pbmcgYCVgJyk7XG5cdH1cblx0dmFyIHJlc3VsdCA9IFtdO1xuXHQkcmVwbGFjZShzdHJpbmcsIHJlUHJvcE5hbWUsIGZ1bmN0aW9uIChtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG5cdFx0cmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gcXVvdGUgPyAkcmVwbGFjZShzdWJTdHJpbmcsIHJlRXNjYXBlQ2hhciwgJyQxJykgOiBudW1iZXIgfHwgbWF0Y2g7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcbi8qIGVuZCBhZGFwdGF0aW9uICovXG5cbnZhciBnZXRCYXNlSW50cmluc2ljID0gZnVuY3Rpb24gZ2V0QmFzZUludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0dmFyIGludHJpbnNpY05hbWUgPSBuYW1lO1xuXHR2YXIgYWxpYXM7XG5cdGlmIChoYXNPd24oTEVHQUNZX0FMSUFTRVMsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0YWxpYXMgPSBMRUdBQ1lfQUxJQVNFU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpbnRyaW5zaWNOYW1lID0gJyUnICsgYWxpYXNbMF0gKyAnJSc7XG5cdH1cblxuXHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0dmFyIHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpZiAodmFsdWUgPT09IG5lZWRzRXZhbCkge1xuXHRcdFx0dmFsdWUgPSBkb0V2YWwoaW50cmluc2ljTmFtZSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmICFhbGxvd01pc3NpbmcpIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIScpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRhbGlhczogYWxpYXMsXG5cdFx0XHRuYW1lOiBpbnRyaW5zaWNOYW1lLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0fVxuXG5cdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZG9lcyBub3QgZXhpc3QhJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEdldEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0eXBlb2YgYWxsb3dNaXNzaW5nICE9PSAnYm9vbGVhbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignXCJhbGxvd01pc3NpbmdcIiBhcmd1bWVudCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0dmFyIHBhcnRzID0gc3RyaW5nVG9QYXRoKG5hbWUpO1xuXHR2YXIgaW50cmluc2ljQmFzZU5hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJztcblxuXHR2YXIgaW50cmluc2ljID0gZ2V0QmFzZUludHJpbnNpYygnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJywgYWxsb3dNaXNzaW5nKTtcblx0dmFyIGludHJpbnNpY1JlYWxOYW1lID0gaW50cmluc2ljLm5hbWU7XG5cdHZhciB2YWx1ZSA9IGludHJpbnNpYy52YWx1ZTtcblx0dmFyIHNraXBGdXJ0aGVyQ2FjaGluZyA9IGZhbHNlO1xuXG5cdHZhciBhbGlhcyA9IGludHJpbnNpYy5hbGlhcztcblx0aWYgKGFsaWFzKSB7XG5cdFx0aW50cmluc2ljQmFzZU5hbWUgPSBhbGlhc1swXTtcblx0XHQkc3BsaWNlQXBwbHkocGFydHMsICRjb25jYXQoWzAsIDFdLCBhbGlhcykpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDEsIGlzT3duID0gdHJ1ZTsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIHBhcnQgPSBwYXJ0c1tpXTtcblx0XHR2YXIgZmlyc3QgPSAkc3RyU2xpY2UocGFydCwgMCwgMSk7XG5cdFx0dmFyIGxhc3QgPSAkc3RyU2xpY2UocGFydCwgLTEpO1xuXHRcdGlmIChcblx0XHRcdChcblx0XHRcdFx0KGZpcnN0ID09PSAnXCInIHx8IGZpcnN0ID09PSBcIidcIiB8fCBmaXJzdCA9PT0gJ2AnKVxuXHRcdFx0XHR8fCAobGFzdCA9PT0gJ1wiJyB8fCBsYXN0ID09PSBcIidcIiB8fCBsYXN0ID09PSAnYCcpXG5cdFx0XHQpXG5cdFx0XHQmJiBmaXJzdCAhPT0gbGFzdFxuXHRcdCkge1xuXHRcdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcigncHJvcGVydHkgbmFtZXMgd2l0aCBxdW90ZXMgbXVzdCBoYXZlIG1hdGNoaW5nIHF1b3RlcycpO1xuXHRcdH1cblx0XHRpZiAocGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhaXNPd24pIHtcblx0XHRcdHNraXBGdXJ0aGVyQ2FjaGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW50cmluc2ljQmFzZU5hbWUgKz0gJy4nICsgcGFydDtcblx0XHRpbnRyaW5zaWNSZWFsTmFtZSA9ICclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnO1xuXG5cdFx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNSZWFsTmFtZSkpIHtcblx0XHRcdHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoIShwYXJ0IGluIHZhbHVlKSkge1xuXHRcdFx0XHRpZiAoIWFsbG93TWlzc2luZykge1xuXHRcdFx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdiYXNlIGludHJpbnNpYyBmb3IgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IHRoZSBwcm9wZXJ0eSBpcyBub3QgYXZhaWxhYmxlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2b2lkIHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGlmICgkZ09QRCAmJiAoaSArIDEpID49IHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgZGVzYyA9ICRnT1BEKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0aXNPd24gPSAhIWRlc2M7XG5cblx0XHRcdFx0Ly8gQnkgY29udmVudGlvbiwgd2hlbiBhIGRhdGEgcHJvcGVydHkgaXMgY29udmVydGVkIHRvIGFuIGFjY2Vzc29yXG5cdFx0XHRcdC8vIHByb3BlcnR5IHRvIGVtdWxhdGUgYSBkYXRhIHByb3BlcnR5IHRoYXQgZG9lcyBub3Qgc3VmZmVyIGZyb21cblx0XHRcdFx0Ly8gdGhlIG92ZXJyaWRlIG1pc3Rha2UsIHRoYXQgYWNjZXNzb3IncyBnZXR0ZXIgaXMgbWFya2VkIHdpdGhcblx0XHRcdFx0Ly8gYW4gYG9yaWdpbmFsVmFsdWVgIHByb3BlcnR5LiBIZXJlLCB3aGVuIHdlIGRldGVjdCB0aGlzLCB3ZVxuXHRcdFx0XHQvLyB1cGhvbGQgdGhlIGlsbHVzaW9uIGJ5IHByZXRlbmRpbmcgdG8gc2VlIHRoYXQgb3JpZ2luYWwgZGF0YVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSwgaS5lLiwgcmV0dXJuaW5nIHRoZSB2YWx1ZSByYXRoZXIgdGhhbiB0aGUgZ2V0dGVyXG5cdFx0XHRcdC8vIGl0c2VsZi5cblx0XHRcdFx0aWYgKGlzT3duICYmICdnZXQnIGluIGRlc2MgJiYgISgnb3JpZ2luYWxWYWx1ZScgaW4gZGVzYy5nZXQpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZXNjLmdldDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpc093biA9IGhhc093bih2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc093biAmJiAhc2tpcEZ1cnRoZXJDYWNoaW5nKSB7XG5cdFx0XHRcdElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvcmlnU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sO1xudmFyIGhhc1N5bWJvbFNoYW0gPSByZXF1aXJlKCcuL3NoYW1zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzTmF0aXZlU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sKCdmb28nKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sKCdiYXInKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0cmV0dXJuIGhhc1N5bWJvbFNoYW0oKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBjb21wbGV4aXR5OiBbMiwgMThdLCBtYXgtc3RhdGVtZW50czogWzIsIDMzXSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09ICdzeW1ib2wnKSB7IHJldHVybiB0cnVlOyB9XG5cblx0dmFyIG9iaiA9IHt9O1xuXHR2YXIgc3ltID0gU3ltYm9sKCd0ZXN0Jyk7XG5cdHZhciBzeW1PYmogPSBPYmplY3Qoc3ltKTtcblx0aWYgKHR5cGVvZiBzeW0gPT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltT2JqKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9vYmplY3QuYXNzaWduL2lzc3Vlcy8xN1xuXHQvLyBpZiAoc3ltIGluc3RhbmNlb2YgU3ltYm9sKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMvaXNzdWVzLzRcblx0Ly8gaWYgKCEoc3ltT2JqIGluc3RhbmNlb2YgU3ltYm9sKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyBpZiAodHlwZW9mIFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIGlmIChTdHJpbmcoc3ltKSAhPT0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bVZhbCA9IDQyO1xuXHRvYmpbc3ltXSA9IHN5bVZhbDtcblx0Zm9yIChzeW0gaW4gb2JqKSB7IHJldHVybiBmYWxzZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby11bnJlYWNoYWJsZS1sb29wXG5cdGlmICh0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKTtcblx0aWYgKHN5bXMubGVuZ3RoICE9PSAxIHx8IHN5bXNbMF0gIT09IHN5bSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmosIHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgc3ltKTtcblx0XHRpZiAoZGVzY3JpcHRvci52YWx1ZSAhPT0gc3ltVmFsIHx8IGRlc2NyaXB0b3IuZW51bWVyYWJsZSAhPT0gdHJ1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC9jYWxsQm91bmQnKTtcblxudmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xuXG52YXIgaXNTdGFuZGFyZEFyZ3VtZW50cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdGlmIChoYXNUb1N0cmluZ1RhZyAmJiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWx1ZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gJHRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG52YXIgaXNMZWdhY3lBcmd1bWVudHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHRpZiAoaXNTdGFuZGFyZEFyZ3VtZW50cyh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiZcblx0XHR0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcicgJiZcblx0XHR2YWx1ZS5sZW5ndGggPj0gMCAmJlxuXHRcdCR0b1N0cmluZyh2YWx1ZSkgIT09ICdbb2JqZWN0IEFycmF5XScgJiZcblx0XHQkdG9TdHJpbmcodmFsdWUuY2FsbGVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cbnZhciBzdXBwb3J0c1N0YW5kYXJkQXJndW1lbnRzID0gKGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIGlzU3RhbmRhcmRBcmd1bWVudHMoYXJndW1lbnRzKTtcbn0oKSk7XG5cbmlzU3RhbmRhcmRBcmd1bWVudHMuaXNMZWdhY3lBcmd1bWVudHMgPSBpc0xlZ2FjeUFyZ3VtZW50czsgLy8gZm9yIHRlc3RzXG5cbm1vZHVsZS5leHBvcnRzID0gc3VwcG9ydHNTdGFuZGFyZEFyZ3VtZW50cyA/IGlzU3RhbmRhcmRBcmd1bWVudHMgOiBpc0xlZ2FjeUFyZ3VtZW50cztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmblRvU3RyID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGlzRm5SZWdleCA9IC9eXFxzKig/OmZ1bmN0aW9uKT9cXCovO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBnZXRHZW5lcmF0b3JGdW5jID0gZnVuY3Rpb24gKCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dHJ5IHtcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ3JldHVybiBmdW5jdGlvbiooKSB7fScpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0fVxufTtcbnZhciBnZW5lcmF0b3JGdW5jID0gZ2V0R2VuZXJhdG9yRnVuYygpO1xudmFyIEdlbmVyYXRvckZ1bmN0aW9uID0gZ2V0UHJvdG8gJiYgZ2VuZXJhdG9yRnVuYyA/IGdldFByb3RvKGdlbmVyYXRvckZ1bmMpIDogZmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNHZW5lcmF0b3JGdW5jdGlvbihmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGlmIChpc0ZuUmVnZXgudGVzdChmblRvU3RyLmNhbGwoZm4pKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHtcblx0XHR2YXIgc3RyID0gdG9TdHIuY2FsbChmbik7XG5cdFx0cmV0dXJuIHN0ciA9PT0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJztcblx0fVxuXHRyZXR1cm4gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZm4pID09PSBHZW5lcmF0b3JGdW5jdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIuaXNuYW4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc05hTih2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIHBvbHlmaWxsID0gY2FsbEJpbmQoZ2V0UG9seWZpbGwoKSwgTnVtYmVyKTtcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5kZWZpbmUocG9seWZpbGwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvbHlmaWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdGlmIChOdW1iZXIuaXNOYU4gJiYgTnVtYmVyLmlzTmFOKE5hTikgJiYgIU51bWJlci5pc05hTignYScpKSB7XG5cdFx0cmV0dXJuIE51bWJlci5pc05hTjtcblx0fVxuXHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1OdW1iZXJJc05hTigpIHtcblx0dmFyIHBvbHlmaWxsID0gZ2V0UG9seWZpbGwoKTtcblx0ZGVmaW5lKE51bWJlciwgeyBpc05hTjogcG9seWZpbGwgfSwge1xuXHRcdGlzTmFOOiBmdW5jdGlvbiB0ZXN0SXNOYU4oKSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyLmlzTmFOICE9PSBwb2x5ZmlsbDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcbnZhciBhdmFpbGFibGVUeXBlZEFycmF5cyA9IHJlcXVpcmUoJ2F2YWlsYWJsZS10eXBlZC1hcnJheXMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gaGFzU3ltYm9scyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxudmFyIHR5cGVkQXJyYXlzID0gYXZhaWxhYmxlVHlwZWRBcnJheXMoKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJvdW5kKCdBcnJheS5wcm90b3R5cGUuaW5kZXhPZicsIHRydWUpIHx8IGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIHZhbHVlKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG5cdFx0XHRyZXR1cm4gaTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIC0xO1xufTtcbnZhciAkc2xpY2UgPSBjYWxsQm91bmQoJ1N0cmluZy5wcm90b3R5cGUuc2xpY2UnKTtcbnZhciB0b1N0clRhZ3MgPSB7fTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvaGVscGVycy9nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjsgLy8gcmVxdWlyZSgnZ2V0cHJvdG90eXBlb2YnKTtcbmlmIChoYXNUb1N0cmluZ1RhZyAmJiBnT1BEICYmIGdldFByb3RvdHlwZU9mKSB7XG5cdGZvckVhY2godHlwZWRBcnJheXMsIGZ1bmN0aW9uICh0eXBlZEFycmF5KSB7XG5cdFx0dmFyIGFyciA9IG5ldyBnbG9iYWxbdHlwZWRBcnJheV0oKTtcblx0XHRpZiAoIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gYXJyKSkge1xuXHRcdFx0dGhyb3cgbmV3IEV2YWxFcnJvcigndGhpcyBlbmdpbmUgaGFzIHN1cHBvcnQgZm9yIFN5bWJvbC50b1N0cmluZ1RhZywgYnV0ICcgKyB0eXBlZEFycmF5ICsgJyBkb2VzIG5vdCBoYXZlIHRoZSBwcm9wZXJ0eSEgUGxlYXNlIHJlcG9ydCB0aGlzLicpO1xuXHRcdH1cblx0XHR2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGVPZihhcnIpO1xuXHRcdHZhciBkZXNjcmlwdG9yID0gZ09QRChwcm90bywgU3ltYm9sLnRvU3RyaW5nVGFnKTtcblx0XHRpZiAoIWRlc2NyaXB0b3IpIHtcblx0XHRcdHZhciBzdXBlclByb3RvID0gZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuXHRcdFx0ZGVzY3JpcHRvciA9IGdPUEQoc3VwZXJQcm90bywgU3ltYm9sLnRvU3RyaW5nVGFnKTtcblx0XHR9XG5cdFx0dG9TdHJUYWdzW3R5cGVkQXJyYXldID0gZGVzY3JpcHRvci5nZXQ7XG5cdH0pO1xufVxuXG52YXIgdHJ5VHlwZWRBcnJheXMgPSBmdW5jdGlvbiB0cnlBbGxUeXBlZEFycmF5cyh2YWx1ZSkge1xuXHR2YXIgYW55VHJ1ZSA9IGZhbHNlO1xuXHRmb3JFYWNoKHRvU3RyVGFncywgZnVuY3Rpb24gKGdldHRlciwgdHlwZWRBcnJheSkge1xuXHRcdGlmICghYW55VHJ1ZSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YW55VHJ1ZSA9IGdldHRlci5jYWxsKHZhbHVlKSA9PT0gdHlwZWRBcnJheTtcblx0XHRcdH0gY2F0Y2ggKGUpIHsgLyoqLyB9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGFueVRydWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuXHRpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHtcblx0XHR2YXIgdGFnID0gJHNsaWNlKCR0b1N0cmluZyh2YWx1ZSksIDgsIC0xKTtcblx0XHRyZXR1cm4gJGluZGV4T2YodHlwZWRBcnJheXMsIHRhZykgPiAtMTtcblx0fVxuXHRpZiAoIWdPUEQpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdHJldHVybiB0cnlUeXBlZEFycmF5cyh2YWx1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbnVtYmVySXNOYU4gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXMoYSwgYikge1xuXHRpZiAoYSA9PT0gMCAmJiBiID09PSAwKSB7XG5cdFx0cmV0dXJuIDEgLyBhID09PSAxIC8gYjtcblx0fVxuXHRpZiAoYSA9PT0gYikge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChudW1iZXJJc05hTihhKSAmJiBudW1iZXJJc05hTihiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCdjYWxsLWJpbmQnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIHBvbHlmaWxsID0gY2FsbEJpbmQoZ2V0UG9seWZpbGwoKSwgT2JqZWN0KTtcblxuZGVmaW5lKHBvbHlmaWxsLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb2x5ZmlsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRyZXR1cm4gdHlwZW9mIE9iamVjdC5pcyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5pcyA6IGltcGxlbWVudGF0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbU9iamVjdElzKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoT2JqZWN0LCB7IGlzOiBwb2x5ZmlsbCB9LCB7XG5cdFx0aXM6IGZ1bmN0aW9uIHRlc3RPYmplY3RJcygpIHtcblx0XHRcdHJldHVybiBPYmplY3QuaXMgIT09IHBvbHlmaWxsO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzU2hpbTtcbmlmICghT2JqZWN0LmtleXMpIHtcblx0Ly8gbW9kaWZpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW1cblx0dmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cdHZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZ2xvYmFsLXJlcXVpcmVcblx0dmFyIGlzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cdHZhciBoYXNEb250RW51bUJ1ZyA9ICFpc0VudW1lcmFibGUuY2FsbCh7IHRvU3RyaW5nOiBudWxsIH0sICd0b1N0cmluZycpO1xuXHR2YXIgaGFzUHJvdG9FbnVtQnVnID0gaXNFbnVtZXJhYmxlLmNhbGwoZnVuY3Rpb24gKCkge30sICdwcm90b3R5cGUnKTtcblx0dmFyIGRvbnRFbnVtcyA9IFtcblx0XHQndG9TdHJpbmcnLFxuXHRcdCd0b0xvY2FsZVN0cmluZycsXG5cdFx0J3ZhbHVlT2YnLFxuXHRcdCdoYXNPd25Qcm9wZXJ0eScsXG5cdFx0J2lzUHJvdG90eXBlT2YnLFxuXHRcdCdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG5cdFx0J2NvbnN0cnVjdG9yJ1xuXHRdO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUgPSBmdW5jdGlvbiAobykge1xuXHRcdHZhciBjdG9yID0gby5jb25zdHJ1Y3Rvcjtcblx0XHRyZXR1cm4gY3RvciAmJiBjdG9yLnByb3RvdHlwZSA9PT0gbztcblx0fTtcblx0dmFyIGV4Y2x1ZGVkS2V5cyA9IHtcblx0XHQkYXBwbGljYXRpb25DYWNoZTogdHJ1ZSxcblx0XHQkY29uc29sZTogdHJ1ZSxcblx0XHQkZXh0ZXJuYWw6IHRydWUsXG5cdFx0JGZyYW1lOiB0cnVlLFxuXHRcdCRmcmFtZUVsZW1lbnQ6IHRydWUsXG5cdFx0JGZyYW1lczogdHJ1ZSxcblx0XHQkaW5uZXJIZWlnaHQ6IHRydWUsXG5cdFx0JGlubmVyV2lkdGg6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmNoYW5nZTogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuZXJyb3I6IHRydWUsXG5cdFx0JG91dGVySGVpZ2h0OiB0cnVlLFxuXHRcdCRvdXRlcldpZHRoOiB0cnVlLFxuXHRcdCRwYWdlWE9mZnNldDogdHJ1ZSxcblx0XHQkcGFnZVlPZmZzZXQ6IHRydWUsXG5cdFx0JHBhcmVudDogdHJ1ZSxcblx0XHQkc2Nyb2xsTGVmdDogdHJ1ZSxcblx0XHQkc2Nyb2xsVG9wOiB0cnVlLFxuXHRcdCRzY3JvbGxYOiB0cnVlLFxuXHRcdCRzY3JvbGxZOiB0cnVlLFxuXHRcdCRzZWxmOiB0cnVlLFxuXHRcdCR3ZWJraXRJbmRleGVkREI6IHRydWUsXG5cdFx0JHdlYmtpdFN0b3JhZ2VJbmZvOiB0cnVlLFxuXHRcdCR3aW5kb3c6IHRydWVcblx0fTtcblx0dmFyIGhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1ZyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRmb3IgKHZhciBrIGluIHdpbmRvdykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKCFleGNsdWRlZEtleXNbJyQnICsga10gJiYgaGFzLmNhbGwod2luZG93LCBrKSAmJiB3aW5kb3dba10gIT09IG51bGwgJiYgdHlwZW9mIHdpbmRvd1trXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0ZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUod2luZG93W2tdKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSgpKTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0LyogZ2xvYmFsIHdpbmRvdyAqL1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnKSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGUobyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fTtcblxuXHRrZXlzU2hpbSA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG5cdFx0dmFyIGlzT2JqZWN0ID0gb2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnO1xuXHRcdHZhciBpc0Z1bmN0aW9uID0gdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHRcdHZhciBpc0FyZ3VtZW50cyA9IGlzQXJncyhvYmplY3QpO1xuXHRcdHZhciBpc1N0cmluZyA9IGlzT2JqZWN0ICYmIHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cdFx0dmFyIHRoZUtleXMgPSBbXTtcblxuXHRcdGlmICghaXNPYmplY3QgJiYgIWlzRnVuY3Rpb24gJiYgIWlzQXJndW1lbnRzKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gYSBub24tb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0dmFyIHNraXBQcm90byA9IGhhc1Byb3RvRW51bUJ1ZyAmJiBpc0Z1bmN0aW9uO1xuXHRcdGlmIChpc1N0cmluZyAmJiBvYmplY3QubGVuZ3RoID4gMCAmJiAhaGFzLmNhbGwob2JqZWN0LCAwKSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzQXJndW1lbnRzICYmIG9iamVjdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG9iamVjdC5sZW5ndGg7ICsraikge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGopKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcblx0XHRcdFx0aWYgKCEoc2tpcFByb3RvICYmIG5hbWUgPT09ICdwcm90b3R5cGUnKSAmJiBoYXMuY2FsbChvYmplY3QsIG5hbWUpKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhuYW1lKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaGFzRG9udEVudW1CdWcpIHtcblx0XHRcdHZhciBza2lwQ29uc3RydWN0b3IgPSBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kob2JqZWN0KTtcblxuXHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBkb250RW51bXMubGVuZ3RoOyArK2spIHtcblx0XHRcdFx0aWYgKCEoc2tpcENvbnN0cnVjdG9yICYmIGRvbnRFbnVtc1trXSA9PT0gJ2NvbnN0cnVjdG9yJykgJiYgaGFzLmNhbGwob2JqZWN0LCBkb250RW51bXNba10pKSB7XG5cdFx0XHRcdFx0dGhlS2V5cy5wdXNoKGRvbnRFbnVtc1trXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoZUtleXM7XG5cdH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpO1xuXG52YXIgb3JpZ0tleXMgPSBPYmplY3Qua2V5cztcbnZhciBrZXlzU2hpbSA9IG9yaWdLZXlzID8gZnVuY3Rpb24ga2V5cyhvKSB7IHJldHVybiBvcmlnS2V5cyhvKTsgfSA6IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIG9yaWdpbmFsS2V5cyA9IE9iamVjdC5rZXlzO1xuXG5rZXlzU2hpbS5zaGltID0gZnVuY3Rpb24gc2hpbU9iamVjdEtleXMoKSB7XG5cdGlmIChPYmplY3Qua2V5cykge1xuXHRcdHZhciBrZXlzV29ya3NXaXRoQXJndW1lbnRzID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFNhZmFyaSA1LjAgYnVnXG5cdFx0XHR2YXIgYXJncyA9IE9iamVjdC5rZXlzKGFyZ3VtZW50cyk7XG5cdFx0XHRyZXR1cm4gYXJncyAmJiBhcmdzLmxlbmd0aCA9PT0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHR9KDEsIDIpKTtcblx0XHRpZiAoIWtleXNXb3Jrc1dpdGhBcmd1bWVudHMpIHtcblx0XHRcdE9iamVjdC5rZXlzID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcblx0XHRcdFx0aWYgKGlzQXJncyhvYmplY3QpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhzbGljZS5jYWxsKG9iamVjdCkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMob2JqZWN0KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdE9iamVjdC5rZXlzID0ga2V5c1NoaW07XG5cdH1cblx0cmV0dXJuIE9iamVjdC5rZXlzIHx8IGtleXNTaGltO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHR2YXIgc3RyID0gdG9TdHIuY2FsbCh2YWx1ZSk7XG5cdHZhciBpc0FyZ3MgPSBzdHIgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXHRpZiAoIWlzQXJncykge1xuXHRcdGlzQXJncyA9IHN0ciAhPT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuXHRcdFx0dmFsdWUgIT09IG51bGwgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInICYmXG5cdFx0XHR2YWx1ZS5sZW5ndGggPj0gMCAmJlxuXHRcdFx0dG9TdHIuY2FsbCh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXHR9XG5cdHJldHVybiBpc0FyZ3M7XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IEFMQlVNX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBBbGJ1bURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGJ1bShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgYWxidW1IYXNoOiBzdHJpbmdcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxBbGJ1bURhdGE+PiB7XG4gIGNvbnN0IHVybCA9IGAke0FMQlVNX0VORFBPSU5UfS8ke2FsYnVtSGFzaH1gO1xuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShhd2FpdCBjbGllbnQucmVxdWVzdCh7dXJsfSkpIGFzIEltZ3VyQXBpUmVzcG9uc2U8QWxidW1EYXRhPjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZ2V0QWxidW0nO1xuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IGdldEF1dGhvcml6YXRpb25IZWFkZXIgfSBmcm9tICcuL2dldEF1dGhvcml6YXRpb25IZWFkZXInO1xuaW1wb3J0IHtcbiAgZGVsZXRlSW1hZ2UsXG4gIGZhdm9yaXRlSW1hZ2UsXG4gIGdldEltYWdlLFxuICB1cGxvYWQsXG4gIHVwZGF0ZUltYWdlLFxuICBVcGRhdGVJbWFnZVBheWxvYWQsXG59IGZyb20gJy4vaW1hZ2UnO1xuaW1wb3J0IHtcbiAgR2FsbGVyeU9wdGlvbnMsXG4gIGdldEdhbGxlcnksXG4gIGdldFN1YnJlZGRpdEdhbGxlcnksXG4gIFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zLFxuICBzZWFyY2hHYWxsZXJ5LFxuICBTZWFyY2hHYWxsZXJ5T3B0aW9ucyxcbn0gZnJvbSAnLi9nYWxsZXJ5JztcbmltcG9ydCB7IGdldEFsYnVtIH0gZnJvbSAnLi9hbGJ1bSc7XG5pbXBvcnQgeyBJTUdVUl9BUElfUFJFRklYIH0gZnJvbSAnLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7XG4gIEFsYnVtRGF0YSxcbiAgQ3JlZGVudGlhbHMsXG4gIEdhbGxlcnlEYXRhLFxuICBJbWFnZURhdGEsXG4gIEltZ3VyQXBpUmVzcG9uc2UsXG4gIFBheWxvYWQsXG59IGZyb20gJy4vY29tbW9uL3R5cGVzJztcblxuY29uc3QgVVNFUkFHRU5UID0gJ2ltZ3VyL25leHQgKGh0dHBzOi8vZ2l0aHViLmNvbS9rYWltYWxsZWEvbm9kZS1pbWd1ciknO1xuXG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXNwb25zZSwgQXhpb3NSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnYXhpb3MnXG5cbmV4cG9ydCBjbGFzcyBJbWd1ckNsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHByaXZhdGUgZmV0Y2hlcjogQXhpb3NJbnN0YW5jZVxuXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscykge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuZmV0Y2hlciA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgICBiYXNlVVJMOiBJTUdVUl9BUElfUFJFRklYLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAndXNlci1hZ2VudCc6IFVTRVJBR0VOVCxcbiAgICAgIH0sXG4gICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgIC8vIGhvb2tzOiB7XG4gICAgICAvLyAgIGJlZm9yZVJlcXVlc3Q6IFtcbiAgICAgIC8vICAgICBhc3luYyAob3B0aW9uczogYW55KSA9PiB7XG4gICAgICAvLyAgICAgICBvcHRpb25zLmhlYWRlcnNbJ2F1dGhvcml6YXRpb24nXSA9IGF3YWl0IGdldEF1dGhvcml6YXRpb25IZWFkZXIoXG4gICAgICAvLyAgICAgICAgIHRoaXNcbiAgICAgIC8vICAgICAgIClcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICBdLFxuICAgICAgLy8gfSxcbiAgICB9KVxuICAgIHRoaXMuZmV0Y2hlci5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoXG4gICAgICBhc3luYyAoY29uZmlnOiBhbnkpID0+IHtcbiAgICAgICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4geyBcbiAgICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzID8gY29uZmlnLmhlYWRlcnMgOiB7fTtcbiAgICAgICAgICBjb25maWcuaGVhZGVycy5hdXRob3JpemF0aW9uID0gYXdhaXQgZ2V0QXV0aG9yaXphdGlvbkhlYWRlcih0aGlzKTtcbiAgICAgICAgICAvLyByZXNvbHZlKGNvbmZpZylcbiAgICAgICAgLy8gfSlcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH0sXG4gICAgICAoZTogRXJyb3IpID0+IFByb21pc2UucmVqZWN0KGUpXG4gICAgKTtcbiAgfVxuXG4gIHJlcXVlc3QoXG4gICAgb3B0aW9uczogQXhpb3NSZXF1ZXN0Q29uZmlnID0ge31cbiAgKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPHVua25vd24+PiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hlcihvcHRpb25zKVxuICB9XG5cbiAgZGVsZXRlSW1hZ2UoaW1hZ2VIYXNoOiBzdHJpbmcpOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj4+IHtcbiAgICByZXR1cm4gZGVsZXRlSW1hZ2UodGhpcywgaW1hZ2VIYXNoKTtcbiAgfVxuXG4gIGZhdm9yaXRlSW1hZ2UoaW1hZ2VIYXNoOiBzdHJpbmcpOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8c3RyaW5nPj4ge1xuICAgIHJldHVybiBmYXZvcml0ZUltYWdlKHRoaXMsIGltYWdlSGFzaCk7XG4gIH1cblxuICBnZXRBbGJ1bShhbGJ1bUhhc2g6IHN0cmluZyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxBbGJ1bURhdGE+PiB7XG4gICAgcmV0dXJuIGdldEFsYnVtKHRoaXMsIGFsYnVtSGFzaCk7XG4gIH1cblxuICBnZXRHYWxsZXJ5KG9wdGlvbnM6IEdhbGxlcnlPcHRpb25zKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPj4ge1xuICAgIHJldHVybiBnZXRHYWxsZXJ5KHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0U3VicmVkZGl0R2FsbGVyeShcbiAgICBvcHRpb25zOiBTdWJyZWRkaXRHYWxsZXJ5T3B0aW9uc1xuICApOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gICAgcmV0dXJuIGdldFN1YnJlZGRpdEdhbGxlcnkodGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICBzZWFyY2hHYWxsZXJ5KFxuICAgIG9wdGlvbnM6IFNlYXJjaEdhbGxlcnlPcHRpb25zXG4gICk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgICByZXR1cm4gc2VhcmNoR2FsbGVyeSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGdldEltYWdlKGltYWdlSGFzaDogc3RyaW5nKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4+IHtcbiAgICByZXR1cm4gZ2V0SW1hZ2UodGhpcywgaW1hZ2VIYXNoKTtcbiAgfVxuXG4gIHVwZGF0ZUltYWdlKFxuICAgIHBheWxvYWQ6IFVwZGF0ZUltYWdlUGF5bG9hZCB8IFVwZGF0ZUltYWdlUGF5bG9hZFtdXG4gICk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPiB8IEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj5bXT4ge1xuICAgIHJldHVybiB1cGRhdGVJbWFnZSh0aGlzLCBwYXlsb2FkKTtcbiAgfVxuXG4gIHVwbG9hZChcbiAgICBwYXlsb2FkOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFBheWxvYWQgfCBQYXlsb2FkW11cbiAgKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4gfCBJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT5bXT4ge1xuICAgIHJldHVybiB1cGxvYWQodGhpcywgcGF5bG9hZCk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBJTUdVUl9BUElfUFJFRklYID0gJ2h0dHBzOi8vYXBpLmltZ3VyLmNvbSc7XG5cbmV4cG9ydCBjb25zdCBBUElfVkVSU0lPTiA9ICczJztcblxuZXhwb3J0IGNvbnN0IEFVVEhPUklaRV9FTkRQT0lOVCA9ICdvYXV0aDIvYXV0aG9yaXplJztcblxuZXhwb3J0IGNvbnN0IEFMQlVNX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L2FsYnVtYDtcblxuZXhwb3J0IGNvbnN0IElNQUdFX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L2ltYWdlYDtcblxuZXhwb3J0IGNvbnN0IFVQTE9BRF9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS91cGxvYWRgO1xuXG5leHBvcnQgY29uc3QgR0FMTEVSWV9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS9nYWxsZXJ5YDtcblxuZXhwb3J0IGNvbnN0IFNVQlJFRERJVF9HQUxMRVJZX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L2dhbGxlcnkvcmA7XG5cbmV4cG9ydCBjb25zdCBTRUFSQ0hfR0FMTEVSWV9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS9nYWxsZXJ5L3NlYXJjaGA7XG4iLCJpbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gXCJzdHJlYW1cIjtcblxuZXhwb3J0IGludGVyZmFjZSBBY2Nlc3NUb2tlbiB7XG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50SWQge1xuICBjbGllbnRJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2luIGV4dGVuZHMgQ2xpZW50SWQge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVkZW50aWFscyA9IEFjY2Vzc1Rva2VuIHwgQ2xpZW50SWQgfCBMb2dpbjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWNjZXNzVG9rZW4oYXJnOiB1bmtub3duKTogYXJnIGlzIEFjY2Vzc1Rva2VuIHtcbiAgcmV0dXJuIChhcmcgYXMgQWNjZXNzVG9rZW4pLmFjY2Vzc1Rva2VuICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NsaWVudElkKGFyZzogdW5rbm93bik6IGFyZyBpcyBDbGllbnRJZCB7XG4gIHJldHVybiAoYXJnIGFzIENsaWVudElkKS5jbGllbnRJZCAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dpbihhcmc6IHVua25vd24pOiBhcmcgaXMgTG9naW4ge1xuICByZXR1cm4gKFxuICAgIChhcmcgYXMgTG9naW4pLmNsaWVudElkICE9PSB1bmRlZmluZWQgJiZcbiAgICAoYXJnIGFzIExvZ2luKS51c2VybmFtZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgKGFyZyBhcyBMb2dpbikucGFzc3dvcmQgIT09IHVuZGVmaW5lZFxuICApO1xufVxuXG5pbnRlcmZhY2UgQ29tbW9uRGF0YSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmcgfCBudWxsO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nIHwgbnVsbDtcbiAgZGF0ZXRpbWU6IG51bWJlcjtcbiAgbGluazogc3RyaW5nO1xuXG4gIGFkX2NvbmZpZz86IHtcbiAgICBzYWZlRmxhZ3M6IHN0cmluZ1tdO1xuICAgIGhpZ2hSaXNrRmxhZ3M6IHN0cmluZ1tdO1xuICAgIHVuc2FmZUZsYWdzOiBzdHJpbmdbXTtcbiAgICB3YWxsVW5zYWZlRmxhZ3M6IHN0cmluZ1tdO1xuICAgIHNob3dzQWRzOiBib29sZWFuO1xuICB9O1xuICBhZF90eXBlOiBudW1iZXI7XG4gIGFkX3VybDogc3RyaW5nO1xuXG4gIGFjY291bnRfdXJsOiBzdHJpbmcgfCBudWxsO1xuICBhY2NvdW50X2lkOiBzdHJpbmcgfCBudWxsO1xuICBmYXZvcml0ZTogYm9vbGVhbjtcbiAgaXNfYWQ6IGJvb2xlYW47XG4gIGlzX2FsYnVtOiBib29sZWFuO1xuICBpbl9nYWxsZXJ5OiBib29sZWFuO1xuICBpbl9tb3N0X3ZpcmFsOiBib29sZWFuO1xuICBuc2Z3OiBib29sZWFuIHwgbnVsbDtcbiAgc2VjdGlvbjogc3RyaW5nIHwgbnVsbDtcbiAgdGFnczogQXJyYXk8e1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgICBmb2xsb3dlcnM6IG51bWJlcjtcbiAgICB0b3RhbF9pdGVtczogbnVtYmVyO1xuICAgIGZvbGxvd2luZzogYm9vbGVhbjtcbiAgICBpc193aGl0ZWxpc3RlZDogYm9vbGVhbjtcbiAgICBiYWNrZ3JvdW5kX2hhc2g6IHN0cmluZztcbiAgICB0aHVtYm5haWxfaGFzaDogc3RyaW5nIHwgbnVsbDtcbiAgICBhY2NlbnQ6IHN0cmluZztcbiAgICBiYWNrZ3JvdW5kX2lzX2FuaW1hdGVkOiBib29sZWFuO1xuICAgIHRodW1ibmFpbF9pc19hbmltYXRlZDogYm9vbGVhbjtcbiAgICBpc19wcm9tb3RlZDogYm9vbGVhbjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGxvZ29faGFzaDogc3RyaW5nIHwgbnVsbDtcbiAgICBsb2dvX2Rlc3RpbmF0aW9uX3VybDogc3RyaW5nIHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbl9hbm5vdGF0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH0+O1xuICB0b3BpYzogc3RyaW5nIHwgbnVsbDtcbiAgdG9waWNfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHZvdGU6IG51bGw7XG5cbiAgY29tbWVudF9jb3VudDogbnVtYmVyIHwgbnVsbDtcbiAgZmF2b3JpdGVfY291bnQ6IG51bWJlciB8IG51bGw7XG4gIHVwczogbnVtYmVyIHwgbnVsbDtcbiAgZG93bnM6IG51bWJlciB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXIgfCBudWxsO1xuICBwb2ludHM6IG51bWJlciB8IG51bGw7XG4gIHZpZXdzOiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIEltYWdlRGF0YSBleHRlbmRzIENvbW1vbkRhdGEge1xuICB0eXBlOiBzdHJpbmc7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBzaXplOiBudW1iZXI7XG4gIGRlbGV0ZWhhc2g/OiBzdHJpbmc7XG4gIGJhbmR3aWR0aDogbnVtYmVyO1xuICBhbmltYXRlZDogYm9vbGVhbjtcbiAgaGFzX3NvdW5kOiBib29sZWFuO1xuICBlZGl0ZWQ6IHN0cmluZztcbiAgbXA0X3NpemU/OiBudW1iZXI7XG4gIG1wND86IHN0cmluZztcbiAgZ2lmdj86IHN0cmluZztcbiAgaGxzPzogc3RyaW5nO1xuICBsb29waW5nPzogYm9vbGVhbjtcbiAgcHJvY2Vzc2luZz86IHtcbiAgICBzdGF0dXM6ICdwZW5kaW5nJyB8ICdjb21wbGV0ZWQnO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFsYnVtRGF0YSBleHRlbmRzIENvbW1vbkRhdGEge1xuICBjb3Zlcjogc3RyaW5nIHwgbnVsbDtcbiAgY292ZXJfd2lkdGg6IG51bWJlciB8IG51bGw7XG4gIGNvdmVyX2hlaWdodDogbnVtYmVyIHwgbnVsbDtcbiAgbGF5b3V0OiBzdHJpbmc7XG4gIHByaXZhY3k6IHN0cmluZztcbiAgaW5jbHVkZV9hbGJ1bV9hZHM6IGJvb2xlYW47XG4gIGltYWdlczogSW1hZ2VEYXRhW107XG4gIGltYWdlc19jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBHYWxsZXJ5RGF0YSA9IEFycmF5PEltYWdlRGF0YSB8IEFsYnVtRGF0YT47XG5leHBvcnQgaW50ZXJmYWNlIFBheWxvYWQge1xuICBpbWFnZT86IHN0cmluZztcbiAgdmlkZW8/OiBzdHJpbmc7XG4gIHR5cGU/OiAnc3RyZWFtJyB8ICd1cmwnIHwgJ2Jhc2U2NCc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgYWxidW0/OiBzdHJpbmc7XG4gIHN0cmVhbT86IFJlYWRhYmxlO1xuICBkaXNhYmxlX2F1ZGlvPzogJzEnIHwgJzAnO1xufVxuZXhwb3J0IGludGVyZmFjZSBJbWd1ckFwaVJlc3BvbnNlPFxuICBUID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdIHwgc3RyaW5nIHwgYm9vbGVhbiB8IEltYWdlRGF0YSB8IEdhbGxlcnlEYXRhIHwgQWxidW1EYXRhXG4+IHtcbiAgZGF0YTogVDtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG59IiwiaW1wb3J0IHsgQXhpb3NSZXNwb25zZSB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCBGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgUGF5bG9hZCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNWaWRlbyhwYXlsb2FkOiBzdHJpbmcgfCBQYXlsb2FkKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHBheWxvYWQudmlkZW8gIT09ICd1bmRlZmluZWQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlKHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBzdHJpbmcgfCBSZWFkYWJsZSB7XG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxuXG4gIGlmIChpc1ZpZGVvKHBheWxvYWQpKSB7XG4gICAgcmV0dXJuIHBheWxvYWQudmlkZW8gYXMgc3RyaW5nO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwYXlsb2FkLnN0cmVhbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gcGF5bG9hZC5zdHJlYW0gYXMgUmVhZGFibGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHBheWxvYWQuaW1hZ2UgYXMgc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtKHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBGb3JtRGF0YSB7XG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcblxuICBpZiAodHlwZW9mIHBheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gVE9ETzogY2hhbmdlIHRoaXMgdG8gdXJsIHVwbG9hZD9cbiAgICBmb3JtLmFwcGVuZCgnaW1hZ2UnLCBwYXlsb2FkKTtcbiAgICByZXR1cm4gZm9ybTtcbiAgfVxuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHBheWxvYWQpKSB7XG4gICAgaWYgKGtleSA9PT0gJ2ltYWdlJyB8fCBrZXkgPT09ICd2aWRlbycpIHtcbiAgICAgIGlmICghcGF5bG9hZC50eXBlIHx8IHBheWxvYWQudHlwZSA9PT0gJ3N0cmVhbScpXG4gICAgICAgIGZvcm0uYXBwZW5kKGtleSwgcGF5bG9hZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gIHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlXG4pOiBJbWd1ckFwaVJlc3BvbnNlIHtcbiAgaWYgKHR5cGVvZiByZXNwb25zZS5kYXRhPy5zdGF0dXMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiByZXNwb25zZS5kYXRhPy5zdWNjZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRhdGE6IHJlc3BvbnNlLmRhdGEsXG4gICAgc3VjY2VzczogdHJ1ZSxcbiAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgR0FMTEVSWV9FTkRQT0lOVCwgSU1HVVJfQVBJX1BSRUZJWCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgR2FsbGVyeURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBDb21tb25TZWN0aW9uUHJvcHMgPSB7XG4gIHNvcnQ/OiAndmlyYWwnIHwgJ3RvcCcgfCAndGltZSc7XG4gIHBhZ2U/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBIb3RTZWN0aW9uID0gQ29tbW9uU2VjdGlvblByb3BzICYge1xuICBzZWN0aW9uOiAnaG90Jztcbn07XG5cbmV4cG9ydCB0eXBlIFRvcFNlY3Rpb24gPSBDb21tb25TZWN0aW9uUHJvcHMgJiB7XG4gIHNlY3Rpb246ICd0b3AnO1xuICB3aW5kb3c/OiAnZGF5JyB8ICd3ZWVrJyB8ICdtb250aCcgfCAneWVhcicgfCAnYWxsJztcbn07XG5cbmV4cG9ydCB0eXBlIFVzZXJTZWN0aW9uID0gT21pdDxDb21tb25TZWN0aW9uUHJvcHMsICdzb3J0Jz4gJiB7XG4gIHNlY3Rpb246ICd1c2VyJztcbiAgc29ydD86ICd2aXJhbCcgfCAndG9wJyB8ICd0aW1lJyB8ICdyaXNpbmcnO1xufTtcblxuZXhwb3J0IHR5cGUgU2VjdGlvbk9wdGlvbnMgPSBIb3RTZWN0aW9uIHwgVG9wU2VjdGlvbiB8IFVzZXJTZWN0aW9uO1xuXG5leHBvcnQgdHlwZSBQcmVzZW50YXRpb25PcHRpb25zID0ge1xuICBzaG93VmlyYWw/OiBib29sZWFuO1xuICBtYXR1cmU/OiBib29sZWFuO1xuICBhbGJ1bV9wcmV2aWV3cz86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBHYWxsZXJ5T3B0aW9ucyA9IFNlY3Rpb25PcHRpb25zICYgUHJlc2VudGF0aW9uT3B0aW9ucztcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IEdhbGxlcnlPcHRpb25zID0ge1xuICBzZWN0aW9uOiAnaG90JyxcbiAgc29ydDogJ3ZpcmFsJyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RHYWxsZXJ5VXJsKG9wdGlvbnM6IEdhbGxlcnlPcHRpb25zKTogVVJMIHtcbiAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICBsZXQgdXJpID0gYCR7bWVyZ2VkT3B0aW9ucy5zZWN0aW9ufWA7XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMuc29ydCkge1xuICAgIHVyaSArPSBgLyR7bWVyZ2VkT3B0aW9ucy5zb3J0fWA7XG4gIH1cblxuICBpZiAobWVyZ2VkT3B0aW9ucy5zZWN0aW9uID09PSAndG9wJyAmJiBtZXJnZWRPcHRpb25zLndpbmRvdykge1xuICAgIHVyaSArPSBgLyR7bWVyZ2VkT3B0aW9ucy53aW5kb3d9YDtcbiAgfVxuXG4gIGlmIChtZXJnZWRPcHRpb25zLnBhZ2UpIHtcbiAgICB1cmkgKz0gYC8ke21lcmdlZE9wdGlvbnMucGFnZX1gO1xuICB9XG5cbiAgY29uc3QgdXJsID0gbmV3IFVSTChgJHtJTUdVUl9BUElfUFJFRklYfS8ke0dBTExFUllfRU5EUE9JTlR9LyR7dXJpfWApO1xuXG4gIGlmIChtZXJnZWRPcHRpb25zLnNob3dWaXJhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ3Nob3dWaXJhbCcsIG1lcmdlZE9wdGlvbnMuc2hvd1ZpcmFsLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMubWF0dXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnbWF0dXJlJywgbWVyZ2VkT3B0aW9ucy5tYXR1cmUudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAobWVyZ2VkT3B0aW9ucy5hbGJ1bV9wcmV2aWV3cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoXG4gICAgICAnYWxidW1fcHJldmlld3MnLFxuICAgICAgbWVyZ2VkT3B0aW9ucy5hbGJ1bV9wcmV2aWV3cy50b1N0cmluZygpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRHYWxsZXJ5KFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBvcHRpb25zOiBHYWxsZXJ5T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IGNvbnN0cnVjdEdhbGxlcnlVcmwob3B0aW9ucyk7XG4gIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIHByZWZpeFVybCB3aXRoIGdvdCwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHN0YXJ0aW5nIHNsYXNoIG9yIGl0J2xsIHRocm93XG4gIGNvbnN0IGZpbmFsUGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgxKTtcblxuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybDogZmluYWxQYXRobmFtZSB9KSkgYXMgSW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT47XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQge1xuICBTVUJSRURESVRfR0FMTEVSWV9FTkRQT0lOVCxcbiAgSU1HVVJfQVBJX1BSRUZJWCxcbn0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBHYWxsZXJ5RGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIFRpbWVPcHRpb25zID0ge1xuICBzdWJyZWRkaXQ6IHN0cmluZztcbiAgc29ydD86ICd0aW1lJztcbiAgcGFnZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIFRvcE9wdGlvbnMgPSBPbWl0PFRpbWVPcHRpb25zLCAnc29ydCc+ICYge1xuICBzb3J0PzogJ3RvcCc7XG4gIHdpbmRvdz86ICdkYXknIHwgJ3dlZWsnIHwgJ21vbnRoJyB8ICd5ZWFyJyB8ICdhbGwnO1xufTtcblxuZXhwb3J0IHR5cGUgU3VicmVkZGl0R2FsbGVyeU9wdGlvbnMgPSBUaW1lT3B0aW9ucyB8IFRvcE9wdGlvbnM7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RTdWJyZWRkaXRHYWxsZXJ5VXJsKFxuICBvcHRpb25zOiBTdWJyZWRkaXRHYWxsZXJ5T3B0aW9uc1xuKTogVVJMIHtcbiAgbGV0IHVyaSA9IGAke29wdGlvbnMuc3VicmVkZGl0fWA7XG5cbiAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy5zb3J0fWA7XG4gIH1cblxuICBpZiAob3B0aW9ucy5zb3J0ID09PSAndG9wJyAmJiBvcHRpb25zLndpbmRvdykge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy53aW5kb3d9YDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnBhZ2UpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMucGFnZX1gO1xuICB9XG5cbiAgY29uc3QgdXJsID0gbmV3IFVSTChcbiAgICBgJHtJTUdVUl9BUElfUFJFRklYfS8ke1NVQlJFRERJVF9HQUxMRVJZX0VORFBPSU5UfS8ke3VyaX1gXG4gICk7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN1YnJlZGRpdEdhbGxlcnkoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIG9wdGlvbnM6IFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IGNvbnN0cnVjdFN1YnJlZGRpdEdhbGxlcnlVcmwob3B0aW9ucyk7XG4gIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIHByZWZpeFVybCB3aXRoIGdvdCwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHN0YXJ0aW5nIHNsYXNoIG9yIGl0J2xsIHRocm93XG4gIGNvbnN0IGZpbmFsUGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgxKTtcblxuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybDogZmluYWxQYXRobmFtZSB9KSkgYXMgSW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT47XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2dldEdhbGxlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9nZXRTdWJyZWRkaXRHYWxsZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vc2VhcmNoR2FsbGVyeSc7XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBTRUFSQ0hfR0FMTEVSWV9FTkRQT0lOVCwgSU1HVVJfQVBJX1BSRUZJWCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgR2FsbGVyeURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBVUkwgfSBmcm9tICd1cmwnO1xuXG5leHBvcnQgdHlwZSBTZWFyY2hPcHRpb25zID0ge1xuICBxPzogc3RyaW5nO1xuICBxdWVyeT86IHN0cmluZztcbiAgc29ydD86ICd0aW1lJyB8ICd2aXJhbCc7XG4gIHBhZ2U/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBUb3BTZWFyY2hPcHRpb25zID0gT21pdDxTZWFyY2hPcHRpb25zLCAnc29ydCc+ICYge1xuICBzb3J0PzogJ3RvcCc7XG4gIHdpbmRvdz86ICdkYXknIHwgJ3dlZWsnIHwgJ21vbnRoJyB8ICd5ZWFyJyB8ICdhbGwnO1xufTtcblxuZXhwb3J0IHR5cGUgQWR2YW5jZWRTZWFyY2hRdWVyeVBhcmFtZXRlcnMgPSB7XG4gIHFfYWxsPzogc3RyaW5nO1xuICBxX2FueT86IHN0cmluZztcbiAgcV9leGFjdGx5Pzogc3RyaW5nO1xuICBxX25vdD86IHN0cmluZztcbiAgcV90eXBlPzogJ2pwZycgfCAncG5nJyB8ICdnaWYnIHwgJ2FuaWdpZicgfCAnYWxidW0nO1xuICBxX3NpemVfcHg/OiAnc21hbGwnIHwgJ21lZCcgfCAnYmlnJyB8ICdscmcnIHwgJ2h1Z2UnO1xufTtcblxuY29uc3QgYWR2YW5jZWRQYXJhbWV0ZXJzOiBBcnJheTxrZXlvZiBBZHZhbmNlZFNlYXJjaFF1ZXJ5UGFyYW1ldGVycz4gPSBbXG4gICdxX2FsbCcsXG4gICdxX2FueScsXG4gICdxX2V4YWN0bHknLFxuICAncV9ub3QnLFxuICAncV90eXBlJyxcbiAgJ3Ffc2l6ZV9weCcsXG5dO1xuXG5leHBvcnQgdHlwZSBTZWFyY2hHYWxsZXJ5T3B0aW9ucyA9IChTZWFyY2hPcHRpb25zIHwgVG9wU2VhcmNoT3B0aW9ucykgJlxuICBBZHZhbmNlZFNlYXJjaFF1ZXJ5UGFyYW1ldGVycztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdFNlYXJjaEdhbGxlcnlVcmwob3B0aW9uczogU2VhcmNoR2FsbGVyeU9wdGlvbnMpOiBVUkwge1xuICBsZXQgdXJpID0gJyc7XG5cbiAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy5zb3J0fWA7XG4gIH1cblxuICBpZiAob3B0aW9ucy5zb3J0ID09PSAndG9wJyAmJiBvcHRpb25zLndpbmRvdykge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy53aW5kb3d9YDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnBhZ2UpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMucGFnZX1gO1xuICB9XG5cbiAgY29uc3QgdXJsID0gbmV3IFVSTChgJHtJTUdVUl9BUElfUFJFRklYfS8ke1NFQVJDSF9HQUxMRVJZX0VORFBPSU5UfSR7dXJpfWApO1xuXG4gIGFkdmFuY2VkUGFyYW1ldGVycy5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgIGlmIChvcHRpb25zW3BhcmFtXT8ubGVuZ3RoKSB7XG4gICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChwYXJhbSwgb3B0aW9uc1twYXJhbV0gYXMgc3RyaW5nKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICghdXJsLnNlYXJjaCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gb3B0aW9ucy5xIHx8IG9wdGlvbnMucXVlcnk7XG4gICAgaWYgKCFxdWVyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBxdWVyeSB3YXMgcHJvdmlkZWQnKTtcbiAgICB9XG5cbiAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgncScsIHF1ZXJ5KTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hHYWxsZXJ5KFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBvcHRpb25zOiBTZWFyY2hHYWxsZXJ5T3B0aW9uc1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPj4ge1xuICBjb25zdCB7IHBhdGhuYW1lIH0gPSBjb25zdHJ1Y3RTZWFyY2hHYWxsZXJ5VXJsKG9wdGlvbnMpO1xuICAvLyBzaW5jZSB3ZSdyZSB1c2luZyBwcmVmaXhVcmwgd2l0aCBnb3QsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSBzdGFydGluZyBzbGFzaCBvciBpdCdsbCB0aHJvd1xuICBjb25zdCBmaW5hbFBhdGhuYW1lID0gcGF0aG5hbWUuc2xpY2UoMSk7XG5cbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmw6IGZpbmFsUGF0aG5hbWUgfSkpIGFzIEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+O1xufVxuIiwiaW1wb3J0IHtcbiAgQWNjZXNzVG9rZW4sXG4gIGlzQWNjZXNzVG9rZW4sXG4gIGlzQ2xpZW50SWQsXG4gIGlzTG9naW4sXG59IGZyb20gJy4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1HVVJfQVBJX1BSRUZJWCwgQVVUSE9SSVpFX0VORFBPSU5UIH0gZnJvbSAnLi9jb21tb24vZW5kcG9pbnRzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEF1dGhvcml6YXRpb25IZWFkZXIoXG4gIGNsaWVudDogSW1ndXJDbGllbnRcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGlmIChpc0FjY2Vzc1Rva2VuKGNsaWVudC5jcmVkZW50aWFscykpIHtcbiAgICByZXR1cm4gYEJlYXJlciAke2NsaWVudC5jcmVkZW50aWFscy5hY2Nlc3NUb2tlbn1gO1xuICB9XG5cbiAgaWYgKGlzQ2xpZW50SWQoY2xpZW50LmNyZWRlbnRpYWxzKSAmJiAhaXNMb2dpbihjbGllbnQuY3JlZGVudGlhbHMpKSB7XG4gICAgcmV0dXJuIGBDbGllbnQtSUQgJHtjbGllbnQuY3JlZGVudGlhbHMuY2xpZW50SWR9YDtcbiAgfVxuXG4gIGNvbnN0IHsgY2xpZW50SWQsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gY2xpZW50LmNyZWRlbnRpYWxzO1xuXG4gIGNvbnN0IG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge1xuICAgIHVybDogQVVUSE9SSVpFX0VORFBPSU5ULFxuICAgIGJhc2VVUkw6IElNR1VSX0FQSV9QUkVGSVgsXG4gICAgcGFyYW1zOiB7XG4gICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgcmVzcG9uc2VfdHlwZTogJ3Rva2VuJyxcbiAgICB9LFxuICB9O1xuXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5yZXF1ZXN0KG9wdGlvbnMpO1xuXG4gIGNvbnN0IGNvb2tpZXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXSlcbiAgICA/IHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXVswXVxuICAgIDogcmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddO1xuXG4gIGlmICghY29va2llcykge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gY29va2llcyB3ZXJlIHNldCBkdXJpbmcgYXV0aG9yaXphdGlvbicpO1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlcyA9IGNvb2tpZXMubWF0Y2goJyhefDspW3NdKmF1dGhvcml6ZV90b2tlbj0oW147XSopJyk7XG5cbiAgaWYgKCFtYXRjaGVzIHx8IG1hdGNoZXMubGVuZ3RoIDwgMykge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGZpbmQgYXV0aG9yaXplX3Rva2VuIGNvb2tpZScpO1xuICB9XG5cbiAgcmV0dXJuIGBCZWFyZXIgMTIzYWNjZXNzdG9rZW40NTZgO1xuICBjb25zdCBhdXRob3JpemVUb2tlbiA9IG1hdGNoZXNbMl07XG5cbiAgb3B0aW9ucy5tZXRob2QgPSAnUE9TVCc7XG4gIG9wdGlvbnMuZm9ybSA9IHtcbiAgICB1c2VybmFtZSxcbiAgICBwYXNzd29yZCxcbiAgICBhbGxvdzogYXV0aG9yaXplVG9rZW4sXG4gIH07XG4gIG9wdGlvbnMudXJsID0gQVVUSE9SSVpFX0VORFBPSU5UXG5cbiAgb3B0aW9ucy5mb2xsb3dSZWRpcmVjdCA9IGZhbHNlO1xuICBvcHRpb25zLmhlYWRlcnMgPSB7XG4gICAgY29va2llOiBgYXV0aG9yaXplX3Rva2VuPSR7YXV0aG9yaXplVG9rZW59YCxcbiAgfTtcblxuICByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5yZXF1ZXN0KG9wdGlvbnMpO1xuICBjb25zdCBsb2NhdGlvbiA9IHJlc3BvbnNlLmhlYWRlcnMubG9jYXRpb247XG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwYXJzZSBsb2NhdGlvbicpO1xuICB9XG5cbiAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKFxuICAgICd7XCInICtcbiAgICAgIGRlY29kZVVSSShsb2NhdGlvbi5zbGljZShsb2NhdGlvbi5pbmRleE9mKCcjJykgKyAxKSlcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKVxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnXCIsXCInKVxuICAgICAgICAucmVwbGFjZSgvPS9nLCAnXCI6XCInKSArXG4gICAgICAnXCJ9J1xuICApO1xuXG4gIGNvbnN0IGFjY2Vzc1Rva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAoKGNsaWVudC5jcmVkZW50aWFscyBhcyB1bmtub3duKSBhcyBBY2Nlc3NUb2tlbikuYWNjZXNzVG9rZW4gPSBhY2Nlc3NUb2tlbjtcbiAgcmV0dXJuIGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gO1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1BR0VfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVJbWFnZShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgaW1hZ2VIYXNoOiBzdHJpbmdcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPj4ge1xuICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtpbWFnZUhhc2h9YDtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmwsIG1ldGhvZDogJ0RFTEVURScgfSkpIGFzIEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj47XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBJTUFHRV9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZhdm9yaXRlSW1hZ2UoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIGltYWdlSGFzaDogc3RyaW5nXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8J2Zhdm9yaXRlZCc+PiB7XG4gIGNvbnN0IHVybCA9IGAke0lNQUdFX0VORFBPSU5UfS8ke2ltYWdlSGFzaH0vZmF2b3JpdGVgO1xuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybCwgbWV0aG9kOiAnUE9TVCcgfSkpIGFzIEltZ3VyQXBpUmVzcG9uc2U8J2Zhdm9yaXRlZCc+O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1BR0VfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UsIEltYWdlRGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEltYWdlKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBpbWFnZUhhc2g6IHN0cmluZ1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4+IHtcbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7aW1hZ2VIYXNofWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsIH0pKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZGVsZXRlSW1hZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9mYXZvcml0ZUltYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vZ2V0SW1hZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi91cGRhdGVJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL3VwbG9hZCc7XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBJTUFHRV9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgY3JlYXRlRm9ybSwgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBQYXlsb2FkLCBJbWd1ckFwaVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVJbWFnZVBheWxvYWRcbiAgZXh0ZW5kcyBQaWNrPFBheWxvYWQsICd0aXRsZScgfCAnZGVzY3JpcHRpb24nPiB7XG4gIGltYWdlSGFzaDogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkVXBkYXRlUGF5bG9hZChwOiBVcGRhdGVJbWFnZVBheWxvYWQpIHtcbiAgcmV0dXJuIHR5cGVvZiBwLnRpdGxlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcC5kZXNjcmlwdGlvbiA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVJbWFnZShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgcGF5bG9hZDogVXBkYXRlSW1hZ2VQYXlsb2FkIHwgVXBkYXRlSW1hZ2VQYXlsb2FkW11cbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPiB8IEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj5bXT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgIGNvbnN0IHByb21pc2VzID0gcGF5bG9hZC5tYXAoKHA6IFVwZGF0ZUltYWdlUGF5bG9hZCkgPT4ge1xuICAgICAgaWYgKCFpc1ZhbGlkVXBkYXRlUGF5bG9hZChwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwZGF0ZSByZXF1aXJlcyBhIHRpdGxlIGFuZC9vciBkZXNjcmlwdGlvbicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtwLmltYWdlSGFzaH1gO1xuICAgICAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0ocCk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShhd2FpdCBjbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGZvcm0sXG4gICAgICAgICAgICAvLyByZXNvbHZlQm9keU9ubHk6IHRydWUsXG4gICAgICAgICAgfSkpIGFzIEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj4pXG4gICAgICAgIH0pIGFzIFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPj47XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgaWYgKCFpc1ZhbGlkVXBkYXRlUGF5bG9hZChwYXlsb2FkKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVXBkYXRlIHJlcXVpcmVzIGEgdGl0bGUgYW5kL29yIGRlc2NyaXB0aW9uJyk7XG4gIH1cblxuICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtwYXlsb2FkLmltYWdlSGFzaH1gO1xuICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybShwYXlsb2FkKTtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgIHVybCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBkYXRhOiBmb3JtLFxuICAgIC8vIHJlc29sdmVCb2R5T25seTogdHJ1ZSxcbiAgfSkpIGFzIEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj5cbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50Jztcbi8vIGltcG9ydCB7IGNyZWF0ZUZvcm0sIGdldFNvdXJjZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBjcmVhdGVGb3JtLCBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFBheWxvYWQsIEltZ3VyQXBpUmVzcG9uc2UsIEltYWdlRGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBVUExPQURfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbi8vIGltcG9ydCB7IFByb2dyZXNzIH0gZnJvbSAnZ290JztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZChcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgcGF5bG9hZDogc3RyaW5nIHwgc3RyaW5nW10gfCBQYXlsb2FkIHwgUGF5bG9hZFtdXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPiB8IEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPltdPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBwYXlsb2FkLm1hcCgocDogc3RyaW5nIHwgUGF5bG9hZCkgPT4ge1xuICAgICAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0ocCk7XG5cbiAgICAgIC8vIGNvbnN0IGlkID0gZ2V0U291cmNlKHApO1xuICAgICAgLy8gcmVxLm9uKCd1cGxvYWRQcm9ncmVzcycsIChwcm9ncmVzczogUHJvZ3Jlc3MpID0+IHtcbiAgICAgIC8vICAgY2xpZW50LmVtaXQoJ3VwbG9hZFByb2dyZXNzJywgeyAuLi5wcm9ncmVzcywgaWQgfSk7XG4gICAgICAvLyB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShhd2FpdCBjbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBVUExPQURfRU5EUE9JTlQsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YTogZm9ybSxcbiAgICAgICAgICAvLyByZXNvbHZlQm9keU9ubHk6IHRydWUsXG4gICAgICAgIH0pKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4pXG4gICAgICB9KSBhcyBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPj47XG4gICAgfSk7XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIGNvbnN0IGZvcm0gPSBjcmVhdGVGb3JtKHBheWxvYWQpO1xuICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgIHVybDogVVBMT0FEX0VORFBPSU5ULFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGRhdGE6IGZvcm0sXG4gICAgLy8gcmVzb2x2ZUJvZHlPbmx5OiB0cnVlLFxuICB9KTtcblxuICAvLyBjb25zdCBpZCA9IGdldFNvdXJjZShwYXlsb2FkKTtcbiAgLy8gcmVxLm9uKCd1cGxvYWRQcm9ncmVzcycsIChwcm9ncmVzcykgPT4ge1xuICAvLyAgIGNsaWVudC5lbWl0KCd1cGxvYWRQcm9ncmVzcycsIHsgLi4ucHJvZ3Jlc3MsIGlkIH0pO1xuICAvLyB9KTtcblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UocmVxdWVzdClhcyBJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4pO1xufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZSB2MS4zLjIgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJlxuXHRcdCFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHQhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKFxuXHRcdGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLnNlbGYgPT09IGZyZWVHbG9iYWxcblx0KSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXlxceDIwLVxceDdFXS8sIC8vIHVucHJpbnRhYmxlIEFTQ0lJIGNoYXJzICsgbm9uLUFTQ0lJIGNoYXJzXG5cdHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2csIC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuXHQvKiogRXJyb3IgbWVzc2FnZXMgKi9cblx0ZXJyb3JzID0ge1xuXHRcdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdFx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0XHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xuXHR9LFxuXG5cdC8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cblx0YmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluLFxuXHRmbG9vciA9IE1hdGguZmxvb3IsXG5cdHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUsXG5cblx0LyoqIFRlbXBvcmFyeSB2YXJpYWJsZSAqL1xuXHRrZXk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cblx0ICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZXJyb3IodHlwZSkge1xuXHRcdHRocm93IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG5cdCAqIGl0ZW0uXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdHJlc3VsdFtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG5cdCAqIGFkZHJlc3Nlcy5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5XG5cdCAqIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcblx0ICogZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHRcdHZhciBwYXJ0cyA9IHN0cmluZy5zcGxpdCgnQCcpO1xuXHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdFx0Ly8gSW4gZW1haWwgYWRkcmVzc2VzLCBvbmx5IHRoZSBkb21haW4gbmFtZSBzaG91bGQgYmUgcHVueWNvZGVkLiBMZWF2ZVxuXHRcdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdFx0c3RyaW5nID0gcGFydHNbMV07XG5cdFx0fVxuXHRcdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleFNlcGFyYXRvcnMsICdcXHgyRScpO1xuXHRcdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0XHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdFx0cmV0dXJuIHJlc3VsdCArIGVuY29kZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG5cdCAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG5cdCAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuXHQgKiBtYXRjaGluZyBVVEYtMTYuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuXHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZGVjb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBjb3VudGVyID0gMCxcblx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHQgICAgdmFsdWUsXG5cdFx0ICAgIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBlbmNvZGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdCAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG5cdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gMjI7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gNjU7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gOTc7XG5cdFx0fVxuXHRcdHJldHVybiBiYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdCAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuXHQgKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuXHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0XHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdCAqIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuMy4yJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAoa2V5IGluIHB1bnljb2RlKSB7XG5cdFx0XHRcdHB1bnljb2RlLmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBwdW55Y29kZVtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuZXhwb3J0cy5VcmwgPSBVcmw7XG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMuaG9zdCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLnBhdGhuYW1lID0gbnVsbDtcbiAgdGhpcy5wYXRoID0gbnVsbDtcbiAgdGhpcy5ocmVmID0gbnVsbDtcbn1cblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSBzaW1wbGUgcGF0aCBVUkxcbiAgICBzaW1wbGVQYXRoUGF0dGVybiA9IC9eKFxcL1xcLz8oPyFcXC8pW15cXD9cXHNdKikoXFw/W15cXHNdKik/JC8sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyByZXNlcnZlZCBmb3IgZGVsaW1pdGluZyBVUkxzLlxuICAgIC8vIFdlIGFjdHVhbGx5IGp1c3QgYXV0by1lc2NhcGUgdGhlc2UuXG4gICAgZGVsaW1zID0gWyc8JywgJz4nLCAnXCInLCAnYCcsICcgJywgJ1xccicsICdcXG4nLCAnXFx0J10sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyBub3QgYWxsb3dlZCBmb3IgdmFyaW91cyByZWFzb25zLlxuICAgIHVud2lzZSA9IFsneycsICd9JywgJ3wnLCAnXFxcXCcsICdeJywgJ2AnXS5jb25jYXQoZGVsaW1zKSxcblxuICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cbiAgICBhdXRvRXNjYXBlID0gWydcXCcnXS5jb25jYXQodW53aXNlKSxcbiAgICAvLyBDaGFyYWN0ZXJzIHRoYXQgYXJlIG5ldmVyIGV2ZXIgYWxsb3dlZCBpbiBhIGhvc3RuYW1lLlxuICAgIC8vIE5vdGUgdGhhdCBhbnkgaW52YWxpZCBjaGFycyBhcmUgYWxzbyBoYW5kbGVkLCBidXQgdGhlc2VcbiAgICAvLyBhcmUgdGhlIG9uZXMgdGhhdCBhcmUgKmV4cGVjdGVkKiB0byBiZSBzZWVuLCBzbyB3ZSBmYXN0LXBhdGhcbiAgICAvLyB0aGVtLlxuICAgIG5vbkhvc3RDaGFycyA9IFsnJScsICcvJywgJz8nLCAnOycsICcjJ10uY29uY2F0KGF1dG9Fc2NhcGUpLFxuICAgIGhvc3RFbmRpbmdDaGFycyA9IFsnLycsICc/JywgJyMnXSxcbiAgICBob3N0bmFtZU1heExlbiA9IDI1NSxcbiAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bK2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oWythLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIHVuc2FmZVByb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuICAgIGhvc3RsZXNzUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIC8vIGJpdC5cbiAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG4gICAgICAnaHR0cCc6IHRydWUsXG4gICAgICAnaHR0cHMnOiB0cnVlLFxuICAgICAgJ2Z0cCc6IHRydWUsXG4gICAgICAnZ29waGVyJzogdHJ1ZSxcbiAgICAgICdmaWxlJzogdHJ1ZSxcbiAgICAgICdodHRwOic6IHRydWUsXG4gICAgICAnaHR0cHM6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuZnVuY3Rpb24gdXJsUGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAodXJsICYmIHV0aWwuaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCF1dGlsLmlzU3RyaW5nKHVybCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGFyYW1ldGVyICd1cmwnIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiB1cmwpO1xuICB9XG5cbiAgLy8gQ29weSBjaHJvbWUsIElFLCBvcGVyYSBiYWNrc2xhc2gtaGFuZGxpbmcgYmVoYXZpb3IuXG4gIC8vIEJhY2sgc2xhc2hlcyBiZWZvcmUgdGhlIHF1ZXJ5IHN0cmluZyBnZXQgY29udmVydGVkIHRvIGZvcndhcmQgc2xhc2hlc1xuICAvLyBTZWU6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNTkxNlxuICB2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/JyksXG4gICAgICBzcGxpdHRlciA9XG4gICAgICAgICAgKHF1ZXJ5SW5kZXggIT09IC0xICYmIHF1ZXJ5SW5kZXggPCB1cmwuaW5kZXhPZignIycpKSA/ICc/JyA6ICcjJyxcbiAgICAgIHVTcGxpdCA9IHVybC5zcGxpdChzcGxpdHRlciksXG4gICAgICBzbGFzaFJlZ2V4ID0gL1xcXFwvZztcbiAgdVNwbGl0WzBdID0gdVNwbGl0WzBdLnJlcGxhY2Uoc2xhc2hSZWdleCwgJy8nKTtcbiAgdXJsID0gdVNwbGl0LmpvaW4oc3BsaXR0ZXIpO1xuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIGlmICghc2xhc2hlc0Rlbm90ZUhvc3QgJiYgdXJsLnNwbGl0KCcjJykubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gVHJ5IGZhc3QgcGF0aCByZWdleHBcbiAgICB2YXIgc2ltcGxlUGF0aCA9IHNpbXBsZVBhdGhQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gICAgaWYgKHNpbXBsZVBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHJlc3Q7XG4gICAgICB0aGlzLmhyZWYgPSByZXN0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHNpbXBsZVBhdGhbMV07XG4gICAgICBpZiAoc2ltcGxlUGF0aFsyXSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNpbXBsZVBhdGhbMl07XG4gICAgICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMuc2VhcmNoLnN1YnN0cigxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuc2VhcmNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55Y29kZWQgcmVwcmVzZW50YXRpb24gb2YgXCJkb21haW5cIi5cbiAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcbiAgICAgIC8vIGhhdmUgbm9uLUFTQ0lJIGNoYXJhY3RlcnMsIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWZcbiAgICAgIC8vIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCBhbHJlYWR5IGlzIEFTQ0lJLW9ubHkuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gcHVueWNvZGUudG9BU0NJSSh0aGlzLmhvc3RuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICBpZiAocmVzdC5pbmRleE9mKGFlKSA9PT0gLTEpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG4gICAgICBpZiAoZXNjID09PSBhZSkge1xuICAgICAgICBlc2MgPSBlc2NhcGUoYWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHJlc3Quc3BsaXQoYWUpLmpvaW4oZXNjKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHRoaXMucXVlcnkgPSByZXN0LnN1YnN0cihxbSArIDEpO1xuICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG4gICAgfVxuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgLy8gbm8gcXVlcnkgc3RyaW5nLCBidXQgcGFyc2VRdWVyeVN0cmluZyBzdGlsbCByZXF1ZXN0ZWRcbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgdGhpcy5wYXRobmFtZSA9IHJlc3Q7XG4gIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcbiAgICAgIHRoaXMuaG9zdG5hbWUgJiYgIXRoaXMucGF0aG5hbWUpIHtcbiAgICB0aGlzLnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuICAgIHZhciBwID0gdGhpcy5wYXRobmFtZSB8fCAnJztcbiAgICB2YXIgcyA9IHRoaXMuc2VhcmNoIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIHRoaXMuaHJlZiA9IHRoaXMuZm9ybWF0KCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9ybWF0IGEgcGFyc2VkIG9iamVjdCBpbnRvIGEgdXJsIHN0cmluZ1xuZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuICAvLyBlbnN1cmUgaXQncyBhbiBvYmplY3QsIGFuZCBub3QgYSBzdHJpbmcgdXJsLlxuICAvLyBJZiBpdCdzIGFuIG9iaiwgdGhpcyBpcyBhIG5vLW9wLlxuICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG4gIC8vIHRvIGNsZWFuIHVwIHBvdGVudGlhbGx5IHdvbmt5IHVybHMuXG4gIGlmICh1dGlsLmlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIHV0aWwuaXNPYmplY3QodGhpcy5xdWVyeSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucXVlcnkpLmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMucXVlcnkpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgLy8gb25seSB0aGUgc2xhc2hlZFByb3RvY29scyBnZXQgdGhlIC8vLiAgTm90IG1haWx0bzosIHhtcHA6LCBldGMuXG4gIC8vIHVubGVzcyB0aGV5IGhhZCB0aGVtIHRvIGJlZ2luIHdpdGguXG4gIGlmICh0aGlzLnNsYXNoZXMgfHxcbiAgICAgICghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29sW3Byb3RvY29sXSkgJiYgaG9zdCAhPT0gZmFsc2UpIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWU7XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJyc7XG4gIH1cblxuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaDtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKCcjJywgJyUyMycpO1xuXG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlKHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmUocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICByZXR1cm4gdGhpcy5yZXNvbHZlT2JqZWN0KHVybFBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSkpLmZvcm1hdCgpO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZU9iamVjdChzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIGlmICghc291cmNlKSByZXR1cm4gcmVsYXRpdmU7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlT2JqZWN0KHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlT2JqZWN0ID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocmVsYXRpdmUpKSB7XG4gICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcbiAgICByZWwucGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKTtcbiAgICByZWxhdGl2ZSA9IHJlbDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVXJsKCk7XG4gIHZhciB0a2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICBmb3IgKHZhciB0ayA9IDA7IHRrIDwgdGtleXMubGVuZ3RoOyB0aysrKSB7XG4gICAgdmFyIHRrZXkgPSB0a2V5c1t0a107XG4gICAgcmVzdWx0W3RrZXldID0gdGhpc1t0a2V5XTtcbiAgfVxuXG4gIC8vIGhhc2ggaXMgYWx3YXlzIG92ZXJyaWRkZW4sIG5vIG1hdHRlciB3aGF0LlxuICAvLyBldmVuIGhyZWY9XCJcIiB3aWxsIHJlbW92ZSBpdC5cbiAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIC8vIGlmIHRoZSByZWxhdGl2ZSB1cmwgaXMgZW1wdHksIHRoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG8gaGVyZS5cbiAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAvLyB0YWtlIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBwcm90b2NvbCBmcm9tIHJlbGF0aXZlXG4gICAgdmFyIHJrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgIGZvciAodmFyIHJrID0gMDsgcmsgPCBya2V5cy5sZW5ndGg7IHJrKyspIHtcbiAgICAgIHZhciBya2V5ID0gcmtleXNbcmtdO1xuICAgICAgaWYgKHJrZXkgIT09ICdwcm90b2NvbCcpXG4gICAgICAgIHJlc3VsdFtya2V5XSA9IHJlbGF0aXZlW3JrZXldO1xuICAgIH1cblxuICAgIC8vdXJsUGFyc2UgYXBwZW5kcyB0cmFpbGluZyAvIHRvIHVybHMgbGlrZSBodHRwOi8vd3d3LmV4YW1wbGUuY29tXG4gICAgaWYgKHNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdICYmXG4gICAgICAgIHJlc3VsdC5ob3N0bmFtZSAmJiAhcmVzdWx0LnBhdGhuYW1lKSB7XG4gICAgICByZXN1bHQucGF0aCA9IHJlc3VsdC5wYXRobmFtZSA9ICcvJztcbiAgICB9XG5cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKHJlbGF0aXZlLnByb3RvY29sICYmIHJlbGF0aXZlLnByb3RvY29sICE9PSByZXN1bHQucHJvdG9jb2wpIHtcbiAgICAvLyBpZiBpdCdzIGEga25vd24gdXJsIHByb3RvY29sLCB0aGVuIGNoYW5naW5nXG4gICAgLy8gdGhlIHByb3RvY29sIGRvZXMgd2VpcmQgdGhpbmdzXG4gICAgLy8gZmlyc3QsIGlmIGl0J3Mgbm90IGZpbGU6LCB0aGVuIHdlIE1VU1QgaGF2ZSBhIGhvc3QsXG4gICAgLy8gYW5kIGlmIHRoZXJlIHdhcyBhIHBhdGhcbiAgICAvLyB0byBiZWdpbiB3aXRoLCB0aGVuIHdlIE1VU1QgaGF2ZSBhIHBhdGguXG4gICAgLy8gaWYgaXQgaXMgZmlsZTosIHRoZW4gdGhlIGhvc3QgaXMgZHJvcHBlZCxcbiAgICAvLyBiZWNhdXNlIHRoYXQncyBrbm93biB0byBiZSBob3N0bGVzcy5cbiAgICAvLyBhbnl0aGluZyBlbHNlIGlzIGFzc3VtZWQgdG8gYmUgYWJzb2x1dGUuXG4gICAgaWYgKCFzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICAgIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgICAgICB2YXIgayA9IGtleXNbdl07XG4gICAgICAgIHJlc3VsdFtrXSA9IHJlbGF0aXZlW2tdO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghdXRpbC5pc051bGxPclVuZGVmaW5lZChyZWxhdGl2ZS5zZWFyY2gpKSB7XG4gICAgLy8ganVzdCBwdWxsIG91dCB0aGUgc2VhcmNoLlxuICAgIC8vIGxpa2UgaHJlZj0nP2ZvbycuXG4gICAgLy8gUHV0IHRoaXMgYWZ0ZXIgdGhlIG90aGVyIHR3byBjYXNlcyBiZWNhdXNlIGl0IHNpbXBsaWZpZXMgdGhlIGJvb2xlYW5zXG4gICAgaWYgKHBzeWNob3RpYykge1xuICAgICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBzcmNQYXRoLnNoaWZ0KCk7XG4gICAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuICAgICAgcmVzdWx0LnBhdGggPSAnLycgKyByZXN1bHQuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgLy8gaG93ZXZlciwgaWYgaXQgZW5kcyBpbiBhbnl0aGluZyBlbHNlIG5vbi1zbGFzaHksXG4gIC8vIHRoZW4gaXQgbXVzdCBOT1QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gKFxuICAgICAgKHJlc3VsdC5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgfHwgc3JjUGF0aC5sZW5ndGggPiAxKSAmJlxuICAgICAgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fCBsYXN0ID09PSAnJyk7XG5cbiAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGFzdCA9IHNyY1BhdGhbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzIHx8IChyZXN1bHQuaG9zdCAmJiBzcmNQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IHJlcXVlc3QuaHR0cFxuICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgfVxuICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGggfHwgcmVzdWx0LmF1dGg7XG4gIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5VcmwucHJvdG90eXBlLnBhcnNlSG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgdmFyIHBvcnQgPSBwb3J0UGF0dGVybi5leGVjKGhvc3QpO1xuICBpZiAocG9ydCkge1xuICAgIHBvcnQgPSBwb3J0WzBdO1xuICAgIGlmIChwb3J0ICE9PSAnOicpIHtcbiAgICAgIHRoaXMucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIHRoaXMuaG9zdG5hbWUgPSBob3N0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzU3RyaW5nOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnO1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsT3JVbmRlZmluZWQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT0gbnVsbDtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL3V0aWwvdHlwZXMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMTEyY2M3YzI3NTUxMjU0YWEyYjE3MDk4ZmI3NzQ4NjdmMDVlZDBkOVxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc0FyZ3VtZW50c09iamVjdCA9IHJlcXVpcmUoJ2lzLWFyZ3VtZW50cycpO1xudmFyIGlzR2VuZXJhdG9yRnVuY3Rpb24gPSByZXF1aXJlKCdpcy1nZW5lcmF0b3ItZnVuY3Rpb24nKTtcbnZhciB3aGljaFR5cGVkQXJyYXkgPSByZXF1aXJlKCd3aGljaC10eXBlZC1hcnJheScpO1xudmFyIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2lzLXR5cGVkLWFycmF5Jyk7XG5cbmZ1bmN0aW9uIHVuY3VycnlUaGlzKGYpIHtcbiAgcmV0dXJuIGYuY2FsbC5iaW5kKGYpO1xufVxuXG52YXIgQmlnSW50U3VwcG9ydGVkID0gdHlwZW9mIEJpZ0ludCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgU3ltYm9sU3VwcG9ydGVkID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBPYmplY3RUb1N0cmluZyA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpO1xuXG52YXIgbnVtYmVyVmFsdWUgPSB1bmN1cnJ5VGhpcyhOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YpO1xudmFyIHN0cmluZ1ZhbHVlID0gdW5jdXJyeVRoaXMoU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mKTtcbnZhciBib29sZWFuVmFsdWUgPSB1bmN1cnJ5VGhpcyhCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mKTtcblxuaWYgKEJpZ0ludFN1cHBvcnRlZCkge1xuICB2YXIgYmlnSW50VmFsdWUgPSB1bmN1cnJ5VGhpcyhCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YpO1xufVxuXG5pZiAoU3ltYm9sU3VwcG9ydGVkKSB7XG4gIHZhciBzeW1ib2xWYWx1ZSA9IHVuY3VycnlUaGlzKFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZik7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHByb3RvdHlwZVZhbHVlT2YpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICBwcm90b3R5cGVWYWx1ZU9mKHZhbHVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydHMuaXNBcmd1bWVudHNPYmplY3QgPSBpc0FyZ3VtZW50c09iamVjdDtcbmV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGlzR2VuZXJhdG9yRnVuY3Rpb247XG5leHBvcnRzLmlzVHlwZWRBcnJheSA9IGlzVHlwZWRBcnJheTtcblxuLy8gVGFrZW4gZnJvbSBoZXJlIGFuZCBtb2RpZmllZCBmb3IgYmV0dGVyIGJyb3dzZXIgc3VwcG9ydFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9wLWlzLXByb21pc2UvYmxvYi9jZGEzNWE1MTNiZGEwM2Y5NzdhZDVjZGUzYTA3OWQyMzdlODJkN2VmL2luZGV4LmpzXG5mdW5jdGlvbiBpc1Byb21pc2UoaW5wdXQpIHtcblx0cmV0dXJuIChcblx0XHQoXG5cdFx0XHR0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdGlucHV0IGluc3RhbmNlb2YgUHJvbWlzZVxuXHRcdCkgfHxcblx0XHQoXG5cdFx0XHRpbnB1dCAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIGlucHV0LnRoZW4gPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdHR5cGVvZiBpbnB1dC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdClcblx0KTtcbn1cbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgaXNUeXBlZEFycmF5KHZhbHVlKSB8fFxuICAgIGlzRGF0YVZpZXcodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXJWaWV3ID0gaXNBcnJheUJ1ZmZlclZpZXc7XG5cblxuZnVuY3Rpb24gaXNVaW50OEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDhBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDhBcnJheSA9IGlzVWludDhBcnJheTtcblxuZnVuY3Rpb24gaXNVaW50OENsYW1wZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ1VpbnQ4Q2xhbXBlZEFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50OENsYW1wZWRBcnJheSA9IGlzVWludDhDbGFtcGVkQXJyYXk7XG5cbmZ1bmN0aW9uIGlzVWludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50MTZBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDE2QXJyYXkgPSBpc1VpbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc1VpbnQzMkFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDMyQXJyYXknO1xufVxuZXhwb3J0cy5pc1VpbnQzMkFycmF5ID0gaXNVaW50MzJBcnJheTtcblxuZnVuY3Rpb24gaXNJbnQ4QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQ4QXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDhBcnJheSA9IGlzSW50OEFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQxNkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQxNkFycmF5ID0gaXNJbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDMyQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQzMkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQzMkFycmF5ID0gaXNJbnQzMkFycmF5O1xuXG5mdW5jdGlvbiBpc0Zsb2F0MzJBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0Zsb2F0MzJBcnJheSc7XG59XG5leHBvcnRzLmlzRmxvYXQzMkFycmF5ID0gaXNGbG9hdDMyQXJyYXk7XG5cbmZ1bmN0aW9uIGlzRmxvYXQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnRmxvYXQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNGbG9hdDY0QXJyYXkgPSBpc0Zsb2F0NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdJbnQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnQmlnSW50NjRBcnJheSc7XG59XG5leHBvcnRzLmlzQmlnSW50NjRBcnJheSA9IGlzQmlnSW50NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdVaW50NjRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0JpZ1VpbnQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNCaWdVaW50NjRBcnJheSA9IGlzQmlnVWludDY0QXJyYXk7XG5cbmZ1bmN0aW9uIGlzTWFwVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgTWFwXSc7XG59XG5pc01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzTWFwVG9TdHJpbmcobmV3IE1hcCgpKVxuKTtcblxuZnVuY3Rpb24gaXNNYXAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzTWFwVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNNYXBUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgTWFwO1xufVxuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xuXG5mdW5jdGlvbiBpc1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNldF0nO1xufVxuaXNTZXRUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1NldFRvU3RyaW5nKG5ldyBTZXQoKSlcbik7XG5mdW5jdGlvbiBpc1NldCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNTZXRUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NldFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBTZXQ7XG59XG5leHBvcnRzLmlzU2V0ID0gaXNTZXQ7XG5cbmZ1bmN0aW9uIGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtNYXBdJztcbn1cbmlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtNYXBUb1N0cmluZyhuZXcgV2Vha01hcCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha01hcCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBXZWFrTWFwO1xufVxuZXhwb3J0cy5pc1dlYWtNYXAgPSBpc1dlYWtNYXA7XG5cbmZ1bmN0aW9uIGlzV2Vha1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtTZXRdJztcbn1cbmlzV2Vha1NldFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtTZXRUb1N0cmluZyhuZXcgV2Vha1NldCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha1NldCh2YWx1ZSkge1xuICByZXR1cm4gaXNXZWFrU2V0VG9TdHJpbmcodmFsdWUpO1xufVxuZXhwb3J0cy5pc1dlYWtTZXQgPSBpc1dlYWtTZXQ7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNBcnJheUJ1ZmZlclRvU3RyaW5nKG5ldyBBcnJheUJ1ZmZlcigpKVxuKTtcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXIgPSBpc0FycmF5QnVmZmVyO1xuXG5mdW5jdGlvbiBpc0RhdGFWaWV3VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0YVZpZXddJztcbn1cbmlzRGF0YVZpZXdUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBEYXRhVmlldyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNEYXRhVmlld1RvU3RyaW5nKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSksIDAsIDEpKVxuKTtcbmZ1bmN0aW9uIGlzRGF0YVZpZXcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNEYXRhVmlld1RvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzRGF0YVZpZXdUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgRGF0YVZpZXc7XG59XG5leHBvcnRzLmlzRGF0YVZpZXcgPSBpc0RhdGFWaWV3O1xuXG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2hhcmVkQXJyYXlCdWZmZXJdJztcbn1cbmlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZyhuZXcgU2hhcmVkQXJyYXlCdWZmZXIoKSlcbik7XG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyO1xufVxuZXhwb3J0cy5pc1NoYXJlZEFycmF5QnVmZmVyID0gaXNTaGFyZWRBcnJheUJ1ZmZlcjtcblxuZnVuY3Rpb24gaXNBc3luY0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJztcbn1cbmV4cG9ydHMuaXNBc3luY0Z1bmN0aW9uID0gaXNBc3luY0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc01hcEl0ZXJhdG9yKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IE1hcCBJdGVyYXRvcl0nO1xufVxuZXhwb3J0cy5pc01hcEl0ZXJhdG9yID0gaXNNYXBJdGVyYXRvcjtcblxuZnVuY3Rpb24gaXNTZXRJdGVyYXRvcih2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBTZXQgSXRlcmF0b3JdJztcbn1cbmV4cG9ydHMuaXNTZXRJdGVyYXRvciA9IGlzU2V0SXRlcmF0b3I7XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEdlbmVyYXRvcl0nO1xufVxuZXhwb3J0cy5pc0dlbmVyYXRvck9iamVjdCA9IGlzR2VuZXJhdG9yT2JqZWN0O1xuXG5mdW5jdGlvbiBpc1dlYkFzc2VtYmx5Q29tcGlsZWRNb2R1bGUodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgV2ViQXNzZW1ibHkuTW9kdWxlXSc7XG59XG5leHBvcnRzLmlzV2ViQXNzZW1ibHlDb21waWxlZE1vZHVsZSA9IGlzV2ViQXNzZW1ibHlDb21waWxlZE1vZHVsZTtcblxuZnVuY3Rpb24gaXNOdW1iZXJPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIG51bWJlclZhbHVlKTtcbn1cbmV4cG9ydHMuaXNOdW1iZXJPYmplY3QgPSBpc051bWJlck9iamVjdDtcblxuZnVuY3Rpb24gaXNTdHJpbmdPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHN0cmluZ1ZhbHVlKTtcbn1cbmV4cG9ydHMuaXNTdHJpbmdPYmplY3QgPSBpc1N0cmluZ09iamVjdDtcblxuZnVuY3Rpb24gaXNCb29sZWFuT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBib29sZWFuVmFsdWUpO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW5PYmplY3QgPSBpc0Jvb2xlYW5PYmplY3Q7XG5cbmZ1bmN0aW9uIGlzQmlnSW50T2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBCaWdJbnRTdXBwb3J0ZWQgJiYgY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgYmlnSW50VmFsdWUpO1xufVxuZXhwb3J0cy5pc0JpZ0ludE9iamVjdCA9IGlzQmlnSW50T2JqZWN0O1xuXG5mdW5jdGlvbiBpc1N5bWJvbE9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gU3ltYm9sU3VwcG9ydGVkICYmIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHN5bWJvbFZhbHVlKTtcbn1cbmV4cG9ydHMuaXNTeW1ib2xPYmplY3QgPSBpc1N5bWJvbE9iamVjdDtcblxuZnVuY3Rpb24gaXNCb3hlZFByaW1pdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIGlzTnVtYmVyT2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzU3RyaW5nT2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzQm9vbGVhbk9iamVjdCh2YWx1ZSkgfHxcbiAgICBpc0JpZ0ludE9iamVjdCh2YWx1ZSkgfHxcbiAgICBpc1N5bWJvbE9iamVjdCh2YWx1ZSlcbiAgKTtcbn1cbmV4cG9ydHMuaXNCb3hlZFByaW1pdGl2ZSA9IGlzQm94ZWRQcmltaXRpdmU7XG5cbmZ1bmN0aW9uIGlzQW55QXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiAoXG4gICAgaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHxcbiAgICBpc1NoYXJlZEFycmF5QnVmZmVyKHZhbHVlKVxuICApO1xufVxuZXhwb3J0cy5pc0FueUFycmF5QnVmZmVyID0gaXNBbnlBcnJheUJ1ZmZlcjtcblxuWydpc1Byb3h5JywgJ2lzRXh0ZXJuYWwnLCAnaXNNb2R1bGVOYW1lc3BhY2VPYmplY3QnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbWV0aG9kLCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1ldGhvZCArICcgaXMgbm90IHN1cHBvcnRlZCBpbiB1c2VybGFuZCcpO1xuICAgIH1cbiAgfSk7XG59KTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIHx8XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIHZhciBkZXNjcmlwdG9ycyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgZGVzY3JpcHRvcnNba2V5c1tpXV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgfTtcblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZSZWdleCA9IC9eJC87XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSB7XG4gIHZhciBkZWJ1Z0VudiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUc7XG4gIGRlYnVnRW52ID0gZGVidWdFbnYucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCs/Ll0vZywgJ1xcXFwkJicpXG4gICAgLnJlcGxhY2UoL1xcKi9nLCAnLionKVxuICAgIC5yZXBsYWNlKC8sL2csICckfF4nKVxuICAgIC50b1VwcGVyQ2FzZSgpO1xuICBkZWJ1Z0VudlJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBkZWJ1Z0VudiArICckJywgJ2knKTtcbn1cbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAoZGVidWdFbnZSZWdleC50ZXN0KHNldCkpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZXhwb3J0cy50eXBlcyA9IHJlcXVpcmUoJy4vc3VwcG9ydC90eXBlcycpO1xuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuZXhwb3J0cy50eXBlcy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcbmV4cG9ydHMudHlwZXMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5leHBvcnRzLnR5cGVzLmlzTmF0aXZlRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG52YXIga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2woJ3V0aWwucHJvbWlzaWZ5LmN1c3RvbScpIDogdW5kZWZpbmVkO1xuXG5leHBvcnRzLnByb21pc2lmeSA9IGZ1bmN0aW9uIHByb21pc2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCAmJiBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdKSB7XG4gICAgdmFyIGZuID0gb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJ1dGlsLnByb21pc2lmeS5jdXN0b21cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgZnVuY3Rpb24gZm4oKSB7XG4gICAgdmFyIHByb21pc2VSZXNvbHZlLCBwcm9taXNlUmVqZWN0O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcHJvbWlzZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgcHJvbWlzZVJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcblxuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgICBhcmdzLnB1c2goZnVuY3Rpb24gKGVyciwgdmFsdWUpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZVJlc29sdmUodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGZuLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG4gICAgZm4sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbClcbiAgKTtcbn1cblxuZXhwb3J0cy5wcm9taXNpZnkuY3VzdG9tID0ga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5T25SZWplY3RlZChyZWFzb24sIGNiKSB7XG4gIC8vIGAhcmVhc29uYCBndWFyZCBpbnNwaXJlZCBieSBibHVlYmlyZCAoUmVmOiBodHRwczovL2dvby5nbC90NUlTNk0pLlxuICAvLyBCZWNhdXNlIGBudWxsYCBpcyBhIHNwZWNpYWwgZXJyb3IgdmFsdWUgaW4gY2FsbGJhY2tzIHdoaWNoIG1lYW5zIFwibm8gZXJyb3JcbiAgLy8gb2NjdXJyZWRcIiwgd2UgZXJyb3Itd3JhcCBzbyB0aGUgY2FsbGJhY2sgY29uc3VtZXIgY2FuIGRpc3Rpbmd1aXNoIGJldHdlZW5cbiAgLy8gXCJ0aGUgcHJvbWlzZSByZWplY3RlZCB3aXRoIG51bGxcIiBvciBcInRoZSBwcm9taXNlIGZ1bGZpbGxlZCB3aXRoIHVuZGVmaW5lZFwiLlxuICBpZiAoIXJlYXNvbikge1xuICAgIHZhciBuZXdSZWFzb24gPSBuZXcgRXJyb3IoJ1Byb21pc2Ugd2FzIHJlamVjdGVkIHdpdGggYSBmYWxzeSB2YWx1ZScpO1xuICAgIG5ld1JlYXNvbi5yZWFzb24gPSByZWFzb247XG4gICAgcmVhc29uID0gbmV3UmVhc29uO1xuICB9XG4gIHJldHVybiBjYihyZWFzb24pO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIC8vIFdlIERPIE5PVCByZXR1cm4gdGhlIHByb21pc2UgYXMgaXQgZ2l2ZXMgdGhlIHVzZXIgYSBmYWxzZSBzZW5zZSB0aGF0XG4gIC8vIHRoZSBwcm9taXNlIGlzIGFjdHVhbGx5IHNvbWVob3cgcmVsYXRlZCB0byB0aGUgY2FsbGJhY2sncyBleGVjdXRpb25cbiAgLy8gYW5kIHRoYXQgdGhlIGNhbGxiYWNrIHRocm93aW5nIHdpbGwgcmVqZWN0IHRoZSBwcm9taXNlLlxuICBmdW5jdGlvbiBjYWxsYmFja2lmaWVkKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIHZhciBtYXliZUNiID0gYXJncy5wb3AoKTtcbiAgICBpZiAodHlwZW9mIG1heWJlQ2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsYXN0IGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGNiID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbWF5YmVDYi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgLy8gSW4gdHJ1ZSBub2RlIHN0eWxlIHdlIHByb2Nlc3MgdGhlIGNhbGxiYWNrIG9uIGBuZXh0VGlja2Agd2l0aCBhbGwgdGhlXG4gICAgLy8gaW1wbGljYXRpb25zIChzdGFjaywgYHVuY2F1Z2h0RXhjZXB0aW9uYCwgYGFzeW5jX2hvb2tzYClcbiAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmV0KSB7IHByb2Nlc3MubmV4dFRpY2soY2IuYmluZChudWxsLCBudWxsLCByZXQpKSB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVqKSB7IHByb2Nlc3MubmV4dFRpY2soY2FsbGJhY2tpZnlPblJlamVjdGVkLmJpbmQobnVsbCwgcmVqLCBjYikpIH0pO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNhbGxiYWNraWZpZWQsIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjYWxsYmFja2lmaWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKSk7XG4gIHJldHVybiBjYWxsYmFja2lmaWVkO1xufVxuZXhwb3J0cy5jYWxsYmFja2lmeSA9IGNhbGxiYWNraWZ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcbnZhciBhdmFpbGFibGVUeXBlZEFycmF5cyA9IHJlcXVpcmUoJ2F2YWlsYWJsZS10eXBlZC1hcnJheXMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gaGFzU3ltYm9scyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxudmFyIHR5cGVkQXJyYXlzID0gYXZhaWxhYmxlVHlwZWRBcnJheXMoKTtcblxudmFyICRzbGljZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5zbGljZScpO1xudmFyIHRvU3RyVGFncyA9IHt9O1xudmFyIGdPUEQgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9oZWxwZXJzL2dldE93blByb3BlcnR5RGVzY3JpcHRvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mOyAvLyByZXF1aXJlKCdnZXRwcm90b3R5cGVvZicpO1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG90eXBlT2YpIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHRpZiAodHlwZW9mIGdsb2JhbFt0eXBlZEFycmF5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dmFyIGFyciA9IG5ldyBnbG9iYWxbdHlwZWRBcnJheV0oKTtcblx0XHRcdGlmICghKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBhcnIpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFdmFsRXJyb3IoJ3RoaXMgZW5naW5lIGhhcyBzdXBwb3J0IGZvciBTeW1ib2wudG9TdHJpbmdUYWcsIGJ1dCAnICsgdHlwZWRBcnJheSArICcgZG9lcyBub3QgaGF2ZSB0aGUgcHJvcGVydHkhIFBsZWFzZSByZXBvcnQgdGhpcy4nKTtcblx0XHRcdH1cblx0XHRcdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGFycik7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IGdPUEQocHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHRpZiAoIWRlc2NyaXB0b3IpIHtcblx0XHRcdFx0dmFyIHN1cGVyUHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90byk7XG5cdFx0XHRcdGRlc2NyaXB0b3IgPSBnT1BEKHN1cGVyUHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHR9XG5cdFx0XHR0b1N0clRhZ3NbdHlwZWRBcnJheV0gPSBkZXNjcmlwdG9yLmdldDtcblx0XHR9XG5cdH0pO1xufVxuXG52YXIgdHJ5VHlwZWRBcnJheXMgPSBmdW5jdGlvbiB0cnlBbGxUeXBlZEFycmF5cyh2YWx1ZSkge1xuXHR2YXIgZm91bmROYW1lID0gZmFsc2U7XG5cdGZvckVhY2godG9TdHJUYWdzLCBmdW5jdGlvbiAoZ2V0dGVyLCB0eXBlZEFycmF5KSB7XG5cdFx0aWYgKCFmb3VuZE5hbWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBuYW1lID0gZ2V0dGVyLmNhbGwodmFsdWUpO1xuXHRcdFx0XHRpZiAobmFtZSA9PT0gdHlwZWRBcnJheSkge1xuXHRcdFx0XHRcdGZvdW5kTmFtZSA9IG5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGZvdW5kTmFtZTtcbn07XG5cbnZhciBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdpcy10eXBlZC1hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkge1xuXHRpZiAoIWlzVHlwZWRBcnJheSh2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHsgcmV0dXJuICRzbGljZSgkdG9TdHJpbmcodmFsdWUpLCA4LCAtMSk7IH1cblx0cmV0dXJuIHRyeVR5cGVkQXJyYXlzKHZhbHVlKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiZXhwb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuL2NsaWVudCc7XG4iXSwic291cmNlUm9vdCI6IiJ9
