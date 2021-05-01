/*! For license information please see bundle.js.LICENSE.txt */
!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define([], e)
    : 'object' == typeof exports
    ? (exports.imgur = e())
    : (t.imgur = e())
})('undefined' != typeof self ? self : this, function () {
  return (() => {
    var t = {
        2190: (t) => {
          t.exports = function (t, r, n) {
            if (t.filter) return t.filter(r, n)
            if (null == t) throw new TypeError()
            if ('function' != typeof r) throw new TypeError()
            for (var o = [], i = 0; i < t.length; i++)
              if (e.call(t, i)) {
                var a = t[i]
                r.call(n, a, i, t) && o.push(a)
              }
            return o
          }
          var e = Object.prototype.hasOwnProperty
        },
        9282: (t, e, r) => {
          'use strict'
          var n = r(4155),
            o = r(5108)
          function i(t) {
            return (i =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          var a,
            s,
            c = r(2136).codes,
            u = c.ERR_AMBIGUOUS_ARGUMENT,
            f = c.ERR_INVALID_ARG_TYPE,
            l = c.ERR_INVALID_ARG_VALUE,
            p = c.ERR_INVALID_RETURN_VALUE,
            y = c.ERR_MISSING_ARGS,
            h = r(5961),
            d = r(9539).inspect,
            g = r(9539).types,
            m = g.isPromise,
            v = g.isRegExp,
            b = Object.assign ? Object.assign : r(8091).assign,
            w = Object.is ? Object.is : r(609)
          function O() {
            var t = r(9158)
            ;(a = t.isDeepEqual), (s = t.isDeepStrictEqual)
          }
          new Map()
          var E = !1,
            S = (t.exports = P),
            j = {}
          function A(t) {
            if (t.message instanceof Error) throw t.message
            throw new h(t)
          }
          function x(t, e, r, n) {
            if (!r) {
              var o = !1
              if (0 === e)
                (o = !0), (n = 'No value argument passed to `assert.ok()`')
              else if (n instanceof Error) throw n
              var i = new h({
                actual: r,
                expected: !0,
                message: n,
                operator: '==',
                stackStartFn: t,
              })
              throw ((i.generatedMessage = o), i)
            }
          }
          function P() {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
              e[r] = arguments[r]
            x.apply(void 0, [P, e.length].concat(e))
          }
          ;(S.fail = function t(e, r, i, a, s) {
            var c,
              u = arguments.length
            if (0 === u) c = 'Failed'
            else if (1 === u) (i = e), (e = void 0)
            else {
              if (!1 === E) {
                E = !0
                var f = n.emitWarning ? n.emitWarning : o.warn.bind(o)
                f(
                  'assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.',
                  'DeprecationWarning',
                  'DEP0094'
                )
              }
              2 === u && (a = '!=')
            }
            if (i instanceof Error) throw i
            var l = {
              actual: e,
              expected: r,
              operator: void 0 === a ? 'fail' : a,
              stackStartFn: s || t,
            }
            void 0 !== i && (l.message = i)
            var p = new h(l)
            throw (c && ((p.message = c), (p.generatedMessage = !0)), p)
          }),
            (S.AssertionError = h),
            (S.ok = P),
            (S.equal = function t(e, r, n) {
              if (arguments.length < 2) throw new y('actual', 'expected')
              e != r &&
                A({
                  actual: e,
                  expected: r,
                  message: n,
                  operator: '==',
                  stackStartFn: t,
                })
            }),
            (S.notEqual = function t(e, r, n) {
              if (arguments.length < 2) throw new y('actual', 'expected')
              e == r &&
                A({
                  actual: e,
                  expected: r,
                  message: n,
                  operator: '!=',
                  stackStartFn: t,
                })
            }),
            (S.deepEqual = function t(e, r, n) {
              if (arguments.length < 2) throw new y('actual', 'expected')
              void 0 === a && O(),
                a(e, r) ||
                  A({
                    actual: e,
                    expected: r,
                    message: n,
                    operator: 'deepEqual',
                    stackStartFn: t,
                  })
            }),
            (S.notDeepEqual = function t(e, r, n) {
              if (arguments.length < 2) throw new y('actual', 'expected')
              void 0 === a && O(),
                a(e, r) &&
                  A({
                    actual: e,
                    expected: r,
                    message: n,
                    operator: 'notDeepEqual',
                    stackStartFn: t,
                  })
            }),
            (S.deepStrictEqual = function t(e, r, n) {
              if (arguments.length < 2) throw new y('actual', 'expected')
              void 0 === a && O(),
                s(e, r) ||
                  A({
                    actual: e,
                    expected: r,
                    message: n,
                    operator: 'deepStrictEqual',
                    stackStartFn: t,
                  })
            }),
            (S.notDeepStrictEqual = function t(e, r, n) {
              if (arguments.length < 2) throw new y('actual', 'expected')
              void 0 === a && O(),
                s(e, r) &&
                  A({
                    actual: e,
                    expected: r,
                    message: n,
                    operator: 'notDeepStrictEqual',
                    stackStartFn: t,
                  })
            }),
            (S.strictEqual = function t(e, r, n) {
              if (arguments.length < 2) throw new y('actual', 'expected')
              w(e, r) ||
                A({
                  actual: e,
                  expected: r,
                  message: n,
                  operator: 'strictEqual',
                  stackStartFn: t,
                })
            }),
            (S.notStrictEqual = function t(e, r, n) {
              if (arguments.length < 2) throw new y('actual', 'expected')
              w(e, r) &&
                A({
                  actual: e,
                  expected: r,
                  message: n,
                  operator: 'notStrictEqual',
                  stackStartFn: t,
                })
            })
          var _ = function t(e, r, n) {
            var o = this
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            })(this, t),
              r.forEach(function (t) {
                t in e &&
                  (void 0 !== n &&
                  'string' == typeof n[t] &&
                  v(e[t]) &&
                  e[t].test(n[t])
                    ? (o[t] = n[t])
                    : (o[t] = e[t]))
              })
          }
          function I(t, e, r, n, o, i) {
            if (!(r in t) || !s(t[r], e[r])) {
              if (!n) {
                var a = new _(t, o),
                  c = new _(e, o, t),
                  u = new h({
                    actual: a,
                    expected: c,
                    operator: 'deepStrictEqual',
                    stackStartFn: i,
                  })
                throw (
                  ((u.actual = t), (u.expected = e), (u.operator = i.name), u)
                )
              }
              A({
                actual: t,
                expected: e,
                message: n,
                operator: i.name,
                stackStartFn: i,
              })
            }
          }
          function R(t, e, r, n) {
            if ('function' != typeof e) {
              if (v(e)) return e.test(t)
              if (2 === arguments.length)
                throw new f('expected', ['Function', 'RegExp'], e)
              if ('object' !== i(t) || null === t) {
                var o = new h({
                  actual: t,
                  expected: e,
                  message: r,
                  operator: 'deepStrictEqual',
                  stackStartFn: n,
                })
                throw ((o.operator = n.name), o)
              }
              var s = Object.keys(e)
              if (e instanceof Error) s.push('name', 'message')
              else if (0 === s.length)
                throw new l('error', e, 'may not be an empty object')
              return (
                void 0 === a && O(),
                s.forEach(function (o) {
                  ;('string' == typeof t[o] && v(e[o]) && e[o].test(t[o])) ||
                    I(t, e, o, r, s, n)
                }),
                !0
              )
            }
            return (
              (void 0 !== e.prototype && t instanceof e) ||
              (!Error.isPrototypeOf(e) && !0 === e.call({}, t))
            )
          }
          function T(t) {
            if ('function' != typeof t) throw new f('fn', 'Function', t)
            try {
              t()
            } catch (t) {
              return t
            }
            return j
          }
          function N(t) {
            return (
              m(t) ||
              (null !== t &&
                'object' === i(t) &&
                'function' == typeof t.then &&
                'function' == typeof t.catch)
            )
          }
          function k(t) {
            return Promise.resolve().then(function () {
              var e
              if ('function' == typeof t) {
                if (!N((e = t())))
                  throw new p('instance of Promise', 'promiseFn', e)
              } else {
                if (!N(t)) throw new f('promiseFn', ['Function', 'Promise'], t)
                e = t
              }
              return Promise.resolve()
                .then(function () {
                  return e
                })
                .then(function () {
                  return j
                })
                .catch(function (t) {
                  return t
                })
            })
          }
          function U(t, e, r, n) {
            if ('string' == typeof r) {
              if (4 === arguments.length)
                throw new f(
                  'error',
                  ['Object', 'Error', 'Function', 'RegExp'],
                  r
                )
              if ('object' === i(e) && null !== e) {
                if (e.message === r)
                  throw new u(
                    'error/message',
                    'The error message "'.concat(
                      e.message,
                      '" is identical to the message.'
                    )
                  )
              } else if (e === r)
                throw new u(
                  'error/message',
                  'The error "'.concat(e, '" is identical to the message.')
                )
              ;(n = r), (r = void 0)
            } else if (null != r && 'object' !== i(r) && 'function' != typeof r)
              throw new f('error', ['Object', 'Error', 'Function', 'RegExp'], r)
            if (e === j) {
              var o = ''
              r && r.name && (o += ' ('.concat(r.name, ')')),
                (o += n ? ': '.concat(n) : '.')
              var a = 'rejects' === t.name ? 'rejection' : 'exception'
              A({
                actual: void 0,
                expected: r,
                operator: t.name,
                message: 'Missing expected '.concat(a).concat(o),
                stackStartFn: t,
              })
            }
            if (r && !R(e, r, n, t)) throw e
          }
          function F(t, e, r, n) {
            if (e !== j) {
              if (
                ('string' == typeof r && ((n = r), (r = void 0)), !r || R(e, r))
              ) {
                var o = n ? ': '.concat(n) : '.',
                  i = 'doesNotReject' === t.name ? 'rejection' : 'exception'
                A({
                  actual: e,
                  expected: r,
                  operator: t.name,
                  message:
                    'Got unwanted '.concat(i).concat(o, '\n') +
                    'Actual message: "'.concat(e && e.message, '"'),
                  stackStartFn: t,
                })
              }
              throw e
            }
          }
          function L() {
            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
              e[r] = arguments[r]
            x.apply(void 0, [L, e.length].concat(e))
          }
          ;(S.throws = function t(e) {
            for (
              var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1;
              o < r;
              o++
            )
              n[o - 1] = arguments[o]
            U.apply(void 0, [t, T(e)].concat(n))
          }),
            (S.rejects = function t(e) {
              for (
                var r = arguments.length,
                  n = new Array(r > 1 ? r - 1 : 0),
                  o = 1;
                o < r;
                o++
              )
                n[o - 1] = arguments[o]
              return k(e).then(function (e) {
                return U.apply(void 0, [t, e].concat(n))
              })
            }),
            (S.doesNotThrow = function t(e) {
              for (
                var r = arguments.length,
                  n = new Array(r > 1 ? r - 1 : 0),
                  o = 1;
                o < r;
                o++
              )
                n[o - 1] = arguments[o]
              F.apply(void 0, [t, T(e)].concat(n))
            }),
            (S.doesNotReject = function t(e) {
              for (
                var r = arguments.length,
                  n = new Array(r > 1 ? r - 1 : 0),
                  o = 1;
                o < r;
                o++
              )
                n[o - 1] = arguments[o]
              return k(e).then(function (e) {
                return F.apply(void 0, [t, e].concat(n))
              })
            }),
            (S.ifError = function t(e) {
              if (null != e) {
                var r = 'ifError got unwanted exception: '
                'object' === i(e) && 'string' == typeof e.message
                  ? 0 === e.message.length && e.constructor
                    ? (r += e.constructor.name)
                    : (r += e.message)
                  : (r += d(e))
                var n = new h({
                    actual: e,
                    expected: null,
                    operator: 'ifError',
                    message: r,
                    stackStartFn: t,
                  }),
                  o = e.stack
                if ('string' == typeof o) {
                  var a = o.split('\n')
                  a.shift()
                  for (var s = n.stack.split('\n'), c = 0; c < a.length; c++) {
                    var u = s.indexOf(a[c])
                    if (-1 !== u) {
                      s = s.slice(0, u)
                      break
                    }
                  }
                  n.stack = ''.concat(s.join('\n'), '\n').concat(a.join('\n'))
                }
                throw n
              }
            }),
            (S.strict = b(L, S, {
              equal: S.strictEqual,
              deepEqual: S.deepStrictEqual,
              notEqual: S.notStrictEqual,
              notDeepEqual: S.notDeepStrictEqual,
            })),
            (S.strict.strict = S.strict)
        },
        5961: (t, e, r) => {
          'use strict'
          var n = r(4155)
          function o(t, e, r) {
            return (
              e in t
                ? Object.defineProperty(t, e, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[e] = r),
              t
            )
          }
          function i(t, e) {
            for (var r = 0; r < e.length; r++) {
              var n = e[r]
              ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
          }
          function a(t, e) {
            return !e || ('object' !== y(e) && 'function' != typeof e)
              ? s(t)
              : e
          }
          function s(t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              )
            return t
          }
          function c(t) {
            var e = 'function' == typeof Map ? new Map() : void 0
            return (c = function (t) {
              if (
                null === t ||
                ((r = t),
                -1 === Function.toString.call(r).indexOf('[native code]'))
              )
                return t
              var r
              if ('function' != typeof t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              if (void 0 !== e) {
                if (e.has(t)) return e.get(t)
                e.set(t, n)
              }
              function n() {
                return f(t, arguments, p(this).constructor)
              }
              return (
                (n.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                l(n, t)
              )
            })(t)
          }
          function u() {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1
            if (Reflect.construct.sham) return !1
            if ('function' == typeof Proxy) return !0
            try {
              return (
                Date.prototype.toString.call(
                  Reflect.construct(Date, [], function () {})
                ),
                !0
              )
            } catch (t) {
              return !1
            }
          }
          function f(t, e, r) {
            return (f = u()
              ? Reflect.construct
              : function (t, e, r) {
                  var n = [null]
                  n.push.apply(n, e)
                  var o = new (Function.bind.apply(t, n))()
                  return r && l(o, r.prototype), o
                }).apply(null, arguments)
          }
          function l(t, e) {
            return (l =
              Object.setPrototypeOf ||
              function (t, e) {
                return (t.__proto__ = e), t
              })(t, e)
          }
          function p(t) {
            return (p = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
          }
          function y(t) {
            return (y =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          var h = r(9539).inspect,
            d = r(2136).codes.ERR_INVALID_ARG_TYPE
          function g(t, e, r) {
            return (
              (void 0 === r || r > t.length) && (r = t.length),
              t.substring(r - e.length, r) === e
            )
          }
          var m = '',
            v = '',
            b = '',
            w = '',
            O = {
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
              notDeepEqual:
                'Expected "actual" not to be loosely deep-equal to:',
              notEqual: 'Expected "actual" to be loosely unequal to:',
              notIdentical: 'Values identical but not reference-equal:',
            }
          function E(t) {
            var e = Object.keys(t),
              r = Object.create(Object.getPrototypeOf(t))
            return (
              e.forEach(function (e) {
                r[e] = t[e]
              }),
              Object.defineProperty(r, 'message', { value: t.message }),
              r
            )
          }
          function S(t) {
            return h(t, {
              compact: !1,
              customInspect: !1,
              depth: 1e3,
              maxArrayLength: 1 / 0,
              showHidden: !1,
              breakLength: 1 / 0,
              showProxy: !1,
              sorted: !0,
              getters: !0,
            })
          }
          var j = (function (t) {
            function e(t) {
              var r
              if (
                ((function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function')
                })(this, e),
                'object' !== y(t) || null === t)
              )
                throw new d('options', 'Object', t)
              var o = t.message,
                i = t.operator,
                c = t.stackStartFn,
                u = t.actual,
                f = t.expected,
                l = Error.stackTraceLimit
              if (((Error.stackTraceLimit = 0), null != o))
                r = a(this, p(e).call(this, String(o)))
              else if (
                (n.stderr &&
                  n.stderr.isTTY &&
                  (n.stderr &&
                  n.stderr.getColorDepth &&
                  1 !== n.stderr.getColorDepth()
                    ? ((m = '[34m'), (v = '[32m'), (w = '[39m'), (b = '[31m'))
                    : ((m = ''), (v = ''), (w = ''), (b = ''))),
                'object' === y(u) &&
                  null !== u &&
                  'object' === y(f) &&
                  null !== f &&
                  'stack' in u &&
                  u instanceof Error &&
                  'stack' in f &&
                  f instanceof Error &&
                  ((u = E(u)), (f = E(f))),
                'deepStrictEqual' === i || 'strictEqual' === i)
              )
                r = a(
                  this,
                  p(e).call(
                    this,
                    (function (t, e, r) {
                      var o = '',
                        i = '',
                        a = 0,
                        s = '',
                        c = !1,
                        u = S(t),
                        f = u.split('\n'),
                        l = S(e).split('\n'),
                        p = 0,
                        h = ''
                      if (
                        ('strictEqual' === r &&
                          'object' === y(t) &&
                          'object' === y(e) &&
                          null !== t &&
                          null !== e &&
                          (r = 'strictEqualObject'),
                        1 === f.length && 1 === l.length && f[0] !== l[0])
                      ) {
                        var d = f[0].length + l[0].length
                        if (d <= 10) {
                          if (
                            !(
                              ('object' === y(t) && null !== t) ||
                              ('object' === y(e) && null !== e) ||
                              (0 === t && 0 === e)
                            )
                          )
                            return (
                              ''.concat(O[r], '\n\n') +
                              ''.concat(f[0], ' !== ').concat(l[0], '\n')
                            )
                        } else if (
                          'strictEqualObject' !== r &&
                          d <
                            (n.stderr && n.stderr.isTTY ? n.stderr.columns : 80)
                        ) {
                          for (; f[0][p] === l[0][p]; ) p++
                          p > 2 &&
                            ((h = '\n  '.concat(
                              (function (t, e) {
                                if (
                                  ((e = Math.floor(e)), 0 == t.length || 0 == e)
                                )
                                  return ''
                                var r = t.length * e
                                for (
                                  e = Math.floor(Math.log(e) / Math.log(2));
                                  e;

                                )
                                  (t += t), e--
                                return t + t.substring(0, r - t.length)
                              })(' ', p),
                              '^'
                            )),
                            (p = 0))
                        }
                      }
                      for (
                        var E = f[f.length - 1], j = l[l.length - 1];
                        E === j &&
                        (p++ < 2 ? (s = '\n  '.concat(E).concat(s)) : (o = E),
                        f.pop(),
                        l.pop(),
                        0 !== f.length && 0 !== l.length);

                      )
                        (E = f[f.length - 1]), (j = l[l.length - 1])
                      var A = Math.max(f.length, l.length)
                      if (0 === A) {
                        var x = u.split('\n')
                        if (x.length > 30)
                          for (
                            x[26] = ''.concat(m, '...').concat(w);
                            x.length > 27;

                          )
                            x.pop()
                        return ''
                          .concat(O.notIdentical, '\n\n')
                          .concat(x.join('\n'), '\n')
                      }
                      p > 3 &&
                        ((s = '\n'.concat(m, '...').concat(w).concat(s)),
                        (c = !0)),
                        '' !== o && ((s = '\n  '.concat(o).concat(s)), (o = ''))
                      var P = 0,
                        _ =
                          O[r] +
                          '\n'
                            .concat(v, '+ actual')
                            .concat(w, ' ')
                            .concat(b, '- expected')
                            .concat(w),
                        I = ' '.concat(m, '...').concat(w, ' Lines skipped')
                      for (p = 0; p < A; p++) {
                        var R = p - a
                        if (f.length < p + 1)
                          R > 1 &&
                            p > 2 &&
                            (R > 4
                              ? ((i += '\n'.concat(m, '...').concat(w)),
                                (c = !0))
                              : R > 3 && ((i += '\n  '.concat(l[p - 2])), P++),
                            (i += '\n  '.concat(l[p - 1])),
                            P++),
                            (a = p),
                            (o += '\n'
                              .concat(b, '-')
                              .concat(w, ' ')
                              .concat(l[p])),
                            P++
                        else if (l.length < p + 1)
                          R > 1 &&
                            p > 2 &&
                            (R > 4
                              ? ((i += '\n'.concat(m, '...').concat(w)),
                                (c = !0))
                              : R > 3 && ((i += '\n  '.concat(f[p - 2])), P++),
                            (i += '\n  '.concat(f[p - 1])),
                            P++),
                            (a = p),
                            (i += '\n'
                              .concat(v, '+')
                              .concat(w, ' ')
                              .concat(f[p])),
                            P++
                        else {
                          var T = l[p],
                            N = f[p],
                            k = N !== T && (!g(N, ',') || N.slice(0, -1) !== T)
                          k &&
                            g(T, ',') &&
                            T.slice(0, -1) === N &&
                            ((k = !1), (N += ',')),
                            k
                              ? (R > 1 &&
                                  p > 2 &&
                                  (R > 4
                                    ? ((i += '\n'.concat(m, '...').concat(w)),
                                      (c = !0))
                                    : R > 3 &&
                                      ((i += '\n  '.concat(f[p - 2])), P++),
                                  (i += '\n  '.concat(f[p - 1])),
                                  P++),
                                (a = p),
                                (i += '\n'
                                  .concat(v, '+')
                                  .concat(w, ' ')
                                  .concat(N)),
                                (o += '\n'
                                  .concat(b, '-')
                                  .concat(w, ' ')
                                  .concat(T)),
                                (P += 2))
                              : ((i += o),
                                (o = ''),
                                (1 !== R && 0 !== p) ||
                                  ((i += '\n  '.concat(N)), P++))
                        }
                        if (P > 20 && p < A - 2)
                          return (
                            ''
                              .concat(_)
                              .concat(I, '\n')
                              .concat(i, '\n')
                              .concat(m, '...')
                              .concat(w)
                              .concat(o, '\n') + ''.concat(m, '...').concat(w)
                          )
                      }
                      return ''
                        .concat(_)
                        .concat(c ? I : '', '\n')
                        .concat(i)
                        .concat(o)
                        .concat(s)
                        .concat(h)
                    })(u, f, i)
                  )
                )
              else if ('notDeepStrictEqual' === i || 'notStrictEqual' === i) {
                var h = O[i],
                  j = S(u).split('\n')
                if (
                  ('notStrictEqual' === i &&
                    'object' === y(u) &&
                    null !== u &&
                    (h = O.notStrictEqualObject),
                  j.length > 30)
                )
                  for (j[26] = ''.concat(m, '...').concat(w); j.length > 27; )
                    j.pop()
                r =
                  1 === j.length
                    ? a(this, p(e).call(this, ''.concat(h, ' ').concat(j[0])))
                    : a(
                        this,
                        p(e).call(
                          this,
                          ''.concat(h, '\n\n').concat(j.join('\n'), '\n')
                        )
                      )
              } else {
                var A = S(u),
                  x = '',
                  P = O[i]
                'notDeepEqual' === i || 'notEqual' === i
                  ? (A = ''.concat(O[i], '\n\n').concat(A)).length > 1024 &&
                    (A = ''.concat(A.slice(0, 1021), '...'))
                  : ((x = ''.concat(S(f))),
                    A.length > 512 && (A = ''.concat(A.slice(0, 509), '...')),
                    x.length > 512 && (x = ''.concat(x.slice(0, 509), '...')),
                    'deepEqual' === i || 'equal' === i
                      ? (A = ''
                          .concat(P, '\n\n')
                          .concat(A, '\n\nshould equal\n\n'))
                      : (x = ' '.concat(i, ' ').concat(x))),
                  (r = a(this, p(e).call(this, ''.concat(A).concat(x))))
              }
              return (
                (Error.stackTraceLimit = l),
                (r.generatedMessage = !o),
                Object.defineProperty(s(r), 'name', {
                  value: 'AssertionError [ERR_ASSERTION]',
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                }),
                (r.code = 'ERR_ASSERTION'),
                (r.actual = u),
                (r.expected = f),
                (r.operator = i),
                Error.captureStackTrace && Error.captureStackTrace(s(r), c),
                r.stack,
                (r.name = 'AssertionError'),
                a(r)
              )
            }
            var r, c
            return (
              (function (t, e) {
                if ('function' != typeof e && null !== e)
                  throw new TypeError(
                    'Super expression must either be null or a function'
                  )
                ;(t.prototype = Object.create(e && e.prototype, {
                  constructor: { value: t, writable: !0, configurable: !0 },
                })),
                  e && l(t, e)
              })(e, t),
              (r = e),
              (c = [
                {
                  key: 'toString',
                  value: function () {
                    return ''
                      .concat(this.name, ' [')
                      .concat(this.code, ']: ')
                      .concat(this.message)
                  },
                },
                {
                  key: h.custom,
                  value: function (t, e) {
                    return h(
                      this,
                      (function (t) {
                        for (var e = 1; e < arguments.length; e++) {
                          var r = null != arguments[e] ? arguments[e] : {},
                            n = Object.keys(r)
                          'function' == typeof Object.getOwnPropertySymbols &&
                            (n = n.concat(
                              Object.getOwnPropertySymbols(r).filter(function (
                                t
                              ) {
                                return Object.getOwnPropertyDescriptor(r, t)
                                  .enumerable
                              })
                            )),
                            n.forEach(function (e) {
                              o(t, e, r[e])
                            })
                        }
                        return t
                      })({}, e, { customInspect: !1, depth: 0 })
                    )
                  },
                },
              ]) && i(r.prototype, c),
              e
            )
          })(c(Error))
          t.exports = j
        },
        2136: (t, e, r) => {
          'use strict'
          function n(t) {
            return (n =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          function o(t) {
            return (o = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
          }
          function i(t, e) {
            return (i =
              Object.setPrototypeOf ||
              function (t, e) {
                return (t.__proto__ = e), t
              })(t, e)
          }
          var a,
            s,
            c = {}
          function u(t, e, r) {
            r || (r = Error)
            var a = (function (r) {
              function a(r, i, s) {
                var c
                return (
                  (function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, a),
                  ((c = (function (t, e) {
                    return !e || ('object' !== n(e) && 'function' != typeof e)
                      ? (function (t) {
                          if (void 0 === t)
                            throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called"
                            )
                          return t
                        })(t)
                      : e
                  })(
                    this,
                    o(a).call(
                      this,
                      (function (t, r, n) {
                        return 'string' == typeof e ? e : e(t, r, n)
                      })(r, i, s)
                    )
                  )).code = t),
                  c
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function'
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                  })),
                    e && i(t, e)
                })(a, r),
                a
              )
            })(r)
            c[t] = a
          }
          function f(t, e) {
            if (Array.isArray(t)) {
              var r = t.length
              return (
                (t = t.map(function (t) {
                  return String(t)
                })),
                r > 2
                  ? 'one of '
                      .concat(e, ' ')
                      .concat(t.slice(0, r - 1).join(', '), ', or ') + t[r - 1]
                  : 2 === r
                  ? 'one of '.concat(e, ' ').concat(t[0], ' or ').concat(t[1])
                  : 'of '.concat(e, ' ').concat(t[0])
              )
            }
            return 'of '.concat(e, ' ').concat(String(t))
          }
          u(
            'ERR_AMBIGUOUS_ARGUMENT',
            'The "%s" argument is ambiguous. %s',
            TypeError
          ),
            u(
              'ERR_INVALID_ARG_TYPE',
              function (t, e, o) {
                var i, s, c, u, l
                if (
                  (void 0 === a && (a = r(9282)),
                  a('string' == typeof t, "'name' must be a string"),
                  'string' == typeof e &&
                  ((s = 'not '), e.substr(0, s.length) === s)
                    ? ((i = 'must not be'), (e = e.replace(/^not /, '')))
                    : (i = 'must be'),
                  (function (t, e, r) {
                    return (
                      (void 0 === r || r > t.length) && (r = t.length),
                      t.substring(r - e.length, r) === e
                    )
                  })(t, ' argument'))
                )
                  c = 'The '.concat(t, ' ').concat(i, ' ').concat(f(e, 'type'))
                else {
                  var p =
                    ('number' != typeof l && (l = 0),
                    l + '.'.length > (u = t).length || -1 === u.indexOf('.', l)
                      ? 'argument'
                      : 'property')
                  c = 'The "'
                    .concat(t, '" ')
                    .concat(p, ' ')
                    .concat(i, ' ')
                    .concat(f(e, 'type'))
                }
                return c + '. Received type '.concat(n(o))
              },
              TypeError
            ),
            u(
              'ERR_INVALID_ARG_VALUE',
              function (t, e) {
                var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 'is invalid'
                void 0 === s && (s = r(9539))
                var o = s.inspect(e)
                return (
                  o.length > 128 && (o = ''.concat(o.slice(0, 128), '...')),
                  "The argument '"
                    .concat(t, "' ")
                    .concat(n, '. Received ')
                    .concat(o)
                )
              },
              TypeError,
              RangeError
            ),
            u(
              'ERR_INVALID_RETURN_VALUE',
              function (t, e, r) {
                var o
                return (
                  (o =
                    r && r.constructor && r.constructor.name
                      ? 'instance of '.concat(r.constructor.name)
                      : 'type '.concat(n(r))),
                  'Expected '
                    .concat(t, ' to be returned from the "')
                    .concat(e, '"') + ' function but got '.concat(o, '.')
                )
              },
              TypeError
            ),
            u(
              'ERR_MISSING_ARGS',
              function () {
                for (
                  var t = arguments.length, e = new Array(t), n = 0;
                  n < t;
                  n++
                )
                  e[n] = arguments[n]
                void 0 === a && (a = r(9282)),
                  a(e.length > 0, 'At least one arg needs to be specified')
                var o = 'The ',
                  i = e.length
                switch (
                  ((e = e.map(function (t) {
                    return '"'.concat(t, '"')
                  })),
                  i)
                ) {
                  case 1:
                    o += ''.concat(e[0], ' argument')
                    break
                  case 2:
                    o += ''.concat(e[0], ' and ').concat(e[1], ' arguments')
                    break
                  default:
                    ;(o += e.slice(0, i - 1).join(', ')),
                      (o += ', and '.concat(e[i - 1], ' arguments'))
                }
                return ''.concat(o, ' must be specified')
              },
              TypeError
            ),
            (t.exports.codes = c)
        },
        9158: (t, e, r) => {
          'use strict'
          function n(t, e) {
            return (
              (function (t) {
                if (Array.isArray(t)) return t
              })(t) ||
              (function (t, e) {
                var r = [],
                  n = !0,
                  o = !1,
                  i = void 0
                try {
                  for (
                    var a, s = t[Symbol.iterator]();
                    !(n = (a = s.next()).done) &&
                    (r.push(a.value), !e || r.length !== e);
                    n = !0
                  );
                } catch (t) {
                  ;(o = !0), (i = t)
                } finally {
                  try {
                    n || null == s.return || s.return()
                  } finally {
                    if (o) throw i
                  }
                }
                return r
              })(t, e) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              })()
            )
          }
          function o(t) {
            return (o =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  })(t)
          }
          var i = void 0 !== /a/g.flags,
            a = function (t) {
              var e = []
              return (
                t.forEach(function (t) {
                  return e.push(t)
                }),
                e
              )
            },
            s = function (t) {
              var e = []
              return (
                t.forEach(function (t, r) {
                  return e.push([r, t])
                }),
                e
              )
            },
            c = Object.is ? Object.is : r(609),
            u = Object.getOwnPropertySymbols
              ? Object.getOwnPropertySymbols
              : function () {
                  return []
                },
            f = Number.isNaN ? Number.isNaN : r(360)
          function l(t) {
            return t.call.bind(t)
          }
          var p = l(Object.prototype.hasOwnProperty),
            y = l(Object.prototype.propertyIsEnumerable),
            h = l(Object.prototype.toString),
            d = r(9539).types,
            g = d.isAnyArrayBuffer,
            m = d.isArrayBufferView,
            v = d.isDate,
            b = d.isMap,
            w = d.isRegExp,
            O = d.isSet,
            E = d.isNativeError,
            S = d.isBoxedPrimitive,
            j = d.isNumberObject,
            A = d.isStringObject,
            x = d.isBooleanObject,
            P = d.isBigIntObject,
            _ = d.isSymbolObject,
            I = d.isFloat32Array,
            R = d.isFloat64Array
          function T(t) {
            if (0 === t.length || t.length > 10) return !0
            for (var e = 0; e < t.length; e++) {
              var r = t.charCodeAt(e)
              if (r < 48 || r > 57) return !0
            }
            return 10 === t.length && t >= Math.pow(2, 32)
          }
          function N(t) {
            return Object.keys(t)
              .filter(T)
              .concat(
                u(t).filter(Object.prototype.propertyIsEnumerable.bind(t))
              )
          }
          function k(t, e) {
            if (t === e) return 0
            for (
              var r = t.length, n = e.length, o = 0, i = Math.min(r, n);
              o < i;
              ++o
            )
              if (t[o] !== e[o]) {
                ;(r = t[o]), (n = e[o])
                break
              }
            return r < n ? -1 : n < r ? 1 : 0
          }
          function U(t, e, r, n) {
            if (t === e) return 0 !== t || !r || c(t, e)
            if (r) {
              if ('object' !== o(t)) return 'number' == typeof t && f(t) && f(e)
              if ('object' !== o(e) || null === t || null === e) return !1
              if (Object.getPrototypeOf(t) !== Object.getPrototypeOf(e))
                return !1
            } else {
              if (null === t || 'object' !== o(t))
                return (null === e || 'object' !== o(e)) && t == e
              if (null === e || 'object' !== o(e)) return !1
            }
            var a,
              s,
              u,
              l,
              p = h(t)
            if (p !== h(e)) return !1
            if (Array.isArray(t)) {
              if (t.length !== e.length) return !1
              var y = N(t),
                d = N(e)
              return y.length === d.length && L(t, e, r, n, 1, y)
            }
            if ('[object Object]' === p && ((!b(t) && b(e)) || (!O(t) && O(e))))
              return !1
            if (v(t)) {
              if (
                !v(e) ||
                Date.prototype.getTime.call(t) !==
                  Date.prototype.getTime.call(e)
              )
                return !1
            } else if (w(t)) {
              if (
                !w(e) ||
                ((u = t),
                (l = e),
                !(i
                  ? u.source === l.source && u.flags === l.flags
                  : RegExp.prototype.toString.call(u) ===
                    RegExp.prototype.toString.call(l)))
              )
                return !1
            } else if (E(t) || t instanceof Error) {
              if (t.message !== e.message || t.name !== e.name) return !1
            } else {
              if (m(t)) {
                if (r || (!I(t) && !R(t))) {
                  if (
                    !(function (t, e) {
                      return (
                        t.byteLength === e.byteLength &&
                        0 ===
                          k(
                            new Uint8Array(
                              t.buffer,
                              t.byteOffset,
                              t.byteLength
                            ),
                            new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
                          )
                      )
                    })(t, e)
                  )
                    return !1
                } else if (
                  !(function (t, e) {
                    if (t.byteLength !== e.byteLength) return !1
                    for (var r = 0; r < t.byteLength; r++)
                      if (t[r] !== e[r]) return !1
                    return !0
                  })(t, e)
                )
                  return !1
                var T = N(t),
                  U = N(e)
                return T.length === U.length && L(t, e, r, n, 0, T)
              }
              if (O(t)) return !(!O(e) || t.size !== e.size) && L(t, e, r, n, 2)
              if (b(t)) return !(!b(e) || t.size !== e.size) && L(t, e, r, n, 3)
              if (g(t)) {
                if (
                  ((s = e),
                  (a = t).byteLength !== s.byteLength ||
                    0 !== k(new Uint8Array(a), new Uint8Array(s)))
                )
                  return !1
              } else if (
                S(t) &&
                !(function (t, e) {
                  return j(t)
                    ? j(e) &&
                        c(
                          Number.prototype.valueOf.call(t),
                          Number.prototype.valueOf.call(e)
                        )
                    : A(t)
                    ? A(e) &&
                      String.prototype.valueOf.call(t) ===
                        String.prototype.valueOf.call(e)
                    : x(t)
                    ? x(e) &&
                      Boolean.prototype.valueOf.call(t) ===
                        Boolean.prototype.valueOf.call(e)
                    : P(t)
                    ? P(e) &&
                      BigInt.prototype.valueOf.call(t) ===
                        BigInt.prototype.valueOf.call(e)
                    : _(e) &&
                      Symbol.prototype.valueOf.call(t) ===
                        Symbol.prototype.valueOf.call(e)
                })(t, e)
              )
                return !1
            }
            return L(t, e, r, n, 0)
          }
          function F(t, e) {
            return e.filter(function (e) {
              return y(t, e)
            })
          }
          function L(t, e, r, n, o, i) {
            if (5 === arguments.length) {
              i = Object.keys(t)
              var a = Object.keys(e)
              if (i.length !== a.length) return !1
            }
            for (var s = 0; s < i.length; s++) if (!p(e, i[s])) return !1
            if (r && 5 === arguments.length) {
              var c = u(t)
              if (0 !== c.length) {
                var f = 0
                for (s = 0; s < c.length; s++) {
                  var l = c[s]
                  if (y(t, l)) {
                    if (!y(e, l)) return !1
                    i.push(l), f++
                  } else if (y(e, l)) return !1
                }
                var h = u(e)
                if (c.length !== h.length && F(e, h).length !== f) return !1
              } else {
                var d = u(e)
                if (0 !== d.length && 0 !== F(e, d).length) return !1
              }
            }
            if (
              0 === i.length &&
              (0 === o || (1 === o && 0 === t.length) || 0 === t.size)
            )
              return !0
            if (void 0 === n)
              n = { val1: new Map(), val2: new Map(), position: 0 }
            else {
              var g = n.val1.get(t)
              if (void 0 !== g) {
                var m = n.val2.get(e)
                if (void 0 !== m) return g === m
              }
              n.position++
            }
            n.val1.set(t, n.position), n.val2.set(e, n.position)
            var v = $(t, e, r, i, n, o)
            return n.val1.delete(t), n.val2.delete(e), v
          }
          function D(t, e, r, n) {
            for (var o = a(t), i = 0; i < o.length; i++) {
              var s = o[i]
              if (U(e, s, r, n)) return t.delete(s), !0
            }
            return !1
          }
          function q(t) {
            switch (o(t)) {
              case 'undefined':
                return null
              case 'object':
                return
              case 'symbol':
                return !1
              case 'string':
                t = +t
              case 'number':
                if (f(t)) return !1
            }
            return !0
          }
          function M(t, e, r) {
            var n = q(r)
            return null != n ? n : e.has(n) && !t.has(n)
          }
          function C(t, e, r, n, o) {
            var i = q(r)
            if (null != i) return i
            var a = e.get(i)
            return (
              !((void 0 === a && !e.has(i)) || !U(n, a, !1, o)) &&
              !t.has(i) &&
              U(n, a, !1, o)
            )
          }
          function B(t, e, r, n, o, i) {
            for (var s = a(t), c = 0; c < s.length; c++) {
              var u = s[c]
              if (U(r, u, o, i) && U(n, e.get(u), o, i)) return t.delete(u), !0
            }
            return !1
          }
          function $(t, e, r, i, c, u) {
            var f = 0
            if (2 === u) {
              if (
                !(function (t, e, r, n) {
                  for (var i = null, s = a(t), c = 0; c < s.length; c++) {
                    var u = s[c]
                    if ('object' === o(u) && null !== u)
                      null === i && (i = new Set()), i.add(u)
                    else if (!e.has(u)) {
                      if (r) return !1
                      if (!M(t, e, u)) return !1
                      null === i && (i = new Set()), i.add(u)
                    }
                  }
                  if (null !== i) {
                    for (var f = a(e), l = 0; l < f.length; l++) {
                      var p = f[l]
                      if ('object' === o(p) && null !== p) {
                        if (!D(i, p, r, n)) return !1
                      } else if (!r && !t.has(p) && !D(i, p, r, n)) return !1
                    }
                    return 0 === i.size
                  }
                  return !0
                })(t, e, r, c)
              )
                return !1
            } else if (3 === u) {
              if (
                !(function (t, e, r, i) {
                  for (var a = null, c = s(t), u = 0; u < c.length; u++) {
                    var f = n(c[u], 2),
                      l = f[0],
                      p = f[1]
                    if ('object' === o(l) && null !== l)
                      null === a && (a = new Set()), a.add(l)
                    else {
                      var y = e.get(l)
                      if ((void 0 === y && !e.has(l)) || !U(p, y, r, i)) {
                        if (r) return !1
                        if (!C(t, e, l, p, i)) return !1
                        null === a && (a = new Set()), a.add(l)
                      }
                    }
                  }
                  if (null !== a) {
                    for (var h = s(e), d = 0; d < h.length; d++) {
                      var g = n(h[d], 2),
                        m = ((l = g[0]), g[1])
                      if ('object' === o(l) && null !== l) {
                        if (!B(a, t, l, m, r, i)) return !1
                      } else if (
                        !(
                          r ||
                          (t.has(l) && U(t.get(l), m, !1, i)) ||
                          B(a, t, l, m, !1, i)
                        )
                      )
                        return !1
                    }
                    return 0 === a.size
                  }
                  return !0
                })(t, e, r, c)
              )
                return !1
            } else if (1 === u)
              for (; f < t.length; f++) {
                if (!p(t, f)) {
                  if (p(e, f)) return !1
                  for (var l = Object.keys(t); f < l.length; f++) {
                    var y = l[f]
                    if (!p(e, y) || !U(t[y], e[y], r, c)) return !1
                  }
                  return l.length === Object.keys(e).length
                }
                if (!p(e, f) || !U(t[f], e[f], r, c)) return !1
              }
            for (f = 0; f < i.length; f++) {
              var h = i[f]
              if (!U(t[h], e[h], r, c)) return !1
            }
            return !0
          }
          t.exports = {
            isDeepEqual: function (t, e) {
              return U(t, e, !1)
            },
            isDeepStrictEqual: function (t, e) {
              return U(t, e, !0)
            },
          }
        },
        6314: (t, e, r) => {
          'use strict'
          var n = r(2190)
          t.exports = function () {
            return n(
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
              function (t) {
                return 'function' == typeof r.g[t]
              }
            )
          }
        },
        9669: (t, e, r) => {
          t.exports = r(1609)
        },
        5448: (t, e, r) => {
          'use strict'
          var n = r(4867),
            o = r(6026),
            i = r(4372),
            a = r(5327),
            s = r(4097),
            c = r(4109),
            u = r(7985),
            f = r(5061)
          t.exports = function (t) {
            return new Promise(function (e, r) {
              var l = t.data,
                p = t.headers
              n.isFormData(l) && delete p['Content-Type']
              var y = new XMLHttpRequest()
              if (t.auth) {
                var h = t.auth.username || '',
                  d = t.auth.password
                    ? unescape(encodeURIComponent(t.auth.password))
                    : ''
                p.Authorization = 'Basic ' + btoa(h + ':' + d)
              }
              var g = s(t.baseURL, t.url)
              if (
                (y.open(
                  t.method.toUpperCase(),
                  a(g, t.params, t.paramsSerializer),
                  !0
                ),
                (y.timeout = t.timeout),
                (y.onreadystatechange = function () {
                  if (
                    y &&
                    4 === y.readyState &&
                    (0 !== y.status ||
                      (y.responseURL && 0 === y.responseURL.indexOf('file:')))
                  ) {
                    var n =
                        'getAllResponseHeaders' in y
                          ? c(y.getAllResponseHeaders())
                          : null,
                      i = {
                        data:
                          t.responseType && 'text' !== t.responseType
                            ? y.response
                            : y.responseText,
                        status: y.status,
                        statusText: y.statusText,
                        headers: n,
                        config: t,
                        request: y,
                      }
                    o(e, r, i), (y = null)
                  }
                }),
                (y.onabort = function () {
                  y &&
                    (r(f('Request aborted', t, 'ECONNABORTED', y)), (y = null))
                }),
                (y.onerror = function () {
                  r(f('Network Error', t, null, y)), (y = null)
                }),
                (y.ontimeout = function () {
                  var e = 'timeout of ' + t.timeout + 'ms exceeded'
                  t.timeoutErrorMessage && (e = t.timeoutErrorMessage),
                    r(f(e, t, 'ECONNABORTED', y)),
                    (y = null)
                }),
                n.isStandardBrowserEnv())
              ) {
                var m =
                  (t.withCredentials || u(g)) && t.xsrfCookieName
                    ? i.read(t.xsrfCookieName)
                    : void 0
                m && (p[t.xsrfHeaderName] = m)
              }
              if (
                ('setRequestHeader' in y &&
                  n.forEach(p, function (t, e) {
                    void 0 === l && 'content-type' === e.toLowerCase()
                      ? delete p[e]
                      : y.setRequestHeader(e, t)
                  }),
                n.isUndefined(t.withCredentials) ||
                  (y.withCredentials = !!t.withCredentials),
                t.responseType)
              )
                try {
                  y.responseType = t.responseType
                } catch (e) {
                  if ('json' !== t.responseType) throw e
                }
              'function' == typeof t.onDownloadProgress &&
                y.addEventListener('progress', t.onDownloadProgress),
                'function' == typeof t.onUploadProgress &&
                  y.upload &&
                  y.upload.addEventListener('progress', t.onUploadProgress),
                t.cancelToken &&
                  t.cancelToken.promise.then(function (t) {
                    y && (y.abort(), r(t), (y = null))
                  }),
                l || (l = null),
                y.send(l)
            })
          }
        },
        1609: (t, e, r) => {
          'use strict'
          var n = r(4867),
            o = r(1849),
            i = r(321),
            a = r(7185)
          function s(t) {
            var e = new i(t),
              r = o(i.prototype.request, e)
            return n.extend(r, i.prototype, e), n.extend(r, e), r
          }
          var c = s(r(5655))
          ;(c.Axios = i),
            (c.create = function (t) {
              return s(a(c.defaults, t))
            }),
            (c.Cancel = r(5263)),
            (c.CancelToken = r(4972)),
            (c.isCancel = r(6502)),
            (c.all = function (t) {
              return Promise.all(t)
            }),
            (c.spread = r(8713)),
            (c.isAxiosError = r(6268)),
            (t.exports = c),
            (t.exports.default = c)
        },
        5263: (t) => {
          'use strict'
          function e(t) {
            this.message = t
          }
          ;(e.prototype.toString = function () {
            return 'Cancel' + (this.message ? ': ' + this.message : '')
          }),
            (e.prototype.__CANCEL__ = !0),
            (t.exports = e)
        },
        4972: (t, e, r) => {
          'use strict'
          var n = r(5263)
          function o(t) {
            if ('function' != typeof t)
              throw new TypeError('executor must be a function.')
            var e
            this.promise = new Promise(function (t) {
              e = t
            })
            var r = this
            t(function (t) {
              r.reason || ((r.reason = new n(t)), e(r.reason))
            })
          }
          ;(o.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason
          }),
            (o.source = function () {
              var t
              return {
                token: new o(function (e) {
                  t = e
                }),
                cancel: t,
              }
            }),
            (t.exports = o)
        },
        6502: (t) => {
          'use strict'
          t.exports = function (t) {
            return !(!t || !t.__CANCEL__)
          }
        },
        321: (t, e, r) => {
          'use strict'
          var n = r(4867),
            o = r(5327),
            i = r(782),
            a = r(3572),
            s = r(7185)
          function c(t) {
            ;(this.defaults = t),
              (this.interceptors = { request: new i(), response: new i() })
          }
          ;(c.prototype.request = function (t) {
            'string' == typeof t
              ? ((t = arguments[1] || {}).url = arguments[0])
              : (t = t || {}),
              (t = s(this.defaults, t)).method
                ? (t.method = t.method.toLowerCase())
                : this.defaults.method
                ? (t.method = this.defaults.method.toLowerCase())
                : (t.method = 'get')
            var e = [a, void 0],
              r = Promise.resolve(t)
            for (
              this.interceptors.request.forEach(function (t) {
                e.unshift(t.fulfilled, t.rejected)
              }),
                this.interceptors.response.forEach(function (t) {
                  e.push(t.fulfilled, t.rejected)
                });
              e.length;

            )
              r = r.then(e.shift(), e.shift())
            return r
          }),
            (c.prototype.getUri = function (t) {
              return (
                (t = s(this.defaults, t)),
                o(t.url, t.params, t.paramsSerializer).replace(/^\?/, '')
              )
            }),
            n.forEach(['delete', 'get', 'head', 'options'], function (t) {
              c.prototype[t] = function (e, r) {
                return this.request(
                  s(r || {}, { method: t, url: e, data: (r || {}).data })
                )
              }
            }),
            n.forEach(['post', 'put', 'patch'], function (t) {
              c.prototype[t] = function (e, r, n) {
                return this.request(s(n || {}, { method: t, url: e, data: r }))
              }
            }),
            (t.exports = c)
        },
        782: (t, e, r) => {
          'use strict'
          var n = r(4867)
          function o() {
            this.handlers = []
          }
          ;(o.prototype.use = function (t, e) {
            return (
              this.handlers.push({ fulfilled: t, rejected: e }),
              this.handlers.length - 1
            )
          }),
            (o.prototype.eject = function (t) {
              this.handlers[t] && (this.handlers[t] = null)
            }),
            (o.prototype.forEach = function (t) {
              n.forEach(this.handlers, function (e) {
                null !== e && t(e)
              })
            }),
            (t.exports = o)
        },
        4097: (t, e, r) => {
          'use strict'
          var n = r(1793),
            o = r(7303)
          t.exports = function (t, e) {
            return t && !n(e) ? o(t, e) : e
          }
        },
        5061: (t, e, r) => {
          'use strict'
          var n = r(481)
          t.exports = function (t, e, r, o, i) {
            var a = new Error(t)
            return n(a, e, r, o, i)
          }
        },
        3572: (t, e, r) => {
          'use strict'
          var n = r(4867),
            o = r(8527),
            i = r(6502),
            a = r(5655)
          function s(t) {
            t.cancelToken && t.cancelToken.throwIfRequested()
          }
          t.exports = function (t) {
            return (
              s(t),
              (t.headers = t.headers || {}),
              (t.data = o(t.data, t.headers, t.transformRequest)),
              (t.headers = n.merge(
                t.headers.common || {},
                t.headers[t.method] || {},
                t.headers
              )),
              n.forEach(
                ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
                function (e) {
                  delete t.headers[e]
                }
              ),
              (t.adapter || a.adapter)(t).then(
                function (e) {
                  return (
                    s(t),
                    (e.data = o(e.data, e.headers, t.transformResponse)),
                    e
                  )
                },
                function (e) {
                  return (
                    i(e) ||
                      (s(t),
                      e &&
                        e.response &&
                        (e.response.data = o(
                          e.response.data,
                          e.response.headers,
                          t.transformResponse
                        ))),
                    Promise.reject(e)
                  )
                }
              )
            )
          }
        },
        481: (t) => {
          'use strict'
          t.exports = function (t, e, r, n, o) {
            return (
              (t.config = e),
              r && (t.code = r),
              (t.request = n),
              (t.response = o),
              (t.isAxiosError = !0),
              (t.toJSON = function () {
                return {
                  message: this.message,
                  name: this.name,
                  description: this.description,
                  number: this.number,
                  fileName: this.fileName,
                  lineNumber: this.lineNumber,
                  columnNumber: this.columnNumber,
                  stack: this.stack,
                  config: this.config,
                  code: this.code,
                }
              }),
              t
            )
          }
        },
        7185: (t, e, r) => {
          'use strict'
          var n = r(4867)
          t.exports = function (t, e) {
            e = e || {}
            var r = {},
              o = ['url', 'method', 'data'],
              i = ['headers', 'auth', 'proxy', 'params'],
              a = [
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
              ],
              s = ['validateStatus']
            function c(t, e) {
              return n.isPlainObject(t) && n.isPlainObject(e)
                ? n.merge(t, e)
                : n.isPlainObject(e)
                ? n.merge({}, e)
                : n.isArray(e)
                ? e.slice()
                : e
            }
            function u(o) {
              n.isUndefined(e[o])
                ? n.isUndefined(t[o]) || (r[o] = c(void 0, t[o]))
                : (r[o] = c(t[o], e[o]))
            }
            n.forEach(o, function (t) {
              n.isUndefined(e[t]) || (r[t] = c(void 0, e[t]))
            }),
              n.forEach(i, u),
              n.forEach(a, function (o) {
                n.isUndefined(e[o])
                  ? n.isUndefined(t[o]) || (r[o] = c(void 0, t[o]))
                  : (r[o] = c(void 0, e[o]))
              }),
              n.forEach(s, function (n) {
                n in e
                  ? (r[n] = c(t[n], e[n]))
                  : n in t && (r[n] = c(void 0, t[n]))
              })
            var f = o.concat(i).concat(a).concat(s),
              l = Object.keys(t)
                .concat(Object.keys(e))
                .filter(function (t) {
                  return -1 === f.indexOf(t)
                })
            return n.forEach(l, u), r
          }
        },
        6026: (t, e, r) => {
          'use strict'
          var n = r(5061)
          t.exports = function (t, e, r) {
            var o = r.config.validateStatus
            r.status && o && !o(r.status)
              ? e(
                  n(
                    'Request failed with status code ' + r.status,
                    r.config,
                    null,
                    r.request,
                    r
                  )
                )
              : t(r)
          }
        },
        8527: (t, e, r) => {
          'use strict'
          var n = r(4867)
          t.exports = function (t, e, r) {
            return (
              n.forEach(r, function (r) {
                t = r(t, e)
              }),
              t
            )
          }
        },
        5655: (t, e, r) => {
          'use strict'
          var n = r(4155),
            o = r(4867),
            i = r(6016),
            a = { 'Content-Type': 'application/x-www-form-urlencoded' }
          function s(t, e) {
            !o.isUndefined(t) &&
              o.isUndefined(t['Content-Type']) &&
              (t['Content-Type'] = e)
          }
          var c,
            u = {
              adapter:
                (('undefined' != typeof XMLHttpRequest ||
                  (void 0 !== n &&
                    '[object process]' ===
                      Object.prototype.toString.call(n))) &&
                  (c = r(5448)),
                c),
              transformRequest: [
                function (t, e) {
                  return (
                    i(e, 'Accept'),
                    i(e, 'Content-Type'),
                    o.isFormData(t) ||
                    o.isArrayBuffer(t) ||
                    o.isBuffer(t) ||
                    o.isStream(t) ||
                    o.isFile(t) ||
                    o.isBlob(t)
                      ? t
                      : o.isArrayBufferView(t)
                      ? t.buffer
                      : o.isURLSearchParams(t)
                      ? (s(
                          e,
                          'application/x-www-form-urlencoded;charset=utf-8'
                        ),
                        t.toString())
                      : o.isObject(t)
                      ? (s(e, 'application/json;charset=utf-8'),
                        JSON.stringify(t))
                      : t
                  )
                },
              ],
              transformResponse: [
                function (t) {
                  if ('string' == typeof t)
                    try {
                      t = JSON.parse(t)
                    } catch (t) {}
                  return t
                },
              ],
              timeout: 0,
              xsrfCookieName: 'XSRF-TOKEN',
              xsrfHeaderName: 'X-XSRF-TOKEN',
              maxContentLength: -1,
              maxBodyLength: -1,
              validateStatus: function (t) {
                return t >= 200 && t < 300
              },
              headers: {
                common: { Accept: 'application/json, text/plain, */*' },
              },
            }
          o.forEach(['delete', 'get', 'head'], function (t) {
            u.headers[t] = {}
          }),
            o.forEach(['post', 'put', 'patch'], function (t) {
              u.headers[t] = o.merge(a)
            }),
            (t.exports = u)
        },
        1849: (t) => {
          'use strict'
          t.exports = function (t, e) {
            return function () {
              for (
                var r = new Array(arguments.length), n = 0;
                n < r.length;
                n++
              )
                r[n] = arguments[n]
              return t.apply(e, r)
            }
          }
        },
        5327: (t, e, r) => {
          'use strict'
          var n = r(4867)
          function o(t) {
            return encodeURIComponent(t)
              .replace(/%3A/gi, ':')
              .replace(/%24/g, '$')
              .replace(/%2C/gi, ',')
              .replace(/%20/g, '+')
              .replace(/%5B/gi, '[')
              .replace(/%5D/gi, ']')
          }
          t.exports = function (t, e, r) {
            if (!e) return t
            var i
            if (r) i = r(e)
            else if (n.isURLSearchParams(e)) i = e.toString()
            else {
              var a = []
              n.forEach(e, function (t, e) {
                null != t &&
                  (n.isArray(t) ? (e += '[]') : (t = [t]),
                  n.forEach(t, function (t) {
                    n.isDate(t)
                      ? (t = t.toISOString())
                      : n.isObject(t) && (t = JSON.stringify(t)),
                      a.push(o(e) + '=' + o(t))
                  }))
              }),
                (i = a.join('&'))
            }
            if (i) {
              var s = t.indexOf('#')
              ;-1 !== s && (t = t.slice(0, s)),
                (t += (-1 === t.indexOf('?') ? '?' : '&') + i)
            }
            return t
          }
        },
        7303: (t) => {
          'use strict'
          t.exports = function (t, e) {
            return e ? t.replace(/\/+$/, '') + '/' + e.replace(/^\/+/, '') : t
          }
        },
        4372: (t, e, r) => {
          'use strict'
          var n = r(4867)
          t.exports = n.isStandardBrowserEnv()
            ? {
                write: function (t, e, r, o, i, a) {
                  var s = []
                  s.push(t + '=' + encodeURIComponent(e)),
                    n.isNumber(r) &&
                      s.push('expires=' + new Date(r).toGMTString()),
                    n.isString(o) && s.push('path=' + o),
                    n.isString(i) && s.push('domain=' + i),
                    !0 === a && s.push('secure'),
                    (document.cookie = s.join('; '))
                },
                read: function (t) {
                  var e = document.cookie.match(
                    new RegExp('(^|;\\s*)(' + t + ')=([^;]*)')
                  )
                  return e ? decodeURIComponent(e[3]) : null
                },
                remove: function (t) {
                  this.write(t, '', Date.now() - 864e5)
                },
              }
            : {
                write: function () {},
                read: function () {
                  return null
                },
                remove: function () {},
              }
        },
        1793: (t) => {
          'use strict'
          t.exports = function (t) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
          }
        },
        6268: (t) => {
          'use strict'
          t.exports = function (t) {
            return 'object' == typeof t && !0 === t.isAxiosError
          }
        },
        7985: (t, e, r) => {
          'use strict'
          var n = r(4867)
          t.exports = n.isStandardBrowserEnv()
            ? (function () {
                var t,
                  e = /(msie|trident)/i.test(navigator.userAgent),
                  r = document.createElement('a')
                function o(t) {
                  var n = t
                  return (
                    e && (r.setAttribute('href', n), (n = r.href)),
                    r.setAttribute('href', n),
                    {
                      href: r.href,
                      protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
                      host: r.host,
                      search: r.search ? r.search.replace(/^\?/, '') : '',
                      hash: r.hash ? r.hash.replace(/^#/, '') : '',
                      hostname: r.hostname,
                      port: r.port,
                      pathname:
                        '/' === r.pathname.charAt(0)
                          ? r.pathname
                          : '/' + r.pathname,
                    }
                  )
                }
                return (
                  (t = o(window.location.href)),
                  function (e) {
                    var r = n.isString(e) ? o(e) : e
                    return r.protocol === t.protocol && r.host === t.host
                  }
                )
              })()
            : function () {
                return !0
              }
        },
        6016: (t, e, r) => {
          'use strict'
          var n = r(4867)
          t.exports = function (t, e) {
            n.forEach(t, function (r, n) {
              n !== e &&
                n.toUpperCase() === e.toUpperCase() &&
                ((t[e] = r), delete t[n])
            })
          }
        },
        4109: (t, e, r) => {
          'use strict'
          var n = r(4867),
            o = [
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
          t.exports = function (t) {
            var e,
              r,
              i,
              a = {}
            return t
              ? (n.forEach(t.split('\n'), function (t) {
                  if (
                    ((i = t.indexOf(':')),
                    (e = n.trim(t.substr(0, i)).toLowerCase()),
                    (r = n.trim(t.substr(i + 1))),
                    e)
                  ) {
                    if (a[e] && o.indexOf(e) >= 0) return
                    a[e] =
                      'set-cookie' === e
                        ? (a[e] ? a[e] : []).concat([r])
                        : a[e]
                        ? a[e] + ', ' + r
                        : r
                  }
                }),
                a)
              : a
          }
        },
        8713: (t) => {
          'use strict'
          t.exports = function (t) {
            return function (e) {
              return t.apply(null, e)
            }
          }
        },
        4867: (t, e, r) => {
          'use strict'
          var n = r(1849),
            o = Object.prototype.toString
          function i(t) {
            return '[object Array]' === o.call(t)
          }
          function a(t) {
            return void 0 === t
          }
          function s(t) {
            return null !== t && 'object' == typeof t
          }
          function c(t) {
            if ('[object Object]' !== o.call(t)) return !1
            var e = Object.getPrototypeOf(t)
            return null === e || e === Object.prototype
          }
          function u(t) {
            return '[object Function]' === o.call(t)
          }
          function f(t, e) {
            if (null != t)
              if (('object' != typeof t && (t = [t]), i(t)))
                for (var r = 0, n = t.length; r < n; r++)
                  e.call(null, t[r], r, t)
              else
                for (var o in t)
                  Object.prototype.hasOwnProperty.call(t, o) &&
                    e.call(null, t[o], o, t)
          }
          t.exports = {
            isArray: i,
            isArrayBuffer: function (t) {
              return '[object ArrayBuffer]' === o.call(t)
            },
            isBuffer: function (t) {
              return (
                null !== t &&
                !a(t) &&
                null !== t.constructor &&
                !a(t.constructor) &&
                'function' == typeof t.constructor.isBuffer &&
                t.constructor.isBuffer(t)
              )
            },
            isFormData: function (t) {
              return 'undefined' != typeof FormData && t instanceof FormData
            },
            isArrayBufferView: function (t) {
              return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                ? ArrayBuffer.isView(t)
                : t && t.buffer && t.buffer instanceof ArrayBuffer
            },
            isString: function (t) {
              return 'string' == typeof t
            },
            isNumber: function (t) {
              return 'number' == typeof t
            },
            isObject: s,
            isPlainObject: c,
            isUndefined: a,
            isDate: function (t) {
              return '[object Date]' === o.call(t)
            },
            isFile: function (t) {
              return '[object File]' === o.call(t)
            },
            isBlob: function (t) {
              return '[object Blob]' === o.call(t)
            },
            isFunction: u,
            isStream: function (t) {
              return s(t) && u(t.pipe)
            },
            isURLSearchParams: function (t) {
              return (
                'undefined' != typeof URLSearchParams &&
                t instanceof URLSearchParams
              )
            },
            isStandardBrowserEnv: function () {
              return (
                ('undefined' == typeof navigator ||
                  ('ReactNative' !== navigator.product &&
                    'NativeScript' !== navigator.product &&
                    'NS' !== navigator.product)) &&
                'undefined' != typeof window &&
                'undefined' != typeof document
              )
            },
            forEach: f,
            merge: function t() {
              var e = {}
              function r(r, n) {
                c(e[n]) && c(r)
                  ? (e[n] = t(e[n], r))
                  : c(r)
                  ? (e[n] = t({}, r))
                  : i(r)
                  ? (e[n] = r.slice())
                  : (e[n] = r)
              }
              for (var n = 0, o = arguments.length; n < o; n++)
                f(arguments[n], r)
              return e
            },
            extend: function (t, e, r) {
              return (
                f(e, function (e, o) {
                  t[o] = r && 'function' == typeof e ? n(e, r) : e
                }),
                t
              )
            },
            trim: function (t) {
              return t.replace(/^\s*/, '').replace(/\s*$/, '')
            },
            stripBOM: function (t) {
              return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t
            },
          }
        },
        1924: (t, e, r) => {
          'use strict'
          var n = r(210),
            o = r(5559),
            i = o(n('String.prototype.indexOf'))
          t.exports = function (t, e) {
            var r = n(t, !!e)
            return 'function' == typeof r && i(t, '.prototype.') > -1 ? o(r) : r
          }
        },
        5559: (t, e, r) => {
          'use strict'
          var n = r(8612),
            o = r(210),
            i = o('%Function.prototype.apply%'),
            a = o('%Function.prototype.call%'),
            s = o('%Reflect.apply%', !0) || n.call(a, i),
            c = o('%Object.getOwnPropertyDescriptor%', !0),
            u = o('%Object.defineProperty%', !0),
            f = o('%Math.max%')
          if (u)
            try {
              u({}, 'a', { value: 1 })
            } catch (t) {
              u = null
            }
          t.exports = function (t) {
            var e = s(n, a, arguments)
            if (c && u) {
              var r = c(e, 'length')
              r.configurable &&
                u(e, 'length', {
                  value: 1 + f(0, t.length - (arguments.length - 1)),
                })
            }
            return e
          }
          var l = function () {
            return s(n, i, arguments)
          }
          u ? u(t.exports, 'apply', { value: l }) : (t.exports.apply = l)
        },
        5108: (t, e, r) => {
          var n = r(9539),
            o = r(9282)
          function i() {
            return new Date().getTime()
          }
          var a,
            s = Array.prototype.slice,
            c = {}
          a =
            void 0 !== r.g && r.g.console
              ? r.g.console
              : 'undefined' != typeof window && window.console
              ? window.console
              : {}
          for (
            var u = [
                [function () {}, 'log'],
                [
                  function () {
                    a.log.apply(a, arguments)
                  },
                  'info',
                ],
                [
                  function () {
                    a.log.apply(a, arguments)
                  },
                  'warn',
                ],
                [
                  function () {
                    a.warn.apply(a, arguments)
                  },
                  'error',
                ],
                [
                  function (t) {
                    c[t] = i()
                  },
                  'time',
                ],
                [
                  function (t) {
                    var e = c[t]
                    if (!e) throw new Error('No such label: ' + t)
                    delete c[t]
                    var r = i() - e
                    a.log(t + ': ' + r + 'ms')
                  },
                  'timeEnd',
                ],
                [
                  function () {
                    var t = new Error()
                    ;(t.name = 'Trace'),
                      (t.message = n.format.apply(null, arguments)),
                      a.error(t.stack)
                  },
                  'trace',
                ],
                [
                  function (t) {
                    a.log(n.inspect(t) + '\n')
                  },
                  'dir',
                ],
                [
                  function (t) {
                    if (!t) {
                      var e = s.call(arguments, 1)
                      o.ok(!1, n.format.apply(null, e))
                    }
                  },
                  'assert',
                ],
              ],
              f = 0;
            f < u.length;
            f++
          ) {
            var l = u[f],
              p = l[0],
              y = l[1]
            a[y] || (a[y] = p)
          }
          t.exports = a
        },
        4289: (t, e, r) => {
          'use strict'
          var n = r(2215),
            o = 'function' == typeof Symbol && 'symbol' == typeof Symbol('foo'),
            i = Object.prototype.toString,
            a = Array.prototype.concat,
            s = Object.defineProperty,
            c =
              s &&
              (function () {
                var t = {}
                try {
                  for (var e in (s(t, 'x', { enumerable: !1, value: t }), t))
                    return !1
                  return t.x === t
                } catch (t) {
                  return !1
                }
              })(),
            u = function (t, e, r, n) {
              var o
              ;(!(e in t) ||
                ('function' == typeof (o = n) &&
                  '[object Function]' === i.call(o) &&
                  n())) &&
                (c
                  ? s(t, e, {
                      configurable: !0,
                      enumerable: !1,
                      value: r,
                      writable: !0,
                    })
                  : (t[e] = r))
            },
            f = function (t, e) {
              var r = arguments.length > 2 ? arguments[2] : {},
                i = n(e)
              o && (i = a.call(i, Object.getOwnPropertySymbols(e)))
              for (var s = 0; s < i.length; s += 1) u(t, i[s], e[i[s]], r[i[s]])
            }
          ;(f.supportsDescriptors = !!c), (t.exports = f)
        },
        4079: (t, e, r) => {
          'use strict'
          var n = r(210)('%Object.getOwnPropertyDescriptor%')
          if (n)
            try {
              n([], 'length')
            } catch (t) {
              n = null
            }
          t.exports = n
        },
        8091: (t) => {
          'use strict'
          function e(t, e) {
            if (null == t)
              throw new TypeError('Cannot convert first argument to object')
            for (var r = Object(t), n = 1; n < arguments.length; n++) {
              var o = arguments[n]
              if (null != o)
                for (
                  var i = Object.keys(Object(o)), a = 0, s = i.length;
                  a < s;
                  a++
                ) {
                  var c = i[a],
                    u = Object.getOwnPropertyDescriptor(o, c)
                  void 0 !== u && u.enumerable && (r[c] = o[c])
                }
            }
            return r
          }
          t.exports = {
            assign: e,
            polyfill: function () {
              Object.assign ||
                Object.defineProperty(Object, 'assign', {
                  enumerable: !1,
                  configurable: !0,
                  writable: !0,
                  value: e,
                })
            },
          }
        },
        7187: (t, e, r) => {
          'use strict'
          var n,
            o = r(5108),
            i = 'object' == typeof Reflect ? Reflect : null,
            a =
              i && 'function' == typeof i.apply
                ? i.apply
                : function (t, e, r) {
                    return Function.prototype.apply.call(t, e, r)
                  }
          n =
            i && 'function' == typeof i.ownKeys
              ? i.ownKeys
              : Object.getOwnPropertySymbols
              ? function (t) {
                  return Object.getOwnPropertyNames(t).concat(
                    Object.getOwnPropertySymbols(t)
                  )
                }
              : function (t) {
                  return Object.getOwnPropertyNames(t)
                }
          var s =
            Number.isNaN ||
            function (t) {
              return t != t
            }
          function c() {
            c.init.call(this)
          }
          ;(t.exports = c),
            (t.exports.once = function (t, e) {
              return new Promise(function (r, n) {
                function o(r) {
                  t.removeListener(e, i), n(r)
                }
                function i() {
                  'function' == typeof t.removeListener &&
                    t.removeListener('error', o),
                    r([].slice.call(arguments))
                }
                v(t, e, i, { once: !0 }),
                  'error' !== e &&
                    (function (t, e, r) {
                      'function' == typeof t.on &&
                        v(t, 'error', e, { once: !0 })
                    })(t, o)
              })
            }),
            (c.EventEmitter = c),
            (c.prototype._events = void 0),
            (c.prototype._eventsCount = 0),
            (c.prototype._maxListeners = void 0)
          var u = 10
          function f(t) {
            if ('function' != typeof t)
              throw new TypeError(
                'The "listener" argument must be of type Function. Received type ' +
                  typeof t
              )
          }
          function l(t) {
            return void 0 === t._maxListeners
              ? c.defaultMaxListeners
              : t._maxListeners
          }
          function p(t, e, r, n) {
            var i, a, s, c
            if (
              (f(r),
              void 0 === (a = t._events)
                ? ((a = t._events = Object.create(null)), (t._eventsCount = 0))
                : (void 0 !== a.newListener &&
                    (t.emit('newListener', e, r.listener ? r.listener : r),
                    (a = t._events)),
                  (s = a[e])),
              void 0 === s)
            )
              (s = a[e] = r), ++t._eventsCount
            else if (
              ('function' == typeof s
                ? (s = a[e] = n ? [r, s] : [s, r])
                : n
                ? s.unshift(r)
                : s.push(r),
              (i = l(t)) > 0 && s.length > i && !s.warned)
            ) {
              s.warned = !0
              var u = new Error(
                'Possible EventEmitter memory leak detected. ' +
                  s.length +
                  ' ' +
                  String(e) +
                  ' listeners added. Use emitter.setMaxListeners() to increase limit'
              )
              ;(u.name = 'MaxListenersExceededWarning'),
                (u.emitter = t),
                (u.type = e),
                (u.count = s.length),
                (c = u),
                o && o.warn && o.warn(c)
            }
            return t
          }
          function y() {
            if (!this.fired)
              return (
                this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                0 === arguments.length
                  ? this.listener.call(this.target)
                  : this.listener.apply(this.target, arguments)
              )
          }
          function h(t, e, r) {
            var n = {
                fired: !1,
                wrapFn: void 0,
                target: t,
                type: e,
                listener: r,
              },
              o = y.bind(n)
            return (o.listener = r), (n.wrapFn = o), o
          }
          function d(t, e, r) {
            var n = t._events
            if (void 0 === n) return []
            var o = n[e]
            return void 0 === o
              ? []
              : 'function' == typeof o
              ? r
                ? [o.listener || o]
                : [o]
              : r
              ? (function (t) {
                  for (var e = new Array(t.length), r = 0; r < e.length; ++r)
                    e[r] = t[r].listener || t[r]
                  return e
                })(o)
              : m(o, o.length)
          }
          function g(t) {
            var e = this._events
            if (void 0 !== e) {
              var r = e[t]
              if ('function' == typeof r) return 1
              if (void 0 !== r) return r.length
            }
            return 0
          }
          function m(t, e) {
            for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n]
            return r
          }
          function v(t, e, r, n) {
            if ('function' == typeof t.on) n.once ? t.once(e, r) : t.on(e, r)
            else {
              if ('function' != typeof t.addEventListener)
                throw new TypeError(
                  'The "emitter" argument must be of type EventEmitter. Received type ' +
                    typeof t
                )
              t.addEventListener(e, function o(i) {
                n.once && t.removeEventListener(e, o), r(i)
              })
            }
          }
          Object.defineProperty(c, 'defaultMaxListeners', {
            enumerable: !0,
            get: function () {
              return u
            },
            set: function (t) {
              if ('number' != typeof t || t < 0 || s(t))
                throw new RangeError(
                  'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    t +
                    '.'
                )
              u = t
            },
          }),
            (c.init = function () {
              ;(void 0 !== this._events &&
                this._events !== Object.getPrototypeOf(this)._events) ||
                ((this._events = Object.create(null)), (this._eventsCount = 0)),
                (this._maxListeners = this._maxListeners || void 0)
            }),
            (c.prototype.setMaxListeners = function (t) {
              if ('number' != typeof t || t < 0 || s(t))
                throw new RangeError(
                  'The value of "n" is out of range. It must be a non-negative number. Received ' +
                    t +
                    '.'
                )
              return (this._maxListeners = t), this
            }),
            (c.prototype.getMaxListeners = function () {
              return l(this)
            }),
            (c.prototype.emit = function (t) {
              for (var e = [], r = 1; r < arguments.length; r++)
                e.push(arguments[r])
              var n = 'error' === t,
                o = this._events
              if (void 0 !== o) n = n && void 0 === o.error
              else if (!n) return !1
              if (n) {
                var i
                if ((e.length > 0 && (i = e[0]), i instanceof Error)) throw i
                var s = new Error(
                  'Unhandled error.' + (i ? ' (' + i.message + ')' : '')
                )
                throw ((s.context = i), s)
              }
              var c = o[t]
              if (void 0 === c) return !1
              if ('function' == typeof c) a(c, this, e)
              else {
                var u = c.length,
                  f = m(c, u)
                for (r = 0; r < u; ++r) a(f[r], this, e)
              }
              return !0
            }),
            (c.prototype.addListener = function (t, e) {
              return p(this, t, e, !1)
            }),
            (c.prototype.on = c.prototype.addListener),
            (c.prototype.prependListener = function (t, e) {
              return p(this, t, e, !0)
            }),
            (c.prototype.once = function (t, e) {
              return f(e), this.on(t, h(this, t, e)), this
            }),
            (c.prototype.prependOnceListener = function (t, e) {
              return f(e), this.prependListener(t, h(this, t, e)), this
            }),
            (c.prototype.removeListener = function (t, e) {
              var r, n, o, i, a
              if ((f(e), void 0 === (n = this._events))) return this
              if (void 0 === (r = n[t])) return this
              if (r === e || r.listener === e)
                0 == --this._eventsCount
                  ? (this._events = Object.create(null))
                  : (delete n[t],
                    n.removeListener &&
                      this.emit('removeListener', t, r.listener || e))
              else if ('function' != typeof r) {
                for (o = -1, i = r.length - 1; i >= 0; i--)
                  if (r[i] === e || r[i].listener === e) {
                    ;(a = r[i].listener), (o = i)
                    break
                  }
                if (o < 0) return this
                0 === o
                  ? r.shift()
                  : (function (t, e) {
                      for (; e + 1 < t.length; e++) t[e] = t[e + 1]
                      t.pop()
                    })(r, o),
                  1 === r.length && (n[t] = r[0]),
                  void 0 !== n.removeListener &&
                    this.emit('removeListener', t, a || e)
              }
              return this
            }),
            (c.prototype.off = c.prototype.removeListener),
            (c.prototype.removeAllListeners = function (t) {
              var e, r, n
              if (void 0 === (r = this._events)) return this
              if (void 0 === r.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = Object.create(null)),
                      (this._eventsCount = 0))
                    : void 0 !== r[t] &&
                      (0 == --this._eventsCount
                        ? (this._events = Object.create(null))
                        : delete r[t]),
                  this
                )
              if (0 === arguments.length) {
                var o,
                  i = Object.keys(r)
                for (n = 0; n < i.length; ++n)
                  'removeListener' !== (o = i[n]) && this.removeAllListeners(o)
                return (
                  this.removeAllListeners('removeListener'),
                  (this._events = Object.create(null)),
                  (this._eventsCount = 0),
                  this
                )
              }
              if ('function' == typeof (e = r[t])) this.removeListener(t, e)
              else if (void 0 !== e)
                for (n = e.length - 1; n >= 0; n--) this.removeListener(t, e[n])
              return this
            }),
            (c.prototype.listeners = function (t) {
              return d(this, t, !0)
            }),
            (c.prototype.rawListeners = function (t) {
              return d(this, t, !1)
            }),
            (c.listenerCount = function (t, e) {
              return 'function' == typeof t.listenerCount
                ? t.listenerCount(e)
                : g.call(t, e)
            }),
            (c.prototype.listenerCount = g),
            (c.prototype.eventNames = function () {
              return this._eventsCount > 0 ? n(this._events) : []
            })
        },
        9804: (t) => {
          var e = Object.prototype.hasOwnProperty,
            r = Object.prototype.toString
          t.exports = function (t, n, o) {
            if ('[object Function]' !== r.call(n))
              throw new TypeError('iterator must be a function')
            var i = t.length
            if (i === +i) for (var a = 0; a < i; a++) n.call(o, t[a], a, t)
            else for (var s in t) e.call(t, s) && n.call(o, t[s], s, t)
          }
        },
        6230: (t) => {
          t.exports = 'object' == typeof self ? self.FormData : window.FormData
        },
        7648: (t) => {
          'use strict'
          var e = 'Function.prototype.bind called on incompatible ',
            r = Array.prototype.slice,
            n = Object.prototype.toString,
            o = '[object Function]'
          t.exports = function (t) {
            var i = this
            if ('function' != typeof i || n.call(i) !== o)
              throw new TypeError(e + i)
            for (
              var a,
                s = r.call(arguments, 1),
                c = function () {
                  if (this instanceof a) {
                    var e = i.apply(this, s.concat(r.call(arguments)))
                    return Object(e) === e ? e : this
                  }
                  return i.apply(t, s.concat(r.call(arguments)))
                },
                u = Math.max(0, i.length - s.length),
                f = [],
                l = 0;
              l < u;
              l++
            )
              f.push('$' + l)
            if (
              ((a = Function(
                'binder',
                'return function (' +
                  f.join(',') +
                  '){ return binder.apply(this,arguments); }'
              )(c)),
              i.prototype)
            ) {
              var p = function () {}
              ;(p.prototype = i.prototype),
                (a.prototype = new p()),
                (p.prototype = null)
            }
            return a
          }
        },
        8612: (t, e, r) => {
          'use strict'
          var n = r(7648)
          t.exports = Function.prototype.bind || n
        },
        210: (t, e, r) => {
          'use strict'
          var n,
            o = SyntaxError,
            i = Function,
            a = TypeError,
            s = function (t) {
              try {
                return i('"use strict"; return (' + t + ').constructor;')()
              } catch (t) {}
            },
            c = Object.getOwnPropertyDescriptor
          if (c)
            try {
              c({}, '')
            } catch (t) {
              c = null
            }
          var u = function () {
              throw new a()
            },
            f = c
              ? (function () {
                  try {
                    return u
                  } catch (t) {
                    try {
                      return c(arguments, 'callee').get
                    } catch (t) {
                      return u
                    }
                  }
                })()
              : u,
            l = r(1405)(),
            p =
              Object.getPrototypeOf ||
              function (t) {
                return t.__proto__
              },
            y = {},
            h = 'undefined' == typeof Uint8Array ? n : p(Uint8Array),
            d = {
              '%AggregateError%':
                'undefined' == typeof AggregateError ? n : AggregateError,
              '%Array%': Array,
              '%ArrayBuffer%':
                'undefined' == typeof ArrayBuffer ? n : ArrayBuffer,
              '%ArrayIteratorPrototype%': l ? p([][Symbol.iterator]()) : n,
              '%AsyncFromSyncIteratorPrototype%': n,
              '%AsyncFunction%': y,
              '%AsyncGenerator%': y,
              '%AsyncGeneratorFunction%': y,
              '%AsyncIteratorPrototype%': y,
              '%Atomics%': 'undefined' == typeof Atomics ? n : Atomics,
              '%BigInt%': 'undefined' == typeof BigInt ? n : BigInt,
              '%Boolean%': Boolean,
              '%DataView%': 'undefined' == typeof DataView ? n : DataView,
              '%Date%': Date,
              '%decodeURI%': decodeURI,
              '%decodeURIComponent%': decodeURIComponent,
              '%encodeURI%': encodeURI,
              '%encodeURIComponent%': encodeURIComponent,
              '%Error%': Error,
              '%eval%': eval,
              '%EvalError%': EvalError,
              '%Float32Array%':
                'undefined' == typeof Float32Array ? n : Float32Array,
              '%Float64Array%':
                'undefined' == typeof Float64Array ? n : Float64Array,
              '%FinalizationRegistry%':
                'undefined' == typeof FinalizationRegistry
                  ? n
                  : FinalizationRegistry,
              '%Function%': i,
              '%GeneratorFunction%': y,
              '%Int8Array%': 'undefined' == typeof Int8Array ? n : Int8Array,
              '%Int16Array%': 'undefined' == typeof Int16Array ? n : Int16Array,
              '%Int32Array%': 'undefined' == typeof Int32Array ? n : Int32Array,
              '%isFinite%': isFinite,
              '%isNaN%': isNaN,
              '%IteratorPrototype%': l ? p(p([][Symbol.iterator]())) : n,
              '%JSON%': 'object' == typeof JSON ? JSON : n,
              '%Map%': 'undefined' == typeof Map ? n : Map,
              '%MapIteratorPrototype%':
                'undefined' != typeof Map && l
                  ? p(new Map()[Symbol.iterator]())
                  : n,
              '%Math%': Math,
              '%Number%': Number,
              '%Object%': Object,
              '%parseFloat%': parseFloat,
              '%parseInt%': parseInt,
              '%Promise%': 'undefined' == typeof Promise ? n : Promise,
              '%Proxy%': 'undefined' == typeof Proxy ? n : Proxy,
              '%RangeError%': RangeError,
              '%ReferenceError%': ReferenceError,
              '%Reflect%': 'undefined' == typeof Reflect ? n : Reflect,
              '%RegExp%': RegExp,
              '%Set%': 'undefined' == typeof Set ? n : Set,
              '%SetIteratorPrototype%':
                'undefined' != typeof Set && l
                  ? p(new Set()[Symbol.iterator]())
                  : n,
              '%SharedArrayBuffer%':
                'undefined' == typeof SharedArrayBuffer ? n : SharedArrayBuffer,
              '%String%': String,
              '%StringIteratorPrototype%': l ? p(''[Symbol.iterator]()) : n,
              '%Symbol%': l ? Symbol : n,
              '%SyntaxError%': o,
              '%ThrowTypeError%': f,
              '%TypedArray%': h,
              '%TypeError%': a,
              '%Uint8Array%': 'undefined' == typeof Uint8Array ? n : Uint8Array,
              '%Uint8ClampedArray%':
                'undefined' == typeof Uint8ClampedArray ? n : Uint8ClampedArray,
              '%Uint16Array%':
                'undefined' == typeof Uint16Array ? n : Uint16Array,
              '%Uint32Array%':
                'undefined' == typeof Uint32Array ? n : Uint32Array,
              '%URIError%': URIError,
              '%WeakMap%': 'undefined' == typeof WeakMap ? n : WeakMap,
              '%WeakRef%': 'undefined' == typeof WeakRef ? n : WeakRef,
              '%WeakSet%': 'undefined' == typeof WeakSet ? n : WeakSet,
            },
            g = function t(e) {
              var r
              if ('%AsyncFunction%' === e) r = s('async function () {}')
              else if ('%GeneratorFunction%' === e) r = s('function* () {}')
              else if ('%AsyncGeneratorFunction%' === e)
                r = s('async function* () {}')
              else if ('%AsyncGenerator%' === e) {
                var n = t('%AsyncGeneratorFunction%')
                n && (r = n.prototype)
              } else if ('%AsyncIteratorPrototype%' === e) {
                var o = t('%AsyncGenerator%')
                o && (r = p(o.prototype))
              }
              return (d[e] = r), r
            },
            m = {
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
              '%SharedArrayBufferPrototype%': [
                'SharedArrayBuffer',
                'prototype',
              ],
              '%StringPrototype%': ['String', 'prototype'],
              '%SymbolPrototype%': ['Symbol', 'prototype'],
              '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
              '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
              '%TypeErrorPrototype%': ['TypeError', 'prototype'],
              '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
              '%Uint8ClampedArrayPrototype%': [
                'Uint8ClampedArray',
                'prototype',
              ],
              '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
              '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
              '%URIErrorPrototype%': ['URIError', 'prototype'],
              '%WeakMapPrototype%': ['WeakMap', 'prototype'],
              '%WeakSetPrototype%': ['WeakSet', 'prototype'],
            },
            v = r(8612),
            b = r(7642),
            w = v.call(Function.call, Array.prototype.concat),
            O = v.call(Function.apply, Array.prototype.splice),
            E = v.call(Function.call, String.prototype.replace),
            S = v.call(Function.call, String.prototype.slice),
            j = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
            A = /\\(\\)?/g,
            x = function (t) {
              var e = S(t, 0, 1),
                r = S(t, -1)
              if ('%' === e && '%' !== r)
                throw new o('invalid intrinsic syntax, expected closing `%`')
              if ('%' === r && '%' !== e)
                throw new o('invalid intrinsic syntax, expected opening `%`')
              var n = []
              return (
                E(t, j, function (t, e, r, o) {
                  n[n.length] = r ? E(o, A, '$1') : e || t
                }),
                n
              )
            },
            P = function (t, e) {
              var r,
                n = t
              if ((b(m, n) && (n = '%' + (r = m[n])[0] + '%'), b(d, n))) {
                var i = d[n]
                if ((i === y && (i = g(n)), void 0 === i && !e))
                  throw new a(
                    'intrinsic ' +
                      t +
                      ' exists, but is not available. Please file an issue!'
                  )
                return { alias: r, name: n, value: i }
              }
              throw new o('intrinsic ' + t + ' does not exist!')
            }
          t.exports = function (t, e) {
            if ('string' != typeof t || 0 === t.length)
              throw new a('intrinsic name must be a non-empty string')
            if (arguments.length > 1 && 'boolean' != typeof e)
              throw new a('"allowMissing" argument must be a boolean')
            var r = x(t),
              n = r.length > 0 ? r[0] : '',
              i = P('%' + n + '%', e),
              s = i.name,
              u = i.value,
              f = !1,
              l = i.alias
            l && ((n = l[0]), O(r, w([0, 1], l)))
            for (var p = 1, y = !0; p < r.length; p += 1) {
              var h = r[p],
                g = S(h, 0, 1),
                m = S(h, -1)
              if (
                ('"' === g ||
                  "'" === g ||
                  '`' === g ||
                  '"' === m ||
                  "'" === m ||
                  '`' === m) &&
                g !== m
              )
                throw new o(
                  'property names with quotes must have matching quotes'
                )
              if (
                (('constructor' !== h && y) || (f = !0),
                b(d, (s = '%' + (n += '.' + h) + '%')))
              )
                u = d[s]
              else if (null != u) {
                if (!(h in u)) {
                  if (!e)
                    throw new a(
                      'base intrinsic for ' +
                        t +
                        ' exists, but the property is not available.'
                    )
                  return
                }
                if (c && p + 1 >= r.length) {
                  var v = c(u, h)
                  u =
                    (y = !!v) && 'get' in v && !('originalValue' in v.get)
                      ? v.get
                      : u[h]
                } else (y = b(u, h)), (u = u[h])
                y && !f && (d[s] = u)
              }
            }
            return u
          }
        },
        1405: (t, e, r) => {
          'use strict'
          var n = 'undefined' != typeof Symbol && Symbol,
            o = r(5419)
          t.exports = function () {
            return (
              'function' == typeof n &&
              'function' == typeof Symbol &&
              'symbol' == typeof n('foo') &&
              'symbol' == typeof Symbol('bar') &&
              o()
            )
          }
        },
        5419: (t) => {
          'use strict'
          t.exports = function () {
            if (
              'function' != typeof Symbol ||
              'function' != typeof Object.getOwnPropertySymbols
            )
              return !1
            if ('symbol' == typeof Symbol.iterator) return !0
            var t = {},
              e = Symbol('test'),
              r = Object(e)
            if ('string' == typeof e) return !1
            if ('[object Symbol]' !== Object.prototype.toString.call(e))
              return !1
            if ('[object Symbol]' !== Object.prototype.toString.call(r))
              return !1
            for (e in ((t[e] = 42), t)) return !1
            if ('function' == typeof Object.keys && 0 !== Object.keys(t).length)
              return !1
            if (
              'function' == typeof Object.getOwnPropertyNames &&
              0 !== Object.getOwnPropertyNames(t).length
            )
              return !1
            var n = Object.getOwnPropertySymbols(t)
            if (1 !== n.length || n[0] !== e) return !1
            if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1
            if ('function' == typeof Object.getOwnPropertyDescriptor) {
              var o = Object.getOwnPropertyDescriptor(t, e)
              if (42 !== o.value || !0 !== o.enumerable) return !1
            }
            return !0
          }
        },
        7642: (t, e, r) => {
          'use strict'
          var n = r(8612)
          t.exports = n.call(Function.call, Object.prototype.hasOwnProperty)
        },
        5717: (t) => {
          'function' == typeof Object.create
            ? (t.exports = function (t, e) {
                e &&
                  ((t.super_ = e),
                  (t.prototype = Object.create(e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })))
              })
            : (t.exports = function (t, e) {
                if (e) {
                  t.super_ = e
                  var r = function () {}
                  ;(r.prototype = e.prototype),
                    (t.prototype = new r()),
                    (t.prototype.constructor = t)
                }
              })
        },
        2584: (t, e, r) => {
          'use strict'
          var n =
              'function' == typeof Symbol &&
              'symbol' == typeof Symbol.toStringTag,
            o = r(1924)('Object.prototype.toString'),
            i = function (t) {
              return (
                !(n && t && 'object' == typeof t && Symbol.toStringTag in t) &&
                '[object Arguments]' === o(t)
              )
            },
            a = function (t) {
              return (
                !!i(t) ||
                (null !== t &&
                  'object' == typeof t &&
                  'number' == typeof t.length &&
                  t.length >= 0 &&
                  '[object Array]' !== o(t) &&
                  '[object Function]' === o(t.callee))
              )
            },
            s = (function () {
              return i(arguments)
            })()
          ;(i.isLegacyArguments = a), (t.exports = s ? i : a)
        },
        8662: (t) => {
          'use strict'
          var e = Object.prototype.toString,
            r = Function.prototype.toString,
            n = /^\s*(?:function)?\*/,
            o =
              'function' == typeof Symbol &&
              'symbol' == typeof Symbol.toStringTag,
            i = Object.getPrototypeOf,
            a = (function () {
              if (!o) return !1
              try {
                return Function('return function*() {}')()
              } catch (t) {}
            })(),
            s = !(!i || !a) && i(a)
          t.exports = function (t) {
            return (
              'function' == typeof t &&
              (!!n.test(r.call(t)) ||
                (o
                  ? i && i(t) === s
                  : '[object GeneratorFunction]' === e.call(t)))
            )
          }
        },
        8611: (t) => {
          'use strict'
          t.exports = function (t) {
            return t != t
          }
        },
        360: (t, e, r) => {
          'use strict'
          var n = r(5559),
            o = r(4289),
            i = r(8611),
            a = r(9415),
            s = r(3194),
            c = n(a(), Number)
          o(c, { getPolyfill: a, implementation: i, shim: s }), (t.exports = c)
        },
        9415: (t, e, r) => {
          'use strict'
          var n = r(8611)
          t.exports = function () {
            return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')
              ? Number.isNaN
              : n
          }
        },
        3194: (t, e, r) => {
          'use strict'
          var n = r(4289),
            o = r(9415)
          t.exports = function () {
            var t = o()
            return (
              n(
                Number,
                { isNaN: t },
                {
                  isNaN: function () {
                    return Number.isNaN !== t
                  },
                }
              ),
              t
            )
          }
        },
        5692: (t, e, r) => {
          'use strict'
          var n = r(9804),
            o = r(6314),
            i = r(1924),
            a = i('Object.prototype.toString'),
            s = r(1405)() && 'symbol' == typeof Symbol.toStringTag,
            c = o(),
            u =
              i('Array.prototype.indexOf', !0) ||
              function (t, e) {
                for (var r = 0; r < t.length; r += 1) if (t[r] === e) return r
                return -1
              },
            f = i('String.prototype.slice'),
            l = {},
            p = r(4079),
            y = Object.getPrototypeOf
          s &&
            p &&
            y &&
            n(c, function (t) {
              var e = new r.g[t]()
              if (!(Symbol.toStringTag in e))
                throw new EvalError(
                  'this engine has support for Symbol.toStringTag, but ' +
                    t +
                    ' does not have the property! Please report this.'
                )
              var n = y(e),
                o = p(n, Symbol.toStringTag)
              if (!o) {
                var i = y(n)
                o = p(i, Symbol.toStringTag)
              }
              l[t] = o.get
            }),
            (t.exports = function (t) {
              if (!t || 'object' != typeof t) return !1
              if (!s) {
                var e = f(a(t), 8, -1)
                return u(c, e) > -1
              }
              return (
                !!p &&
                (function (t) {
                  var e = !1
                  return (
                    n(l, function (r, n) {
                      if (!e)
                        try {
                          e = r.call(t) === n
                        } catch (t) {}
                    }),
                    e
                  )
                })(t)
              )
            })
        },
        4244: (t) => {
          'use strict'
          var e = function (t) {
            return t != t
          }
          t.exports = function (t, r) {
            return 0 === t && 0 === r
              ? 1 / t == 1 / r
              : t === r || !(!e(t) || !e(r))
          }
        },
        609: (t, e, r) => {
          'use strict'
          var n = r(4289),
            o = r(5559),
            i = r(4244),
            a = r(5624),
            s = r(2281),
            c = o(a(), Object)
          n(c, { getPolyfill: a, implementation: i, shim: s }), (t.exports = c)
        },
        5624: (t, e, r) => {
          'use strict'
          var n = r(4244)
          t.exports = function () {
            return 'function' == typeof Object.is ? Object.is : n
          }
        },
        2281: (t, e, r) => {
          'use strict'
          var n = r(5624),
            o = r(4289)
          t.exports = function () {
            var t = n()
            return (
              o(
                Object,
                { is: t },
                {
                  is: function () {
                    return Object.is !== t
                  },
                }
              ),
              t
            )
          }
        },
        8987: (t, e, r) => {
          'use strict'
          var n
          if (!Object.keys) {
            var o = Object.prototype.hasOwnProperty,
              i = Object.prototype.toString,
              a = r(1414),
              s = Object.prototype.propertyIsEnumerable,
              c = !s.call({ toString: null }, 'toString'),
              u = s.call(function () {}, 'prototype'),
              f = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor',
              ],
              l = function (t) {
                var e = t.constructor
                return e && e.prototype === t
              },
              p = {
                $applicationCache: !0,
                $console: !0,
                $external: !0,
                $frame: !0,
                $frameElement: !0,
                $frames: !0,
                $innerHeight: !0,
                $innerWidth: !0,
                $onmozfullscreenchange: !0,
                $onmozfullscreenerror: !0,
                $outerHeight: !0,
                $outerWidth: !0,
                $pageXOffset: !0,
                $pageYOffset: !0,
                $parent: !0,
                $scrollLeft: !0,
                $scrollTop: !0,
                $scrollX: !0,
                $scrollY: !0,
                $self: !0,
                $webkitIndexedDB: !0,
                $webkitStorageInfo: !0,
                $window: !0,
              },
              y = (function () {
                if ('undefined' == typeof window) return !1
                for (var t in window)
                  try {
                    if (
                      !p['$' + t] &&
                      o.call(window, t) &&
                      null !== window[t] &&
                      'object' == typeof window[t]
                    )
                      try {
                        l(window[t])
                      } catch (t) {
                        return !0
                      }
                  } catch (t) {
                    return !0
                  }
                return !1
              })()
            n = function (t) {
              var e = null !== t && 'object' == typeof t,
                r = '[object Function]' === i.call(t),
                n = a(t),
                s = e && '[object String]' === i.call(t),
                p = []
              if (!e && !r && !n)
                throw new TypeError('Object.keys called on a non-object')
              var h = u && r
              if (s && t.length > 0 && !o.call(t, 0))
                for (var d = 0; d < t.length; ++d) p.push(String(d))
              if (n && t.length > 0)
                for (var g = 0; g < t.length; ++g) p.push(String(g))
              else
                for (var m in t)
                  (h && 'prototype' === m) || !o.call(t, m) || p.push(String(m))
              if (c)
                for (
                  var v = (function (t) {
                      if ('undefined' == typeof window || !y) return l(t)
                      try {
                        return l(t)
                      } catch (t) {
                        return !1
                      }
                    })(t),
                    b = 0;
                  b < f.length;
                  ++b
                )
                  (v && 'constructor' === f[b]) ||
                    !o.call(t, f[b]) ||
                    p.push(f[b])
              return p
            }
          }
          t.exports = n
        },
        2215: (t, e, r) => {
          'use strict'
          var n = Array.prototype.slice,
            o = r(1414),
            i = Object.keys,
            a = i
              ? function (t) {
                  return i(t)
                }
              : r(8987),
            s = Object.keys
          ;(a.shim = function () {
            return (
              Object.keys
                ? (function () {
                    var t = Object.keys(arguments)
                    return t && t.length === arguments.length
                  })(1, 2) ||
                  (Object.keys = function (t) {
                    return o(t) ? s(n.call(t)) : s(t)
                  })
                : (Object.keys = a),
              Object.keys || a
            )
          }),
            (t.exports = a)
        },
        1414: (t) => {
          'use strict'
          var e = Object.prototype.toString
          t.exports = function (t) {
            var r = e.call(t),
              n = '[object Arguments]' === r
            return (
              n ||
                (n =
                  '[object Array]' !== r &&
                  null !== t &&
                  'object' == typeof t &&
                  'number' == typeof t.length &&
                  t.length >= 0 &&
                  '[object Function]' === e.call(t.callee)),
              n
            )
          }
        },
        4155: (t) => {
          var e,
            r,
            n = (t.exports = {})
          function o() {
            throw new Error('setTimeout has not been defined')
          }
          function i() {
            throw new Error('clearTimeout has not been defined')
          }
          function a(t) {
            if (e === setTimeout) return setTimeout(t, 0)
            if ((e === o || !e) && setTimeout)
              return (e = setTimeout), setTimeout(t, 0)
            try {
              return e(t, 0)
            } catch (r) {
              try {
                return e.call(null, t, 0)
              } catch (r) {
                return e.call(this, t, 0)
              }
            }
          }
          !(function () {
            try {
              e = 'function' == typeof setTimeout ? setTimeout : o
            } catch (t) {
              e = o
            }
            try {
              r = 'function' == typeof clearTimeout ? clearTimeout : i
            } catch (t) {
              r = i
            }
          })()
          var s,
            c = [],
            u = !1,
            f = -1
          function l() {
            u &&
              s &&
              ((u = !1),
              s.length ? (c = s.concat(c)) : (f = -1),
              c.length && p())
          }
          function p() {
            if (!u) {
              var t = a(l)
              u = !0
              for (var e = c.length; e; ) {
                for (s = c, c = []; ++f < e; ) s && s[f].run()
                ;(f = -1), (e = c.length)
              }
              ;(s = null),
                (u = !1),
                (function (t) {
                  if (r === clearTimeout) return clearTimeout(t)
                  if ((r === i || !r) && clearTimeout)
                    return (r = clearTimeout), clearTimeout(t)
                  try {
                    r(t)
                  } catch (e) {
                    try {
                      return r.call(null, t)
                    } catch (e) {
                      return r.call(this, t)
                    }
                  }
                })(t)
            }
          }
          function y(t, e) {
            ;(this.fun = t), (this.array = e)
          }
          function h() {}
          ;(n.nextTick = function (t) {
            var e = new Array(arguments.length - 1)
            if (arguments.length > 1)
              for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r]
            c.push(new y(t, e)), 1 !== c.length || u || a(p)
          }),
            (y.prototype.run = function () {
              this.fun.apply(null, this.array)
            }),
            (n.title = 'browser'),
            (n.browser = !0),
            (n.env = {}),
            (n.argv = []),
            (n.version = ''),
            (n.versions = {}),
            (n.on = h),
            (n.addListener = h),
            (n.once = h),
            (n.off = h),
            (n.removeListener = h),
            (n.removeAllListeners = h),
            (n.emit = h),
            (n.prependListener = h),
            (n.prependOnceListener = h),
            (n.listeners = function (t) {
              return []
            }),
            (n.binding = function (t) {
              throw new Error('process.binding is not supported')
            }),
            (n.cwd = function () {
              return '/'
            }),
            (n.chdir = function (t) {
              throw new Error('process.chdir is not supported')
            }),
            (n.umask = function () {
              return 0
            })
        },
        2587: (t) => {
          'use strict'
          function e(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }
          t.exports = function (t, r, n, o) {
            ;(r = r || '&'), (n = n || '=')
            var i = {}
            if ('string' != typeof t || 0 === t.length) return i
            var a = /\+/g
            t = t.split(r)
            var s = 1e3
            o && 'number' == typeof o.maxKeys && (s = o.maxKeys)
            var c = t.length
            s > 0 && c > s && (c = s)
            for (var u = 0; u < c; ++u) {
              var f,
                l,
                p,
                y,
                h = t[u].replace(a, '%20'),
                d = h.indexOf(n)
              d >= 0
                ? ((f = h.substr(0, d)), (l = h.substr(d + 1)))
                : ((f = h), (l = '')),
                (p = decodeURIComponent(f)),
                (y = decodeURIComponent(l)),
                e(i, p)
                  ? Array.isArray(i[p])
                    ? i[p].push(y)
                    : (i[p] = [i[p], y])
                  : (i[p] = y)
            }
            return i
          }
        },
        2361: (t) => {
          'use strict'
          var e = function (t) {
            switch (typeof t) {
              case 'string':
                return t
              case 'boolean':
                return t ? 'true' : 'false'
              case 'number':
                return isFinite(t) ? t : ''
              default:
                return ''
            }
          }
          t.exports = function (t, r, n, o) {
            return (
              (r = r || '&'),
              (n = n || '='),
              null === t && (t = void 0),
              'object' == typeof t
                ? Object.keys(t)
                    .map(function (o) {
                      var i = encodeURIComponent(e(o)) + n
                      return Array.isArray(t[o])
                        ? t[o]
                            .map(function (t) {
                              return i + encodeURIComponent(e(t))
                            })
                            .join(r)
                        : i + encodeURIComponent(e(t[o]))
                    })
                    .join(r)
                : o
                ? encodeURIComponent(e(o)) + n + encodeURIComponent(e(t))
                : ''
            )
          }
        },
        7673: (t, e, r) => {
          'use strict'
          ;(e.decode = e.parse = r(2587)), (e.encode = e.stringify = r(2361))
        },
        9907: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.getAlbum = void 0)
          const n = r(5080),
            o = r(2571)
          e.getAlbum = async function (t, e) {
            const r = `${n.ALBUM_ENDPOINT}/${e}`
            return o.getImgurApiResponseFromResponse(
              await t.request({ url: r })
            )
          }
        },
        4639: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            r(655).__exportStar(r(9907), e)
        },
        5934: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.ImgurClient = void 0)
          const n = r(655),
            o = r(7187),
            i = r(3894),
            a = r(2176),
            s = r(6788),
            c = r(4639),
            u = r(5080),
            f = 'imgur/next (https://github.com/kaimallea/node-imgur)',
            l = n.__importDefault(r(9669))
          class p extends o.EventEmitter {
            constructor(t) {
              super(),
                (this.credentials = t),
                (this.plainFetcher = l.default.create({
                  baseURL: u.IMGUR_API_PREFIX,
                  headers: { 'user-agent': f },
                  responseType: 'json',
                })),
                (this.fetcher = l.default.create({
                  baseURL: u.IMGUR_API_PREFIX,
                  headers: { 'user-agent': f },
                  responseType: 'json',
                })),
                this.fetcher.interceptors.request.use(
                  async (t) => (
                    (t.headers = t.headers ? t.headers : {}),
                    (t.headers.authorization = await i.getAuthorizationHeader(
                      this
                    )),
                    t
                  ),
                  (t) => Promise.reject(t)
                )
            }
            plainRequest(t) {
              return this.plainFetcher(t)
            }
            request(t = {}) {
              return this.fetcher(t)
            }
            deleteImage(t) {
              return a.deleteImage(this, t)
            }
            favoriteImage(t) {
              return a.favoriteImage(this, t)
            }
            getAlbum(t) {
              return c.getAlbum(this, t)
            }
            getGallery(t) {
              return s.getGallery(this, t)
            }
            getSubredditGallery(t) {
              return s.getSubredditGallery(this, t)
            }
            searchGallery(t) {
              return s.searchGallery(this, t)
            }
            getImage(t) {
              return a.getImage(this, t)
            }
            updateImage(t) {
              return a.updateImage(this, t)
            }
            upload(t) {
              return a.upload(this, t)
            }
          }
          e.ImgurClient = p
        },
        5080: (t, e) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.SEARCH_GALLERY_ENDPOINT = e.SUBREDDIT_GALLERY_ENDPOINT = e.GALLERY_ENDPOINT = e.UPLOAD_ENDPOINT = e.IMAGE_ENDPOINT = e.ALBUM_ENDPOINT = e.AUTHORIZE_ENDPOINT = e.API_VERSION = e.IMGUR_API_PREFIX = void 0),
            (e.IMGUR_API_PREFIX = 'https://api.imgur.com'),
            (e.API_VERSION = '3'),
            (e.AUTHORIZE_ENDPOINT = 'oauth2/authorize'),
            (e.ALBUM_ENDPOINT = `${e.API_VERSION}/album`),
            (e.IMAGE_ENDPOINT = `${e.API_VERSION}/image`),
            (e.UPLOAD_ENDPOINT = `${e.API_VERSION}/upload`),
            (e.GALLERY_ENDPOINT = `${e.API_VERSION}/gallery`),
            (e.SUBREDDIT_GALLERY_ENDPOINT = `${e.API_VERSION}/gallery/r`),
            (e.SEARCH_GALLERY_ENDPOINT = `${e.API_VERSION}/gallery/search`)
        },
        6419: (t, e) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.isLogin = e.isClientId = e.isAccessToken = void 0),
            (e.isAccessToken = function (t) {
              return void 0 !== t.accessToken
            }),
            (e.isClientId = function (t) {
              return void 0 !== t.clientId
            }),
            (e.isLogin = function (t) {
              return (
                void 0 !== t.clientId &&
                void 0 !== t.username &&
                void 0 !== t.password
              )
            })
        },
        2571: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.getImgurApiResponseFromResponse = e.createForm = e.getSource = e.isStream = e.isImageUrl = e.isBase64 = void 0)
          const n = r(655).__importDefault(r(6230))
          function o(t) {
            return (
              'string' != typeof t && void 0 !== t.base64 && 'base64' === t.type
            )
          }
          function i(t) {
            return 'string' != typeof t && void 0 !== t.stream
          }
          ;(e.isBase64 = o),
            (e.isImageUrl = function (t) {
              return (
                'string' == typeof t || (void 0 !== t.image && 'url' === t.type)
              )
            }),
            (e.isStream = i),
            (e.getSource = function (t) {
              return 'string' == typeof t
                ? t
                : o(t)
                ? 'payload.base64'
                : i(t)
                ? 'payload.stream'
                : t.image
            }),
            (e.createForm = function (t) {
              const e = new n.default()
              if ('string' == typeof t) return e.append('image', t), e
              for (const [r, n] of Object.entries(t)) {
                const o = ['base64', 'stream']
                ;-1 !== o.indexOf(r)
                  ? -1 !== o.indexOf(t.type) && e.append(r, t)
                  : e.append(r, n)
              }
              return e
            }),
            (e.getImgurApiResponseFromResponse = function (t) {
              var e, r
              return void 0 !==
                (null === (e = t.data) || void 0 === e ? void 0 : e.status) &&
                void 0 !==
                  (null === (r = t.data) || void 0 === r ? void 0 : r.success)
                ? t.data
                : { data: t.data, status: t.status, success: !0 }
            })
        },
        4818: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.getGallery = e.constructGalleryUrl = void 0)
          const n = r(5080),
            o = r(8575),
            i = r(2571),
            a = { section: 'hot', sort: 'viral' }
          function s(t) {
            const e = Object.assign({}, a, t)
            let r = `${e.section}`
            e.sort && (r += `/${e.sort}`),
              'top' === e.section && e.window && (r += `/${e.window}`),
              e.page && (r += `/${e.page}`)
            const i = new o.URL(
              `${n.IMGUR_API_PREFIX}/${n.GALLERY_ENDPOINT}/${r}`
            )
            return (
              void 0 !== e.showViral &&
                i.searchParams.append('showViral', e.showViral.toString()),
              void 0 !== e.mature &&
                i.searchParams.append('mature', e.mature.toString()),
              void 0 !== e.album_previews &&
                i.searchParams.append(
                  'album_previews',
                  e.album_previews.toString()
                ),
              i
            )
          }
          ;(e.constructGalleryUrl = s),
            (e.getGallery = async function (t, e = a) {
              const { pathname: r } = s(e),
                n = r.slice(1)
              return i.getImgurApiResponseFromResponse(
                await t.request({ url: n })
              )
            })
        },
        1686: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.getSubredditGallery = e.constructSubredditGalleryUrl = void 0)
          const n = r(5080),
            o = r(8575),
            i = r(2571)
          function a(t) {
            let e = `${t.subreddit}`
            return (
              t.sort && (e += `/${t.sort}`),
              'top' === t.sort && t.window && (e += `/${t.window}`),
              t.page && (e += `/${t.page}`),
              new o.URL(
                `${n.IMGUR_API_PREFIX}/${n.SUBREDDIT_GALLERY_ENDPOINT}/${e}`
              )
            )
          }
          ;(e.constructSubredditGalleryUrl = a),
            (e.getSubredditGallery = async function (t, e) {
              const { pathname: r } = a(e),
                n = r.slice(1)
              return i.getImgurApiResponseFromResponse(
                await t.request({ url: n })
              )
            })
        },
        6788: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 })
          const n = r(655)
          n.__exportStar(r(4818), e),
            n.__exportStar(r(1686), e),
            n.__exportStar(r(8477), e)
        },
        8477: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.searchGallery = e.constructSearchGalleryUrl = void 0)
          const n = r(5080),
            o = r(2571),
            i = r(8575),
            a = ['q_all', 'q_any', 'q_exactly', 'q_not', 'q_type', 'q_size_px']
          function s(t) {
            let e = ''
            t.sort && (e += `/${t.sort}`),
              'top' === t.sort && t.window && (e += `/${t.window}`),
              t.page && (e += `/${t.page}`)
            const r = new i.URL(
              `${n.IMGUR_API_PREFIX}/${n.SEARCH_GALLERY_ENDPOINT}${e}`
            )
            if (
              (a.forEach((e) => {
                var n
                ;(null === (n = t[e]) || void 0 === n ? void 0 : n.length) &&
                  r.searchParams.append(e, t[e])
              }),
              !r.search)
            ) {
              const e = t.q || t.query
              if (!e) throw new Error('No query was provided')
              r.searchParams.append('q', e)
            }
            return r
          }
          ;(e.constructSearchGalleryUrl = s),
            (e.searchGallery = async function (t, e) {
              const { pathname: r } = s(e),
                n = r.slice(1)
              return o.getImgurApiResponseFromResponse(
                await t.request({ url: n })
              )
            })
        },
        3894: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.getAuthorizationHeader = void 0)
          const n = r(6419),
            o = r(5080)
          e.getAuthorizationHeader = async function (t) {
            if (n.isAccessToken(t.credentials))
              return `Bearer ${t.credentials.accessToken}`
            if (n.isClientId(t.credentials) && !n.isLogin(t.credentials))
              return `Client-ID ${t.credentials.clientId}`
            const { clientId: e, username: r, password: i } = t.credentials,
              a = {
                url: o.AUTHORIZE_ENDPOINT,
                baseURL: o.IMGUR_API_PREFIX,
                params: { client_id: e, response_type: 'token' },
              }
            let s = await t.plainRequest(a)
            const c = Array.isArray(s.headers['set-cookie'])
              ? s.headers['set-cookie'][0]
              : s.headers['set-cookie']
            if (!c) throw new Error('No cookies were set during authorization')
            const u = c.match('(^|;)[s]*authorize_token=([^;]*)')
            if (!u || u.length < 3)
              throw new Error('Unable to find authorize_token cookie')
            const f = u[2]
            ;(a.method = 'POST'),
              (a.data = { username: r, password: i, allow: f }),
              (a.followRedirect = !1),
              (a.headers = { cookie: `authorize_token=${f}` }),
              (s = await t.plainRequest(a))
            const l = s.headers.location
            if (!l) throw new Error('Unable to parse location')
            const p = JSON.parse(
              '{"' +
                decodeURI(l.slice(l.indexOf('#') + 1))
                  .replace(/"/g, '\\"')
                  .replace(/&/g, '","')
                  .replace(/=/g, '":"') +
                '"}'
            ).access_token
            return (t.credentials.accessToken = p), `Bearer ${p}`
          }
        },
        870: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.deleteImage = void 0)
          const n = r(5080),
            o = r(2571)
          e.deleteImage = async function (t, e) {
            const r = `${n.IMAGE_ENDPOINT}/${e}`
            return o.getImgurApiResponseFromResponse(
              await t.request({ url: r, method: 'DELETE' })
            )
          }
        },
        2129: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.favoriteImage = void 0)
          const n = r(5080),
            o = r(2571)
          e.favoriteImage = async function (t, e) {
            const r = `${n.IMAGE_ENDPOINT}/${e}/favorite`
            return o.getImgurApiResponseFromResponse(
              await t.request({ url: r, method: 'POST' })
            )
          }
        },
        8455: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.getImage = void 0)
          const n = r(5080),
            o = r(2571)
          e.getImage = async function (t, e) {
            const r = `${n.IMAGE_ENDPOINT}/${e}`
            return o.getImgurApiResponseFromResponse(
              await t.request({ url: r })
            )
          }
        },
        2176: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 })
          const n = r(655)
          n.__exportStar(r(870), e),
            n.__exportStar(r(2129), e),
            n.__exportStar(r(8455), e),
            n.__exportStar(r(9831), e),
            n.__exportStar(r(5328), e)
        },
        9831: (t, e, r) => {
          'use strict'
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.updateImage = void 0)
          const n = r(5080),
            o = r(2571)
          function i(t) {
            return (
              'string' == typeof t.title || 'string' == typeof t.description
            )
          }
          e.updateImage = async function (t, e) {
            if (Array.isArray(e)) {
              const r = e.map((e) => {
                if (!i(e))
                  throw new Error('Update requires a title and/or description')
                const r = `${n.IMAGE_ENDPOINT}/${e.imageHash}`,
                  a = o.createForm(e)
                return new Promise(async function (e) {
                  return e(
                    o.getImgurApiResponseFromResponse(
                      await t.request({ url: r, method: 'POST', data: a })
                    )
                  )
                })
              })
              return await Promise.all(r)
            }
            if (!i(e))
              throw new Error('Update requires a title and/or description')
            const r = `${n.IMAGE_ENDPOINT}/${e.imageHash}`,
              a = o.createForm(e)
            return o.getImgurApiResponseFromResponse(
              await t.request({ url: r, method: 'POST', data: a })
            )
          }
        },
        5328: (t, e, r) => {
          'use strict'
          var n = r(5108)
          Object.defineProperty(e, '__esModule', { value: !0 }),
            (e.upload = void 0)
          const o = r(2571),
            i = r(5080)
          e.upload = async function (t, e) {
            if (Array.isArray(e)) {
              const r = e.map((e) => {
                const r = o.createForm(e)
                return new Promise(async (e) => {
                  e(
                    o.getImgurApiResponseFromResponse(
                      await t.request({
                        url: i.UPLOAD_ENDPOINT,
                        method: 'POST',
                        data: r,
                        onUploadProgress: (e) => {
                          n.log({ progressEvent: e }),
                            t.emit('uploadProgress', { ...e })
                        },
                      })
                    )
                  )
                })
              })
              return await Promise.all(r)
            }
            const r = o.createForm(e),
              a = await t.request({
                url: i.UPLOAD_ENDPOINT,
                method: 'POST',
                data: r,
                onUploadProgress: (e) => {
                  n.log({ progressEvent: e }),
                    t.emit('uploadProgress', { ...e })
                },
              })
            return Promise.resolve(o.getImgurApiResponseFromResponse(a))
          }
        },
        655: (t, e, r) => {
          'use strict'
          r.r(e),
            r.d(e, {
              __extends: () => o,
              __assign: () => i,
              __rest: () => a,
              __decorate: () => s,
              __param: () => c,
              __metadata: () => u,
              __awaiter: () => f,
              __generator: () => l,
              __createBinding: () => p,
              __exportStar: () => y,
              __values: () => h,
              __read: () => d,
              __spread: () => g,
              __spreadArrays: () => m,
              __await: () => v,
              __asyncGenerator: () => b,
              __asyncDelegator: () => w,
              __asyncValues: () => O,
              __makeTemplateObject: () => E,
              __importStar: () => S,
              __importDefault: () => j,
              __classPrivateFieldGet: () => A,
              __classPrivateFieldSet: () => x,
            })
          var n = function (t, e) {
            return (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
              })(t, e)
          }
          function o(t, e) {
            function r() {
              this.constructor = t
            }
            n(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((r.prototype = e.prototype), new r()))
          }
          var i = function () {
            return (i =
              Object.assign ||
              function (t) {
                for (var e, r = 1, n = arguments.length; r < n; r++)
                  for (var o in (e = arguments[r]))
                    Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
                return t
              }).apply(this, arguments)
          }
          function a(t, e) {
            var r = {}
            for (var n in t)
              Object.prototype.hasOwnProperty.call(t, n) &&
                e.indexOf(n) < 0 &&
                (r[n] = t[n])
            if (
              null != t &&
              'function' == typeof Object.getOwnPropertySymbols
            ) {
              var o = 0
              for (n = Object.getOwnPropertySymbols(t); o < n.length; o++)
                e.indexOf(n[o]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(t, n[o]) &&
                  (r[n[o]] = t[n[o]])
            }
            return r
          }
          function s(t, e, r, n) {
            var o,
              i = arguments.length,
              a =
                i < 3
                  ? e
                  : null === n
                  ? (n = Object.getOwnPropertyDescriptor(e, r))
                  : n
            if (
              'object' == typeof Reflect &&
              'function' == typeof Reflect.decorate
            )
              a = Reflect.decorate(t, e, r, n)
            else
              for (var s = t.length - 1; s >= 0; s--)
                (o = t[s]) &&
                  (a = (i < 3 ? o(a) : i > 3 ? o(e, r, a) : o(e, r)) || a)
            return i > 3 && a && Object.defineProperty(e, r, a), a
          }
          function c(t, e) {
            return function (r, n) {
              e(r, n, t)
            }
          }
          function u(t, e) {
            if (
              'object' == typeof Reflect &&
              'function' == typeof Reflect.metadata
            )
              return Reflect.metadata(t, e)
          }
          function f(t, e, r, n) {
            return new (r || (r = Promise))(function (o, i) {
              function a(t) {
                try {
                  c(n.next(t))
                } catch (t) {
                  i(t)
                }
              }
              function s(t) {
                try {
                  c(n.throw(t))
                } catch (t) {
                  i(t)
                }
              }
              function c(t) {
                var e
                t.done
                  ? o(t.value)
                  : ((e = t.value),
                    e instanceof r
                      ? e
                      : new r(function (t) {
                          t(e)
                        })).then(a, s)
              }
              c((n = n.apply(t, e || [])).next())
            })
          }
          function l(t, e) {
            var r,
              n,
              o,
              i,
              a = {
                label: 0,
                sent: function () {
                  if (1 & o[0]) throw o[1]
                  return o[1]
                },
                trys: [],
                ops: [],
              }
            return (
              (i = { next: s(0), throw: s(1), return: s(2) }),
              'function' == typeof Symbol &&
                (i[Symbol.iterator] = function () {
                  return this
                }),
              i
            )
            function s(i) {
              return function (s) {
                return (function (i) {
                  if (r) throw new TypeError('Generator is already executing.')
                  for (; a; )
                    try {
                      if (
                        ((r = 1),
                        n &&
                          (o =
                            2 & i[0]
                              ? n.return
                              : i[0]
                              ? n.throw || ((o = n.return) && o.call(n), 0)
                              : n.next) &&
                          !(o = o.call(n, i[1])).done)
                      )
                        return o
                      switch (((n = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                        case 0:
                        case 1:
                          o = i
                          break
                        case 4:
                          return a.label++, { value: i[1], done: !1 }
                        case 5:
                          a.label++, (n = i[1]), (i = [0])
                          continue
                        case 7:
                          ;(i = a.ops.pop()), a.trys.pop()
                          continue
                        default:
                          if (
                            !(
                              (o =
                                (o = a.trys).length > 0 && o[o.length - 1]) ||
                              (6 !== i[0] && 2 !== i[0])
                            )
                          ) {
                            a = 0
                            continue
                          }
                          if (
                            3 === i[0] &&
                            (!o || (i[1] > o[0] && i[1] < o[3]))
                          ) {
                            a.label = i[1]
                            break
                          }
                          if (6 === i[0] && a.label < o[1]) {
                            ;(a.label = o[1]), (o = i)
                            break
                          }
                          if (o && a.label < o[2]) {
                            ;(a.label = o[2]), a.ops.push(i)
                            break
                          }
                          o[2] && a.ops.pop(), a.trys.pop()
                          continue
                      }
                      i = e.call(t, a)
                    } catch (t) {
                      ;(i = [6, t]), (n = 0)
                    } finally {
                      r = o = 0
                    }
                  if (5 & i[0]) throw i[1]
                  return { value: i[0] ? i[1] : void 0, done: !0 }
                })([i, s])
              }
            }
          }
          function p(t, e, r, n) {
            void 0 === n && (n = r), (t[n] = e[r])
          }
          function y(t, e) {
            for (var r in t)
              'default' === r || e.hasOwnProperty(r) || (e[r] = t[r])
          }
          function h(t) {
            var e = 'function' == typeof Symbol && Symbol.iterator,
              r = e && t[e],
              n = 0
            if (r) return r.call(t)
            if (t && 'number' == typeof t.length)
              return {
                next: function () {
                  return (
                    t && n >= t.length && (t = void 0),
                    { value: t && t[n++], done: !t }
                  )
                },
              }
            throw new TypeError(
              e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
            )
          }
          function d(t, e) {
            var r = 'function' == typeof Symbol && t[Symbol.iterator]
            if (!r) return t
            var n,
              o,
              i = r.call(t),
              a = []
            try {
              for (; (void 0 === e || e-- > 0) && !(n = i.next()).done; )
                a.push(n.value)
            } catch (t) {
              o = { error: t }
            } finally {
              try {
                n && !n.done && (r = i.return) && r.call(i)
              } finally {
                if (o) throw o.error
              }
            }
            return a
          }
          function g() {
            for (var t = [], e = 0; e < arguments.length; e++)
              t = t.concat(d(arguments[e]))
            return t
          }
          function m() {
            for (var t = 0, e = 0, r = arguments.length; e < r; e++)
              t += arguments[e].length
            var n = Array(t),
              o = 0
            for (e = 0; e < r; e++)
              for (var i = arguments[e], a = 0, s = i.length; a < s; a++, o++)
                n[o] = i[a]
            return n
          }
          function v(t) {
            return this instanceof v ? ((this.v = t), this) : new v(t)
          }
          function b(t, e, r) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.')
            var n,
              o = r.apply(t, e || []),
              i = []
            return (
              (n = {}),
              a('next'),
              a('throw'),
              a('return'),
              (n[Symbol.asyncIterator] = function () {
                return this
              }),
              n
            )
            function a(t) {
              o[t] &&
                (n[t] = function (e) {
                  return new Promise(function (r, n) {
                    i.push([t, e, r, n]) > 1 || s(t, e)
                  })
                })
            }
            function s(t, e) {
              try {
                ;(r = o[t](e)).value instanceof v
                  ? Promise.resolve(r.value.v).then(c, u)
                  : f(i[0][2], r)
              } catch (t) {
                f(i[0][3], t)
              }
              var r
            }
            function c(t) {
              s('next', t)
            }
            function u(t) {
              s('throw', t)
            }
            function f(t, e) {
              t(e), i.shift(), i.length && s(i[0][0], i[0][1])
            }
          }
          function w(t) {
            var e, r
            return (
              (e = {}),
              n('next'),
              n('throw', function (t) {
                throw t
              }),
              n('return'),
              (e[Symbol.iterator] = function () {
                return this
              }),
              e
            )
            function n(n, o) {
              e[n] = t[n]
                ? function (e) {
                    return (r = !r)
                      ? { value: v(t[n](e)), done: 'return' === n }
                      : o
                      ? o(e)
                      : e
                  }
                : o
            }
          }
          function O(t) {
            if (!Symbol.asyncIterator)
              throw new TypeError('Symbol.asyncIterator is not defined.')
            var e,
              r = t[Symbol.asyncIterator]
            return r
              ? r.call(t)
              : ((t = h(t)),
                (e = {}),
                n('next'),
                n('throw'),
                n('return'),
                (e[Symbol.asyncIterator] = function () {
                  return this
                }),
                e)
            function n(r) {
              e[r] =
                t[r] &&
                function (e) {
                  return new Promise(function (n, o) {
                    !(function (t, e, r, n) {
                      Promise.resolve(n).then(function (e) {
                        t({ value: e, done: r })
                      }, e)
                    })(n, o, (e = t[r](e)).done, e.value)
                  })
                }
            }
          }
          function E(t, e) {
            return (
              Object.defineProperty
                ? Object.defineProperty(t, 'raw', { value: e })
                : (t.raw = e),
              t
            )
          }
          function S(t) {
            if (t && t.__esModule) return t
            var e = {}
            if (null != t)
              for (var r in t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r])
            return (e.default = t), e
          }
          function j(t) {
            return t && t.__esModule ? t : { default: t }
          }
          function A(t, e) {
            if (!e.has(t))
              throw new TypeError(
                'attempted to get private field on non-instance'
              )
            return e.get(t)
          }
          function x(t, e, r) {
            if (!e.has(t))
              throw new TypeError(
                'attempted to set private field on non-instance'
              )
            return e.set(t, r), r
          }
        },
        2511: function (t, e, r) {
          var n
          ;(t = r.nmd(t)),
            (function (o) {
              e && e.nodeType, t && t.nodeType
              var i = 'object' == typeof r.g && r.g
              i.global !== i && i.window !== i && i.self
              var a,
                s = 2147483647,
                c = 36,
                u = /^xn--/,
                f = /[^\x20-\x7E]/,
                l = /[\x2E\u3002\uFF0E\uFF61]/g,
                p = {
                  overflow: 'Overflow: input needs wider integers to process',
                  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                  'invalid-input': 'Invalid input',
                },
                y = Math.floor,
                h = String.fromCharCode
              function d(t) {
                throw RangeError(p[t])
              }
              function g(t, e) {
                for (var r = t.length, n = []; r--; ) n[r] = e(t[r])
                return n
              }
              function m(t, e) {
                var r = t.split('@'),
                  n = ''
                return (
                  r.length > 1 && ((n = r[0] + '@'), (t = r[1])),
                  n + g((t = t.replace(l, '.')).split('.'), e).join('.')
                )
              }
              function v(t) {
                for (var e, r, n = [], o = 0, i = t.length; o < i; )
                  (e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i
                    ? 56320 == (64512 & (r = t.charCodeAt(o++)))
                      ? n.push(((1023 & e) << 10) + (1023 & r) + 65536)
                      : (n.push(e), o--)
                    : n.push(e)
                return n
              }
              function b(t) {
                return g(t, function (t) {
                  var e = ''
                  return (
                    t > 65535 &&
                      ((e += h((((t -= 65536) >>> 10) & 1023) | 55296)),
                      (t = 56320 | (1023 & t))),
                    e + h(t)
                  )
                }).join('')
              }
              function w(t, e) {
                return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
              }
              function O(t, e, r) {
                var n = 0
                for (
                  t = r ? y(t / 700) : t >> 1, t += y(t / e);
                  t > 455;
                  n += c
                )
                  t = y(t / 35)
                return y(n + (36 * t) / (t + 38))
              }
              function E(t) {
                var e,
                  r,
                  n,
                  o,
                  i,
                  a,
                  u,
                  f,
                  l,
                  p,
                  h,
                  g = [],
                  m = t.length,
                  v = 0,
                  w = 128,
                  E = 72
                for ((r = t.lastIndexOf('-')) < 0 && (r = 0), n = 0; n < r; ++n)
                  t.charCodeAt(n) >= 128 && d('not-basic'),
                    g.push(t.charCodeAt(n))
                for (o = r > 0 ? r + 1 : 0; o < m; ) {
                  for (
                    i = v, a = 1, u = c;
                    o >= m && d('invalid-input'),
                      ((f =
                        (h = t.charCodeAt(o++)) - 48 < 10
                          ? h - 22
                          : h - 65 < 26
                          ? h - 65
                          : h - 97 < 26
                          ? h - 97
                          : c) >= c ||
                        f > y((s - v) / a)) &&
                        d('overflow'),
                      (v += f * a),
                      !(f < (l = u <= E ? 1 : u >= E + 26 ? 26 : u - E));
                    u += c
                  )
                    a > y(s / (p = c - l)) && d('overflow'), (a *= p)
                  ;(E = O(v - i, (e = g.length + 1), 0 == i)),
                    y(v / e) > s - w && d('overflow'),
                    (w += y(v / e)),
                    (v %= e),
                    g.splice(v++, 0, w)
                }
                return b(g)
              }
              function S(t) {
                var e,
                  r,
                  n,
                  o,
                  i,
                  a,
                  u,
                  f,
                  l,
                  p,
                  g,
                  m,
                  b,
                  E,
                  S,
                  j = []
                for (
                  m = (t = v(t)).length, e = 128, r = 0, i = 72, a = 0;
                  a < m;
                  ++a
                )
                  (g = t[a]) < 128 && j.push(h(g))
                for (n = o = j.length, o && j.push('-'); n < m; ) {
                  for (u = s, a = 0; a < m; ++a)
                    (g = t[a]) >= e && g < u && (u = g)
                  for (
                    u - e > y((s - r) / (b = n + 1)) && d('overflow'),
                      r += (u - e) * b,
                      e = u,
                      a = 0;
                    a < m;
                    ++a
                  )
                    if (((g = t[a]) < e && ++r > s && d('overflow'), g == e)) {
                      for (
                        f = r, l = c;
                        !(f < (p = l <= i ? 1 : l >= i + 26 ? 26 : l - i));
                        l += c
                      )
                        (S = f - p),
                          (E = c - p),
                          j.push(h(w(p + (S % E), 0))),
                          (f = y(S / E))
                      j.push(h(w(f, 0))), (i = O(r, b, n == o)), (r = 0), ++n
                    }
                  ++r, ++e
                }
                return j.join('')
              }
              ;(a = {
                version: '1.3.2',
                ucs2: { decode: v, encode: b },
                decode: E,
                encode: S,
                toASCII: function (t) {
                  return m(t, function (t) {
                    return f.test(t) ? 'xn--' + S(t) : t
                  })
                },
                toUnicode: function (t) {
                  return m(t, function (t) {
                    return u.test(t) ? E(t.slice(4).toLowerCase()) : t
                  })
                },
              }),
                void 0 ===
                  (n = function () {
                    return a
                  }.call(e, r, e, t)) || (t.exports = n)
            })()
        },
        8575: (t, e, r) => {
          'use strict'
          var n = r(2511),
            o = r(2502)
          function i() {
            ;(this.protocol = null),
              (this.slashes = null),
              (this.auth = null),
              (this.host = null),
              (this.port = null),
              (this.hostname = null),
              (this.hash = null),
              (this.search = null),
              (this.query = null),
              (this.pathname = null),
              (this.path = null),
              (this.href = null)
          }
          ;(e.parse = b),
            (e.resolve = function (t, e) {
              return b(t, !1, !0).resolve(e)
            }),
            (e.resolveObject = function (t, e) {
              return t ? b(t, !1, !0).resolveObject(e) : e
            }),
            (e.format = function (t) {
              return (
                o.isString(t) && (t = b(t)),
                t instanceof i ? t.format() : i.prototype.format.call(t)
              )
            }),
            (e.Url = i)
          var a = /^([a-z0-9.+-]+:)/i,
            s = /:[0-9]*$/,
            c = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
            u = ['{', '}', '|', '\\', '^', '`'].concat([
              '<',
              '>',
              '"',
              '`',
              ' ',
              '\r',
              '\n',
              '\t',
            ]),
            f = ["'"].concat(u),
            l = ['%', '/', '?', ';', '#'].concat(f),
            p = ['/', '?', '#'],
            y = /^[+a-z0-9A-Z_-]{0,63}$/,
            h = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
            d = { javascript: !0, 'javascript:': !0 },
            g = { javascript: !0, 'javascript:': !0 },
            m = {
              http: !0,
              https: !0,
              ftp: !0,
              gopher: !0,
              file: !0,
              'http:': !0,
              'https:': !0,
              'ftp:': !0,
              'gopher:': !0,
              'file:': !0,
            },
            v = r(7673)
          function b(t, e, r) {
            if (t && o.isObject(t) && t instanceof i) return t
            var n = new i()
            return n.parse(t, e, r), n
          }
          ;(i.prototype.parse = function (t, e, r) {
            if (!o.isString(t))
              throw new TypeError(
                "Parameter 'url' must be a string, not " + typeof t
              )
            var i = t.indexOf('?'),
              s = -1 !== i && i < t.indexOf('#') ? '?' : '#',
              u = t.split(s)
            u[0] = u[0].replace(/\\/g, '/')
            var b = (t = u.join(s))
            if (((b = b.trim()), !r && 1 === t.split('#').length)) {
              var w = c.exec(b)
              if (w)
                return (
                  (this.path = b),
                  (this.href = b),
                  (this.pathname = w[1]),
                  w[2]
                    ? ((this.search = w[2]),
                      (this.query = e
                        ? v.parse(this.search.substr(1))
                        : this.search.substr(1)))
                    : e && ((this.search = ''), (this.query = {})),
                  this
                )
            }
            var O = a.exec(b)
            if (O) {
              var E = (O = O[0]).toLowerCase()
              ;(this.protocol = E), (b = b.substr(O.length))
            }
            if (r || O || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
              var S = '//' === b.substr(0, 2)
              !S || (O && g[O]) || ((b = b.substr(2)), (this.slashes = !0))
            }
            if (!g[O] && (S || (O && !m[O]))) {
              for (var j, A, x = -1, P = 0; P < p.length; P++)
                -1 !== (_ = b.indexOf(p[P])) && (-1 === x || _ < x) && (x = _)
              for (
                -1 !==
                  (A = -1 === x ? b.lastIndexOf('@') : b.lastIndexOf('@', x)) &&
                  ((j = b.slice(0, A)),
                  (b = b.slice(A + 1)),
                  (this.auth = decodeURIComponent(j))),
                  x = -1,
                  P = 0;
                P < l.length;
                P++
              ) {
                var _
                ;-1 !== (_ = b.indexOf(l[P])) && (-1 === x || _ < x) && (x = _)
              }
              ;-1 === x && (x = b.length),
                (this.host = b.slice(0, x)),
                (b = b.slice(x)),
                this.parseHost(),
                (this.hostname = this.hostname || '')
              var I =
                '[' === this.hostname[0] &&
                ']' === this.hostname[this.hostname.length - 1]
              if (!I)
                for (
                  var R = this.hostname.split(/\./), T = ((P = 0), R.length);
                  P < T;
                  P++
                ) {
                  var N = R[P]
                  if (N && !N.match(y)) {
                    for (var k = '', U = 0, F = N.length; U < F; U++)
                      N.charCodeAt(U) > 127 ? (k += 'x') : (k += N[U])
                    if (!k.match(y)) {
                      var L = R.slice(0, P),
                        D = R.slice(P + 1),
                        q = N.match(h)
                      q && (L.push(q[1]), D.unshift(q[2])),
                        D.length && (b = '/' + D.join('.') + b),
                        (this.hostname = L.join('.'))
                      break
                    }
                  }
                }
              this.hostname.length > 255
                ? (this.hostname = '')
                : (this.hostname = this.hostname.toLowerCase()),
                I || (this.hostname = n.toASCII(this.hostname))
              var M = this.port ? ':' + this.port : '',
                C = this.hostname || ''
              ;(this.host = C + M),
                (this.href += this.host),
                I &&
                  ((this.hostname = this.hostname.substr(
                    1,
                    this.hostname.length - 2
                  )),
                  '/' !== b[0] && (b = '/' + b))
            }
            if (!d[E])
              for (P = 0, T = f.length; P < T; P++) {
                var B = f[P]
                if (-1 !== b.indexOf(B)) {
                  var $ = encodeURIComponent(B)
                  $ === B && ($ = escape(B)), (b = b.split(B).join($))
                }
              }
            var G = b.indexOf('#')
            ;-1 !== G && ((this.hash = b.substr(G)), (b = b.slice(0, G)))
            var z = b.indexOf('?')
            if (
              (-1 !== z
                ? ((this.search = b.substr(z)),
                  (this.query = b.substr(z + 1)),
                  e && (this.query = v.parse(this.query)),
                  (b = b.slice(0, z)))
                : e && ((this.search = ''), (this.query = {})),
              b && (this.pathname = b),
              m[E] && this.hostname && !this.pathname && (this.pathname = '/'),
              this.pathname || this.search)
            ) {
              M = this.pathname || ''
              var V = this.search || ''
              this.path = M + V
            }
            return (this.href = this.format()), this
          }),
            (i.prototype.format = function () {
              var t = this.auth || ''
              t &&
                ((t = (t = encodeURIComponent(t)).replace(/%3A/i, ':')),
                (t += '@'))
              var e = this.protocol || '',
                r = this.pathname || '',
                n = this.hash || '',
                i = !1,
                a = ''
              this.host
                ? (i = t + this.host)
                : this.hostname &&
                  ((i =
                    t +
                    (-1 === this.hostname.indexOf(':')
                      ? this.hostname
                      : '[' + this.hostname + ']')),
                  this.port && (i += ':' + this.port)),
                this.query &&
                  o.isObject(this.query) &&
                  Object.keys(this.query).length &&
                  (a = v.stringify(this.query))
              var s = this.search || (a && '?' + a) || ''
              return (
                e && ':' !== e.substr(-1) && (e += ':'),
                this.slashes || ((!e || m[e]) && !1 !== i)
                  ? ((i = '//' + (i || '')),
                    r && '/' !== r.charAt(0) && (r = '/' + r))
                  : i || (i = ''),
                n && '#' !== n.charAt(0) && (n = '#' + n),
                s && '?' !== s.charAt(0) && (s = '?' + s),
                e +
                  i +
                  (r = r.replace(/[?#]/g, function (t) {
                    return encodeURIComponent(t)
                  })) +
                  (s = s.replace('#', '%23')) +
                  n
              )
            }),
            (i.prototype.resolve = function (t) {
              return this.resolveObject(b(t, !1, !0)).format()
            }),
            (i.prototype.resolveObject = function (t) {
              if (o.isString(t)) {
                var e = new i()
                e.parse(t, !1, !0), (t = e)
              }
              for (
                var r = new i(), n = Object.keys(this), a = 0;
                a < n.length;
                a++
              ) {
                var s = n[a]
                r[s] = this[s]
              }
              if (((r.hash = t.hash), '' === t.href))
                return (r.href = r.format()), r
              if (t.slashes && !t.protocol) {
                for (var c = Object.keys(t), u = 0; u < c.length; u++) {
                  var f = c[u]
                  'protocol' !== f && (r[f] = t[f])
                }
                return (
                  m[r.protocol] &&
                    r.hostname &&
                    !r.pathname &&
                    (r.path = r.pathname = '/'),
                  (r.href = r.format()),
                  r
                )
              }
              if (t.protocol && t.protocol !== r.protocol) {
                if (!m[t.protocol]) {
                  for (var l = Object.keys(t), p = 0; p < l.length; p++) {
                    var y = l[p]
                    r[y] = t[y]
                  }
                  return (r.href = r.format()), r
                }
                if (((r.protocol = t.protocol), t.host || g[t.protocol]))
                  r.pathname = t.pathname
                else {
                  for (
                    var h = (t.pathname || '').split('/');
                    h.length && !(t.host = h.shift());

                  );
                  t.host || (t.host = ''),
                    t.hostname || (t.hostname = ''),
                    '' !== h[0] && h.unshift(''),
                    h.length < 2 && h.unshift(''),
                    (r.pathname = h.join('/'))
                }
                if (
                  ((r.search = t.search),
                  (r.query = t.query),
                  (r.host = t.host || ''),
                  (r.auth = t.auth),
                  (r.hostname = t.hostname || t.host),
                  (r.port = t.port),
                  r.pathname || r.search)
                ) {
                  var d = r.pathname || '',
                    v = r.search || ''
                  r.path = d + v
                }
                return (
                  (r.slashes = r.slashes || t.slashes), (r.href = r.format()), r
                )
              }
              var b = r.pathname && '/' === r.pathname.charAt(0),
                w = t.host || (t.pathname && '/' === t.pathname.charAt(0)),
                O = w || b || (r.host && t.pathname),
                E = O,
                S = (r.pathname && r.pathname.split('/')) || [],
                j =
                  ((h = (t.pathname && t.pathname.split('/')) || []),
                  r.protocol && !m[r.protocol])
              if (
                (j &&
                  ((r.hostname = ''),
                  (r.port = null),
                  r.host && ('' === S[0] ? (S[0] = r.host) : S.unshift(r.host)),
                  (r.host = ''),
                  t.protocol &&
                    ((t.hostname = null),
                    (t.port = null),
                    t.host &&
                      ('' === h[0] ? (h[0] = t.host) : h.unshift(t.host)),
                    (t.host = null)),
                  (O = O && ('' === h[0] || '' === S[0]))),
                w)
              )
                (r.host = t.host || '' === t.host ? t.host : r.host),
                  (r.hostname =
                    t.hostname || '' === t.hostname ? t.hostname : r.hostname),
                  (r.search = t.search),
                  (r.query = t.query),
                  (S = h)
              else if (h.length)
                S || (S = []),
                  S.pop(),
                  (S = S.concat(h)),
                  (r.search = t.search),
                  (r.query = t.query)
              else if (!o.isNullOrUndefined(t.search))
                return (
                  j &&
                    ((r.hostname = r.host = S.shift()),
                    (I =
                      !!(r.host && r.host.indexOf('@') > 0) &&
                      r.host.split('@')) &&
                      ((r.auth = I.shift()),
                      (r.host = r.hostname = I.shift()))),
                  (r.search = t.search),
                  (r.query = t.query),
                  (o.isNull(r.pathname) && o.isNull(r.search)) ||
                    (r.path =
                      (r.pathname ? r.pathname : '') +
                      (r.search ? r.search : '')),
                  (r.href = r.format()),
                  r
                )
              if (!S.length)
                return (
                  (r.pathname = null),
                  r.search ? (r.path = '/' + r.search) : (r.path = null),
                  (r.href = r.format()),
                  r
                )
              for (
                var A = S.slice(-1)[0],
                  x =
                    ((r.host || t.host || S.length > 1) &&
                      ('.' === A || '..' === A)) ||
                    '' === A,
                  P = 0,
                  _ = S.length;
                _ >= 0;
                _--
              )
                '.' === (A = S[_])
                  ? S.splice(_, 1)
                  : '..' === A
                  ? (S.splice(_, 1), P++)
                  : P && (S.splice(_, 1), P--)
              if (!O && !E) for (; P--; P) S.unshift('..')
              !O ||
                '' === S[0] ||
                (S[0] && '/' === S[0].charAt(0)) ||
                S.unshift(''),
                x && '/' !== S.join('/').substr(-1) && S.push('')
              var I,
                R = '' === S[0] || (S[0] && '/' === S[0].charAt(0))
              return (
                j &&
                  ((r.hostname = r.host = R ? '' : S.length ? S.shift() : ''),
                  (I =
                    !!(r.host && r.host.indexOf('@') > 0) &&
                    r.host.split('@')) &&
                    ((r.auth = I.shift()), (r.host = r.hostname = I.shift()))),
                (O = O || (r.host && S.length)) && !R && S.unshift(''),
                S.length
                  ? (r.pathname = S.join('/'))
                  : ((r.pathname = null), (r.path = null)),
                (o.isNull(r.pathname) && o.isNull(r.search)) ||
                  (r.path =
                    (r.pathname ? r.pathname : '') +
                    (r.search ? r.search : '')),
                (r.auth = t.auth || r.auth),
                (r.slashes = r.slashes || t.slashes),
                (r.href = r.format()),
                r
              )
            }),
            (i.prototype.parseHost = function () {
              var t = this.host,
                e = s.exec(t)
              e &&
                (':' !== (e = e[0]) && (this.port = e.substr(1)),
                (t = t.substr(0, t.length - e.length))),
                t && (this.hostname = t)
            })
        },
        2502: (t) => {
          'use strict'
          t.exports = {
            isString: function (t) {
              return 'string' == typeof t
            },
            isObject: function (t) {
              return 'object' == typeof t && null !== t
            },
            isNull: function (t) {
              return null === t
            },
            isNullOrUndefined: function (t) {
              return null == t
            },
          }
        },
        384: (t) => {
          t.exports = function (t) {
            return (
              t &&
              'object' == typeof t &&
              'function' == typeof t.copy &&
              'function' == typeof t.fill &&
              'function' == typeof t.readUInt8
            )
          }
        },
        5955: (t, e, r) => {
          'use strict'
          var n = r(2584),
            o = r(8662),
            i = r(6430),
            a = r(5692)
          function s(t) {
            return t.call.bind(t)
          }
          var c = 'undefined' != typeof BigInt,
            u = 'undefined' != typeof Symbol,
            f = s(Object.prototype.toString),
            l = s(Number.prototype.valueOf),
            p = s(String.prototype.valueOf),
            y = s(Boolean.prototype.valueOf)
          if (c) var h = s(BigInt.prototype.valueOf)
          if (u) var d = s(Symbol.prototype.valueOf)
          function g(t, e) {
            if ('object' != typeof t) return !1
            try {
              return e(t), !0
            } catch (t) {
              return !1
            }
          }
          function m(t) {
            return '[object Map]' === f(t)
          }
          function v(t) {
            return '[object Set]' === f(t)
          }
          function b(t) {
            return '[object WeakMap]' === f(t)
          }
          function w(t) {
            return '[object WeakSet]' === f(t)
          }
          function O(t) {
            return '[object ArrayBuffer]' === f(t)
          }
          function E(t) {
            return (
              'undefined' != typeof ArrayBuffer &&
              (O.working ? O(t) : t instanceof ArrayBuffer)
            )
          }
          function S(t) {
            return '[object DataView]' === f(t)
          }
          function j(t) {
            return (
              'undefined' != typeof DataView &&
              (S.working ? S(t) : t instanceof DataView)
            )
          }
          function A(t) {
            return '[object SharedArrayBuffer]' === f(t)
          }
          function x(t) {
            return (
              'undefined' != typeof SharedArrayBuffer &&
              (A.working ? A(t) : t instanceof SharedArrayBuffer)
            )
          }
          function P(t) {
            return g(t, l)
          }
          function _(t) {
            return g(t, p)
          }
          function I(t) {
            return g(t, y)
          }
          function R(t) {
            return c && g(t, h)
          }
          function T(t) {
            return u && g(t, d)
          }
          ;(e.isArgumentsObject = n),
            (e.isGeneratorFunction = o),
            (e.isTypedArray = a),
            (e.isPromise = function (t) {
              return (
                ('undefined' != typeof Promise && t instanceof Promise) ||
                (null !== t &&
                  'object' == typeof t &&
                  'function' == typeof t.then &&
                  'function' == typeof t.catch)
              )
            }),
            (e.isArrayBufferView = function (t) {
              return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                ? ArrayBuffer.isView(t)
                : a(t) || j(t)
            }),
            (e.isUint8Array = function (t) {
              return 'Uint8Array' === i(t)
            }),
            (e.isUint8ClampedArray = function (t) {
              return 'Uint8ClampedArray' === i(t)
            }),
            (e.isUint16Array = function (t) {
              return 'Uint16Array' === i(t)
            }),
            (e.isUint32Array = function (t) {
              return 'Uint32Array' === i(t)
            }),
            (e.isInt8Array = function (t) {
              return 'Int8Array' === i(t)
            }),
            (e.isInt16Array = function (t) {
              return 'Int16Array' === i(t)
            }),
            (e.isInt32Array = function (t) {
              return 'Int32Array' === i(t)
            }),
            (e.isFloat32Array = function (t) {
              return 'Float32Array' === i(t)
            }),
            (e.isFloat64Array = function (t) {
              return 'Float64Array' === i(t)
            }),
            (e.isBigInt64Array = function (t) {
              return 'BigInt64Array' === i(t)
            }),
            (e.isBigUint64Array = function (t) {
              return 'BigUint64Array' === i(t)
            }),
            (m.working = 'undefined' != typeof Map && m(new Map())),
            (e.isMap = function (t) {
              return (
                'undefined' != typeof Map &&
                (m.working ? m(t) : t instanceof Map)
              )
            }),
            (v.working = 'undefined' != typeof Set && v(new Set())),
            (e.isSet = function (t) {
              return (
                'undefined' != typeof Set &&
                (v.working ? v(t) : t instanceof Set)
              )
            }),
            (b.working = 'undefined' != typeof WeakMap && b(new WeakMap())),
            (e.isWeakMap = function (t) {
              return (
                'undefined' != typeof WeakMap &&
                (b.working ? b(t) : t instanceof WeakMap)
              )
            }),
            (w.working = 'undefined' != typeof WeakSet && w(new WeakSet())),
            (e.isWeakSet = function (t) {
              return w(t)
            }),
            (O.working =
              'undefined' != typeof ArrayBuffer && O(new ArrayBuffer())),
            (e.isArrayBuffer = E),
            (S.working =
              'undefined' != typeof ArrayBuffer &&
              'undefined' != typeof DataView &&
              S(new DataView(new ArrayBuffer(1), 0, 1))),
            (e.isDataView = j),
            (A.working =
              'undefined' != typeof SharedArrayBuffer &&
              A(new SharedArrayBuffer())),
            (e.isSharedArrayBuffer = x),
            (e.isAsyncFunction = function (t) {
              return '[object AsyncFunction]' === f(t)
            }),
            (e.isMapIterator = function (t) {
              return '[object Map Iterator]' === f(t)
            }),
            (e.isSetIterator = function (t) {
              return '[object Set Iterator]' === f(t)
            }),
            (e.isGeneratorObject = function (t) {
              return '[object Generator]' === f(t)
            }),
            (e.isWebAssemblyCompiledModule = function (t) {
              return '[object WebAssembly.Module]' === f(t)
            }),
            (e.isNumberObject = P),
            (e.isStringObject = _),
            (e.isBooleanObject = I),
            (e.isBigIntObject = R),
            (e.isSymbolObject = T),
            (e.isBoxedPrimitive = function (t) {
              return P(t) || _(t) || I(t) || R(t) || T(t)
            }),
            (e.isAnyArrayBuffer = function (t) {
              return 'undefined' != typeof Uint8Array && (E(t) || x(t))
            }),
            ['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(
              function (t) {
                Object.defineProperty(e, t, {
                  enumerable: !1,
                  value: function () {
                    throw new Error(t + ' is not supported in userland')
                  },
                })
              }
            )
        },
        9539: (t, e, r) => {
          var n = r(4155),
            o = r(5108),
            i =
              Object.getOwnPropertyDescriptors ||
              function (t) {
                for (var e = Object.keys(t), r = {}, n = 0; n < e.length; n++)
                  r[e[n]] = Object.getOwnPropertyDescriptor(t, e[n])
                return r
              },
            a = /%[sdj%]/g
          ;(e.format = function (t) {
            if (!w(t)) {
              for (var e = [], r = 0; r < arguments.length; r++)
                e.push(f(arguments[r]))
              return e.join(' ')
            }
            r = 1
            for (
              var n = arguments,
                o = n.length,
                i = String(t).replace(a, function (t) {
                  if ('%%' === t) return '%'
                  if (r >= o) return t
                  switch (t) {
                    case '%s':
                      return String(n[r++])
                    case '%d':
                      return Number(n[r++])
                    case '%j':
                      try {
                        return JSON.stringify(n[r++])
                      } catch (t) {
                        return '[Circular]'
                      }
                    default:
                      return t
                  }
                }),
                s = n[r];
              r < o;
              s = n[++r]
            )
              v(s) || !S(s) ? (i += ' ' + s) : (i += ' ' + f(s))
            return i
          }),
            (e.deprecate = function (t, r) {
              if (void 0 !== n && !0 === n.noDeprecation) return t
              if (void 0 === n)
                return function () {
                  return e.deprecate(t, r).apply(this, arguments)
                }
              var i = !1
              return function () {
                if (!i) {
                  if (n.throwDeprecation) throw new Error(r)
                  n.traceDeprecation ? o.trace(r) : o.error(r), (i = !0)
                }
                return t.apply(this, arguments)
              }
            })
          var s = {},
            c = /^$/
          if (n.env.NODE_DEBUG) {
            var u = n.env.NODE_DEBUG
            ;(u = u
              .replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
              .replace(/\*/g, '.*')
              .replace(/,/g, '$|^')
              .toUpperCase()),
              (c = new RegExp('^' + u + '$', 'i'))
          }
          function f(t, r) {
            var n = { seen: [], stylize: p }
            return (
              arguments.length >= 3 && (n.depth = arguments[2]),
              arguments.length >= 4 && (n.colors = arguments[3]),
              m(r) ? (n.showHidden = r) : r && e._extend(n, r),
              O(n.showHidden) && (n.showHidden = !1),
              O(n.depth) && (n.depth = 2),
              O(n.colors) && (n.colors = !1),
              O(n.customInspect) && (n.customInspect = !0),
              n.colors && (n.stylize = l),
              y(n, t, n.depth)
            )
          }
          function l(t, e) {
            var r = f.styles[e]
            return r
              ? '[' + f.colors[r][0] + 'm' + t + '[' + f.colors[r][1] + 'm'
              : t
          }
          function p(t, e) {
            return t
          }
          function y(t, r, n) {
            if (
              t.customInspect &&
              r &&
              x(r.inspect) &&
              r.inspect !== e.inspect &&
              (!r.constructor || r.constructor.prototype !== r)
            ) {
              var o = r.inspect(n, t)
              return w(o) || (o = y(t, o, n)), o
            }
            var i = (function (t, e) {
              if (O(e)) return t.stylize('undefined', 'undefined')
              if (w(e)) {
                var r =
                  "'" +
                  JSON.stringify(e)
                    .replace(/^"|"$/g, '')
                    .replace(/'/g, "\\'")
                    .replace(/\\"/g, '"') +
                  "'"
                return t.stylize(r, 'string')
              }
              return b(e)
                ? t.stylize('' + e, 'number')
                : m(e)
                ? t.stylize('' + e, 'boolean')
                : v(e)
                ? t.stylize('null', 'null')
                : void 0
            })(t, r)
            if (i) return i
            var a = Object.keys(r),
              s = (function (t) {
                var e = {}
                return (
                  t.forEach(function (t, r) {
                    e[t] = !0
                  }),
                  e
                )
              })(a)
            if (
              (t.showHidden && (a = Object.getOwnPropertyNames(r)),
              A(r) &&
                (a.indexOf('message') >= 0 || a.indexOf('description') >= 0))
            )
              return h(r)
            if (0 === a.length) {
              if (x(r)) {
                var c = r.name ? ': ' + r.name : ''
                return t.stylize('[Function' + c + ']', 'special')
              }
              if (E(r))
                return t.stylize(RegExp.prototype.toString.call(r), 'regexp')
              if (j(r))
                return t.stylize(Date.prototype.toString.call(r), 'date')
              if (A(r)) return h(r)
            }
            var u,
              f = '',
              l = !1,
              p = ['{', '}']
            return (
              g(r) && ((l = !0), (p = ['[', ']'])),
              x(r) && (f = ' [Function' + (r.name ? ': ' + r.name : '') + ']'),
              E(r) && (f = ' ' + RegExp.prototype.toString.call(r)),
              j(r) && (f = ' ' + Date.prototype.toUTCString.call(r)),
              A(r) && (f = ' ' + h(r)),
              0 !== a.length || (l && 0 != r.length)
                ? n < 0
                  ? E(r)
                    ? t.stylize(RegExp.prototype.toString.call(r), 'regexp')
                    : t.stylize('[Object]', 'special')
                  : (t.seen.push(r),
                    (u = l
                      ? (function (t, e, r, n, o) {
                          for (var i = [], a = 0, s = e.length; a < s; ++a)
                            T(e, String(a))
                              ? i.push(d(t, e, r, n, String(a), !0))
                              : i.push('')
                          return (
                            o.forEach(function (o) {
                              o.match(/^\d+$/) || i.push(d(t, e, r, n, o, !0))
                            }),
                            i
                          )
                        })(t, r, n, s, a)
                      : a.map(function (e) {
                          return d(t, r, n, s, e, l)
                        })),
                    t.seen.pop(),
                    (function (t, e, r) {
                      return t.reduce(function (t, e) {
                        return (
                          e.indexOf('\n'),
                          t + e.replace(/\u001b\[\d\d?m/g, '').length + 1
                        )
                      }, 0) > 60
                        ? r[0] +
                            ('' === e ? '' : e + '\n ') +
                            ' ' +
                            t.join(',\n  ') +
                            ' ' +
                            r[1]
                        : r[0] + e + ' ' + t.join(', ') + ' ' + r[1]
                    })(u, f, p))
                : p[0] + f + p[1]
            )
          }
          function h(t) {
            return '[' + Error.prototype.toString.call(t) + ']'
          }
          function d(t, e, r, n, o, i) {
            var a, s, c
            if (
              ((c = Object.getOwnPropertyDescriptor(e, o) || { value: e[o] })
                .get
                ? (s = c.set
                    ? t.stylize('[Getter/Setter]', 'special')
                    : t.stylize('[Getter]', 'special'))
                : c.set && (s = t.stylize('[Setter]', 'special')),
              T(n, o) || (a = '[' + o + ']'),
              s ||
                (t.seen.indexOf(c.value) < 0
                  ? (s = v(r)
                      ? y(t, c.value, null)
                      : y(t, c.value, r - 1)).indexOf('\n') > -1 &&
                    (s = i
                      ? s
                          .split('\n')
                          .map(function (t) {
                            return '  ' + t
                          })
                          .join('\n')
                          .substr(2)
                      : '\n' +
                        s
                          .split('\n')
                          .map(function (t) {
                            return '   ' + t
                          })
                          .join('\n'))
                  : (s = t.stylize('[Circular]', 'special'))),
              O(a))
            ) {
              if (i && o.match(/^\d+$/)) return s
              ;(a = JSON.stringify('' + o)).match(
                /^"([a-zA-Z_][a-zA-Z_0-9]*)"$/
              )
                ? ((a = a.substr(1, a.length - 2)), (a = t.stylize(a, 'name')))
                : ((a = a
                    .replace(/'/g, "\\'")
                    .replace(/\\"/g, '"')
                    .replace(/(^"|"$)/g, "'")),
                  (a = t.stylize(a, 'string')))
            }
            return a + ': ' + s
          }
          function g(t) {
            return Array.isArray(t)
          }
          function m(t) {
            return 'boolean' == typeof t
          }
          function v(t) {
            return null === t
          }
          function b(t) {
            return 'number' == typeof t
          }
          function w(t) {
            return 'string' == typeof t
          }
          function O(t) {
            return void 0 === t
          }
          function E(t) {
            return S(t) && '[object RegExp]' === P(t)
          }
          function S(t) {
            return 'object' == typeof t && null !== t
          }
          function j(t) {
            return S(t) && '[object Date]' === P(t)
          }
          function A(t) {
            return S(t) && ('[object Error]' === P(t) || t instanceof Error)
          }
          function x(t) {
            return 'function' == typeof t
          }
          function P(t) {
            return Object.prototype.toString.call(t)
          }
          function _(t) {
            return t < 10 ? '0' + t.toString(10) : t.toString(10)
          }
          ;(e.debuglog = function (t) {
            if (((t = t.toUpperCase()), !s[t]))
              if (c.test(t)) {
                var r = n.pid
                s[t] = function () {
                  var n = e.format.apply(e, arguments)
                  o.error('%s %d: %s', t, r, n)
                }
              } else s[t] = function () {}
            return s[t]
          }),
            (e.inspect = f),
            (f.colors = {
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
            }),
            (f.styles = {
              special: 'cyan',
              number: 'yellow',
              boolean: 'yellow',
              undefined: 'grey',
              null: 'bold',
              string: 'green',
              date: 'magenta',
              regexp: 'red',
            }),
            (e.types = r(5955)),
            (e.isArray = g),
            (e.isBoolean = m),
            (e.isNull = v),
            (e.isNullOrUndefined = function (t) {
              return null == t
            }),
            (e.isNumber = b),
            (e.isString = w),
            (e.isSymbol = function (t) {
              return 'symbol' == typeof t
            }),
            (e.isUndefined = O),
            (e.isRegExp = E),
            (e.types.isRegExp = E),
            (e.isObject = S),
            (e.isDate = j),
            (e.types.isDate = j),
            (e.isError = A),
            (e.types.isNativeError = A),
            (e.isFunction = x),
            (e.isPrimitive = function (t) {
              return (
                null === t ||
                'boolean' == typeof t ||
                'number' == typeof t ||
                'string' == typeof t ||
                'symbol' == typeof t ||
                void 0 === t
              )
            }),
            (e.isBuffer = r(384))
          var I = [
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
          function R() {
            var t = new Date(),
              e = [_(t.getHours()), _(t.getMinutes()), _(t.getSeconds())].join(
                ':'
              )
            return [t.getDate(), I[t.getMonth()], e].join(' ')
          }
          function T(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }
          ;(e.log = function () {
            o.log('%s - %s', R(), e.format.apply(e, arguments))
          }),
            (e.inherits = r(5717)),
            (e._extend = function (t, e) {
              if (!e || !S(e)) return t
              for (var r = Object.keys(e), n = r.length; n--; )
                t[r[n]] = e[r[n]]
              return t
            })
          var N =
            'undefined' != typeof Symbol
              ? Symbol('util.promisify.custom')
              : void 0
          function k(t, e) {
            if (!t) {
              var r = new Error('Promise was rejected with a falsy value')
              ;(r.reason = t), (t = r)
            }
            return e(t)
          }
          ;(e.promisify = function (t) {
            if ('function' != typeof t)
              throw new TypeError(
                'The "original" argument must be of type Function'
              )
            if (N && t[N]) {
              var e
              if ('function' != typeof (e = t[N]))
                throw new TypeError(
                  'The "util.promisify.custom" argument must be of type Function'
                )
              return (
                Object.defineProperty(e, N, {
                  value: e,
                  enumerable: !1,
                  writable: !1,
                  configurable: !0,
                }),
                e
              )
            }
            function e() {
              for (
                var e,
                  r,
                  n = new Promise(function (t, n) {
                    ;(e = t), (r = n)
                  }),
                  o = [],
                  i = 0;
                i < arguments.length;
                i++
              )
                o.push(arguments[i])
              o.push(function (t, n) {
                t ? r(t) : e(n)
              })
              try {
                t.apply(this, o)
              } catch (t) {
                r(t)
              }
              return n
            }
            return (
              Object.setPrototypeOf(e, Object.getPrototypeOf(t)),
              N &&
                Object.defineProperty(e, N, {
                  value: e,
                  enumerable: !1,
                  writable: !1,
                  configurable: !0,
                }),
              Object.defineProperties(e, i(t))
            )
          }),
            (e.promisify.custom = N),
            (e.callbackify = function (t) {
              if ('function' != typeof t)
                throw new TypeError(
                  'The "original" argument must be of type Function'
                )
              function e() {
                for (var e = [], r = 0; r < arguments.length; r++)
                  e.push(arguments[r])
                var o = e.pop()
                if ('function' != typeof o)
                  throw new TypeError(
                    'The last argument must be of type Function'
                  )
                var i = this,
                  a = function () {
                    return o.apply(i, arguments)
                  }
                t.apply(this, e).then(
                  function (t) {
                    n.nextTick(a.bind(null, null, t))
                  },
                  function (t) {
                    n.nextTick(k.bind(null, t, a))
                  }
                )
              }
              return (
                Object.setPrototypeOf(e, Object.getPrototypeOf(t)),
                Object.defineProperties(e, i(t)),
                e
              )
            })
        },
        6430: (t, e, r) => {
          'use strict'
          var n = r(9804),
            o = r(6314),
            i = r(1924),
            a = i('Object.prototype.toString'),
            s = r(1405)() && 'symbol' == typeof Symbol.toStringTag,
            c = o(),
            u = i('String.prototype.slice'),
            f = {},
            l = r(4079),
            p = Object.getPrototypeOf
          s &&
            l &&
            p &&
            n(c, function (t) {
              if ('function' == typeof r.g[t]) {
                var e = new r.g[t]()
                if (!(Symbol.toStringTag in e))
                  throw new EvalError(
                    'this engine has support for Symbol.toStringTag, but ' +
                      t +
                      ' does not have the property! Please report this.'
                  )
                var n = p(e),
                  o = l(n, Symbol.toStringTag)
                if (!o) {
                  var i = p(n)
                  o = l(i, Symbol.toStringTag)
                }
                f[t] = o.get
              }
            })
          var y = r(5692)
          t.exports = function (t) {
            return (
              !!y(t) &&
              (s
                ? (function (t) {
                    var e = !1
                    return (
                      n(f, function (r, n) {
                        if (!e)
                          try {
                            var o = r.call(t)
                            o === n && (e = o)
                          } catch (t) {}
                      }),
                      e
                    )
                  })(t)
                : u(a(t), 8, -1))
            )
          }
        },
      },
      e = {}
    function r(n) {
      var o = e[n]
      if (void 0 !== o) return o.exports
      var i = (e[n] = { id: n, loaded: !1, exports: {} })
      return t[n].call(i.exports, i, i.exports, r), (i.loaded = !0), i.exports
    }
    ;(r.d = (t, e) => {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] })
    }),
      (r.g = (function () {
        if ('object' == typeof globalThis) return globalThis
        try {
          return this || new Function('return this')()
        } catch (t) {
          if ('object' == typeof window) return window
        }
      })()),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = (t) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (r.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t))
    var n = {}
    return (
      (() => {
        'use strict'
        var t = n
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.ImgurClient = void 0)
        var e = r(5934)
        Object.defineProperty(t, 'ImgurClient', {
          enumerable: !0,
          get: function () {
            return e.ImgurClient
          },
        })
      })(),
      n
    )
  })()
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbWd1ci1hcGkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hcnJheS1maWx0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9hc3NlcnQuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2Fzc2VydC9idWlsZC9pbnRlcm5hbC9hc3NlcnQvYXNzZXJ0aW9uX2Vycm9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvZXJyb3JzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9hc3NlcnQvYnVpbGQvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXZhaWxhYmxlLXR5cGVkLWFycmF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2NvbnNvbGUtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZGVmaW5lLXByb3BlcnRpZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L2hlbHBlcnMvZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9lczYtb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZm9yZWFjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvZm9ybS1kYXRhL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2ltcGxlbWVudGF0aW9uLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9nZXQtaW50cmluc2ljL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9oYXMtc3ltYm9scy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvc2hhbXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2lzLWFyZ3VtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtZ2VuZXJhdG9yLWZ1bmN0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9pcy1uYW4vaW1wbGVtZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL2lzLW5hbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtbmFuL3BvbHlmaWxsLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9pcy1uYW4vc2hpbS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvaXMtdHlwZWQtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL2luZGV4LmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9zaGltLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvb2JqZWN0LWtleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL29iamVjdC1rZXlzL2lzQXJndW1lbnRzLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2RlY29kZS5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmcvZW5jb2RlLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvYWxidW0vZ2V0QWxidW0udHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2FsYnVtL2luZGV4LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2NvbW1vbi9lbmRwb2ludHMudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2NvbW1vbi90eXBlcy50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvY29tbW9uL3V0aWxzLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9nYWxsZXJ5L2dldEdhbGxlcnkudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2dhbGxlcnkvZ2V0U3VicmVkZGl0R2FsbGVyeS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvZ2FsbGVyeS9pbmRleC50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvZ2FsbGVyeS9zZWFyY2hHYWxsZXJ5LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9nZXRBdXRob3JpemF0aW9uSGVhZGVyLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9pbWFnZS9kZWxldGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvZmF2b3JpdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvZ2V0SW1hZ2UudHMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2ltYWdlL2luZGV4LnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL3NyYy9pbWFnZS91cGRhdGVJbWFnZS50cyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9zcmMvaW1hZ2UvdXBsb2FkLnRzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC9ub2RlX21vZHVsZXMvcHVueWNvZGUvcHVueWNvZGUuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC91cmwuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3VybC91dGlsLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzIiwid2VicGFjazovL2ltZ3VyLWFwaS8uL25vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vbm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIndlYnBhY2s6Ly9pbWd1ci1hcGkvLi9ub2RlX21vZHVsZXMvd2hpY2gtdHlwZWQtYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ltZ3VyLWFwaS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vaW1ndXItYXBpLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsInNlbGYiLCJ0aGlzIiwiYXJyIiwiZm4iLCJmaWx0ZXIiLCJUeXBlRXJyb3IiLCJyZXQiLCJpIiwibGVuZ3RoIiwiaGFzT3duIiwiY2FsbCIsInZhbCIsInB1c2giLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsIl90eXBlb2YiLCJvYmoiLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwiaXNEZWVwRXF1YWwiLCJpc0RlZXBTdHJpY3RFcXVhbCIsIl9yZXF1aXJlJGNvZGVzIiwiY29kZXMiLCJFUlJfQU1CSUdVT1VTX0FSR1VNRU5UIiwiRVJSX0lOVkFMSURfQVJHX1RZUEUiLCJFUlJfSU5WQUxJRF9BUkdfVkFMVUUiLCJFUlJfSU5WQUxJRF9SRVRVUk5fVkFMVUUiLCJFUlJfTUlTU0lOR19BUkdTIiwiQXNzZXJ0aW9uRXJyb3IiLCJpbnNwZWN0IiwiX3JlcXVpcmUkdHlwZXMiLCJpc1Byb21pc2UiLCJpc1JlZ0V4cCIsIm9iamVjdEFzc2lnbiIsImFzc2lnbiIsIm9iamVjdElzIiwiaXMiLCJsYXp5TG9hZENvbXBhcmlzb24iLCJjb21wYXJpc29uIiwiTWFwIiwid2FybmVkIiwiYXNzZXJ0Iiwib2siLCJOT19FWENFUFRJT05fU0VOVElORUwiLCJpbm5lckZhaWwiLCJtZXNzYWdlIiwiRXJyb3IiLCJpbm5lck9rIiwiYXJnTGVuIiwidmFsdWUiLCJnZW5lcmF0ZWRNZXNzYWdlIiwiZXJyIiwiYWN0dWFsIiwiZXhwZWN0ZWQiLCJvcGVyYXRvciIsInN0YWNrU3RhcnRGbiIsIl9sZW4iLCJhcmd1bWVudHMiLCJhcmdzIiwiQXJyYXkiLCJfa2V5IiwiYXBwbHkiLCJjb25jYXQiLCJmYWlsIiwiaW50ZXJuYWxNZXNzYWdlIiwiYXJnc0xlbiIsInVuZGVmaW5lZCIsIndhcm4iLCJwcm9jZXNzIiwiZW1pdFdhcm5pbmciLCJjb25zb2xlIiwiYmluZCIsImVyckFyZ3MiLCJlcXVhbCIsIm5vdEVxdWFsIiwiZGVlcEVxdWFsIiwibm90RGVlcEVxdWFsIiwiZGVlcFN0cmljdEVxdWFsIiwibm90RGVlcFN0cmljdEVxdWFsIiwic3RyaWN0RXF1YWwiLCJub3RTdHJpY3RFcXVhbCIsIkNvbXBhcmlzb24iLCJrZXlzIiwiX3RoaXMiLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiX2NsYXNzQ2FsbENoZWNrIiwiZm9yRWFjaCIsImtleSIsInRlc3QiLCJjb21wYXJlRXhjZXB0aW9uS2V5IiwiYSIsImIiLCJuYW1lIiwiZXhwZWN0ZWRFeGNlcHRpb24iLCJtc2ciLCJpc1Byb3RvdHlwZU9mIiwiZ2V0QWN0dWFsIiwiZSIsImNoZWNrSXNQcm9taXNlIiwidGhlbiIsImNhdGNoIiwid2FpdEZvckFjdHVhbCIsInByb21pc2VGbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzdWx0UHJvbWlzZSIsImV4cGVjdHNFcnJvciIsImVycm9yIiwiZGV0YWlscyIsImZuVHlwZSIsImV4cGVjdHNOb0Vycm9yIiwic3RyaWN0IiwiX2xlbjYiLCJfa2V5NiIsInRocm93cyIsIl9sZW4yIiwiX2tleTIiLCJyZWplY3RzIiwiX2xlbjMiLCJfa2V5MyIsInJlc3VsdCIsImRvZXNOb3RUaHJvdyIsIl9sZW40IiwiX2tleTQiLCJkb2VzTm90UmVqZWN0IiwiX2xlbjUiLCJfa2V5NSIsImlmRXJyb3IiLCJuZXdFcnIiLCJvcmlnU3RhY2siLCJzdGFjayIsInRtcDIiLCJzcGxpdCIsInNoaWZ0IiwidG1wMSIsInBvcyIsImluZGV4T2YiLCJzbGljZSIsImpvaW4iLCJfZGVmaW5lUHJvcGVydHkiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJfYXNzZXJ0VGhpc0luaXRpYWxpemVkIiwiUmVmZXJlbmNlRXJyb3IiLCJfd3JhcE5hdGl2ZVN1cGVyIiwiQ2xhc3MiLCJfY2FjaGUiLCJGdW5jdGlvbiIsInRvU3RyaW5nIiwiaGFzIiwiZ2V0Iiwic2V0IiwiV3JhcHBlciIsIl9jb25zdHJ1Y3QiLCJfZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJfc2V0UHJvdG90eXBlT2YiLCJpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QiLCJSZWZsZWN0IiwiY29uc3RydWN0Iiwic2hhbSIsIlByb3h5IiwiRGF0ZSIsIlBhcmVudCIsIm8iLCJwIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJnZXRQcm90b3R5cGVPZiIsImVuZHNXaXRoIiwic3RyIiwic2VhcmNoIiwidGhpc19sZW4iLCJzdWJzdHJpbmciLCJibHVlIiwiZ3JlZW4iLCJyZWQiLCJ3aGl0ZSIsImtSZWFkYWJsZU9wZXJhdG9yIiwic3RyaWN0RXF1YWxPYmplY3QiLCJub3RTdHJpY3RFcXVhbE9iamVjdCIsIm5vdElkZW50aWNhbCIsImNvcHlFcnJvciIsInNvdXJjZSIsImluc3BlY3RWYWx1ZSIsImNvbXBhY3QiLCJjdXN0b21JbnNwZWN0IiwiZGVwdGgiLCJtYXhBcnJheUxlbmd0aCIsIkluZmluaXR5Iiwic2hvd0hpZGRlbiIsImJyZWFrTGVuZ3RoIiwic2hvd1Byb3h5Iiwic29ydGVkIiwiZ2V0dGVycyIsIl9FcnJvciIsIm9wdGlvbnMiLCJsaW1pdCIsInN0YWNrVHJhY2VMaW1pdCIsIlN0cmluZyIsInN0ZGVyciIsImlzVFRZIiwiZ2V0Q29sb3JEZXB0aCIsIm90aGVyIiwicmVzIiwibGFzdFBvcyIsImVuZCIsInNraXBwZWQiLCJhY3R1YWxJbnNwZWN0ZWQiLCJhY3R1YWxMaW5lcyIsImV4cGVjdGVkTGluZXMiLCJpbmRpY2F0b3IiLCJpbnB1dExlbmd0aCIsImNvbHVtbnMiLCJjb3VudCIsIk1hdGgiLCJmbG9vciIsIm1heENvdW50IiwibG9nIiwicmVwZWF0IiwicG9wIiwibWF4TGluZXMiLCJtYXgiLCJfYWN0dWFsTGluZXMiLCJwcmludGVkTGluZXMiLCJza2lwcGVkTXNnIiwiY3VyIiwiZXhwZWN0ZWRMaW5lIiwiYWN0dWFsTGluZSIsImRpdmVyZ2luZ0xpbmVzIiwiY3JlYXRlRXJyRGlmZiIsImJhc2UiLCJfcmVzIiwia25vd25PcGVyYXRvcnMiLCJjb2RlIiwiY2FwdHVyZVN0YWNrVHJhY2UiLCJwcm90b1Byb3BzIiwic3ViQ2xhc3MiLCJzdXBlckNsYXNzIiwiX2luaGVyaXRzIiwiY3VzdG9tIiwicmVjdXJzZVRpbWVzIiwiY3R4Iiwib3duS2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIl9vYmplY3RTcHJlYWQiLCJ1dGlsIiwiY3JlYXRlRXJyb3JUeXBlIiwiQmFzZSIsIk5vZGVFcnJvciIsIl9CYXNlIiwiYXJnMSIsImFyZzIiLCJhcmczIiwiZ2V0TWVzc2FnZSIsIm9uZU9mIiwidGhpbmciLCJpc0FycmF5IiwibGVuIiwibWFwIiwiZGV0ZXJtaW5lciIsInN0YXJ0Iiwic3Vic3RyIiwicmVwbGFjZSIsInR5cGUiLCJyZWFzb24iLCJpbnNwZWN0ZWQiLCJSYW5nZUVycm9yIiwiaW5wdXQiLCJfc2xpY2VkVG9BcnJheSIsIl9hcnJheVdpdGhIb2xlcyIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJfcyIsIl9pIiwibmV4dCIsImRvbmUiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfbm9uSXRlcmFibGVSZXN0IiwicmVnZXhGbGFnc1N1cHBvcnRlZCIsImZsYWdzIiwiYXJyYXlGcm9tU2V0IiwiYXJyYXkiLCJhcnJheUZyb21NYXAiLCJvYmplY3RHZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJudW1iZXJJc05hTiIsIk51bWJlciIsImlzTmFOIiwidW5jdXJyeVRoaXMiLCJmIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJvYmplY3RUb1N0cmluZyIsImlzQW55QXJyYXlCdWZmZXIiLCJpc0FycmF5QnVmZmVyVmlldyIsImlzRGF0ZSIsImlzTWFwIiwiaXNTZXQiLCJpc05hdGl2ZUVycm9yIiwiaXNCb3hlZFByaW1pdGl2ZSIsImlzTnVtYmVyT2JqZWN0IiwiaXNTdHJpbmdPYmplY3QiLCJpc0Jvb2xlYW5PYmplY3QiLCJpc0JpZ0ludE9iamVjdCIsImlzU3ltYm9sT2JqZWN0IiwiaXNGbG9hdDMyQXJyYXkiLCJpc0Zsb2F0NjRBcnJheSIsImlzTm9uSW5kZXgiLCJjaGFyQ29kZUF0IiwicG93IiwiZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzIiwiY29tcGFyZSIsIngiLCJ5IiwibWluIiwiaW5uZXJEZWVwRXF1YWwiLCJ2YWwxIiwidmFsMiIsIm1lbW9zIiwiYnVmMSIsImJ1ZjIiLCJ2YWwxVGFnIiwia2V5czEiLCJrZXlzMiIsImtleUNoZWNrIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImJ5dGVMZW5ndGgiLCJVaW50OEFycmF5IiwiYnVmZmVyIiwiYnl0ZU9mZnNldCIsImFyZVNpbWlsYXJUeXBlZEFycmF5cyIsIm9mZnNldCIsImFyZVNpbWlsYXJGbG9hdEFycmF5cyIsIl9rZXlzIiwiX2tleXMyIiwic2l6ZSIsInZhbHVlT2YiLCJCb29sZWFuIiwiQmlnSW50IiwiaXNFcXVhbEJveGVkUHJpbWl0aXZlIiwiZ2V0RW51bWVyYWJsZXMiLCJrIiwiaXRlcmF0aW9uVHlwZSIsImFLZXlzIiwiYktleXMiLCJzeW1ib2xLZXlzQSIsInN5bWJvbEtleXNCIiwiX3N5bWJvbEtleXNCIiwicG9zaXRpb24iLCJ2YWwyTWVtb0EiLCJ2YWwyTWVtb0IiLCJhcmVFcSIsIm9iakVxdWl2IiwiZGVsZXRlIiwic2V0SGFzRXF1YWxFbGVtZW50IiwibWVtbyIsInNldFZhbHVlcyIsImZpbmRMb29zZU1hdGNoaW5nUHJpbWl0aXZlcyIsInByaW0iLCJzZXRNaWdodEhhdmVMb29zZVByaW0iLCJhbHRWYWx1ZSIsIm1hcE1pZ2h0SGF2ZUxvb3NlUHJpbSIsIml0ZW0iLCJjdXJCIiwibWFwSGFzRXF1YWxFbnRyeSIsImtleTEiLCJpdGVtMSIsImtleTIiLCJhVmFsdWVzIiwiU2V0IiwiYWRkIiwiYlZhbHVlcyIsIl92YWwiLCJzZXRFcXVpdiIsImFFbnRyaWVzIiwiX2FFbnRyaWVzJGkiLCJpdGVtMiIsImJFbnRyaWVzIiwiX2kyIiwiX2JFbnRyaWVzJF9pIiwibWFwRXF1aXYiLCJrZXlzQSIsInR5cGVkQXJyYXkiLCJnIiwidXRpbHMiLCJzZXR0bGUiLCJjb29raWVzIiwiYnVpbGRVUkwiLCJidWlsZEZ1bGxQYXRoIiwicGFyc2VIZWFkZXJzIiwiaXNVUkxTYW1lT3JpZ2luIiwiY3JlYXRlRXJyb3IiLCJjb25maWciLCJyZWplY3QiLCJyZXF1ZXN0RGF0YSIsImRhdGEiLCJyZXF1ZXN0SGVhZGVycyIsImhlYWRlcnMiLCJpc0Zvcm1EYXRhIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0IiwiYXV0aCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkF1dGhvcml6YXRpb24iLCJidG9hIiwiZnVsbFBhdGgiLCJiYXNlVVJMIiwidXJsIiwib3BlbiIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwicGFyYW1zIiwicGFyYW1zU2VyaWFsaXplciIsInRpbWVvdXQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VVUkwiLCJyZXNwb25zZUhlYWRlcnMiLCJnZXRBbGxSZXNwb25zZUhlYWRlcnMiLCJyZXNwb25zZSIsInJlc3BvbnNlVHlwZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJvbmFib3J0Iiwib25lcnJvciIsIm9udGltZW91dCIsInRpbWVvdXRFcnJvck1lc3NhZ2UiLCJpc1N0YW5kYXJkQnJvd3NlckVudiIsInhzcmZWYWx1ZSIsIndpdGhDcmVkZW50aWFscyIsInhzcmZDb29raWVOYW1lIiwicmVhZCIsInhzcmZIZWFkZXJOYW1lIiwidG9Mb3dlckNhc2UiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiaXNVbmRlZmluZWQiLCJvbkRvd25sb2FkUHJvZ3Jlc3MiLCJhZGRFdmVudExpc3RlbmVyIiwib25VcGxvYWRQcm9ncmVzcyIsInVwbG9hZCIsImNhbmNlbFRva2VuIiwicHJvbWlzZSIsImNhbmNlbCIsImFib3J0Iiwic2VuZCIsIkF4aW9zIiwibWVyZ2VDb25maWciLCJjcmVhdGVJbnN0YW5jZSIsImRlZmF1bHRDb25maWciLCJjb250ZXh0IiwiZXh0ZW5kIiwiYXhpb3MiLCJpbnN0YW5jZUNvbmZpZyIsImRlZmF1bHRzIiwiQ2FuY2VsIiwiQ2FuY2VsVG9rZW4iLCJpc0NhbmNlbCIsImFsbCIsInByb21pc2VzIiwic3ByZWFkIiwiaXNBeGlvc0Vycm9yIiwiZGVmYXVsdCIsIl9fQ0FOQ0VMX18iLCJleGVjdXRvciIsInJlc29sdmVQcm9taXNlIiwidG9rZW4iLCJ0aHJvd0lmUmVxdWVzdGVkIiwiYyIsIkludGVyY2VwdG9yTWFuYWdlciIsImRpc3BhdGNoUmVxdWVzdCIsImludGVyY2VwdG9ycyIsImNoYWluIiwiaW50ZXJjZXB0b3IiLCJ1bnNoaWZ0IiwiZnVsZmlsbGVkIiwicmVqZWN0ZWQiLCJnZXRVcmkiLCJoYW5kbGVycyIsInVzZSIsImVqZWN0IiwiaWQiLCJoIiwiaXNBYnNvbHV0ZVVSTCIsImNvbWJpbmVVUkxzIiwicmVxdWVzdGVkVVJMIiwiZW5oYW5jZUVycm9yIiwidHJhbnNmb3JtRGF0YSIsInRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwibWVyZ2UiLCJjb21tb24iLCJhZGFwdGVyIiwidHJhbnNmb3JtUmVzcG9uc2UiLCJ0b0pTT04iLCJkZXNjcmlwdGlvbiIsIm51bWJlciIsImZpbGVOYW1lIiwibGluZU51bWJlciIsImNvbHVtbk51bWJlciIsImNvbmZpZzEiLCJjb25maWcyIiwidmFsdWVGcm9tQ29uZmlnMktleXMiLCJtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyIsImRlZmF1bHRUb0NvbmZpZzJLZXlzIiwiZGlyZWN0TWVyZ2VLZXlzIiwiZ2V0TWVyZ2VkVmFsdWUiLCJpc1BsYWluT2JqZWN0IiwibWVyZ2VEZWVwUHJvcGVydGllcyIsInByb3AiLCJheGlvc0tleXMiLCJvdGhlcktleXMiLCJ2YWxpZGF0ZVN0YXR1cyIsImZucyIsIm5vcm1hbGl6ZUhlYWRlck5hbWUiLCJERUZBVUxUX0NPTlRFTlRfVFlQRSIsInNldENvbnRlbnRUeXBlSWZVbnNldCIsImlzQXJyYXlCdWZmZXIiLCJpc0J1ZmZlciIsImlzU3RyZWFtIiwiaXNGaWxlIiwiaXNCbG9iIiwiaXNVUkxTZWFyY2hQYXJhbXMiLCJpc09iamVjdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXJzZSIsIm1heENvbnRlbnRMZW5ndGgiLCJtYXhCb2R5TGVuZ3RoIiwidGhpc0FyZyIsImVuY29kZSIsInNlcmlhbGl6ZWRQYXJhbXMiLCJwYXJ0cyIsInYiLCJ0b0lTT1N0cmluZyIsImhhc2htYXJrSW5kZXgiLCJyZWxhdGl2ZVVSTCIsIndyaXRlIiwiZXhwaXJlcyIsInBhdGgiLCJkb21haW4iLCJzZWN1cmUiLCJjb29raWUiLCJpc051bWJlciIsInRvR01UU3RyaW5nIiwiaXNTdHJpbmciLCJkb2N1bWVudCIsIm1hdGNoIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicmVtb3ZlIiwibm93IiwicGF5bG9hZCIsIm9yaWdpblVSTCIsIm1zaWUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ1cmxQYXJzaW5nTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJyZXNvbHZlVVJMIiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsInByb3RvY29sIiwiaG9zdCIsImhhc2giLCJob3N0bmFtZSIsInBvcnQiLCJwYXRobmFtZSIsImNoYXJBdCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVxdWVzdFVSTCIsInBhcnNlZCIsIm5vcm1hbGl6ZWROYW1lIiwiaWdub3JlRHVwbGljYXRlT2YiLCJsaW5lIiwidHJpbSIsImNhbGxiYWNrIiwiaXNGdW5jdGlvbiIsImwiLCJGb3JtRGF0YSIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwicGlwZSIsIlVSTFNlYXJjaFBhcmFtcyIsInByb2R1Y3QiLCJhc3NpZ25WYWx1ZSIsInN0cmlwQk9NIiwiY29udGVudCIsIkdldEludHJpbnNpYyIsImNhbGxCaW5kIiwiJGluZGV4T2YiLCJhbGxvd01pc3NpbmciLCJpbnRyaW5zaWMiLCIkYXBwbHkiLCIkY2FsbCIsIiRyZWZsZWN0QXBwbHkiLCIkZ09QRCIsIiRkZWZpbmVQcm9wZXJ0eSIsIiRtYXgiLCJvcmlnaW5hbEZ1bmN0aW9uIiwiZnVuYyIsImRlc2MiLCJhcHBseUJpbmQiLCJ0aW1lcyIsImZ1bmN0aW9ucyIsImxhYmVsIiwidGltZSIsImR1cmF0aW9uIiwiZm9ybWF0Iiwib2JqZWN0IiwiZXhwcmVzc2lvbiIsInR1cGxlIiwiaGFzU3ltYm9scyIsInRvU3RyIiwib3JpZ0RlZmluZVByb3BlcnR5Iiwic3VwcG9ydHNEZXNjcmlwdG9ycyIsIl8iLCJhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkIiwicHJlZGljYXRlIiwiZGVmaW5lUHJvcGVydGllcyIsInByZWRpY2F0ZXMiLCJmaXJzdFNvdXJjZSIsInRvIiwibmV4dFNvdXJjZSIsImtleXNBcnJheSIsIm5leHRJbmRleCIsIm5leHRLZXkiLCJwb2x5ZmlsbCIsIlJlZmxlY3RPd25LZXlzIiwiUiIsIlJlZmxlY3RBcHBseSIsInJlY2VpdmVyIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIk51bWJlcklzTmFOIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm9uY2UiLCJlbWl0dGVyIiwiZXJyb3JMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwicmVzb2x2ZXIiLCJldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIiLCJoYW5kbGVyIiwib24iLCJhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlciIsIl9ldmVudHMiLCJfZXZlbnRzQ291bnQiLCJfbWF4TGlzdGVuZXJzIiwiZGVmYXVsdE1heExpc3RlbmVycyIsImNoZWNrTGlzdGVuZXIiLCJsaXN0ZW5lciIsIl9nZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiX2FkZExpc3RlbmVyIiwicHJlcGVuZCIsIm0iLCJldmVudHMiLCJleGlzdGluZyIsIndhcm5pbmciLCJuZXdMaXN0ZW5lciIsImVtaXQiLCJ3Iiwib25jZVdyYXBwZXIiLCJmaXJlZCIsIndyYXBGbiIsIl9vbmNlV3JhcCIsInN0YXRlIiwid3JhcHBlZCIsIl9saXN0ZW5lcnMiLCJ1bndyYXAiLCJldmxpc3RlbmVyIiwidW53cmFwTGlzdGVuZXJzIiwiYXJyYXlDbG9uZSIsImxpc3RlbmVyQ291bnQiLCJuIiwiY29weSIsIndyYXBMaXN0ZW5lciIsImFyZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRNYXhMaXN0ZW5lcnMiLCJnZXRNYXhMaXN0ZW5lcnMiLCJkb0Vycm9yIiwiZXIiLCJsaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lciIsInByZXBlbmRMaXN0ZW5lciIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0Iiwib3JpZ2luYWxMaXN0ZW5lciIsImluZGV4Iiwic3BsaWNlT25lIiwib2ZmIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwicmF3TGlzdGVuZXJzIiwiZXZlbnROYW1lcyIsIkVSUk9SX01FU1NBR0UiLCJmdW5jVHlwZSIsImJvdW5kIiwiYmluZGVyIiwiYm91bmRMZW5ndGgiLCJib3VuZEFyZ3MiLCJFbXB0eSIsImltcGxlbWVudGF0aW9uIiwiJFN5bnRheEVycm9yIiwiU3ludGF4RXJyb3IiLCIkRnVuY3Rpb24iLCIkVHlwZUVycm9yIiwiZ2V0RXZhbGxlZENvbnN0cnVjdG9yIiwiZXhwcmVzc2lvblN5bnRheCIsInRocm93VHlwZUVycm9yIiwiVGhyb3dUeXBlRXJyb3IiLCJjYWxsZWVUaHJvd3MiLCJnT1BEdGhyb3dzIiwiZ2V0UHJvdG8iLCJuZWVkc0V2YWwiLCJUeXBlZEFycmF5IiwiSU5UUklOU0lDUyIsIkFnZ3JlZ2F0ZUVycm9yIiwiQXRvbWljcyIsIkRhdGFWaWV3IiwiZGVjb2RlVVJJIiwiZW5jb2RlVVJJIiwiZXZhbCIsIkV2YWxFcnJvciIsIkZsb2F0MzJBcnJheSIsIkZsb2F0NjRBcnJheSIsIkZpbmFsaXphdGlvblJlZ2lzdHJ5IiwiSW50OEFycmF5IiwiSW50MTZBcnJheSIsIkludDMyQXJyYXkiLCJpc0Zpbml0ZSIsInBhcnNlRmxvYXQiLCJwYXJzZUludCIsIlNoYXJlZEFycmF5QnVmZmVyIiwiVWludDhDbGFtcGVkQXJyYXkiLCJVaW50MTZBcnJheSIsIlVpbnQzMkFycmF5IiwiVVJJRXJyb3IiLCJXZWFrTWFwIiwiV2Vha1JlZiIsIldlYWtTZXQiLCJkb0V2YWwiLCJnZW4iLCJMRUdBQ1lfQUxJQVNFUyIsIiRjb25jYXQiLCIkc3BsaWNlQXBwbHkiLCJzcGxpY2UiLCIkcmVwbGFjZSIsIiRzdHJTbGljZSIsInJlUHJvcE5hbWUiLCJyZUVzY2FwZUNoYXIiLCJzdHJpbmdUb1BhdGgiLCJzdHJpbmciLCJmaXJzdCIsImxhc3QiLCJxdW90ZSIsInN1YlN0cmluZyIsImdldEJhc2VJbnRyaW5zaWMiLCJhbGlhcyIsImludHJpbnNpY05hbWUiLCJpbnRyaW5zaWNCYXNlTmFtZSIsImludHJpbnNpY1JlYWxOYW1lIiwic2tpcEZ1cnRoZXJDYWNoaW5nIiwiaXNPd24iLCJwYXJ0Iiwib3JpZ1N5bWJvbCIsImhhc1N5bWJvbFNoYW0iLCJzeW1PYmoiLCJzeW1zIiwiY3RvciIsInN1cGVyQ3RvciIsInN1cGVyXyIsIlRlbXBDdG9yIiwiaGFzVG9TdHJpbmdUYWciLCJ0b1N0cmluZ1RhZyIsIiR0b1N0cmluZyIsImNhbGxCb3VuZCIsImlzU3RhbmRhcmRBcmd1bWVudHMiLCJpc0xlZ2FjeUFyZ3VtZW50cyIsImNhbGxlZSIsInN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMiLCJmblRvU3RyIiwiaXNGblJlZ2V4IiwiZ2VuZXJhdG9yRnVuYyIsImdldEdlbmVyYXRvckZ1bmMiLCJHZW5lcmF0b3JGdW5jdGlvbiIsImdldFBvbHlmaWxsIiwic2hpbSIsIk5hTiIsImF2YWlsYWJsZVR5cGVkQXJyYXlzIiwidHlwZWRBcnJheXMiLCIkc2xpY2UiLCJ0b1N0clRhZ3MiLCJnT1BEIiwicHJvdG8iLCJzdXBlclByb3RvIiwidGFnIiwiYW55VHJ1ZSIsImdldHRlciIsInRyeVR5cGVkQXJyYXlzIiwia2V5c1NoaW0iLCJpc0FyZ3MiLCJpc0VudW1lcmFibGUiLCJoYXNEb250RW51bUJ1ZyIsImhhc1Byb3RvRW51bUJ1ZyIsImRvbnRFbnVtcyIsImVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlIiwiZXhjbHVkZWRLZXlzIiwiJGFwcGxpY2F0aW9uQ2FjaGUiLCIkY29uc29sZSIsIiRleHRlcm5hbCIsIiRmcmFtZSIsIiRmcmFtZUVsZW1lbnQiLCIkZnJhbWVzIiwiJGlubmVySGVpZ2h0IiwiJGlubmVyV2lkdGgiLCIkb25tb3pmdWxsc2NyZWVuY2hhbmdlIiwiJG9ubW96ZnVsbHNjcmVlbmVycm9yIiwiJG91dGVySGVpZ2h0IiwiJG91dGVyV2lkdGgiLCIkcGFnZVhPZmZzZXQiLCIkcGFnZVlPZmZzZXQiLCIkcGFyZW50IiwiJHNjcm9sbExlZnQiLCIkc2Nyb2xsVG9wIiwiJHNjcm9sbFgiLCIkc2Nyb2xsWSIsIiRzZWxmIiwiJHdlYmtpdEluZGV4ZWREQiIsIiR3ZWJraXRTdG9yYWdlSW5mbyIsIiR3aW5kb3ciLCJoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWciLCJpc0FyZ3VtZW50cyIsInRoZUtleXMiLCJza2lwUHJvdG8iLCJqIiwic2tpcENvbnN0cnVjdG9yIiwiZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5Iiwib3JpZ0tleXMiLCJvcmlnaW5hbEtleXMiLCJjYWNoZWRTZXRUaW1lb3V0IiwiY2FjaGVkQ2xlYXJUaW1lb3V0IiwiZGVmYXVsdFNldFRpbW91dCIsImRlZmF1bHRDbGVhclRpbWVvdXQiLCJydW5UaW1lb3V0IiwiZnVuIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsImN1cnJlbnRRdWV1ZSIsInF1ZXVlIiwiZHJhaW5pbmciLCJxdWV1ZUluZGV4IiwiY2xlYW5VcE5leHRUaWNrIiwiZHJhaW5RdWV1ZSIsInJ1biIsIm1hcmtlciIsInJ1bkNsZWFyVGltZW91dCIsIkl0ZW0iLCJub29wIiwibmV4dFRpY2siLCJ0aXRsZSIsImJyb3dzZXIiLCJlbnYiLCJhcmd2IiwidmVyc2lvbiIsInZlcnNpb25zIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJxcyIsInNlcCIsImVxIiwicmVnZXhwIiwibWF4S2V5cyIsImtzdHIiLCJ2c3RyIiwiaWR4Iiwic3RyaW5naWZ5UHJpbWl0aXZlIiwia3MiLCJkZWNvZGUiLCJhc3luYyIsImNsaWVudCIsImFsYnVtSGFzaCIsIkFMQlVNX0VORFBPSU5UIiwiZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZSIsIlVTRVJBR0VOVCIsIkltZ3VyQ2xpZW50IiwiY3JlZGVudGlhbHMiLCJzdXBlciIsInBsYWluRmV0Y2hlciIsIklNR1VSX0FQSV9QUkVGSVgiLCJmZXRjaGVyIiwiYXV0aG9yaXphdGlvbiIsImdldEF1dGhvcml6YXRpb25IZWFkZXIiLCJpbWFnZUhhc2giLCJkZWxldGVJbWFnZSIsImZhdm9yaXRlSW1hZ2UiLCJnZXRBbGJ1bSIsImdldEdhbGxlcnkiLCJnZXRTdWJyZWRkaXRHYWxsZXJ5Iiwic2VhcmNoR2FsbGVyeSIsImdldEltYWdlIiwidXBkYXRlSW1hZ2UiLCJBUElfVkVSU0lPTiIsIkFVVEhPUklaRV9FTkRQT0lOVCIsIklNQUdFX0VORFBPSU5UIiwiVVBMT0FEX0VORFBPSU5UIiwiR0FMTEVSWV9FTkRQT0lOVCIsIlNVQlJFRERJVF9HQUxMRVJZX0VORFBPSU5UIiwiU0VBUkNIX0dBTExFUllfRU5EUE9JTlQiLCJhY2Nlc3NUb2tlbiIsImNsaWVudElkIiwiaXNCYXNlNjQiLCJiYXNlNjQiLCJzdHJlYW0iLCJpbWFnZSIsImZvcm0iLCJhcHBlbmQiLCJlbnRyaWVzIiwic3VwcG9ydGVkVXBsb2FkT2JqZWN0VHlwZXMiLCJzdWNjZXNzIiwiZGVmYXVsdE9wdGlvbnMiLCJzZWN0aW9uIiwic29ydCIsImNvbnN0cnVjdEdhbGxlcnlVcmwiLCJtZXJnZWRPcHRpb25zIiwidXJpIiwicGFnZSIsIlVSTCIsInNob3dWaXJhbCIsInNlYXJjaFBhcmFtcyIsIm1hdHVyZSIsImFsYnVtX3ByZXZpZXdzIiwiZmluYWxQYXRobmFtZSIsImNvbnN0cnVjdFN1YnJlZGRpdEdhbGxlcnlVcmwiLCJzdWJyZWRkaXQiLCJhZHZhbmNlZFBhcmFtZXRlcnMiLCJjb25zdHJ1Y3RTZWFyY2hHYWxsZXJ5VXJsIiwicGFyYW0iLCJxdWVyeSIsInEiLCJpc0FjY2Vzc1Rva2VuIiwiaXNDbGllbnRJZCIsImlzTG9naW4iLCJjbGllbnRfaWQiLCJyZXNwb25zZV90eXBlIiwicGxhaW5SZXF1ZXN0IiwibWF0Y2hlcyIsImF1dGhvcml6ZVRva2VuIiwiYWxsb3ciLCJmb2xsb3dSZWRpcmVjdCIsImFjY2Vzc190b2tlbiIsImlzVmFsaWRVcGRhdGVQYXlsb2FkIiwiY3JlYXRlRm9ybSIsInByb2dyZXNzRXZlbnQiLCJleHRlbmRTdGF0aWNzIiwiZCIsIl9fZXh0ZW5kcyIsIl9fIiwiX19hc3NpZ24iLCJ0IiwicyIsIl9fcmVzdCIsIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwiciIsImRlY29yYXRlIiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX21ldGFkYXRhIiwibWV0YWRhdGFLZXkiLCJtZXRhZGF0YVZhbHVlIiwibWV0YWRhdGEiLCJfX2F3YWl0ZXIiLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsInN0ZXAiLCJfX2dlbmVyYXRvciIsImJvZHkiLCJzZW50IiwidHJ5cyIsIm9wcyIsInZlcmIiLCJvcCIsIl9fY3JlYXRlQmluZGluZyIsImsyIiwiX19leHBvcnRTdGFyIiwiX192YWx1ZXMiLCJfX3JlYWQiLCJhciIsIl9fc3ByZWFkIiwiX19zcHJlYWRBcnJheXMiLCJpbCIsImpsIiwiX19hd2FpdCIsIl9fYXN5bmNHZW5lcmF0b3IiLCJhc3luY0l0ZXJhdG9yIiwicmVzdW1lIiwiZnVsZmlsbCIsIl9fYXN5bmNEZWxlZ2F0b3IiLCJfX2FzeW5jVmFsdWVzIiwiX19tYWtlVGVtcGxhdGVPYmplY3QiLCJjb29rZWQiLCJyYXciLCJfX2ltcG9ydFN0YXIiLCJtb2QiLCJfX2VzTW9kdWxlIiwiX19pbXBvcnREZWZhdWx0IiwiX19jbGFzc1ByaXZhdGVGaWVsZEdldCIsInByaXZhdGVNYXAiLCJfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0Iiwibm9kZVR5cGUiLCJmcmVlR2xvYmFsIiwiZ2xvYmFsIiwicHVueWNvZGUiLCJtYXhJbnQiLCJyZWdleFB1bnljb2RlIiwicmVnZXhOb25BU0NJSSIsInJlZ2V4U2VwYXJhdG9ycyIsImVycm9ycyIsInN0cmluZ0Zyb21DaGFyQ29kZSIsImZyb21DaGFyQ29kZSIsIm1hcERvbWFpbiIsInVjczJkZWNvZGUiLCJleHRyYSIsIm91dHB1dCIsImNvdW50ZXIiLCJ1Y3MyZW5jb2RlIiwiZGlnaXRUb0Jhc2ljIiwiZGlnaXQiLCJmbGFnIiwiYWRhcHQiLCJkZWx0YSIsIm51bVBvaW50cyIsImZpcnN0VGltZSIsImJhc2VNaW51c1RNaW4iLCJvdXQiLCJiYXNpYyIsIm9sZGkiLCJiYXNlTWludXNUIiwiY29kZVBvaW50IiwiYmlhcyIsImxhc3RJbmRleE9mIiwiaGFuZGxlZENQQ291bnQiLCJiYXNpY0xlbmd0aCIsImN1cnJlbnRWYWx1ZSIsImhhbmRsZWRDUENvdW50UGx1c09uZSIsInFNaW51c1QiLCJVcmwiLCJzbGFzaGVzIiwidXJsUGFyc2UiLCJyZWxhdGl2ZSIsInJlc29sdmVPYmplY3QiLCJwcm90b2NvbFBhdHRlcm4iLCJwb3J0UGF0dGVybiIsInNpbXBsZVBhdGhQYXR0ZXJuIiwidW53aXNlIiwiYXV0b0VzY2FwZSIsIm5vbkhvc3RDaGFycyIsImhvc3RFbmRpbmdDaGFycyIsImhvc3RuYW1lUGFydFBhdHRlcm4iLCJob3N0bmFtZVBhcnRTdGFydCIsInVuc2FmZVByb3RvY29sIiwiaG9zdGxlc3NQcm90b2NvbCIsInNsYXNoZWRQcm90b2NvbCIsInF1ZXJ5c3RyaW5nIiwicGFyc2VRdWVyeVN0cmluZyIsInNsYXNoZXNEZW5vdGVIb3N0IiwidSIsInF1ZXJ5SW5kZXgiLCJzcGxpdHRlciIsInVTcGxpdCIsInJlc3QiLCJzaW1wbGVQYXRoIiwiZXhlYyIsImxvd2VyUHJvdG8iLCJhdFNpZ24iLCJob3N0RW5kIiwiaGVjIiwicGFyc2VIb3N0IiwiaXB2Nkhvc3RuYW1lIiwiaG9zdHBhcnRzIiwibmV3cGFydCIsInZhbGlkUGFydHMiLCJub3RIb3N0IiwiYml0IiwidG9BU0NJSSIsImFlIiwiZXNjIiwiZXNjYXBlIiwicW0iLCJyZWwiLCJ0a2V5cyIsInRrIiwidGtleSIsInJrZXlzIiwicmsiLCJya2V5IiwicmVsUGF0aCIsImlzU291cmNlQWJzIiwiaXNSZWxBYnMiLCJtdXN0RW5kQWJzIiwicmVtb3ZlQWxsRG90cyIsInNyY1BhdGgiLCJwc3ljaG90aWMiLCJpc051bGxPclVuZGVmaW5lZCIsImF1dGhJbkhvc3QiLCJpc051bGwiLCJoYXNUcmFpbGluZ1NsYXNoIiwidXAiLCJpc0Fic29sdXRlIiwiZmlsbCIsInJlYWRVSW50OCIsImlzQXJndW1lbnRzT2JqZWN0IiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsIndoaWNoVHlwZWRBcnJheSIsImlzVHlwZWRBcnJheSIsIkJpZ0ludFN1cHBvcnRlZCIsIlN5bWJvbFN1cHBvcnRlZCIsIk9iamVjdFRvU3RyaW5nIiwibnVtYmVyVmFsdWUiLCJzdHJpbmdWYWx1ZSIsImJvb2xlYW5WYWx1ZSIsImJpZ0ludFZhbHVlIiwic3ltYm9sVmFsdWUiLCJjaGVja0JveGVkUHJpbWl0aXZlIiwicHJvdG90eXBlVmFsdWVPZiIsImlzTWFwVG9TdHJpbmciLCJpc1NldFRvU3RyaW5nIiwiaXNXZWFrTWFwVG9TdHJpbmciLCJpc1dlYWtTZXRUb1N0cmluZyIsImlzQXJyYXlCdWZmZXJUb1N0cmluZyIsIndvcmtpbmciLCJpc0RhdGFWaWV3VG9TdHJpbmciLCJpc0RhdGFWaWV3IiwiaXNTaGFyZWRBcnJheUJ1ZmZlclRvU3RyaW5nIiwiaXNTaGFyZWRBcnJheUJ1ZmZlciIsImlzVWludDhBcnJheSIsImlzVWludDhDbGFtcGVkQXJyYXkiLCJpc1VpbnQxNkFycmF5IiwiaXNVaW50MzJBcnJheSIsImlzSW50OEFycmF5IiwiaXNJbnQxNkFycmF5IiwiaXNJbnQzMkFycmF5IiwiaXNCaWdJbnQ2NEFycmF5IiwiaXNCaWdVaW50NjRBcnJheSIsImlzV2Vha01hcCIsImlzV2Vha1NldCIsImlzQXN5bmNGdW5jdGlvbiIsImlzTWFwSXRlcmF0b3IiLCJpc1NldEl0ZXJhdG9yIiwiaXNHZW5lcmF0b3JPYmplY3QiLCJpc1dlYkFzc2VtYmx5Q29tcGlsZWRNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIiwiZGVzY3JpcHRvcnMiLCJmb3JtYXRSZWdFeHAiLCJvYmplY3RzIiwiZGVwcmVjYXRlIiwibm9EZXByZWNhdGlvbiIsInRocm93RGVwcmVjYXRpb24iLCJ0cmFjZURlcHJlY2F0aW9uIiwidHJhY2UiLCJkZWJ1Z3MiLCJkZWJ1Z0VudlJlZ2V4IiwiTk9ERV9ERUJVRyIsImRlYnVnRW52Iiwib3B0cyIsInNlZW4iLCJzdHlsaXplIiwic3R5bGl6ZU5vQ29sb3IiLCJjb2xvcnMiLCJpc0Jvb2xlYW4iLCJfZXh0ZW5kIiwic3R5bGl6ZVdpdGhDb2xvciIsImZvcm1hdFZhbHVlIiwic3R5bGVUeXBlIiwic3R5bGUiLCJzdHlsZXMiLCJwcmltaXRpdmUiLCJzaW1wbGUiLCJmb3JtYXRQcmltaXRpdmUiLCJ2aXNpYmxlS2V5cyIsImFycmF5VG9IYXNoIiwiaXNFcnJvciIsImZvcm1hdEVycm9yIiwiYnJhY2VzIiwidG9VVENTdHJpbmciLCJmb3JtYXRQcm9wZXJ0eSIsImZvcm1hdEFycmF5IiwicmVkdWNlIiwicHJldiIsInJlZHVjZVRvU2luZ2xlU3RyaW5nIiwicmUiLCJwYWQiLCJkZWJ1Z2xvZyIsInBpZCIsInR5cGVzIiwiaXNTeW1ib2wiLCJpc1ByaW1pdGl2ZSIsIm1vbnRocyIsInRpbWVzdGFtcCIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXREYXRlIiwiZ2V0TW9udGgiLCJpbmhlcml0cyIsIm9yaWdpbiIsImtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCIsImNhbGxiYWNraWZ5T25SZWplY3RlZCIsImNiIiwibmV3UmVhc29uIiwicHJvbWlzaWZ5Iiwib3JpZ2luYWwiLCJwcm9taXNlUmVzb2x2ZSIsInByb21pc2VSZWplY3QiLCJjYWxsYmFja2lmeSIsImNhbGxiYWNraWZpZWQiLCJtYXliZUNiIiwicmVqIiwiZm91bmROYW1lIiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiY2FjaGVkTW9kdWxlIiwibG9hZGVkIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImRlZmluaXRpb24iLCJnbG9iYWxUaGlzIiwi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T0FBT0MsVUFBVUMsZUFBZUwsS0FBS08sRUFBSzZmLEdDQ2xGNnNCLEVBQW9CblEsRUFBSzU5QixJQUNILG9CQUFYc0IsUUFBMEJBLE9BQU9xd0IsYUFDMUMxd0IsT0FBT2tJLGVBQWVuSixFQUFTc0IsT0FBT3F3QixZQUFhLENBQUVwdUIsTUFBTyxXQUU3RHRDLE9BQU9rSSxlQUFlbkosRUFBUyxhQUFjLENBQUV1RCxPQUFPLEtDTHZEd3FDLEVBQW9CTyxJQUFPcnVDLElBQzFCQSxFQUFPc3VDLE1BQVEsR0FDVnR1QyxFQUFPdXVDLFdBQVV2dUMsRUFBT3V1QyxTQUFXLElBQ2pDdnVDLEcsZ0hDSFIsY0FBUyw2RUFBQTQ0QixnQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHQvL0NvbW1vbkpTMiBDb21tZW50XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0Ly9BTUQgQ29tbWVudFxuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHQvL0NvbW1vbkpTIENvbW1lbnRcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImltZ3VyXCJdID0gZmFjdG9yeSgpO1xuXHQvL1Jvb3QgQ29tbWVudFxuXHRlbHNlXG5cdFx0cm9vdFtcImltZ3VyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIlxuLyoqXG4gKiBBcnJheSNmaWx0ZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3Q9fSBzZWxmXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEB0aHJvdyBUeXBlRXJyb3JcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnIsIGZuLCBzZWxmKSB7XG4gIGlmIChhcnIuZmlsdGVyKSByZXR1cm4gYXJyLmZpbHRlcihmbiwgc2VsZik7XG4gIGlmICh2b2lkIDAgPT09IGFyciB8fCBudWxsID09PSBhcnIpIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgdmFyIHJldCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwoYXJyLCBpKSkgY29udGludWU7XG4gICAgdmFyIHZhbCA9IGFycltpXTtcbiAgICBpZiAoZm4uY2FsbChzZWxmLCB2YWwsIGksIGFycikpIHJldC5wdXNoKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuIiwiLy8gQ3VycmVudGx5IGluIHN5bmMgd2l0aCBOb2RlLmpzIGxpYi9hc3NlcnQuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMmE1MWFlNDI0YTUxM2VjOWE2YWEzNDY2YmFhMGNjMWQ1NWRkNGYzYlxuLy8gT3JpZ2luYWxseSBmcm9tIG5hcndoYWwuanMgKGh0dHA6Ly9uYXJ3aGFsanMub3JnKVxuLy8gQ29weXJpZ2h0IChjKSAyMDA5IFRob21hcyBSb2JpbnNvbiA8Mjgwbm9ydGguY29tPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlICdTb2Z0d2FyZScpLCB0b1xuLy8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbi8vIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuLy8gc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAnQVMgSVMnLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL2ludGVybmFsL2Vycm9ycycpLFxuICAgIF9yZXF1aXJlJGNvZGVzID0gX3JlcXVpcmUuY29kZXMsXG4gICAgRVJSX0FNQklHVU9VU19BUkdVTUVOVCA9IF9yZXF1aXJlJGNvZGVzLkVSUl9BTUJJR1VPVVNfQVJHVU1FTlQsXG4gICAgRVJSX0lOVkFMSURfQVJHX1RZUEUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVFlQRSxcbiAgICBFUlJfSU5WQUxJRF9BUkdfVkFMVUUgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfSU5WQUxJRF9BUkdfVkFMVUUsXG4gICAgRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFID0gX3JlcXVpcmUkY29kZXMuRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFLFxuICAgIEVSUl9NSVNTSU5HX0FSR1MgPSBfcmVxdWlyZSRjb2Rlcy5FUlJfTUlTU0lOR19BUkdTO1xuXG52YXIgQXNzZXJ0aW9uRXJyb3IgPSByZXF1aXJlKCcuL2ludGVybmFsL2Fzc2VydC9hc3NlcnRpb25fZXJyb3InKTtcblxudmFyIF9yZXF1aXJlMiA9IHJlcXVpcmUoJ3V0aWwvJyksXG4gICAgaW5zcGVjdCA9IF9yZXF1aXJlMi5pbnNwZWN0O1xuXG52YXIgX3JlcXVpcmUkdHlwZXMgPSByZXF1aXJlKCd1dGlsLycpLnR5cGVzLFxuICAgIGlzUHJvbWlzZSA9IF9yZXF1aXJlJHR5cGVzLmlzUHJvbWlzZSxcbiAgICBpc1JlZ0V4cCA9IF9yZXF1aXJlJHR5cGVzLmlzUmVnRXhwO1xuXG52YXIgb2JqZWN0QXNzaWduID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24gOiByZXF1aXJlKCdlczYtb2JqZWN0LWFzc2lnbicpLmFzc2lnbjtcbnZhciBvYmplY3RJcyA9IE9iamVjdC5pcyA/IE9iamVjdC5pcyA6IHJlcXVpcmUoJ29iamVjdC1pcycpO1xudmFyIGVycm9yQ2FjaGUgPSBuZXcgTWFwKCk7XG52YXIgaXNEZWVwRXF1YWw7XG52YXIgaXNEZWVwU3RyaWN0RXF1YWw7XG52YXIgcGFyc2VFeHByZXNzaW9uQXQ7XG52YXIgZmluZE5vZGVBcm91bmQ7XG52YXIgZGVjb2RlcjtcblxuZnVuY3Rpb24gbGF6eUxvYWRDb21wYXJpc29uKCkge1xuICB2YXIgY29tcGFyaXNvbiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucycpO1xuXG4gIGlzRGVlcEVxdWFsID0gY29tcGFyaXNvbi5pc0RlZXBFcXVhbDtcbiAgaXNEZWVwU3RyaWN0RXF1YWwgPSBjb21wYXJpc29uLmlzRGVlcFN0cmljdEVxdWFsO1xufSAvLyBFc2NhcGUgY29udHJvbCBjaGFyYWN0ZXJzIGJ1dCBub3QgXFxuIGFuZCBcXHQgdG8ga2VlcCB0aGUgbGluZSBicmVha3MgYW5kXG4vLyBpbmRlbnRhdGlvbiBpbnRhY3QuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuXG5cbnZhciBlc2NhcGVTZXF1ZW5jZXNSZWdFeHAgPSAvW1xceDAwLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXS9nO1xudmFyIG1ldGEgPSBbXCJcXFxcdTAwMDBcIiwgXCJcXFxcdTAwMDFcIiwgXCJcXFxcdTAwMDJcIiwgXCJcXFxcdTAwMDNcIiwgXCJcXFxcdTAwMDRcIiwgXCJcXFxcdTAwMDVcIiwgXCJcXFxcdTAwMDZcIiwgXCJcXFxcdTAwMDdcIiwgJ1xcXFxiJywgJycsICcnLCBcIlxcXFx1MDAwYlwiLCAnXFxcXGYnLCAnJywgXCJcXFxcdTAwMGVcIiwgXCJcXFxcdTAwMGZcIiwgXCJcXFxcdTAwMTBcIiwgXCJcXFxcdTAwMTFcIiwgXCJcXFxcdTAwMTJcIiwgXCJcXFxcdTAwMTNcIiwgXCJcXFxcdTAwMTRcIiwgXCJcXFxcdTAwMTVcIiwgXCJcXFxcdTAwMTZcIiwgXCJcXFxcdTAwMTdcIiwgXCJcXFxcdTAwMThcIiwgXCJcXFxcdTAwMTlcIiwgXCJcXFxcdTAwMWFcIiwgXCJcXFxcdTAwMWJcIiwgXCJcXFxcdTAwMWNcIiwgXCJcXFxcdTAwMWRcIiwgXCJcXFxcdTAwMWVcIiwgXCJcXFxcdTAwMWZcIl07XG5cbnZhciBlc2NhcGVGbiA9IGZ1bmN0aW9uIGVzY2FwZUZuKHN0cikge1xuICByZXR1cm4gbWV0YVtzdHIuY2hhckNvZGVBdCgwKV07XG59O1xuXG52YXIgd2FybmVkID0gZmFsc2U7IC8vIFRoZSBhc3NlcnQgbW9kdWxlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IHRocm93XG4vLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcbi8vIGFzc2VydCBtb2R1bGUgbXVzdCBjb25mb3JtIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLlxuXG52YXIgYXNzZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSBvaztcbnZhciBOT19FWENFUFRJT05fU0VOVElORUwgPSB7fTsgLy8gQWxsIG9mIHRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIG11c3QgdGhyb3cgYW4gQXNzZXJ0aW9uRXJyb3Jcbi8vIHdoZW4gYSBjb3JyZXNwb25kaW5nIGNvbmRpdGlvbiBpcyBub3QgbWV0LCB3aXRoIGEgbWVzc2FnZSB0aGF0XG4vLyBtYXkgYmUgdW5kZWZpbmVkIGlmIG5vdCBwcm92aWRlZC4gQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBpbm5lckZhaWwob2JqKSB7XG4gIGlmIChvYmoubWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBvYmoubWVzc2FnZTtcbiAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG9iaik7XG59XG5cbmZ1bmN0aW9uIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IsIHN0YWNrU3RhcnRGbikge1xuICB2YXIgYXJnc0xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbnRlcm5hbE1lc3NhZ2U7XG5cbiAgaWYgKGFyZ3NMZW4gPT09IDApIHtcbiAgICBpbnRlcm5hbE1lc3NhZ2UgPSAnRmFpbGVkJztcbiAgfSBlbHNlIGlmIChhcmdzTGVuID09PSAxKSB7XG4gICAgbWVzc2FnZSA9IGFjdHVhbDtcbiAgICBhY3R1YWwgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHdhcm5lZCA9PT0gZmFsc2UpIHtcbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgICB2YXIgd2FybiA9IHByb2Nlc3MuZW1pdFdhcm5pbmcgPyBwcm9jZXNzLmVtaXRXYXJuaW5nIDogY29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7XG4gICAgICB3YXJuKCdhc3NlcnQuZmFpbCgpIHdpdGggbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBpcyBkZXByZWNhdGVkLiAnICsgJ1BsZWFzZSB1c2UgYXNzZXJ0LnN0cmljdEVxdWFsKCkgaW5zdGVhZCBvciBvbmx5IHBhc3MgYSBtZXNzYWdlLicsICdEZXByZWNhdGlvbldhcm5pbmcnLCAnREVQMDA5NCcpO1xuICAgIH1cblxuICAgIGlmIChhcmdzTGVuID09PSAyKSBvcGVyYXRvciA9ICchPSc7XG4gIH1cblxuICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB0aHJvdyBtZXNzYWdlO1xuICB2YXIgZXJyQXJncyA9IHtcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yID09PSB1bmRlZmluZWQgPyAnZmFpbCcgOiBvcGVyYXRvcixcbiAgICBzdGFja1N0YXJ0Rm46IHN0YWNrU3RhcnRGbiB8fCBmYWlsXG4gIH07XG5cbiAgaWYgKG1lc3NhZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgIGVyckFyZ3MubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH1cblxuICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKGVyckFyZ3MpO1xuXG4gIGlmIChpbnRlcm5hbE1lc3NhZ2UpIHtcbiAgICBlcnIubWVzc2FnZSA9IGludGVybmFsTWVzc2FnZTtcbiAgICBlcnIuZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gIH1cblxuICB0aHJvdyBlcnI7XG59XG5cbmFzc2VydC5mYWlsID0gZmFpbDsgLy8gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gaW50ZXJuYWwvZXJyb3IuXG5cbmFzc2VydC5Bc3NlcnRpb25FcnJvciA9IEFzc2VydGlvbkVycm9yO1xuXG5mdW5jdGlvbiBpbm5lck9rKGZuLCBhcmdMZW4sIHZhbHVlLCBtZXNzYWdlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICB2YXIgZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuXG4gICAgaWYgKGFyZ0xlbiA9PT0gMCkge1xuICAgICAgZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gICAgICBtZXNzYWdlID0gJ05vIHZhbHVlIGFyZ3VtZW50IHBhc3NlZCB0byBgYXNzZXJ0Lm9rKClgJztcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgdGhyb3cgbWVzc2FnZTtcbiAgICB9XG5cbiAgICB2YXIgZXJyID0gbmV3IEFzc2VydGlvbkVycm9yKHtcbiAgICAgIGFjdHVhbDogdmFsdWUsXG4gICAgICBleHBlY3RlZDogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJz09JyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICB9KTtcbiAgICBlcnIuZ2VuZXJhdGVkTWVzc2FnZSA9IGdlbmVyYXRlZE1lc3NhZ2U7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59IC8vIFB1cmUgYXNzZXJ0aW9uIHRlc3RzIHdoZXRoZXIgYSB2YWx1ZSBpcyB0cnV0aHksIGFzIGRldGVybWluZWRcbi8vIGJ5ICEhdmFsdWUuXG5cblxuZnVuY3Rpb24gb2soKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpbm5lck9rLmFwcGx5KHZvaWQgMCwgW29rLCBhcmdzLmxlbmd0aF0uY29uY2F0KGFyZ3MpKTtcbn1cblxuYXNzZXJ0Lm9rID0gb2s7IC8vIFRoZSBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc2hhbGxvdywgY29lcmNpdmUgZXF1YWxpdHkgd2l0aCA9PS5cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzICovXG5cbmFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIGVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblxuXG4gIGlmIChhY3R1YWwgIT0gZXhwZWN0ZWQpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICc9PScsXG4gICAgICBzdGFja1N0YXJ0Rm46IGVxdWFsXG4gICAgfSk7XG4gIH1cbn07IC8vIFRoZSBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciB3aGV0aGVyIHR3byBvYmplY3RzIGFyZSBub3Rcbi8vIGVxdWFsIHdpdGggIT0uXG5cblxuYXNzZXJ0Lm5vdEVxdWFsID0gZnVuY3Rpb24gbm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXG5cbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBvcGVyYXRvcjogJyE9JyxcbiAgICAgIHN0YWNrU3RhcnRGbjogbm90RXF1YWxcbiAgICB9KTtcbiAgfVxufTsgLy8gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG5cblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcblxuICBpZiAoIWlzRGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnZGVlcEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZGVlcEVxdWFsXG4gICAgfSk7XG4gIH1cbn07IC8vIFRoZSBub24tZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGZvciBhbnkgZGVlcCBpbmVxdWFsaXR5LlxuXG5cbmFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbiBub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRVJSX01JU1NJTkdfQVJHUygnYWN0dWFsJywgJ2V4cGVjdGVkJyk7XG4gIH1cblxuICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG5cbiAgaWYgKGlzRGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnbm90RGVlcEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogbm90RGVlcEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cblxuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIGRlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcblxuICBpZiAoIWlzRGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnZGVlcFN0cmljdEVxdWFsJyxcbiAgICAgIHN0YWNrU3RhcnRGbjogZGVlcFN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbmFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWwgPSBub3REZWVwU3RyaWN0RXF1YWw7XG5cbmZ1bmN0aW9uIG5vdERlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmIChpc0RlZXBFcXVhbCA9PT0gdW5kZWZpbmVkKSBsYXp5TG9hZENvbXBhcmlzb24oKTtcblxuICBpZiAoaXNEZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdub3REZWVwU3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3REZWVwU3RyaWN0RXF1YWxcbiAgICB9KTtcbiAgfVxufVxuXG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBzdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBFUlJfTUlTU0lOR19BUkdTKCdhY3R1YWwnLCAnZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGlmICghb2JqZWN0SXMoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6ICdzdHJpY3RFcXVhbCcsXG4gICAgICBzdGFja1N0YXJ0Rm46IHN0cmljdEVxdWFsXG4gICAgfSk7XG4gIH1cbn07XG5cbmFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIG5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9NSVNTSU5HX0FSR1MoJ2FjdHVhbCcsICdleHBlY3RlZCcpO1xuICB9XG5cbiAgaWYgKG9iamVjdElzKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgaW5uZXJGYWlsKHtcbiAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIG9wZXJhdG9yOiAnbm90U3RyaWN0RXF1YWwnLFxuICAgICAgc3RhY2tTdGFydEZuOiBub3RTdHJpY3RFcXVhbFxuICAgIH0pO1xuICB9XG59O1xuXG52YXIgQ29tcGFyaXNvbiA9IGZ1bmN0aW9uIENvbXBhcmlzb24ob2JqLCBrZXlzLCBhY3R1YWwpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29tcGFyaXNvbik7XG5cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgaWYgKGFjdHVhbCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBhY3R1YWxba2V5XSA9PT0gJ3N0cmluZycgJiYgaXNSZWdFeHAob2JqW2tleV0pICYmIG9ialtrZXldLnRlc3QoYWN0dWFsW2tleV0pKSB7XG4gICAgICAgIF90aGlzW2tleV0gPSBhY3R1YWxba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gY29tcGFyZUV4Y2VwdGlvbktleShhY3R1YWwsIGV4cGVjdGVkLCBrZXksIG1lc3NhZ2UsIGtleXMsIGZuKSB7XG4gIGlmICghKGtleSBpbiBhY3R1YWwpIHx8ICFpc0RlZXBTdHJpY3RFcXVhbChhY3R1YWxba2V5XSwgZXhwZWN0ZWRba2V5XSkpIHtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIC8vIENyZWF0ZSBwbGFjZWhvbGRlciBvYmplY3RzIHRvIGNyZWF0ZSBhIG5pY2Ugb3V0cHV0LlxuICAgICAgdmFyIGEgPSBuZXcgQ29tcGFyaXNvbihhY3R1YWwsIGtleXMpO1xuICAgICAgdmFyIGIgPSBuZXcgQ29tcGFyaXNvbihleHBlY3RlZCwga2V5cywgYWN0dWFsKTtcbiAgICAgIHZhciBlcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgICBhY3R1YWw6IGEsXG4gICAgICAgIGV4cGVjdGVkOiBiLFxuICAgICAgICBvcGVyYXRvcjogJ2RlZXBTdHJpY3RFcXVhbCcsXG4gICAgICAgIHN0YWNrU3RhcnRGbjogZm5cbiAgICAgIH0pO1xuICAgICAgZXJyLmFjdHVhbCA9IGFjdHVhbDtcbiAgICAgIGVyci5leHBlY3RlZCA9IGV4cGVjdGVkO1xuICAgICAgZXJyLm9wZXJhdG9yID0gZm4ubmFtZTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgb3BlcmF0b3I6IGZuLm5hbWUsXG4gICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCwgbXNnLCBmbikge1xuICBpZiAodHlwZW9mIGV4cGVjdGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGlzUmVnRXhwKGV4cGVjdGVkKSkgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKTsgLy8gYXNzZXJ0LmRvZXNOb3RUaHJvdyBkb2VzIG5vdCBhY2NlcHQgb2JqZWN0cy5cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1RZUEUoJ2V4cGVjdGVkJywgWydGdW5jdGlvbicsICdSZWdFeHAnXSwgZXhwZWN0ZWQpO1xuICAgIH0gLy8gSGFuZGxlIHByaW1pdGl2ZXMgcHJvcGVybHkuXG5cblxuICAgIGlmIChfdHlwZW9mKGFjdHVhbCkgIT09ICdvYmplY3QnIHx8IGFjdHVhbCA9PT0gbnVsbCkge1xuICAgICAgdmFyIGVyciA9IG5ldyBBc3NlcnRpb25FcnJvcih7XG4gICAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgb3BlcmF0b3I6ICdkZWVwU3RyaWN0RXF1YWwnLFxuICAgICAgICBzdGFja1N0YXJ0Rm46IGZuXG4gICAgICB9KTtcbiAgICAgIGVyci5vcGVyYXRvciA9IGZuLm5hbWU7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhleHBlY3RlZCk7IC8vIFNwZWNpYWwgaGFuZGxlIGVycm9ycyB0byBtYWtlIHN1cmUgdGhlIG5hbWUgYW5kIHRoZSBtZXNzYWdlIGFyZSBjb21wYXJlZFxuICAgIC8vIGFzIHdlbGwuXG5cbiAgICBpZiAoZXhwZWN0ZWQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAga2V5cy5wdXNoKCduYW1lJywgJ21lc3NhZ2UnKTtcbiAgICB9IGVsc2UgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0lOVkFMSURfQVJHX1ZBTFVFKCdlcnJvcicsIGV4cGVjdGVkLCAnbWF5IG5vdCBiZSBhbiBlbXB0eSBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEZWVwRXF1YWwgPT09IHVuZGVmaW5lZCkgbGF6eUxvYWRDb21wYXJpc29uKCk7XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICh0eXBlb2YgYWN0dWFsW2tleV0gPT09ICdzdHJpbmcnICYmIGlzUmVnRXhwKGV4cGVjdGVkW2tleV0pICYmIGV4cGVjdGVkW2tleV0udGVzdChhY3R1YWxba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb21wYXJlRXhjZXB0aW9uS2V5KGFjdHVhbCwgZXhwZWN0ZWQsIGtleSwgbXNnLCBrZXlzLCBmbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gR3VhcmQgaW5zdGFuY2VvZiBhZ2FpbnN0IGFycm93IGZ1bmN0aW9ucyBhcyB0aGV5IGRvbid0IGhhdmUgYSBwcm90b3R5cGUuXG5cblxuICBpZiAoZXhwZWN0ZWQucHJvdG90eXBlICE9PSB1bmRlZmluZWQgJiYgYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChFcnJvci5pc1Byb3RvdHlwZU9mKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBleHBlY3RlZC5jYWxsKHt9LCBhY3R1YWwpID09PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXRBY3R1YWwoZm4pIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnZm4nLCAnRnVuY3Rpb24nLCBmbik7XG4gIH1cblxuICB0cnkge1xuICAgIGZuKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIHJldHVybiBOT19FWENFUFRJT05fU0VOVElORUw7XG59XG5cbmZ1bmN0aW9uIGNoZWNrSXNQcm9taXNlKG9iaikge1xuICAvLyBBY2NlcHQgbmF0aXZlIEVTNiBwcm9taXNlcyBhbmQgcHJvbWlzZXMgdGhhdCBhcmUgaW1wbGVtZW50ZWQgaW4gYSBzaW1pbGFyXG4gIC8vIHdheS4gRG8gbm90IGFjY2VwdCB0aGVuYWJsZXMgdGhhdCB1c2UgYSBmdW5jdGlvbiBhcyBgb2JqYCBhbmQgdGhhdCBoYXZlIG5vXG4gIC8vIGBjYXRjaGAgaGFuZGxlci5cbiAgLy8gVE9ETzogdGhlbmFibGVzIGFyZSBjaGVja2VkIHVwIHVudGlsIHRoZXkgaGF2ZSB0aGUgY29ycmVjdCBtZXRob2RzLFxuICAvLyBidXQgYWNjb3JkaW5nIHRvIGRvY3VtZW50YXRpb24sIHRoZSBgdGhlbmAgbWV0aG9kIHNob3VsZCByZWNlaXZlXG4gIC8vIHRoZSBgZnVsZmlsbGAgYW5kIGByZWplY3RgIGFyZ3VtZW50cyBhcyB3ZWxsIG9yIGl0IG1heSBiZSBuZXZlciByZXNvbHZlZC5cbiAgcmV0dXJuIGlzUHJvbWlzZShvYmopIHx8IG9iaiAhPT0gbnVsbCAmJiBfdHlwZW9mKG9iaikgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNhdGNoID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiB3YWl0Rm9yQWN0dWFsKHByb21pc2VGbikge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdFByb21pc2U7XG5cbiAgICBpZiAodHlwZW9mIHByb21pc2VGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gUmV0dXJuIGEgcmVqZWN0ZWQgcHJvbWlzZSBpZiBgcHJvbWlzZUZuYCB0aHJvd3Mgc3luY2hyb25vdXNseS5cbiAgICAgIHJlc3VsdFByb21pc2UgPSBwcm9taXNlRm4oKTsgLy8gRmFpbCBpbiBjYXNlIG5vIHByb21pc2UgaXMgcmV0dXJuZWQuXG5cbiAgICAgIGlmICghY2hlY2tJc1Byb21pc2UocmVzdWx0UHJvbWlzZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX1JFVFVSTl9WQUxVRSgnaW5zdGFuY2Ugb2YgUHJvbWlzZScsICdwcm9taXNlRm4nLCByZXN1bHRQcm9taXNlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNoZWNrSXNQcm9taXNlKHByb21pc2VGbikpIHtcbiAgICAgIHJlc3VsdFByb21pc2UgPSBwcm9taXNlRm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgncHJvbWlzZUZuJywgWydGdW5jdGlvbicsICdQcm9taXNlJ10sIHByb21pc2VGbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdFByb21pc2U7XG4gICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gTk9fRVhDRVBUSU9OX1NFTlRJTkVMO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4cGVjdHNFcnJvcihzdGFja1N0YXJ0Rm4sIGFjdHVhbCwgZXJyb3IsIG1lc3NhZ2UpIHtcbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19UWVBFKCdlcnJvcicsIFsnT2JqZWN0JywgJ0Vycm9yJywgJ0Z1bmN0aW9uJywgJ1JlZ0V4cCddLCBlcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsKSB7XG4gICAgICBpZiAoYWN0dWFsLm1lc3NhZ2UgPT09IGVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFUlJfQU1CSUdVT1VTX0FSR1VNRU5UKCdlcnJvci9tZXNzYWdlJywgXCJUaGUgZXJyb3IgbWVzc2FnZSBcXFwiXCIuY29uY2F0KGFjdHVhbC5tZXNzYWdlLCBcIlxcXCIgaXMgaWRlbnRpY2FsIHRvIHRoZSBtZXNzYWdlLlwiKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY3R1YWwgPT09IGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRVJSX0FNQklHVU9VU19BUkdVTUVOVCgnZXJyb3IvbWVzc2FnZScsIFwiVGhlIGVycm9yIFxcXCJcIi5jb25jYXQoYWN0dWFsLCBcIlxcXCIgaXMgaWRlbnRpY2FsIHRvIHRoZSBtZXNzYWdlLlwiKSk7XG4gICAgfVxuXG4gICAgbWVzc2FnZSA9IGVycm9yO1xuICAgIGVycm9yID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKGVycm9yICE9IG51bGwgJiYgX3R5cGVvZihlcnJvcikgIT09ICdvYmplY3QnICYmIHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnZXJyb3InLCBbJ09iamVjdCcsICdFcnJvcicsICdGdW5jdGlvbicsICdSZWdFeHAnXSwgZXJyb3IpO1xuICB9XG5cbiAgaWYgKGFjdHVhbCA9PT0gTk9fRVhDRVBUSU9OX1NFTlRJTkVMKSB7XG4gICAgdmFyIGRldGFpbHMgPSAnJztcblxuICAgIGlmIChlcnJvciAmJiBlcnJvci5uYW1lKSB7XG4gICAgICBkZXRhaWxzICs9IFwiIChcIi5jb25jYXQoZXJyb3IubmFtZSwgXCIpXCIpO1xuICAgIH1cblxuICAgIGRldGFpbHMgKz0gbWVzc2FnZSA/IFwiOiBcIi5jb25jYXQobWVzc2FnZSkgOiAnLic7XG4gICAgdmFyIGZuVHlwZSA9IHN0YWNrU3RhcnRGbi5uYW1lID09PSAncmVqZWN0cycgPyAncmVqZWN0aW9uJyA6ICdleGNlcHRpb24nO1xuICAgIGlubmVyRmFpbCh7XG4gICAgICBhY3R1YWw6IHVuZGVmaW5lZCxcbiAgICAgIGV4cGVjdGVkOiBlcnJvcixcbiAgICAgIG9wZXJhdG9yOiBzdGFja1N0YXJ0Rm4ubmFtZSxcbiAgICAgIG1lc3NhZ2U6IFwiTWlzc2luZyBleHBlY3RlZCBcIi5jb25jYXQoZm5UeXBlKS5jb25jYXQoZGV0YWlscyksXG4gICAgICBzdGFja1N0YXJ0Rm46IHN0YWNrU3RhcnRGblxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGVycm9yICYmICFleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGVycm9yLCBtZXNzYWdlLCBzdGFja1N0YXJ0Rm4pKSB7XG4gICAgdGhyb3cgYWN0dWFsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4cGVjdHNOb0Vycm9yKHN0YWNrU3RhcnRGbiwgYWN0dWFsLCBlcnJvciwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09PSBOT19FWENFUFRJT05fU0VOVElORUwpIHJldHVybjtcblxuICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xuICAgIG1lc3NhZ2UgPSBlcnJvcjtcbiAgICBlcnJvciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICghZXJyb3IgfHwgZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBlcnJvcikpIHtcbiAgICB2YXIgZGV0YWlscyA9IG1lc3NhZ2UgPyBcIjogXCIuY29uY2F0KG1lc3NhZ2UpIDogJy4nO1xuICAgIHZhciBmblR5cGUgPSBzdGFja1N0YXJ0Rm4ubmFtZSA9PT0gJ2RvZXNOb3RSZWplY3QnID8gJ3JlamVjdGlvbicgOiAnZXhjZXB0aW9uJztcbiAgICBpbm5lckZhaWwoe1xuICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICBleHBlY3RlZDogZXJyb3IsXG4gICAgICBvcGVyYXRvcjogc3RhY2tTdGFydEZuLm5hbWUsXG4gICAgICBtZXNzYWdlOiBcIkdvdCB1bndhbnRlZCBcIi5jb25jYXQoZm5UeXBlKS5jb25jYXQoZGV0YWlscywgXCJcXG5cIikgKyBcIkFjdHVhbCBtZXNzYWdlOiBcXFwiXCIuY29uY2F0KGFjdHVhbCAmJiBhY3R1YWwubWVzc2FnZSwgXCJcXFwiXCIpLFxuICAgICAgc3RhY2tTdGFydEZuOiBzdGFja1N0YXJ0Rm5cbiAgICB9KTtcbiAgfVxuXG4gIHRocm93IGFjdHVhbDtcbn1cblxuYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uIHRocm93cyhwcm9taXNlRm4pIHtcbiAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgZXhwZWN0c0Vycm9yLmFwcGx5KHZvaWQgMCwgW3Rocm93cywgZ2V0QWN0dWFsKHByb21pc2VGbildLmNvbmNhdChhcmdzKSk7XG59O1xuXG5hc3NlcnQucmVqZWN0cyA9IGZ1bmN0aW9uIHJlamVjdHMocHJvbWlzZUZuKSB7XG4gIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMyA+IDEgPyBfbGVuMyAtIDEgOiAwKSwgX2tleTMgPSAxOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgYXJnc1tfa2V5MyAtIDFdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgfVxuXG4gIHJldHVybiB3YWl0Rm9yQWN0dWFsKHByb21pc2VGbikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIGV4cGVjdHNFcnJvci5hcHBseSh2b2lkIDAsIFtyZWplY3RzLCByZXN1bHRdLmNvbmNhdChhcmdzKSk7XG4gIH0pO1xufTtcblxuYXNzZXJ0LmRvZXNOb3RUaHJvdyA9IGZ1bmN0aW9uIGRvZXNOb3RUaHJvdyhmbikge1xuICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjQgPiAxID8gX2xlbjQgLSAxIDogMCksIF9rZXk0ID0gMTsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gIH1cblxuICBleHBlY3RzTm9FcnJvci5hcHBseSh2b2lkIDAsIFtkb2VzTm90VGhyb3csIGdldEFjdHVhbChmbildLmNvbmNhdChhcmdzKSk7XG59O1xuXG5hc3NlcnQuZG9lc05vdFJlamVjdCA9IGZ1bmN0aW9uIGRvZXNOb3RSZWplY3QoZm4pIHtcbiAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41ID4gMSA/IF9sZW41IC0gMSA6IDApLCBfa2V5NSA9IDE7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICBhcmdzW19rZXk1IC0gMV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICB9XG5cbiAgcmV0dXJuIHdhaXRGb3JBY3R1YWwoZm4pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiBleHBlY3RzTm9FcnJvci5hcHBseSh2b2lkIDAsIFtkb2VzTm90UmVqZWN0LCByZXN1bHRdLmNvbmNhdChhcmdzKSk7XG4gIH0pO1xufTtcblxuYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbiBpZkVycm9yKGVycikge1xuICBpZiAoZXJyICE9PSBudWxsICYmIGVyciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnaWZFcnJvciBnb3QgdW53YW50ZWQgZXhjZXB0aW9uOiAnO1xuXG4gICAgaWYgKF90eXBlb2YoZXJyKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGVyci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGVyci5tZXNzYWdlLmxlbmd0aCA9PT0gMCAmJiBlcnIuY29uc3RydWN0b3IpIHtcbiAgICAgICAgbWVzc2FnZSArPSBlcnIuY29uc3RydWN0b3IubmFtZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gZXJyLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UgKz0gaW5zcGVjdChlcnIpO1xuICAgIH1cblxuICAgIHZhciBuZXdFcnIgPSBuZXcgQXNzZXJ0aW9uRXJyb3Ioe1xuICAgICAgYWN0dWFsOiBlcnIsXG4gICAgICBleHBlY3RlZDogbnVsbCxcbiAgICAgIG9wZXJhdG9yOiAnaWZFcnJvcicsXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgc3RhY2tTdGFydEZuOiBpZkVycm9yXG4gICAgfSk7IC8vIE1ha2Ugc3VyZSB3ZSBhY3R1YWxseSBoYXZlIGEgc3RhY2sgdHJhY2UhXG5cbiAgICB2YXIgb3JpZ1N0YWNrID0gZXJyLnN0YWNrO1xuXG4gICAgaWYgKHR5cGVvZiBvcmlnU3RhY2sgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBUaGlzIHdpbGwgcmVtb3ZlIGFueSBkdXBsaWNhdGVkIGZyYW1lcyBmcm9tIHRoZSBlcnJvciBmcmFtZXMgdGFrZW5cbiAgICAgIC8vIGZyb20gd2l0aGluIGBpZkVycm9yYCBhbmQgYWRkIHRoZSBvcmlnaW5hbCBlcnJvciBmcmFtZXMgdG8gdGhlIG5ld2x5XG4gICAgICAvLyBjcmVhdGVkIG9uZXMuXG4gICAgICB2YXIgdG1wMiA9IG9yaWdTdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB0bXAyLnNoaWZ0KCk7IC8vIEZpbHRlciBhbGwgZnJhbWVzIGV4aXN0aW5nIGluIGVyci5zdGFjay5cblxuICAgICAgdmFyIHRtcDEgPSBuZXdFcnIuc3RhY2suc3BsaXQoJ1xcbicpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRtcDIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gRmluZCB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgZnJhbWUuXG4gICAgICAgIHZhciBwb3MgPSB0bXAxLmluZGV4T2YodG1wMltpXSk7XG5cbiAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBPbmx5IGtlZXAgbmV3IGZyYW1lcy5cbiAgICAgICAgICB0bXAxID0gdG1wMS5zbGljZSgwLCBwb3MpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5ld0Vyci5zdGFjayA9IFwiXCIuY29uY2F0KHRtcDEuam9pbignXFxuJyksIFwiXFxuXCIpLmNvbmNhdCh0bXAyLmpvaW4oJ1xcbicpKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXdFcnI7XG4gIH1cbn07IC8vIEV4cG9zZSBhIHN0cmljdCBvbmx5IHZhcmlhbnQgb2YgYXNzZXJ0XG5cblxuZnVuY3Rpb24gc3RyaWN0KCkge1xuICBmb3IgKHZhciBfbGVuNiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjYpLCBfa2V5NiA9IDA7IF9rZXk2IDwgX2xlbjY7IF9rZXk2KyspIHtcbiAgICBhcmdzW19rZXk2XSA9IGFyZ3VtZW50c1tfa2V5Nl07XG4gIH1cblxuICBpbm5lck9rLmFwcGx5KHZvaWQgMCwgW3N0cmljdCwgYXJncy5sZW5ndGhdLmNvbmNhdChhcmdzKSk7XG59XG5cbmFzc2VydC5zdHJpY3QgPSBvYmplY3RBc3NpZ24oc3RyaWN0LCBhc3NlcnQsIHtcbiAgZXF1YWw6IGFzc2VydC5zdHJpY3RFcXVhbCxcbiAgZGVlcEVxdWFsOiBhc3NlcnQuZGVlcFN0cmljdEVxdWFsLFxuICBub3RFcXVhbDogYXNzZXJ0Lm5vdFN0cmljdEVxdWFsLFxuICBub3REZWVwRXF1YWw6IGFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWxcbn0pO1xuYXNzZXJ0LnN0cmljdC5zdHJpY3QgPSBhc3NlcnQuc3RyaWN0OyIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvYXNzZXJ0L2Fzc2VydGlvbl9lcnJvci5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC8wODE3ODQwZjc3NTAzMjE2OWRkZDcwYzg1YWMwNTlmMThmZmNjODFjXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9OyB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7IGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykgeyBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7IHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlOyB9KSk7IH0gb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKSB7IHZhciBfY2FjaGUgPSB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgPyBuZXcgTWFwKCkgOiB1bmRlZmluZWQ7IF93cmFwTmF0aXZlU3VwZXIgPSBmdW5jdGlvbiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKSB7IGlmIChDbGFzcyA9PT0gbnVsbCB8fCAhX2lzTmF0aXZlRnVuY3Rpb24oQ2xhc3MpKSByZXR1cm4gQ2xhc3M7IGlmICh0eXBlb2YgQ2xhc3MgIT09IFwiZnVuY3Rpb25cIikgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gaWYgKHR5cGVvZiBfY2FjaGUgIT09IFwidW5kZWZpbmVkXCIpIHsgaWYgKF9jYWNoZS5oYXMoQ2xhc3MpKSByZXR1cm4gX2NhY2hlLmdldChDbGFzcyk7IF9jYWNoZS5zZXQoQ2xhc3MsIFdyYXBwZXIpOyB9IGZ1bmN0aW9uIFdyYXBwZXIoKSB7IHJldHVybiBfY29uc3RydWN0KENsYXNzLCBhcmd1bWVudHMsIF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3Rvcik7IH0gV3JhcHBlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogV3JhcHBlciwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihXcmFwcGVyLCBDbGFzcyk7IH07IHJldHVybiBfd3JhcE5hdGl2ZVN1cGVyKENsYXNzKTsgfVxuXG5mdW5jdGlvbiBpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChEYXRlLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7IGlmIChpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkgeyBfY29uc3RydWN0ID0gUmVmbGVjdC5jb25zdHJ1Y3Q7IH0gZWxzZSB7IF9jb25zdHJ1Y3QgPSBmdW5jdGlvbiBfY29uc3RydWN0KFBhcmVudCwgYXJncywgQ2xhc3MpIHsgdmFyIGEgPSBbbnVsbF07IGEucHVzaC5hcHBseShhLCBhcmdzKTsgdmFyIENvbnN0cnVjdG9yID0gRnVuY3Rpb24uYmluZC5hcHBseShQYXJlbnQsIGEpOyB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTsgaWYgKENsYXNzKSBfc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7IHJldHVybiBpbnN0YW5jZTsgfTsgfSByZXR1cm4gX2NvbnN0cnVjdC5hcHBseShudWxsLCBhcmd1bWVudHMpOyB9XG5cbmZ1bmN0aW9uIF9pc05hdGl2ZUZ1bmN0aW9uKGZuKSB7IHJldHVybiBGdW5jdGlvbi50b1N0cmluZy5jYWxsKGZuKS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSAhPT0gLTE7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCd1dGlsLycpLFxuICAgIGluc3BlY3QgPSBfcmVxdWlyZS5pbnNwZWN0O1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgnLi4vZXJyb3JzJyksXG4gICAgRVJSX0lOVkFMSURfQVJHX1RZUEUgPSBfcmVxdWlyZTIuY29kZXMuRVJSX0lOVkFMSURfQVJHX1RZUEU7IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9lbmRzV2l0aFxuXG5cbmZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc2VhcmNoLCB0aGlzX2xlbikge1xuICBpZiAodGhpc19sZW4gPT09IHVuZGVmaW5lZCB8fCB0aGlzX2xlbiA+IHN0ci5sZW5ndGgpIHtcbiAgICB0aGlzX2xlbiA9IHN0ci5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gc3RyLnN1YnN0cmluZyh0aGlzX2xlbiAtIHNlYXJjaC5sZW5ndGgsIHRoaXNfbGVuKSA9PT0gc2VhcmNoO1xufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvcmVwZWF0XG5cblxuZnVuY3Rpb24gcmVwZWF0KHN0ciwgY291bnQpIHtcbiAgY291bnQgPSBNYXRoLmZsb29yKGNvdW50KTtcbiAgaWYgKHN0ci5sZW5ndGggPT0gMCB8fCBjb3VudCA9PSAwKSByZXR1cm4gJyc7XG4gIHZhciBtYXhDb3VudCA9IHN0ci5sZW5ndGggKiBjb3VudDtcbiAgY291bnQgPSBNYXRoLmZsb29yKE1hdGgubG9nKGNvdW50KSAvIE1hdGgubG9nKDIpKTtcblxuICB3aGlsZSAoY291bnQpIHtcbiAgICBzdHIgKz0gc3RyO1xuICAgIGNvdW50LS07XG4gIH1cblxuICBzdHIgKz0gc3RyLnN1YnN0cmluZygwLCBtYXhDb3VudCAtIHN0ci5sZW5ndGgpO1xuICByZXR1cm4gc3RyO1xufVxuXG52YXIgYmx1ZSA9ICcnO1xudmFyIGdyZWVuID0gJyc7XG52YXIgcmVkID0gJyc7XG52YXIgd2hpdGUgPSAnJztcbnZhciBrUmVhZGFibGVPcGVyYXRvciA9IHtcbiAgZGVlcFN0cmljdEVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIHN0cmljdGx5IGRlZXAtZXF1YWw6JyxcbiAgc3RyaWN0RXF1YWw6ICdFeHBlY3RlZCB2YWx1ZXMgdG8gYmUgc3RyaWN0bHkgZXF1YWw6JyxcbiAgc3RyaWN0RXF1YWxPYmplY3Q6ICdFeHBlY3RlZCBcImFjdHVhbFwiIHRvIGJlIHJlZmVyZW5jZS1lcXVhbCB0byBcImV4cGVjdGVkXCI6JyxcbiAgZGVlcEVxdWFsOiAnRXhwZWN0ZWQgdmFsdWVzIHRvIGJlIGxvb3NlbHkgZGVlcC1lcXVhbDonLFxuICBlcXVhbDogJ0V4cGVjdGVkIHZhbHVlcyB0byBiZSBsb29zZWx5IGVxdWFsOicsXG4gIG5vdERlZXBTdHJpY3RFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgbm90IHRvIGJlIHN0cmljdGx5IGRlZXAtZXF1YWwgdG86JyxcbiAgbm90U3RyaWN0RXF1YWw6ICdFeHBlY3RlZCBcImFjdHVhbFwiIHRvIGJlIHN0cmljdGx5IHVuZXF1YWwgdG86JyxcbiAgbm90U3RyaWN0RXF1YWxPYmplY3Q6ICdFeHBlY3RlZCBcImFjdHVhbFwiIG5vdCB0byBiZSByZWZlcmVuY2UtZXF1YWwgdG8gXCJleHBlY3RlZFwiOicsXG4gIG5vdERlZXBFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgbm90IHRvIGJlIGxvb3NlbHkgZGVlcC1lcXVhbCB0bzonLFxuICBub3RFcXVhbDogJ0V4cGVjdGVkIFwiYWN0dWFsXCIgdG8gYmUgbG9vc2VseSB1bmVxdWFsIHRvOicsXG4gIG5vdElkZW50aWNhbDogJ1ZhbHVlcyBpZGVudGljYWwgYnV0IG5vdCByZWZlcmVuY2UtZXF1YWw6J1xufTsgLy8gQ29tcGFyaW5nIHNob3J0IHByaW1pdGl2ZXMgc2hvdWxkIGp1c3Qgc2hvdyA9PT0gLyAhPT0gaW5zdGVhZCBvZiB1c2luZyB0aGVcbi8vIGRpZmYuXG5cbnZhciBrTWF4U2hvcnRMZW5ndGggPSAxMDtcblxuZnVuY3Rpb24gY29weUVycm9yKHNvdXJjZSkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciB0YXJnZXQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpKTtcbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgJ21lc3NhZ2UnLCB7XG4gICAgdmFsdWU6IHNvdXJjZS5tZXNzYWdlXG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBpbnNwZWN0VmFsdWUodmFsKSB7XG4gIC8vIFRoZSB1dGlsLmluc3BlY3QgZGVmYXVsdCB2YWx1ZXMgY291bGQgYmUgY2hhbmdlZC4gVGhpcyBtYWtlcyBzdXJlIHRoZVxuICAvLyBlcnJvciBtZXNzYWdlcyBjb250YWluIHRoZSBuZWNlc3NhcnkgaW5mb3JtYXRpb24gbmV2ZXJ0aGVsZXNzLlxuICByZXR1cm4gaW5zcGVjdCh2YWwsIHtcbiAgICBjb21wYWN0OiBmYWxzZSxcbiAgICBjdXN0b21JbnNwZWN0OiBmYWxzZSxcbiAgICBkZXB0aDogMTAwMCxcbiAgICBtYXhBcnJheUxlbmd0aDogSW5maW5pdHksXG4gICAgLy8gQXNzZXJ0IGNvbXBhcmVzIG9ubHkgZW51bWVyYWJsZSBwcm9wZXJ0aWVzICh3aXRoIGEgZmV3IGV4Y2VwdGlvbnMpLlxuICAgIHNob3dIaWRkZW46IGZhbHNlLFxuICAgIC8vIEhhdmluZyBhIGxvbmcgbGluZSBhcyBlcnJvciBpcyBiZXR0ZXIgdGhhbiB3cmFwcGluZyB0aGUgbGluZSBmb3JcbiAgICAvLyBjb21wYXJpc29uIGZvciBub3cuXG4gICAgLy8gVE9ETyhCcmlkZ2VBUik6IGBicmVha0xlbmd0aGAgc2hvdWxkIGJlIGxpbWl0ZWQgYXMgc29vbiBhcyBzb29uIGFzIHdlXG4gICAgLy8gaGF2ZSBtZXRhIGluZm9ybWF0aW9uIGFib3V0IHRoZSBpbnNwZWN0ZWQgcHJvcGVydGllcyAoaS5lLiwga25vdyB3aGVyZVxuICAgIC8vIGluIHdoYXQgbGluZSB0aGUgcHJvcGVydHkgc3RhcnRzIGFuZCBlbmRzKS5cbiAgICBicmVha0xlbmd0aDogSW5maW5pdHksXG4gICAgLy8gQXNzZXJ0IGRvZXMgbm90IGRldGVjdCBwcm94aWVzIGN1cnJlbnRseS5cbiAgICBzaG93UHJveHk6IGZhbHNlLFxuICAgIHNvcnRlZDogdHJ1ZSxcbiAgICAvLyBJbnNwZWN0IGdldHRlcnMgYXMgd2UgYWxzbyBjaGVjayB0aGVtIHdoZW4gY29tcGFyaW5nIGVudHJpZXMuXG4gICAgZ2V0dGVyczogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXJyRGlmZihhY3R1YWwsIGV4cGVjdGVkLCBvcGVyYXRvcikge1xuICB2YXIgb3RoZXIgPSAnJztcbiAgdmFyIHJlcyA9ICcnO1xuICB2YXIgbGFzdFBvcyA9IDA7XG4gIHZhciBlbmQgPSAnJztcbiAgdmFyIHNraXBwZWQgPSBmYWxzZTtcbiAgdmFyIGFjdHVhbEluc3BlY3RlZCA9IGluc3BlY3RWYWx1ZShhY3R1YWwpO1xuICB2YXIgYWN0dWFsTGluZXMgPSBhY3R1YWxJbnNwZWN0ZWQuc3BsaXQoJ1xcbicpO1xuICB2YXIgZXhwZWN0ZWRMaW5lcyA9IGluc3BlY3RWYWx1ZShleHBlY3RlZCkuc3BsaXQoJ1xcbicpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBpbmRpY2F0b3IgPSAnJzsgLy8gSW4gY2FzZSBib3RoIHZhbHVlcyBhcmUgb2JqZWN0cyBleHBsaWNpdGx5IG1hcmsgdGhlbSBhcyBub3QgcmVmZXJlbmNlIGVxdWFsXG4gIC8vIGZvciB0aGUgYHN0cmljdEVxdWFsYCBvcGVyYXRvci5cblxuICBpZiAob3BlcmF0b3IgPT09ICdzdHJpY3RFcXVhbCcgJiYgX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBfdHlwZW9mKGV4cGVjdGVkKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsICYmIGV4cGVjdGVkICE9PSBudWxsKSB7XG4gICAgb3BlcmF0b3IgPSAnc3RyaWN0RXF1YWxPYmplY3QnO1xuICB9IC8vIElmIFwiYWN0dWFsXCIgYW5kIFwiZXhwZWN0ZWRcIiBmaXQgb24gYSBzaW5nbGUgbGluZSBhbmQgdGhleSBhcmUgbm90IHN0cmljdGx5XG4gIC8vIGVxdWFsLCBjaGVjayBmdXJ0aGVyIHNwZWNpYWwgaGFuZGxpbmcuXG5cblxuICBpZiAoYWN0dWFsTGluZXMubGVuZ3RoID09PSAxICYmIGV4cGVjdGVkTGluZXMubGVuZ3RoID09PSAxICYmIGFjdHVhbExpbmVzWzBdICE9PSBleHBlY3RlZExpbmVzWzBdKSB7XG4gICAgdmFyIGlucHV0TGVuZ3RoID0gYWN0dWFsTGluZXNbMF0ubGVuZ3RoICsgZXhwZWN0ZWRMaW5lc1swXS5sZW5ndGg7IC8vIElmIHRoZSBjaGFyYWN0ZXIgbGVuZ3RoIG9mIFwiYWN0dWFsXCIgYW5kIFwiZXhwZWN0ZWRcIiB0b2dldGhlciBpcyBsZXNzIHRoYW5cbiAgICAvLyBrTWF4U2hvcnRMZW5ndGggYW5kIGlmIG5laXRoZXIgaXMgYW4gb2JqZWN0IGFuZCBhdCBsZWFzdCBvbmUgb2YgdGhlbSBpc1xuICAgIC8vIG5vdCBgemVyb2AsIHVzZSB0aGUgc3RyaWN0IGVxdWFsIGNvbXBhcmlzb24gdG8gdmlzdWFsaXplIHRoZSBvdXRwdXQuXG5cbiAgICBpZiAoaW5wdXRMZW5ndGggPD0ga01heFNob3J0TGVuZ3RoKSB7XG4gICAgICBpZiAoKF90eXBlb2YoYWN0dWFsKSAhPT0gJ29iamVjdCcgfHwgYWN0dWFsID09PSBudWxsKSAmJiAoX3R5cGVvZihleHBlY3RlZCkgIT09ICdvYmplY3QnIHx8IGV4cGVjdGVkID09PSBudWxsKSAmJiAoYWN0dWFsICE9PSAwIHx8IGV4cGVjdGVkICE9PSAwKSkge1xuICAgICAgICAvLyAtMCA9PT0gKzBcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KGtSZWFkYWJsZU9wZXJhdG9yW29wZXJhdG9yXSwgXCJcXG5cXG5cIikgKyBcIlwiLmNvbmNhdChhY3R1YWxMaW5lc1swXSwgXCIgIT09IFwiKS5jb25jYXQoZXhwZWN0ZWRMaW5lc1swXSwgXCJcXG5cIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcGVyYXRvciAhPT0gJ3N0cmljdEVxdWFsT2JqZWN0Jykge1xuICAgICAgLy8gSWYgdGhlIHN0ZGVyciBpcyBhIHR0eSBhbmQgdGhlIGlucHV0IGxlbmd0aCBpcyBsb3dlciB0aGFuIHRoZSBjdXJyZW50XG4gICAgICAvLyBjb2x1bW5zIHBlciBsaW5lLCBhZGQgYSBtaXNtYXRjaCBpbmRpY2F0b3IgYmVsb3cgdGhlIG91dHB1dC4gSWYgaXQgaXNcbiAgICAgIC8vIG5vdCBhIHR0eSwgdXNlIGEgZGVmYXVsdCB2YWx1ZSBvZiA4MCBjaGFyYWN0ZXJzLlxuICAgICAgdmFyIG1heExlbmd0aCA9IHByb2Nlc3Muc3RkZXJyICYmIHByb2Nlc3Muc3RkZXJyLmlzVFRZID8gcHJvY2Vzcy5zdGRlcnIuY29sdW1ucyA6IDgwO1xuXG4gICAgICBpZiAoaW5wdXRMZW5ndGggPCBtYXhMZW5ndGgpIHtcbiAgICAgICAgd2hpbGUgKGFjdHVhbExpbmVzWzBdW2ldID09PSBleHBlY3RlZExpbmVzWzBdW2ldKSB7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9IC8vIElnbm9yZSB0aGUgZmlyc3QgY2hhcmFjdGVycy5cblxuXG4gICAgICAgIGlmIChpID4gMikge1xuICAgICAgICAgIC8vIEFkZCBwb3NpdGlvbiBpbmRpY2F0b3IgZm9yIHRoZSBmaXJzdCBtaXNtYXRjaCBpbiBjYXNlIGl0IGlzIGFcbiAgICAgICAgICAvLyBzaW5nbGUgbGluZSBhbmQgdGhlIGlucHV0IGxlbmd0aCBpcyBsZXNzIHRoYW4gdGhlIGNvbHVtbiBsZW5ndGguXG4gICAgICAgICAgaW5kaWNhdG9yID0gXCJcXG4gIFwiLmNvbmNhdChyZXBlYXQoJyAnLCBpKSwgXCJeXCIpO1xuICAgICAgICAgIGkgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IC8vIFJlbW92ZSBhbGwgZW5kaW5nIGxpbmVzIHRoYXQgbWF0Y2ggKHRoaXMgb3B0aW1pemVzIHRoZSBvdXRwdXQgZm9yXG4gIC8vIHJlYWRhYmlsaXR5IGJ5IHJlZHVjaW5nIHRoZSBudW1iZXIgb2YgdG90YWwgY2hhbmdlZCBsaW5lcykuXG5cblxuICB2YXIgYSA9IGFjdHVhbExpbmVzW2FjdHVhbExpbmVzLmxlbmd0aCAtIDFdO1xuICB2YXIgYiA9IGV4cGVjdGVkTGluZXNbZXhwZWN0ZWRMaW5lcy5sZW5ndGggLSAxXTtcblxuICB3aGlsZSAoYSA9PT0gYikge1xuICAgIGlmIChpKysgPCAyKSB7XG4gICAgICBlbmQgPSBcIlxcbiAgXCIuY29uY2F0KGEpLmNvbmNhdChlbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdGhlciA9IGE7XG4gICAgfVxuXG4gICAgYWN0dWFsTGluZXMucG9wKCk7XG4gICAgZXhwZWN0ZWRMaW5lcy5wb3AoKTtcbiAgICBpZiAoYWN0dWFsTGluZXMubGVuZ3RoID09PSAwIHx8IGV4cGVjdGVkTGluZXMubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICBhID0gYWN0dWFsTGluZXNbYWN0dWFsTGluZXMubGVuZ3RoIC0gMV07XG4gICAgYiA9IGV4cGVjdGVkTGluZXNbZXhwZWN0ZWRMaW5lcy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIHZhciBtYXhMaW5lcyA9IE1hdGgubWF4KGFjdHVhbExpbmVzLmxlbmd0aCwgZXhwZWN0ZWRMaW5lcy5sZW5ndGgpOyAvLyBTdHJpY3QgZXF1YWwgd2l0aCBpZGVudGljYWwgb2JqZWN0cyB0aGF0IGFyZSBub3QgaWRlbnRpY2FsIGJ5IHJlZmVyZW5jZS5cbiAgLy8gRS5nLiwgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCh7IGE6IFN5bWJvbCgpIH0sIHsgYTogU3ltYm9sKCkgfSlcblxuICBpZiAobWF4TGluZXMgPT09IDApIHtcbiAgICAvLyBXZSBoYXZlIHRvIGdldCB0aGUgcmVzdWx0IGFnYWluLiBUaGUgbGluZXMgd2VyZSBhbGwgcmVtb3ZlZCBiZWZvcmUuXG4gICAgdmFyIF9hY3R1YWxMaW5lcyA9IGFjdHVhbEluc3BlY3RlZC5zcGxpdCgnXFxuJyk7IC8vIE9ubHkgcmVtb3ZlIGxpbmVzIGluIGNhc2UgaXQgbWFrZXMgc2Vuc2UgdG8gY29sbGFwc2UgdGhvc2UuXG4gICAgLy8gVE9ETzogQWNjZXB0IGVudiB0byBhbHdheXMgc2hvdyB0aGUgZnVsbCBlcnJvci5cblxuXG4gICAgaWYgKF9hY3R1YWxMaW5lcy5sZW5ndGggPiAzMCkge1xuICAgICAgX2FjdHVhbExpbmVzWzI2XSA9IFwiXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG5cbiAgICAgIHdoaWxlIChfYWN0dWFsTGluZXMubGVuZ3RoID4gMjcpIHtcbiAgICAgICAgX2FjdHVhbExpbmVzLnBvcCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChrUmVhZGFibGVPcGVyYXRvci5ub3RJZGVudGljYWwsIFwiXFxuXFxuXCIpLmNvbmNhdChfYWN0dWFsTGluZXMuam9pbignXFxuJyksIFwiXFxuXCIpO1xuICB9XG5cbiAgaWYgKGkgPiAzKSB7XG4gICAgZW5kID0gXCJcXG5cIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKS5jb25jYXQoZW5kKTtcbiAgICBza2lwcGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChvdGhlciAhPT0gJycpIHtcbiAgICBlbmQgPSBcIlxcbiAgXCIuY29uY2F0KG90aGVyKS5jb25jYXQoZW5kKTtcbiAgICBvdGhlciA9ICcnO1xuICB9XG5cbiAgdmFyIHByaW50ZWRMaW5lcyA9IDA7XG4gIHZhciBtc2cgPSBrUmVhZGFibGVPcGVyYXRvcltvcGVyYXRvcl0gKyBcIlxcblwiLmNvbmNhdChncmVlbiwgXCIrIGFjdHVhbFwiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQocmVkLCBcIi0gZXhwZWN0ZWRcIikuY29uY2F0KHdoaXRlKTtcbiAgdmFyIHNraXBwZWRNc2cgPSBcIiBcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlLCBcIiBMaW5lcyBza2lwcGVkXCIpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBtYXhMaW5lczsgaSsrKSB7XG4gICAgLy8gT25seSBleHRyYSBleHBlY3RlZCBsaW5lcyBleGlzdFxuICAgIHZhciBjdXIgPSBpIC0gbGFzdFBvcztcblxuICAgIGlmIChhY3R1YWxMaW5lcy5sZW5ndGggPCBpICsgMSkge1xuICAgICAgLy8gSWYgdGhlIGxhc3QgZGl2ZXJnaW5nIGxpbmUgaXMgbW9yZSB0aGFuIG9uZSBsaW5lIGFib3ZlIGFuZCB0aGVcbiAgICAgIC8vIGN1cnJlbnQgbGluZSBpcyBhdCBsZWFzdCBsaW5lIHRocmVlLCBhZGQgc29tZSBvZiB0aGUgZm9ybWVyIGxpbmVzIGFuZFxuICAgICAgLy8gYWxzbyBhZGQgZG90cyB0byBpbmRpY2F0ZSBza2lwcGVkIGVudHJpZXMuXG4gICAgICBpZiAoY3VyID4gMSAmJiBpID4gMikge1xuICAgICAgICBpZiAoY3VyID4gNCkge1xuICAgICAgICAgIHJlcyArPSBcIlxcblwiLmNvbmNhdChibHVlLCBcIi4uLlwiKS5jb25jYXQod2hpdGUpO1xuICAgICAgICAgIHNraXBwZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGN1ciA+IDMpIHtcbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChleHBlY3RlZExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChleHBlY3RlZExpbmVzW2kgLSAxXSk7XG4gICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgfSAvLyBNYXJrIHRoZSBjdXJyZW50IGxpbmUgYXMgdGhlIGxhc3QgZGl2ZXJnaW5nIG9uZS5cblxuXG4gICAgICBsYXN0UG9zID0gaTsgLy8gQWRkIHRoZSBleHBlY3RlZCBsaW5lIHRvIHRoZSBjYWNoZS5cblxuICAgICAgb3RoZXIgKz0gXCJcXG5cIi5jb25jYXQocmVkLCBcIi1cIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkTGluZXNbaV0pO1xuICAgICAgcHJpbnRlZExpbmVzKys7IC8vIE9ubHkgZXh0cmEgYWN0dWFsIGxpbmVzIGV4aXN0XG4gICAgfSBlbHNlIGlmIChleHBlY3RlZExpbmVzLmxlbmd0aCA8IGkgKyAxKSB7XG4gICAgICAvLyBJZiB0aGUgbGFzdCBkaXZlcmdpbmcgbGluZSBpcyBtb3JlIHRoYW4gb25lIGxpbmUgYWJvdmUgYW5kIHRoZVxuICAgICAgLy8gY3VycmVudCBsaW5lIGlzIGF0IGxlYXN0IGxpbmUgdGhyZWUsIGFkZCBzb21lIG9mIHRoZSBmb3JtZXIgbGluZXMgYW5kXG4gICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgIGlmIChjdXIgPiAxICYmIGkgPiAyKSB7XG4gICAgICAgIGlmIChjdXIgPiA0KSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgc2tpcHBlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VyID4gMykge1xuICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cblxuICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lc1tpIC0gMV0pO1xuICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgIH0gLy8gTWFyayB0aGUgY3VycmVudCBsaW5lIGFzIHRoZSBsYXN0IGRpdmVyZ2luZyBvbmUuXG5cblxuICAgICAgbGFzdFBvcyA9IGk7IC8vIEFkZCB0aGUgYWN0dWFsIGxpbmUgdG8gdGhlIHJlc3VsdC5cblxuICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGdyZWVuLCBcIitcIikuY29uY2F0KHdoaXRlLCBcIiBcIikuY29uY2F0KGFjdHVhbExpbmVzW2ldKTtcbiAgICAgIHByaW50ZWRMaW5lcysrOyAvLyBMaW5lcyBkaXZlcmdlXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBleHBlY3RlZExpbmUgPSBleHBlY3RlZExpbmVzW2ldO1xuICAgICAgdmFyIGFjdHVhbExpbmUgPSBhY3R1YWxMaW5lc1tpXTsgLy8gSWYgdGhlIGxpbmVzIGRpdmVyZ2UsIHNwZWNpZmljYWxseSBjaGVjayBmb3IgbGluZXMgdGhhdCBvbmx5IGRpdmVyZ2UgYnlcbiAgICAgIC8vIGEgdHJhaWxpbmcgY29tbWEuIEluIHRoYXQgY2FzZSBpdCBpcyBhY3R1YWxseSBpZGVudGljYWwgYW5kIHdlIHNob3VsZFxuICAgICAgLy8gbWFyayBpdCBhcyBzdWNoLlxuXG4gICAgICB2YXIgZGl2ZXJnaW5nTGluZXMgPSBhY3R1YWxMaW5lICE9PSBleHBlY3RlZExpbmUgJiYgKCFlbmRzV2l0aChhY3R1YWxMaW5lLCAnLCcpIHx8IGFjdHVhbExpbmUuc2xpY2UoMCwgLTEpICE9PSBleHBlY3RlZExpbmUpOyAvLyBJZiB0aGUgZXhwZWN0ZWQgbGluZSBoYXMgYSB0cmFpbGluZyBjb21tYSBidXQgaXMgb3RoZXJ3aXNlIGlkZW50aWNhbCxcbiAgICAgIC8vIGFkZCBhIGNvbW1hIGF0IHRoZSBlbmQgb2YgdGhlIGFjdHVhbCBsaW5lLiBPdGhlcndpc2UgdGhlIG91dHB1dCBjb3VsZFxuICAgICAgLy8gbG9vayB3ZWlyZCBhcyBpbjpcbiAgICAgIC8vXG4gICAgICAvLyAgIFtcbiAgICAgIC8vICAgICAxICAgICAgICAgLy8gTm8gY29tbWEgYXQgdGhlIGVuZCFcbiAgICAgIC8vICsgICAyXG4gICAgICAvLyAgIF1cbiAgICAgIC8vXG5cbiAgICAgIGlmIChkaXZlcmdpbmdMaW5lcyAmJiBlbmRzV2l0aChleHBlY3RlZExpbmUsICcsJykgJiYgZXhwZWN0ZWRMaW5lLnNsaWNlKDAsIC0xKSA9PT0gYWN0dWFsTGluZSkge1xuICAgICAgICBkaXZlcmdpbmdMaW5lcyA9IGZhbHNlO1xuICAgICAgICBhY3R1YWxMaW5lICs9ICcsJztcbiAgICAgIH1cblxuICAgICAgaWYgKGRpdmVyZ2luZ0xpbmVzKSB7XG4gICAgICAgIC8vIElmIHRoZSBsYXN0IGRpdmVyZ2luZyBsaW5lIGlzIG1vcmUgdGhhbiBvbmUgbGluZSBhYm92ZSBhbmQgdGhlXG4gICAgICAgIC8vIGN1cnJlbnQgbGluZSBpcyBhdCBsZWFzdCBsaW5lIHRocmVlLCBhZGQgc29tZSBvZiB0aGUgZm9ybWVyIGxpbmVzIGFuZFxuICAgICAgICAvLyBhbHNvIGFkZCBkb3RzIHRvIGluZGljYXRlIHNraXBwZWQgZW50cmllcy5cbiAgICAgICAgaWYgKGN1ciA+IDEgJiYgaSA+IDIpIHtcbiAgICAgICAgICBpZiAoY3VyID4gNCkge1xuICAgICAgICAgICAgcmVzICs9IFwiXFxuXCIuY29uY2F0KGJsdWUsIFwiLi4uXCIpLmNvbmNhdCh3aGl0ZSk7XG4gICAgICAgICAgICBza2lwcGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1ciA+IDMpIHtcbiAgICAgICAgICAgIHJlcyArPSBcIlxcbiAgXCIuY29uY2F0KGFjdHVhbExpbmVzW2kgLSAyXSk7XG4gICAgICAgICAgICBwcmludGVkTGluZXMrKztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXMgKz0gXCJcXG4gIFwiLmNvbmNhdChhY3R1YWxMaW5lc1tpIC0gMV0pO1xuICAgICAgICAgIHByaW50ZWRMaW5lcysrO1xuICAgICAgICB9IC8vIE1hcmsgdGhlIGN1cnJlbnQgbGluZSBhcyB0aGUgbGFzdCBkaXZlcmdpbmcgb25lLlxuXG5cbiAgICAgICAgbGFzdFBvcyA9IGk7IC8vIEFkZCB0aGUgYWN0dWFsIGxpbmUgdG8gdGhlIHJlc3VsdCBhbmQgY2FjaGUgdGhlIGV4cGVjdGVkIGRpdmVyZ2luZ1xuICAgICAgICAvLyBsaW5lIHNvIGNvbnNlY3V0aXZlIGRpdmVyZ2luZyBsaW5lcyBzaG93IHVwIGFzICsrKy0tLSBhbmQgbm90ICstKy0rLS5cblxuICAgICAgICByZXMgKz0gXCJcXG5cIi5jb25jYXQoZ3JlZW4sIFwiK1wiKS5jb25jYXQod2hpdGUsIFwiIFwiKS5jb25jYXQoYWN0dWFsTGluZSk7XG4gICAgICAgIG90aGVyICs9IFwiXFxuXCIuY29uY2F0KHJlZCwgXCItXCIpLmNvbmNhdCh3aGl0ZSwgXCIgXCIpLmNvbmNhdChleHBlY3RlZExpbmUpO1xuICAgICAgICBwcmludGVkTGluZXMgKz0gMjsgLy8gTGluZXMgYXJlIGlkZW50aWNhbFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQWRkIGFsbCBjYWNoZWQgaW5mb3JtYXRpb24gdG8gdGhlIHJlc3VsdCBiZWZvcmUgYWRkaW5nIG90aGVyIHRoaW5nc1xuICAgICAgICAvLyBhbmQgcmVzZXQgdGhlIGNhY2hlLlxuICAgICAgICByZXMgKz0gb3RoZXI7XG4gICAgICAgIG90aGVyID0gJyc7IC8vIElmIHRoZSBsYXN0IGRpdmVyZ2luZyBsaW5lIGlzIGV4YWN0bHkgb25lIGxpbmUgYWJvdmUgb3IgaWYgaXQgaXMgdGhlXG4gICAgICAgIC8vIHZlcnkgZmlyc3QgbGluZSwgYWRkIHRoZSBsaW5lIHRvIHRoZSByZXN1bHQuXG5cbiAgICAgICAgaWYgKGN1ciA9PT0gMSB8fCBpID09PSAwKSB7XG4gICAgICAgICAgcmVzICs9IFwiXFxuICBcIi5jb25jYXQoYWN0dWFsTGluZSk7XG4gICAgICAgICAgcHJpbnRlZExpbmVzKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIEluc3BlY3RlZCBvYmplY3QgdG8gYmlnIChTaG93IH4yMCByb3dzIG1heClcblxuXG4gICAgaWYgKHByaW50ZWRMaW5lcyA+IDIwICYmIGkgPCBtYXhMaW5lcyAtIDIpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChtc2cpLmNvbmNhdChza2lwcGVkTXNnLCBcIlxcblwiKS5jb25jYXQocmVzLCBcIlxcblwiKS5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKS5jb25jYXQob3RoZXIsIFwiXFxuXCIpICsgXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gXCJcIi5jb25jYXQobXNnKS5jb25jYXQoc2tpcHBlZCA/IHNraXBwZWRNc2cgOiAnJywgXCJcXG5cIikuY29uY2F0KHJlcykuY29uY2F0KG90aGVyKS5jb25jYXQoZW5kKS5jb25jYXQoaW5kaWNhdG9yKTtcbn1cblxudmFyIEFzc2VydGlvbkVycm9yID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRXJyb3IpIHtcbiAgX2luaGVyaXRzKEFzc2VydGlvbkVycm9yLCBfRXJyb3IpO1xuXG4gIGZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXNzZXJ0aW9uRXJyb3IpO1xuXG4gICAgaWYgKF90eXBlb2Yob3B0aW9ucykgIT09ICdvYmplY3QnIHx8IG9wdGlvbnMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFUlJfSU5WQUxJRF9BUkdfVFlQRSgnb3B0aW9ucycsICdPYmplY3QnLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICB2YXIgbWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZSxcbiAgICAgICAgb3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yLFxuICAgICAgICBzdGFja1N0YXJ0Rm4gPSBvcHRpb25zLnN0YWNrU3RhcnRGbjtcbiAgICB2YXIgYWN0dWFsID0gb3B0aW9ucy5hY3R1YWwsXG4gICAgICAgIGV4cGVjdGVkID0gb3B0aW9ucy5leHBlY3RlZDtcbiAgICB2YXIgbGltaXQgPSBFcnJvci5zdGFja1RyYWNlTGltaXQ7XG4gICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gMDtcblxuICAgIGlmIChtZXNzYWdlICE9IG51bGwpIHtcbiAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKEFzc2VydGlvbkVycm9yKS5jYWxsKHRoaXMsIFN0cmluZyhtZXNzYWdlKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuaXNUVFkpIHtcbiAgICAgICAgLy8gUmVzZXQgb24gZWFjaCBjYWxsIHRvIG1ha2Ugc3VyZSB3ZSBoYW5kbGUgZHluYW1pY2FsbHkgc2V0IGVudmlyb25tZW50XG4gICAgICAgIC8vIHZhcmlhYmxlcyBjb3JyZWN0LlxuICAgICAgICBpZiAocHJvY2Vzcy5zdGRlcnIgJiYgcHJvY2Vzcy5zdGRlcnIuZ2V0Q29sb3JEZXB0aCAmJiBwcm9jZXNzLnN0ZGVyci5nZXRDb2xvckRlcHRoKCkgIT09IDEpIHtcbiAgICAgICAgICBibHVlID0gXCJcXHgxQlszNG1cIjtcbiAgICAgICAgICBncmVlbiA9IFwiXFx4MUJbMzJtXCI7XG4gICAgICAgICAgd2hpdGUgPSBcIlxceDFCWzM5bVwiO1xuICAgICAgICAgIHJlZCA9IFwiXFx4MUJbMzFtXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmx1ZSA9ICcnO1xuICAgICAgICAgIGdyZWVuID0gJyc7XG4gICAgICAgICAgd2hpdGUgPSAnJztcbiAgICAgICAgICByZWQgPSAnJztcbiAgICAgICAgfVxuICAgICAgfSAvLyBQcmV2ZW50IHRoZSBlcnJvciBzdGFjayBmcm9tIGJlaW5nIHZpc2libGUgYnkgZHVwbGljYXRpbmcgdGhlIGVycm9yXG4gICAgICAvLyBpbiBhIHZlcnkgY2xvc2Ugd2F5IHRvIHRoZSBvcmlnaW5hbCBpbiBjYXNlIGJvdGggc2lkZXMgYXJlIGFjdHVhbGx5XG4gICAgICAvLyBpbnN0YW5jZXMgb2YgRXJyb3IuXG5cblxuICAgICAgaWYgKF90eXBlb2YoYWN0dWFsKSA9PT0gJ29iamVjdCcgJiYgYWN0dWFsICE9PSBudWxsICYmIF90eXBlb2YoZXhwZWN0ZWQpID09PSAnb2JqZWN0JyAmJiBleHBlY3RlZCAhPT0gbnVsbCAmJiAnc3RhY2snIGluIGFjdHVhbCAmJiBhY3R1YWwgaW5zdGFuY2VvZiBFcnJvciAmJiAnc3RhY2snIGluIGV4cGVjdGVkICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgYWN0dWFsID0gY29weUVycm9yKGFjdHVhbCk7XG4gICAgICAgIGV4cGVjdGVkID0gY29weUVycm9yKGV4cGVjdGVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wZXJhdG9yID09PSAnZGVlcFN0cmljdEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ3N0cmljdEVxdWFsJykge1xuICAgICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBjcmVhdGVFcnJEaWZmKGFjdHVhbCwgZXhwZWN0ZWQsIG9wZXJhdG9yKSkpO1xuICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJ25vdERlZXBTdHJpY3RFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdub3RTdHJpY3RFcXVhbCcpIHtcbiAgICAgICAgLy8gSW4gY2FzZSB0aGUgb2JqZWN0cyBhcmUgZXF1YWwgYnV0IHRoZSBvcGVyYXRvciByZXF1aXJlcyB1bmVxdWFsLCBzaG93XG4gICAgICAgIC8vIHRoZSBmaXJzdCBvYmplY3QgYW5kIHNheSBBIGVxdWFscyBCXG4gICAgICAgIHZhciBiYXNlID0ga1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdO1xuICAgICAgICB2YXIgcmVzID0gaW5zcGVjdFZhbHVlKGFjdHVhbCkuc3BsaXQoJ1xcbicpOyAvLyBJbiBjYXNlIFwiYWN0dWFsXCIgaXMgYW4gb2JqZWN0LCBpdCBzaG91bGQgbm90IGJlIHJlZmVyZW5jZSBlcXVhbC5cblxuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdub3RTdHJpY3RFcXVhbCcgJiYgX3R5cGVvZihhY3R1YWwpID09PSAnb2JqZWN0JyAmJiBhY3R1YWwgIT09IG51bGwpIHtcbiAgICAgICAgICBiYXNlID0ga1JlYWRhYmxlT3BlcmF0b3Iubm90U3RyaWN0RXF1YWxPYmplY3Q7XG4gICAgICAgIH0gLy8gT25seSByZW1vdmUgbGluZXMgaW4gY2FzZSBpdCBtYWtlcyBzZW5zZSB0byBjb2xsYXBzZSB0aG9zZS5cbiAgICAgICAgLy8gVE9ETzogQWNjZXB0IGVudiB0byBhbHdheXMgc2hvdyB0aGUgZnVsbCBlcnJvci5cblxuXG4gICAgICAgIGlmIChyZXMubGVuZ3RoID4gMzApIHtcbiAgICAgICAgICByZXNbMjZdID0gXCJcIi5jb25jYXQoYmx1ZSwgXCIuLi5cIikuY29uY2F0KHdoaXRlKTtcblxuICAgICAgICAgIHdoaWxlIChyZXMubGVuZ3RoID4gMjcpIHtcbiAgICAgICAgICAgIHJlcy5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gT25seSBwcmludCBhIHNpbmdsZSBpbnB1dC5cblxuXG4gICAgICAgIGlmIChyZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQXNzZXJ0aW9uRXJyb3IpLmNhbGwodGhpcywgXCJcIi5jb25jYXQoYmFzZSwgXCIgXCIpLmNvbmNhdChyZXNbMF0pKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfZ2V0UHJvdG90eXBlT2YoQXNzZXJ0aW9uRXJyb3IpLmNhbGwodGhpcywgXCJcIi5jb25jYXQoYmFzZSwgXCJcXG5cXG5cIikuY29uY2F0KHJlcy5qb2luKCdcXG4nKSwgXCJcXG5cIikpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF9yZXMgPSBpbnNwZWN0VmFsdWUoYWN0dWFsKTtcblxuICAgICAgICB2YXIgb3RoZXIgPSAnJztcbiAgICAgICAgdmFyIGtub3duT3BlcmF0b3JzID0ga1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdO1xuXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ25vdERlZXBFcXVhbCcgfHwgb3BlcmF0b3IgPT09ICdub3RFcXVhbCcpIHtcbiAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoa1JlYWRhYmxlT3BlcmF0b3Jbb3BlcmF0b3JdLCBcIlxcblxcblwiKS5jb25jYXQoX3Jlcyk7XG5cbiAgICAgICAgICBpZiAoX3Jlcy5sZW5ndGggPiAxMDI0KSB7XG4gICAgICAgICAgICBfcmVzID0gXCJcIi5jb25jYXQoX3Jlcy5zbGljZSgwLCAxMDIxKSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG90aGVyID0gXCJcIi5jb25jYXQoaW5zcGVjdFZhbHVlKGV4cGVjdGVkKSk7XG5cbiAgICAgICAgICBpZiAoX3Jlcy5sZW5ndGggPiA1MTIpIHtcbiAgICAgICAgICAgIF9yZXMgPSBcIlwiLmNvbmNhdChfcmVzLnNsaWNlKDAsIDUwOSksIFwiLi4uXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvdGhlci5sZW5ndGggPiA1MTIpIHtcbiAgICAgICAgICAgIG90aGVyID0gXCJcIi5jb25jYXQob3RoZXIuc2xpY2UoMCwgNTA5KSwgXCIuLi5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnZGVlcEVxdWFsJyB8fCBvcGVyYXRvciA9PT0gJ2VxdWFsJykge1xuICAgICAgICAgICAgX3JlcyA9IFwiXCIuY29uY2F0KGtub3duT3BlcmF0b3JzLCBcIlxcblxcblwiKS5jb25jYXQoX3JlcywgXCJcXG5cXG5zaG91bGQgZXF1YWxcXG5cXG5cIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG90aGVyID0gXCIgXCIuY29uY2F0KG9wZXJhdG9yLCBcIiBcIikuY29uY2F0KG90aGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9nZXRQcm90b3R5cGVPZihBc3NlcnRpb25FcnJvcikuY2FsbCh0aGlzLCBcIlwiLmNvbmNhdChfcmVzKS5jb25jYXQob3RoZXIpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgRXJyb3Iuc3RhY2tUcmFjZUxpbWl0ID0gbGltaXQ7XG4gICAgX3RoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9ICFtZXNzYWdlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgJ25hbWUnLCB7XG4gICAgICB2YWx1ZTogJ0Fzc2VydGlvbkVycm9yIFtFUlJfQVNTRVJUSU9OXScsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgX3RoaXMuY29kZSA9ICdFUlJfQVNTRVJUSU9OJztcbiAgICBfdGhpcy5hY3R1YWwgPSBhY3R1YWw7XG4gICAgX3RoaXMuZXhwZWN0ZWQgPSBleHBlY3RlZDtcbiAgICBfdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuXG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBzdGFja1N0YXJ0Rm4pO1xuICAgIH0gLy8gQ3JlYXRlIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBlcnJvciBjb2RlIGluIHRoZSBuYW1lLlxuXG5cbiAgICBfdGhpcy5zdGFjazsgLy8gUmVzZXQgdGhlIG5hbWUuXG5cbiAgICBfdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcbiAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFzc2VydGlvbkVycm9yLCBbe1xuICAgIGtleTogXCJ0b1N0cmluZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdCh0aGlzLm5hbWUsIFwiIFtcIikuY29uY2F0KHRoaXMuY29kZSwgXCJdOiBcIikuY29uY2F0KHRoaXMubWVzc2FnZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBpbnNwZWN0LmN1c3RvbSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdmFsdWUocmVjdXJzZVRpbWVzLCBjdHgpIHtcbiAgICAgIC8vIFRoaXMgbGltaXRzIHRoZSBgYWN0dWFsYCBhbmQgYGV4cGVjdGVkYCBwcm9wZXJ0eSBkZWZhdWx0IGluc3BlY3Rpb24gdG9cbiAgICAgIC8vIHRoZSBtaW5pbXVtIGRlcHRoLiBPdGhlcndpc2UgdGhvc2UgdmFsdWVzIHdvdWxkIGJlIHRvbyB2ZXJib3NlIGNvbXBhcmVkXG4gICAgICAvLyB0byB0aGUgYWN0dWFsIGVycm9yIG1lc3NhZ2Ugd2hpY2ggY29udGFpbnMgYSBjb21iaW5lZCB2aWV3IG9mIHRoZXNlIHR3b1xuICAgICAgLy8gaW5wdXQgdmFsdWVzLlxuICAgICAgcmV0dXJuIGluc3BlY3QodGhpcywgX29iamVjdFNwcmVhZCh7fSwgY3R4LCB7XG4gICAgICAgIGN1c3RvbUluc3BlY3Q6IGZhbHNlLFxuICAgICAgICBkZXB0aDogMFxuICAgICAgfSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBc3NlcnRpb25FcnJvcjtcbn0oX3dyYXBOYXRpdmVTdXBlcihFcnJvcikpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2VydGlvbkVycm9yOyIsIi8vIEN1cnJlbnRseSBpbiBzeW5jIHdpdGggTm9kZS5qcyBsaWIvaW50ZXJuYWwvZXJyb3JzLmpzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvY29tbWl0LzNiMDQ0OTYyYzQ4ZmUzMTM5MDU4NzdhOTZiNWQwODk0YTU0MDRmNmZcblxuLyogZXNsaW50IG5vZGUtY29yZS9kb2N1bWVudGVkLWVycm9yczogXCJlcnJvclwiICovXG5cbi8qIGVzbGludCBub2RlLWNvcmUvYWxwaGFiZXRpemUtZXJyb3JzOiBcImVycm9yXCIgKi9cblxuLyogZXNsaW50IG5vZGUtY29yZS9wcmVmZXItdXRpbC1mb3JtYXQtZXJyb3JzOiBcImVycm9yXCIgKi9cbid1c2Ugc3RyaWN0JzsgLy8gVGhlIHdob2xlIHBvaW50IGJlaGluZCB0aGlzIGludGVybmFsIG1vZHVsZSBpcyB0byBhbGxvdyBOb2RlLmpzIHRvIG5vXG4vLyBsb25nZXIgYmUgZm9yY2VkIHRvIHRyZWF0IGV2ZXJ5IGVycm9yIG1lc3NhZ2UgY2hhbmdlIGFzIGEgc2VtdmVyLW1ham9yXG4vLyBjaGFuZ2UuIFRoZSBOb2RlRXJyb3IgY2xhc3NlcyBoZXJlIGFsbCBleHBvc2UgYSBgY29kZWAgcHJvcGVydHkgd2hvc2Vcbi8vIHZhbHVlIHN0YXRpY2FsbHkgYW5kIHBlcm1hbmVudGx5IGlkZW50aWZpZXMgdGhlIGVycm9yLiBXaGlsZSB0aGUgZXJyb3Jcbi8vIG1lc3NhZ2UgbWF5IGNoYW5nZSwgdGhlIGNvZGUgc2hvdWxkIG5vdC5cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG52YXIgY29kZXMgPSB7fTsgLy8gTGF6eSBsb2FkZWRcblxudmFyIGFzc2VydDtcbnZhciB1dGlsO1xuXG5mdW5jdGlvbiBjcmVhdGVFcnJvclR5cGUoY29kZSwgbWVzc2FnZSwgQmFzZSkge1xuICBpZiAoIUJhc2UpIHtcbiAgICBCYXNlID0gRXJyb3I7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNZXNzYWdlKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1lc3NhZ2UoYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIE5vZGVFcnJvciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9CYXNlKSB7XG4gICAgX2luaGVyaXRzKE5vZGVFcnJvciwgX0Jhc2UpO1xuXG4gICAgZnVuY3Rpb24gTm9kZUVycm9yKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5vZGVFcnJvcik7XG5cbiAgICAgIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX2dldFByb3RvdHlwZU9mKE5vZGVFcnJvcikuY2FsbCh0aGlzLCBnZXRNZXNzYWdlKGFyZzEsIGFyZzIsIGFyZzMpKSk7XG4gICAgICBfdGhpcy5jb2RlID0gY29kZTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gTm9kZUVycm9yO1xuICB9KEJhc2UpO1xuXG4gIGNvZGVzW2NvZGVdID0gTm9kZUVycm9yO1xufSAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi92MTAuOC4wL2xpYi9pbnRlcm5hbC9lcnJvcnMuanNcblxuXG5mdW5jdGlvbiBvbmVPZihleHBlY3RlZCwgdGhpbmcpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXhwZWN0ZWQpKSB7XG4gICAgdmFyIGxlbiA9IGV4cGVjdGVkLmxlbmd0aDtcbiAgICBleHBlY3RlZCA9IGV4cGVjdGVkLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhpKTtcbiAgICB9KTtcblxuICAgIGlmIChsZW4gPiAyKSB7XG4gICAgICByZXR1cm4gXCJvbmUgb2YgXCIuY29uY2F0KHRoaW5nLCBcIiBcIikuY29uY2F0KGV4cGVjdGVkLnNsaWNlKDAsIGxlbiAtIDEpLmpvaW4oJywgJyksIFwiLCBvciBcIikgKyBleHBlY3RlZFtsZW4gLSAxXTtcbiAgICB9IGVsc2UgaWYgKGxlbiA9PT0gMikge1xuICAgICAgcmV0dXJuIFwib25lIG9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZFswXSwgXCIgb3IgXCIpLmNvbmNhdChleHBlY3RlZFsxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIm9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChleHBlY3RlZFswXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBcIm9mIFwiLmNvbmNhdCh0aGluZywgXCIgXCIpLmNvbmNhdChTdHJpbmcoZXhwZWN0ZWQpKTtcbiAgfVxufSAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvc3RhcnRzV2l0aFxuXG5cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyLCBzZWFyY2gsIHBvcykge1xuICByZXR1cm4gc3RyLnN1YnN0cighcG9zIHx8IHBvcyA8IDAgPyAwIDogK3Bvcywgc2VhcmNoLmxlbmd0aCkgPT09IHNlYXJjaDtcbn0gLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL2VuZHNXaXRoXG5cblxuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzZWFyY2gsIHRoaXNfbGVuKSB7XG4gIGlmICh0aGlzX2xlbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXNfbGVuID4gc3RyLmxlbmd0aCkge1xuICAgIHRoaXNfbGVuID0gc3RyLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBzdHIuc3Vic3RyaW5nKHRoaXNfbGVuIC0gc2VhcmNoLmxlbmd0aCwgdGhpc19sZW4pID09PSBzZWFyY2g7XG59IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9pbmNsdWRlc1xuXG5cbmZ1bmN0aW9uIGluY2x1ZGVzKHN0ciwgc2VhcmNoLCBzdGFydCkge1xuICBpZiAodHlwZW9mIHN0YXJ0ICE9PSAnbnVtYmVyJykge1xuICAgIHN0YXJ0ID0gMDtcbiAgfVxuXG4gIGlmIChzdGFydCArIHNlYXJjaC5sZW5ndGggPiBzdHIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzZWFyY2gsIHN0YXJ0KSAhPT0gLTE7XG4gIH1cbn1cblxuY3JlYXRlRXJyb3JUeXBlKCdFUlJfQU1CSUdVT1VTX0FSR1VNRU5UJywgJ1RoZSBcIiVzXCIgYXJndW1lbnQgaXMgYW1iaWd1b3VzLiAlcycsIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJywgZnVuY3Rpb24gKG5hbWUsIGV4cGVjdGVkLCBhY3R1YWwpIHtcbiAgaWYgKGFzc2VydCA9PT0gdW5kZWZpbmVkKSBhc3NlcnQgPSByZXF1aXJlKCcuLi9hc3NlcnQnKTtcbiAgYXNzZXJ0KHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJywgXCInbmFtZScgbXVzdCBiZSBhIHN0cmluZ1wiKTsgLy8gZGV0ZXJtaW5lcjogJ211c3QgYmUnIG9yICdtdXN0IG5vdCBiZSdcblxuICB2YXIgZGV0ZXJtaW5lcjtcblxuICBpZiAodHlwZW9mIGV4cGVjdGVkID09PSAnc3RyaW5nJyAmJiBzdGFydHNXaXRoKGV4cGVjdGVkLCAnbm90ICcpKSB7XG4gICAgZGV0ZXJtaW5lciA9ICdtdXN0IG5vdCBiZSc7XG4gICAgZXhwZWN0ZWQgPSBleHBlY3RlZC5yZXBsYWNlKC9ebm90IC8sICcnKTtcbiAgfSBlbHNlIHtcbiAgICBkZXRlcm1pbmVyID0gJ211c3QgYmUnO1xuICB9XG5cbiAgdmFyIG1zZztcblxuICBpZiAoZW5kc1dpdGgobmFtZSwgJyBhcmd1bWVudCcpKSB7XG4gICAgLy8gRm9yIGNhc2VzIGxpa2UgJ2ZpcnN0IGFyZ3VtZW50J1xuICAgIG1zZyA9IFwiVGhlIFwiLmNvbmNhdChuYW1lLCBcIiBcIikuY29uY2F0KGRldGVybWluZXIsIFwiIFwiKS5jb25jYXQob25lT2YoZXhwZWN0ZWQsICd0eXBlJykpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0eXBlID0gaW5jbHVkZXMobmFtZSwgJy4nKSA/ICdwcm9wZXJ0eScgOiAnYXJndW1lbnQnO1xuICAgIG1zZyA9IFwiVGhlIFxcXCJcIi5jb25jYXQobmFtZSwgXCJcXFwiIFwiKS5jb25jYXQodHlwZSwgXCIgXCIpLmNvbmNhdChkZXRlcm1pbmVyLCBcIiBcIikuY29uY2F0KG9uZU9mKGV4cGVjdGVkLCAndHlwZScpKTtcbiAgfSAvLyBUT0RPKEJyaWRnZUFSKTogSW1wcm92ZSB0aGUgb3V0cHV0IGJ5IHNob3dpbmcgYG51bGxgIGFuZCBzaW1pbGFyLlxuXG5cbiAgbXNnICs9IFwiLiBSZWNlaXZlZCB0eXBlIFwiLmNvbmNhdChfdHlwZW9mKGFjdHVhbCkpO1xuICByZXR1cm4gbXNnO1xufSwgVHlwZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0lOVkFMSURfQVJHX1ZBTFVFJywgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gIHZhciByZWFzb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICdpcyBpbnZhbGlkJztcbiAgaWYgKHV0aWwgPT09IHVuZGVmaW5lZCkgdXRpbCA9IHJlcXVpcmUoJ3V0aWwvJyk7XG4gIHZhciBpbnNwZWN0ZWQgPSB1dGlsLmluc3BlY3QodmFsdWUpO1xuXG4gIGlmIChpbnNwZWN0ZWQubGVuZ3RoID4gMTI4KSB7XG4gICAgaW5zcGVjdGVkID0gXCJcIi5jb25jYXQoaW5zcGVjdGVkLnNsaWNlKDAsIDEyOCksIFwiLi4uXCIpO1xuICB9XG5cbiAgcmV0dXJuIFwiVGhlIGFyZ3VtZW50ICdcIi5jb25jYXQobmFtZSwgXCInIFwiKS5jb25jYXQocmVhc29uLCBcIi4gUmVjZWl2ZWQgXCIpLmNvbmNhdChpbnNwZWN0ZWQpO1xufSwgVHlwZUVycm9yLCBSYW5nZUVycm9yKTtcbmNyZWF0ZUVycm9yVHlwZSgnRVJSX0lOVkFMSURfUkVUVVJOX1ZBTFVFJywgZnVuY3Rpb24gKGlucHV0LCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgdHlwZTtcblxuICBpZiAodmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgIHR5cGUgPSBcImluc3RhbmNlIG9mIFwiLmNvbmNhdCh2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgfSBlbHNlIHtcbiAgICB0eXBlID0gXCJ0eXBlIFwiLmNvbmNhdChfdHlwZW9mKHZhbHVlKSk7XG4gIH1cblxuICByZXR1cm4gXCJFeHBlY3RlZCBcIi5jb25jYXQoaW5wdXQsIFwiIHRvIGJlIHJldHVybmVkIGZyb20gdGhlIFxcXCJcIikuY29uY2F0KG5hbWUsIFwiXFxcIlwiKSArIFwiIGZ1bmN0aW9uIGJ1dCBnb3QgXCIuY29uY2F0KHR5cGUsIFwiLlwiKTtcbn0sIFR5cGVFcnJvcik7XG5jcmVhdGVFcnJvclR5cGUoJ0VSUl9NSVNTSU5HX0FSR1MnLCBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoYXNzZXJ0ID09PSB1bmRlZmluZWQpIGFzc2VydCA9IHJlcXVpcmUoJy4uL2Fzc2VydCcpO1xuICBhc3NlcnQoYXJncy5sZW5ndGggPiAwLCAnQXQgbGVhc3Qgb25lIGFyZyBuZWVkcyB0byBiZSBzcGVjaWZpZWQnKTtcbiAgdmFyIG1zZyA9ICdUaGUgJztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICBhcmdzID0gYXJncy5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KGEsIFwiXFxcIlwiKTtcbiAgfSk7XG5cbiAgc3dpdGNoIChsZW4pIHtcbiAgICBjYXNlIDE6XG4gICAgICBtc2cgKz0gXCJcIi5jb25jYXQoYXJnc1swXSwgXCIgYXJndW1lbnRcIik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMjpcbiAgICAgIG1zZyArPSBcIlwiLmNvbmNhdChhcmdzWzBdLCBcIiBhbmQgXCIpLmNvbmNhdChhcmdzWzFdLCBcIiBhcmd1bWVudHNcIik7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBtc2cgKz0gYXJncy5zbGljZSgwLCBsZW4gLSAxKS5qb2luKCcsICcpO1xuICAgICAgbXNnICs9IFwiLCBhbmQgXCIuY29uY2F0KGFyZ3NbbGVuIC0gMV0sIFwiIGFyZ3VtZW50c1wiKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIFwiXCIuY29uY2F0KG1zZywgXCIgbXVzdCBiZSBzcGVjaWZpZWRcIik7XG59LCBUeXBlRXJyb3IpO1xubW9kdWxlLmV4cG9ydHMuY29kZXMgPSBjb2RlczsiLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL3V0aWwvY29tcGFyaXNvbnMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMTEyY2M3YzI3NTUxMjU0YWEyYjE3MDk4ZmI3NzQ4NjdmMDVlZDBkOVxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxudmFyIHJlZ2V4RmxhZ3NTdXBwb3J0ZWQgPSAvYS9nLmZsYWdzICE9PSB1bmRlZmluZWQ7XG5cbnZhciBhcnJheUZyb21TZXQgPSBmdW5jdGlvbiBhcnJheUZyb21TZXQoc2V0KSB7XG4gIHZhciBhcnJheSA9IFtdO1xuICBzZXQuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gYXJyYXkucHVzaCh2YWx1ZSk7XG4gIH0pO1xuICByZXR1cm4gYXJyYXk7XG59O1xuXG52YXIgYXJyYXlGcm9tTWFwID0gZnVuY3Rpb24gYXJyYXlGcm9tTWFwKG1hcCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICByZXR1cm4gYXJyYXkucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9KTtcbiAgcmV0dXJuIGFycmF5O1xufTtcblxudmFyIG9iamVjdElzID0gT2JqZWN0LmlzID8gT2JqZWN0LmlzIDogcmVxdWlyZSgnb2JqZWN0LWlzJyk7XG52YXIgb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBbXTtcbn07XG52YXIgbnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gPyBOdW1iZXIuaXNOYU4gOiByZXF1aXJlKCdpcy1uYW4nKTtcblxuZnVuY3Rpb24gdW5jdXJyeVRoaXMoZikge1xuICByZXR1cm4gZi5jYWxsLmJpbmQoZik7XG59XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gdW5jdXJyeVRoaXMoT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSk7XG52YXIgb2JqZWN0VG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKTtcblxudmFyIF9yZXF1aXJlJHR5cGVzID0gcmVxdWlyZSgndXRpbC8nKS50eXBlcyxcbiAgICBpc0FueUFycmF5QnVmZmVyID0gX3JlcXVpcmUkdHlwZXMuaXNBbnlBcnJheUJ1ZmZlcixcbiAgICBpc0FycmF5QnVmZmVyVmlldyA9IF9yZXF1aXJlJHR5cGVzLmlzQXJyYXlCdWZmZXJWaWV3LFxuICAgIGlzRGF0ZSA9IF9yZXF1aXJlJHR5cGVzLmlzRGF0ZSxcbiAgICBpc01hcCA9IF9yZXF1aXJlJHR5cGVzLmlzTWFwLFxuICAgIGlzUmVnRXhwID0gX3JlcXVpcmUkdHlwZXMuaXNSZWdFeHAsXG4gICAgaXNTZXQgPSBfcmVxdWlyZSR0eXBlcy5pc1NldCxcbiAgICBpc05hdGl2ZUVycm9yID0gX3JlcXVpcmUkdHlwZXMuaXNOYXRpdmVFcnJvcixcbiAgICBpc0JveGVkUHJpbWl0aXZlID0gX3JlcXVpcmUkdHlwZXMuaXNCb3hlZFByaW1pdGl2ZSxcbiAgICBpc051bWJlck9iamVjdCA9IF9yZXF1aXJlJHR5cGVzLmlzTnVtYmVyT2JqZWN0LFxuICAgIGlzU3RyaW5nT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNTdHJpbmdPYmplY3QsXG4gICAgaXNCb29sZWFuT2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNCb29sZWFuT2JqZWN0LFxuICAgIGlzQmlnSW50T2JqZWN0ID0gX3JlcXVpcmUkdHlwZXMuaXNCaWdJbnRPYmplY3QsXG4gICAgaXNTeW1ib2xPYmplY3QgPSBfcmVxdWlyZSR0eXBlcy5pc1N5bWJvbE9iamVjdCxcbiAgICBpc0Zsb2F0MzJBcnJheSA9IF9yZXF1aXJlJHR5cGVzLmlzRmxvYXQzMkFycmF5LFxuICAgIGlzRmxvYXQ2NEFycmF5ID0gX3JlcXVpcmUkdHlwZXMuaXNGbG9hdDY0QXJyYXk7XG5cbmZ1bmN0aW9uIGlzTm9uSW5kZXgoa2V5KSB7XG4gIGlmIChrZXkubGVuZ3RoID09PSAwIHx8IGtleS5sZW5ndGggPiAxMCkgcmV0dXJuIHRydWU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY29kZSA9IGtleS5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlIDwgNDggfHwgY29kZSA+IDU3KSByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBUaGUgbWF4aW11bSBzaXplIGZvciBhbiBhcnJheSBpcyAyICoqIDMyIC0xLlxuXG5cbiAgcmV0dXJuIGtleS5sZW5ndGggPT09IDEwICYmIGtleSA+PSBNYXRoLnBvdygyLCAzMik7XG59XG5cbmZ1bmN0aW9uIGdldE93bk5vbkluZGV4UHJvcGVydGllcyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXModmFsdWUpLmZpbHRlcihpc05vbkluZGV4KS5jb25jYXQob2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbHVlKS5maWx0ZXIoT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5iaW5kKHZhbHVlKSkpO1xufSAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2Jsb2IvNjgwZTllNWU0ODhmMjJhYWMyNzU5OWE1N2RjODQ0YTYzMTU5MjhkZC9pbmRleC5qc1xuLy8gb3JpZ2luYWwgbm90aWNlOlxuXG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cblxuZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgeCA9IGEubGVuZ3RoO1xuICB2YXIgeSA9IGIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldO1xuICAgICAgeSA9IGJbaV07XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBpZiAoeSA8IHgpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG52YXIgT05MWV9FTlVNRVJBQkxFID0gdW5kZWZpbmVkO1xudmFyIGtTdHJpY3QgPSB0cnVlO1xudmFyIGtMb29zZSA9IGZhbHNlO1xudmFyIGtOb0l0ZXJhdG9yID0gMDtcbnZhciBrSXNBcnJheSA9IDE7XG52YXIga0lzU2V0ID0gMjtcbnZhciBrSXNNYXAgPSAzOyAvLyBDaGVjayBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgc291cmNlIGFuZCBmbGFnc1xuXG5mdW5jdGlvbiBhcmVTaW1pbGFyUmVnRXhwcyhhLCBiKSB7XG4gIHJldHVybiByZWdleEZsYWdzU3VwcG9ydGVkID8gYS5zb3VyY2UgPT09IGIuc291cmNlICYmIGEuZmxhZ3MgPT09IGIuZmxhZ3MgOiBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkgPT09IFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChiKTtcbn1cblxuZnVuY3Rpb24gYXJlU2ltaWxhckZsb2F0QXJyYXlzKGEsIGIpIHtcbiAgaWYgKGEuYnl0ZUxlbmd0aCAhPT0gYi5ieXRlTGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYS5ieXRlTGVuZ3RoOyBvZmZzZXQrKykge1xuICAgIGlmIChhW29mZnNldF0gIT09IGJbb2Zmc2V0XSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBhcmVTaW1pbGFyVHlwZWRBcnJheXMoYSwgYikge1xuICBpZiAoYS5ieXRlTGVuZ3RoICE9PSBiLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gY29tcGFyZShuZXcgVWludDhBcnJheShhLmJ1ZmZlciwgYS5ieXRlT2Zmc2V0LCBhLmJ5dGVMZW5ndGgpLCBuZXcgVWludDhBcnJheShiLmJ1ZmZlciwgYi5ieXRlT2Zmc2V0LCBiLmJ5dGVMZW5ndGgpKSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gYXJlRXF1YWxBcnJheUJ1ZmZlcnMoYnVmMSwgYnVmMikge1xuICByZXR1cm4gYnVmMS5ieXRlTGVuZ3RoID09PSBidWYyLmJ5dGVMZW5ndGggJiYgY29tcGFyZShuZXcgVWludDhBcnJheShidWYxKSwgbmV3IFVpbnQ4QXJyYXkoYnVmMikpID09PSAwO1xufVxuXG5mdW5jdGlvbiBpc0VxdWFsQm94ZWRQcmltaXRpdmUodmFsMSwgdmFsMikge1xuICBpZiAoaXNOdW1iZXJPYmplY3QodmFsMSkpIHtcbiAgICByZXR1cm4gaXNOdW1iZXJPYmplY3QodmFsMikgJiYgb2JqZWN0SXMoTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSksIE51bWJlci5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpKTtcbiAgfVxuXG4gIGlmIChpc1N0cmluZ09iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc1N0cmluZ09iamVjdCh2YWwyKSAmJiBTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG4gIH1cblxuICBpZiAoaXNCb29sZWFuT2JqZWN0KHZhbDEpKSB7XG4gICAgcmV0dXJuIGlzQm9vbGVhbk9iamVjdCh2YWwyKSAmJiBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwyKTtcbiAgfVxuXG4gIGlmIChpc0JpZ0ludE9iamVjdCh2YWwxKSkge1xuICAgIHJldHVybiBpc0JpZ0ludE9iamVjdCh2YWwyKSAmJiBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YuY2FsbCh2YWwxKSA9PT0gQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMik7XG4gIH1cblxuICByZXR1cm4gaXNTeW1ib2xPYmplY3QodmFsMikgJiYgU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwodmFsMSkgPT09IFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZi5jYWxsKHZhbDIpO1xufSAvLyBOb3RlczogVHlwZSB0YWdzIGFyZSBoaXN0b3JpY2FsIFtbQ2xhc3NdXSBwcm9wZXJ0aWVzIHRoYXQgY2FuIGJlIHNldCBieVxuLy8gRnVuY3Rpb25UZW1wbGF0ZTo6U2V0Q2xhc3NOYW1lKCkgaW4gQysrIG9yIFN5bWJvbC50b1N0cmluZ1RhZyBpbiBKU1xuLy8gYW5kIHJldHJpZXZlZCB1c2luZyBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSBpbiBKU1xuLy8gU2VlIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbi8vIGZvciBhIGxpc3Qgb2YgdGFncyBwcmUtZGVmaW5lZCBpbiB0aGUgc3BlYy5cbi8vIFRoZXJlIGFyZSBzb21lIHVuc3BlY2lmaWVkIHRhZ3MgaW4gdGhlIHdpbGQgdG9vIChlLmcuIHR5cGVkIGFycmF5IHRhZ3MpLlxuLy8gU2luY2UgdGFncyBjYW4gYmUgYWx0ZXJlZCwgdGhleSBvbmx5IHNlcnZlIGZhc3QgZmFpbHVyZXNcbi8vXG4vLyBUeXBlZCBhcnJheXMgYW5kIGJ1ZmZlcnMgYXJlIGNoZWNrZWQgYnkgY29tcGFyaW5nIHRoZSBjb250ZW50IGluIHRoZWlyXG4vLyB1bmRlcmx5aW5nIEFycmF5QnVmZmVyLiBUaGlzIG9wdGltaXphdGlvbiByZXF1aXJlcyB0aGF0IGl0J3Ncbi8vIHJlYXNvbmFibGUgdG8gaW50ZXJwcmV0IHRoZWlyIHVuZGVybHlpbmcgbWVtb3J5IGluIHRoZSBzYW1lIHdheSxcbi8vIHdoaWNoIGlzIGNoZWNrZWQgYnkgY29tcGFyaW5nIHRoZWlyIHR5cGUgdGFncy5cbi8vIChlLmcuIGEgVWludDhBcnJheSBhbmQgYSBVaW50MTZBcnJheSB3aXRoIHRoZSBzYW1lIG1lbW9yeSBjb250ZW50XG4vLyBjb3VsZCBzdGlsbCBiZSBkaWZmZXJlbnQgYmVjYXVzZSB0aGV5IHdpbGwgYmUgaW50ZXJwcmV0ZWQgZGlmZmVyZW50bHkpLlxuLy9cbi8vIEZvciBzdHJpY3QgY29tcGFyaXNvbiwgb2JqZWN0cyBzaG91bGQgaGF2ZVxuLy8gYSkgVGhlIHNhbWUgYnVpbHQtaW4gdHlwZSB0YWdzXG4vLyBiKSBUaGUgc2FtZSBwcm90b3R5cGVzLlxuXG5cbmZ1bmN0aW9uIGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MpIHtcbiAgLy8gQWxsIGlkZW50aWNhbCB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGFzIGRldGVybWluZWQgYnkgPT09LlxuICBpZiAodmFsMSA9PT0gdmFsMikge1xuICAgIGlmICh2YWwxICE9PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gc3RyaWN0ID8gb2JqZWN0SXModmFsMSwgdmFsMikgOiB0cnVlO1xuICB9IC8vIENoZWNrIG1vcmUgY2xvc2VseSBpZiB2YWwxIGFuZCB2YWwyIGFyZSBlcXVhbC5cblxuXG4gIGlmIChzdHJpY3QpIHtcbiAgICBpZiAoX3R5cGVvZih2YWwxKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsMSA9PT0gJ251bWJlcicgJiYgbnVtYmVySXNOYU4odmFsMSkgJiYgbnVtYmVySXNOYU4odmFsMik7XG4gICAgfVxuXG4gICAgaWYgKF90eXBlb2YodmFsMikgIT09ICdvYmplY3QnIHx8IHZhbDEgPT09IG51bGwgfHwgdmFsMiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsMSkgIT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsMSA9PT0gbnVsbCB8fCBfdHlwZW9mKHZhbDEpICE9PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHZhbDIgPT09IG51bGwgfHwgX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuICAgICAgICByZXR1cm4gdmFsMSA9PSB2YWwyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHZhbDIgPT09IG51bGwgfHwgX3R5cGVvZih2YWwyKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB2YXIgdmFsMVRhZyA9IG9iamVjdFRvU3RyaW5nKHZhbDEpO1xuICB2YXIgdmFsMlRhZyA9IG9iamVjdFRvU3RyaW5nKHZhbDIpO1xuXG4gIGlmICh2YWwxVGFnICE9PSB2YWwyVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsMSkpIHtcbiAgICAvLyBDaGVjayBmb3Igc3BhcnNlIGFycmF5cyBhbmQgZ2VuZXJhbCBmYXN0IHBhdGhcbiAgICBpZiAodmFsMS5sZW5ndGggIT09IHZhbDIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGtleXMxID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDEsIE9OTFlfRU5VTUVSQUJMRSk7XG4gICAgdmFyIGtleXMyID0gZ2V0T3duTm9uSW5kZXhQcm9wZXJ0aWVzKHZhbDIsIE9OTFlfRU5VTUVSQUJMRSk7XG5cbiAgICBpZiAoa2V5czEubGVuZ3RoICE9PSBrZXlzMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga0lzQXJyYXksIGtleXMxKTtcbiAgfSAvLyBbYnJvd3NlcmlmeV0gVGhpcyB0cmlnZ2VycyBvbiBjZXJ0YWluIHR5cGVzIGluIElFIChNYXAvU2V0KSBzbyB3ZSBkb24ndFxuICAvLyB3YW4ndCB0byBlYXJseSByZXR1cm4gb3V0IG9mIHRoZSByZXN0IG9mIHRoZSBjaGVja3MuIEhvd2V2ZXIgd2UgY2FuIGNoZWNrXG4gIC8vIGlmIHRoZSBzZWNvbmQgdmFsdWUgaXMgb25lIG9mIHRoZXNlIHZhbHVlcyBhbmQgdGhlIGZpcnN0IGlzbid0LlxuXG5cbiAgaWYgKHZhbDFUYWcgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgLy8gcmV0dXJuIGtleUNoZWNrKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtb3MsIGtOb0l0ZXJhdG9yKTtcbiAgICBpZiAoIWlzTWFwKHZhbDEpICYmIGlzTWFwKHZhbDIpIHx8ICFpc1NldCh2YWwxKSAmJiBpc1NldCh2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc0RhdGUodmFsMSkpIHtcbiAgICBpZiAoIWlzRGF0ZSh2YWwyKSB8fCBEYXRlLnByb3RvdHlwZS5nZXRUaW1lLmNhbGwodmFsMSkgIT09IERhdGUucHJvdG90eXBlLmdldFRpbWUuY2FsbCh2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1JlZ0V4cCh2YWwxKSkge1xuICAgIGlmICghaXNSZWdFeHAodmFsMikgfHwgIWFyZVNpbWlsYXJSZWdFeHBzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzTmF0aXZlRXJyb3IodmFsMSkgfHwgdmFsMSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgLy8gRG8gbm90IGNvbXBhcmUgdGhlIHN0YWNrIGFzIGl0IG1pZ2h0IGRpZmZlciBldmVuIHRob3VnaCB0aGUgZXJyb3IgaXRzZWxmXG4gICAgLy8gaXMgb3RoZXJ3aXNlIGlkZW50aWNhbC5cbiAgICBpZiAodmFsMS5tZXNzYWdlICE9PSB2YWwyLm1lc3NhZ2UgfHwgdmFsMS5uYW1lICE9PSB2YWwyLm5hbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNBcnJheUJ1ZmZlclZpZXcodmFsMSkpIHtcbiAgICBpZiAoIXN0cmljdCAmJiAoaXNGbG9hdDMyQXJyYXkodmFsMSkgfHwgaXNGbG9hdDY0QXJyYXkodmFsMSkpKSB7XG4gICAgICBpZiAoIWFyZVNpbWlsYXJGbG9hdEFycmF5cyh2YWwxLCB2YWwyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghYXJlU2ltaWxhclR5cGVkQXJyYXlzKHZhbDEsIHZhbDIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAvLyBCdWZmZXIuY29tcGFyZSByZXR1cm5zIHRydWUsIHNvIHZhbDEubGVuZ3RoID09PSB2YWwyLmxlbmd0aC4gSWYgdGhleSBib3RoXG4gICAgLy8gb25seSBjb250YWluIG51bWVyaWMga2V5cywgd2UgZG9uJ3QgbmVlZCB0byBleGFtIGZ1cnRoZXIgdGhhbiBjaGVja2luZ1xuICAgIC8vIHRoZSBzeW1ib2xzLlxuXG5cbiAgICB2YXIgX2tleXMgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMSwgT05MWV9FTlVNRVJBQkxFKTtcblxuICAgIHZhciBfa2V5czIgPSBnZXRPd25Ob25JbmRleFByb3BlcnRpZXModmFsMiwgT05MWV9FTlVNRVJBQkxFKTtcblxuICAgIGlmIChfa2V5cy5sZW5ndGggIT09IF9rZXlzMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IsIF9rZXlzKTtcbiAgfSBlbHNlIGlmIChpc1NldCh2YWwxKSkge1xuICAgIGlmICghaXNTZXQodmFsMikgfHwgdmFsMS5zaXplICE9PSB2YWwyLnNpemUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga0lzU2V0KTtcbiAgfSBlbHNlIGlmIChpc01hcCh2YWwxKSkge1xuICAgIGlmICghaXNNYXAodmFsMikgfHwgdmFsMS5zaXplICE9PSB2YWwyLnNpemUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga0lzTWFwKTtcbiAgfSBlbHNlIGlmIChpc0FueUFycmF5QnVmZmVyKHZhbDEpKSB7XG4gICAgaWYgKCFhcmVFcXVhbEFycmF5QnVmZmVycyh2YWwxLCB2YWwyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0JveGVkUHJpbWl0aXZlKHZhbDEpICYmICFpc0VxdWFsQm94ZWRQcmltaXRpdmUodmFsMSwgdmFsMikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4ga2V5Q2hlY2sodmFsMSwgdmFsMiwgc3RyaWN0LCBtZW1vcywga05vSXRlcmF0b3IpO1xufVxuXG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlcyh2YWwsIGtleXMpIHtcbiAgcmV0dXJuIGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrKSB7XG4gICAgcmV0dXJuIHByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbCwgayk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBrZXlDaGVjayh2YWwxLCB2YWwyLCBzdHJpY3QsIG1lbW9zLCBpdGVyYXRpb25UeXBlLCBhS2V5cykge1xuICAvLyBGb3IgYWxsIHJlbWFpbmluZyBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSwgb2JqZWN0cyBhbmQgTWFwcyxcbiAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSBoYXZpbmc6XG4gIC8vIGEpIFRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBlbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAgLy8gYikgVGhlIHNhbWUgc2V0IG9mIGtleXMvaW5kZXhlcyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKVxuICAvLyBjKSBFcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXkvaW5kZXhcbiAgLy8gZCkgRm9yIFNldHMgYW5kIE1hcHMsIGVxdWFsIGNvbnRlbnRzXG4gIC8vIE5vdGU6IHRoaXMgYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA1KSB7XG4gICAgYUtleXMgPSBPYmplY3Qua2V5cyh2YWwxKTtcbiAgICB2YXIgYktleXMgPSBPYmplY3Qua2V5cyh2YWwyKTsgLy8gVGhlIHBhaXIgbXVzdCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzLlxuXG4gICAgaWYgKGFLZXlzLmxlbmd0aCAhPT0gYktleXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IC8vIENoZWFwIGtleSB0ZXN0XG5cblxuICB2YXIgaSA9IDA7XG5cbiAgZm9yICg7IGkgPCBhS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkodmFsMiwgYUtleXNbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0cmljdCAmJiBhcmd1bWVudHMubGVuZ3RoID09PSA1KSB7XG4gICAgdmFyIHN5bWJvbEtleXNBID0gb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbDEpO1xuXG4gICAgaWYgKHN5bWJvbEtleXNBLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHN5bWJvbEtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBzeW1ib2xLZXlzQVtpXTtcblxuICAgICAgICBpZiAocHJvcGVydHlJc0VudW1lcmFibGUodmFsMSwga2V5KSkge1xuICAgICAgICAgIGlmICghcHJvcGVydHlJc0VudW1lcmFibGUodmFsMiwga2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5SXNFbnVtZXJhYmxlKHZhbDIsIGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHN5bWJvbEtleXNCID0gb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbDIpO1xuXG4gICAgICBpZiAoc3ltYm9sS2V5c0EubGVuZ3RoICE9PSBzeW1ib2xLZXlzQi5sZW5ndGggJiYgZ2V0RW51bWVyYWJsZXModmFsMiwgc3ltYm9sS2V5c0IpLmxlbmd0aCAhPT0gY291bnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX3N5bWJvbEtleXNCID0gb2JqZWN0R2V0T3duUHJvcGVydHlTeW1ib2xzKHZhbDIpO1xuXG4gICAgICBpZiAoX3N5bWJvbEtleXNCLmxlbmd0aCAhPT0gMCAmJiBnZXRFbnVtZXJhYmxlcyh2YWwyLCBfc3ltYm9sS2V5c0IpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGFLZXlzLmxlbmd0aCA9PT0gMCAmJiAoaXRlcmF0aW9uVHlwZSA9PT0ga05vSXRlcmF0b3IgfHwgaXRlcmF0aW9uVHlwZSA9PT0ga0lzQXJyYXkgJiYgdmFsMS5sZW5ndGggPT09IDAgfHwgdmFsMS5zaXplID09PSAwKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IC8vIFVzZSBtZW1vcyB0byBoYW5kbGUgY3ljbGVzLlxuXG5cbiAgaWYgKG1lbW9zID09PSB1bmRlZmluZWQpIHtcbiAgICBtZW1vcyA9IHtcbiAgICAgIHZhbDE6IG5ldyBNYXAoKSxcbiAgICAgIHZhbDI6IG5ldyBNYXAoKSxcbiAgICAgIHBvc2l0aW9uOiAwXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBXZSBwcmV2ZW50IHVwIHRvIHR3byBtYXAuaGFzKHgpIGNhbGxzIGJ5IGRpcmVjdGx5IHJldHJpZXZpbmcgdGhlIHZhbHVlXG4gICAgLy8gYW5kIGNoZWNraW5nIGZvciB1bmRlZmluZWQuIFRoZSBtYXAgY2FuIG9ubHkgY29udGFpbiBudW1iZXJzLCBzbyBpdCBpc1xuICAgIC8vIHNhZmUgdG8gY2hlY2sgZm9yIHVuZGVmaW5lZCBvbmx5LlxuICAgIHZhciB2YWwyTWVtb0EgPSBtZW1vcy52YWwxLmdldCh2YWwxKTtcblxuICAgIGlmICh2YWwyTWVtb0EgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHZhbDJNZW1vQiA9IG1lbW9zLnZhbDIuZ2V0KHZhbDIpO1xuXG4gICAgICBpZiAodmFsMk1lbW9CICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbDJNZW1vQSA9PT0gdmFsMk1lbW9CO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9zLnBvc2l0aW9uKys7XG4gIH1cblxuICBtZW1vcy52YWwxLnNldCh2YWwxLCBtZW1vcy5wb3NpdGlvbik7XG4gIG1lbW9zLnZhbDIuc2V0KHZhbDIsIG1lbW9zLnBvc2l0aW9uKTtcbiAgdmFyIGFyZUVxID0gb2JqRXF1aXYodmFsMSwgdmFsMiwgc3RyaWN0LCBhS2V5cywgbWVtb3MsIGl0ZXJhdGlvblR5cGUpO1xuICBtZW1vcy52YWwxLmRlbGV0ZSh2YWwxKTtcbiAgbWVtb3MudmFsMi5kZWxldGUodmFsMik7XG4gIHJldHVybiBhcmVFcTtcbn1cblxuZnVuY3Rpb24gc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgdmFsMSwgc3RyaWN0LCBtZW1vKSB7XG4gIC8vIEdvIGxvb2tpbmcuXG4gIHZhciBzZXRWYWx1ZXMgPSBhcnJheUZyb21TZXQoc2V0KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNldFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWwyID0gc2V0VmFsdWVzW2ldO1xuXG4gICAgaWYgKGlubmVyRGVlcEVxdWFsKHZhbDEsIHZhbDIsIHN0cmljdCwgbWVtbykpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgbWF0Y2hpbmcgZWxlbWVudCB0byBtYWtlIHN1cmUgd2UgZG8gbm90IGNoZWNrIHRoYXQgYWdhaW4uXG4gICAgICBzZXQuZGVsZXRlKHZhbDIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufSAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9FcXVhbGl0eV9jb21wYXJpc29uc19hbmRfc2FtZW5lc3MjTG9vc2VfZXF1YWxpdHlfdXNpbmdcbi8vIFNhZGx5IGl0IGlzIG5vdCBwb3NzaWJsZSB0byBkZXRlY3QgY29ycmVzcG9uZGluZyB2YWx1ZXMgcHJvcGVybHkgaW4gY2FzZSB0aGVcbi8vIHR5cGUgaXMgYSBzdHJpbmcsIG51bWJlciwgYmlnaW50IG9yIGJvb2xlYW4uIFRoZSByZWFzb24gaXMgdGhhdCB0aG9zZSB2YWx1ZXNcbi8vIGNhbiBtYXRjaCBsb3RzIG9mIGRpZmZlcmVudCBzdHJpbmcgdmFsdWVzIChlLmcuLCAxbiA9PSAnKzAwMDAxJykuXG5cblxuZnVuY3Rpb24gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pIHtcbiAgc3dpdGNoIChfdHlwZW9mKHByaW0pKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIC8vIE9ubHkgcGFzcyBpbiBudWxsIGFzIG9iamVjdCFcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHByaW0gPSArcHJpbTtcbiAgICAvLyBMb29zZSBlcXVhbCBlbnRyaWVzIGV4aXN0IG9ubHkgaWYgdGhlIHN0cmluZyBpcyBwb3NzaWJsZSB0byBjb252ZXJ0IHRvXG4gICAgLy8gYSByZWd1bGFyIG51bWJlciBhbmQgbm90IE5hTi5cbiAgICAvLyBGYWxsIHRocm91Z2hcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBpZiAobnVtYmVySXNOYU4ocHJpbSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2V0TWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHByaW0pIHtcbiAgdmFyIGFsdFZhbHVlID0gZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzKHByaW0pO1xuICBpZiAoYWx0VmFsdWUgIT0gbnVsbCkgcmV0dXJuIGFsdFZhbHVlO1xuICByZXR1cm4gYi5oYXMoYWx0VmFsdWUpICYmICFhLmhhcyhhbHRWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIG1hcE1pZ2h0SGF2ZUxvb3NlUHJpbShhLCBiLCBwcmltLCBpdGVtLCBtZW1vKSB7XG4gIHZhciBhbHRWYWx1ZSA9IGZpbmRMb29zZU1hdGNoaW5nUHJpbWl0aXZlcyhwcmltKTtcblxuICBpZiAoYWx0VmFsdWUgIT0gbnVsbCkge1xuICAgIHJldHVybiBhbHRWYWx1ZTtcbiAgfVxuXG4gIHZhciBjdXJCID0gYi5nZXQoYWx0VmFsdWUpO1xuXG4gIGlmIChjdXJCID09PSB1bmRlZmluZWQgJiYgIWIuaGFzKGFsdFZhbHVlKSB8fCAhaW5uZXJEZWVwRXF1YWwoaXRlbSwgY3VyQiwgZmFsc2UsIG1lbW8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuICFhLmhhcyhhbHRWYWx1ZSkgJiYgaW5uZXJEZWVwRXF1YWwoaXRlbSwgY3VyQiwgZmFsc2UsIG1lbW8pO1xufVxuXG5mdW5jdGlvbiBzZXRFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW8pIHtcbiAgLy8gVGhpcyBpcyBhIGxhemlseSBpbml0aWF0ZWQgU2V0IG9mIGVudHJpZXMgd2hpY2ggaGF2ZSB0byBiZSBjb21wYXJlZFxuICAvLyBwYWlyd2lzZS5cbiAgdmFyIHNldCA9IG51bGw7XG4gIHZhciBhVmFsdWVzID0gYXJyYXlGcm9tU2V0KGEpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYVZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWwgPSBhVmFsdWVzW2ldOyAvLyBOb3RlOiBDaGVja2luZyBmb3IgdGhlIG9iamVjdHMgZmlyc3QgaW1wcm92ZXMgdGhlIHBlcmZvcm1hbmNlIGZvciBvYmplY3RcbiAgICAvLyBoZWF2eSBzZXRzIGJ1dCBpdCBpcyBhIG1pbm9yIHNsb3cgZG93biBmb3IgcHJpbWl0aXZlcy4gQXMgdGhleSBhcmUgZmFzdFxuICAgIC8vIHRvIGNoZWNrIHRoaXMgaW1wcm92ZXMgdGhlIHdvcnN0IGNhc2Ugc2NlbmFyaW8gaW5zdGVhZC5cblxuICAgIGlmIChfdHlwZW9mKHZhbCkgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICB9IC8vIElmIHRoZSBzcGVjaWZpZWQgdmFsdWUgZG9lc24ndCBleGlzdCBpbiB0aGUgc2Vjb25kIHNldCBpdHMgYW4gbm90IG51bGxcbiAgICAgIC8vIG9iamVjdCAob3Igbm9uIHN0cmljdCBvbmx5OiBhIG5vdCBtYXRjaGluZyBwcmltaXRpdmUpIHdlJ2xsIG5lZWQgdG8gZ29cbiAgICAgIC8vIGh1bnRpbmcgZm9yIHNvbWV0aGluZyB0aGF0cyBkZWVwLShzdHJpY3QtKWVxdWFsIHRvIGl0LiBUbyBtYWtlIHRoaXNcbiAgICAgIC8vIE8obiBsb2cgbikgY29tcGxleGl0eSB3ZSBoYXZlIHRvIGNvcHkgdGhlc2UgdmFsdWVzIGluIGEgbmV3IHNldCBmaXJzdC5cblxuXG4gICAgICBzZXQuYWRkKHZhbCk7XG4gICAgfSBlbHNlIGlmICghYi5oYXModmFsKSkge1xuICAgICAgaWYgKHN0cmljdCkgcmV0dXJuIGZhbHNlOyAvLyBGYXN0IHBhdGggdG8gZGV0ZWN0IG1pc3Npbmcgc3RyaW5nLCBzeW1ib2wsIHVuZGVmaW5lZCBhbmQgbnVsbCB2YWx1ZXMuXG5cbiAgICAgIGlmICghc2V0TWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2V0ID09PSBudWxsKSB7XG4gICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgIH1cblxuICAgICAgc2V0LmFkZCh2YWwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzZXQgIT09IG51bGwpIHtcbiAgICB2YXIgYlZhbHVlcyA9IGFycmF5RnJvbVNldChiKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBiVmFsdWVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF92YWwgPSBiVmFsdWVzW19pXTsgLy8gV2UgaGF2ZSB0byBjaGVjayBpZiBhIHByaW1pdGl2ZSB2YWx1ZSBpcyBhbHJlYWR5XG4gICAgICAvLyBtYXRjaGluZyBhbmQgb25seSBpZiBpdCdzIG5vdCwgZ28gaHVudGluZyBmb3IgaXQuXG5cbiAgICAgIGlmIChfdHlwZW9mKF92YWwpID09PSAnb2JqZWN0JyAmJiBfdmFsICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgX3ZhbCwgc3RyaWN0LCBtZW1vKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmICFhLmhhcyhfdmFsKSAmJiAhc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgX3ZhbCwgc3RyaWN0LCBtZW1vKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldC5zaXplID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG1hcEhhc0VxdWFsRW50cnkoc2V0LCBtYXAsIGtleTEsIGl0ZW0xLCBzdHJpY3QsIG1lbW8pIHtcbiAgLy8gVG8gYmUgYWJsZSB0byBoYW5kbGUgY2FzZXMgbGlrZTpcbiAgLy8gICBNYXAoW1t7fSwgJ2EnXSwgW3t9LCAnYiddXSkgdnMgTWFwKFtbe30sICdiJ10sIFt7fSwgJ2EnXV0pXG4gIC8vIC4uLiB3ZSBuZWVkIHRvIGNvbnNpZGVyICphbGwqIG1hdGNoaW5nIGtleXMsIG5vdCBqdXN0IHRoZSBmaXJzdCB3ZSBmaW5kLlxuICB2YXIgc2V0VmFsdWVzID0gYXJyYXlGcm9tU2V0KHNldCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5MiA9IHNldFZhbHVlc1tpXTtcblxuICAgIGlmIChpbm5lckRlZXBFcXVhbChrZXkxLCBrZXkyLCBzdHJpY3QsIG1lbW8pICYmIGlubmVyRGVlcEVxdWFsKGl0ZW0xLCBtYXAuZ2V0KGtleTIpLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICBzZXQuZGVsZXRlKGtleTIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBtYXBFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW8pIHtcbiAgdmFyIHNldCA9IG51bGw7XG4gIHZhciBhRW50cmllcyA9IGFycmF5RnJvbU1hcChhKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFFbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9hRW50cmllcyRpID0gX3NsaWNlZFRvQXJyYXkoYUVudHJpZXNbaV0sIDIpLFxuICAgICAgICBrZXkgPSBfYUVudHJpZXMkaVswXSxcbiAgICAgICAgaXRlbTEgPSBfYUVudHJpZXMkaVsxXTtcblxuICAgIGlmIChfdHlwZW9mKGtleSkgPT09ICdvYmplY3QnICYmIGtleSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHNldCA9PT0gbnVsbCkge1xuICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICB9XG5cbiAgICAgIHNldC5hZGQoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnkgZGlyZWN0bHkgcmV0cmlldmluZyB0aGUgdmFsdWUgd2UgcHJldmVudCBhbm90aGVyIGIuaGFzKGtleSkgY2hlY2sgaW5cbiAgICAgIC8vIGFsbW9zdCBhbGwgcG9zc2libGUgY2FzZXMuXG4gICAgICB2YXIgaXRlbTIgPSBiLmdldChrZXkpO1xuXG4gICAgICBpZiAoaXRlbTIgPT09IHVuZGVmaW5lZCAmJiAhYi5oYXMoa2V5KSB8fCAhaW5uZXJEZWVwRXF1YWwoaXRlbTEsIGl0ZW0yLCBzdHJpY3QsIG1lbW8pKSB7XG4gICAgICAgIGlmIChzdHJpY3QpIHJldHVybiBmYWxzZTsgLy8gRmFzdCBwYXRoIHRvIGRldGVjdCBtaXNzaW5nIHN0cmluZywgc3ltYm9sLCB1bmRlZmluZWQgYW5kIG51bGxcbiAgICAgICAgLy8ga2V5cy5cblxuICAgICAgICBpZiAoIW1hcE1pZ2h0SGF2ZUxvb3NlUHJpbShhLCBiLCBrZXksIGl0ZW0xLCBtZW1vKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmIChzZXQgPT09IG51bGwpIHtcbiAgICAgICAgICBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQuYWRkKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHNldCAhPT0gbnVsbCkge1xuICAgIHZhciBiRW50cmllcyA9IGFycmF5RnJvbU1hcChiKTtcblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IGJFbnRyaWVzLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgIHZhciBfYkVudHJpZXMkX2kgPSBfc2xpY2VkVG9BcnJheShiRW50cmllc1tfaTJdLCAyKSxcbiAgICAgICAgICBrZXkgPSBfYkVudHJpZXMkX2lbMF0sXG4gICAgICAgICAgaXRlbSA9IF9iRW50cmllcyRfaVsxXTtcblxuICAgICAgaWYgKF90eXBlb2Yoa2V5KSA9PT0gJ29iamVjdCcgJiYga2V5ICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghbWFwSGFzRXF1YWxFbnRyeShzZXQsIGEsIGtleSwgaXRlbSwgc3RyaWN0LCBtZW1vKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghc3RyaWN0ICYmICghYS5oYXMoa2V5KSB8fCAhaW5uZXJEZWVwRXF1YWwoYS5nZXQoa2V5KSwgaXRlbSwgZmFsc2UsIG1lbW8pKSAmJiAhbWFwSGFzRXF1YWxFbnRyeShzZXQsIGEsIGtleSwgaXRlbSwgZmFsc2UsIG1lbW8pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2V0LnNpemUgPT09IDA7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgc3RyaWN0LCBrZXlzLCBtZW1vcywgaXRlcmF0aW9uVHlwZSkge1xuICAvLyBTZXRzIGFuZCBtYXBzIGRvbid0IGhhdmUgdGhlaXIgZW50cmllcyBhY2Nlc3NpYmxlIHZpYSBub3JtYWwgb2JqZWN0XG4gIC8vIHByb3BlcnRpZXMuXG4gIHZhciBpID0gMDtcblxuICBpZiAoaXRlcmF0aW9uVHlwZSA9PT0ga0lzU2V0KSB7XG4gICAgaWYgKCFzZXRFcXVpdihhLCBiLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpdGVyYXRpb25UeXBlID09PSBrSXNNYXApIHtcbiAgICBpZiAoIW1hcEVxdWl2KGEsIGIsIHN0cmljdCwgbWVtb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKGl0ZXJhdGlvblR5cGUgPT09IGtJc0FycmF5KSB7XG4gICAgZm9yICg7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkoYSwgaSkpIHtcbiAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShiLCBpKSB8fCAhaW5uZXJEZWVwRXF1YWwoYVtpXSwgYltpXSwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkoYiwgaSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXJyYXkgaXMgc3BhcnNlLlxuICAgICAgICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhhKTtcblxuICAgICAgICBmb3IgKDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXNBW2ldO1xuXG4gICAgICAgICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShiLCBrZXkpIHx8ICFpbm5lckRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgc3RyaWN0LCBtZW1vcykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5c0EubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gVGhlIHBhaXIgbXVzdCBoYXZlIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleS5cbiAgLy8gUG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdDpcblxuXG4gIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9rZXkgPSBrZXlzW2ldO1xuXG4gICAgaWYgKCFpbm5lckRlZXBFcXVhbChhW19rZXldLCBiW19rZXldLCBzdHJpY3QsIG1lbW9zKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpc0RlZXBFcXVhbCh2YWwxLCB2YWwyKSB7XG4gIHJldHVybiBpbm5lckRlZXBFcXVhbCh2YWwxLCB2YWwyLCBrTG9vc2UpO1xufVxuXG5mdW5jdGlvbiBpc0RlZXBTdHJpY3RFcXVhbCh2YWwxLCB2YWwyKSB7XG4gIHJldHVybiBpbm5lckRlZXBFcXVhbCh2YWwxLCB2YWwyLCBrU3RyaWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzRGVlcEVxdWFsOiBpc0RlZXBFcXVhbCxcbiAgaXNEZWVwU3RyaWN0RXF1YWw6IGlzRGVlcFN0cmljdEVxdWFsXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZpbHRlciA9IHJlcXVpcmUoJ2FycmF5LWZpbHRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF2YWlsYWJsZVR5cGVkQXJyYXlzKCkge1xuXHRyZXR1cm4gZmlsdGVyKFtcblx0XHQnQmlnSW50NjRBcnJheScsXG5cdFx0J0JpZ1VpbnQ2NEFycmF5Jyxcblx0XHQnRmxvYXQzMkFycmF5Jyxcblx0XHQnRmxvYXQ2NEFycmF5Jyxcblx0XHQnSW50MTZBcnJheScsXG5cdFx0J0ludDMyQXJyYXknLFxuXHRcdCdJbnQ4QXJyYXknLFxuXHRcdCdVaW50MTZBcnJheScsXG5cdFx0J1VpbnQzMkFycmF5Jyxcblx0XHQnVWludDhBcnJheScsXG5cdFx0J1VpbnQ4Q2xhbXBlZEFycmF5J1xuXHRdLCBmdW5jdGlvbiAodHlwZWRBcnJheSkge1xuXHRcdHJldHVybiB0eXBlb2YgZ2xvYmFsW3R5cGVkQXJyYXldID09PSAnZnVuY3Rpb24nO1xuXHR9KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknLCAncGFyYW1zJ107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3RpbWVvdXRNZXNzYWdlJywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ2RlY29tcHJlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ21heEJvZHlMZW5ndGgnLCAnbWF4UmVkaXJlY3RzJywgJ3RyYW5zcG9ydCcsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnLCAncmVzcG9uc2VFbmNvZGluZydcbiAgXTtcbiAgdmFyIGRpcmVjdE1lcmdlS2V5cyA9IFsndmFsaWRhdGVTdGF0dXMnXTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChkaXJlY3RNZXJnZUtleXMsIGZ1bmN0aW9uIG1lcmdlKHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xuICAgIC5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cylcbiAgICAuY29uY2F0KGRpcmVjdE1lcmdlS2V5cyk7XG5cbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZzEpXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuICh0eXBlb2YgcGF5bG9hZCA9PT0gJ29iamVjdCcpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwodmFsKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltLFxuICBzdHJpcEJPTTogc3RyaXBCT01cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJy4vJyk7XG5cbnZhciAkaW5kZXhPZiA9IGNhbGxCaW5kKEdldEludHJpbnNpYygnU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGxCb3VuZEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0dmFyIGludHJpbnNpYyA9IEdldEludHJpbnNpYyhuYW1lLCAhIWFsbG93TWlzc2luZyk7XG5cdGlmICh0eXBlb2YgaW50cmluc2ljID09PSAnZnVuY3Rpb24nICYmICRpbmRleE9mKG5hbWUsICcucHJvdG90eXBlLicpID4gLTEpIHtcblx0XHRyZXR1cm4gY2FsbEJpbmQoaW50cmluc2ljKTtcblx0fVxuXHRyZXR1cm4gaW50cmluc2ljO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgJGFwcGx5ID0gR2V0SW50cmluc2ljKCclRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5JScpO1xudmFyICRjYWxsID0gR2V0SW50cmluc2ljKCclRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwlJyk7XG52YXIgJHJlZmxlY3RBcHBseSA9IEdldEludHJpbnNpYygnJVJlZmxlY3QuYXBwbHklJywgdHJ1ZSkgfHwgYmluZC5jYWxsKCRjYWxsLCAkYXBwbHkpO1xuXG52YXIgJGdPUEQgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJScsIHRydWUpO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IEdldEludHJpbnNpYygnJU9iamVjdC5kZWZpbmVQcm9wZXJ0eSUnLCB0cnVlKTtcbnZhciAkbWF4ID0gR2V0SW50cmluc2ljKCclTWF0aC5tYXglJyk7XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0dHJ5IHtcblx0XHQkZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyB2YWx1ZTogMSB9KTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGRlZmluZVByb3BlcnR5XG5cdFx0JGRlZmluZVByb3BlcnR5ID0gbnVsbDtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGxCaW5kKG9yaWdpbmFsRnVuY3Rpb24pIHtcblx0dmFyIGZ1bmMgPSAkcmVmbGVjdEFwcGx5KGJpbmQsICRjYWxsLCBhcmd1bWVudHMpO1xuXHRpZiAoJGdPUEQgJiYgJGRlZmluZVByb3BlcnR5KSB7XG5cdFx0dmFyIGRlc2MgPSAkZ09QRChmdW5jLCAnbGVuZ3RoJyk7XG5cdFx0aWYgKGRlc2MuY29uZmlndXJhYmxlKSB7XG5cdFx0XHQvLyBvcmlnaW5hbCBsZW5ndGgsIHBsdXMgdGhlIHJlY2VpdmVyLCBtaW51cyBhbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgKGFmdGVyIHRoZSByZWNlaXZlcilcblx0XHRcdCRkZWZpbmVQcm9wZXJ0eShcblx0XHRcdFx0ZnVuYyxcblx0XHRcdFx0J2xlbmd0aCcsXG5cdFx0XHRcdHsgdmFsdWU6IDEgKyAkbWF4KDAsIG9yaWdpbmFsRnVuY3Rpb24ubGVuZ3RoIC0gKGFyZ3VtZW50cy5sZW5ndGggLSAxKSkgfVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZ1bmM7XG59O1xuXG52YXIgYXBwbHlCaW5kID0gZnVuY3Rpb24gYXBwbHlCaW5kKCkge1xuXHRyZXR1cm4gJHJlZmxlY3RBcHBseShiaW5kLCAkYXBwbHksIGFyZ3VtZW50cyk7XG59O1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdCRkZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgJ2FwcGx5JywgeyB2YWx1ZTogYXBwbHlCaW5kIH0pO1xufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMuYXBwbHkgPSBhcHBseUJpbmQ7XG59XG4iLCIvKmdsb2JhbCB3aW5kb3csIGdsb2JhbCovXG52YXIgdXRpbCA9IHJlcXVpcmUoXCJ1dGlsXCIpXG52YXIgYXNzZXJ0ID0gcmVxdWlyZShcImFzc2VydFwiKVxuZnVuY3Rpb24gbm93KCkgeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCkgfVxuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbnZhciBjb25zb2xlXG52YXIgdGltZXMgPSB7fVxuXG5pZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY29uc29sZSkge1xuICAgIGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZVxufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5jb25zb2xlKSB7XG4gICAgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlXG59IGVsc2Uge1xuICAgIGNvbnNvbGUgPSB7fVxufVxuXG52YXIgZnVuY3Rpb25zID0gW1xuICAgIFtsb2csIFwibG9nXCJdLFxuICAgIFtpbmZvLCBcImluZm9cIl0sXG4gICAgW3dhcm4sIFwid2FyblwiXSxcbiAgICBbZXJyb3IsIFwiZXJyb3JcIl0sXG4gICAgW3RpbWUsIFwidGltZVwiXSxcbiAgICBbdGltZUVuZCwgXCJ0aW1lRW5kXCJdLFxuICAgIFt0cmFjZSwgXCJ0cmFjZVwiXSxcbiAgICBbZGlyLCBcImRpclwiXSxcbiAgICBbY29uc29sZUFzc2VydCwgXCJhc3NlcnRcIl1cbl1cblxuZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdHVwbGUgPSBmdW5jdGlvbnNbaV1cbiAgICB2YXIgZiA9IHR1cGxlWzBdXG4gICAgdmFyIG5hbWUgPSB0dXBsZVsxXVxuXG4gICAgaWYgKCFjb25zb2xlW25hbWVdKSB7XG4gICAgICAgIGNvbnNvbGVbbmFtZV0gPSBmXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnNvbGVcblxuZnVuY3Rpb24gbG9nKCkge31cblxuZnVuY3Rpb24gaW5mbygpIHtcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG59XG5cbmZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxufVxuXG5mdW5jdGlvbiBlcnJvcigpIHtcbiAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxufVxuXG5mdW5jdGlvbiB0aW1lKGxhYmVsKSB7XG4gICAgdGltZXNbbGFiZWxdID0gbm93KClcbn1cblxuZnVuY3Rpb24gdGltZUVuZChsYWJlbCkge1xuICAgIHZhciB0aW1lID0gdGltZXNbbGFiZWxdXG4gICAgaWYgKCF0aW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWw6IFwiICsgbGFiZWwpXG4gICAgfVxuXG4gICAgZGVsZXRlIHRpbWVzW2xhYmVsXVxuICAgIHZhciBkdXJhdGlvbiA9IG5vdygpIC0gdGltZVxuICAgIGNvbnNvbGUubG9nKGxhYmVsICsgXCI6IFwiICsgZHVyYXRpb24gKyBcIm1zXCIpXG59XG5cbmZ1bmN0aW9uIHRyYWNlKCkge1xuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKVxuICAgIGVyci5uYW1lID0gXCJUcmFjZVwiXG4gICAgZXJyLm1lc3NhZ2UgPSB1dGlsLmZvcm1hdC5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spXG59XG5cbmZ1bmN0aW9uIGRpcihvYmplY3QpIHtcbiAgICBjb25zb2xlLmxvZyh1dGlsLmluc3BlY3Qob2JqZWN0KSArIFwiXFxuXCIpXG59XG5cbmZ1bmN0aW9uIGNvbnNvbGVBc3NlcnQoZXhwcmVzc2lvbikge1xuICAgIGlmICghZXhwcmVzc2lvbikge1xuICAgICAgICB2YXIgYXJyID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgICAgIGFzc2VydC5vayhmYWxzZSwgdXRpbC5mb3JtYXQuYXBwbHkobnVsbCwgYXJyKSlcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZSgnb2JqZWN0LWtleXMnKTtcbnZhciBoYXNTeW1ib2xzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sKCdmb28nKSA9PT0gJ3N5bWJvbCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbnZhciBvcmlnRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKGZuKSB7XG5cdHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG52YXIgYXJlUHJvcGVydHlEZXNjcmlwdG9yc1N1cHBvcnRlZCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIG9iaiA9IHt9O1xuXHR0cnkge1xuXHRcdG9yaWdEZWZpbmVQcm9wZXJ0eShvYmosICd4JywgeyBlbnVtZXJhYmxlOiBmYWxzZSwgdmFsdWU6IG9iaiB9KTtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnMsIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0Zm9yICh2YXIgXyBpbiBvYmopIHsgLy8ganNjczppZ25vcmUgZGlzYWxsb3dVbnVzZWRWYXJpYWJsZXNcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIG9iai54ID09PSBvYmo7XG5cdH0gY2F0Y2ggKGUpIHsgLyogdGhpcyBpcyBJRSA4LiAqL1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciBzdXBwb3J0c0Rlc2NyaXB0b3JzID0gb3JpZ0RlZmluZVByb3BlcnR5ICYmIGFyZVByb3BlcnR5RGVzY3JpcHRvcnNTdXBwb3J0ZWQoKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgdmFsdWUsIHByZWRpY2F0ZSkge1xuXHRpZiAobmFtZSBpbiBvYmplY3QgJiYgKCFpc0Z1bmN0aW9uKHByZWRpY2F0ZSkgfHwgIXByZWRpY2F0ZSgpKSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoc3VwcG9ydHNEZXNjcmlwdG9ycykge1xuXHRcdG9yaWdEZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRvYmplY3RbbmFtZV0gPSB2YWx1ZTtcblx0fVxufTtcblxudmFyIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqZWN0LCBtYXApIHtcblx0dmFyIHByZWRpY2F0ZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXHR2YXIgcHJvcHMgPSBrZXlzKG1hcCk7XG5cdGlmIChoYXNTeW1ib2xzKSB7XG5cdFx0cHJvcHMgPSBjb25jYXQuY2FsbChwcm9wcywgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhtYXApKTtcblx0fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0ZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wc1tpXSwgbWFwW3Byb3BzW2ldXSwgcHJlZGljYXRlc1twcm9wc1tpXV0pO1xuXHR9XG59O1xuXG5kZWZpbmVQcm9wZXJ0aWVzLnN1cHBvcnRzRGVzY3JpcHRvcnMgPSAhIXN1cHBvcnRzRGVzY3JpcHRvcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lUHJvcGVydGllcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRnT1BEID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnKTtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKFtdLCAnbGVuZ3RoJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBnT1BEXG5cdFx0JGdPUEQgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gJGdPUEQ7XG4iLCIvKipcbiAqIENvZGUgcmVmYWN0b3JlZCBmcm9tIE1vemlsbGEgRGV2ZWxvcGVyIE5ldHdvcms6XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBmaXJzdFNvdXJjZSkge1xuICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgZmlyc3QgYXJndW1lbnQgdG8gb2JqZWN0Jyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAobmV4dFNvdXJjZSA9PT0gdW5kZWZpbmVkIHx8IG5leHRTb3VyY2UgPT09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4KyspIHtcbiAgICAgIHZhciBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG4gICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn1cblxuZnVuY3Rpb24gcG9seWZpbGwoKSB7XG4gIGlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsICdhc3NpZ24nLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGFzc2lnblxuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhc3NpZ246IGFzc2lnbixcbiAgcG9seWZpbGw6IHBvbHlmaWxsXG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsIlxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZvckVhY2ggKG9iaiwgZm4sIGN0eCkge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKGZuKSAhPT0gJ1tvYmplY3QgRnVuY3Rpb25dJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG4gICAgdmFyIGwgPSBvYmoubGVuZ3RoO1xuICAgIGlmIChsID09PSArbCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgZm4uY2FsbChjdHgsIG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrKSkge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoY3R4LCBvYmpba10sIGssIG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgPyBzZWxmLkZvcm1EYXRhIDogd2luZG93LkZvcm1EYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgbm8taW52YWxpZC10aGlzOiAxICovXG5cbnZhciBFUlJPUl9NRVNTQUdFID0gJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgJztcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY1R5cGUgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQodGhhdCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmNhbGwodGFyZ2V0KSAhPT0gZnVuY1R5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJPUl9NRVNTQUdFICsgdGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICB2YXIgYm91bmQ7XG4gICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhhdCxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBib3VuZExlbmd0aCA9IE1hdGgubWF4KDAsIHRhcmdldC5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgdmFyIGJvdW5kQXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZEFyZ3MucHVzaCgnJCcgKyBpKTtcbiAgICB9XG5cbiAgICBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgYm91bmRBcmdzLmpvaW4oJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKTsgfScpKGJpbmRlcik7XG5cbiAgICBpZiAodGFyZ2V0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgRW1wdHkgPSBmdW5jdGlvbiBFbXB0eSgpIHt9O1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICBib3VuZC5wcm90b3R5cGUgPSBuZXcgRW1wdHkoKTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgaW1wbGVtZW50YXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdHJldHVybiAkRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOyByZXR1cm4gKCcgKyBleHByZXNzaW9uU3ludGF4ICsgJykuY29uc3RydWN0b3I7JykoKTtcblx0fSBjYXRjaCAoZSkge31cbn07XG5cbnZhciAkZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5pZiAoJGdPUEQpIHtcblx0dHJ5IHtcblx0XHQkZ09QRCh7fSwgJycpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0JGdPUEQgPSBudWxsOyAvLyB0aGlzIGlzIElFIDgsIHdoaWNoIGhhcyBhIGJyb2tlbiBnT1BEXG5cdH1cbn1cblxudmFyIHRocm93VHlwZUVycm9yID0gZnVuY3Rpb24gKCkge1xuXHR0aHJvdyBuZXcgJFR5cGVFcnJvcigpO1xufTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cbnZhciBuZWVkc0V2YWwgPSB7fTtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCclQWdncmVnYXRlRXJyb3IlJzogdHlwZW9mIEFnZ3JlZ2F0ZUVycm9yID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFnZ3JlZ2F0ZUVycm9yLFxuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogbmVlZHNFdmFsLFxuXHQnJUF0b21pY3MlJzogdHlwZW9mIEF0b21pY3MgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXRvbWljcyxcblx0JyVCaWdJbnQlJzogdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQsXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyVEYXRlJSc6IERhdGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiBFcnJvcixcblx0JyVldmFsJSc6IGV2YWwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuXHQnJUV2YWxFcnJvciUnOiBFdmFsRXJyb3IsXG5cdCclRmxvYXQzMkFycmF5JSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LFxuXHQnJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyVGaW5hbGl6YXRpb25SZWdpc3RyeSUnOiB0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmluYWxpemF0aW9uUmVnaXN0cnksXG5cdCclRnVuY3Rpb24lJzogJEZ1bmN0aW9uLFxuXHQnJUdlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCclSW50MTZBcnJheSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQxNkFycmF5LFxuXHQnJUludDMyQXJyYXklJzogdHlwZW9mIEludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MzJBcnJheSxcblx0JyVpc0Zpbml0ZSUnOiBpc0Zpbml0ZSxcblx0JyVpc05hTiUnOiBpc05hTixcblx0JyVJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkgOiB1bmRlZmluZWQsXG5cdCclSlNPTiUnOiB0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgPyBKU09OIDogdW5kZWZpbmVkLFxuXHQnJU1hcCUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcCxcblx0JyVNYXBJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBNYXAoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJU1hdGglJzogTWF0aCxcblx0JyVOdW1iZXIlJzogTnVtYmVyLFxuXHQnJU9iamVjdCUnOiBPYmplY3QsXG5cdCclcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJXBhcnNlSW50JSc6IHBhcnNlSW50LFxuXHQnJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCclUmFuZ2VFcnJvciUnOiBSYW5nZUVycm9yLFxuXHQnJVJlZmVyZW5jZUVycm9yJSc6IFJlZmVyZW5jZUVycm9yLFxuXHQnJVJlZmxlY3QlJzogdHlwZW9mIFJlZmxlY3QgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUmVmbGVjdCxcblx0JyVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJVNldCUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldCxcblx0JyVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBTZXQoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlcixcblx0JyVTdHJpbmclJzogU3RyaW5nLFxuXHQnJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90bygnJ1tTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJVN5bWJvbCUnOiBoYXNTeW1ib2xzID8gU3ltYm9sIDogdW5kZWZpbmVkLFxuXHQnJVN5bnRheEVycm9yJSc6ICRTeW50YXhFcnJvcixcblx0JyVUaHJvd1R5cGVFcnJvciUnOiBUaHJvd1R5cGVFcnJvcixcblx0JyVUeXBlZEFycmF5JSc6IFR5cGVkQXJyYXksXG5cdCclVHlwZUVycm9yJSc6ICRUeXBlRXJyb3IsXG5cdCclVWludDhBcnJheSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5JSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheSxcblx0JyVVaW50MTZBcnJheSUnOiB0eXBlb2YgVWludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDE2QXJyYXksXG5cdCclVWludDMyQXJyYXklJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LFxuXHQnJVVSSUVycm9yJSc6IFVSSUVycm9yLFxuXHQnJVdlYWtNYXAlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcCxcblx0JyVXZWFrUmVmJSc6IHR5cGVvZiBXZWFrUmVmID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtSZWYsXG5cdCclV2Vha1NldCUnOiB0eXBlb2YgV2Vha1NldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrU2V0XG59O1xuXG52YXIgZG9FdmFsID0gZnVuY3Rpb24gZG9FdmFsKG5hbWUpIHtcblx0dmFyIHZhbHVlO1xuXHRpZiAobmFtZSA9PT0gJyVBc3luY0Z1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24gKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUdlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpIHtcblx0XHR2YWx1ZSA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24qICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0dlbmVyYXRvciUnKSB7XG5cdFx0dmFyIGZuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKTtcblx0XHRpZiAoZm4pIHtcblx0XHRcdHZhbHVlID0gZm4ucHJvdG90eXBlO1xuXHRcdH1cblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJykge1xuXHRcdHZhciBnZW4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvciUnKTtcblx0XHRpZiAoZ2VuKSB7XG5cdFx0XHR2YWx1ZSA9IGdldFByb3RvKGdlbi5wcm90b3R5cGUpO1xuXHRcdH1cblx0fVxuXG5cdElOVFJJTlNJQ1NbbmFtZV0gPSB2YWx1ZTtcblxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgTEVHQUNZX0FMSUFTRVMgPSB7XG5cdCclQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvdHlwZSUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG9fZW50cmllcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdlbnRyaWVzJ10sXG5cdCclQXJyYXlQcm90b19mb3JFYWNoJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2ZvckVhY2gnXSxcblx0JyVBcnJheVByb3RvX2tleXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAna2V5cyddLFxuXHQnJUFycmF5UHJvdG9fdmFsdWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ3ZhbHVlcyddLFxuXHQnJUFzeW5jRnVuY3Rpb25Qcm90b3R5cGUlJzogWydBc3luY0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUJvb2xlYW5Qcm90b3R5cGUlJzogWydCb29sZWFuJywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGFWaWV3UHJvdG90eXBlJSc6IFsnRGF0YVZpZXcnLCAncHJvdG90eXBlJ10sXG5cdCclRGF0ZVByb3RvdHlwZSUnOiBbJ0RhdGUnLCAncHJvdG90eXBlJ10sXG5cdCclRXJyb3JQcm90b3R5cGUlJzogWydFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVFdmFsRXJyb3JQcm90b3R5cGUlJzogWydFdmFsRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQzMkFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0NjRBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0NjRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvciUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQ4QXJyYXlQcm90b3R5cGUlJzogWydJbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ0ludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ0ludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSlNPTlBhcnNlJSc6IFsnSlNPTicsICdwYXJzZSddLFxuXHQnJUpTT05TdHJpbmdpZnklJzogWydKU09OJywgJ3N0cmluZ2lmeSddLFxuXHQnJU1hcFByb3RvdHlwZSUnOiBbJ01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVOdW1iZXJQcm90b3R5cGUlJzogWydOdW1iZXInLCAncHJvdG90eXBlJ10sXG5cdCclT2JqZWN0UHJvdG90eXBlJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZSddLFxuXHQnJU9ialByb3RvX3RvU3RyaW5nJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd0b1N0cmluZyddLFxuXHQnJU9ialByb3RvX3ZhbHVlT2YlJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3ZhbHVlT2YnXSxcblx0JyVQcm9taXNlUHJvdG90eXBlJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnXSxcblx0JyVQcm9taXNlUHJvdG9fdGhlbiUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJywgJ3RoZW4nXSxcblx0JyVQcm9taXNlX2FsbCUnOiBbJ1Byb21pc2UnLCAnYWxsJ10sXG5cdCclUHJvbWlzZV9yZWplY3QlJzogWydQcm9taXNlJywgJ3JlamVjdCddLFxuXHQnJVByb21pc2VfcmVzb2x2ZSUnOiBbJ1Byb21pc2UnLCAncmVzb2x2ZSddLFxuXHQnJVJhbmdlRXJyb3JQcm90b3R5cGUlJzogWydSYW5nZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZmVyZW5jZUVycm9yUHJvdG90eXBlJSc6IFsnUmVmZXJlbmNlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVnRXhwUHJvdG90eXBlJSc6IFsnUmVnRXhwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVNldFByb3RvdHlwZSUnOiBbJ1NldCcsICdwcm90b3R5cGUnXSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ1NoYXJlZEFycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN0cmluZ1Byb3RvdHlwZSUnOiBbJ1N0cmluZycsICdwcm90b3R5cGUnXSxcblx0JyVTeW1ib2xQcm90b3R5cGUlJzogWydTeW1ib2wnLCAncHJvdG90eXBlJ10sXG5cdCclU3ludGF4RXJyb3JQcm90b3R5cGUlJzogWydTeW50YXhFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVHlwZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlRXJyb3JQcm90b3R5cGUlJzogWydUeXBlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhDbGFtcGVkQXJyYXlQcm90b3R5cGUlJzogWydVaW50OENsYW1wZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnVWludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVVJJRXJyb3JQcm90b3R5cGUlJzogWydVUklFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrTWFwUHJvdG90eXBlJSc6IFsnV2Vha01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrU2V0UHJvdG90eXBlJSc6IFsnV2Vha1NldCcsICdwcm90b3R5cGUnXVxufTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnaGFzJyk7XG52YXIgJGNvbmNhdCA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBBcnJheS5wcm90b3R5cGUuY29uY2F0KTtcbnZhciAkc3BsaWNlQXBwbHkgPSBiaW5kLmNhbGwoRnVuY3Rpb24uYXBwbHksIEFycmF5LnByb3RvdHlwZS5zcGxpY2UpO1xudmFyICRyZXBsYWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG52YXIgJHN0clNsaWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUuc2xpY2UpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciBmaXJzdCA9ICRzdHJTbGljZShzdHJpbmcsIDAsIDEpO1xuXHR2YXIgbGFzdCA9ICRzdHJTbGljZShzdHJpbmcsIC0xKTtcblx0aWYgKGZpcnN0ID09PSAnJScgJiYgbGFzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBjbG9zaW5nIGAlYCcpO1xuXHR9IGVsc2UgaWYgKGxhc3QgPT09ICclJyAmJiBmaXJzdCAhPT0gJyUnKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW52YWxpZCBpbnRyaW5zaWMgc3ludGF4LCBleHBlY3RlZCBvcGVuaW5nIGAlYCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogbnVtYmVyIHx8IG1hdGNoO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4vKiBlbmQgYWRhcHRhdGlvbiAqL1xuXG52YXIgZ2V0QmFzZUludHJpbnNpYyA9IGZ1bmN0aW9uIGdldEJhc2VJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWNOYW1lID0gbmFtZTtcblx0dmFyIGFsaWFzO1xuXHRpZiAoaGFzT3duKExFR0FDWV9BTElBU0VTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdGFsaWFzID0gTEVHQUNZX0FMSUFTRVNbaW50cmluc2ljTmFtZV07XG5cdFx0aW50cmluc2ljTmFtZSA9ICclJyArIGFsaWFzWzBdICsgJyUnO1xuXHR9XG5cblx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdHZhciB2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljTmFtZV07XG5cdFx0aWYgKHZhbHVlID09PSBuZWVkc0V2YWwpIHtcblx0XHRcdHZhbHVlID0gZG9FdmFsKGludHJpbnNpY05hbWUpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJiAhYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSEnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0YWxpYXM6IGFsaWFzLFxuXHRcdFx0bmFtZTogaW50cmluc2ljTmFtZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHZXRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdHZhciBwYXJ0cyA9IHN0cmluZ1RvUGF0aChuYW1lKTtcblx0dmFyIGludHJpbnNpY0Jhc2VOYW1lID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzWzBdIDogJyc7XG5cblx0dmFyIGludHJpbnNpYyA9IGdldEJhc2VJbnRyaW5zaWMoJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJScsIGFsbG93TWlzc2luZyk7XG5cdHZhciBpbnRyaW5zaWNSZWFsTmFtZSA9IGludHJpbnNpYy5uYW1lO1xuXHR2YXIgdmFsdWUgPSBpbnRyaW5zaWMudmFsdWU7XG5cdHZhciBza2lwRnVydGhlckNhY2hpbmcgPSBmYWxzZTtcblxuXHR2YXIgYWxpYXMgPSBpbnRyaW5zaWMuYWxpYXM7XG5cdGlmIChhbGlhcykge1xuXHRcdGludHJpbnNpY0Jhc2VOYW1lID0gYWxpYXNbMF07XG5cdFx0JHNwbGljZUFwcGx5KHBhcnRzLCAkY29uY2F0KFswLCAxXSwgYWxpYXMpKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAxLCBpc093biA9IHRydWU7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBwYXJ0ID0gcGFydHNbaV07XG5cdFx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHBhcnQsIDAsIDEpO1xuXHRcdHZhciBsYXN0ID0gJHN0clNsaWNlKHBhcnQsIC0xKTtcblx0XHRpZiAoXG5cdFx0XHQoXG5cdFx0XHRcdChmaXJzdCA9PT0gJ1wiJyB8fCBmaXJzdCA9PT0gXCInXCIgfHwgZmlyc3QgPT09ICdgJylcblx0XHRcdFx0fHwgKGxhc3QgPT09ICdcIicgfHwgbGFzdCA9PT0gXCInXCIgfHwgbGFzdCA9PT0gJ2AnKVxuXHRcdFx0KVxuXHRcdFx0JiYgZmlyc3QgIT09IGxhc3Rcblx0XHQpIHtcblx0XHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ3Byb3BlcnR5IG5hbWVzIHdpdGggcXVvdGVzIG11c3QgaGF2ZSBtYXRjaGluZyBxdW90ZXMnKTtcblx0XHR9XG5cdFx0aWYgKHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHwgIWlzT3duKSB7XG5cdFx0XHRza2lwRnVydGhlckNhY2hpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGludHJpbnNpY0Jhc2VOYW1lICs9ICcuJyArIHBhcnQ7XG5cdFx0aW50cmluc2ljUmVhbE5hbWUgPSAnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJztcblxuXHRcdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljUmVhbE5hbWUpKSB7XG5cdFx0XHR2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0aWYgKCEocGFydCBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKCFhbGxvd01pc3NpbmcpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdm9pZCB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJGdPUEQgJiYgKGkgKyAxKSA+PSBwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGRlc2MgPSAkZ09QRCh2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdGlzT3duID0gISFkZXNjO1xuXG5cdFx0XHRcdC8vIEJ5IGNvbnZlbnRpb24sIHdoZW4gYSBkYXRhIHByb3BlcnR5IGlzIGNvbnZlcnRlZCB0byBhbiBhY2Nlc3NvclxuXHRcdFx0XHQvLyBwcm9wZXJ0eSB0byBlbXVsYXRlIGEgZGF0YSBwcm9wZXJ0eSB0aGF0IGRvZXMgbm90IHN1ZmZlciBmcm9tXG5cdFx0XHRcdC8vIHRoZSBvdmVycmlkZSBtaXN0YWtlLCB0aGF0IGFjY2Vzc29yJ3MgZ2V0dGVyIGlzIG1hcmtlZCB3aXRoXG5cdFx0XHRcdC8vIGFuIGBvcmlnaW5hbFZhbHVlYCBwcm9wZXJ0eS4gSGVyZSwgd2hlbiB3ZSBkZXRlY3QgdGhpcywgd2Vcblx0XHRcdFx0Ly8gdXBob2xkIHRoZSBpbGx1c2lvbiBieSBwcmV0ZW5kaW5nIHRvIHNlZSB0aGF0IG9yaWdpbmFsIGRhdGFcblx0XHRcdFx0Ly8gcHJvcGVydHksIGkuZS4sIHJldHVybmluZyB0aGUgdmFsdWUgcmF0aGVyIHRoYW4gdGhlIGdldHRlclxuXHRcdFx0XHQvLyBpdHNlbGYuXG5cdFx0XHRcdGlmIChpc093biAmJiAnZ2V0JyBpbiBkZXNjICYmICEoJ29yaWdpbmFsVmFsdWUnIGluIGRlc2MuZ2V0KSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGVzYy5nZXQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXNPd24gPSBoYXNPd24odmFsdWUsIHBhcnQpO1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNPd24gJiYgIXNraXBGdXJ0aGVyQ2FjaGluZykge1xuXHRcdFx0XHRJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb3JpZ1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbDtcbnZhciBoYXNTeW1ib2xTaGFtID0gcmVxdWlyZSgnLi9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZVN5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCgnZm9vJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCgnYmFyJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHJldHVybiBoYXNTeW1ib2xTaGFtKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgY29tcGxleGl0eTogWzIsIDE4XSwgbWF4LXN0YXRlbWVudHM6IFsyLCAzM10gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJykgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdHZhciBvYmogPSB7fTtcblx0dmFyIHN5bSA9IFN5bWJvbCgndGVzdCcpO1xuXHR2YXIgc3ltT2JqID0gT2JqZWN0KHN5bSk7XG5cdGlmICh0eXBlb2Ygc3ltID09PSAnc3RyaW5nJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bU9iaikgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvb2JqZWN0LmFzc2lnbi9pc3N1ZXMvMTdcblx0Ly8gaWYgKHN5bSBpbnN0YW5jZW9mIFN5bWJvbCkgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzL2lzc3Vlcy80XG5cdC8vIGlmICghKHN5bU9iaiBpbnN0YW5jZW9mIFN5bWJvbCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gaWYgKHR5cGVvZiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyBpZiAoU3RyaW5nKHN5bSkgIT09IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1WYWwgPSA0Mjtcblx0b2JqW3N5bV0gPSBzeW1WYWw7XG5cdGZvciAoc3ltIGluIG9iaikgeyByZXR1cm4gZmFsc2U7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tdW5yZWFjaGFibGUtbG9vcFxuXHRpZiAodHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaik7XG5cdGlmIChzeW1zLmxlbmd0aCAhPT0gMSB8fCBzeW1zWzBdICE9PSBzeW0pIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHN5bSk7XG5cdFx0aWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IHN5bVZhbCB8fCBkZXNjcmlwdG9yLmVudW1lcmFibGUgIT09IHRydWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGlmIChzdXBlckN0b3IpIHtcbiAgICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgaWYgKHN1cGVyQ3Rvcikge1xuICAgICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgICB9XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcblxudmFyIGlzU3RhbmRhcmRBcmd1bWVudHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHRpZiAoaGFzVG9TdHJpbmdUYWcgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsdWUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuICR0b1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xufTtcblxudmFyIGlzTGVnYWN5QXJndW1lbnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0aWYgKGlzU3RhbmRhcmRBcmd1bWVudHModmFsdWUpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmXG5cdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInICYmXG5cdFx0dmFsdWUubGVuZ3RoID49IDAgJiZcblx0XHQkdG9TdHJpbmcodmFsdWUpICE9PSAnW29iamVjdCBBcnJheV0nICYmXG5cdFx0JHRvU3RyaW5nKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG52YXIgc3VwcG9ydHNTdGFuZGFyZEFyZ3VtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBpc1N0YW5kYXJkQXJndW1lbnRzKGFyZ3VtZW50cyk7XG59KCkpO1xuXG5pc1N0YW5kYXJkQXJndW1lbnRzLmlzTGVnYWN5QXJndW1lbnRzID0gaXNMZWdhY3lBcmd1bWVudHM7IC8vIGZvciB0ZXN0c1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPyBpc1N0YW5kYXJkQXJndW1lbnRzIDogaXNMZWdhY3lBcmd1bWVudHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZm5Ub1N0ciA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciBpc0ZuUmVnZXggPSAvXlxccyooPzpmdW5jdGlvbik/XFwqLztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG52YXIgZ2V0R2VuZXJhdG9yRnVuYyA9IGZ1bmN0aW9uICgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gZnVuY3Rpb24qKCkge30nKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdH1cbn07XG52YXIgZ2VuZXJhdG9yRnVuYyA9IGdldEdlbmVyYXRvckZ1bmMoKTtcbnZhciBHZW5lcmF0b3JGdW5jdGlvbiA9IGdldFByb3RvICYmIGdlbmVyYXRvckZ1bmMgPyBnZXRQcm90byhnZW5lcmF0b3JGdW5jKSA6IGZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzR2VuZXJhdG9yRnVuY3Rpb24oZm4pIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRpZiAoaXNGblJlZ2V4LnRlc3QoZm5Ub1N0ci5jYWxsKGZuKSkpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnKSB7XG5cdFx0dmFyIHN0ciA9IHRvU3RyLmNhbGwoZm4pO1xuXHRcdHJldHVybiBzdHIgPT09ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cdH1cblx0cmV0dXJuIGdldFByb3RvICYmIGdldFByb3RvKGZuKSA9PT0gR2VuZXJhdG9yRnVuY3Rpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLmlzbmFuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNOYU4odmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZCcpO1xudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbnZhciBzaGltID0gcmVxdWlyZSgnLi9zaGltJyk7XG5cbnZhciBwb2x5ZmlsbCA9IGNhbGxCaW5kKGdldFBvbHlmaWxsKCksIE51bWJlcik7XG5cbi8qIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIuaXNuYW4gKi9cblxuZGVmaW5lKHBvbHlmaWxsLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb2x5ZmlsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRpZiAoTnVtYmVyLmlzTmFOICYmIE51bWJlci5pc05hTihOYU4pICYmICFOdW1iZXIuaXNOYU4oJ2EnKSkge1xuXHRcdHJldHVybiBOdW1iZXIuaXNOYU47XG5cdH1cblx0cmV0dXJuIGltcGxlbWVudGF0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG5cbi8qIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1udW1iZXIuaXNuYW4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGltTnVtYmVySXNOYU4oKSB7XG5cdHZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cdGRlZmluZShOdW1iZXIsIHsgaXNOYU46IHBvbHlmaWxsIH0sIHtcblx0XHRpc05hTjogZnVuY3Rpb24gdGVzdElzTmFOKCkge1xuXHRcdFx0cmV0dXJuIE51bWJlci5pc05hTiAhPT0gcG9seWZpbGw7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHBvbHlmaWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3JlYWNoJyk7XG52YXIgYXZhaWxhYmxlVHlwZWRBcnJheXMgPSByZXF1aXJlKCdhdmFpbGFibGUtdHlwZWQtYXJyYXlzJyk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpO1xuXG52YXIgJHRvU3RyaW5nID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nJyk7XG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcbnZhciBoYXNUb1N0cmluZ1RhZyA9IGhhc1N5bWJvbHMgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG5cbnZhciB0eXBlZEFycmF5cyA9IGF2YWlsYWJsZVR5cGVkQXJyYXlzKCk7XG5cbnZhciAkaW5kZXhPZiA9IGNhbGxCb3VuZCgnQXJyYXkucHJvdG90eXBlLmluZGV4T2YnLCB0cnVlKSB8fCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn07XG52YXIgJHNsaWNlID0gY2FsbEJvdW5kKCdTdHJpbmcucHJvdG90eXBlLnNsaWNlJyk7XG52YXIgdG9TdHJUYWdzID0ge307XG52YXIgZ09QRCA9IHJlcXVpcmUoJ2VzLWFic3RyYWN0L2hlbHBlcnMvZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7IC8vIHJlcXVpcmUoJ2dldHByb3RvdHlwZW9mJyk7XG5pZiAoaGFzVG9TdHJpbmdUYWcgJiYgZ09QRCAmJiBnZXRQcm90b3R5cGVPZikge1xuXHRmb3JFYWNoKHR5cGVkQXJyYXlzLCBmdW5jdGlvbiAodHlwZWRBcnJheSkge1xuXHRcdHZhciBhcnIgPSBuZXcgZ2xvYmFsW3R5cGVkQXJyYXldKCk7XG5cdFx0aWYgKCEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIGFycikpIHtcblx0XHRcdHRocm93IG5ldyBFdmFsRXJyb3IoJ3RoaXMgZW5naW5lIGhhcyBzdXBwb3J0IGZvciBTeW1ib2wudG9TdHJpbmdUYWcsIGJ1dCAnICsgdHlwZWRBcnJheSArICcgZG9lcyBub3QgaGF2ZSB0aGUgcHJvcGVydHkhIFBsZWFzZSByZXBvcnQgdGhpcy4nKTtcblx0XHR9XG5cdFx0dmFyIHByb3RvID0gZ2V0UHJvdG90eXBlT2YoYXJyKTtcblx0XHR2YXIgZGVzY3JpcHRvciA9IGdPUEQocHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0aWYgKCFkZXNjcmlwdG9yKSB7XG5cdFx0XHR2YXIgc3VwZXJQcm90byA9IGdldFByb3RvdHlwZU9mKHByb3RvKTtcblx0XHRcdGRlc2NyaXB0b3IgPSBnT1BEKHN1cGVyUHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0fVxuXHRcdHRvU3RyVGFnc1t0eXBlZEFycmF5XSA9IGRlc2NyaXB0b3IuZ2V0O1xuXHR9KTtcbn1cblxudmFyIHRyeVR5cGVkQXJyYXlzID0gZnVuY3Rpb24gdHJ5QWxsVHlwZWRBcnJheXModmFsdWUpIHtcblx0dmFyIGFueVRydWUgPSBmYWxzZTtcblx0Zm9yRWFjaCh0b1N0clRhZ3MsIGZ1bmN0aW9uIChnZXR0ZXIsIHR5cGVkQXJyYXkpIHtcblx0XHRpZiAoIWFueVRydWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGFueVRydWUgPSBnZXR0ZXIuY2FsbCh2YWx1ZSkgPT09IHR5cGVkQXJyYXk7XG5cdFx0XHR9IGNhdGNoIChlKSB7IC8qKi8gfVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBhbnlUcnVlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcblx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoIWhhc1RvU3RyaW5nVGFnKSB7XG5cdFx0dmFyIHRhZyA9ICRzbGljZSgkdG9TdHJpbmcodmFsdWUpLCA4LCAtMSk7XG5cdFx0cmV0dXJuICRpbmRleE9mKHR5cGVkQXJyYXlzLCB0YWcpID4gLTE7XG5cdH1cblx0aWYgKCFnT1BEKSB7IHJldHVybiBmYWxzZTsgfVxuXHRyZXR1cm4gdHJ5VHlwZWRBcnJheXModmFsdWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG51bWJlcklzTmFOID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzKGEsIGIpIHtcblx0aWYgKGEgPT09IDAgJiYgYiA9PT0gMCkge1xuXHRcdHJldHVybiAxIC8gYSA9PT0gMSAvIGI7XG5cdH1cblx0aWYgKGEgPT09IGIpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAobnVtYmVySXNOYU4oYSkgJiYgbnVtYmVySXNOYU4oYikpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kJyk7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbnZhciBzaGltID0gcmVxdWlyZSgnLi9zaGltJyk7XG5cbnZhciBwb2x5ZmlsbCA9IGNhbGxCaW5kKGdldFBvbHlmaWxsKCksIE9iamVjdCk7XG5cbmRlZmluZShwb2x5ZmlsbCwge1xuXHRnZXRQb2x5ZmlsbDogZ2V0UG9seWZpbGwsXG5cdGltcGxlbWVudGF0aW9uOiBpbXBsZW1lbnRhdGlvbixcblx0c2hpbTogc2hpbVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gcG9seWZpbGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQb2x5ZmlsbCgpIHtcblx0cmV0dXJuIHR5cGVvZiBPYmplY3QuaXMgPT09ICdmdW5jdGlvbicgPyBPYmplY3QuaXMgOiBpbXBsZW1lbnRhdGlvbjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1PYmplY3RJcygpIHtcblx0dmFyIHBvbHlmaWxsID0gZ2V0UG9seWZpbGwoKTtcblx0ZGVmaW5lKE9iamVjdCwgeyBpczogcG9seWZpbGwgfSwge1xuXHRcdGlzOiBmdW5jdGlvbiB0ZXN0T2JqZWN0SXMoKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmlzICE9PSBwb2x5ZmlsbDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5c1NoaW07XG5pZiAoIU9iamVjdC5rZXlzKSB7XG5cdC8vIG1vZGlmaWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltXG5cdHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXHR2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXHR2YXIgaXNBcmdzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGdsb2JhbC1yZXF1aXJlXG5cdHZhciBpc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXHR2YXIgaGFzRG9udEVudW1CdWcgPSAhaXNFbnVtZXJhYmxlLmNhbGwoeyB0b1N0cmluZzogbnVsbCB9LCAndG9TdHJpbmcnKTtcblx0dmFyIGhhc1Byb3RvRW51bUJ1ZyA9IGlzRW51bWVyYWJsZS5jYWxsKGZ1bmN0aW9uICgpIHt9LCAncHJvdG90eXBlJyk7XG5cdHZhciBkb250RW51bXMgPSBbXG5cdFx0J3RvU3RyaW5nJyxcblx0XHQndG9Mb2NhbGVTdHJpbmcnLFxuXHRcdCd2YWx1ZU9mJyxcblx0XHQnaGFzT3duUHJvcGVydHknLFxuXHRcdCdpc1Byb3RvdHlwZU9mJyxcblx0XHQncHJvcGVydHlJc0VudW1lcmFibGUnLFxuXHRcdCdjb25zdHJ1Y3Rvcidcblx0XTtcblx0dmFyIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlID0gZnVuY3Rpb24gKG8pIHtcblx0XHR2YXIgY3RvciA9IG8uY29uc3RydWN0b3I7XG5cdFx0cmV0dXJuIGN0b3IgJiYgY3Rvci5wcm90b3R5cGUgPT09IG87XG5cdH07XG5cdHZhciBleGNsdWRlZEtleXMgPSB7XG5cdFx0JGFwcGxpY2F0aW9uQ2FjaGU6IHRydWUsXG5cdFx0JGNvbnNvbGU6IHRydWUsXG5cdFx0JGV4dGVybmFsOiB0cnVlLFxuXHRcdCRmcmFtZTogdHJ1ZSxcblx0XHQkZnJhbWVFbGVtZW50OiB0cnVlLFxuXHRcdCRmcmFtZXM6IHRydWUsXG5cdFx0JGlubmVySGVpZ2h0OiB0cnVlLFxuXHRcdCRpbm5lcldpZHRoOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5jaGFuZ2U6IHRydWUsXG5cdFx0JG9ubW96ZnVsbHNjcmVlbmVycm9yOiB0cnVlLFxuXHRcdCRvdXRlckhlaWdodDogdHJ1ZSxcblx0XHQkb3V0ZXJXaWR0aDogdHJ1ZSxcblx0XHQkcGFnZVhPZmZzZXQ6IHRydWUsXG5cdFx0JHBhZ2VZT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYXJlbnQ6IHRydWUsXG5cdFx0JHNjcm9sbExlZnQ6IHRydWUsXG5cdFx0JHNjcm9sbFRvcDogdHJ1ZSxcblx0XHQkc2Nyb2xsWDogdHJ1ZSxcblx0XHQkc2Nyb2xsWTogdHJ1ZSxcblx0XHQkc2VsZjogdHJ1ZSxcblx0XHQkd2Via2l0SW5kZXhlZERCOiB0cnVlLFxuXHRcdCR3ZWJraXRTdG9yYWdlSW5mbzogdHJ1ZSxcblx0XHQkd2luZG93OiB0cnVlXG5cdH07XG5cdHZhciBoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcgPSAoZnVuY3Rpb24gKCkge1xuXHRcdC8qIGdsb2JhbCB3aW5kb3cgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0Zm9yICh2YXIgayBpbiB3aW5kb3cpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmICghZXhjbHVkZWRLZXlzWyckJyArIGtdICYmIGhhcy5jYWxsKHdpbmRvdywgaykgJiYgd2luZG93W2tdICE9PSBudWxsICYmIHR5cGVvZiB3aW5kb3dba10gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKHdpbmRvd1trXSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0oKSk7XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kgPSBmdW5jdGlvbiAobykge1xuXHRcdC8qIGdsb2JhbCB3aW5kb3cgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc0F1dG9tYXRpb25FcXVhbGl0eUJ1Zykge1xuXHRcdFx0cmV0dXJuIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKG8pO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlKG8pO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH07XG5cblx0a2V5c1NoaW0gPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuXHRcdHZhciBpc09iamVjdCA9IG9iamVjdCAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jztcblx0XHR2YXIgaXNGdW5jdGlvbiA9IHRvU3RyLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0XHR2YXIgaXNBcmd1bWVudHMgPSBpc0FyZ3Mob2JqZWN0KTtcblx0XHR2YXIgaXNTdHJpbmcgPSBpc09iamVjdCAmJiB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuXHRcdHZhciB0aGVLZXlzID0gW107XG5cblx0XHRpZiAoIWlzT2JqZWN0ICYmICFpc0Z1bmN0aW9uICYmICFpc0FyZ3VtZW50cykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmtleXMgY2FsbGVkIG9uIGEgbm9uLW9iamVjdCcpO1xuXHRcdH1cblxuXHRcdHZhciBza2lwUHJvdG8gPSBoYXNQcm90b0VudW1CdWcgJiYgaXNGdW5jdGlvbjtcblx0XHRpZiAoaXNTdHJpbmcgJiYgb2JqZWN0Lmxlbmd0aCA+IDAgJiYgIWhhcy5jYWxsKG9iamVjdCwgMCkpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0Lmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpc0FyZ3VtZW50cyAmJiBvYmplY3QubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBvYmplY3QubGVuZ3RoOyArK2opIHtcblx0XHRcdFx0dGhlS2V5cy5wdXNoKFN0cmluZyhqKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAodmFyIG5hbWUgaW4gb2JqZWN0KSB7XG5cdFx0XHRcdGlmICghKHNraXBQcm90byAmJiBuYW1lID09PSAncHJvdG90eXBlJykgJiYgaGFzLmNhbGwob2JqZWN0LCBuYW1lKSkge1xuXHRcdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcobmFtZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGhhc0RvbnRFbnVtQnVnKSB7XG5cdFx0XHR2YXIgc2tpcENvbnN0cnVjdG9yID0gZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5KG9iamVjdCk7XG5cblx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgZG9udEVudW1zLmxlbmd0aDsgKytrKSB7XG5cdFx0XHRcdGlmICghKHNraXBDb25zdHJ1Y3RvciAmJiBkb250RW51bXNba10gPT09ICdjb25zdHJ1Y3RvcicpICYmIGhhcy5jYWxsKG9iamVjdCwgZG9udEVudW1zW2tdKSkge1xuXHRcdFx0XHRcdHRoZUtleXMucHVzaChkb250RW51bXNba10pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGVLZXlzO1xuXHR9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBrZXlzU2hpbTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTtcblxudmFyIG9yaWdLZXlzID0gT2JqZWN0LmtleXM7XG52YXIga2V5c1NoaW0gPSBvcmlnS2V5cyA/IGZ1bmN0aW9uIGtleXMobykgeyByZXR1cm4gb3JpZ0tleXMobyk7IH0gOiByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbnZhciBvcmlnaW5hbEtleXMgPSBPYmplY3Qua2V5cztcblxua2V5c1NoaW0uc2hpbSA9IGZ1bmN0aW9uIHNoaW1PYmplY3RLZXlzKCkge1xuXHRpZiAoT2JqZWN0LmtleXMpIHtcblx0XHR2YXIga2V5c1dvcmtzV2l0aEFyZ3VtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBTYWZhcmkgNS4wIGJ1Z1xuXHRcdFx0dmFyIGFyZ3MgPSBPYmplY3Qua2V5cyhhcmd1bWVudHMpO1xuXHRcdFx0cmV0dXJuIGFyZ3MgJiYgYXJncy5sZW5ndGggPT09IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0fSgxLCAyKSk7XG5cdFx0aWYgKCFrZXlzV29ya3NXaXRoQXJndW1lbnRzKSB7XG5cdFx0XHRPYmplY3Qua2V5cyA9IGZ1bmN0aW9uIGtleXMob2JqZWN0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG5cdFx0XHRcdGlmIChpc0FyZ3Mob2JqZWN0KSkge1xuXHRcdFx0XHRcdHJldHVybiBvcmlnaW5hbEtleXMoc2xpY2UuY2FsbChvYmplY3QpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKG9iamVjdCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRPYmplY3Qua2V5cyA9IGtleXNTaGltO1xuXHR9XG5cdHJldHVybiBPYmplY3Qua2V5cyB8fCBrZXlzU2hpbTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0dmFyIHN0ciA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHR2YXIgaXNBcmdzID0gc3RyID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcblx0aWYgKCFpc0FyZ3MpIHtcblx0XHRpc0FyZ3MgPSBzdHIgIT09ICdbb2JqZWN0IEFycmF5XScgJiZcblx0XHRcdHZhbHVlICE9PSBudWxsICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdFx0dmFsdWUubGVuZ3RoID49IDAgJiZcblx0XHRcdHRvU3RyLmNhbGwodmFsdWUuY2FsbGVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0fVxuXHRyZXR1cm4gaXNBcmdzO1xufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrXS5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG4iLCJpbXBvcnQgeyBJbWd1ckNsaWVudCB9IGZyb20gJy4uL2NsaWVudCc7XG5pbXBvcnQgeyBBTEJVTV9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgQWxidW1EYXRhIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxidW0oXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIGFsYnVtSGFzaDogc3RyaW5nXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8QWxidW1EYXRhPj4ge1xuICBjb25zdCB1cmwgPSBgJHtBTEJVTV9FTkRQT0lOVH0vJHthbGJ1bUhhc2h9YDtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmwgfSlcbiAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEFsYnVtRGF0YT47XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2dldEFsYnVtJztcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBnZXRBdXRob3JpemF0aW9uSGVhZGVyIH0gZnJvbSAnLi9nZXRBdXRob3JpemF0aW9uSGVhZGVyJztcbmltcG9ydCB7XG4gIGRlbGV0ZUltYWdlLFxuICBmYXZvcml0ZUltYWdlLFxuICBnZXRJbWFnZSxcbiAgdXBsb2FkLFxuICB1cGRhdGVJbWFnZSxcbiAgVXBkYXRlSW1hZ2VQYXlsb2FkLFxufSBmcm9tICcuL2ltYWdlJztcbmltcG9ydCB7XG4gIEdhbGxlcnlPcHRpb25zLFxuICBnZXRHYWxsZXJ5LFxuICBnZXRTdWJyZWRkaXRHYWxsZXJ5LFxuICBTdWJyZWRkaXRHYWxsZXJ5T3B0aW9ucyxcbiAgc2VhcmNoR2FsbGVyeSxcbiAgU2VhcmNoR2FsbGVyeU9wdGlvbnMsXG59IGZyb20gJy4vZ2FsbGVyeSc7XG5pbXBvcnQgeyBnZXRBbGJ1bSB9IGZyb20gJy4vYWxidW0nO1xuaW1wb3J0IHsgSU1HVVJfQVBJX1BSRUZJWCB9IGZyb20gJy4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQge1xuICBBbGJ1bURhdGEsXG4gIENyZWRlbnRpYWxzLFxuICBHYWxsZXJ5RGF0YSxcbiAgSW1hZ2VEYXRhLFxuICBJbWd1ckFwaVJlc3BvbnNlLFxuICBQYXlsb2FkLFxufSBmcm9tICcuL2NvbW1vbi90eXBlcyc7XG5cbmNvbnN0IFVTRVJBR0VOVCA9ICdpbWd1ci9uZXh0IChodHRwczovL2dpdGh1Yi5jb20va2FpbWFsbGVhL25vZGUtaW1ndXIpJztcblxuaW1wb3J0IGF4aW9zLCB7IEF4aW9zSW5zdGFuY2UsIEF4aW9zUmVzcG9uc2UsIEF4aW9zUmVxdWVzdENvbmZpZyB9IGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IHR5cGUgeyBDcmVkZW50aWFscyBhcyBJbWd1ckNyZWRlbnRpYWxzIH07XG5leHBvcnQgY2xhc3MgSW1ndXJDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBwcml2YXRlIHBsYWluRmV0Y2hlcjogQXhpb3NJbnN0YW5jZTtcbiAgcHJpdmF0ZSBmZXRjaGVyOiBBeGlvc0luc3RhbmNlO1xuXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBsYWluRmV0Y2hlciA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgICBiYXNlVVJMOiBJTUdVUl9BUElfUFJFRklYLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAndXNlci1hZ2VudCc6IFVTRVJBR0VOVCxcbiAgICAgIH0sXG4gICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICB9KTtcbiAgICB0aGlzLmZldGNoZXIgPSBheGlvcy5jcmVhdGUoe1xuICAgICAgYmFzZVVSTDogSU1HVVJfQVBJX1BSRUZJWCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ3VzZXItYWdlbnQnOiBVU0VSQUdFTlQsXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgfSk7XG4gICAgdGhpcy5mZXRjaGVyLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShcbiAgICAgIGFzeW5jIChjb25maWc6IEF4aW9zUmVxdWVzdENvbmZpZykgPT4ge1xuICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzID8gY29uZmlnLmhlYWRlcnMgOiB7fTtcbiAgICAgICAgY29uZmlnLmhlYWRlcnMuYXV0aG9yaXphdGlvbiA9IGF3YWl0IGdldEF1dGhvcml6YXRpb25IZWFkZXIodGhpcyk7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9LFxuICAgICAgKGU6IEVycm9yKSA9PiBQcm9taXNlLnJlamVjdChlKVxuICAgICk7XG4gIH1cblxuICBwbGFpblJlcXVlc3Qob3B0aW9uczogQXhpb3NSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBeGlvc1Jlc3BvbnNlPHVua25vd24+PiB7XG4gICAgcmV0dXJuIHRoaXMucGxhaW5GZXRjaGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcmVxdWVzdChvcHRpb25zOiBBeGlvc1JlcXVlc3RDb25maWcgPSB7fSk6IFByb21pc2U8QXhpb3NSZXNwb25zZTx1bmtub3duPj4ge1xuICAgIHJldHVybiB0aGlzLmZldGNoZXIob3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGVJbWFnZShpbWFnZUhhc2g6IHN0cmluZyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPj4ge1xuICAgIHJldHVybiBkZWxldGVJbWFnZSh0aGlzLCBpbWFnZUhhc2gpO1xuICB9XG5cbiAgZmF2b3JpdGVJbWFnZShpbWFnZUhhc2g6IHN0cmluZyk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxzdHJpbmc+PiB7XG4gICAgcmV0dXJuIGZhdm9yaXRlSW1hZ2UodGhpcywgaW1hZ2VIYXNoKTtcbiAgfVxuXG4gIGdldEFsYnVtKGFsYnVtSGFzaDogc3RyaW5nKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEFsYnVtRGF0YT4+IHtcbiAgICByZXR1cm4gZ2V0QWxidW0odGhpcywgYWxidW1IYXNoKTtcbiAgfVxuXG4gIGdldEdhbGxlcnkob3B0aW9uczogR2FsbGVyeU9wdGlvbnMpOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gICAgcmV0dXJuIGdldEdhbGxlcnkodGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICBnZXRTdWJyZWRkaXRHYWxsZXJ5KFxuICAgIG9wdGlvbnM6IFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zXG4gICk6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxHYWxsZXJ5RGF0YT4+IHtcbiAgICByZXR1cm4gZ2V0U3VicmVkZGl0R2FsbGVyeSh0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHNlYXJjaEdhbGxlcnkoXG4gICAgb3B0aW9uczogU2VhcmNoR2FsbGVyeU9wdGlvbnNcbiAgKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPj4ge1xuICAgIHJldHVybiBzZWFyY2hHYWxsZXJ5KHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0SW1hZ2UoaW1hZ2VIYXNoOiBzdHJpbmcpOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPj4ge1xuICAgIHJldHVybiBnZXRJbWFnZSh0aGlzLCBpbWFnZUhhc2gpO1xuICB9XG5cbiAgdXBkYXRlSW1hZ2UoXG4gICAgcGF5bG9hZDogVXBkYXRlSW1hZ2VQYXlsb2FkIHwgVXBkYXRlSW1hZ2VQYXlsb2FkW11cbiAgKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+IHwgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPltdPiB7XG4gICAgcmV0dXJuIHVwZGF0ZUltYWdlKHRoaXMsIHBheWxvYWQpO1xuICB9XG5cbiAgdXBsb2FkKFxuICAgIHBheWxvYWQ6IHN0cmluZyB8IHN0cmluZ1tdIHwgUGF5bG9hZCB8IFBheWxvYWRbXVxuICApOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPiB8IEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPltdPiB7XG4gICAgcmV0dXJuIHVwbG9hZCh0aGlzLCBwYXlsb2FkKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IElNR1VSX0FQSV9QUkVGSVggPSAnaHR0cHM6Ly9hcGkuaW1ndXIuY29tJztcblxuZXhwb3J0IGNvbnN0IEFQSV9WRVJTSU9OID0gJzMnO1xuXG5leHBvcnQgY29uc3QgQVVUSE9SSVpFX0VORFBPSU5UID0gJ29hdXRoMi9hdXRob3JpemUnO1xuXG5leHBvcnQgY29uc3QgQUxCVU1fRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vYWxidW1gO1xuXG5leHBvcnQgY29uc3QgSU1BR0VfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vaW1hZ2VgO1xuXG5leHBvcnQgY29uc3QgVVBMT0FEX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L3VwbG9hZGA7XG5cbmV4cG9ydCBjb25zdCBHQUxMRVJZX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L2dhbGxlcnlgO1xuXG5leHBvcnQgY29uc3QgU1VCUkVERElUX0dBTExFUllfRU5EUE9JTlQgPSBgJHtBUElfVkVSU0lPTn0vZ2FsbGVyeS9yYDtcblxuZXhwb3J0IGNvbnN0IFNFQVJDSF9HQUxMRVJZX0VORFBPSU5UID0gYCR7QVBJX1ZFUlNJT059L2dhbGxlcnkvc2VhcmNoYDtcbiIsImltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcblxuZXhwb3J0IGludGVyZmFjZSBBY2Nlc3NUb2tlbiB7XG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50SWQge1xuICBjbGllbnRJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2luIGV4dGVuZHMgQ2xpZW50SWQge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVkZW50aWFscyA9IEFjY2Vzc1Rva2VuIHwgQ2xpZW50SWQgfCBMb2dpbjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQWNjZXNzVG9rZW4oYXJnOiB1bmtub3duKTogYXJnIGlzIEFjY2Vzc1Rva2VuIHtcbiAgcmV0dXJuIChhcmcgYXMgQWNjZXNzVG9rZW4pLmFjY2Vzc1Rva2VuICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NsaWVudElkKGFyZzogdW5rbm93bik6IGFyZyBpcyBDbGllbnRJZCB7XG4gIHJldHVybiAoYXJnIGFzIENsaWVudElkKS5jbGllbnRJZCAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dpbihhcmc6IHVua25vd24pOiBhcmcgaXMgTG9naW4ge1xuICByZXR1cm4gKFxuICAgIChhcmcgYXMgTG9naW4pLmNsaWVudElkICE9PSB1bmRlZmluZWQgJiZcbiAgICAoYXJnIGFzIExvZ2luKS51c2VybmFtZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgKGFyZyBhcyBMb2dpbikucGFzc3dvcmQgIT09IHVuZGVmaW5lZFxuICApO1xufVxuXG5pbnRlcmZhY2UgQ29tbW9uRGF0YSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmcgfCBudWxsO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nIHwgbnVsbDtcbiAgZGF0ZXRpbWU6IG51bWJlcjtcbiAgbGluazogc3RyaW5nO1xuXG4gIGFkX2NvbmZpZz86IHtcbiAgICBzYWZlRmxhZ3M6IHN0cmluZ1tdO1xuICAgIGhpZ2hSaXNrRmxhZ3M6IHN0cmluZ1tdO1xuICAgIHVuc2FmZUZsYWdzOiBzdHJpbmdbXTtcbiAgICB3YWxsVW5zYWZlRmxhZ3M6IHN0cmluZ1tdO1xuICAgIHNob3dzQWRzOiBib29sZWFuO1xuICB9O1xuICBhZF90eXBlOiBudW1iZXI7XG4gIGFkX3VybDogc3RyaW5nO1xuXG4gIGFjY291bnRfdXJsOiBzdHJpbmcgfCBudWxsO1xuICBhY2NvdW50X2lkOiBzdHJpbmcgfCBudWxsO1xuICBmYXZvcml0ZTogYm9vbGVhbjtcbiAgaXNfYWQ6IGJvb2xlYW47XG4gIGlzX2FsYnVtOiBib29sZWFuO1xuICBpbl9nYWxsZXJ5OiBib29sZWFuO1xuICBpbl9tb3N0X3ZpcmFsOiBib29sZWFuO1xuICBuc2Z3OiBib29sZWFuIHwgbnVsbDtcbiAgc2VjdGlvbjogc3RyaW5nIHwgbnVsbDtcbiAgdGFnczogQXJyYXk8e1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkaXNwbGF5X25hbWU6IHN0cmluZztcbiAgICBmb2xsb3dlcnM6IG51bWJlcjtcbiAgICB0b3RhbF9pdGVtczogbnVtYmVyO1xuICAgIGZvbGxvd2luZzogYm9vbGVhbjtcbiAgICBpc193aGl0ZWxpc3RlZDogYm9vbGVhbjtcbiAgICBiYWNrZ3JvdW5kX2hhc2g6IHN0cmluZztcbiAgICB0aHVtYm5haWxfaGFzaDogc3RyaW5nIHwgbnVsbDtcbiAgICBhY2NlbnQ6IHN0cmluZztcbiAgICBiYWNrZ3JvdW5kX2lzX2FuaW1hdGVkOiBib29sZWFuO1xuICAgIHRodW1ibmFpbF9pc19hbmltYXRlZDogYm9vbGVhbjtcbiAgICBpc19wcm9tb3RlZDogYm9vbGVhbjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGxvZ29faGFzaDogc3RyaW5nIHwgbnVsbDtcbiAgICBsb2dvX2Rlc3RpbmF0aW9uX3VybDogc3RyaW5nIHwgbnVsbDtcbiAgICBkZXNjcmlwdGlvbl9hbm5vdGF0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH0+O1xuICB0b3BpYzogc3RyaW5nIHwgbnVsbDtcbiAgdG9waWNfaWQ6IHN0cmluZyB8IG51bGw7XG4gIHZvdGU6IG51bGw7XG5cbiAgY29tbWVudF9jb3VudDogbnVtYmVyIHwgbnVsbDtcbiAgZmF2b3JpdGVfY291bnQ6IG51bWJlciB8IG51bGw7XG4gIHVwczogbnVtYmVyIHwgbnVsbDtcbiAgZG93bnM6IG51bWJlciB8IG51bGw7XG4gIHNjb3JlOiBudW1iZXIgfCBudWxsO1xuICBwb2ludHM6IG51bWJlciB8IG51bGw7XG4gIHZpZXdzOiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIEltYWdlRGF0YSBleHRlbmRzIENvbW1vbkRhdGEge1xuICB0eXBlOiBzdHJpbmc7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBzaXplOiBudW1iZXI7XG4gIGRlbGV0ZWhhc2g/OiBzdHJpbmc7XG4gIGJhbmR3aWR0aDogbnVtYmVyO1xuICBhbmltYXRlZDogYm9vbGVhbjtcbiAgaGFzX3NvdW5kOiBib29sZWFuO1xuICBlZGl0ZWQ6IHN0cmluZztcbiAgbXA0X3NpemU/OiBudW1iZXI7XG4gIG1wND86IHN0cmluZztcbiAgZ2lmdj86IHN0cmluZztcbiAgaGxzPzogc3RyaW5nO1xuICBsb29waW5nPzogYm9vbGVhbjtcbiAgcHJvY2Vzc2luZz86IHtcbiAgICBzdGF0dXM6ICdwZW5kaW5nJyB8ICdjb21wbGV0ZWQnO1xuICB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFsYnVtRGF0YSBleHRlbmRzIENvbW1vbkRhdGEge1xuICBjb3Zlcjogc3RyaW5nIHwgbnVsbDtcbiAgY292ZXJfd2lkdGg6IG51bWJlciB8IG51bGw7XG4gIGNvdmVyX2hlaWdodDogbnVtYmVyIHwgbnVsbDtcbiAgbGF5b3V0OiBzdHJpbmc7XG4gIHByaXZhY3k6IHN0cmluZztcbiAgaW5jbHVkZV9hbGJ1bV9hZHM6IGJvb2xlYW47XG4gIGltYWdlczogSW1hZ2VEYXRhW107XG4gIGltYWdlc19jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBHYWxsZXJ5RGF0YSA9IEFycmF5PEltYWdlRGF0YSB8IEFsYnVtRGF0YT47XG5leHBvcnQgaW50ZXJmYWNlIFBheWxvYWQge1xuICBpbWFnZT86IHN0cmluZztcbiAgYmFzZTY0Pzogc3RyaW5nO1xuICB0eXBlPzogJ3N0cmVhbScgfCAndXJsJyB8ICdiYXNlNjQnO1xuICBuYW1lPzogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGFsYnVtPzogc3RyaW5nO1xuICBzdHJlYW0/OiBSZWFkYWJsZTtcbiAgZGlzYWJsZV9hdWRpbz86ICcxJyB8ICcwJztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW1ndXJBcGlSZXNwb25zZTxcbiAgVCA9XG4gICAgfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICAgIHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXVxuICAgIHwgc3RyaW5nXG4gICAgfCBib29sZWFuXG4gICAgfCBJbWFnZURhdGFcbiAgICB8IEdhbGxlcnlEYXRhXG4gICAgfCBBbGJ1bURhdGFcbj4ge1xuICBkYXRhOiBUO1xuICBzdGF0dXM6IG51bWJlcjtcbiAgc3VjY2VzczogYm9vbGVhbjtcbn1cbiIsImltcG9ydCB7IEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UsIFBheWxvYWQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQmFzZTY0KHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2YgcGF5bG9hZC5iYXNlNjQgIT09ICd1bmRlZmluZWQnICYmIHBheWxvYWQudHlwZSA9PT0gJ2Jhc2U2NCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ltYWdlVXJsKHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiBwYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLmltYWdlICE9PSAndW5kZWZpbmVkJyAmJiBwYXlsb2FkLnR5cGUgPT09ICd1cmwnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJlYW0ocGF5bG9hZDogc3RyaW5nIHwgUGF5bG9hZCk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHBheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkLnN0cmVhbSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8vIFRPRE86IFJlZmFjdG9yIHRoaXMgdG8gYmUgYSB1bmlxdWUgbmFtZSBvZiBzb21lIGtpbmQgKGEgaGFzaD8pXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlKHBheWxvYWQ6IHN0cmluZyB8IFBheWxvYWQpOiBzdHJpbmcgfCBSZWFkYWJsZSB7XG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGF5bG9hZDtcbiAgfVxuXG4gIGlmIChpc0Jhc2U2NChwYXlsb2FkKSkge1xuICAgIHJldHVybiAncGF5bG9hZC5iYXNlNjQnIGFzIHN0cmluZztcbiAgfSBlbHNlIGlmIChpc1N0cmVhbShwYXlsb2FkKSkge1xuICAgIHJldHVybiAncGF5bG9hZC5zdHJlYW0nIGFzIHN0cmluZztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcGF5bG9hZC5pbWFnZSBhcyBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvcm0ocGF5bG9hZDogc3RyaW5nIHwgUGF5bG9hZCk6IEZvcm1EYXRhIHtcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gIGlmICh0eXBlb2YgcGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICBmb3JtLmFwcGVuZCgnaW1hZ2UnLCBwYXlsb2FkKTtcbiAgICByZXR1cm4gZm9ybTtcbiAgfVxuXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHBheWxvYWQpKSB7XG4gICAgY29uc3Qgc3VwcG9ydGVkVXBsb2FkT2JqZWN0VHlwZXMgPSBbJ2Jhc2U2NCcsICdzdHJlYW0nXTtcbiAgICBpZiAoc3VwcG9ydGVkVXBsb2FkT2JqZWN0VHlwZXMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgaWYgKHN1cHBvcnRlZFVwbG9hZE9iamVjdFR5cGVzLmluZGV4T2YocGF5bG9hZC50eXBlIGFzIHN0cmluZykgIT09IC0xKSB7XG4gICAgICAgIGZvcm0uYXBwZW5kKGtleSwgcGF5bG9hZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm0uYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZm9ybTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gIHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlXG4pOiBJbWd1ckFwaVJlc3BvbnNlIHtcbiAgaWYgKFxuICAgIHR5cGVvZiByZXNwb25zZS5kYXRhPy5zdGF0dXMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIHJlc3BvbnNlLmRhdGE/LnN1Y2Nlc3MgIT09ICd1bmRlZmluZWQnXG4gICkge1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhOiByZXNwb25zZS5kYXRhLFxuICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIC8vIFRPRE86IGRldGVybWluZSB0aGUgc3VjY2VzcyBvZiB0aGUgY2FsbD9cbiAgICBzdWNjZXNzOiB0cnVlLFxuICB9O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgR0FMTEVSWV9FTkRQT0lOVCwgSU1HVVJfQVBJX1BSRUZJWCB9IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgR2FsbGVyeURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBDb21tb25TZWN0aW9uUHJvcHMgPSB7XG4gIHNvcnQ/OiAndmlyYWwnIHwgJ3RvcCcgfCAndGltZSc7XG4gIHBhZ2U/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBIb3RTZWN0aW9uID0gQ29tbW9uU2VjdGlvblByb3BzICYge1xuICBzZWN0aW9uOiAnaG90Jztcbn07XG5cbmV4cG9ydCB0eXBlIFRvcFNlY3Rpb24gPSBDb21tb25TZWN0aW9uUHJvcHMgJiB7XG4gIHNlY3Rpb246ICd0b3AnO1xuICB3aW5kb3c/OiAnZGF5JyB8ICd3ZWVrJyB8ICdtb250aCcgfCAneWVhcicgfCAnYWxsJztcbn07XG5cbmV4cG9ydCB0eXBlIFVzZXJTZWN0aW9uID0gT21pdDxDb21tb25TZWN0aW9uUHJvcHMsICdzb3J0Jz4gJiB7XG4gIHNlY3Rpb246ICd1c2VyJztcbiAgc29ydD86ICd2aXJhbCcgfCAndG9wJyB8ICd0aW1lJyB8ICdyaXNpbmcnO1xufTtcblxuZXhwb3J0IHR5cGUgU2VjdGlvbk9wdGlvbnMgPSBIb3RTZWN0aW9uIHwgVG9wU2VjdGlvbiB8IFVzZXJTZWN0aW9uO1xuXG5leHBvcnQgdHlwZSBQcmVzZW50YXRpb25PcHRpb25zID0ge1xuICBzaG93VmlyYWw/OiBib29sZWFuO1xuICBtYXR1cmU/OiBib29sZWFuO1xuICBhbGJ1bV9wcmV2aWV3cz86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBHYWxsZXJ5T3B0aW9ucyA9IFNlY3Rpb25PcHRpb25zICYgUHJlc2VudGF0aW9uT3B0aW9ucztcblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IEdhbGxlcnlPcHRpb25zID0ge1xuICBzZWN0aW9uOiAnaG90JyxcbiAgc29ydDogJ3ZpcmFsJyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zdHJ1Y3RHYWxsZXJ5VXJsKG9wdGlvbnM6IEdhbGxlcnlPcHRpb25zKTogVVJMIHtcbiAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICBsZXQgdXJpID0gYCR7bWVyZ2VkT3B0aW9ucy5zZWN0aW9ufWA7XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMuc29ydCkge1xuICAgIHVyaSArPSBgLyR7bWVyZ2VkT3B0aW9ucy5zb3J0fWA7XG4gIH1cblxuICBpZiAobWVyZ2VkT3B0aW9ucy5zZWN0aW9uID09PSAndG9wJyAmJiBtZXJnZWRPcHRpb25zLndpbmRvdykge1xuICAgIHVyaSArPSBgLyR7bWVyZ2VkT3B0aW9ucy53aW5kb3d9YDtcbiAgfVxuXG4gIGlmIChtZXJnZWRPcHRpb25zLnBhZ2UpIHtcbiAgICB1cmkgKz0gYC8ke21lcmdlZE9wdGlvbnMucGFnZX1gO1xuICB9XG5cbiAgY29uc3QgdXJsID0gbmV3IFVSTChgJHtJTUdVUl9BUElfUFJFRklYfS8ke0dBTExFUllfRU5EUE9JTlR9LyR7dXJpfWApO1xuXG4gIGlmIChtZXJnZWRPcHRpb25zLnNob3dWaXJhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ3Nob3dWaXJhbCcsIG1lcmdlZE9wdGlvbnMuc2hvd1ZpcmFsLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgaWYgKG1lcmdlZE9wdGlvbnMubWF0dXJlICE9PSB1bmRlZmluZWQpIHtcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnbWF0dXJlJywgbWVyZ2VkT3B0aW9ucy5tYXR1cmUudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAobWVyZ2VkT3B0aW9ucy5hbGJ1bV9wcmV2aWV3cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoXG4gICAgICAnYWxidW1fcHJldmlld3MnLFxuICAgICAgbWVyZ2VkT3B0aW9ucy5hbGJ1bV9wcmV2aWV3cy50b1N0cmluZygpXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRHYWxsZXJ5KFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBvcHRpb25zOiBHYWxsZXJ5T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IGNvbnN0cnVjdEdhbGxlcnlVcmwob3B0aW9ucyk7XG4gIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIHByZWZpeFVybCB3aXRoIGdvdCwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHN0YXJ0aW5nIHNsYXNoIG9yIGl0J2xsIHRocm93XG4gIGNvbnN0IGZpbmFsUGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgxKTtcblxuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICBhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybDogZmluYWxQYXRobmFtZSB9KVxuICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHtcbiAgU1VCUkVERElUX0dBTExFUllfRU5EUE9JTlQsXG4gIElNR1VSX0FQSV9QUkVGSVgsXG59IGZyb20gJy4uL2NvbW1vbi9lbmRwb2ludHMnO1xuaW1wb3J0IHsgSW1ndXJBcGlSZXNwb25zZSwgR2FsbGVyeURhdGEgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBUaW1lT3B0aW9ucyA9IHtcbiAgc3VicmVkZGl0OiBzdHJpbmc7XG4gIHNvcnQ/OiAndGltZSc7XG4gIHBhZ2U/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBUb3BPcHRpb25zID0gT21pdDxUaW1lT3B0aW9ucywgJ3NvcnQnPiAmIHtcbiAgc29ydD86ICd0b3AnO1xuICB3aW5kb3c/OiAnZGF5JyB8ICd3ZWVrJyB8ICdtb250aCcgfCAneWVhcicgfCAnYWxsJztcbn07XG5cbmV4cG9ydCB0eXBlIFN1YnJlZGRpdEdhbGxlcnlPcHRpb25zID0gVGltZU9wdGlvbnMgfCBUb3BPcHRpb25zO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0U3VicmVkZGl0R2FsbGVyeVVybChcbiAgb3B0aW9uczogU3VicmVkZGl0R2FsbGVyeU9wdGlvbnNcbik6IFVSTCB7XG4gIGxldCB1cmkgPSBgJHtvcHRpb25zLnN1YnJlZGRpdH1gO1xuXG4gIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMuc29ydH1gO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuc29ydCA9PT0gJ3RvcCcgJiYgb3B0aW9ucy53aW5kb3cpIHtcbiAgICB1cmkgKz0gYC8ke29wdGlvbnMud2luZG93fWA7XG4gIH1cblxuICBpZiAob3B0aW9ucy5wYWdlKSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLnBhZ2V9YDtcbiAgfVxuXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoXG4gICAgYCR7SU1HVVJfQVBJX1BSRUZJWH0vJHtTVUJSRURESVRfR0FMTEVSWV9FTkRQT0lOVH0vJHt1cml9YFxuICApO1xuXG4gIHJldHVybiB1cmw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdWJyZWRkaXRHYWxsZXJ5KFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBvcHRpb25zOiBTdWJyZWRkaXRHYWxsZXJ5T3B0aW9uc1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPj4ge1xuICBjb25zdCB7IHBhdGhuYW1lIH0gPSBjb25zdHJ1Y3RTdWJyZWRkaXRHYWxsZXJ5VXJsKG9wdGlvbnMpO1xuICAvLyBzaW5jZSB3ZSdyZSB1c2luZyBwcmVmaXhVcmwgd2l0aCBnb3QsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSBzdGFydGluZyBzbGFzaCBvciBpdCdsbCB0aHJvd1xuICBjb25zdCBmaW5hbFBhdGhuYW1lID0gcGF0aG5hbWUuc2xpY2UoMSk7XG5cbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3QoeyB1cmw6IGZpbmFsUGF0aG5hbWUgfSlcbiAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEdhbGxlcnlEYXRhPjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZ2V0R2FsbGVyeSc7XG5leHBvcnQgKiBmcm9tICcuL2dldFN1YnJlZGRpdEdhbGxlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9zZWFyY2hHYWxsZXJ5JztcbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IFNFQVJDSF9HQUxMRVJZX0VORFBPSU5ULCBJTUdVUl9BUElfUFJFRklYIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlLCBHYWxsZXJ5RGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFVSTCB9IGZyb20gJ3VybCc7XG5cbmV4cG9ydCB0eXBlIFNlYXJjaE9wdGlvbnMgPSB7XG4gIHE/OiBzdHJpbmc7XG4gIHF1ZXJ5Pzogc3RyaW5nO1xuICBzb3J0PzogJ3RpbWUnIHwgJ3ZpcmFsJztcbiAgcGFnZT86IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIFRvcFNlYXJjaE9wdGlvbnMgPSBPbWl0PFNlYXJjaE9wdGlvbnMsICdzb3J0Jz4gJiB7XG4gIHNvcnQ/OiAndG9wJztcbiAgd2luZG93PzogJ2RheScgfCAnd2VlaycgfCAnbW9udGgnIHwgJ3llYXInIHwgJ2FsbCc7XG59O1xuXG5leHBvcnQgdHlwZSBBZHZhbmNlZFNlYXJjaFF1ZXJ5UGFyYW1ldGVycyA9IHtcbiAgcV9hbGw/OiBzdHJpbmc7XG4gIHFfYW55Pzogc3RyaW5nO1xuICBxX2V4YWN0bHk/OiBzdHJpbmc7XG4gIHFfbm90Pzogc3RyaW5nO1xuICBxX3R5cGU/OiAnanBnJyB8ICdwbmcnIHwgJ2dpZicgfCAnYW5pZ2lmJyB8ICdhbGJ1bSc7XG4gIHFfc2l6ZV9weD86ICdzbWFsbCcgfCAnbWVkJyB8ICdiaWcnIHwgJ2xyZycgfCAnaHVnZSc7XG59O1xuXG5jb25zdCBhZHZhbmNlZFBhcmFtZXRlcnM6IEFycmF5PGtleW9mIEFkdmFuY2VkU2VhcmNoUXVlcnlQYXJhbWV0ZXJzPiA9IFtcbiAgJ3FfYWxsJyxcbiAgJ3FfYW55JyxcbiAgJ3FfZXhhY3RseScsXG4gICdxX25vdCcsXG4gICdxX3R5cGUnLFxuICAncV9zaXplX3B4Jyxcbl07XG5cbmV4cG9ydCB0eXBlIFNlYXJjaEdhbGxlcnlPcHRpb25zID0gKFNlYXJjaE9wdGlvbnMgfCBUb3BTZWFyY2hPcHRpb25zKSAmXG4gIEFkdmFuY2VkU2VhcmNoUXVlcnlQYXJhbWV0ZXJzO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0U2VhcmNoR2FsbGVyeVVybChvcHRpb25zOiBTZWFyY2hHYWxsZXJ5T3B0aW9ucyk6IFVSTCB7XG4gIGxldCB1cmkgPSAnJztcblxuICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLnNvcnR9YDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnNvcnQgPT09ICd0b3AnICYmIG9wdGlvbnMud2luZG93KSB7XG4gICAgdXJpICs9IGAvJHtvcHRpb25zLndpbmRvd31gO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucGFnZSkge1xuICAgIHVyaSArPSBgLyR7b3B0aW9ucy5wYWdlfWA7XG4gIH1cblxuICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke0lNR1VSX0FQSV9QUkVGSVh9LyR7U0VBUkNIX0dBTExFUllfRU5EUE9JTlR9JHt1cml9YCk7XG5cbiAgYWR2YW5jZWRQYXJhbWV0ZXJzLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgaWYgKG9wdGlvbnNbcGFyYW1dPy5sZW5ndGgpIHtcbiAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKHBhcmFtLCBvcHRpb25zW3BhcmFtXSBhcyBzdHJpbmcpO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCF1cmwuc2VhcmNoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBvcHRpb25zLnEgfHwgb3B0aW9ucy5xdWVyeTtcbiAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHF1ZXJ5IHdhcyBwcm92aWRlZCcpO1xuICAgIH1cblxuICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKCdxJywgcXVlcnkpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEdhbGxlcnkoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIG9wdGlvbnM6IFNlYXJjaEdhbGxlcnlPcHRpb25zXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+PiB7XG4gIGNvbnN0IHsgcGF0aG5hbWUgfSA9IGNvbnN0cnVjdFNlYXJjaEdhbGxlcnlVcmwob3B0aW9ucyk7XG4gIC8vIHNpbmNlIHdlJ3JlIHVzaW5nIHByZWZpeFVybCB3aXRoIGdvdCwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHN0YXJ0aW5nIHNsYXNoIG9yIGl0J2xsIHRocm93XG4gIGNvbnN0IGZpbmFsUGF0aG5hbWUgPSBwYXRobmFtZS5zbGljZSgxKTtcblxuICByZXR1cm4gZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICBhd2FpdCBjbGllbnQucmVxdWVzdCh7IHVybDogZmluYWxQYXRobmFtZSB9KVxuICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8R2FsbGVyeURhdGE+O1xufVxuIiwiaW1wb3J0IHtcbiAgQWNjZXNzVG9rZW4sXG4gIGlzQWNjZXNzVG9rZW4sXG4gIGlzQ2xpZW50SWQsXG4gIGlzTG9naW4sXG59IGZyb20gJy4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1HVVJfQVBJX1BSRUZJWCwgQVVUSE9SSVpFX0VORFBPSU5UIH0gZnJvbSAnLi9jb21tb24vZW5kcG9pbnRzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEF1dGhvcml6YXRpb25IZWFkZXIoXG4gIGNsaWVudDogSW1ndXJDbGllbnRcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGlmIChpc0FjY2Vzc1Rva2VuKGNsaWVudC5jcmVkZW50aWFscykpIHtcbiAgICByZXR1cm4gYEJlYXJlciAke2NsaWVudC5jcmVkZW50aWFscy5hY2Nlc3NUb2tlbn1gO1xuICB9XG5cbiAgaWYgKGlzQ2xpZW50SWQoY2xpZW50LmNyZWRlbnRpYWxzKSAmJiAhaXNMb2dpbihjbGllbnQuY3JlZGVudGlhbHMpKSB7XG4gICAgcmV0dXJuIGBDbGllbnQtSUQgJHtjbGllbnQuY3JlZGVudGlhbHMuY2xpZW50SWR9YDtcbiAgfVxuXG4gIGNvbnN0IHsgY2xpZW50SWQsIHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gY2xpZW50LmNyZWRlbnRpYWxzO1xuXG4gIGNvbnN0IG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge1xuICAgIHVybDogQVVUSE9SSVpFX0VORFBPSU5ULFxuICAgIGJhc2VVUkw6IElNR1VSX0FQSV9QUkVGSVgsXG4gICAgcGFyYW1zOiB7XG4gICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgcmVzcG9uc2VfdHlwZTogJ3Rva2VuJyxcbiAgICB9LFxuICB9O1xuXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wbGFpblJlcXVlc3Qob3B0aW9ucyk7XG5cbiAgY29uc3QgY29va2llcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddKVxuICAgID8gcmVzcG9uc2UuaGVhZGVyc1snc2V0LWNvb2tpZSddWzBdXG4gICAgOiByZXNwb25zZS5oZWFkZXJzWydzZXQtY29va2llJ107XG5cbiAgaWYgKCFjb29raWVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb29raWVzIHdlcmUgc2V0IGR1cmluZyBhdXRob3JpemF0aW9uJyk7XG4gIH1cblxuICBjb25zdCBtYXRjaGVzID0gY29va2llcy5tYXRjaCgnKF58Oylbc10qYXV0aG9yaXplX3Rva2VuPShbXjtdKiknKTtcblxuICBpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPCAzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCBhdXRob3JpemVfdG9rZW4gY29va2llJyk7XG4gIH1cblxuICBjb25zdCBhdXRob3JpemVUb2tlbiA9IG1hdGNoZXNbMl07XG5cbiAgb3B0aW9ucy5tZXRob2QgPSAnUE9TVCc7XG4gIG9wdGlvbnMuZGF0YSA9IHtcbiAgICB1c2VybmFtZSxcbiAgICBwYXNzd29yZCxcbiAgICBhbGxvdzogYXV0aG9yaXplVG9rZW4sXG4gIH07XG5cbiAgb3B0aW9ucy5mb2xsb3dSZWRpcmVjdCA9IGZhbHNlO1xuICBvcHRpb25zLmhlYWRlcnMgPSB7XG4gICAgY29va2llOiBgYXV0aG9yaXplX3Rva2VuPSR7YXV0aG9yaXplVG9rZW59YCxcbiAgfTtcblxuICByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wbGFpblJlcXVlc3Qob3B0aW9ucyk7XG4gIGNvbnN0IGxvY2F0aW9uID0gcmVzcG9uc2UuaGVhZGVycy5sb2NhdGlvbjtcbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBhcnNlIGxvY2F0aW9uJyk7XG4gIH1cblxuICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2UoXG4gICAgJ3tcIicgK1xuICAgICAgZGVjb2RlVVJJKGxvY2F0aW9uLnNsaWNlKGxvY2F0aW9uLmluZGV4T2YoJyMnKSArIDEpKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICdcIixcIicpXG4gICAgICAgIC5yZXBsYWNlKC89L2csICdcIjpcIicpICtcbiAgICAgICdcIn0nXG4gICk7XG5cbiAgY29uc3QgYWNjZXNzVG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICgoY2xpZW50LmNyZWRlbnRpYWxzIGFzIHVua25vd24pIGFzIEFjY2Vzc1Rva2VuKS5hY2Nlc3NUb2tlbiA9IGFjY2Vzc1Rva2VuO1xuXG4gIHJldHVybiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YDtcbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IElNQUdFX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlSW1hZ2UoXG4gIGNsaWVudDogSW1ndXJDbGllbnQsXG4gIGltYWdlSGFzaDogc3RyaW5nXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj4+IHtcbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7aW1hZ2VIYXNofWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsLCBtZXRob2Q6ICdERUxFVEUnIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPjtcbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IElNQUdFX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBJbWd1ckFwaVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmF2b3JpdGVJbWFnZShcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgaW1hZ2VIYXNoOiBzdHJpbmdcbik6IFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTwnZmF2b3JpdGVkJz4+IHtcbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7aW1hZ2VIYXNofS9mYXZvcml0ZWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsLCBtZXRob2Q6ICdQT1NUJyB9KVxuICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8J2Zhdm9yaXRlZCc+O1xufVxuIiwiaW1wb3J0IHsgSW1ndXJDbGllbnQgfSBmcm9tICcuLi9jbGllbnQnO1xuaW1wb3J0IHsgSU1BR0VfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcbmltcG9ydCB7IEltZ3VyQXBpUmVzcG9uc2UsIEltYWdlRGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEltYWdlKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBpbWFnZUhhc2g6IHN0cmluZ1xuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT4+IHtcbiAgY29uc3QgdXJsID0gYCR7SU1BR0VfRU5EUE9JTlR9LyR7aW1hZ2VIYXNofWA7XG4gIHJldHVybiBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHsgdXJsIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9kZWxldGVJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2Zhdm9yaXRlSW1hZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9nZXRJbWFnZSc7XG5leHBvcnQgKiBmcm9tICcuL3VwZGF0ZUltYWdlJztcbmV4cG9ydCAqIGZyb20gJy4vdXBsb2FkJztcbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IElNQUdFX0VORFBPSU5UIH0gZnJvbSAnLi4vY29tbW9uL2VuZHBvaW50cyc7XG5pbXBvcnQgeyBjcmVhdGVGb3JtLCBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFBheWxvYWQsIEltZ3VyQXBpUmVzcG9uc2UgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUltYWdlUGF5bG9hZFxuICBleHRlbmRzIFBpY2s8UGF5bG9hZCwgJ3RpdGxlJyB8ICdkZXNjcmlwdGlvbic+IHtcbiAgaW1hZ2VIYXNoOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRVcGRhdGVQYXlsb2FkKHA6IFVwZGF0ZUltYWdlUGF5bG9hZCkge1xuICByZXR1cm4gdHlwZW9mIHAudGl0bGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwLmRlc2NyaXB0aW9uID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUltYWdlKFxuICBjbGllbnQ6IEltZ3VyQ2xpZW50LFxuICBwYXlsb2FkOiBVcGRhdGVJbWFnZVBheWxvYWQgfCBVcGRhdGVJbWFnZVBheWxvYWRbXVxuKTogUHJvbWlzZTxJbWd1ckFwaVJlc3BvbnNlPGJvb2xlYW4+IHwgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPltdPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBwYXlsb2FkLm1hcCgocDogVXBkYXRlSW1hZ2VQYXlsb2FkKSA9PiB7XG4gICAgICBpZiAoIWlzVmFsaWRVcGRhdGVQYXlsb2FkKHApKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVXBkYXRlIHJlcXVpcmVzIGEgdGl0bGUgYW5kL29yIGRlc2NyaXB0aW9uJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybCA9IGAke0lNQUdFX0VORFBPSU5UfS8ke3AuaW1hZ2VIYXNofWA7XG4gICAgICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybShwKTtcbiAgICAgIC8qIGVzbGludCBuby1hc3luYy1wcm9taXNlLWV4ZWN1dG9yOiAwICovXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoXG4gICAgICAgICAgZ2V0SW1ndXJBcGlSZXNwb25zZUZyb21SZXNwb25zZShcbiAgICAgICAgICAgIGF3YWl0IGNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgZGF0YTogZm9ybSxcbiAgICAgICAgICAgICAgLy8gcmVzb2x2ZUJvZHlPbmx5OiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApIGFzIEltZ3VyQXBpUmVzcG9uc2U8Ym9vbGVhbj5cbiAgICAgICAgKTtcbiAgICAgIH0pIGFzIFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxib29sZWFuPj47XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgaWYgKCFpc1ZhbGlkVXBkYXRlUGF5bG9hZChwYXlsb2FkKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignVXBkYXRlIHJlcXVpcmVzIGEgdGl0bGUgYW5kL29yIGRlc2NyaXB0aW9uJyk7XG4gIH1cblxuICBjb25zdCB1cmwgPSBgJHtJTUFHRV9FTkRQT0lOVH0vJHtwYXlsb2FkLmltYWdlSGFzaH1gO1xuICBjb25zdCBmb3JtID0gY3JlYXRlRm9ybShwYXlsb2FkKTtcbiAgcmV0dXJuIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UoXG4gICAgYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiBmb3JtLFxuICAgICAgLy8gcmVzb2x2ZUJvZHlPbmx5OiB0cnVlLFxuICAgIH0pXG4gICkgYXMgSW1ndXJBcGlSZXNwb25zZTxib29sZWFuPjtcbn1cbiIsImltcG9ydCB7IEltZ3VyQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7XG4gIGNyZWF0ZUZvcm0sXG4gIGdldEltZ3VyQXBpUmVzcG9uc2VGcm9tUmVzcG9uc2UsXG4gIC8vIGdldFNvdXJjZSxcbn0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IFBheWxvYWQsIEltZ3VyQXBpUmVzcG9uc2UsIEltYWdlRGF0YSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBVUExPQURfRU5EUE9JTlQgfSBmcm9tICcuLi9jb21tb24vZW5kcG9pbnRzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZChcbiAgY2xpZW50OiBJbWd1ckNsaWVudCxcbiAgcGF5bG9hZDogc3RyaW5nIHwgc3RyaW5nW10gfCBQYXlsb2FkIHwgUGF5bG9hZFtdXG4pOiBQcm9taXNlPEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPiB8IEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPltdPiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBheWxvYWQpKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBwYXlsb2FkLm1hcCgocDogc3RyaW5nIHwgUGF5bG9hZCkgPT4ge1xuICAgICAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0ocCk7XG5cbiAgICAgIC8qIGVzbGludCBuby1hc3luYy1wcm9taXNlLWV4ZWN1dG9yOiAwICovXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKFxuICAgICAgICAgICAgYXdhaXQgY2xpZW50LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6IFVQTE9BRF9FTkRQT0lOVCxcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGRhdGE6IGZvcm0sXG4gICAgICAgICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IChwcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBwcm9ncmVzc0V2ZW50IH0pO1xuICAgICAgICAgICAgICAgIGNsaWVudC5lbWl0KCd1cGxvYWRQcm9ncmVzcycsIHsgLi4ucHJvZ3Jlc3NFdmVudCB9KTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSBhcyBJbWd1ckFwaVJlc3BvbnNlPEltYWdlRGF0YT5cbiAgICAgICAgKTtcbiAgICAgIH0pIGFzIFByb21pc2U8SW1ndXJBcGlSZXNwb25zZTxJbWFnZURhdGE+PjtcbiAgICB9KTtcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgY29uc3QgZm9ybSA9IGNyZWF0ZUZvcm0ocGF5bG9hZCk7XG4gIC8vIGNvbnN0IGlkID0gRGF0ZS5ub3cudG9TdHJpbmcoKTtcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGNsaWVudC5yZXF1ZXN0KHtcbiAgICB1cmw6IFVQTE9BRF9FTkRQT0lOVCxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBkYXRhOiBmb3JtLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IChwcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh7IHByb2dyZXNzRXZlbnQgfSk7XG4gICAgICBjbGllbnQuZW1pdCgndXBsb2FkUHJvZ3Jlc3MnLCB7IC4uLnByb2dyZXNzRXZlbnQgfSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICBnZXRJbWd1ckFwaVJlc3BvbnNlRnJvbVJlc3BvbnNlKHJlcXVlc3QpIGFzIEltZ3VyQXBpUmVzcG9uc2U8SW1hZ2VEYXRhPlxuICApO1xufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY3JlYXRlQmluZGluZyhvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZSB2MS4zLjIgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJlxuXHRcdCFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHQhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKFxuXHRcdGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLnNlbGYgPT09IGZyZWVHbG9iYWxcblx0KSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXlxceDIwLVxceDdFXS8sIC8vIHVucHJpbnRhYmxlIEFTQ0lJIGNoYXJzICsgbm9uLUFTQ0lJIGNoYXJzXG5cdHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2csIC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuXHQvKiogRXJyb3IgbWVzc2FnZXMgKi9cblx0ZXJyb3JzID0ge1xuXHRcdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdFx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0XHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xuXHR9LFxuXG5cdC8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cblx0YmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluLFxuXHRmbG9vciA9IE1hdGguZmxvb3IsXG5cdHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUsXG5cblx0LyoqIFRlbXBvcmFyeSB2YXJpYWJsZSAqL1xuXHRrZXk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cblx0ICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZXJyb3IodHlwZSkge1xuXHRcdHRocm93IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG5cdCAqIGl0ZW0uXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdHJlc3VsdFtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG5cdCAqIGFkZHJlc3Nlcy5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5XG5cdCAqIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcblx0ICogZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHRcdHZhciBwYXJ0cyA9IHN0cmluZy5zcGxpdCgnQCcpO1xuXHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdFx0Ly8gSW4gZW1haWwgYWRkcmVzc2VzLCBvbmx5IHRoZSBkb21haW4gbmFtZSBzaG91bGQgYmUgcHVueWNvZGVkLiBMZWF2ZVxuXHRcdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdFx0c3RyaW5nID0gcGFydHNbMV07XG5cdFx0fVxuXHRcdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleFNlcGFyYXRvcnMsICdcXHgyRScpO1xuXHRcdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0XHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdFx0cmV0dXJuIHJlc3VsdCArIGVuY29kZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG5cdCAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG5cdCAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuXHQgKiBtYXRjaGluZyBVVEYtMTYuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuXHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZGVjb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBjb3VudGVyID0gMCxcblx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHQgICAgdmFsdWUsXG5cdFx0ICAgIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBlbmNvZGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdCAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG5cdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gMjI7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gNjU7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gOTc7XG5cdFx0fVxuXHRcdHJldHVybiBiYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdCAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuXHQgKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuXHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0XHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdCAqIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuMy4yJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAoa2V5IGluIHB1bnljb2RlKSB7XG5cdFx0XHRcdHB1bnljb2RlLmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBwdW55Y29kZVtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuZXhwb3J0cy5VcmwgPSBVcmw7XG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMuaG9zdCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLnBhdGhuYW1lID0gbnVsbDtcbiAgdGhpcy5wYXRoID0gbnVsbDtcbiAgdGhpcy5ocmVmID0gbnVsbDtcbn1cblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSBzaW1wbGUgcGF0aCBVUkxcbiAgICBzaW1wbGVQYXRoUGF0dGVybiA9IC9eKFxcL1xcLz8oPyFcXC8pW15cXD9cXHNdKikoXFw/W15cXHNdKik/JC8sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyByZXNlcnZlZCBmb3IgZGVsaW1pdGluZyBVUkxzLlxuICAgIC8vIFdlIGFjdHVhbGx5IGp1c3QgYXV0by1lc2NhcGUgdGhlc2UuXG4gICAgZGVsaW1zID0gWyc8JywgJz4nLCAnXCInLCAnYCcsICcgJywgJ1xccicsICdcXG4nLCAnXFx0J10sXG5cbiAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyBub3QgYWxsb3dlZCBmb3IgdmFyaW91cyByZWFzb25zLlxuICAgIHVud2lzZSA9IFsneycsICd9JywgJ3wnLCAnXFxcXCcsICdeJywgJ2AnXS5jb25jYXQoZGVsaW1zKSxcblxuICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cbiAgICBhdXRvRXNjYXBlID0gWydcXCcnXS5jb25jYXQodW53aXNlKSxcbiAgICAvLyBDaGFyYWN0ZXJzIHRoYXQgYXJlIG5ldmVyIGV2ZXIgYWxsb3dlZCBpbiBhIGhvc3RuYW1lLlxuICAgIC8vIE5vdGUgdGhhdCBhbnkgaW52YWxpZCBjaGFycyBhcmUgYWxzbyBoYW5kbGVkLCBidXQgdGhlc2VcbiAgICAvLyBhcmUgdGhlIG9uZXMgdGhhdCBhcmUgKmV4cGVjdGVkKiB0byBiZSBzZWVuLCBzbyB3ZSBmYXN0LXBhdGhcbiAgICAvLyB0aGVtLlxuICAgIG5vbkhvc3RDaGFycyA9IFsnJScsICcvJywgJz8nLCAnOycsICcjJ10uY29uY2F0KGF1dG9Fc2NhcGUpLFxuICAgIGhvc3RFbmRpbmdDaGFycyA9IFsnLycsICc/JywgJyMnXSxcbiAgICBob3N0bmFtZU1heExlbiA9IDI1NSxcbiAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bK2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oWythLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIHVuc2FmZVByb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuICAgIGhvc3RsZXNzUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIC8vIGJpdC5cbiAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG4gICAgICAnaHR0cCc6IHRydWUsXG4gICAgICAnaHR0cHMnOiB0cnVlLFxuICAgICAgJ2Z0cCc6IHRydWUsXG4gICAgICAnZ29waGVyJzogdHJ1ZSxcbiAgICAgICdmaWxlJzogdHJ1ZSxcbiAgICAgICdodHRwOic6IHRydWUsXG4gICAgICAnaHR0cHM6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuZnVuY3Rpb24gdXJsUGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAodXJsICYmIHV0aWwuaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCF1dGlsLmlzU3RyaW5nKHVybCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGFyYW1ldGVyICd1cmwnIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiB1cmwpO1xuICB9XG5cbiAgLy8gQ29weSBjaHJvbWUsIElFLCBvcGVyYSBiYWNrc2xhc2gtaGFuZGxpbmcgYmVoYXZpb3IuXG4gIC8vIEJhY2sgc2xhc2hlcyBiZWZvcmUgdGhlIHF1ZXJ5IHN0cmluZyBnZXQgY29udmVydGVkIHRvIGZvcndhcmQgc2xhc2hlc1xuICAvLyBTZWU6IGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0yNTkxNlxuICB2YXIgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/JyksXG4gICAgICBzcGxpdHRlciA9XG4gICAgICAgICAgKHF1ZXJ5SW5kZXggIT09IC0xICYmIHF1ZXJ5SW5kZXggPCB1cmwuaW5kZXhPZignIycpKSA/ICc/JyA6ICcjJyxcbiAgICAgIHVTcGxpdCA9IHVybC5zcGxpdChzcGxpdHRlciksXG4gICAgICBzbGFzaFJlZ2V4ID0gL1xcXFwvZztcbiAgdVNwbGl0WzBdID0gdVNwbGl0WzBdLnJlcGxhY2Uoc2xhc2hSZWdleCwgJy8nKTtcbiAgdXJsID0gdVNwbGl0LmpvaW4oc3BsaXR0ZXIpO1xuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIGlmICghc2xhc2hlc0Rlbm90ZUhvc3QgJiYgdXJsLnNwbGl0KCcjJykubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gVHJ5IGZhc3QgcGF0aCByZWdleHBcbiAgICB2YXIgc2ltcGxlUGF0aCA9IHNpbXBsZVBhdGhQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gICAgaWYgKHNpbXBsZVBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHJlc3Q7XG4gICAgICB0aGlzLmhyZWYgPSByZXN0O1xuICAgICAgdGhpcy5wYXRobmFtZSA9IHNpbXBsZVBhdGhbMV07XG4gICAgICBpZiAoc2ltcGxlUGF0aFsyXSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNpbXBsZVBhdGhbMl07XG4gICAgICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMuc2VhcmNoLnN1YnN0cigxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuc2VhcmNoLnN1YnN0cigxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55Y29kZWQgcmVwcmVzZW50YXRpb24gb2YgXCJkb21haW5cIi5cbiAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcbiAgICAgIC8vIGhhdmUgbm9uLUFTQ0lJIGNoYXJhY3RlcnMsIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWZcbiAgICAgIC8vIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCBhbHJlYWR5IGlzIEFTQ0lJLW9ubHkuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gcHVueWNvZGUudG9BU0NJSSh0aGlzLmhvc3RuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICBpZiAocmVzdC5pbmRleE9mKGFlKSA9PT0gLTEpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG4gICAgICBpZiAoZXNjID09PSBhZSkge1xuICAgICAgICBlc2MgPSBlc2NhcGUoYWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHJlc3Quc3BsaXQoYWUpLmpvaW4oZXNjKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHRoaXMucXVlcnkgPSByZXN0LnN1YnN0cihxbSArIDEpO1xuICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG4gICAgfVxuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgLy8gbm8gcXVlcnkgc3RyaW5nLCBidXQgcGFyc2VRdWVyeVN0cmluZyBzdGlsbCByZXF1ZXN0ZWRcbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgdGhpcy5wYXRobmFtZSA9IHJlc3Q7XG4gIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcbiAgICAgIHRoaXMuaG9zdG5hbWUgJiYgIXRoaXMucGF0aG5hbWUpIHtcbiAgICB0aGlzLnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuICAgIHZhciBwID0gdGhpcy5wYXRobmFtZSB8fCAnJztcbiAgICB2YXIgcyA9IHRoaXMuc2VhcmNoIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIHRoaXMuaHJlZiA9IHRoaXMuZm9ybWF0KCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9ybWF0IGEgcGFyc2VkIG9iamVjdCBpbnRvIGEgdXJsIHN0cmluZ1xuZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuICAvLyBlbnN1cmUgaXQncyBhbiBvYmplY3QsIGFuZCBub3QgYSBzdHJpbmcgdXJsLlxuICAvLyBJZiBpdCdzIGFuIG9iaiwgdGhpcyBpcyBhIG5vLW9wLlxuICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG4gIC8vIHRvIGNsZWFuIHVwIHBvdGVudGlhbGx5IHdvbmt5IHVybHMuXG4gIGlmICh1dGlsLmlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIHV0aWwuaXNPYmplY3QodGhpcy5xdWVyeSkgJiZcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMucXVlcnkpLmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMucXVlcnkpO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgLy8gb25seSB0aGUgc2xhc2hlZFByb3RvY29scyBnZXQgdGhlIC8vLiAgTm90IG1haWx0bzosIHhtcHA6LCBldGMuXG4gIC8vIHVubGVzcyB0aGV5IGhhZCB0aGVtIHRvIGJlZ2luIHdpdGguXG4gIGlmICh0aGlzLnNsYXNoZXMgfHxcbiAgICAgICghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29sW3Byb3RvY29sXSkgJiYgaG9zdCAhPT0gZmFsc2UpIHtcbiAgICBob3N0ID0gJy8vJyArIChob3N0IHx8ICcnKTtcbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWU7XG4gIH0gZWxzZSBpZiAoIWhvc3QpIHtcbiAgICBob3N0ID0gJyc7XG4gIH1cblxuICBpZiAoaGFzaCAmJiBoYXNoLmNoYXJBdCgwKSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaDtcbiAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKCcjJywgJyUyMycpO1xuXG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlKHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmUocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmUgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICByZXR1cm4gdGhpcy5yZXNvbHZlT2JqZWN0KHVybFBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSkpLmZvcm1hdCgpO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZU9iamVjdChzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIGlmICghc291cmNlKSByZXR1cm4gcmVsYXRpdmU7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlT2JqZWN0KHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlT2JqZWN0ID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgaWYgKHV0aWwuaXNTdHJpbmcocmVsYXRpdmUpKSB7XG4gICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcbiAgICByZWwucGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKTtcbiAgICByZWxhdGl2ZSA9IHJlbDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVXJsKCk7XG4gIHZhciB0a2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICBmb3IgKHZhciB0ayA9IDA7IHRrIDwgdGtleXMubGVuZ3RoOyB0aysrKSB7XG4gICAgdmFyIHRrZXkgPSB0a2V5c1t0a107XG4gICAgcmVzdWx0W3RrZXldID0gdGhpc1t0a2V5XTtcbiAgfVxuXG4gIC8vIGhhc2ggaXMgYWx3YXlzIG92ZXJyaWRkZW4sIG5vIG1hdHRlciB3aGF0LlxuICAvLyBldmVuIGhyZWY9XCJcIiB3aWxsIHJlbW92ZSBpdC5cbiAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIC8vIGlmIHRoZSByZWxhdGl2ZSB1cmwgaXMgZW1wdHksIHRoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG8gaGVyZS5cbiAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAvLyB0YWtlIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBwcm90b2NvbCBmcm9tIHJlbGF0aXZlXG4gICAgdmFyIHJrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgIGZvciAodmFyIHJrID0gMDsgcmsgPCBya2V5cy5sZW5ndGg7IHJrKyspIHtcbiAgICAgIHZhciBya2V5ID0gcmtleXNbcmtdO1xuICAgICAgaWYgKHJrZXkgIT09ICdwcm90b2NvbCcpXG4gICAgICAgIHJlc3VsdFtya2V5XSA9IHJlbGF0aXZlW3JrZXldO1xuICAgIH1cblxuICAgIC8vdXJsUGFyc2UgYXBwZW5kcyB0cmFpbGluZyAvIHRvIHVybHMgbGlrZSBodHRwOi8vd3d3LmV4YW1wbGUuY29tXG4gICAgaWYgKHNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdICYmXG4gICAgICAgIHJlc3VsdC5ob3N0bmFtZSAmJiAhcmVzdWx0LnBhdGhuYW1lKSB7XG4gICAgICByZXN1bHQucGF0aCA9IHJlc3VsdC5wYXRobmFtZSA9ICcvJztcbiAgICB9XG5cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKHJlbGF0aXZlLnByb3RvY29sICYmIHJlbGF0aXZlLnByb3RvY29sICE9PSByZXN1bHQucHJvdG9jb2wpIHtcbiAgICAvLyBpZiBpdCdzIGEga25vd24gdXJsIHByb3RvY29sLCB0aGVuIGNoYW5naW5nXG4gICAgLy8gdGhlIHByb3RvY29sIGRvZXMgd2VpcmQgdGhpbmdzXG4gICAgLy8gZmlyc3QsIGlmIGl0J3Mgbm90IGZpbGU6LCB0aGVuIHdlIE1VU1QgaGF2ZSBhIGhvc3QsXG4gICAgLy8gYW5kIGlmIHRoZXJlIHdhcyBhIHBhdGhcbiAgICAvLyB0byBiZWdpbiB3aXRoLCB0aGVuIHdlIE1VU1QgaGF2ZSBhIHBhdGguXG4gICAgLy8gaWYgaXQgaXMgZmlsZTosIHRoZW4gdGhlIGhvc3QgaXMgZHJvcHBlZCxcbiAgICAvLyBiZWNhdXNlIHRoYXQncyBrbm93biB0byBiZSBob3N0bGVzcy5cbiAgICAvLyBhbnl0aGluZyBlbHNlIGlzIGFzc3VtZWQgdG8gYmUgYWJzb2x1dGUuXG4gICAgaWYgKCFzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICAgIGZvciAodmFyIHYgPSAwOyB2IDwga2V5cy5sZW5ndGg7IHYrKykge1xuICAgICAgICB2YXIgayA9IGtleXNbdl07XG4gICAgICAgIHJlc3VsdFtrXSA9IHJlbGF0aXZlW2tdO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghdXRpbC5pc051bGxPclVuZGVmaW5lZChyZWxhdGl2ZS5zZWFyY2gpKSB7XG4gICAgLy8ganVzdCBwdWxsIG91dCB0aGUgc2VhcmNoLlxuICAgIC8vIGxpa2UgaHJlZj0nP2ZvbycuXG4gICAgLy8gUHV0IHRoaXMgYWZ0ZXIgdGhlIG90aGVyIHR3byBjYXNlcyBiZWNhdXNlIGl0IHNpbXBsaWZpZXMgdGhlIGJvb2xlYW5zXG4gICAgaWYgKHBzeWNob3RpYykge1xuICAgICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBzcmNQYXRoLnNoaWZ0KCk7XG4gICAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuICAgICAgcmVzdWx0LnBhdGggPSAnLycgKyByZXN1bHQuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgLy8gaG93ZXZlciwgaWYgaXQgZW5kcyBpbiBhbnl0aGluZyBlbHNlIG5vbi1zbGFzaHksXG4gIC8vIHRoZW4gaXQgbXVzdCBOT1QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gKFxuICAgICAgKHJlc3VsdC5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgfHwgc3JjUGF0aC5sZW5ndGggPiAxKSAmJlxuICAgICAgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fCBsYXN0ID09PSAnJyk7XG5cbiAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGFzdCA9IHNyY1BhdGhbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzIHx8IChyZXN1bHQuaG9zdCAmJiBzcmNQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IHJlcXVlc3QuaHR0cFxuICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgfVxuICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGggfHwgcmVzdWx0LmF1dGg7XG4gIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5VcmwucHJvdG90eXBlLnBhcnNlSG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgdmFyIHBvcnQgPSBwb3J0UGF0dGVybi5leGVjKGhvc3QpO1xuICBpZiAocG9ydCkge1xuICAgIHBvcnQgPSBwb3J0WzBdO1xuICAgIGlmIChwb3J0ICE9PSAnOicpIHtcbiAgICAgIHRoaXMucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIHRoaXMuaG9zdG5hbWUgPSBob3N0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzU3RyaW5nOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdzdHJpbmcnO1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsT3JVbmRlZmluZWQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT0gbnVsbDtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDdXJyZW50bHkgaW4gc3luYyB3aXRoIE5vZGUuanMgbGliL2ludGVybmFsL3V0aWwvdHlwZXMuanNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9jb21taXQvMTEyY2M3YzI3NTUxMjU0YWEyYjE3MDk4ZmI3NzQ4NjdmMDVlZDBkOVxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc0FyZ3VtZW50c09iamVjdCA9IHJlcXVpcmUoJ2lzLWFyZ3VtZW50cycpO1xudmFyIGlzR2VuZXJhdG9yRnVuY3Rpb24gPSByZXF1aXJlKCdpcy1nZW5lcmF0b3ItZnVuY3Rpb24nKTtcbnZhciB3aGljaFR5cGVkQXJyYXkgPSByZXF1aXJlKCd3aGljaC10eXBlZC1hcnJheScpO1xudmFyIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2lzLXR5cGVkLWFycmF5Jyk7XG5cbmZ1bmN0aW9uIHVuY3VycnlUaGlzKGYpIHtcbiAgcmV0dXJuIGYuY2FsbC5iaW5kKGYpO1xufVxuXG52YXIgQmlnSW50U3VwcG9ydGVkID0gdHlwZW9mIEJpZ0ludCAhPT0gJ3VuZGVmaW5lZCc7XG52YXIgU3ltYm9sU3VwcG9ydGVkID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBPYmplY3RUb1N0cmluZyA9IHVuY3VycnlUaGlzKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpO1xuXG52YXIgbnVtYmVyVmFsdWUgPSB1bmN1cnJ5VGhpcyhOdW1iZXIucHJvdG90eXBlLnZhbHVlT2YpO1xudmFyIHN0cmluZ1ZhbHVlID0gdW5jdXJyeVRoaXMoU3RyaW5nLnByb3RvdHlwZS52YWx1ZU9mKTtcbnZhciBib29sZWFuVmFsdWUgPSB1bmN1cnJ5VGhpcyhCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mKTtcblxuaWYgKEJpZ0ludFN1cHBvcnRlZCkge1xuICB2YXIgYmlnSW50VmFsdWUgPSB1bmN1cnJ5VGhpcyhCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YpO1xufVxuXG5pZiAoU3ltYm9sU3VwcG9ydGVkKSB7XG4gIHZhciBzeW1ib2xWYWx1ZSA9IHVuY3VycnlUaGlzKFN5bWJvbC5wcm90b3R5cGUudmFsdWVPZik7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHByb3RvdHlwZVZhbHVlT2YpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICBwcm90b3R5cGVWYWx1ZU9mKHZhbHVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydHMuaXNBcmd1bWVudHNPYmplY3QgPSBpc0FyZ3VtZW50c09iamVjdDtcbmV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGlzR2VuZXJhdG9yRnVuY3Rpb247XG5leHBvcnRzLmlzVHlwZWRBcnJheSA9IGlzVHlwZWRBcnJheTtcblxuLy8gVGFrZW4gZnJvbSBoZXJlIGFuZCBtb2RpZmllZCBmb3IgYmV0dGVyIGJyb3dzZXIgc3VwcG9ydFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9wLWlzLXByb21pc2UvYmxvYi9jZGEzNWE1MTNiZGEwM2Y5NzdhZDVjZGUzYTA3OWQyMzdlODJkN2VmL2luZGV4LmpzXG5mdW5jdGlvbiBpc1Byb21pc2UoaW5wdXQpIHtcblx0cmV0dXJuIChcblx0XHQoXG5cdFx0XHR0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdGlucHV0IGluc3RhbmNlb2YgUHJvbWlzZVxuXHRcdCkgfHxcblx0XHQoXG5cdFx0XHRpbnB1dCAhPT0gbnVsbCAmJlxuXHRcdFx0dHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0dHlwZW9mIGlucHV0LnRoZW4gPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdHR5cGVvZiBpbnB1dC5jYXRjaCA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdClcblx0KTtcbn1cbmV4cG9ydHMuaXNQcm9taXNlID0gaXNQcm9taXNlO1xuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgaXNUeXBlZEFycmF5KHZhbHVlKSB8fFxuICAgIGlzRGF0YVZpZXcodmFsdWUpXG4gICk7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXJWaWV3ID0gaXNBcnJheUJ1ZmZlclZpZXc7XG5cblxuZnVuY3Rpb24gaXNVaW50OEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDhBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDhBcnJheSA9IGlzVWludDhBcnJheTtcblxuZnVuY3Rpb24gaXNVaW50OENsYW1wZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ1VpbnQ4Q2xhbXBlZEFycmF5Jztcbn1cbmV4cG9ydHMuaXNVaW50OENsYW1wZWRBcnJheSA9IGlzVWludDhDbGFtcGVkQXJyYXk7XG5cbmZ1bmN0aW9uIGlzVWludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdVaW50MTZBcnJheSc7XG59XG5leHBvcnRzLmlzVWludDE2QXJyYXkgPSBpc1VpbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc1VpbnQzMkFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnVWludDMyQXJyYXknO1xufVxuZXhwb3J0cy5pc1VpbnQzMkFycmF5ID0gaXNVaW50MzJBcnJheTtcblxuZnVuY3Rpb24gaXNJbnQ4QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQ4QXJyYXknO1xufVxuZXhwb3J0cy5pc0ludDhBcnJheSA9IGlzSW50OEFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDE2QXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQxNkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQxNkFycmF5ID0gaXNJbnQxNkFycmF5O1xuXG5mdW5jdGlvbiBpc0ludDMyQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkgPT09ICdJbnQzMkFycmF5Jztcbn1cbmV4cG9ydHMuaXNJbnQzMkFycmF5ID0gaXNJbnQzMkFycmF5O1xuXG5mdW5jdGlvbiBpc0Zsb2F0MzJBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0Zsb2F0MzJBcnJheSc7XG59XG5leHBvcnRzLmlzRmxvYXQzMkFycmF5ID0gaXNGbG9hdDMyQXJyYXk7XG5cbmZ1bmN0aW9uIGlzRmxvYXQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnRmxvYXQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNGbG9hdDY0QXJyYXkgPSBpc0Zsb2F0NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdJbnQ2NEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiB3aGljaFR5cGVkQXJyYXkodmFsdWUpID09PSAnQmlnSW50NjRBcnJheSc7XG59XG5leHBvcnRzLmlzQmlnSW50NjRBcnJheSA9IGlzQmlnSW50NjRBcnJheTtcblxuZnVuY3Rpb24gaXNCaWdVaW50NjRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gd2hpY2hUeXBlZEFycmF5KHZhbHVlKSA9PT0gJ0JpZ1VpbnQ2NEFycmF5Jztcbn1cbmV4cG9ydHMuaXNCaWdVaW50NjRBcnJheSA9IGlzQmlnVWludDY0QXJyYXk7XG5cbmZ1bmN0aW9uIGlzTWFwVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgTWFwXSc7XG59XG5pc01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzTWFwVG9TdHJpbmcobmV3IE1hcCgpKVxuKTtcblxuZnVuY3Rpb24gaXNNYXAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzTWFwVG9TdHJpbmcud29ya2luZ1xuICAgID8gaXNNYXBUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgTWFwO1xufVxuZXhwb3J0cy5pc01hcCA9IGlzTWFwO1xuXG5mdW5jdGlvbiBpc1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFNldF0nO1xufVxuaXNTZXRUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1NldFRvU3RyaW5nKG5ldyBTZXQoKSlcbik7XG5mdW5jdGlvbiBpc1NldCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNTZXRUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NldFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBTZXQ7XG59XG5leHBvcnRzLmlzU2V0ID0gaXNTZXQ7XG5cbmZ1bmN0aW9uIGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtNYXBdJztcbn1cbmlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtNYXBUb1N0cmluZyhuZXcgV2Vha01hcCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha01hcCh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzV2Vha01hcFRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzV2Vha01hcFRvU3RyaW5nKHZhbHVlKVxuICAgIDogdmFsdWUgaW5zdGFuY2VvZiBXZWFrTWFwO1xufVxuZXhwb3J0cy5pc1dlYWtNYXAgPSBpc1dlYWtNYXA7XG5cbmZ1bmN0aW9uIGlzV2Vha1NldFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IFdlYWtTZXRdJztcbn1cbmlzV2Vha1NldFRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBXZWFrU2V0ICE9PSAndW5kZWZpbmVkJyAmJlxuICBpc1dlYWtTZXRUb1N0cmluZyhuZXcgV2Vha1NldCgpKVxuKTtcbmZ1bmN0aW9uIGlzV2Vha1NldCh2YWx1ZSkge1xuICByZXR1cm4gaXNXZWFrU2V0VG9TdHJpbmcodmFsdWUpO1xufVxuZXhwb3J0cy5pc1dlYWtTZXQgPSBpc1dlYWtTZXQ7XG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmcgPSAoXG4gIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNBcnJheUJ1ZmZlclRvU3RyaW5nKG5ldyBBcnJheUJ1ZmZlcigpKVxuKTtcbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNBcnJheUJ1ZmZlclRvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzQXJyYXlCdWZmZXJUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59XG5leHBvcnRzLmlzQXJyYXlCdWZmZXIgPSBpc0FycmF5QnVmZmVyO1xuXG5mdW5jdGlvbiBpc0RhdGFWaWV3VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0YVZpZXddJztcbn1cbmlzRGF0YVZpZXdUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBEYXRhVmlldyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgaXNEYXRhVmlld1RvU3RyaW5nKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSksIDAsIDEpKVxuKTtcbmZ1bmN0aW9uIGlzRGF0YVZpZXcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNEYXRhVmlld1RvU3RyaW5nLndvcmtpbmdcbiAgICA/IGlzRGF0YVZpZXdUb1N0cmluZyh2YWx1ZSlcbiAgICA6IHZhbHVlIGluc3RhbmNlb2YgRGF0YVZpZXc7XG59XG5leHBvcnRzLmlzRGF0YVZpZXcgPSBpc0RhdGFWaWV3O1xuXG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgU2hhcmVkQXJyYXlCdWZmZXJdJztcbn1cbmlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZy53b3JraW5nID0gKFxuICB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZyhuZXcgU2hhcmVkQXJyYXlCdWZmZXIoKSlcbik7XG5mdW5jdGlvbiBpc1NoYXJlZEFycmF5QnVmZmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzU2hhcmVkQXJyYXlCdWZmZXJUb1N0cmluZy53b3JraW5nXG4gICAgPyBpc1NoYXJlZEFycmF5QnVmZmVyVG9TdHJpbmcodmFsdWUpXG4gICAgOiB2YWx1ZSBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyO1xufVxuZXhwb3J0cy5pc1NoYXJlZEFycmF5QnVmZmVyID0gaXNTaGFyZWRBcnJheUJ1ZmZlcjtcblxuZnVuY3Rpb24gaXNBc3luY0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJztcbn1cbmV4cG9ydHMuaXNBc3luY0Z1bmN0aW9uID0gaXNBc3luY0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc01hcEl0ZXJhdG9yKHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IE1hcCBJdGVyYXRvcl0nO1xufVxuZXhwb3J0cy5pc01hcEl0ZXJhdG9yID0gaXNNYXBJdGVyYXRvcjtcblxuZnVuY3Rpb24gaXNTZXRJdGVyYXRvcih2YWx1ZSkge1xuICByZXR1cm4gT2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSAnW29iamVjdCBTZXQgSXRlcmF0b3JdJztcbn1cbmV4cG9ydHMuaXNTZXRJdGVyYXRvciA9IGlzU2V0SXRlcmF0b3I7XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBPYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09ICdbb2JqZWN0IEdlbmVyYXRvcl0nO1xufVxuZXhwb3J0cy5pc0dlbmVyYXRvck9iamVjdCA9IGlzR2VuZXJhdG9yT2JqZWN0O1xuXG5mdW5jdGlvbiBpc1dlYkFzc2VtYmx5Q29tcGlsZWRNb2R1bGUodmFsdWUpIHtcbiAgcmV0dXJuIE9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gJ1tvYmplY3QgV2ViQXNzZW1ibHkuTW9kdWxlXSc7XG59XG5leHBvcnRzLmlzV2ViQXNzZW1ibHlDb21waWxlZE1vZHVsZSA9IGlzV2ViQXNzZW1ibHlDb21waWxlZE1vZHVsZTtcblxuZnVuY3Rpb24gaXNOdW1iZXJPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIG51bWJlclZhbHVlKTtcbn1cbmV4cG9ydHMuaXNOdW1iZXJPYmplY3QgPSBpc051bWJlck9iamVjdDtcblxuZnVuY3Rpb24gaXNTdHJpbmdPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHN0cmluZ1ZhbHVlKTtcbn1cbmV4cG9ydHMuaXNTdHJpbmdPYmplY3QgPSBpc1N0cmluZ09iamVjdDtcblxuZnVuY3Rpb24gaXNCb29sZWFuT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjaGVja0JveGVkUHJpbWl0aXZlKHZhbHVlLCBib29sZWFuVmFsdWUpO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW5PYmplY3QgPSBpc0Jvb2xlYW5PYmplY3Q7XG5cbmZ1bmN0aW9uIGlzQmlnSW50T2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBCaWdJbnRTdXBwb3J0ZWQgJiYgY2hlY2tCb3hlZFByaW1pdGl2ZSh2YWx1ZSwgYmlnSW50VmFsdWUpO1xufVxuZXhwb3J0cy5pc0JpZ0ludE9iamVjdCA9IGlzQmlnSW50T2JqZWN0O1xuXG5mdW5jdGlvbiBpc1N5bWJvbE9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gU3ltYm9sU3VwcG9ydGVkICYmIGNoZWNrQm94ZWRQcmltaXRpdmUodmFsdWUsIHN5bWJvbFZhbHVlKTtcbn1cbmV4cG9ydHMuaXNTeW1ib2xPYmplY3QgPSBpc1N5bWJvbE9iamVjdDtcblxuZnVuY3Rpb24gaXNCb3hlZFByaW1pdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIGlzTnVtYmVyT2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzU3RyaW5nT2JqZWN0KHZhbHVlKSB8fFxuICAgIGlzQm9vbGVhbk9iamVjdCh2YWx1ZSkgfHxcbiAgICBpc0JpZ0ludE9iamVjdCh2YWx1ZSkgfHxcbiAgICBpc1N5bWJvbE9iamVjdCh2YWx1ZSlcbiAgKTtcbn1cbmV4cG9ydHMuaXNCb3hlZFByaW1pdGl2ZSA9IGlzQm94ZWRQcmltaXRpdmU7XG5cbmZ1bmN0aW9uIGlzQW55QXJyYXlCdWZmZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiAoXG4gICAgaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHxcbiAgICBpc1NoYXJlZEFycmF5QnVmZmVyKHZhbHVlKVxuICApO1xufVxuZXhwb3J0cy5pc0FueUFycmF5QnVmZmVyID0gaXNBbnlBcnJheUJ1ZmZlcjtcblxuWydpc1Byb3h5JywgJ2lzRXh0ZXJuYWwnLCAnaXNNb2R1bGVOYW1lc3BhY2VPYmplY3QnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbWV0aG9kLCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1ldGhvZCArICcgaXMgbm90IHN1cHBvcnRlZCBpbiB1c2VybGFuZCcpO1xuICAgIH1cbiAgfSk7XG59KTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIHx8XG4gIGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIHZhciBkZXNjcmlwdG9ycyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgZGVzY3JpcHRvcnNba2V5c1tpXV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBkZXNjcmlwdG9ycztcbiAgfTtcblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZSZWdleCA9IC9eJC87XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSB7XG4gIHZhciBkZWJ1Z0VudiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUc7XG4gIGRlYnVnRW52ID0gZGVidWdFbnYucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCs/Ll0vZywgJ1xcXFwkJicpXG4gICAgLnJlcGxhY2UoL1xcKi9nLCAnLionKVxuICAgIC5yZXBsYWNlKC8sL2csICckfF4nKVxuICAgIC50b1VwcGVyQ2FzZSgpO1xuICBkZWJ1Z0VudlJlZ2V4ID0gbmV3IFJlZ0V4cCgnXicgKyBkZWJ1Z0VudiArICckJywgJ2knKTtcbn1cbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAoZGVidWdFbnZSZWdleC50ZXN0KHNldCkpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZXhwb3J0cy50eXBlcyA9IHJlcXVpcmUoJy4vc3VwcG9ydC90eXBlcycpO1xuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuZXhwb3J0cy50eXBlcy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcbmV4cG9ydHMudHlwZXMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5leHBvcnRzLnR5cGVzLmlzTmF0aXZlRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG52YXIga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2woJ3V0aWwucHJvbWlzaWZ5LmN1c3RvbScpIDogdW5kZWZpbmVkO1xuXG5leHBvcnRzLnByb21pc2lmeSA9IGZ1bmN0aW9uIHByb21pc2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9yaWdpbmFsXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG5cbiAgaWYgKGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCAmJiBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdKSB7XG4gICAgdmFyIGZuID0gb3JpZ2luYWxba0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJ1dGlsLnByb21pc2lmeS5jdXN0b21cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wsIHtcbiAgICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgZnVuY3Rpb24gZm4oKSB7XG4gICAgdmFyIHByb21pc2VSZXNvbHZlLCBwcm9taXNlUmVqZWN0O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcHJvbWlzZVJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgcHJvbWlzZVJlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcblxuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cbiAgICBhcmdzLnB1c2goZnVuY3Rpb24gKGVyciwgdmFsdWUpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZVJlc29sdmUodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcHJvbWlzZVJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGZuLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgIHZhbHVlOiBmbiwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG4gICAgZm4sXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbClcbiAgKTtcbn1cblxuZXhwb3J0cy5wcm9taXNpZnkuY3VzdG9tID0ga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sXG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5T25SZWplY3RlZChyZWFzb24sIGNiKSB7XG4gIC8vIGAhcmVhc29uYCBndWFyZCBpbnNwaXJlZCBieSBibHVlYmlyZCAoUmVmOiBodHRwczovL2dvby5nbC90NUlTNk0pLlxuICAvLyBCZWNhdXNlIGBudWxsYCBpcyBhIHNwZWNpYWwgZXJyb3IgdmFsdWUgaW4gY2FsbGJhY2tzIHdoaWNoIG1lYW5zIFwibm8gZXJyb3JcbiAgLy8gb2NjdXJyZWRcIiwgd2UgZXJyb3Itd3JhcCBzbyB0aGUgY2FsbGJhY2sgY29uc3VtZXIgY2FuIGRpc3Rpbmd1aXNoIGJldHdlZW5cbiAgLy8gXCJ0aGUgcHJvbWlzZSByZWplY3RlZCB3aXRoIG51bGxcIiBvciBcInRoZSBwcm9taXNlIGZ1bGZpbGxlZCB3aXRoIHVuZGVmaW5lZFwiLlxuICBpZiAoIXJlYXNvbikge1xuICAgIHZhciBuZXdSZWFzb24gPSBuZXcgRXJyb3IoJ1Byb21pc2Ugd2FzIHJlamVjdGVkIHdpdGggYSBmYWxzeSB2YWx1ZScpO1xuICAgIG5ld1JlYXNvbi5yZWFzb24gPSByZWFzb247XG4gICAgcmVhc29uID0gbmV3UmVhc29uO1xuICB9XG4gIHJldHVybiBjYihyZWFzb24pO1xufVxuXG5mdW5jdGlvbiBjYWxsYmFja2lmeShvcmlnaW5hbCkge1xuICBpZiAodHlwZW9mIG9yaWdpbmFsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIC8vIFdlIERPIE5PVCByZXR1cm4gdGhlIHByb21pc2UgYXMgaXQgZ2l2ZXMgdGhlIHVzZXIgYSBmYWxzZSBzZW5zZSB0aGF0XG4gIC8vIHRoZSBwcm9taXNlIGlzIGFjdHVhbGx5IHNvbWVob3cgcmVsYXRlZCB0byB0aGUgY2FsbGJhY2sncyBleGVjdXRpb25cbiAgLy8gYW5kIHRoYXQgdGhlIGNhbGxiYWNrIHRocm93aW5nIHdpbGwgcmVqZWN0IHRoZSBwcm9taXNlLlxuICBmdW5jdGlvbiBjYWxsYmFja2lmaWVkKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIHZhciBtYXliZUNiID0gYXJncy5wb3AoKTtcbiAgICBpZiAodHlwZW9mIG1heWJlQ2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsYXN0IGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGNiID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbWF5YmVDYi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgLy8gSW4gdHJ1ZSBub2RlIHN0eWxlIHdlIHByb2Nlc3MgdGhlIGNhbGxiYWNrIG9uIGBuZXh0VGlja2Agd2l0aCBhbGwgdGhlXG4gICAgLy8gaW1wbGljYXRpb25zIChzdGFjaywgYHVuY2F1Z2h0RXhjZXB0aW9uYCwgYGFzeW5jX2hvb2tzYClcbiAgICBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmV0KSB7IHByb2Nlc3MubmV4dFRpY2soY2IuYmluZChudWxsLCBudWxsLCByZXQpKSB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVqKSB7IHByb2Nlc3MubmV4dFRpY2soY2FsbGJhY2tpZnlPblJlamVjdGVkLmJpbmQobnVsbCwgcmVqLCBjYikpIH0pO1xuICB9XG5cbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNhbGxiYWNraWZpZWQsIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjYWxsYmFja2lmaWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKSk7XG4gIHJldHVybiBjYWxsYmFja2lmaWVkO1xufVxuZXhwb3J0cy5jYWxsYmFja2lmeSA9IGNhbGxiYWNraWZ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IHJlcXVpcmUoJ2ZvcmVhY2gnKTtcbnZhciBhdmFpbGFibGVUeXBlZEFycmF5cyA9IHJlcXVpcmUoJ2F2YWlsYWJsZS10eXBlZC1hcnJheXMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gaGFzU3ltYm9scyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxudmFyIHR5cGVkQXJyYXlzID0gYXZhaWxhYmxlVHlwZWRBcnJheXMoKTtcblxudmFyICRzbGljZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5zbGljZScpO1xudmFyIHRvU3RyVGFncyA9IHt9O1xudmFyIGdPUEQgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9oZWxwZXJzL2dldE93blByb3BlcnR5RGVzY3JpcHRvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mOyAvLyByZXF1aXJlKCdnZXRwcm90b3R5cGVvZicpO1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG90eXBlT2YpIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHRpZiAodHlwZW9mIGdsb2JhbFt0eXBlZEFycmF5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dmFyIGFyciA9IG5ldyBnbG9iYWxbdHlwZWRBcnJheV0oKTtcblx0XHRcdGlmICghKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBhcnIpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFdmFsRXJyb3IoJ3RoaXMgZW5naW5lIGhhcyBzdXBwb3J0IGZvciBTeW1ib2wudG9TdHJpbmdUYWcsIGJ1dCAnICsgdHlwZWRBcnJheSArICcgZG9lcyBub3QgaGF2ZSB0aGUgcHJvcGVydHkhIFBsZWFzZSByZXBvcnQgdGhpcy4nKTtcblx0XHRcdH1cblx0XHRcdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGFycik7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IGdPUEQocHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHRpZiAoIWRlc2NyaXB0b3IpIHtcblx0XHRcdFx0dmFyIHN1cGVyUHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90byk7XG5cdFx0XHRcdGRlc2NyaXB0b3IgPSBnT1BEKHN1cGVyUHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHR9XG5cdFx0XHR0b1N0clRhZ3NbdHlwZWRBcnJheV0gPSBkZXNjcmlwdG9yLmdldDtcblx0XHR9XG5cdH0pO1xufVxuXG52YXIgdHJ5VHlwZWRBcnJheXMgPSBmdW5jdGlvbiB0cnlBbGxUeXBlZEFycmF5cyh2YWx1ZSkge1xuXHR2YXIgZm91bmROYW1lID0gZmFsc2U7XG5cdGZvckVhY2godG9TdHJUYWdzLCBmdW5jdGlvbiAoZ2V0dGVyLCB0eXBlZEFycmF5KSB7XG5cdFx0aWYgKCFmb3VuZE5hbWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBuYW1lID0gZ2V0dGVyLmNhbGwodmFsdWUpO1xuXHRcdFx0XHRpZiAobmFtZSA9PT0gdHlwZWRBcnJheSkge1xuXHRcdFx0XHRcdGZvdW5kTmFtZSA9IG5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGZvdW5kTmFtZTtcbn07XG5cbnZhciBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdpcy10eXBlZC1hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkge1xuXHRpZiAoIWlzVHlwZWRBcnJheSh2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHsgcmV0dXJuICRzbGljZSgkdG9TdHJpbmcodmFsdWUpLCA4LCAtMSk7IH1cblx0cmV0dXJuIHRyeVR5cGVkQXJyYXlzKHZhbHVlKTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiZXhwb3J0IHsgSW1ndXJDbGllbnQsIEltZ3VyQ3JlZGVudGlhbHMgfSBmcm9tICcuL2NsaWVudCc7XG4iXSwic291cmNlUm9vdCI6IiJ9
