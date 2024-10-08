'use strict'
;(self.webpackChunkfree_notes_client =
  self.webpackChunkfree_notes_client || []).push([
  [179],
  {
    844: () => {
      function oe(e) {
        return 'function' == typeof e
      }
      function Jo(e) {
        const t = e((r) => {
          Error.call(r), (r.stack = new Error().stack)
        })
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        )
      }
      const Ps = Jo(
        (e) =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t.map((r, o) => `${o + 1}) ${r.toString()}`).join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = t)
          }
      )
      function Ko(e, n) {
        if (e) {
          const t = e.indexOf(n)
          0 <= t && e.splice(t, 1)
        }
      }
      class at {
        constructor(n) {
          ;(this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null)
        }
        unsubscribe() {
          let n
          if (!this.closed) {
            this.closed = !0
            const { _parentage: t } = this
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const i of t) i.remove(this)
              else t.remove(this)
            const { initialTeardown: r } = this
            if (oe(r))
              try {
                r()
              } catch (i) {
                n = i instanceof Ps ? i.errors : [i]
              }
            const { _finalizers: o } = this
            if (o) {
              this._finalizers = null
              for (const i of o)
                try {
                  ip(i)
                } catch (s) {
                  ;(n = n ?? []),
                    s instanceof Ps ? (n = [...n, ...s.errors]) : n.push(s)
                }
            }
            if (n) throw new Ps(n)
          }
        }
        add(n) {
          var t
          if (n && n !== this)
            if (this.closed) ip(n)
            else {
              if (n instanceof at) {
                if (n.closed || n._hasParent(this)) return
                n._addParent(this)
              }
              ;(this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                n
              )
            }
        }
        _hasParent(n) {
          const { _parentage: t } = this
          return t === n || (Array.isArray(t) && t.includes(n))
        }
        _addParent(n) {
          const { _parentage: t } = this
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n
        }
        _removeParent(n) {
          const { _parentage: t } = this
          t === n ? (this._parentage = null) : Array.isArray(t) && Ko(t, n)
        }
        remove(n) {
          const { _finalizers: t } = this
          t && Ko(t, n), n instanceof at && n._removeParent(this)
        }
      }
      at.EMPTY = (() => {
        const e = new at()
        return (e.closed = !0), e
      })()
      const rp = at.EMPTY
      function op(e) {
        return (
          e instanceof at ||
          (e && 'closed' in e && oe(e.remove) && oe(e.add) && oe(e.unsubscribe))
        )
      }
      function ip(e) {
        oe(e) ? e() : e.unsubscribe()
      }
      const ir = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Fs = {
          setTimeout(e, n, ...t) {
            const { delegate: r } = Fs
            return r?.setTimeout
              ? r.setTimeout(e, n, ...t)
              : setTimeout(e, n, ...t)
          },
          clearTimeout(e) {
            const { delegate: n } = Fs
            return (n?.clearTimeout || clearTimeout)(e)
          },
          delegate: void 0,
        }
      function sp(e) {
        Fs.setTimeout(() => {
          const { onUnhandledError: n } = ir
          if (!n) throw e
          n(e)
        })
      }
      function wl() {}
      const eM = bl('C', void 0, void 0)
      function bl(e, n, t) {
        return { kind: e, value: n, error: t }
      }
      let sr = null
      function ks(e) {
        if (ir.useDeprecatedSynchronousErrorHandling) {
          const n = !sr
          if ((n && (sr = { errorThrown: !1, error: null }), e(), n)) {
            const { errorThrown: t, error: r } = sr
            if (((sr = null), t)) throw r
          }
        } else e()
      }
      class Ls extends at {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n
              ? ((this.destination = n), op(n) && n.add(this))
              : (this.destination = aM)
        }
        static create(n, t, r) {
          return new ei(n, t, r)
        }
        next(n) {
          this.isStopped
            ? Ml(
                (function nM(e) {
                  return bl('N', e, void 0)
                })(n),
                this
              )
            : this._next(n)
        }
        error(n) {
          this.isStopped
            ? Ml(
                (function tM(e) {
                  return bl('E', void 0, e)
                })(n),
                this
              )
            : ((this.isStopped = !0), this._error(n))
        }
        complete() {
          this.isStopped
            ? Ml(eM, this)
            : ((this.isStopped = !0), this._complete())
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null))
        }
        _next(n) {
          this.destination.next(n)
        }
        _error(n) {
          try {
            this.destination.error(n)
          } finally {
            this.unsubscribe()
          }
        }
        _complete() {
          try {
            this.destination.complete()
          } finally {
            this.unsubscribe()
          }
        }
      }
      const oM = Function.prototype.bind
      function El(e, n) {
        return oM.call(e, n)
      }
      class iM {
        constructor(n) {
          this.partialObserver = n
        }
        next(n) {
          const { partialObserver: t } = this
          if (t.next)
            try {
              t.next(n)
            } catch (r) {
              Vs(r)
            }
        }
        error(n) {
          const { partialObserver: t } = this
          if (t.error)
            try {
              t.error(n)
            } catch (r) {
              Vs(r)
            }
          else Vs(n)
        }
        complete() {
          const { partialObserver: n } = this
          if (n.complete)
            try {
              n.complete()
            } catch (t) {
              Vs(t)
            }
        }
      }
      class ei extends Ls {
        constructor(n, t, r) {
          let o
          if ((super(), oe(n) || !n))
            o = { next: n ?? void 0, error: t ?? void 0, complete: r ?? void 0 }
          else {
            let i
            this && ir.useDeprecatedNextContext
              ? ((i = Object.create(n)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: n.next && El(n.next, i),
                  error: n.error && El(n.error, i),
                  complete: n.complete && El(n.complete, i),
                }))
              : (o = n)
          }
          this.destination = new iM(o)
        }
      }
      function Vs(e) {
        ir.useDeprecatedSynchronousErrorHandling
          ? (function rM(e) {
              ir.useDeprecatedSynchronousErrorHandling &&
                sr &&
                ((sr.errorThrown = !0), (sr.error = e))
            })(e)
          : sp(e)
      }
      function Ml(e, n) {
        const { onStoppedNotification: t } = ir
        t && Fs.setTimeout(() => t(e, n))
      }
      const aM = {
          closed: !0,
          next: wl,
          error: function sM(e) {
            throw e
          },
          complete: wl,
        },
        Il =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable'
      function kn(e) {
        return e
      }
      function ap(e) {
        return 0 === e.length
          ? kn
          : 1 === e.length
            ? e[0]
            : function (t) {
                return e.reduce((r, o) => o(r), t)
              }
      }
      let he = (() => {
        class e {
          constructor(t) {
            t && (this._subscribe = t)
          }
          lift(t) {
            const r = new e()
            return (r.source = this), (r.operator = t), r
          }
          subscribe(t, r, o) {
            const i = (function cM(e) {
              return (
                (e && e instanceof Ls) ||
                ((function lM(e) {
                  return e && oe(e.next) && oe(e.error) && oe(e.complete)
                })(e) &&
                  op(e))
              )
            })(t)
              ? t
              : new ei(t, r, o)
            return (
              ks(() => {
                const { operator: s, source: a } = this
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                      ? this._subscribe(i)
                      : this._trySubscribe(i)
                )
              }),
              i
            )
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t)
            } catch (r) {
              t.error(r)
            }
          }
          forEach(t, r) {
            return new (r = up(r))((o, i) => {
              const s = new ei({
                next: (a) => {
                  try {
                    t(a)
                  } catch (u) {
                    i(u), s.unsubscribe()
                  }
                },
                error: i,
                complete: o,
              })
              this.subscribe(s)
            })
          }
          _subscribe(t) {
            var r
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(t)
          }
          [Il]() {
            return this
          }
          pipe(...t) {
            return ap(t)(this)
          }
          toPromise(t) {
            return new (t = up(t))((r, o) => {
              let i
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              )
            })
          }
        }
        return (e.create = (n) => new e(n)), e
      })()
      function up(e) {
        var n
        return null !== (n = e ?? ir.Promise) && void 0 !== n ? n : Promise
      }
      const dM = Jo(
        (e) =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed')
          }
      )
      let ut = (() => {
        class e extends he {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null)
          }
          lift(t) {
            const r = new Sl(this, this)
            return (r.operator = t), r
          }
          _throwIfClosed() {
            if (this.closed) throw new dM()
          }
          next(t) {
            ks(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers))
                for (const r of this.currentObservers) r.next(t)
              }
            })
          }
          error(t) {
            ks(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                ;(this.hasError = this.isStopped = !0), (this.thrownError = t)
                const { observers: r } = this
                for (; r.length; ) r.shift().error(t)
              }
            })
          }
          complete() {
            ks(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0
                const { observers: t } = this
                for (; t.length; ) t.shift().complete()
              }
            })
          }
          unsubscribe() {
            ;(this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null)
          }
          get observed() {
            var t
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            )
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t)
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            )
          }
          _innerSubscribe(t) {
            const { hasError: r, isStopped: o, observers: i } = this
            return r || o
              ? rp
              : ((this.currentObservers = null),
                i.push(t),
                new at(() => {
                  ;(this.currentObservers = null), Ko(i, t)
                }))
          }
          _checkFinalizedStatuses(t) {
            const { hasError: r, thrownError: o, isStopped: i } = this
            r ? t.error(o) : i && t.complete()
          }
          asObservable() {
            const t = new he()
            return (t.source = this), t
          }
        }
        return (e.create = (n, t) => new Sl(n, t)), e
      })()
      class Sl extends ut {
        constructor(n, t) {
          super(), (this.destination = n), (this.source = t)
        }
        next(n) {
          var t, r
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === r ||
            r.call(t, n)
        }
        error(n) {
          var t, r
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === r ||
            r.call(t, n)
        }
        complete() {
          var n, t
          null ===
            (t =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.complete) ||
            void 0 === t ||
            t.call(n)
        }
        _subscribe(n) {
          var t, r
          return null !==
            (r =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(n)) && void 0 !== r
            ? r
            : rp
        }
      }
      function lp(e) {
        return oe(e?.lift)
      }
      function Me(e) {
        return (n) => {
          if (lp(n))
            return n.lift(function (t) {
              try {
                return e(t, this)
              } catch (r) {
                this.error(r)
              }
            })
          throw new TypeError('Unable to lift unknown Observable type')
        }
      }
      function we(e, n, t, r, o) {
        return new fM(e, n, t, r, o)
      }
      class fM extends Ls {
        constructor(n, t, r, o, i, s) {
          super(n),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a)
                  } catch (u) {
                    n.error(u)
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a)
                  } catch (u) {
                    n.error(u)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r()
                  } catch (a) {
                    n.error(a)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._complete)
        }
        unsubscribe() {
          var n
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this
            super.unsubscribe(),
              !t &&
                (null === (n = this.onFinalize) || void 0 === n || n.call(this))
          }
        }
      }
      function W(e, n) {
        return Me((t, r) => {
          let o = 0
          t.subscribe(
            we(r, (i) => {
              r.next(e.call(n, i, o++))
            })
          )
        })
      }
      function Ln(e) {
        return this instanceof Ln ? ((this.v = e), this) : new Ln(e)
      }
      function hp(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var t,
          n = e[Symbol.asyncIterator]
        return n
          ? n.call(e)
          : ((e = (function Ol(e) {
              var n = 'function' == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                r = 0
              if (t) return t.call(e)
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    )
                  },
                }
              throw new TypeError(
                n
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              )
            })(e)),
            (t = {}),
            r('next'),
            r('throw'),
            r('return'),
            (t[Symbol.asyncIterator] = function () {
              return this
            }),
            t)
        function r(i) {
          t[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a })
                  }, s)
                })(a, u, (s = e[i](s)).done, s.value)
              })
            }
        }
      }
      'function' == typeof SuppressedError && SuppressedError
      const pp = (e) =>
        e && 'number' == typeof e.length && 'function' != typeof e
      function gp(e) {
        return oe(e?.then)
      }
      function mp(e) {
        return oe(e[Il])
      }
      function vp(e) {
        return Symbol.asyncIterator && oe(e?.[Symbol.asyncIterator])
      }
      function yp(e) {
        return new TypeError(
          `You provided ${null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        )
      }
      const _p = (function PM() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator'
      })()
      function Dp(e) {
        return oe(e?.[_p])
      }
      function Cp(e) {
        return (function fp(e, n, t) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var o,
            r = t.apply(e, n || []),
            i = []
          return (
            (o = {}),
            s('next'),
            s('throw'),
            s('return'),
            (o[Symbol.asyncIterator] = function () {
              return this
            }),
            o
          )
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h)
                })
              })
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof Ln
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f)
              })(r[f](h))
            } catch (p) {
              d(i[0][3], p)
            }
          }
          function l(f) {
            a('next', f)
          }
          function c(f) {
            a('throw', f)
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1])
          }
        })(this, arguments, function* () {
          const t = e.getReader()
          try {
            for (;;) {
              const { value: r, done: o } = yield Ln(t.read())
              if (o) return yield Ln(void 0)
              yield yield Ln(r)
            }
          } finally {
            t.releaseLock()
          }
        })
      }
      function wp(e) {
        return oe(e?.getReader)
      }
      function vt(e) {
        if (e instanceof he) return e
        if (null != e) {
          if (mp(e))
            return (function FM(e) {
              return new he((n) => {
                const t = e[Il]()
                if (oe(t.subscribe)) return t.subscribe(n)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                )
              })
            })(e)
          if (pp(e))
            return (function kM(e) {
              return new he((n) => {
                for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t])
                n.complete()
              })
            })(e)
          if (gp(e))
            return (function LM(e) {
              return new he((n) => {
                e.then(
                  (t) => {
                    n.closed || (n.next(t), n.complete())
                  },
                  (t) => n.error(t)
                ).then(null, sp)
              })
            })(e)
          if (vp(e)) return bp(e)
          if (Dp(e))
            return (function VM(e) {
              return new he((n) => {
                for (const t of e) if ((n.next(t), n.closed)) return
                n.complete()
              })
            })(e)
          if (wp(e))
            return (function jM(e) {
              return bp(Cp(e))
            })(e)
        }
        throw yp(e)
      }
      function bp(e) {
        return new he((n) => {
          ;(function $M(e, n) {
            var t, r, o, i
            return (function cp(e, n, t, r) {
              return new (t || (t = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c))
                  } catch (d) {
                    s(d)
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c))
                  } catch (d) {
                    s(d)
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof t
                          ? i
                          : new t(function (s) {
                              s(i)
                            })
                      })(c.value).then(a, u)
                }
                l((r = r.apply(e, n || [])).next())
              })
            })(this, void 0, void 0, function* () {
              try {
                for (t = hp(e); !(r = yield t.next()).done; )
                  if ((n.next(r.value), n.closed)) return
              } catch (s) {
                o = { error: s }
              } finally {
                try {
                  r && !r.done && (i = t.return) && (yield i.call(t))
                } finally {
                  if (o) throw o.error
                }
              }
              n.complete()
            })
          })(e, n).catch((t) => n.error(t))
        })
      }
      function fn(e, n, t, r = 0, o = !1) {
        const i = n.schedule(function () {
          t(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
        }, r)
        if ((e.add(i), !o)) return i
      }
      function ke(e, n, t = 1 / 0) {
        return oe(n)
          ? ke((r, o) => W((i, s) => n(r, i, o, s))(vt(e(r, o))), t)
          : ('number' == typeof n && (t = n),
            Me((r, o) =>
              (function BM(e, n, t, r, o, i, s, a) {
                const u = []
                let l = 0,
                  c = 0,
                  d = !1
                const f = () => {
                    d && !u.length && !l && n.complete()
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && n.next(g), l++
                    let y = !1
                    vt(t(g, c++)).subscribe(
                      we(
                        n,
                        (b) => {
                          o?.(b), i ? h(b) : n.next(b)
                        },
                        () => {
                          y = !0
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < r; ) {
                                const b = u.shift()
                                s ? fn(n, s, () => p(b)) : p(b)
                              }
                              f()
                            } catch (b) {
                              n.error(b)
                            }
                        }
                      )
                    )
                  }
                return (
                  e.subscribe(
                    we(n, h, () => {
                      ;(d = !0), f()
                    })
                  ),
                  () => {
                    a?.()
                  }
                )
              })(r, o, e, t)
            ))
      }
      function kr(e = 1 / 0) {
        return ke(kn, e)
      }
      const Tt = new he((e) => e.complete())
      function Rl(e) {
        return e[e.length - 1]
      }
      function Ep(e) {
        return oe(Rl(e)) ? e.pop() : void 0
      }
      function ti(e) {
        return (function HM(e) {
          return e && oe(e.schedule)
        })(Rl(e))
          ? e.pop()
          : void 0
      }
      function Mp(e, n = 0) {
        return Me((t, r) => {
          t.subscribe(
            we(
              r,
              (o) => fn(r, e, () => r.next(o), n),
              () => fn(r, e, () => r.complete(), n),
              (o) => fn(r, e, () => r.error(o), n)
            )
          )
        })
      }
      function Ip(e, n = 0) {
        return Me((t, r) => {
          r.add(e.schedule(() => t.subscribe(r), n))
        })
      }
      function Sp(e, n) {
        if (!e) throw new Error('Iterable cannot be null')
        return new he((t) => {
          fn(t, n, () => {
            const r = e[Symbol.asyncIterator]()
            fn(
              t,
              n,
              () => {
                r.next().then((o) => {
                  o.done ? t.complete() : t.next(o.value)
                })
              },
              0,
              !0
            )
          })
        })
      }
      function Ie(e, n) {
        return n
          ? (function QM(e, n) {
              if (null != e) {
                if (mp(e))
                  return (function zM(e, n) {
                    return vt(e).pipe(Ip(n), Mp(n))
                  })(e, n)
                if (pp(e))
                  return (function WM(e, n) {
                    return new he((t) => {
                      let r = 0
                      return n.schedule(function () {
                        r === e.length
                          ? t.complete()
                          : (t.next(e[r++]), t.closed || this.schedule())
                      })
                    })
                  })(e, n)
                if (gp(e))
                  return (function qM(e, n) {
                    return vt(e).pipe(Ip(n), Mp(n))
                  })(e, n)
                if (vp(e)) return Sp(e, n)
                if (Dp(e))
                  return (function ZM(e, n) {
                    return new he((t) => {
                      let r
                      return (
                        fn(t, n, () => {
                          ;(r = e[_p]()),
                            fn(
                              t,
                              n,
                              () => {
                                let o, i
                                try {
                                  ;({ value: o, done: i } = r.next())
                                } catch (s) {
                                  return void t.error(s)
                                }
                                i ? t.complete() : t.next(o)
                              },
                              0,
                              !0
                            )
                        }),
                        () => oe(r?.return) && r.return()
                      )
                    })
                  })(e, n)
                if (wp(e))
                  return (function YM(e, n) {
                    return Sp(Cp(e), n)
                  })(e, n)
              }
              throw yp(e)
            })(e, n)
          : vt(e)
      }
      class lt extends ut {
        constructor(n) {
          super(), (this._value = n)
        }
        get value() {
          return this.getValue()
        }
        _subscribe(n) {
          const t = super._subscribe(n)
          return !t.closed && n.next(this._value), t
        }
        getValue() {
          const { hasError: n, thrownError: t, _value: r } = this
          if (n) throw t
          return this._throwIfClosed(), r
        }
        next(n) {
          super.next((this._value = n))
        }
      }
      function R(...e) {
        return Ie(e, ti(e))
      }
      function xl(e = {}) {
        const {
          connector: n = () => new ut(),
          resetOnError: t = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e
        return (i) => {
          let s,
            a,
            u,
            l = 0,
            c = !1,
            d = !1
          const f = () => {
              a?.unsubscribe(), (a = void 0)
            },
            h = () => {
              f(), (s = u = void 0), (c = d = !1)
            },
            p = () => {
              const g = s
              h(), g?.unsubscribe()
            }
          return Me((g, y) => {
            l++, !d && !c && f()
            const b = (u = u ?? n())
            y.add(() => {
              l--, 0 === l && !d && !c && (a = Pl(p, o))
            }),
              b.subscribe(y),
              !s &&
                l > 0 &&
                ((s = new ei({
                  next: (m) => b.next(m),
                  error: (m) => {
                    ;(d = !0), f(), (a = Pl(h, t, m)), b.error(m)
                  },
                  complete: () => {
                    ;(c = !0), f(), (a = Pl(h, r)), b.complete()
                  },
                })),
                vt(g).subscribe(s))
          })(i)
        }
      }
      function Pl(e, n, ...t) {
        if (!0 === n) return void e()
        if (!1 === n) return
        const r = new ei({
          next: () => {
            r.unsubscribe(), e()
          },
        })
        return vt(n(...t)).subscribe(r)
      }
      function yt(e, n) {
        return Me((t, r) => {
          let o = null,
            i = 0,
            s = !1
          const a = () => s && !o && r.complete()
          t.subscribe(
            we(
              r,
              (u) => {
                o?.unsubscribe()
                let l = 0
                const c = i++
                vt(e(u, c)).subscribe(
                  (o = we(
                    r,
                    (d) => r.next(n ? n(u, d, c, l++) : d),
                    () => {
                      ;(o = null), a()
                    }
                  ))
                )
              },
              () => {
                ;(s = !0), a()
              }
            )
          )
        })
      }
      function KM(e, n) {
        return e === n
      }
      function te(e) {
        for (let n in e) if (e[n] === te) return n
        throw Error('Could not find renamed property on target object.')
      }
      function js(e, n) {
        for (const t in n)
          n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t])
      }
      function Se(e) {
        if ('string' == typeof e) return e
        if (Array.isArray(e)) return '[' + e.map(Se).join(', ') + ']'
        if (null == e) return '' + e
        if (e.overriddenName) return `${e.overriddenName}`
        if (e.name) return `${e.name}`
        const n = e.toString()
        if (null == n) return '' + n
        const t = n.indexOf('\n')
        return -1 === t ? n : n.substring(0, t)
      }
      function Fl(e, n) {
        return null == e || '' === e
          ? null === n
            ? ''
            : n
          : null == n || '' === n
            ? e
            : e + ' ' + n
      }
      const eI = te({ __forward_ref__: te })
      function ae(e) {
        return (
          (e.__forward_ref__ = ae),
          (e.toString = function () {
            return Se(this())
          }),
          e
        )
      }
      function k(e) {
        return kl(e) ? e() : e
      }
      function kl(e) {
        return (
          'function' == typeof e &&
          e.hasOwnProperty(eI) &&
          e.__forward_ref__ === ae
        )
      }
      function Ll(e) {
        return e && !!e.ɵproviders
      }
      const Tp = 'https://g.co/ng/security#xss'
      class w extends Error {
        constructor(n, t) {
          super(
            (function $s(e, n) {
              return `NG0${Math.abs(e)}${n ? ': ' + n : ''}`
            })(n, t)
          ),
            (this.code = n)
        }
      }
      function V(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e)
      }
      function Vl(e, n) {
        throw new w(-201, !1)
      }
      function At(e, n) {
        null == e &&
          (function P(e, n, t, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? '' : ` [Expected=> ${t} ${r} ${n} <=Actual]`)
            )
          })(n, e, null, '!=')
      }
      function N(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        }
      }
      function Oe(e) {
        return { providers: e.providers || [], imports: e.imports || [] }
      }
      function Bs(e) {
        return Ap(e, Hs) || Ap(e, Np)
      }
      function Ap(e, n) {
        return e.hasOwnProperty(n) ? e[n] : null
      }
      function Us(e) {
        return e && (e.hasOwnProperty(jl) || e.hasOwnProperty(uI))
          ? e[jl]
          : null
      }
      const Hs = te({ ɵprov: te }),
        jl = te({ ɵinj: te }),
        Np = te({ ngInjectableDef: te }),
        uI = te({ ngInjectorDef: te })
      var G = (function (e) {
        return (
          (e[(e.Default = 0)] = 'Default'),
          (e[(e.Host = 1)] = 'Host'),
          (e[(e.Self = 2)] = 'Self'),
          (e[(e.SkipSelf = 4)] = 'SkipSelf'),
          (e[(e.Optional = 8)] = 'Optional'),
          e
        )
      })(G || {})
      let $l
      function ct(e) {
        const n = $l
        return ($l = e), n
      }
      function Rp(e, n, t) {
        const r = Bs(e)
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : t & G.Optional
            ? null
            : void 0 !== n
              ? n
              : void Vl(Se(e))
      }
      const ue = globalThis,
        ni = {},
        zl = '__NG_DI_FLAG__',
        Gs = 'ngTempTokenPath',
        dI = /\n/gm,
        Pp = '__source'
      let Lr
      function Vn(e) {
        const n = Lr
        return (Lr = e), n
      }
      function pI(e, n = G.Default) {
        if (void 0 === Lr) throw new w(-203, !1)
        return null === Lr
          ? Rp(e, void 0, n)
          : Lr.get(e, n & G.Optional ? null : void 0, n)
      }
      function M(e, n = G.Default) {
        return (
          (function Op() {
            return $l
          })() || pI
        )(k(e), n)
      }
      function T(e, n = G.Default) {
        return M(e, zs(n))
      }
      function zs(e) {
        return typeof e > 'u' || 'number' == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4)
      }
      function ql(e) {
        const n = []
        for (let t = 0; t < e.length; t++) {
          const r = k(e[t])
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1)
            let o,
              i = G.Default
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = gI(a)
              'number' == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a)
            }
            n.push(M(o, i))
          } else n.push(M(r))
        }
        return n
      }
      function ri(e, n) {
        return (e[zl] = n), (e.prototype[zl] = n), e
      }
      function gI(e) {
        return e[zl]
      }
      function hn(e) {
        return { toString: e }.toString()
      }
      var qs = (function (e) {
          return (
            (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e
          )
        })(qs || {}),
        Vt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            e
          )
        })(Vt || {})
      const Zt = {},
        Q = [],
        Ws = te({ ɵcmp: te }),
        Wl = te({ ɵdir: te }),
        Zl = te({ ɵpipe: te }),
        kp = te({ ɵmod: te }),
        pn = te({ ɵfac: te }),
        oi = te({ __NG_ELEMENT_ID__: te }),
        Lp = te({ __NG_ENV_ID__: te })
      function Vp(e, n, t) {
        let r = e.length
        for (;;) {
          const o = e.indexOf(n, t)
          if (-1 === o) return o
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = n.length
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o
          }
          t = o + 1
        }
      }
      function Yl(e, n, t) {
        let r = 0
        for (; r < t.length; ) {
          const o = t[r]
          if ('number' == typeof o) {
            if (0 !== o) break
            r++
            const i = t[r++],
              s = t[r++],
              a = t[r++]
            e.setAttribute(n, s, a, i)
          } else {
            const i = o,
              s = t[++r]
            $p(i) ? e.setProperty(n, i, s) : e.setAttribute(n, i, s), r++
          }
        }
        return r
      }
      function jp(e) {
        return 3 === e || 4 === e || 6 === e
      }
      function $p(e) {
        return 64 === e.charCodeAt(0)
      }
      function ii(e, n) {
        if (null !== n && 0 !== n.length)
          if (null === e || 0 === e.length) e = n.slice()
          else {
            let t = -1
            for (let r = 0; r < n.length; r++) {
              const o = n[r]
              'number' == typeof o
                ? (t = o)
                : 0 === t ||
                  Bp(e, t, o, null, -1 === t || 2 === t ? n[++r] : null)
            }
          }
        return e
      }
      function Bp(e, n, t, r, o) {
        let i = 0,
          s = e.length
        if (-1 === n) s = -1
        else
          for (; i < e.length; ) {
            const a = e[i++]
            if ('number' == typeof a) {
              if (a === n) {
                s = -1
                break
              }
              if (a > n) {
                s = i - 1
                break
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i]
          if ('number' == typeof a) break
          if (a === t) {
            if (null === r) return void (null !== o && (e[i + 1] = o))
            if (r === e[i + 1]) return void (e[i + 2] = o)
          }
          i++, null !== r && i++, null !== o && i++
        }
        ;-1 !== s && (e.splice(s, 0, n), (i = s + 1)),
          e.splice(i++, 0, t),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o)
      }
      const Up = 'ng-template'
      function yI(e, n, t) {
        let r = 0,
          o = !0
        for (; r < e.length; ) {
          let i = e[r++]
          if ('string' == typeof i && o) {
            const s = e[r++]
            if (t && 'class' === i && -1 !== Vp(s.toLowerCase(), n, 0))
              return !0
          } else {
            if (1 === i) {
              for (; r < e.length && 'string' == typeof (i = e[r++]); )
                if (i.toLowerCase() === n) return !0
              return !1
            }
            'number' == typeof i && (o = !1)
          }
        }
        return !1
      }
      function Hp(e) {
        return 4 === e.type && e.value !== Up
      }
      function _I(e, n, t) {
        return n === (4 !== e.type || t ? e.value : Up)
      }
      function DI(e, n, t) {
        let r = 4
        const o = e.attrs || [],
          i = (function bI(e) {
            for (let n = 0; n < e.length; n++) if (jp(e[n])) return n
            return e.length
          })(o)
        let s = !1
        for (let a = 0; a < n.length; a++) {
          const u = n[a]
          if ('number' != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ('' !== u && !_I(e, u, t)) || ('' === u && 1 === n.length))
                ) {
                  if (jt(r)) return !1
                  s = !0
                }
              } else {
                const l = 8 & r ? u : n[++a]
                if (8 & r && null !== e.attrs) {
                  if (!yI(e.attrs, l, t)) {
                    if (jt(r)) return !1
                    s = !0
                  }
                  continue
                }
                const d = CI(8 & r ? 'class' : u, o, Hp(e), t)
                if (-1 === d) {
                  if (jt(r)) return !1
                  s = !0
                  continue
                }
                if ('' !== l) {
                  let f
                  f = d > i ? '' : o[d + 1].toLowerCase()
                  const h = 8 & r ? f : null
                  if ((h && -1 !== Vp(h, l, 0)) || (2 & r && l !== f)) {
                    if (jt(r)) return !1
                    s = !0
                  }
                }
              }
          } else {
            if (!s && !jt(r) && !jt(u)) return !1
            if (s && jt(u)) continue
            ;(s = !1), (r = u | (1 & r))
          }
        }
        return jt(r) || s
      }
      function jt(e) {
        return 0 == (1 & e)
      }
      function CI(e, n, t, r) {
        if (null === n) return -1
        let o = 0
        if (r || !t) {
          let i = !1
          for (; o < n.length; ) {
            const s = n[o]
            if (s === e) return o
            if (3 === s || 6 === s) i = !0
            else {
              if (1 === s || 2 === s) {
                let a = n[++o]
                for (; 'string' == typeof a; ) a = n[++o]
                continue
              }
              if (4 === s) break
              if (0 === s) {
                o += 4
                continue
              }
            }
            o += i ? 1 : 2
          }
          return -1
        }
        return (function EI(e, n) {
          let t = e.indexOf(4)
          if (t > -1)
            for (t++; t < e.length; ) {
              const r = e[t]
              if ('number' == typeof r) return -1
              if (r === n) return t
              t++
            }
          return -1
        })(n, e)
      }
      function Gp(e, n, t = !1) {
        for (let r = 0; r < n.length; r++) if (DI(e, n[r], t)) return !0
        return !1
      }
      function zp(e, n) {
        return e ? ':not(' + n.trim() + ')' : n
      }
      function II(e) {
        let n = e[0],
          t = 1,
          r = 2,
          o = '',
          i = !1
        for (; t < e.length; ) {
          let s = e[t]
          if ('string' == typeof s)
            if (2 & r) {
              const a = e[++t]
              o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']'
            } else 8 & r ? (o += '.' + s) : 4 & r && (o += ' ' + s)
          else
            '' !== o && !jt(s) && ((n += zp(i, o)), (o = '')),
              (r = s),
              (i = i || !jt(r))
          t++
        }
        return '' !== o && (n += zp(i, o)), n
      }
      function Le(e) {
        return hn(() => {
          const n = Wp(e),
            t = {
              ...n,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === qs.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (n.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || Vt.Emulated,
              styles: e.styles || Q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: '',
            }
          Zp(t)
          const r = e.dependencies
          return (
            (t.directiveDefs = Zs(r, !1)),
            (t.pipeDefs = Zs(r, !0)),
            (t.id = (function PI(e) {
              let n = 0
              const t = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join('|')
              for (const o of t) n = (Math.imul(31, n) + o.charCodeAt(0)) << 0
              return (n += 2147483648), 'c' + n
            })(t)),
            t
          )
        })
      }
      function NI(e) {
        return Z(e) || je(e)
      }
      function OI(e) {
        return null !== e
      }
      function Ve(e) {
        return hn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Q,
          declarations: e.declarations || Q,
          imports: e.imports || Q,
          exports: e.exports || Q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }))
      }
      function qp(e, n) {
        if (null == e) return Zt
        const t = {}
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (t[o] = r),
              n && (n[o] = i)
          }
        return t
      }
      function L(e) {
        return hn(() => {
          const n = Wp(e)
          return Zp(n), n
        })
      }
      function Ge(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        }
      }
      function Z(e) {
        return e[Ws] || null
      }
      function je(e) {
        return e[Wl] || null
      }
      function Xe(e) {
        return e[Zl] || null
      }
      function Dt(e, n) {
        const t = e[kp] || null
        if (!t && !0 === n)
          throw new Error(`Type ${Se(e)} does not have '\u0275mod' property.`)
        return t
      }
      function Wp(e) {
        const n = {}
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: n,
          inputTransforms: null,
          inputConfig: e.inputs || Zt,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || Q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: qp(e.inputs, n),
          outputs: qp(e.outputs),
        }
      }
      function Zp(e) {
        e.features?.forEach((n) => n(e))
      }
      function Zs(e, n) {
        if (!e) return null
        const t = n ? Xe : NI
        return () =>
          ('function' == typeof e ? e() : e).map((r) => t(r)).filter(OI)
      }
      const ve = 0,
        I = 1,
        B = 2,
        pe = 3,
        $t = 4,
        si = 5,
        ze = 6,
        jr = 7,
        _e = 8,
        jn = 9,
        $r = 10,
        j = 11,
        ai = 12,
        Yp = 13,
        Br = 14,
        De = 15,
        ui = 16,
        Ur = 17,
        Yt = 18,
        li = 19,
        Qp = 20,
        $n = 21,
        gn = 22,
        ci = 23,
        di = 24,
        z = 25,
        Ql = 1,
        Xp = 2,
        Qt = 7,
        Hr = 9,
        $e = 11
      function dt(e) {
        return Array.isArray(e) && 'object' == typeof e[Ql]
      }
      function Je(e) {
        return Array.isArray(e) && !0 === e[Ql]
      }
      function Xl(e) {
        return 0 != (4 & e.flags)
      }
      function ur(e) {
        return e.componentOffset > -1
      }
      function Qs(e) {
        return 1 == (1 & e.flags)
      }
      function Bt(e) {
        return !!e.template
      }
      function Jl(e) {
        return 0 != (512 & e[B])
      }
      function lr(e, n) {
        return e.hasOwnProperty(pn) ? e[pn] : null
      }
      let Be = null,
        Xs = !1
      function Nt(e) {
        const n = Be
        return (Be = e), n
      }
      const eg = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      }
      function ng(e) {
        if (!hi(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !ig(e)) return void (e.dirty = !1)
          e.producerRecomputeValue(e), (e.dirty = !1)
        }
      }
      function og(e) {
        ;(e.dirty = !0),
          (function rg(e) {
            if (void 0 === e.liveConsumerNode) return
            const n = Xs
            Xs = !0
            try {
              for (const t of e.liveConsumerNode) t.dirty || og(t)
            } finally {
              Xs = n
            }
          })(e),
          e.consumerMarkedDirty?.(e)
      }
      function ec(e) {
        return e && (e.nextProducerIndex = 0), Nt(e)
      }
      function tc(e, n) {
        if (
          (Nt(n),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (hi(e))
            for (let t = e.nextProducerIndex; t < e.producerNode.length; t++)
              Js(e.producerNode[t], e.producerIndexOfThis[t])
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop()
        }
      }
      function ig(e) {
        Gr(e)
        for (let n = 0; n < e.producerNode.length; n++) {
          const t = e.producerNode[n],
            r = e.producerLastReadVersion[n]
          if (r !== t.version || (ng(t), r !== t.version)) return !0
        }
        return !1
      }
      function sg(e) {
        if ((Gr(e), hi(e)))
          for (let n = 0; n < e.producerNode.length; n++)
            Js(e.producerNode[n], e.producerIndexOfThis[n])
        ;(e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
      }
      function Js(e, n) {
        if (
          ((function ug(e) {
            ;(e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= [])
          })(e),
          Gr(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            Js(e.producerNode[r], e.producerIndexOfThis[r])
        const t = e.liveConsumerNode.length - 1
        if (
          ((e.liveConsumerNode[n] = e.liveConsumerNode[t]),
          (e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          n < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[n],
            o = e.liveConsumerNode[n]
          Gr(o), (o.producerIndexOfThis[r] = n)
        }
      }
      function hi(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0
      }
      function Gr(e) {
        ;(e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= [])
      }
      let lg = null
      function fg(e) {
        const n = Nt(null)
        try {
          return e()
        } finally {
          Nt(n)
        }
      }
      const hg = () => {},
        WI = (() => ({
          ...eg,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref)
          },
          hasRun: !1,
          cleanupFn: hg,
        }))()
      class ZI {
        constructor(n, t, r) {
          ;(this.previousValue = n),
            (this.currentValue = t),
            (this.firstChange = r)
        }
        isFirstChange() {
          return this.firstChange
        }
      }
      function Ot() {
        return pg
      }
      function pg(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = QI), YI
      }
      function YI() {
        const e = mg(this),
          n = e?.current
        if (n) {
          const t = e.previous
          if (t === Zt) e.previous = n
          else for (let r in n) t[r] = n[r]
          ;(e.current = null), this.ngOnChanges(n)
        }
      }
      function QI(e, n, t, r) {
        const o = this.declaredInputs[t],
          i =
            mg(e) ||
            (function XI(e, n) {
              return (e[gg] = n)
            })(e, { previous: Zt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o]
        ;(s[o] = new ZI(u && u.currentValue, n, a === Zt)), (e[r] = n)
      }
      Ot.ngInherit = !0
      const gg = '__ngSimpleChanges__'
      function mg(e) {
        return e[gg] || null
      }
      const Xt = function (e, n, t) {}
      function le(e) {
        for (; Array.isArray(e); ) e = e[ve]
        return e
      }
      function Ks(e, n) {
        return le(n[e])
      }
      function ft(e, n) {
        return le(n[e.index])
      }
      function _g(e, n) {
        return e.data[n]
      }
      function zr(e, n) {
        return e[n]
      }
      function Ct(e, n) {
        const t = n[e]
        return dt(t) ? t : t[ve]
      }
      function Un(e, n) {
        return null == n ? null : e[n]
      }
      function Dg(e) {
        e[Ur] = 0
      }
      function rS(e) {
        1024 & e[B] || ((e[B] |= 1024), wg(e, 1))
      }
      function Cg(e) {
        1024 & e[B] && ((e[B] &= -1025), wg(e, -1))
      }
      function wg(e, n) {
        let t = e[pe]
        if (null === t) return
        t[si] += n
        let r = t
        for (
          t = t[pe];
          null !== t && ((1 === n && 1 === r[si]) || (-1 === n && 0 === r[si]));

        )
          (t[si] += n), (r = t), (t = t[pe])
      }
      const F = {
        lFrame: xg(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      }
      function Mg() {
        return F.bindingsEnabled
      }
      function C() {
        return F.lFrame.lView
      }
      function Y() {
        return F.lFrame.tView
      }
      function Wr(e) {
        return (F.lFrame.contextLView = e), e[_e]
      }
      function Zr(e) {
        return (F.lFrame.contextLView = null), e
      }
      function Ue() {
        let e = Ig()
        for (; null !== e && 64 === e.type; ) e = e.parent
        return e
      }
      function Ig() {
        return F.lFrame.currentTNode
      }
      function Jt(e, n) {
        const t = F.lFrame
        ;(t.currentTNode = e), (t.isParent = n)
      }
      function sc() {
        return F.lFrame.isParent
      }
      function Ke() {
        const e = F.lFrame
        let n = e.bindingRootIndex
        return (
          -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n
        )
      }
      function mn() {
        return F.lFrame.bindingIndex
      }
      function Yr() {
        return F.lFrame.bindingIndex++
      }
      function vn(e) {
        const n = F.lFrame,
          t = n.bindingIndex
        return (n.bindingIndex = n.bindingIndex + e), t
      }
      function gS(e, n) {
        const t = F.lFrame
        ;(t.bindingIndex = t.bindingRootIndex = e), uc(n)
      }
      function uc(e) {
        F.lFrame.currentDirectiveIndex = e
      }
      function cc(e) {
        F.lFrame.currentQueryIndex = e
      }
      function vS(e) {
        const n = e[I]
        return 2 === n.type ? n.declTNode : 1 === n.type ? e[ze] : null
      }
      function Og(e, n, t) {
        if (t & G.SkipSelf) {
          let o = n,
            i = e
          for (
            ;
            !((o = o.parent),
            null !== o ||
              t & G.Host ||
              ((o = vS(i)), null === o || ((i = i[Br]), 10 & o.type)));

          );
          if (null === o) return !1
          ;(n = o), (e = i)
        }
        const r = (F.lFrame = Rg())
        return (r.currentTNode = n), (r.lView = e), !0
      }
      function dc(e) {
        const n = Rg(),
          t = e[I]
        ;(F.lFrame = n),
          (n.currentTNode = t.firstChild),
          (n.lView = e),
          (n.tView = t),
          (n.contextLView = e),
          (n.bindingIndex = t.bindingStartIndex),
          (n.inI18n = !1)
      }
      function Rg() {
        const e = F.lFrame,
          n = null === e ? null : e.child
        return null === n ? xg(e) : n
      }
      function xg(e) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        }
        return null !== e && (e.child = n), n
      }
      function Pg() {
        const e = F.lFrame
        return (
          (F.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        )
      }
      const Fg = Pg
      function fc() {
        const e = Pg()
        ;(e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0)
      }
      function et() {
        return F.lFrame.selectedIndex
      }
      function cr(e) {
        F.lFrame.selectedIndex = e
      }
      function me() {
        const e = F.lFrame
        return _g(e.tView, e.selectedIndex)
      }
      let Lg = !0
      function ea() {
        return Lg
      }
      function Hn(e) {
        Lg = e
      }
      function ta(e, n) {
        for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
          const i = e.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i
          s && (e.contentHooks ??= []).push(-t, s),
            a &&
              ((e.contentHooks ??= []).push(t, a),
              (e.contentCheckHooks ??= []).push(t, a)),
            u && (e.viewHooks ??= []).push(-t, u),
            l &&
              ((e.viewHooks ??= []).push(t, l),
              (e.viewCheckHooks ??= []).push(t, l)),
            null != c && (e.destroyHooks ??= []).push(t, c)
        }
      }
      function na(e, n, t) {
        Vg(e, n, 3, t)
      }
      function ra(e, n, t, r) {
        ;(3 & e[B]) === t && Vg(e, n, t, r)
      }
      function hc(e, n) {
        let t = e[B]
        ;(3 & t) === n && ((t &= 8191), (t += 1), (e[B] = t))
      }
      function Vg(e, n, t, r) {
        const i = r ?? -1,
          s = n.length - 1
        let a = 0
        for (let u = void 0 !== r ? 65535 & e[Ur] : 0; u < s; u++)
          if ('number' == typeof n[u + 1]) {
            if (((a = n[u]), null != r && a >= r)) break
          } else
            n[u] < 0 && (e[Ur] += 65536),
              (a < i || -1 == i) &&
                (MS(e, t, n, u), (e[Ur] = (4294901760 & e[Ur]) + u + 2)),
              u++
      }
      function jg(e, n) {
        Xt(4, e, n)
        const t = Nt(null)
        try {
          n.call(e)
        } finally {
          Nt(t), Xt(5, e, n)
        }
      }
      function MS(e, n, t, r) {
        const o = t[r] < 0,
          i = t[r + 1],
          a = e[o ? -t[r] : t[r]]
        o
          ? e[B] >> 13 < e[Ur] >> 16 &&
            (3 & e[B]) === n &&
            ((e[B] += 8192), jg(a, i))
          : jg(a, i)
      }
      const Qr = -1
      class gi {
        constructor(n, t, r) {
          ;(this.factory = n),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = r)
        }
      }
      function gc(e) {
        return e !== Qr
      }
      function mi(e) {
        return 32767 & e
      }
      function vi(e, n) {
        let t = (function AS(e) {
            return e >> 16
          })(e),
          r = n
        for (; t > 0; ) (r = r[Br]), t--
        return r
      }
      let mc = !0
      function oa(e) {
        const n = mc
        return (mc = e), n
      }
      const $g = 255,
        Bg = 5
      let NS = 0
      const Kt = {}
      function ia(e, n) {
        const t = Ug(e, n)
        if (-1 !== t) return t
        const r = n[I]
        r.firstCreatePass &&
          ((e.injectorIndex = n.length),
          vc(r.data, e),
          vc(n, null),
          vc(r.blueprint, null))
        const o = sa(e, n),
          i = e.injectorIndex
        if (gc(o)) {
          const s = mi(o),
            a = vi(o, n),
            u = a[I].data
          for (let l = 0; l < 8; l++) n[i + l] = a[s + l] | u[s + l]
        }
        return (n[i + 8] = o), i
      }
      function vc(e, n) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, n)
      }
      function Ug(e, n) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === n[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex
      }
      function sa(e, n) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex
        let t = 0,
          r = null,
          o = n
        for (; null !== o; ) {
          if (((r = Yg(o)), null === r)) return Qr
          if ((t++, (o = o[Br]), -1 !== r.injectorIndex))
            return r.injectorIndex | (t << 16)
        }
        return Qr
      }
      function yc(e, n, t) {
        !(function OS(e, n, t) {
          let r
          'string' == typeof t
            ? (r = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(oi) && (r = t[oi]),
            null == r && (r = t[oi] = NS++)
          const o = r & $g
          n.data[e + (o >> Bg)] |= 1 << o
        })(e, n, t)
      }
      function Hg(e, n, t) {
        if (t & G.Optional || void 0 !== e) return e
        Vl()
      }
      function Gg(e, n, t, r) {
        if (
          (t & G.Optional && void 0 === r && (r = null),
          !(t & (G.Self | G.Host)))
        ) {
          const o = e[jn],
            i = ct(void 0)
          try {
            return o ? o.get(n, r, t & G.Optional) : Rp(n, r, t & G.Optional)
          } finally {
            ct(i)
          }
        }
        return Hg(r, 0, t)
      }
      function zg(e, n, t, r = G.Default, o) {
        if (null !== e) {
          if (2048 & n[B] && !(r & G.Self)) {
            const s = (function LS(e, n, t, r, o) {
              let i = e,
                s = n
              for (
                ;
                null !== i && null !== s && 2048 & s[B] && !(512 & s[B]);

              ) {
                const a = qg(i, s, t, r | G.Self, Kt)
                if (a !== Kt) return a
                let u = i.parent
                if (!u) {
                  const l = s[Qp]
                  if (l) {
                    const c = l.get(t, Kt, r)
                    if (c !== Kt) return c
                  }
                  ;(u = Yg(s)), (s = s[Br])
                }
                i = u
              }
              return o
            })(e, n, t, r, Kt)
            if (s !== Kt) return s
          }
          const i = qg(e, n, t, r, Kt)
          if (i !== Kt) return i
        }
        return Gg(n, t, r, o)
      }
      function qg(e, n, t, r, o) {
        const i = (function PS(e) {
          if ('string' == typeof e) return e.charCodeAt(0) || 0
          const n = e.hasOwnProperty(oi) ? e[oi] : void 0
          return 'number' == typeof n ? (n >= 0 ? n & $g : kS) : n
        })(t)
        if ('function' == typeof i) {
          if (!Og(n, e, r)) return r & G.Host ? Hg(o, 0, r) : Gg(n, t, r, o)
          try {
            let s
            if (((s = i(r)), null != s || r & G.Optional)) return s
            Vl()
          } finally {
            Fg()
          }
        } else if ('number' == typeof i) {
          let s = null,
            a = Ug(e, n),
            u = Qr,
            l = r & G.Host ? n[De][ze] : null
          for (
            (-1 === a || r & G.SkipSelf) &&
            ((u = -1 === a ? sa(e, n) : n[a + 8]),
            u !== Qr && Zg(r, !1)
              ? ((s = n[I]), (a = mi(u)), (n = vi(u, n)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = n[I]
            if (Wg(i, a, c.data)) {
              const d = xS(a, n, t, s, r, l)
              if (d !== Kt) return d
            }
            ;(u = n[a + 8]),
              u !== Qr && Zg(r, n[I].data[a + 8] === l) && Wg(i, a, n)
                ? ((s = c), (a = mi(u)), (n = vi(u, n)))
                : (a = -1)
          }
        }
        return o
      }
      function xS(e, n, t, r, o, i) {
        const s = n[I],
          a = s.data[e + 8],
          c = (function aa(e, n, t, r, o) {
            const i = e.providerIndexes,
              s = n.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h]
              if ((h < u && t === p) || (h >= u && p.type === t)) return h
            }
            if (o) {
              const h = s[u]
              if (h && Bt(h) && h.type === t) return u
            }
            return null
          })(
            a,
            s,
            t,
            null == r ? ur(a) && mc : r != s && 0 != (3 & a.type),
            o & G.Host && i === a
          )
        return null !== c ? dr(n, s, c, a) : Kt
      }
      function dr(e, n, t, r) {
        let o = e[t]
        const i = n.data
        if (
          (function IS(e) {
            return e instanceof gi
          })(o)
        ) {
          const s = o
          s.resolving &&
            (function tI(e, n) {
              const t = n ? `. Dependency path: ${n.join(' > ')} > ${e}` : ''
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${t}`
              )
            })(
              (function ee(e) {
                return 'function' == typeof e
                  ? e.name || e.toString()
                  : 'object' == typeof e &&
                      null != e &&
                      'function' == typeof e.type
                    ? e.type.name || e.type.toString()
                    : V(e)
              })(i[t])
            )
          const a = oa(s.canSeeViewProviders)
          s.resolving = !0
          const l = s.injectImpl ? ct(s.injectImpl) : null
          Og(e, r, G.Default)
          try {
            ;(o = e[t] = s.factory(void 0, i, e, r)),
              n.firstCreatePass &&
                t >= r.directiveStart &&
                (function ES(e, n, t) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = n.type.prototype
                  if (r) {
                    const s = pg(n)
                    ;(t.preOrderHooks ??= []).push(e, s),
                      (t.preOrderCheckHooks ??= []).push(e, s)
                  }
                  o && (t.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((t.preOrderHooks ??= []).push(e, i),
                      (t.preOrderCheckHooks ??= []).push(e, i))
                })(t, i[t], n)
          } finally {
            null !== l && ct(l), oa(a), (s.resolving = !1), Fg()
          }
        }
        return o
      }
      function Wg(e, n, t) {
        return !!(t[n + (e >> Bg)] & (1 << e))
      }
      function Zg(e, n) {
        return !(e & G.Self || (e & G.Host && n))
      }
      class tt {
        constructor(n, t) {
          ;(this._tNode = n), (this._lView = t)
        }
        get(n, t, r) {
          return zg(this._tNode, this._lView, n, zs(r), t)
        }
      }
      function kS() {
        return new tt(Ue(), C())
      }
      function be(e) {
        return hn(() => {
          const n = e.prototype.constructor,
            t = n[pn] || _c(n),
            r = Object.prototype
          let o = Object.getPrototypeOf(e.prototype).constructor
          for (; o && o !== r; ) {
            const i = o[pn] || _c(o)
            if (i && i !== t) return i
            o = Object.getPrototypeOf(o)
          }
          return (i) => new i()
        })
      }
      function _c(e) {
        return kl(e)
          ? () => {
              const n = _c(k(e))
              return n && n()
            }
          : lr(e)
      }
      function Yg(e) {
        const n = e[I],
          t = n.type
        return 2 === t ? n.declTNode : 1 === t ? e[ze] : null
      }
      const Jr = '__parameters__'
      function eo(e, n, t) {
        return hn(() => {
          const r = (function Dc(e) {
            return function (...t) {
              if (e) {
                const r = e(...t)
                for (const o in r) this[o] = r[o]
              }
            }
          })(n)
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this
            const s = new o(...i)
            return (a.annotation = s), a
            function a(u, l, c) {
              const d = u.hasOwnProperty(Jr)
                ? u[Jr]
                : Object.defineProperty(u, Jr, { value: [] })[Jr]
              for (; d.length <= c; ) d.push(null)
              return (d[c] = d[c] || []).push(s), u
            }
          }
          return (
            t && (o.prototype = Object.create(t.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          )
        })
      }
      function no(e, n) {
        e.forEach((t) => (Array.isArray(t) ? no(t, n) : n(t)))
      }
      function Xg(e, n, t) {
        n >= e.length ? e.push(t) : e.splice(n, 0, t)
      }
      function la(e, n) {
        return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0]
      }
      function wt(e, n, t) {
        let r = ro(e, n)
        return (
          r >= 0
            ? (e[1 | r] = t)
            : ((r = ~r),
              (function GS(e, n, t, r) {
                let o = e.length
                if (o == n) e.push(t, r)
                else if (1 === o) e.push(r, e[0]), (e[0] = t)
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > n; )
                    (e[o] = e[o - 2]), o--
                  ;(e[n] = t), (e[n + 1] = r)
                }
              })(e, r, n, t)),
          r
        )
      }
      function Cc(e, n) {
        const t = ro(e, n)
        if (t >= 0) return e[1 | t]
      }
      function ro(e, n) {
        return (function Jg(e, n, t) {
          let r = 0,
            o = e.length >> t
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << t]
            if (n === s) return i << t
            s > n ? (o = i) : (r = i + 1)
          }
          return ~(o << t)
        })(e, n, 1)
      }
      const da = ri(eo('Optional'), 8),
        fa = ri(eo('SkipSelf'), 4)
      function va(e) {
        return 128 == (128 & e.flags)
      }
      var Gn = (function (e) {
        return (
          (e[(e.Important = 1)] = 'Important'),
          (e[(e.DashCase = 2)] = 'DashCase'),
          e
        )
      })(Gn || {})
      const Ic = new Map()
      let g0 = 0
      const Tc = '__ngContext__'
      function qe(e, n) {
        dt(n)
          ? ((e[Tc] = n[li]),
            (function v0(e) {
              Ic.set(e[li], e)
            })(n))
          : (e[Tc] = n)
      }
      let Ac
      function Nc(e, n) {
        return Ac(e, n)
      }
      function bi(e) {
        const n = e[pe]
        return Je(n) ? n[pe] : n
      }
      function ym(e) {
        return Dm(e[ai])
      }
      function _m(e) {
        return Dm(e[$t])
      }
      function Dm(e) {
        for (; null !== e && !Je(e); ) e = e[$t]
        return e
      }
      function so(e, n, t, r, o) {
        if (null != r) {
          let i,
            s = !1
          Je(r) ? (i = r) : dt(r) && ((s = !0), (r = r[ve]))
          const a = le(r)
          0 === e && null !== t
            ? null == o
              ? Em(n, t, a)
              : fr(n, t, a, o || null, !0)
            : 1 === e && null !== t
              ? fr(n, t, a, o || null, !0)
              : 2 === e
                ? (function Ea(e, n, t) {
                    const r = wa(e, n)
                    r &&
                      (function k0(e, n, t, r) {
                        e.removeChild(n, t, r)
                      })(e, r, n, t)
                  })(n, a, s)
                : 3 === e && n.destroyNode(a),
            null != i &&
              (function j0(e, n, t, r, o) {
                const i = t[Qt]
                i !== le(t) && so(n, e, r, i, o)
                for (let a = $e; a < t.length; a++) {
                  const u = t[a]
                  Mi(u[I], u, e, n, r, i)
                }
              })(n, e, i, t, o)
        }
      }
      function Da(e, n, t) {
        return e.createElement(n, t)
      }
      function wm(e, n) {
        const t = e[Hr],
          r = t.indexOf(n)
        Cg(n), t.splice(r, 1)
      }
      function Ca(e, n) {
        if (e.length <= $e) return
        const t = $e + n,
          r = e[t]
        if (r) {
          const o = r[ui]
          null !== o && o !== e && wm(o, r), n > 0 && (e[t - 1][$t] = r[$t])
          const i = la(e, $e + n)
          !(function T0(e, n) {
            Mi(e, n, n[j], 2, null, null), (n[ve] = null), (n[ze] = null)
          })(r[I], r)
          const s = i[Yt]
          null !== s && s.detachView(i[I]),
            (r[pe] = null),
            (r[$t] = null),
            (r[B] &= -129)
        }
        return r
      }
      function Rc(e, n) {
        if (!(256 & n[B])) {
          const t = n[j]
          n[ci] && sg(n[ci]),
            n[di] && sg(n[di]),
            t.destroyNode && Mi(e, n, t, 3, null, null),
            (function O0(e) {
              let n = e[ai]
              if (!n) return xc(e[I], e)
              for (; n; ) {
                let t = null
                if (dt(n)) t = n[ai]
                else {
                  const r = n[$e]
                  r && (t = r)
                }
                if (!t) {
                  for (; n && !n[$t] && n !== e; )
                    dt(n) && xc(n[I], n), (n = n[pe])
                  null === n && (n = e), dt(n) && xc(n[I], n), (t = n && n[$t])
                }
                n = t
              }
            })(n)
        }
      }
      function xc(e, n) {
        if (!(256 & n[B])) {
          ;(n[B] &= -129),
            (n[B] |= 256),
            (function F0(e, n) {
              let t
              if (null != e && null != (t = e.destroyHooks))
                for (let r = 0; r < t.length; r += 2) {
                  const o = n[t[r]]
                  if (!(o instanceof gi)) {
                    const i = t[r + 1]
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1]
                        Xt(4, a, u)
                        try {
                          u.call(a)
                        } finally {
                          Xt(5, a, u)
                        }
                      }
                    else {
                      Xt(4, o, i)
                      try {
                        i.call(o)
                      } finally {
                        Xt(5, o, i)
                      }
                    }
                  }
                }
            })(e, n),
            (function P0(e, n) {
              const t = e.cleanup,
                r = n[jr]
              if (null !== t)
                for (let i = 0; i < t.length - 1; i += 2)
                  if ('string' == typeof t[i]) {
                    const s = t[i + 3]
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2)
                  } else t[i].call(r[t[i + 1]])
              null !== r && (n[jr] = null)
              const o = n[$n]
              if (null !== o) {
                n[$n] = null
                for (let i = 0; i < o.length; i++) (0, o[i])()
              }
            })(e, n),
            1 === n[I].type && n[j].destroy()
          const t = n[ui]
          if (null !== t && Je(n[pe])) {
            t !== n[pe] && wm(t, n)
            const r = n[Yt]
            null !== r && r.detachView(e)
          }
          !(function y0(e) {
            Ic.delete(e[li])
          })(n)
        }
      }
      function Pc(e, n, t) {
        return (function bm(e, n, t) {
          let r = n
          for (; null !== r && 40 & r.type; ) r = (n = r).parent
          if (null === r) return t[ve]
          {
            const { componentOffset: o } = r
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o]
              if (i === Vt.None || i === Vt.Emulated) return null
            }
            return ft(r, t)
          }
        })(e, n.parent, t)
      }
      function fr(e, n, t, r, o) {
        e.insertBefore(n, t, r, o)
      }
      function Em(e, n, t) {
        e.appendChild(n, t)
      }
      function Mm(e, n, t, r, o) {
        null !== r ? fr(e, n, t, r, o) : Em(e, n, t)
      }
      function wa(e, n) {
        return e.parentNode(n)
      }
      let Fc,
        Ma,
        jc,
        Ia,
        Tm = function Sm(e, n, t) {
          return 40 & e.type ? ft(e, t) : null
        }
      function ba(e, n, t, r) {
        const o = Pc(e, r, n),
          i = n[j],
          a = (function Im(e, n, t) {
            return Tm(e, n, t)
          })(r.parent || n[ze], r, n)
        if (null != o)
          if (Array.isArray(t))
            for (let u = 0; u < t.length; u++) Mm(i, o, t[u], a, !1)
          else Mm(i, o, t, a, !1)
        void 0 !== Fc && Fc(i, r, n, t, o)
      }
      function Ei(e, n) {
        if (null !== n) {
          const t = n.type
          if (3 & t) return ft(n, e)
          if (4 & t) return kc(-1, e[n.index])
          if (8 & t) {
            const r = n.child
            if (null !== r) return Ei(e, r)
            {
              const o = e[n.index]
              return Je(o) ? kc(-1, o) : le(o)
            }
          }
          if (32 & t) return Nc(n, e)() || le(e[n.index])
          {
            const r = Nm(e, n)
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Ei(bi(e[De]), r)
              : Ei(e, n.next)
          }
        }
        return null
      }
      function Nm(e, n) {
        return null !== n ? e[De][ze].projection[n.projection] : null
      }
      function kc(e, n) {
        const t = $e + e + 1
        if (t < n.length) {
          const r = n[t],
            o = r[I].firstChild
          if (null !== o) return Ei(r, o)
        }
        return n[Qt]
      }
      function Lc(e, n, t, r, o, i, s) {
        for (; null != t; ) {
          const a = r[t.index],
            u = t.type
          if (
            (s && 0 === n && (a && qe(le(a), r), (t.flags |= 2)),
            32 != (32 & t.flags))
          )
            if (8 & u) Lc(e, n, t.child, r, o, i, !1), so(n, e, o, a, i)
            else if (32 & u) {
              const l = Nc(t, r)
              let c
              for (; (c = l()); ) so(n, e, o, c, i)
              so(n, e, o, a, i)
            } else 16 & u ? Rm(e, n, r, t, o, i) : so(n, e, o, a, i)
          t = s ? t.projectionNext : t.next
        }
      }
      function Mi(e, n, t, r, o, i) {
        Lc(t, r, e.firstChild, n, o, i, !1)
      }
      function Rm(e, n, t, r, o, i) {
        const s = t[De],
          u = s[ze].projection[r.projection]
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) so(n, e, o, u[l], i)
        else {
          let l = u
          const c = s[pe]
          va(r) && (l.flags |= 128), Lc(e, n, l, c, o, i, !0)
        }
      }
      function xm(e, n, t) {
        '' === t ? e.removeAttribute(n, 'class') : e.setAttribute(n, 'class', t)
      }
      function Pm(e, n, t) {
        const { mergedAttrs: r, classes: o, styles: i } = t
        null !== r && Yl(e, n, r),
          null !== o && xm(e, n, o),
          null !== i &&
            (function B0(e, n, t) {
              e.setAttribute(n, 'style', t)
            })(e, n, i)
      }
      function ao(e) {
        return (
          (function Vc() {
            if (void 0 === Ma && ((Ma = null), ue.trustedTypes))
              try {
                Ma = ue.trustedTypes.createPolicy('angular', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                })
              } catch {}
            return Ma
          })()?.createHTML(e) || e
        )
      }
      function Lm(e) {
        return (
          (function $c() {
            if (void 0 === Ia && ((Ia = null), ue.trustedTypes))
              try {
                Ia = ue.trustedTypes.createPolicy('angular#unsafe-bypass', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                })
              } catch {}
            return Ia
          })()?.createScriptURL(e) || e
        )
      }
      class hr {
        constructor(n) {
          this.changingThisBreaksApplicationSecurity = n
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Tp})`
        }
      }
      class q0 extends hr {
        getTypeName() {
          return 'HTML'
        }
      }
      class W0 extends hr {
        getTypeName() {
          return 'Style'
        }
      }
      class Z0 extends hr {
        getTypeName() {
          return 'Script'
        }
      }
      class Y0 extends hr {
        getTypeName() {
          return 'URL'
        }
      }
      class Q0 extends hr {
        getTypeName() {
          return 'ResourceURL'
        }
      }
      function bt(e) {
        return e instanceof hr ? e.changingThisBreaksApplicationSecurity : e
      }
      function en(e, n) {
        const t = (function X0(e) {
          return (e instanceof hr && e.getTypeName()) || null
        })(e)
        if (null != t && t !== n) {
          if ('ResourceURL' === t && 'URL' === n) return !0
          throw new Error(`Required a safe ${n}, got a ${t} (see ${Tp})`)
        }
        return t === n
      }
      class rT {
        constructor(n) {
          this.inertDocumentHelper = n
        }
        getInertBodyElement(n) {
          n = '<body><remove></remove>' + n
          try {
            const t = new window.DOMParser().parseFromString(
              ao(n),
              'text/html'
            ).body
            return null === t
              ? this.inertDocumentHelper.getInertBodyElement(n)
              : (t.removeChild(t.firstChild), t)
          } catch {
            return null
          }
        }
      }
      class oT {
        constructor(n) {
          ;(this.defaultDoc = n),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                'sanitization-inert'
              ))
        }
        getInertBodyElement(n) {
          const t = this.inertDocument.createElement('template')
          return (t.innerHTML = ao(n)), t
        }
      }
      const sT = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i
      function Sa(e) {
        return (e = String(e)).match(sT) ? e : 'unsafe:' + e
      }
      function yn(e) {
        const n = {}
        for (const t of e.split(',')) n[t] = !0
        return n
      }
      function Ii(...e) {
        const n = {}
        for (const t of e) for (const r in t) t.hasOwnProperty(r) && (n[r] = !0)
        return n
      }
      const jm = yn('area,br,col,hr,img,wbr'),
        $m = yn('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        Bm = yn('rp,rt'),
        Bc = Ii(
          jm,
          Ii(
            $m,
            yn(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          Ii(
            Bm,
            yn(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          Ii(Bm, $m)
        ),
        Uc = yn('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        Um = Ii(
          Uc,
          yn(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          yn(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        aT = yn('script,style,template')
      class uT {
        constructor() {
          ;(this.sanitizedSomething = !1), (this.buf = [])
        }
        sanitizeChildren(n) {
          let t = n.firstChild,
            r = !0
          for (; t; )
            if (
              (t.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(t))
                : t.nodeType === Node.TEXT_NODE
                  ? this.chars(t.nodeValue)
                  : (this.sanitizedSomething = !0),
              r && t.firstChild)
            )
              t = t.firstChild
            else
              for (; t; ) {
                t.nodeType === Node.ELEMENT_NODE && this.endElement(t)
                let o = this.checkClobberedElement(t, t.nextSibling)
                if (o) {
                  t = o
                  break
                }
                t = this.checkClobberedElement(t, t.parentNode)
              }
          return this.buf.join('')
        }
        startElement(n) {
          const t = n.nodeName.toLowerCase()
          if (!Bc.hasOwnProperty(t))
            return (this.sanitizedSomething = !0), !aT.hasOwnProperty(t)
          this.buf.push('<'), this.buf.push(t)
          const r = n.attributes
          for (let o = 0; o < r.length; o++) {
            const i = r.item(o),
              s = i.name,
              a = s.toLowerCase()
            if (!Um.hasOwnProperty(a)) {
              this.sanitizedSomething = !0
              continue
            }
            let u = i.value
            Uc[a] && (u = Sa(u)), this.buf.push(' ', s, '="', Hm(u), '"')
          }
          return this.buf.push('>'), !0
        }
        endElement(n) {
          const t = n.nodeName.toLowerCase()
          Bc.hasOwnProperty(t) &&
            !jm.hasOwnProperty(t) &&
            (this.buf.push('</'), this.buf.push(t), this.buf.push('>'))
        }
        chars(n) {
          this.buf.push(Hm(n))
        }
        checkClobberedElement(n, t) {
          if (
            t &&
            (n.compareDocumentPosition(t) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${n.outerHTML}`
            )
          return t
        }
      }
      const lT = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        cT = /([^\#-~ |!])/g
      function Hm(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(lT, function (n) {
            return (
              '&#' +
              (1024 * (n.charCodeAt(0) - 55296) +
                (n.charCodeAt(1) - 56320) +
                65536) +
              ';'
            )
          })
          .replace(cT, function (n) {
            return '&#' + n.charCodeAt(0) + ';'
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      }
      let Ta
      function Gm(e, n) {
        let t = null
        try {
          Ta =
            Ta ||
            (function Vm(e) {
              const n = new oT(e)
              return (function iT() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    ao(''),
                    'text/html'
                  )
                } catch {
                  return !1
                }
              })()
                ? new rT(n)
                : n
            })(e)
          let r = n ? String(n) : ''
          t = Ta.getInertBodyElement(r)
          let o = 5,
            i = r
          do {
            if (0 === o)
              throw new Error(
                'Failed to sanitize html because the input is unstable'
              )
            o--, (r = i), (i = t.innerHTML), (t = Ta.getInertBodyElement(r))
          } while (r !== i)
          return ao(new uT().sanitizeChildren(Hc(t) || t))
        } finally {
          if (t) {
            const r = Hc(t) || t
            for (; r.firstChild; ) r.removeChild(r.firstChild)
          }
        }
      }
      function Hc(e) {
        return 'content' in e &&
          (function dT(e) {
            return e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName
          })(e)
          ? e.content
          : null
      }
      var xt = (function (e) {
        return (
          (e[(e.NONE = 0)] = 'NONE'),
          (e[(e.HTML = 1)] = 'HTML'),
          (e[(e.STYLE = 2)] = 'STYLE'),
          (e[(e.SCRIPT = 3)] = 'SCRIPT'),
          (e[(e.URL = 4)] = 'URL'),
          (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
          e
        )
      })(xt || {})
      function Si(e) {
        const n = Ti()
        return n ? n.sanitize(xt.URL, e) || '' : en(e, 'URL') ? bt(e) : Sa(V(e))
      }
      function Gc(e) {
        const n = Ti()
        if (n) return Lm(n.sanitize(xt.RESOURCE_URL, e) || '')
        if (en(e, 'ResourceURL')) return Lm(bt(e))
        throw new w(904, !1)
      }
      function Ti() {
        const e = C()
        return e && e[$r].sanitizer
      }
      class S {
        constructor(n, t) {
          ;(this._desc = n),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = N({
                  token: this,
                  providedIn: t.providedIn || 'root',
                  factory: t.factory,
                }))
        }
        get multi() {
          return this
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }
      const Ai = new S('ENVIRONMENT_INITIALIZER'),
        qm = new S('INJECTOR', -1),
        Wm = new S('INJECTOR_DEF_TYPES')
      class zc {
        get(n, t = ni) {
          if (t === ni) {
            const r = new Error(`NullInjectorError: No provider for ${Se(n)}!`)
            throw ((r.name = 'NullInjectorError'), r)
          }
          return t
        }
      }
      function yT(...e) {
        return { ɵproviders: Zm(0, e), ɵfromNgModule: !0 }
      }
      function Zm(e, ...n) {
        const t = [],
          r = new Set()
        let o
        const i = (s) => {
          t.push(s)
        }
        return (
          no(n, (s) => {
            const a = s
            Aa(a, i, [], r) && ((o ||= []), o.push(a))
          }),
          void 0 !== o && Ym(o, i),
          t
        )
      }
      function Ym(e, n) {
        for (let t = 0; t < e.length; t++) {
          const { ngModule: r, providers: o } = e[t]
          Wc(o, (i) => {
            n(i, r)
          })
        }
      }
      function Aa(e, n, t, r) {
        if (!(e = k(e))) return !1
        let o = null,
          i = Us(e)
        const s = !i && Z(e)
        if (i || s) {
          if (s && !s.standalone) return !1
          o = e
        } else {
          const u = e.ngModule
          if (((i = Us(u)), !i)) return !1
          o = u
        }
        const a = r.has(o)
        if (s) {
          if (a) return !1
          if ((r.add(o), s.dependencies)) {
            const u =
              'function' == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies
            for (const l of u) Aa(l, n, t, r)
          }
        } else {
          if (!i) return !1
          {
            if (null != i.imports && !a) {
              let l
              r.add(o)
              try {
                no(i.imports, (c) => {
                  Aa(c, n, t, r) && ((l ||= []), l.push(c))
                })
              } finally {
              }
              void 0 !== l && Ym(l, n)
            }
            if (!a) {
              const l = lr(o) || (() => new o())
              n({ provide: o, useFactory: l, deps: Q }, o),
                n({ provide: Wm, useValue: o, multi: !0 }, o),
                n({ provide: Ai, useValue: () => M(o), multi: !0 }, o)
            }
            const u = i.providers
            if (null != u && !a) {
              const l = e
              Wc(u, (c) => {
                n(c, l)
              })
            }
          }
        }
        return o !== e && void 0 !== e.providers
      }
      function Wc(e, n) {
        for (let t of e)
          Ll(t) && (t = t.ɵproviders), Array.isArray(t) ? Wc(t, n) : n(t)
      }
      const _T = te({ provide: String, useValue: te })
      function Zc(e) {
        return null !== e && 'object' == typeof e && _T in e
      }
      function pr(e) {
        return 'function' == typeof e
      }
      const Yc = new S('Set Injector scope.'),
        Na = {},
        CT = {}
      let Qc
      function Oa() {
        return void 0 === Qc && (Qc = new zc()), Qc
      }
      class Et {}
      class Ra extends Et {
        get destroyed() {
          return this._destroyed
        }
        constructor(n, t, r, o) {
          super(),
            (this.parent = t),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Jc(n, (s) => this.processProvider(s)),
            this.records.set(qm, lo(void 0, this)),
            o.has('environment') && this.records.set(Et, lo(void 0, this))
          const i = this.records.get(Yc)
          null != i && 'string' == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Wm.multi, Q, G.Self)))
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0)
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy()
            const n = this._onDestroyHooks
            this._onDestroyHooks = []
            for (const t of n) t()
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear()
          }
        }
        onDestroy(n) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(n),
            () => this.removeOnDestroy(n)
          )
        }
        runInContext(n) {
          this.assertNotDestroyed()
          const t = Vn(this),
            r = ct(void 0)
          try {
            return n()
          } finally {
            Vn(t), ct(r)
          }
        }
        get(n, t = ni, r = G.Default) {
          if ((this.assertNotDestroyed(), n.hasOwnProperty(Lp)))
            return n[Lp](this)
          r = zs(r)
          const i = Vn(this),
            s = ct(void 0)
          try {
            if (!(r & G.SkipSelf)) {
              let u = this.records.get(n)
              if (void 0 === u) {
                const l =
                  (function IT(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof S)
                    )
                  })(n) && Bs(n)
                ;(u = l && this.injectableDefInScope(l) ? lo(Xc(n), Na) : null),
                  this.records.set(n, u)
              }
              if (null != u) return this.hydrate(n, u)
            }
            return (r & G.Self ? Oa() : this.parent).get(
              n,
              (t = r & G.Optional && t === ni ? null : t)
            )
          } catch (a) {
            if ('NullInjectorError' === a.name) {
              if (((a[Gs] = a[Gs] || []).unshift(Se(n)), i)) throw a
              return (function mI(e, n, t, r) {
                const o = e[Gs]
                throw (
                  (n[Pp] && o.unshift(n[Pp]),
                  (e.message = (function vI(e, n, t, r = null) {
                    e =
                      e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1)
                        ? e.slice(2)
                        : e
                    let o = Se(n)
                    if (Array.isArray(n)) o = n.map(Se).join(' -> ')
                    else if ('object' == typeof n) {
                      let i = []
                      for (let s in n)
                        if (n.hasOwnProperty(s)) {
                          let a = n[s]
                          i.push(
                            s +
                              ':' +
                              ('string' == typeof a ? JSON.stringify(a) : Se(a))
                          )
                        }
                      o = `{${i.join(', ')}}`
                    }
                    return `${t}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(dI, '\n  ')}`
                  })('\n' + e.message, o, t, r)),
                  (e.ngTokenPath = o),
                  (e[Gs] = null),
                  e)
                )
              })(a, n, 'R3InjectorError', this.source)
            }
            throw a
          } finally {
            ct(s), Vn(i)
          }
        }
        resolveInjectorInitializers() {
          const n = Vn(this),
            t = ct(void 0)
          try {
            const o = this.get(Ai.multi, Q, G.Self)
            for (const i of o) i()
          } finally {
            Vn(n), ct(t)
          }
        }
        toString() {
          const n = [],
            t = this.records
          for (const r of t.keys()) n.push(Se(r))
          return `R3Injector[${n.join(', ')}]`
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1)
        }
        processProvider(n) {
          let t = pr((n = k(n))) ? n : k(n && n.provide)
          const r = (function bT(e) {
            return Zc(e) ? lo(void 0, e.useValue) : lo(Jm(e), Na)
          })(n)
          if (pr(n) || !0 !== n.multi) this.records.get(t)
          else {
            let o = this.records.get(t)
            o ||
              ((o = lo(void 0, Na, !0)),
              (o.factory = () => ql(o.multi)),
              this.records.set(t, o)),
              (t = n),
              o.multi.push(n)
          }
          this.records.set(t, r)
        }
        hydrate(n, t) {
          return (
            t.value === Na && ((t.value = CT), (t.value = t.factory())),
            'object' == typeof t.value &&
              t.value &&
              (function MT(e) {
                return (
                  null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.ngOnDestroy
                )
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          )
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1
          const t = k(n.providedIn)
          return 'string' == typeof t
            ? 'any' === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t)
        }
        removeOnDestroy(n) {
          const t = this._onDestroyHooks.indexOf(n)
          ;-1 !== t && this._onDestroyHooks.splice(t, 1)
        }
      }
      function Xc(e) {
        const n = Bs(e),
          t = null !== n ? n.factory : lr(e)
        if (null !== t) return t
        if (e instanceof S) throw new w(204, !1)
        if (e instanceof Function)
          return (function wT(e) {
            const n = e.length
            if (n > 0)
              throw (
                ((function Di(e, n) {
                  const t = []
                  for (let r = 0; r < e; r++) t.push(n)
                  return t
                })(n, '?'),
                new w(204, !1))
              )
            const t = (function aI(e) {
              return (e && (e[Hs] || e[Np])) || null
            })(e)
            return null !== t ? () => t.factory(e) : () => new e()
          })(e)
        throw new w(204, !1)
      }
      function Jm(e, n, t) {
        let r
        if (pr(e)) {
          const o = k(e)
          return lr(o) || Xc(o)
        }
        if (Zc(e)) r = () => k(e.useValue)
        else if (
          (function Xm(e) {
            return !(!e || !e.useFactory)
          })(e)
        )
          r = () => e.useFactory(...ql(e.deps || []))
        else if (
          (function Qm(e) {
            return !(!e || !e.useExisting)
          })(e)
        )
          r = () => M(k(e.useExisting))
        else {
          const o = k(e && (e.useClass || e.provide))
          if (
            !(function ET(e) {
              return !!e.deps
            })(e)
          )
            return lr(o) || Xc(o)
          r = () => new o(...ql(e.deps))
        }
        return r
      }
      function lo(e, n, t = !1) {
        return { factory: e, value: n, multi: t ? [] : void 0 }
      }
      function Jc(e, n) {
        for (const t of e)
          Array.isArray(t) ? Jc(t, n) : t && Ll(t) ? Jc(t.ɵproviders, n) : n(t)
      }
      const xa = new S('AppId', { providedIn: 'root', factory: () => ST }),
        ST = 'ng',
        Km = new S('Platform Initializer'),
        gr = new S('Platform ID', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        ev = new S('CSP nonce', {
          providedIn: 'root',
          factory: () =>
            (function uo() {
              if (void 0 !== jc) return jc
              if (typeof document < 'u') return document
              throw new w(210, !1)
            })()
              .body?.querySelector('[ngCspNonce]')
              ?.getAttribute('ngCspNonce') || null,
        })
      let tv = (e, n, t) => null
      function sd(e, n, t = !1) {
        return tv(e, n, t)
      }
      class LT {}
      class ov {}
      class jT {
        resolveComponentFactory(n) {
          throw (function VT(e) {
            const n = Error(`No component factory found for ${Se(e)}.`)
            return (n.ngComponent = e), n
          })(n)
        }
      }
      let ja = (() => {
        class e {
          static #e = (this.NULL = new jT())
        }
        return e
      })()
      function $T() {
        return ho(Ue(), C())
      }
      function ho(e, n) {
        return new Mt(ft(e, n))
      }
      let Mt = (() => {
        class e {
          constructor(t) {
            this.nativeElement = t
          }
          static #e = (this.__NG_ELEMENT_ID__ = $T)
        }
        return e
      })()
      class sv {}
      let _n = (() => {
          class e {
            constructor() {
              this.destroyNode = null
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function UT() {
                const e = C(),
                  t = Ct(Ue().index, e)
                return (dt(t) ? t : e)[j]
              })())
          }
          return e
        })(),
        HT = (() => {
          class e {
            static #e = (this.ɵprov = N({
              token: e,
              providedIn: 'root',
              factory: () => null,
            }))
          }
          return e
        })()
      class Ri {
        constructor(n) {
          ;(this.full = n),
            (this.major = n.split('.')[0]),
            (this.minor = n.split('.')[1]),
            (this.patch = n.split('.').slice(2).join('.'))
        }
      }
      const GT = new Ri('16.2.10'),
        ld = {}
      function cv(e, n = null, t = null, r) {
        const o = dv(e, n, t, r)
        return o.resolveInjectorInitializers(), o
      }
      function dv(e, n = null, t = null, r, o = new Set()) {
        const i = [t || Q, yT(e)]
        return (
          (r = r || ('object' == typeof e ? void 0 : Se(e))),
          new Ra(i, n || Oa(), r || null, o)
        )
      }
      let pt = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = ni)
          static #t = (this.NULL = new zc())
          static create(t, r) {
            if (Array.isArray(t)) return cv({ name: '' }, r, t, '')
            {
              const o = t.name ?? ''
              return cv({ name: o }, t.parent, t.providers, o)
            }
          }
          static #n = (this.ɵprov = N({
            token: e,
            providedIn: 'any',
            factory: () => M(qm),
          }))
          static #r = (this.__NG_ELEMENT_ID__ = -1)
        }
        return e
      })()
      function dd(e) {
        return e.ngOriginalError
      }
      class Dn {
        constructor() {
          this._console = console
        }
        handleError(n) {
          const t = this._findOriginalError(n)
          this._console.error('ERROR', n),
            t && this._console.error('ORIGINAL ERROR', t)
        }
        _findOriginalError(n) {
          let t = n && dd(n)
          for (; t && dd(t); ) t = dd(t)
          return t || null
        }
      }
      function hd(e) {
        return (n) => {
          setTimeout(e, void 0, n)
        }
      }
      const ie = class XT extends ut {
        constructor(n = !1) {
          super(), (this.__isAsync = n)
        }
        emit(n) {
          super.next(n)
        }
        subscribe(n, t, r) {
          let o = n,
            i = t || (() => null),
            s = r
          if (n && 'object' == typeof n) {
            const u = n
            ;(o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u))
          }
          this.__isAsync && ((i = hd(i)), o && (o = hd(o)), s && (s = hd(s)))
          const a = super.subscribe({ next: o, error: i, complete: s })
          return n instanceof at && n.add(a), a
        }
      }
      function hv(...e) {}
      class ce {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ie(!1)),
            (this.onMicrotaskEmpty = new ie(!1)),
            (this.onStable = new ie(!1)),
            (this.onError = new ie(!1)),
            typeof Zone > 'u')
          )
            throw new w(908, !1)
          Zone.assertZonePatched()
          const o = this
          ;(o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && t),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function JT() {
              const e = 'function' == typeof ue.requestAnimationFrame
              let n = ue[e ? 'requestAnimationFrame' : 'setTimeout'],
                t = ue[e ? 'cancelAnimationFrame' : 'clearTimeout']
              if (typeof Zone < 'u' && n && t) {
                const r = n[Zone.__symbol__('OriginalDelegate')]
                r && (n = r)
                const o = t[Zone.__symbol__('OriginalDelegate')]
                o && (t = o)
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: t,
              }
            })().nativeRequestAnimationFrame),
            (function tA(e) {
              const n = () => {
                !(function eA(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ue, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              ;(e.lastRequestAnimationFrameId = -1),
                                gd(e),
                                (e.isCheckStableRunning = !0),
                                pd(e),
                                (e.isCheckStableRunning = !1)
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke()
                      })),
                    gd(e))
                })(e)
              }
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, r, o, i, s, a) => {
                  if (
                    (function rA(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      )
                    })(a)
                  )
                    return t.invokeTask(o, i, s, a)
                  try {
                    return pv(e), t.invokeTask(o, i, s, a)
                  } finally {
                    ;((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      n(),
                      gv(e)
                  }
                },
                onInvoke: (t, r, o, i, s, a, u) => {
                  try {
                    return pv(e), t.invoke(o, i, s, a, u)
                  } finally {
                    e.shouldCoalesceRunChangeDetection && n(), gv(e)
                  }
                },
                onHasTask: (t, r, o, i) => {
                  t.hasTask(o, i),
                    r === o &&
                      ('microTask' == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          gd(e),
                          pd(e))
                        : 'macroTask' == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask))
                },
                onHandleError: (t, r, o, i) => (
                  t.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              })
            })(o)
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone')
        }
        static assertInAngularZone() {
          if (!ce.isInAngularZone()) throw new w(909, !1)
        }
        static assertNotInAngularZone() {
          if (ce.isInAngularZone()) throw new w(909, !1)
        }
        run(n, t, r) {
          return this._inner.run(n, t, r)
        }
        runTask(n, t, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask('NgZoneEvent: ' + o, n, KT, hv, hv)
          try {
            return i.runTask(s, t, r)
          } finally {
            i.cancelTask(s)
          }
        }
        runGuarded(n, t, r) {
          return this._inner.runGuarded(n, t, r)
        }
        runOutsideAngular(n) {
          return this._outer.run(n)
        }
      }
      const KT = {}
      function pd(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null)
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null))
              } finally {
                e.isStable = !0
              }
          }
      }
      function gd(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        )
      }
      function pv(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null))
      }
      function gv(e) {
        e._nesting--, pd(e)
      }
      class nA {
        constructor() {
          ;(this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ie()),
            (this.onMicrotaskEmpty = new ie()),
            (this.onStable = new ie()),
            (this.onError = new ie())
        }
        run(n, t, r) {
          return n.apply(t, r)
        }
        runGuarded(n, t, r) {
          return n.apply(t, r)
        }
        runOutsideAngular(n) {
          return n()
        }
        runTask(n, t, r, o) {
          return n.apply(t, r)
        }
      }
      const mv = new S('', { providedIn: 'root', factory: vv })
      function vv() {
        const e = T(ce)
        let n = !0
        return (function XM(...e) {
          const n = ti(e),
            t = (function GM(e, n) {
              return 'number' == typeof Rl(e) ? e.pop() : n
            })(e, 1 / 0),
            r = e
          return r.length ? (1 === r.length ? vt(r[0]) : kr(t)(Ie(r, n))) : Tt
        })(
          new he((o) => {
            ;(n =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(n), o.complete()
              })
          }),
          new he((o) => {
            let i
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                ce.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !n &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((n = !0), o.next(!0))
                  })
              })
            })
            const s = e.onUnstable.subscribe(() => {
              ce.assertInAngularZone(),
                n &&
                  ((n = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1)
                  }))
            })
            return () => {
              i.unsubscribe(), s.unsubscribe()
            }
          }).pipe(xl())
        )
      }
      function Cn(e) {
        return e instanceof Function ? e() : e
      }
      let md = (() => {
        class e {
          constructor() {
            ;(this.renderDepth = 0), (this.handler = null)
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute()
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null)
          }
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          }))
        }
        return e
      })()
      function xi(e) {
        for (; e; ) {
          e[B] |= 64
          const n = bi(e)
          if (Jl(e) && !n) return e
          e = n
        }
        return null
      }
      const wv = new S('', { providedIn: 'root', factory: () => !1 })
      let Ba = null
      function Iv(e, n) {
        return e[n] ?? Av()
      }
      function Sv(e, n) {
        const t = Av()
        t.producerNode?.length && ((e[n] = Ba), (t.lView = e), (Ba = Tv()))
      }
      const hA = {
        ...eg,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          xi(e.lView)
        },
        lView: null,
      }
      function Tv() {
        return Object.create(hA)
      }
      function Av() {
        return (Ba ??= Tv()), Ba
      }
      const $ = {}
      function O(e) {
        Nv(Y(), C(), et() + e, !1)
      }
      function Nv(e, n, t, r) {
        if (!r)
          if (3 == (3 & n[B])) {
            const i = e.preOrderCheckHooks
            null !== i && na(n, i, t)
          } else {
            const i = e.preOrderHooks
            null !== i && ra(n, i, 0, t)
          }
        cr(t)
      }
      function v(e, n = G.Default) {
        const t = C()
        return null === t ? M(e, n) : zg(Ue(), t, k(e), n)
      }
      function Ua(e, n, t, r, o, i, s, a, u, l, c) {
        const d = n.blueprint.slice()
        return (
          (d[ve] = o),
          (d[B] = 140 | r),
          (null !== l || (e && 2048 & e[B])) && (d[B] |= 2048),
          Dg(d),
          (d[pe] = d[Br] = e),
          (d[_e] = t),
          (d[$r] = s || (e && e[$r])),
          (d[j] = a || (e && e[j])),
          (d[jn] = u || (e && e[jn]) || null),
          (d[ze] = i),
          (d[li] = (function m0() {
            return g0++
          })()),
          (d[gn] = c),
          (d[Qp] = l),
          (d[De] = 2 == n.type ? e[De] : d),
          d
        )
      }
      function mo(e, n, t, r, o) {
        let i = e.data[n]
        if (null === i)
          (i = (function vd(e, n, t, r, o) {
            const i = Ig(),
              s = sc(),
              u = (e.data[n] = (function CA(e, n, t, r, o, i) {
                let s = n ? n.injectorIndex : -1,
                  a = 0
                return (
                  (function qr() {
                    return null !== F.skipHydrationRootTNode
                  })() && (a |= 128),
                  {
                    type: t,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: n,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                )
              })(0, s ? i : i && i.parent, t, n, r, o))
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            )
          })(e, n, t, r, o)),
            (function pS() {
              return F.lFrame.inI18n
            })() && (i.flags |= 32)
        else if (64 & i.type) {
          ;(i.type = t), (i.value = r), (i.attrs = o)
          const s = (function pi() {
            const e = F.lFrame,
              n = e.currentTNode
            return e.isParent ? n : n.parent
          })()
          i.injectorIndex = null === s ? -1 : s.injectorIndex
        }
        return Jt(i, !0), i
      }
      function Pi(e, n, t, r) {
        if (0 === t) return -1
        const o = n.length
        for (let i = 0; i < t; i++)
          n.push(r), e.blueprint.push(r), e.data.push(null)
        return o
      }
      function Rv(e, n, t, r, o) {
        const i = Iv(n, ci),
          s = et(),
          a = 2 & r
        try {
          cr(-1), a && n.length > z && Nv(e, n, z, !1), Xt(a ? 2 : 0, o)
          const l = a ? i : null,
            c = ec(l)
          try {
            null !== l && (l.dirty = !1), t(r, o)
          } finally {
            tc(l, c)
          }
        } finally {
          a && null === n[ci] && Sv(n, ci), cr(s), Xt(a ? 3 : 1, o)
        }
      }
      function yd(e, n, t) {
        if (Xl(n)) {
          const r = Nt(null)
          try {
            const i = n.directiveEnd
            for (let s = n.directiveStart; s < i; s++) {
              const a = e.data[s]
              a.contentQueries && a.contentQueries(1, t[s], s)
            }
          } finally {
            Nt(r)
          }
        }
      }
      function _d(e, n, t) {
        Mg() &&
          ((function TA(e, n, t, r) {
            const o = t.directiveStart,
              i = t.directiveEnd
            ur(t) &&
              (function FA(e, n, t) {
                const r = ft(n, e),
                  o = xv(t)
                let s = 16
                t.signals ? (s = 4096) : t.onPush && (s = 64)
                const a = Ha(
                  e,
                  Ua(
                    e,
                    o,
                    null,
                    s,
                    r,
                    n,
                    null,
                    e[$r].rendererFactory.createRenderer(r, t),
                    null,
                    null,
                    null
                  )
                )
                e[n.index] = a
              })(n, t, e.data[o + t.componentOffset]),
              e.firstCreatePass || ia(t, n),
              qe(r, n)
            const s = t.initialInputs
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = dr(n, e, a, t)
              qe(l, n),
                null !== s && kA(0, a - o, l, u, 0, s),
                Bt(u) && (Ct(t.index, n)[_e] = dr(n, e, a, t))
            }
          })(e, n, t, ft(t, n)),
          64 == (64 & t.flags) && Vv(e, n, t))
      }
      function Dd(e, n, t = ft) {
        const r = n.localNames
        if (null !== r) {
          let o = n.index + 1
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? t(n, e) : e[s]
            e[o++] = a
          }
        }
      }
      function xv(e) {
        const n = e.tView
        return null === n || n.incompleteFirstPass
          ? (e.tView = Cd(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : n
      }
      function Cd(e, n, t, r, o, i, s, a, u, l, c) {
        const d = z + r,
          f = d + o,
          h = (function gA(e, n) {
            const t = []
            for (let r = 0; r < n; r++) t.push(r < e ? null : $)
            return t
          })(d, f),
          p = 'function' == typeof l ? l() : l
        return (h[I] = {
          type: e,
          blueprint: h,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: c,
        })
      }
      let Pv = (e) => null
      function Fv(e, n, t, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            t = null === t ? {} : t
            const i = e[o]
            null === r
              ? kv(t, n, o, i)
              : r.hasOwnProperty(o) && kv(t, n, r[o], i)
          }
        return t
      }
      function kv(e, n, t, r) {
        e.hasOwnProperty(t) ? e[t].push(n, r) : (e[t] = [n, r])
      }
      function It(e, n, t, r, o, i, s, a) {
        const u = ft(n, t)
        let c,
          l = n.inputs
        !a && null != l && (c = l[r])
          ? (Id(e, t, c, r, o),
            ur(n) &&
              (function EA(e, n) {
                const t = Ct(n, e)
                16 & t[B] || (t[B] |= 64)
              })(t, n.index))
          : 3 & n.type &&
            ((r = (function bA(e) {
              return 'class' === e
                ? 'className'
                : 'for' === e
                  ? 'htmlFor'
                  : 'formaction' === e
                    ? 'formAction'
                    : 'innerHtml' === e
                      ? 'innerHTML'
                      : 'readonly' === e
                        ? 'readOnly'
                        : 'tabindex' === e
                          ? 'tabIndex'
                          : e
            })(r)),
            (o = null != s ? s(o, n.value || '', r) : o),
            i.setProperty(u, r, o))
      }
      function wd(e, n, t, r) {
        if (Mg()) {
          const o = null === r ? null : { '': -1 },
            i = (function NA(e, n) {
              const t = e.directiveRegistry
              let r = null,
                o = null
              if (t)
                for (let i = 0; i < t.length; i++) {
                  const s = t[i]
                  if (Gp(n, s.selectors, !1))
                    if ((r || (r = []), Bt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = []
                        ;(o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          bd(e, n, a.length)
                      } else r.unshift(s), bd(e, n, 0)
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s)
                }
              return null === r ? null : [r, o]
            })(e, t)
          let s, a
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && Lv(e, n, t, s, o, a),
            o &&
              (function OA(e, n, t) {
                if (n) {
                  const r = (e.localNames = [])
                  for (let o = 0; o < n.length; o += 2) {
                    const i = t[n[o + 1]]
                    if (null == i) throw new w(-301, !1)
                    r.push(n[o], i)
                  }
                }
              })(t, r, o)
        }
        t.mergedAttrs = ii(t.mergedAttrs, t.attrs)
      }
      function Lv(e, n, t, r, o, i) {
        for (let l = 0; l < r.length; l++) yc(ia(t, n), e, r[l].type)
        !(function xA(e, n, t) {
          ;(e.flags |= 1),
            (e.directiveStart = n),
            (e.directiveEnd = n + t),
            (e.providerIndexes = n)
        })(t, e.data.length, r.length)
        for (let l = 0; l < r.length; l++) {
          const c = r[l]
          c.providersResolver && c.providersResolver(c)
        }
        let s = !1,
          a = !1,
          u = Pi(e, n, r.length, null)
        for (let l = 0; l < r.length; l++) {
          const c = r[l]
          ;(t.mergedAttrs = ii(t.mergedAttrs, c.hostAttrs)),
            PA(e, t, n, u, c),
            RA(u, c, o),
            null !== c.contentQueries && (t.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (t.flags |= 64)
          const d = c.type.prototype
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(t.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(t.index), (a = !0)),
            u++
        }
        !(function wA(e, n, t) {
          const o = n.directiveEnd,
            i = e.data,
            s = n.attrs,
            a = []
          let u = null,
            l = null
          for (let c = n.directiveStart; c < o; c++) {
            const d = i[c],
              f = t ? t.get(d) : null,
              p = f ? f.outputs : null
            ;(u = Fv(d.inputs, c, u, f ? f.inputs : null)),
              (l = Fv(d.outputs, c, l, p))
            const g = null === u || null === s || Hp(n) ? null : LA(u, c, s)
            a.push(g)
          }
          null !== u &&
            (u.hasOwnProperty('class') && (n.flags |= 8),
            u.hasOwnProperty('style') && (n.flags |= 16)),
            (n.initialInputs = a),
            (n.inputs = u),
            (n.outputs = l)
        })(e, t, i)
      }
      function Vv(e, n, t) {
        const r = t.directiveStart,
          o = t.directiveEnd,
          i = t.index,
          s = (function mS() {
            return F.lFrame.currentDirectiveIndex
          })()
        try {
          cr(i)
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = n[a]
            uc(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                AA(u, l)
          }
        } finally {
          cr(-1), uc(s)
        }
      }
      function AA(e, n) {
        null !== e.hostBindings && e.hostBindings(1, n)
      }
      function bd(e, n, t) {
        ;(n.componentOffset = t), (e.components ??= []).push(n.index)
      }
      function RA(e, n, t) {
        if (t) {
          if (n.exportAs)
            for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e
          Bt(n) && (t[''] = e)
        }
      }
      function PA(e, n, t, r, o) {
        e.data[r] = o
        const i = o.factory || (o.factory = lr(o.type)),
          s = new gi(i, Bt(o), v)
        ;(e.blueprint[r] = s),
          (t[r] = s),
          (function IA(e, n, t, r, o) {
            const i = o.hostBindings
            if (i) {
              let s = e.hostBindingOpCodes
              null === s && (s = e.hostBindingOpCodes = [])
              const a = ~n.index
              ;(function SA(e) {
                let n = e.length
                for (; n > 0; ) {
                  const t = e[--n]
                  if ('number' == typeof t && t < 0) return t
                }
                return 0
              })(s) != a && s.push(a),
                s.push(t, r, i)
            }
          })(e, n, r, Pi(e, t, o.hostVars, $), o)
      }
      function tn(e, n, t, r, o, i) {
        const s = ft(e, n)
        !(function Ed(e, n, t, r, o, i, s) {
          if (null == i) e.removeAttribute(n, o, t)
          else {
            const a = null == s ? V(i) : s(i, r || '', o)
            e.setAttribute(n, o, a, t)
          }
        })(n[j], s, i, e.value, t, r, o)
      }
      function kA(e, n, t, r, o, i) {
        const s = i[n]
        if (null !== s)
          for (let a = 0; a < s.length; ) jv(r, t, s[a++], s[a++], s[a++])
      }
      function jv(e, n, t, r, o) {
        const i = Nt(null)
        try {
          const s = e.inputTransforms
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(n, o)),
            null !== e.setInput ? e.setInput(n, o, t, r) : (n[r] = o)
        } finally {
          Nt(i)
        }
      }
      function LA(e, n, t) {
        let r = null,
          o = 0
        for (; o < t.length; ) {
          const i = t[o]
          if (0 !== i)
            if (5 !== i) {
              if ('number' == typeof i) break
              if (e.hasOwnProperty(i)) {
                null === r && (r = [])
                const s = e[i]
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === n) {
                    r.push(i, s[a + 1], t[o + 1])
                    break
                  }
              }
              o += 2
            } else o += 2
          else o += 4
        }
        return r
      }
      function $v(e, n, t, r) {
        return [e, !0, !1, n, null, 0, r, t, null, null, null]
      }
      function Bv(e, n) {
        const t = e.contentQueries
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) {
            const i = t[r + 1]
            if (-1 !== i) {
              const s = e.data[i]
              cc(t[r]), s.contentQueries(2, n[i], i)
            }
          }
      }
      function Ha(e, n) {
        return e[ai] ? (e[Yp][$t] = n) : (e[ai] = n), (e[Yp] = n), n
      }
      function Md(e, n, t) {
        cc(0)
        const r = Nt(null)
        try {
          n(e, t)
        } finally {
          Nt(r)
        }
      }
      function zv(e, n) {
        const t = e[jn],
          r = t ? t.get(Dn, null) : null
        r && r.handleError(n)
      }
      function Id(e, n, t, r, o) {
        for (let i = 0; i < t.length; ) {
          const s = t[i++],
            a = t[i++]
          jv(e.data[s], n[s], r, a, o)
        }
      }
      function wn(e, n, t) {
        const r = Ks(n, e)
        !(function Cm(e, n, t) {
          e.setValue(n, t)
        })(e[j], r, t)
      }
      function VA(e, n) {
        const t = Ct(n, e),
          r = t[I]
        !(function jA(e, n) {
          for (let t = n.length; t < e.blueprint.length; t++)
            n.push(e.blueprint[t])
        })(r, t)
        const o = t[ve]
        null !== o && null === t[gn] && (t[gn] = sd(o, t[jn])), Sd(r, t, t[_e])
      }
      function Sd(e, n, t) {
        dc(n)
        try {
          const r = e.viewQuery
          null !== r && Md(1, r, t)
          const o = e.template
          null !== o && Rv(e, n, o, 1, t),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Bv(e, n),
            e.staticViewQueries && Md(2, e.viewQuery, t)
          const i = e.components
          null !== i &&
            (function $A(e, n) {
              for (let t = 0; t < n.length; t++) VA(e, n[t])
            })(n, i)
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          )
        } finally {
          ;(n[B] &= -5), fc()
        }
      }
      let qv = (() => {
        class e {
          constructor() {
            ;(this.all = new Set()), (this.queue = new Map())
          }
          create(t, r, o) {
            const i = typeof Zone > 'u' ? null : Zone.current,
              s = (function qI(e, n, t) {
                const r = Object.create(WI)
                t && (r.consumerAllowSignalWrites = !0),
                  (r.fn = e),
                  (r.schedule = n)
                const o = (s) => {
                  r.cleanupFn = s
                }
                return (
                  (r.ref = {
                    notify: () => og(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !ig(r))) return
                      r.hasRun = !0
                      const s = ec(r)
                      try {
                        r.cleanupFn(), (r.cleanupFn = hg), r.fn(o)
                      } finally {
                        tc(r, s)
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                )
              })(
                t,
                (l) => {
                  this.all.has(l) && this.queue.set(l, i)
                },
                o
              )
            let a
            this.all.add(s), s.notify()
            const u = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s)
            }
            return (a = r?.onDestroy(u)), { destroy: u }
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [t, r] of this.queue)
                this.queue.delete(t), r ? r.run(() => t.run()) : t.run()
          }
          get isQueueEmpty() {
            return 0 === this.queue.size
          }
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          }))
        }
        return e
      })()
      function Ga(e, n, t) {
        let r = t ? e.styles : null,
          o = t ? e.classes : null,
          i = 0
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const a = n[s]
            'number' == typeof a
              ? (i = a)
              : 1 == i
                ? (o = Fl(o, a))
                : 2 == i && (r = Fl(r, a + ': ' + n[++s] + ';'))
          }
        t ? (e.styles = r) : (e.stylesWithoutHost = r),
          t ? (e.classes = o) : (e.classesWithoutHost = o)
      }
      function Fi(e, n, t, r, o = !1) {
        for (; null !== t; ) {
          const i = n[t.index]
          null !== i && r.push(le(i)), Je(i) && Wv(i, r)
          const s = t.type
          if (8 & s) Fi(e, n, t.child, r)
          else if (32 & s) {
            const a = Nc(t, n)
            let u
            for (; (u = a()); ) r.push(u)
          } else if (16 & s) {
            const a = Nm(n, t)
            if (Array.isArray(a)) r.push(...a)
            else {
              const u = bi(n[De])
              Fi(u[I], u, a, r, !0)
            }
          }
          t = o ? t.projectionNext : t.next
        }
        return r
      }
      function Wv(e, n) {
        for (let t = $e; t < e.length; t++) {
          const r = e[t],
            o = r[I].firstChild
          null !== o && Fi(r[I], r, o, n)
        }
        e[Qt] !== e[ve] && n.push(e[Qt])
      }
      function za(e, n, t, r = !0) {
        const o = n[$r],
          i = o.rendererFactory,
          s = o.afterRenderEventManager
        i.begin?.(), s?.begin()
        try {
          Zv(e, n, e.template, t)
        } catch (u) {
          throw (r && zv(n, u), u)
        } finally {
          i.end?.(), o.effectManager?.flush(), s?.end()
        }
      }
      function Zv(e, n, t, r) {
        const o = n[B]
        if (256 != (256 & o)) {
          n[$r].effectManager?.flush(), dc(n)
          try {
            Dg(n),
              (function Tg(e) {
                return (F.lFrame.bindingIndex = e)
              })(e.bindingStartIndex),
              null !== t && Rv(e, n, t, 2, r)
            const s = 3 == (3 & o)
            if (s) {
              const l = e.preOrderCheckHooks
              null !== l && na(n, l, null)
            } else {
              const l = e.preOrderHooks
              null !== l && ra(n, l, 0, null), hc(n, 0)
            }
            if (
              ((function HA(e) {
                for (let n = ym(e); null !== n; n = _m(n)) {
                  if (!n[Xp]) continue
                  const t = n[Hr]
                  for (let r = 0; r < t.length; r++) {
                    rS(t[r])
                  }
                }
              })(n),
              Yv(n, 2),
              null !== e.contentQueries && Bv(e, n),
              s)
            ) {
              const l = e.contentCheckHooks
              null !== l && na(n, l)
            } else {
              const l = e.contentHooks
              null !== l && ra(n, l, 1), hc(n, 1)
            }
            !(function pA(e, n) {
              const t = e.hostBindingOpCodes
              if (null === t) return
              const r = Iv(n, di)
              try {
                for (let o = 0; o < t.length; o++) {
                  const i = t[o]
                  if (i < 0) cr(~i)
                  else {
                    const s = i,
                      a = t[++o],
                      u = t[++o]
                    gS(a, s), (r.dirty = !1)
                    const l = ec(r)
                    try {
                      u(2, n[s])
                    } finally {
                      tc(r, l)
                    }
                  }
                }
              } finally {
                null === n[di] && Sv(n, di), cr(-1)
              }
            })(e, n)
            const a = e.components
            null !== a && Xv(n, a, 0)
            const u = e.viewQuery
            if ((null !== u && Md(2, u, r), s)) {
              const l = e.viewCheckHooks
              null !== l && na(n, l)
            } else {
              const l = e.viewHooks
              null !== l && ra(n, l, 2), hc(n, 2)
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (n[B] &= -73),
              Cg(n)
          } finally {
            fc()
          }
        }
      }
      function Yv(e, n) {
        for (let t = ym(e); null !== t; t = _m(t))
          for (let r = $e; r < t.length; r++) Qv(t[r], n)
      }
      function GA(e, n, t) {
        Qv(Ct(n, e), t)
      }
      function Qv(e, n) {
        if (
          !(function tS(e) {
            return 128 == (128 & e[B])
          })(e)
        )
          return
        const t = e[I],
          r = e[B]
        if ((80 & r && 0 === n) || 1024 & r || 2 === n)
          Zv(t, e, t.template, e[_e])
        else if (e[si] > 0) {
          Yv(e, 1)
          const o = t.components
          null !== o && Xv(e, o, 1)
        }
      }
      function Xv(e, n, t) {
        for (let r = 0; r < n.length; r++) GA(e, n[r], t)
      }
      class ki {
        get rootNodes() {
          const n = this._lView,
            t = n[I]
          return Fi(t, n, t.firstChild, [])
        }
        constructor(n, t) {
          ;(this._lView = n),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1)
        }
        get context() {
          return this._lView[_e]
        }
        set context(n) {
          this._lView[_e] = n
        }
        get destroyed() {
          return 256 == (256 & this._lView[B])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this)
          else if (this._attachedToViewContainer) {
            const n = this._lView[pe]
            if (Je(n)) {
              const t = n[8],
                r = t ? t.indexOf(this) : -1
              r > -1 && (Ca(n, r), la(t, r))
            }
            this._attachedToViewContainer = !1
          }
          Rc(this._lView[I], this._lView)
        }
        onDestroy(n) {
          !(function bg(e, n) {
            if (256 == (256 & e[B])) throw new w(911, !1)
            null === e[$n] && (e[$n] = []), e[$n].push(n)
          })(this._lView, n)
        }
        markForCheck() {
          xi(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[B] &= -129
        }
        reattach() {
          this._lView[B] |= 128
        }
        detectChanges() {
          za(this._lView[I], this._lView, this.context)
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1)
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          ;(this._appRef = null),
            (function N0(e, n) {
              Mi(e, n, n[j], 2, null, null)
            })(this._lView[I], this._lView)
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new w(902, !1)
          this._appRef = n
        }
      }
      class zA extends ki {
        constructor(n) {
          super(n), (this._view = n)
        }
        detectChanges() {
          const n = this._view
          za(n[I], n, n[_e], !1)
        }
        checkNoChanges() {}
        get context() {
          return null
        }
      }
      class Jv extends ja {
        constructor(n) {
          super(), (this.ngModule = n)
        }
        resolveComponentFactory(n) {
          const t = Z(n)
          return new Li(t, this.ngModule)
        }
      }
      function Kv(e) {
        const n = []
        for (let t in e)
          e.hasOwnProperty(t) && n.push({ propName: e[t], templateName: t })
        return n
      }
      class WA {
        constructor(n, t) {
          ;(this.injector = n), (this.parentInjector = t)
        }
        get(n, t, r) {
          r = zs(r)
          const o = this.injector.get(n, ld, r)
          return o !== ld || t === ld ? o : this.parentInjector.get(n, t, r)
        }
      }
      class Li extends ov {
        get inputs() {
          const n = this.componentDef,
            t = n.inputTransforms,
            r = Kv(n.inputs)
          if (null !== t)
            for (const o of r)
              t.hasOwnProperty(o.propName) && (o.transform = t[o.propName])
          return r
        }
        get outputs() {
          return Kv(this.componentDef.outputs)
        }
        constructor(n, t) {
          super(),
            (this.componentDef = n),
            (this.ngModule = t),
            (this.componentType = n.type),
            (this.selector = (function SI(e) {
              return e.map(II).join(',')
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors
              ? n.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t)
        }
        create(n, t, r, o) {
          let i = (o = o || this.ngModule) instanceof Et ? o : o?.injector
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i)
          const s = i ? new WA(n, i) : n,
            a = s.get(sv, null)
          if (null === a) throw new w(407, !1)
          const d = {
              rendererFactory: a,
              sanitizer: s.get(HT, null),
              effectManager: s.get(qv, null),
              afterRenderEventManager: s.get(md, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || 'div',
            p = r
              ? (function mA(e, n, t, r) {
                  const i = r.get(wv, !1) || t === Vt.ShadowDom,
                    s = e.selectRootElement(n, i)
                  return (
                    (function vA(e) {
                      Pv(e)
                    })(s),
                    s
                  )
                })(f, r, this.componentDef.encapsulation, s)
              : Da(
                  f,
                  h,
                  (function qA(e) {
                    const n = e.toLowerCase()
                    return 'svg' === n ? 'svg' : 'math' === n ? 'math' : null
                  })(h)
                ),
            b = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
                ? 576
                : 528
          let m = null
          null !== p && (m = sd(p, s, !0))
          const A = Cd(0, null, null, 1, 0, null, null, null, null, null, null),
            x = Ua(null, A, null, b, null, null, d, f, s, null, m)
          let H, Fe
          dc(x)
          try {
            const dn = this.componentDef
            let Fr,
              np = null
            dn.findHostDirectiveDefs
              ? ((Fr = []),
                (np = new Map()),
                dn.findHostDirectiveDefs(dn, Fr, np),
                Fr.push(dn))
              : (Fr = [dn])
            const o$ = (function YA(e, n) {
                const t = e[I],
                  r = z
                return (e[r] = n), mo(t, r, 2, '#host', null)
              })(x, p),
              i$ = (function QA(e, n, t, r, o, i, s) {
                const a = o[I]
                !(function XA(e, n, t, r) {
                  for (const o of e)
                    n.mergedAttrs = ii(n.mergedAttrs, o.hostAttrs)
                  null !== n.mergedAttrs &&
                    (Ga(n, n.mergedAttrs, !0), null !== t && Pm(r, t, n))
                })(r, e, n, s)
                let u = null
                null !== n && (u = sd(n, o[jn]))
                const l = i.rendererFactory.createRenderer(n, t)
                let c = 16
                t.signals ? (c = 4096) : t.onPush && (c = 64)
                const d = Ua(
                  o,
                  xv(t),
                  null,
                  c,
                  o[e.index],
                  e,
                  i,
                  l,
                  null,
                  null,
                  u
                )
                return (
                  a.firstCreatePass && bd(a, e, r.length - 1),
                  Ha(o, d),
                  (o[e.index] = d)
                )
              })(o$, p, dn, Fr, x, d, f)
            ;(Fe = _g(A, z)),
              p &&
                (function KA(e, n, t, r) {
                  if (r) Yl(e, t, ['ng-version', GT.full])
                  else {
                    const { attrs: o, classes: i } = (function TI(e) {
                      const n = [],
                        t = []
                      let r = 1,
                        o = 2
                      for (; r < e.length; ) {
                        let i = e[r]
                        if ('string' == typeof i)
                          2 === o
                            ? '' !== i && n.push(i, e[++r])
                            : 8 === o && t.push(i)
                        else {
                          if (!jt(o)) break
                          o = i
                        }
                        r++
                      }
                      return { attrs: n, classes: t }
                    })(n.selectors[0])
                    o && Yl(e, t, o), i && i.length > 0 && xm(e, t, i.join(' '))
                  }
                })(f, dn, p, r),
              void 0 !== t &&
                (function eN(e, n, t) {
                  const r = (e.projection = [])
                  for (let o = 0; o < n.length; o++) {
                    const i = t[o]
                    r.push(null != i ? Array.from(i) : null)
                  }
                })(Fe, this.ngContentSelectors, t),
              (H = (function JA(e, n, t, r, o, i) {
                const s = Ue(),
                  a = o[I],
                  u = ft(s, o)
                Lv(a, o, s, t, null, r)
                for (let c = 0; c < t.length; c++)
                  qe(dr(o, a, s.directiveStart + c, s), o)
                Vv(a, o, s), u && qe(u, o)
                const l = dr(o, a, s.directiveStart + s.componentOffset, s)
                if (((e[_e] = o[_e] = l), null !== i))
                  for (const c of i) c(l, n)
                return yd(a, s, e), l
              })(i$, dn, Fr, np, x, [tN])),
              Sd(A, x, null)
          } finally {
            fc()
          }
          return new ZA(this.componentType, H, ho(Fe, x), x, Fe)
        }
      }
      class ZA extends LT {
        constructor(n, t, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new zA(o)),
            (this.componentType = n)
        }
        setInput(n, t) {
          const r = this._tNode.inputs
          let o
          if (null !== r && (o = r[n])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(n) &&
                Object.is(this.previousInputValues.get(n), t))
            )
              return
            const i = this._rootLView
            Id(i[I], i, o, n, t),
              this.previousInputValues.set(n, t),
              xi(Ct(this._tNode.index, i))
          }
        }
        get injector() {
          return new tt(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(n) {
          this.hostView.onDestroy(n)
        }
      }
      function tN() {
        const e = Ue()
        ta(C()[I], e)
      }
      function ne(e) {
        let n = (function ey(e) {
            return Object.getPrototypeOf(e.prototype).constructor
          })(e.type),
          t = !0
        const r = [e]
        for (; n; ) {
          let o
          if (Bt(e)) o = n.ɵcmp || n.ɵdir
          else {
            if (n.ɵcmp) throw new w(903, !1)
            o = n.ɵdir
          }
          if (o) {
            if (t) {
              r.push(o)
              const s = e
              ;(s.inputs = qa(e.inputs)),
                (s.inputTransforms = qa(e.inputTransforms)),
                (s.declaredInputs = qa(e.declaredInputs)),
                (s.outputs = qa(e.outputs))
              const a = o.hostBindings
              a && iN(e, a)
              const u = o.viewQuery,
                l = o.contentQueries
              if (
                (u && rN(e, u),
                l && oN(e, l),
                js(e.inputs, o.inputs),
                js(e.declaredInputs, o.declaredInputs),
                js(e.outputs, o.outputs),
                null !== o.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  js(s.inputTransforms, o.inputTransforms)),
                Bt(o) && o.data.animation)
              ) {
                const c = e.data
                c.animation = (c.animation || []).concat(o.data.animation)
              }
            }
            const i = o.features
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s]
                a && a.ngInherit && a(e), a === ne && (t = !1)
              }
          }
          n = Object.getPrototypeOf(n)
        }
        !(function nN(e) {
          let n = 0,
            t = null
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r]
            ;(o.hostVars = n += o.hostVars),
              (o.hostAttrs = ii(o.hostAttrs, (t = ii(t, o.hostAttrs))))
          }
        })(r)
      }
      function qa(e) {
        return e === Zt ? {} : e === Q ? [] : e
      }
      function rN(e, n) {
        const t = e.viewQuery
        e.viewQuery = t
          ? (r, o) => {
              n(r, o), t(r, o)
            }
          : n
      }
      function oN(e, n) {
        const t = e.contentQueries
        e.contentQueries = t
          ? (r, o, i) => {
              n(r, o, i), t(r, o, i)
            }
          : n
      }
      function iN(e, n) {
        const t = e.hostBindings
        e.hostBindings = t
          ? (r, o) => {
              n(r, o), t(r, o)
            }
          : n
      }
      function oy(e) {
        const n = e.inputConfig,
          t = {}
        for (const r in n)
          if (n.hasOwnProperty(r)) {
            const o = n[r]
            Array.isArray(o) && o[2] && (t[r] = o[2])
          }
        e.inputTransforms = t
      }
      function Wa(e) {
        return (
          !!(function Td(e) {
            return (
              null !== e && ('function' == typeof e || 'object' == typeof e)
            )
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        )
      }
      function nn(e, n, t) {
        return (e[n] = t)
      }
      function We(e, n, t) {
        return !Object.is(e[n], t) && ((e[n] = t), !0)
      }
      function mr(e, n, t, r) {
        const o = We(e, n, t)
        return We(e, n + 1, r) || o
      }
      function rn(e, n, t, r) {
        const o = C()
        return We(o, Yr(), n) && (Y(), tn(me(), o, e, n, t, r)), rn
      }
      function yo(e, n, t, r) {
        return We(e, Yr(), t) ? n + V(t) + r : $
      }
      function Do(e, n, t, r, o, i, s, a) {
        const l = (function Za(e, n, t, r, o) {
          const i = mr(e, n, t, r)
          return We(e, n + 2, o) || i
        })(e, mn(), t, o, s)
        return vn(3), l ? n + V(t) + r + V(o) + i + V(s) + a : $
      }
      function Ae(e, n, t, r, o, i, s, a) {
        const u = C(),
          l = Y(),
          c = e + z,
          d = l.firstCreatePass
            ? (function NN(e, n, t, r, o, i, s, a, u) {
                const l = n.consts,
                  c = mo(n, e, 4, s || null, Un(l, a))
                wd(n, t, c, Un(l, u)), ta(n, c)
                const d = (c.tView = Cd(
                  2,
                  c,
                  r,
                  o,
                  i,
                  n.directiveRegistry,
                  n.pipeRegistry,
                  null,
                  n.schemas,
                  l,
                  null
                ))
                return (
                  null !== n.queries &&
                    (n.queries.template(n, c),
                    (d.queries = n.queries.embeddedTView(c))),
                  c
                )
              })(c, l, u, n, t, r, o, i, s)
            : l.data[c]
        Jt(d, !1)
        const f = vy(l, u, d, e)
        ea() && ba(l, u, f, d),
          qe(f, u),
          Ha(u, (u[c] = $v(f, u, f, d))),
          Qs(d) && _d(l, u, d),
          null != s && Dd(u, d, a)
      }
      let vy = function yy(e, n, t, r) {
        return Hn(!0), n[j].createComment('')
      }
      function q(e, n, t) {
        const r = C()
        return We(r, Yr(), n) && It(Y(), me(), r, e, n, r[j], t, !1), q
      }
      function Pd(e, n, t, r, o) {
        const s = o ? 'class' : 'style'
        Id(e, t, n.inputs[s], s, r)
      }
      function D(e, n, t, r) {
        const o = C(),
          i = Y(),
          s = z + e,
          a = o[j],
          u = i.firstCreatePass
            ? (function PN(e, n, t, r, o, i) {
                const s = n.consts,
                  u = mo(n, e, 2, r, Un(s, o))
                return (
                  wd(n, t, u, Un(s, i)),
                  null !== u.attrs && Ga(u, u.attrs, !1),
                  null !== u.mergedAttrs && Ga(u, u.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, u),
                  u
                )
              })(s, i, o, n, t, r)
            : i.data[s],
          l = Dy(i, o, u, a, n, e)
        o[s] = l
        const c = Qs(u)
        return (
          Jt(u, !0),
          Pm(a, l, u),
          32 != (32 & u.flags) && ea() && ba(i, o, l, u),
          0 ===
            (function iS() {
              return F.lFrame.elementDepthCount
            })() && qe(l, o),
          (function sS() {
            F.lFrame.elementDepthCount++
          })(),
          c && (_d(i, o, u), yd(i, u, o)),
          null !== r && Dd(o, u),
          D
        )
      }
      function _() {
        let e = Ue()
        sc()
          ? (function ac() {
              F.lFrame.isParent = !1
            })()
          : ((e = e.parent), Jt(e, !1))
        const n = e
        ;(function uS(e) {
          return F.skipHydrationRootTNode === e
        })(n) &&
          (function fS() {
            F.skipHydrationRootTNode = null
          })(),
          (function aS() {
            F.lFrame.elementDepthCount--
          })()
        const t = Y()
        return (
          t.firstCreatePass && (ta(t, e), Xl(e) && t.queries.elementEnd(e)),
          null != n.classesWithoutHost &&
            (function SS(e) {
              return 0 != (8 & e.flags)
            })(n) &&
            Pd(t, n, C(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function TS(e) {
              return 0 != (16 & e.flags)
            })(n) &&
            Pd(t, n, C(), n.stylesWithoutHost, !1),
          _
        )
      }
      function Re(e, n, t, r) {
        return D(e, n, t, r), _(), Re
      }
      let Dy = (e, n, t, r, o, i) => (
        Hn(!0),
        Da(
          r,
          o,
          (function kg() {
            return F.lFrame.currentNamespace
          })()
        )
      )
      function Io() {
        return C()
      }
      function Ui(e) {
        return !!e && 'function' == typeof e.then
      }
      function by(e) {
        return !!e && 'function' == typeof e.subscribe
      }
      function X(e, n, t, r) {
        const o = C(),
          i = Y(),
          s = Ue()
        return (
          (function My(e, n, t, r, o, i, s) {
            const a = Qs(r),
              l =
                e.firstCreatePass &&
                (function Hv(e) {
                  return e.cleanup || (e.cleanup = [])
                })(e),
              c = n[_e],
              d = (function Uv(e) {
                return e[jr] || (e[jr] = [])
              })(n)
            let f = !0
            if (3 & r.type || s) {
              const g = ft(r, n),
                y = s ? s(g) : g,
                b = d.length,
                m = s ? (x) => s(le(x[r.index])) : r.index
              let A = null
              if (
                (!s &&
                  a &&
                  (A = (function $N(e, n, t, r) {
                    const o = e.cleanup
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i]
                        if (s === t && o[i + 1] === r) {
                          const a = n[jr],
                            u = o[i + 2]
                          return a.length > u ? a[u] : null
                        }
                        'string' == typeof s && (i += 2)
                      }
                    return null
                  })(e, n, o, r.index)),
                null !== A)
              )
                ((A.__ngLastListenerFn__ || A).__ngNextListenerFn__ = i),
                  (A.__ngLastListenerFn__ = i),
                  (f = !1)
              else {
                i = Sy(r, n, c, i, !1)
                const x = t.listen(y, o, i)
                d.push(i, x), l && l.push(o, m, b, b + 1)
              }
            } else i = Sy(r, n, c, i, !1)
            const h = r.outputs
            let p
            if (f && null !== h && (p = h[o])) {
              const g = p.length
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const H = n[p[y]][p[y + 1]].subscribe(i),
                    Fe = d.length
                  d.push(i, H), l && l.push(o, r.index, Fe, -(Fe + 1))
                }
            }
          })(i, o, o[j], s, e, n, r),
          X
        )
      }
      function Iy(e, n, t, r) {
        try {
          return Xt(6, n, t), !1 !== t(r)
        } catch (o) {
          return zv(e, o), !1
        } finally {
          Xt(7, n, t)
        }
      }
      function Sy(e, n, t, r, o) {
        return function i(s) {
          if (s === Function) return r
          xi(e.componentOffset > -1 ? Ct(e.index, n) : n)
          let u = Iy(n, t, r, s),
            l = i.__ngNextListenerFn__
          for (; l; ) (u = Iy(n, t, l, s) && u), (l = l.__ngNextListenerFn__)
          return o && !1 === u && s.preventDefault(), u
        }
      }
      function vr(e = 1) {
        return (function yS(e) {
          return (F.lFrame.contextLView = (function _S(e, n) {
            for (; e > 0; ) (n = n[Br]), e--
            return n
          })(e, F.lFrame.contextLView))[_e]
        })(e)
      }
      function Ja(e, n, t) {
        return Ld(e, '', n, '', t), Ja
      }
      function Ld(e, n, t, r, o) {
        const i = C(),
          s = yo(i, n, t, r)
        return s !== $ && It(Y(), me(), i, e, s, i[j], o, !1), Ld
      }
      function Ka(e, n) {
        return (e << 17) | (n << 2)
      }
      function zn(e) {
        return (e >> 17) & 32767
      }
      function Vd(e) {
        return 2 | e
      }
      function yr(e) {
        return (131068 & e) >> 2
      }
      function jd(e, n) {
        return (-131069 & e) | (n << 2)
      }
      function $d(e) {
        return 1 | e
      }
      function ky(e, n, t, r, o) {
        const i = e[t + 1],
          s = null === n
        let a = r ? zn(i) : yr(i),
          u = !1
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1]
          YN(e[a], n) && ((u = !0), (e[a + 1] = r ? $d(c) : Vd(c))),
            (a = r ? zn(c) : yr(c))
        }
        u && (e[t + 1] = r ? Vd(i) : $d(i))
      }
      function YN(e, n) {
        return (
          null === e ||
          null == n ||
          (Array.isArray(e) ? e[1] : e) === n ||
          (!(!Array.isArray(e) || 'string' != typeof n) && ro(e, n) >= 0)
        )
      }
      function eu(e, n) {
        return (
          (function Ut(e, n, t, r) {
            const o = C(),
              i = Y(),
              s = vn(2)
            i.firstUpdatePass &&
              (function zy(e, n, t, r) {
                const o = e.data
                if (null === o[t + 1]) {
                  const i = o[et()],
                    s = (function Gy(e, n) {
                      return n >= e.expandoStartIndex
                    })(e, t)
                  ;(function Yy(e, n) {
                    return 0 != (e.flags & (n ? 8 : 16))
                  })(i, r) &&
                    null === n &&
                    !s &&
                    (n = !1),
                    (n = (function oO(e, n, t, r) {
                      const o = (function lc(e) {
                        const n = F.lFrame.currentDirectiveIndex
                        return -1 === n ? null : e[n]
                      })(e)
                      let i = r ? n.residualClasses : n.residualStyles
                      if (null === o)
                        0 === (r ? n.classBindings : n.styleBindings) &&
                          ((t = Hi((t = Bd(null, e, n, t, r)), n.attrs, r)),
                          (i = null))
                      else {
                        const s = n.directiveStylingLast
                        if (-1 === s || e[s] !== o)
                          if (((t = Bd(o, e, n, t, r)), null === i)) {
                            let u = (function iO(e, n, t) {
                              const r = t ? n.classBindings : n.styleBindings
                              if (0 !== yr(r)) return e[zn(r)]
                            })(e, n, r)
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = Bd(null, e, n, u[1], r)),
                              (u = Hi(u, n.attrs, r)),
                              (function sO(e, n, t, r) {
                                e[zn(t ? n.classBindings : n.styleBindings)] = r
                              })(e, n, r, u))
                          } else
                            i = (function aO(e, n, t) {
                              let r
                              const o = n.directiveEnd
                              for (
                                let i = 1 + n.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Hi(r, e[i].hostAttrs, t)
                              return Hi(r, n.attrs, t)
                            })(e, n, r)
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (n.residualClasses = i)
                            : (n.residualStyles = i)),
                        t
                      )
                    })(o, i, n, r)),
                    (function WN(e, n, t, r, o, i) {
                      let s = i ? n.classBindings : n.styleBindings,
                        a = zn(s),
                        u = yr(s)
                      e[r] = t
                      let c,
                        l = !1
                      if (
                        (Array.isArray(t)
                          ? ((c = t[1]),
                            (null === c || ro(t, c) > 0) && (l = !0))
                          : (c = t),
                        o)
                      )
                        if (0 !== u) {
                          const f = zn(e[a + 1])
                          ;(e[r + 1] = Ka(f, a)),
                            0 !== f && (e[f + 1] = jd(e[f + 1], r)),
                            (e[a + 1] = (function zN(e, n) {
                              return (131071 & e) | (n << 17)
                            })(e[a + 1], r))
                        } else
                          (e[r + 1] = Ka(a, 0)),
                            0 !== a && (e[a + 1] = jd(e[a + 1], r)),
                            (a = r)
                      else
                        (e[r + 1] = Ka(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = jd(e[u + 1], r)),
                          (u = r)
                      l && (e[r + 1] = Vd(e[r + 1])),
                        ky(e, c, r, !0),
                        ky(e, c, r, !1),
                        (function ZN(e, n, t, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles
                          null != i &&
                            'string' == typeof n &&
                            ro(i, n) >= 0 &&
                            (t[r + 1] = $d(t[r + 1]))
                        })(n, c, e, r, i),
                        (s = Ka(a, u)),
                        i ? (n.classBindings = s) : (n.styleBindings = s)
                    })(o, i, n, t, s, r)
                }
              })(i, e, s, r),
              n !== $ &&
                We(o, s, n) &&
                (function Wy(e, n, t, r, o, i, s, a) {
                  if (!(3 & n.type)) return
                  const u = e.data,
                    l = u[a + 1],
                    c = (function qN(e) {
                      return 1 == (1 & e)
                    })(l)
                      ? Zy(u, n, t, o, yr(l), s)
                      : void 0
                  tu(c) ||
                    (tu(i) ||
                      ((function GN(e) {
                        return 2 == (2 & e)
                      })(l) &&
                        (i = Zy(u, null, t, o, a, s))),
                    (function $0(e, n, t, r, o) {
                      if (n) o ? e.addClass(t, r) : e.removeClass(t, r)
                      else {
                        let i = -1 === r.indexOf('-') ? void 0 : Gn.DashCase
                        null == o
                          ? e.removeStyle(t, r, i)
                          : ('string' == typeof o &&
                              o.endsWith('!important') &&
                              ((o = o.slice(0, -10)), (i |= Gn.Important)),
                            e.setStyle(t, r, o, i))
                      }
                    })(r, s, Ks(et(), t), o, i))
                })(
                  i,
                  i.data[et()],
                  o,
                  o[j],
                  e,
                  (o[s + 1] = (function dO(e, n) {
                    return (
                      null == e ||
                        '' === e ||
                        ('string' == typeof n
                          ? (e += n)
                          : 'object' == typeof e && (e = Se(bt(e)))),
                      e
                    )
                  })(n, t)),
                  r,
                  s
                )
          })(e, n, null, !0),
          eu
        )
      }
      function Bd(e, n, t, r, o) {
        let i = null
        const s = t.directiveEnd
        let a = t.directiveStylingLast
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((i = n[a]), (r = Hi(r, i.hostAttrs, o)), i !== e);

        )
          a++
        return null !== e && (t.directiveStylingLast = a), r
      }
      function Hi(e, n, t) {
        const r = t ? 1 : 2
        let o = -1
        if (null !== n)
          for (let i = 0; i < n.length; i++) {
            const s = n[i]
            'number' == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ['', e]),
                wt(e, s, !!t || n[++i]))
          }
        return void 0 === e ? null : e
      }
      function Zy(e, n, t, r, o, i) {
        const s = null === n
        let a
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c
          let f = t[o + 1]
          f === $ && (f = d ? Q : void 0)
          let h = d ? Cc(f, r) : c === r ? f : void 0
          if ((l && !tu(h) && (h = Cc(u, r)), tu(h) && ((a = h), s))) return a
          const p = e[o + 1]
          o = s ? zn(p) : yr(p)
        }
        if (null !== n) {
          let u = i ? n.residualClasses : n.residualStyles
          null != u && (a = Cc(u, r))
        }
        return a
      }
      function tu(e) {
        return void 0 !== e
      }
      function E(e, n = '') {
        const t = C(),
          r = Y(),
          o = e + z,
          i = r.firstCreatePass ? mo(r, o, 1, n, null) : r.data[o],
          s = Qy(r, t, i, n, e)
        ;(t[o] = s), ea() && ba(r, t, s, i), Jt(i, !1)
      }
      let Qy = (e, n, t, r, o) => (
        Hn(!0),
        (function _a(e, n) {
          return e.createText(n)
        })(n[j], r)
      )
      function xe(e) {
        return He('', e, ''), xe
      }
      function He(e, n, t) {
        const r = C(),
          o = yo(r, e, n, t)
        return o !== $ && wn(r, et(), o), He
      }
      function _r(e, n, t, r, o) {
        const i = C(),
          s = (function _o(e, n, t, r, o, i) {
            const a = mr(e, mn(), t, o)
            return vn(2), a ? n + V(t) + r + V(o) + i : $
          })(i, e, n, t, r, o)
        return s !== $ && wn(i, et(), s), _r
      }
      function Ud(e, n, t, r, o, i, s) {
        const a = C(),
          u = Do(a, e, n, t, r, o, i, s)
        return u !== $ && wn(a, et(), u), Ud
      }
      const Dr = void 0
      var xO = [
        'en',
        [['a', 'p'], ['AM', 'PM'], Dr],
        [['AM', 'PM'], Dr, Dr],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        Dr,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          [
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
          ],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        Dr,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', Dr, "{1} 'at' {0}", Dr],
        [
          '.',
          ',',
          ';',
          '%',
          '+',
          '-',
          'E',
          '\xd7',
          '\u2030',
          '\u221e',
          'NaN',
          ':',
        ],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function RO(e) {
          const t = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, '').length
          return 1 === t && 0 === r ? 1 : 5
        },
      ]
      let To = {}
      function nt(e) {
        const n = (function PO(e) {
          return e.toLowerCase().replace(/_/g, '-')
        })(e)
        let t = g_(n)
        if (t) return t
        const r = n.split('-')[0]
        if (((t = g_(r)), t)) return t
        if ('en' === r) return xO
        throw new w(701, !1)
      }
      function g_(e) {
        return (
          e in To ||
            (To[e] =
              ue.ng &&
              ue.ng.common &&
              ue.ng.common.locales &&
              ue.ng.common.locales[e]),
          To[e]
        )
      }
      var de = (function (e) {
        return (
          (e[(e.LocaleId = 0)] = 'LocaleId'),
          (e[(e.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
          (e[(e.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
          (e[(e.DaysFormat = 3)] = 'DaysFormat'),
          (e[(e.DaysStandalone = 4)] = 'DaysStandalone'),
          (e[(e.MonthsFormat = 5)] = 'MonthsFormat'),
          (e[(e.MonthsStandalone = 6)] = 'MonthsStandalone'),
          (e[(e.Eras = 7)] = 'Eras'),
          (e[(e.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
          (e[(e.WeekendRange = 9)] = 'WeekendRange'),
          (e[(e.DateFormat = 10)] = 'DateFormat'),
          (e[(e.TimeFormat = 11)] = 'TimeFormat'),
          (e[(e.DateTimeFormat = 12)] = 'DateTimeFormat'),
          (e[(e.NumberSymbols = 13)] = 'NumberSymbols'),
          (e[(e.NumberFormats = 14)] = 'NumberFormats'),
          (e[(e.CurrencyCode = 15)] = 'CurrencyCode'),
          (e[(e.CurrencySymbol = 16)] = 'CurrencySymbol'),
          (e[(e.CurrencyName = 17)] = 'CurrencyName'),
          (e[(e.Currencies = 18)] = 'Currencies'),
          (e[(e.Directionality = 19)] = 'Directionality'),
          (e[(e.PluralCase = 20)] = 'PluralCase'),
          (e[(e.ExtraData = 21)] = 'ExtraData'),
          e
        )
      })(de || {})
      const Ao = 'en-US'
      let m_ = Ao
      function zd(e, n, t, r, o) {
        if (((e = k(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) zd(e[i], n, t, r, o)
        else {
          const i = Y(),
            s = C(),
            a = Ue()
          let u = pr(e) ? e : k(e.provide)
          const l = Jm(e),
            c = 1048575 & a.providerIndexes,
            d = a.directiveStart,
            f = a.providerIndexes >> 20
          if (pr(e) || !e.multi) {
            const h = new gi(l, o, v),
              p = Wd(u, n, o ? c : c + f, d)
            ;-1 === p
              ? (yc(ia(a, s), i, u),
                qd(i, e, n.length),
                n.push(u),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                t.push(h),
                s.push(h))
              : ((t[p] = h), (s[p] = h))
          } else {
            const h = Wd(u, n, c + f, d),
              p = Wd(u, n, c, c + f),
              y = p >= 0 && t[p]
            if ((o && !y) || (!o && !(h >= 0 && t[h]))) {
              yc(ia(a, s), i, u)
              const b = (function RR(e, n, t, r, o) {
                const i = new gi(e, t, v)
                return (
                  (i.multi = []),
                  (i.index = n),
                  (i.componentProviders = 0),
                  B_(i, o, r && !t),
                  i
                )
              })(o ? OR : NR, t.length, o, r, l)
              !o && y && (t[p].providerFactory = b),
                qd(i, e, n.length, 0),
                n.push(u),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                t.push(b),
                s.push(b)
            } else qd(i, e, h > -1 ? h : p, B_(t[o ? p : h], l, !o && r))
            !o && r && y && t[p].componentProviders++
          }
        }
      }
      function qd(e, n, t, r) {
        const o = pr(n),
          i = (function DT(e) {
            return !!e.useClass
          })(n)
        if (o || i) {
          const u = (i ? k(n.useClass) : n).prototype.ngOnDestroy
          if (u) {
            const l = e.destroyHooks || (e.destroyHooks = [])
            if (!o && n.multi) {
              const c = l.indexOf(t)
              ;-1 === c ? l.push(t, [r, u]) : l[c + 1].push(r, u)
            } else l.push(t, u)
          }
        }
      }
      function B_(e, n, t) {
        return t && e.componentProviders++, e.multi.push(n) - 1
      }
      function Wd(e, n, t, r) {
        for (let o = t; o < r; o++) if (n[o] === e) return o
        return -1
      }
      function NR(e, n, t, r) {
        return Zd(this.multi, [])
      }
      function OR(e, n, t, r) {
        const o = this.multi
        let i
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = dr(t, t[I], this.providerFactory.index, r)
          ;(i = a.slice(0, s)), Zd(o, i)
          for (let u = s; u < a.length; u++) i.push(a[u])
        } else (i = []), Zd(o, i)
        return i
      }
      function Zd(e, n) {
        for (let t = 0; t < e.length; t++) n.push((0, e[t])())
        return n
      }
      function ge(e, n = []) {
        return (t) => {
          t.providersResolver = (r, o) =>
            (function AR(e, n, t) {
              const r = Y()
              if (r.firstCreatePass) {
                const o = Bt(e)
                zd(t, r.data, r.blueprint, o, !0),
                  zd(n, r.data, r.blueprint, o, !1)
              }
            })(r, o ? o(e) : e, n)
        }
      }
      class Cr {}
      class U_ {}
      class Yd extends Cr {
        constructor(n, t, r) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Jv(this))
          const o = Dt(n)
          ;(this._bootstrapComponents = Cn(o.bootstrap)),
            (this._r3Injector = dv(
              n,
              t,
              [
                { provide: Cr, useValue: this },
                { provide: ja, useValue: this.componentFactoryResolver },
                ...r,
              ],
              Se(n),
              new Set(['environment'])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(n))
        }
        get injector() {
          return this._r3Injector
        }
        destroy() {
          const n = this._r3Injector
          !n.destroyed && n.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null)
        }
        onDestroy(n) {
          this.destroyCbs.push(n)
        }
      }
      class Qd extends U_ {
        constructor(n) {
          super(), (this.moduleType = n)
        }
        create(n) {
          return new Yd(this.moduleType, n, [])
        }
      }
      class H_ extends Cr {
        constructor(n) {
          super(),
            (this.componentFactoryResolver = new Jv(this)),
            (this.instance = null)
          const t = new Ra(
            [
              ...n.providers,
              { provide: Cr, useValue: this },
              { provide: ja, useValue: this.componentFactoryResolver },
            ],
            n.parent || Oa(),
            n.debugName,
            new Set(['environment'])
          )
          ;(this.injector = t),
            n.runEnvironmentInitializers && t.resolveInjectorInitializers()
        }
        destroy() {
          this.injector.destroy()
        }
        onDestroy(n) {
          this.injector.onDestroy(n)
        }
      }
      function Xd(e, n, t = null) {
        return new H_({
          providers: e,
          parent: n,
          debugName: t,
          runEnvironmentInitializers: !0,
        }).injector
      }
      let FR = (() => {
        class e {
          constructor(t) {
            ;(this._injector = t), (this.cachedInjectors = new Map())
          }
          getOrCreateStandaloneInjector(t) {
            if (!t.standalone) return null
            if (!this.cachedInjectors.has(t)) {
              const r = Zm(0, t.type),
                o =
                  r.length > 0
                    ? Xd([r], this._injector, `Standalone[${t.type.name}]`)
                    : null
              this.cachedInjectors.set(t, o)
            }
            return this.cachedInjectors.get(t)
          }
          ngOnDestroy() {
            try {
              for (const t of this.cachedInjectors.values())
                null !== t && t.destroy()
            } finally {
              this.cachedInjectors.clear()
            }
          }
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'environment',
            factory: () => new e(M(Et)),
          }))
        }
        return e
      })()
      function G_(e) {
        e.getStandaloneInjector = (n) =>
          n.get(FR).getOrCreateStandaloneInjector(e)
      }
      function Yi(e, n) {
        const t = e[n]
        return t === $ ? void 0 : t
      }
      function bn(e, n) {
        const t = Y()
        let r
        const o = e + z
        t.firstCreatePass
          ? ((r = (function ex(e, n) {
              if (n)
                for (let t = n.length - 1; t >= 0; t--) {
                  const r = n[t]
                  if (e === r.name) return r
                }
            })(n, t.pipeRegistry)),
            (t.data[o] = r),
            r.onDestroy && (t.destroyHooks ??= []).push(o, r.onDestroy))
          : (r = t.data[o])
        const i = r.factory || (r.factory = lr(r.type)),
          a = ct(v)
        try {
          const u = oa(!1),
            l = i()
          return (
            oa(u),
            (function xN(e, n, t, r) {
              t >= e.data.length &&
                ((e.data[t] = null), (e.blueprint[t] = null)),
                (n[t] = r)
            })(t, C(), o, l),
            l
          )
        } finally {
          ct(a)
        }
      }
      function qn(e, n, t) {
        const r = e + z,
          o = C(),
          i = zr(o, r)
        return Qi(o, r)
          ? (function X_(e, n, t, r, o, i) {
              const s = n + t
              return We(e, s, o)
                ? nn(e, s + 1, i ? r.call(i, o) : r(o))
                : Yi(e, s + 1)
            })(o, Ke(), n, i.transform, t, i)
          : i.transform(t)
      }
      function nD(e, n, t, r) {
        const o = e + z,
          i = C(),
          s = zr(i, o)
        return Qi(i, o)
          ? (function J_(e, n, t, r, o, i, s) {
              const a = n + t
              return mr(e, a, o, i)
                ? nn(e, a + 2, s ? r.call(s, o, i) : r(o, i))
                : Yi(e, a + 2)
            })(i, Ke(), n, s.transform, t, r, s)
          : s.transform(t, r)
      }
      function Qi(e, n) {
        return e[I].data[n].pure
      }
      function sx(e, n, t, r = !0) {
        const o = n[I]
        if (
          ((function R0(e, n, t, r) {
            const o = $e + r,
              i = t.length
            r > 0 && (t[o - 1][$t] = n),
              r < i - $e
                ? ((n[$t] = t[o]), Xg(t, $e + r, n))
                : (t.push(n), (n[$t] = null)),
              (n[pe] = t)
            const s = n[ui]
            null !== s &&
              t !== s &&
              (function x0(e, n) {
                const t = e[Hr]
                n[De] !== n[pe][pe][De] && (e[Xp] = !0),
                  null === t ? (e[Hr] = [n]) : t.push(n)
              })(s, n)
            const a = n[Yt]
            null !== a && a.insertView(e), (n[B] |= 128)
          })(o, n, e, t),
          r)
        ) {
          const i = kc(t, e),
            s = n[j],
            a = wa(s, e[Qt])
          null !== a &&
            (function A0(e, n, t, r, o, i) {
              ;(r[ve] = o), (r[ze] = n), Mi(e, r, t, 1, o, i)
            })(o, e[ze], s, n, a, i)
        }
      }
      Symbol
      let En = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = lx)
        }
        return e
      })()
      const ax = En,
        ux = class extends ax {
          constructor(n, t, r) {
            super(),
              (this._declarationLView = n),
              (this._declarationTContainer = t),
              (this.elementRef = r)
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null
          }
          createEmbeddedView(n, t) {
            return this.createEmbeddedViewImpl(n, t)
          }
          createEmbeddedViewImpl(n, t, r) {
            const o = (function ix(e, n, t, r) {
              const o = n.tView,
                a = Ua(
                  e,
                  o,
                  t,
                  4096 & e[B] ? 4096 : 16,
                  null,
                  n,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null
                )
              a[ui] = e[n.index]
              const l = e[Yt]
              return (
                null !== l && (a[Yt] = l.createEmbeddedView(o)), Sd(o, a, t), a
              )
            })(this._declarationLView, this._declarationTContainer, n, {
              injector: t,
              hydrationInfo: r,
            })
            return new ki(o)
          }
        }
      function lx() {
        return (function su(e, n) {
          return 4 & e.type ? new ux(n, e, ho(e, n)) : null
        })(Ue(), C())
      }
      let Gt = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = gx)
        }
        return e
      })()
      function gx() {
        return (function lD(e, n) {
          let t
          const r = n[e.index]
          return (
            Je(r)
              ? (t = r)
              : ((t = $v(r, n, null, e)), (n[e.index] = t), Ha(n, t)),
            cD(t, n, e, r),
            new aD(t, e, n)
          )
        })(Ue(), C())
      }
      const mx = Gt,
        aD = class extends mx {
          constructor(n, t, r) {
            super(),
              (this._lContainer = n),
              (this._hostTNode = t),
              (this._hostLView = r)
          }
          get element() {
            return ho(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new tt(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const n = sa(this._hostTNode, this._hostLView)
            if (gc(n)) {
              const t = vi(n, this._hostLView),
                r = mi(n)
              return new tt(t[I].data[r + 8], t)
            }
            return new tt(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1)
          }
          get(n) {
            const t = uD(this._lContainer)
            return (null !== t && t[n]) || null
          }
          get length() {
            return this._lContainer.length - $e
          }
          createEmbeddedView(n, t, r) {
            let o, i
            'number' == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector))
            const a = n.createEmbeddedViewImpl(t || {}, i, null)
            return this.insertImpl(a, o, false), a
          }
          createComponent(n, t, r, o, i) {
            const s =
              n &&
              !(function _i(e) {
                return 'function' == typeof e
              })(n)
            let a
            if (s) a = t
            else {
              const g = t || {}
              ;(a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef)
            }
            const u = s ? n : new Li(Z(n)),
              l = r || this.parentInjector
            if (!i && null == u.ngModule) {
              const y = (s ? l : this.parentInjector).get(Et, null)
              y && (i = y)
            }
            Z(u.componentType ?? {})
            const h = u.create(l, o, null, i)
            return this.insertImpl(h.hostView, a, false), h
          }
          insert(n, t) {
            return this.insertImpl(n, t, !1)
          }
          insertImpl(n, t, r) {
            const o = n._lView
            if (
              (function nS(e) {
                return Je(e[pe])
              })(o)
            ) {
              const u = this.indexOf(n)
              if (-1 !== u) this.detach(u)
              else {
                const l = o[pe],
                  c = new aD(l, l[ze], l[pe])
                c.detach(c.indexOf(n))
              }
            }
            const s = this._adjustIndex(t),
              a = this._lContainer
            return (
              sx(a, o, s, !r), n.attachToViewContainerRef(), Xg(ef(a), s, n), n
            )
          }
          move(n, t) {
            return this.insert(n, t)
          }
          indexOf(n) {
            const t = uD(this._lContainer)
            return null !== t ? t.indexOf(n) : -1
          }
          remove(n) {
            const t = this._adjustIndex(n, -1),
              r = Ca(this._lContainer, t)
            r && (la(ef(this._lContainer), t), Rc(r[I], r))
          }
          detach(n) {
            const t = this._adjustIndex(n, -1),
              r = Ca(this._lContainer, t)
            return r && null != la(ef(this._lContainer), t) ? new ki(r) : null
          }
          _adjustIndex(n, t = 0) {
            return n ?? this.length + t
          }
        }
      function uD(e) {
        return e[8]
      }
      function ef(e) {
        return e[8] || (e[8] = [])
      }
      let cD = function dD(e, n, t, r) {
        if (e[Qt]) return
        let o
        ;(o =
          8 & t.type
            ? le(r)
            : (function vx(e, n) {
                const t = e[j],
                  r = t.createComment(''),
                  o = ft(n, e)
                return (
                  fr(
                    t,
                    wa(t, o),
                    r,
                    (function L0(e, n) {
                      return e.nextSibling(n)
                    })(t, o),
                    !1
                  ),
                  r
                )
              })(n, t)),
          (e[Qt] = o)
      }
      const hf = new S('Application Initializer')
      let pf = (() => {
          class e {
            constructor() {
              ;(this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((t, r) => {
                  ;(this.resolve = t), (this.reject = r)
                })),
                (this.appInits = T(hf, { optional: !0 }) ?? [])
            }
            runInitializers() {
              if (this.initialized) return
              const t = []
              for (const o of this.appInits) {
                const i = o()
                if (Ui(i)) t.push(i)
                else if (by(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u })
                  })
                  t.push(s)
                }
              }
              const r = () => {
                ;(this.done = !0), this.resolve()
              }
              Promise.all(t)
                .then(() => {
                  r()
                })
                .catch((o) => {
                  this.reject(o)
                }),
                0 === t.length && r(),
                (this.initialized = !0)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })(),
        kD = (() => {
          class e {
            log(t) {
              console.log(t)
            }
            warn(t) {
              console.warn(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'platform',
            }))
          }
          return e
        })()
      const Mn = new S('LocaleId', {
        providedIn: 'root',
        factory: () =>
          T(Mn, G.Optional | G.SkipSelf) ||
          (function Zx() {
            return (typeof $localize < 'u' && $localize.locale) || Ao
          })(),
      })
      let lu = (() => {
        class e {
          constructor() {
            ;(this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new lt(!1))
          }
          add() {
            this.hasPendingTasks.next(!0)
            const t = this.taskId++
            return this.pendingTasks.add(t), t
          }
          remove(t) {
            this.pendingTasks.delete(t),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1)
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      class Xx {
        constructor(n, t) {
          ;(this.ngModuleFactory = n), (this.componentFactories = t)
        }
      }
      let LD = (() => {
        class e {
          compileModuleSync(t) {
            return new Qd(t)
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t))
          }
          compileModuleAndAllComponentsSync(t) {
            const r = this.compileModuleSync(t),
              i = Cn(Dt(t).declarations).reduce((s, a) => {
                const u = Z(a)
                return u && s.push(new Li(u)), s
              }, [])
            return new Xx(r, i)
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t))
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      const BD = new S(''),
        du = new S('')
      let _f,
        vf = (() => {
          class e {
            constructor(t, r, o) {
              ;(this._ngZone = t),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                _f ||
                  ((function v1(e) {
                    _f = e
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > 'u'
                      ? null
                      : Zone.current.get('TaskTrackingZone')
                })
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  ;(this._didWork = !0), (this._isZoneStable = !1)
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ce.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          ;(this._isZoneStable = !0),
                            this._runCallbacksIfReady()
                        })
                    },
                  })
                })
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              )
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero')
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              )
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop()
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                  }
                  this._didWork = !1
                })
              else {
                let t = this.getPendingTasks()
                ;(this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(t) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0)
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : []
            }
            addCallback(t, r, o) {
              let i = -1
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  ;(this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    t(this._didWork, this.getPendingTasks())
                }, r)),
                this._callbacks.push({ doneCb: t, timeoutId: i, updateCb: o })
            }
            whenStable(t, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                )
              this.addCallback(t, r, o), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
              return this._pendingCount
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this)
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t)
            }
            findProviders(t, r, o) {
              return []
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(ce), M(yf), M(du))
            })
            static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
          }
          return e
        })(),
        yf = (() => {
          class e {
            constructor() {
              this._applications = new Map()
            }
            registerApplication(t, r) {
              this._applications.set(t, r)
            }
            unregisterApplication(t) {
              this._applications.delete(t)
            }
            unregisterAllApplications() {
              this._applications.clear()
            }
            getTestability(t) {
              return this._applications.get(t) || null
            }
            getAllTestabilities() {
              return Array.from(this._applications.values())
            }
            getAllRootElements() {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree(t, r = !0) {
              return _f?.findTestabilityInTree(this, t, r) ?? null
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'platform',
            }))
          }
          return e
        })(),
        Wn = null
      const UD = new S('AllowMultipleToken'),
        Df = new S('PlatformDestroyListeners'),
        Cf = new S('appBootstrapListener')
      class GD {
        constructor(n, t) {
          ;(this.name = n), (this.token = t)
        }
      }
      function qD(e, n, t = []) {
        const r = `Platform: ${n}`,
          o = new S(r)
        return (i = []) => {
          let s = wf()
          if (!s || s.injector.get(UD, !1)) {
            const a = [...t, ...i, { provide: o, useValue: !0 }]
            e
              ? e(a)
              : (function D1(e) {
                  if (Wn && !Wn.get(UD, !1)) throw new w(400, !1)
                  ;(function HD() {
                    !(function BI(e) {
                      lg = e
                    })(() => {
                      throw new w(600, !1)
                    })
                  })(),
                    (Wn = e)
                  const n = e.get(ZD)
                  ;(function zD(e) {
                    e.get(Km, null)?.forEach((t) => t())
                  })(e)
                })(
                  (function WD(e = [], n) {
                    return pt.create({
                      name: n,
                      providers: [
                        { provide: Yc, useValue: 'platform' },
                        { provide: Df, useValue: new Set([() => (Wn = null)]) },
                        ...e,
                      ],
                    })
                  })(a, r)
                )
          }
          return (function w1(e) {
            const n = wf()
            if (!n) throw new w(401, !1)
            return n
          })()
        }
      }
      function wf() {
        return Wn?.get(ZD) ?? null
      }
      let ZD = (() => {
        class e {
          constructor(t) {
            ;(this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1)
          }
          bootstrapModuleFactory(t, r) {
            const o = (function b1(e = 'zone.js', n) {
              return 'noop' === e ? new nA() : 'zone.js' === e ? new ce(n) : e
            })(
              r?.ngZone,
              (function YD(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                }
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            )
            return o.run(() => {
              const i = (function PR(e, n, t) {
                  return new Yd(e, n, t)
                })(
                  t.moduleType,
                  this.injector,
                  (function eC(e) {
                    return [
                      { provide: ce, useFactory: e },
                      {
                        provide: Ai,
                        multi: !0,
                        useFactory: () => {
                          const n = T(M1, { optional: !0 })
                          return () => n.initialize()
                        },
                      },
                      { provide: KD, useFactory: E1 },
                      { provide: mv, useFactory: vv },
                    ]
                  })(() => o)
                ),
                s = i.injector.get(Dn, null)
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (u) => {
                      s.handleError(u)
                    },
                  })
                  i.onDestroy(() => {
                    fu(this._modules, i), a.unsubscribe()
                  })
                }),
                (function QD(e, n, t) {
                  try {
                    const r = t()
                    return Ui(r)
                      ? r.catch((o) => {
                          throw (n.runOutsideAngular(() => e.handleError(o)), o)
                        })
                      : r
                  } catch (r) {
                    throw (n.runOutsideAngular(() => e.handleError(r)), r)
                  }
                })(s, o, () => {
                  const a = i.injector.get(pf)
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function v_(e) {
                          At(e, 'Expected localeId to be defined'),
                            'string' == typeof e &&
                              (m_ = e.toLowerCase().replace(/_/g, '-'))
                        })(i.injector.get(Mn, Ao) || Ao),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  )
                })
              )
            })
          }
          bootstrapModule(t, r = []) {
            const o = XD({}, r)
            return (function y1(e, n, t) {
              const r = new Qd(t)
              return Promise.resolve(r)
            })(0, 0, t).then((i) => this.bootstrapModuleFactory(i, o))
          }
          _moduleDoBootstrap(t) {
            const r = t.injector.get(Ro)
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((o) => r.bootstrap(o))
            else {
              if (!t.instance.ngDoBootstrap) throw new w(-403, !1)
              t.instance.ngDoBootstrap(r)
            }
            this._modules.push(t)
          }
          onDestroy(t) {
            this._destroyListeners.push(t)
          }
          get injector() {
            return this._injector
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1)
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r())
            const t = this._injector.get(Df, null)
            t && (t.forEach((r) => r()), t.clear()), (this._destroyed = !0)
          }
          get destroyed() {
            return this._destroyed
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(pt))
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'platform',
          }))
        }
        return e
      })()
      function XD(e, n) {
        return Array.isArray(n) ? n.reduce(XD, e) : { ...e, ...n }
      }
      let Ro = (() => {
        class e {
          constructor() {
            ;(this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = T(KD)),
              (this.zoneIsStable = T(mv)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = T(lu).hasPendingTasks.pipe(
                yt((t) => (t ? R(!1) : this.zoneIsStable)),
                (function JM(e, n = kn) {
                  return (
                    (e = e ?? KM),
                    Me((t, r) => {
                      let o,
                        i = !0
                      t.subscribe(
                        we(r, (s) => {
                          const a = n(s)
                          ;(i || !e(o, a)) && ((i = !1), (o = a), r.next(s))
                        })
                      )
                    })
                  )
                })(),
                xl()
              )),
              (this._injector = T(Et))
          }
          get destroyed() {
            return this._destroyed
          }
          get injector() {
            return this._injector
          }
          bootstrap(t, r) {
            const o = t instanceof ov
            if (!this._injector.get(pf).done)
              throw (
                (!o &&
                  (function Vr(e) {
                    const n = Z(e) || je(e) || Xe(e)
                    return null !== n && n.standalone
                  })(t),
                new w(405, !1))
              )
            let s
            ;(s = o ? t : this._injector.get(ja).resolveComponentFactory(t)),
              this.componentTypes.push(s.componentType)
            const a = (function _1(e) {
                return e.isBoundToModule
              })(s)
                ? void 0
                : this._injector.get(Cr),
              l = s.create(pt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(BD, null)
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  fu(this.components, l),
                  d?.unregisterApplication(c)
              }),
              this._loadComponent(l),
              l
            )
          }
          tick() {
            if (this._runningTick) throw new w(101, !1)
            try {
              this._runningTick = !0
              for (let t of this._views) t.detectChanges()
            } catch (t) {
              this.internalErrorHandler(t)
            } finally {
              this._runningTick = !1
            }
          }
          attachView(t) {
            const r = t
            this._views.push(r), r.attachToAppRef(this)
          }
          detachView(t) {
            const r = t
            fu(this._views, r), r.detachFromAppRef()
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t)
            const r = this._injector.get(Cf, [])
            r.push(...this._bootstrapListeners), r.forEach((o) => o(t))
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((t) => t()),
                  this._views.slice().forEach((t) => t.destroy())
              } finally {
                ;(this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = [])
              }
          }
          onDestroy(t) {
            return (
              this._destroyListeners.push(t),
              () => fu(this._destroyListeners, t)
            )
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1)
            const t = this._injector
            t.destroy && !t.destroyed && t.destroy()
          }
          get viewCount() {
            return this._views.length
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      function fu(e, n) {
        const t = e.indexOf(n)
        t > -1 && e.splice(t, 1)
      }
      const KD = new S('', {
        providedIn: 'root',
        factory: () => T(Dn).handleError.bind(void 0),
      })
      function E1() {
        const e = T(ce),
          n = T(Dn)
        return (t) => e.runOutsideAngular(() => n.handleError(t))
      }
      let M1 = (() => {
        class e {
          constructor() {
            ;(this.zone = T(ce)), (this.applicationRef = T(Ro))
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick()
                    })
                  },
                }))
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe()
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      let Ki = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = S1)
        }
        return e
      })()
      function S1(e) {
        return (function T1(e, n, t) {
          if (ur(e) && !t) {
            const r = Ct(e.index, n)
            return new ki(r, r)
          }
          return 47 & e.type ? new ki(n[De], n) : null
        })(Ue(), C(), 16 == (16 & e))
      }
      class oC {
        constructor() {}
        supports(n) {
          return Wa(n)
        }
        create(n) {
          return new P1(n)
        }
      }
      const x1 = (e, n) => n
      class P1 {
        constructor(n) {
          ;(this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || x1)
        }
        forEachItem(n) {
          let t
          for (t = this._itHead; null !== t; t = t._next) n(t)
        }
        forEachOperation(n) {
          let t = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null
          for (; t || r; ) {
            const s = !r || (t && t.currentIndex < sC(r, o, i)) ? t : r,
              a = sC(s, o, i),
              u = s.currentIndex
            if (s === r) o--, (r = r._nextRemoved)
            else if (((t = t._next), null == s.previousIndex)) o++
            else {
              i || (i = [])
              const l = a - o,
                c = u - o
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f
                  c <= p && p < l && (i[f] = h + 1)
                }
                i[s.previousIndex] = c - l
              }
            }
            a !== u && n(s, a, u)
          }
        }
        forEachPreviousItem(n) {
          let t
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t)
        }
        forEachAddedItem(n) {
          let t
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
        }
        forEachMovedItem(n) {
          let t
          for (t = this._movesHead; null !== t; t = t._nextMoved) n(t)
        }
        forEachRemovedItem(n) {
          let t
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
        }
        forEachIdentityChange(n) {
          let t
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            n(t)
        }
        diff(n) {
          if ((null == n && (n = []), !Wa(n))) throw new w(900, !1)
          return this.check(n) ? this : null
        }
        onDestroy() {}
        check(n) {
          this._reset()
          let o,
            i,
            s,
            t = this._itHead,
            r = !1
          if (Array.isArray(n)) {
            this.length = n.length
            for (let a = 0; a < this.length; a++)
              (i = n[a]),
                (s = this._trackByFn(a, i)),
                null !== t && Object.is(t.trackById, s)
                  ? (r && (t = this._verifyReinsertion(t, i, s, a)),
                    Object.is(t.item, i) || this._addIdentityChange(t, i))
                  : ((t = this._mismatch(t, i, s, a)), (r = !0)),
                (t = t._next)
          } else
            (o = 0),
              (function fN(e, n) {
                if (Array.isArray(e)) for (let t = 0; t < e.length; t++) n(e[t])
                else {
                  const t = e[Symbol.iterator]()
                  let r
                  for (; !(r = t.next()).done; ) n(r.value)
                }
              })(n, (a) => {
                ;(s = this._trackByFn(o, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (r && (t = this._verifyReinsertion(t, a, s, o)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, o)), (r = !0)),
                  (t = t._next),
                  o++
              }),
              (this.length = o)
          return this._truncate(t), (this.collection = n), this.isDirty
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          )
        }
        _reset() {
          if (this.isDirty) {
            let n
            for (
              n = this._previousItHead = this._itHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next
            for (n = this._additionsHead; null !== n; n = n._nextAdded)
              n.previousIndex = n.currentIndex
            for (
              this._additionsHead = this._additionsTail = null,
                n = this._movesHead;
              null !== n;
              n = n._nextMoved
            )
              n.previousIndex = n.currentIndex
            ;(this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null)
          }
        }
        _mismatch(n, t, r, o) {
          let i
          return (
            null === n ? (i = this._itTail) : ((i = n._prev), this._remove(n)),
            null !==
            (n =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._reinsertAfter(n, i, o))
              : null !==
                  (n =
                    null === this._linkedRecords
                      ? null
                      : this._linkedRecords.get(r, o))
                ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                  this._moveAfter(n, i, o))
                : (n = this._addAfter(new F1(t, r), i, o)),
            n
          )
        }
        _verifyReinsertion(n, t, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null)
          return (
            null !== i
              ? (n = this._reinsertAfter(i, n._prev, o))
              : n.currentIndex != o &&
                ((n.currentIndex = o), this._addToMoves(n, o)),
            n
          )
        }
        _truncate(n) {
          for (; null !== n; ) {
            const t = n._next
            this._addToRemovals(this._unlink(n)), (n = t)
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter(n, t, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n)
          const o = n._prevRemoved,
            i = n._nextRemoved
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          )
        }
        _moveAfter(n, t, r) {
          return (
            this._unlink(n),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          )
        }
        _addAfter(n, t, r) {
          return (
            this._insertAfter(n, t, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = n)
                : (this._additionsTail._nextAdded = n)),
            n
          )
        }
        _insertAfter(n, t, r) {
          const o = null === t ? this._itHead : t._next
          return (
            (n._next = o),
            (n._prev = t),
            null === o ? (this._itTail = n) : (o._prev = n),
            null === t ? (this._itHead = n) : (t._next = n),
            null === this._linkedRecords && (this._linkedRecords = new iC()),
            this._linkedRecords.put(n),
            (n.currentIndex = r),
            n
          )
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n))
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n)
          const t = n._prev,
            r = n._next
          return (
            null === t ? (this._itHead = r) : (t._next = r),
            null === r ? (this._itTail = t) : (r._prev = t),
            n
          )
        }
        _addToMoves(n, t) {
          return (
            n.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = n)
                  : (this._movesTail._nextMoved = n)),
            n
          )
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new iC()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n),
                (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          )
        }
        _addIdentityChange(n, t) {
          return (
            (n.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          )
        }
      }
      class F1 {
        constructor(n, t) {
          ;(this.item = n),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null)
        }
      }
      class k1 {
        constructor() {
          ;(this._head = null), (this._tail = null)
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n),
              (n._nextDup = null),
              (n._prevDup = null))
            : ((this._tail._nextDup = n),
              (n._prevDup = this._tail),
              (n._nextDup = null),
              (this._tail = n))
        }
        get(n, t) {
          let r
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === t || t <= r.currentIndex) &&
              Object.is(r.trackById, n)
            )
              return r
          return null
        }
        remove(n) {
          const t = n._prevDup,
            r = n._nextDup
          return (
            null === t ? (this._head = r) : (t._nextDup = r),
            null === r ? (this._tail = t) : (r._prevDup = t),
            null === this._head
          )
        }
      }
      class iC {
        constructor() {
          this.map = new Map()
        }
        put(n) {
          const t = n.trackById
          let r = this.map.get(t)
          r || ((r = new k1()), this.map.set(t, r)), r.add(n)
        }
        get(n, t) {
          const o = this.map.get(n)
          return o ? o.get(n, t) : null
        }
        remove(n) {
          const t = n.trackById
          return this.map.get(t).remove(n) && this.map.delete(t), n
        }
        get isEmpty() {
          return 0 === this.map.size
        }
        clear() {
          this.map.clear()
        }
      }
      function sC(e, n, t) {
        const r = e.previousIndex
        if (null === r) return r
        let o = 0
        return t && r < t.length && (o = t[r]), r + n + o
      }
      function uC() {
        return new gu([new oC()])
      }
      let gu = (() => {
        class e {
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'root',
            factory: uC,
          }))
          constructor(t) {
            this.factories = t
          }
          static create(t, r) {
            if (null != r) {
              const o = r.factories.slice()
              t = t.concat(o)
            }
            return new e(t)
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (r) => e.create(t, r || uC()),
              deps: [[e, new fa(), new da()]],
            }
          }
          find(t) {
            const r = this.factories.find((o) => o.supports(t))
            if (null != r) return r
            throw new w(901, !1)
          }
        }
        return e
      })()
      const B1 = qD(null, 'core', [])
      let U1 = (() => {
        class e {
          constructor(t) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(Ro))
          })
          static #t = (this.ɵmod = Ve({ type: e }))
          static #n = (this.ɵinj = Oe({}))
        }
        return e
      })()
      function xo(e) {
        return 'boolean' == typeof e ? e : null != e && 'false' !== e
      }
      let Tf = null
      function Zn() {
        return Tf
      }
      class nP {}
      const ot = new S('DocumentToken')
      let Af = (() => {
        class e {
          historyGo(t) {
            throw new Error('Not implemented')
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: function () {
              return T(oP)
            },
            providedIn: 'platform',
          }))
        }
        return e
      })()
      const rP = new S('Location Initialized')
      let oP = (() => {
        class e extends Af {
          constructor() {
            super(),
              (this._doc = T(ot)),
              (this._location = window.location),
              (this._history = window.history)
          }
          getBaseHrefFromDOM() {
            return Zn().getBaseHref(this._doc)
          }
          onPopState(t) {
            const r = Zn().getGlobalEventTarget(this._doc, 'window')
            return (
              r.addEventListener('popstate', t, !1),
              () => r.removeEventListener('popstate', t)
            )
          }
          onHashChange(t) {
            const r = Zn().getGlobalEventTarget(this._doc, 'window')
            return (
              r.addEventListener('hashchange', t, !1),
              () => r.removeEventListener('hashchange', t)
            )
          }
          get href() {
            return this._location.href
          }
          get protocol() {
            return this._location.protocol
          }
          get hostname() {
            return this._location.hostname
          }
          get port() {
            return this._location.port
          }
          get pathname() {
            return this._location.pathname
          }
          get search() {
            return this._location.search
          }
          get hash() {
            return this._location.hash
          }
          set pathname(t) {
            this._location.pathname = t
          }
          pushState(t, r, o) {
            this._history.pushState(t, r, o)
          }
          replaceState(t, r, o) {
            this._history.replaceState(t, r, o)
          }
          forward() {
            this._history.forward()
          }
          back() {
            this._history.back()
          }
          historyGo(t = 0) {
            this._history.go(t)
          }
          getState() {
            return this._history.state
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: function () {
              return new e()
            },
            providedIn: 'platform',
          }))
        }
        return e
      })()
      function Nf(e, n) {
        if (0 == e.length) return n
        if (0 == n.length) return e
        let t = 0
        return (
          e.endsWith('/') && t++,
          n.startsWith('/') && t++,
          2 == t ? e + n.substring(1) : 1 == t ? e + n : e + '/' + n
        )
      }
      function yC(e) {
        const n = e.match(/#|\?|$/),
          t = (n && n.index) || e.length
        return e.slice(0, t - ('/' === e[t - 1] ? 1 : 0)) + e.slice(t)
      }
      function In(e) {
        return e && '?' !== e[0] ? '?' + e : e
      }
      let br = (() => {
        class e {
          historyGo(t) {
            throw new Error('Not implemented')
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: function () {
              return T(DC)
            },
            providedIn: 'root',
          }))
        }
        return e
      })()
      const _C = new S('appBaseHref')
      let DC = (() => {
          class e extends br {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  T(ot).location?.origin ??
                  '')
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()()
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              )
            }
            getBaseHref() {
              return this._baseHref
            }
            prepareExternalUrl(t) {
              return Nf(this._baseHref, t)
            }
            path(t = !1) {
              const r =
                  this._platformLocation.pathname +
                  In(this._platformLocation.search),
                o = this._platformLocation.hash
              return o && t ? `${r}${o}` : r
            }
            pushState(t, r, o, i) {
              const s = this.prepareExternalUrl(o + In(i))
              this._platformLocation.pushState(t, r, s)
            }
            replaceState(t, r, o, i) {
              const s = this.prepareExternalUrl(o + In(i))
              this._platformLocation.replaceState(t, r, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            getState() {
              return this._platformLocation.getState()
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(Af), M(_C, 8))
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })(),
        iP = (() => {
          class e extends br {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r)
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()()
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              )
            }
            getBaseHref() {
              return this._baseHref
            }
            path(t = !1) {
              let r = this._platformLocation.hash
              return null == r && (r = '#'), r.length > 0 ? r.substring(1) : r
            }
            prepareExternalUrl(t) {
              const r = Nf(this._baseHref, t)
              return r.length > 0 ? '#' + r : r
            }
            pushState(t, r, o, i) {
              let s = this.prepareExternalUrl(o + In(i))
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, r, s)
            }
            replaceState(t, r, o, i) {
              let s = this.prepareExternalUrl(o + In(i))
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, r, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            getState() {
              return this._platformLocation.getState()
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(Af), M(_C, 8))
            })
            static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
          }
          return e
        })(),
        Of = (() => {
          class e {
            constructor(t) {
              ;(this._subject = new ie()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = t)
              const r = this._locationStrategy.getBaseHref()
              ;(this._basePath = (function uP(e) {
                if (new RegExp('^(https?:)?//').test(e)) {
                  const [, t] = e.split(/\/\/[^\/]+/)
                  return t
                }
                return e
              })(yC(CC(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  })
                })
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = [])
            }
            path(t = !1) {
              return this.normalize(this._locationStrategy.path(t))
            }
            getState() {
              return this._locationStrategy.getState()
            }
            isCurrentPathEqualTo(t, r = '') {
              return this.path() == this.normalize(t + In(r))
            }
            normalize(t) {
              return e.stripTrailingSlash(
                (function aP(e, n) {
                  if (!e || !n.startsWith(e)) return n
                  const t = n.substring(e.length)
                  return '' === t || ['/', ';', '?', '#'].includes(t[0]) ? t : n
                })(this._basePath, CC(t))
              )
            }
            prepareExternalUrl(t) {
              return (
                t && '/' !== t[0] && (t = '/' + t),
                this._locationStrategy.prepareExternalUrl(t)
              )
            }
            go(t, r = '', o = null) {
              this._locationStrategy.pushState(o, '', t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + In(r)),
                  o
                )
            }
            replaceState(t, r = '', o = null) {
              this._locationStrategy.replaceState(o, '', t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + In(r)),
                  o
                )
            }
            forward() {
              this._locationStrategy.forward()
            }
            back() {
              this._locationStrategy.back()
            }
            historyGo(t = 0) {
              this._locationStrategy.historyGo?.(t)
            }
            onUrlChange(t) {
              return (
                this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state)
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(t)
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null))
                }
              )
            }
            _notifyUrlChangeListeners(t = '', r) {
              this._urlChangeListeners.forEach((o) => o(t, r))
            }
            subscribe(t, r, o) {
              return this._subject.subscribe({ next: t, error: r, complete: o })
            }
            static #e = (this.normalizeQueryParams = In)
            static #t = (this.joinWithSlash = Nf)
            static #n = (this.stripTrailingSlash = yC)
            static #r = (this.ɵfac = function (r) {
              return new (r || e)(M(br))
            })
            static #o = (this.ɵprov = N({
              token: e,
              factory: function () {
                return (function sP() {
                  return new Of(M(br))
                })()
              },
              providedIn: 'root',
            }))
          }
          return e
        })()
      function CC(e) {
        return e.replace(/\/index.html$/, '')
      }
      var it = (function (e) {
          return (
            (e[(e.Format = 0)] = 'Format'),
            (e[(e.Standalone = 1)] = 'Standalone'),
            e
          )
        })(it || {}),
        se = (function (e) {
          return (
            (e[(e.Narrow = 0)] = 'Narrow'),
            (e[(e.Abbreviated = 1)] = 'Abbreviated'),
            (e[(e.Wide = 2)] = 'Wide'),
            (e[(e.Short = 3)] = 'Short'),
            e
          )
        })(se || {}),
        St = (function (e) {
          return (
            (e[(e.Short = 0)] = 'Short'),
            (e[(e.Medium = 1)] = 'Medium'),
            (e[(e.Long = 2)] = 'Long'),
            (e[(e.Full = 3)] = 'Full'),
            e
          )
        })(St || {}),
        Ce = (function (e) {
          return (
            (e[(e.Decimal = 0)] = 'Decimal'),
            (e[(e.Group = 1)] = 'Group'),
            (e[(e.List = 2)] = 'List'),
            (e[(e.PercentSign = 3)] = 'PercentSign'),
            (e[(e.PlusSign = 4)] = 'PlusSign'),
            (e[(e.MinusSign = 5)] = 'MinusSign'),
            (e[(e.Exponential = 6)] = 'Exponential'),
            (e[(e.SuperscriptingExponent = 7)] = 'SuperscriptingExponent'),
            (e[(e.PerMille = 8)] = 'PerMille'),
            (e[(e.Infinity = 9)] = 'Infinity'),
            (e[(e.NaN = 10)] = 'NaN'),
            (e[(e.TimeSeparator = 11)] = 'TimeSeparator'),
            (e[(e.CurrencyDecimal = 12)] = 'CurrencyDecimal'),
            (e[(e.CurrencyGroup = 13)] = 'CurrencyGroup'),
            e
          )
        })(Ce || {})
      function yu(e, n) {
        return kt(nt(e)[de.DateFormat], n)
      }
      function _u(e, n) {
        return kt(nt(e)[de.TimeFormat], n)
      }
      function Du(e, n) {
        return kt(nt(e)[de.DateTimeFormat], n)
      }
      function Ft(e, n) {
        const t = nt(e),
          r = t[de.NumberSymbols][n]
        if (typeof r > 'u') {
          if (n === Ce.CurrencyDecimal) return t[de.NumberSymbols][Ce.Decimal]
          if (n === Ce.CurrencyGroup) return t[de.NumberSymbols][Ce.Group]
        }
        return r
      }
      function bC(e) {
        if (!e[de.ExtraData])
          throw new Error(
            `Missing extra locale data for the locale "${e[de.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
          )
      }
      function kt(e, n) {
        for (let t = n; t > -1; t--) if (typeof e[t] < 'u') return e[t]
        throw new Error('Locale data API: locale data undefined')
      }
      function xf(e) {
        const [n, t] = e.split(':')
        return { hours: +n, minutes: +t }
      }
      const wP =
          /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
        ts = {},
        bP =
          /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/
      var Sn = (function (e) {
          return (
            (e[(e.Short = 0)] = 'Short'),
            (e[(e.ShortGMT = 1)] = 'ShortGMT'),
            (e[(e.Long = 2)] = 'Long'),
            (e[(e.Extended = 3)] = 'Extended'),
            e
          )
        })(Sn || {}),
        J = (function (e) {
          return (
            (e[(e.FullYear = 0)] = 'FullYear'),
            (e[(e.Month = 1)] = 'Month'),
            (e[(e.Date = 2)] = 'Date'),
            (e[(e.Hours = 3)] = 'Hours'),
            (e[(e.Minutes = 4)] = 'Minutes'),
            (e[(e.Seconds = 5)] = 'Seconds'),
            (e[(e.FractionalSeconds = 6)] = 'FractionalSeconds'),
            (e[(e.Day = 7)] = 'Day'),
            e
          )
        })(J || {}),
        K = (function (e) {
          return (
            (e[(e.DayPeriods = 0)] = 'DayPeriods'),
            (e[(e.Days = 1)] = 'Days'),
            (e[(e.Months = 2)] = 'Months'),
            (e[(e.Eras = 3)] = 'Eras'),
            e
          )
        })(K || {})
      function EP(e, n, t, r) {
        let o = (function xP(e) {
          if (IC(e)) return e
          if ('number' == typeof e && !isNaN(e)) return new Date(e)
          if ('string' == typeof e) {
            if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
              const [o, i = 1, s = 1] = e.split('-').map((a) => +a)
              return Cu(o, i - 1, s)
            }
            const t = parseFloat(e)
            if (!isNaN(e - t)) return new Date(t)
            let r
            if ((r = e.match(wP)))
              return (function PP(e) {
                const n = new Date(0)
                let t = 0,
                  r = 0
                const o = e[8] ? n.setUTCFullYear : n.setFullYear,
                  i = e[8] ? n.setUTCHours : n.setHours
                e[9] &&
                  ((t = Number(e[9] + e[10])), (r = Number(e[9] + e[11]))),
                  o.call(n, Number(e[1]), Number(e[2]) - 1, Number(e[3]))
                const s = Number(e[4] || 0) - t,
                  a = Number(e[5] || 0) - r,
                  u = Number(e[6] || 0),
                  l = Math.floor(1e3 * parseFloat('0.' + (e[7] || 0)))
                return i.call(n, s, a, u, l), n
              })(r)
          }
          const n = new Date(e)
          if (!IC(n)) throw new Error(`Unable to convert "${e}" into a date`)
          return n
        })(e)
        n = Tn(t, n) || n
        let a,
          s = []
        for (; n; ) {
          if (((a = bP.exec(n)), !a)) {
            s.push(n)
            break
          }
          {
            s = s.concat(a.slice(1))
            const c = s.pop()
            if (!c) break
            n = c
          }
        }
        let u = o.getTimezoneOffset()
        r &&
          ((u = MC(r, u)),
          (o = (function RP(e, n, t) {
            const r = t ? -1 : 1,
              o = e.getTimezoneOffset()
            return (function OP(e, n) {
              return (
                (e = new Date(e.getTime())).setMinutes(e.getMinutes() + n), e
              )
            })(e, r * (MC(n, o) - o))
          })(o, r, !0)))
        let l = ''
        return (
          s.forEach((c) => {
            const d = (function NP(e) {
              if (Ff[e]) return Ff[e]
              let n
              switch (e) {
                case 'G':
                case 'GG':
                case 'GGG':
                  n = fe(K.Eras, se.Abbreviated)
                  break
                case 'GGGG':
                  n = fe(K.Eras, se.Wide)
                  break
                case 'GGGGG':
                  n = fe(K.Eras, se.Narrow)
                  break
                case 'y':
                  n = Ee(J.FullYear, 1, 0, !1, !0)
                  break
                case 'yy':
                  n = Ee(J.FullYear, 2, 0, !0, !0)
                  break
                case 'yyy':
                  n = Ee(J.FullYear, 3, 0, !1, !0)
                  break
                case 'yyyy':
                  n = Ee(J.FullYear, 4, 0, !1, !0)
                  break
                case 'Y':
                  n = Mu(1)
                  break
                case 'YY':
                  n = Mu(2, !0)
                  break
                case 'YYY':
                  n = Mu(3)
                  break
                case 'YYYY':
                  n = Mu(4)
                  break
                case 'M':
                case 'L':
                  n = Ee(J.Month, 1, 1)
                  break
                case 'MM':
                case 'LL':
                  n = Ee(J.Month, 2, 1)
                  break
                case 'MMM':
                  n = fe(K.Months, se.Abbreviated)
                  break
                case 'MMMM':
                  n = fe(K.Months, se.Wide)
                  break
                case 'MMMMM':
                  n = fe(K.Months, se.Narrow)
                  break
                case 'LLL':
                  n = fe(K.Months, se.Abbreviated, it.Standalone)
                  break
                case 'LLLL':
                  n = fe(K.Months, se.Wide, it.Standalone)
                  break
                case 'LLLLL':
                  n = fe(K.Months, se.Narrow, it.Standalone)
                  break
                case 'w':
                  n = Pf(1)
                  break
                case 'ww':
                  n = Pf(2)
                  break
                case 'W':
                  n = Pf(1, !0)
                  break
                case 'd':
                  n = Ee(J.Date, 1)
                  break
                case 'dd':
                  n = Ee(J.Date, 2)
                  break
                case 'c':
                case 'cc':
                  n = Ee(J.Day, 1)
                  break
                case 'ccc':
                  n = fe(K.Days, se.Abbreviated, it.Standalone)
                  break
                case 'cccc':
                  n = fe(K.Days, se.Wide, it.Standalone)
                  break
                case 'ccccc':
                  n = fe(K.Days, se.Narrow, it.Standalone)
                  break
                case 'cccccc':
                  n = fe(K.Days, se.Short, it.Standalone)
                  break
                case 'E':
                case 'EE':
                case 'EEE':
                  n = fe(K.Days, se.Abbreviated)
                  break
                case 'EEEE':
                  n = fe(K.Days, se.Wide)
                  break
                case 'EEEEE':
                  n = fe(K.Days, se.Narrow)
                  break
                case 'EEEEEE':
                  n = fe(K.Days, se.Short)
                  break
                case 'a':
                case 'aa':
                case 'aaa':
                  n = fe(K.DayPeriods, se.Abbreviated)
                  break
                case 'aaaa':
                  n = fe(K.DayPeriods, se.Wide)
                  break
                case 'aaaaa':
                  n = fe(K.DayPeriods, se.Narrow)
                  break
                case 'b':
                case 'bb':
                case 'bbb':
                  n = fe(K.DayPeriods, se.Abbreviated, it.Standalone, !0)
                  break
                case 'bbbb':
                  n = fe(K.DayPeriods, se.Wide, it.Standalone, !0)
                  break
                case 'bbbbb':
                  n = fe(K.DayPeriods, se.Narrow, it.Standalone, !0)
                  break
                case 'B':
                case 'BB':
                case 'BBB':
                  n = fe(K.DayPeriods, se.Abbreviated, it.Format, !0)
                  break
                case 'BBBB':
                  n = fe(K.DayPeriods, se.Wide, it.Format, !0)
                  break
                case 'BBBBB':
                  n = fe(K.DayPeriods, se.Narrow, it.Format, !0)
                  break
                case 'h':
                  n = Ee(J.Hours, 1, -12)
                  break
                case 'hh':
                  n = Ee(J.Hours, 2, -12)
                  break
                case 'H':
                  n = Ee(J.Hours, 1)
                  break
                case 'HH':
                  n = Ee(J.Hours, 2)
                  break
                case 'm':
                  n = Ee(J.Minutes, 1)
                  break
                case 'mm':
                  n = Ee(J.Minutes, 2)
                  break
                case 's':
                  n = Ee(J.Seconds, 1)
                  break
                case 'ss':
                  n = Ee(J.Seconds, 2)
                  break
                case 'S':
                  n = Ee(J.FractionalSeconds, 1)
                  break
                case 'SS':
                  n = Ee(J.FractionalSeconds, 2)
                  break
                case 'SSS':
                  n = Ee(J.FractionalSeconds, 3)
                  break
                case 'Z':
                case 'ZZ':
                case 'ZZZ':
                  n = bu(Sn.Short)
                  break
                case 'ZZZZZ':
                  n = bu(Sn.Extended)
                  break
                case 'O':
                case 'OO':
                case 'OOO':
                case 'z':
                case 'zz':
                case 'zzz':
                  n = bu(Sn.ShortGMT)
                  break
                case 'OOOO':
                case 'ZZZZ':
                case 'zzzz':
                  n = bu(Sn.Long)
                  break
                default:
                  return null
              }
              return (Ff[e] = n), n
            })(c)
            l += d
              ? d(o, t, u)
              : "''" === c
                ? "'"
                : c.replace(/(^'|'$)/g, '').replace(/''/g, "'")
          }),
          l
        )
      }
      function Cu(e, n, t) {
        const r = new Date(0)
        return r.setFullYear(e, n, t), r.setHours(0, 0, 0), r
      }
      function Tn(e, n) {
        const t = (function cP(e) {
          return nt(e)[de.LocaleId]
        })(e)
        if (((ts[t] = ts[t] || {}), ts[t][n])) return ts[t][n]
        let r = ''
        switch (n) {
          case 'shortDate':
            r = yu(e, St.Short)
            break
          case 'mediumDate':
            r = yu(e, St.Medium)
            break
          case 'longDate':
            r = yu(e, St.Long)
            break
          case 'fullDate':
            r = yu(e, St.Full)
            break
          case 'shortTime':
            r = _u(e, St.Short)
            break
          case 'mediumTime':
            r = _u(e, St.Medium)
            break
          case 'longTime':
            r = _u(e, St.Long)
            break
          case 'fullTime':
            r = _u(e, St.Full)
            break
          case 'short':
            const o = Tn(e, 'shortTime'),
              i = Tn(e, 'shortDate')
            r = wu(Du(e, St.Short), [o, i])
            break
          case 'medium':
            const s = Tn(e, 'mediumTime'),
              a = Tn(e, 'mediumDate')
            r = wu(Du(e, St.Medium), [s, a])
            break
          case 'long':
            const u = Tn(e, 'longTime'),
              l = Tn(e, 'longDate')
            r = wu(Du(e, St.Long), [u, l])
            break
          case 'full':
            const c = Tn(e, 'fullTime'),
              d = Tn(e, 'fullDate')
            r = wu(Du(e, St.Full), [c, d])
        }
        return r && (ts[t][n] = r), r
      }
      function wu(e, n) {
        return (
          n &&
            (e = e.replace(/\{([^}]+)}/g, function (t, r) {
              return null != n && r in n ? n[r] : t
            })),
          e
        )
      }
      function zt(e, n, t = '-', r, o) {
        let i = ''
        ;(e < 0 || (o && e <= 0)) && (o ? (e = 1 - e) : ((e = -e), (i = t)))
        let s = String(e)
        for (; s.length < n; ) s = '0' + s
        return r && (s = s.slice(s.length - n)), i + s
      }
      function Ee(e, n, t = 0, r = !1, o = !1) {
        return function (i, s) {
          let a = (function IP(e, n) {
            switch (e) {
              case J.FullYear:
                return n.getFullYear()
              case J.Month:
                return n.getMonth()
              case J.Date:
                return n.getDate()
              case J.Hours:
                return n.getHours()
              case J.Minutes:
                return n.getMinutes()
              case J.Seconds:
                return n.getSeconds()
              case J.FractionalSeconds:
                return n.getMilliseconds()
              case J.Day:
                return n.getDay()
              default:
                throw new Error(`Unknown DateType value "${e}".`)
            }
          })(e, i)
          if (((t > 0 || a > -t) && (a += t), e === J.Hours))
            0 === a && -12 === t && (a = 12)
          else if (e === J.FractionalSeconds)
            return (function MP(e, n) {
              return zt(e, 3).substring(0, n)
            })(a, n)
          const u = Ft(s, Ce.MinusSign)
          return zt(a, n, u, r, o)
        }
      }
      function fe(e, n, t = it.Format, r = !1) {
        return function (o, i) {
          return (function SP(e, n, t, r, o, i) {
            switch (t) {
              case K.Months:
                return (function hP(e, n, t) {
                  const r = nt(e),
                    i = kt([r[de.MonthsFormat], r[de.MonthsStandalone]], n)
                  return kt(i, t)
                })(n, o, r)[e.getMonth()]
              case K.Days:
                return (function fP(e, n, t) {
                  const r = nt(e),
                    i = kt([r[de.DaysFormat], r[de.DaysStandalone]], n)
                  return kt(i, t)
                })(n, o, r)[e.getDay()]
              case K.DayPeriods:
                const s = e.getHours(),
                  a = e.getMinutes()
                if (i) {
                  const l = (function vP(e) {
                      const n = nt(e)
                      return (
                        bC(n),
                        (n[de.ExtraData][2] || []).map((r) =>
                          'string' == typeof r ? xf(r) : [xf(r[0]), xf(r[1])]
                        )
                      )
                    })(n),
                    c = (function yP(e, n, t) {
                      const r = nt(e)
                      bC(r)
                      const i =
                        kt([r[de.ExtraData][0], r[de.ExtraData][1]], n) || []
                      return kt(i, t) || []
                    })(n, o, r),
                    d = l.findIndex((f) => {
                      if (Array.isArray(f)) {
                        const [h, p] = f,
                          g = s >= h.hours && a >= h.minutes,
                          y = s < p.hours || (s === p.hours && a < p.minutes)
                        if (h.hours < p.hours) {
                          if (g && y) return !0
                        } else if (g || y) return !0
                      } else if (f.hours === s && f.minutes === a) return !0
                      return !1
                    })
                  if (-1 !== d) return c[d]
                }
                return (function dP(e, n, t) {
                  const r = nt(e),
                    i = kt(
                      [r[de.DayPeriodsFormat], r[de.DayPeriodsStandalone]],
                      n
                    )
                  return kt(i, t)
                })(n, o, r)[s < 12 ? 0 : 1]
              case K.Eras:
                return (function pP(e, n) {
                  return kt(nt(e)[de.Eras], n)
                })(n, r)[e.getFullYear() <= 0 ? 0 : 1]
              default:
                throw new Error(`unexpected translation type ${t}`)
            }
          })(o, i, e, n, t, r)
        }
      }
      function bu(e) {
        return function (n, t, r) {
          const o = -1 * r,
            i = Ft(t, Ce.MinusSign),
            s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60)
          switch (e) {
            case Sn.Short:
              return (
                (o >= 0 ? '+' : '') + zt(s, 2, i) + zt(Math.abs(o % 60), 2, i)
              )
            case Sn.ShortGMT:
              return 'GMT' + (o >= 0 ? '+' : '') + zt(s, 1, i)
            case Sn.Long:
              return (
                'GMT' +
                (o >= 0 ? '+' : '') +
                zt(s, 2, i) +
                ':' +
                zt(Math.abs(o % 60), 2, i)
              )
            case Sn.Extended:
              return 0 === r
                ? 'Z'
                : (o >= 0 ? '+' : '') +
                    zt(s, 2, i) +
                    ':' +
                    zt(Math.abs(o % 60), 2, i)
            default:
              throw new Error(`Unknown zone width "${e}"`)
          }
        }
      }
      const TP = 0,
        Eu = 4
      function EC(e) {
        return Cu(
          e.getFullYear(),
          e.getMonth(),
          e.getDate() + (Eu - e.getDay())
        )
      }
      function Pf(e, n = !1) {
        return function (t, r) {
          let o
          if (n) {
            const i = new Date(t.getFullYear(), t.getMonth(), 1).getDay() - 1,
              s = t.getDate()
            o = 1 + Math.floor((s + i) / 7)
          } else {
            const i = EC(t),
              s = (function AP(e) {
                const n = Cu(e, TP, 1).getDay()
                return Cu(e, 0, 1 + (n <= Eu ? Eu : Eu + 7) - n)
              })(i.getFullYear()),
              a = i.getTime() - s.getTime()
            o = 1 + Math.round(a / 6048e5)
          }
          return zt(o, e, Ft(r, Ce.MinusSign))
        }
      }
      function Mu(e, n = !1) {
        return function (t, r) {
          return zt(EC(t).getFullYear(), e, Ft(r, Ce.MinusSign), n)
        }
      }
      const Ff = {}
      function MC(e, n) {
        e = e.replace(/:/g, '')
        const t = Date.parse('Jan 01, 1970 00:00:00 ' + e) / 6e4
        return isNaN(t) ? n : t
      }
      function IC(e) {
        return e instanceof Date && !isNaN(e.valueOf())
      }
      function NC(e, n) {
        n = encodeURIComponent(n)
        for (const t of e.split(';')) {
          const r = t.indexOf('='),
            [o, i] = -1 == r ? [t, ''] : [t.slice(0, r), t.slice(r + 1)]
          if (o.trim() === n) return decodeURIComponent(i)
        }
        return null
      }
      class ZP {
        constructor(n, t, r, o) {
          ;(this.$implicit = n),
            (this.ngForOf = t),
            (this.index = r),
            (this.count = o)
        }
        get first() {
          return 0 === this.index
        }
        get last() {
          return this.index === this.count - 1
        }
        get even() {
          return this.index % 2 == 0
        }
        get odd() {
          return !this.even
        }
      }
      let Er = (() => {
        class e {
          set ngForOf(t) {
            ;(this._ngForOf = t), (this._ngForOfDirty = !0)
          }
          set ngForTrackBy(t) {
            this._trackByFn = t
          }
          get ngForTrackBy() {
            return this._trackByFn
          }
          constructor(t, r, o) {
            ;(this._viewContainer = t),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null)
          }
          set ngForTemplate(t) {
            t && (this._template = t)
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1
              const t = this._ngForOf
              !this._differ &&
                t &&
                (this._differ = this._differs.find(t).create(this.ngForTrackBy))
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf)
              t && this._applyChanges(t)
            }
          }
          _applyChanges(t) {
            const r = this._viewContainer
            t.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new ZP(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                )
              else if (null == s) r.remove(null === i ? void 0 : i)
              else if (null !== i) {
                const a = r.get(i)
                r.move(a, s), xC(a, o)
              }
            })
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context
              ;(a.index = o), (a.count = i), (a.ngForOf = this._ngForOf)
            }
            t.forEachIdentityChange((o) => {
              xC(r.get(o.currentIndex), o)
            })
          }
          static ngTemplateContextGuard(t, r) {
            return !0
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(Gt), v(En), v(gu))
          })
          static #t = (this.ɵdir = L({
            type: e,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate',
            },
            standalone: !0,
          }))
        }
        return e
      })()
      function xC(e, n) {
        e.context.$implicit = n.item
      }
      let rs = (() => {
        class e {
          constructor(t, r) {
            ;(this._viewContainer = t),
              (this._context = new YP()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r)
          }
          set ngIf(t) {
            ;(this._context.$implicit = this._context.ngIf = t),
              this._updateView()
          }
          set ngIfThen(t) {
            PC('ngIfThen', t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView()
          }
          set ngIfElse(t) {
            PC('ngIfElse', t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView()
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )))
          }
          static ngTemplateContextGuard(t, r) {
            return !0
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(Gt), v(En))
          })
          static #t = (this.ɵdir = L({
            type: e,
            selectors: [['', 'ngIf', '']],
            inputs: {
              ngIf: 'ngIf',
              ngIfThen: 'ngIfThen',
              ngIfElse: 'ngIfElse',
            },
            standalone: !0,
          }))
        }
        return e
      })()
      class YP {
        constructor() {
          ;(this.$implicit = null), (this.ngIf = null)
        }
      }
      function PC(e, n) {
        if (n && !n.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${Se(n)}'.`
          )
      }
      function qt(e, n) {
        return new w(2100, !1)
      }
      class JP {
        createSubscription(n, t) {
          return fg(() =>
            n.subscribe({
              next: t,
              error: (r) => {
                throw r
              },
            })
          )
        }
        dispose(n) {
          fg(() => n.unsubscribe())
        }
      }
      class KP {
        createSubscription(n, t) {
          return n.then(t, (r) => {
            throw r
          })
        }
        dispose(n) {}
      }
      const eF = new KP(),
        tF = new JP()
      let kC = (() => {
        class e {
          constructor(t) {
            ;(this._latestValue = null),
              (this._subscription = null),
              (this._obj = null),
              (this._strategy = null),
              (this._ref = t)
          }
          ngOnDestroy() {
            this._subscription && this._dispose(), (this._ref = null)
          }
          transform(t) {
            return this._obj
              ? t !== this._obj
                ? (this._dispose(), this.transform(t))
                : this._latestValue
              : (t && this._subscribe(t), this._latestValue)
          }
          _subscribe(t) {
            ;(this._obj = t),
              (this._strategy = this._selectStrategy(t)),
              (this._subscription = this._strategy.createSubscription(t, (r) =>
                this._updateLatestValue(t, r)
              ))
          }
          _selectStrategy(t) {
            if (Ui(t)) return eF
            if (by(t)) return tF
            throw qt()
          }
          _dispose() {
            this._strategy.dispose(this._subscription),
              (this._latestValue = null),
              (this._subscription = null),
              (this._obj = null)
          }
          _updateLatestValue(t, r) {
            t === this._obj &&
              ((this._latestValue = r), this._ref.markForCheck())
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(Ki, 16))
          })
          static #t = (this.ɵpipe = Ge({
            name: 'async',
            type: e,
            pure: !1,
            standalone: !0,
          }))
        }
        return e
      })()
      const aF = new S('DATE_PIPE_DEFAULT_TIMEZONE'),
        uF = new S('DATE_PIPE_DEFAULT_OPTIONS')
      let LC = (() => {
          class e {
            constructor(t, r, o) {
              ;(this.locale = t),
                (this.defaultTimezone = r),
                (this.defaultOptions = o)
            }
            transform(t, r, o, i) {
              if (null == t || '' === t || t != t) return null
              try {
                return EP(
                  t,
                  r ?? this.defaultOptions?.dateFormat ?? 'mediumDate',
                  i || this.locale,
                  o ??
                    this.defaultOptions?.timezone ??
                    this.defaultTimezone ??
                    void 0
                )
              } catch (s) {
                throw qt()
              }
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Mn, 16), v(aF, 24), v(uF, 24))
            })
            static #t = (this.ɵpipe = Ge({
              name: 'date',
              type: e,
              pure: !0,
              standalone: !0,
            }))
          }
          return e
        })(),
        Su = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({}))
          }
          return e
        })()
      function $C(e) {
        return 'server' === e
      }
      let CF = (() => {
        class e {
          static #e = (this.ɵprov = N({
            token: e,
            providedIn: 'root',
            factory: () => new wF(M(ot), window),
          }))
        }
        return e
      })()
      class wF {
        constructor(n, t) {
          ;(this.document = n), (this.window = t), (this.offset = () => [0, 0])
        }
        setOffset(n) {
          this.offset = Array.isArray(n) ? () => n : n
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0]
        }
        scrollToPosition(n) {
          this.supportsScrolling() && this.window.scrollTo(n[0], n[1])
        }
        scrollToAnchor(n) {
          if (!this.supportsScrolling()) return
          const t = (function bF(e, n) {
            const t = e.getElementById(n) || e.getElementsByName(n)[0]
            if (t) return t
            if (
              'function' == typeof e.createTreeWalker &&
              e.body &&
              'function' == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT)
              let o = r.currentNode
              for (; o; ) {
                const i = o.shadowRoot
                if (i) {
                  const s =
                    i.getElementById(n) || i.querySelector(`[name="${n}"]`)
                  if (s) return s
                }
                o = r.nextNode()
              }
            }
            return null
          })(this.document, n)
          t && (this.scrollToElement(t), t.focus())
        }
        setHistoryScrollRestoration(n) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = n)
        }
        scrollToElement(n) {
          const t = n.getBoundingClientRect(),
            r = t.left + this.window.pageXOffset,
            o = t.top + this.window.pageYOffset,
            i = this.offset()
          this.window.scrollTo(r - i[0], o - i[1])
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              'pageXOffset' in this.window
            )
          } catch {
            return !1
          }
        }
      }
      class BC {}
      class qF extends nP {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0)
        }
      }
      class Zf extends qF {
        static makeCurrent() {
          !(function tP(e) {
            Tf || (Tf = e)
          })(new Zf())
        }
        onAndCancel(n, t, r) {
          return (
            n.addEventListener(t, r),
            () => {
              n.removeEventListener(t, r)
            }
          )
        }
        dispatchEvent(n, t) {
          n.dispatchEvent(t)
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n)
        }
        createElement(n, t) {
          return (t = t || this.getDefaultDocument()).createElement(n)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle')
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment
        }
        getGlobalEventTarget(n, t) {
          return 'window' === t
            ? window
            : 'document' === t
              ? n
              : 'body' === t
                ? n.body
                : null
        }
        getBaseHref(n) {
          const t = (function WF() {
            return (
              (is = is || document.querySelector('base')),
              is ? is.getAttribute('href') : null
            )
          })()
          return null == t
            ? null
            : (function ZF(e) {
                ;(Nu = Nu || document.createElement('a')),
                  Nu.setAttribute('href', e)
                const n = Nu.pathname
                return '/' === n.charAt(0) ? n : `/${n}`
              })(t)
        }
        resetBaseElement() {
          is = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        getCookie(n) {
          return NC(document.cookie, n)
        }
      }
      let Nu,
        is = null,
        QF = (() => {
          class e {
            build() {
              return new XMLHttpRequest()
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
          }
          return e
        })()
      const Yf = new S('EventManagerPlugins')
      let qC = (() => {
        class e {
          constructor(t, r) {
            ;(this._zone = r),
              (this._eventNameToPlugin = new Map()),
              t.forEach((o) => {
                o.manager = this
              }),
              (this._plugins = t.slice().reverse())
          }
          addEventListener(t, r, o) {
            return this._findPluginFor(r).addEventListener(t, r, o)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(t) {
            let r = this._eventNameToPlugin.get(t)
            if (r) return r
            if (((r = this._plugins.find((i) => i.supports(t))), !r))
              throw new w(5101, !1)
            return this._eventNameToPlugin.set(t, r), r
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(Yf), M(ce))
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      class WC {
        constructor(n) {
          this._doc = n
        }
      }
      const Qf = 'ng-app-id'
      let ZC = (() => {
        class e {
          constructor(t, r, o, i = {}) {
            ;(this.doc = t),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = $C(i)),
              this.resetHostNodes()
          }
          addStyles(t) {
            for (const r of t)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
          }
          removeStyles(t) {
            for (const r of t)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r)
          }
          ngOnDestroy() {
            const t = this.styleNodesInDOM
            t && (t.forEach((r) => r.remove()), t.clear())
            for (const r of this.getAllStyles()) this.onStyleRemoved(r)
            this.resetHostNodes()
          }
          addHost(t) {
            this.hostNodes.add(t)
            for (const r of this.getAllStyles()) this.addStyleToHost(t, r)
          }
          removeHost(t) {
            this.hostNodes.delete(t)
          }
          getAllStyles() {
            return this.styleRef.keys()
          }
          onStyleAdded(t) {
            for (const r of this.hostNodes) this.addStyleToHost(r, t)
          }
          onStyleRemoved(t) {
            const r = this.styleRef
            r.get(t)?.elements?.forEach((o) => o.remove()), r.delete(t)
          }
          collectServerRenderedStyles() {
            const t = this.doc.head?.querySelectorAll(
              `style[${Qf}="${this.appId}"]`
            )
            if (t?.length) {
              const r = new Map()
              return (
                t.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o)
                }),
                r
              )
            }
            return null
          }
          changeUsageCount(t, r) {
            const o = this.styleRef
            if (o.has(t)) {
              const i = o.get(t)
              return (i.usage += r), i.usage
            }
            return o.set(t, { usage: r, elements: [] }), r
          }
          getStyleElement(t, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r)
            if (i?.parentNode === t)
              return o.delete(r), i.removeAttribute(Qf), i
            {
              const s = this.doc.createElement('style')
              return (
                this.nonce && s.setAttribute('nonce', this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(Qf, this.appId),
                s
              )
            }
          }
          addStyleToHost(t, r) {
            const o = this.getStyleElement(t, r)
            t.appendChild(o)
            const i = this.styleRef,
              s = i.get(r)?.elements
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 })
          }
          resetHostNodes() {
            const t = this.hostNodes
            t.clear(), t.add(this.doc.head)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(ot), M(xa), M(ev, 8), M(gr))
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      const Xf = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        Jf = /%COMP%/g,
        ek = new S('RemoveStylesOnCompDestroy', {
          providedIn: 'root',
          factory: () => !1,
        })
      function QC(e, n) {
        return n.map((t) => t.replace(Jf, e))
      }
      let XC = (() => {
        class e {
          constructor(t, r, o, i, s, a, u, l = null) {
            ;(this.eventManager = t),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = $C(a)),
              (this.defaultRenderer = new Kf(t, s, u, this.platformIsServer))
          }
          createRenderer(t, r) {
            if (!t || !r) return this.defaultRenderer
            this.platformIsServer &&
              r.encapsulation === Vt.ShadowDom &&
              (r = { ...r, encapsulation: Vt.Emulated })
            const o = this.getOrCreateRenderer(t, r)
            return (
              o instanceof KC
                ? o.applyToHost(t)
                : o instanceof eh && o.applyStyles(),
              o
            )
          }
          getOrCreateRenderer(t, r) {
            const o = this.rendererByCompId
            let i = o.get(r.id)
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                l = this.sharedStylesHost,
                c = this.removeStylesOnCompDestroy,
                d = this.platformIsServer
              switch (r.encapsulation) {
                case Vt.Emulated:
                  i = new KC(u, l, r, this.appId, c, s, a, d)
                  break
                case Vt.ShadowDom:
                  return new ok(u, l, t, r, s, a, this.nonce, d)
                default:
                  i = new eh(u, l, r, c, s, a, d)
              }
              o.set(r.id, i)
            }
            return i
          }
          ngOnDestroy() {
            this.rendererByCompId.clear()
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              M(qC),
              M(ZC),
              M(xa),
              M(ek),
              M(ot),
              M(gr),
              M(ce),
              M(ev)
            )
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      class Kf {
        constructor(n, t, r, o) {
          ;(this.eventManager = n),
            (this.doc = t),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null)
        }
        destroy() {}
        createElement(n, t) {
          return t
            ? this.doc.createElementNS(Xf[t] || t, n)
            : this.doc.createElement(n)
        }
        createComment(n) {
          return this.doc.createComment(n)
        }
        createText(n) {
          return this.doc.createTextNode(n)
        }
        appendChild(n, t) {
          ;(JC(n) ? n.content : n).appendChild(t)
        }
        insertBefore(n, t, r) {
          n && (JC(n) ? n.content : n).insertBefore(t, r)
        }
        removeChild(n, t) {
          n && n.removeChild(t)
        }
        selectRootElement(n, t) {
          let r = 'string' == typeof n ? this.doc.querySelector(n) : n
          if (!r) throw new w(-5104, !1)
          return t || (r.textContent = ''), r
        }
        parentNode(n) {
          return n.parentNode
        }
        nextSibling(n) {
          return n.nextSibling
        }
        setAttribute(n, t, r, o) {
          if (o) {
            t = o + ':' + t
            const i = Xf[o]
            i ? n.setAttributeNS(i, t, r) : n.setAttribute(t, r)
          } else n.setAttribute(t, r)
        }
        removeAttribute(n, t, r) {
          if (r) {
            const o = Xf[r]
            o ? n.removeAttributeNS(o, t) : n.removeAttribute(`${r}:${t}`)
          } else n.removeAttribute(t)
        }
        addClass(n, t) {
          n.classList.add(t)
        }
        removeClass(n, t) {
          n.classList.remove(t)
        }
        setStyle(n, t, r, o) {
          o & (Gn.DashCase | Gn.Important)
            ? n.style.setProperty(t, r, o & Gn.Important ? 'important' : '')
            : (n.style[t] = r)
        }
        removeStyle(n, t, r) {
          r & Gn.DashCase ? n.style.removeProperty(t) : (n.style[t] = '')
        }
        setProperty(n, t, r) {
          n[t] = r
        }
        setValue(n, t) {
          n.nodeValue = t
        }
        listen(n, t, r) {
          if (
            'string' == typeof n &&
            !(n = Zn().getGlobalEventTarget(this.doc, n))
          )
            throw new Error(`Unsupported event target ${n} for event ${t}`)
          return this.eventManager.addEventListener(
            n,
            t,
            this.decoratePreventDefault(r)
          )
        }
        decoratePreventDefault(n) {
          return (t) => {
            if ('__ngUnwrap__' === t) return n
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => n(t))
                : n(t)) && t.preventDefault()
          }
        }
      }
      function JC(e) {
        return 'TEMPLATE' === e.tagName && void 0 !== e.content
      }
      class ok extends Kf {
        constructor(n, t, r, o, i, s, a, u) {
          super(n, i, s, u),
            (this.sharedStylesHost = t),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot)
          const l = QC(o.id, o.styles)
          for (const c of l) {
            const d = document.createElement('style')
            a && d.setAttribute('nonce', a),
              (d.textContent = c),
              this.shadowRoot.appendChild(d)
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n
        }
        appendChild(n, t) {
          return super.appendChild(this.nodeOrShadowRoot(n), t)
        }
        insertBefore(n, t, r) {
          return super.insertBefore(this.nodeOrShadowRoot(n), t, r)
        }
        removeChild(n, t) {
          return super.removeChild(this.nodeOrShadowRoot(n), t)
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(n))
          )
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
      }
      class eh extends Kf {
        constructor(n, t, r, o, i, s, a, u) {
          super(n, i, s, a),
            (this.sharedStylesHost = t),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? QC(u, r.styles) : r.styles)
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles)
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles)
        }
      }
      class KC extends eh {
        constructor(n, t, r, o, i, s, a, u) {
          const l = o + '-' + r.id
          super(n, t, r, i, s, a, u, l),
            (this.contentAttr = (function tk(e) {
              return '_ngcontent-%COMP%'.replace(Jf, e)
            })(l)),
            (this.hostAttr = (function nk(e) {
              return '_nghost-%COMP%'.replace(Jf, e)
            })(l))
        }
        applyToHost(n) {
          this.applyStyles(), this.setAttribute(n, this.hostAttr, '')
        }
        createElement(n, t) {
          const r = super.createElement(n, t)
          return super.setAttribute(r, this.contentAttr, ''), r
        }
      }
      let ik = (() => {
        class e extends WC {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return !0
          }
          addEventListener(t, r, o) {
            return (
              t.addEventListener(r, o, !1),
              () => this.removeEventListener(t, r, o)
            )
          }
          removeEventListener(t, r, o) {
            return t.removeEventListener(r, o)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(ot))
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      const ew = ['alt', 'control', 'meta', 'shift'],
        sk = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        ak = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        }
      let uk = (() => {
        class e extends WC {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return null != e.parseEventName(t)
          }
          addEventListener(t, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone())
            return this.manager
              .getZone()
              .runOutsideAngular(() => Zn().onAndCancel(t, i.domEventName, s))
          }
          static parseEventName(t) {
            const r = t.toLowerCase().split('.'),
              o = r.shift()
            if (0 === r.length || ('keydown' !== o && 'keyup' !== o))
              return null
            const i = e._normalizeKey(r.pop())
            let s = '',
              a = r.indexOf('code')
            if (
              (a > -1 && (r.splice(a, 1), (s = 'code.')),
              ew.forEach((l) => {
                const c = r.indexOf(l)
                c > -1 && (r.splice(c, 1), (s += l + '.'))
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null
            const u = {}
            return (u.domEventName = o), (u.fullKey = s), u
          }
          static matchEventFullKeyCode(t, r) {
            let o = sk[t.key] || t.key,
              i = ''
            return (
              r.indexOf('code.') > -1 && ((o = t.code), (i = 'code.')),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                ' ' === o ? (o = 'space') : '.' === o && (o = 'dot'),
                ew.forEach((s) => {
                  s !== o && (0, ak[s])(t) && (i += s + '.')
                }),
                (i += o),
                i === r)
            )
          }
          static eventCallback(t, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, t) && o.runGuarded(() => r(i))
            }
          }
          static _normalizeKey(t) {
            return 'esc' === t ? 'escape' : t
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(ot))
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      const fk = qD(B1, 'browser', [
          { provide: gr, useValue: 'browser' },
          {
            provide: Km,
            useValue: function lk() {
              Zf.makeCurrent()
            },
            multi: !0,
          },
          {
            provide: ot,
            useFactory: function dk() {
              return (
                (function z0(e) {
                  jc = e
                })(document),
                document
              )
            },
            deps: [],
          },
        ]),
        hk = new S(''),
        rw = [
          {
            provide: du,
            useClass: class YF {
              addToWindow(n) {
                ;(ue.getAngularTestability = (r, o = !0) => {
                  const i = n.findTestabilityInTree(r, o)
                  if (null == i) throw new w(5103, !1)
                  return i
                }),
                  (ue.getAllAngularTestabilities = () =>
                    n.getAllTestabilities()),
                  (ue.getAllAngularRootElements = () => n.getAllRootElements()),
                  ue.frameworkStabilizers || (ue.frameworkStabilizers = []),
                  ue.frameworkStabilizers.push((r) => {
                    const o = ue.getAllAngularTestabilities()
                    let i = o.length,
                      s = !1
                    const a = function (u) {
                      ;(s = s || u), i--, 0 == i && r(s)
                    }
                    o.forEach((u) => {
                      u.whenStable(a)
                    })
                  })
              }
              findTestabilityInTree(n, t, r) {
                return null == t
                  ? null
                  : (n.getTestability(t) ??
                      (r
                        ? Zn().isShadowRoot(t)
                          ? this.findTestabilityInTree(n, t.host, !0)
                          : this.findTestabilityInTree(n, t.parentElement, !0)
                        : null))
              }
            },
            deps: [],
          },
          { provide: BD, useClass: vf, deps: [ce, yf, du] },
          { provide: vf, useClass: vf, deps: [ce, yf, du] },
        ],
        ow = [
          { provide: Yc, useValue: 'root' },
          {
            provide: Dn,
            useFactory: function ck() {
              return new Dn()
            },
            deps: [],
          },
          { provide: Yf, useClass: ik, multi: !0, deps: [ot, ce, gr] },
          { provide: Yf, useClass: uk, multi: !0, deps: [ot] },
          XC,
          ZC,
          qC,
          { provide: sv, useExisting: XC },
          { provide: BC, useClass: QF, deps: [] },
          [],
        ]
      let pk = (() => {
          class e {
            constructor(t) {}
            static withServerTransition(t) {
              return {
                ngModule: e,
                providers: [{ provide: xa, useValue: t.appId }],
              }
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(hk, 12))
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({
              providers: [...ow, ...rw],
              imports: [Su, U1],
            }))
          }
          return e
        })(),
        iw = (() => {
          class e {
            constructor(t) {
              this._doc = t
            }
            getTitle() {
              return this._doc.title
            }
            setTitle(t) {
              this._doc.title = t || ''
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(ot))
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: function (r) {
                let o = null
                return (
                  (o = r
                    ? new r()
                    : (function mk() {
                        return new iw(M(ot))
                      })()),
                  o
                )
              },
              providedIn: 'root',
            }))
          }
          return e
        })()
      typeof window < 'u' && window
      let uw = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: function (r) {
                let o = null
                return (o = r ? new (r || e)() : M(lw)), o
              },
              providedIn: 'root',
            }))
          }
          return e
        })(),
        lw = (() => {
          class e extends uw {
            constructor(t) {
              super(), (this._doc = t)
            }
            sanitize(t, r) {
              if (null == r) return null
              switch (t) {
                case xt.NONE:
                  return r
                case xt.HTML:
                  return en(r, 'HTML')
                    ? bt(r)
                    : Gm(this._doc, String(r)).toString()
                case xt.STYLE:
                  return en(r, 'Style') ? bt(r) : r
                case xt.SCRIPT:
                  if (en(r, 'Script')) return bt(r)
                  throw new w(5200, !1)
                case xt.URL:
                  return en(r, 'URL') ? bt(r) : Sa(String(r))
                case xt.RESOURCE_URL:
                  if (en(r, 'ResourceURL')) return bt(r)
                  throw new w(5201, !1)
                default:
                  throw new w(5202, !1)
              }
            }
            bypassSecurityTrustHtml(t) {
              return (function J0(e) {
                return new q0(e)
              })(t)
            }
            bypassSecurityTrustStyle(t) {
              return (function K0(e) {
                return new W0(e)
              })(t)
            }
            bypassSecurityTrustScript(t) {
              return (function eT(e) {
                return new Z0(e)
              })(t)
            }
            bypassSecurityTrustUrl(t) {
              return (function tT(e) {
                return new Y0(e)
              })(t)
            }
            bypassSecurityTrustResourceUrl(t) {
              return (function nT(e) {
                return new Q0(e)
              })(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(ot))
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: function (r) {
                let o = null
                return (
                  (o = r
                    ? new r()
                    : (function Dk(e) {
                        return new lw(e.get(ot))
                      })(M(pt))),
                  o
                )
              },
              providedIn: 'root',
            }))
          }
          return e
        })()
      const { isArray: Ck } = Array,
        { getPrototypeOf: wk, prototype: bk, keys: Ek } = Object
      function dw(e) {
        if (1 === e.length) {
          const n = e[0]
          if (Ck(n)) return { args: n, keys: null }
          if (
            (function Mk(e) {
              return e && 'object' == typeof e && wk(e) === bk
            })(n)
          ) {
            const t = Ek(n)
            return { args: t.map((r) => n[r]), keys: t }
          }
        }
        return { args: e, keys: null }
      }
      const { isArray: Ik } = Array
      function fw(e) {
        return W((n) =>
          (function Sk(e, n) {
            return Ik(n) ? e(...n) : e(n)
          })(e, n)
        )
      }
      function hw(e, n) {
        return e.reduce((t, r, o) => ((t[r] = n[o]), t), {})
      }
      function pw(...e) {
        const n = Ep(e),
          { args: t, keys: r } = dw(e),
          o = new he((i) => {
            const { length: s } = t
            if (!s) return void i.complete()
            const a = new Array(s)
            let u = s,
              l = s
            for (let c = 0; c < s; c++) {
              let d = !1
              vt(t[c]).subscribe(
                we(
                  i,
                  (f) => {
                    d || ((d = !0), l--), (a[c] = f)
                  },
                  () => u--,
                  void 0,
                  () => {
                    ;(!u || !d) && (l || i.next(r ? hw(r, a) : a), i.complete())
                  }
                )
              )
            }
          })
        return n ? o.pipe(fw(n)) : o
      }
      let gw = (() => {
          class e {
            constructor(t, r) {
              ;(this._renderer = t),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {})
            }
            setProperty(t, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, r)
            }
            registerOnTouched(t) {
              this.onTouched = t
            }
            registerOnChange(t) {
              this.onChange = t
            }
            setDisabledState(t) {
              this.setProperty('disabled', t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(_n), v(Mt))
            })
            static #t = (this.ɵdir = L({ type: e }))
          }
          return e
        })(),
        Mr = (() => {
          class e extends gw {
            static #e = (this.ɵfac = (function () {
              let t
              return function (o) {
                return (t || (t = be(e)))(o || e)
              }
            })())
            static #t = (this.ɵdir = L({ type: e, features: [ne] }))
          }
          return e
        })()
      const an = new S('NgValueAccessor'),
        Ak = { provide: an, useExisting: ae(() => Qn), multi: !0 },
        Ok = new S('CompositionEventMode')
      let Qn = (() => {
        class e extends gw {
          constructor(t, r, o) {
            super(t, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function Nk() {
                  const e = Zn() ? Zn().getUserAgent() : ''
                  return /android (\d+)/.test(e.toLowerCase())
                })())
          }
          writeValue(t) {
            this.setProperty('value', t ?? '')
          }
          _handleInput(t) {
            ;(!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t)
          }
          _compositionStart() {
            this._composing = !0
          }
          _compositionEnd(t) {
            ;(this._composing = !1), this._compositionMode && this.onChange(t)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(_n), v(Mt), v(Ok, 8))
          })
          static #t = (this.ɵdir = L({
            type: e,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', ''],
            ],
            hostBindings: function (r, o) {
              1 & r &&
                X('input', function (s) {
                  return o._handleInput(s.target.value)
                })('blur', function () {
                  return o.onTouched()
                })('compositionstart', function () {
                  return o._compositionStart()
                })('compositionend', function (s) {
                  return o._compositionEnd(s.target.value)
                })
            },
            features: [ge([Ak]), ne],
          }))
        }
        return e
      })()
      function Xn(e) {
        return (
          null == e ||
          (('string' == typeof e || Array.isArray(e)) && 0 === e.length)
        )
      }
      function vw(e) {
        return null != e && 'number' == typeof e.length
      }
      const Ze = new S('NgValidators'),
        Jn = new S('NgAsyncValidators'),
        Rk =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      class Lt {
        static min(n) {
          return (function yw(e) {
            return (n) => {
              if (Xn(n.value) || Xn(e)) return null
              const t = parseFloat(n.value)
              return !isNaN(t) && t < e
                ? { min: { min: e, actual: n.value } }
                : null
            }
          })(n)
        }
        static max(n) {
          return (function _w(e) {
            return (n) => {
              if (Xn(n.value) || Xn(e)) return null
              const t = parseFloat(n.value)
              return !isNaN(t) && t > e
                ? { max: { max: e, actual: n.value } }
                : null
            }
          })(n)
        }
        static required(n) {
          return Dw(n)
        }
        static requiredTrue(n) {
          return (function Cw(e) {
            return !0 === e.value ? null : { required: !0 }
          })(n)
        }
        static email(n) {
          return (function ww(e) {
            return Xn(e.value) || Rk.test(e.value) ? null : { email: !0 }
          })(n)
        }
        static minLength(n) {
          return (function bw(e) {
            return (n) =>
              Xn(n.value) || !vw(n.value)
                ? null
                : n.value.length < e
                  ? {
                      minlength: {
                        requiredLength: e,
                        actualLength: n.value.length,
                      },
                    }
                  : null
          })(n)
        }
        static maxLength(n) {
          return (function Ew(e) {
            return (n) =>
              vw(n.value) && n.value.length > e
                ? {
                    maxlength: {
                      requiredLength: e,
                      actualLength: n.value.length,
                    },
                  }
                : null
          })(n)
        }
        static pattern(n) {
          return (function Mw(e) {
            if (!e) return Ou
            let n, t
            return (
              'string' == typeof e
                ? ((t = ''),
                  '^' !== e.charAt(0) && (t += '^'),
                  (t += e),
                  '$' !== e.charAt(e.length - 1) && (t += '$'),
                  (n = new RegExp(t)))
                : ((t = e.toString()), (n = e)),
              (r) => {
                if (Xn(r.value)) return null
                const o = r.value
                return n.test(o)
                  ? null
                  : { pattern: { requiredPattern: t, actualValue: o } }
              }
            )
          })(n)
        }
        static nullValidator(n) {
          return null
        }
        static compose(n) {
          return Ow(n)
        }
        static composeAsync(n) {
          return Rw(n)
        }
      }
      function Dw(e) {
        return Xn(e.value) ? { required: !0 } : null
      }
      function Ou(e) {
        return null
      }
      function Iw(e) {
        return null != e
      }
      function Sw(e) {
        return Ui(e) ? Ie(e) : e
      }
      function Tw(e) {
        let n = {}
        return (
          e.forEach((t) => {
            n = null != t ? { ...n, ...t } : n
          }),
          0 === Object.keys(n).length ? null : n
        )
      }
      function Aw(e, n) {
        return n.map((t) => t(e))
      }
      function Nw(e) {
        return e.map((n) =>
          (function xk(e) {
            return !e.validate
          })(n)
            ? n
            : (t) => n.validate(t)
        )
      }
      function Ow(e) {
        if (!e) return null
        const n = e.filter(Iw)
        return 0 == n.length
          ? null
          : function (t) {
              return Tw(Aw(t, n))
            }
      }
      function nh(e) {
        return null != e ? Ow(Nw(e)) : null
      }
      function Rw(e) {
        if (!e) return null
        const n = e.filter(Iw)
        return 0 == n.length
          ? null
          : function (t) {
              return pw(Aw(t, n).map(Sw)).pipe(W(Tw))
            }
      }
      function rh(e) {
        return null != e ? Rw(Nw(e)) : null
      }
      function xw(e, n) {
        return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n]
      }
      function Pw(e) {
        return e._rawValidators
      }
      function Fw(e) {
        return e._rawAsyncValidators
      }
      function oh(e) {
        return e ? (Array.isArray(e) ? e : [e]) : []
      }
      function Ru(e, n) {
        return Array.isArray(e) ? e.includes(n) : e === n
      }
      function kw(e, n) {
        const t = oh(n)
        return (
          oh(e).forEach((o) => {
            Ru(t, o) || t.push(o)
          }),
          t
        )
      }
      function Lw(e, n) {
        return oh(n).filter((t) => !Ru(e, t))
      }
      class Vw {
        constructor() {
          ;(this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = [])
        }
        get value() {
          return this.control ? this.control.value : null
        }
        get valid() {
          return this.control ? this.control.valid : null
        }
        get invalid() {
          return this.control ? this.control.invalid : null
        }
        get pending() {
          return this.control ? this.control.pending : null
        }
        get disabled() {
          return this.control ? this.control.disabled : null
        }
        get enabled() {
          return this.control ? this.control.enabled : null
        }
        get errors() {
          return this.control ? this.control.errors : null
        }
        get pristine() {
          return this.control ? this.control.pristine : null
        }
        get dirty() {
          return this.control ? this.control.dirty : null
        }
        get touched() {
          return this.control ? this.control.touched : null
        }
        get status() {
          return this.control ? this.control.status : null
        }
        get untouched() {
          return this.control ? this.control.untouched : null
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null
        }
        get path() {
          return null
        }
        _setValidators(n) {
          ;(this._rawValidators = n || []),
            (this._composedValidatorFn = nh(this._rawValidators))
        }
        _setAsyncValidators(n) {
          ;(this._rawAsyncValidators = n || []),
            (this._composedAsyncValidatorFn = rh(this._rawAsyncValidators))
        }
        get validator() {
          return this._composedValidatorFn || null
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null
        }
        _registerOnDestroy(n) {
          this._onDestroyCallbacks.push(n)
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((n) => n()),
            (this._onDestroyCallbacks = [])
        }
        reset(n = void 0) {
          this.control && this.control.reset(n)
        }
        hasError(n, t) {
          return !!this.control && this.control.hasError(n, t)
        }
        getError(n, t) {
          return this.control ? this.control.getError(n, t) : null
        }
      }
      class st extends Vw {
        get formDirective() {
          return null
        }
        get path() {
          return null
        }
      }
      class Kn extends Vw {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null)
        }
      }
      class jw {
        constructor(n) {
          this._cd = n
        }
        get isTouched() {
          return !!this._cd?.control?.touched
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched
        }
        get isPristine() {
          return !!this._cd?.control?.pristine
        }
        get isDirty() {
          return !!this._cd?.control?.dirty
        }
        get isValid() {
          return !!this._cd?.control?.valid
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid
        }
        get isPending() {
          return !!this._cd?.control?.pending
        }
        get isSubmitted() {
          return !!this._cd?.submitted
        }
      }
      let Ir = (() => {
          class e extends jw {
            constructor(t) {
              super(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Kn, 2))
            })
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [
                ['', 'formControlName', ''],
                ['', 'ngModel', ''],
                ['', 'formControl', ''],
              ],
              hostVars: 14,
              hostBindings: function (r, o) {
                2 & r &&
                  eu('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)(
                    'ng-pristine',
                    o.isPristine
                  )('ng-dirty', o.isDirty)('ng-valid', o.isValid)(
                    'ng-invalid',
                    o.isInvalid
                  )('ng-pending', o.isPending)
              },
              features: [ne],
            }))
          }
          return e
        })(),
        Fo = (() => {
          class e extends jw {
            constructor(t) {
              super(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(st, 10))
            })
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [
                ['', 'formGroupName', ''],
                ['', 'formArrayName', ''],
                ['', 'ngModelGroup', ''],
                ['', 'formGroup', ''],
                ['form', 3, 'ngNoForm', ''],
                ['', 'ngForm', ''],
              ],
              hostVars: 16,
              hostBindings: function (r, o) {
                2 & r &&
                  eu('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)(
                    'ng-pristine',
                    o.isPristine
                  )('ng-dirty', o.isDirty)('ng-valid', o.isValid)(
                    'ng-invalid',
                    o.isInvalid
                  )('ng-pending', o.isPending)('ng-submitted', o.isSubmitted)
              },
              features: [ne],
            }))
          }
          return e
        })()
      const ss = 'VALID',
        Pu = 'INVALID',
        ko = 'PENDING',
        as = 'DISABLED'
      function ah(e) {
        return (Fu(e) ? e.validators : e) || null
      }
      function uh(e, n) {
        return (Fu(n) ? n.asyncValidators : e) || null
      }
      function Fu(e) {
        return null != e && !Array.isArray(e) && 'object' == typeof e
      }
      function Bw(e, n, t) {
        const r = e.controls
        if (!(n ? Object.keys(r) : r).length) throw new w(1e3, '')
        if (!r[t]) throw new w(1001, '')
      }
      function Uw(e, n, t) {
        e._forEachChild((r, o) => {
          if (void 0 === t[o]) throw new w(1002, '')
        })
      }
      class ku {
        constructor(n, t) {
          ;(this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(n),
            this._assignAsyncValidators(t)
        }
        get validator() {
          return this._composedValidatorFn
        }
        set validator(n) {
          this._rawValidators = this._composedValidatorFn = n
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn
        }
        set asyncValidator(n) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = n
        }
        get parent() {
          return this._parent
        }
        get valid() {
          return this.status === ss
        }
        get invalid() {
          return this.status === Pu
        }
        get pending() {
          return this.status == ko
        }
        get disabled() {
          return this.status === as
        }
        get enabled() {
          return this.status !== as
        }
        get dirty() {
          return !this.pristine
        }
        get untouched() {
          return !this.touched
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
              ? this.parent.updateOn
              : 'change'
        }
        setValidators(n) {
          this._assignValidators(n)
        }
        setAsyncValidators(n) {
          this._assignAsyncValidators(n)
        }
        addValidators(n) {
          this.setValidators(kw(n, this._rawValidators))
        }
        addAsyncValidators(n) {
          this.setAsyncValidators(kw(n, this._rawAsyncValidators))
        }
        removeValidators(n) {
          this.setValidators(Lw(n, this._rawValidators))
        }
        removeAsyncValidators(n) {
          this.setAsyncValidators(Lw(n, this._rawAsyncValidators))
        }
        hasValidator(n) {
          return Ru(this._rawValidators, n)
        }
        hasAsyncValidator(n) {
          return Ru(this._rawAsyncValidators, n)
        }
        clearValidators() {
          this.validator = null
        }
        clearAsyncValidators() {
          this.asyncValidator = null
        }
        markAsTouched(n = {}) {
          ;(this.touched = !0),
            this._parent && !n.onlySelf && this._parent.markAsTouched(n)
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((n) => n.markAllAsTouched())
        }
        markAsUntouched(n = {}) {
          ;(this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 })
            }),
            this._parent && !n.onlySelf && this._parent._updateTouched(n)
        }
        markAsDirty(n = {}) {
          ;(this.pristine = !1),
            this._parent && !n.onlySelf && this._parent.markAsDirty(n)
        }
        markAsPristine(n = {}) {
          ;(this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 })
            }),
            this._parent && !n.onlySelf && this._parent._updatePristine(n)
        }
        markAsPending(n = {}) {
          ;(this.status = ko),
            !1 !== n.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !n.onlySelf && this._parent.markAsPending(n)
        }
        disable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf)
          ;(this.status = as),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...n, onlySelf: !0 })
            }),
            this._updateValue(),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...n, skipPristineCheck: t }),
            this._onDisabledChange.forEach((r) => r(!0))
        }
        enable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf)
          ;(this.status = ss),
            this._forEachChild((r) => {
              r.enable({ ...n, onlySelf: !0 })
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            }),
            this._updateAncestors({ ...n, skipPristineCheck: t }),
            this._onDisabledChange.forEach((r) => r(!1))
        }
        _updateAncestors(n) {
          this._parent &&
            !n.onlySelf &&
            (this._parent.updateValueAndValidity(n),
            n.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched())
        }
        setParent(n) {
          this._parent = n
        }
        getRawValue() {
          return this.value
        }
        updateValueAndValidity(n = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === ss || this.status === ko) &&
                this._runAsyncValidator(n.emitEvent)),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !n.onlySelf &&
              this._parent.updateValueAndValidity(n)
        }
        _updateTreeValidity(n = { emitEvent: !0 }) {
          this._forEachChild((t) => t._updateTreeValidity(n)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            })
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? as : ss
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null
        }
        _runAsyncValidator(n) {
          if (this.asyncValidator) {
            ;(this.status = ko), (this._hasOwnPendingAsyncValidator = !0)
            const t = Sw(this.asyncValidator(this))
            this._asyncValidationSubscription = t.subscribe((r) => {
              ;(this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: n })
            })
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1))
        }
        setErrors(n, t = {}) {
          ;(this.errors = n), this._updateControlsErrors(!1 !== t.emitEvent)
        }
        get(n) {
          let t = n
          return null == t ||
            (Array.isArray(t) || (t = t.split('.')), 0 === t.length)
            ? null
            : t.reduce((r, o) => r && r._find(o), this)
        }
        getError(n, t) {
          const r = t ? this.get(t) : this
          return r && r.errors ? r.errors[n] : null
        }
        hasError(n, t) {
          return !!this.getError(n, t)
        }
        get root() {
          let n = this
          for (; n._parent; ) n = n._parent
          return n
        }
        _updateControlsErrors(n) {
          ;(this.status = this._calculateStatus()),
            n && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(n)
        }
        _initObservables() {
          ;(this.valueChanges = new ie()), (this.statusChanges = new ie())
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? as
            : this.errors
              ? Pu
              : this._hasOwnPendingAsyncValidator ||
                  this._anyControlsHaveStatus(ko)
                ? ko
                : this._anyControlsHaveStatus(Pu)
                  ? Pu
                  : ss
        }
        _anyControlsHaveStatus(n) {
          return this._anyControls((t) => t.status === n)
        }
        _anyControlsDirty() {
          return this._anyControls((n) => n.dirty)
        }
        _anyControlsTouched() {
          return this._anyControls((n) => n.touched)
        }
        _updatePristine(n = {}) {
          ;(this.pristine = !this._anyControlsDirty()),
            this._parent && !n.onlySelf && this._parent._updatePristine(n)
        }
        _updateTouched(n = {}) {
          ;(this.touched = this._anyControlsTouched()),
            this._parent && !n.onlySelf && this._parent._updateTouched(n)
        }
        _registerOnCollectionChange(n) {
          this._onCollectionChange = n
        }
        _setUpdateStrategy(n) {
          Fu(n) && null != n.updateOn && (this._updateOn = n.updateOn)
        }
        _parentMarkedDirty(n) {
          return (
            !n &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          )
        }
        _find(n) {
          return null
        }
        _assignValidators(n) {
          ;(this._rawValidators = Array.isArray(n) ? n.slice() : n),
            (this._composedValidatorFn = (function Lk(e) {
              return Array.isArray(e) ? nh(e) : e || null
            })(this._rawValidators))
        }
        _assignAsyncValidators(n) {
          ;(this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n),
            (this._composedAsyncValidatorFn = (function Vk(e) {
              return Array.isArray(e) ? rh(e) : e || null
            })(this._rawAsyncValidators))
        }
      }
      class Lo extends ku {
        constructor(n, t, r) {
          super(ah(t), uh(r, t)),
            (this.controls = n),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            })
        }
        registerControl(n, t) {
          return this.controls[n]
            ? this.controls[n]
            : ((this.controls[n] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t)
        }
        addControl(n, t, r = {}) {
          this.registerControl(n, t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange()
        }
        removeControl(n, t = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            delete this.controls[n],
            this.updateValueAndValidity({ emitEvent: t.emitEvent }),
            this._onCollectionChange()
        }
        setControl(n, t, r = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            delete this.controls[n],
            t && this.registerControl(n, t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange()
        }
        contains(n) {
          return this.controls.hasOwnProperty(n) && this.controls[n].enabled
        }
        setValue(n, t = {}) {
          Uw(this, 0, n),
            Object.keys(n).forEach((r) => {
              Bw(this, !0, r),
                this.controls[r].setValue(n[r], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                })
            }),
            this.updateValueAndValidity(t)
        }
        patchValue(n, t = {}) {
          null != n &&
            (Object.keys(n).forEach((r) => {
              const o = this.controls[r]
              o && o.patchValue(n[r], { onlySelf: !0, emitEvent: t.emitEvent })
            }),
            this.updateValueAndValidity(t))
        }
        reset(n = {}, t = {}) {
          this._forEachChild((r, o) => {
            r.reset(n ? n[o] : null, { onlySelf: !0, emitEvent: t.emitEvent })
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t)
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (n, t, r) => ((n[r] = t.getRawValue()), n)
          )
        }
        _syncPendingControls() {
          let n = this._reduceChildren(
            !1,
            (t, r) => !!r._syncPendingControls() || t
          )
          return n && this.updateValueAndValidity({ onlySelf: !0 }), n
        }
        _forEachChild(n) {
          Object.keys(this.controls).forEach((t) => {
            const r = this.controls[t]
            r && n(r, t)
          })
        }
        _setUpControls() {
          this._forEachChild((n) => {
            n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange)
          })
        }
        _updateValue() {
          this.value = this._reduceValue()
        }
        _anyControls(n) {
          for (const [t, r] of Object.entries(this.controls))
            if (this.contains(t) && n(r)) return !0
          return !1
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, r, o) => ((r.enabled || this.disabled) && (t[o] = r.value), t)
          )
        }
        _reduceChildren(n, t) {
          let r = n
          return (
            this._forEachChild((o, i) => {
              r = t(r, o, i)
            }),
            r
          )
        }
        _allControlsDisabled() {
          for (const n of Object.keys(this.controls))
            if (this.controls[n].enabled) return !1
          return Object.keys(this.controls).length > 0 || this.disabled
        }
        _find(n) {
          return this.controls.hasOwnProperty(n) ? this.controls[n] : null
        }
      }
      class Hw extends Lo {}
      const Sr = new S('CallSetDisabledState', {
          providedIn: 'root',
          factory: () => us,
        }),
        us = 'always'
      function Lu(e, n) {
        return [...n.path, e]
      }
      function ls(e, n, t = us) {
        lh(e, n),
          n.valueAccessor.writeValue(e.value),
          (e.disabled || 'always' === t) &&
            n.valueAccessor.setDisabledState?.(e.disabled),
          (function $k(e, n) {
            n.valueAccessor.registerOnChange((t) => {
              ;(e._pendingValue = t),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                'change' === e.updateOn && Gw(e, n)
            })
          })(e, n),
          (function Uk(e, n) {
            const t = (r, o) => {
              n.valueAccessor.writeValue(r), o && n.viewToModelUpdate(r)
            }
            e.registerOnChange(t),
              n._registerOnDestroy(() => {
                e._unregisterOnChange(t)
              })
          })(e, n),
          (function Bk(e, n) {
            n.valueAccessor.registerOnTouched(() => {
              ;(e._pendingTouched = !0),
                'blur' === e.updateOn && e._pendingChange && Gw(e, n),
                'submit' !== e.updateOn && e.markAsTouched()
            })
          })(e, n),
          (function jk(e, n) {
            if (n.valueAccessor.setDisabledState) {
              const t = (r) => {
                n.valueAccessor.setDisabledState(r)
              }
              e.registerOnDisabledChange(t),
                n._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(t)
                })
            }
          })(e, n)
      }
      function Vu(e, n, t = !0) {
        const r = () => {}
        n.valueAccessor &&
          (n.valueAccessor.registerOnChange(r),
          n.valueAccessor.registerOnTouched(r)),
          $u(e, n),
          e &&
            (n._invokeOnDestroyCallbacks(),
            e._registerOnCollectionChange(() => {}))
      }
      function ju(e, n) {
        e.forEach((t) => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(n)
        })
      }
      function lh(e, n) {
        const t = Pw(e)
        null !== n.validator
          ? e.setValidators(xw(t, n.validator))
          : 'function' == typeof t && e.setValidators([t])
        const r = Fw(e)
        null !== n.asyncValidator
          ? e.setAsyncValidators(xw(r, n.asyncValidator))
          : 'function' == typeof r && e.setAsyncValidators([r])
        const o = () => e.updateValueAndValidity()
        ju(n._rawValidators, o), ju(n._rawAsyncValidators, o)
      }
      function $u(e, n) {
        let t = !1
        if (null !== e) {
          if (null !== n.validator) {
            const o = Pw(e)
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter((s) => s !== n.validator)
              i.length !== o.length && ((t = !0), e.setValidators(i))
            }
          }
          if (null !== n.asyncValidator) {
            const o = Fw(e)
            if (Array.isArray(o) && o.length > 0) {
              const i = o.filter((s) => s !== n.asyncValidator)
              i.length !== o.length && ((t = !0), e.setAsyncValidators(i))
            }
          }
        }
        const r = () => {}
        return ju(n._rawValidators, r), ju(n._rawAsyncValidators, r), t
      }
      function Gw(e, n) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          n.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1)
      }
      function zw(e, n) {
        lh(e, n)
      }
      function dh(e, n) {
        if (!e.hasOwnProperty('model')) return !1
        const t = e.model
        return !!t.isFirstChange() || !Object.is(n, t.currentValue)
      }
      function qw(e, n) {
        e._syncPendingControls(),
          n.forEach((t) => {
            const r = t.control
            'submit' === r.updateOn &&
              r._pendingChange &&
              (t.viewToModelUpdate(r._pendingValue), (r._pendingChange = !1))
          })
      }
      function fh(e, n) {
        if (!n) return null
        let t, r, o
        return (
          Array.isArray(n),
          n.forEach((i) => {
            i.constructor === Qn
              ? (t = i)
              : (function zk(e) {
                    return Object.getPrototypeOf(e.constructor) === Mr
                  })(i)
                ? (r = i)
                : (o = i)
          }),
          o || r || t || null
        )
      }
      const Wk = { provide: st, useExisting: ae(() => Bu) },
        cs = (() => Promise.resolve())()
      let Bu = (() => {
        class e extends st {
          constructor(t, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new ie()),
              (this.form = new Lo({}, nh(t), rh(r)))
          }
          ngAfterViewInit() {
            this._setUpdateStrategy()
          }
          get formDirective() {
            return this
          }
          get control() {
            return this.form
          }
          get path() {
            return []
          }
          get controls() {
            return this.form.controls
          }
          addControl(t) {
            cs.then(() => {
              const r = this._findContainer(t.path)
              ;(t.control = r.registerControl(t.name, t.control)),
                ls(t.control, t, this.callSetDisabledState),
                t.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(t)
            })
          }
          getControl(t) {
            return this.form.get(t.path)
          }
          removeControl(t) {
            cs.then(() => {
              const r = this._findContainer(t.path)
              r && r.removeControl(t.name), this._directives.delete(t)
            })
          }
          addFormGroup(t) {
            cs.then(() => {
              const r = this._findContainer(t.path),
                o = new Lo({})
              zw(o, t),
                r.registerControl(t.name, o),
                o.updateValueAndValidity({ emitEvent: !1 })
            })
          }
          removeFormGroup(t) {
            cs.then(() => {
              const r = this._findContainer(t.path)
              r && r.removeControl(t.name)
            })
          }
          getFormGroup(t) {
            return this.form.get(t.path)
          }
          updateModel(t, r) {
            cs.then(() => {
              this.form.get(t.path).setValue(r)
            })
          }
          setValue(t) {
            this.control.setValue(t)
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              qw(this.form, this._directives),
              this.ngSubmit.emit(t),
              'dialog' === t?.target?.method
            )
          }
          onReset() {
            this.resetForm()
          }
          resetForm(t = void 0) {
            this.form.reset(t), (this.submitted = !1)
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn)
          }
          _findContainer(t) {
            return t.pop(), t.length ? this.form.get(t) : this.form
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(Ze, 10), v(Jn, 10), v(Sr, 8))
          })
          static #t = (this.ɵdir = L({
            type: e,
            selectors: [
              ['form', 3, 'ngNoForm', '', 3, 'formGroup', ''],
              ['ng-form'],
              ['', 'ngForm', ''],
            ],
            hostBindings: function (r, o) {
              1 & r &&
                X('submit', function (s) {
                  return o.onSubmit(s)
                })('reset', function () {
                  return o.onReset()
                })
            },
            inputs: { options: ['ngFormOptions', 'options'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [ge([Wk]), ne],
          }))
        }
        return e
      })()
      function Ww(e, n) {
        const t = e.indexOf(n)
        t > -1 && e.splice(t, 1)
      }
      function Zw(e) {
        return (
          'object' == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          'value' in e &&
          'disabled' in e
        )
      }
      const ds = class extends ku {
          constructor(n = null, t, r) {
            super(ah(t), uh(r, t)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(n),
              this._setUpdateStrategy(t),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              Fu(t) &&
                (t.nonNullable || t.initialValueIsDefault) &&
                (this.defaultValue = Zw(n) ? n.value : n)
          }
          setValue(n, t = {}) {
            ;(this.value = this._pendingValue = n),
              this._onChange.length &&
                !1 !== t.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== t.emitViewToModelChange)
                ),
              this.updateValueAndValidity(t)
          }
          patchValue(n, t = {}) {
            this.setValue(n, t)
          }
          reset(n = this.defaultValue, t = {}) {
            this._applyFormState(n),
              this.markAsPristine(t),
              this.markAsUntouched(t),
              this.setValue(this.value, t),
              (this._pendingChange = !1)
          }
          _updateValue() {}
          _anyControls(n) {
            return !1
          }
          _allControlsDisabled() {
            return this.disabled
          }
          registerOnChange(n) {
            this._onChange.push(n)
          }
          _unregisterOnChange(n) {
            Ww(this._onChange, n)
          }
          registerOnDisabledChange(n) {
            this._onDisabledChange.push(n)
          }
          _unregisterOnDisabledChange(n) {
            Ww(this._onDisabledChange, n)
          }
          _forEachChild(n) {}
          _syncPendingControls() {
            return !(
              'submit' !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            )
          }
          _applyFormState(n) {
            Zw(n)
              ? ((this.value = this._pendingValue = n.value),
                n.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = n)
          }
        },
        Qk = { provide: Kn, useExisting: ae(() => Uu) },
        Xw = (() => Promise.resolve())()
      let Uu = (() => {
          class e extends Kn {
            constructor(t, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new ds()),
                (this._registered = !1),
                (this.name = ''),
                (this.update = new ie()),
                (this._parent = t),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = fh(0, i))
            }
            ngOnChanges(t) {
              if ((this._checkForErrors(), !this._registered || 'name' in t)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = t.name.previousValue
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  })
                }
                this._setUpControl()
              }
              'isDisabled' in t && this._updateDisabled(t),
                dh(t, this.viewModel) &&
                  (this._updateValue(this.model), (this.viewModel = this.model))
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this)
            }
            get path() {
              return this._getPath(this.name)
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null
            }
            viewToModelUpdate(t) {
              ;(this.viewModel = t), this.update.emit(t)
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0)
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn)
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              )
            }
            _setUpStandalone() {
              ls(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 })
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(), this._checkName()
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone()
            }
            _updateValue(t) {
              Xw.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck()
              })
            }
            _updateDisabled(t) {
              const r = t.isDisabled.currentValue,
                o = 0 !== r && xo(r)
              Xw.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck()
              })
            }
            _getPath(t) {
              return this._parent ? Lu(t, this._parent) : [t]
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(
                v(st, 9),
                v(Ze, 10),
                v(Jn, 10),
                v(an, 10),
                v(Ki, 8),
                v(Sr, 8)
              )
            })
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [
                [
                  '',
                  'ngModel',
                  '',
                  3,
                  'formControlName',
                  '',
                  3,
                  'formControl',
                  '',
                ],
              ],
              inputs: {
                name: 'name',
                isDisabled: ['disabled', 'isDisabled'],
                model: ['ngModel', 'model'],
                options: ['ngModelOptions', 'options'],
              },
              outputs: { update: 'ngModelChange' },
              exportAs: ['ngModel'],
              features: [ge([Qk]), ne, Ot],
            }))
          }
          return e
        })(),
        Vo = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [
                ['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', ''],
              ],
              hostAttrs: ['novalidate', ''],
            }))
          }
          return e
        })(),
        Kw = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({}))
          }
          return e
        })()
      const hh = new S('NgModelWithFormControlWarning'),
        nL = { provide: st, useExisting: ae(() => Tr) }
      let Tr = (() => {
        class e extends st {
          constructor(t, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new ie()),
              this._setValidators(t),
              this._setAsyncValidators(r)
          }
          ngOnChanges(t) {
            this._checkFormPresent(),
              t.hasOwnProperty('form') &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form))
          }
          ngOnDestroy() {
            this.form &&
              ($u(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}))
          }
          get formDirective() {
            return this
          }
          get control() {
            return this.form
          }
          get path() {
            return []
          }
          addControl(t) {
            const r = this.form.get(t.path)
            return (
              ls(r, t, this.callSetDisabledState),
              r.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(t),
              r
            )
          }
          getControl(t) {
            return this.form.get(t.path)
          }
          removeControl(t) {
            Vu(t.control || null, t, !1),
              (function qk(e, n) {
                const t = e.indexOf(n)
                t > -1 && e.splice(t, 1)
              })(this.directives, t)
          }
          addFormGroup(t) {
            this._setUpFormContainer(t)
          }
          removeFormGroup(t) {
            this._cleanUpFormContainer(t)
          }
          getFormGroup(t) {
            return this.form.get(t.path)
          }
          addFormArray(t) {
            this._setUpFormContainer(t)
          }
          removeFormArray(t) {
            this._cleanUpFormContainer(t)
          }
          getFormArray(t) {
            return this.form.get(t.path)
          }
          updateModel(t, r) {
            this.form.get(t.path).setValue(r)
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              qw(this.form, this.directives),
              this.ngSubmit.emit(t),
              'dialog' === t?.target?.method
            )
          }
          onReset() {
            this.resetForm()
          }
          resetForm(t = void 0) {
            this.form.reset(t), (this.submitted = !1)
          }
          _updateDomValue() {
            this.directives.forEach((t) => {
              const r = t.control,
                o = this.form.get(t.path)
              r !== o &&
                (Vu(r || null, t),
                ((e) => e instanceof ds)(o) &&
                  (ls(o, t, this.callSetDisabledState), (t.control = o)))
            }),
              this.form._updateTreeValidity({ emitEvent: !1 })
          }
          _setUpFormContainer(t) {
            const r = this.form.get(t.path)
            zw(r, t), r.updateValueAndValidity({ emitEvent: !1 })
          }
          _cleanUpFormContainer(t) {
            if (this.form) {
              const r = this.form.get(t.path)
              r &&
                (function Hk(e, n) {
                  return $u(e, n)
                })(r, t) &&
                r.updateValueAndValidity({ emitEvent: !1 })
            }
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {})
          }
          _updateValidators() {
            lh(this.form, this), this._oldForm && $u(this._oldForm, this)
          }
          _checkFormPresent() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(Ze, 10), v(Jn, 10), v(Sr, 8))
          })
          static #t = (this.ɵdir = L({
            type: e,
            selectors: [['', 'formGroup', '']],
            hostBindings: function (r, o) {
              1 & r &&
                X('submit', function (s) {
                  return o.onSubmit(s)
                })('reset', function () {
                  return o.onReset()
                })
            },
            inputs: { form: ['formGroup', 'form'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [ge([nL]), ne, Ot],
          }))
        }
        return e
      })()
      const iL = { provide: Kn, useExisting: ae(() => jo) }
      let jo = (() => {
        class e extends Kn {
          set isDisabled(t) {}
          static #e = (this._ngModelWarningSentOnce = !1)
          constructor(t, r, o, i, s) {
            super(),
              (this._ngModelWarningConfig = s),
              (this._added = !1),
              (this.name = null),
              (this.update = new ie()),
              (this._ngModelWarningSent = !1),
              (this._parent = t),
              this._setValidators(r),
              this._setAsyncValidators(o),
              (this.valueAccessor = fh(0, i))
          }
          ngOnChanges(t) {
            this._added || this._setUpControl(),
              dh(t, this.viewModel) &&
                ((this.viewModel = this.model),
                this.formDirective.updateModel(this, this.model))
          }
          ngOnDestroy() {
            this.formDirective && this.formDirective.removeControl(this)
          }
          viewToModelUpdate(t) {
            ;(this.viewModel = t), this.update.emit(t)
          }
          get path() {
            return Lu(
              null == this.name ? this.name : this.name.toString(),
              this._parent
            )
          }
          get formDirective() {
            return this._parent ? this._parent.formDirective : null
          }
          _checkParentType() {}
          _setUpControl() {
            this._checkParentType(),
              (this.control = this.formDirective.addControl(this)),
              (this._added = !0)
          }
          static #t = (this.ɵfac = function (r) {
            return new (r || e)(
              v(st, 13),
              v(Ze, 10),
              v(Jn, 10),
              v(an, 10),
              v(hh, 8)
            )
          })
          static #n = (this.ɵdir = L({
            type: e,
            selectors: [['', 'formControlName', '']],
            inputs: {
              name: ['formControlName', 'name'],
              isDisabled: ['disabled', 'isDisabled'],
              model: ['ngModel', 'model'],
            },
            outputs: { update: 'ngModelChange' },
            features: [ge([iL]), ne, Ot],
          }))
        }
        return e
      })()
      const sL = { provide: an, useExisting: ae(() => fs), multi: !0 }
      function ob(e, n) {
        return null == e
          ? `${n}`
          : (n && 'object' == typeof n && (n = 'Object'),
            `${e}: ${n}`.slice(0, 50))
      }
      let fs = (() => {
          class e extends Mr {
            constructor() {
              super(...arguments),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this._compareWith = Object.is)
            }
            set compareWith(t) {
              this._compareWith = t
            }
            writeValue(t) {
              this.value = t
              const o = ob(this._getOptionId(t), t)
              this.setProperty('value', o)
            }
            registerOnChange(t) {
              this.onChange = (r) => {
                ;(this.value = this._getOptionValue(r)), t(this.value)
              }
            }
            _registerOption() {
              return (this._idCounter++).toString()
            }
            _getOptionId(t) {
              for (const r of this._optionMap.keys())
                if (this._compareWith(this._optionMap.get(r), t)) return r
              return null
            }
            _getOptionValue(t) {
              const r = (function aL(e) {
                return e.split(':')[0]
              })(t)
              return this._optionMap.has(r) ? this._optionMap.get(r) : t
            }
            static #e = (this.ɵfac = (function () {
              let t
              return function (o) {
                return (t || (t = be(e)))(o || e)
              }
            })())
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [
                ['select', 'formControlName', '', 3, 'multiple', ''],
                ['select', 'formControl', '', 3, 'multiple', ''],
                ['select', 'ngModel', '', 3, 'multiple', ''],
              ],
              hostBindings: function (r, o) {
                1 & r &&
                  X('change', function (s) {
                    return o.onChange(s.target.value)
                  })('blur', function () {
                    return o.onTouched()
                  })
              },
              inputs: { compareWith: 'compareWith' },
              features: [ge([sL]), ne],
            }))
          }
          return e
        })(),
        mh = (() => {
          class e {
            constructor(t, r, o) {
              ;(this._element = t),
                (this._renderer = r),
                (this._select = o),
                this._select && (this.id = this._select._registerOption())
            }
            set ngValue(t) {
              null != this._select &&
                (this._select._optionMap.set(this.id, t),
                this._setElementValue(ob(this.id, t)),
                this._select.writeValue(this._select.value))
            }
            set value(t) {
              this._setElementValue(t),
                this._select && this._select.writeValue(this._select.value)
            }
            _setElementValue(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                'value',
                t
              )
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value))
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Mt), v(_n), v(fs, 9))
            })
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [['option']],
              inputs: { ngValue: 'ngValue', value: 'value' },
            }))
          }
          return e
        })()
      const uL = { provide: an, useExisting: ae(() => vh), multi: !0 }
      function ib(e, n) {
        return null == e
          ? `${n}`
          : ('string' == typeof n && (n = `'${n}'`),
            n && 'object' == typeof n && (n = 'Object'),
            `${e}: ${n}`.slice(0, 50))
      }
      let vh = (() => {
          class e extends Mr {
            constructor() {
              super(...arguments),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this._compareWith = Object.is)
            }
            set compareWith(t) {
              this._compareWith = t
            }
            writeValue(t) {
              let r
              if (((this.value = t), Array.isArray(t))) {
                const o = t.map((i) => this._getOptionId(i))
                r = (i, s) => {
                  i._setSelected(o.indexOf(s.toString()) > -1)
                }
              } else
                r = (o, i) => {
                  o._setSelected(!1)
                }
              this._optionMap.forEach(r)
            }
            registerOnChange(t) {
              this.onChange = (r) => {
                const o = [],
                  i = r.selectedOptions
                if (void 0 !== i) {
                  const s = i
                  for (let a = 0; a < s.length; a++) {
                    const l = this._getOptionValue(s[a].value)
                    o.push(l)
                  }
                } else {
                  const s = r.options
                  for (let a = 0; a < s.length; a++) {
                    const u = s[a]
                    if (u.selected) {
                      const l = this._getOptionValue(u.value)
                      o.push(l)
                    }
                  }
                }
                ;(this.value = o), t(o)
              }
            }
            _registerOption(t) {
              const r = (this._idCounter++).toString()
              return this._optionMap.set(r, t), r
            }
            _getOptionId(t) {
              for (const r of this._optionMap.keys())
                if (this._compareWith(this._optionMap.get(r)._value, t))
                  return r
              return null
            }
            _getOptionValue(t) {
              const r = (function lL(e) {
                return e.split(':')[0]
              })(t)
              return this._optionMap.has(r) ? this._optionMap.get(r)._value : t
            }
            static #e = (this.ɵfac = (function () {
              let t
              return function (o) {
                return (t || (t = be(e)))(o || e)
              }
            })())
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [
                ['select', 'multiple', '', 'formControlName', ''],
                ['select', 'multiple', '', 'formControl', ''],
                ['select', 'multiple', '', 'ngModel', ''],
              ],
              hostBindings: function (r, o) {
                1 & r &&
                  X('change', function (s) {
                    return o.onChange(s.target)
                  })('blur', function () {
                    return o.onTouched()
                  })
              },
              inputs: { compareWith: 'compareWith' },
              features: [ge([uL]), ne],
            }))
          }
          return e
        })(),
        yh = (() => {
          class e {
            constructor(t, r, o) {
              ;(this._element = t),
                (this._renderer = r),
                (this._select = o),
                this._select && (this.id = this._select._registerOption(this))
            }
            set ngValue(t) {
              null != this._select &&
                ((this._value = t),
                this._setElementValue(ib(this.id, t)),
                this._select.writeValue(this._select.value))
            }
            set value(t) {
              this._select
                ? ((this._value = t),
                  this._setElementValue(ib(this.id, t)),
                  this._select.writeValue(this._select.value))
                : this._setElementValue(t)
            }
            _setElementValue(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                'value',
                t
              )
            }
            _setSelected(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                'selected',
                t
              )
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value))
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Mt), v(_n), v(vh, 9))
            })
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [['option']],
              inputs: { ngValue: 'ngValue', value: 'value' },
            }))
          }
          return e
        })(),
        Ar = (() => {
          class e {
            constructor() {
              this._validator = Ou
            }
            ngOnChanges(t) {
              if (this.inputName in t) {
                const r = this.normalizeInput(t[this.inputName].currentValue)
                ;(this._enabled = this.enabled(r)),
                  (this._validator = this._enabled
                    ? this.createValidator(r)
                    : Ou),
                  this._onChange && this._onChange()
              }
            }
            validate(t) {
              return this._validator(t)
            }
            registerOnValidatorChange(t) {
              this._onChange = t
            }
            enabled(t) {
              return null != t
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵdir = L({ type: e, features: [Ot] }))
          }
          return e
        })()
      const fL = { provide: Ze, useExisting: ae(() => Hu), multi: !0 }
      let Hu = (() => {
          class e extends Ar {
            constructor() {
              super(...arguments),
                (this.inputName = 'required'),
                (this.normalizeInput = xo),
                (this.createValidator = (t) => Dw)
            }
            enabled(t) {
              return t
            }
            static #e = (this.ɵfac = (function () {
              let t
              return function (o) {
                return (t || (t = be(e)))(o || e)
              }
            })())
            static #t = (this.ɵdir = L({
              type: e,
              selectors: [
                [
                  '',
                  'required',
                  '',
                  'formControlName',
                  '',
                  3,
                  'type',
                  'checkbox',
                ],
                ['', 'required', '', 'formControl', '', 3, 'type', 'checkbox'],
                ['', 'required', '', 'ngModel', '', 3, 'type', 'checkbox'],
              ],
              hostVars: 1,
              hostBindings: function (r, o) {
                2 & r && rn('required', o._enabled ? '' : null)
              },
              inputs: { required: 'required' },
              features: [ge([fL]), ne],
            }))
          }
          return e
        })(),
        gb = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({ imports: [Kw] }))
          }
          return e
        })()
      class mb extends ku {
        constructor(n, t, r) {
          super(ah(t), uh(r, t)),
            (this.controls = n),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            })
        }
        at(n) {
          return this.controls[this._adjustIndex(n)]
        }
        push(n, t = {}) {
          this.controls.push(n),
            this._registerControl(n),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }),
            this._onCollectionChange()
        }
        insert(n, t, r = {}) {
          this.controls.splice(n, 0, t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent })
        }
        removeAt(n, t = {}) {
          let r = this._adjustIndex(n)
          r < 0 && (r = 0),
            this.controls[r] &&
              this.controls[r]._registerOnCollectionChange(() => {}),
            this.controls.splice(r, 1),
            this.updateValueAndValidity({ emitEvent: t.emitEvent })
        }
        setControl(n, t, r = {}) {
          let o = this._adjustIndex(n)
          o < 0 && (o = 0),
            this.controls[o] &&
              this.controls[o]._registerOnCollectionChange(() => {}),
            this.controls.splice(o, 1),
            t && (this.controls.splice(o, 0, t), this._registerControl(t)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange()
        }
        get length() {
          return this.controls.length
        }
        setValue(n, t = {}) {
          Uw(this, 0, n),
            n.forEach((r, o) => {
              Bw(this, !1, o),
                this.at(o).setValue(r, { onlySelf: !0, emitEvent: t.emitEvent })
            }),
            this.updateValueAndValidity(t)
        }
        patchValue(n, t = {}) {
          null != n &&
            (n.forEach((r, o) => {
              this.at(o) &&
                this.at(o).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                })
            }),
            this.updateValueAndValidity(t))
        }
        reset(n = [], t = {}) {
          this._forEachChild((r, o) => {
            r.reset(n[o], { onlySelf: !0, emitEvent: t.emitEvent })
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t)
        }
        getRawValue() {
          return this.controls.map((n) => n.getRawValue())
        }
        clear(n = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }))
        }
        _adjustIndex(n) {
          return n < 0 ? n + this.length : n
        }
        _syncPendingControls() {
          let n = this.controls.reduce(
            (t, r) => !!r._syncPendingControls() || t,
            !1
          )
          return n && this.updateValueAndValidity({ onlySelf: !0 }), n
        }
        _forEachChild(n) {
          this.controls.forEach((t, r) => {
            n(t, r)
          })
        }
        _updateValue() {
          this.value = this.controls
            .filter((n) => n.enabled || this.disabled)
            .map((n) => n.value)
        }
        _anyControls(n) {
          return this.controls.some((t) => t.enabled && n(t))
        }
        _setUpControls() {
          this._forEachChild((n) => this._registerControl(n))
        }
        _allControlsDisabled() {
          for (const n of this.controls) if (n.enabled) return !1
          return this.controls.length > 0 || this.disabled
        }
        _registerControl(n) {
          n.setParent(this),
            n._registerOnCollectionChange(this._onCollectionChange)
        }
        _find(n) {
          return this.at(n) ?? null
        }
      }
      function vb(e) {
        return (
          !!e &&
          (void 0 !== e.asyncValidators ||
            void 0 !== e.validators ||
            void 0 !== e.updateOn)
        )
      }
      let Gu = (() => {
          class e {
            constructor() {
              this.useNonNullable = !1
            }
            get nonNullable() {
              const t = new e()
              return (t.useNonNullable = !0), t
            }
            group(t, r = null) {
              const o = this._reduceControls(t)
              let i = {}
              return (
                vb(r)
                  ? (i = r)
                  : null !== r &&
                    ((i.validators = r.validator),
                    (i.asyncValidators = r.asyncValidator)),
                new Lo(o, i)
              )
            }
            record(t, r = null) {
              const o = this._reduceControls(t)
              return new Hw(o, r)
            }
            control(t, r, o) {
              let i = {}
              return this.useNonNullable
                ? (vb(r)
                    ? (i = r)
                    : ((i.validators = r), (i.asyncValidators = o)),
                  new ds(t, { ...i, nonNullable: !0 }))
                : new ds(t, r, o)
            }
            array(t, r, o) {
              const i = t.map((s) => this._createControl(s))
              return new mb(i, r, o)
            }
            _reduceControls(t) {
              const r = {}
              return (
                Object.keys(t).forEach((o) => {
                  r[o] = this._createControl(t[o])
                }),
                r
              )
            }
            _createControl(t) {
              return t instanceof ds || t instanceof ku
                ? t
                : Array.isArray(t)
                  ? this.control(
                      t[0],
                      t.length > 1 ? t[1] : null,
                      t.length > 2 ? t[2] : null
                    )
                  : this.control(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })(),
        zu = (() => {
          class e {
            static withConfig(t) {
              return {
                ngModule: e,
                providers: [
                  { provide: Sr, useValue: t.callSetDisabledState ?? us },
                ],
              }
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({ imports: [gb] }))
          }
          return e
        })(),
        _h = (() => {
          class e {
            static withConfig(t) {
              return {
                ngModule: e,
                providers: [
                  {
                    provide: hh,
                    useValue: t.warnOnNgModelWithFormControl ?? 'always',
                  },
                  { provide: Sr, useValue: t.callSetDisabledState ?? us },
                ],
              }
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({ imports: [gb] }))
          }
          return e
        })()
      function er(e) {
        return !!e && (e instanceof he || (oe(e.lift) && oe(e.subscribe)))
      }
      function Dh(...e) {
        const n = ti(e),
          t = Ep(e),
          { args: r, keys: o } = dw(e)
        if (0 === r.length) return Ie([], n)
        const i = new he(
          (function yL(e, n, t = kn) {
            return (r) => {
              yb(
                n,
                () => {
                  const { length: o } = e,
                    i = new Array(o)
                  let s = o,
                    a = o
                  for (let u = 0; u < o; u++)
                    yb(
                      n,
                      () => {
                        const l = Ie(e[u], n)
                        let c = !1
                        l.subscribe(
                          we(
                            r,
                            (d) => {
                              ;(i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(t(i.slice()))
                            },
                            () => {
                              --s || r.complete()
                            }
                          )
                        )
                      },
                      r
                    )
                },
                r
              )
            }
          })(r, n, o ? (s) => hw(o, s) : kn)
        )
        return t ? i.pipe(fw(t)) : i
      }
      function yb(e, n, t) {
        e ? fn(t, e, n) : n()
      }
      const qu = Jo(
        (e) =>
          function () {
            e(this),
              (this.name = 'EmptyError'),
              (this.message = 'no elements in sequence')
          }
      )
      function hs(...e) {
        return (function _L() {
          return kr(1)
        })()(Ie(e, ti(e)))
      }
      function Wu(e) {
        return new he((n) => {
          vt(e()).subscribe(n)
        })
      }
      function ps(e, n) {
        const t = oe(e) ? e : () => e,
          r = (o) => o.error(t())
        return new he(n ? (o) => n.schedule(r, 0, o) : r)
      }
      function Ch() {
        return Me((e, n) => {
          let t = null
          e._refCount++
          const r = we(n, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (t = null)
            const o = e._connection,
              i = t
            ;(t = null),
              o && (!i || o === i) && o.unsubscribe(),
              n.unsubscribe()
          })
          e.subscribe(r), r.closed || (t = e.connect())
        })
      }
      class _b extends he {
        constructor(n, t) {
          super(),
            (this.source = n),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            lp(n) && (this.lift = n.lift)
        }
        _subscribe(n) {
          return this.getSubject().subscribe(n)
        }
        getSubject() {
          const n = this._subject
          return (
            (!n || n.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          )
        }
        _teardown() {
          this._refCount = 0
          const { _connection: n } = this
          ;(this._subject = this._connection = null), n?.unsubscribe()
        }
        connect() {
          let n = this._connection
          if (!n) {
            n = this._connection = new at()
            const t = this.getSubject()
            n.add(
              this.source.subscribe(
                we(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete()
                  },
                  (r) => {
                    this._teardown(), t.error(r)
                  },
                  () => this._teardown()
                )
              )
            ),
              n.closed && ((this._connection = null), (n = at.EMPTY))
          }
          return n
        }
        refCount() {
          return Ch()(this)
        }
      }
      function un(e) {
        return e <= 0
          ? () => Tt
          : Me((n, t) => {
              let r = 0
              n.subscribe(
                we(t, (o) => {
                  ++r <= e && (t.next(o), e <= r && t.complete())
                })
              )
            })
      }
      function An(e, n) {
        return Me((t, r) => {
          let o = 0
          t.subscribe(we(r, (i) => e.call(n, i, o++) && r.next(i)))
        })
      }
      function Zu(e) {
        return Me((n, t) => {
          let r = !1
          n.subscribe(
            we(
              t,
              (o) => {
                ;(r = !0), t.next(o)
              },
              () => {
                r || t.next(e), t.complete()
              }
            )
          )
        })
      }
      function Db(e = CL) {
        return Me((n, t) => {
          let r = !1
          n.subscribe(
            we(
              t,
              (o) => {
                ;(r = !0), t.next(o)
              },
              () => (r ? t.complete() : t.error(e()))
            )
          )
        })
      }
      function CL() {
        return new qu()
      }
      function Nr(e, n) {
        const t = arguments.length >= 2
        return (r) =>
          r.pipe(
            e ? An((o, i) => e(o, i, r)) : kn,
            un(1),
            t ? Zu(n) : Db(() => new qu())
          )
      }
      function Or(e, n) {
        return oe(n) ? ke(e, n, 1) : ke(e, 1)
      }
      function Ye(e, n, t) {
        const r = oe(e) || n || t ? { next: e, error: n, complete: t } : e
        return r
          ? Me((o, i) => {
              var s
              null === (s = r.subscribe) || void 0 === s || s.call(r)
              let a = !0
              o.subscribe(
                we(
                  i,
                  (u) => {
                    var l
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u)
                  },
                  () => {
                    var u
                    ;(a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete()
                  },
                  (u) => {
                    var l
                    ;(a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u)
                  },
                  () => {
                    var u, l
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r)
                  }
                )
              )
            })
          : kn
      }
      function Nn(e) {
        return Me((n, t) => {
          let i,
            r = null,
            o = !1
          ;(r = n.subscribe(
            we(t, void 0, void 0, (s) => {
              ;(i = vt(e(s, Nn(e)(n)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(t)) : (o = !0)
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(t))
        })
      }
      function wh(e) {
        return e <= 0
          ? () => Tt
          : Me((n, t) => {
              let r = []
              n.subscribe(
                we(
                  t,
                  (o) => {
                    r.push(o), e < r.length && r.shift()
                  },
                  () => {
                    for (const o of r) t.next(o)
                    t.complete()
                  },
                  void 0,
                  () => {
                    r = null
                  }
                )
              )
            })
      }
      function $o(e) {
        return Me((n, t) => {
          try {
            n.subscribe(t)
          } finally {
            t.add(e)
          }
        })
      }
      const U = 'primary',
        gs = Symbol('RouteTitle')
      class SL {
        constructor(n) {
          this.params = n || {}
        }
        has(n) {
          return Object.prototype.hasOwnProperty.call(this.params, n)
        }
        get(n) {
          if (this.has(n)) {
            const t = this.params[n]
            return Array.isArray(t) ? t[0] : t
          }
          return null
        }
        getAll(n) {
          if (this.has(n)) {
            const t = this.params[n]
            return Array.isArray(t) ? t : [t]
          }
          return []
        }
        get keys() {
          return Object.keys(this.params)
        }
      }
      function Bo(e) {
        return new SL(e)
      }
      function TL(e, n, t) {
        const r = t.path.split('/')
        if (
          r.length > e.length ||
          ('full' === t.pathMatch && (n.hasChildren() || r.length < e.length))
        )
          return null
        const o = {}
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i]
          if (s.startsWith(':')) o[s.substring(1)] = a
          else if (s !== a.path) return null
        }
        return { consumed: e.slice(0, r.length), posParams: o }
      }
      function ln(e, n) {
        const t = e ? Object.keys(e) : void 0,
          r = n ? Object.keys(n) : void 0
        if (!t || !r || t.length != r.length) return !1
        let o
        for (let i = 0; i < t.length; i++)
          if (((o = t[i]), !Cb(e[o], n[o]))) return !1
        return !0
      }
      function Cb(e, n) {
        if (Array.isArray(e) && Array.isArray(n)) {
          if (e.length !== n.length) return !1
          const t = [...e].sort(),
            r = [...n].sort()
          return t.every((o, i) => r[i] === o)
        }
        return e === n
      }
      function wb(e) {
        return e.length > 0 ? e[e.length - 1] : null
      }
      function tr(e) {
        return er(e) ? e : Ui(e) ? Ie(Promise.resolve(e)) : R(e)
      }
      const NL = {
          exact: function Mb(e, n, t) {
            if (
              !Rr(e.segments, n.segments) ||
              !Yu(e.segments, n.segments, t) ||
              e.numberOfChildren !== n.numberOfChildren
            )
              return !1
            for (const r in n.children)
              if (!e.children[r] || !Mb(e.children[r], n.children[r], t))
                return !1
            return !0
          },
          subset: Ib,
        },
        bb = {
          exact: function OL(e, n) {
            return ln(e, n)
          },
          subset: function RL(e, n) {
            return (
              Object.keys(n).length <= Object.keys(e).length &&
              Object.keys(n).every((t) => Cb(e[t], n[t]))
            )
          },
          ignored: () => !0,
        }
      function Eb(e, n, t) {
        return (
          NL[t.paths](e.root, n.root, t.matrixParams) &&
          bb[t.queryParams](e.queryParams, n.queryParams) &&
          !('exact' === t.fragment && e.fragment !== n.fragment)
        )
      }
      function Ib(e, n, t) {
        return Sb(e, n, n.segments, t)
      }
      function Sb(e, n, t, r) {
        if (e.segments.length > t.length) {
          const o = e.segments.slice(0, t.length)
          return !(!Rr(o, t) || n.hasChildren() || !Yu(o, t, r))
        }
        if (e.segments.length === t.length) {
          if (!Rr(e.segments, t) || !Yu(e.segments, t, r)) return !1
          for (const o in n.children)
            if (!e.children[o] || !Ib(e.children[o], n.children[o], r))
              return !1
          return !0
        }
        {
          const o = t.slice(0, e.segments.length),
            i = t.slice(e.segments.length)
          return (
            !!(Rr(e.segments, o) && Yu(e.segments, o, r) && e.children[U]) &&
            Sb(e.children[U], n, i, r)
          )
        }
      }
      function Yu(e, n, t) {
        return n.every((r, o) => bb[t](e[o].parameters, r.parameters))
      }
      class Uo {
        constructor(n = new re([], {}), t = {}, r = null) {
          ;(this.root = n), (this.queryParams = t), (this.fragment = r)
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Bo(this.queryParams)),
            this._queryParamMap
          )
        }
        toString() {
          return FL.serialize(this)
        }
      }
      class re {
        constructor(n, t) {
          ;(this.segments = n),
            (this.children = t),
            (this.parent = null),
            Object.values(t).forEach((r) => (r.parent = this))
        }
        hasChildren() {
          return this.numberOfChildren > 0
        }
        get numberOfChildren() {
          return Object.keys(this.children).length
        }
        toString() {
          return Qu(this)
        }
      }
      class ms {
        constructor(n, t) {
          ;(this.path = n), (this.parameters = t)
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Bo(this.parameters)),
            this._parameterMap
          )
        }
        toString() {
          return Nb(this)
        }
      }
      function Rr(e, n) {
        return e.length === n.length && e.every((t, r) => t.path === n[r].path)
      }
      let vs = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: function () {
              return new bh()
            },
            providedIn: 'root',
          }))
        }
        return e
      })()
      class bh {
        parse(n) {
          const t = new qL(n)
          return new Uo(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          )
        }
        serialize(n) {
          const t = `/${ys(n.root, !0)}`,
            r = (function VL(e) {
              const n = Object.keys(e)
                .map((t) => {
                  const r = e[t]
                  return Array.isArray(r)
                    ? r.map((o) => `${Xu(t)}=${Xu(o)}`).join('&')
                    : `${Xu(t)}=${Xu(r)}`
                })
                .filter((t) => !!t)
              return n.length ? `?${n.join('&')}` : ''
            })(n.queryParams)
          return `${t}${r}${
            'string' == typeof n.fragment
              ? `#${(function kL(e) {
                  return encodeURI(e)
                })(n.fragment)}`
              : ''
          }`
        }
      }
      const FL = new bh()
      function Qu(e) {
        return e.segments.map((n) => Nb(n)).join('/')
      }
      function ys(e, n) {
        if (!e.hasChildren()) return Qu(e)
        if (n) {
          const t = e.children[U] ? ys(e.children[U], !1) : '',
            r = []
          return (
            Object.entries(e.children).forEach(([o, i]) => {
              o !== U && r.push(`${o}:${ys(i, !1)}`)
            }),
            r.length > 0 ? `${t}(${r.join('//')})` : t
          )
        }
        {
          const t = (function PL(e, n) {
            let t = []
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === U && (t = t.concat(n(o, r)))
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== U && (t = t.concat(n(o, r)))
              }),
              t
            )
          })(e, (r, o) =>
            o === U ? [ys(e.children[U], !1)] : [`${o}:${ys(r, !1)}`]
          )
          return 1 === Object.keys(e.children).length && null != e.children[U]
            ? `${Qu(e)}/${t[0]}`
            : `${Qu(e)}/(${t.join('//')})`
        }
      }
      function Tb(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
      }
      function Xu(e) {
        return Tb(e).replace(/%3B/gi, ';')
      }
      function Eh(e) {
        return Tb(e)
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%26/gi, '&')
      }
      function Ju(e) {
        return decodeURIComponent(e)
      }
      function Ab(e) {
        return Ju(e.replace(/\+/g, '%20'))
      }
      function Nb(e) {
        return `${Eh(e.path)}${(function LL(e) {
          return Object.keys(e)
            .map((n) => `;${Eh(n)}=${Eh(e[n])}`)
            .join('')
        })(e.parameters)}`
      }
      const jL = /^[^\/()?;#]+/
      function Mh(e) {
        const n = e.match(jL)
        return n ? n[0] : ''
      }
      const $L = /^[^\/()?;=#]+/,
        UL = /^[^=?&#]+/,
        GL = /^[^&#]+/
      class qL {
        constructor(n) {
          ;(this.url = n), (this.remaining = n)
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining ||
            this.peekStartsWith('?') ||
            this.peekStartsWith('#')
              ? new re([], {})
              : new re([], this.parseChildren())
          )
        }
        parseQueryParams() {
          const n = {}
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(n)
            } while (this.consumeOptional('&'))
          return n
        }
        parseFragment() {
          return this.consumeOptional('#')
            ? decodeURIComponent(this.remaining)
            : null
        }
        parseChildren() {
          if ('' === this.remaining) return {}
          this.consumeOptional('/')
          const n = []
          for (
            this.peekStartsWith('(') || n.push(this.parseSegment());
            this.peekStartsWith('/') &&
            !this.peekStartsWith('//') &&
            !this.peekStartsWith('/(');

          )
            this.capture('/'), n.push(this.parseSegment())
          let t = {}
          this.peekStartsWith('/(') &&
            (this.capture('/'), (t = this.parseParens(!0)))
          let r = {}
          return (
            this.peekStartsWith('(') && (r = this.parseParens(!1)),
            (n.length > 0 || Object.keys(t).length > 0) &&
              (r[U] = new re(n, t)),
            r
          )
        }
        parseSegment() {
          const n = Mh(this.remaining)
          if ('' === n && this.peekStartsWith(';')) throw new w(4009, !1)
          return this.capture(n), new ms(Ju(n), this.parseMatrixParams())
        }
        parseMatrixParams() {
          const n = {}
          for (; this.consumeOptional(';'); ) this.parseParam(n)
          return n
        }
        parseParam(n) {
          const t = (function BL(e) {
            const n = e.match($L)
            return n ? n[0] : ''
          })(this.remaining)
          if (!t) return
          this.capture(t)
          let r = ''
          if (this.consumeOptional('=')) {
            const o = Mh(this.remaining)
            o && ((r = o), this.capture(r))
          }
          n[Ju(t)] = Ju(r)
        }
        parseQueryParam(n) {
          const t = (function HL(e) {
            const n = e.match(UL)
            return n ? n[0] : ''
          })(this.remaining)
          if (!t) return
          this.capture(t)
          let r = ''
          if (this.consumeOptional('=')) {
            const s = (function zL(e) {
              const n = e.match(GL)
              return n ? n[0] : ''
            })(this.remaining)
            s && ((r = s), this.capture(r))
          }
          const o = Ab(t),
            i = Ab(r)
          if (n.hasOwnProperty(o)) {
            let s = n[o]
            Array.isArray(s) || ((s = [s]), (n[o] = s)), s.push(i)
          } else n[o] = i
        }
        parseParens(n) {
          const t = {}
          for (
            this.capture('(');
            !this.consumeOptional(')') && this.remaining.length > 0;

          ) {
            const r = Mh(this.remaining),
              o = this.remaining[r.length]
            if ('/' !== o && ')' !== o && ';' !== o) throw new w(4010, !1)
            let i
            r.indexOf(':') > -1
              ? ((i = r.slice(0, r.indexOf(':'))),
                this.capture(i),
                this.capture(':'))
              : n && (i = U)
            const s = this.parseChildren()
            ;(t[i] = 1 === Object.keys(s).length ? s[U] : new re([], s)),
              this.consumeOptional('//')
          }
          return t
        }
        peekStartsWith(n) {
          return this.remaining.startsWith(n)
        }
        consumeOptional(n) {
          return (
            !!this.peekStartsWith(n) &&
            ((this.remaining = this.remaining.substring(n.length)), !0)
          )
        }
        capture(n) {
          if (!this.consumeOptional(n)) throw new w(4011, !1)
        }
      }
      function Ob(e) {
        return e.segments.length > 0 ? new re([], { [U]: e }) : e
      }
      function Rb(e) {
        const n = {}
        for (const r of Object.keys(e.children)) {
          const i = Rb(e.children[r])
          if (r === U && 0 === i.segments.length && i.hasChildren())
            for (const [s, a] of Object.entries(i.children)) n[s] = a
          else (i.segments.length > 0 || i.hasChildren()) && (n[r] = i)
        }
        return (function WL(e) {
          if (1 === e.numberOfChildren && e.children[U]) {
            const n = e.children[U]
            return new re(e.segments.concat(n.segments), n.children)
          }
          return e
        })(new re(e.segments, n))
      }
      function xr(e) {
        return e instanceof Uo
      }
      function xb(e) {
        let n
        const o = Ob(
          (function t(i) {
            const s = {}
            for (const u of i.children) {
              const l = t(u)
              s[u.outlet] = l
            }
            const a = new re(i.url, s)
            return i === e && (n = a), a
          })(e.root)
        )
        return n ?? o
      }
      function Pb(e, n, t, r) {
        let o = e
        for (; o.parent; ) o = o.parent
        if (0 === n.length) return Ih(o, o, o, t, r)
        const i = (function YL(e) {
          if ('string' == typeof e[0] && 1 === e.length && '/' === e[0])
            return new kb(!0, 0, e)
          let n = 0,
            t = !1
          const r = e.reduce((o, i, s) => {
            if ('object' == typeof i && null != i) {
              if (i.outlets) {
                const a = {}
                return (
                  Object.entries(i.outlets).forEach(([u, l]) => {
                    a[u] = 'string' == typeof l ? l.split('/') : l
                  }),
                  [...o, { outlets: a }]
                )
              }
              if (i.segmentPath) return [...o, i.segmentPath]
            }
            return 'string' != typeof i
              ? [...o, i]
              : 0 === s
                ? (i.split('/').forEach((a, u) => {
                    ;(0 == u && '.' === a) ||
                      (0 == u && '' === a
                        ? (t = !0)
                        : '..' === a
                          ? n++
                          : '' != a && o.push(a))
                  }),
                  o)
                : [...o, i]
          }, [])
          return new kb(t, n, r)
        })(n)
        if (i.toRoot()) return Ih(o, o, new re([], {}), t, r)
        const s = (function QL(e, n, t) {
            if (e.isAbsolute) return new el(n, !0, 0)
            if (!t) return new el(n, !1, NaN)
            if (null === t.parent) return new el(t, !0, 0)
            const r = Ku(e.commands[0]) ? 0 : 1
            return (function XL(e, n, t) {
              let r = e,
                o = n,
                i = t
              for (; i > o; ) {
                if (((i -= o), (r = r.parent), !r)) throw new w(4005, !1)
                o = r.segments.length
              }
              return new el(r, !1, o - i)
            })(t, t.segments.length - 1 + r, e.numberOfDoubleDots)
          })(i, o, e),
          a = s.processChildren
            ? Ds(s.segmentGroup, s.index, i.commands)
            : Lb(s.segmentGroup, s.index, i.commands)
        return Ih(o, s.segmentGroup, a, t, r)
      }
      function Ku(e) {
        return 'object' == typeof e && null != e && !e.outlets && !e.segmentPath
      }
      function _s(e) {
        return 'object' == typeof e && null != e && e.outlets
      }
      function Ih(e, n, t, r, o) {
        let s,
          i = {}
        r &&
          Object.entries(r).forEach(([u, l]) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`
          }),
          (s = e === n ? t : Fb(e, n, t))
        const a = Ob(Rb(s))
        return new Uo(a, i, o)
      }
      function Fb(e, n, t) {
        const r = {}
        return (
          Object.entries(e.children).forEach(([o, i]) => {
            r[o] = i === n ? t : Fb(i, n, t)
          }),
          new re(e.segments, r)
        )
      }
      class kb {
        constructor(n, t, r) {
          if (
            ((this.isAbsolute = n),
            (this.numberOfDoubleDots = t),
            (this.commands = r),
            n && r.length > 0 && Ku(r[0]))
          )
            throw new w(4003, !1)
          const o = r.find(_s)
          if (o && o !== wb(r)) throw new w(4004, !1)
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            '/' == this.commands[0]
          )
        }
      }
      class el {
        constructor(n, t, r) {
          ;(this.segmentGroup = n), (this.processChildren = t), (this.index = r)
        }
      }
      function Lb(e, n, t) {
        if (
          (e || (e = new re([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return Ds(e, n, t)
        const r = (function KL(e, n, t) {
            let r = 0,
              o = n
            const i = { match: !1, pathIndex: 0, commandIndex: 0 }
            for (; o < e.segments.length; ) {
              if (r >= t.length) return i
              const s = e.segments[o],
                a = t[r]
              if (_s(a)) break
              const u = `${a}`,
                l = r < t.length - 1 ? t[r + 1] : null
              if (o > 0 && void 0 === u) break
              if (u && l && 'object' == typeof l && void 0 === l.outlets) {
                if (!jb(u, l, s)) return i
                r += 2
              } else {
                if (!jb(u, {}, s)) return i
                r++
              }
              o++
            }
            return { match: !0, pathIndex: o, commandIndex: r }
          })(e, n, t),
          o = t.slice(r.commandIndex)
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new re(e.segments.slice(0, r.pathIndex), {})
          return (
            (i.children[U] = new re(e.segments.slice(r.pathIndex), e.children)),
            Ds(i, 0, o)
          )
        }
        return r.match && 0 === o.length
          ? new re(e.segments, {})
          : r.match && !e.hasChildren()
            ? Sh(e, n, t)
            : r.match
              ? Ds(e, 0, o)
              : Sh(e, n, t)
      }
      function Ds(e, n, t) {
        if (0 === t.length) return new re(e.segments, {})
        {
          const r = (function JL(e) {
              return _s(e[0]) ? e[0].outlets : { [U]: e }
            })(t),
            o = {}
          if (
            Object.keys(r).some((i) => i !== U) &&
            e.children[U] &&
            1 === e.numberOfChildren &&
            0 === e.children[U].segments.length
          ) {
            const i = Ds(e.children[U], n, t)
            return new re(e.segments, i.children)
          }
          return (
            Object.entries(r).forEach(([i, s]) => {
              'string' == typeof s && (s = [s]),
                null !== s && (o[i] = Lb(e.children[i], n, s))
            }),
            Object.entries(e.children).forEach(([i, s]) => {
              void 0 === r[i] && (o[i] = s)
            }),
            new re(e.segments, o)
          )
        }
      }
      function Sh(e, n, t) {
        const r = e.segments.slice(0, n)
        let o = 0
        for (; o < t.length; ) {
          const i = t[o]
          if (_s(i)) {
            const u = eV(i.outlets)
            return new re(r, u)
          }
          if (0 === o && Ku(t[0])) {
            r.push(new ms(e.segments[n].path, Vb(t[0]))), o++
            continue
          }
          const s = _s(i) ? i.outlets[U] : `${i}`,
            a = o < t.length - 1 ? t[o + 1] : null
          s && a && Ku(a)
            ? (r.push(new ms(s, Vb(a))), (o += 2))
            : (r.push(new ms(s, {})), o++)
        }
        return new re(r, {})
      }
      function eV(e) {
        const n = {}
        return (
          Object.entries(e).forEach(([t, r]) => {
            'string' == typeof r && (r = [r]),
              null !== r && (n[t] = Sh(new re([], {}), 0, r))
          }),
          n
        )
      }
      function Vb(e) {
        const n = {}
        return Object.entries(e).forEach(([t, r]) => (n[t] = `${r}`)), n
      }
      function jb(e, n, t) {
        return e == t.path && ln(n, t.parameters)
      }
      const Cs = 'imperative'
      class cn {
        constructor(n, t) {
          ;(this.id = n), (this.url = t)
        }
      }
      class tl extends cn {
        constructor(n, t, r = 'imperative', o = null) {
          super(n, t),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o)
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`
        }
      }
      class nr extends cn {
        constructor(n, t, r) {
          super(n, t), (this.urlAfterRedirects = r), (this.type = 1)
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
        }
      }
      class ws extends cn {
        constructor(n, t, r, o) {
          super(n, t), (this.reason = r), (this.code = o), (this.type = 2)
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
        }
      }
      class Ho extends cn {
        constructor(n, t, r, o) {
          super(n, t), (this.reason = r), (this.code = o), (this.type = 16)
        }
      }
      class nl extends cn {
        constructor(n, t, r, o) {
          super(n, t), (this.error = r), (this.target = o), (this.type = 3)
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
        }
      }
      class $b extends cn {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4)
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class tV extends cn {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7)
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class nV extends cn {
        constructor(n, t, r, o, i) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8)
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
        }
      }
      class rV extends cn {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5)
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class oV extends cn {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6)
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class iV {
        constructor(n) {
          ;(this.route = n), (this.type = 9)
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`
        }
      }
      class sV {
        constructor(n) {
          ;(this.route = n), (this.type = 10)
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`
        }
      }
      class aV {
        constructor(n) {
          ;(this.snapshot = n), (this.type = 11)
        }
        toString() {
          return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`
        }
      }
      class uV {
        constructor(n) {
          ;(this.snapshot = n), (this.type = 12)
        }
        toString() {
          return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`
        }
      }
      class lV {
        constructor(n) {
          ;(this.snapshot = n), (this.type = 13)
        }
        toString() {
          return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`
        }
      }
      class cV {
        constructor(n) {
          ;(this.snapshot = n), (this.type = 14)
        }
        toString() {
          return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`
        }
      }
      class Bb {
        constructor(n, t, r) {
          ;(this.routerEvent = n),
            (this.position = t),
            (this.anchor = r),
            (this.type = 15)
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
        }
      }
      class Th {}
      class Ah {
        constructor(n) {
          this.url = n
        }
      }
      class dV {
        constructor() {
          ;(this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new bs()),
            (this.attachRef = null)
        }
      }
      let bs = (() => {
        class e {
          constructor() {
            this.contexts = new Map()
          }
          onChildOutletCreated(t, r) {
            const o = this.getOrCreateContext(t)
            ;(o.outlet = r), this.contexts.set(t, o)
          }
          onChildOutletDestroyed(t) {
            const r = this.getContext(t)
            r && ((r.outlet = null), (r.attachRef = null))
          }
          onOutletDeactivated() {
            const t = this.contexts
            return (this.contexts = new Map()), t
          }
          onOutletReAttached(t) {
            this.contexts = t
          }
          getOrCreateContext(t) {
            let r = this.getContext(t)
            return r || ((r = new dV()), this.contexts.set(t, r)), r
          }
          getContext(t) {
            return this.contexts.get(t) || null
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      class Ub {
        constructor(n) {
          this._root = n
        }
        get root() {
          return this._root.value
        }
        parent(n) {
          const t = this.pathFromRoot(n)
          return t.length > 1 ? t[t.length - 2] : null
        }
        children(n) {
          const t = Nh(n, this._root)
          return t ? t.children.map((r) => r.value) : []
        }
        firstChild(n) {
          const t = Nh(n, this._root)
          return t && t.children.length > 0 ? t.children[0].value : null
        }
        siblings(n) {
          const t = Oh(n, this._root)
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== n)
        }
        pathFromRoot(n) {
          return Oh(n, this._root).map((t) => t.value)
        }
      }
      function Nh(e, n) {
        if (e === n.value) return n
        for (const t of n.children) {
          const r = Nh(e, t)
          if (r) return r
        }
        return null
      }
      function Oh(e, n) {
        if (e === n.value) return [n]
        for (const t of n.children) {
          const r = Oh(e, t)
          if (r.length) return r.unshift(n), r
        }
        return []
      }
      class On {
        constructor(n, t) {
          ;(this.value = n), (this.children = t)
        }
        toString() {
          return `TreeNode(${this.value})`
        }
      }
      function Go(e) {
        const n = {}
        return e && e.children.forEach((t) => (n[t.value.outlet] = t)), n
      }
      class Hb extends Ub {
        constructor(n, t) {
          super(n), (this.snapshot = t), Rh(this, n)
        }
        toString() {
          return this.snapshot.toString()
        }
      }
      function Gb(e, n) {
        const t = (function fV(e, n) {
            const s = new rl([], {}, {}, '', {}, U, n, null, {})
            return new qb('', new On(s, []))
          })(0, n),
          r = new lt([new ms('', {})]),
          o = new lt({}),
          i = new lt({}),
          s = new lt({}),
          a = new lt(''),
          u = new Rn(r, o, s, a, i, U, n, t.root)
        return (u.snapshot = t.root), new Hb(new On(u, []), t)
      }
      class Rn {
        constructor(n, t, r, o, i, s, a, u) {
          ;(this.urlSubject = n),
            (this.paramsSubject = t),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = i),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title = this.dataSubject?.pipe(W((l) => l[gs])) ?? R(void 0)),
            (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i)
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(W((n) => Bo(n)))),
            this._paramMap
          )
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(W((n) => Bo(n)))),
            this._queryParamMap
          )
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`
        }
      }
      function zb(e, n = 'emptyOnly') {
        const t = e.pathFromRoot
        let r = 0
        if ('always' !== n)
          for (r = t.length - 1; r >= 1; ) {
            const o = t[r],
              i = t[r - 1]
            if (o.routeConfig && '' === o.routeConfig.path) r--
            else {
              if (i.component) break
              r--
            }
          }
        return (function hV(e) {
          return e.reduce(
            (n, t) => ({
              params: { ...n.params, ...t.params },
              data: { ...n.data, ...t.data },
              resolve: {
                ...t.data,
                ...n.resolve,
                ...t.routeConfig?.data,
                ...t._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          )
        })(t.slice(r))
      }
      class rl {
        get title() {
          return this.data?.[gs]
        }
        constructor(n, t, r, o, i, s, a, u, l) {
          ;(this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = l)
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Bo(this.params)), this._paramMap
          )
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Bo(this.queryParams)),
            this._queryParamMap
          )
        }
        toString() {
          return `Route(url:'${this.url.map((r) => r.toString()).join('/')}', path:'${this.routeConfig ? this.routeConfig.path : ''}')`
        }
      }
      class qb extends Ub {
        constructor(n, t) {
          super(t), (this.url = n), Rh(this, t)
        }
        toString() {
          return Wb(this._root)
        }
      }
      function Rh(e, n) {
        ;(n.value._routerState = e), n.children.forEach((t) => Rh(e, t))
      }
      function Wb(e) {
        const n =
          e.children.length > 0 ? ` { ${e.children.map(Wb).join(', ')} } ` : ''
        return `${e.value}${n}`
      }
      function xh(e) {
        if (e.snapshot) {
          const n = e.snapshot,
            t = e._futureSnapshot
          ;(e.snapshot = t),
            ln(n.queryParams, t.queryParams) ||
              e.queryParamsSubject.next(t.queryParams),
            n.fragment !== t.fragment && e.fragmentSubject.next(t.fragment),
            ln(n.params, t.params) || e.paramsSubject.next(t.params),
            (function AL(e, n) {
              if (e.length !== n.length) return !1
              for (let t = 0; t < e.length; ++t) if (!ln(e[t], n[t])) return !1
              return !0
            })(n.url, t.url) || e.urlSubject.next(t.url),
            ln(n.data, t.data) || e.dataSubject.next(t.data)
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data)
      }
      function Ph(e, n) {
        const t =
          ln(e.params, n.params) &&
          (function xL(e, n) {
            return (
              Rr(e, n) && e.every((t, r) => ln(t.parameters, n[r].parameters))
            )
          })(e.url, n.url)
        return (
          t &&
          !(!e.parent != !n.parent) &&
          (!e.parent || Ph(e.parent, n.parent))
        )
      }
      let ol = (() => {
        class e {
          constructor() {
            ;(this.activated = null),
              (this._activatedRoute = null),
              (this.name = U),
              (this.activateEvents = new ie()),
              (this.deactivateEvents = new ie()),
              (this.attachEvents = new ie()),
              (this.detachEvents = new ie()),
              (this.parentContexts = T(bs)),
              (this.location = T(Gt)),
              (this.changeDetector = T(Ki)),
              (this.environmentInjector = T(Et)),
              (this.inputBinder = T(il, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0)
          }
          get activatedComponentRef() {
            return this.activated
          }
          ngOnChanges(t) {
            if (t.name) {
              const { firstChange: r, previousValue: o } = t.name
              if (r) return
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName()
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this)
          }
          isTrackedInParentContexts(t) {
            return this.parentContexts.getContext(t)?.outlet === this
          }
          ngOnInit() {
            this.initializeOutletWithName()
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return
            const t = this.parentContexts.getContext(this.name)
            t?.route &&
              (t.attachRef
                ? this.attach(t.attachRef, t.route)
                : this.activateWith(t.route, t.injector))
          }
          get isActivated() {
            return !!this.activated
          }
          get component() {
            if (!this.activated) throw new w(4012, !1)
            return this.activated.instance
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, !1)
            return this._activatedRoute
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {}
          }
          detach() {
            if (!this.activated) throw new w(4012, !1)
            this.location.detach()
            const t = this.activated
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            )
          }
          attach(t, r) {
            ;(this.activated = t),
              (this._activatedRoute = r),
              this.location.insert(t.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(t.instance)
          }
          deactivate() {
            if (this.activated) {
              const t = this.component
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t)
            }
          }
          activateWith(t, r) {
            if (this.isActivated) throw new w(4013, !1)
            this._activatedRoute = t
            const o = this.location,
              s = t.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new pV(t, a, o.injector)
            ;(this.activated = o.createComponent(s, {
              index: o.length,
              injector: u,
              environmentInjector: r ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵdir = L({
            type: e,
            selectors: [['router-outlet']],
            inputs: { name: 'name' },
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach',
            },
            exportAs: ['outlet'],
            standalone: !0,
            features: [Ot],
          }))
        }
        return e
      })()
      class pV {
        constructor(n, t, r) {
          ;(this.route = n), (this.childContexts = t), (this.parent = r)
        }
        get(n, t) {
          return n === Rn
            ? this.route
            : n === bs
              ? this.childContexts
              : this.parent.get(n, t)
        }
      }
      const il = new S('')
      let Zb = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map()
          }
          bindActivatedRouteToOutletComponent(t) {
            this.unsubscribeFromRouteData(t), this.subscribeToRouteData(t)
          }
          unsubscribeFromRouteData(t) {
            this.outletDataSubscriptions.get(t)?.unsubscribe(),
              this.outletDataSubscriptions.delete(t)
          }
          subscribeToRouteData(t) {
            const { activatedRoute: r } = t,
              o = Dh([r.queryParams, r.params, r.data])
                .pipe(
                  yt(
                    ([i, s, a], u) => (
                      (a = { ...i, ...s, ...a }),
                      0 === u ? R(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe((i) => {
                  if (
                    !t.isActivated ||
                    !t.activatedComponentRef ||
                    t.activatedRoute !== r ||
                    null === r.component
                  )
                    return void this.unsubscribeFromRouteData(t)
                  const s = (function eP(e) {
                    const n = Z(e)
                    if (!n) return null
                    const t = new Li(n)
                    return {
                      get selector() {
                        return t.selector
                      },
                      get type() {
                        return t.componentType
                      },
                      get inputs() {
                        return t.inputs
                      },
                      get outputs() {
                        return t.outputs
                      },
                      get ngContentSelectors() {
                        return t.ngContentSelectors
                      },
                      get isStandalone() {
                        return n.standalone
                      },
                      get isSignal() {
                        return n.signals
                      },
                    }
                  })(r.component)
                  if (s)
                    for (const { templateName: a } of s.inputs)
                      t.activatedComponentRef.setInput(a, i[a])
                  else this.unsubscribeFromRouteData(t)
                })
            this.outletDataSubscriptions.set(t, o)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      function Es(e, n, t) {
        if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
          const r = t.value
          r._futureSnapshot = n.value
          const o = (function mV(e, n, t) {
            return n.children.map((r) => {
              for (const o of t.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Es(e, r, o)
              return Es(e, r)
            })
          })(e, n, t)
          return new On(r, o)
        }
        {
          if (e.shouldAttach(n.value)) {
            const i = e.retrieve(n.value)
            if (null !== i) {
              const s = i.route
              return (
                (s.value._futureSnapshot = n.value),
                (s.children = n.children.map((a) => Es(e, a))),
                s
              )
            }
          }
          const r = (function vV(e) {
              return new Rn(
                new lt(e.url),
                new lt(e.params),
                new lt(e.queryParams),
                new lt(e.fragment),
                new lt(e.data),
                e.outlet,
                e.component,
                e
              )
            })(n.value),
            o = n.children.map((i) => Es(e, i))
          return new On(r, o)
        }
      }
      const Fh = 'ngNavigationCancelingError'
      function Yb(e, n) {
        const { redirectTo: t, navigationBehaviorOptions: r } = xr(n)
            ? { redirectTo: n, navigationBehaviorOptions: void 0 }
            : n,
          o = Qb(!1, 0, n)
        return (o.url = t), (o.navigationBehaviorOptions = r), o
      }
      function Qb(e, n, t) {
        const r = new Error('NavigationCancelingError: ' + (e || ''))
        return (r[Fh] = !0), (r.cancellationCode = n), t && (r.url = t), r
      }
      function Xb(e) {
        return e && e[Fh]
      }
      let Jb = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵcmp = Le({
            type: e,
            selectors: [['ng-component']],
            standalone: !0,
            features: [G_],
            decls: 1,
            vars: 0,
            template: function (r, o) {
              1 & r && Re(0, 'router-outlet')
            },
            dependencies: [ol],
            encapsulation: 2,
          }))
        }
        return e
      })()
      function kh(e) {
        const n = e.children && e.children.map(kh),
          t = n ? { ...e, children: n } : { ...e }
        return (
          !t.component &&
            !t.loadComponent &&
            (n || t.loadChildren) &&
            t.outlet &&
            t.outlet !== U &&
            (t.component = Jb),
          t
        )
      }
      function Wt(e) {
        return e.outlet || U
      }
      function Ms(e) {
        if (!e) return null
        if (e.routeConfig?._injector) return e.routeConfig._injector
        for (let n = e.parent; n; n = n.parent) {
          const t = n.routeConfig
          if (t?._loadedInjector) return t._loadedInjector
          if (t?._injector) return t._injector
        }
        return null
      }
      class MV {
        constructor(n, t, r, o, i) {
          ;(this.routeReuseStrategy = n),
            (this.futureState = t),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = i)
        }
        activate(n) {
          const t = this.futureState._root,
            r = this.currState ? this.currState._root : null
          this.deactivateChildRoutes(t, r, n),
            xh(this.futureState.root),
            this.activateChildRoutes(t, r, n)
        }
        deactivateChildRoutes(n, t, r) {
          const o = Go(t)
          n.children.forEach((i) => {
            const s = i.value.outlet
            this.deactivateRoutes(i, o[s], r), delete o[s]
          }),
            Object.values(o).forEach((i) => {
              this.deactivateRouteAndItsChildren(i, r)
            })
        }
        deactivateRoutes(n, t, r) {
          const o = n.value,
            i = t ? t.value : null
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet)
              s && this.deactivateChildRoutes(n, t, s.children)
            } else this.deactivateChildRoutes(n, t, r)
          else i && this.deactivateRouteAndItsChildren(t, r)
        }
        deactivateRouteAndItsChildren(n, t) {
          n.value.component &&
          this.routeReuseStrategy.shouldDetach(n.value.snapshot)
            ? this.detachAndStoreRouteSubtree(n, t)
            : this.deactivateRouteAndOutlet(n, t)
        }
        detachAndStoreRouteSubtree(n, t) {
          const r = t.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : t,
            i = Go(n)
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o)
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated()
            this.routeReuseStrategy.store(n.value.snapshot, {
              componentRef: s,
              route: n,
              contexts: a,
            })
          }
        }
        deactivateRouteAndOutlet(n, t) {
          const r = t.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : t,
            i = Go(n)
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o)
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null))
        }
        activateChildRoutes(n, t, r) {
          const o = Go(t)
          n.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new cV(i.value.snapshot))
          }),
            n.children.length && this.forwardEvent(new uV(n.value.snapshot))
        }
        activateRoutes(n, t, r) {
          const o = n.value,
            i = t ? t.value : null
          if ((xh(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet)
              this.activateChildRoutes(n, t, s.children)
            } else this.activateChildRoutes(n, t, r)
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet)
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot)
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                xh(a.route.value),
                this.activateChildRoutes(n, null, s.children)
            } else {
              const a = Ms(o.snapshot)
              ;(s.attachRef = null),
                (s.route = o),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(n, null, s.children)
            }
          } else this.activateChildRoutes(n, null, r)
        }
      }
      class Kb {
        constructor(n) {
          ;(this.path = n), (this.route = this.path[this.path.length - 1])
        }
      }
      class sl {
        constructor(n, t) {
          ;(this.component = n), (this.route = t)
        }
      }
      function IV(e, n, t) {
        const r = e._root
        return Is(r, n ? n._root : null, t, [r.value])
      }
      function zo(e, n) {
        const t = Symbol(),
          r = n.get(e, t)
        return r === t
          ? 'function' != typeof e ||
            (function sI(e) {
              return null !== Bs(e)
            })(e)
            ? n.get(e)
            : e
          : r
      }
      function Is(
        e,
        n,
        t,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Go(n)
        return (
          e.children.forEach((s) => {
            ;(function TV(
              e,
              n,
              t,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = n ? n.value : null,
                a = t ? t.getContext(e.value.outlet) : null
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function AV(e, n, t) {
                  if ('function' == typeof t) return t(e, n)
                  switch (t) {
                    case 'pathParamsChange':
                      return !Rr(e.url, n.url)
                    case 'pathParamsOrQueryParamsChange':
                      return (
                        !Rr(e.url, n.url) || !ln(e.queryParams, n.queryParams)
                      )
                    case 'always':
                      return !0
                    case 'paramsOrQueryParamsChange':
                      return !Ph(e, n) || !ln(e.queryParams, n.queryParams)
                    default:
                      return !Ph(e, n)
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers)
                u
                  ? o.canActivateChecks.push(new Kb(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Is(e, n, i.component ? (a ? a.children : null) : t, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new sl(a.outlet.component, s))
              } else
                s && Ss(n, a, o),
                  o.canActivateChecks.push(new Kb(r)),
                  Is(e, null, i.component ? (a ? a.children : null) : t, r, o)
            })(s, i[s.value.outlet], t, r.concat([s.value]), o),
              delete i[s.value.outlet]
          }),
          Object.entries(i).forEach(([s, a]) => Ss(a, t.getContext(s), o)),
          o
        )
      }
      function Ss(e, n, t) {
        const r = Go(e),
          o = e.value
        Object.entries(r).forEach(([i, s]) => {
          Ss(s, o.component ? (n ? n.children.getContext(i) : null) : n, t)
        }),
          t.canDeactivateChecks.push(
            new sl(
              o.component && n && n.outlet && n.outlet.isActivated
                ? n.outlet.component
                : null,
              o
            )
          )
      }
      function Ts(e) {
        return 'function' == typeof e
      }
      function eE(e) {
        return e instanceof qu || 'EmptyError' === e?.name
      }
      const al = Symbol('INITIAL_VALUE')
      function qo() {
        return yt((e) =>
          Dh(
            e.map((n) =>
              n.pipe(
                un(1),
                (function DL(...e) {
                  const n = ti(e)
                  return Me((t, r) => {
                    ;(n ? hs(e, t, n) : hs(e, t)).subscribe(r)
                  })
                })(al)
              )
            )
          ).pipe(
            W((n) => {
              for (const t of n)
                if (!0 !== t) {
                  if (t === al) return al
                  if (!1 === t || t instanceof Uo) return t
                }
              return !0
            }),
            An((n) => n !== al),
            un(1)
          )
        )
      }
      function tE(e) {
        return (function uM(...e) {
          return ap(e)
        })(
          Ye((n) => {
            if (xr(n)) throw Yb(0, n)
          }),
          W((n) => !0 === n)
        )
      }
      class ul {
        constructor(n) {
          this.segmentGroup = n || null
        }
      }
      class nE {
        constructor(n) {
          this.urlTree = n
        }
      }
      function Wo(e) {
        return ps(new ul(e))
      }
      function rE(e) {
        return ps(new nE(e))
      }
      class YV {
        constructor(n, t) {
          ;(this.urlSerializer = n), (this.urlTree = t)
        }
        noMatchError(n) {
          return new w(4002, !1)
        }
        lineralizeSegments(n, t) {
          let r = [],
            o = t.root
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return R(r)
            if (o.numberOfChildren > 1 || !o.children[U])
              return ps(new w(4e3, !1))
            o = o.children[U]
          }
        }
        applyRedirectCommands(n, t, r) {
          return this.applyRedirectCreateUrlTree(
            t,
            this.urlSerializer.parse(t),
            n,
            r
          )
        }
        applyRedirectCreateUrlTree(n, t, r, o) {
          const i = this.createSegmentGroup(n, t.root, r, o)
          return new Uo(
            i,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          )
        }
        createQueryParams(n, t) {
          const r = {}
          return (
            Object.entries(n).forEach(([o, i]) => {
              if ('string' == typeof i && i.startsWith(':')) {
                const a = i.substring(1)
                r[o] = t[a]
              } else r[o] = i
            }),
            r
          )
        }
        createSegmentGroup(n, t, r, o) {
          const i = this.createSegments(n, t.segments, r, o)
          let s = {}
          return (
            Object.entries(t.children).forEach(([a, u]) => {
              s[a] = this.createSegmentGroup(n, u, r, o)
            }),
            new re(i, s)
          )
        }
        createSegments(n, t, r, o) {
          return t.map((i) =>
            i.path.startsWith(':')
              ? this.findPosParam(n, i, o)
              : this.findOrReturn(i, r)
          )
        }
        findPosParam(n, t, r) {
          const o = r[t.path.substring(1)]
          if (!o) throw new w(4001, !1)
          return o
        }
        findOrReturn(n, t) {
          let r = 0
          for (const o of t) {
            if (o.path === n.path) return t.splice(r), o
            r++
          }
          return n
        }
      }
      const Lh = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      }
      function QV(e, n, t, r, o) {
        const i = Vh(e, n, t)
        return i.matched
          ? ((r = (function _V(e, n) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = Xd(e.providers, n, `Route: ${e.path}`)),
                e._injector ?? n
              )
            })(n, r)),
            (function qV(e, n, t, r) {
              const o = n.canMatch
              return o && 0 !== o.length
                ? R(
                    o.map((s) => {
                      const a = zo(s, e)
                      return tr(
                        (function FV(e) {
                          return e && Ts(e.canMatch)
                        })(a)
                          ? a.canMatch(n, t)
                          : e.runInContext(() => a(n, t))
                      )
                    })
                  ).pipe(qo(), tE())
                : R(!0)
            })(r, n, t).pipe(W((s) => (!0 === s ? i : { ...Lh }))))
          : R(i)
      }
      function Vh(e, n, t) {
        if ('' === n.path)
          return 'full' === n.pathMatch && (e.hasChildren() || t.length > 0)
            ? { ...Lh }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: t,
                parameters: {},
                positionalParamSegments: {},
              }
        const o = (n.matcher || TL)(t, e, n)
        if (!o) return { ...Lh }
        const i = {}
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path
        })
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: t.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        }
      }
      function oE(e, n, t, r) {
        return t.length > 0 &&
          (function KV(e, n, t) {
            return t.some((r) => ll(e, n, r) && Wt(r) !== U)
          })(e, t, r)
          ? {
              segmentGroup: new re(n, JV(r, new re(t, e.children))),
              slicedSegments: [],
            }
          : 0 === t.length &&
              (function e2(e, n, t) {
                return t.some((r) => ll(e, n, r))
              })(e, t, r)
            ? {
                segmentGroup: new re(e.segments, XV(e, 0, t, r, e.children)),
                slicedSegments: t,
              }
            : {
                segmentGroup: new re(e.segments, e.children),
                slicedSegments: t,
              }
      }
      function XV(e, n, t, r, o) {
        const i = {}
        for (const s of r)
          if (ll(e, t, s) && !o[Wt(s)]) {
            const a = new re([], {})
            i[Wt(s)] = a
          }
        return { ...o, ...i }
      }
      function JV(e, n) {
        const t = {}
        t[U] = n
        for (const r of e)
          if ('' === r.path && Wt(r) !== U) {
            const o = new re([], {})
            t[Wt(r)] = o
          }
        return t
      }
      function ll(e, n, t) {
        return (
          (!(e.hasChildren() || n.length > 0) || 'full' !== t.pathMatch) &&
          '' === t.path
        )
      }
      class o2 {
        constructor(n, t, r, o, i, s, a) {
          ;(this.injector = n),
            (this.configLoader = t),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new YV(this.urlSerializer, this.urlTree))
        }
        noMatchError(n) {
          return new w(4002, !1)
        }
        recognize() {
          const n = oE(this.urlTree.root, [], [], this.config).segmentGroup
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n,
            U
          ).pipe(
            Nn((t) => {
              if (t instanceof nE)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = t.urlTree),
                  this.match(t.urlTree)
                )
              throw t instanceof ul ? this.noMatchError(t) : t
            }),
            W((t) => {
              const r = new rl(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  U,
                  this.rootComponentType,
                  null,
                  {}
                ),
                o = new On(r, t),
                i = new qb('', o),
                s = (function ZL(e, n, t = null, r = null) {
                  return Pb(xb(e), n, t, r)
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment)
              return (
                (s.queryParams = this.urlTree.queryParams),
                (i.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(i._root),
                { state: i, tree: s }
              )
            })
          )
        }
        match(n) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n.root,
            U
          ).pipe(
            Nn((r) => {
              throw r instanceof ul ? this.noMatchError(r) : r
            })
          )
        }
        inheritParamsAndData(n) {
          const t = n.value,
            r = zb(t, this.paramsInheritanceStrategy)
          ;(t.params = Object.freeze(r.params)),
            (t.data = Object.freeze(r.data)),
            n.children.forEach((o) => this.inheritParamsAndData(o))
        }
        processSegmentGroup(n, t, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(n, t, r)
            : this.processSegment(n, t, r, r.segments, o, !0)
        }
        processChildren(n, t, r) {
          const o = []
          for (const i of Object.keys(r.children))
            'primary' === i ? o.unshift(i) : o.push(i)
          return Ie(o).pipe(
            Or((i) => {
              const s = r.children[i],
                a = (function bV(e, n) {
                  const t = e.filter((r) => Wt(r) === n)
                  return t.push(...e.filter((r) => Wt(r) !== n)), t
                })(t, i)
              return this.processSegmentGroup(n, a, s, i)
            }),
            (function bL(e, n) {
              return Me(
                (function wL(e, n, t, r, o) {
                  return (i, s) => {
                    let a = t,
                      u = n,
                      l = 0
                    i.subscribe(
                      we(
                        s,
                        (c) => {
                          const d = l++
                          ;(u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u)
                        },
                        o &&
                          (() => {
                            a && s.next(u), s.complete()
                          })
                      )
                    )
                  }
                })(e, n, arguments.length >= 2, !0)
              )
            })((i, s) => (i.push(...s), i)),
            Zu(null),
            (function EL(e, n) {
              const t = arguments.length >= 2
              return (r) =>
                r.pipe(
                  e ? An((o, i) => e(o, i, r)) : kn,
                  wh(1),
                  t ? Zu(n) : Db(() => new qu())
                )
            })(),
            ke((i) => {
              if (null === i) return Wo(r)
              const s = iE(i)
              return (
                (function i2(e) {
                  e.sort((n, t) =>
                    n.value.outlet === U
                      ? -1
                      : t.value.outlet === U
                        ? 1
                        : n.value.outlet.localeCompare(t.value.outlet)
                  )
                })(s),
                R(s)
              )
            })
          )
        }
        processSegment(n, t, r, o, i, s) {
          return Ie(t).pipe(
            Or((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? n,
                t,
                a,
                r,
                o,
                i,
                s
              ).pipe(
                Nn((u) => {
                  if (u instanceof ul) return R(null)
                  throw u
                })
              )
            ),
            Nr((a) => !!a),
            Nn((a) => {
              if (eE(a))
                return (function n2(e, n, t) {
                  return 0 === n.length && !e.children[t]
                })(r, o, i)
                  ? R([])
                  : Wo(r)
              throw a
            })
          )
        }
        processSegmentAgainstRoute(n, t, r, o, i, s, a) {
          return (function t2(e, n, t, r) {
            return (
              !!(Wt(e) === r || (r !== U && ll(n, t, e))) &&
              ('**' === e.path || Vh(n, e, t).matched)
            )
          })(r, o, i, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(n, o, r, i, s, a)
              : a && this.allowRedirects
                ? this.expandSegmentAgainstRouteUsingRedirect(n, o, t, r, i, s)
                : Wo(o)
            : Wo(o)
        }
        expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
          return '**' === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                n,
                t,
                r,
                o,
                i,
                s
              )
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(n, t, r, o) {
          const i = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          )
          return r.redirectTo.startsWith('/')
            ? rE(i)
            : this.applyRedirects.lineralizeSegments(r, i).pipe(
                ke((s) => {
                  const a = new re(s, {})
                  return this.processSegment(n, t, a, s, o, !1)
                })
              )
        }
        expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = Vh(t, o, i)
          if (!a) return Wo(t)
          const d = this.applyRedirects.applyRedirectCommands(
            u,
            o.redirectTo,
            c
          )
          return o.redirectTo.startsWith('/')
            ? rE(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  ke((f) => this.processSegment(n, r, t, f.concat(l), s, !1))
                )
        }
        matchSegmentAgainstRoute(n, t, r, o, i, s) {
          let a
          if ('**' === r.path) {
            const u = o.length > 0 ? wb(o).parameters : {}
            ;(a = R({
              snapshot: new rl(
                o,
                u,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                sE(r),
                Wt(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                aE(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (t.children = {})
          } else
            a = QV(t, r, o, n).pipe(
              W(
                ({
                  matched: u,
                  consumedSegments: l,
                  remainingSegments: c,
                  parameters: d,
                }) =>
                  u
                    ? {
                        snapshot: new rl(
                          l,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          sE(r),
                          Wt(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          aE(r)
                        ),
                        consumedSegments: l,
                        remainingSegments: c,
                      }
                    : null
              )
            )
          return a.pipe(
            yt((u) =>
              null === u
                ? Wo(t)
                : this.getChildConfig((n = r._injector ?? n), r, o).pipe(
                    yt(({ routes: l }) => {
                      const c = r._loadedInjector ?? n,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = u,
                        { segmentGroup: p, slicedSegments: g } = oE(t, f, h, l)
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(c, l, p).pipe(
                          W((b) => (null === b ? null : [new On(d, b)]))
                        )
                      if (0 === l.length && 0 === g.length)
                        return R([new On(d, [])])
                      const y = Wt(r) === i
                      return this.processSegment(
                        c,
                        l,
                        p,
                        g,
                        y ? U : i,
                        !0
                      ).pipe(W((b) => [new On(d, b)]))
                    })
                  )
            )
          )
        }
        getChildConfig(n, t, r) {
          return t.children
            ? R({ routes: t.children, injector: n })
            : t.loadChildren
              ? void 0 !== t._loadedRoutes
                ? R({ routes: t._loadedRoutes, injector: t._loadedInjector })
                : (function zV(e, n, t, r) {
                    const o = n.canLoad
                    return void 0 === o || 0 === o.length
                      ? R(!0)
                      : R(
                          o.map((s) => {
                            const a = zo(s, e)
                            return tr(
                              (function OV(e) {
                                return e && Ts(e.canLoad)
                              })(a)
                                ? a.canLoad(n, t)
                                : e.runInContext(() => a(n, t))
                            )
                          })
                        ).pipe(qo(), tE())
                  })(n, t, r).pipe(
                    ke((o) =>
                      o
                        ? this.configLoader.loadChildren(n, t).pipe(
                            Ye((i) => {
                              ;(t._loadedRoutes = i.routes),
                                (t._loadedInjector = i.injector)
                            })
                          )
                        : (function ZV(e) {
                            return ps(Qb(!1, 3))
                          })()
                    )
                  )
              : R({ routes: [], injector: n })
        }
      }
      function s2(e) {
        const n = e.value.routeConfig
        return n && '' === n.path
      }
      function iE(e) {
        const n = [],
          t = new Set()
        for (const r of e) {
          if (!s2(r)) {
            n.push(r)
            continue
          }
          const o = n.find((i) => r.value.routeConfig === i.value.routeConfig)
          void 0 !== o ? (o.children.push(...r.children), t.add(o)) : n.push(r)
        }
        for (const r of t) {
          const o = iE(r.children)
          n.push(new On(r.value, o))
        }
        return n.filter((r) => !t.has(r))
      }
      function sE(e) {
        return e.data || {}
      }
      function aE(e) {
        return e.resolve || {}
      }
      function uE(e) {
        return 'string' == typeof e.title || null === e.title
      }
      function jh(e) {
        return yt((n) => {
          const t = e(n)
          return t ? Ie(t).pipe(W(() => n)) : R(n)
        })
      }
      const Zo = new S('ROUTES')
      let $h = (() => {
        class e {
          constructor() {
            ;(this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = T(LD))
          }
          loadComponent(t) {
            if (this.componentLoaders.get(t))
              return this.componentLoaders.get(t)
            if (t._loadedComponent) return R(t._loadedComponent)
            this.onLoadStartListener && this.onLoadStartListener(t)
            const r = tr(t.loadComponent()).pipe(
                W(lE),
                Ye((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(t),
                    (t._loadedComponent = i)
                }),
                $o(() => {
                  this.componentLoaders.delete(t)
                })
              ),
              o = new _b(r, () => new ut()).pipe(Ch())
            return this.componentLoaders.set(t, o), o
          }
          loadChildren(t, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r)
            if (r._loadedRoutes)
              return R({ routes: r._loadedRoutes, injector: r._loadedInjector })
            this.onLoadStartListener && this.onLoadStartListener(r)
            const i = (function h2(e, n, t, r) {
                return tr(e.loadChildren()).pipe(
                  W(lE),
                  ke((o) =>
                    o instanceof U_ || Array.isArray(o)
                      ? R(o)
                      : Ie(n.compileModuleAsync(o))
                  ),
                  W((o) => {
                    r && r(e)
                    let i,
                      s,
                      a = !1
                    return (
                      Array.isArray(o)
                        ? ((s = o), !0)
                        : ((i = o.create(t).injector),
                          (s = i
                            .get(Zo, [], { optional: !0, self: !0 })
                            .flat())),
                      { routes: s.map(kh), injector: i }
                    )
                  })
                )
              })(r, this.compiler, t, this.onLoadEndListener).pipe(
                $o(() => {
                  this.childrenLoaders.delete(r)
                })
              ),
              s = new _b(i, () => new ut()).pipe(Ch())
            return this.childrenLoaders.set(r, s), s
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      function lE(e) {
        return (function p2(e) {
          return e && 'object' == typeof e && 'default' in e
        })(e)
          ? e.default
          : e
      }
      let cl = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId
          }
          constructor() {
            ;(this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new ut()),
              (this.transitionAbortSubject = new ut()),
              (this.configLoader = T($h)),
              (this.environmentInjector = T(Et)),
              (this.urlSerializer = T(vs)),
              (this.rootContexts = T(bs)),
              (this.inputBindingEnabled = null !== T(il, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => R(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new sV(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new iV(o)))
          }
          complete() {
            this.transitions?.complete()
          }
          handleNavigationRequest(t) {
            const r = ++this.navigationId
            this.transitions?.next({ ...this.transitions.value, ...t, id: r })
          }
          setupNavigations(t, r, o) {
            return (
              (this.transitions = new lt({
                id: 0,
                currentUrlTree: r,
                currentRawUrl: r,
                currentBrowserUrl: r,
                extractedUrl: t.urlHandlingStrategy.extract(r),
                urlAfterRedirects: t.urlHandlingStrategy.extract(r),
                rawUrl: r,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Cs,
                restoredState: null,
                currentSnapshot: o.snapshot,
                targetSnapshot: null,
                currentRouterState: o,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                An((i) => 0 !== i.id),
                W((i) => ({
                  ...i,
                  extractedUrl: t.urlHandlingStrategy.extract(i.rawUrl),
                })),
                yt((i) => {
                  this.currentTransition = i
                  let s = !1,
                    a = !1
                  return R(i).pipe(
                    Ye((u) => {
                      this.currentNavigation = {
                        id: u.id,
                        initialUrl: u.rawUrl,
                        extractedUrl: u.extractedUrl,
                        trigger: u.source,
                        extras: u.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      }
                    }),
                    yt((u) => {
                      const l = u.currentBrowserUrl.toString(),
                        c =
                          !t.navigated ||
                          u.extractedUrl.toString() !== l ||
                          l !== u.currentUrlTree.toString()
                      if (
                        !c &&
                        'reload' !==
                          (u.extras.onSameUrlNavigation ??
                            t.onSameUrlNavigation)
                      ) {
                        const f = ''
                        return (
                          this.events.next(
                            new Ho(
                              u.id,
                              this.urlSerializer.serialize(u.rawUrl),
                              f,
                              0
                            )
                          ),
                          u.resolve(null),
                          Tt
                        )
                      }
                      if (t.urlHandlingStrategy.shouldProcessUrl(u.rawUrl))
                        return R(u).pipe(
                          yt((f) => {
                            const h = this.transitions?.getValue()
                            return (
                              this.events.next(
                                new tl(
                                  f.id,
                                  this.urlSerializer.serialize(f.extractedUrl),
                                  f.source,
                                  f.restoredState
                                )
                              ),
                              h !== this.transitions?.getValue()
                                ? Tt
                                : Promise.resolve(f)
                            )
                          }),
                          (function a2(e, n, t, r, o, i) {
                            return ke((s) =>
                              (function r2(e, n, t, r, o, i, s = 'emptyOnly') {
                                return new o2(e, n, t, r, o, s, i).recognize()
                              })(e, n, t, r, s.extractedUrl, o, i).pipe(
                                W(({ state: a, tree: u }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: u,
                                }))
                              )
                            )
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            t.config,
                            this.urlSerializer,
                            t.paramsInheritanceStrategy
                          ),
                          Ye((f) => {
                            ;(i.targetSnapshot = f.targetSnapshot),
                              (i.urlAfterRedirects = f.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: f.urlAfterRedirects,
                              })
                            const h = new $b(
                              f.id,
                              this.urlSerializer.serialize(f.extractedUrl),
                              this.urlSerializer.serialize(f.urlAfterRedirects),
                              f.targetSnapshot
                            )
                            this.events.next(h)
                          })
                        )
                      if (
                        c &&
                        t.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)
                      ) {
                        const {
                            id: f,
                            extractedUrl: h,
                            source: p,
                            restoredState: g,
                            extras: y,
                          } = u,
                          b = new tl(f, this.urlSerializer.serialize(h), p, g)
                        this.events.next(b)
                        const m = Gb(0, this.rootComponentType).snapshot
                        return (
                          (this.currentTransition = i =
                            {
                              ...u,
                              targetSnapshot: m,
                              urlAfterRedirects: h,
                              extras: {
                                ...y,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          R(i)
                        )
                      }
                      {
                        const f = ''
                        return (
                          this.events.next(
                            new Ho(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              f,
                              1
                            )
                          ),
                          u.resolve(null),
                          Tt
                        )
                      }
                    }),
                    Ye((u) => {
                      const l = new tV(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      )
                      this.events.next(l)
                    }),
                    W(
                      (u) => (
                        (this.currentTransition = i =
                          {
                            ...u,
                            guards: IV(
                              u.targetSnapshot,
                              u.currentSnapshot,
                              this.rootContexts
                            ),
                          }),
                        i
                      )
                    ),
                    (function LV(e, n) {
                      return ke((t) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = t
                        return 0 === s.length && 0 === i.length
                          ? R({ ...t, guardsResult: !0 })
                          : (function VV(e, n, t, r) {
                              return Ie(e).pipe(
                                ke((o) =>
                                  (function GV(e, n, t, r, o) {
                                    const i =
                                      n && n.routeConfig
                                        ? n.routeConfig.canDeactivate
                                        : null
                                    return i && 0 !== i.length
                                      ? R(
                                          i.map((a) => {
                                            const u = Ms(n) ?? o,
                                              l = zo(a, u)
                                            return tr(
                                              (function PV(e) {
                                                return e && Ts(e.canDeactivate)
                                              })(l)
                                                ? l.canDeactivate(e, n, t, r)
                                                : u.runInContext(() =>
                                                    l(e, n, t, r)
                                                  )
                                            ).pipe(Nr())
                                          })
                                        ).pipe(qo())
                                      : R(!0)
                                  })(o.component, o.route, t, n, r)
                                ),
                                Nr((o) => !0 !== o, !0)
                              )
                            })(s, r, o, e).pipe(
                              ke((a) =>
                                a &&
                                (function NV(e) {
                                  return 'boolean' == typeof e
                                })(a)
                                  ? (function jV(e, n, t, r) {
                                      return Ie(n).pipe(
                                        Or((o) =>
                                          hs(
                                            (function BV(e, n) {
                                              return (
                                                null !== e && n && n(new aV(e)),
                                                R(!0)
                                              )
                                            })(o.route.parent, r),
                                            (function $V(e, n) {
                                              return (
                                                null !== e && n && n(new lV(e)),
                                                R(!0)
                                              )
                                            })(o.route, r),
                                            (function HV(e, n, t) {
                                              const r = n[n.length - 1],
                                                i = n
                                                  .slice(0, n.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function SV(e) {
                                                      const n = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null
                                                      return n && 0 !== n.length
                                                        ? { node: e, guards: n }
                                                        : null
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    Wu(() =>
                                                      R(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              Ms(s.node) ?? t,
                                                            c = zo(u, l)
                                                          return tr(
                                                            (function xV(e) {
                                                              return (
                                                                e &&
                                                                Ts(
                                                                  e.canActivateChild
                                                                )
                                                              )
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(Nr())
                                                        })
                                                      ).pipe(qo())
                                                    )
                                                  )
                                              return R(i).pipe(qo())
                                            })(e, o.path, t),
                                            (function UV(e, n, t) {
                                              const r = n.routeConfig
                                                ? n.routeConfig.canActivate
                                                : null
                                              if (!r || 0 === r.length)
                                                return R(!0)
                                              const o = r.map((i) =>
                                                Wu(() => {
                                                  const s = Ms(n) ?? t,
                                                    a = zo(i, s)
                                                  return tr(
                                                    (function RV(e) {
                                                      return (
                                                        e && Ts(e.canActivate)
                                                      )
                                                    })(a)
                                                      ? a.canActivate(n, e)
                                                      : s.runInContext(() =>
                                                          a(n, e)
                                                        )
                                                  ).pipe(Nr())
                                                })
                                              )
                                              return R(o).pipe(qo())
                                            })(e, o.route, t)
                                          )
                                        ),
                                        Nr((o) => !0 !== o, !0)
                                      )
                                    })(r, i, e, n)
                                  : R(a)
                              ),
                              W((a) => ({ ...t, guardsResult: a }))
                            )
                      })
                    })(this.environmentInjector, (u) => this.events.next(u)),
                    Ye((u) => {
                      if (
                        ((i.guardsResult = u.guardsResult), xr(u.guardsResult))
                      )
                        throw Yb(0, u.guardsResult)
                      const l = new nV(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot,
                        !!u.guardsResult
                      )
                      this.events.next(l)
                    }),
                    An(
                      (u) =>
                        !!u.guardsResult ||
                        (this.cancelNavigationTransition(u, '', 3), !1)
                    ),
                    jh((u) => {
                      if (u.guards.canActivateChecks.length)
                        return R(u).pipe(
                          Ye((l) => {
                            const c = new rV(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects),
                              l.targetSnapshot
                            )
                            this.events.next(c)
                          }),
                          yt((l) => {
                            let c = !1
                            return R(l).pipe(
                              (function u2(e, n) {
                                return ke((t) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = t
                                  if (!o.length) return R(t)
                                  let i = 0
                                  return Ie(o).pipe(
                                    Or((s) =>
                                      (function l2(e, n, t, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve
                                        return (
                                          void 0 !== o?.title &&
                                            !uE(o) &&
                                            (i[gs] = o.title),
                                          (function c2(e, n, t, r) {
                                            const o = (function d2(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ]
                                            })(e)
                                            if (0 === o.length) return R({})
                                            const i = {}
                                            return Ie(o).pipe(
                                              ke((s) =>
                                                (function f2(e, n, t, r) {
                                                  const o = Ms(n) ?? r,
                                                    i = zo(e, o)
                                                  return tr(
                                                    i.resolve
                                                      ? i.resolve(n, t)
                                                      : o.runInContext(() =>
                                                          i(n, t)
                                                        )
                                                  )
                                                })(e[s], n, t, r).pipe(
                                                  Nr(),
                                                  Ye((a) => {
                                                    i[s] = a
                                                  })
                                                )
                                              ),
                                              wh(1),
                                              (function ML(e) {
                                                return W(() => e)
                                              })(i),
                                              Nn((s) => (eE(s) ? Tt : ps(s)))
                                            )
                                          })(i, e, n, r).pipe(
                                            W(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = zb(e, t).resolve),
                                                o &&
                                                  uE(o) &&
                                                  (e.data[gs] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        )
                                      })(s.route, r, e, n)
                                    ),
                                    Ye(() => i++),
                                    wh(1),
                                    ke((s) => (i === o.length ? R(t) : Tt))
                                  )
                                })
                              })(
                                t.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Ye({
                                next: () => (c = !0),
                                complete: () => {
                                  c || this.cancelNavigationTransition(l, '', 2)
                                },
                              })
                            )
                          }),
                          Ye((l) => {
                            const c = new oV(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects),
                              l.targetSnapshot
                            )
                            this.events.next(c)
                          })
                        )
                    }),
                    jh((u) => {
                      const l = (c) => {
                        const d = []
                        c.routeConfig?.loadComponent &&
                          !c.routeConfig._loadedComponent &&
                          d.push(
                            this.configLoader.loadComponent(c.routeConfig).pipe(
                              Ye((f) => {
                                c.component = f
                              }),
                              W(() => {})
                            )
                          )
                        for (const f of c.children) d.push(...l(f))
                        return d
                      }
                      return Dh(l(u.targetSnapshot.root)).pipe(Zu(), un(1))
                    }),
                    jh(() => this.afterPreactivation()),
                    W((u) => {
                      const l = (function gV(e, n, t) {
                        const r = Es(e, n._root, t ? t._root : void 0)
                        return new Hb(r, n)
                      })(
                        t.routeReuseStrategy,
                        u.targetSnapshot,
                        u.currentRouterState
                      )
                      return (
                        (this.currentTransition = i =
                          { ...u, targetRouterState: l }),
                        i
                      )
                    }),
                    Ye(() => {
                      this.events.next(new Th())
                    }),
                    ((e, n, t, r) =>
                      W(
                        (o) => (
                          new MV(
                            n,
                            o.targetRouterState,
                            o.currentRouterState,
                            t,
                            r
                          ).activate(e),
                          o
                        )
                      ))(
                      this.rootContexts,
                      t.routeReuseStrategy,
                      (u) => this.events.next(u),
                      this.inputBindingEnabled
                    ),
                    un(1),
                    Ye({
                      next: (u) => {
                        ;(s = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new nr(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              this.urlSerializer.serialize(u.urlAfterRedirects)
                            )
                          ),
                          t.titleStrategy?.updateTitle(
                            u.targetRouterState.snapshot
                          ),
                          u.resolve(!0)
                      },
                      complete: () => {
                        s = !0
                      },
                    }),
                    (function IL(e) {
                      return Me((n, t) => {
                        vt(e).subscribe(we(t, () => t.complete(), wl)),
                          !t.closed && n.subscribe(t)
                      })
                    })(
                      this.transitionAbortSubject.pipe(
                        Ye((u) => {
                          throw u
                        })
                      )
                    ),
                    $o(() => {
                      s || a || this.cancelNavigationTransition(i, '', 1),
                        this.currentNavigation?.id === i.id &&
                          (this.currentNavigation = null)
                    }),
                    Nn((u) => {
                      if (((a = !0), Xb(u)))
                        this.events.next(
                          new ws(
                            i.id,
                            this.urlSerializer.serialize(i.extractedUrl),
                            u.message,
                            u.cancellationCode
                          )
                        ),
                          (function yV(e) {
                            return Xb(e) && xr(e.url)
                          })(u)
                            ? this.events.next(new Ah(u.url))
                            : i.resolve(!1)
                      else {
                        this.events.next(
                          new nl(
                            i.id,
                            this.urlSerializer.serialize(i.extractedUrl),
                            u,
                            i.targetSnapshot ?? void 0
                          )
                        )
                        try {
                          i.resolve(t.errorHandler(u))
                        } catch (l) {
                          i.reject(l)
                        }
                      }
                      return Tt
                    })
                  )
                })
              )
            )
          }
          cancelNavigationTransition(t, r, o) {
            const i = new ws(
              t.id,
              this.urlSerializer.serialize(t.extractedUrl),
              r,
              o
            )
            this.events.next(i), t.resolve(!1)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      function cE(e) {
        return e !== Cs
      }
      let dE = (() => {
          class e {
            buildTitle(t) {
              let r,
                o = t.root
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === U))
              return r
            }
            getResolvedTitleForRoute(t) {
              return t.data[gs]
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: function () {
                return T(g2)
              },
              providedIn: 'root',
            }))
          }
          return e
        })(),
        g2 = (() => {
          class e extends dE {
            constructor(t) {
              super(), (this.title = t)
            }
            updateTitle(t) {
              const r = this.buildTitle(t)
              void 0 !== r && this.title.setTitle(r)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(iw))
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })(),
        m2 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: function () {
                return T(y2)
              },
              providedIn: 'root',
            }))
          }
          return e
        })()
      class v2 {
        shouldDetach(n) {
          return !1
        }
        store(n, t) {}
        shouldAttach(n) {
          return !1
        }
        retrieve(n) {
          return null
        }
        shouldReuseRoute(n, t) {
          return n.routeConfig === t.routeConfig
        }
      }
      let y2 = (() => {
        class e extends v2 {
          static #e = (this.ɵfac = (function () {
            let t
            return function (o) {
              return (t || (t = be(e)))(o || e)
            }
          })())
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      const dl = new S('', { providedIn: 'root', factory: () => ({}) })
      let _2 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: function () {
                return T(D2)
              },
              providedIn: 'root',
            }))
          }
          return e
        })(),
        D2 = (() => {
          class e {
            shouldProcessUrl(t) {
              return !0
            }
            extract(t) {
              return t
            }
            merge(t, r) {
              return t
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })()
      var As = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = 'COMPLETE'),
          (e[(e.FAILED = 1)] = 'FAILED'),
          (e[(e.REDIRECTING = 2)] = 'REDIRECTING'),
          e
        )
      })(As || {})
      function fE(e, n) {
        e.events
          .pipe(
            An(
              (t) =>
                t instanceof nr ||
                t instanceof ws ||
                t instanceof nl ||
                t instanceof Ho
            ),
            W((t) =>
              t instanceof nr || t instanceof Ho
                ? As.COMPLETE
                : t instanceof ws && (0 === t.code || 1 === t.code)
                  ? As.REDIRECTING
                  : As.FAILED
            ),
            An((t) => t !== As.REDIRECTING),
            un(1)
          )
          .subscribe(() => {
            n()
          })
      }
      function C2(e) {
        throw e
      }
      function w2(e, n, t) {
        return n.parse('/')
      }
      const b2 = {
          paths: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'exact',
        },
        E2 = {
          paths: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'subset',
        }
      let Pe = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId
          }
          get browserPageId() {
            return 'computed' !== this.canceledNavigationResolution
              ? this.currentPageId
              : (this.location.getState()?.ɵrouterPageId ?? this.currentPageId)
          }
          get events() {
            return this._events
          }
          constructor() {
            ;(this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = T(kD)),
              (this.isNgZoneEnabled = !1),
              (this._events = new ut()),
              (this.options = T(dl, { optional: !0 }) || {}),
              (this.pendingTasks = T(lu)),
              (this.errorHandler = this.options.errorHandler || C2),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || w2),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = T(_2)),
              (this.routeReuseStrategy = T(m2)),
              (this.titleStrategy = T(dE)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || 'ignore'),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || 'emptyOnly'),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || 'deferred'),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || 'replace'),
              (this.config = T(Zo, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = T(cl)),
              (this.urlSerializer = T(vs)),
              (this.location = T(Of)),
              (this.componentInputBindingEnabled = !!T(il, { optional: !0 })),
              (this.eventsSubscription = new at()),
              (this.isNgZoneEnabled =
                T(ce) instanceof ce && ce.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new Uo()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Gb(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  (t) => {
                    ;(this.lastSuccessfulId = t.id),
                      (this.currentPageId = this.browserPageId)
                  },
                  (t) => {
                    this.console.warn(`Unhandled Navigation Error: ${t}`)
                  }
                ),
              this.subscribeToNavigationEvents()
          }
          subscribeToNavigationEvents() {
            const t = this.navigationTransitions.events.subscribe((r) => {
              try {
                const { currentTransition: o } = this.navigationTransitions
                if (null === o) return void (hE(r) && this._events.next(r))
                if (r instanceof tl)
                  cE(o.source) && (this.browserUrlTree = o.extractedUrl)
                else if (r instanceof Ho) this.rawUrlTree = o.rawUrl
                else if (r instanceof $b) {
                  if ('eager' === this.urlUpdateStrategy) {
                    if (!o.extras.skipLocationChange) {
                      const i = this.urlHandlingStrategy.merge(
                        o.urlAfterRedirects,
                        o.rawUrl
                      )
                      this.setBrowserUrl(i, o)
                    }
                    this.browserUrlTree = o.urlAfterRedirects
                  }
                } else if (r instanceof Th)
                  (this.currentUrlTree = o.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      o.urlAfterRedirects,
                      o.rawUrl
                    )),
                    (this.routerState = o.targetRouterState),
                    'deferred' === this.urlUpdateStrategy &&
                      (o.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, o),
                      (this.browserUrlTree = o.urlAfterRedirects))
                else if (r instanceof ws)
                  0 !== r.code && 1 !== r.code && (this.navigated = !0),
                    (3 === r.code || 2 === r.code) && this.restoreHistory(o)
                else if (r instanceof Ah) {
                  const i = this.urlHandlingStrategy.merge(
                      r.url,
                      o.currentRawUrl
                    ),
                    s = {
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        'eager' === this.urlUpdateStrategy || cE(o.source),
                    }
                  this.scheduleNavigation(i, Cs, null, s, {
                    resolve: o.resolve,
                    reject: o.reject,
                    promise: o.promise,
                  })
                }
                r instanceof nl && this.restoreHistory(o, !0),
                  r instanceof nr && (this.navigated = !0),
                  hE(r) && this._events.next(r)
              } catch (o) {
                this.navigationTransitions.transitionAbortSubject.next(o)
              }
            })
            this.eventsSubscription.add(t)
          }
          resetRootComponentType(t) {
            ;(this.routerState.root.component = t),
              (this.navigationTransitions.rootComponentType = t)
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const t = this.location.getState()
              this.navigateToSyncWithBrowser(this.location.path(!0), Cs, t)
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((t) => {
                const r = 'popstate' === t.type ? 'popstate' : 'hashchange'
                'popstate' === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(t.url, r, t.state)
                  }, 0)
              }))
          }
          navigateToSyncWithBrowser(t, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null
            if (o) {
              const u = { ...o }
              delete u.navigationId,
                delete u.ɵrouterPageId,
                0 !== Object.keys(u).length && (i.state = u)
            }
            const a = this.parseUrl(t)
            this.scheduleNavigation(a, r, s, i)
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree)
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation
          }
          resetConfig(t) {
            ;(this.config = t.map(kh)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1)
          }
          ngOnDestroy() {
            this.dispose()
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe()
          }
          createUrlTree(t, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = u ? this.currentUrlTree.fragment : s
            let d,
              c = null
            switch (a) {
              case 'merge':
                c = { ...this.currentUrlTree.queryParams, ...i }
                break
              case 'preserve':
                c = this.currentUrlTree.queryParams
                break
              default:
                c = i || null
            }
            null !== c && (c = this.removeEmptyProps(c))
            try {
              d = xb(o ? o.snapshot : this.routerState.snapshot.root)
            } catch {
              ;('string' != typeof t[0] || !t[0].startsWith('/')) && (t = []),
                (d = this.currentUrlTree.root)
            }
            return Pb(d, t, c, l ?? null)
          }
          navigateByUrl(t, r = { skipLocationChange: !1 }) {
            const o = xr(t) ? t : this.parseUrl(t),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree)
            return this.scheduleNavigation(i, Cs, null, r)
          }
          navigate(t, r = { skipLocationChange: !1 }) {
            return (
              (function M2(e) {
                for (let n = 0; n < e.length; n++)
                  if (null == e[n]) throw new w(4008, !1)
              })(t),
              this.navigateByUrl(this.createUrlTree(t, r), r)
            )
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t)
          }
          parseUrl(t) {
            let r
            try {
              r = this.urlSerializer.parse(t)
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, t)
            }
            return r
          }
          isActive(t, r) {
            let o
            if (((o = !0 === r ? { ...b2 } : !1 === r ? { ...E2 } : r), xr(t)))
              return Eb(this.currentUrlTree, t, o)
            const i = this.parseUrl(t)
            return Eb(this.currentUrlTree, i, o)
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((r, o) => {
              const i = t[o]
              return null != i && (r[o] = i), r
            }, {})
          }
          scheduleNavigation(t, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1)
            let a, u, l
            s
              ? ((a = s.resolve), (u = s.reject), (l = s.promise))
              : (l = new Promise((d, f) => {
                  ;(a = d), (u = f)
                }))
            const c = this.pendingTasks.add()
            return (
              fE(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(c))
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: t,
                extras: i,
                resolve: a,
                reject: u,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            )
          }
          setBrowserUrl(t, r) {
            const o = this.urlSerializer.serialize(t)
            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              }
              this.location.replaceState(o, '', s)
            } else {
              const i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId + 1),
              }
              this.location.go(o, '', i)
            }
          }
          restoreHistory(t, r = !1) {
            if ('computed' === this.canceledNavigationResolution) {
              const i = this.currentPageId - this.browserPageId
              0 !== i
                ? this.location.historyGo(i)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === i &&
                  (this.resetState(t),
                  (this.browserUrlTree = t.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
            } else
              'replace' === this.canceledNavigationResolution &&
                (r && this.resetState(t), this.resetUrlToCurrentUrlTree())
          }
          resetState(t) {
            ;(this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                t.rawUrl
              ))
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              '',
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            )
          }
          generateNgRouterState(t, r) {
            return 'computed' === this.canceledNavigationResolution
              ? { navigationId: t, ɵrouterPageId: r }
              : { navigationId: t }
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      function hE(e) {
        return !(e instanceof Th || e instanceof Ah)
      }
      let Ns = (() => {
        class e {
          constructor(t, r, o, i, s, a) {
            ;(this.router = t),
              (this.route = r),
              (this.tabIndexAttribute = o),
              (this.renderer = i),
              (this.el = s),
              (this.locationStrategy = a),
              (this.href = null),
              (this.commands = null),
              (this.onChanges = new ut()),
              (this.preserveFragment = !1),
              (this.skipLocationChange = !1),
              (this.replaceUrl = !1)
            const u = s.nativeElement.tagName?.toLowerCase()
            ;(this.isAnchorElement = 'a' === u || 'area' === u),
              this.isAnchorElement
                ? (this.subscription = t.events.subscribe((l) => {
                    l instanceof nr && this.updateHref()
                  }))
                : this.setTabIndexIfNotOnNativeEl('0')
          }
          setTabIndexIfNotOnNativeEl(t) {
            null != this.tabIndexAttribute ||
              this.isAnchorElement ||
              this.applyAttributeValue('tabindex', t)
          }
          ngOnChanges(t) {
            this.isAnchorElement && this.updateHref(), this.onChanges.next(this)
          }
          set routerLink(t) {
            null != t
              ? ((this.commands = Array.isArray(t) ? t : [t]),
                this.setTabIndexIfNotOnNativeEl('0'))
              : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null))
          }
          onClick(t, r, o, i, s) {
            return (
              !!(
                null === this.urlTree ||
                (this.isAnchorElement &&
                  (0 !== t ||
                    r ||
                    o ||
                    i ||
                    s ||
                    ('string' == typeof this.target && '_self' != this.target)))
              ) ||
              (this.router.navigateByUrl(this.urlTree, {
                skipLocationChange: this.skipLocationChange,
                replaceUrl: this.replaceUrl,
                state: this.state,
              }),
              !this.isAnchorElement)
            )
          }
          ngOnDestroy() {
            this.subscription?.unsubscribe()
          }
          updateHref() {
            this.href =
              null !== this.urlTree && this.locationStrategy
                ? this.locationStrategy?.prepareExternalUrl(
                    this.router.serializeUrl(this.urlTree)
                  )
                : null
            const t =
              null === this.href
                ? null
                : (function zm(e, n, t) {
                    return (function vT(e, n) {
                      return ('src' === n &&
                        ('embed' === e ||
                          'frame' === e ||
                          'iframe' === e ||
                          'media' === e ||
                          'script' === e)) ||
                        ('href' === n && ('base' === e || 'link' === e))
                        ? Gc
                        : Si
                    })(
                      n,
                      t
                    )(e)
                  })(
                    this.href,
                    this.el.nativeElement.tagName.toLowerCase(),
                    'href'
                  )
            this.applyAttributeValue('href', t)
          }
          applyAttributeValue(t, r) {
            const o = this.renderer,
              i = this.el.nativeElement
            null !== r ? o.setAttribute(i, t, r) : o.removeAttribute(i, t)
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: this.preserveFragment,
                })
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              v(Pe),
              v(Rn),
              (function ua(e) {
                return (function RS(e, n) {
                  if ('class' === n) return e.classes
                  if ('style' === n) return e.styles
                  const t = e.attrs
                  if (t) {
                    const r = t.length
                    let o = 0
                    for (; o < r; ) {
                      const i = t[o]
                      if (jp(i)) break
                      if (0 === i) o += 2
                      else if ('number' == typeof i)
                        for (o++; o < r && 'string' == typeof t[o]; ) o++
                      else {
                        if (i === n) return t[o + 1]
                        o += 2
                      }
                    }
                  }
                  return null
                })(Ue(), e)
              })('tabindex'),
              v(_n),
              v(Mt),
              v(br)
            )
          })
          static #t = (this.ɵdir = L({
            type: e,
            selectors: [['', 'routerLink', '']],
            hostVars: 1,
            hostBindings: function (r, o) {
              1 & r &&
                X('click', function (s) {
                  return o.onClick(
                    s.button,
                    s.ctrlKey,
                    s.shiftKey,
                    s.altKey,
                    s.metaKey
                  )
                }),
                2 & r && rn('target', o.target)
            },
            inputs: {
              target: 'target',
              queryParams: 'queryParams',
              fragment: 'fragment',
              queryParamsHandling: 'queryParamsHandling',
              state: 'state',
              relativeTo: 'relativeTo',
              preserveFragment: ['preserveFragment', 'preserveFragment', xo],
              skipLocationChange: [
                'skipLocationChange',
                'skipLocationChange',
                xo,
              ],
              replaceUrl: ['replaceUrl', 'replaceUrl', xo],
              routerLink: 'routerLink',
            },
            standalone: !0,
            features: [oy, Ot],
          }))
        }
        return e
      })()
      class pE {}
      let T2 = (() => {
        class e {
          constructor(t, r, o, i, s) {
            ;(this.router = t),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s)
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                An((t) => t instanceof nr),
                Or(() => this.preload())
              )
              .subscribe(() => {})
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config)
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe()
          }
          processRoutes(t, r) {
            const o = []
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = Xd(i.providers, t, `Route: ${i.path}`))
              const s = i._injector ?? t,
                a = i._loadedInjector ?? s
              ;((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes))
            }
            return Ie(o).pipe(kr())
          }
          preloadConfig(t, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(t, r)
                  : R(null)
              const i = o.pipe(
                ke((s) =>
                  null === s
                    ? R(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? t, s.routes))
                )
              )
              return r.loadComponent && !r._loadedComponent
                ? Ie([i, this.loader.loadComponent(r)]).pipe(kr())
                : i
            })
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(Pe), M(LD), M(Et), M(pE), M($h))
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      const Bh = new S('')
      let gE = (() => {
        class e {
          constructor(t, r, o, i, s = {}) {
            ;(this.urlSerializer = t),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = 'imperative'),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || 'disabled'),
              (s.anchorScrolling = s.anchorScrolling || 'disabled')
          }
          init() {
            'disabled' !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration('manual'),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents())
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof tl
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = t.navigationTrigger),
                  (this.restoredId = t.restoredState
                    ? t.restoredState.navigationId
                    : 0))
                : t instanceof nr
                  ? ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.urlSerializer.parse(t.urlAfterRedirects).fragment
                    ))
                  : t instanceof Ho &&
                    0 === t.code &&
                    ((this.lastSource = void 0),
                    (this.restoredId = 0),
                    this.scheduleScrollEvent(
                      t,
                      this.urlSerializer.parse(t.url).fragment
                    ))
            })
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof Bb &&
                (t.position
                  ? 'top' === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : 'enabled' === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(t.position)
                  : t.anchor && 'enabled' === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : 'disabled' !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]))
            })
          }
          scheduleScrollEvent(t, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Bb(
                      t,
                      'popstate' === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  )
                })
              }, 0)
            })
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe()
          }
          static #e = (this.ɵfac = function (r) {
            !(function Ov() {
              throw new Error('invalid')
            })()
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      function xn(e, n) {
        return { ɵkind: e, ɵproviders: n }
      }
      function vE() {
        const e = T(pt)
        return (n) => {
          const t = e.get(Ro)
          if (n !== t.components[0]) return
          const r = e.get(Pe),
            o = e.get(yE)
          1 === e.get(Uh) && r.initialNavigation(),
            e.get(_E, null, G.Optional)?.setUpPreloading(),
            e.get(Bh, null, G.Optional)?.init(),
            r.resetRootComponentType(t.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe())
        }
      }
      const yE = new S('', { factory: () => new ut() }),
        Uh = new S('', { providedIn: 'root', factory: () => 1 }),
        _E = new S('')
      function R2(e) {
        return xn(0, [
          { provide: _E, useExisting: T2 },
          { provide: pE, useExisting: e },
        ])
      }
      const DE = new S('ROUTER_FORROOT_GUARD'),
        P2 = [
          Of,
          { provide: vs, useClass: bh },
          Pe,
          bs,
          {
            provide: Rn,
            useFactory: function mE(e) {
              return e.routerState.root
            },
            deps: [Pe],
          },
          $h,
          [],
        ]
      function F2() {
        return new GD('Router', Pe)
      }
      let Hh = (() => {
        class e {
          constructor(t) {}
          static forRoot(t, r) {
            return {
              ngModule: e,
              providers: [
                P2,
                [],
                { provide: Zo, multi: !0, useValue: t },
                {
                  provide: DE,
                  useFactory: j2,
                  deps: [[Pe, new da(), new fa()]],
                },
                { provide: dl, useValue: r || {} },
                r?.useHash
                  ? { provide: br, useClass: iP }
                  : { provide: br, useClass: DC },
                {
                  provide: Bh,
                  useFactory: () => {
                    const e = T(CF),
                      n = T(ce),
                      t = T(dl),
                      r = T(cl),
                      o = T(vs)
                    return (
                      t.scrollOffset && e.setOffset(t.scrollOffset),
                      new gE(o, r, e, n, t)
                    )
                  },
                },
                r?.preloadingStrategy
                  ? R2(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: GD, multi: !0, useFactory: F2 },
                r?.initialNavigation ? $2(r) : [],
                r?.bindToComponentInputs
                  ? xn(8, [Zb, { provide: il, useExisting: Zb }]).ɵproviders
                  : [],
                [
                  { provide: CE, useFactory: vE },
                  { provide: Cf, multi: !0, useExisting: CE },
                ],
              ],
            }
          }
          static forChild(t) {
            return {
              ngModule: e,
              providers: [{ provide: Zo, multi: !0, useValue: t }],
            }
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(DE, 8))
          })
          static #t = (this.ɵmod = Ve({ type: e }))
          static #n = (this.ɵinj = Oe({}))
        }
        return e
      })()
      function j2(e) {
        return 'guarded'
      }
      function $2(e) {
        return [
          'disabled' === e.initialNavigation
            ? xn(3, [
                {
                  provide: hf,
                  multi: !0,
                  useFactory: () => {
                    const n = T(Pe)
                    return () => {
                      n.setUpLocationChangeListener()
                    }
                  },
                },
                { provide: Uh, useValue: 2 },
              ]).ɵproviders
            : [],
          'enabledBlocking' === e.initialNavigation
            ? xn(2, [
                { provide: Uh, useValue: 0 },
                {
                  provide: hf,
                  multi: !0,
                  deps: [pt],
                  useFactory: (n) => {
                    const t = n.get(rP, Promise.resolve())
                    return () =>
                      t.then(
                        () =>
                          new Promise((r) => {
                            const o = n.get(Pe),
                              i = n.get(yE)
                            fE(o, () => {
                              r(!0)
                            }),
                              (n.get(cl).afterPreactivation = () => (
                                r(!0), i.closed ? R(void 0) : i
                              )),
                              o.initialNavigation()
                          })
                      )
                  },
                },
              ]).ɵproviders
            : [],
        ]
      }
      const CE = new S('')
      class fl {}
      class hl {}
      class Qe {
        constructor(n) {
          ;(this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            n
              ? 'string' == typeof n
                ? (this.lazyInit = () => {
                    ;(this.headers = new Map()),
                      n.split('\n').forEach((t) => {
                        const r = t.indexOf(':')
                        if (r > 0) {
                          const o = t.slice(0, r),
                            i = o.toLowerCase(),
                            s = t.slice(r + 1).trim()
                          this.maybeSetNormalizedName(o, i),
                            this.headers.has(i)
                              ? this.headers.get(i).push(s)
                              : this.headers.set(i, [s])
                        }
                      })
                  })
                : typeof Headers < 'u' && n instanceof Headers
                  ? ((this.headers = new Map()),
                    n.forEach((t, r) => {
                      this.setHeaderEntries(r, t)
                    }))
                  : (this.lazyInit = () => {
                      ;(this.headers = new Map()),
                        Object.entries(n).forEach(([t, r]) => {
                          this.setHeaderEntries(t, r)
                        })
                    })
              : (this.headers = new Map())
        }
        has(n) {
          return this.init(), this.headers.has(n.toLowerCase())
        }
        get(n) {
          this.init()
          const t = this.headers.get(n.toLowerCase())
          return t && t.length > 0 ? t[0] : null
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values())
        }
        getAll(n) {
          return this.init(), this.headers.get(n.toLowerCase()) || null
        }
        append(n, t) {
          return this.clone({ name: n, value: t, op: 'a' })
        }
        set(n, t) {
          return this.clone({ name: n, value: t, op: 's' })
        }
        delete(n, t) {
          return this.clone({ name: n, value: t, op: 'd' })
        }
        maybeSetNormalizedName(n, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, n)
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Qe
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((n) => this.applyUpdate(n)),
              (this.lazyUpdate = null)))
        }
        copyFrom(n) {
          n.init(),
            Array.from(n.headers.keys()).forEach((t) => {
              this.headers.set(t, n.headers.get(t)),
                this.normalizedNames.set(t, n.normalizedNames.get(t))
            })
        }
        clone(n) {
          const t = new Qe()
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof Qe
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
            t
          )
        }
        applyUpdate(n) {
          const t = n.name.toLowerCase()
          switch (n.op) {
            case 'a':
            case 's':
              let r = n.value
              if (('string' == typeof r && (r = [r]), 0 === r.length)) return
              this.maybeSetNormalizedName(n.name, t)
              const o = ('a' === n.op ? this.headers.get(t) : void 0) || []
              o.push(...r), this.headers.set(t, o)
              break
            case 'd':
              const i = n.value
              if (i) {
                let s = this.headers.get(t)
                if (!s) return
                ;(s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, s)
              } else this.headers.delete(t), this.normalizedNames.delete(t)
          }
        }
        setHeaderEntries(n, t) {
          const r = (Array.isArray(t) ? t : [t]).map((i) => i.toString()),
            o = n.toLowerCase()
          this.headers.set(o, r), this.maybeSetNormalizedName(n, o)
        }
        forEach(n) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              n(this.normalizedNames.get(t), this.headers.get(t))
            )
        }
      }
      class U2 {
        encodeKey(n) {
          return wE(n)
        }
        encodeValue(n) {
          return wE(n)
        }
        decodeKey(n) {
          return decodeURIComponent(n)
        }
        decodeValue(n) {
          return decodeURIComponent(n)
        }
      }
      const G2 = /%(\d[a-f0-9])/gi,
        z2 = {
          40: '@',
          '3A': ':',
          24: '$',
          '2C': ',',
          '3B': ';',
          '3D': '=',
          '3F': '?',
          '2F': '/',
        }
      function wE(e) {
        return encodeURIComponent(e).replace(G2, (n, t) => z2[t] ?? n)
      }
      function pl(e) {
        return `${e}`
      }
      class Pn {
        constructor(n = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = n.encoder || new U2()),
            n.fromString)
          ) {
            if (n.fromObject)
              throw new Error('Cannot specify both fromString and fromObject.')
            this.map = (function H2(e, n) {
              const t = new Map()
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((o) => {
                      const i = o.indexOf('='),
                        [s, a] =
                          -1 == i
                            ? [n.decodeKey(o), '']
                            : [
                                n.decodeKey(o.slice(0, i)),
                                n.decodeValue(o.slice(i + 1)),
                              ],
                        u = t.get(s) || []
                      u.push(a), t.set(s, u)
                    }),
                t
              )
            })(n.fromString, this.encoder)
          } else
            n.fromObject
              ? ((this.map = new Map()),
                Object.keys(n.fromObject).forEach((t) => {
                  const r = n.fromObject[t],
                    o = Array.isArray(r) ? r.map(pl) : [pl(r)]
                  this.map.set(t, o)
                }))
              : (this.map = null)
        }
        has(n) {
          return this.init(), this.map.has(n)
        }
        get(n) {
          this.init()
          const t = this.map.get(n)
          return t ? t[0] : null
        }
        getAll(n) {
          return this.init(), this.map.get(n) || null
        }
        keys() {
          return this.init(), Array.from(this.map.keys())
        }
        append(n, t) {
          return this.clone({ param: n, value: t, op: 'a' })
        }
        appendAll(n) {
          const t = []
          return (
            Object.keys(n).forEach((r) => {
              const o = n[r]
              Array.isArray(o)
                ? o.forEach((i) => {
                    t.push({ param: r, value: i, op: 'a' })
                  })
                : t.push({ param: r, value: o, op: 'a' })
            }),
            this.clone(t)
          )
        }
        set(n, t) {
          return this.clone({ param: n, value: t, op: 's' })
        }
        delete(n, t) {
          return this.clone({ param: n, value: t, op: 'd' })
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((n) => {
                const t = this.encoder.encodeKey(n)
                return this.map
                  .get(n)
                  .map((r) => t + '=' + this.encoder.encodeValue(r))
                  .join('&')
              })
              .filter((n) => '' !== n)
              .join('&')
          )
        }
        clone(n) {
          const t = new Pn({ encoder: this.encoder })
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(n)),
            t
          )
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
              this.updates.forEach((n) => {
                switch (n.op) {
                  case 'a':
                  case 's':
                    const t =
                      ('a' === n.op ? this.map.get(n.param) : void 0) || []
                    t.push(pl(n.value)), this.map.set(n.param, t)
                    break
                  case 'd':
                    if (void 0 === n.value) {
                      this.map.delete(n.param)
                      break
                    }
                    {
                      let r = this.map.get(n.param) || []
                      const o = r.indexOf(pl(n.value))
                      ;-1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(n.param, r)
                          : this.map.delete(n.param)
                    }
                }
              }),
              (this.cloneFrom = this.updates = null))
        }
      }
      class q2 {
        constructor() {
          this.map = new Map()
        }
        set(n, t) {
          return this.map.set(n, t), this
        }
        get(n) {
          return (
            this.map.has(n) || this.map.set(n, n.defaultValue()),
            this.map.get(n)
          )
        }
        delete(n) {
          return this.map.delete(n), this
        }
        has(n) {
          return this.map.has(n)
        }
        keys() {
          return this.map.keys()
        }
      }
      function bE(e) {
        return typeof ArrayBuffer < 'u' && e instanceof ArrayBuffer
      }
      function EE(e) {
        return typeof Blob < 'u' && e instanceof Blob
      }
      function ME(e) {
        return typeof FormData < 'u' && e instanceof FormData
      }
      class Os {
        constructor(n, t, r, o) {
          let i
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = n.toUpperCase()),
            (function W2(e) {
              switch (e) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1
                default:
                  return !0
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new Qe()),
            this.context || (this.context = new q2()),
            this.params)
          ) {
            const s = this.params.toString()
            if (0 === s.length) this.urlWithParams = t
            else {
              const a = t.indexOf('?')
              this.urlWithParams =
                t + (-1 === a ? '?' : a < t.length - 1 ? '&' : '') + s
            }
          } else (this.params = new Pn()), (this.urlWithParams = t)
        }
        serializeBody() {
          return null === this.body
            ? null
            : bE(this.body) ||
                EE(this.body) ||
                ME(this.body) ||
                (function Z2(e) {
                  return (
                    typeof URLSearchParams < 'u' && e instanceof URLSearchParams
                  )
                })(this.body) ||
                'string' == typeof this.body
              ? this.body
              : this.body instanceof Pn
                ? this.body.toString()
                : 'object' == typeof this.body ||
                    'boolean' == typeof this.body ||
                    Array.isArray(this.body)
                  ? JSON.stringify(this.body)
                  : this.body.toString()
        }
        detectContentTypeHeader() {
          return null === this.body || ME(this.body)
            ? null
            : EE(this.body)
              ? this.body.type || null
              : bE(this.body)
                ? null
                : 'string' == typeof this.body
                  ? 'text/plain'
                  : this.body instanceof Pn
                    ? 'application/x-www-form-urlencoded;charset=UTF-8'
                    : 'object' == typeof this.body ||
                        'number' == typeof this.body ||
                        'boolean' == typeof this.body
                      ? 'application/json'
                      : null
        }
        clone(n = {}) {
          const t = n.method || this.method,
            r = n.url || this.url,
            o = n.responseType || this.responseType,
            i = void 0 !== n.body ? n.body : this.body,
            s =
              void 0 !== n.withCredentials
                ? n.withCredentials
                : this.withCredentials,
            a =
              void 0 !== n.reportProgress
                ? n.reportProgress
                : this.reportProgress
          let u = n.headers || this.headers,
            l = n.params || this.params
          const c = n.context ?? this.context
          return (
            void 0 !== n.setHeaders &&
              (u = Object.keys(n.setHeaders).reduce(
                (d, f) => d.set(f, n.setHeaders[f]),
                u
              )),
            n.setParams &&
              (l = Object.keys(n.setParams).reduce(
                (d, f) => d.set(f, n.setParams[f]),
                l
              )),
            new Os(t, r, i, {
              params: l,
              headers: u,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          )
        }
      }
      var Yo = (function (e) {
        return (
          (e[(e.Sent = 0)] = 'Sent'),
          (e[(e.UploadProgress = 1)] = 'UploadProgress'),
          (e[(e.ResponseHeader = 2)] = 'ResponseHeader'),
          (e[(e.DownloadProgress = 3)] = 'DownloadProgress'),
          (e[(e.Response = 4)] = 'Response'),
          (e[(e.User = 5)] = 'User'),
          e
        )
      })(Yo || {})
      class Gh {
        constructor(n, t = 200, r = 'OK') {
          ;(this.headers = n.headers || new Qe()),
            (this.status = void 0 !== n.status ? n.status : t),
            (this.statusText = n.statusText || r),
            (this.url = n.url || null),
            (this.ok = this.status >= 200 && this.status < 300)
        }
      }
      class zh extends Gh {
        constructor(n = {}) {
          super(n), (this.type = Yo.ResponseHeader)
        }
        clone(n = {}) {
          return new zh({
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          })
        }
      }
      class Qo extends Gh {
        constructor(n = {}) {
          super(n),
            (this.type = Yo.Response),
            (this.body = void 0 !== n.body ? n.body : null)
        }
        clone(n = {}) {
          return new Qo({
            body: void 0 !== n.body ? n.body : this.body,
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          })
        }
      }
      class IE extends Gh {
        constructor(n) {
          super(n, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${n.url || '(unknown url)'}`
                : `Http failure response for ${n.url || '(unknown url)'}: ${n.status} ${n.statusText}`),
            (this.error = n.error || null)
        }
      }
      function qh(e, n) {
        return {
          body: n,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        }
      }
      let Xo = (() => {
        class e {
          constructor(t) {
            this.handler = t
          }
          request(t, r, o = {}) {
            let i
            if (t instanceof Os) i = t
            else {
              let u, l
              ;(u = o.headers instanceof Qe ? o.headers : new Qe(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof Pn
                      ? o.params
                      : new Pn({ fromObject: o.params })),
                (i = new Os(t, r, void 0 !== o.body ? o.body : null, {
                  headers: u,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || 'json',
                  withCredentials: o.withCredentials,
                }))
            }
            const s = R(i).pipe(Or((u) => this.handler.handle(u)))
            if (t instanceof Os || 'events' === o.observe) return s
            const a = s.pipe(An((u) => u instanceof Qo))
            switch (o.observe || 'body') {
              case 'body':
                switch (i.responseType) {
                  case 'arraybuffer':
                    return a.pipe(
                      W((u) => {
                        if (null !== u.body && !(u.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.')
                        return u.body
                      })
                    )
                  case 'blob':
                    return a.pipe(
                      W((u) => {
                        if (null !== u.body && !(u.body instanceof Blob))
                          throw new Error('Response is not a Blob.')
                        return u.body
                      })
                    )
                  case 'text':
                    return a.pipe(
                      W((u) => {
                        if (null !== u.body && 'string' != typeof u.body)
                          throw new Error('Response is not a string.')
                        return u.body
                      })
                    )
                  default:
                    return a.pipe(W((u) => u.body))
                }
              case 'response':
                return a
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                )
            }
          }
          delete(t, r = {}) {
            return this.request('DELETE', t, r)
          }
          get(t, r = {}) {
            return this.request('GET', t, r)
          }
          head(t, r = {}) {
            return this.request('HEAD', t, r)
          }
          jsonp(t, r) {
            return this.request('JSONP', t, {
              params: new Pn().append(r, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            })
          }
          options(t, r = {}) {
            return this.request('OPTIONS', t, r)
          }
          patch(t, r, o = {}) {
            return this.request('PATCH', t, qh(o, r))
          }
          post(t, r, o = {}) {
            return this.request('POST', t, qh(o, r))
          }
          put(t, r, o = {}) {
            return this.request('PUT', t, qh(o, r))
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(fl))
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      function AE(e, n) {
        return n(e)
      }
      function Q2(e, n) {
        return (t, r) => n.intercept(t, { handle: (o) => e(o, r) })
      }
      const NE = new S(''),
        Rs = new S(''),
        OE = new S('')
      function J2() {
        let e = null
        return (n, t) => {
          null === e &&
            (e = (T(NE, { optional: !0 }) ?? []).reduceRight(Q2, AE))
          const r = T(lu),
            o = r.add()
          return e(n, t).pipe($o(() => r.remove(o)))
        }
      }
      let RE = (() => {
        class e extends fl {
          constructor(t, r) {
            super(),
              (this.backend = t),
              (this.injector = r),
              (this.chain = null),
              (this.pendingTasks = T(lu))
          }
          handle(t) {
            if (null === this.chain) {
              const o = Array.from(
                new Set([
                  ...this.injector.get(Rs),
                  ...this.injector.get(OE, []),
                ])
              )
              this.chain = o.reduceRight(
                (i, s) =>
                  (function X2(e, n, t) {
                    return (r, o) => t.runInContext(() => n(r, (i) => e(i, o)))
                  })(i, s, this.injector),
                AE
              )
            }
            const r = this.pendingTasks.add()
            return this.chain(t, (o) => this.backend.handle(o)).pipe(
              $o(() => this.pendingTasks.remove(r))
            )
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(hl), M(Et))
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      const nj = /^\)\]\}',?\n/
      let PE = (() => {
        class e {
          constructor(t) {
            this.xhrFactory = t
          }
          handle(t) {
            if ('JSONP' === t.method) throw new w(-2800, !1)
            const r = this.xhrFactory
            return (r.ɵloadImpl ? Ie(r.ɵloadImpl()) : R(null)).pipe(
              yt(
                () =>
                  new he((i) => {
                    const s = r.build()
                    if (
                      (s.open(t.method, t.urlWithParams),
                      t.withCredentials && (s.withCredentials = !0),
                      t.headers.forEach((g, y) =>
                        s.setRequestHeader(g, y.join(','))
                      ),
                      t.headers.has('Accept') ||
                        s.setRequestHeader(
                          'Accept',
                          'application/json, text/plain, */*'
                        ),
                      !t.headers.has('Content-Type'))
                    ) {
                      const g = t.detectContentTypeHeader()
                      null !== g && s.setRequestHeader('Content-Type', g)
                    }
                    if (t.responseType) {
                      const g = t.responseType.toLowerCase()
                      s.responseType = 'json' !== g ? g : 'text'
                    }
                    const a = t.serializeBody()
                    let u = null
                    const l = () => {
                        if (null !== u) return u
                        const g = s.statusText || 'OK',
                          y = new Qe(s.getAllResponseHeaders()),
                          b =
                            (function rj(e) {
                              return 'responseURL' in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                      e.getAllResponseHeaders()
                                    )
                                  ? e.getResponseHeader('X-Request-URL')
                                  : null
                            })(s) || t.url
                        return (
                          (u = new zh({
                            headers: y,
                            status: s.status,
                            statusText: g,
                            url: b,
                          })),
                          u
                        )
                      },
                      c = () => {
                        let {
                            headers: g,
                            status: y,
                            statusText: b,
                            url: m,
                          } = l(),
                          A = null
                        204 !== y &&
                          (A =
                            typeof s.response > 'u'
                              ? s.responseText
                              : s.response),
                          0 === y && (y = A ? 200 : 0)
                        let x = y >= 200 && y < 300
                        if ('json' === t.responseType && 'string' == typeof A) {
                          const H = A
                          A = A.replace(nj, '')
                          try {
                            A = '' !== A ? JSON.parse(A) : null
                          } catch (Fe) {
                            ;(A = H),
                              x && ((x = !1), (A = { error: Fe, text: A }))
                          }
                        }
                        x
                          ? (i.next(
                              new Qo({
                                body: A,
                                headers: g,
                                status: y,
                                statusText: b,
                                url: m || void 0,
                              })
                            ),
                            i.complete())
                          : i.error(
                              new IE({
                                error: A,
                                headers: g,
                                status: y,
                                statusText: b,
                                url: m || void 0,
                              })
                            )
                      },
                      d = (g) => {
                        const { url: y } = l(),
                          b = new IE({
                            error: g,
                            status: s.status || 0,
                            statusText: s.statusText || 'Unknown Error',
                            url: y || void 0,
                          })
                        i.error(b)
                      }
                    let f = !1
                    const h = (g) => {
                        f || (i.next(l()), (f = !0))
                        let y = { type: Yo.DownloadProgress, loaded: g.loaded }
                        g.lengthComputable && (y.total = g.total),
                          'text' === t.responseType &&
                            s.responseText &&
                            (y.partialText = s.responseText),
                          i.next(y)
                      },
                      p = (g) => {
                        let y = { type: Yo.UploadProgress, loaded: g.loaded }
                        g.lengthComputable && (y.total = g.total), i.next(y)
                      }
                    return (
                      s.addEventListener('load', c),
                      s.addEventListener('error', d),
                      s.addEventListener('timeout', d),
                      s.addEventListener('abort', d),
                      t.reportProgress &&
                        (s.addEventListener('progress', h),
                        null !== a &&
                          s.upload &&
                          s.upload.addEventListener('progress', p)),
                      s.send(a),
                      i.next({ type: Yo.Sent }),
                      () => {
                        s.removeEventListener('error', d),
                          s.removeEventListener('abort', d),
                          s.removeEventListener('load', c),
                          s.removeEventListener('timeout', d),
                          t.reportProgress &&
                            (s.removeEventListener('progress', h),
                            null !== a &&
                              s.upload &&
                              s.upload.removeEventListener('progress', p)),
                          s.readyState !== s.DONE && s.abort()
                      }
                    )
                  })
              )
            )
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(BC))
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      const Wh = new S('XSRF_ENABLED'),
        FE = new S('XSRF_COOKIE_NAME', {
          providedIn: 'root',
          factory: () => 'XSRF-TOKEN',
        }),
        kE = new S('XSRF_HEADER_NAME', {
          providedIn: 'root',
          factory: () => 'X-XSRF-TOKEN',
        })
      class LE {}
      let sj = (() => {
        class e {
          constructor(t, r, o) {
            ;(this.doc = t),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ''),
              (this.lastToken = null),
              (this.parseCount = 0)
          }
          getToken() {
            if ('server' === this.platform) return null
            const t = this.doc.cookie || ''
            return (
              t !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = NC(t, this.cookieName)),
                (this.lastCookieString = t)),
              this.lastToken
            )
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(ot), M(gr), M(FE))
          })
          static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      function aj(e, n) {
        const t = e.url.toLowerCase()
        if (
          !T(Wh) ||
          'GET' === e.method ||
          'HEAD' === e.method ||
          t.startsWith('http://') ||
          t.startsWith('https://')
        )
          return n(e)
        const r = T(LE).getToken(),
          o = T(kE)
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          n(e)
        )
      }
      var rr = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = 'Interceptors'),
          (e[(e.LegacyInterceptors = 1)] = 'LegacyInterceptors'),
          (e[(e.CustomXsrfConfiguration = 2)] = 'CustomXsrfConfiguration'),
          (e[(e.NoXsrfProtection = 3)] = 'NoXsrfProtection'),
          (e[(e.JsonpSupport = 4)] = 'JsonpSupport'),
          (e[(e.RequestsMadeViaParent = 5)] = 'RequestsMadeViaParent'),
          (e[(e.Fetch = 6)] = 'Fetch'),
          e
        )
      })(rr || {})
      function uj(...e) {
        const n = [
          Xo,
          PE,
          RE,
          { provide: fl, useExisting: RE },
          { provide: hl, useExisting: PE },
          { provide: Rs, useValue: aj, multi: !0 },
          { provide: Wh, useValue: !0 },
          { provide: LE, useClass: sj },
        ]
        for (const t of e) n.push(...t.ɵproviders)
        return (function qc(e) {
          return { ɵproviders: e }
        })(n)
      }
      const VE = new S('LEGACY_INTERCEPTOR_FN')
      function lj() {
        return (function Pr(e, n) {
          return { ɵkind: e, ɵproviders: n }
        })(rr.LegacyInterceptors, [
          { provide: VE, useFactory: J2 },
          { provide: Rs, useExisting: VE, multi: !0 },
        ])
      }
      let cj = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({ providers: [uj(lj())] }))
          }
          return e
        })(),
        ml = (() => {
          class e {
            constructor() {}
            setData(t, r) {
              localStorage.setItem(t, r)
            }
            getData(t) {
              return localStorage.getItem(t)
            }
            clearStorage() {
              localStorage.clear()
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })(),
        Fn = (() => {
          class e {
            constructor(t, r) {
              ;(this.http = t),
                (this.localStorage = r),
                (this.apiBaseUrl = 'http://103.127.31.207:3000/api'),
                (this.token = '')
            }
            get(t, r) {
              this.token = this.localStorage.getData('token')
              const o = new Qe({ Authorization: `Bearer ${this.token}` })
              return this.http.get(`${this.apiBaseUrl}${t}`, {
                headers: o,
                params: new Pn({ fromObject: r }),
              })
            }
            post(t, r, o = !1) {
              this.token = this.localStorage.getData('token')
              const i = `${this.apiBaseUrl}${t}`
              let s
              return (
                (s = new Qe(
                  o
                    ? { Authorization: `Bearer ${this.token}` }
                    : {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.token}`,
                      }
                )),
                this.http.post(i, r, { headers: s })
              )
            }
            put(t, r) {
              const o = `${this.apiBaseUrl}${t}`,
                i = new Qe({
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${this.token}`,
                })
              return this.http.put(o, r, { headers: i })
            }
            delete(t) {
              const r = new Qe({ Authorization: `Bearer ${this.token}` })
              return this.http.delete(`${this.apiBaseUrl}${t}`, { headers: r })
            }
            fileUpload(t, r, o) {
              const i = `${this.apiBaseUrl}${t}`,
                s = new Qe({ Authorization: `Bearer ${this.token}` })
              return this.http.post(i, r, { headers: s })
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(Xo), M(ml))
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })()
      const jE = { now: () => (jE.delegate || Date).now(), delegate: void 0 }
      class vl extends ut {
        constructor(n = 1 / 0, t = 1 / 0, r = jE) {
          super(),
            (this._bufferSize = n),
            (this._windowTime = t),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = t === 1 / 0),
            (this._bufferSize = Math.max(1, n)),
            (this._windowTime = Math.max(1, t))
        }
        next(n) {
          const {
            isStopped: t,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s,
          } = this
          t || (r.push(n), !o && r.push(i.now() + s)),
            this._trimBuffer(),
            super.next(n)
        }
        _subscribe(n) {
          this._throwIfClosed(), this._trimBuffer()
          const t = this._innerSubscribe(n),
            { _infiniteTimeWindow: r, _buffer: o } = this,
            i = o.slice()
          for (let s = 0; s < i.length && !n.closed; s += r ? 1 : 2)
            n.next(i[s])
          return this._checkFinalizedStatuses(n), t
        }
        _trimBuffer() {
          const {
              _bufferSize: n,
              _timestampProvider: t,
              _buffer: r,
              _infiniteTimeWindow: o,
            } = this,
            i = (o ? 1 : 2) * n
          if ((n < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
            const s = t.now()
            let a = 0
            for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u
            a && r.splice(0, a + 1)
          }
        }
      }
      function $E(e, n, t) {
        let r,
          o = !1
        return (
          e && 'object' == typeof e
            ? ({
                bufferSize: r = 1 / 0,
                windowTime: n = 1 / 0,
                refCount: o = !1,
                scheduler: t,
              } = e)
            : (r = e ?? 1 / 0),
          xl({
            connector: () => new vl(r, n, t),
            resetOnError: !0,
            resetOnComplete: !1,
            resetOnRefCountZero: o,
          })
        )
      }
      class xs {}
      let BE = (() => {
        class e extends xs {
          getTranslation(t) {
            return R({})
          }
          static ɵfac = (function () {
            let t
            return function (o) {
              return (t || (t = be(e)))(o || e)
            }
          })()
          static ɵprov = N({ token: e, factory: e.ɵfac })
        }
        return e
      })()
      class Zh {}
      let UE = (() => {
        class e {
          handle(t) {
            return t.key
          }
          static ɵfac = function (r) {
            return new (r || e)()
          }
          static ɵprov = N({ token: e, factory: e.ɵfac })
        }
        return e
      })()
      function yl(e, n) {
        if (e === n) return !0
        if (null === e || null === n) return !1
        if (e != e && n != n) return !0
        let o,
          i,
          s,
          t = typeof e
        if (t == typeof n && 'object' == t) {
          if (!Array.isArray(e)) {
            if (Array.isArray(n)) return !1
            for (i in ((s = Object.create(null)), e)) {
              if (!yl(e[i], n[i])) return !1
              s[i] = !0
            }
            for (i in n) if (!(i in s) && typeof n[i] < 'u') return !1
            return !0
          }
          if (!Array.isArray(n)) return !1
          if ((o = e.length) == n.length) {
            for (i = 0; i < o; i++) if (!yl(e[i], n[i])) return !1
            return !0
          }
        }
        return !1
      }
      function or(e) {
        return typeof e < 'u' && null !== e
      }
      function Yh(e) {
        return e && 'object' == typeof e && !Array.isArray(e)
      }
      function HE(e, n) {
        let t = Object.assign({}, e)
        return (
          Yh(e) &&
            Yh(n) &&
            Object.keys(n).forEach((r) => {
              Yh(n[r])
                ? r in e
                  ? (t[r] = HE(e[r], n[r]))
                  : Object.assign(t, { [r]: n[r] })
                : Object.assign(t, { [r]: n[r] })
            }),
          t
        )
      }
      class _l {}
      let GE = (() => {
        class e extends _l {
          templateMatcher = /{{\s?([^{}\s]*)\s?}}/g
          interpolate(t, r) {
            let o
            return (
              (o =
                'string' == typeof t
                  ? this.interpolateString(t, r)
                  : 'function' == typeof t
                    ? this.interpolateFunction(t, r)
                    : t),
              o
            )
          }
          getValue(t, r) {
            let o = 'string' == typeof r ? r.split('.') : [r]
            r = ''
            do {
              ;(r += o.shift()),
                !or(t) || !or(t[r]) || ('object' != typeof t[r] && o.length)
                  ? o.length
                    ? (r += '.')
                    : (t = void 0)
                  : ((t = t[r]), (r = ''))
            } while (o.length)
            return t
          }
          interpolateFunction(t, r) {
            return t(r)
          }
          interpolateString(t, r) {
            return r
              ? t.replace(this.templateMatcher, (o, i) => {
                  let s = this.getValue(r, i)
                  return or(s) ? s : o
                })
              : t
          }
          static ɵfac = (function () {
            let t
            return function (o) {
              return (t || (t = be(e)))(o || e)
            }
          })()
          static ɵprov = N({ token: e, factory: e.ɵfac })
        }
        return e
      })()
      class Dl {}
      let zE = (() => {
        class e extends Dl {
          compile(t, r) {
            return t
          }
          compileTranslations(t, r) {
            return t
          }
          static ɵfac = (function () {
            let t
            return function (o) {
              return (t || (t = be(e)))(o || e)
            }
          })()
          static ɵprov = N({ token: e, factory: e.ɵfac })
        }
        return e
      })()
      class qE {
        defaultLang
        currentLang = this.defaultLang
        translations = {}
        langs = []
        onTranslationChange = new ie()
        onLangChange = new ie()
        onDefaultLangChange = new ie()
      }
      const Qh = new S('USE_STORE'),
        Xh = new S('USE_DEFAULT_LANG'),
        Jh = new S('DEFAULT_LANGUAGE'),
        Kh = new S('USE_EXTEND')
      let Cl = (() => {
          class e {
            store
            currentLoader
            compiler
            parser
            missingTranslationHandler
            useDefaultLang
            isolate
            extend
            loadingTranslations
            pending = !1
            _onTranslationChange = new ie()
            _onLangChange = new ie()
            _onDefaultLangChange = new ie()
            _defaultLang
            _currentLang
            _langs = []
            _translations = {}
            _translationRequests = {}
            get onTranslationChange() {
              return this.isolate
                ? this._onTranslationChange
                : this.store.onTranslationChange
            }
            get onLangChange() {
              return this.isolate ? this._onLangChange : this.store.onLangChange
            }
            get onDefaultLangChange() {
              return this.isolate
                ? this._onDefaultLangChange
                : this.store.onDefaultLangChange
            }
            get defaultLang() {
              return this.isolate ? this._defaultLang : this.store.defaultLang
            }
            set defaultLang(t) {
              this.isolate
                ? (this._defaultLang = t)
                : (this.store.defaultLang = t)
            }
            get currentLang() {
              return this.isolate ? this._currentLang : this.store.currentLang
            }
            set currentLang(t) {
              this.isolate
                ? (this._currentLang = t)
                : (this.store.currentLang = t)
            }
            get langs() {
              return this.isolate ? this._langs : this.store.langs
            }
            set langs(t) {
              this.isolate ? (this._langs = t) : (this.store.langs = t)
            }
            get translations() {
              return this.isolate ? this._translations : this.store.translations
            }
            set translations(t) {
              this.isolate
                ? (this._translations = t)
                : (this.store.translations = t)
            }
            constructor(t, r, o, i, s, a = !0, u = !1, l = !1, c) {
              ;(this.store = t),
                (this.currentLoader = r),
                (this.compiler = o),
                (this.parser = i),
                (this.missingTranslationHandler = s),
                (this.useDefaultLang = a),
                (this.isolate = u),
                (this.extend = l),
                c && this.setDefaultLang(c)
            }
            setDefaultLang(t) {
              if (t === this.defaultLang) return
              let r = this.retrieveTranslations(t)
              typeof r < 'u'
                ? (null == this.defaultLang && (this.defaultLang = t),
                  r.pipe(un(1)).subscribe((o) => {
                    this.changeDefaultLang(t)
                  }))
                : this.changeDefaultLang(t)
            }
            getDefaultLang() {
              return this.defaultLang
            }
            use(t) {
              if (t === this.currentLang) return R(this.translations[t])
              let r = this.retrieveTranslations(t)
              return typeof r < 'u'
                ? (this.currentLang || (this.currentLang = t),
                  r.pipe(un(1)).subscribe((o) => {
                    this.changeLang(t)
                  }),
                  r)
                : (this.changeLang(t), R(this.translations[t]))
            }
            retrieveTranslations(t) {
              let r
              return (
                (typeof this.translations[t] > 'u' || this.extend) &&
                  ((this._translationRequests[t] =
                    this._translationRequests[t] || this.getTranslation(t)),
                  (r = this._translationRequests[t])),
                r
              )
            }
            getTranslation(t) {
              this.pending = !0
              const r = this.currentLoader.getTranslation(t).pipe($E(1), un(1))
              return (
                (this.loadingTranslations = r.pipe(
                  W((o) => this.compiler.compileTranslations(o, t)),
                  $E(1),
                  un(1)
                )),
                this.loadingTranslations.subscribe({
                  next: (o) => {
                    ;(this.translations[t] =
                      this.extend && this.translations[t]
                        ? { ...o, ...this.translations[t] }
                        : o),
                      this.updateLangs(),
                      (this.pending = !1)
                  },
                  error: (o) => {
                    this.pending = !1
                  },
                }),
                r
              )
            }
            setTranslation(t, r, o = !1) {
              ;(r = this.compiler.compileTranslations(r, t)),
                (this.translations[t] =
                  (o || this.extend) && this.translations[t]
                    ? HE(this.translations[t], r)
                    : r),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: t,
                  translations: this.translations[t],
                })
            }
            getLangs() {
              return this.langs
            }
            addLangs(t) {
              t.forEach((r) => {
                ;-1 === this.langs.indexOf(r) && this.langs.push(r)
              })
            }
            updateLangs() {
              this.addLangs(Object.keys(this.translations))
            }
            getParsedResult(t, r, o) {
              let i
              if (r instanceof Array) {
                let s = {},
                  a = !1
                for (let u of r)
                  (s[u] = this.getParsedResult(t, u, o)), er(s[u]) && (a = !0)
                return a
                  ? pw(r.map((l) => (er(s[l]) ? s[l] : R(s[l])))).pipe(
                      W((l) => {
                        let c = {}
                        return (
                          l.forEach((d, f) => {
                            c[r[f]] = d
                          }),
                          c
                        )
                      })
                    )
                  : s
              }
              if (
                (t &&
                  (i = this.parser.interpolate(this.parser.getValue(t, r), o)),
                typeof i > 'u' &&
                  null != this.defaultLang &&
                  this.defaultLang !== this.currentLang &&
                  this.useDefaultLang &&
                  (i = this.parser.interpolate(
                    this.parser.getValue(
                      this.translations[this.defaultLang],
                      r
                    ),
                    o
                  )),
                typeof i > 'u')
              ) {
                let s = { key: r, translateService: this }
                typeof o < 'u' && (s.interpolateParams = o),
                  (i = this.missingTranslationHandler.handle(s))
              }
              return typeof i < 'u' ? i : r
            }
            get(t, r) {
              if (!or(t) || !t.length)
                throw new Error('Parameter "key" required')
              if (this.pending)
                return this.loadingTranslations.pipe(
                  Or((o) =>
                    er((o = this.getParsedResult(o, t, r))) ? o : R(o)
                  )
                )
              {
                let o = this.getParsedResult(
                  this.translations[this.currentLang],
                  t,
                  r
                )
                return er(o) ? o : R(o)
              }
            }
            getStreamOnTranslationChange(t, r) {
              if (!or(t) || !t.length)
                throw new Error('Parameter "key" required')
              return hs(
                Wu(() => this.get(t, r)),
                this.onTranslationChange.pipe(
                  yt((o) => {
                    const i = this.getParsedResult(o.translations, t, r)
                    return 'function' == typeof i.subscribe ? i : R(i)
                  })
                )
              )
            }
            stream(t, r) {
              if (!or(t) || !t.length)
                throw new Error('Parameter "key" required')
              return hs(
                Wu(() => this.get(t, r)),
                this.onLangChange.pipe(
                  yt((o) => {
                    const i = this.getParsedResult(o.translations, t, r)
                    return er(i) ? i : R(i)
                  })
                )
              )
            }
            instant(t, r) {
              if (!or(t) || !t.length)
                throw new Error('Parameter "key" required')
              let o = this.getParsedResult(
                this.translations[this.currentLang],
                t,
                r
              )
              if (er(o)) {
                if (t instanceof Array) {
                  let i = {}
                  return (
                    t.forEach((s, a) => {
                      i[t[a]] = t[a]
                    }),
                    i
                  )
                }
                return t
              }
              return o
            }
            set(t, r, o = this.currentLang) {
              ;(this.translations[o][t] = this.compiler.compile(r, o)),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: o,
                  translations: this.translations[o],
                })
            }
            changeLang(t) {
              ;(this.currentLang = t),
                this.onLangChange.emit({
                  lang: t,
                  translations: this.translations[t],
                }),
                null == this.defaultLang && this.changeDefaultLang(t)
            }
            changeDefaultLang(t) {
              ;(this.defaultLang = t),
                this.onDefaultLangChange.emit({
                  lang: t,
                  translations: this.translations[t],
                })
            }
            reloadLang(t) {
              return this.resetLang(t), this.getTranslation(t)
            }
            resetLang(t) {
              ;(this._translationRequests[t] = void 0),
                (this.translations[t] = void 0)
            }
            getBrowserLang() {
              if (typeof window > 'u' || typeof window.navigator > 'u') return
              let t = window.navigator.languages
                ? window.navigator.languages[0]
                : null
              return (
                (t =
                  t ||
                  window.navigator.language ||
                  window.navigator.browserLanguage ||
                  window.navigator.userLanguage),
                typeof t > 'u'
                  ? void 0
                  : (-1 !== t.indexOf('-') && (t = t.split('-')[0]),
                    -1 !== t.indexOf('_') && (t = t.split('_')[0]),
                    t)
              )
            }
            getBrowserCultureLang() {
              if (typeof window > 'u' || typeof window.navigator > 'u') return
              let t = window.navigator.languages
                ? window.navigator.languages[0]
                : null
              return (
                (t =
                  t ||
                  window.navigator.language ||
                  window.navigator.browserLanguage ||
                  window.navigator.userLanguage),
                t
              )
            }
            static ɵfac = function (r) {
              return new (r || e)(
                M(qE),
                M(xs),
                M(Dl),
                M(_l),
                M(Zh),
                M(Xh),
                M(Qh),
                M(Kh),
                M(Jh)
              )
            }
            static ɵprov = N({ token: e, factory: e.ɵfac })
          }
          return e
        })(),
        WE = (() => {
          class e {
            translate
            _ref
            value = ''
            lastKey = null
            lastParams = []
            onTranslationChange
            onLangChange
            onDefaultLangChange
            constructor(t, r) {
              ;(this.translate = t), (this._ref = r)
            }
            updateValue(t, r, o) {
              let i = (s) => {
                ;(this.value = void 0 !== s ? s : t),
                  (this.lastKey = t),
                  this._ref.markForCheck()
              }
              if (o) {
                let s = this.translate.getParsedResult(o, t, r)
                er(s.subscribe) ? s.subscribe(i) : i(s)
              }
              this.translate.get(t, r).subscribe(i)
            }
            transform(t, ...r) {
              if (!t || !t.length) return t
              if (yl(t, this.lastKey) && yl(r, this.lastParams))
                return this.value
              let o
              if (or(r[0]) && r.length)
                if ('string' == typeof r[0] && r[0].length) {
                  let i = r[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"')
                  try {
                    o = JSON.parse(i)
                  } catch {
                    throw new SyntaxError(
                      `Wrong parameter in TranslatePipe. Expected a valid Object, received: ${r[0]}`
                    )
                  }
                } else
                  'object' == typeof r[0] && !Array.isArray(r[0]) && (o = r[0])
              return (
                (this.lastKey = t),
                (this.lastParams = r),
                this.updateValue(t, o),
                this._dispose(),
                this.onTranslationChange ||
                  (this.onTranslationChange =
                    this.translate.onTranslationChange.subscribe((i) => {
                      this.lastKey &&
                        i.lang === this.translate.currentLang &&
                        ((this.lastKey = null),
                        this.updateValue(t, o, i.translations))
                    })),
                this.onLangChange ||
                  (this.onLangChange = this.translate.onLangChange.subscribe(
                    (i) => {
                      this.lastKey &&
                        ((this.lastKey = null),
                        this.updateValue(t, o, i.translations))
                    }
                  )),
                this.onDefaultLangChange ||
                  (this.onDefaultLangChange =
                    this.translate.onDefaultLangChange.subscribe(() => {
                      this.lastKey &&
                        ((this.lastKey = null), this.updateValue(t, o))
                    })),
                this.value
              )
            }
            _dispose() {
              typeof this.onTranslationChange < 'u' &&
                (this.onTranslationChange.unsubscribe(),
                (this.onTranslationChange = void 0)),
                typeof this.onLangChange < 'u' &&
                  (this.onLangChange.unsubscribe(),
                  (this.onLangChange = void 0)),
                typeof this.onDefaultLangChange < 'u' &&
                  (this.onDefaultLangChange.unsubscribe(),
                  (this.onDefaultLangChange = void 0))
            }
            ngOnDestroy() {
              this._dispose()
            }
            static ɵfac = function (r) {
              return new (r || e)(v(Cl, 16), v(Ki, 16))
            }
            static ɵpipe = Ge({ name: 'translate', type: e, pure: !1 })
            static ɵprov = N({ token: e, factory: e.ɵfac })
          }
          return e
        })(),
        ZE = (() => {
          class e {
            static forRoot(t = {}) {
              return {
                ngModule: e,
                providers: [
                  t.loader || { provide: xs, useClass: BE },
                  t.compiler || { provide: Dl, useClass: zE },
                  t.parser || { provide: _l, useClass: GE },
                  t.missingTranslationHandler || { provide: Zh, useClass: UE },
                  qE,
                  { provide: Qh, useValue: t.isolate },
                  { provide: Xh, useValue: t.useDefaultLang },
                  { provide: Kh, useValue: t.extend },
                  { provide: Jh, useValue: t.defaultLanguage },
                  Cl,
                ],
              }
            }
            static forChild(t = {}) {
              return {
                ngModule: e,
                providers: [
                  t.loader || { provide: xs, useClass: BE },
                  t.compiler || { provide: Dl, useClass: zE },
                  t.parser || { provide: _l, useClass: GE },
                  t.missingTranslationHandler || { provide: Zh, useClass: UE },
                  { provide: Qh, useValue: t.isolate },
                  { provide: Xh, useValue: t.useDefaultLang },
                  { provide: Kh, useValue: t.extend },
                  { provide: Jh, useValue: t.defaultLanguage },
                  Cl,
                ],
              }
            }
            static ɵfac = function (r) {
              return new (r || e)()
            }
            static ɵmod = Ve({ type: e })
            static ɵinj = Oe({})
          }
          return e
        })()
      function mj(e, n) {
        1 & e && (D(0, 'div'), E(1, 'email is required'), _())
      }
      function vj(e, n) {
        1 & e && (D(0, 'div'), E(1, 'password is required'), _())
      }
      let yj = (() => {
          class e {
            constructor(t, r, o) {
              ;(this.formBuilder = t),
                (this.apiService = r),
                (this.router = o),
                (this.loginForm = new Lo({}))
            }
            ngOnInit() {
              this.loginForm = this.formBuilder.group({
                email: ['', Lt.required],
                password: ['', Lt.required],
              })
            }
            login() {
              this.apiService
                .post('/login', this.loginForm.value)
                .subscribe((t) => {
                  200 == t.status
                    ? (console.log(t),
                      localStorage.clear(),
                      localStorage.setItem('token', t.token),
                      localStorage.setItem('user', JSON.stringify(t.user)),
                      this.router.navigate(['/dashboard']))
                    : console.log(t)
                })
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Gu), v(Fn), v(Pe))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-login']],
              decls: 16,
              vars: 12,
              consts: [
                [3, 'formGroup', 'ngSubmit'],
                ['for', ''],
                ['type', 'email', 'formControlName', 'email'],
                [4, 'ngIf'],
                ['type', 'password', 'formControlName', 'password'],
                ['type', 'submit'],
              ],
              template: function (r, o) {
                if (
                  (1 & r &&
                    (D(0, 'form', 0),
                    X('ngSubmit', function () {
                      return o.login()
                    }),
                    D(1, 'div')(2, 'label', 1),
                    E(3),
                    bn(4, 'translate'),
                    _(),
                    Re(5, 'input', 2),
                    Ae(6, mj, 2, 0, 'div', 3),
                    _(),
                    D(7, 'div')(8, 'label', 1),
                    E(9),
                    bn(10, 'translate'),
                    _(),
                    Re(11, 'input', 4),
                    Ae(12, vj, 2, 0, 'div', 3),
                    _(),
                    D(13, 'button', 5),
                    E(14),
                    bn(15, 'translate'),
                    _()()),
                  2 & r)
                ) {
                  let i, s
                  q('formGroup', o.loginForm),
                    O(3),
                    He('', qn(4, 6, 'EMAIL'), ': '),
                    O(3),
                    q(
                      'ngIf',
                      (null == (i = o.loginForm.get('email'))
                        ? null
                        : i.invalid) &&
                        (null == (i = o.loginForm.get('email'))
                          ? null
                          : i.touched)
                    ),
                    O(3),
                    He('', qn(10, 8, 'PASSWORD'), ': '),
                    O(3),
                    q(
                      'ngIf',
                      (null == (s = o.loginForm.get('password'))
                        ? null
                        : s.invalid) &&
                        (null == (s = o.loginForm.get('password'))
                          ? null
                          : s.touched)
                    ),
                    O(2),
                    xe(qn(15, 10, 'LOGIN'))
                }
              },
              dependencies: [rs, Vo, Qn, Ir, Fo, Tr, jo, WE],
              styles: [
                'form[_ngcontent-%COMP%]{max-width:400px;margin:0 auto;padding:20px;border:1px solid #ccc;border-radius:8px;box-shadow:0 0 10px #0000001a;background-color:#fff}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin-bottom:15px}form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:5px;font-weight:700}form[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%], form[_ngcontent-%COMP%]   input[type=password][_ngcontent-%COMP%]{width:100%;padding:10px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;margin-top:5px}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{color:red;font-size:12px;margin-top:5px}form[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]{width:100%;padding:10px;background-color:#007bff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:16px;transition:background-color .3s ease}form[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:hover{background-color:#0056b3}',
              ],
            }))
          }
          return e
        })(),
        _j = (() => {
          class e {
            constructor(t, r, o) {
              ;(this.http = t),
                (this.apiService = r),
                (this.router = o),
                (this.user = { email: '', firstName: '', lastName: '' }),
                (this.selectedFile = null)
            }
            onSubmit(t) {
              if (t.valid && this.selectedFile) {
                const r = new FormData()
                r.append('email', this.user.email),
                  r.append('firstName', this.user.firstName),
                  r.append('lastName', this.user.lastName),
                  r.append(
                    'profilePhoto',
                    this.selectedFile,
                    this.selectedFile.name
                  ),
                  this.apiService.post('/signUp', r, !0).subscribe(
                    (o) => {
                      console.log('User created:', o)
                      let i = o.result.email
                      console.log(i),
                        this.router.navigate(['/invite-mail'], {
                          queryParams: { userMail: i },
                        })
                    },
                    (o) => {
                      console.error('Error uploading:', o)
                    }
                  )
              }
            }
            onFileSelected(t) {
              this.selectedFile = t.target.files[0]
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Xo), v(Fn), v(Pe))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-sign-up']],
              decls: 20,
              vars: 3,
              consts: [
                [3, 'ngSubmit'],
                ['profileForm', 'ngForm'],
                ['for', 'email'],
                [
                  'type',
                  'email',
                  'id',
                  'email',
                  'name',
                  'email',
                  'required',
                  '',
                  3,
                  'ngModel',
                  'ngModelChange',
                ],
                ['for', 'firstName'],
                [
                  'type',
                  'text',
                  'id',
                  'firstName',
                  'name',
                  'firstName',
                  'required',
                  '',
                  3,
                  'ngModel',
                  'ngModelChange',
                ],
                ['for', 'lastName'],
                [
                  'type',
                  'text',
                  'id',
                  'lastName',
                  'name',
                  'lastName',
                  'required',
                  '',
                  3,
                  'ngModel',
                  'ngModelChange',
                ],
                ['for', 'profilePhoto'],
                [
                  'type',
                  'file',
                  'id',
                  'profilePhoto',
                  'name',
                  'profilePhoto',
                  3,
                  'change',
                ],
                ['type', 'submit'],
              ],
              template: function (r, o) {
                if (1 & r) {
                  const i = Io()
                  D(0, 'form', 0, 1),
                    X('ngSubmit', function () {
                      Wr(i)
                      const a = (function _y(e) {
                        return zr(
                          (function hS() {
                            return F.lFrame.contextLView
                          })(),
                          z + e
                        )
                      })(1)
                      return Zr(o.onSubmit(a))
                    }),
                    D(2, 'div')(3, 'label', 2),
                    E(4, 'Email:'),
                    _(),
                    D(5, 'input', 3),
                    X('ngModelChange', function (a) {
                      return (o.user.email = a)
                    }),
                    _()(),
                    D(6, 'div')(7, 'label', 4),
                    E(8, 'First Name:'),
                    _(),
                    D(9, 'input', 5),
                    X('ngModelChange', function (a) {
                      return (o.user.firstName = a)
                    }),
                    _()(),
                    D(10, 'div')(11, 'label', 6),
                    E(12, 'Last Name:'),
                    _(),
                    D(13, 'input', 7),
                    X('ngModelChange', function (a) {
                      return (o.user.lastName = a)
                    }),
                    _()(),
                    D(14, 'div')(15, 'label', 8),
                    E(16, 'Profile Photo:'),
                    _(),
                    D(17, 'input', 9),
                    X('change', function (a) {
                      return o.onFileSelected(a)
                    }),
                    _()(),
                    D(18, 'button', 10),
                    E(19, 'Submit'),
                    _()()
                }
                2 & r &&
                  (O(5),
                  q('ngModel', o.user.email),
                  O(4),
                  q('ngModel', o.user.firstName),
                  O(4),
                  q('ngModel', o.user.lastName))
              },
              dependencies: [Vo, Qn, Ir, Fo, Hu, Uu, Bu],
              styles: [
                'form[_ngcontent-%COMP%]{max-width:400px;margin:0 auto;padding:20px;border:1px solid #ccc;border-radius:8px;box-shadow:0 0 10px #0000001a;background-color:#fff}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin-bottom:15px}form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:5px;font-weight:700}form[_ngcontent-%COMP%]   input[type=email][_ngcontent-%COMP%], form[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%], form[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]{width:100%;padding:10px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;margin-top:5px}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{color:red;font-size:12px;margin-top:5px}form[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]{width:100%;padding:10px;background-color:#007bff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:16px;transition:background-color .3s ease}form[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:hover{background-color:#0056b3}',
              ],
            }))
          }
          return e
        })(),
        Dj = (() => {
          class e {
            constructor(t) {
              ;(this.translate = t), t.setDefaultLang('en')
            }
            switchLanguage(t) {
              this.translate.use(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Cl))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-header']],
              decls: 5,
              vars: 0,
              consts: [[3, 'click']],
              template: function (r, o) {
                1 & r &&
                  (D(0, 'div')(1, 'button', 0),
                  X('click', function () {
                    return o.switchLanguage('en')
                  }),
                  E(2, 'English'),
                  _(),
                  D(3, 'button', 0),
                  X('click', function () {
                    return o.switchLanguage('de')
                  }),
                  E(4, 'German'),
                  _()())
              },
            }))
          }
          return e
        })()
      function Cj(e, n) {
        1 & e && (D(0, 'a', 3), E(1, 'Dashboard'), _())
      }
      let wj = (() => {
        class e {
          ngOnInit() {
            throw new Error('Method not implemented.')
          }
          constructor(t) {
            this.storage = t
          }
          checkLoggedIn() {
            return !!this.storage.getData('token')
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(ml))
          })
          static #t = (this.ɵcmp = Le({
            type: e,
            selectors: [['app-navbar']],
            decls: 12,
            vars: 7,
            consts: [
              ['routerLink', '/login'],
              ['routerLink', '/sign-up'],
              ['routerLink', '/dashboard', 4, 'ngIf'],
              ['routerLink', '/dashboard'],
            ],
            template: function (r, o) {
              1 & r &&
                (D(0, 'nav')(1, 'ul')(2, 'li')(3, 'a', 0),
                E(4),
                bn(5, 'translate'),
                _()(),
                D(6, 'li')(7, 'a', 1),
                E(8),
                bn(9, 'translate'),
                _()(),
                D(10, 'li'),
                Ae(11, Cj, 2, 0, 'a', 2),
                _()()()),
                2 & r &&
                  (O(4),
                  xe(qn(5, 3, 'LOGIN')),
                  O(4),
                  xe(qn(9, 5, 'SIGNUP')),
                  O(3),
                  q('ngIf', o.checkLoggedIn()))
            },
            dependencies: [rs, Ns, WE],
            styles: [
              'nav[_ngcontent-%COMP%]{background-color:#333;padding:10px 20px}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:none;margin:0;padding:0;display:flex;justify-content:flex-end}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-left:20px}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;padding:8px 16px;border-radius:4px;transition:background-color .3s ease}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#555}nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a.router-link-active[_ngcontent-%COMP%]{background-color:#444}',
            ],
          }))
        }
        return e
      })()
      function bj(e, n) {
        if ((1 & e && (D(0, 'option', 6), E(1), _()), 2 & e)) {
          const t = n.$implicit
          q('value', null == t ? null : t._id), O(1), xe(t.name)
        }
      }
      function Ej(e, n) {
        if (1 & e) {
          const t = Io()
          D(0, 'tr', 8),
            X('click', function () {
              const i = Wr(t).$implicit
              return Zr(vr(2).loadDocuments(i._id))
            }),
            D(1, 'td'),
            E(2),
            _(),
            D(3, 'td'),
            E(4),
            _(),
            D(5, 'td'),
            E(6),
            _()()
        }
        if (2 & e) {
          const t = n.$implicit
          O(2), xe(t.name), O(2), xe(t.desc), O(2), xe(t.tags.join(', '))
        }
      }
      function Mj(e, n) {
        if (
          (1 & e &&
            (D(0, 'div')(1, 'h3'),
            E(2, 'Subjects'),
            _(),
            D(3, 'table')(4, 'thead')(5, 'tr')(6, 'th'),
            E(7, 'Name'),
            _(),
            D(8, 'th'),
            E(9, 'Description'),
            _(),
            D(10, 'th'),
            E(11, 'tags'),
            _()()(),
            D(12, 'tbody'),
            Ae(13, Ej, 7, 3, 'tr', 7),
            _()()()),
          2 & e)
        ) {
          const t = vr()
          O(13), q('ngForOf', t.getSubject)
        }
      }
      function Ij(e, n) {
        if (1 & e) {
          const t = Io()
          D(0, 'tr')(1, 'td'),
            E(2),
            _(),
            D(3, 'td'),
            E(4),
            _(),
            D(5, 'td')(6, 'a', 11),
            E(7, 'click here'),
            _()(),
            D(8, 'td'),
            E(9),
            _(),
            D(10, 'td')(11, 'button', 12),
            X('click', function () {
              const i = Wr(t).$implicit
              return Zr(vr(2).navigateToOtherPage(i._id))
            }),
            E(12, 'click here'),
            _()()()
        }
        if (2 & e) {
          const t = n.$implicit
          O(2),
            xe(t.name),
            O(2),
            xe(t.desc),
            O(2),
            Ja('href', t.file_url, Si),
            O(3),
            xe(t.addedBy.email)
        }
      }
      function Sj(e, n) {
        if (
          (1 & e &&
            (D(0, 'div')(1, 'table', 9)(2, 'thead')(3, 'tr')(4, 'th'),
            E(5, 'Name'),
            _(),
            D(6, 'th'),
            E(7, 'Description'),
            _(),
            D(8, 'th'),
            E(9, 'Link'),
            _(),
            D(10, 'th'),
            E(11, 'Added By'),
            _(),
            D(12, 'th'),
            E(13, 'Details'),
            _()()(),
            D(14, 'tbody'),
            Ae(15, Ij, 13, 4, 'tr', 10),
            _()()()),
          2 & e)
        ) {
          const t = vr()
          O(15), q('ngForOf', t.documents)
        }
      }
      let Tj = (() => {
          class e {
            constructor(t, r, o) {
              ;(this.apiService = t),
                (this.formBuilder = r),
                (this.router = o),
                (this.getSubject = []),
                (this.fields = []),
                (this.documents = []),
                (this.getField = this.formBuilder.group({
                  id: ['', Lt.required],
                }))
            }
            ngOnInit() {
              this.apiService.get('/get-fields').subscribe((t) => {
                console.log(t), (this.fields = t)
              })
            }
            searchSubject() {
              this.getSubject.length > 0 && (this.getSubject = []),
                this.apiService
                  .get(`/get-subjects?fieldId=${this.getField.value.id}`)
                  .subscribe(
                    (r) => {
                      this.getSubject = r.subjects
                    },
                    (r) => {
                      console.error('An error occurred:', r.message)
                    }
                  )
            }
            loadDocuments(t) {
              console.log(t),
                this.apiService.get(`/subject-document/${t}`).subscribe((r) => {
                  console.log(r), (this.documents = r.result)
                })
            }
            navigateToOtherPage(t) {
              this.router.navigate(['/document-details'], {
                queryParams: { documentId: t },
              })
            }
            getRating(t) {}
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Fn), v(Gu), v(Pe))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-home']],
              decls: 20,
              vars: 4,
              consts: [
                [3, 'formGroup', 'ngSubmit'],
                ['for', 'selectOption'],
                ['id', 'selectOption', 'formControlName', 'id'],
                [3, 'value', 4, 'ngFor', 'ngForOf'],
                ['type', 'submit'],
                [4, 'ngIf'],
                [3, 'value'],
                [
                  'style',
                  'cursor: pointer;',
                  3,
                  'click',
                  4,
                  'ngFor',
                  'ngForOf',
                ],
                [2, 'cursor', 'pointer', 3, 'click'],
                [1, 'document-table'],
                [4, 'ngFor', 'ngForOf'],
                ['target', '_blank', 3, 'href'],
                [3, 'click'],
              ],
              template: function (r, o) {
                1 & r &&
                  (Re(0, 'app-header')(1, 'app-navbar'),
                  D(2, 'h3'),
                  E(3, 'free notes as per field section'),
                  _(),
                  Re(4, 'br')(5, 'br'),
                  D(6, 'div')(7, 'form', 0),
                  X('ngSubmit', function () {
                    return o.searchSubject()
                  }),
                  D(8, 'label', 1),
                  E(9, 'Select a field:'),
                  _(),
                  D(10, 'select', 2),
                  Ae(11, bj, 2, 2, 'option', 3),
                  _(),
                  D(12, 'button', 4),
                  E(13, 'Submit'),
                  _()(),
                  Re(14, 'br')(15, 'br'),
                  Ae(16, Mj, 14, 1, 'div', 5),
                  Re(17, 'br')(18, 'br'),
                  Ae(19, Sj, 16, 1, 'div', 5),
                  _()),
                  2 & r &&
                    (O(7),
                    q('formGroup', o.getField),
                    O(4),
                    q('ngForOf', o.fields),
                    O(5),
                    q('ngIf', o.getSubject.length > 0),
                    O(3),
                    q('ngIf', o.documents.length > 0))
              },
              dependencies: [Er, rs, Vo, mh, yh, fs, Ir, Fo, Tr, jo, Dj, wj],
              styles: [
                '.app-header[_ngcontent-%COMP%]{background-color:#fff;border-bottom:1px solid #ccc;padding:10px}.app-navbar[_ngcontent-%COMP%]{float:left}h3[_ngcontent-%COMP%], form[_ngcontent-%COMP%]{margin-top:10px}select[_ngcontent-%COMP%]{width:10%;padding:5px;margin-bottom:10px}button[_ngcontent-%COMP%]{background-color:#007bff;color:#fff;padding:5px 10px;border-radius:4px;cursor:pointer}table[_ngcontent-%COMP%]{border-collapse:collapse;width:100%}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{border:1px solid #ccc;padding:5px}th[_ngcontent-%COMP%]{background-color:#f2f2f2}tr[_ngcontent-%COMP%]:hover{background-color:#eee}.document-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin-top:10px}.document-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .document-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid #ccc;padding:8px}.document-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#f2f2f2}',
              ],
            }))
          }
          return e
        })(),
        Aj = (() => {
          class e {
            constructor(t) {
              this.sanitizer = t
            }
            transform(t) {
              return this.sanitizer.bypassSecurityTrustResourceUrl(t)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(uw, 16))
            })
            static #t = (this.ɵpipe = Ge({
              name: 'safeUrl',
              type: e,
              pure: !0,
            }))
          }
          return e
        })()
      function Nj(e, n) {
        if ((1 & e && (D(0, 'li'), E(1), _()), 2 & e)) {
          const t = n.$implicit
          O(1),
            _r(' Liked By: ', t.likeBy.firstName, ' ', t.likeBy.lastName, ' ')
        }
      }
      function Oj(e, n) {
        if ((1 & e && (D(0, 'li'), E(1), _()), 2 & e)) {
          const t = n.$implicit
          O(1),
            Ud(
              ' Reviewed By: ',
              t.userId.firstName,
              ' ',
              t.userId.lastName,
              ' - ',
              t.content,
              ' '
            )
        }
      }
      function Rj(e, n) {
        if ((1 & e && (D(0, 'li'), E(1), _()), 2 & e)) {
          const t = n.$implicit
          O(1), _r(' Rated By: ', t.userId, ' - ', t.rating, ' stars ')
        }
      }
      let xj = (() => {
          class e {
            constructor(t, r) {
              ;(this.route = t),
                (this.apiService = r),
                (this.documentId = ''),
                (this.likes = []),
                (this.totalLikes = 0),
                (this.reviews = []),
                (this.ratings = []),
                (this.avgRating = 0)
            }
            ngOnInit() {
              this.route.queryParams.subscribe((t) => {
                ;(this.documentId = t.documentId),
                  this.getLikes(this.documentId),
                  this.getReviews(this.documentId),
                  this.getRating(this.documentId),
                  this.getDocument(this.documentId)
              })
            }
            getLikes(t) {
              this.apiService.get(`/documentLike/${t}`).subscribe((r) => {
                ;(this.likes = r.result), (this.totalLikes = r.count)
              })
            }
            getReviews(t) {
              this.apiService.get(`/get-reviews/${t}`).subscribe((r) => {
                this.reviews = r.result
              })
            }
            getRating(t) {
              this.apiService.get(`/get-ratings/${t}`).subscribe((r) => {
                ;(this.ratings = r.result),
                  (this.avgRating = r.avgRating[0].avgRating)
              })
            }
            getDocument(t) {
              this.apiService.get(`/document/${t}`).subscribe((r) => {
                this.document = r.result
              })
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Rn), v(Fn))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-document-details']],
              decls: 33,
              vars: 16,
              consts: [
                [1, 'document-details'],
                ['target', '_blank', 3, 'href'],
                [
                  'width',
                  '70%',
                  'height',
                  '600px',
                  'frameborder',
                  '0',
                  3,
                  'src',
                ],
                [1, 'likes-reviews-ratings'],
                [1, 'likes'],
                [4, 'ngFor', 'ngForOf'],
                [1, 'reviews'],
                [1, 'ratings'],
              ],
              template: function (r, o) {
                1 & r &&
                  (D(0, 'div', 0)(1, 'h2'),
                  E(2),
                  _(),
                  D(3, 'p'),
                  E(4),
                  _(),
                  D(5, 'p'),
                  E(6),
                  _(),
                  D(7, 'p'),
                  E(8),
                  _(),
                  D(9, 'p'),
                  E(10, 'File URL: '),
                  D(11, 'a', 1),
                  E(12, 'Download'),
                  _()(),
                  Re(13, 'iframe', 2),
                  bn(14, 'safeUrl'),
                  D(15, 'div', 3)(16, 'div', 4)(17, 'h3'),
                  E(18),
                  _(),
                  D(19, 'ul'),
                  Ae(20, Nj, 2, 2, 'li', 5),
                  _()(),
                  D(21, 'div', 6)(22, 'h3'),
                  E(23),
                  _(),
                  D(24, 'ul'),
                  Ae(25, Oj, 2, 3, 'li', 5),
                  _()(),
                  D(26, 'div', 7)(27, 'h3'),
                  E(28),
                  _(),
                  D(29, 'ul'),
                  Ae(30, Rj, 2, 2, 'li', 5),
                  _(),
                  D(31, 'h3'),
                  E(32),
                  _()()()()),
                  2 & r &&
                    (O(2),
                    xe(o.document.name),
                    O(2),
                    He('Description: ', o.document.desc, ''),
                    O(2),
                    He('File Type: ', o.document.file_type, ''),
                    O(2),
                    _r(
                      'Added By: ',
                      o.document.addedBy.firstName,
                      ' ',
                      o.document.addedBy.lastName,
                      ''
                    ),
                    O(3),
                    Ja('href', o.document.file_url, Si),
                    O(2),
                    q('src', qn(14, 14, o.document.file_url), Gc),
                    O(5),
                    He('Likes: ', o.likes.length, ''),
                    O(2),
                    q('ngForOf', o.likes),
                    O(3),
                    He('Reviews: ', o.reviews.length, ''),
                    O(2),
                    q('ngForOf', o.reviews),
                    O(3),
                    He('Ratings: ', o.ratings.length, ''),
                    O(2),
                    q('ngForOf', o.ratings),
                    O(2),
                    He('Average Rating: ', o.avgRating, ''))
              },
              dependencies: [Er, Aj],
              styles: [
                '.document-details[_ngcontent-%COMP%]{padding:20px;border:1px solid #ccc;margin:20px}.likes-reviews-ratings[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-top:20px}.likes[_ngcontent-%COMP%], .reviews[_ngcontent-%COMP%], .ratings[_ngcontent-%COMP%]{flex:1;margin-right:20px}h3[_ngcontent-%COMP%]{margin-top:10px;font-size:18px}ul[_ngcontent-%COMP%]{list-style:none;padding:0}li[_ngcontent-%COMP%]{margin-bottom:5px;font-size:16px}',
              ],
            }))
          }
          return e
        })(),
        Pj = (() => {
          class e {
            constructor(t) {
              this.route = t
            }
            ngOnInit() {
              this.route.params.subscribe((t) => {
                this.userMail = t.userMail
              })
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Rn))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-invite-link-mail']],
              decls: 2,
              vars: 1,
              template: function (r, o) {
                1 & r && (D(0, 'h1'), E(1), _()),
                  2 & r &&
                    (O(1),
                    He(
                      ' Please check ',
                      o.userMail,
                      ' for confirmation mail\n'
                    ))
              },
            }))
          }
          return e
        })(),
        YE = (() => {
          class e {
            constructor(t, r, o) {
              ;(this.storage = t),
                (this.http = r),
                (this.router = o),
                (this.userName = '')
            }
            ngOnInit() {
              this.getUser()
            }
            getUser() {
              let t = this.storage.getData('user')
              ;(t = t ? JSON.parse(t) : null),
                console.log('user', t),
                t || this.router.navigate(['/login']),
                console.log(`${t.firstName} ${t.lastName}`),
                (this.userName = `${t.firstName} ${t.lastName}`)
            }
            logout() {
              this.storage.clearStorage(), this.router.navigate(['/'])
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(ml), v(Xo), v(Pe))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-dashboard']],
              decls: 29,
              vars: 1,
              consts: [
                [1, 'container'],
                [1, 'navbar'],
                ['href', '#', 1, 'navbar-brand'],
                [1, 'nav', 'navbar-nav'],
                ['routerLink', '/'],
                ['routerLink', '/dashboard/upload-file'],
                ['routerLink', '/dashboard/see-your-files'],
                ['routerLink', '/dashboard/profile'],
                ['routerLink', '/dashboard/chat-list'],
                [3, 'click'],
                [1, 'main'],
                [1, 'footer'],
              ],
              template: function (r, o) {
                1 & r &&
                  (D(0, 'div', 0)(1, 'header')(2, 'nav', 1)(3, 'a', 2),
                  E(4),
                  _(),
                  D(5, 'ul', 3)(6, 'li')(7, 'a', 4),
                  E(8, 'Home'),
                  _()(),
                  D(9, 'li')(10, 'a', 5),
                  E(11, 'Upload file'),
                  _()(),
                  D(12, 'li')(13, 'a', 6),
                  E(14, 'See your files'),
                  _()(),
                  D(15, 'li')(16, 'a', 7),
                  E(17, 'Profile'),
                  _()(),
                  D(18, 'li')(19, 'a', 8),
                  E(20, 'Chats'),
                  _()(),
                  D(21, 'button', 9),
                  X('click', function () {
                    return o.logout()
                  }),
                  E(22, 'logout'),
                  _()()()(),
                  D(23, 'main')(24, 'div', 10),
                  Re(25, 'router-outlet'),
                  _()(),
                  D(26, 'footer', 11)(27, 'p'),
                  E(28, 'Copyright \xa9 2023 Aniket'),
                  _()()()),
                  2 & r && (O(4), He('Welcome ', o.userName, ''))
              },
              dependencies: [ol, Ns],
              styles: [
                '.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:100vh;margin:0;padding:0}header[_ngcontent-%COMP%]{background:#333;color:#fff;padding:1rem;text-align:center;margin:0}main[_ngcontent-%COMP%]{flex:1;padding:2rem}footer[_ngcontent-%COMP%]{background:#333;color:#fff;text-align:center;padding:1rem}.navbar[_ngcontent-%COMP%]{background:#007bff;padding:1rem;margin:0}.navbar-brand[_ngcontent-%COMP%]{color:#fff;font-size:1.5rem;text-decoration:none;margin-right:2rem}.navbar-nav[_ngcontent-%COMP%]{list-style:none;padding:0;display:flex;gap:1rem;margin:0}.navbar-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline}.navbar-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;text-decoration:none;padding:.5rem 1rem}.navbar-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background:#0056b3;border-radius:.25rem}button[_ngcontent-%COMP%]{background:#dc3545;color:#fff;border:none;padding:.5rem 1rem;cursor:pointer;margin:1rem;border-radius:.25rem}button[_ngcontent-%COMP%]:hover{background:#c82333}.footer[_ngcontent-%COMP%]{background:#333;color:#fff;text-align:center;padding:1rem;position:relative;bottom:0;width:100%}.main[_ngcontent-%COMP%]{flex:1;padding:2rem}',
              ],
            }))
          }
          return e
        })(),
        ep = (() => {
          class e {
            constructor(t, r) {
              ;(this.localStorage = t), (this.router = r)
            }
            canActivate() {
              return (
                !!this.localStorage.getData('token') ||
                (this.router.navigate(['/login']), !1)
              )
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(ml), M(Pe))
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })(),
        QE = (() => {
          class e {
            ngOnInit() {
              this.getProfile()
            }
            constructor(t, r) {
              ;(this.fb = t),
                (this.apiService = r),
                (this.profileForm = this.fb.group({
                  firstName: ['', Lt.required],
                  lastName: ['', Lt.required],
                  email: [{ value: '', disabled: !0 }, [Lt.required, Lt.email]],
                }))
            }
            getProfile() {
              this.apiService.get('/profile').subscribe(
                (t) => {
                  this.profileForm?.patchValue(t.user)
                },
                (t) => {
                  console.error('Error fetching profile', t)
                }
              )
            }
            saveProfile() {}
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(Gu), v(Fn))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-profile']],
              decls: 16,
              vars: 3,
              consts: [
                [1, 'profile-container'],
                [3, 'formGroup', 'ngSubmit'],
                ['for', 'firstName'],
                [
                  'id',
                  'firstName',
                  'formControlName',
                  'firstName',
                  'type',
                  'text',
                ],
                ['for', 'lastName'],
                [
                  'id',
                  'lastName',
                  'formControlName',
                  'lastName',
                  'type',
                  'text',
                ],
                ['for', 'email'],
                [
                  'id',
                  'email',
                  'formControlName',
                  'email',
                  'type',
                  'email',
                  3,
                  'disabled',
                ],
                ['type', 'submit', 3, 'disabled'],
              ],
              template: function (r, o) {
                1 & r &&
                  (D(0, 'div', 0)(1, 'form', 1),
                  X('ngSubmit', function () {
                    return o.saveProfile()
                  }),
                  D(2, 'div')(3, 'label', 2),
                  E(4, 'First Name'),
                  _(),
                  Re(5, 'input', 3),
                  _(),
                  D(6, 'div')(7, 'label', 4),
                  E(8, 'Last Name'),
                  _(),
                  Re(9, 'input', 5),
                  _(),
                  D(10, 'div')(11, 'label', 6),
                  E(12, 'Email'),
                  _(),
                  Re(13, 'input', 7),
                  _(),
                  D(14, 'button', 8),
                  E(15, 'Save'),
                  _()()()),
                  2 & r &&
                    (O(1),
                    q('formGroup', o.profileForm),
                    O(12),
                    q('disabled', !0),
                    O(1),
                    q('disabled', !o.profileForm.valid))
              },
              dependencies: [Vo, Qn, Ir, Fo, Tr, jo],
              styles: [
                '.profile-container[_ngcontent-%COMP%]{max-width:400px;margin:auto}.profile-container[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin-bottom:1rem}.profile-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:.5rem}.profile-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:.5rem;box-sizing:border-box}',
              ],
            }))
          }
          return e
        })()
      function Fj(e, n) {
        if ((1 & e && (D(0, 'option', 13), E(1), _()), 2 & e)) {
          const t = n.$implicit
          q('value', null == t ? null : t._id),
            O(1),
            xe(null == t ? null : t.name)
        }
      }
      function kj(e, n) {
        if ((1 & e && (D(0, 'option', 13), E(1), _()), 2 & e)) {
          const t = n.$implicit
          q('value', null == t ? null : t._id),
            O(1),
            xe(null == t ? null : t.name)
        }
      }
      let Lj = (() => {
        class e {
          constructor(t, r, o) {
            ;(this.apiService = t),
              (this.formBuilder = r),
              (this.http = o),
              (this.subjects = []),
              (this.fields = []),
              (this.selectedFile = null),
              (this.fileUploadForm = this.formBuilder.group({
                fileName: ['', Lt.required],
                description: ['', Lt.required],
                field: ['', Lt.required],
                subject: ['', Lt.required],
                document: [null, Lt.required],
              }))
          }
          ngOnInit() {
            this.loadFields()
          }
          loadFields() {
            this.apiService.get('/get-fields').subscribe((t) => {
              this.fields = t
            })
          }
          onFieldChange() {
            ;(this.selectedField = this.fileUploadForm.get('field')?.value),
              this.apiService
                .get(`/get-subjects?fieldId=${this.selectedField}`)
                .subscribe(
                  (t) => {
                    this.subjects = t.subjects
                  },
                  (t) => {
                    console.error('An error occurred:', t.message)
                  }
                )
          }
          onFileChange(t) {
            const r = t.target
            r.files &&
              r.files.length > 0 &&
              ((this.selectedFile = r.files[0]),
              this.fileUploadForm.patchValue({ document: this.selectedFile }),
              this.fileUploadForm.get('document').updateValueAndValidity())
          }
          onSubmit() {
            if (this.fileUploadForm.valid && this.selectedFile) {
              const t = new FormData()
              t.append('name', this.fileUploadForm.get('fileName').value),
                t.append('desc', this.fileUploadForm.get('description').value),
                t.append('field', this.fileUploadForm.get('field').value),
                t.append('subject', this.fileUploadForm.get('subject').value),
                t.append('document', this.selectedFile),
                this.apiService
                  .fileUpload('/user/add-document', t, !0)
                  .subscribe((r) => {
                    console.log('API Response:', r)
                  })
            } else console.log('Form is invalid:', this.fileUploadForm.errors)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(Fn), v(Gu), v(Xo))
          })
          static #t = (this.ɵcmp = Le({
            type: e,
            selectors: [['app-file-upload']],
            decls: 26,
            vars: 4,
            consts: [
              [3, 'formGroup', 'ngSubmit'],
              ['for', 'fileName'],
              ['type', 'text', 'id', 'fileName', 'formControlName', 'fileName'],
              ['for', 'description'],
              [
                'type',
                'text',
                'id',
                'description',
                'formControlName',
                'description',
              ],
              ['for', 'field'],
              ['id', 'field', 'formControlName', 'field', 3, 'change'],
              [3, 'value', 4, 'ngFor', 'ngForOf'],
              ['for', 'subject'],
              ['id', 'subject', 'formControlName', 'subject'],
              ['for', 'document'],
              ['type', 'file', 'id', 'document', 3, 'change'],
              ['type', 'submit', 3, 'disabled'],
              [3, 'value'],
            ],
            template: function (r, o) {
              1 & r &&
                (D(0, 'form', 0),
                X('ngSubmit', function () {
                  return o.onSubmit()
                }),
                D(1, 'div')(2, 'label', 1),
                E(3, 'File Name:'),
                _(),
                Re(4, 'input', 2),
                _(),
                D(5, 'div')(6, 'label', 3),
                E(7, 'Description:'),
                _(),
                Re(8, 'input', 4),
                _(),
                D(9, 'div')(10, 'label', 5),
                E(11, 'Field:'),
                _(),
                D(12, 'select', 6),
                X('change', function () {
                  return o.onFieldChange()
                }),
                Ae(13, Fj, 2, 2, 'option', 7),
                _()(),
                D(14, 'div')(15, 'label', 8),
                E(16, 'Subject:'),
                _(),
                D(17, 'select', 9),
                Ae(18, kj, 2, 2, 'option', 7),
                _()(),
                D(19, 'div')(20, 'label', 10),
                E(21, 'File:'),
                _(),
                D(22, 'input', 11),
                X('change', function (s) {
                  return o.onFileChange(s)
                }),
                _()(),
                D(23, 'div')(24, 'button', 12),
                E(25, 'Submit'),
                _()()()),
                2 & r &&
                  (q('formGroup', o.fileUploadForm),
                  O(13),
                  q('ngForOf', o.fields),
                  O(5),
                  q('ngForOf', o.subjects),
                  O(6),
                  q('disabled', !o.fileUploadForm.valid))
            },
            dependencies: [Er, Vo, mh, yh, Qn, fs, Ir, Fo, Tr, jo],
            styles: [
              'form[_ngcontent-%COMP%]{max-width:600px;margin:0 auto;padding:1rem;border:1px solid #ccc;border-radius:.5rem;background-color:#f9f9f9}form[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{margin-bottom:1rem}label[_ngcontent-%COMP%]{display:block;margin-bottom:.5rem;font-weight:700}input[type=text][_ngcontent-%COMP%], input[type=file][_ngcontent-%COMP%], select[_ngcontent-%COMP%]{width:100%;padding:.5rem;border:1px solid #ccc;border-radius:.25rem;box-sizing:border-box}button[_ngcontent-%COMP%]{background-color:#007bff;color:#fff;padding:.5rem 1rem;border:none;border-radius:.25rem;cursor:pointer;font-size:1rem}button[disabled][_ngcontent-%COMP%]{background-color:#ccc;cursor:not-allowed}button[_ngcontent-%COMP%]:not([disabled]):hover{background-color:#0056b3}@media (max-width: 600px){form[_ngcontent-%COMP%]{padding:1rem}}',
            ],
          }))
        }
        return e
      })()
      function Vj(e, n) {
        if (1 & e) {
          const t = Io()
          D(0, 'tr')(1, 'td'),
            E(2),
            _(),
            D(3, 'td'),
            E(4),
            _(),
            D(5, 'td')(6, 'a', 1),
            E(7, 'View File'),
            _()(),
            D(8, 'td'),
            E(9),
            bn(10, 'date'),
            _(),
            D(11, 'td')(12, 'button', 2),
            X('click', function () {
              const i = Wr(t).$implicit
              return Zr(vr(2).deleteDocument(i._id))
            }),
            E(13, 'Delete'),
            _(),
            D(14, 'button'),
            E(15, 'Edit'),
            _()()()
        }
        if (2 & e) {
          const t = n.$implicit
          O(2),
            xe(t.name),
            O(2),
            xe(t.desc),
            O(2),
            q('href', t.file_url, Si),
            O(3),
            xe(nD(10, 4, t.createdAt, 'short'))
        }
      }
      function jj(e, n) {
        if (
          (1 & e &&
            (D(0, 'div')(1, 'h2'),
            E(2),
            _(),
            D(3, 'p')(4, 'strong'),
            E(5, 'Description:'),
            _(),
            E(6),
            _(),
            D(7, 'p')(8, 'strong'),
            E(9, 'Tags:'),
            _(),
            E(10),
            _(),
            D(11, 'table')(12, 'thead')(13, 'tr')(14, 'th'),
            E(15, 'Name'),
            _(),
            D(16, 'th'),
            E(17, 'Description'),
            _(),
            D(18, 'th'),
            E(19, 'File URL'),
            _(),
            D(20, 'th'),
            E(21, 'Created At'),
            _(),
            D(22, 'th'),
            E(23, 'Action'),
            _()()(),
            D(24, 'tbody'),
            Ae(25, Vj, 16, 7, 'tr', 0),
            _()()()),
          2 & e)
        ) {
          const t = n.$implicit
          O(2),
            He('Subject: ', t.subject.name, ''),
            O(4),
            He(' ', t.subject.desc, ''),
            O(4),
            He(' ', t.subject.tags.join(', '), ''),
            O(15),
            q('ngForOf', t.documents)
        }
      }
      let $j = (() => {
        class e {
          ngOnInit() {
            this.getDocuments()
          }
          constructor(t) {
            this.apiService = t
          }
          getDocuments() {
            ;(this.result = []),
              this.apiService.get('/user/get-documents').subscribe((t) => {
                t && (this.result = t.result)
              })
          }
          deleteDocument(t) {
            this.apiService
              .delete(`/user/delete-document/${t}`)
              .subscribe((r) => {
                r && this.getDocuments()
              })
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(Fn))
          })
          static #t = (this.ɵcmp = Le({
            type: e,
            selectors: [['app-my-documents']],
            decls: 1,
            vars: 1,
            consts: [
              [4, 'ngFor', 'ngForOf'],
              ['target', '_blank', 3, 'href'],
              [3, 'click'],
            ],
            template: function (r, o) {
              1 & r && Ae(0, jj, 26, 4, 'div', 0),
                2 & r && q('ngForOf', o.result)
            },
            dependencies: [Er, LC],
            styles: [
              'table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin-bottom:20px}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{padding:8px 12px;border:1px solid #ddd}th[_ngcontent-%COMP%]{background-color:#f4f4f4}h2[_ngcontent-%COMP%]{margin-top:20px}',
            ],
          }))
        }
        return e
      })()
      function Bj(e, n) {
        if (1 & e) {
          const t = Io()
          D(0, 'li', 2),
            X('click', function () {
              const i = Wr(t).$implicit
              return Zr(vr().selectChat(i))
            }),
            E(1),
            _()
        }
        if (2 & e) {
          const t = n.$implicit
          O(1), _r(' ', t.firstName, ' ', t.lastName, ' ')
        }
      }
      let Uj = (() => {
        class e {
          constructor(t, r) {
            ;(this.router = t), (this.apiService = r), (this.chats = [])
          }
          ngOnInit() {
            this.apiService.get('/user-list').subscribe((t) => {
              200 === t.status && (this.chats = t.result)
            })
          }
          selectChat(t) {
            this.router.navigate(['/dashboard/chat', t._id])
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(v(Pe), v(Fn))
          })
          static #t = (this.ɵcmp = Le({
            type: e,
            selectors: [['app-chat-list']],
            decls: 5,
            vars: 1,
            consts: [
              [1, 'chat-list'],
              [3, 'click', 4, 'ngFor', 'ngForOf'],
              [3, 'click'],
            ],
            template: function (r, o) {
              1 & r &&
                (D(0, 'div', 0)(1, 'h3'),
                E(2, 'Chat List'),
                _(),
                D(3, 'ul'),
                Ae(4, Bj, 2, 2, 'li', 1),
                _()()),
                2 & r && (O(4), q('ngForOf', o.chats))
            },
            dependencies: [Er],
          }))
        }
        return e
      })()
      const Hj = {
        url: '',
        deserializer: (e) => JSON.parse(e.data),
        serializer: (e) => JSON.stringify(e),
      }
      class tp extends Sl {
        constructor(n, t) {
          if ((super(), (this._socket = null), n instanceof he))
            (this.destination = t), (this.source = n)
          else {
            const r = (this._config = Object.assign({}, Hj))
            if (((this._output = new ut()), 'string' == typeof n)) r.url = n
            else for (const o in n) n.hasOwnProperty(o) && (r[o] = n[o])
            if (!r.WebSocketCtor && WebSocket) r.WebSocketCtor = WebSocket
            else if (!r.WebSocketCtor)
              throw new Error('no WebSocket constructor can be found')
            this.destination = new vl()
          }
        }
        lift(n) {
          const t = new tp(this._config, this.destination)
          return (t.operator = n), (t.source = this), t
        }
        _resetState() {
          ;(this._socket = null),
            this.source || (this.destination = new vl()),
            (this._output = new ut())
        }
        multiplex(n, t, r) {
          const o = this
          return new he((i) => {
            try {
              o.next(n())
            } catch (a) {
              i.error(a)
            }
            const s = o.subscribe({
              next: (a) => {
                try {
                  r(a) && i.next(a)
                } catch (u) {
                  i.error(u)
                }
              },
              error: (a) => i.error(a),
              complete: () => i.complete(),
            })
            return () => {
              try {
                o.next(t())
              } catch (a) {
                i.error(a)
              }
              s.unsubscribe()
            }
          })
        }
        _connectSocket() {
          const {
              WebSocketCtor: n,
              protocol: t,
              url: r,
              binaryType: o,
            } = this._config,
            i = this._output
          let s = null
          try {
            ;(s = t ? new n(r, t) : new n(r)),
              (this._socket = s),
              o && (this._socket.binaryType = o)
          } catch (u) {
            return void i.error(u)
          }
          const a = new at(() => {
            ;(this._socket = null), s && 1 === s.readyState && s.close()
          })
          ;(s.onopen = (u) => {
            const { _socket: l } = this
            if (!l) return s.close(), void this._resetState()
            const { openObserver: c } = this._config
            c && c.next(u)
            const d = this.destination
            ;(this.destination = Ls.create(
              (f) => {
                if (1 === s.readyState)
                  try {
                    const { serializer: h } = this._config
                    s.send(h(f))
                  } catch (h) {
                    this.destination.error(h)
                  }
              },
              (f) => {
                const { closingObserver: h } = this._config
                h && h.next(void 0),
                  f && f.code
                    ? s.close(f.code, f.reason)
                    : i.error(
                        new TypeError(
                          'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }'
                        )
                      ),
                  this._resetState()
              },
              () => {
                const { closingObserver: f } = this._config
                f && f.next(void 0), s.close(), this._resetState()
              }
            )),
              d && d instanceof vl && a.add(d.subscribe(this.destination))
          }),
            (s.onerror = (u) => {
              this._resetState(), i.error(u)
            }),
            (s.onclose = (u) => {
              s === this._socket && this._resetState()
              const { closeObserver: l } = this._config
              l && l.next(u), u.wasClean ? i.complete() : i.error(u)
            }),
            (s.onmessage = (u) => {
              try {
                const { deserializer: l } = this._config
                i.next(l(u))
              } catch (l) {
                i.error(l)
              }
            })
        }
        _subscribe(n) {
          const { source: t } = this
          return t
            ? t.subscribe(n)
            : (this._socket || this._connectSocket(),
              this._output.subscribe(n),
              n.add(() => {
                const { _socket: r } = this
                0 === this._output.observers.length &&
                  (r && (1 === r.readyState || 0 === r.readyState) && r.close(),
                  this._resetState())
              }),
              n)
        }
        unsubscribe() {
          const { _socket: n } = this
          n && (1 === n.readyState || 0 === n.readyState) && n.close(),
            this._resetState(),
            super.unsubscribe()
        }
      }
      let zj = (() => {
        class e {
          constructor(t) {
            ;(this.apiService = t),
              (this.messagesSubject = new lt([])),
              (this.messages$ = this.messagesSubject.asObservable())
          }
          createWebSocketConnection(t) {
            return new he((r) => {
              !this.socket$ || this.socket$.closed
                ? ((this.socket$ = new tp(
                    `ws://103.127.31.207:3000?token=${t}`
                  )),
                  this.socket$
                    .pipe(
                      W((o) => [...this.messagesSubject.getValue(), o]),
                      Nn((o) => (console.error('WebSocket error:', o), Tt))
                    )
                    .subscribe(r))
                : r.complete()
            })
          }
          connect(t) {
            this.createWebSocketConnection(t).subscribe(() =>
              console.log('WebSocket connection established')
            )
          }
          sendMessage(t) {
            this.socket$ && this.socket$.next(t)
          }
          getMessages() {
            return console.log('Message received '), this.messages$
          }
          fetchInitialMessages(t) {
            return this.apiService
              .get(`/user/messages/${t}`)
              .pipe(
                Nn(
                  (r) => (
                    console.error('Error fetching initial messages:', r), Tt
                  )
                )
              )
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(M(Fn))
          })
          static #t = (this.ɵprov = N({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      function qj(e, n) {
        if ((1 & e && (D(0, 'div'), E(1), _()), 2 & e)) {
          const t = n.$implicit
          O(1), _r(' ', t.sender, ': ', t.content, ' ')
        }
      }
      const Wj = [
        { path: '', component: Tj },
        { path: 'login', component: yj },
        { path: 'sign-up', component: _j },
        { path: 'document-details', component: xj },
        { path: 'invite-mail', component: Pj },
        { path: 'dashboard', component: YE, canActivate: [ep] },
        {
          path: 'dashboard',
          component: YE,
          canActivate: [ep],
          children: [
            { path: 'upload-file', component: Lj },
            { path: 'see-your-files', component: $j },
            { path: 'profile', component: QE },
            { path: 'chat-list', component: Uj },
            {
              path: 'chat/:id',
              component: (() => {
                class e {
                  constructor(t, r) {
                    ;(this.route = t),
                      (this.websocketService = r),
                      (this.messages = []),
                      (this.newMessage = ''),
                      (this.userId = '')
                  }
                  ngOnInit() {
                    this.userId = this.route.snapshot.paramMap.get('id') || ''
                    const t = localStorage.getItem('token') || ''
                    this.websocketService.connect(t),
                      this.websocketService
                        .fetchInitialMessages(this.userId)
                        .subscribe((r) => {
                          console.log(r),
                            200 === r.status && (this.messages = r.result)
                        }),
                      this.websocketService.getMessages().subscribe((r) => {
                        this.messages = [...this.messages, ...r]
                      })
                  }
                  sendMessage() {
                    const t = {
                      type: 'private',
                      content: this.newMessage,
                      receiverId: this.userId,
                    }
                    ;(this.messages = [...this.messages, t]),
                      this.websocketService.sendMessage(t),
                      (this.newMessage = '')
                  }
                  static #e = (this.ɵfac = function (r) {
                    return new (r || e)(v(Rn), v(zj))
                  })
                  static #t = (this.ɵcmp = Le({
                    type: e,
                    selectors: [['app-chat-personal']],
                    decls: 8,
                    vars: 3,
                    consts: [
                      [1, 'chat-personal'],
                      [1, 'messages'],
                      [4, 'ngFor', 'ngForOf'],
                      [
                        'type',
                        'text',
                        'placeholder',
                        'Type a message...',
                        3,
                        'ngModel',
                        'ngModelChange',
                      ],
                      [3, 'click'],
                    ],
                    template: function (r, o) {
                      1 & r &&
                        (D(0, 'div', 0)(1, 'h3'),
                        E(2),
                        _(),
                        D(3, 'div', 1),
                        Ae(4, qj, 2, 2, 'div', 2),
                        _(),
                        D(5, 'input', 3),
                        X('ngModelChange', function (s) {
                          return (o.newMessage = s)
                        }),
                        _(),
                        D(6, 'button', 4),
                        X('click', function () {
                          return o.sendMessage()
                        }),
                        E(7, 'Send'),
                        _()()),
                        2 & r &&
                          (O(2),
                          He('Chat with ', o.userId, ''),
                          O(2),
                          q('ngForOf', o.messages),
                          O(1),
                          q('ngModel', o.newMessage))
                    },
                    dependencies: [Er, Qn, Ir, Uu],
                  }))
                }
                return e
              })(),
            },
          ],
        },
        { path: 'profile', component: QE, canActivate: [ep] },
      ]
      let XE = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({ imports: [Hh.forRoot(Wj), Hh] }))
          }
          return e
        })(),
        JE = (() => {
          class e {
            constructor() {
              ;(this._loading = new lt(!1)),
                (this.loading$ = this._loading.asObservable())
            }
            show() {
              this._loading.next(!1)
            }
            hide() {
              this._loading.next(!1)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = N({
              token: e,
              factory: e.ɵfac,
              providedIn: 'root',
            }))
          }
          return e
        })()
      function Zj(e, n) {
        1 & e && (D(0, 'div', 1), Re(1, 'div', 2), _())
      }
      let Yj = (() => {
          class e {
            constructor(t) {
              ;(this.loadingService = t),
                (this.loading$ = this.loadingService.loading$)
            }
            ngOnInit() {}
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(v(JE))
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-loader']],
              decls: 2,
              vars: 3,
              consts: [
                ['class', 'loading-overlay', 4, 'ngIf'],
                [1, 'loading-overlay'],
                [1, 'spinner'],
              ],
              template: function (r, o) {
                1 & r && (Ae(0, Zj, 2, 0, 'div', 0), bn(1, 'async')),
                  2 & r && q('ngIf', qn(1, 1, o.loading$))
              },
              dependencies: [rs, kC],
              styles: [
                '.loading-overlay[_ngcontent-%COMP%]{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:center;z-index:9999}.spinner[_ngcontent-%COMP%]{border:16px solid #f3f3f3;border-top:16px solid #3498db;border-radius:50%;width:120px;height:120px;animation:_ngcontent-%COMP%_spin 2s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}',
              ],
            }))
          }
          return e
        })(),
        Qj = (() => {
          class e {
            constructor() {
              this.title = 'free-notes-client'
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵcmp = Le({
              type: e,
              selectors: [['app-root']],
              decls: 2,
              vars: 0,
              template: function (r, o) {
                1 & r && Re(0, 'app-loader')(1, 'router-outlet')
              },
              dependencies: [ol, Yj],
            }))
          }
          return e
        })()
      class Xj {
        http
        prefix
        suffix
        constructor(n, t = '/assets/i18n/', r = '.json') {
          ;(this.http = n), (this.prefix = t), (this.suffix = r)
        }
        getTranslation(n) {
          return this.http.get(`${this.prefix}${n}${this.suffix}`)
        }
      }
      function Jj(e) {
        return new Xj(e)
      }
      let KE = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({
              imports: [
                ZE.forRoot({
                  loader: { provide: xs, useFactory: Jj, deps: [Xo] },
                }),
                ZE,
              ],
            }))
          }
          return e
        })(),
        Kj = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({ imports: [Su, zu, _h, KE] }))
          }
          return e
        })(),
        e$ = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({ imports: [Su, Hh, _h, zu, KE] }))
          }
          return e
        })(),
        t$ = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e }))
            static #n = (this.ɵinj = Oe({ imports: [Su, XE, _h, zu] }))
          }
          return e
        })(),
        n$ = (() => {
          class e {
            constructor(t) {
              this.loadingService = t
            }
            intercept(t, r) {
              return (
                this.loadingService.show(),
                r.handle(t).pipe($o(() => this.loadingService.hide()))
              )
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(M(JE))
            })
            static #t = (this.ɵprov = N({ token: e, factory: e.ɵfac }))
          }
          return e
        })(),
        r$ = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = Ve({ type: e, bootstrap: [Qj] }))
            static #n = (this.ɵinj = Oe({
              providers: [{ provide: NE, useClass: n$, multi: !0 }],
              imports: [pk, XE, Kj, e$, zu, cj, t$],
            }))
          }
          return e
        })()
      fk()
        .bootstrapModule(r$)
        .catch((e) => console.error(e))
    },
  },
  (oe) => {
    oe((oe.s = 844))
  },
])
