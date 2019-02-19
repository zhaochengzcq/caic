/* eslint-disable */

;(function(c) {
  var e

  var d =
    '<svg><symbol id="icon-delete" viewBox="0 0 1024 1024"><path d="M341.34016 128l554.65984 0q53.00224 0 90.50112 37.49888t37.49888 90.50112l0 512q0 53.00224-37.49888 90.50112t-90.50112 37.49888l-554.65984 0-341.34016-384zM896 213.34016l-516.34176 0-265.33888 298.65984 265.33888 298.65984 516.34176 0q17.67424 0 30.16704-12.4928t12.4928-30.16704l0-512q0-17.67424-12.4928-30.16704t-30.16704-12.4928zM810.65984 384q0 18.00192-12.32896 30.33088l-97.9968 97.66912 97.9968 97.66912q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-97.66912-97.9968-97.66912 97.9968q-12.32896 12.32896-30.33088 12.32896-17.67424 0-30.16704-12.4928t-12.4928-30.16704q0-17.32608 12.32896-30.33088l97.9968-97.66912-97.9968-97.66912q-12.32896-13.0048-12.32896-30.33088 0-17.67424 12.4928-30.16704t30.16704-12.4928q18.00192 0 30.33088 12.32896l97.66912 97.9968 97.66912-97.9968q12.32896-12.32896 30.33088-12.32896 18.3296 0 30.49472 12.16512t12.16512 30.49472z"  ></path></symbol></svg>'

  var t = (e = document.getElementsByTagName('script'))[
    e.length - 1
  ].getAttribute('data-injectcss')
  if (t && !c.__iconfont__svg__cssinject__) {
    c.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  !(function(e) {
    if (document.addEventListener) {
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
        setTimeout(e, 0)
      } else {
        var t = function() {
          document.removeEventListener('DOMContentLoaded', t, !1), e()
        }
        document.addEventListener('DOMContentLoaded', t, !1)
      }
    } else {
      document.attachEvent &&
        ((n = e),
        (o = c.document),
        (i = !1),
        (l = function() {
          i || ((i = !0), n())
        }),
        (d = function() {
          try {
            o.documentElement.doScroll('left')
          } catch (e) {
            return void setTimeout(d, 50)
          }
          l()
        })(),
        (o.onreadystatechange = function() {
          o.readyState == 'complete' && ((o.onreadystatechange = null), l())
        }))
    }
    var n, o, i, l, d
  })(function() {
    var e, t, n, o, i, l
    ;((e = document.createElement('div')).innerHTML = d),
      (d = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (n = t),
        (o = document.body).firstChild
          ? ((i = n), (l = o.firstChild).parentNode.insertBefore(i, l))
          : o.appendChild(n))
  })
})(window)
