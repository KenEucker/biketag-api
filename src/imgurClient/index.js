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
            /*! process/browser */ './node_modules/process/bundle.js'
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
            /*! process/browser */ './node_modules/process/bundle.js'
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
            /*! process/browser */ './node_modules/process/bundle.js'
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

      /***/ './node_modules/form-data/lib/bundle.js':
        /*!***********************************************!*\
  !*** ./node_modules/form-data/lib/bundle.js ***!
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

      /***/ './node_modules/inherits/inherits_bundle.js':
        /*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_bundle.js ***!
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

      /***/ './node_modules/process/bundle.js':
        /*!*****************************************!*\
  !*** ./node_modules/process/bundle.js ***!
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
              this.plainFetcher = axios_1.default.create({
                baseURL: endpoints_1.IMGUR_API_PREFIX,
                headers: {
                  'User-Agent': USERAGENT,
                },
                responseType: 'json',
              })
              this.fetcher = axios_1.default.create({
                baseURL: endpoints_1.IMGUR_API_PREFIX,
                headers: {
                  'User-Agent': USERAGENT,
                },
                responseType: 'json',
              })
              this.fetcher.interceptors.request.use(
                async (config) => {
                  config.headers = config.headers ? config.headers : {}
                  config.headers.authorization = await getAuthorizationHeader_1.getAuthorizationHeader(
                    this
                  )
                  return config
                },
                (e) => Promise.reject(e)
              )
            }
            plainRequest(options) {
              return this.plainFetcher(options)
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
          exports.getImgurApiResponseFromResponse = exports.createForm = exports.getSource = exports.isStream = exports.isImageUrl = exports.isBase64 = void 0
          const tslib_1 = __webpack_require__(
            /*! tslib */ './node_modules/tslib/tslib.es6.js'
          )
          const form_data_1 = tslib_1.__importDefault(
            __webpack_require__(
              /*! form-data */ './node_modules/form-data/lib/bundle.js'
            )
          )
          function isBase64(payload) {
            if (typeof payload === 'string') {
              return false
            }
            return (
              typeof payload.base64 !== 'undefined' && payload.type === 'base64'
            )
          }
          exports.isBase64 = isBase64
          function isImageUrl(payload) {
            if (typeof payload === 'string') {
              return true
            }
            return (
              typeof payload.image !== 'undefined' && payload.type === 'url'
            )
          }
          exports.isImageUrl = isImageUrl
          function isStream(payload) {
            if (typeof payload === 'string') {
              return false
            }
            return typeof payload.stream !== 'undefined'
          }
          exports.isStream = isStream
          // TODO: Refactor this to be a unique name of some kind (a hash?)
          function getSource(payload) {
            if (typeof payload === 'string') {
              return payload
            }
            if (isBase64(payload)) {
              return 'payload.base64'
            } else if (isStream(payload)) {
              return 'payload.stream'
            } else {
              return payload.image
            }
          }
          exports.getSource = getSource
          function createForm(payload) {
            const form = new form_data_1.default()
            if (typeof payload === 'string') {
              form.append('image', payload)
              return form
            }
            for (const [key, value] of Object.entries(payload)) {
              const supportedUploadObjectTypes = ['base64', 'stream']
              if (supportedUploadObjectTypes.indexOf(key) !== -1) {
                if (supportedUploadObjectTypes.indexOf(payload.type) !== -1) {
                  form.append(key, payload)
                }
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
              status: response.status,
              // TODO: determine the success of the call?
              success: true,
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
            let response = await client.plainRequest(options)
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
            const authorizeToken = matches[2]
            options.method = 'POST'
            options.data = {
              username,
              password,
              allow: authorizeToken,
            }
            options.followRedirect = false
            options.headers = {
              cookie: `authorize_token=${authorizeToken}`,
            }
            response = await client.plainRequest(options)
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
                /* eslint no-async-promise-executor: 0 */
                return new Promise(async function (resolve) {
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
          /* provided dependency */ var console = __webpack_require__(
            /*! console-browserify */ './node_modules/console-browserify/index.js'
          )

          Object.defineProperty(exports, '__esModule', { value: true })
          exports.upload = void 0
          const utils_1 = __webpack_require__(
            /*! ../common/utils */ './src/common/utils.ts'
          )
          const endpoints_1 = __webpack_require__(
            /*! ../common/endpoints */ './src/common/endpoints.ts'
          )
          async function upload(client, payload) {
            if (Array.isArray(payload)) {
              const promises = payload.map((p) => {
                const form = utils_1.createForm(p)
                /* eslint no-async-promise-executor: 0 */
                return new Promise(async (resolve) => {
                  resolve(
                    utils_1.getImgurApiResponseFromResponse(
                      await client.request({
                        url: endpoints_1.UPLOAD_ENDPOINT,
                        method: 'POST',
                        data: form,
                        onUploadProgress: (progressEvent) => {
                          console.log({ progressEvent })
                          client.emit('uploadProgress', { ...progressEvent })
                        },
                      })
                    )
                  )
                })
              })
              return await Promise.all(promises)
            }
            const form = utils_1.createForm(payload)
            // const id = Date.now.toString();
            const request = await client.request({
              url: endpoints_1.UPLOAD_ENDPOINT,
              method: 'POST',
              data: form,
              onUploadProgress: (progressEvent) => {
                console.log({ progressEvent })
                client.emit('uploadProgress', { ...progressEvent })
              },
            })
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

      /***/ './node_modules/util/support/isBufferbundle.js':
        /*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferbundle.js ***!
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
            /*! process/browser */ './node_modules/process/bundle.js'
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
            /*! ./support/isBuffer */ './node_modules/util/support/isBufferbundle.js'
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
            /*! inherits */ './node_modules/inherits/inherits_bundle.js'
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
    } /* webpack/runtime/define property getters */ /******/
    /******/
    /************************************************************************/
    /******/ ;(() => {
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
    })() /* webpack/runtime/global */ /******/
    /******/
    /******/
    ;(() => {
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
    })() /* webpack/runtime/hasOwnProperty shorthand */ /******/
    /******/
    /******/
    ;(() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop)
      /******/
    })() /* webpack/runtime/make namespace object */ /******/
    /******/
    /******/
    ;(() => {
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
    })() /* webpack/runtime/node module decorator */ /******/
    /******/
    /******/
    ;(() => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbWd1ci1hcGkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hcnJheS1maWx0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9hc3NlcnQuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvZXJyb3JzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXZhaWxhYmxlLXR5cGVkLWFycmF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZGVmaW5lLXByb3BlcnRpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L2hlbHBlcnMvZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9lczYtb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZm9yZWFjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZm9ybS1kYXRhL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9nZXQtaW50cmluc2ljL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9oYXMtc3ltYm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvc2hhbXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2lzLWFyZ3VtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtZ2VuZXJhdG9yLWZ1bmN0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9pcy1uYW4vaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtbmFuL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9pcy1uYW4vc2hpbS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtdHlwZWQtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9zaGltLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2RlY29kZS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmcvZW5jb2RlLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvYWxidW0vZ2V0QWxidW0udHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2FsYnVtL2luZGV4LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2NvbW1vbi9lbmRwb2ludHMudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2NvbW1vbi90eXBlcy50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvY29tbW9uL3V0aWxzLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9nYWxsZXJ5L2dldEdhbGxlcnkudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2dhbGxlcnkvZ2V0U3VicmVkZGl0R2FsbGVyeS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvZ2FsbGVyeS9pbmRleC50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvZ2FsbGVyeS9zZWFyY2hHYWxsZXJ5LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9nZXRBdXRob3JpemF0aW9uSGVhZGVyLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9pbWFnZS9kZWxldGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvZmF2b3JpdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvZ2V0SW1hZ2UudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2ltYWdlL2luZGV4LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9pbWFnZS91cGRhdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvdXBsb2FkLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC9ub2RlX21vZHVsZXMvcHVueWNvZGUvcHVueWNvZGUuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC91cmwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC91dGlsLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvd2hpY2gtdHlwZWQtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ltZ3VyLWFwaS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNhOztBQUViLHVCQUF1QiwyRUFBMkUsa0NBQWtDLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxrQ0FBa0MsOEhBQThILEdBQUcsRUFBRSxxQkFBcUI7O0FBRTdWLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLGVBQWUsbUJBQU8sQ0FBQyx5RUFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixtQkFBTyxDQUFDLHlHQUFtQzs7QUFFaEUsZ0JBQWdCLG1CQUFPLENBQUMsMENBQU87QUFDL0I7O0FBRUEscUJBQXFCLHFFQUFzQjtBQUMzQztBQUNBOztBQUVBLG1EQUFtRCxnR0FBbUM7QUFDdEYsdUNBQXVDLG1CQUFPLENBQUMsb0RBQVc7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsNkZBQTZCOztBQUV4RDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGlCQUFpQixPQUFPLGVBQWUsT0FBTyxlQUFlLE9BQU8sV0FBVyxPQUFPO0FBQ3RGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUI7O0FBRW5COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTtBQUNBLHFFQUFxRSxhQUFhO0FBQ2xGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxlQUFlOztBQUVmOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7O0FBRWY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQix1QkFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIOztBQUVBLFFBQVEsa0JBQWtCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsd0JBQXdCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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ZDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx5QkFBeUI7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkRBQTZELGFBQWE7QUFDMUU7QUFDQSw2REFBNkQsYUFBYTtBQUMxRTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGFBQWE7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvZUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTs7Ozs7Ozs7Ozs7O0FDRGE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7O0FBRUEsOEVBQThFLHFDQUFxQyxFQUFFOztBQUVySDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkRhOztBQUViLHFCQUFxQixtQkFBTyxDQUFDLHdFQUFrQjs7QUFFL0M7Ozs7Ozs7Ozs7OztBQ0phOztBQUViOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsK0NBQStDO0FBQ2hGLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsRUFBRTtBQUNGLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUEsaUJBQWlCLG1CQUFPLENBQUMsd0RBQWE7O0FBRXRDLHNEQUFzRCxvQkFBb0IsR0FBRzs7QUFFN0U7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRCxFQUFFO0FBQ0YsZ0RBQWdEO0FBQ2hELEVBQUU7QUFDRixzREFBc0Q7QUFDdEQsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyw0REFBZTtBQUNsQyxhQUFhLG1CQUFPLENBQUMsNENBQUs7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4QixrQkFBa0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6VWE7O0FBRWI7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyxvREFBUzs7QUFFckM7QUFDQSx3Q0FBd0MsY0FBYztBQUN0RCxvQ0FBb0MsY0FBYztBQUNsRCw2Q0FBNkMsY0FBYztBQUMzRCx5Q0FBeUMsY0FBYzs7QUFFdkQ7QUFDQTs7Ozs7Ozs7Ozs7O0FDWmE7O0FBRWI7QUFDQTtBQUNBLDBGQUEwRixjQUFjO0FBQ3hHLDJDQUEyQyxhQUFhOztBQUV4RDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsY0FBYzs7QUFFN0MsaUVBQWlFLGNBQWM7QUFDL0Usb0VBQW9FLGNBQWM7O0FBRWxGO0FBQ0EsZ0NBQWdDLGNBQWM7QUFDOUM7QUFDQSxzQ0FBc0MsY0FBYzs7QUFFcEQsMERBQTBELGNBQWM7QUFDeEUsOERBQThELGNBQWM7O0FBRTVFO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYyxFQUFFO0FBQ25DLDBFQUEwRSxjQUFjOztBQUV4Rix3R0FBd0csY0FBYzs7QUFFdEg7QUFDQSw0Q0FBNEMsY0FBYzs7QUFFMUQsNkRBQTZELGNBQWM7O0FBRTNFO0FBQ0E7QUFDQSxzRUFBc0UsY0FBYztBQUNwRjs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6Q2E7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLDREQUFlOztBQUVsQzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQmE7O0FBRWI7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxrRUFBcUI7O0FBRTdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELDBEQUEwRDs7QUFFMUQ7Ozs7Ozs7Ozs7OztBQ2hDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDL0JhOztBQUViOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTmE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLG9EQUFXO0FBQ2xDLGFBQWEsbUJBQU8sQ0FBQyxvRUFBbUI7O0FBRXhDLHFCQUFxQixtQkFBTyxDQUFDLGlFQUFrQjtBQUMvQyxrQkFBa0IsbUJBQU8sQ0FBQyxxREFBWTtBQUN0QyxXQUFXLG1CQUFPLENBQUMsNkNBQVE7O0FBRTNCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7O0FDbkJhOztBQUViLHFCQUFxQixtQkFBTyxDQUFDLGlFQUFrQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNUYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsb0VBQW1CO0FBQ3hDLGtCQUFrQixtQkFBTyxDQUFDLHFEQUFZOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7Ozs7Ozs7Ozs7O0FDZmE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLGdEQUFTO0FBQy9CLDJCQUEyQixtQkFBTyxDQUFDLDhFQUF3QjtBQUMzRCxnQkFBZ0IsbUJBQU8sQ0FBQyxrRUFBcUI7O0FBRTdDO0FBQ0EsaUJBQWlCLG1CQUFPLENBQUMsd0RBQWE7QUFDdEM7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFPLENBQUMsb0hBQThDO0FBQ2pFLDJDQUEyQztBQUMzQztBQUNBO0FBQ0EsZ0JBQWdCLHFCQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksWUFBWTtBQUNoQjtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLGNBQWM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0I7QUFDQTs7Ozs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqQmE7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLG9FQUFtQjtBQUN4QyxlQUFlLG1CQUFPLENBQUMsb0RBQVc7O0FBRWxDLHFCQUFxQixtQkFBTyxDQUFDLG9FQUFrQjtBQUMvQyxrQkFBa0IsbUJBQU8sQ0FBQyx3REFBWTtBQUN0QyxXQUFXLG1CQUFPLENBQUMsZ0RBQVE7O0FBRTNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViLHFCQUFxQixtQkFBTyxDQUFDLG9FQUFrQjs7QUFFL0M7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOYTs7QUFFYixrQkFBa0IsbUJBQU8sQ0FBQyx3REFBWTtBQUN0QyxhQUFhLG1CQUFPLENBQUMsb0VBQW1COztBQUV4QztBQUNBO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2JhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1CQUFPLENBQUMsZ0VBQWUsRUFBRTtBQUN2QztBQUNBLDBDQUEwQyxpQkFBaUI7QUFDM0QsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGNBQWM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6SGE7O0FBRWI7QUFDQSxhQUFhLG1CQUFPLENBQUMsZ0VBQWU7O0FBRXBDO0FBQ0EsNENBQTRDLG9CQUFvQixFQUFFLEdBQUcsbUJBQU8sQ0FBQyxzRUFBa0I7O0FBRS9GOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQy9CYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFD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QTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7QUFHZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDLEtBQUs7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFOzs7Ozs7Ozs7Ozs7Ozs7QUNKQSxzRUFBdUM7QUFBOUIsaUhBQVciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0Ly9Db21tb25KUzIgQ29tbWVudFxuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdC8vQU1EIENvbW1lbnRcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0Ly9Db21tb25KUyBDb21tZW50XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJpbWd1clwiXSA9IGZhY3RvcnkoKTtcblx0Ly9Sb290IENvbW1lbnRcblx0ZWxzZVxuXHRcdHJvb3RbXCJpbWd1clwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJcbi8qKlxuICogQXJyYXkjZmlsdGVyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gc2VsZlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAdGhyb3cgVHlwZUVycm9yXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyLCBmbiwgc2VsZikge1xuICBpZiAoYXJyLmZpbHRlcikgcmV0dXJuIGFyci5maWx0ZXIoZm4sIHNlbGYpO1xuICBpZiAodm9pZCAwID09PSBhcnIgfHwgbnVsbCA9PT0gYXJyKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICBpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgZm4pIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIHZhciByZXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093bi5jYWxsKGFyciwgaSkpIGNvbnRpbnVlO1xuICAgIHZhciB2YWwgPSBhcnJbaV07XG4gICAgaWYgKGZuLmNhbGwoc2VsZiwgdmFsLCBpLCBhcnIpKSByZXQucHVzaCh2YWwpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvYXNzZXJ0LmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzJhNTFhZTQyNGE1MTNlYzlhNmFhMzQ2NmJhYTBjYzFkNTVkZDRmM2Jcbi8vIE9yaWdpbmFsbHkgZnJvbSBuYXJ3aGFsLmpzIChodHRwOi8vbmFyd2hhbGpzLm9yZylcbi8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cbi8vIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4vLyByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcbi8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9lcnJvcnMnKSxcbiAgICBfcmVxdWlyZSRjb2RlcyA9IF9yZXF1aXJlLmNvZGVzLFxuICAgIEVSUl9BTUJJR1VPVVNfQVJHVU1FTlQgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfQU1CSUdVT1VTX0FSR1VNRU5ULFxuICAgIEVSUl9JTlZBTElEX0FSR19UWVBFID0gX3JlcXVpcmUkY29kZXMuRVJSX0lOVkFMSURfQVJHX1RZUEUsXG4gICAgRVJSX0lOVkFMSURfQVJHX1ZBTFVFID0gX3JlcXVpcmUkY29kZXMuRVJSX0lOVkFMSURfQVJHX1ZBTFVFLFxuICAgIEVSUl9JTlZBTElEX1JFVFVSTl9WQUxVRSA9IF9yZXF1aXJlJGNvZGVzLkVSUl9JTlZBTElEX1JFVFVSTl9WQUxVRSxcbiAgICBFUlJfTUlTU0lOR19BUkdTID0gX3JlcXVpcmUkY29kZXMuRVJSX01JU1NJTkdfQVJHUztcblxudmFyIEFzc2VydGlvbkVycm9yID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yJyk7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCd1dGlsLycpLFxuICAgIGluc3BlY3QgPSBfcmVxdWlyZTIuaW5zcGVjdDtcblxudmFyIF9yZXF1aXJlJHR5cGVzID0gcmVxdWlyZSgndXRpbC8nKS50eXBlcyxcbiAgICBpc1Byb21pc2UgPSBfcmVxdWlyZSR0eXBlcy5pc1Byb21pc2UsXG4gICAgaXNSZWdFeHAgPSBfcmVxdWlyZSR0eXBlcy5pc1JlZ0V4cDtcblxudmFyIG9iamVjdEFzc2lnbiA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduIDogcmVxdWlyZSgnZXM2LW9iamVjdC1hc3NpZ24nKS5hc3NpZ247XG52YXIgb2JqZWN0SXMgPSBPYmplY3QuaXMgPyBPYmplY3QuaXMgOiByZXF1aXJlKCdvYmplY3QtaXMnKTtcbnZhciBlcnJvckNhY2hlID0gbmV3IE1hcCgpO1xudmFyIGlzRGVlcEVxdWFsO1xudmFyIGlzRGVlcFN0cmljdEVxdWFsO1xudmFyIHBhcnNlRXhwcmVzc2lvbkF0O1xudmFyIGZpbmROb2RlQXJvdW5kO1xudmFyIGRlY29kZXI7XG5cbmZ1bmN0aW9uIGxhenlMb2FkQ29tcGFyaXNvbigpIHtcbiAgdmFyIGNvbXBhcmlzb24gPSByZXF1aXJlKCcuL2ludGVybmFsL3V0aWwvY29tcGFyaXNvbnMnKTtcblxuICBpc0RlZXBFcXVhbCA9IGNvbXBhcmlzb24uaXNEZWVwRXF1YWw7XG4gIGlzRGVlcFN0cmljdEVxdWFsID0gY29tcGFyaXNvbi5pc0RlZXBTdHJpY3RFcXVhbDtcbn0gLy8gRXNjYXBlIGNvbnRyb2wgY2hhcmFjdGVycyBidXQgbm90IFxcbiBhbmQgXFx0IHRvIGtlZXAgdGhlIGxpbmUgYnJlYWtzIGFuZFxuLy8gaW5kZW50YXRpb24gaW50YWN0LlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcblxuXG52YXIgZXNjYXBlU2VxdWVuY2VzUmVnRXhwID0gL1tcXHgwMC1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZl0vZztcbnZhciBtZXRhID0gW1wiXFxcXHUwMDAwXCIsIFwiXFxcXHUwMDAxXCIsIFwiXFxcXHUwMDAyXCIsIFwiXFxcXHUwMDAzXCIsIFwiXFxcXHUwMDA0XCIsIFwiXFxcXHUwMDA1XCIsIFwiXFxcXHUwMDA2XCIsIFwiXFxcXHUwMDA3XCIsICdcXFxcYicsICcnLCAnJywgXCJcXFxcdTAwMGJcIiwgJ1xcXFxmJywgJycsIFwiXFxcXHUwMDBlXCIsIFwiXFxcXHUwMDBmXCIsIFwiXFxcXHUwMDEwXCIsIFwiXFxcXHUwMDExXCIsIFwiXFxcXHUwMDEyXCIsIFwiXFxcXHUwMDEzXCIsIFwiXFxcXHUwMDE0XCIsIFwiXFxcXHUwMDE1XCIsIFwiXFxcXHUwMDE2XCIsIFwiXFxcXHUwMDE3XCIsIFwiXFxcXHUwMDE4XCIsIFwiXFxcXHUwMDE5XCIsIFwiXFxcXHUwMDFhXCIsIFwiXFxcXHUwMDFiXCIsIFwiXFxcXHUwMDFjXCIsIFwiXFxcXHUwMDFkXCIsIFwiXFxcXHUwMDFlXCIsIFwiXFxcXHUwMDFmXCJdO1xuXG52YXIgZXNjYXBlRm4gPSBmdW5jdGlvbiBlc2NhcGVGbihzdHIpIHtcbiAgcmV0dXJuIG1ldGFbc3RyLmNoYXJDb2RlQXQoMCldO1xufTtcblxudmFyIHdhcm5lZCA9IGZhbHNlOyAvLyBUaGUgYXNzZXJ0IG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbnMgdGhhdCB0aHJvd1xuLy8gQXNzZXJ0aW9uRXJyb3IncyB3aGVuIHBhcnRpY3VsYXIgY29uZGl0aW9ucyBhcmUgbm90IG1ldC4gVGhlXG4vLyBhc3NlcnQgbW9kdWxlIG11c3QgY29uZm9ybSB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS5cblxudmFyIGFzc2VydCA9IG1vZHVsZS5leHBvcnRzID0gb2s7XG52YXIgTk9fRVhDRVBUSU9OX1NFTlRJTkVMID0ge307IC8vIEFsbCBvZiB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBtdXN0IHRocm93IGFuIEFzc2VydGlvbkVycm9yXG4vLyB3aGVuIGEgY29ycmVzcG9uZGluZyBjb25kaXRpb24gaXMgbm90IG1ldCwgd2l0aCBhIG1lc3NhZ2UgdGhhdFxuLy8gbWF5IGJlIHVuZGVmaW5lZCBpZiBub3QgcHJvdmlkZWQuIEFsbCBhc3NlcnRpb24gbWV0aG9kcyBwcm92aWRlXG4vLyBib3RoIHRoZSBhY3R1YWwgYW5kIGV4cGVjdGVkIHZhbHVlcyB0byB0aGUgYXNzZXJ0aW9uIGVycm9yIGZvclxuLy8gZGlzcGxheSBwdXJwb3Nlcy5cblxuZnVuY3Rpb24gaW5uZXJGYWlsKG9iaikge1xuICBpZiAob2JqLm1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikgdGhyb3cgb2JqLm1lc3NhZ2U7XG4gIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihvYmopO1xufVxuXG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0Rm4pIHtcbiAgdmFyIGFyZ3NMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW50ZXJuYWxNZXNzYWdlO1xuXG4gIGlmIChhcmdzTGVuID09PSAwKSB7XG4gICAgaW50ZXJuYWxNZXNzYWdlID0gJ0ZhaWxlZCc7XG4gIH0gZWxzZSBpZiAoYXJnc0xlbiA9PT0gMSkge1xuICAgIG1lc3NhZ2UgPSBhY3R1YWw7XG4gICAgYWN0dWFsID0gdW5kZWZpbmVkO1xuICB9IGVsc2Uge1xuICAgIGlmICh3YXJuZWQgPT09IGZhbHNlKSB7XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgICAgdmFyIHdhcm4gPSBwcm9jZXNzLmVtaXRXYXJuaW5nID8gcHJvY2Vzcy5lbWl0V2FybmluZyA6IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xuICAgICAgd2FybignYXNzZXJ0LmZhaWwoKSB3aXRoIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQgaXMgZGVwcmVjYXRlZC4gJyArICdQbGVhc2UgdXNlIGFzc2VydC5zdHJpY3RFcXVhbCgpIGluc3RlYWQgb3Igb25seSBwYXNzIGEgbWVzc2FnZS4nLCAnRGVwcmVjYXRpb25XYXJuaW5nJywgJ0RFUDAwOTQnKTtcbiAgICB9XG5cbiAgICBpZiAoYXJnc0xlbiA9PT0gMikgb3BlcmF0b3IgPSAnIT0nO1xuICB9XG5cbiAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikgdGhyb3cgbWVzc2FnZTtcbiAgdmFyIGVyckFyZ3MgPSB7XG4gICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgIG9wZXJhdG9yOiBvcGVyYXRvciA9PT0gdW5kZWZpbmVkID8gJ2ZhaWwnIDogb3BlcmF0b3IsXG4gICAgc3RhY2tTdGFydEZuOiBzdGFja1N0YXJ0Rm4gfHwgZmFpbFxuICB9O1xuXG4gIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBlcnJBcmdzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB9XG5cbiAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcihlcnJBcmdzKTtcblxuICBpZiAoaW50ZXJuYWxNZXNzYWdlKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSBpbnRlcm5hbE1lc3NhZ2U7XG4gICAgZXJyLmdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICB9XG5cbiAgdGhyb3cgZXJyO1xufVxuXG5hc3NlcnQuZmFpbCA9IGZhaWw7IC8vIFRoZSBBc3NlcnRpb25FcnJvciBpcyBkZWZpbmVkIGluIGludGVybmFsL2Vycm9yLlxuXG5hc3NlcnQuQXNzZXJ0aW9uRXJyb3IgPSBBc3NlcnRpb25FcnJvcjtcblxuZnVuY3Rpb24gaW5uZXJPayhmbiwgYXJnTGVuLCB2YWx1ZSwgbWVzc2FnZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgdmFyIGdlbmVyYXRlZE1lc3NhZ2UgPSBmYWxzZTtcblxuICAgIGlmIChhcmdMZW4gPT09IDApIHtcbiAgICAgIGdlbmVyYXRlZE1lc3NhZ2UgPSB0cnVlO1xuICAgICAgbWVzc2FnZSA9ICdObyB2YWx1ZSBhcmd1bWVudCBwYXNzZWQgdG8gYGFzc2VydC5vaygpYCc7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHRocm93IG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICBhY3R1YWw6IHZhbHVlLFxuICAgICAgZXhwZWN0ZWQ6IHRydWUsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICc9PScsXG4gICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgfSk7XG4gICAgZXJyLmdlbmVyYXRlZE1lc3NhZ2UgPSBnZW5lcmF0ZWRNZXNzYWdlO1xuICAgIHRocm93IGVycjtcbiAgfVxufSAvLyBQdXJlIGFzc2VydGlvbiB0ZXN0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdHJ1dGh5LCBhcyBkZXRlcm1pbmVkXG4vLyBieSAhIXZhbHVlLlxuXG5cbmZ1bmN0aW9uIG9rKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaW5uZXJPay5hcHBseSh2b2lkIDAsIFtvaywgYXJncy5sZW5ndGhdLmNvbmNhdChhcmdzKSk7XG59XG5cbmFzc2VydC5vayA9IG9rOyAvLyBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGggPT0uXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllcyAqL1xuXG5hc3NlcnQuZXF1YWwgPSBmdW5jdGlvbiBlcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cblxuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnPT0nLFxuICAgICAgc3RhY2tTdGFydEZuOiBlcXVhbFxuICAgIH0pO1xuICB9XG59OyAvLyBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90XG4vLyBlcXVhbCB3aXRoICE9LlxuXG5cbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIG5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblxuXG4gIGlmIChhY3R1YWwgPT0gZXhwZWN0ZWQpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICchPScsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07IC8vIFRoZSBlcXVpdmFsZW5jZSBhc3NlcnRpb24gdGVzdHMgYSBkZWVwIGVxdWFsaXR5IHJlbGF0aW9uLlxuXG5cbmFzc2VydC5kZWVwRXF1YWwgPSBmdW5jdGlvbiBkZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cblxuICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG5cbiAgaWYgKCFpc0RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ2RlZXBFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IGRlZXBFcXVhbFxuICAgIH0pO1xuICB9XG59OyAvLyBUaGUgbm9uLWVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBmb3IgYW55IGRlZXAgaW5lcXVhbGl0eS5cblxuXG5hc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gbm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuXG4gIGlmIChpc0RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ25vdERlZXBFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IG5vdERlZXBFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuLyogZXNsaW50LWVuYWJsZSAqL1xuXG5cbmFzc2VydC5kZWVwU3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBkZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cblxuICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG5cbiAgaWYgKCFpc0RlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ2RlZXBTdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IGRlZXBTdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuXG5hc3NlcnQubm90RGVlcFN0cmljdEVxdWFsID0gbm90RGVlcFN0cmljdEVxdWFsO1xuXG5mdW5jdGlvbiBub3REZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cblxuICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG5cbiAgaWYgKGlzRGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnbm90RGVlcFN0cmljdEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogbm90RGVlcFN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn1cblxuYXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24gc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cblxuICBpZiAoIW9iamVjdElzKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnc3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBzdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuXG5hc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChvYmplY3RJcyhhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJ25vdFN0cmljdEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogbm90U3RyaWN0RXF1YWxcbiAgICB9KTtcbiAgfVxufTtcblxudmFyIENvbXBhcmlzb24gPSBmdW5jdGlvbiBDb21wYXJpc29uKG9iaiwga2V5cywgYWN0dWFsKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbXBhcmlzb24pO1xuXG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChhY3R1YWwgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgYWN0dWFsW2tleV0gPT09ICdzdHJpbmcnICYmIGlzUmVnRXhwKG9ialtrZXldKSAmJiBvYmpba2V5XS50ZXN0KGFjdHVhbFtrZXldKSkge1xuICAgICAgICBfdGhpc1trZXldID0gYWN0dWFsW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpc1trZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNvbXBhcmVFeGNlcHRpb25LZXkoYWN0dWFsLCBleHBlY3RlZCwga2V5LCBtZXNzYWdlLCBrZXlzLCBmbikge1xuICBpZiAoIShrZXkgaW4gYWN0dWFsKSB8fCAhaXNEZWVwU3RyaWN0RXF1YWwoYWN0dWFsW2tleV0sIGV4cGVjdGVkW2tleV0pKSB7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAvLyBDcmVhdGUgcGxhY2Vob2xkZXIgb2JqZWN0cyB0byBjcmVhdGUgYSBuaWNlIG91dHB1dC5cbiAgICAgIHZhciBhID0gbmV3IENvbXBhcmlzb24oYWN0dWFsLCBrZXlzKTtcbiAgICAgIHZhciBiID0gbmV3IENvbXBhcmlzb24oZXhwZWN0ZWQsIGtleXMsIGFjdHVhbCk7XG4gICAgICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKHtcbiAgICAgICAgYWN0dWFsOiBhLFxuICAgICAgICBleHBlY3RlZDogYixcbiAgICAgICAgb3BlcmF0b3I6ICdkZWVwU3RyaWN0RXF1YWwnLFxuICAgICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgICB9KTtcbiAgICAgIGVyci5hY3R1YWwgPSBhY3R1YWw7XG4gICAgICBlcnIuZXhwZWN0ZWQgPSBleHBlY3RlZDtcbiAgICAgIGVyci5vcGVyYXRvciA9IGZuLm5hbWU7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiBmbi5uYW1lLFxuICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQsIG1zZywgZm4pIHtcbiAgaWYgKHR5cGVvZiBleHBlY3RlZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChpc1JlZ0V4cChleHBlY3RlZCkpIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbCk7IC8vIGFzc2VydC5kb2VzTm90VGhyb3cgZG9lcyBub3QgYWNjZXB0IG9iamVjdHMuXG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdleHBlY3RlZCcsIFsnRnVuY3Rpb24nLCAnUmVnRXhwJ10sIGV4cGVjdGVkKTtcbiAgICB9IC8vIEhhbmRsZSBwcmltaXRpdmVzIHByb3Blcmx5LlxuXG5cbiAgICBpZiAoX3R5cGVvZihhY3R1YWwpICE9PSAnb2JqZWN0JyB8fCBhY3R1YWwgPT09IG51bGwpIHtcbiAgICAgIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgICBtZXNzYWdlOiBtc2csXG4gICAgICAgIG9wZXJhdG9yOiAnZGVlcFN0cmljdEVxdWFsJyxcbiAgICAgICAgc3RhY2tTdGFydEZuOiBmblxuICAgICAgfSk7XG4gICAgICBlcnIub3BlcmF0b3IgPSBmbi5uYW1lO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXhwZWN0ZWQpOyAvLyBTcGVjaWFsIGhhbmRsZSBlcnJvcnMgdG8gbWFrZSBzdXJlIHRoZSBuYW1lIGFuZCB0aGUgbWVzc2FnZSBhcmUgY29tcGFyZWRcbiAgICAvLyBhcyB3ZWxsLlxuXG4gICAgaWYgKGV4cGVjdGVkIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIGtleXMucHVzaCgnbmFtZScsICdtZXNzYWdlJyk7XG4gICAgfSBlbHNlIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19WQUxVRSgnZXJyb3InLCBleHBlY3RlZCwgJ21heSBub3QgYmUgYW4gZW1wdHkgb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGVlcEVxdWFsID09PSB1bmRlZmluZWQpIGxhenlMb2FkQ29tcGFyaXNvbigpO1xuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGFjdHVhbFtrZXldID09PSAnc3RyaW5nJyAmJiBpc1JlZ0V4cChleHBlY3RlZFtrZXldKSAmJiBleHBlY3RlZFtrZXldLnRlc3QoYWN0dWFsW2tleV0pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29tcGFyZUV4Y2VwdGlvbktleShhY3R1YWwsIGV4cGVjdGVkLCBrZXksIG1zZywga2V5cywgZm4pO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIEd1YXJkIGluc3RhbmNlb2YgYWdhaW5zdCBhcnJvdyBmdW5jdGlvbnMgYXMgdGhleSBkb24ndCBoYXZlIGEgcHJvdG90eXBlLlxuXG5cbiAgaWYgKGV4cGVjdGVkLnByb3RvdHlwZSAhPT0gdW5kZWZpbmVkICYmIGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoRXJyb3IuaXNQcm90b3R5cGVPZihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZXhwZWN0ZWQuY2FsbCh7fSwgYWN0dWFsKSA9PT0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0QWN0dWFsKGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2ZuJywgJ0Z1bmN0aW9uJywgZm4pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBmbigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGU7XG4gIH1cblxuICByZXR1cm4gTk9fRVhDRVBUSU9OX1NFTlRJTkVMO1xufVxuXG5mdW5jdGlvbiBjaGVja0lzUHJvbWlzZShvYmopIHtcbiAgLy8gQWNjZXB0IG5hdGl2ZSBFUzYgcHJvbWlzZXMgYW5kIHByb21pc2VzIHRoYXQgYXJlIGltcGxlbWVudGVkIGluIGEgc2ltaWxhclxuICAvLyB3YXkuIERvIG5vdCBhY2NlcHQgdGhlbmFibGVzIHRoYXQgdXNlIGEgZnVuY3Rpb24gYXMgYG9iamAgYW5kIHRoYXQgaGF2ZSBub1xuICAvLyBgY2F0Y2hgIGhhbmRsZXIuXG4gIC8vIFRPRE86IHRoZW5hYmxlcyBhcmUgY2hlY2tlZCB1cCB1bnRpbCB0aGV5IGhhdmUgdGhlIGNvcnJlY3QgbWV0aG9kcyxcbiAgLy8gYnV0IGFjY29yZGluZyB0byBkb2N1bWVudGF0aW9uLCB0aGUgYHRoZW5gIG1ldGhvZCBzaG91bGQgcmVjZWl2ZVxuICAvLyB0aGUgYGZ1bGZpbGxgIGFuZCBgcmVqZWN0YCBhcmd1bWVudHMgYXMgd2VsbCBvciBpdCBtYXkgYmUgbmV2ZXIgcmVzb2x2ZWQuXG4gIHJldHVybiBpc1Byb21pc2Uob2JqKSB8fCBvYmogIT09IG51bGwgJiYgX3R5cGVvZihvYmopID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5jYXRjaCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gd2FpdEZvckFjdHVhbChwcm9taXNlRm4pIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHRQcm9taXNlO1xuXG4gICAgaWYgKHR5cGVvZiBwcm9taXNlRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIFJldHVybiBhIHJlamVjdGVkIHByb21pc2UgaWYgYHByb21pc2VGbmAgdGhyb3dzIHN5bmNocm9ub3VzbHkuXG4gICAgICByZXN1bHRQcm9taXNlID0gcHJvbWlzZUZuKCk7IC8vIEZhaWwgaW4gY2FzZSBubyBwcm9taXNlIGlzIHJldHVybmVkLlxuXG4gICAgICBpZiAoIWNoZWNrSXNQcm9taXNlKHJlc3VsdFByb21pc2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUoJ2luc3RhbmNlIG9mIFByb21pc2UnLCAncHJvbWlzZUZuJywgcmVzdWx0UHJvbWlzZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjaGVja0lzUHJvbWlzZShwcm9taXNlRm4pKSB7XG4gICAgICByZXN1bHRQcm9taXNlID0gcHJvbWlzZUZuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ3Byb21pc2VGbicsIFsnRnVuY3Rpb24nLCAnUHJvbWlzZSddLCBwcm9taXNlRm4pO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIE5PX0VYQ0VQVElPTl9TRU5USU5FTDtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBleHBlY3RzRXJyb3Ioc3RhY2tTdGFydEZuLCBhY3R1YWwsIGVycm9yLCBtZXNzYWdlKSB7XG4gIGlmICh0eXBlb2YgZXJyb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnZXJyb3InLCBbJ09iamVjdCcsICdFcnJvcicsICdGdW5jdGlvbicsICdSZWdFeHAnXSwgZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPT0gbnVsbCkge1xuICAgICAgaWYgKGFjdHVhbC5tZXNzYWdlID09PSBlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRVJSX0FNQklHVU9VU19BUkdVTUVOVCgnZXJyb3IvbWVzc2FnZScsIFwiVGhlIGVycm9yIG1lc3NhZ2UgXFxcIlwiLmNvbmNhdChhY3R1YWwubWVzc2FnZSwgXCJcXFwiIGlzIGlkZW50aWNhbCB0byB0aGUgbWVzc2FnZS5cIikpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYWN0dWFsID09PSBlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVSUl9BTUJJR1VPVVNfQVJHVU1FTlQoJ2Vycm9yL21lc3NhZ2UnLCBcIlRoZSBlcnJvciBcXFwiXCIuY29uY2F0KGFjdHVhbCwgXCJcXFwiIGlzIGlkZW50aWNhbCB0byB0aGUgbWVzc2FnZS5cIikpO1xuICAgIH1cblxuICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICBlcnJvciA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmIChlcnJvciAhPSBudWxsICYmIF90eXBlb2YoZXJyb3IpICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2Vycm9yJywgWydPYmplY3QnLCAnRXJyb3InLCAnRnVuY3Rpb24nLCAnUmVnRXhwJ10sIGVycm9yKTtcbiAgfVxuXG4gIGlmIChhY3R1YWwgPT09IE5PX0VYQ0VQVElPTl9TRU5USU5FTCkge1xuICAgIHZhciBkZXRhaWxzID0gJyc7XG5cbiAgICBpZiAoZXJyb3IgJiYgZXJyb3IubmFtZSkge1xuICAgICAgZGV0YWlscyArPSBcIiAoXCIuY29uY2F0KGVycm9yLm5hbWUsIFwiKVwiKTtcbiAgICB9XG5cbiAgICBkZXRhaWxzICs9IG1lc3NhZ2UgPyBcIjogXCIuY29uY2F0KG1lc3NhZ2UpIDogJy4nO1xuICAgIHZhciBmblR5cGUgPSBzdGFja1N0YXJ0Rm4ubmFtZSA9PT0gJ3JlamVjdHMnID8gJ3JlamVjdGlvbicgOiAnZXhjZXB0aW9uJztcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiB1bmRlZmluZWQsXG4gICAgICBleHBlY3RlZDogZXJyb3IsXG4gICAgICBvcGVyYXRvcjogc3RhY2tTdGFydEZuLm5hbWUsXG4gICAgICBtZXNzYWdlOiBcIk1pc3NpbmcgZXhwZWN0ZWQgXCIuY29uY2F0KGZuVHlwZSkuY29uY2F0KGRldGFpbHMpLFxuICAgICAgc3RhY2tTdGFydEZuOiBzdGFja1N0YXJ0Rm5cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChlcnJvciAmJiAhZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBlcnJvciwgbWVzc2FnZSwgc3RhY2tTdGFydEZuKSkge1xuICAgIHRocm93IGFjdHVhbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBleHBlY3RzTm9FcnJvcihzdGFja1N0YXJ0Rm4sIGFjdHVhbCwgZXJyb3IsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PT0gTk9fRVhDRVBUSU9OX1NFTlRJTkVMKSByZXR1cm47XG5cbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICBtZXNzYWdlID0gZXJyb3I7XG4gICAgZXJyb3IgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoIWVycm9yIHx8IGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXJyb3IpKSB7XG4gICAgdmFyIGRldGFpbHMgPSBtZXNzYWdlID8gXCI6IFwiLmNvbmNhdChtZXNzYWdlKSA6ICcuJztcbiAgICB2YXIgZm5UeXBlID0gc3RhY2tTdGFydEZuLm5hbWUgPT09ICdkb2VzTm90UmVqZWN0JyA/ICdyZWplY3Rpb24nIDogJ2V4Y2VwdGlvbic7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGVycm9yLFxuICAgICAgb3BlcmF0b3I6IHN0YWNrU3RhcnRGbi5uYW1lLFxuICAgICAgbWVzc2FnZTogXCJHb3QgdW53YW50ZWQgXCIuY29uY2F0KGZuVHlwZSkuY29uY2F0KGRldGFpbHMsIFwiXFxuXCIpICsgXCJBY3R1YWwgbWVzc2FnZTogXFxcIlwiLmNvbmNhdChhY3R1YWwgJiYgYWN0dWFsLm1lc3NhZ2UsIFwiXFxcIlwiKSxcbiAgICAgIHN0YWNrU3RhcnRGbjogc3RhY2tTdGFydEZuXG4gICAgfSk7XG4gIH1cblxuICB0aHJvdyBhY3R1YWw7XG59XG5cbmFzc2VydC50aHJvd3MgPSBmdW5jdGlvbiB0aHJvd3MocHJvbWlzZUZuKSB7XG4gIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgfVxuXG4gIGV4cGVjdHNFcnJvci5hcHBseSh2b2lkIDAsIFt0aHJvd3MsIGdldEFjdHVhbChwcm9taXNlRm4pXS5jb25jYXQoYXJncykpO1xufTtcblxuYXNzZXJ0LnJlamVjdHMgPSBmdW5jdGlvbiByZWplY3RzKHByb21pc2VGbikge1xuICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjMgPiAxID8gX2xlbjMgLSAxIDogMCksIF9rZXkzID0gMTsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgIGFyZ3NbX2tleTMgLSAxXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gIH1cblxuICByZXR1cm4gd2FpdEZvckFjdHVhbChwcm9taXNlRm4pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiBleHBlY3RzRXJyb3IuYXBwbHkodm9pZCAwLCBbcmVqZWN0cywgcmVzdWx0XS5jb25jYXQoYXJncykpO1xuICB9KTtcbn07XG5cbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbiBkb2VzTm90VGhyb3coZm4pIHtcbiAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICBhcmdzW19rZXk0IC0gMV0gPSBhcmd1bWVudHNbX2tleTRdO1xuICB9XG5cbiAgZXhwZWN0c05vRXJyb3IuYXBwbHkodm9pZCAwLCBbZG9lc05vdFRocm93LCBnZXRBY3R1YWwoZm4pXS5jb25jYXQoYXJncykpO1xufTtcblxuYXNzZXJ0LmRvZXNOb3RSZWplY3QgPSBmdW5jdGlvbiBkb2VzTm90UmVqZWN0KGZuKSB7XG4gIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNSA+IDEgPyBfbGVuNSAtIDEgOiAwKSwgX2tleTUgPSAxOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgYXJnc1tfa2V5NSAtIDFdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgfVxuXG4gIHJldHVybiB3YWl0Rm9yQWN0dWFsKGZuKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gZXhwZWN0c05vRXJyb3IuYXBwbHkodm9pZCAwLCBbZG9lc05vdFJlamVjdCwgcmVzdWx0XS5jb25jYXQoYXJncykpO1xuICB9KTtcbn07XG5cbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24gaWZFcnJvcihlcnIpIHtcbiAgaWYgKGVyciAhPT0gbnVsbCAmJiBlcnIgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBtZXNzYWdlID0gJ2lmRXJyb3IgZ290IHVud2FudGVkIGV4Y2VwdGlvbjogJztcblxuICAgIGlmIChfdHlwZW9mKGVycikgPT09ICdvYmplY3QnICYmIHR5cGVvZiBlcnIubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChlcnIubWVzc2FnZS5sZW5ndGggPT09IDAgJiYgZXJyLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gZXJyLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlICs9IGVyci5tZXNzYWdlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlICs9IGluc3BlY3QoZXJyKTtcbiAgICB9XG5cbiAgICB2YXIgbmV3RXJyID0gbmV3IEFzc2VydGlvbkVycm9yKHtcbiAgICAgIGFjdHVhbDogZXJyLFxuICAgICAgZXhwZWN0ZWQ6IG51bGwsXG4gICAgICBvcGVyYXRvcjogJ2lmRXJyb3InLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIHN0YWNrU3RhcnRGbjogaWZFcnJvclxuICAgIH0pOyAvLyBNYWtlIHN1cmUgd2UgYWN0dWFsbHkgaGF2ZSBhIHN0YWNrIHRyYWNlIVxuXG4gICAgdmFyIG9yaWdTdGFjayA9IGVyci5zdGFjaztcblxuICAgIGlmICh0eXBlb2Ygb3JpZ1N0YWNrID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gVGhpcyB3aWxsIHJlbW92ZSBhbnkgZHVwbGljYXRlZCBmcmFtZXMgZnJvbSB0aGUgZXJyb3IgZnJhbWVzIHRha2VuXG4gICAgICAvLyBmcm9tIHdpdGhpbiBgaWZFcnJvcmAgYW5kIGFkZCB0aGUgb3JpZ2luYWwgZXJyb3IgZnJhbWVzIHRvIHRoZSBuZXdseVxuICAgICAgLy8gY3JlYXRlZCBvbmVzLlxuICAgICAgdmFyIHRtcDIgPSBvcmlnU3RhY2suc3BsaXQoJ1xcbicpO1xuICAgICAgdG1wMi5zaGlmdCgpOyAvLyBGaWx0ZXIgYWxsIGZyYW1lcyBleGlzdGluZyBpbiBlcnIuc3RhY2suXG5cbiAgICAgIHZhciB0bXAxID0gbmV3RXJyLnN0YWNrLnNwbGl0KCdcXG4nKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0bXAyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIEZpbmQgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIGZyYW1lLlxuICAgICAgICB2YXIgcG9zID0gdG1wMS5pbmRleE9mKHRtcDJbaV0pO1xuXG4gICAgICAgIGlmIChwb3MgIT09IC0xKSB7XG4gICAgICAgICAgLy8gT25seSBrZWVwIG5ldyBmcmFtZXMuXG4gICAgICAgICAgdG1wMSA9IHRtcDEuc2xpY2UoMCwgcG9zKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXdFcnIuc3RhY2sgPSBcIlwiLmNvbmNhdCh0bXAxLmpvaW4oJ1xcbicpLCBcIlxcblwiKS5jb25jYXQodG1wMi5qb2luKCdcXG4nKSk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3RXJyO1xuICB9XG59OyAvLyBFeHBvc2UgYSBzdHJpY3Qgb25seSB2YXJpYW50IG9mIGFzc2VydFxuXG5cbmZ1bmN0aW9uIHN0cmljdCgpIHtcbiAgZm9yICh2YXIgX2xlbjYgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW42KSwgX2tleTYgPSAwOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgYXJnc1tfa2V5Nl0gPSBhcmd1bWVudHNbX2tleTZdO1xuICB9XG5cbiAgaW5uZXJPay5hcHBseSh2b2lkIDAsIFtzdHJpY3QsIGFyZ3MubGVuZ3RoXS5jb25jYXQoYXJncykpO1xufVxuXG5hc3NlcnQuc3RyaWN0ID0gb2JqZWN0QXNzaWduKHN0cmljdCwgYXNzZXJ0LCB7XG4gIGVxdWFsOiBhc3NlcnQuc3RyaWN0RXF1YWwsXG4gIGRlZXBFcXVhbDogYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCxcbiAgbm90RXF1YWw6IGFzc2VydC5ub3RTdHJpY3RFcXVhbCxcbiAgbm90RGVlcEVxdWFsOiBhc3NlcnQubm90RGVlcFN0cmljdEVxdWFsXG59KTtcbmFzc2VydC5zdHJpY3Quc3RyaWN0ID0gYXNzZXJ0LnN0cmljdDsiLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL2Fzc2VydC9hc3NlcnRpb25fZXJyb3IuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMDgxNzg0MGY3NzUwMzIxNjlkZGQ3MGM4NWFjMDU5ZjE4ZmZjYzgxY1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTsgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpOyBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHsgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTsgfSkpOyB9IG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pOyB9KTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3dyYXBOYXRpdmVTdXBlcihDbGFzcykgeyB2YXIgX2NhY2hlID0gdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiID8gbmV3IE1hcCgpIDogdW5kZWZpbmVkOyBfd3JhcE5hdGl2ZVN1cGVyID0gZnVuY3Rpb24gX3dyYXBOYXRpdmVTdXBlcihDbGFzcykgeyBpZiAoQ2xhc3MgPT09IG51bGwgfHwgIV9pc05hdGl2ZUZ1bmN0aW9uKENsYXNzKSkgcmV0dXJuIENsYXNzOyBpZiAodHlwZW9mIENsYXNzICE9PSBcImZ1bmN0aW9uXCIpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IGlmICh0eXBlb2YgX2NhY2hlICE9PSBcInVuZGVmaW5lZFwiKSB7IGlmIChfY2FjaGUuaGFzKENsYXNzKSkgcmV0dXJuIF9jYWNoZS5nZXQoQ2xhc3MpOyBfY2FjaGUuc2V0KENsYXNzLCBXcmFwcGVyKTsgfSBmdW5jdGlvbiBXcmFwcGVyKCkgeyByZXR1cm4gX2NvbnN0cnVjdChDbGFzcywgYXJndW1lbnRzLCBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3IpOyB9IFdyYXBwZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IFdyYXBwZXIsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IHJldHVybiBfc2V0UHJvdG90eXBlT2YoV3JhcHBlciwgQ2xhc3MpOyB9OyByZXR1cm4gX3dyYXBOYXRpdmVTdXBlcihDbGFzcyk7IH1cblxuZnVuY3Rpb24gaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykgeyBpZiAoaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkpIHsgX2NvbnN0cnVjdCA9IFJlZmxlY3QuY29uc3RydWN0OyB9IGVsc2UgeyBfY29uc3RydWN0ID0gZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7IHZhciBhID0gW251bGxdOyBhLnB1c2guYXBwbHkoYSwgYXJncyk7IHZhciBDb25zdHJ1Y3RvciA9IEZ1bmN0aW9uLmJpbmQuYXBwbHkoUGFyZW50LCBhKTsgdmFyIGluc3RhbmNlID0gbmV3IENvbnN0cnVjdG9yKCk7IGlmIChDbGFzcykgX3NldFByb3RvdHlwZU9mKGluc3RhbmNlLCBDbGFzcy5wcm90b3R5cGUpOyByZXR1cm4gaW5zdGFuY2U7IH07IH0gcmV0dXJuIF9jb25zdHJ1Y3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTsgfVxuXG5mdW5jdGlvbiBfaXNOYXRpdmVGdW5jdGlvbihmbikgeyByZXR1cm4gRnVuY3Rpb24udG9TdHJpbmcuY2FsbChmbikuaW5kZXhPZihcIltuYXRpdmUgY29kZV1cIikgIT09IC0xOyB9XG5cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgndXRpbC8nKSxcbiAgICBpbnNwZWN0ID0gX3JlcXVpcmUuaW5zcGVjdDtcblxudmFyIF9yZXF1aXJlMiA9IHJlcXVpcmUoJy4uL2Vycm9ycycpLFxuICAgIEVSUl9JTlZBTElEX0FSR19UWVBFID0gX3JlcXVpcmUyLmNvZGVzLkVSUl9JTlZBTElEX0FSR19UWVBFOyAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvZW5kc1dpdGhcblxuXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaCwgdGhpc19sZW4pIHtcbiAgaWYgKHRoaXNfbGVuID09PSB1bmRlZmluZWQgfHwgdGhpc19sZW4gPiBzdHIubGVuZ3RoKSB7XG4gICAgdGhpc19sZW4gPSBzdHIubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHN0ci5zdWJzdHJpbmcodGhpc19sZW4gLSBzZWFyY2gubGVuZ3RoLCB0aGlzX2xlbikgPT09IHNlYXJjaDtcbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3JlcGVhdFxuXG5cbmZ1bmN0aW9uIHJlcGVhdChzdHIsIGNvdW50KSB7XG4gIGNvdW50ID0gTWF0aC5mbG9vcihjb3VudCk7XG4gIGlmIChzdHIubGVuZ3RoID09IDAgfHwgY291bnQgPT0gMCkgcmV0dXJuICcnO1xuICB2YXIgbWF4Q291bnQgPSBzdHIubGVuZ3RoICogY291bnQ7XG4gIGNvdW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZyhjb3VudCkgLyBNYXRoLmxvZygyKSk7XG5cbiAgd2hpbGUgKGNvdW50KSB7XG4gICAgc3RyICs9IHN0cjtcbiAgICBjb3VudC0tO1xuICB9XG5cbiAgc3RyICs9IHN0ci5zdWJzdHJpbmcoMCwgbWF4Q291bnQgLSBzdHIubGVuZ3RoKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxudmFyIGJsdWUgPSAnJztcbnZhciBncmVlbiA9ICcnO1xudmFyIHJlZCA9ICcnO1xudmFyIHdoaXRlID0gJyc7XG52YXIga1JlYWRhYmxlT3BlcmF0b3IgPSB7XG4gIGRlZXBTdHJpY3RFcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBzdHJpY3RseSBkZWVwLWVxdWFsOicsXG4gIHN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIHN0cmljdGx5IGVxdWFsOicsXG4gIHN0cmljdEVxdWFsT2JqZWN0OiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiB0byBiZSByZWZlcmVuY2UtZXF1YWwgdG8gXCJleHBlY3RlZFwiOicsXG4gIGRlZXBFcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBsb29zZWx5IGRlZXAtZXF1YWw6JyxcbiAgZXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgbG9vc2VseSBlcXVhbDonLFxuICBub3REZWVwU3RyaWN0RXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIG5vdCB0byBiZSBzdHJpY3RseSBkZWVwLWVxdWFsIHRvOicsXG4gIG5vdFN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiB0byBiZSBzdHJpY3RseSB1bmVxdWFsIHRvOicsXG4gIG5vdFN0cmljdEVxdWFsT2JqZWN0OiAnRXhwZWN0ZWQgXCJhY3R1YWxcIiBub3QgdG8gYmUgcmVmZXJlbmNlLWVxdWFsIHRvIFwiZXhwZWN0ZWRcIjonLFxuICBub3REZWVwRXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIG5vdCB0byBiZSBsb29zZWx5IGRlZXAtZXF1YWwgdG86JyxcbiAgbm90RXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIHRvIGJlIGxvb3NlbHkgdW5lcXVhbCB0bzonLFxuICBub3RJZGVudGljYWw6ICdWYWx1ZXMgaWRlbnRpY2FsIGJ1dCBub3QgcmVmZXJlbmNlLWVxdWFsOidcbn07IC8vIENvbXBhcmluZyBzaG9ydCBwcmltaXRpdmVzIHNob3VsZCBqdXN0IHNob3cgPT09IC8gIT09IGluc3RlYWQgb2YgdXNpbmcgdGhlXG4vLyBkaWZmLlxuXG52YXIga01heFNob3J0TGVuZ3RoID0gMTA7XG5cbmZ1bmN0aW9uIGNvcHlFcnJvcihzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICB2YXIgdGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKSk7XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsICdtZXNzYWdlJywge1xuICAgIHZhbHVlOiBzb3VyY2UubWVzc2FnZVxuICB9KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gaW5zcGVjdFZhbHVlKHZhbCkge1xuICAvLyBUaGUgdXRpbC5pbnNwZWN0IGRlZmF1bHQgdmFsdWVzIGNvdWxkIGJlIGNoYW5nZWQuIFRoaXMgbWFrZXMgc3VyZSB0aGVcbiAgLy8gZXJyb3IgbWVzc2FnZXMgY29udGFpbiB0aGUgbmVjZXNzYXJ5IGluZm9ybWF0aW9uIG5ldmVydGhlbGVzcy5cbiAgcmV0dXJuIGluc3BlY3QodmFsLCB7XG4gICAgY29tcGFjdDogZmFsc2UsXG4gICAgY3VzdG9tSW5zcGVjdDogZmFsc2UsXG4gICAgZGVwdGg6IDEwMDAsXG4gICAgbWF4QXJyYXlMZW5ndGg6IEluZmluaXR5LFxuICAgIC8vIEFzc2VydCBjb21wYXJlcyBvbmx5IGVudW1lcmFibGUgcHJvcGVydGllcyAod2l0aCBhIGZldyBleGNlcHRpb25zKS5cbiAgICBzaG93SGlkZGVuOiBmYWxzZSxcbiAgICAvLyBIYXZpbmcgYSBsb25nIGxpbmUgYXMgZXJyb3IgaXMgYmV0dGVyIHRoYW4gd3JhcHBpbmcgdGhlIGxpbmUgZm9yXG4gICAgLy8gY29tcGFyaXNvbiBmb3Igbm93LlxuICAgIC8vIFRPRE8oQnJpZGdlQVIpOiBgYnJlYWtMZW5ndGhgIHNob3VsZCBiZSBsaW1pdGVkIGFzIHNvb24gYXMgc29vbiBhcyB3ZVxuICAgIC8vIGhhdmUgbWV0YSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgaW5zcGVjdGVkIHByb3BlcnRpZXMgKGkuZS4sIGtub3cgd2hlcmVcbiAgICAvLyBpbiB3aGF0IGxpbmUgdGhlIHByb3BlcnR5IHN0YXJ0cyBhbmQgZW5kcykuXG4gICAgYnJlYWtMZW5ndGg6IEluZmluaXR5LFxuICAgIC8vIEFzc2VydCBkb2VzIG5vdCBkZXRlY3QgcHJveGllcyBjdXJyZW50bHkuXG4gICAgc2hvd1Byb3h5OiBmYWxzZSxcbiAgICBzb3J0ZWQ6IHRydWUsXG4gICAgLy8gSW5zcGVjdCBnZXR0ZXJzIGFzIHdlIGFsc28gY2hlY2sgdGhlbSB3aGVuIGNvbXBhcmluZyBlbnRyaWVzLlxuICAgIGdldHRlcnM6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVyckRpZmYoYWN0dWFsLCBleHBlY3RlZCwgb3BlcmF0b3IpIHtcbiAgdmFyIG90aGVyID0gJyc7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIGxhc3RQb3MgPSAwO1xuICB2YXIgZW5kID0gJyc7XG4gIHZhciBza2lwcGVkID0gZmFsc2U7XG4gIHZhciBhY3R1YWxJbnNwZWN0ZWQgPSBpbnNwZWN0VmFsdWUoYWN0dWFsKTtcbiAgdmFyIGFjdHVhbExpbmVzID0gYWN0dWFsSW5zcGVjdGVkLnNwbGl0KCdcXG4nKTtcbiAgdmFyIGV4cGVjdGVkTGluZXMgPSBpbnNwZWN0VmFsdWUoZXhwZWN0ZWQpLnNwbGl0KCdcXG4nKTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgaW5kaWNhdG9yID0gJyc7IC8vIEluIGNhc2UgYm90aCB2YWx1ZXMgYXJlIG9iamVjdHMgZXhwbGljaXRseSBtYXJrIHRoZW0gYXMgbm90IHJlZmVyZW5jZSBlcXVhbFxuICAvLyBmb3IgdGhlIGBzdHJpY3RFcXVhbGAgb3BlcmF0b3IuXG5cbiAgaWYgKG9wZXJhdG9yID09PSAnc3RyaWN0RXF1YWwnICYmIF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgX3R5cGVvZihleHBlY3RlZCkgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPT0gbnVsbCAmJiBleHBlY3RlZCAhPT0gbnVsbCkge1xuICAgIG9wZXJhdG9yID0gJ3N0cmljdEVxdWFsT2JqZWN0JztcbiAgfSAvLyBJZiBcImFjdHVhbFwiIGFuZCBcImV4cGVjdGVkXCIgZml0IG9uIGEgc2luZ2xlIGxpbmUgYW5kIHRoZXkgYXJlIG5vdCBzdHJpY3RseVxuICAvLyBlcXVhbCwgY2hlY2sgZnVydGhlciBzcGVjaWFsIGhhbmRsaW5nLlxuXG5cbiAgaWYgKGFjdHVhbExpbmVzLmxlbmd0aCA9PT0gMSAmJiBleHBlY3RlZExpbmVzLmxlbmd0aCA9PT0gMSAmJiBhY3R1YWxMaW5lc1swXSAhPT0gZXhwZWN0ZWRMaW5lc1swXSkge1xuICAgIHZhciBpbnB1dExlbmd0aCA9IGFjdHVhbExpbmVzWzBdLmxlbmd0aCArIGV4cGVjdGVkTGluZXNbMF0ubGVuZ3RoOyAvLyBJZiB0aGUgY2hhcmFjdGVyIGxlbmd0aCBvZiBcImFjdHVhbFwiIGFuZCBcImV4cGVjdGVkXCIgdG9nZXRoZXIgaXMgbGVzcyB0aGFuXG4gICAgLy8ga01heFNob3J0TGVuZ3RoIGFuZCBpZiBuZWl0aGVyIGlzIGFuIG9iamVjdCBhbmQgYXQgbGVhc3Qgb25lIG9mIHRoZW0gaXNcbiAgICAvLyBub3QgYHplcm9gLCB1c2UgdGhlIHN0cmljdCBlcXVhbCBjb21wYXJpc29uIHRvIHZpc3VhbGl6ZSB0aGUgb3V0cHV0LlxuXG4gICAgaWYgKGlucHV0TGVuZ3RoIDw9IGtNYXhTaG9ydExlbmd0aCkge1xuICAgICAgaWYgKChfdHlwZW9mKGFjdHVhbCkgIT09ICdvYmplY3QnIHx8IGFjdHVhbCA9PT0gbnVsbCkgJiYgKF90eXBlb2YoZXhwZWN0ZWQpICE9PSAnb2JqZWN0JyB8fCBleHBlY3RlZCA9PT0gbnVsbCkgJiYgKGFjdHVhbCAhPT0gMCB8fCBleHBlY3RlZCAhPT0gMCkpIHtcbiAgICAgICAgLy8gLTAgPT09ICswXG4gICAgICAgIHJldHVybiBcIlwiLmNvbmNhdChrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl0sIFwiXFxuXFxuXCIpICsgXCJcIi5jb25jYXQoYWN0dWFsTGluZXNbMF0sIFwiICE9PSBcIikuY29uY2F0KGV4cGVjdGVkTGluZXNbMF0sIFwiXFxuXCIpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgIT09ICdzdHJpY3RFcXVhbE9iamVjdCcpIHtcbiAgICAgIC8vIElmIHRoZSBzdGRlcnIgaXMgYSB0dHkgYW5kIHRoZSBpbnB1dCBsZW5ndGggaXMgbG93ZXIgdGhhbiB0aGUgY3VycmVudFxuICAgICAgLy8gY29sdW1ucyBwZXIgbGluZSwgYWRkIGEgbWlzbWF0Y2ggaW5kaWNhdG9yIGJlbG93IHRoZSBvdXRwdXQuIElmIGl0IGlzXG4gICAgICAvLyBub3QgYSB0dHksIHVzZSBhIGRlZmF1bHQgdmFsdWUgb2YgODAgY2hhcmFjdGVycy5cbiAgICAgIHZhciBtYXhMZW5ndGggPSBwcm9jZXNzLnN0ZGVyciAmJiBwcm9jZXNzLnN0ZGVyci5pc1RUWSA/IHByb2Nlc3Muc3RkZXJyLmNvbHVtbnMgOiA4MDtcblxuICAgICAgaWYgKGlucHV0TGVuZ3RoIDwgbWF4TGVuZ3RoKSB7XG4gICAgICAgIHdoaWxlIChhY3R1YWxMaW5lc1swXVtpXSA9PT0gZXhwZWN0ZWRMaW5lc1swXVtpXSkge1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfSAvLyBJZ25vcmUgdGhlIGZpcnN0IGNoYXJhY3RlcnMuXG5cblxuICAgICAgICBpZiAoaSA+IDIpIHtcbiAgICAgICAgICAvLyBBZGQgcG9zaXRpb24gaW5kaWNhdG9yIGZvciB0aGUgZmlyc3QgbWlzbWF0Y2ggaW4gY2FzZSBpdCBpcyBhXG4gICAgICAgICAgLy8gc2luZ2xlIGxpbmUgYW5kIHRoZSBpbnB1dCBsZW5ndGggaXMgbGVzcyB0aGFuIHRoZSBjb2x1bW4gbGVuZ3RoLlxuICAgICAgICAgIGluZGljYXRvciA9IFwiXFxuICBcIi5jb25jYXQocmVwZWF0KCcgJywgaSksIFwiXlwiKTtcbiAgICAgICAgICBpID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSAvLyBSZW1vdmUgYWxsIGVuZGluZyBsaW5lcyB0aGF0IG1hdGNoICh0aGlzIG9wdGltaXplcyB0aGUgb3V0cHV0IGZvclxuICAvLyByZWFkYWJpbGl0eSBieSByZWR1Y2luZyB0aGUgbnVtYmVyIG9mIHRvdGFsIGNoYW5nZWQgbGluZXMpLlxuXG5cbiAgdmFyIGEgPSBhY3R1YWxMaW5lc1thY3R1YWxMaW5lcy5sZW5ndGggLSAxXTtcbiAgdmFyIGIgPSBleHBlY3RlZExpbmVzW2V4cGVjdGVkTGluZXMubGVuZ3RoIC0gMV07XG5cbiAgd2hpbGUgKGEgPT09IGIpIHtcbiAgICBpZiAoaSsrIDwgMikge1xuICAgICAgZW5kID0gXCJcXG4gIFwiLmNvbmNhdChhKS5jb25jYXQoZW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3RoZXIgPSBhO1xuICAgIH1cblxuICAgIGFjdHVhbExpbmVzLnBvcCgpO1xuICAgIGV4cGVjdGVkTGluZXMucG9wKCk7XG4gICAgaWYgKGFjdHVhbExpbmVzLmxlbmd0aCA9PT0gMCB8fCBleHBlY3RlZExpbmVzLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgYSA9IGFjdHVhbExpbmVzW2FjdHVhbExpbmVzLmxlbmd0aCAtIDFdO1xuICAgIGIgPSBleHBlY3RlZExpbmVzW2V4cGVjdGVkTGluZXMubGVuZ3RoIC0gMV07XG4gIH1cblxuICB2YXIgbWF4TGluZXMgPSBNYXRoLm1heChhY3R1YWxMaW5lcy5sZW5ndGgsIGV4cGVjdGVkTGluZXMubGVuZ3RoKTsgLy8gU3RyaWN0IGVxdWFsIHdpdGggaWRlbnRpY2FsIG9iamVjdHMgdGhhdCBhcmUgbm90IGlkZW50aWNhbCBieSByZWZlcmVuY2UuXG4gIC8vIEUuZy4sIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoeyBhOiBTeW1ib2woKSB9LCB7IGE6IFN5bWJvbCgpIH0pXG5cbiAgaWYgKG1heExpbmVzID09PSAwKSB7XG4gICAgLy8gV2UgaGF2ZSB0byBnZXQgdGhlIHJlc3VsdCBhZ2Fpbi4gVGhlIGxpbmVzIHdlcmUgYWxsIHJlbW92ZWQgYmVmb3JlLlxuICAgIHZhciBfYWN0dWFsTGluZXMgPSBhY3R1YWxJbnNwZWN0ZWQuc3BsaXQoJ1xcbicpOyAvLyBPbmx5IHJlbW92ZSBsaW5lcyBpbiBjYXNlIGl0IG1ha2VzIHNlbnNlIHRvIGNvbGxhcHNlIHRob3NlLlxuICAgIC8vIFRPRE86IEFjY2VwdCBlbnYgdG8gYWx3YXlzIHNob3cgdGhlIGZ1bGwgZXJyb3IuXG5cblxuICAgIGlmIChfYWN0dWFsTGluZXMubGVuZ3RoID4gMzApIHtcbiAgICAgIF9hY3R1YWxMaW5lc1syNl0gPSBcIlwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuXG4gICAgICB3aGlsZSAoX2FjdHVhbExpbmVzLmxlbmd0aCA+IDI3KSB7XG4gICAgICAgIF9hY3R1YWxMaW5lcy5wb3AoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIi5jb25jYXQoa1JlYWRhYmxlT3BlcmF0b3Iubm90SWRlbnRpY2FsLCBcIlxcblxcblwiKS5jb25jYXQoX2FjdHVhbExpbmVzLmpvaW4oJ1xcbicpLCBcIlxcblwiKTtcbiAgfVxuXG4gIGlmIChpID4gMykge1xuICAgIGVuZCA9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSkuY29uY2F0KGVuZCk7XG4gICAgc2tpcHBlZCA9IHRydWU7XG4gIH1cblxuICBpZiAob3RoZXIgIT09ICcnKSB7XG4gICAgZW5kID0gXCJcXG4gIFwiLmNvbmNhdChvdGhlcikuY29uY2F0KGVuZCk7XG4gICAgb3RoZXIgPSAnJztcbiAgfVxuXG4gIHZhciBwcmludGVkTGluZXMgPSAwO1xuICB2YXIgbXNnID0ga1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdICsgXCJcXG5cIi5jb25jYXQoZ3JlZW4sIFwiKyBhY3R1YWxcIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KHJlZCwgXCItIGV4cGVjdGVkXCIpLmNvbmNhdCh3aGl0ZSk7XG4gIHZhciBza2lwcGVkTXNnID0gXCIgXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSwgXCIgTGluZXMgc2tpcHBlZFwiKTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbWF4TGluZXM7IGkrKykge1xuICAgIC8vIE9ubHkgZXh0cmEgZXhwZWN0ZWQgbGluZXMgZXhpc3RcbiAgICB2YXIgY3VyID0gaSAtIGxhc3RQb3M7XG5cbiAgICBpZiAoYWN0dWFsTGluZXMubGVuZ3RoIDwgaSArIDEpIHtcbiAgICAgIC8vIElmIHRoZSBsYXN0IGRpdmVyZ2luZyBsaW5lIGlzIG1vcmUgdGhhbiBvbmUgbGluZSBhYm92ZSBhbmQgdGhlXG4gICAgICAvLyBjdXJyZW50IGxpbmUgaXMgYXQgbGVhc3QgbGluZSB0aHJlZSwgYWRkIHNvbWUgb2YgdGhlIGZvcm1lciBsaW5lcyBhbmRcbiAgICAgIC8vIGFsc28gYWRkIGRvdHMgdG8gaW5kaWNhdGUgc2tpcHBlZCBlbnRyaWVzLlxuICAgICAgaWYgKGN1ciA+IDEgJiYgaSA+IDIpIHtcbiAgICAgICAgaWYgKGN1ciA+IDQpIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICAgICAgICBza2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXIgPiAzKSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoZXhwZWN0ZWRMaW5lc1tpIC0gMl0pO1xuICAgICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoZXhwZWN0ZWRMaW5lc1tpIC0gMV0pO1xuICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgIH0gLy8gTWFyayB0aGUgY3VycmVudCBsaW5lIGFzIHRoZSBsYXN0IGRpdmVyZ2luZyBvbmUuXG5cblxuICAgICAgbGFzdFBvcyA9IGk7IC8vIEFkZCB0aGUgZXhwZWN0ZWQgbGluZSB0byB0aGUgY2FjaGUuXG5cbiAgICAgIG90aGVyICs9IFwiXFxuXCIuY29uY2F0KHJlZCwgXCItXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChleHBlY3RlZExpbmVzW2ldKTtcbiAgICAgIHByaW50ZWRMaW5lcysrOyAvLyBPbmx5IGV4dHJhIGFjdHVhbCBsaW5lcyBleGlzdFxuICAgIH0gZWxzZSBpZiAoZXhwZWN0ZWRMaW5lcy5sZW5ndGggPCBpICsgMSkge1xuICAgICAgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgbW9yZSB0aGFuIG9uZSBsaW5lIGFib3ZlIGFuZCB0aGVcbiAgICAgIC8vIGN1cnJlbnQgbGluZSBpcyBhdCBsZWFzdCBsaW5lIHRocmVlLCBhZGQgc29tZSBvZiB0aGUgZm9ybWVyIGxpbmVzIGFuZFxuICAgICAgLy8gYWxzbyBhZGQgZG90cyB0byBpbmRpY2F0ZSBza2lwcGVkIGVudHJpZXMuXG4gICAgICBpZiAoY3VyID4gMSAmJiBpID4gMikge1xuICAgICAgICBpZiAoY3VyID4gNCkge1xuICAgICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgICAgIHNraXBwZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGN1ciA+IDMpIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lc1tpIC0gMl0pO1xuICAgICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZXNbaSAtIDFdKTtcbiAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICB9IC8vIE1hcmsgdGhlIGN1cnJlbnQgbGluZSBhcyB0aGUgbGFzdCBkaXZlcmdpbmcgb25lLlxuXG5cbiAgICAgIGxhc3RQb3MgPSBpOyAvLyBBZGQgdGhlIGFjdHVhbCBsaW5lIHRvIHRoZSByZXN1bHQuXG5cbiAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChncmVlbiwgXCIrXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChhY3R1YWxMaW5lc1tpXSk7XG4gICAgICBwcmludGVkTGluZXMrKzsgLy8gTGluZXMgZGl2ZXJnZVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZXhwZWN0ZWRMaW5lID0gZXhwZWN0ZWRMaW5lc1tpXTtcbiAgICAgIHZhciBhY3R1YWxMaW5lID0gYWN0dWFsTGluZXNbaV07IC8vIElmIHRoZSBsaW5lcyBkaXZlcmdlLCBzcGVjaWZpY2FsbHkgY2hlY2sgZm9yIGxpbmVzIHRoYXQgb25seSBkaXZlcmdlIGJ5XG4gICAgICAvLyBhIHRyYWlsaW5nIGNvbW1hLiBJbiB0aGF0IGNhc2UgaXQgaXMgYWN0dWFsbHkgaWRlbnRpY2FsIGFuZCB3ZSBzaG91bGRcbiAgICAgIC8vIG1hcmsgaXQgYXMgc3VjaC5cblxuICAgICAgdmFyIGRpdmVyZ2luZ0xpbmVzID0gYWN0dWFsTGluZSAhPT0gZXhwZWN0ZWRMaW5lICYmICghZW5kc1dpdGgoYWN0dWFsTGluZSwgJywnKSB8fCBhY3R1YWxMaW5lLnNsaWNlKDAsIC0xKSAhPT0gZXhwZWN0ZWRMaW5lKTsgLy8gSWYgdGhlIGV4cGVjdGVkIGxpbmUgaGFzIGEgdHJhaWxpbmcgY29tbWEgYnV0IGlzIG90aGVyd2lzZSBpZGVudGljYWwsXG4gICAgICAvLyBhZGQgYSBjb21tYSBhdCB0aGUgZW5kIG9mIHRoZSBhY3R1YWwgbGluZS4gT3RoZXJ3aXNlIHRoZSBvdXRwdXQgY291bGRcbiAgICAgIC8vIGxvb2sgd2VpcmQgYXMgaW46XG4gICAgICAvL1xuICAgICAgLy8gICBbXG4gICAgICAvLyAgICAgMSAgICAgICAgIC8vIE5vIGNvbW1hIGF0IHRoZSBlbmQhXG4gICAgICAvLyArICAgMlxuICAgICAgLy8gICBdXG4gICAgICAvL1xuXG4gICAgICBpZiAoZGl2ZXJnaW5nTGluZXMgJiYgZW5kc1dpdGgoZXhwZWN0ZWRMaW5lLCAnLCcpICYmIGV4cGVjdGVkTGluZS5zbGljZSgwLCAtMSkgPT09IGFjdHVhbExpbmUpIHtcbiAgICAgICAgZGl2ZXJnaW5nTGluZXMgPSBmYWxzZTtcbiAgICAgICAgYWN0dWFsTGluZSArPSAnLCc7XG4gICAgICB9XG5cbiAgICAgIGlmIChkaXZlcmdpbmdMaW5lcykge1xuICAgICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBtb3JlIHRoYW4gb25lIGxpbmUgYWJvdmUgYW5kIHRoZVxuICAgICAgICAvLyBjdXJyZW50IGxpbmUgaXMgYXQgbGVhc3QgbGluZSB0aHJlZSwgYWRkIHNvbWUgb2YgdGhlIGZvcm1lciBsaW5lcyBhbmRcbiAgICAgICAgLy8gYWxzbyBhZGQgZG90cyB0byBpbmRpY2F0ZSBza2lwcGVkIGVudHJpZXMuXG4gICAgICAgIGlmIChjdXIgPiAxICYmIGkgPiAyKSB7XG4gICAgICAgICAgaWYgKGN1ciA+IDQpIHtcbiAgICAgICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgICAgICAgc2tpcHBlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXIgPiAzKSB7XG4gICAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lc1tpIC0gMl0pO1xuICAgICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZXNbaSAtIDFdKTtcbiAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgfSAvLyBNYXJrIHRoZSBjdXJyZW50IGxpbmUgYXMgdGhlIGxhc3QgZGl2ZXJnaW5nIG9uZS5cblxuXG4gICAgICAgIGxhc3RQb3MgPSBpOyAvLyBBZGQgdGhlIGFjdHVhbCBsaW5lIHRvIHRoZSByZXN1bHQgYW5kIGNhY2hlIHRoZSBleHBlY3RlZCBkaXZlcmdpbmdcbiAgICAgICAgLy8gbGluZSBzbyBjb25zZWN1dGl2ZSBkaXZlcmdpbmcgbGluZXMgc2hvdyB1cCBhcyArKystLS0gYW5kIG5vdCArLSstKy0uXG5cbiAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGdyZWVuLCBcIitcIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGFjdHVhbExpbmUpO1xuICAgICAgICBvdGhlciArPSBcIlxcblwiLmNvbmNhdChyZWQsIFwiLVwiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRMaW5lKTtcbiAgICAgICAgcHJpbnRlZExpbmVzICs9IDI7IC8vIExpbmVzIGFyZSBpZGVudGljYWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFkZCBhbGwgY2FjaGVkIGluZm9ybWF0aW9uIHRvIHRoZSByZXN1bHQgYmVmb3JlIGFkZGluZyBvdGhlciB0aGluZ3NcbiAgICAgICAgLy8gYW5kIHJlc2V0IHRoZSBjYWNoZS5cbiAgICAgICAgcmVzICs9IG90aGVyO1xuICAgICAgICBvdGhlciA9ICcnOyAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBleGFjdGx5IG9uZSBsaW5lIGFib3ZlIG9yIGlmIGl0IGlzIHRoZVxuICAgICAgICAvLyB2ZXJ5IGZpcnN0IGxpbmUsIGFkZCB0aGUgbGluZSB0byB0aGUgcmVzdWx0LlxuXG4gICAgICAgIGlmIChjdXIgPT09IDEgfHwgaSA9PT0gMCkge1xuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmUpO1xuICAgICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBJbnNwZWN0ZWQgb2JqZWN0IHRvIGJpZyAoU2hvdyB+MjAgcm93cyBtYXgpXG5cblxuICAgIGlmIChwcmludGVkTGluZXMgPiAyMCAmJiBpIDwgbWF4TGluZXMgLSAyKSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQobXNnKS5jb25jYXQoc2tpcHBlZE1zZywgXCJcXG5cIikuY29uY2F0KHJlcywgXCJcXG5cIikuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSkuY29uY2F0KG90aGVyLCBcIlxcblwiKSArIFwiXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFwiXCIuY29uY2F0KG1zZykuY29uY2F0KHNraXBwZWQgPyBza2lwcGVkTXNnIDogJycsIFwiXFxuXCIpLmNvbmNhdChyZXMpLmNvbmNhdChvdGhlcikuY29uY2F0KGVuZCkuY29uY2F0KGluZGljYXRvcik7XG59XG5cbnZhciBBc3NlcnRpb25FcnJvciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0Vycm9yKSB7XG4gIF9pbmhlcml0cyhBc3NlcnRpb25FcnJvciwgX0Vycm9yKTtcblxuICBmdW5jdGlvbiBBc3NlcnRpb25FcnJvcihvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFzc2VydGlvbkVycm9yKTtcblxuICAgIGlmIChfdHlwZW9mKG9wdGlvbnMpICE9PSAnb2JqZWN0JyB8fCBvcHRpb25zID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ29wdGlvbnMnLCAnT2JqZWN0Jywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdmFyIG1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2UsXG4gICAgICAgIG9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvcixcbiAgICAgICAgc3RhY2tTdGFydEZuID0gb3B0aW9ucy5zdGFja1N0YXJ0Rm47XG4gICAgdmFyIGFjdHVhbCA9IG9wdGlvbnMuYWN0dWFsLFxuICAgICAgICBleHBlY3RlZCA9IG9wdGlvbnMuZXhwZWN0ZWQ7XG4gICAgdmFyIGxpbWl0ID0gRXJyb3Iuc3RhY2tUcmFjZUxpbWl0O1xuICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IDA7XG5cbiAgICBpZiAobWVzc2FnZSAhPSBudWxsKSB7XG4gICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBTdHJpbmcobWVzc2FnZSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByb2Nlc3Muc3RkZXJyICYmIHByb2Nlc3Muc3RkZXJyLmlzVFRZKSB7XG4gICAgICAgIC8vIFJlc2V0IG9uIGVhY2ggY2FsbCB0byBtYWtlIHN1cmUgd2UgaGFuZGxlIGR5bmFtaWNhbGx5IHNldCBlbnZpcm9ubWVudFxuICAgICAgICAvLyB2YXJpYWJsZXMgY29ycmVjdC5cbiAgICAgICAgaWYgKHByb2Nlc3Muc3RkZXJyICYmIHByb2Nlc3Muc3RkZXJyLmdldENvbG9yRGVwdGggJiYgcHJvY2Vzcy5zdGRlcnIuZ2V0Q29sb3JEZXB0aCgpICE9PSAxKSB7XG4gICAgICAgICAgYmx1ZSA9IFwiXFx4MUJbMzRtXCI7XG4gICAgICAgICAgZ3JlZW4gPSBcIlxceDFCWzMybVwiO1xuICAgICAgICAgIHdoaXRlID0gXCJcXHgxQlszOW1cIjtcbiAgICAgICAgICByZWQgPSBcIlxceDFCWzMxbVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJsdWUgPSAnJztcbiAgICAgICAgICBncmVlbiA9ICcnO1xuICAgICAgICAgIHdoaXRlID0gJyc7XG4gICAgICAgICAgcmVkID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gUHJldmVudCB0aGUgZXJyb3Igc3RhY2sgZnJvbSBiZWluZyB2aXNpYmxlIGJ5IGR1cGxpY2F0aW5nIHRoZSBlcnJvclxuICAgICAgLy8gaW4gYSB2ZXJ5IGNsb3NlIHdheSB0byB0aGUgb3JpZ2luYWwgaW4gY2FzZSBib3RoIHNpZGVzIGFyZSBhY3R1YWxseVxuICAgICAgLy8gaW5zdGFuY2VzIG9mIEVycm9yLlxuXG5cbiAgICAgIGlmIChfdHlwZW9mKGFjdHVhbCkgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPT0gbnVsbCAmJiBfdHlwZW9mKGV4cGVjdGVkKSA9PT0gJ29iamVjdCcgJiYgZXhwZWN0ZWQgIT09IG51bGwgJiYgJ3N0YWNrJyBpbiBhY3R1YWwgJiYgYWN0dWFsIGluc3RhbmNlb2YgRXJyb3IgJiYgJ3N0YWNrJyBpbiBleHBlY3RlZCAmJiBleHBlY3RlZCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGFjdHVhbCA9IGNvcHlFcnJvcihhY3R1YWwpO1xuICAgICAgICBleHBlY3RlZCA9IGNvcHlFcnJvcihleHBlY3RlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcGVyYXRvciA9PT0gJ2RlZXBTdHJpY3RFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdzdHJpY3RFcXVhbCcpIHtcbiAgICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQXNzZXJ0aW9uRXJyb3IpLmNhbGwodGhpcywgY3JlYXRlRXJyRGlmZihhY3R1YWwsIGV4cGVjdGVkLCBvcGVyYXRvcikpKTtcbiAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09ICdub3REZWVwU3RyaWN0RXF1YWwnIHx8IG9wZXJhdG9yID09PSAnbm90U3RyaWN0RXF1YWwnKSB7XG4gICAgICAgIC8vIEluIGNhc2UgdGhlIG9iamVjdHMgYXJlIGVxdWFsIGJ1dCB0aGUgb3BlcmF0b3IgcmVxdWlyZXMgdW5lcXVhbCwgc2hvd1xuICAgICAgICAvLyB0aGUgZmlyc3Qgb2JqZWN0IGFuZCBzYXkgQSBlcXVhbHMgQlxuICAgICAgICB2YXIgYmFzZSA9IGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXTtcbiAgICAgICAgdmFyIHJlcyA9IGluc3BlY3RWYWx1ZShhY3R1YWwpLnNwbGl0KCdcXG4nKTsgLy8gSW4gY2FzZSBcImFjdHVhbFwiIGlzIGFuIG9iamVjdCwgaXQgc2hvdWxkIG5vdCBiZSByZWZlcmVuY2UgZXF1YWwuXG5cbiAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnbm90U3RyaWN0RXF1YWwnICYmIF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsKSB7XG4gICAgICAgICAgYmFzZSA9IGtSZWFkYWJsZU9wZXJhdG9yLm5vdFN0cmljdEVxdWFsT2JqZWN0O1xuICAgICAgICB9IC8vIE9ubHkgcmVtb3ZlIGxpbmVzIGluIGNhc2UgaXQgbWFrZXMgc2Vuc2UgdG8gY29sbGFwc2UgdGhvc2UuXG4gICAgICAgIC8vIFRPRE86IEFjY2VwdCBlbnYgdG8gYWx3YXlzIHNob3cgdGhlIGZ1bGwgZXJyb3IuXG5cblxuICAgICAgICBpZiAocmVzLmxlbmd0aCA+IDMwKSB7XG4gICAgICAgICAgcmVzWzI2XSA9IFwiXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG5cbiAgICAgICAgICB3aGlsZSAocmVzLmxlbmd0aCA+IDI3KSB7XG4gICAgICAgICAgICByZXMucG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IC8vIE9ubHkgcHJpbnQgYSBzaW5nbGUgaW5wdXQuXG5cblxuICAgICAgICBpZiAocmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEFzc2VydGlvbkVycm9yKS5jYWxsKHRoaXMsIFwiXCIuY29uY2F0KGJhc2UsIFwiIFwiKS5jb25jYXQocmVzWzBdKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEFzc2VydGlvbkVycm9yKS5jYWxsKHRoaXMsIFwiXCIuY29uY2F0KGJhc2UsIFwiXFxuXFxuXCIpLmNvbmNhdChyZXMuam9pbignXFxuJyksIFwiXFxuXCIpKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBfcmVzID0gaW5zcGVjdFZhbHVlKGFjdHVhbCk7XG5cbiAgICAgICAgdmFyIG90aGVyID0gJyc7XG4gICAgICAgIHZhciBrbm93bk9wZXJhdG9ycyA9IGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXTtcblxuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdub3REZWVwRXF1YWwnIHx8IG9wZXJhdG9yID09PSAnbm90RXF1YWwnKSB7XG4gICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXSwgXCJcXG5cXG5cIikuY29uY2F0KF9yZXMpO1xuXG4gICAgICAgICAgaWYgKF9yZXMubGVuZ3RoID4gMTAyNCkge1xuICAgICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KF9yZXMuc2xpY2UoMCwgMTAyMSksIFwiLi4uXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdGhlciA9IFwiXCIuY29uY2F0KGluc3BlY3RWYWx1ZShleHBlY3RlZCkpO1xuXG4gICAgICAgICAgaWYgKF9yZXMubGVuZ3RoID4gNTEyKSB7XG4gICAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoX3Jlcy5zbGljZSgwLCA1MDkpLCBcIi4uLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAob3RoZXIubGVuZ3RoID4gNTEyKSB7XG4gICAgICAgICAgICBvdGhlciA9IFwiXCIuY29uY2F0KG90aGVyLnNsaWNlKDAsIDUwOSksIFwiLi4uXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ2RlZXBFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdlcXVhbCcpIHtcbiAgICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChrbm93bk9wZXJhdG9ycywgXCJcXG5cXG5cIikuY29uY2F0KF9yZXMsIFwiXFxuXFxuc2hvdWxkIGVxdWFsXFxuXFxuXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdGhlciA9IFwiIFwiLmNvbmNhdChvcGVyYXRvciwgXCIgXCIpLmNvbmNhdChvdGhlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQXNzZXJ0aW9uRXJyb3IpLmNhbGwodGhpcywgXCJcIi5jb25jYXQoX3JlcykuY29uY2F0KG90aGVyKSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIEVycm9yLnN0YWNrVHJhY2VMaW1pdCA9IGxpbWl0O1xuICAgIF90aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSAhbWVzc2FnZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksICduYW1lJywge1xuICAgICAgdmFsdWU6ICdBc3NlcnRpb25FcnJvciBbRVJSX0FTU0VSVElPTl0nLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIF90aGlzLmNvZGUgPSAnRVJSX0FTU0VSVElPTic7XG4gICAgX3RoaXMuYWN0dWFsID0gYWN0dWFsO1xuICAgIF90aGlzLmV4cGVjdGVkID0gZXhwZWN0ZWQ7XG4gICAgX3RoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcblxuICAgIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgc3RhY2tTdGFydEZuKTtcbiAgICB9IC8vIENyZWF0ZSBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZXJyb3IgY29kZSBpbiB0aGUgbmFtZS5cblxuXG4gICAgX3RoaXMuc3RhY2s7IC8vIFJlc2V0IHRoZSBuYW1lLlxuXG4gICAgX3RoaXMubmFtZSA9ICdBc3NlcnRpb25FcnJvcic7XG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhBc3NlcnRpb25FcnJvciwgW3tcbiAgICBrZXk6IFwidG9TdHJpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQodGhpcy5uYW1lLCBcIiBbXCIpLmNvbmNhdCh0aGlzLmNvZGUsIFwiXTogXCIpLmNvbmNhdCh0aGlzLm1lc3NhZ2UpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogaW5zcGVjdC5jdXN0b20sXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHJlY3Vyc2VUaW1lcywgY3R4KSB7XG4gICAgICAvLyBUaGlzIGxpbWl0cyB0aGUgYGFjdHVhbGAgYW5kIGBleHBlY3RlZGAgcHJvcGVydHkgZGVmYXVsdCBpbnNwZWN0aW9uIHRvXG4gICAgICAvLyB0aGUgbWluaW11bSBkZXB0aC4gT3RoZXJ3aXNlIHRob3NlIHZhbHVlcyB3b3VsZCBiZSB0b28gdmVyYm9zZSBjb21wYXJlZFxuICAgICAgLy8gdG8gdGhlIGFjdHVhbCBlcnJvciBtZXNzYWdlIHdoaWNoIGNvbnRhaW5zIGEgY29tYmluZWQgdmlldyBvZiB0aGVzZSB0d29cbiAgICAgIC8vIGlucHV0IHZhbHVlcy5cbiAgICAgIHJldHVybiBpbnNwZWN0KHRoaXMsIF9vYmplY3RTcHJlYWQoe30sIGN0eCwge1xuICAgICAgICBjdXN0b21JbnNwZWN0OiBmYWxzZSxcbiAgICAgICAgZGVwdGg6IDBcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQXNzZXJ0aW9uRXJyb3I7XG59KF93cmFwTmF0aXZlU3VwZXIoRXJyb3IpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBBc3NlcnRpb25FcnJvcjsiLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL2Vycm9ycy5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8zYjA0NDk2MmM0OGZlMzEzOTA1ODc3YTk2YjVkMDg5NGE1NDA0ZjZmXG5cbi8qIGVzbGludCBub2RlLWNvcmUvZG9jdW1lbnRlZC1lcnJvcnM6IFwiZXJyb3JcIiAqL1xuXG4vKiBlc2xpbnQgbm9kZS1jb3JlL2FscGhhYmV0aXplLWVycm9yczogXCJlcnJvclwiICovXG5cbi8qIGVzbGludCBub2RlLWNvcmUvcHJlZmVyLXV0aWwtZm9ybWF0LWVycm9yczogXCJlcnJvclwiICovXG4ndXNlIHN0cmljdCc7IC8vIFRoZSB3aG9sZSBwb2ludCBiZWhpbmQgdGhpcyBpbnRlcm5hbCBtb2R1bGUgaXMgdG8gYWxsb3cgTm9kZS5qcyB0byBub1xuLy8gbG9uZ2VyIGJlIGZvcmNlZCB0byB0cmVhdCBldmVyeSBlcnJvciBtZXNzYWdlIGNoYW5nZSBhcyBhIHNlbXZlci1tYWpvclxuLy8gY2hhbmdlLiBUaGUgTm9kZUVycm9yIGNsYXNzZXMgaGVyZSBhbGwgZXhwb3NlIGEgYGNvZGVgIHByb3BlcnR5IHdob3NlXG4vLyB2YWx1ZSBzdGF0aWNhbGx5IGFuZCBwZXJtYW5lbnRseSBpZGVudGlmaWVzIHRoZSBlcnJvci4gV2hpbGUgdGhlIGVycm9yXG4vLyBtZXNzYWdlIG1heSBjaGFuZ2UsIHRoZSBjb2RlIHNob3VsZCBub3QuXG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cblxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxudmFyIGNvZGVzID0ge307IC8vIExhenkgbG9hZGVkXG5cbnZhciBhc3NlcnQ7XG52YXIgdXRpbDtcblxuZnVuY3Rpb24gY3JlYXRlRXJyb3JUeXBlKGNvZGUsIG1lc3NhZ2UsIEJhc2UpIHtcbiAgaWYgKCFCYXNlKSB7XG4gICAgQmFzZSA9IEVycm9yO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWVzc2FnZShhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtZXNzYWdlKGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBOb2RlRXJyb3IgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQmFzZSkge1xuICAgIF9pbmhlcml0cyhOb2RlRXJyb3IsIF9CYXNlKTtcblxuICAgIGZ1bmN0aW9uIE5vZGVFcnJvcihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICB2YXIgX3RoaXM7XG5cbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBOb2RlRXJyb3IpO1xuXG4gICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihOb2RlRXJyb3IpLmNhbGwodGhpcywgZ2V0TWVzc2FnZShhcmcxLCBhcmcyLCBhcmczKSkpO1xuICAgICAgX3RoaXMuY29kZSA9IGNvZGU7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5vZGVFcnJvcjtcbiAgfShCYXNlKTtcblxuICBjb2Rlc1tjb2RlXSA9IE5vZGVFcnJvcjtcbn0gLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvdjEwLjguMC9saWIvaW50ZXJuYWwvZXJyb3JzLmpzXG5cblxuZnVuY3Rpb24gb25lT2YoZXhwZWN0ZWQsIHRoaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGV4cGVjdGVkKSkge1xuICAgIHZhciBsZW4gPSBleHBlY3RlZC5sZW5ndGg7XG4gICAgZXhwZWN0ZWQgPSBleHBlY3RlZC5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIHJldHVybiBTdHJpbmcoaSk7XG4gICAgfSk7XG5cbiAgICBpZiAobGVuID4gMikge1xuICAgICAgcmV0dXJuIFwib25lIG9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZC5zbGljZSgwLCBsZW4gLSAxKS5qb2luKCcsICcpLCBcIiwgb3IgXCIpICsgZXhwZWN0ZWRbbGVuIC0gMV07XG4gICAgfSBlbHNlIGlmIChsZW4gPT09IDIpIHtcbiAgICAgIHJldHVybiBcIm9uZSBvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRbMF0sIFwiIG9yIFwiKS5jb25jYXQoZXhwZWN0ZWRbMV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoZXhwZWN0ZWRbMF0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJvZiBcIi5jb25jYXQodGhpbmcsIFwiIFwiKS5jb25jYXQoU3RyaW5nKGV4cGVjdGVkKSk7XG4gIH1cbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL3N0YXJ0c1dpdGhcblxuXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0ciwgc2VhcmNoLCBwb3MpIHtcbiAgcmV0dXJuIHN0ci5zdWJzdHIoIXBvcyB8fCBwb3MgPCAwID8gMCA6ICtwb3MsIHNlYXJjaC5sZW5ndGgpID09PSBzZWFyY2g7XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9lbmRzV2l0aFxuXG5cbmZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc2VhcmNoLCB0aGlzX2xlbikge1xuICBpZiAodGhpc19sZW4gPT09IHVuZGVmaW5lZCB8fCB0aGlzX2xlbiA+IHN0ci5sZW5ndGgpIHtcbiAgICB0aGlzX2xlbiA9IHN0ci5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gc3RyLnN1YnN0cmluZyh0aGlzX2xlbiAtIHNlYXJjaC5sZW5ndGgsIHRoaXNfbGVuKSA9PT0gc2VhcmNoO1xufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvaW5jbHVkZXNcblxuXG5mdW5jdGlvbiBpbmNsdWRlcyhzdHIsIHNlYXJjaCwgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBzdGFydCAhPT0gJ251bWJlcicpIHtcbiAgICBzdGFydCA9IDA7XG4gIH1cblxuICBpZiAoc3RhcnQgKyBzZWFyY2gubGVuZ3RoID4gc3RyLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2Yoc2VhcmNoLCBzdGFydCkgIT09IC0xO1xuICB9XG59XG5cbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0FNQklHVU9VU19BUkdVTUVOVCcsICdUaGUgXCIlc1wiIGFyZ3VtZW50IGlzIGFtYmlndW91cy4gJXMnLCBUeXBlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfSU5WQUxJRF9BUkdfVFlQRScsIGZ1bmN0aW9uIChuYW1lLCBleHBlY3RlZCwgYWN0dWFsKSB7XG4gIGlmIChhc3NlcnQgPT09IHVuZGVmaW5lZCkgYXNzZXJ0ID0gcmVxdWlyZSgnLi4vYXNzZXJ0Jyk7XG4gIGFzc2VydCh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycsIFwiJ25hbWUnIG11c3QgYmUgYSBzdHJpbmdcIik7IC8vIGRldGVybWluZXI6ICdtdXN0IGJlJyBvciAnbXVzdCBub3QgYmUnXG5cbiAgdmFyIGRldGVybWluZXI7XG5cbiAgaWYgKHR5cGVvZiBleHBlY3RlZCA9PT0gJ3N0cmluZycgJiYgc3RhcnRzV2l0aChleHBlY3RlZCwgJ25vdCAnKSkge1xuICAgIGRldGVybWluZXIgPSAnbXVzdCBub3QgYmUnO1xuICAgIGV4cGVjdGVkID0gZXhwZWN0ZWQucmVwbGFjZSgvXm5vdCAvLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgZGV0ZXJtaW5lciA9ICdtdXN0IGJlJztcbiAgfVxuXG4gIHZhciBtc2c7XG5cbiAgaWYgKGVuZHNXaXRoKG5hbWUsICcgYXJndW1lbnQnKSkge1xuICAgIC8vIEZvciBjYXNlcyBsaWtlICdmaXJzdCBhcmd1bWVudCdcbiAgICBtc2cgPSBcIlRoZSBcIi5jb25jYXQobmFtZSwgXCIgXCIpLmNvbmNhdChkZXRlcm1pbmVyLCBcIiBcIikuY29uY2F0KG9uZU9mKGV4cGVjdGVkLCAndHlwZScpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdHlwZSA9IGluY2x1ZGVzKG5hbWUsICcuJykgPyAncHJvcGVydHknIDogJ2FyZ3VtZW50JztcbiAgICBtc2cgPSBcIlRoZSBcXFwiXCIuY29uY2F0KG5hbWUsIFwiXFxcIiBcIikuY29uY2F0KHR5cGUsIFwiIFwiKS5jb25jYXQoZGV0ZXJtaW5lciwgXCIgXCIpLmNvbmNhdChvbmVPZihleHBlY3RlZCwgJ3R5cGUnKSk7XG4gIH0gLy8gVE9ETyhCcmlkZ2VBUik6IEltcHJvdmUgdGhlIG91dHB1dCBieSBzaG93aW5nIGBudWxsYCBhbmQgc2ltaWxhci5cblxuXG4gIG1zZyArPSBcIi4gUmVjZWl2ZWQgdHlwZSBcIi5jb25jYXQoX3R5cGVvZihhY3R1YWwpKTtcbiAgcmV0dXJuIG1zZztcbn0sIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9JTlZBTElEX0FSR19WQUxVRScsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICB2YXIgcmVhc29uID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAnaXMgaW52YWxpZCc7XG4gIGlmICh1dGlsID09PSB1bmRlZmluZWQpIHV0aWwgPSByZXF1aXJlKCd1dGlsLycpO1xuICB2YXIgaW5zcGVjdGVkID0gdXRpbC5pbnNwZWN0KHZhbHVlKTtcblxuICBpZiAoaW5zcGVjdGVkLmxlbmd0aCA+IDEyOCkge1xuICAgIGluc3BlY3RlZCA9IFwiXCIuY29uY2F0KGluc3BlY3RlZC5zbGljZSgwLCAxMjgpLCBcIi4uLlwiKTtcbiAgfVxuXG4gIHJldHVybiBcIlRoZSBhcmd1bWVudCAnXCIuY29uY2F0KG5hbWUsIFwiJyBcIikuY29uY2F0KHJlYXNvbiwgXCIuIFJlY2VpdmVkIFwiKS5jb25jYXQoaW5zcGVjdGVkKTtcbn0sIFR5cGVFcnJvciwgUmFuZ2VFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9JTlZBTElEX1JFVFVSTl9WQUxVRScsIGZ1bmN0aW9uIChpbnB1dCwgbmFtZSwgdmFsdWUpIHtcbiAgdmFyIHR5cGU7XG5cbiAgaWYgKHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICB0eXBlID0gXCJpbnN0YW5jZSBvZiBcIi5jb25jYXQodmFsdWUuY29uc3RydWN0b3IubmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IFwidHlwZSBcIi5jb25jYXQoX3R5cGVvZih2YWx1ZSkpO1xuICB9XG5cbiAgcmV0dXJuIFwiRXhwZWN0ZWQgXCIuY29uY2F0KGlucHV0LCBcIiB0byBiZSByZXR1cm5lZCBmcm9tIHRoZSBcXFwiXCIpLmNvbmNhdChuYW1lLCBcIlxcXCJcIikgKyBcIiBmdW5jdGlvbiBidXQgZ290IFwiLmNvbmNhdCh0eXBlLCBcIi5cIik7XG59LCBUeXBlRXJyb3IpO1xuY3JlYXRlRXJyb3JUeXBlKCdFUlJfTUlTU0lOR19BUkdTJywgZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGFzc2VydCA9PT0gdW5kZWZpbmVkKSBhc3NlcnQgPSByZXF1aXJlKCcuLi9hc3NlcnQnKTtcbiAgYXNzZXJ0KGFyZ3MubGVuZ3RoID4gMCwgJ0F0IGxlYXN0IG9uZSBhcmcgbmVlZHMgdG8gYmUgc3BlY2lmaWVkJyk7XG4gIHZhciBtc2cgPSAnVGhlICc7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgYXJncyA9IGFyZ3MubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdChhLCBcIlxcXCJcIik7XG4gIH0pO1xuXG4gIHN3aXRjaCAobGVuKSB7XG4gICAgY2FzZSAxOlxuICAgICAgbXNnICs9IFwiXCIuY29uY2F0KGFyZ3NbMF0sIFwiIGFyZ3VtZW50XCIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDI6XG4gICAgICBtc2cgKz0gXCJcIi5jb25jYXQoYXJnc1swXSwgXCIgYW5kIFwiKS5jb25jYXQoYXJnc1sxXSwgXCIgYXJndW1lbnRzXCIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgbXNnICs9IGFyZ3Muc2xpY2UoMCwgbGVuIC0gMSkuam9pbignLCAnKTtcbiAgICAgIG1zZyArPSBcIiwgYW5kIFwiLmNvbmNhdChhcmdzW2xlbiAtIDFdLCBcIiBhcmd1bWVudHNcIik7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBcIlwiLmNvbmNhdChtc2csIFwiIG11c3QgYmUgc3BlY2lmaWVkXCIpO1xufSwgVHlwZUVycm9yKTtcbm1vZHVsZS5leHBvcnRzLmNvZGVzID0gY29kZXM7IiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9pbnRlcm5hbC91dGlsL2NvbXBhcmlzb25zLmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzExMmNjN2MyNzU1MTI1NGFhMmIxNzA5OGZiNzc0ODY3ZjA1ZWQwZDlcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbnZhciByZWdleEZsYWdzU3VwcG9ydGVkID0gL2EvZy5mbGFncyAhPT0gdW5kZWZpbmVkO1xuXG52YXIgYXJyYXlGcm9tU2V0ID0gZnVuY3Rpb24gYXJyYXlGcm9tU2V0KHNldCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgc2V0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGFycmF5LnB1c2godmFsdWUpO1xuICB9KTtcbiAgcmV0dXJuIGFycmF5O1xufTtcblxudmFyIGFycmF5RnJvbU1hcCA9IGZ1bmN0aW9uIGFycmF5RnJvbU1hcChtYXApIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgcmV0dXJuIGFycmF5LnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSk7XG4gIHJldHVybiBhcnJheTtcbn07XG5cbnZhciBvYmplY3RJcyA9IE9iamVjdC5pcyA/IE9iamVjdC5pcyA6IHJlcXVpcmUoJ29iamVjdC1pcycpO1xudmFyIG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gW107XG59O1xudmFyIG51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOID8gTnVtYmVyLmlzTmFOIDogcmVxdWlyZSgnaXMtbmFuJyk7XG5cbmZ1bmN0aW9uIHVuY3VycnlUaGlzKGYpIHtcbiAgcmV0dXJuIGYuY2FsbC5iaW5kKGYpO1xufVxuXG52YXIgaGFzT3duUHJvcGVydHkgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUpO1xudmFyIG9iamVjdFRvU3RyaW5nID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyk7XG5cbnZhciBfcmVxdWlyZSR0eXBlcyA9IHJlcXVpcmUoJ3V0aWwvJykudHlwZXMsXG4gICAgaXNBbnlBcnJheUJ1ZmZlciA9IF9yZXF1aXJlJHR5cGVzLmlzQW55QXJyYXlCdWZmZXIsXG4gICAgaXNBcnJheUJ1ZmZlclZpZXcgPSBfcmVxdWlyZSR0eXBlcy5pc0FycmF5QnVmZmVyVmlldyxcbiAgICBpc0RhdGUgPSBfcmVxdWlyZSR0eXBlcy5pc0RhdGUsXG4gICAgaXNNYXAgPSBfcmVxdWlyZSR0eXBlcy5pc01hcCxcbiAgICBpc1JlZ0V4cCA9IF9yZXF1aXJlJHR5cGVzLmlzUmVnRXhwLFxuICAgIGlzU2V0ID0gX3JlcXVpcmUkdHlwZXMuaXNTZXQsXG4gICAgaXNOYXRpdmVFcnJvciA9IF9yZXF1aXJlJHR5cGVzLmlzTmF0aXZlRXJyb3IsXG4gICAgaXNCb3hlZFByaW1pdGl2ZSA9IF9yZXF1aXJlJHR5cGVzLmlzQm94ZWRQcmltaXRpdmUsXG4gICAgaXNOdW1iZXJPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc051bWJlck9iamVjdCxcbiAgICBpc1N0cmluZ09iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzU3RyaW5nT2JqZWN0LFxuICAgIGlzQm9vbGVhbk9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzQm9vbGVhbk9iamVjdCxcbiAgICBpc0JpZ0ludE9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzQmlnSW50T2JqZWN0LFxuICAgIGlzU3ltYm9sT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNTeW1ib2xPYmplY3QsXG4gICAgaXNGbG9hdDMyQXJyYXkgPSBfcmVxdWlyZSR0eXBlcy5pc0Zsb2F0MzJBcnJheSxcbiAgICBpc0Zsb2F0NjRBcnJheSA9IF9yZXF1aXJlJHR5cGVzLmlzRmxvYXQ2NEFycmF5O1xuXG5mdW5jdGlvbiBpc05vbkluZGV4KGtleSkge1xuICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCB8fCBrZXkubGVuZ3RoID4gMTApIHJldHVybiB0cnVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNvZGUgPSBrZXkuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoY29kZSA8IDQ4IHx8IGNvZGUgPiA1NykgcmV0dXJuIHRydWU7XG4gIH0gLy8gVGhlIG1heGltdW0gc2l6ZSBmb3IgYW4gYXJyYXkgaXMgMiAqKiAzMiAtMS5cblxuXG4gIHJldHVybiBrZXkubGVuZ3RoID09PSAxMCAmJiBrZXkgPj0gTWF0aC5wb3coMiwgMzIpO1xufVxuXG5mdW5jdGlvbiBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5maWx0ZXIoaXNOb25JbmRleCkuY29uY2F0KG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyh2YWx1ZSkuZmlsdGVyKE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuYmluZCh2YWx1ZSkpKTtcbn0gLy8gVGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9ibG9iLzY4MGU5ZTVlNDg4ZjIyYWFjMjc1OTlhNTdkYzg0NGE2MzE1OTI4ZGQvaW5kZXguanNcbi8vIG9yaWdpbmFsIG5vdGljZTpcblxuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG5cbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIHggPSBhLmxlbmd0aDtcbiAgdmFyIHkgPSBiLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXTtcbiAgICAgIHkgPSBiW2ldO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgaWYgKHkgPCB4KSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxudmFyIE9OTFlfRU5VTUVSQUJMRSA9IHVuZGVmaW5lZDtcbnZhciBrU3RyaWN0ID0gdHJ1ZTtcbnZhciBrTG9vc2UgPSBmYWxzZTtcbnZhciBrTm9JdGVyYXRvciA9IDA7XG52YXIga0lzQXJyYXkgPSAxO1xudmFyIGtJc1NldCA9IDI7XG52YXIga0lzTWFwID0gMzsgLy8gQ2hlY2sgaWYgdGhleSBoYXZlIHRoZSBzYW1lIHNvdXJjZSBhbmQgZmxhZ3NcblxuZnVuY3Rpb24gYXJlU2ltaWxhclJlZ0V4cHMoYSwgYikge1xuICByZXR1cm4gcmVnZXhGbGFnc1N1cHBvcnRlZCA/IGEuc291cmNlID09PSBiLnNvdXJjZSAmJiBhLmZsYWdzID09PSBiLmZsYWdzIDogUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpID09PSBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYik7XG59XG5cbmZ1bmN0aW9uIGFyZVNpbWlsYXJGbG9hdEFycmF5cyhhLCBiKSB7XG4gIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IGEuYnl0ZUxlbmd0aDsgb2Zmc2V0KyspIHtcbiAgICBpZiAoYVtvZmZzZXRdICE9PSBiW29mZnNldF0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gYXJlU2ltaWxhclR5cGVkQXJyYXlzKGEsIGIpIHtcbiAgaWYgKGEuYnl0ZUxlbmd0aCAhPT0gYi5ieXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGNvbXBhcmUobmV3IFVpbnQ4QXJyYXkoYS5idWZmZXIsIGEuYnl0ZU9mZnNldCwgYS5ieXRlTGVuZ3RoKSwgbmV3IFVpbnQ4QXJyYXkoYi5idWZmZXIsIGIuYnl0ZU9mZnNldCwgYi5ieXRlTGVuZ3RoKSkgPT09IDA7XG59XG5cbmZ1bmN0aW9uIGFyZUVxdWFsQXJyYXlCdWZmZXJzKGJ1ZjEsIGJ1ZjIpIHtcbiAgcmV0dXJuIGJ1ZjEuYnl0ZUxlbmd0aCA9PT0gYnVmMi5ieXRlTGVuZ3RoICYmIGNvbXBhcmUobmV3IFVpbnQ4QXJyYXkoYnVmMSksIG5ldyBVaW50OEFycmF5KGJ1ZjIpKSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gaXNFcXVhbEJveGVkUHJpbWl0aXZlKHZhbDEsIHZhbDIpIHtcbiAgaWYgKGlzTnVtYmVyT2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyT2JqZWN0KHZhbDIpICYmIG9iamVjdElzKE51bWJlci5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpLCBOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKSk7XG4gIH1cblxuICBpZiAoaXNTdHJpbmdPYmplY3QodmFsMSkpIHtcbiAgICByZXR1cm4gaXNTdHJpbmdPYmplY3QodmFsMikgJiYgU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IFN0cmluZy5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpO1xuICB9XG5cbiAgaWYgKGlzQm9vbGVhbk9iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc0Jvb2xlYW5PYmplY3QodmFsMikgJiYgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG4gIH1cblxuICBpZiAoaXNCaWdJbnRPYmplY3QodmFsMSkpIHtcbiAgICByZXR1cm4gaXNCaWdJbnRPYmplY3QodmFsMikgJiYgQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpO1xuICB9XG5cbiAgcmV0dXJuIGlzU3ltYm9sT2JqZWN0KHZhbDIpICYmIFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDEpID09PSBTeW1ib2wucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbn0gLy8gTm90ZXM6IFR5cGUgdGFncyBhcmUgaGlzdG9yaWNhbCBbW0NsYXNzXV0gcHJvcGVydGllcyB0aGF0IGNhbiBiZSBzZXQgYnlcbi8vIEZ1bmN0aW9uVGVtcGxhdGU6OlNldENsYXNzTmFtZSgpIGluIEMrKyBvciBTeW1ib2wudG9TdHJpbmdUYWcgaW4gSlNcbi8vIGFuZCByZXRyaWV2ZWQgdXNpbmcgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgaW4gSlNcbi8vIFNlZSBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nXG4vLyBmb3IgYSBsaXN0IG9mIHRhZ3MgcHJlLWRlZmluZWQgaW4gdGhlIHNwZWMuXG4vLyBUaGVyZSBhcmUgc29tZSB1bnNwZWNpZmllZCB0YWdzIGluIHRoZSB3aWxkIHRvbyAoZS5nLiB0eXBlZCBhcnJheSB0YWdzKS5cbi8vIFNpbmNlIHRhZ3MgY2FuIGJlIGFsdGVyZWQsIHRoZXkgb25seSBzZXJ2ZSBmYXN0IGZhaWx1cmVzXG4vL1xuLy8gVHlwZWQgYXJyYXlzIGFuZCBidWZmZXJzIGFyZSBjaGVja2VkIGJ5IGNvbXBhcmluZyB0aGUgY29udGVudCBpbiB0aGVpclxuLy8gdW5kZXJseWluZyBBcnJheUJ1ZmZlci4gVGhpcyBvcHRpbWl6YXRpb24gcmVxdWlyZXMgdGhhdCBpdCdzXG4vLyByZWFzb25hYmxlIHRvIGludGVycHJldCB0aGVpciB1bmRlcmx5aW5nIG1lbW9yeSBpbiB0aGUgc2FtZSB3YXksXG4vLyB3aGljaCBpcyBjaGVja2VkIGJ5IGNvbXBhcmluZyB0aGVpciB0eXBlIHRhZ3MuXG4vLyAoZS5nLiBhIFVpbnQ4QXJyYXkgYW5kIGEgVWludDE2QXJyYXkgd2l0aCB0aGUgc2FtZSBtZW1vcnkgY29udGVudFxuLy8gY291bGQgc3RpbGwgYmUgZGlmZmVyZW50IGJlY2F1c2UgdGhleSB3aWxsIGJlIGludGVycHJldGVkIGRpZmZlcmVudGx5KS5cbi8vXG4vLyBGb3Igc3RyaWN0IGNvbXBhcmlzb24sIG9iamVjdHMgc2hvdWxkIGhhdmVcbi8vIGEpIFRoZSBzYW1lIGJ1aWx0LWluIHR5cGUgdGFnc1xuLy8gYikgVGhlIHNhbWUgcHJvdG90eXBlcy5cblxuXG5mdW5jdGlvbiBpbm5lckRlZXBFcXVhbCh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zKSB7XG4gIC8vIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKHZhbDEgPT09IHZhbDIpIHtcbiAgICBpZiAodmFsMSAhPT0gMCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHN0cmljdCA/IG9iamVjdElzKHZhbDEsIHZhbDIpIDogdHJ1ZTtcbiAgfSAvLyBDaGVjayBtb3JlIGNsb3NlbHkgaWYgdmFsMSBhbmQgdmFsMiBhcmUgZXF1YWwuXG5cblxuICBpZiAoc3RyaWN0KSB7XG4gICAgaWYgKF90eXBlb2YodmFsMSkgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbDEgPT09ICdudW1iZXInICYmIG51bWJlcklzTmFOKHZhbDEpICYmIG51bWJlcklzTmFOKHZhbDIpO1xuICAgIH1cblxuICAgIGlmIChfdHlwZW9mKHZhbDIpICE9PSAnb2JqZWN0JyB8fCB2YWwxID09PSBudWxsIHx8IHZhbDIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbDEpICE9PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbDEgPT09IG51bGwgfHwgX3R5cGVvZih2YWwxKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh2YWwyID09PSBudWxsIHx8IF90eXBlb2YodmFsMikgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcbiAgICAgICAgcmV0dXJuIHZhbDEgPT0gdmFsMjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh2YWwyID09PSBudWxsIHx8IF90eXBlb2YodmFsMikgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgdmFyIHZhbDFUYWcgPSBvYmplY3RUb1N0cmluZyh2YWwxKTtcbiAgdmFyIHZhbDJUYWcgPSBvYmplY3RUb1N0cmluZyh2YWwyKTtcblxuICBpZiAodmFsMVRhZyAhPT0gdmFsMlRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbDEpKSB7XG4gICAgLy8gQ2hlY2sgZm9yIHNwYXJzZSBhcnJheXMgYW5kIGdlbmVyYWwgZmFzdCBwYXRoXG4gICAgaWYgKHZhbDEubGVuZ3RoICE9PSB2YWwyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBrZXlzMSA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwxLCBPTkxZX0VOVU1FUkFCTEUpO1xuICAgIHZhciBrZXlzMiA9IGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWwyLCBPTkxZX0VOVU1FUkFCTEUpO1xuXG4gICAgaWYgKGtleXMxLmxlbmd0aCAhPT0ga2V5czIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtJc0FycmF5LCBrZXlzMSk7XG4gIH0gLy8gW2Jyb3dzZXJpZnldIFRoaXMgdHJpZ2dlcnMgb24gY2VydGFpbiB0eXBlcyBpbiBJRSAoTWFwL1NldCkgc28gd2UgZG9uJ3RcbiAgLy8gd2FuJ3QgdG8gZWFybHkgcmV0dXJuIG91dCBvZiB0aGUgcmVzdCBvZiB0aGUgY2hlY2tzLiBIb3dldmVyIHdlIGNhbiBjaGVja1xuICAvLyBpZiB0aGUgc2Vjb25kIHZhbHVlIGlzIG9uZSBvZiB0aGVzZSB2YWx1ZXMgYW5kIHRoZSBmaXJzdCBpc24ndC5cblxuXG4gIGlmICh2YWwxVGFnID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIC8vIHJldHVybiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBrTm9JdGVyYXRvcik7XG4gICAgaWYgKCFpc01hcCh2YWwxKSAmJiBpc01hcCh2YWwyKSB8fCAhaXNTZXQodmFsMSkgJiYgaXNTZXQodmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXNEYXRlKHZhbDEpKSB7XG4gICAgaWYgKCFpc0RhdGUodmFsMikgfHwgRGF0ZS5wcm90b3R5cGUuZ2V0VGltZS5jYWxsKHZhbDEpICE9PSBEYXRlLnByb3RvdHlwZS5nZXRUaW1lLmNhbGwodmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNSZWdFeHAodmFsMSkpIHtcbiAgICBpZiAoIWlzUmVnRXhwKHZhbDIpIHx8ICFhcmVTaW1pbGFyUmVnRXhwcyh2YWwxLCB2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc05hdGl2ZUVycm9yKHZhbDEpIHx8IHZhbDEgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIC8vIERvIG5vdCBjb21wYXJlIHRoZSBzdGFjayBhcyBpdCBtaWdodCBkaWZmZXIgZXZlbiB0aG91Z2ggdGhlIGVycm9yIGl0c2VsZlxuICAgIC8vIGlzIG90aGVyd2lzZSBpZGVudGljYWwuXG4gICAgaWYgKHZhbDEubWVzc2FnZSAhPT0gdmFsMi5tZXNzYWdlIHx8IHZhbDEubmFtZSAhPT0gdmFsMi5uYW1lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQXJyYXlCdWZmZXJWaWV3KHZhbDEpKSB7XG4gICAgaWYgKCFzdHJpY3QgJiYgKGlzRmxvYXQzMkFycmF5KHZhbDEpIHx8IGlzRmxvYXQ2NEFycmF5KHZhbDEpKSkge1xuICAgICAgaWYgKCFhcmVTaW1pbGFyRmxvYXRBcnJheXModmFsMSwgdmFsMikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWFyZVNpbWlsYXJUeXBlZEFycmF5cyh2YWwxLCB2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gLy8gQnVmZmVyLmNvbXBhcmUgcmV0dXJucyB0cnVlLCBzbyB2YWwxLmxlbmd0aCA9PT0gdmFsMi5sZW5ndGguIElmIHRoZXkgYm90aFxuICAgIC8vIG9ubHkgY29udGFpbiBudW1lcmljIGtleXMsIHdlIGRvbid0IG5lZWQgdG8gZXhhbSBmdXJ0aGVyIHRoYW4gY2hlY2tpbmdcbiAgICAvLyB0aGUgc3ltYm9scy5cblxuXG4gICAgdmFyIF9rZXlzID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDEsIE9OTFlfRU5VTUVSQUJMRSk7XG5cbiAgICB2YXIgX2tleXMyID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDIsIE9OTFlfRU5VTUVSQUJMRSk7XG5cbiAgICBpZiAoX2tleXMubGVuZ3RoICE9PSBfa2V5czIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtOb0l0ZXJhdG9yLCBfa2V5cyk7XG4gIH0gZWxzZSBpZiAoaXNTZXQodmFsMSkpIHtcbiAgICBpZiAoIWlzU2V0KHZhbDIpIHx8IHZhbDEuc2l6ZSAhPT0gdmFsMi5zaXplKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtJc1NldCk7XG4gIH0gZWxzZSBpZiAoaXNNYXAodmFsMSkpIHtcbiAgICBpZiAoIWlzTWFwKHZhbDIpIHx8IHZhbDEuc2l6ZSAhPT0gdmFsMi5zaXplKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtJc01hcCk7XG4gIH0gZWxzZSBpZiAoaXNBbnlBcnJheUJ1ZmZlcih2YWwxKSkge1xuICAgIGlmICghYXJlRXF1YWxBcnJheUJ1ZmZlcnModmFsMSwgdmFsMikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNCb3hlZFByaW1pdGl2ZSh2YWwxKSAmJiAhaXNFcXVhbEJveGVkUHJpbWl0aXZlKHZhbDEsIHZhbDIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtOb0l0ZXJhdG9yKTtcbn1cblxuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZXModmFsLCBrZXlzKSB7XG4gIHJldHVybiBrZXlzLmZpbHRlcihmdW5jdGlvbiAoaykge1xuICAgIHJldHVybiBwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwsIGspO1xuICB9KTtcbn1cblxuZnVuY3Rpb24ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywgaXRlcmF0aW9uVHlwZSwgYUtleXMpIHtcbiAgLy8gRm9yIGFsbCByZW1haW5pbmcgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXksIG9iamVjdHMgYW5kIE1hcHMsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgaGF2aW5nOlxuICAvLyBhKSBUaGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG4gIC8vIGIpIFRoZSBzYW1lIHNldCBvZiBrZXlzL2luZGV4ZXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlcilcbiAgLy8gYykgRXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5L2luZGV4XG4gIC8vIGQpIEZvciBTZXRzIGFuZCBNYXBzLCBlcXVhbCBjb250ZW50c1xuICAvLyBOb3RlOiB0aGlzIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNSkge1xuICAgIGFLZXlzID0gT2JqZWN0LmtleXModmFsMSk7XG4gICAgdmFyIGJLZXlzID0gT2JqZWN0LmtleXModmFsMik7IC8vIFRoZSBwYWlyIG11c3QgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcy5cblxuICAgIGlmIChhS2V5cy5sZW5ndGggIT09IGJLZXlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSAvLyBDaGVhcCBrZXkgdGVzdFxuXG5cbiAgdmFyIGkgPSAwO1xuXG4gIGZvciAoOyBpIDwgYUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5KHZhbDIsIGFLZXlzW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdHJpY3QgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gNSkge1xuICAgIHZhciBzeW1ib2xLZXlzQSA9IG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyh2YWwxKTtcblxuICAgIGlmIChzeW1ib2xLZXlzQS5sZW5ndGggIT09IDApIHtcbiAgICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBzeW1ib2xLZXlzQS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gc3ltYm9sS2V5c0FbaV07XG5cbiAgICAgICAgaWYgKHByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbDEsIGtleSkpIHtcbiAgICAgICAgICBpZiAoIXByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbDIsIGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhS2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wZXJ0eUlzRW51bWVyYWJsZSh2YWwyLCBrZXkpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBzeW1ib2xLZXlzQiA9IG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyh2YWwyKTtcblxuICAgICAgaWYgKHN5bWJvbEtleXNBLmxlbmd0aCAhPT0gc3ltYm9sS2V5c0IubGVuZ3RoICYmIGdldEVudW1lcmFibGVzKHZhbDIsIHN5bWJvbEtleXNCKS5sZW5ndGggIT09IGNvdW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9zeW1ib2xLZXlzQiA9IG9iamVjdEdldE93blByb3BlcnR5U3ltYm9scyh2YWwyKTtcblxuICAgICAgaWYgKF9zeW1ib2xLZXlzQi5sZW5ndGggIT09IDAgJiYgZ2V0RW51bWVyYWJsZXModmFsMiwgX3N5bWJvbEtleXNCKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChhS2V5cy5sZW5ndGggPT09IDAgJiYgKGl0ZXJhdGlvblR5cGUgPT09IGtOb0l0ZXJhdG9yIHx8IGl0ZXJhdGlvblR5cGUgPT09IGtJc0FycmF5ICYmIHZhbDEubGVuZ3RoID09PSAwIHx8IHZhbDEuc2l6ZSA9PT0gMCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBVc2UgbWVtb3MgdG8gaGFuZGxlIGN5Y2xlcy5cblxuXG4gIGlmIChtZW1vcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWVtb3MgPSB7XG4gICAgICB2YWwxOiBuZXcgTWFwKCksXG4gICAgICB2YWwyOiBuZXcgTWFwKCksXG4gICAgICBwb3NpdGlvbjogMFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gV2UgcHJldmVudCB1cCB0byB0d28gbWFwLmhhcyh4KSBjYWxscyBieSBkaXJlY3RseSByZXRyaWV2aW5nIHRoZSB2YWx1ZVxuICAgIC8vIGFuZCBjaGVja2luZyBmb3IgdW5kZWZpbmVkLiBUaGUgbWFwIGNhbiBvbmx5IGNvbnRhaW4gbnVtYmVycywgc28gaXQgaXNcbiAgICAvLyBzYWZlIHRvIGNoZWNrIGZvciB1bmRlZmluZWQgb25seS5cbiAgICB2YXIgdmFsMk1lbW9BID0gbWVtb3MudmFsMS5nZXQodmFsMSk7XG5cbiAgICBpZiAodmFsMk1lbW9BICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciB2YWwyTWVtb0IgPSBtZW1vcy52YWwyLmdldCh2YWwyKTtcblxuICAgICAgaWYgKHZhbDJNZW1vQiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB2YWwyTWVtb0EgPT09IHZhbDJNZW1vQjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vcy5wb3NpdGlvbisrO1xuICB9XG5cbiAgbWVtb3MudmFsMS5zZXQodmFsMSwgbWVtb3MucG9zaXRpb24pO1xuICBtZW1vcy52YWwyLnNldCh2YWwyLCBtZW1vcy5wb3NpdGlvbik7XG4gIHZhciBhcmVFcSA9IG9iakVxdWl2KHZhbDEsIHZhbDIsIHN0cmljdCwgYUtleXMsIG1lbW9zLCBpdGVyYXRpb25UeXBlKTtcbiAgbWVtb3MudmFsMS5kZWxldGUodmFsMSk7XG4gIG1lbW9zLnZhbDIuZGVsZXRlKHZhbDIpO1xuICByZXR1cm4gYXJlRXE7XG59XG5cbmZ1bmN0aW9uIHNldEhhc0VxdWFsRWxlbWVudChzZXQsIHZhbDEsIHN0cmljdCwgbWVtbykge1xuICAvLyBHbyBsb29raW5nLlxuICB2YXIgc2V0VmFsdWVzID0gYXJyYXlGcm9tU2V0KHNldCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdmFsMiA9IHNldFZhbHVlc1tpXTtcblxuICAgIGlmIChpbm5lckRlZXBFcXVhbCh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIG1hdGNoaW5nIGVsZW1lbnQgdG8gbWFrZSBzdXJlIHdlIGRvIG5vdCBjaGVjayB0aGF0IGFnYWluLlxuICAgICAgc2V0LmRlbGV0ZSh2YWwyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn0gLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvRXF1YWxpdHlfY29tcGFyaXNvbnNfYW5kX3NhbWVuZXNzI0xvb3NlX2VxdWFsaXR5X3VzaW5nXG4vLyBTYWRseSBpdCBpcyBub3QgcG9zc2libGUgdG8gZGV0ZWN0IGNvcnJlc3BvbmRpbmcgdmFsdWVzIHByb3Blcmx5IGluIGNhc2UgdGhlXG4vLyB0eXBlIGlzIGEgc3RyaW5nLCBudW1iZXIsIGJpZ2ludCBvciBib29sZWFuLiBUaGUgcmVhc29uIGlzIHRoYXQgdGhvc2UgdmFsdWVzXG4vLyBjYW4gbWF0Y2ggbG90cyBvZiBkaWZmZXJlbnQgc3RyaW5nIHZhbHVlcyAoZS5nLiwgMW4gPT0gJyswMDAwMScpLlxuXG5cbmZ1bmN0aW9uIGZpbmRMb29zZU1hdGNoaW5nUHJpbWl0aXZlcyhwcmltKSB7XG4gIHN3aXRjaCAoX3R5cGVvZihwcmltKSkge1xuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAvLyBPbmx5IHBhc3MgaW4gbnVsbCBhcyBvYmplY3QhXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBwcmltID0gK3ByaW07XG4gICAgLy8gTG9vc2UgZXF1YWwgZW50cmllcyBleGlzdCBvbmx5IGlmIHRoZSBzdHJpbmcgaXMgcG9zc2libGUgdG8gY29udmVydCB0b1xuICAgIC8vIGEgcmVndWxhciBudW1iZXIgYW5kIG5vdCBOYU4uXG4gICAgLy8gRmFsbCB0aHJvdWdoXG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgaWYgKG51bWJlcklzTmFOKHByaW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNldE1pZ2h0SGF2ZUxvb3NlUHJpbShhLCBiLCBwcmltKSB7XG4gIHZhciBhbHRWYWx1ZSA9IGZpbmRMb29zZU1hdGNoaW5nUHJpbWl0aXZlcyhwcmltKTtcbiAgaWYgKGFsdFZhbHVlICE9IG51bGwpIHJldHVybiBhbHRWYWx1ZTtcbiAgcmV0dXJuIGIuaGFzKGFsdFZhbHVlKSAmJiAhYS5oYXMoYWx0VmFsdWUpO1xufVxuXG5mdW5jdGlvbiBtYXBNaWdodEhhdmVMb29zZVByaW0oYSwgYiwgcHJpbSwgaXRlbSwgbWVtbykge1xuICB2YXIgYWx0VmFsdWUgPSBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSk7XG5cbiAgaWYgKGFsdFZhbHVlICE9IG51bGwpIHtcbiAgICByZXR1cm4gYWx0VmFsdWU7XG4gIH1cblxuICB2YXIgY3VyQiA9IGIuZ2V0KGFsdFZhbHVlKTtcblxuICBpZiAoY3VyQiA9PT0gdW5kZWZpbmVkICYmICFiLmhhcyhhbHRWYWx1ZSkgfHwgIWlubmVyRGVlcEVxdWFsKGl0ZW0sIGN1ckIsIGZhbHNlLCBtZW1vKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAhYS5oYXMoYWx0VmFsdWUpICYmIGlubmVyRGVlcEVxdWFsKGl0ZW0sIGN1ckIsIGZhbHNlLCBtZW1vKTtcbn1cblxuZnVuY3Rpb24gc2V0RXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vKSB7XG4gIC8vIFRoaXMgaXMgYSBsYXppbHkgaW5pdGlhdGVkIFNldCBvZiBlbnRyaWVzIHdoaWNoIGhhdmUgdG8gYmUgY29tcGFyZWRcbiAgLy8gcGFpcndpc2UuXG4gIHZhciBzZXQgPSBudWxsO1xuICB2YXIgYVZhbHVlcyA9IGFycmF5RnJvbVNldChhKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdmFsID0gYVZhbHVlc1tpXTsgLy8gTm90ZTogQ2hlY2tpbmcgZm9yIHRoZSBvYmplY3RzIGZpcnN0IGltcHJvdmVzIHRoZSBwZXJmb3JtYW5jZSBmb3Igb2JqZWN0XG4gICAgLy8gaGVhdnkgc2V0cyBidXQgaXQgaXMgYSBtaW5vciBzbG93IGRvd24gZm9yIHByaW1pdGl2ZXMuIEFzIHRoZXkgYXJlIGZhc3RcbiAgICAvLyB0byBjaGVjayB0aGlzIGltcHJvdmVzIHRoZSB3b3JzdCBjYXNlIHNjZW5hcmlvIGluc3RlYWQuXG5cbiAgICBpZiAoX3R5cGVvZih2YWwpID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgfSAvLyBJZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHNlY29uZCBzZXQgaXRzIGFuIG5vdCBudWxsXG4gICAgICAvLyBvYmplY3QgKG9yIG5vbiBzdHJpY3Qgb25seTogYSBub3QgbWF0Y2hpbmcgcHJpbWl0aXZlKSB3ZSdsbCBuZWVkIHRvIGdvXG4gICAgICAvLyBodW50aW5nIGZvciBzb21ldGhpbmcgdGhhdHMgZGVlcC0oc3RyaWN0LSllcXVhbCB0byBpdC4gVG8gbWFrZSB0aGlzXG4gICAgICAvLyBPKG4gbG9nIG4pIGNvbXBsZXhpdHkgd2UgaGF2ZSB0byBjb3B5IHRoZXNlIHZhbHVlcyBpbiBhIG5ldyBzZXQgZmlyc3QuXG5cblxuICAgICAgc2V0LmFkZCh2YWwpO1xuICAgIH0gZWxzZSBpZiAoIWIuaGFzKHZhbCkpIHtcbiAgICAgIGlmIChzdHJpY3QpIHJldHVybiBmYWxzZTsgLy8gRmFzdCBwYXRoIHRvIGRldGVjdCBtaXNzaW5nIHN0cmluZywgc3ltYm9sLCB1bmRlZmluZWQgYW5kIG51bGwgdmFsdWVzLlxuXG4gICAgICBpZiAoIXNldE1pZ2h0SGF2ZUxvb3NlUHJpbShhLCBiLCB2YWwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICB9XG5cbiAgICAgIHNldC5hZGQodmFsKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc2V0ICE9PSBudWxsKSB7XG4gICAgdmFyIGJWYWx1ZXMgPSBhcnJheUZyb21TZXQoYik7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYlZhbHVlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfdmFsID0gYlZhbHVlc1tfaV07IC8vIFdlIGhhdmUgdG8gY2hlY2sgaWYgYSBwcmltaXRpdmUgdmFsdWUgaXMgYWxyZWFkeVxuICAgICAgLy8gbWF0Y2hpbmcgYW5kIG9ubHkgaWYgaXQncyBub3QsIGdvIGh1bnRpbmcgZm9yIGl0LlxuXG4gICAgICBpZiAoX3R5cGVvZihfdmFsKSA9PT0gJ29iamVjdCcgJiYgX3ZhbCAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoIXNldEhhc0VxdWFsRWxlbWVudChzZXQsIF92YWwsIHN0cmljdCwgbWVtbykpIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiAhYS5oYXMoX3ZhbCkgJiYgIXNldEhhc0VxdWFsRWxlbWVudChzZXQsIF92YWwsIHN0cmljdCwgbWVtbykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZXQuc2l6ZSA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBtYXBIYXNFcXVhbEVudHJ5KHNldCwgbWFwLCBrZXkxLCBpdGVtMSwgc3RyaWN0LCBtZW1vKSB7XG4gIC8vIFRvIGJlIGFibGUgdG8gaGFuZGxlIGNhc2VzIGxpa2U6XG4gIC8vICAgTWFwKFtbe30sICdhJ10sIFt7fSwgJ2InXV0pIHZzIE1hcChbW3t9LCAnYiddLCBbe30sICdhJ11dKVxuICAvLyAuLi4gd2UgbmVlZCB0byBjb25zaWRlciAqYWxsKiBtYXRjaGluZyBrZXlzLCBub3QganVzdCB0aGUgZmlyc3Qgd2UgZmluZC5cbiAgdmFyIHNldFZhbHVlcyA9IGFycmF5RnJvbVNldChzZXQpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0VmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleTIgPSBzZXRWYWx1ZXNbaV07XG5cbiAgICBpZiAoaW5uZXJEZWVwRXF1YWwoa2V5MSwga2V5Miwgc3RyaWN0LCBtZW1vKSAmJiBpbm5lckRlZXBFcXVhbChpdGVtMSwgbWFwLmdldChrZXkyKSwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgc2V0LmRlbGV0ZShrZXkyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbWFwRXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vKSB7XG4gIHZhciBzZXQgPSBudWxsO1xuICB2YXIgYUVudHJpZXMgPSBhcnJheUZyb21NYXAoYSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhRW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfYUVudHJpZXMkaSA9IF9zbGljZWRUb0FycmF5KGFFbnRyaWVzW2ldLCAyKSxcbiAgICAgICAga2V5ID0gX2FFbnRyaWVzJGlbMF0sXG4gICAgICAgIGl0ZW0xID0gX2FFbnRyaWVzJGlbMV07XG5cbiAgICBpZiAoX3R5cGVvZihrZXkpID09PSAnb2JqZWN0JyAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgfVxuXG4gICAgICBzZXQuYWRkKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEJ5IGRpcmVjdGx5IHJldHJpZXZpbmcgdGhlIHZhbHVlIHdlIHByZXZlbnQgYW5vdGhlciBiLmhhcyhrZXkpIGNoZWNrIGluXG4gICAgICAvLyBhbG1vc3QgYWxsIHBvc3NpYmxlIGNhc2VzLlxuICAgICAgdmFyIGl0ZW0yID0gYi5nZXQoa2V5KTtcblxuICAgICAgaWYgKGl0ZW0yID09PSB1bmRlZmluZWQgJiYgIWIuaGFzKGtleSkgfHwgIWlubmVyRGVlcEVxdWFsKGl0ZW0xLCBpdGVtMiwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgICBpZiAoc3RyaWN0KSByZXR1cm4gZmFsc2U7IC8vIEZhc3QgcGF0aCB0byBkZXRlY3QgbWlzc2luZyBzdHJpbmcsIHN5bWJvbCwgdW5kZWZpbmVkIGFuZCBudWxsXG4gICAgICAgIC8vIGtleXMuXG5cbiAgICAgICAgaWYgKCFtYXBNaWdodEhhdmVMb29zZVByaW0oYSwgYiwga2V5LCBpdGVtMSwgbWVtbykpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzZXQgIT09IG51bGwpIHtcbiAgICB2YXIgYkVudHJpZXMgPSBhcnJheUZyb21NYXAoYik7XG5cbiAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBiRW50cmllcy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgX2JFbnRyaWVzJF9pID0gX3NsaWNlZFRvQXJyYXkoYkVudHJpZXNbX2kyXSwgMiksXG4gICAgICAgICAga2V5ID0gX2JFbnRyaWVzJF9pWzBdLFxuICAgICAgICAgIGl0ZW0gPSBfYkVudHJpZXMkX2lbMV07XG5cbiAgICAgIGlmIChfdHlwZW9mKGtleSkgPT09ICdvYmplY3QnICYmIGtleSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoIW1hcEhhc0VxdWFsRW50cnkoc2V0LCBhLCBrZXksIGl0ZW0sIHN0cmljdCwgbWVtbykpIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiAoIWEuaGFzKGtleSkgfHwgIWlubmVyRGVlcEVxdWFsKGEuZ2V0KGtleSksIGl0ZW0sIGZhbHNlLCBtZW1vKSkgJiYgIW1hcEhhc0VxdWFsRW50cnkoc2V0LCBhLCBrZXksIGl0ZW0sIGZhbHNlLCBtZW1vKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldC5zaXplID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIHN0cmljdCwga2V5cywgbWVtb3MsIGl0ZXJhdGlvblR5cGUpIHtcbiAgLy8gU2V0cyBhbmQgbWFwcyBkb24ndCBoYXZlIHRoZWlyIGVudHJpZXMgYWNjZXNzaWJsZSB2aWEgbm9ybWFsIG9iamVjdFxuICAvLyBwcm9wZXJ0aWVzLlxuICB2YXIgaSA9IDA7XG5cbiAgaWYgKGl0ZXJhdGlvblR5cGUgPT09IGtJc1NldCkge1xuICAgIGlmICghc2V0RXF1aXYoYSwgYiwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXRlcmF0aW9uVHlwZSA9PT0ga0lzTWFwKSB7XG4gICAgaWYgKCFtYXBFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpdGVyYXRpb25UeXBlID09PSBrSXNBcnJheSkge1xuICAgIGZvciAoOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5KGEsIGkpKSB7XG4gICAgICAgIGlmICghaGFzT3duUHJvcGVydHkoYiwgaSkgfHwgIWlubmVyRGVlcEVxdWFsKGFbaV0sIGJbaV0sIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KGIsIGkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFycmF5IGlzIHNwYXJzZS5cbiAgICAgICAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMoYSk7XG5cbiAgICAgICAgZm9yICg7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBrZXlzQVtpXTtcblxuICAgICAgICAgIGlmICghaGFzT3duUHJvcGVydHkoYiwga2V5KSB8fCAhaW5uZXJEZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXNBLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMoYikubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIFRoZSBwYWlyIG11c3QgaGF2ZSBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXkuXG4gIC8vIFBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3Q6XG5cblxuICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfa2V5ID0ga2V5c1tpXTtcblxuICAgIGlmICghaW5uZXJEZWVwRXF1YWwoYVtfa2V5XSwgYltfa2V5XSwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNEZWVwRXF1YWwodmFsMSwgdmFsMikge1xuICByZXR1cm4gaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwga0xvb3NlKTtcbn1cblxuZnVuY3Rpb24gaXNEZWVwU3RyaWN0RXF1YWwodmFsMSwgdmFsMikge1xuICByZXR1cm4gaW5uZXJEZWVwRXF1YWwodmFsMSwgdmFsMiwga1N0cmljdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0RlZXBFcXVhbDogaXNEZWVwRXF1YWwsXG4gIGlzRGVlcFN0cmljdEVxdWFsOiBpc0RlZXBTdHJpY3RFcXVhbFxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBmaWx0ZXIgPSByZXF1aXJlKCdhcnJheS1maWx0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhdmFpbGFibGVUeXBlZEFycmF5cygpIHtcblx0cmV0dXJuIGZpbHRlcihbXG5cdFx0J0JpZ0ludDY0QXJyYXknLFxuXHRcdCdCaWdVaW50NjRBcnJheScsXG5cdFx0J0Zsb2F0MzJBcnJheScsXG5cdFx0J0Zsb2F0NjRBcnJheScsXG5cdFx0J0ludDE2QXJyYXknLFxuXHRcdCdJbnQzMkFycmF5Jyxcblx0XHQnSW50OEFycmF5Jyxcblx0XHQnVWludDE2QXJyYXknLFxuXHRcdCdVaW50MzJBcnJheScsXG5cdFx0J1VpbnQ4QXJyYXknLFxuXHRcdCdVaW50OENsYW1wZWRBcnJheSdcblx0XSwgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHRyZXR1cm4gdHlwZW9mIGdsb2JhbFt0eXBlZEFycmF5XSA9PT0gJ2Z1bmN0aW9uJztcblx0fSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSByZXF1aXJlKCcuL2hlbHBlcnMvaXNBeGlvc0Vycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICdtYXhCb2R5TGVuZ3RoJywgJ21heFJlZGlyZWN0cycsICd0cmFuc3BvcnQnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXG4gIF07XG4gIHZhciBkaXJlY3RNZXJnZUtleXMgPSBbJ3ZhbGlkYXRlU3RhdHVzJ107XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXG4gICAgLmNvbmNhdChkaXJlY3RNZXJnZUtleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcxKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiAodHlwZW9mIHBheWxvYWQgPT09ICdvYmplY3QnKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCcuLycpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQmluZChHZXRJbnRyaW5zaWMoJ1N0cmluZy5wcm90b3R5cGUuaW5kZXhPZicpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQm91bmRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWMgPSBHZXRJbnRyaW5zaWMobmFtZSwgISFhbGxvd01pc3NpbmcpO1xuXHRpZiAodHlwZW9mIGludHJpbnNpYyA9PT0gJ2Z1bmN0aW9uJyAmJiAkaW5kZXhPZihuYW1lLCAnLnByb3RvdHlwZS4nKSA+IC0xKSB7XG5cdFx0cmV0dXJuIGNhbGxCaW5kKGludHJpbnNpYyk7XG5cdH1cblx0cmV0dXJuIGludHJpbnNpYztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRnT1BEID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnLCB0cnVlKTtcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSk7XG52YXIgJG1heCA9IEdldEludHJpbnNpYygnJU1hdGgubWF4JScpO1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZChvcmlnaW5hbEZ1bmN0aW9uKSB7XG5cdHZhciBmdW5jID0gJHJlZmxlY3RBcHBseShiaW5kLCAkY2FsbCwgYXJndW1lbnRzKTtcblx0aWYgKCRnT1BEICYmICRkZWZpbmVQcm9wZXJ0eSkge1xuXHRcdHZhciBkZXNjID0gJGdPUEQoZnVuYywgJ2xlbmd0aCcpO1xuXHRcdGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuXHRcdFx0Ly8gb3JpZ2luYWwgbGVuZ3RoLCBwbHVzIHRoZSByZWNlaXZlciwgbWludXMgYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIChhZnRlciB0aGUgcmVjZWl2ZXIpXG5cdFx0XHQkZGVmaW5lUHJvcGVydHkoXG5cdFx0XHRcdGZ1bmMsXG5cdFx0XHRcdCdsZW5ndGgnLFxuXHRcdFx0XHR7IHZhbHVlOiAxICsgJG1heCgwLCBvcmlnaW5hbEZ1bmN0aW9uLmxlbmd0aCAtIChhcmd1bWVudHMubGVuZ3RoIC0gMSkpIH1cblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmdW5jO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwiLypnbG9iYWwgd2luZG93LCBnbG9iYWwqL1xudmFyIHV0aWwgPSByZXF1aXJlKFwidXRpbFwiKVxudmFyIGFzc2VydCA9IHJlcXVpcmUoXCJhc3NlcnRcIilcbmZ1bmN0aW9uIG5vdygpIHsgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpIH1cblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG52YXIgY29uc29sZVxudmFyIHRpbWVzID0ge31cblxuaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNvbnNvbGUpIHtcbiAgICBjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGVcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuY29uc29sZSkge1xuICAgIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZVxufSBlbHNlIHtcbiAgICBjb25zb2xlID0ge31cbn1cblxudmFyIGZ1bmN0aW9ucyA9IFtcbiAgICBbbG9nLCBcImxvZ1wiXSxcbiAgICBbaW5mbywgXCJpbmZvXCJdLFxuICAgIFt3YXJuLCBcIndhcm5cIl0sXG4gICAgW2Vycm9yLCBcImVycm9yXCJdLFxuICAgIFt0aW1lLCBcInRpbWVcIl0sXG4gICAgW3RpbWVFbmQsIFwidGltZUVuZFwiXSxcbiAgICBbdHJhY2UsIFwidHJhY2VcIl0sXG4gICAgW2RpciwgXCJkaXJcIl0sXG4gICAgW2NvbnNvbGVBc3NlcnQsIFwiYXNzZXJ0XCJdXG5dXG5cbmZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHR1cGxlID0gZnVuY3Rpb25zW2ldXG4gICAgdmFyIGYgPSB0dXBsZVswXVxuICAgIHZhciBuYW1lID0gdHVwbGVbMV1cblxuICAgIGlmICghY29uc29sZVtuYW1lXSkge1xuICAgICAgICBjb25zb2xlW25hbWVdID0gZlxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zb2xlXG5cbmZ1bmN0aW9uIGxvZygpIHt9XG5cbmZ1bmN0aW9uIGluZm8oKSB7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxufVxuXG5mdW5jdGlvbiB3YXJuKCkge1xuICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cylcbn1cblxuZnVuY3Rpb24gdGltZShsYWJlbCkge1xuICAgIHRpbWVzW2xhYmVsXSA9IG5vdygpXG59XG5cbmZ1bmN0aW9uIHRpbWVFbmQobGFiZWwpIHtcbiAgICB2YXIgdGltZSA9IHRpbWVzW2xhYmVsXVxuICAgIGlmICghdGltZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzdWNoIGxhYmVsOiBcIiArIGxhYmVsKVxuICAgIH1cblxuICAgIGRlbGV0ZSB0aW1lc1tsYWJlbF1cbiAgICB2YXIgZHVyYXRpb24gPSBub3coKSAtIHRpbWVcbiAgICBjb25zb2xlLmxvZyhsYWJlbCArIFwiOiBcIiArIGR1cmF0aW9uICsgXCJtc1wiKVxufVxuXG5mdW5jdGlvbiB0cmFjZSgpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKClcbiAgICBlcnIubmFtZSA9IFwiVHJhY2VcIlxuICAgIGVyci5tZXNzYWdlID0gdXRpbC5mb3JtYXQuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKVxufVxuXG5mdW5jdGlvbiBkaXIob2JqZWN0KSB7XG4gICAgY29uc29sZS5sb2codXRpbC5pbnNwZWN0KG9iamVjdCkgKyBcIlxcblwiKVxufVxuXG5mdW5jdGlvbiBjb25zb2xlQXNzZXJ0KGV4cHJlc3Npb24pIHtcbiAgICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICAgICAgdmFyIGFyciA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICAgICBhc3NlcnQub2soZmFsc2UsIHV0aWwuZm9ybWF0LmFwcGx5KG51bGwsIGFycikpXG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJ29iamVjdC1rZXlzJyk7XG52YXIgaGFzU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbCgnZm9vJykgPT09ICdzeW1ib2wnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQ7XG52YXIgb3JpZ0RlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChmbikge1xuXHRyZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHRvU3RyLmNhbGwoZm4pID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIGFyZVByb3BlcnR5RGVzY3JpcHRvcnNTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBvYmogPSB7fTtcblx0dHJ5IHtcblx0XHRvcmlnRGVmaW5lUHJvcGVydHkob2JqLCAneCcsIHsgZW51bWVyYWJsZTogZmFsc2UsIHZhbHVlOiBvYmogfSk7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzLCBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdGZvciAodmFyIF8gaW4gb2JqKSB7IC8vIGpzY3M6aWdub3JlIGRpc2FsbG93VW51c2VkVmFyaWFibGVzXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBvYmoueCA9PT0gb2JqO1xuXHR9IGNhdGNoIChlKSB7IC8qIHRoaXMgaXMgSUUgOC4gKi9cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG52YXIgc3VwcG9ydHNEZXNjcmlwdG9ycyA9IG9yaWdEZWZpbmVQcm9wZXJ0eSAmJiBhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkKCk7XG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWUsIHZhbHVlLCBwcmVkaWNhdGUpIHtcblx0aWYgKG5hbWUgaW4gb2JqZWN0ICYmICghaXNGdW5jdGlvbihwcmVkaWNhdGUpIHx8ICFwcmVkaWNhdGUoKSkpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKHN1cHBvcnRzRGVzY3JpcHRvcnMpIHtcblx0XHRvcmlnRGVmaW5lUHJvcGVydHkob2JqZWN0LCBuYW1lLCB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdHdyaXRhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0b2JqZWN0W25hbWVdID0gdmFsdWU7XG5cdH1cbn07XG5cbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iamVjdCwgbWFwKSB7XG5cdHZhciBwcmVkaWNhdGVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB7fTtcblx0dmFyIHByb3BzID0ga2V5cyhtYXApO1xuXHRpZiAoaGFzU3ltYm9scykge1xuXHRcdHByb3BzID0gY29uY2F0LmNhbGwocHJvcHMsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMobWFwKSk7XG5cdH1cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcHNbaV0sIG1hcFtwcm9wc1tpXV0sIHByZWRpY2F0ZXNbcHJvcHNbaV1dKTtcblx0fVxufTtcblxuZGVmaW5lUHJvcGVydGllcy5zdXBwb3J0c0Rlc2NyaXB0b3JzID0gISFzdXBwb3J0c0Rlc2NyaXB0b3JzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZVByb3BlcnRpZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJyk7XG5pZiAoJGdPUEQpIHtcblx0dHJ5IHtcblx0XHQkZ09QRChbXSwgJ2xlbmd0aCcpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZ09QRFxuXHRcdCRnT1BEID0gbnVsbDtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9ICRnT1BEO1xuIiwiLyoqXG4gKiBDb2RlIHJlZmFjdG9yZWQgZnJvbSBNb3ppbGxhIERldmVsb3BlciBOZXR3b3JrOlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgZmlyc3RTb3VyY2UpIHtcbiAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKG5leHRTb3VyY2UgPT09IHVuZGVmaW5lZCB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIga2V5c0FycmF5ID0gT2JqZWN0LmtleXMoT2JqZWN0KG5leHRTb3VyY2UpKTtcbiAgICBmb3IgKHZhciBuZXh0SW5kZXggPSAwLCBsZW4gPSBrZXlzQXJyYXkubGVuZ3RoOyBuZXh0SW5kZXggPCBsZW47IG5leHRJbmRleCsrKSB7XG4gICAgICB2YXIgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgaWYgKGRlc2MgIT09IHVuZGVmaW5lZCAmJiBkZXNjLmVudW1lcmFibGUpIHtcbiAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdG87XG59XG5cbmZ1bmN0aW9uIHBvbHlmaWxsKCkge1xuICBpZiAoIU9iamVjdC5hc3NpZ24pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnYXNzaWduJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBhc3NpZ25cbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXNzaWduOiBhc3NpZ24sXG4gIHBvbHlmaWxsOiBwb2x5ZmlsbFxufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCJcbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JFYWNoIChvYmosIGZuLCBjdHgpIHtcbiAgICBpZiAodG9TdHJpbmcuY2FsbChmbikgIT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHZhciBsID0gb2JqLmxlbmd0aDtcbiAgICBpZiAobCA9PT0gK2wpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGZuLmNhbGwoY3R4LCBvYmpbaV0sIGksIG9iaik7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBrIGluIG9iaikge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKG9iaiwgaykpIHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGN0eCwgb2JqW2tdLCBrLCBvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnID8gc2VsZi5Gb3JtRGF0YSA6IHdpbmRvdy5Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IG5vLWludmFsaWQtdGhpczogMSAqL1xuXG52YXIgRVJST1JfTUVTU0FHRSA9ICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICc7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmNUeXBlID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKHRhcmdldCkgIT09IGZ1bmNUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRVJST1JfTUVTU0FHRSArIHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBiaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYm91bmRMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuICAgIHZhciBib3VuZEFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvdW5kTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm91bmRBcmdzLnB1c2goJyQnICsgaSk7XG4gICAgfVxuXG4gICAgYm91bmQgPSBGdW5jdGlvbignYmluZGVyJywgJ3JldHVybiBmdW5jdGlvbiAoJyArIGJvdW5kQXJncy5qb2luKCcsJykgKyAnKXsgcmV0dXJuIGJpbmRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgaWYgKHRhcmdldC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIEVtcHR5ID0gZnVuY3Rpb24gRW1wdHkoKSB7fTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGltcGxlbWVudGF0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdW5kZWZpbmVkO1xuXG52YXIgJFN5bnRheEVycm9yID0gU3ludGF4RXJyb3I7XG52YXIgJEZ1bmN0aW9uID0gRnVuY3Rpb247XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG52YXIgZ2V0RXZhbGxlZENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGV4cHJlc3Npb25TeW50YXgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gJEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjsgcmV0dXJuICgnICsgZXhwcmVzc2lvblN5bnRheCArICcpLmNvbnN0cnVjdG9yOycpKCk7XG5cdH0gY2F0Y2ggKGUpIHt9XG59O1xuXG52YXIgJGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoe30sICcnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdCRnT1BEID0gbnVsbDsgLy8gdGhpcyBpcyBJRSA4LCB3aGljaCBoYXMgYSBicm9rZW4gZ09QRFxuXHR9XG59XG5cbnZhciB0aHJvd1R5cGVFcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoKTtcbn07XG52YXIgVGhyb3dUeXBlRXJyb3IgPSAkZ09QRFxuXHQ/IChmdW5jdGlvbiAoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLWNhbGxlciwgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG5cdFx0XHRhcmd1bWVudHMuY2FsbGVlOyAvLyBJRSA4IGRvZXMgbm90IHRocm93IGhlcmVcblx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHR9IGNhdGNoIChjYWxsZWVUaHJvd3MpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElFIDggdGhyb3dzIG9uIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXJndW1lbnRzLCAnJylcblx0XHRcdFx0cmV0dXJuICRnT1BEKGFyZ3VtZW50cywgJ2NhbGxlZScpLmdldDtcblx0XHRcdH0gY2F0Y2ggKGdPUER0aHJvd3MpIHtcblx0XHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fSgpKVxuXHQ6IHRocm93VHlwZUVycm9yO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcblxudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Ll9fcHJvdG9fXzsgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuXG52YXIgbmVlZHNFdmFsID0ge307XG5cbnZhciBUeXBlZEFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8oVWludDhBcnJheSk7XG5cbnZhciBJTlRSSU5TSUNTID0ge1xuXHQnJUFnZ3JlZ2F0ZUVycm9yJSc6IHR5cGVvZiBBZ2dyZWdhdGVFcnJvciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBZ2dyZWdhdGVFcnJvcixcblx0JyVBcnJheSUnOiBBcnJheSxcblx0JyVBcnJheUJ1ZmZlciUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIsXG5cdCclQXJyYXlJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Zyb21TeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IG5lZWRzRXZhbCxcblx0JyVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCclQmlnSW50JSc6IHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50LFxuXHQnJUJvb2xlYW4lJzogQm9vbGVhbixcblx0JyVEYXRhVmlldyUnOiB0eXBlb2YgRGF0YVZpZXcgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRGF0YVZpZXcsXG5cdCclRGF0ZSUnOiBEYXRlLFxuXHQnJWRlY29kZVVSSSUnOiBkZWNvZGVVUkksXG5cdCclZGVjb2RlVVJJQ29tcG9uZW50JSc6IGRlY29kZVVSSUNvbXBvbmVudCxcblx0JyVlbmNvZGVVUkklJzogZW5jb2RlVVJJLFxuXHQnJWVuY29kZVVSSUNvbXBvbmVudCUnOiBlbmNvZGVVUklDb21wb25lbnQsXG5cdCclRXJyb3IlJzogRXJyb3IsXG5cdCclZXZhbCUnOiBldmFsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcblx0JyVFdmFsRXJyb3IlJzogRXZhbEVycm9yLFxuXHQnJUZsb2F0MzJBcnJheSUnOiB0eXBlb2YgRmxvYXQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0MzJBcnJheSxcblx0JyVGbG9hdDY0QXJyYXklJzogdHlwZW9mIEZsb2F0NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDY0QXJyYXksXG5cdCclRmluYWxpemF0aW9uUmVnaXN0cnklJzogdHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZpbmFsaXphdGlvblJlZ2lzdHJ5LFxuXHQnJUZ1bmN0aW9uJSc6ICRGdW5jdGlvbixcblx0JyVHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclSW50OEFycmF5JSc6IHR5cGVvZiBJbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50OEFycmF5LFxuXHQnJUludDE2QXJyYXklJzogdHlwZW9mIEludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MTZBcnJheSxcblx0JyVJbnQzMkFycmF5JSc6IHR5cGVvZiBJbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDMyQXJyYXksXG5cdCclaXNGaW5pdGUlJzogaXNGaW5pdGUsXG5cdCclaXNOYU4lJzogaXNOYU4sXG5cdCclSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkpIDogdW5kZWZpbmVkLFxuXHQnJUpTT04lJzogdHlwZW9mIEpTT04gPT09ICdvYmplY3QnID8gSlNPTiA6IHVuZGVmaW5lZCxcblx0JyVNYXAlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBNYXAsXG5cdCclTWFwSXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgTWFwKClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVNYXRoJSc6IE1hdGgsXG5cdCclTnVtYmVyJSc6IE51bWJlcixcblx0JyVPYmplY3QlJzogT2JqZWN0LFxuXHQnJXBhcnNlRmxvYXQlJzogcGFyc2VGbG9hdCxcblx0JyVwYXJzZUludCUnOiBwYXJzZUludCxcblx0JyVQcm9taXNlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UsXG5cdCclUHJveHklJzogdHlwZW9mIFByb3h5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb3h5LFxuXHQnJVJhbmdlRXJyb3IlJzogUmFuZ2VFcnJvcixcblx0JyVSZWZlcmVuY2VFcnJvciUnOiBSZWZlcmVuY2VFcnJvcixcblx0JyVSZWZsZWN0JSc6IHR5cGVvZiBSZWZsZWN0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFJlZmxlY3QsXG5cdCclUmVnRXhwJSc6IFJlZ0V4cCxcblx0JyVTZXQlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTZXQsXG5cdCclU2V0SXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgU2V0KClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlciUnOiB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2hhcmVkQXJyYXlCdWZmZXIsXG5cdCclU3RyaW5nJSc6IFN0cmluZyxcblx0JyVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oJydbU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVTeW1ib2wlJzogaGFzU3ltYm9scyA/IFN5bWJvbCA6IHVuZGVmaW5lZCxcblx0JyVTeW50YXhFcnJvciUnOiAkU3ludGF4RXJyb3IsXG5cdCclVGhyb3dUeXBlRXJyb3IlJzogVGhyb3dUeXBlRXJyb3IsXG5cdCclVHlwZWRBcnJheSUnOiBUeXBlZEFycmF5LFxuXHQnJVR5cGVFcnJvciUnOiAkVHlwZUVycm9yLFxuXHQnJVVpbnQ4QXJyYXklJzogdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhBcnJheSxcblx0JyVVaW50OENsYW1wZWRBcnJheSUnOiB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhDbGFtcGVkQXJyYXksXG5cdCclVWludDE2QXJyYXklJzogdHlwZW9mIFVpbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQxNkFycmF5LFxuXHQnJVVpbnQzMkFycmF5JSc6IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MzJBcnJheSxcblx0JyVVUklFcnJvciUnOiBVUklFcnJvcixcblx0JyVXZWFrTWFwJSc6IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtNYXAsXG5cdCclV2Vha1JlZiUnOiB0eXBlb2YgV2Vha1JlZiA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrUmVmLFxuXHQnJVdlYWtTZXQlJzogdHlwZW9mIFdlYWtTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1NldFxufTtcblxudmFyIGRvRXZhbCA9IGZ1bmN0aW9uIGRvRXZhbChuYW1lKSB7XG5cdHZhciB2YWx1ZTtcblx0aWYgKG5hbWUgPT09ICclQXN5bmNGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2Z1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3IlJykge1xuXHRcdHZhciBmbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJyk7XG5cdFx0aWYgKGZuKSB7XG5cdFx0XHR2YWx1ZSA9IGZuLnByb3RvdHlwZTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJScpIHtcblx0XHR2YXIgZ2VuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3IlJyk7XG5cdFx0aWYgKGdlbikge1xuXHRcdFx0dmFsdWUgPSBnZXRQcm90byhnZW4ucHJvdG90eXBlKTtcblx0XHR9XG5cdH1cblxuXHRJTlRSSU5TSUNTW25hbWVdID0gdmFsdWU7XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxudmFyIExFR0FDWV9BTElBU0VTID0ge1xuXHQnJUFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b3R5cGUlJzogWydBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvX2VudHJpZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZW50cmllcyddLFxuXHQnJUFycmF5UHJvdG9fZm9yRWFjaCUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdmb3JFYWNoJ10sXG5cdCclQXJyYXlQcm90b19rZXlzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2tleXMnXSxcblx0JyVBcnJheVByb3RvX3ZhbHVlcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICd2YWx1ZXMnXSxcblx0JyVBc3luY0Z1bmN0aW9uUHJvdG90eXBlJSc6IFsnQXN5bmNGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3JQcm90b3R5cGUlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVCb29sZWFuUHJvdG90eXBlJSc6IFsnQm9vbGVhbicsICdwcm90b3R5cGUnXSxcblx0JyVEYXRhVmlld1Byb3RvdHlwZSUnOiBbJ0RhdGFWaWV3JywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGVQcm90b3R5cGUlJzogWydEYXRlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUVycm9yUHJvdG90eXBlJSc6IFsnRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRXZhbEVycm9yUHJvdG90eXBlJSc6IFsnRXZhbEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0MzJBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDY0QXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDY0QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRnVuY3Rpb25Qcm90b3R5cGUlJzogWydGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3IlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3JQcm90b3R5cGUlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclSW50OEFycmF5UHJvdG90eXBlJSc6IFsnSW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDE2QXJyYXlQcm90b3R5cGUlJzogWydJbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDMyQXJyYXlQcm90b3R5cGUlJzogWydJbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUpTT05QYXJzZSUnOiBbJ0pTT04nLCAncGFyc2UnXSxcblx0JyVKU09OU3RyaW5naWZ5JSc6IFsnSlNPTicsICdzdHJpbmdpZnknXSxcblx0JyVNYXBQcm90b3R5cGUlJzogWydNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclTnVtYmVyUHJvdG90eXBlJSc6IFsnTnVtYmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJU9iamVjdFByb3RvdHlwZSUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnXSxcblx0JyVPYmpQcm90b190b1N0cmluZyUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndG9TdHJpbmcnXSxcblx0JyVPYmpQcm90b192YWx1ZU9mJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd2YWx1ZU9mJ10sXG5cdCclUHJvbWlzZVByb3RvdHlwZSUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJ10sXG5cdCclUHJvbWlzZVByb3RvX3RoZW4lJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZScsICd0aGVuJ10sXG5cdCclUHJvbWlzZV9hbGwlJzogWydQcm9taXNlJywgJ2FsbCddLFxuXHQnJVByb21pc2VfcmVqZWN0JSc6IFsnUHJvbWlzZScsICdyZWplY3QnXSxcblx0JyVQcm9taXNlX3Jlc29sdmUlJzogWydQcm9taXNlJywgJ3Jlc29sdmUnXSxcblx0JyVSYW5nZUVycm9yUHJvdG90eXBlJSc6IFsnUmFuZ2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWZlcmVuY2VFcnJvclByb3RvdHlwZSUnOiBbJ1JlZmVyZW5jZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZ0V4cFByb3RvdHlwZSUnOiBbJ1JlZ0V4cCcsICdwcm90b3R5cGUnXSxcblx0JyVTZXRQcm90b3R5cGUlJzogWydTZXQnLCAncHJvdG90eXBlJ10sXG5cdCclU2hhcmVkQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydTaGFyZWRBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVTdHJpbmdQcm90b3R5cGUlJzogWydTdHJpbmcnLCAncHJvdG90eXBlJ10sXG5cdCclU3ltYm9sUHJvdG90eXBlJSc6IFsnU3ltYm9sJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bnRheEVycm9yUHJvdG90eXBlJSc6IFsnU3ludGF4RXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZWRBcnJheVByb3RvdHlwZSUnOiBbJ1R5cGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZUVycm9yUHJvdG90eXBlJSc6IFsnVHlwZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4QXJyYXlQcm90b3R5cGUlJzogWydVaW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhDbGFtcGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDE2QXJyYXlQcm90b3R5cGUlJzogWydVaW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVSSUVycm9yUHJvdG90eXBlJSc6IFsnVVJJRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha01hcFByb3RvdHlwZSUnOiBbJ1dlYWtNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha1NldFByb3RvdHlwZSUnOiBbJ1dlYWtTZXQnLCAncHJvdG90eXBlJ11cbn07XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJ2hhcycpO1xudmFyICRjb25jYXQgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgQXJyYXkucHJvdG90eXBlLmNvbmNhdCk7XG52YXIgJHNwbGljZUFwcGx5ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmFwcGx5LCBBcnJheS5wcm90b3R5cGUuc3BsaWNlKTtcbnZhciAkcmVwbGFjZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xudmFyICRzdHJTbGljZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnNsaWNlKTtcblxuLyogYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xNy4xNS9kaXN0L2xvZGFzaC5qcyNMNjczNS1MNjc0NCAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14lLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCUkKSkvZztcbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZzsgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgc3RyaW5nVG9QYXRoID0gZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuXHR2YXIgZmlyc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAwLCAxKTtcblx0dmFyIGxhc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAtMSk7XG5cdGlmIChmaXJzdCA9PT0gJyUnICYmIGxhc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgY2xvc2luZyBgJWAnKTtcblx0fSBlbHNlIGlmIChsYXN0ID09PSAnJScgJiYgZmlyc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgb3BlbmluZyBgJWAnKTtcblx0fVxuXHR2YXIgcmVzdWx0ID0gW107XG5cdCRyZXBsYWNlKHN0cmluZywgcmVQcm9wTmFtZSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcblx0XHRyZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBxdW90ZSA/ICRyZXBsYWNlKHN1YlN0cmluZywgcmVFc2NhcGVDaGFyLCAnJDEnKSA6IG51bWJlciB8fCBtYXRjaDtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuLyogZW5kIGFkYXB0YXRpb24gKi9cblxudmFyIGdldEJhc2VJbnRyaW5zaWMgPSBmdW5jdGlvbiBnZXRCYXNlSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljTmFtZSA9IG5hbWU7XG5cdHZhciBhbGlhcztcblx0aWYgKGhhc093bihMRUdBQ1lfQUxJQVNFUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHRhbGlhcyA9IExFR0FDWV9BTElBU0VTW2ludHJpbnNpY05hbWVdO1xuXHRcdGludHJpbnNpY05hbWUgPSAnJScgKyBhbGlhc1swXSArICclJztcblx0fVxuXG5cdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHR2YXIgdmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY05hbWVdO1xuXHRcdGlmICh2YWx1ZSA9PT0gbmVlZHNFdmFsKSB7XG5cdFx0XHR2YWx1ZSA9IGRvRXZhbChpbnRyaW5zaWNOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGZpbGUgYW4gaXNzdWUhJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGFsaWFzOiBhbGlhcyxcblx0XHRcdG5hbWU6IGludHJpbnNpY05hbWUsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHR9XG5cblx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR2V0SW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdcImFsbG93TWlzc2luZ1wiIGFyZ3VtZW50IG11c3QgYmUgYSBib29sZWFuJyk7XG5cdH1cblxuXHR2YXIgcGFydHMgPSBzdHJpbmdUb1BhdGgobmFtZSk7XG5cdHZhciBpbnRyaW5zaWNCYXNlTmFtZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0c1swXSA6ICcnO1xuXG5cdHZhciBpbnRyaW5zaWMgPSBnZXRCYXNlSW50cmluc2ljKCclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnLCBhbGxvd01pc3NpbmcpO1xuXHR2YXIgaW50cmluc2ljUmVhbE5hbWUgPSBpbnRyaW5zaWMubmFtZTtcblx0dmFyIHZhbHVlID0gaW50cmluc2ljLnZhbHVlO1xuXHR2YXIgc2tpcEZ1cnRoZXJDYWNoaW5nID0gZmFsc2U7XG5cblx0dmFyIGFsaWFzID0gaW50cmluc2ljLmFsaWFzO1xuXHRpZiAoYWxpYXMpIHtcblx0XHRpbnRyaW5zaWNCYXNlTmFtZSA9IGFsaWFzWzBdO1xuXHRcdCRzcGxpY2VBcHBseShwYXJ0cywgJGNvbmNhdChbMCwgMV0sIGFsaWFzKSk7XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMSwgaXNPd24gPSB0cnVlOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHR2YXIgcGFydCA9IHBhcnRzW2ldO1xuXHRcdHZhciBmaXJzdCA9ICRzdHJTbGljZShwYXJ0LCAwLCAxKTtcblx0XHR2YXIgbGFzdCA9ICRzdHJTbGljZShwYXJ0LCAtMSk7XG5cdFx0aWYgKFxuXHRcdFx0KFxuXHRcdFx0XHQoZmlyc3QgPT09ICdcIicgfHwgZmlyc3QgPT09IFwiJ1wiIHx8IGZpcnN0ID09PSAnYCcpXG5cdFx0XHRcdHx8IChsYXN0ID09PSAnXCInIHx8IGxhc3QgPT09IFwiJ1wiIHx8IGxhc3QgPT09ICdgJylcblx0XHRcdClcblx0XHRcdCYmIGZpcnN0ICE9PSBsYXN0XG5cdFx0KSB7XG5cdFx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdwcm9wZXJ0eSBuYW1lcyB3aXRoIHF1b3RlcyBtdXN0IGhhdmUgbWF0Y2hpbmcgcXVvdGVzJyk7XG5cdFx0fVxuXHRcdGlmIChwYXJ0ID09PSAnY29uc3RydWN0b3InIHx8ICFpc093bikge1xuXHRcdFx0c2tpcEZ1cnRoZXJDYWNoaW5nID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbnRyaW5zaWNCYXNlTmFtZSArPSAnLicgKyBwYXJ0O1xuXHRcdGludHJpbnNpY1JlYWxOYW1lID0gJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJSc7XG5cblx0XHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY1JlYWxOYW1lKSkge1xuXHRcdFx0dmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0XHRcdGlmICghKHBhcnQgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdGlmICghYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Jhc2UgaW50cmluc2ljIGZvciAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgdGhlIHByb3BlcnR5IGlzIG5vdCBhdmFpbGFibGUuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZvaWQgdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCRnT1BEICYmIChpICsgMSkgPj0gcGFydHMubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBkZXNjID0gJGdPUEQodmFsdWUsIHBhcnQpO1xuXHRcdFx0XHRpc093biA9ICEhZGVzYztcblxuXHRcdFx0XHQvLyBCeSBjb252ZW50aW9uLCB3aGVuIGEgZGF0YSBwcm9wZXJ0eSBpcyBjb252ZXJ0ZWQgdG8gYW4gYWNjZXNzb3Jcblx0XHRcdFx0Ly8gcHJvcGVydHkgdG8gZW11bGF0ZSBhIGRhdGEgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBzdWZmZXIgZnJvbVxuXHRcdFx0XHQvLyB0aGUgb3ZlcnJpZGUgbWlzdGFrZSwgdGhhdCBhY2Nlc3NvcidzIGdldHRlciBpcyBtYXJrZWQgd2l0aFxuXHRcdFx0XHQvLyBhbiBgb3JpZ2luYWxWYWx1ZWAgcHJvcGVydHkuIEhlcmUsIHdoZW4gd2UgZGV0ZWN0IHRoaXMsIHdlXG5cdFx0XHRcdC8vIHVwaG9sZCB0aGUgaWxsdXNpb24gYnkgcHJldGVuZGluZyB0byBzZWUgdGhhdCBvcmlnaW5hbCBkYXRhXG5cdFx0XHRcdC8vIHByb3BlcnR5LCBpLmUuLCByZXR1cm5pbmcgdGhlIHZhbHVlIHJhdGhlciB0aGFuIHRoZSBnZXR0ZXJcblx0XHRcdFx0Ly8gaXRzZWxmLlxuXHRcdFx0XHRpZiAoaXNPd24gJiYgJ2dldCcgaW4gZGVzYyAmJiAhKCdvcmlnaW5hbFZhbHVlJyBpbiBkZXNjLmdldCkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlc2MuZ2V0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzT3duID0gaGFzT3duKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzT3duICYmICFza2lwRnVydGhlckNhY2hpbmcpIHtcblx0XHRcdFx0SU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9yaWdTeW1ib2wgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2w7XG52YXIgaGFzU3ltYm9sU2hhbSA9IHJlcXVpcmUoJy4vc2hhbXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNOYXRpdmVTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIG9yaWdTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIG9yaWdTeW1ib2woJ2ZvbycpICE9PSAnc3ltYm9sJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2woJ2JhcicpICE9PSAnc3ltYm9sJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRyZXR1cm4gaGFzU3ltYm9sU2hhbSgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IGNvbXBsZXhpdHk6IFsyLCAxOF0sIG1heC1zdGF0ZW1lbnRzOiBbMiwgMzNdICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1N5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcpIHsgcmV0dXJuIHRydWU7IH1cblxuXHR2YXIgb2JqID0ge307XG5cdHZhciBzeW0gPSBTeW1ib2woJ3Rlc3QnKTtcblx0dmFyIHN5bU9iaiA9IE9iamVjdChzeW0pO1xuXHRpZiAodHlwZW9mIHN5bSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW1PYmopICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL29iamVjdC5hc3NpZ24vaXNzdWVzLzE3XG5cdC8vIGlmIChzeW0gaW5zdGFuY2VvZiBTeW1ib2wpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL2dldC1vd24tcHJvcGVydHktc3ltYm9scy9pc3N1ZXMvNFxuXHQvLyBpZiAoIShzeW1PYmogaW5zdGFuY2VvZiBTeW1ib2wpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIGlmICh0eXBlb2YgU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gaWYgKFN0cmluZyhzeW0pICE9PSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltVmFsID0gNDI7XG5cdG9ialtzeW1dID0gc3ltVmFsO1xuXHRmb3IgKHN5bSBpbiBvYmopIHsgcmV0dXJuIGZhbHNlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLXVucmVhY2hhYmxlLWxvb3Bcblx0aWYgKHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1zID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopO1xuXHRpZiAoc3ltcy5sZW5ndGggIT09IDEgfHwgc3ltc1swXSAhPT0gc3ltKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBzeW0pO1xuXHRcdGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSBzeW1WYWwgfHwgZGVzY3JpcHRvci5lbnVtZXJhYmxlICE9PSB0cnVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBpZiAoc3VwZXJDdG9yKSB7XG4gICAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpO1xuXG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG5cbnZhciBpc1N0YW5kYXJkQXJndW1lbnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0aWYgKGhhc1RvU3RyaW5nVGFnICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbHVlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiAkdG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbnZhciBpc0xlZ2FjeUFyZ3VtZW50cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdGlmIChpc1N0YW5kYXJkQXJndW1lbnRzKHZhbHVlKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0JHRvU3RyaW5nKHZhbHVlKSAhPT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuXHRcdCR0b1N0cmluZyh2YWx1ZS5jYWxsZWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufTtcblxudmFyIHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gaXNTdGFuZGFyZEFyZ3VtZW50cyhhcmd1bWVudHMpO1xufSgpKTtcblxuaXNTdGFuZGFyZEFyZ3VtZW50cy5pc0xlZ2FjeUFyZ3VtZW50cyA9IGlzTGVnYWN5QXJndW1lbnRzOyAvLyBmb3IgdGVzdHNcblxubW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c1N0YW5kYXJkQXJndW1lbnRzID8gaXNTdGFuZGFyZEFyZ3VtZW50cyA6IGlzTGVnYWN5QXJndW1lbnRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZuVG9TdHIgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgaXNGblJlZ2V4ID0gL15cXHMqKD86ZnVuY3Rpb24pP1xcKi87XG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIGdldEdlbmVyYXRvckZ1bmMgPSBmdW5jdGlvbiAoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0aWYgKCFoYXNUb1N0cmluZ1RhZykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHR0cnkge1xuXHRcdHJldHVybiBGdW5jdGlvbigncmV0dXJuIGZ1bmN0aW9uKigpIHt9JykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHR9XG59O1xudmFyIGdlbmVyYXRvckZ1bmMgPSBnZXRHZW5lcmF0b3JGdW5jKCk7XG52YXIgR2VuZXJhdG9yRnVuY3Rpb24gPSBnZXRQcm90byAmJiBnZW5lcmF0b3JGdW5jID8gZ2V0UHJvdG8oZ2VuZXJhdG9yRnVuYykgOiBmYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0dlbmVyYXRvckZ1bmN0aW9uKGZuKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0aWYgKGlzRm5SZWdleC50ZXN0KGZuVG9TdHIuY2FsbChmbikpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKCFoYXNUb1N0cmluZ1RhZykge1xuXHRcdHZhciBzdHIgPSB0b1N0ci5jYWxsKGZuKTtcblx0XHRyZXR1cm4gc3RyID09PSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nO1xuXHR9XG5cdHJldHVybiBnZXRQcm90byAmJiBnZXRQcm90byhmbikgPT09IEdlbmVyYXRvckZ1bmN0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5pc25hbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTmFOKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCdjYWxsLWJpbmQnKTtcbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgcG9seWZpbGwgPSBjYWxsQmluZChnZXRQb2x5ZmlsbCgpLCBOdW1iZXIpO1xuXG4vKiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLmlzbmFuICovXG5cbmRlZmluZShwb2x5ZmlsbCwge1xuXHRnZXRQb2x5ZmlsbDogZ2V0UG9seWZpbGwsXG5cdGltcGxlbWVudGF0aW9uOiBpbXBsZW1lbnRhdGlvbixcblx0c2hpbTogc2hpbVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcG9seWZpbGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQb2x5ZmlsbCgpIHtcblx0aWYgKE51bWJlci5pc05hTiAmJiBOdW1iZXIuaXNOYU4oTmFOKSAmJiAhTnVtYmVyLmlzTmFOKCdhJykpIHtcblx0XHRyZXR1cm4gTnVtYmVyLmlzTmFOO1xuXHR9XG5cdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xuXG4vKiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLmlzbmFuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbU51bWJlcklzTmFOKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoTnVtYmVyLCB7IGlzTmFOOiBwb2x5ZmlsbCB9LCB7XG5cdFx0aXNOYU46IGZ1bmN0aW9uIHRlc3RJc05hTigpIHtcblx0XHRcdHJldHVybiBOdW1iZXIuaXNOYU4gIT09IHBvbHlmaWxsO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yZWFjaCcpO1xudmFyIGF2YWlsYWJsZVR5cGVkQXJyYXlzID0gcmVxdWlyZSgnYXZhaWxhYmxlLXR5cGVkLWFycmF5cycpO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC9jYWxsQm91bmQnKTtcblxudmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSBoYXNTeW1ib2xzICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xuXG52YXIgdHlwZWRBcnJheXMgPSBhdmFpbGFibGVUeXBlZEFycmF5cygpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQm91bmQoJ0FycmF5LnByb3RvdHlwZS5pbmRleE9mJywgdHJ1ZSkgfHwgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcblx0XHRcdHJldHVybiBpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gLTE7XG59O1xudmFyICRzbGljZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5zbGljZScpO1xudmFyIHRvU3RyVGFncyA9IHt9O1xudmFyIGdPUEQgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9oZWxwZXJzL2dldE93blByb3BlcnR5RGVzY3JpcHRvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mOyAvLyByZXF1aXJlKCdnZXRwcm90b3R5cGVvZicpO1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG90eXBlT2YpIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHR2YXIgYXJyID0gbmV3IGdsb2JhbFt0eXBlZEFycmF5XSgpO1xuXHRcdGlmICghKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBhcnIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXZhbEVycm9yKCd0aGlzIGVuZ2luZSBoYXMgc3VwcG9ydCBmb3IgU3ltYm9sLnRvU3RyaW5nVGFnLCBidXQgJyArIHR5cGVkQXJyYXkgKyAnIGRvZXMgbm90IGhhdmUgdGhlIHByb3BlcnR5ISBQbGVhc2UgcmVwb3J0IHRoaXMuJyk7XG5cdFx0fVxuXHRcdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGFycik7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBnT1BEKHByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdGlmICghZGVzY3JpcHRvcikge1xuXHRcdFx0dmFyIHN1cGVyUHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90byk7XG5cdFx0XHRkZXNjcmlwdG9yID0gZ09QRChzdXBlclByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdH1cblx0XHR0b1N0clRhZ3NbdHlwZWRBcnJheV0gPSBkZXNjcmlwdG9yLmdldDtcblx0fSk7XG59XG5cbnZhciB0cnlUeXBlZEFycmF5cyA9IGZ1bmN0aW9uIHRyeUFsbFR5cGVkQXJyYXlzKHZhbHVlKSB7XG5cdHZhciBhbnlUcnVlID0gZmFsc2U7XG5cdGZvckVhY2godG9TdHJUYWdzLCBmdW5jdGlvbiAoZ2V0dGVyLCB0eXBlZEFycmF5KSB7XG5cdFx0aWYgKCFhbnlUcnVlKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRhbnlUcnVlID0gZ2V0dGVyLmNhbGwodmFsdWUpID09PSB0eXBlZEFycmF5O1xuXHRcdFx0fSBjYXRjaCAoZSkgeyAvKiovIH1cblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gYW55VHJ1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG5cdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKCFoYXNUb1N0cmluZ1RhZykge1xuXHRcdHZhciB0YWcgPSAkc2xpY2UoJHRvU3RyaW5nKHZhbHVlKSwgOCwgLTEpO1xuXHRcdHJldHVybiAkaW5kZXhPZih0eXBlZEFycmF5cywgdGFnKSA+IC0xO1xuXHR9XG5cdGlmICghZ09QRCkgeyByZXR1cm4gZmFsc2U7IH1cblx0cmV0dXJuIHRyeVR5cGVkQXJyYXlzKHZhbHVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBudW1iZXJJc05hTiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpcyhhLCBiKSB7XG5cdGlmIChhID09PSAwICYmIGIgPT09IDApIHtcblx0XHRyZXR1cm4gMSAvIGEgPT09IDEgLyBiO1xuXHR9XG5cdGlmIChhID09PSBiKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0aWYgKG51bWJlcklzTmFOKGEpICYmIG51bWJlcklzTmFOKGIpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZCcpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgcG9seWZpbGwgPSBjYWxsQmluZChnZXRQb2x5ZmlsbCgpLCBPYmplY3QpO1xuXG5kZWZpbmUocG9seWZpbGwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvbHlmaWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdHJldHVybiB0eXBlb2YgT2JqZWN0LmlzID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmlzIDogaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGltT2JqZWN0SXMoKSB7XG5cdHZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cdGRlZmluZShPYmplY3QsIHsgaXM6IHBvbHlmaWxsIH0sIHtcblx0XHRpczogZnVuY3Rpb24gdGVzdE9iamVjdElzKCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5pcyAhPT0gcG9seWZpbGw7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHBvbHlmaWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXNTaGltO1xuaWYgKCFPYmplY3Qua2V5cykge1xuXHQvLyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXHR2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuXHR2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblx0dmFyIGhhc0RvbnRFbnVtQnVnID0gIWlzRW51bWVyYWJsZS5jYWxsKHsgdG9TdHJpbmc6IG51bGwgfSwgJ3RvU3RyaW5nJyk7XG5cdHZhciBoYXNQcm90b0VudW1CdWcgPSBpc0VudW1lcmFibGUuY2FsbChmdW5jdGlvbiAoKSB7fSwgJ3Byb3RvdHlwZScpO1xuXHR2YXIgZG9udEVudW1zID0gW1xuXHRcdCd0b1N0cmluZycsXG5cdFx0J3RvTG9jYWxlU3RyaW5nJyxcblx0XHQndmFsdWVPZicsXG5cdFx0J2hhc093blByb3BlcnR5Jyxcblx0XHQnaXNQcm90b3R5cGVPZicsXG5cdFx0J3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0XHQnY29uc3RydWN0b3InXG5cdF07XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0dmFyIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiBjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBvO1xuXHR9O1xuXHR2YXIgZXhjbHVkZWRLZXlzID0ge1xuXHRcdCRhcHBsaWNhdGlvbkNhY2hlOiB0cnVlLFxuXHRcdCRjb25zb2xlOiB0cnVlLFxuXHRcdCRleHRlcm5hbDogdHJ1ZSxcblx0XHQkZnJhbWU6IHRydWUsXG5cdFx0JGZyYW1lRWxlbWVudDogdHJ1ZSxcblx0XHQkZnJhbWVzOiB0cnVlLFxuXHRcdCRpbm5lckhlaWdodDogdHJ1ZSxcblx0XHQkaW5uZXJXaWR0aDogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuY2hhbmdlOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5lcnJvcjogdHJ1ZSxcblx0XHQkb3V0ZXJIZWlnaHQ6IHRydWUsXG5cdFx0JG91dGVyV2lkdGg6IHRydWUsXG5cdFx0JHBhZ2VYT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYWdlWU9mZnNldDogdHJ1ZSxcblx0XHQkcGFyZW50OiB0cnVlLFxuXHRcdCRzY3JvbGxMZWZ0OiB0cnVlLFxuXHRcdCRzY3JvbGxUb3A6IHRydWUsXG5cdFx0JHNjcm9sbFg6IHRydWUsXG5cdFx0JHNjcm9sbFk6IHRydWUsXG5cdFx0JHNlbGY6IHRydWUsXG5cdFx0JHdlYmtpdEluZGV4ZWREQjogdHJ1ZSxcblx0XHQkd2Via2l0U3RvcmFnZUluZm86IHRydWUsXG5cdFx0JHdpbmRvdzogdHJ1ZVxuXHR9O1xuXHR2YXIgaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAodmFyIGsgaW4gd2luZG93KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVkS2V5c1snJCcgKyBrXSAmJiBoYXMuY2FsbCh3aW5kb3csIGspICYmIHdpbmRvd1trXSAhPT0gbnVsbCAmJiB0eXBlb2Ygd2luZG93W2tdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSh3aW5kb3dba10pO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KCkpO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5ID0gZnVuY3Rpb24gKG8pIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcpIHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXG5cdGtleXNTaGltID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblx0XHR2YXIgaXNPYmplY3QgPSBvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdFx0dmFyIGlzQXJndW1lbnRzID0gaXNBcmdzKG9iamVjdCk7XG5cdFx0dmFyIGlzU3RyaW5nID0gaXNPYmplY3QgJiYgdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0XHR2YXIgdGhlS2V5cyA9IFtdO1xuXG5cdFx0aWYgKCFpc09iamVjdCAmJiAhaXNGdW5jdGlvbiAmJiAhaXNBcmd1bWVudHMpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBhIG5vbi1vYmplY3QnKTtcblx0XHR9XG5cblx0XHR2YXIgc2tpcFByb3RvID0gaGFzUHJvdG9FbnVtQnVnICYmIGlzRnVuY3Rpb247XG5cdFx0aWYgKGlzU3RyaW5nICYmIG9iamVjdC5sZW5ndGggPiAwICYmICFoYXMuY2FsbChvYmplY3QsIDApKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNBcmd1bWVudHMgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgb2JqZWN0Lmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaikpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuXHRcdFx0XHRpZiAoIShza2lwUHJvdG8gJiYgbmFtZSA9PT0gJ3Byb3RvdHlwZScpICYmIGhhcy5jYWxsKG9iamVjdCwgbmFtZSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKG5hbWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChoYXNEb250RW51bUJ1Zykge1xuXHRcdFx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneShvYmplY3QpO1xuXG5cdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGRvbnRFbnVtcy5sZW5ndGg7ICsraykge1xuXHRcdFx0XHRpZiAoIShza2lwQ29uc3RydWN0b3IgJiYgZG9udEVudW1zW2tdID09PSAnY29uc3RydWN0b3InKSAmJiBoYXMuY2FsbChvYmplY3QsIGRvbnRFbnVtc1trXSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goZG9udEVudW1zW2tdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhlS2V5cztcblx0fTtcbn1cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7XG5cbnZhciBvcmlnS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGtleXNTaGltID0gb3JpZ0tleXMgPyBmdW5jdGlvbiBrZXlzKG8pIHsgcmV0dXJuIG9yaWdLZXlzKG8pOyB9IDogcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXM7XG5cbmtleXNTaGltLnNoaW0gPSBmdW5jdGlvbiBzaGltT2JqZWN0S2V5cygpIHtcblx0aWYgKE9iamVjdC5rZXlzKSB7XG5cdFx0dmFyIGtleXNXb3Jrc1dpdGhBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU2FmYXJpIDUuMCBidWdcblx0XHRcdHZhciBhcmdzID0gT2JqZWN0LmtleXMoYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBhcmdzICYmIGFyZ3MubGVuZ3RoID09PSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdH0oMSwgMikpO1xuXHRcdGlmICgha2V5c1dvcmtzV2l0aEFyZ3VtZW50cykge1xuXHRcdFx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuXHRcdFx0XHRpZiAoaXNBcmdzKG9iamVjdCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKHNsaWNlLmNhbGwob2JqZWN0KSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhvYmplY3QpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmtleXMgPSBrZXlzU2hpbTtcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmtleXMgfHwga2V5c1NoaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdHZhciBzdHIgPSB0b1N0ci5jYWxsKHZhbHVlKTtcblx0dmFyIGlzQXJncyA9IHN0ciA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cdGlmICghaXNBcmdzKSB7XG5cdFx0aXNBcmdzID0gc3RyICE9PSAnW29iamVjdCBBcnJheV0nICYmXG5cdFx0XHR2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcicgJiZcblx0XHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0XHR0b1N0ci5jYWxsKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdH1cblx0cmV0dXJuIGlzQXJncztcbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBvYmpba10ubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgQUxCVU1fRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UsIEFsYnVtRGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsYnVtKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBhbGJ1bUhhc2g6IHN0cmluZ1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEFsYnVtRGF0YT4+IHtcbiAgY29uc3QgdXJsID0gYCR7QUxCVU1fRU5EUE9JTlR9LyR7YWxidW1IYXNofWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKGF3YWl0IGNsaWVudC5yZXF1ZXN0KHt1cmx9KSkgYXMgSW1ndXJBcGlSZXNwb25zZTxBbGJ1bURhdGE+O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9nZXRBbGJ1bSc7XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgZ2V0QXV0aG9yaXphdGlvbkhlYWRlciB9IGZyb20gJy4vZ2V0QXV0aG9yaXphdGlvbkhlYWRlcic7XG5pbXBvcnQge1xuICBkZWxldGVJbWFnZSxcbiAgZmF2b3JpdGVJbWFnZSxcbiAgZ2V0SW1hZ2UsXG4gIHVwbG9hZCxcbiAgdXBkYXRlSW1hZ2UsXG4gIFVwZGF0ZUltYWdlUGF5bG9hZCxcbn0gZnJvbSAnLi9pbWFnZSc7XG5pbXBvcnQge1xuICBHYWxsZXJ5T3B0aW9ucyxcbiAgZ2V0R2FsbGVyeSxcbiAgZ2V0U3VicmVkZGl0R2FsbGVyeSxcbiAgU3VicmVkZGl0R2FsbGVyeU9wdGlvbnMsXG4gIHNlYXJjaEdhbGxlcnksXG4gIFNlYXJjaEdhbGxlcnlPcHRpb25zLFxufSBmcm9tICcuL2dhbGxlcnknO1xuaW1wb3J0IHsgZ2V0QWxidW0gfSBmcm9tICcuL2FsYnVtJztcbmltcG9ydCB7IElNR1VSX0FQSV9QUkVGSVggfSBmcm9tICcuL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHtcbiAgQWxidW1EYXRhLFxuICBDcmVkZW50aWFscyxcbiAgR2FsbGVyeURhdGEsXG4gIEltYWdlRGF0YSxcbiAgSW1ndXJBcGlSZXNwb25zZSxcbiAgUGF5bG9hZCxcbn0gZnJvbSAnLi9jb21tb24vdHlwZXMnO1xuXG5jb25zdCBVU0VSQUdFTlQgPSAnaW1ndXIvbmV4dCAoaHR0cHM6Ly9naXRodWIuY29tL2thaW1hbGxlYS9ub2RlLWltZ3VyKSc7XG5cbmltcG9ydCBheGlvcywgeyBBeGlvc0luc3RhbmNlLCBBeGlvc1Jlc3BvbnNlLCBBeGlvc1JlcXVlc3RDb25maWcgfSBmcm9tICdheGlvcyc7XG5cbmV4cG9ydCBjbGFzcyBJbWd1ckNsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHByaXZhdGUgcGxhaW5GZXRjaGVyOiBBeGlvc0luc3RhbmNlO1xuICBwcml2YXRlIGZldGNoZXI6IEF4aW9zSW5zdGFuY2U7XG5cbiAgY29uc3RydWN0b3IocmVhZG9ubHkgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGxhaW5GZXRjaGVyID0gYXhpb3MuY3JlYXRlKHtcbiAgICAgIGJhc2VVUkw6IElNR1VSX0FQSV9QUkVGSVgsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdVc2VyLUFnZW50JzogVVNFUkFHRU5ULFxuICAgICAgfSxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgIH0pO1xuICAgIHRoaXMuZmV0Y2hlciA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgICBiYXNlVVJMOiBJTUdVUl9BUElfUFJFRklYLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnVXNlci1BZ2VudCc6IFVTRVJBR0VOVCxcbiAgICAgIH0sXG4gICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICB9KTtcbiAgICB0aGlzLmZldGNoZXIuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKFxuICAgICAgYXN5bmMgKGNvbmZpZzogQXhpb3NSZXF1ZXN0Q29uZmlnKSA9PiB7XG4gICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgPyBjb25maWcuaGVhZGVycyA6IHt9O1xuICAgICAgICBjb25maWcuaGVhZGVycy5hdXRob3JpemF0aW9uID0gYXdhaXQgZ2V0QXV0aG9yaXphdGlvbkhlYWRlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH0sXG4gICAgICAoZTogRXJyb3IpID0+IFByb21pc2UucmVqZWN0KGUpXG4gICAgKTtcbiAgfVxuXG4gIHBsYWluUmVxdWVzdChvcHRpb25zOiBBeGlvc1JlcXVlc3RDb25maWcpOiBQcm9taXNlPEF4aW9zUmVzcG9uc2U8dW5rbm93bj4+IHtcbiAgICByZXR1cm4gdGhpcy5wbGFpbkZldGNoZXIob3B0aW9ucyk7XG4gIH1cblxuICByZXF1ZXN0KG9wdGlvbnM6IEF4aW9zUmVxdWVzdENvbmZpZyA9IHt9KTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPHVua25vd24+PiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hlcihvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZUltYWdlKGltYWdlSGFzaDogc3RyaW5nKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+PiB7XG4gICAgcmV0dXJuIGRlbGV0ZUltYWdlKHRoaXMsIGltYWdlSGFzaCk7XG4gIH1cblxuICBmYXZvcml0ZUltYWdlKGltYWdlSGFzaDogc3RyaW5nKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPHN0cmluZz4+IHtcbiAgICByZXR1cm4gZmF2b3JpdGVJbWFnZSh0aGlzLCBpbWFnZUhhc2gpO1xuICB9XG5cbiAgZ2V0QWxidW0oYWxidW1IYXNoOiBzdHJpbmcpOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8QWxidW1EYXRhPj4ge1xuICAgIHJldHVybiBnZXRBbGJ1bSh0aGlzLCBhbGJ1bUhhc2gpO1xuICB9XG5cbiAgZ2V0R2FsbGVyeShvcHRpb25zOiBHYWxsZXJ5T3B0aW9ucyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgICByZXR1cm4gZ2V0R2FsbGVyeSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIGdldFN1YnJlZGRpdEdhbGxlcnkoXG4gICAgb3B0aW9uczogU3VicmVkZGl0R2FsbGVyeU9wdGlvbnNcbiAgKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPj4ge1xuICAgIHJldHVybiBnZXRTdWJyZWRkaXRHYWxsZXJ5KHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgc2VhcmNoR2FsbGVyeShcbiAgICBvcHRpb25zOiBTZWFyY2hHYWxsZXJ5T3B0aW9uc1xuICApOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gICAgcmV0dXJuIHNlYXJjaEdhbGxlcnkodGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICBnZXRJbWFnZShpbWFnZUhhc2g6IHN0cmluZyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+PiB7XG4gICAgcmV0dXJuIGdldEltYWdlKHRoaXMsIGltYWdlSGFzaCk7XG4gIH1cblxuICB1cGRhdGVJbWFnZShcbiAgICBwYXlsb2FkOiBVcGRhdGVJbWFnZVBheWxvYWQgfCBVcGRhdGVJbWFnZVBheWxvYWRbXVxuICApOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj4gfCBJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+W10+IHtcbiAgICByZXR1cm4gdXBkYXRlSW1hZ2UodGhpcywgcGF5bG9hZCk7XG4gIH1cblxuICB1cGxvYWQoXG4gICAgcGF5bG9hZDogc3RyaW5nIHwgc3RyaW5nW10gfCBQYXlsb2FkIHwgUGF5bG9hZFtdXG4gICk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+IHwgSW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+W10+IHtcbiAgICByZXR1cm4gdXBsb2FkKHRoaXMsIHBheWxvYWQpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgSU1HVVJfQVBJX1BSRUZJWCA9ICdodHRwczovL2FwaS5pbWd1ci5jb20nO1xuXG5leHBvcnQgY29uc3QgQVBJX1ZFUlNJT04gPSAnMyc7XG5cbmV4cG9ydCBjb25zdCBBVVRIT1JJWkVfRU5EUE9JTlQgPSAnb2F1dGgyL2F1dGhvcml6ZSc7XG5cbmV4cG9ydCBjb25zdCBBTEJVTV9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS9hbGJ1bWA7XG5cbmV4cG9ydCBjb25zdCBJTUFHRV9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS9pbWFnZWA7XG5cbmV4cG9ydCBjb25zdCBVUExPQURfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vdXBsb2FkYDtcblxuZXhwb3J0IGNvbnN0IEdBTExFUllfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vZ2FsbGVyeWA7XG5cbmV4cG9ydCBjb25zdCBTVUJSRURESVRfR0FMTEVSWV9FTkRQT0lOVCA9IGAke0FQSV9WRVJTSU9OfS9nYWxsZXJ5L3JgO1xuXG5leHBvcnQgY29uc3QgU0VBUkNIX0dBTExFUllfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vZ2FsbGVyeS9zZWFyY2hgO1xuIiwiaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tIFwic3RyZWFtXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjZXNzVG9rZW4ge1xuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENsaWVudElkIHtcbiAgY2xpZW50SWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2dpbiBleHRlbmRzIENsaWVudElkIHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlZGVudGlhbHMgPSBBY2Nlc3NUb2tlbiB8IENsaWVudElkIHwgTG9naW47XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FjY2Vzc1Rva2VuKGFyZzogdW5rbm93bik6IGFyZyBpcyBBY2Nlc3NUb2tlbiB7XG4gIHJldHVybiAoYXJnIGFzIEFjY2Vzc1Rva2VuKS5hY2Nlc3NUb2tlbiAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDbGllbnRJZChhcmc6IHVua25vd24pOiBhcmcgaXMgQ2xpZW50SWQge1xuICByZXR1cm4gKGFyZyBhcyBDbGllbnRJZCkuY2xpZW50SWQgIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9naW4oYXJnOiB1bmtub3duKTogYXJnIGlzIExvZ2luIHtcbiAgcmV0dXJuIChcbiAgICAoYXJnIGFzIExvZ2luKS5jbGllbnRJZCAhPT0gdW5kZWZpbmVkICYmXG4gICAgKGFyZyBhcyBMb2dpbikudXNlcm5hbWUgIT09IHVuZGVmaW5lZCAmJlxuICAgIChhcmcgYXMgTG9naW4pLnBhc3N3b3JkICE9PSB1bmRlZmluZWRcbiAgKTtcbn1cblxuaW50ZXJmYWNlIENvbW1vbkRhdGEge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nIHwgbnVsbDtcbiAgZGVzY3JpcHRpb246IHN0cmluZyB8IG51bGw7XG4gIGRhdGV0aW1lOiBudW1iZXI7XG4gIGxpbms6IHN0cmluZztcblxuICBhZF9jb25maWc/OiB7XG4gICAgc2FmZUZsYWdzOiBzdHJpbmdbXTtcbiAgICBoaWdoUmlza0ZsYWdzOiBzdHJpbmdbXTtcbiAgICB1bnNhZmVGbGFnczogc3RyaW5nW107XG4gICAgd2FsbFVuc2FmZUZsYWdzOiBzdHJpbmdbXTtcbiAgICBzaG93c0FkczogYm9vbGVhbjtcbiAgfTtcbiAgYWRfdHlwZTogbnVtYmVyO1xuICBhZF91cmw6IHN0cmluZztcblxuICBhY2NvdW50X3VybDogc3RyaW5nIHwgbnVsbDtcbiAgYWNjb3VudF9pZDogc3RyaW5nIHwgbnVsbDtcbiAgZmF2b3JpdGU6IGJvb2xlYW47XG4gIGlzX2FkOiBib29sZWFuO1xuICBpc19hbGJ1bTogYm9vbGVhbjtcbiAgaW5fZ2FsbGVyeTogYm9vbGVhbjtcbiAgaW5fbW9zdF92aXJhbDogYm9vbGVhbjtcbiAgbnNmdzogYm9vbGVhbiB8IG51bGw7XG4gIHNlY3Rpb246IHN0cmluZyB8IG51bGw7XG4gIHRhZ3M6IEFycmF5PHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGlzcGxheV9uYW1lOiBzdHJpbmc7XG4gICAgZm9sbG93ZXJzOiBudW1iZXI7XG4gICAgdG90YWxfaXRlbXM6IG51bWJlcjtcbiAgICBmb2xsb3dpbmc6IGJvb2xlYW47XG4gICAgaXNfd2hpdGVsaXN0ZWQ6IGJvb2xlYW47XG4gICAgYmFja2dyb3VuZF9oYXNoOiBzdHJpbmc7XG4gICAgdGh1bWJuYWlsX2hhc2g6IHN0cmluZyB8IG51bGw7XG4gICAgYWNjZW50OiBzdHJpbmc7XG4gICAgYmFja2dyb3VuZF9pc19hbmltYXRlZDogYm9vbGVhbjtcbiAgICB0aHVtYm5haWxfaXNfYW5pbWF0ZWQ6IGJvb2xlYW47XG4gICAgaXNfcHJvbW90ZWQ6IGJvb2xlYW47XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBsb2dvX2hhc2g6IHN0cmluZyB8IG51bGw7XG4gICAgbG9nb19kZXN0aW5hdGlvbl91cmw6IHN0cmluZyB8IG51bGw7XG4gICAgZGVzY3JpcHRpb25fYW5ub3RhdGlvbnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9PjtcbiAgdG9waWM6IHN0cmluZyB8IG51bGw7XG4gIHRvcGljX2lkOiBzdHJpbmcgfCBudWxsO1xuICB2b3RlOiBudWxsO1xuXG4gIGNvbW1lbnRfY291bnQ6IG51bWJlciB8IG51bGw7XG4gIGZhdm9yaXRlX2NvdW50OiBudW1iZXIgfCBudWxsO1xuICB1cHM6IG51bWJlciB8IG51bGw7XG4gIGRvd25zOiBudW1iZXIgfCBudWxsO1xuICBzY29yZTogbnVtYmVyIHwgbnVsbDtcbiAgcG9pbnRzOiBudW1iZXIgfCBudWxsO1xuICB2aWV3czogbnVtYmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBJbWFnZURhdGEgZXh0ZW5kcyBDb21tb25EYXRhIHtcbiAgdHlwZTogc3RyaW5nO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xuICBkZWxldGVoYXNoPzogc3RyaW5nO1xuICBiYW5kd2lkdGg6IG51bWJlcjtcbiAgYW5pbWF0ZWQ6IGJvb2xlYW47XG4gIGhhc19zb3VuZDogYm9vbGVhbjtcbiAgZWRpdGVkOiBzdHJpbmc7XG4gIG1wNF9zaXplPzogbnVtYmVyO1xuICBtcDQ/OiBzdHJpbmc7XG4gIGdpZnY/OiBzdHJpbmc7XG4gIGhscz86IHN0cmluZztcbiAgbG9vcGluZz86IGJvb2xlYW47XG4gIHByb2Nlc3Npbmc/OiB7XG4gICAgc3RhdHVzOiAncGVuZGluZycgfCAnY29tcGxldGVkJztcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbGJ1bURhdGEgZXh0ZW5kcyBDb21tb25EYXRhIHtcbiAgY292ZXI6IHN0cmluZyB8IG51bGw7XG4gIGNvdmVyX3dpZHRoOiBudW1iZXIgfCBudWxsO1xuICBjb3Zlcl9oZWlnaHQ6IG51bWJlciB8IG51bGw7XG4gIGxheW91dDogc3RyaW5nO1xuICBwcml2YWN5OiBzdHJpbmc7XG4gIGluY2x1ZGVfYWxidW1fYWRzOiBib29sZWFuO1xuICBpbWFnZXM6IEltYWdlRGF0YVtdO1xuICBpbWFnZXNfY291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgR2FsbGVyeURhdGEgPSBBcnJheTxJbWFnZURhdGEgfCBBbGJ1bURhdGE+O1xuZXhwb3J0IGludGVyZmFjZSBQYXlsb2FkIHtcbiAgaW1hZ2U/OiBzdHJpbmc7XG4gIGJhc2U2ND86IHN0cmluZztcbiAgdHlwZT86ICdzdHJlYW0nIHwgJ3VybCcgfCAnYmFzZTY0JztcbiAgbmFtZT86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBhbGJ1bT86IHN0cmluZztcbiAgc3RyZWFtPzogUmVhZGFibGU7XG4gIGRpc2FibGVfYXVkaW8/OiAnMScgfCAnMCc7XG59XG5leHBvcnQgaW50ZXJmYWNlIEltZ3VyQXBpUmVzcG9uc2U8XG4gIFQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gfCBzdHJpbmcgfCBib29sZWFuIHwgSW1hZ2VEYXRhIHwgR2FsbGVyeURhdGEgfCBBbGJ1bURhdGFcbj4ge1xuICBkYXRhOiBUO1xuICBzdGF0dXM6IG51bWJlcjtcbiAgc3VjY2VzczogYm9vbGVhbjtcbn0iLCJpbXBvcnQgeyBBeGlvc1Jlc3BvbnNlIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBQYXlsb2FkIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Jhc2U2NChwYXlsb2FkOiBzdHJpbmcgfCBQYXlsb2FkKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHBheWxvYWQuYmFzZTY0ICE9PSAndW5kZWZpbmVkJyAmJiBwYXlsb2FkLnR5cGUgPT09ICdiYXNlNjQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJbWFnZVVybChwYXlsb2FkOiBzdHJpbmcgfCBQYXlsb2FkKTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2YgcGF5bG9hZC5pbWFnZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGF5bG9hZC50eXBlID09PSAndXJsJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyZWFtKHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2YgcGF5bG9hZC5zdHJlYW0gIT09ICd1bmRlZmluZWQnO1xufVxuXG4vLyBUT0RPOiBSZWZhY3RvciB0aGlzIHRvIGJlIGEgdW5pcXVlIG5hbWUgb2Ygc29tZSBraW5kIChhIGhhc2g/KVxuZXhwb3J0IGZ1bmN0aW9uIGdldFNvdXJjZShwYXlsb2FkOiBzdHJpbmcgfCBQYXlsb2FkKTogc3RyaW5nIHwgUmVhZGFibGUge1xuICBpZiAodHlwZW9mIHBheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBheWxvYWQ7XG4gIH1cblxuICBpZiAoaXNCYXNlNjQocGF5bG9hZCkpIHtcbiAgICByZXR1cm4gXCJwYXlsb2FkLmJhc2U2NFwiIGFzIHN0cmluZztcbiAgfSBlbHNlIGlmIChpc1N0cmVhbShwYXlsb2FkKSkge1xuICAgIHJldHVybiBcInBheWxvYWQuc3RyZWFtXCIgYXMgc3RyaW5nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwYXlsb2FkLmltYWdlIGFzIHN0cmluZztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRm9ybShwYXlsb2FkOiBzdHJpbmcgfCBQYXlsb2FkKTogRm9ybURhdGEge1xuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgIGZvcm0uYXBwZW5kKCdpbWFnZScsIHBheWxvYWQpO1xuICAgIHJldHVybiBmb3JtO1xuICB9XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocGF5bG9hZCkpIHtcbiAgICBjb25zdCBzdXBwb3J0ZWRVcGxvYWRPYmplY3RUeXBlcyA9IFsnYmFzZTY0JywgJ3N0cmVhbSddXG4gICAgaWYgKHN1cHBvcnRlZFVwbG9hZE9iamVjdFR5cGVzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgIGlmIChzdXBwb3J0ZWRVcGxvYWRPYmplY3RUeXBlcy5pbmRleE9mKHBheWxvYWQudHlwZSBhcyBzdHJpbmcpICE9PSAtMSkge1xuICAgICAgICBmb3JtLmFwcGVuZChrZXksIHBheWxvYWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZvcm07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICByZXNwb25zZTogQXhpb3NSZXNwb25zZVxuKTogSW1ndXJBcGlSZXNwb25zZSB7XG4gIGlmICh0eXBlb2YgcmVzcG9uc2UuZGF0YT8uc3RhdHVzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcmVzcG9uc2UuZGF0YT8uc3VjY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhOiByZXNwb25zZS5kYXRhLFxuICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIC8vIFRPRE86IGRldGVybWluZSB0aGUgc3VjY2VzcyBvZiB0aGUgY2FsbD9cbiAgICBzdWNjZXNzOiB0cnVlLFxuICB9XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBHQUxMRVJZX0VORFBPSU5ULCBJTUdVUl9BUElfUFJFRklYIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBHYWxsZXJ5RGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIENvbW1vblNlY3Rpb25Qcm9wcyA9IHtcbiAgc29ydD86ICd2aXJhbCcgfCAndG9wJyB8ICd0aW1lJztcbiAgcGFnZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIEhvdFNlY3Rpb24gPSBDb21tb25TZWN0aW9uUHJvcHMgJiB7XG4gIHNlY3Rpb246ICdob3QnO1xufTtcblxuZXhwb3J0IHR5cGUgVG9wU2VjdGlvbiA9IENvbW1vblNlY3Rpb25Qcm9wcyAmIHtcbiAgc2VjdGlvbjogJ3RvcCc7XG4gIHdpbmRvdz86ICdkYXknIHwgJ3dlZWsnIHwgJ21vbnRoJyB8ICd5ZWFyJyB8ICdhbGwnO1xufTtcblxuZXhwb3J0IHR5cGUgVXNlclNlY3Rpb24gPSBPbWl0PENvbW1vblNlY3Rpb25Qcm9wcywgJ3NvcnQnPiAmIHtcbiAgc2VjdGlvbjogJ3VzZXInO1xuICBzb3J0PzogJ3ZpcmFsJyB8ICd0b3AnIHwgJ3RpbWUnIHwgJ3Jpc2luZyc7XG59O1xuXG5leHBvcnQgdHlwZSBTZWN0aW9uT3B0aW9ucyA9IEhvdFNlY3Rpb24gfCBUb3BTZWN0aW9uIHwgVXNlclNlY3Rpb247XG5cbmV4cG9ydCB0eXBlIFByZXNlbnRhdGlvbk9wdGlvbnMgPSB7XG4gIHNob3dWaXJhbD86IGJvb2xlYW47XG4gIG1hdHVyZT86IGJvb2xlYW47XG4gIGFsYnVtX3ByZXZpZXdzPzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIEdhbGxlcnlPcHRpb25zID0gU2VjdGlvbk9wdGlvbnMgJiBQcmVzZW50YXRpb25PcHRpb25zO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogR2FsbGVyeU9wdGlvbnMgPSB7XG4gIHNlY3Rpb246ICdob3QnLFxuICBzb3J0OiAndmlyYWwnLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdEdhbGxlcnlVcmwob3B0aW9uczogR2FsbGVyeU9wdGlvbnMpOiBVUkwge1xuICBjb25zdCBtZXJnZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gIGxldCB1cmkgPSBgJHttZXJnZWRPcHRpb25zLnNlY3Rpb259YDtcblxuICBpZiAobWVyZ2VkT3B0aW9ucy5zb3J0KSB7XG4gICAgdXJpICs9IGAvJHttZXJnZWRPcHRpb25zLnNvcnR9YDtcbiAgfVxuXG4gIGlmIChtZXJnZWRPcHRpb25zLnNlY3Rpb24gPT09ICd0b3AnICYmIG1lcmdlZE9wdGlvbnMud2luZG93KSB7XG4gICAgdXJpICs9IGAvJHttZXJnZWRPcHRpb25zLndpbmRvd31gO1xuICB9XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMucGFnZSkge1xuICAgIHVyaSArPSBgLyR7bWVyZ2VkT3B0aW9ucy5wYWdlfWA7XG4gIH1cblxuICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke0lNR1VSX0FQSV9QUkVGSVh9LyR7R0FMTEVSWV9FTkRQT0lOVH0vJHt1cml9YCk7XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMuc2hvd1ZpcmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnc2hvd1ZpcmFsJywgbWVyZ2VkT3B0aW9ucy5zaG93VmlyYWwudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAobWVyZ2VkT3B0aW9ucy5tYXR1cmUgIT09IHVuZGVmaW5lZCkge1xuICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdtYXR1cmUnLCBtZXJnZWRPcHRpb25zLm1hdHVyZS50b1N0cmluZygpKTtcbiAgfVxuXG4gIGlmIChtZXJnZWRPcHRpb25zLmFsYnVtX3ByZXZpZXdzICE9PSB1bmRlZmluZWQpIHtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChcbiAgICAgICdhbGJ1bV9wcmV2aWV3cycsXG4gICAgICBtZXJnZWRPcHRpb25zLmFsYnVtX3ByZXZpZXdzLnRvU3RyaW5nKClcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEdhbGxlcnkoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIG9wdGlvbnM6IEdhbGxlcnlPcHRpb25zID0gZGVmYXVsdE9wdGlvbnNcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgY29uc3QgeyBwYXRobmFtZSB9ID0gY29uc3RydWN0R2FsbGVyeVVybChvcHRpb25zKTtcbiAgLy8gc2luY2Ugd2UncmUgdXNpbmcgcHJlZml4VXJsIHdpdGggZ290LCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgc3RhcnRpbmcgc2xhc2ggb3IgaXQnbGwgdGhyb3dcbiAgY29uc3QgZmluYWxQYXRobmFtZSA9IHBhdGhuYW1lLnNsaWNlKDEpO1xuXG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsOiBmaW5hbFBhdGhuYW1lIH0pKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPjtcbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7XG4gIFNVQlJFRERJVF9HQUxMRVJZX0VORFBPSU5ULFxuICBJTUdVUl9BUElfUFJFRklYLFxufSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UsIEdhbGxlcnlEYXRhIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuZXhwb3J0IHR5cGUgVGltZU9wdGlvbnMgPSB7XG4gIHN1YnJlZGRpdDogc3RyaW5nO1xuICBzb3J0PzogJ3RpbWUnO1xuICBwYWdlPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgVG9wT3B0aW9ucyA9IE9taXQ8VGltZU9wdGlvbnMsICdzb3J0Jz4gJiB7XG4gIHNvcnQ/OiAndG9wJztcbiAgd2luZG93PzogJ2RheScgfCAnd2VlaycgfCAnbW9udGgnIHwgJ3llYXInIHwgJ2FsbCc7XG59O1xuXG5leHBvcnQgdHlwZSBTdWJyZWRkaXRHYWxsZXJ5T3B0aW9ucyA9IFRpbWVPcHRpb25zIHwgVG9wT3B0aW9ucztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdFN1YnJlZGRpdEdhbGxlcnlVcmwoXG4gIG9wdGlvbnM6IFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zXG4pOiBVUkwge1xuICBsZXQgdXJpID0gYCR7b3B0aW9ucy5zdWJyZWRkaXR9YDtcblxuICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLnNvcnR9YDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnNvcnQgPT09ICd0b3AnICYmIG9wdGlvbnMud2luZG93KSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLndpbmRvd31gO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucGFnZSkge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy5wYWdlfWA7XG4gIH1cblxuICBjb25zdCB1cmwgPSBuZXcgVVJMKFxuICAgIGAke0lNR1VSX0FQSV9QUkVGSVh9LyR7U1VCUkVERElUX0dBTExFUllfRU5EUE9JTlR9LyR7dXJpfWBcbiAgKTtcblxuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3VicmVkZGl0R2FsbGVyeShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgb3B0aW9uczogU3VicmVkZGl0R2FsbGVyeU9wdGlvbnNcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgY29uc3QgeyBwYXRobmFtZSB9ID0gY29uc3RydWN0U3VicmVkZGl0R2FsbGVyeVVybChvcHRpb25zKTtcbiAgLy8gc2luY2Ugd2UncmUgdXNpbmcgcHJlZml4VXJsIHdpdGggZ290LCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgc3RhcnRpbmcgc2xhc2ggb3IgaXQnbGwgdGhyb3dcbiAgY29uc3QgZmluYWxQYXRobmFtZSA9IHBhdGhuYW1lLnNsaWNlKDEpO1xuXG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsOiBmaW5hbFBhdGhuYW1lIH0pKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZ2V0R2FsbGVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2dldFN1YnJlZGRpdEdhbGxlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9zZWFyY2hHYWxsZXJ5JztcbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IFNFQVJDSF9HQUxMRVJZX0VORFBPSU5ULCBJTUdVUl9BUElfUFJFRklYIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBHYWxsZXJ5RGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XG5cbmV4cG9ydCB0eXBlIFNlYXJjaE9wdGlvbnMgPSB7XG4gIHE/OiBzdHJpbmc7XG4gIHF1ZXJ5Pzogc3RyaW5nO1xuICBzb3J0PzogJ3RpbWUnIHwgJ3ZpcmFsJztcbiAgcGFnZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIFRvcFNlYXJjaE9wdGlvbnMgPSBPbWl0PFNlYXJjaE9wdGlvbnMsICdzb3J0Jz4gJiB7XG4gIHNvcnQ/OiAndG9wJztcbiAgd2luZG93PzogJ2RheScgfCAnd2VlaycgfCAnbW9udGgnIHwgJ3llYXInIHwgJ2FsbCc7XG59O1xuXG5leHBvcnQgdHlwZSBBZHZhbmNlZFNlYXJjaFF1ZXJ5UGFyYW1ldGVycyA9IHtcbiAgcV9hbGw/OiBzdHJpbmc7XG4gIHFfYW55Pzogc3RyaW5nO1xuICBxX2V4YWN0bHk/OiBzdHJpbmc7XG4gIHFfbm90Pzogc3RyaW5nO1xuICBxX3R5cGU/OiAnanBnJyB8ICdwbmcnIHwgJ2dpZicgfCAnYW5pZ2lmJyB8ICdhbGJ1bSc7XG4gIHFfc2l6ZV9weD86ICdzbWFsbCcgfCAnbWVkJyB8ICdiaWcnIHwgJ2xyZycgfCAnaHVnZSc7XG59O1xuXG5jb25zdCBhZHZhbmNlZFBhcmFtZXRlcnM6IEFycmF5PGtleW9mIEFkdmFuY2VkU2VhcmNoUXVlcnlQYXJhbWV0ZXJzPiA9IFtcbiAgJ3FfYWxsJyxcbiAgJ3FfYW55JyxcbiAgJ3FfZXhhY3RseScsXG4gICdxX25vdCcsXG4gICdxX3R5cGUnLFxuICAncV9zaXplX3B4Jyxcbl07XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEdhbGxlcnlPcHRpb25zID0gKFNlYXJjaE9wdGlvbnMgfCBUb3BTZWFyY2hPcHRpb25zKSAmXG4gIEFkdmFuY2VkU2VhcmNoUXVlcnlQYXJhbWV0ZXJzO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0U2VhcmNoR2FsbGVyeVVybChvcHRpb25zOiBTZWFyY2hHYWxsZXJ5T3B0aW9ucyk6IFVSTCB7XG4gIGxldCB1cmkgPSAnJztcblxuICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLnNvcnR9YDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnNvcnQgPT09ICd0b3AnICYmIG9wdGlvbnMud2luZG93KSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLndpbmRvd31gO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucGFnZSkge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy5wYWdlfWA7XG4gIH1cblxuICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke0lNR1VSX0FQSV9QUkVGSVh9LyR7U0VBUkNIX0dBTExFUllfRU5EUE9JTlR9JHt1cml9YCk7XG5cbiAgYWR2YW5jZWRQYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgaWYgKG9wdGlvbnNbcGFyYW1dPy5sZW5ndGgpIHtcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKHBhcmFtLCBvcHRpb25zW3BhcmFtXSBhcyBzdHJpbmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCF1cmwuc2VhcmNoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBvcHRpb25zLnEgfHwgb3B0aW9ucy5xdWVyeTtcbiAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHF1ZXJ5IHdhcyBwcm92aWRlZCcpO1xuICAgIH1cblxuICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdxJywgcXVlcnkpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEdhbGxlcnkoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIG9wdGlvbnM6IFNlYXJjaEdhbGxlcnlPcHRpb25zXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IGNvbnN0cnVjdFNlYXJjaEdhbGxlcnlVcmwob3B0aW9ucyk7XG4gIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIHByZWZpeFVybCB3aXRoIGdvdCwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHN0YXJ0aW5nIHNsYXNoIG9yIGl0J2xsIHRocm93XG4gIGNvbnN0IGZpbmFsUGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgxKTtcblxuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybDogZmluYWxQYXRobmFtZSB9KSkgYXMgSW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT47XG59XG4iLCJpbXBvcnQge1xuICBBY2Nlc3NUb2tlbixcbiAgaXNBY2Nlc3NUb2tlbixcbiAgaXNDbGllbnRJZCxcbiAgaXNMb2dpbixcbn0gZnJvbSAnLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBJTUdVUl9BUElfUFJFRklYLCBBVVRIT1JJWkVfRU5EUE9JTlQgfSBmcm9tICcuL2NvbW1vbi9lbmRwb2ludHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihcbiAgY2xpZW50OiBJbWd1ckNsaWVudFxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgaWYgKGlzQWNjZXNzVG9rZW4oY2xpZW50LmNyZWRlbnRpYWxzKSkge1xuICAgIHJldHVybiBgQmVhcmVyICR7Y2xpZW50LmNyZWRlbnRpYWxzLmFjY2Vzc1Rva2VufWA7XG4gIH1cblxuICBpZiAoaXNDbGllbnRJZChjbGllbnQuY3JlZGVudGlhbHMpICYmICFpc0xvZ2luKGNsaWVudC5jcmVkZW50aWFscykpIHtcbiAgICByZXR1cm4gYENsaWVudC1JRCAke2NsaWVudC5jcmVkZW50aWFscy5jbGllbnRJZH1gO1xuICB9XG5cbiAgY29uc3QgeyBjbGllbnRJZCwgdXNlcm5hbWUsIHBhc3N3b3JkIH0gPSBjbGllbnQuY3JlZGVudGlhbHM7XG5cbiAgY29uc3Qgb3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7XG4gICAgdXJsOiBBVVRIT1JJWkVfRU5EUE9JTlQsXG4gICAgYmFzZVVSTDogSU1HVVJfQVBJX1BSRUZJWCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICByZXNwb25zZV90eXBlOiAndG9rZW4nLFxuICAgIH0sXG4gIH07XG5cbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBsYWluUmVxdWVzdChvcHRpb25zKTtcblxuICBjb25zdCBjb29raWVzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ10pXG4gICAgPyByZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ11bMF1cbiAgICA6IHJlc3BvbnNlLmhlYWRlcnNbJ3NldC1jb29raWUnXTtcblxuICBpZiAoIWNvb2tpZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvb2tpZXMgd2VyZSBzZXQgZHVyaW5nIGF1dGhvcml6YXRpb24nKTtcbiAgfVxuXG4gIGNvbnN0IG1hdGNoZXMgPSBjb29raWVzLm1hdGNoKCcoXnw7KVtzXSphdXRob3JpemVfdG9rZW49KFteO10qKScpO1xuXG4gIGlmICghbWF0Y2hlcyB8fCBtYXRjaGVzLmxlbmd0aCA8IDMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmaW5kIGF1dGhvcml6ZV90b2tlbiBjb29raWUnKTtcbiAgfVxuXG4gIGNvbnN0IGF1dGhvcml6ZVRva2VuID0gbWF0Y2hlc1syXTtcblxuICBvcHRpb25zLm1ldGhvZCA9ICdQT1NUJztcbiAgb3B0aW9ucy5kYXRhID0ge1xuICAgIHVzZXJuYW1lLFxuICAgIHBhc3N3b3JkLFxuICAgIGFsbG93OiBhdXRob3JpemVUb2tlbixcbiAgfTtcblxuICBvcHRpb25zLmZvbGxvd1JlZGlyZWN0ID0gZmFsc2U7XG4gIG9wdGlvbnMuaGVhZGVycyA9IHtcbiAgICBjb29raWU6IGBhdXRob3JpemVfdG9rZW49JHthdXRob3JpemVUb2tlbn1gLFxuICB9O1xuXG4gIHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBsYWluUmVxdWVzdChvcHRpb25zKTtcbiAgY29uc3QgbG9jYXRpb24gPSByZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uO1xuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGFyc2UgbG9jYXRpb24nKTtcbiAgfVxuXG4gIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShcbiAgICAne1wiJyArXG4gICAgICBkZWNvZGVVUkkobG9jYXRpb24uc2xpY2UobG9jYXRpb24uaW5kZXhPZignIycpICsgMSkpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJylcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgJ1wiLFwiJylcbiAgICAgICAgLnJlcGxhY2UoLz0vZywgJ1wiOlwiJykgK1xuICAgICAgJ1wifSdcbiAgKTtcblxuICBjb25zdCBhY2Nlc3NUb2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgKChjbGllbnQuY3JlZGVudGlhbHMgYXMgdW5rbm93bikgYXMgQWNjZXNzVG9rZW4pLmFjY2Vzc1Rva2VuID0gYWNjZXNzVG9rZW47XG4gIFxuICByZXR1cm4gYEJlYXJlciAke2FjY2Vzc1Rva2VufWA7XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBJTUFHRV9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUltYWdlKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBpbWFnZUhhc2g6IHN0cmluZ1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+PiB7XG4gIGNvbnN0IHVybCA9IGAke0lNQUdFX0VORFBPSU5UfS8ke2ltYWdlSGFzaH1gO1xuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybCwgbWV0aG9kOiAnREVMRVRFJyB9KSkgYXMgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPjtcbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IElNQUdFX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmF2b3JpdGVJbWFnZShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgaW1hZ2VIYXNoOiBzdHJpbmdcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTwnZmF2b3JpdGVkJz4+IHtcbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7aW1hZ2VIYXNofS9mYXZvcml0ZWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsLCBtZXRob2Q6ICdQT1NUJyB9KSkgYXMgSW1ndXJBcGlSZXNwb25zZTwnZmF2b3JpdGVkJz47XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBJTUFHRV9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgSW1hZ2VEYXRhIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SW1hZ2UoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIGltYWdlSGFzaDogc3RyaW5nXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPj4ge1xuICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtpbWFnZUhhc2h9YDtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmwgfSkpIGFzIEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9kZWxldGVJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2Zhdm9yaXRlSW1hZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9nZXRJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL3VwZGF0ZUltYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vdXBsb2FkJztcbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IElNQUdFX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBjcmVhdGVGb3JtLCBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFBheWxvYWQsIEltZ3VyQXBpUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUltYWdlUGF5bG9hZFxuICBleHRlbmRzIFBpY2s8UGF5bG9hZCwgJ3RpdGxlJyB8ICdkZXNjcmlwdGlvbic+IHtcbiAgaW1hZ2VIYXNoOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRVcGRhdGVQYXlsb2FkKHA6IFVwZGF0ZUltYWdlUGF5bG9hZCkge1xuICByZXR1cm4gdHlwZW9mIHAudGl0bGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwLmRlc2NyaXB0aW9uID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUltYWdlKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBwYXlsb2FkOiBVcGRhdGVJbWFnZVBheWxvYWQgfCBVcGRhdGVJbWFnZVBheWxvYWRbXVxuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+IHwgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPltdPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBwYXlsb2FkLm1hcCgocDogVXBkYXRlSW1hZ2VQYXlsb2FkKSA9PiB7XG4gICAgICBpZiAoIWlzVmFsaWRVcGRhdGVQYXlsb2FkKHApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVXBkYXRlIHJlcXVpcmVzIGEgdGl0bGUgYW5kL29yIGRlc2NyaXB0aW9uJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybCA9IGAke0lNQUdFX0VORFBPSU5UfS8ke3AuaW1hZ2VIYXNofWA7XG4gICAgICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybShwKTtcbiAgICAgIC8qIGVzbGludCBuby1hc3luYy1wcm9taXNlLWV4ZWN1dG9yOiAwICovXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiBmb3JtLFxuICAgICAgICAgICAgLy8gcmVzb2x2ZUJvZHlPbmx5OiB0cnVlLFxuICAgICAgICAgIH0pKSBhcyBJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+KVxuICAgICAgICB9KSBhcyBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj4+O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIGlmICghaXNWYWxpZFVwZGF0ZVBheWxvYWQocGF5bG9hZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwZGF0ZSByZXF1aXJlcyBhIHRpdGxlIGFuZC9vciBkZXNjcmlwdGlvbicpO1xuICB9XG5cbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7cGF5bG9hZC5pbWFnZUhhc2h9YDtcbiAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0ocGF5bG9hZCk7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKGF3YWl0IGNsaWVudC5yZXF1ZXN0KHtcbiAgICB1cmwsXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZGF0YTogZm9ybSxcbiAgICAvLyByZXNvbHZlQm9keU9ubHk6IHRydWUsXG4gIH0pKSBhcyBJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+XG59XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQge1xuICBjcmVhdGVGb3JtLFxuICBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlLFxuICAvLyBnZXRTb3VyY2UsXG59IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5pbXBvcnQgeyBQYXlsb2FkLCBJbWd1ckFwaVJlc3BvbnNlLCBJbWFnZURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgVVBMT0FEX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGxvYWQoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIHBheWxvYWQ6IHN0cmluZyB8IHN0cmluZ1tdIHwgUGF5bG9hZCB8IFBheWxvYWRbXVxuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4gfCBJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT5bXT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSkge1xuICAgIGNvbnN0IHByb21pc2VzID0gcGF5bG9hZC5tYXAoKHA6IHN0cmluZyB8IFBheWxvYWQpID0+IHtcbiAgICAgIGNvbnN0IGZvcm0gPSBjcmVhdGVGb3JtKHApO1xuXG4gICAgICAvKiBlc2xpbnQgbm8tYXN5bmMtcHJvbWlzZS1leGVjdXRvcjogMCAqL1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHJlc29sdmUoZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICAgICAgICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiBVUExPQURfRU5EUE9JTlQsXG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBkYXRhOiBmb3JtLFxuICAgICAgICAgICAgICBvblVwbG9hZFByb2dyZXNzOiAocHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgcHJvZ3Jlc3NFdmVudCB9KTtcbiAgICAgICAgICAgICAgICBjbGllbnQuZW1pdCgndXBsb2FkUHJvZ3Jlc3MnLCB7IC4uLnByb2dyZXNzRXZlbnQgfSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICkgYXMgSW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+KTtcbiAgICAgIH0pIGFzIFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+PjtcbiAgICB9KTtcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0ocGF5bG9hZCk7XG4gIC8vIGNvbnN0IGlkID0gRGF0ZS5ub3cudG9TdHJpbmcoKTtcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGNsaWVudC5yZXF1ZXN0KHtcbiAgICB1cmw6IFVQTE9BRF9FTkRQT0lOVCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBkYXRhOiBmb3JtLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IChwcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IHByb2dyZXNzRXZlbnQgfSk7XG4gICAgICBjbGllbnQuZW1pdCgndXBsb2FkUHJvZ3Jlc3MnLCB7IC4uLnByb2dyZXNzRXZlbnQgfSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKHJlcXVlc3QpIGFzIEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPlxuICApO1xufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZSB2MS4zLjIgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJlxuXHRcdCFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHQhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKFxuXHRcdGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLnNlbGYgPT09IGZyZWVHbG9iYWxcblx0KSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXlxceDIwLVxceDdFXS8sIC8vIHVucHJpbnRhYmxlIEFTQ0lJIGNoYXJzICsgbm9uLUFTQ0lJIGNoYXJzXG5cdHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2csIC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuXHQvKiogRXJyb3IgbWVzc2FnZXMgKi9cblx0ZXJyb3JzID0ge1xuXHRcdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdFx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0XHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xuXHR9LFxuXG5cdC8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cblx0YmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluLFxuXHRmbG9vciA9IE1hdGguZmxvb3IsXG5cdHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUsXG5cblx0LyoqIFRlbXBvcmFyeSB2YXJpYWJsZSAqL1xuXHRrZXk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cblx0ICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZXJyb3IodHlwZSkge1xuXHRcdHRocm93IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG5cdCAqIGl0ZW0uXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdHJlc3VsdFtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG5cdCAqIGFkZHJlc3Nlcy5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5XG5cdCAqIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcblx0ICogZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHRcdHZhciBwYXJ0cyA9IHN0cmluZy5zcGxpdCgnQCcpO1xuXHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdFx0Ly8gSW4gZW1haWwgYWRkcmVzc2VzLCBvbmx5IHRoZSBkb21haW4gbmFtZSBzaG91bGQgYmUgcHVueWNvZGVkLiBMZWF2ZVxuXHRcdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdFx0c3RyaW5nID0gcGFydHNbMV07XG5cdFx0fVxuXHRcdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleFNlcGFyYXRvcnMsICdcXHgyRScpO1xuXHRcdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0XHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdFx0cmV0dXJuIHJlc3VsdCArIGVuY29kZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG5cdCAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG5cdCAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuXHQgKiBtYXRjaGluZyBVVEYtMTYuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuXHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZGVjb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBjb3VudGVyID0gMCxcblx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHQgICAgdmFsdWUsXG5cdFx0ICAgIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBlbmNvZGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdCAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG5cdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gMjI7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gNjU7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gOTc7XG5cdFx0fVxuXHRcdHJldHVybiBiYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdCAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuXHQgKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuXHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0XHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdCAqIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuMy4yJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAoa2V5IGluIHB1bnljb2RlKSB7XG5cdFx0XHRcdHB1bnljb2RlLmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBwdW55Y29kZVtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuZXhwb3J0cy5VcmwgPSBVcmw7XG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMuaG9zdCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLnBhdGhuYW1lID0gbnVsbDtcbiAgdGhpcy5wYXRoID0gbnVsbDtcbiAgdGhpcy5ocmVmID0gbnVsbDtcbn1cblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSBzaW1wbGUgcGF0aCBVUkxcbiAgICBzaW1wbGVQYXRoUGF0dGVybiA9IC9eKFxcL1xcLz8oPyFcXC8pW15cXD9cXHNdKikoXFw/W15cXHNdKik/JC8sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyByZXNlcnZlZCBmb3IgZGVsaW1pdGluZyBVUkxzLlxuICAgIC8vIFdlIGFjdHVhbGx5IGp1c3QgYXV0by1lc2NhcGUgdGhlc2UuXG4gICAgZGVsaW1zID0gWyc8JywgJz4nLCAnXCInLCAnYCcsICcgJywgJ1xccicsICdcXG4nLCAnXFx0J10sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyBub3QgYWxsb3dlZCBmb3IgdmFyaW91cyByZWFzb25zLlxuICAgIHVud2lzZSA9IFsneycsICd9JywgJ3wnLCAnXFxcXCcsICdeJywgJ2AnXS5jb25jYXQoZGVsaW1zKSxcblxuICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cbiAgICBhdXRvRXNjYXBlID0gWydcXCcnXS5jb25jYXQodW53aXNlKSxcbiAgICAvLyBDaGFyYWN0ZXJzIHRoYXQgYXJlIG5ldmVyIGV2ZXIgYWxsb3dlZCBpbiBhIGhvc3RuYW1lLlxuICAgIC8vIE5vdGUgdGhhdCBhbnkgaW52YWxpZCBjaGFycyBhcmUgYWxzbyBoYW5kbGVkLCBidXQgdGhlc2VcbiAgICAvLyBhcmUgdGhlIG9uZXMgdGhhdCBhcmUgKmV4cGVjdGVkKiB0byBiZSBzZWVuLCBzbyB3ZSBmYXN0LXBhdGhcbiAgICAvLyB0aGVtLlxuICAgIG5vbkhvc3RDaGFycyA9IFsnJScsICcvJywgJz8nLCAnOycsICcjJ10uY29uY2F0KGF1dG9Fc2NhcGUpLFxuICAgIGhvc3RFbmRpbmdDaGFycyA9IFsnLycsICc/JywgJyMnXSxcbiAgICBob3N0bmFtZU1heExlbiA9IDI1NSxcbiAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bK2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oWythLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIHVuc2FmZVByb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuICAgIGhvc3RsZXNzUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIC8vIGJpdC5cbiAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG4gICAgICAnaHR0cCc6IHRydWUsXG4gICAgICAnaHR0cHMnOiB0cnVlLFxuICAgICAgJ2Z0cCc6IHRydWUsXG4gICAgICAnZ29waGVyJzogdHJ1ZSxcbiAgICAgICdmaWxlJzogdHJ1ZSxcbiAgICAgICdodHRwOic6IHRydWUsXG4gICAgICAnaHR0cHM6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuZnVuY3Rpb24gdXJsUGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAodXJsICYmIHV0aWwuaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCF1dGlsLmlzU3RyaW5nKHVybCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGFyYW1ldGVyICd1cmwnIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiB1cmwpO1xuICB9XG5cbiAgLy8gQ29weSBjaHJvbWUsIElFLCBvcGVyYSBiYWNrc2xhc2gtaGFuZGxpbmcgYmVoYXZpb3IuXG4gIC8vIEJhY2sgc2xhc2hlcyBiZWZvcmUgdGhlIHF1ZXJ5IHN0cmluZyBnZXQgY29udmVydGVkIHRvIGZvcndhcmQgc2xhc2hlc1xuICAvLyBTZWU6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNTkxNlxuICB2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/JyksXG4gICAgICBzcGxpdHRlciA9XG4gICAgICAgICAgKHF1ZXJ5SW5kZXggIT09IC0xICYmIHF1ZXJ5SW5kZXggPCB1cmwuaW5kZXhPZignIycpKSA/ICc/JyA6ICcjJyxcbiAgICAgIHVTcGxpdCA9IHVybC5zcGxpdChzcGxpdHRlciksXG4gICAgICBzbGFzaFJlZ2V4ID0gL1xcXFwvZztcbiAgdVNwbGl0WzBdID0gdVNwbGl0WzBdLnJlcGxhY2Uoc2xhc2hSZWdleCwgJy8nKTtcbiAgdXJsID0gdVNwbGl0LmpvaW4oc3BsaXR0ZXIpO1xuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIGlmICghc2xhc2hlc0Rlbm90ZUhvc3QgJiYgdXJsLnNwbGl0KCcjJykubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gVHJ5IGZhc3QgcGF0aCByZWdleHBcbiAgICB2YXIgc2ltcGxlUGF0aCA9IHNpbXBsZVBhdGhQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gICAgaWYgKHNpbXBsZVBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHJlc3Q7XG4gICAgICB0aGlzLmhyZWYgPSByZXN0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHNpbXBsZVBhdGhbMV07XG4gICAgICBpZiAoc2ltcGxlUGF0aFsyXSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNpbXBsZVBhdGhbMl07XG4gICAgICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMuc2VhcmNoLnN1YnN0cigxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuc2VhcmNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55Y29kZWQgcmVwcmVzZW50YXRpb24gb2YgXCJkb21haW5cIi5cbiAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcbiAgICAgIC8vIGhhdmUgbm9uLUFTQ0lJIGNoYXJhY3RlcnMsIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWZcbiAgICAgIC8vIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCBhbHJlYWR5IGlzIEFTQ0lJLW9ubHkuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gcHVueWNvZGUudG9BU0NJSSh0aGlzLmhvc3RuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICBpZiAocmVzdC5pbmRleE9mKGFlKSA9PT0gLTEpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG4gICAgICBpZiAoZXNjID09PSBhZSkge1xuICAgICAgICBlc2MgPSBlc2NhcGUoYWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHJlc3Quc3BsaXQoYWUpLmpvaW4oZXNjKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHRoaXMucXVlcnkgPSByZXN0LnN1YnN0cihxbSArIDEpO1xuICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG4gICAgfVxuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgLy8gbm8gcXVlcnkgc3RyaW5nLCBidXQgcGFyc2VRdWVyeVN0cmluZyBzdGlsbCByZXF1ZXN0ZWRcbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgdGhpcy5wYXRobmFtZSA9IHJlc3Q7XG4gIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcbiAgICAgIHRoaXMuaG9zdG5hbWUgJiYgIXRoaXMucGF0aG5hbWUpIHtcbiAgICB0aGlzLnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuICAgIHZhciBwID0gdGhpcy5wYXRobmFtZSB8fCAnJztcbiAgICB2YXIgcyA9IHRoaXMuc2VhcmNoIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIHRoaXMuaHJlZiA9IHRoaXMuZm9ybWF0KCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9ybWF0IGEgcGFyc2VkIG9iamVjdCBpbnRvIGEgdXJsIHN0cmluZ1xuZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuICAvLyBlbnN1cmUgaXQncyBhbiBvYmplY3QsIGFuZCBub3QgYSBzdHJpbmcgdXJsLlxuICAvLyBJZiBpdCdzIGFuIG9iaiwgdGhpcyBpcyBhIG5vLW9wLlxuICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG4gIC8vIHRvIGNsZWFuIHVwIHBvdGVudGlhbGx5IHdvbmt5IHVybHMuXG4gIGlmICh1dGlsLmlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIHV0aWwuaXNPYmplY3QodGhpcy5xdWVyeSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucXVlcnkpLmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMucXVlcnkpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgLy8gb25seSB0aGUgc2xhc2hlZFByb3RvY29scyBnZXQgdGhlIC8vLiAgTm90IG1haWx0bzosIHhtcHA6LCBldGMuXG4gIC8vIHVubGVzcyB0aGV5IGhhZCB0aGVtIHRvIGJlZ2luIHdpdGguXG4gIGlmICh0aGlzLnNsYXNoZXMgfHxcbiAgICAgICghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29sW3Byb3RvY29sXSkgJiYgaG9zdCAhPT0gZmFsc2UpIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWU7XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJyc7XG4gIH1cblxuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaDtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKCcjJywgJyUyMycpO1xuXG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlKHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmUocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICByZXR1cm4gdGhpcy5yZXNvbHZlT2JqZWN0KHVybFBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSkpLmZvcm1hdCgpO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZU9iamVjdChzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIGlmICghc291cmNlKSByZXR1cm4gcmVsYXRpdmU7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlT2JqZWN0KHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlT2JqZWN0ID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocmVsYXRpdmUpKSB7XG4gICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcbiAgICByZWwucGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKTtcbiAgICByZWxhdGl2ZSA9IHJlbDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVXJsKCk7XG4gIHZhciB0a2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICBmb3IgKHZhciB0ayA9IDA7IHRrIDwgdGtleXMubGVuZ3RoOyB0aysrKSB7XG4gICAgdmFyIHRrZXkgPSB0a2V5c1t0a107XG4gICAgcmVzdWx0W3RrZXldID0gdGhpc1t0a2V5XTtcbiAgfVxuXG4gIC8vIGhhc2ggaXMgYWx3YXlzIG92ZXJyaWRkZW4sIG5vIG1hdHRlciB3aGF0LlxuICAvLyBldmVuIGhyZWY9XCJcIiB3aWxsIHJlbW92ZSBpdC5cbiAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIC8vIGlmIHRoZSByZWxhdGl2ZSB1cmwgaXMgZW1wdHksIHRoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG8gaGVyZS5cbiAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAvLyB0YWtlIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBwcm90b2NvbCBmcm9tIHJlbGF0aXZlXG4gICAgdmFyIHJrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgIGZvciAodmFyIHJrID0gMDsgcmsgPCBya2V5cy5sZW5ndGg7IHJrKyspIHtcbiAgICAgIHZhciBya2V5ID0gcmtleXNbcmtdO1xuICAgICAgaWYgKHJrZXkgIT09ICdwcm90b2NvbCcpXG4gICAgICAgIHJlc3VsdFtya2V5XSA9IHJlbGF0aXZlW3JrZXldO1xuICAgIH1cblxuICAgIC8vdXJsUGFyc2UgYXBwZW5kcyB0cmFpbGluZyAvIHRvIHVybHMgbGlrZSBodHRwOi8vd3d3LmV4YW1wbGUuY29tXG4gICAgaWYgKHNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdICYmXG4gICAgICAgIHJlc3VsdC5ob3N0bmFtZSAmJiAhcmVzdWx0LnBhdGhuYW1lKSB7XG4gICAgICByZXN1bHQucGF0aCA9IHJlc3VsdC5wYXRobmFtZSA9ICcvJztcbiAgICB9XG5cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKHJlbGF0aXZlLnByb3RvY29sICYmIHJlbGF0aXZlLnByb3RvY29sICE9PSByZXN1bHQucHJvdG9jb2wpIHtcbiAgICAvLyBpZiBpdCdzIGEga25vd24gdXJsIHByb3RvY29sLCB0aGVuIGNoYW5naW5nXG4gICAgLy8gdGhlIHByb3RvY29sIGRvZXMgd2VpcmQgdGhpbmdzXG4gICAgLy8gZmlyc3QsIGlmIGl0J3Mgbm90IGZpbGU6LCB0aGVuIHdlIE1VU1QgaGF2ZSBhIGhvc3QsXG4gICAgLy8gYW5kIGlmIHRoZXJlIHdhcyBhIHBhdGhcbiAgICAvLyB0byBiZWdpbiB3aXRoLCB0aGVuIHdlIE1VU1QgaGF2ZSBhIHBhdGguXG4gICAgLy8gaWYgaXQgaXMgZmlsZTosIHRoZW4gdGhlIGhvc3QgaXMgZHJvcHBlZCxcbiAgICAvLyBiZWNhdXNlIHRoYXQncyBrbm93biB0byBiZSBob3N0bGVzcy5cbiAgICAvLyBhbnl0aGluZyBlbHNlIGlzIGFzc3VtZWQgdG8gYmUgYWJzb2x1dGUuXG4gICAgaWYgKCFzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICAgIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgICAgICB2YXIgayA9IGtleXNbdl07XG4gICAgICAgIHJlc3VsdFtrXSA9IHJlbGF0aXZlW2tdO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghdXRpbC5pc051bGxPclVuZGVmaW5lZChyZWxhdGl2ZS5zZWFyY2gpKSB7XG4gICAgLy8ganVzdCBwdWxsIG91dCB0aGUgc2VhcmNoLlxuICAgIC8vIGxpa2UgaHJlZj0nP2ZvbycuXG4gICAgLy8gUHV0IHRoaXMgYWZ0ZXIgdGhlIG90aGVyIHR3byBjYXNlcyBiZWNhdXNlIGl0IHNpbXBsaWZpZXMgdGhlIGJvb2xlYW5zXG4gICAgaWYgKHBzeWNob3RpYykge1xuICAgICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBzcmNQYXRoLnNoaWZ0KCk7XG4gICAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuICAgICAgcmVzdWx0LnBhdGggPSAnLycgKyByZXN1bHQuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgLy8gaG93ZXZlciwgaWYgaXQgZW5kcyBpbiBhbnl0aGluZyBlbHNlIG5vbi1zbGFzaHksXG4gIC8vIHRoZW4gaXQgbXVzdCBOT1QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gKFxuICAgICAgKHJlc3VsdC5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgfHwgc3JjUGF0aC5sZW5ndGggPiAxKSAmJlxuICAgICAgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fCBsYXN0ID09PSAnJyk7XG5cbiAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGFzdCA9IHNyY1BhdGhbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzIHx8IChyZXN1bHQuaG9zdCAmJiBzcmNQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IHJlcXVlc3QuaHR0cFxuICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgfVxuICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGggfHwgcmVzdWx0LmF1dGg7XG4gIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5VcmwucHJvdG90eXBlLnBhcnNlSG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgdmFyIHBvcnQgPSBwb3J0UGF0dGVybi5leGVjKGhvc3QpO1xuICBpZiAocG9ydCkge1xuICAgIHBvcnQgPSBwb3J0WzBdO1xuICAgIGlmIChwb3J0ICE9PSAnOicpIHtcbiAgICAgIHRoaXMucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIHRoaXMuaG9zdG5hbWUgPSBob3N0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzU3RyaW5nOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnO1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsT3JVbmRlZmluZWQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT0gbnVsbDtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL3V0aWwvdHlwZXMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMTEyY2M3YzI3NTUxMjU0YWEyYjE3MDk4ZmI3NzQ4NjdmMDVlZDBkOVxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc0FyZ3VtZW50c09iamVjdCA9IHJlcXVpcmUoJ2lzLWFyZ3VtZW50cycpO1xudmFyIGlzR2VuZXJhdG9yRnVuY3Rpb24gPSByZXF1aXJlKCdpcy1nZW5lcmF0b3ItZnVuY3Rpb24nKTtcbnZhciB3aGljaFR5cGVkQXJyYXkgPSByZXF1aXJlKCd3aGljaC10eXBlZC1hcnJheScpO1xudmFyIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2lzLXR5cGVkLWFycmF5Jyk7XG5cbmZ1bmN0aW9uIHVuY3VycnlUaGlzKGYpIHtcbiAgcmV0dXJuIGYuY2FsbC5iaW5kKGYpO1xufVxuXG52YXIgQmlnSW50U3VwcG9ydGVkID0gdHlwZW9mIEJpZ0ludCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgU3ltYm9sU3VwcG9ydGVkID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBPYmplY3RUb1N0cmluZyA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpO1xuXG52YXIgbnVtYmVyVmFsdWUgPSB1bmN1cnJ5VGhpcyhOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YpO1xudmFyIHN0cmluZ1ZhbHVlID0gdW5jdXJyeVRoaXMoU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mKTtcbnZhciBib29sZWFuVmFsdWUgPSB1bmN1cnJ5VGhpcyhCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mKTtcblxuaWYgKEJpZ0ludFN1cHBvcnRlZCkge1xuICB2YXIgYmlnSW50VmFsdWUgPSB1bmN1cnJ5VGhpcyhCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YpO1xufVxuXG5pZiAoU3ltYm9sU3VwcG9ydGVkKSB7XG4gIHZhciBzeW1ib2xWYWx1ZSA9IHVuY3VycnlUaGlzKFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZik7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHByb3RvdHlwZVZhbHVlT2YpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICBwcm90b3R5cGVWYWx1ZU9mKHZhbHVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydHMuaXNBcmd1bWVudHNPYmplY3QgPSBpc0FyZ3VtZW50c09iamVjdDtcbmV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGlzR2VuZXJhdG9yRnVuY3Rpb247XG5leHBvcnRzLmlzVHlwZWRBcnJheSA9IGlzVHlwZWRBcnJheTtcblxuLy8gVGFrZW4gZnJvbSBoZXJlIGFuZCBtb2RpZmllZCBmb3IgYmV0dGVyIGJyb3dzZXIgc3VwcG9ydFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9wLWlzLXByb21pc2UvYmxvYi9jZGEzNWE1MTNiZGEwM2Y5NzdhZDVjZGUzYTA3OWQyMzdlODJkN2VmL2luZGV4LmpzXG5mdW5jdGlvbiBpc1Byb21pc2UoaW5wdXQpIHtcblx0cmV0dXJuIChcblx0XHQoXG5cdFx0XHR0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdGlucHV0IGluc3RhbmNlb2YgUHJvbWlzZVxuXHRcdCkgfHxcblx0XHQoXG5cdFx0XHRpbnB1dCAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIGlucHV0LnRoZW4gPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdHR5cGVvZiBpbnB1dC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdClcblx0KTtcbn1cbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgaXNUeXBlZEFycmF5KHZhbHVlKSB8fFxuICAgIGlzRGF0YVZpZXcodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXJWaWV3ID0gaXNBcnJheUJ1ZmZlclZpZXc7XG5cblxuZnVuY3Rpb24gaXNVaW50OEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDhBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDhBcnJheSA9IGlzVWludDhBcnJheTtcblxuZnVuY3Rpb24gaXNVaW50OENsYW1wZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ1VpbnQ4Q2xhbXBlZEFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50OENsYW1wZWRBcnJheSA9IGlzVWludDhDbGFtcGVkQXJyYXk7XG5cbmZ1bmN0aW9uIGlzVWludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50MTZBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDE2QXJyYXkgPSBpc1VpbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc1VpbnQzMkFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDMyQXJyYXknO1xufVxuZXhwb3J0cy5pc1VpbnQzMkFycmF5ID0gaXNVaW50MzJBcnJheTtcblxuZnVuY3Rpb24gaXNJbnQ4QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQ4QXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDhBcnJheSA9IGlzSW50OEFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQxNkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQxNkFycmF5ID0gaXNJbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDMyQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQzMkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQzMkFycmF5ID0gaXNJbnQzMkFycmF5O1xuXG5mdW5jdGlvbiBpc0Zsb2F0MzJBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0Zsb2F0MzJBcnJheSc7XG59XG5leHBvcnRzLmlzRmxvYXQzMkFycmF5ID0gaXNGbG9hdDMyQXJyYXk7XG5cbmZ1bmN0aW9uIGlzRmxvYXQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnRmxvYXQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNGbG9hdDY0QXJyYXkgPSBpc0Zsb2F0NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdJbnQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnQmlnSW50NjRBcnJheSc7XG59XG5leHBvcnRzLmlzQmlnSW50NjRBcnJheSA9IGlzQmlnSW50NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdVaW50NjRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0JpZ1VpbnQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNCaWdVaW50NjRBcnJheSA9IGlzQmlnVWludDY0QXJyYXk7XG5cbmZ1bmN0aW9uIGlzTWFwVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgTWFwXSc7XG59XG5pc01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzTWFwVG9TdHJpbmcobmV3IE1hcCgpKVxuKTtcblxuZnVuY3Rpb24gaXNNYXAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzTWFwVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNNYXBUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgTWFwO1xufVxuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xuXG5mdW5jdGlvbiBpc1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNldF0nO1xufVxuaXNTZXRUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1NldFRvU3RyaW5nKG5ldyBTZXQoKSlcbik7XG5mdW5jdGlvbiBpc1NldCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNTZXRUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NldFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBTZXQ7XG59XG5leHBvcnRzLmlzU2V0ID0gaXNTZXQ7XG5cbmZ1bmN0aW9uIGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtNYXBdJztcbn1cbmlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtNYXBUb1N0cmluZyhuZXcgV2Vha01hcCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha01hcCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBXZWFrTWFwO1xufVxuZXhwb3J0cy5pc1dlYWtNYXAgPSBpc1dlYWtNYXA7XG5cbmZ1bmN0aW9uIGlzV2Vha1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtTZXRdJztcbn1cbmlzV2Vha1NldFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtTZXRUb1N0cmluZyhuZXcgV2Vha1NldCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha1NldCh2YWx1ZSkge1xuICByZXR1cm4gaXNXZWFrU2V0VG9TdHJpbmcodmFsdWUpO1xufVxuZXhwb3J0cy5pc1dlYWtTZXQgPSBpc1dlYWtTZXQ7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNBcnJheUJ1ZmZlclRvU3RyaW5nKG5ldyBBcnJheUJ1ZmZlcigpKVxuKTtcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXIgPSBpc0FycmF5QnVmZmVyO1xuXG5mdW5jdGlvbiBpc0RhdGFWaWV3VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0YVZpZXddJztcbn1cbmlzRGF0YVZpZXdUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBEYXRhVmlldyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNEYXRhVmlld1RvU3RyaW5nKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSksIDAsIDEpKVxuKTtcbmZ1bmN0aW9uIGlzRGF0YVZpZXcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNEYXRhVmlld1RvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzRGF0YVZpZXdUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgRGF0YVZpZXc7XG59XG5leHBvcnRzLmlzRGF0YVZpZXcgPSBpc0RhdGFWaWV3O1xuXG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2hhcmVkQXJyYXlCdWZmZXJdJztcbn1cbmlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZyhuZXcgU2hhcmVkQXJyYXlCdWZmZXIoKSlcbik7XG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyO1xufVxuZXhwb3J0cy5pc1NoYXJlZEFycmF5QnVmZmVyID0gaXNTaGFyZWRBcnJheUJ1ZmZlcjtcblxuZnVuY3Rpb24gaXNBc3luY0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJztcbn1cbmV4cG9ydHMuaXNBc3luY0Z1bmN0aW9uID0gaXNBc3luY0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc01hcEl0ZXJhdG9yKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IE1hcCBJdGVyYXRvcl0nO1xufVxuZXhwb3J0cy5pc01hcEl0ZXJhdG9yID0gaXNNYXBJdGVyYXRvcjtcblxuZnVuY3Rpb24gaXNTZXRJdGVyYXRvcih2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBTZXQgSXRlcmF0b3JdJztcbn1cbmV4cG9ydHMuaXNTZXRJdGVyYXRvciA9IGlzU2V0SXRlcmF0b3I7XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEdlbmVyYXRvcl0nO1xufVxuZXhwb3J0cy5pc0dlbmVyYXRvck9iamVjdCA9IGlzR2VuZXJhdG9yT2JqZWN0O1xuXG5mdW5jdGlvbiBpc1dlYkFzc2VtYmx5Q29tcGlsZWRNb2R1bGUodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgV2ViQXNzZW1ibHkuTW9kdWxlXSc7XG59XG5leHBvcnRzLmlzV2ViQXNzZW1ibHlDb21waWxlZE1vZHVsZSA9IGlzV2ViQXNzZW1ibHlDb21waWxlZE1vZHVsZTtcblxuZnVuY3Rpb24gaXNOdW1iZXJPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIG51bWJlclZhbHVlKTtcbn1cbmV4cG9ydHMuaXNOdW1iZXJPYmplY3QgPSBpc051bWJlck9iamVjdDtcblxuZnVuY3Rpb24gaXNTdHJpbmdPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHN0cmluZ1ZhbHVlKTtcbn1cbmV4cG9ydHMuaXNTdHJpbmdPYmplY3QgPSBpc1N0cmluZ09iamVjdDtcblxuZnVuY3Rpb24gaXNCb29sZWFuT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBib29sZWFuVmFsdWUpO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW5PYmplY3QgPSBpc0Jvb2xlYW5PYmplY3Q7XG5cbmZ1bmN0aW9uIGlzQmlnSW50T2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBCaWdJbnRTdXBwb3J0ZWQgJiYgY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgYmlnSW50VmFsdWUpO1xufVxuZXhwb3J0cy5pc0JpZ0ludE9iamVjdCA9IGlzQmlnSW50T2JqZWN0O1xuXG5mdW5jdGlvbiBpc1N5bWJvbE9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gU3ltYm9sU3VwcG9ydGVkICYmIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHN5bWJvbFZhbHVlKTtcbn1cbmV4cG9ydHMuaXNTeW1ib2xPYmplY3QgPSBpc1N5bWJvbE9iamVjdDtcblxuZnVuY3Rpb24gaXNCb3hlZFByaW1pdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIGlzTnVtYmVyT2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzU3RyaW5nT2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzQm9vbGVhbk9iamVjdCh2YWx1ZSkgfHxcbiAgICBpc0JpZ0ludE9iamVjdCh2YWx1ZSkgfHxcbiAgICBpc1N5bWJvbE9iamVjdCh2YWx1ZSlcbiAgKTtcbn1cbmV4cG9ydHMuaXNCb3hlZFByaW1pdGl2ZSA9IGlzQm94ZWRQcmltaXRpdmU7XG5cbmZ1bmN0aW9uIGlzQW55QXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiAoXG4gICAgaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHxcbiAgICBpc1NoYXJlZEFycmF5QnVmZmVyKHZhbHVlKVxuICApO1xufVxuZXhwb3J0cy5pc0FueUFycmF5QnVmZmVyID0gaXNBbnlBcnJheUJ1ZmZlcjtcblxuWydpc1Byb3h5JywgJ2lzRXh0ZXJuYWwnLCAnaXNNb2R1bGVOYW1lc3BhY2VPYmplY3QnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbWV0aG9kLCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1ldGhvZCArICcgaXMgbm90IHN1cHBvcnRlZCBpbiB1c2VybGFuZCcpO1xuICAgIH1cbiAgfSk7XG59KTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIHx8XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIHZhciBkZXNjcmlwdG9ycyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgZGVzY3JpcHRvcnNba2V5c1tpXV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgfTtcblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZSZWdleCA9IC9eJC87XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSB7XG4gIHZhciBkZWJ1Z0VudiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUc7XG4gIGRlYnVnRW52ID0gZGVidWdFbnYucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCs/Ll0vZywgJ1xcXFwkJicpXG4gICAgLnJlcGxhY2UoL1xcKi9nLCAnLionKVxuICAgIC5yZXBsYWNlKC8sL2csICckfF4nKVxuICAgIC50b1VwcGVyQ2FzZSgpO1xuICBkZWJ1Z0VudlJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBkZWJ1Z0VudiArICckJywgJ2knKTtcbn1cbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAoZGVidWdFbnZSZWdleC50ZXN0KHNldCkpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZXhwb3J0cy50eXBlcyA9IHJlcXVpcmUoJy4vc3VwcG9ydC90eXBlcycpO1xuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuZXhwb3J0cy50eXBlcy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcbmV4cG9ydHMudHlwZXMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5leHBvcnRzLnR5cGVzLmlzTmF0aXZlRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG52YXIga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2woJ3V0aWwucHJvbWlzaWZ5LmN1c3RvbScpIDogdW5kZWZpbmVkO1xuXG5leHBvcnRzLnByb21pc2lmeSA9IGZ1bmN0aW9uIHByb21pc2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCAmJiBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdKSB7XG4gICAgdmFyIGZuID0gb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJ1dGlsLnByb21pc2lmeS5jdXN0b21cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgZnVuY3Rpb24gZm4oKSB7XG4gICAgdmFyIHByb21pc2VSZXNvbHZlLCBwcm9taXNlUmVqZWN0O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcHJvbWlzZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgcHJvbWlzZVJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcblxuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgICBhcmdzLnB1c2goZnVuY3Rpb24gKGVyciwgdmFsdWUpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZVJlc29sdmUodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGZuLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG4gICAgZm4sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbClcbiAgKTtcbn1cblxuZXhwb3J0cy5wcm9taXNpZnkuY3VzdG9tID0ga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5T25SZWplY3RlZChyZWFzb24sIGNiKSB7XG4gIC8vIGAhcmVhc29uYCBndWFyZCBpbnNwaXJlZCBieSBibHVlYmlyZCAoUmVmOiBodHRwczovL2dvby5nbC90NUlTNk0pLlxuICAvLyBCZWNhdXNlIGBudWxsYCBpcyBhIHNwZWNpYWwgZXJyb3IgdmFsdWUgaW4gY2FsbGJhY2tzIHdoaWNoIG1lYW5zIFwibm8gZXJyb3JcbiAgLy8gb2NjdXJyZWRcIiwgd2UgZXJyb3Itd3JhcCBzbyB0aGUgY2FsbGJhY2sgY29uc3VtZXIgY2FuIGRpc3Rpbmd1aXNoIGJldHdlZW5cbiAgLy8gXCJ0aGUgcHJvbWlzZSByZWplY3RlZCB3aXRoIG51bGxcIiBvciBcInRoZSBwcm9taXNlIGZ1bGZpbGxlZCB3aXRoIHVuZGVmaW5lZFwiLlxuICBpZiAoIXJlYXNvbikge1xuICAgIHZhciBuZXdSZWFzb24gPSBuZXcgRXJyb3IoJ1Byb21pc2Ugd2FzIHJlamVjdGVkIHdpdGggYSBmYWxzeSB2YWx1ZScpO1xuICAgIG5ld1JlYXNvbi5yZWFzb24gPSByZWFzb247XG4gICAgcmVhc29uID0gbmV3UmVhc29uO1xuICB9XG4gIHJldHVybiBjYihyZWFzb24pO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIC8vIFdlIERPIE5PVCByZXR1cm4gdGhlIHByb21pc2UgYXMgaXQgZ2l2ZXMgdGhlIHVzZXIgYSBmYWxzZSBzZW5zZSB0aGF0XG4gIC8vIHRoZSBwcm9taXNlIGlzIGFjdHVhbGx5IHNvbWVob3cgcmVsYXRlZCB0byB0aGUgY2FsbGJhY2sncyBleGVjdXRpb25cbiAgLy8gYW5kIHRoYXQgdGhlIGNhbGxiYWNrIHRocm93aW5nIHdpbGwgcmVqZWN0IHRoZSBwcm9taXNlLlxuICBmdW5jdGlvbiBjYWxsYmFja2lmaWVkKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIHZhciBtYXliZUNiID0gYXJncy5wb3AoKTtcbiAgICBpZiAodHlwZW9mIG1heWJlQ2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsYXN0IGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGNiID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbWF5YmVDYi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgLy8gSW4gdHJ1ZSBub2RlIHN0eWxlIHdlIHByb2Nlc3MgdGhlIGNhbGxiYWNrIG9uIGBuZXh0VGlja2Agd2l0aCBhbGwgdGhlXG4gICAgLy8gaW1wbGljYXRpb25zIChzdGFjaywgYHVuY2F1Z2h0RXhjZXB0aW9uYCwgYGFzeW5jX2hvb2tzYClcbiAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmV0KSB7IHByb2Nlc3MubmV4dFRpY2soY2IuYmluZChudWxsLCBudWxsLCByZXQpKSB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVqKSB7IHByb2Nlc3MubmV4dFRpY2soY2FsbGJhY2tpZnlPblJlamVjdGVkLmJpbmQobnVsbCwgcmVqLCBjYikpIH0pO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNhbGxiYWNraWZpZWQsIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjYWxsYmFja2lmaWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKSk7XG4gIHJldHVybiBjYWxsYmFja2lmaWVkO1xufVxuZXhwb3J0cy5jYWxsYmFja2lmeSA9IGNhbGxiYWNraWZ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcbnZhciBhdmFpbGFibGVUeXBlZEFycmF5cyA9IHJlcXVpcmUoJ2F2YWlsYWJsZS10eXBlZC1hcnJheXMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gaGFzU3ltYm9scyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxudmFyIHR5cGVkQXJyYXlzID0gYXZhaWxhYmxlVHlwZWRBcnJheXMoKTtcblxudmFyICRzbGljZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5zbGljZScpO1xudmFyIHRvU3RyVGFncyA9IHt9O1xudmFyIGdPUEQgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9oZWxwZXJzL2dldE93blByb3BlcnR5RGVzY3JpcHRvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mOyAvLyByZXF1aXJlKCdnZXRwcm90b3R5cGVvZicpO1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG90eXBlT2YpIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHRpZiAodHlwZW9mIGdsb2JhbFt0eXBlZEFycmF5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dmFyIGFyciA9IG5ldyBnbG9iYWxbdHlwZWRBcnJheV0oKTtcblx0XHRcdGlmICghKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBhcnIpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFdmFsRXJyb3IoJ3RoaXMgZW5naW5lIGhhcyBzdXBwb3J0IGZvciBTeW1ib2wudG9TdHJpbmdUYWcsIGJ1dCAnICsgdHlwZWRBcnJheSArICcgZG9lcyBub3QgaGF2ZSB0aGUgcHJvcGVydHkhIFBsZWFzZSByZXBvcnQgdGhpcy4nKTtcblx0XHRcdH1cblx0XHRcdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGFycik7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IGdPUEQocHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHRpZiAoIWRlc2NyaXB0b3IpIHtcblx0XHRcdFx0dmFyIHN1cGVyUHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90byk7XG5cdFx0XHRcdGRlc2NyaXB0b3IgPSBnT1BEKHN1cGVyUHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHR9XG5cdFx0XHR0b1N0clRhZ3NbdHlwZWRBcnJheV0gPSBkZXNjcmlwdG9yLmdldDtcblx0XHR9XG5cdH0pO1xufVxuXG52YXIgdHJ5VHlwZWRBcnJheXMgPSBmdW5jdGlvbiB0cnlBbGxUeXBlZEFycmF5cyh2YWx1ZSkge1xuXHR2YXIgZm91bmROYW1lID0gZmFsc2U7XG5cdGZvckVhY2godG9TdHJUYWdzLCBmdW5jdGlvbiAoZ2V0dGVyLCB0eXBlZEFycmF5KSB7XG5cdFx0aWYgKCFmb3VuZE5hbWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBuYW1lID0gZ2V0dGVyLmNhbGwodmFsdWUpO1xuXHRcdFx0XHRpZiAobmFtZSA9PT0gdHlwZWRBcnJheSkge1xuXHRcdFx0XHRcdGZvdW5kTmFtZSA9IG5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGZvdW5kTmFtZTtcbn07XG5cbnZhciBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdpcy10eXBlZC1hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkge1xuXHRpZiAoIWlzVHlwZWRBcnJheSh2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHsgcmV0dXJuICRzbGljZSgkdG9TdHJpbmcodmFsdWUpLCA4LCAtMSk7IH1cblx0cmV0dXJuIHRyeVR5cGVkQXJyYXlzKHZhbHVlKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiZXhwb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuL2NsaWVudCc7XG4iXSwic291cmNlUm9vdCI6IiJ9
