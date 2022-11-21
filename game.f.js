var CRENDER_DEBUG = !1, Utils;
function ImagesPreloader() {
    this.loadedImages = {},
    this.data = null,
    this.endCallback = null,
    this.processCallback = null,
    this.minProgressVal = 0,
    this.maxProgressVal = 100,
    this.wait = Utils.proxy(this.wait, this)
}
function SoundsPreloader(t, e, i) {
    this.sounds = t,
    this.endCallback = e,
    this.progressCallback = i,
    this.loadedCount = 0,
    this.minProgressVal = 0,
    this.maxProgressVal = 100
}
function Asset(t, e, i, s, a, o) {
    this.name = t + "",
    this.src = e + "",
    this.width = i,
    this.height = s,
    this.frames = a,
    this.layers = o,
    this.bitmap = null,
    this.object = null,
    this.ready = !(!this.width || !this.height),
    this.spriteClass = null
}
function AssetsLibrary(t, e, i) {
    this.path = "images",
    this.scale = 1,
    this.items = {},
    this.bitmaps = {},
    this.loaded = !1,
    this.onload = null,
    this.onloadprogress = null,
    this.spriteClass = Sprite,
    this.onLoadHandler = Utils.proxy(this.onLoadHandler, this),
    this.onLoadProgressHandler = Utils.proxy(this.onLoadProgressHandler, this),
    this.init(t, e),
    this.addAssets(i)
}
function Vector(t, e) {
    void 0 === t && (t = 0),
    this.x = t,
    void 0 === e && (e = 0),
    this.y = e
}
function Rectangle(t, e, i, s, a) {
    this.center = new Vector(t,e),
    this.width = i,
    this.height = s,
    this.angle = a,
    this.vertices = [],
    this.AABB = [],
    this.refreshVertices()
}
void 0 === window.console && (window.console = {
    log: function() {}
}),
window.Utils || (Utils = {}),
Utils.detectMobileBrowser = function() {
    return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
}
,
Utils.detectTouchScreen = function() {
    return "ontouchstart"in window || 0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints
}
,
Utils.getTouchStartEvent = function() {
    return Utils.isWindowsPhone() ? "MSPointerDown" : "touchstart"
}
,
Utils.getTouchMoveEvent = function() {
    return Utils.isWindowsPhone() ? "MSPointerMove" : "touchmove"
}
,
Utils.getTouchEndEvent = function() {
    return Utils.isWindowsPhone() ? "MSPointerUp" : "touchend"
}
,
Utils.touchScreen = Utils.detectMobileBrowser(),
Utils.globalScale = 1,
Utils.globalPixelScale = 1,
Utils.isWindowHidden = !1,
Utils.DOMMainContainerId = "main_container",
Utils.DOMProgressContainerId = "progress_container",
Utils.DOMProgressId = "progress",
Utils.DOMScreenBackgroundContainerId = "screen_background_container",
Utils.DOMScreenBackgroundWrapperId = "screen_background_wrapper",
Utils.DOMScreenBackgroundId = "screen_background",
Utils.DOMScreenContainerId = "screen_container",
Utils.DOMScreenWrapperId = "screen_wrapper",
Utils.DOMScreenId = "screen",
Utils.DOMP2lContainerId = "p2l_container",
Utils.DOMP2lId = "p2l",
Utils.DOMMarkId = "mark",
Utils.trace = function(t) {
    var e;
    try {
        throw new Error("")
    } catch (t) {
        e = t.stack || ""
    }
    return (e = e.split("\n")).splice(0, 2),
    e = e.join("\n"),
    t || console.log(e),
    e
}
,
Utils.setCookie = function(e, i) {
    try {
        window.localStorage.setItem(e, i)
    } catch (t) {
        var s = new Date;
        s.setDate(s.getDate() + 3650),
        document.cookie = e + "=" + i + "; expires=" + s.toUTCString()
    }
}
,
Utils.getCookie = function(e) {
    var i;
    try {
        i = window.localStorage.getItem(e)
    } catch (t) {
        var s = e + "="
          , a = document.cookie.indexOf(s);
        if (-1 == a)
            return null;
        var o = document.cookie.indexOf(";", a + s.length);
        -1 == o && (o = document.cookie.length),
        i = decodeURIComponent(document.cookie.substring(a + s.length, o))
    }
    return i
}
,
Utils.bindEvent = function(t, e, i) {
    t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e.toLowerCase(), i)
}
,
Utils.unbindEvent = function(t, e, i) {
    t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && t.detachEvent("on" + e, i)
}
,
Utils.getObjectLeft = function(t) {
    var e = t.offsetLeft;
    return t.offsetParent && (e += Utils.getObjectLeft(t.offsetParent)),
    e
}
,
Utils.getObjectTop = function(t) {
    var e = t.offsetTop;
    return t.offsetParent && (e += Utils.getObjectTop(t.offsetParent)),
    e
}
,
Utils.parseGet = function() {
    var t, e, i = {}, s = window.location.toString(), a = window.location.toString().indexOf("?");
    if (0 <= a) {
        e = (s = s.substr(a + 1, s.length)).split("&");
        for (var o = 0; o < e.length; o++)
            i[(t = e[o].split("="))[0]] = t[1]
    }
    return i
}
,
Utils.getMouseCoord = function(t, e) {
    var i = t || window.event;
    if (i.touches && (i = i.touches[0]),
    !i)
        return {
            x: 0,
            y: 0
        };
    var s = 0
      , a = 0
      , o = 0
      , n = 0;
    return e && (s = Utils.getObjectLeft(e),
    a = Utils.getObjectTop(e)),
    i.pageX || i.pageY ? (o = i.pageX,
    n = i.pageY) : (i.clientX || i.clientY) && (o = i.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft,
    n = i.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop),
    {
        x: o - s,
        y: n - a
    }
}
,
Utils.removeFromArray = function(t, e) {
    for (var i = [], s = 0; s < t.length; s++)
        t[s] != e && i.push(t[s]);
    return i
}
,
Utils.showLoadProgress = function(t) {
    var e = Utils.globalScale
      , i = "Loading: " + t + "%";
    i += "<br><br>",
    i += '<div style="display: block; background: #000; width: ' + t * e * 2 + "px; height: " + 10 * e + 'px;">&nbsp;</div>',
    document.getElementById(Utils.DOMProgressId).innerHTML = i
}
,
Utils.hideAddressBarLock = !1,
Utils.mobileHideAddressBar = function() {
    Utils.hideAddressBarLock || window.scrollTo(0, 1)
}
,
Utils.mobileCheckIphone4 = function() {
    return Utils.detectMobileBrowser() && 0 <= navigator.userAgent.indexOf("iPhone") && 2 == window.devicePixelRatio
}
,
Utils.mobileCheckBrokenAndroid = function() {
    return Utils.detectMobileBrowser() && Utils.isAndroid() && !Utils.isChrome() && !Utils.isFirefox()
}
,
Utils.mobileCheckSlowDevice = function() {
    return Utils.mobileCheckBrokenAndroid() && 0 <= navigator.userAgent.toLowerCase().indexOf("sm-t310") || Utils.detectMobileBrowser() && Utils.isAndroid() && Utils.isFirefox() && 0 <= navigator.userAgent.toLowerCase().indexOf("sm-t310")
}
,
Utils.isChrome = function() {
    var t = !1;
    0 <= navigator.userAgent.toLowerCase().indexOf("chrome") && (t = !0,
    !Utils.isAndroid() || (parseInt((/Chrome\/([0-9]+)/.exec(navigator.appVersion) || 0)[1], 10) || 0) < 22 && (t = !1));
    return t
}
,
Utils.isAndroid = function() {
    return 0 <= navigator.userAgent.toLowerCase().indexOf("android")
}
,
Utils.isIOS = function() {
    return !(Utils.isWindowsPhone() || !navigator.userAgent.toLowerCase().match(/(ipad|iphone|ipod)/g))
}
,
Utils.isPlayFreeBrowser = function() {
    return 0 <= navigator.userAgent.toLowerCase().indexOf("playfreebrowser")
}
,
Utils.isFirefox = function() {
    return 0 <= navigator.userAgent.toLowerCase().indexOf("firefox")
}
,
Utils.isIE = function() {
    return 0 <= navigator.userAgent.toLowerCase().indexOf("MSIE") || "Microsoft Internet Explorer" == navigator.appName
}
,
Utils.isWindowsPhone = function() {
    return 0 <= navigator.userAgent.toLowerCase().indexOf("windows phone")
}
,
Utils.disableCorrectPixelRatio = !1,
Utils.mobileCorrectPixelRatio = function() {
    if (!Utils.isWindowsPhone()) {
        for (var t = document.getElementsByTagName("head")[0].getElementsByTagName("meta"), e = !0, i = null, s = "", a = 0; a < t.length; a++)
            if ("viewport" == t[a].name) {
                i = t[a],
                e = !1;
                break
            }
        e && ((i = document.createElement("meta")).name = "viewport"),
        s += "width=device-width, user-scalable=no";
        var o = 1 / (window.devicePixelRatio ? window.devicePixelRatio : 1);
        o = o.toFixed(2),
        Utils.disableCorrectPixelRatio && (o = 1),
        s += ", initial-scale=" + o + ", maximum-scale=" + o + ", minimum-scale=" + o,
        i.content = s,
        e && document.getElementsByTagName("head")[0].appendChild(i)
    }
}
,
Utils.supportedScales = [{
    scale: 1,
    width: 320,
    height: 480
}, {
    scale: 1.5,
    width: 480,
    height: 720
}, {
    scale: 2,
    width: 640,
    height: 960
}],
Utils.getMobileScreenResolution = function(t) {
    var e = 1
      , i = window.innerWidth
      , s = window.innerHeight;
    i && s || (i = screen.width,
    s = screen.height),
    Utils.disableCorrectPixelRatio && (e = window.devicePixelRatio ? window.devicePixelRatio : 1),
    i *= e,
    s *= e;
    var a = Utils.clone(Utils.supportedScales)
      , o = {
        width: 0,
        height: 0
    }
      , n = "";
    if (Utils.detectMobileBrowser())
        o.width = Math.min(i, s),
        o.height = Math.max(i, s),
        n = "height";
    else {
        if (t)
            for (var r = 0; r < a.length; r++) {
                var h = a[r].width;
                a[r].width = a[r].height,
                a[r].height = h
            }
        o.width = i,
        o.height = s,
        n = "height"
    }
    var d = Number.MAX_VALUE;
    for (r = 0; r < a.length; r++) {
        var l = Math.abs(o[n] - a[r][n]);
        l < d && (d = l,
        e = a[r].scale)
    }
    return Utils.getScaleScreenResolution(e, t)
}
,
Utils.getScaleScreenResolution = function(t, e) {
    var i = Math.round(320 * t)
      , s = Math.round(480 * t);
    return {
        width: e ? s : i,
        height: e ? i : s,
        scale: t
    }
}
,
Utils.imagesRoot = "images",
Utils.initialResolution = {
    width: 320,
    height: 480,
    scale: 1
},
Utils.ignoreMobileHeightCorrection = !1,
Utils.p2lImagePath = null,
Utils.createLayout = function(t, e) {
    var i = Utils.globalScale;
    Utils.initialResolution = e;
    var s = window.innerHeight;
    document.body.style.overflow = "hidden";
    var a = Utils.p2lImagePath || Utils.imagesRoot + "/p2l.jpg"
      , o = "";
    o += '<div id="' + Utils.DOMProgressContainerId + '" align="center" style="width: 100%; height: ' + s + 'px; display: block; position: absolute; left: 0px; top: 0px;">',
    o += '<table cellspacing="0" cellpadding="0" border="0"><tr><td id="' + Utils.DOMProgressId + '" align="center" valign="middle" style="width: ' + e.width + "px; height: " + e.height + "px; color: #000; background: #fff; font-weight: bold; font-family: Verdana; font-size: " + 12 * i + 'px; vertical-align: middle; box-sizing: border-box; text-align: center;"></td></tr></table>',
    o += "</div>",
    o += '<div id="' + Utils.DOMScreenBackgroundContainerId + '" style="width: 100%; height: ' + s + 'px; position: absolute; left: 0px; top: 0px; display: none; z-index: 2;">',
    o += '<div id="' + Utils.DOMScreenBackgroundWrapperId + '" style="width: ' + e.width + "px; height: " + e.height + 'px; position: relative; left: 0px; overflow: hidden;">',
    o += '<canvas id="' + Utils.DOMScreenBackgroundId + '" width="' + e.width + '" height="' + e.height + '" style="transform: translateZ(0)"></canvas>',
    o += "</div>",
    o += "</div>",
    o += '<div id="' + Utils.DOMScreenContainerId + '" style="width: 100%; height: ' + s + 'px; position: absolute; left: 0px; top: 0px; display: none; z-index: 3;">',
    o += '<div id="' + Utils.DOMScreenWrapperId + '" width="' + e.width + '" height="' + e.height + '" style="width: ' + e.width + "px; height: " + e.height + 'px; position: relative; left: 0px; overflow: hidden;">',
    o += '<canvas id="' + Utils.DOMScreenId + '" style="position: absolute; left: 0px; top: 0px;" width="' + e.width + '" height="' + e.height + '">You browser does not support this application :(</canvas>',
    o += "</div>",
    o += "</div>",
    t.innerHTML = o;
    var n = document.createElement("div");
    n.setAttribute("id", Utils.DOMP2lContainerId),
    n.setAttribute("align", "center"),
    n.setAttribute("style", "width: 100%; height: " + s + "px; position: absolute; left: 0px; top: 0px; visibility: hidden; z-index: 1000; background-color: #fff; background-image: url(" + a + "); background-repeat: no-repeat; background-position: center center");
    var r = document.createElement("img");
    if (r.setAttribute("id", Utils.DOMP2lId),
    r.width = 1,
    r.height = 1,
    r.style.display = "none",
    n.appendChild(r),
    t.appendChild(n),
    window.parent == window && Utils.isAndroid() && Utils.isFirefox()) {
        var h = document.createElement("div");
        h.setAttribute("id", Utils.DOMMarkId),
        h.style.position = "fixed",
        h.style.right = "0px",
        h.style.bottom = "0px",
        h.style.width = "1px",
        h.style.height = "1px",
        h.style.background = "",
        h.style.zIndex = "100000",
        t.appendChild(h)
    }
    var d = document.createElement("style");
    d.type = "text/css";
    d.innerHTML = "html body {-ms-content-zooming:none;content-zooming:none;-ms-touch-action:none;touch-action: none;} body {margin:0;padding:0;background:#000;}",
    document.getElementsByTagName("head")[0].appendChild(d),
    Utils.addDetectTouchScreenEvents(),
    Utils.fitLayoutToScreen()
}
,
Utils.addDetectTouchScreenEvents = function() {
    var t = document.getElementById(Utils.DOMScreenId);
    Utils.bindEvent(t, "mousemove", function() {
        Utils.touchScreen = !1
    }),
    Utils.bindEvent(t, Utils.getTouchStartEvent(), function() {
        Utils.touchScreen = !0
    })
}
,
Utils.showMainLayoutContent = function() {
    document.getElementById(Utils.DOMProgressContainerId).style.display = "none",
    document.getElementById(Utils.DOMScreenContainerId).style.display = "block",
    document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = "block"
}
,
Utils.preventEvent = function(t) {
    return t.preventDefault(),
    t.stopPropagation(),
    t.cancelBubble = !0,
    t.returnValue = !1
}
,
Utils.touchStartEventDisabled = !1,
Utils.preventTouchStart = function() {
    Utils.touchStartEventDisabled && Utils.bindEvent(document.body, Utils.getTouchStartEvent(), Utils.preventEvent)
}
,
Utils.removePreventTouchStart = function() {
    Utils.touchStartEventDisabled && Utils.unbindEvent(document.body, Utils.getTouchStartEvent(), Utils.preventEvent)
}
,
Utils.addMobileListeners = function(t, e) {
    !e && navigator.userAgent.match(/(iPad|iPhone|iPod).*CPU.*OS 7_\d/i) || (Utils.touchStartEventDisabled = !0,
    Utils.preventTouchStart()),
    Utils.isPlayFreeBrowser() || Utils.bindEvent(window, "scroll", function() {
        setTimeout(Utils.mobileHideAddressBar, 300)
    });
    var i = Utils.getVisibiltyProps();
    i.visibilityChange && document.addEventListener(i.visibilityChange, Utils.handleVisibilityChange, !1),
    setInterval(function() {
        Utils.checkOrientation(t)
    }, 500),
    setTimeout(Utils.mobileHideAddressBar, 500)
}
,
Utils.handleVisibilityChange = function() {
    Utils.isWindowHidden = document[Utils.getVisibiltyProps().hidden],
    Utils.dispatchEvent(Utils.isWindowHidden ? "hidewindow" : "showwindow"),
    Utils.fixChromeContext()
}
,
Utils.getVisibiltyProps = function() {
    var t, e;
    return void 0 !== document.hidden ? (t = "hidden",
    e = "visibilitychange") : void 0 !== document.mozHidden ? (t = "mozHidden",
    e = "mozvisibilitychange") : void 0 !== document.msHidden ? (t = "msHidden",
    e = "msvisibilitychange") : void 0 !== document.webkitHidden && (t = "webkitHidden",
    e = "webkitvisibilitychange"),
    {
        hidden: t,
        visibilityChange: e
    }
}
,
Utils.staticWindowRect = null,
Utils.setWindowRect = function(t, e) {
    Utils.staticWindowRect = {
        width: t,
        height: e
    }
}
,
Utils.getWindowRect = function() {
    return window.parent == window && Utils.isAndroid() && Utils.isFirefox() && document.getElementById(Utils.DOMMarkId) ? {
        width: window.innerWidth,
        height: document.getElementById(Utils.DOMMarkId).offsetTop + 1
    } : {
        width: window.innerWidth,
        height: window.innerHeight
    }
}
,
Utils.storeOrient = null,
Utils.noCheckOrient = !1,
Utils.checkOrientation = function(t) {
    if (Utils.detectMobileBrowser() && document.getElementById(Utils.DOMScreenContainerId) && !Utils.noCheckOrient && 1 != Utils.parseGet().nocheckorient) {
        var e = Utils.getWindowRect()
          , i = e.width > e.height;
        if (Utils.storeOrient !== i)
            (Utils.storeOrient = i) == t ? (Utils.dispatchEvent("unlockscreen"),
            document.getElementById(Utils.DOMP2lContainerId).style.visibility = "hidden",
            document.getElementById(Utils.DOMProgressContainerId).style.visibility = "visible",
            document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = "block",
            document.getElementById(Utils.DOMScreenContainerId).style.display = "block") : (Utils.dispatchEvent("lockscreen"),
            document.getElementById(Utils.DOMP2lContainerId).style.visibility = "visible",
            document.getElementById(Utils.DOMProgressContainerId).style.visibility = "hidden",
            document.getElementById(Utils.DOMScreenBackgroundContainerId).style.display = "none",
            document.getElementById(Utils.DOMScreenContainerId).style.display = "none"),
            setTimeout(Utils.mobileHideAddressBar, 900),
            setTimeout(Utils.fitLayoutToScreen, 1e3)
    }
}
,
Utils.fitLayoutTimer = 0,
Utils.addFitLayoutListeners = function() {
    Utils.fitLayoutTimer = setInterval(Utils.fitLayoutToScreen, 500)
}
,
Utils.removeFitLayoutListeners = function() {
    clearInterval(Utils.fitLayoutTimer)
}
,
Utils.fitLayoutLock = !1,
Utils.fitLayoutCorrectHeight = 0,
Utils.fitLayoutAlign = "center",
Utils.fitLayoutVerticalAlign = "top",
Utils.layoutMargin = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
},
Utils.fixChromeContext = function() {
    if (Utils.isChrome()) {
        var t = document.getElementById(Utils.DOMScreenId);
        t && (t.width++,
        t.width--)
    }
}
,
Utils.fitLayoutToScreen = function(t) {
    var e, i, s, a, o;
    if (Utils.isWindowHidden && Utils.fixChromeContext(),
    !Utils.fitLayoutLock && (o = Utils.getWindowRect(),
    "object" == typeof t && t.width || (i = (a = Utils.staticWindowRect ? Utils.staticWindowRect : o).width,
    s = a.height,
    s += Utils.fitLayoutCorrectHeight,
    s -= Utils.layoutMargin.top,
    s -= Utils.layoutMargin.bottom,
    i -= Utils.layoutMargin.left,
    t = {
        width: i -= Utils.layoutMargin.right,
        height: s
    }),
    t.width && t.height && (e = document.getElementById(Utils.DOMScreenWrapperId)))) {
        e.initWidth || (e.initWidth = Utils.initialResolution.width,
        e.initHeight = Utils.initialResolution.height),
        i = e.initWidth,
        s = e.initHeight;
        var n = t.width / i
          , r = t.height / s
          , h = n < r ? n : r;
        if (Utils.globalPixelScale = h,
        i = Math.floor(i * h),
        s = Math.floor(s * h),
        e.lastWidth != t.width || e.lastHeight != t.height || e.lastRealWidth != o.width || e.lastRealHeight != o.height) {
            e.lastWidth = t.width,
            e.lastHeight = t.height,
            e.lastRealWidth = o.width,
            e.lastRealHeight = o.height,
            Utils.resizeElement(Utils.DOMScreenId, i, s),
            Utils.resizeElement(Utils.DOMScreenBackgroundId, i, s),
            Utils.resizeElement(Utils.DOMProgressContainerId, a.width, a.height),
            Utils.resizeElement(Utils.DOMProgressId, i, s),
            e = Utils.resizeElement(Utils.DOMScreenWrapperId, i, s),
            Utils.alignElement(e, o, i, s),
            e = Utils.resizeElement(Utils.DOMScreenBackgroundWrapperId, i, s),
            Utils.alignElement(e, o, i, s),
            Utils.resizeElement(Utils.DOMP2lContainerId, a.width, a.height),
            Utils.resizeElement(Utils.DOMScreenContainerId, a.width, a.height),
            Utils.resizeElement(Utils.DOMScreenBackgroundContainerId, a.width, a.height);
            var d = Math.floor(Math.min(o.width, o.height) / 2);
            (e = document.getElementById(Utils.DOMP2lContainerId)) && (e.style.backgroundSize = d + "px " + d + "px"),
            Utils.dispatchEvent("fitlayout"),
            Utils.isPlayFreeBrowser() && window.scrollTo(1, 2),
            setTimeout(Utils.mobileHideAddressBar, 10),
            Utils.fixChromeContext()
        }
    }
}
,
Utils.alignElement = function(t, e, i, s) {
    t && ("left" == Utils.fitLayoutAlign ? t.style.left = Utils.layoutMargin.left + "px" : "right" == Utils.fitLayoutAlign ? t.style.left = Math.floor(e.width - i - Utils.layoutMargin.right) + "px" : t.style.left = Math.floor((e.width - i - Utils.layoutMargin.left - Utils.layoutMargin.right) / 2) + "px",
    "top" == Utils.fitLayoutVerticalAlign ? t.style.top = Utils.layoutMargin.top + "px" : "bottom" == Utils.fitLayoutVerticalAlign ? t.style.top = Math.floor(e.height - s - Utils.layoutMargin.bottom) + "px" : t.style.top = Math.floor((e.height - s - Utils.layoutMargin.top - Utils.layoutMargin.bottom) / 2) + "px")
}
,
Utils.resizeElement = function(t, e, i) {
    var s = document.getElementById(t);
    return s ? (s.style.width = Math.floor(e) + "px",
    s.style.height = Math.floor(i) + "px",
    s) : null
}
,
Utils.drawIphoneLimiter = function(t, e) {
    e ? t.drawRectangle(240, 295, 480, 54, "#f00", !0, .5, !0) : t.drawRectangle(160, 448, 320, 64, "#f00", !0, .5, !0)
}
,
Utils.drawGrid = function(t, e, i) {
    void 0 === e && (e = !1);
    void 0 === i && (i = "#FFF");
    for (var s = {
        w: e ? 480 : 320,
        h: e ? 320 : 480
    }, a = 10; a < s.w; a += 10) {
        var o = .1 + (a - 10) / 10 % 10 * .1;
        t.drawLine(a, 0, a, s.h, 1, i, o)
    }
    for (var n = 10; n < s.h; n += 10)
        o = .1 + (n - 10) / 10 % 10 * .1,
        t.drawLine(0, n, s.w, n, 1, i, o)
}
,
Utils.drawScaleFix = function(t, e) {
    .75 == Utils.globalScale && (e ? t.drawRectangle(507, 160, 54, 320, "#000", !0, 1, !0) : t.drawRectangle(160, 507, 320, 54, "#000", !0, 1, !0)),
    1.5 == Utils.globalScale && (e ? t.drawRectangle(510, 160, 60, 320, "#000", !0, 1, !0) : t.drawRectangle(160, 510, 320, 60, "#000", !0, 1, !0))
}
,
Utils.grad2radian = function(t) {
    return t / (180 / Math.PI)
}
,
Utils.radian2grad = function(t) {
    return t * (180 / Math.PI)
}
,
Utils.eventsListeners = [],
Utils.onlockscreen = null,
Utils.onunlockscreen = null,
Utils.onhidewindow = null,
Utils.onshowwindow = null,
Utils.onfitlayout = null,
Utils.addEventListener = function(t, e) {
    EventsManager.addEvent(Utils, t, e, !1)
}
,
Utils.addEventListenerOnce = function(t, e) {
    EventsManager.addEvent(Utils, t, e, !0)
}
,
Utils.removeEventListener = function(t, e) {
    EventsManager.removeEvent(Utils, t, e)
}
,
Utils.dispatchEvent = function(t, e) {
    return EventsManager.dispatchEvent(Utils, t, e)
}
,
Utils.isArray = function(t) {
    return Array.isArray ? Array.isArray(t) : "[object Array]" === Object.prototype.toString.call(t)
}
,
Utils.isPlainObject = function(t) {
    return !(!t || !t.constructor) && t.constructor === Object
}
,
Utils.getFunctionArguments = function(t, e) {
    return void 0 === e && (e = 0),
    [].slice.call(t, e)
}
,
Utils.proxy = function(i, s) {
    for (var a = [], t = 2; t < arguments.length; t++)
        a.push(arguments[t]);
    return function() {
        for (var t = [], e = 0; e < arguments.length; e++)
            t.push(arguments[e]);
        return i.apply(s || this, t.concat(a))
    }
}
,
Utils.extend = function(t, e) {
    function i() {}
    i.prototype = e.prototype,
    t.prototype = new i,
    (t.prototype.constructor = t).superclass = e.prototype
}
,
Utils.callSuperConstructor = function(t, e) {
    for (var i = [], s = 2; s < arguments.length; s++)
        i.push(arguments[s]);
    t.superclass.constructor.apply(e, i)
}
,
Utils.callSuperMethod = function(t, e, i) {
    for (var s = [], a = 3; a < arguments.length; a++)
        s.push(arguments[a]);
    return t.superclass[i].apply(e, s)
}
,
Utils.copyObjectProps = function(t, e) {
    for (var i in t)
        if (t.hasOwnProperty(i))
            if (Utils.isArray(t[i])) {
                e[i] = [];
                for (var s = 0; s < t[i].length; s++)
                    "object" == typeof t[i][s] && null !== t[i][s] ? (e[i][s] = Utils.cloneEmptyObject(t[i][s]),
                    Utils.copyObjectProps(t[i][s], e[i][s])) : e[i][s] = t[i][s]
            } else
                Utils.isPlainObject(t[i]) ? (e[i] = {},
                Utils.copyObjectProps(t[i], e[i])) : e[i] = t[i]
}
,
Utils.cloneEmptyObject = function(t) {
    return t.constructor ? new t.constructor : {}
}
,
Utils.clone = function(t) {
    if (!t || "object" != typeof t)
        return t;
    var e = Utils.cloneEmptyObject(t);
    return Utils.copyObjectProps(t, e),
    e
}
,
Utils.switchToTimeMode = function(t) {
    Stage.TIMER_MODE = Stage.TIMER_MODE_TIME,
    Tween.STEP_TYPE = Tween.STEP_BY_TIME,
    StageTimer.TIMEOUT_TYPE = StageTimer.TIMEOUT_BY_TIME,
    Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_TIME,
    Sprite.CHANGE_FRAME_DELAY = t
}
,
Utils.getGameID = function() {
    if (window.GAME_ID && "my_game" != window.GAME_ID)
        return window.GAME_ID;
    for (var t = window.location.toString().split("/"), e = ""; !e; )
        1 < (e = t.pop()).split(".").length && (e = ""),
        0 == t.length && (e = "my_game");
    return e
}
,
Utils.ajax = function(t, e, i, s, a, o) {
    var n, r = !1;
    function h(t) {
        "json" == s && (t = JSON.parse(t)),
        "xml" == s && (t = Utils.parseXMLString(t)),
        a && a(t, n)
    }
    if (n = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
    Utils.isIE() && window.XDomainRequest && !document.addEventListener) {
        var d = document.createElement("a");
        d.href = t,
        window.location.hostname && d.hostname && window.location.hostname != d.hostname && (n = new XDomainRequest,
        r = !0)
    }
    if (r ? (n.onload = function() {
        h(n.responseText)
    }
    ,
    n.onerror = function() {
        o && o(1, n)
    }
    ,
    n.ontimeout = function() {
        o && o(0, n)
    }
    ) : n.onreadystatechange = function() {
        if (4 == n.readyState) {
            var t = n.responseText;
            200 != n.status && 0 != n.status || !t ? o && o(n.status, n) : h(t)
        }
    }
    ,
    i) {
        if ("string" != typeof i) {
            var l = [];
            for (var f in i)
                l.push(encodeURIComponent(f) + "=" + encodeURIComponent(i[f]));
            i = l.join("&")
        }
    } else
        i = "";
    e || (e = "GET"),
    n.open(e, t + ("GET" == e ? "?" + i : ""), !0),
    "POST" != e || r || n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
    n.send("GET" != e ? i : null)
}
,
Utils.get = function(t, e, i, s, a) {
    Utils.ajax(t, "GET", e, i, s, a)
}
,
Utils.post = function(t, e, i, s, a) {
    Utils.ajax(t, "POST", e, i, s, a)
}
,
Utils.getBezierBasis = function(t, e, i) {
    function s(t) {
        return t <= 1 ? 1 : t * s(t - 1)
    }
    return s(e) / (s(t) * s(e - t)) * Math.pow(i, t) * Math.pow(1 - i, e - t)
}
,
Utils.getBezierCurve = function(t, e) {
    void 0 === e && (e = .1);
    var i = [];
    e /= t.length;
    for (var s = 0; s < 1 + e; s += e) {
        1 < s && (s = 1);
        var a = i.length;
        i[a] = {
            x: 0,
            y: 0
        };
        for (var o = 0; o < t.length; o++) {
            var n = Utils.getBezierBasis(o, t.length - 1, s);
            i[a].x += t[o].x * n,
            i[a].y += t[o].y * n
        }
    }
    return i
}
,
Utils.parseXMLString = function(t) {
    var e = null;
    if (void 0 !== window.DOMParser)
        e = (new window.DOMParser).parseFromString(t, "text/xml");
    else {
        if (void 0 === window.ActiveXObject || !new window.ActiveXObject("Microsoft.XMLDOM"))
            throw new Error("No XML parser found");
        (e = new window.ActiveXObject("Microsoft.XMLDOM")).async = "false",
        e.loadXML(t)
    }
    return e
}
,
Utils.gotoFullScreen = function(t) {
    (t = t || document.documentElement).requestFullscreen && t.requestFullscreen(),
    t.webkitRequestFullscreen && t.webkitRequestFullscreen(),
    t.mozRequestFullScreen && t.mozRequestFullScreen(),
    t.msRequestFullscreen && t.msRequestFullscreen()
}
,
Utils.cancelFullScreen = function() {
    document.cancelFullScreen && document.cancelFullScreen(),
    document.webkitCancelFullScreen && document.webkitCancelFullScreen(),
    document.mozCancelFullScreen && document.mozCancelFullScreen(),
    document.msExitFullscreen && document.msExitFullscreen(),
    document.exitFullscreen && document.exitFullscreen()
}
,
Utils.isFullScreen = function() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
}
,
Utils.isFullScreenEnabled = function() {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
}
,
Utils.toggleFullScreen = function(t) {
    Utils.isFullScreen() ? Utils.cancelFullScreen() : Utils.gotoFullScreen(t)
}
,
Utils.sign = function(t) {
    return 0 == t ? 0 : 0 < t ? 1 : -1
}
,
ImagesPreloader.prototype.load = function(t, e, i) {
    this.data = t,
    this.endCallback = e,
    this.processCallback = i;
    for (var s = 0; s < this.data.length; s++) {
        var a = this.data[s]
          , o = new Image;
        o.src = a.src,
        this.loadedImages[a.name] = o
    }
    this.wait()
}
,
ImagesPreloader.prototype.wait = function() {
    var t = 0
      , e = 0;
    for (var i in this.loadedImages)
        this.loadedImages[i].complete && t++,
        e++;
    e <= t ? this.endCallback && this.endCallback(this.loadedImages) : (this.processCallback && this.processCallback(Math.floor(t / e * this.maxProgressVal + this.minProgressVal)),
    setTimeout(this.wait, 50))
}
,
SoundsPreloader.prototype.isMp3Support = function() {
    return "" != document.createElement("audio").canPlayType("audio/mpeg")
}
,
SoundsPreloader.prototype.isWebAudio = function() {
    return Boolean(window.AudioMixer) && AudioMixer.isWebAudioSupport()
}
,
SoundsPreloader.prototype.load = function(t, e, i) {
    if (t && (this.sounds = t),
    e && (this.endCallback = e),
    i && (this.progressCallback = i),
    !this.sounds || this.sounds.length < 1 || !this.isWebAudio())
        this.endCallback && this.endCallback();
    else {
        var s, a, o, n = this.isMp3Support() ? "mp3" : "ogg";
        this.loadedCount = 0;
        for (var r = this, h = 0; h < this.sounds.length; h++)
            a = this.sounds[h] + "." + n,
            this.isWebAudio() ? ((s = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")).open("GET", a, !0),
            s.responseType = "arraybuffer",
            s.onreadystatechange = function() {
                if (4 == this.readyState && (200 == this.status || 0 == this.status)) {
                    var e = this.soundSrc;
                    AudioMixer.waContext || (AudioMixer.waContext = new AudioContext),
                    AudioMixer.waContext.decodeAudioData(this.response, function(t) {
                        AudioMixer.buffer[e] = t,
                        r.soundIsLoaded(null, r)
                    }, function() {
                        r.soundIsLoaded(null, r)
                    })
                }
                4 == this.readyState && 404 == this.status && r.soundIsLoaded(null, r)
            }
            ,
            s.soundSrc = a,
            s.send()) : ((o = document.createElement("audio")).src = a,
            o.type = "mp3" == n ? "audio/mpeg" : "audio/ogg",
            o.preload = "auto",
            o.load(),
            o.addEventListener("canplay", Utils.proxy(this.soundIsLoaded, o, this)),
            o.addEventListener("canplaythrough", Utils.proxy(this.soundIsLoaded, o, this)))
    }
}
,
SoundsPreloader.prototype.soundIsLoaded = function(t, e) {
    if (this.nodeName && "audio" == this.nodeName.toLowerCase()) {
        if (this.alreadyLoaded)
            return;
        this.alreadyLoaded = !0
    }
    e.loadedCount++,
    e.progressCallback && e.progressCallback(Math.floor(e.loadedCount / e.sounds.length * e.maxProgressVal + e.minProgressVal)),
    e.loadedCount >= e.sounds.length && e.endCallback && e.endCallback()
}
,
Asset.prototype.detectSize = function() {
    if (!this.bitmap)
        return !1;
    try {
        isNaN(this.width) && (this.width = this.bitmap.width ? parseInt(this.bitmap.width) : 0),
        isNaN(this.height) && (this.height = this.bitmap.height ? parseInt(this.bitmap.height) : 0)
    } catch (t) {
        CRENDER_DEBUG && console.log(t)
    }
    return !isNaN(this.width) && !isNaN(this.height)
}
,
Asset.prototype.normalize = function(t) {
    this.ready || this.detectSize() && ((isNaN(this.frames) || this.frames < 1) && (this.frames = 1),
    (isNaN(this.layers) || this.layers < 1) && (this.layers = 1),
    this.width = Math.ceil(this.width / this.layers / t),
    this.height = Math.ceil(this.height / this.frames / t),
    this.ready = !0)
}
,
AssetsLibrary.prototype.init = function(t, e) {
    void 0 !== t && (this.path = t + ""),
    void 0 !== e && (this.scale = parseFloat(e),
    isNaN(this.scale) && (this.scale = 1))
}
,
AssetsLibrary.prototype.load = function(t, e, i, s) {
    this.onload = t,
    this.onloadprogress = e;
    var a = new ImagesPreloader
      , o = [];
    for (var n in this.items)
        o.push(this.items[n]);
    void 0 !== i && (a.minProgressVal = i),
    void 0 !== s && (a.maxProgressVal = s),
    a.load(o, this.onLoadHandler, this.onLoadProgressHandler)
}
,
AssetsLibrary.prototype.onLoadProgressHandler = function(t) {
    "function" == typeof this.onloadprogress && this.onloadprogress(t)
}
,
AssetsLibrary.prototype.onLoadHandler = function(t) {
    for (var e in this.loaded = !0,
    t) {
        var i = t[e]
          , s = this.items[e];
        s.bitmap = i,
        s.normalize(this.scale)
    }
    "function" == typeof this.onload && this.onload(this.items)
}
,
AssetsLibrary.prototype.addAssets = function(t) {
    if (void 0 !== t && "object" == typeof t)
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            i.noscale = void 0 !== i.noscale && i.noscale,
            i.noscale || (i.src = "%SCALE%/" + i.src),
            this.addAsset(i)
        }
}
,
AssetsLibrary.prototype.addAsset = function(t, e, i, s, a, o) {
    var n = null
      , r = null;
    "object" == typeof t && 1 == arguments.length && (e = t.name,
    i = t.width || NaN,
    s = t.height || NaN,
    a = t.frames || 1,
    o = t.layers || 1,
    n = t.spriteClass || null,
    r = t.properties || null,
    t = t.src),
    t = (t = t.replace("%SCALE%", "%PATH%/" + this.scale)).replace("%PATH%", this.path),
    void 0 === e && (e = t.split("/").pop().split(".").shift() + "");
    var h = new Asset(e,t,i,s,a,o);
    if (h.spriteClass = n,
    r)
        for (var d in r)
            void 0 === h[d] && (h[d] = r[d]);
    return this.items[e] = h
}
,
AssetsLibrary.prototype.addObject = function(t) {
    var e = this.addAsset("%SCALE%/" + t.image, t.name, t.width * this.scale, t.height * this.scale, t.frames, t.layers);
    return e && (e.object = t),
    e
}
,
AssetsLibrary.prototype.getAsset = function(t, e) {
    var i = null;
    if (void 0 !== this.items[t] && this.items[t].bitmap && (i = !(e = void 0 === e || e) || this.items[t].ready ? this.items[t] : null),
    !i)
        throw new Error('Trying to get undefined asset "' + t + '"');
    return i
}
,
AssetsLibrary.prototype.getSprite = function(name, params, spriteClass) {
    var mc = null
      , asset = null;
    try {
        asset = this.getAsset(name, !0)
    } catch (t) {
        asset = new Asset
    }
    if (spriteClass = spriteClass || asset.spriteClass || this.spriteClass || Sprite,
    "string" == typeof spriteClass && (spriteClass = window[spriteClass] ? window[spriteClass] : eval(spriteClass)),
    mc = spriteClass.create && "function" == typeof spriteClass.create ? spriteClass.create(asset, this) : new spriteClass(asset.bitmap,asset.width,asset.height,asset.frames,asset.layers),
    params && "object" == typeof params)
        for (var prop in params)
            mc[prop] = params[prop];
    return mc
}
,
AssetsLibrary.prototype.getBitmap = function(t) {
    try {
        return this.getAsset(t, !0).bitmap
    } catch (t) {
        return null
    }
}
,
Vector.prototype.isZero = function() {
    return 0 == this.x && 0 == this.y
}
,
Vector.prototype.clone = function() {
    return new Vector(this.x,this.y)
}
,
Vector.prototype.add = function(t) {
    return this.x += t.x,
    this.y += t.y,
    this
}
,
Vector.prototype.subtract = function(t) {
    return this.x -= t.x,
    this.y -= t.y,
    this
}
,
Vector.prototype.mult = function(t) {
    return this.x *= t,
    this.y *= t,
    this
}
,
Vector.prototype.invert = function() {
    return this.mult(-1),
    this
}
,
Vector.prototype.rotate = function(t, e) {
    void 0 === e && (e = new Vector(0,0));
    var i = this.clone();
    return i.subtract(e),
    i.x = this.x * Math.cos(t) + this.y * Math.sin(t),
    i.y = this.x * -Math.sin(t) + this.y * Math.cos(t),
    i.add(e),
    this.x = i.x,
    this.y = i.y,
    this
}
,
Vector.prototype.normalize = function(t, e) {
    return void 0 === e && (e = new Vector(0,0)),
    this.subtract(e),
    this.rotate(-t),
    this
}
,
Vector.prototype.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
}
,
Vector.prototype.distanceTo = function(t) {
    var e = this.clone();
    return e.subtract(t),
    e.getLength()
}
,
Rectangle.prototype.clone = function() {
    return new Rectangle(this.center.x,this.center.y,this.width,this.height,this.angle)
}
,
Rectangle.prototype.refreshVertices = function() {
    var t = this.width / 2
      , e = this.height / 2;
    this.vertices = [],
    this.vertices.push(new Vector(-t,e)),
    this.vertices.push(new Vector(t,e)),
    this.vertices.push(new Vector(t,-e)),
    this.vertices.push(new Vector(-t,-e)),
    this.AABB = [this.center.clone(), this.center.clone()];
    for (var i = 0; i < 4; i++)
        this.vertices[i].rotate(-this.angle, this.center),
        this.vertices[i].x < this.AABB[0].x && (this.AABB[0].x = this.vertices[i].x),
        this.vertices[i].x > this.AABB[1].x && (this.AABB[1].x = this.vertices[i].x),
        this.vertices[i].y < this.AABB[0].y && (this.AABB[0].y = this.vertices[i].y),
        this.vertices[i].y > this.AABB[1].y && (this.AABB[1].y = this.vertices[i].y)
}
,
Rectangle.prototype.move = function(t, e) {
    this.center.add(new Vector(t,e)),
    this.refreshVertices()
}
,
Rectangle.prototype.rotate = function(t) {
    this.angle += t,
    this.refreshVertices()
}
,
Rectangle.prototype.hitTestPoint = function(t) {
    var e = t.clone();
    return e.normalize(-this.angle, this.center),
    Math.abs(e.x) <= this.width / 2 && Math.abs(e.y) <= this.height / 2
}
,
Rectangle.prototype.hitTestRectangle = function(t) {
    var e, i = this.clone(), s = t.clone();
    return i.move(-this.center.x, -this.center.y),
    s.move(-this.center.x, -this.center.y),
    s.center.rotate(this.angle),
    i.rotate(-this.angle),
    s.rotate(-this.angle),
    e = Math.max(i.AABB[0].x, i.AABB[1].x, s.AABB[0].x, s.AABB[1].x) - Math.min(i.AABB[0].x, i.AABB[1].x, s.AABB[0].x, s.AABB[1].x),
    !(i.AABB[1].x - i.AABB[0].x + (s.AABB[1].x - s.AABB[0].x) < e) && (e = Math.max(i.AABB[0].y, i.AABB[1].y, s.AABB[0].y, s.AABB[1].y) - Math.min(i.AABB[0].y, i.AABB[1].y, s.AABB[0].y, s.AABB[1].y),
    !(i.AABB[1].y - i.AABB[0].y + (s.AABB[1].y - s.AABB[0].y) < e) && (i.move(-s.center.x, -s.center.y),
    s.move(-s.center.x, -s.center.y),
    i.center.rotate(s.angle),
    i.refreshVertices(),
    i.rotate(-s.angle),
    s.rotate(-s.angle),
    e = Math.max(i.AABB[0].x, i.AABB[1].x, s.AABB[0].x, s.AABB[1].x) - Math.min(i.AABB[0].x, i.AABB[1].x, s.AABB[0].x, s.AABB[1].x),
    !(i.AABB[1].x - i.AABB[0].x + (s.AABB[1].x - s.AABB[0].x) < e) && (e = Math.max(i.AABB[0].y, i.AABB[1].y, s.AABB[0].y, s.AABB[1].y) - Math.min(i.AABB[0].y, i.AABB[1].y, s.AABB[0].y, s.AABB[1].y)) <= i.AABB[1].y - i.AABB[0].y + (s.AABB[1].y - s.AABB[0].y)))
}
;
var EventsManager = {};
function EventsProxy() {
    this.eventsListeners = []
}
EventsManager.addEvent = function(t, e, i, s) {
    if (t.eventsListeners) {
        for (var a = 0; a < t.eventsListeners.length; a++)
            if (t.eventsListeners[a].type === e && t.eventsListeners[a].callback === i)
                return;
        t.eventsListeners.push({
            type: e,
            callback: i,
            once: !!s
        })
    }
}
,
EventsManager.removeEvent = function(t, e, i) {
    if (t.eventsListeners) {
        t["on" + e] == i && (t["on" + e] = null);
        for (var s = 0; s < t.eventsListeners.length; s++)
            if (t.eventsListeners[s].type === e && t.eventsListeners[s].callback === i)
                return void (t.eventsListeners = Utils.removeFromArray(t.eventsListeners, t.eventsListeners[s]))
    }
}
,
EventsManager.dispatchEvent = function(t, e, i) {
    if (t.eventsListeners) {
        var s = !0;
        if ("function" == typeof t["on" + e] && !1 === (s = t["on" + e](i)))
            return !1;
        for (var a = [], o = 0; o < t.eventsListeners.length && (t.eventsListeners[o].type !== e || (t.eventsListeners[o].once && a.push(t.eventsListeners[o]),
        !1 !== (s = t.eventsListeners[o].callback(i)))); o++)
            ;
        for (o = 0; o < a.length; o++)
            EventsManager.removeEvent(t, e, a[o].callback);
        return !1 !== s && void 0
    }
}
,
EventsManager.hasEventListener = function(t, e) {
    if (!t.eventsListeners)
        return !1;
    if (t["on" + e])
        return !0;
    for (var i = 0; i < t.eventsListeners.length; i++)
        if (t.eventsListeners[i].type === e)
            return !0;
    return !1
}
,
EventsManager.removeAllEventListeners = function(t, e) {
    if (t.eventsListeners) {
        void 0 === e ? t.eventsListeners = [] : t["on" + e] && (t["on" + e] = null);
        for (var i = [], s = 0; s < t.eventsListeners.length; s++)
            t.eventsListeners[s].type !== e && i.push(t.eventsListeners[s]);
        t.eventsListeners = i
    }
}
,
EventsProxy.prototype.addEventListener = function(t, e) {
    EventsManager.addEvent(this, t, e, !1)
}
,
EventsProxy.prototype.addEventListenerOnce = function(t, e) {
    EventsManager.addEvent(this, t, e, !0)
}
,
EventsProxy.prototype.removeEventListener = function(t, e) {
    EventsManager.removeEvent(this, t, e)
}
,
EventsProxy.prototype.dispatchEvent = function(t, e) {
    return EventsManager.dispatchEvent(this, t, e)
}
,
EventsProxy.prototype.hasEventListener = function(t) {
    return EventsManager.hasEventListener(this, t)
}
,
EventsProxy.prototype.removeAllEventListeners = function(t) {
    EventsManager.removeAllEventListeners(this, t)
}
;
var Easing = {};
function Tween(t, e, i, s, a, o) {
    if (Utils.callSuperConstructor(Tween, this),
    "object" != typeof t && (t = null),
    t) {
        if (void 0 === t[e])
            throw new Error('Trying to tween undefined property "' + e + '"');
        if (isNaN(t[e]))
            throw new Error("Tweened value can not be " + typeof t[e])
    } else if (isNaN(e))
        throw new Error("Tweened value can not be " + typeof e);
    "function" != typeof o && (o = Easing.linear.easeIn),
    this.obj = t,
    this.prop = e,
    this.start = i,
    this.end = s,
    this.duration = ~~a,
    this.callback = o,
    this.playing = !1,
    this._pos = -1,
    this.autoRewind = !1,
    this.newly = !0,
    this.eventsListeners = []
}
function DisplayObjectContainer() {
    Utils.callSuperConstructor(DisplayObjectContainer, this),
    this.objects = [],
    this.anchor = {
        x: 0,
        y: 0
    }
}
Easing.back = {
    easeIn: function(t, e, i, s) {
        return i * (t /= s) * t * (2.70158 * t - 1.70158) + e
    },
    easeOut: function(t, e, i, s) {
        return i * ((t = t / s - 1) * t * (2.70158 * t + 1.70158) + 1) + e
    },
    easeInOut: function(t, e, i, s) {
        var a = 1.70158;
        return (t /= s / 2) < 1 ? i / 2 * (t * t * ((1 + (a *= 1.525)) * t - a)) + e : i / 2 * ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) + 2) + e
    }
},
Easing.bounce = {
    easeIn: function(t, e, i, s) {
        return i - Easing.bounce.easeOut(s - t, 0, i, s) + e
    },
    easeOut: function(t, e, i, s) {
        return (t /= s) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
    },
    easeInOut: function(t, e, i, s) {
        return t < s / 2 ? .5 * Easing.bounce.easeIn(2 * t, 0, i, s) + e : .5 * Easing.bounce.easeOut(2 * t - s, 0, i, s) + .5 * i + e
    }
},
Easing.circular = {
    easeIn: function(t, e, i, s) {
        return -i * (Math.sqrt(1 - (t /= s) * t) - 1) + e
    },
    easeOut: function(t, e, i, s) {
        return i * Math.sqrt(1 - (t = t / s - 1) * t) + e
    },
    easeInOut: function(t, e, i, s) {
        return (t /= s / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + e : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
    }
},
Easing.cubic = {
    easeIn: function(t, e, i, s) {
        return i * (t /= s) * t * t + e
    },
    easeOut: function(t, e, i, s) {
        return i * ((t = t / s - 1) * t * t + 1) + e
    },
    easeInOut: function(t, e, i, s) {
        return (t /= s / 2) < 1 ? i / 2 * t * t * t + e : i / 2 * ((t -= 2) * t * t + 2) + e
    }
},
Easing.elastic = {
    easeIn: function(t, e, i, s) {
        if (0 == i)
            return e;
        var a = 1.70158
          , o = 0
          , n = 1 * i;
        return 0 == t ? e : 1 == (t /= s) ? e + i : (o || (o = .3 * s),
        a = n < Math.abs(i) ? (n = 1 * i,
        o / 4) : o / (2 * Math.PI) * Math.asin(i / n),
        -n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * s - a) * (2 * Math.PI) / o) + e)
    },
    easeOut: function(t, e, i, s) {
        if (0 == i)
            return e;
        var a = 1.70158
          , o = 0
          , n = 1 * i;
        return 0 == t ? e : 1 == (t /= s) ? e + i : (o || (o = .3 * s),
        a = n < Math.abs(i) ? (n = 1 * i,
        o / 4) : o / (2 * Math.PI) * Math.asin(i / n),
        n * Math.pow(2, -10 * t) * Math.sin((t * s - a) * (2 * Math.PI) / o) + i + e)
    },
    easeInOut: function(t, e, i, s) {
        if (0 == i)
            return e;
        var a = 1.70158
          , o = 0
          , n = 1 * i;
        return 0 == t ? e : 2 == (t /= s / 2) ? e + i : (o || (o = s * (.3 * 1.5)),
        a = n < Math.abs(i) ? (n = 1 * i,
        o / 4) : o / (2 * Math.PI) * Math.asin(i / n),
        t < 1 ? n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * s - a) * (2 * Math.PI) / o) * -.5 + e : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * s - a) * (2 * Math.PI) / o) * .5 + i + e)
    }
},
Easing.exponential = {
    easeIn: function(t, e, i, s) {
        return 0 == t ? e : i * Math.pow(2, 10 * (t / s - 1)) + e
    },
    easeOut: function(t, e, i, s) {
        return t == s ? e + i : i * (1 - Math.pow(2, -10 * t / s)) + e
    },
    easeInOut: function(t, e, i, s) {
        return 0 == t ? e : t == s ? e + i : (t /= s / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + e : i / 2 * (2 - Math.pow(2, -10 * --t)) + e
    }
},
Easing.linear = {
    easeIn: function(t, e, i, s) {
        return i * t / s + e
    },
    easeOut: function(t, e, i, s) {
        return i * t / s + e
    },
    easeInOut: function(t, e, i, s) {
        return i * t / s + e
    }
},
Easing.quadratic = {
    easeIn: function(t, e, i, s) {
        return i * (t /= s) * t + e
    },
    easeOut: function(t, e, i, s) {
        return -i * (t /= s) * (t - 2) + e
    },
    easeInOut: function(t, e, i, s) {
        return (t /= s / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
    }
},
Easing.quartic = {
    easeIn: function(t, e, i, s) {
        return i * (t /= s) * t * t * t + e
    },
    easeOut: function(t, e, i, s) {
        return -i * ((t = t / s - 1) * t * t * t - 1) + e
    },
    easeInOut: function(t, e, i, s) {
        return (t /= s / 2) < 1 ? i / 2 * t * t * t * t + e : -i / 2 * ((t -= 2) * t * t * t - 2) + e
    }
},
Easing.quintic = {
    easeIn: function(t, e, i, s) {
        return i * (t /= s) * t * t * t * t + e
    },
    easeOut: function(t, e, i, s) {
        return i * ((t = t / s - 1) * t * t * t * t + 1) + e
    },
    easeInOut: function(t, e, i, s) {
        return (t /= s / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
    }
},
Easing.sine = {
    easeIn: function(t, e, i, s) {
        return -i * Math.cos(t / s * (Math.PI / 2)) + i + e
    },
    easeOut: function(t, e, i, s) {
        return i * Math.sin(t / s * (Math.PI / 2)) + e
    },
    easeInOut: function(t, e, i, s) {
        return -i / 2 * (Math.cos(Math.PI * t / s) - 1) + e
    }
},
Easing.smoothstep = {
    easeIn: function(t, e, i, s) {
        var a = t / s / 2;
        return a * a * (3 - 2 * a) * 2 * i + e
    },
    easeOut: function(t, e, i, s) {
        var a = (t / s + 1) / 2;
        return (a * a * (3 - 2 * a) * 2 - 1) * i + e
    },
    easeInOut: function(t, e, i, s) {
        var a = t / s;
        return a * a * (3 - 2 * a) * i + e
    }
},
Utils.extend(Tween, EventsProxy),
Tween.prototype.onchange = null,
Tween.prototype.onfinish = null,
Tween.prototype.onrewind = null,
Tween.prototype.play = function() {
    return this.playing = !0,
    this.tick(0),
    this
}
,
Tween.prototype.pause = function() {
    return this.playing = !1,
    this
}
,
Tween.prototype.rewind = function() {
    return this._pos = -1,
    this
}
,
Tween.prototype.forward = function() {
    return this._pos = this.duration,
    this
}
,
Tween.prototype.stop = function() {
    return this.pause(),
    this.rewind(),
    this
}
,
Tween.prototype.updateValue = function(t) {
    return this.obj ? this.obj[this.prop] = t : this.prop = t,
    this
}
,
Tween.prototype.tick = function(t) {
    if (!this.playing)
        return !1;
    if (t || (t = 0),
    Tween.STEP_TYPE == Tween.STEP_BY_FRAME ? this._pos++ : this._pos += t,
    this._pos < 0)
        return !1;
    if (this._pos > this.duration) {
        if (!this.autoRewind)
            return this.finish();
        this._pos -= this.duration,
        this.hasEventListener("rewind") && this.dispatchEvent("rewind", {
            target: this,
            value: this._pos
        })
    }
    var e = this.start == this.end ? 1 * this.start : this.callback(this._pos, this.start, this.end - this.start, this.duration);
    return this.updateValue(e),
    this.hasEventListener("change") && this.dispatchEvent("change", {
        target: this,
        value: e
    }),
    !1
}
,
Tween.prototype.finish = function() {
    return this.stop(),
    this.updateValue(this.end),
    !(this.hasEventListener("finish") && !1 === this.dispatchEvent("finish", {
        target: this,
        value: this.end
    }))
}
,
Tween.STEP_BY_FRAME = 0,
Tween.STEP_BY_TIME = 1,
Tween.STEP_TYPE = Tween.STEP_BY_FRAME,
Utils.extend(DisplayObjectContainer, EventsProxy),
DisplayObjectContainer.prototype.objectsCounter = 0,
DisplayObjectContainer.prototype.scaleX = 1,
DisplayObjectContainer.prototype.scaleY = 1,
DisplayObjectContainer.prototype.opacity = 1,
DisplayObjectContainer.prototype.x = 0,
DisplayObjectContainer.prototype.y = 0,
DisplayObjectContainer.prototype.width = 0,
DisplayObjectContainer.prototype.height = 0,
DisplayObjectContainer.prototype.skewX = 0,
DisplayObjectContainer.prototype.skewY = 0,
DisplayObjectContainer.prototype.rotation = 0,
DisplayObjectContainer.prototype.parent = null,
DisplayObjectContainer.prototype.cropChildren = !1,
DisplayObjectContainer.prototype.hitArea = null,
DisplayObjectContainer.prototype.fillColor = null,
DisplayObjectContainer.prototype.fillLinearGradient = null,
DisplayObjectContainer.prototype.fillRadialGradient = null,
DisplayObjectContainer.prototype.fillPattern = null,
DisplayObjectContainer.prototype.getAbsoluteRotation = function() {
    return this.rotation + (this.parent ? this.parent.getAbsoluteRotation() : 0)
}
,
DisplayObjectContainer.prototype.getAbsoluteOpacity = function() {
    return this.opacity * (this.parent ? this.parent.getAbsoluteOpacity() : 1)
}
,
DisplayObjectContainer.prototype.getAbsoluteScaleX = function() {
    return this.scaleX * (this.parent ? this.parent.getAbsoluteScaleX() : 1)
}
,
DisplayObjectContainer.prototype.getAbsoluteScaleY = function() {
    return this.scaleY * (this.parent ? this.parent.getAbsoluteScaleY() : 1)
}
,
DisplayObjectContainer.prototype.getAbsoluteSkewX = function() {
    return this.skewX + (this.parent ? this.parent.getAbsoluteSkewX() : 0)
}
,
DisplayObjectContainer.prototype.getAbsoluteSkewY = function() {
    return this.skewY + (this.parent ? this.parent.getAbsoluteSkewY() : 0)
}
,
DisplayObjectContainer.prototype.getTransformProps = function() {
    return {
        x: this.x,
        y: this.y,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
        skewX: this.skewX,
        skewY: this.skewY,
        rotation: this.rotation
    }
}
,
DisplayObjectContainer.prototype.setTransformProps = function(t) {
    for (var e in t)
        this[e] = t[e]
}
,
DisplayObjectContainer.prototype.prepareCanvas = function(t) {
    var e = t.getContext("2d");
    e.save();
    var i = this.x
      , s = this.y;
    this.ignoreViewport || this.parent != this.stage || (i -= this.stage.viewport.x,
    s -= this.stage.viewport.y),
    i *= Utils.globalScale,
    s *= Utils.globalScale,
    e.transform(1, this.skewX, this.skewY, 1, i, s),
    e.rotate(this.rotation),
    e.scale(this.scaleX, this.scaleY),
    e.globalAlpha = this.getAbsoluteOpacity()
}
,
DisplayObjectContainer.prototype.moveCanvasAnchor = function(t, e) {
    var i = e ? 1 : -1;
    0 == this.anchor.x && 0 == this.anchor.y || t.getContext("2d").translate(this.anchor.x * Utils.globalScale * i, this.anchor.y * Utils.globalScale * i)
}
,
DisplayObjectContainer.prototype.restoreCanvas = function(t) {
    t.getContext("2d").restore()
}
,
DisplayObjectContainer.prototype.prepareCanvasShadow = function(t, e) {
    if (this.shadowColor) {
        var i = t.getContext("2d");
        if (e || i.save(),
        0 != this.rotation) {
            var s = Math.sqrt(this.shadowOffsetX * this.shadowOffsetX + this.shadowOffsetY + this.shadowOffsetY) * Utils.globalScale
              , a = Math.atan2(this.shadowOffsetY, this.shadowOffsetX) + this.rotation;
            i.shadowOffsetX = Math.cos(a) * s,
            i.shadowOffsetY = Math.sin(a) * s
        } else
            i.shadowOffsetX = this.shadowOffsetX * Utils.globalScale,
            i.shadowOffsetY = this.shadowOffsetY * Utils.globalScale;
        i.shadowColor = this.shadowColor,
        i.shadowBlur = this.shadowBlur * Utils.globalScale
    }
}
,
DisplayObjectContainer.prototype.restoreCanvasShadow = function(t) {
    this.shadowColor && this.restoreCanvas(t)
}
,
DisplayObjectContainer.prototype.render = function(t, e, i) {
    var s = this.visible && this.objects.length && this.cropChildren && this.stage;
    if (s) {
        var a = t;
        t = this.stage.transformBuffer;
        var o = this.getAbsolutePosition()
          , n = o.x
          , r = o.y;
        this.ignoreViewport || this.parent != this.stage || (n -= this.stage.viewport.x,
        r -= this.stage.viewport.y),
        n *= Utils.globalScale,
        r *= Utils.globalScale;
        var h = t.getContext("2d");
        h.save(),
        h.transform(1, 0, 0, 1, n, r),
        h.clearRect((-this.width / 2 - this.anchor.x) * Utils.globalScale - 1, (-this.height / 2 - this.anchor.y) * Utils.globalScale - 1, this.width * Utils.globalScale + 2, this.height * Utils.globalScale + 2)
    }
    for (var d = 0; d < this.objects.length; d++) {
        var l = this.objects[d];
        l.destroy ? (this.removeChild(l),
        d--) : l.visible && l.render(t, e, i)
    }
    s && (a.getContext("2d").drawImage(t, (o.x - this.anchor.x - this.width / 2) * Utils.globalScale, (o.y - this.anchor.y - this.height / 2) * Utils.globalScale, this.width * Utils.globalScale, this.height * Utils.globalScale, (-this.width / 2 - this.anchor.x) * Utils.globalScale, (-this.height / 2 - this.anchor.y) * Utils.globalScale, this.width * Utils.globalScale, this.height * Utils.globalScale),
    t.getContext("2d").restore())
}
,
DisplayObjectContainer.prototype.getX = function() {
    return Math.round(this.x * Utils.globalScale)
}
,
DisplayObjectContainer.prototype.getY = function() {
    return Math.round(this.y * Utils.globalScale)
}
,
DisplayObjectContainer.prototype.getWidth = function() {
    return this.width * Math.abs(this.getAbsoluteScaleX()) * Utils.globalScale
}
,
DisplayObjectContainer.prototype.getHeight = function() {
    return this.height * Math.abs(this.getAbsoluteScaleY()) * Utils.globalScale
}
,
DisplayObjectContainer.prototype.getPosition = function() {
    return {
        x: this.x,
        y: this.y
    }
}
,
DisplayObjectContainer.prototype.setPosition = function(t, e) {
    if (void 0 === e && void 0 !== t.x && void 0 !== t.y)
        return this.setPosition(t.x, t.y);
    this.x = parseFloat(t),
    this.y = parseFloat(e)
}
,
DisplayObjectContainer.prototype.setPropScale = function(t) {
    this.scaleX = this.scaleY = 1 * t
}
,
DisplayObjectContainer.prototype.getAnchor = function() {
    return this.anchor
}
,
DisplayObjectContainer.prototype.setAnchor = function(t, e) {
    if (void 0 === e && void 0 !== t.x && void 0 !== t.y)
        return this.setAnchor(t.x, t.y);
    this.anchor.x = parseFloat(t),
    this.anchor.y = parseFloat(e)
}
,
DisplayObjectContainer.prototype.alignAnchor = function(t, e) {
    return t = parseInt(t),
    isNaN(t) && (t = DisplayObjectContainer.ANCHOR_ALIGN_CENTER),
    t < 0 && (t = DisplayObjectContainer.ANCHOR_ALIGN_LEFT),
    0 < t && (t = DisplayObjectContainer.ANCHOR_ALIGN_RIGHT),
    e = parseInt(e),
    isNaN(e) && (e = DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE),
    e < 0 && (e = DisplayObjectContainer.ANCHOR_VALIGN_TOP),
    0 < e && (e = DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM),
    this.anchor.x = this.width * t / 2,
    this.anchor.y = this.height * e / 2,
    this.getAnchor()
}
,
DisplayObjectContainer.prototype.getAbsoluteAnchor = function() {
    return this.getPosition()
}
,
DisplayObjectContainer.prototype.getRelativeCenter = function() {
    var t = this.getAnchor()
      , e = this.getAbsoluteRotation()
      , i = {
        x: t.x,
        y: t.y
    };
    return 0 == e || 0 == i.x && 0 == i.y ? (i.x = -i.x * this.getAbsoluteScaleX(),
    i.y = -i.y * this.getAbsoluteScaleY()) : (i = new Vector(-i.x * this.getAbsoluteScaleX(),-i.y * this.getAbsoluteScaleY())).rotate(-e),
    i
}
,
DisplayObjectContainer.prototype.getAbsolutePosition = function() {
    var t = {
        x: this.x,
        y: this.y
    };
    if (this.parent) {
        var e = this.parent.getAbsolutePosition()
          , i = this.parent.getAbsoluteRotation();
        if (0 != i) {
            var s = new Vector(t.x * this.parent.getAbsoluteScaleX(),t.y * this.parent.getAbsoluteScaleY());
            s.rotate(-i),
            t.x = e.x + s.x,
            t.y = e.y + s.y
        } else
            t.x = e.x + t.x * this.parent.getAbsoluteScaleX(),
            t.y = e.y + t.y * this.parent.getAbsoluteScaleY()
    }
    return t
}
,
DisplayObjectContainer.prototype.getAbsoluteCenter = function() {
    var t = this.getAbsolutePosition()
      , e = this.getRelativeCenter();
    return t.x += e.x,
    t.y += e.y,
    t
}
,
DisplayObjectContainer.prototype.getCenter = function() {
    return this.getAbsoluteCenter()
}
,
DisplayObjectContainer.prototype.getIgnoreViewport = function() {
    return this.ignoreViewport || this.parent && this.parent.getIgnoreViewport()
}
,
DisplayObjectContainer.prototype.getHitAreaRectangle = function() {
    var t = this.getHitArea();
    if (!t)
        return this.getDrawRectangle();
    t.rotation || (t.rotation = 0);
    var e = this.getAbsoluteRotation() + t.rotation
      , i = this.getAbsoluteScaleX()
      , s = this.getAbsoluteScaleY()
      , a = this.getCenter()
      , o = new Rectangle(0,0,t.width * Math.abs(i),t.height * Math.abs(s),e);
    if (0 != e) {
        var n = new Vector(t.x * i,t.y * s);
        n.rotate(-e),
        o.move(a.x + n.x, a.y + n.y)
    } else
        o.move(a.x + t.x * i, a.y + t.x * s);
    return o
}
,
DisplayObjectContainer.prototype.getDrawRectangle = function() {
    var t = this.getCenter()
      , e = new Rectangle(0,0,this.width * Math.abs(this.getAbsoluteScaleX()),this.height * Math.abs(this.getAbsoluteScaleY()),this.getAbsoluteRotation());
    return e.move(t.x, t.y),
    e
}
,
DisplayObjectContainer.prototype.getAABBRectangle = function() {
    var t = this.getDrawRectangle()
      , e = t.AABB[1].x - t.AABB[0].x
      , i = t.AABB[1].y - t.AABB[0].y;
    return new Rectangle(t.AABB[0].x + e / 2,t.AABB[0].y + i / 2,e,i,0)
}
,
DisplayObjectContainer.prototype.getFullAABBRectangle = function() {
    for (var t = [this.getAABBRectangle()], e = 0; e < this.objects.length; e++)
        t.push(this.objects[e].getFullAABBRectangle());
    var i = [{
        x: Number.MAX_VALUE,
        y: Number.MAX_VALUE
    }, {
        x: Number.MIN_VALUE,
        y: Number.MIN_VALUE
    }];
    for (e = 0; e < t.length; e++) {
        var s = t[e];
        i[0].x = Math.min(i[0].x, s.AABB[0].x),
        i[0].y = Math.min(i[0].y, s.AABB[0].y),
        i[1].x = Math.max(i[1].x, s.AABB[1].x),
        i[1].y = Math.max(i[1].y, s.AABB[1].y)
    }
    var a = i[1].x - i[0].x
      , o = i[1].y - i[0].y;
    return new Rectangle(i[0].x + a / 2,i[0].y + o / 2,a,o,0)
}
,
DisplayObjectContainer.prototype.cacheAsBitmap = function() {
    var t = this.x
      , e = this.y
      , i = this.rotation
      , s = this.parent;
    this.rotation = 0,
    this.parent = null;
    var a = this.getAABBRectangle()
      , o = this.getFullAABBRectangle();
    this.x = a.AABB[0].x - o.AABB[0].x + (this.width / 2 + this.anchor.x) * this.scaleX,
    this.y = a.AABB[0].y - o.AABB[0].y + (this.height / 2 + this.anchor.y) * this.scaleY;
    var n = document.createElement("canvas");
    return n.width = o.width * Utils.globalScale,
    n.height = o.height * Utils.globalScale,
    this.render(n, !0, 0),
    this.render(n, !1, 0),
    this.parent = s,
    this.x = t,
    this.y = e,
    this.rotation = i,
    n
}
,
DisplayObjectContainer.prototype.localToGlobal = function(t, e) {
    var i = "object" == typeof t && void 0 !== t.x && void 0 !== t.y ? new Vector(t.x + 0,t.y + 0) : new Vector(t,e);
    return i.rotate(this.getAbsoluteRotation()).add(this.getAbsolutePosition()),
    i
}
,
DisplayObjectContainer.prototype.globalToLocal = function(t, e) {
    var i = "object" == typeof t && void 0 !== t.x && void 0 !== t.y ? new Vector(t.x + 0,t.y + 0) : new Vector(t,e);
    return i.subtract(this.getAbsolutePosition()).rotate(this.getAbsoluteRotation()),
    i
}
,
DisplayObjectContainer.prototype.localToLocal = function(t, e, i) {
    return i.globalToLocal(this.localToGlobal(t, e))
}
,
DisplayObjectContainer.prototype.swapChildren = function(t, e) {
    var i = t.zIndex;
    t.setZIndex(e.zIndex),
    e.setZIndex(i)
}
,
DisplayObjectContainer.prototype.findMaxZIndex = function() {
    for (var t = -1, e = !1, i = 0; i < this.objects.length; i++)
        this.objects[i].zIndex > t && (t = this.objects[i].zIndex,
        e = i);
    return {
        index: e,
        zIndex: t
    }
}
,
DisplayObjectContainer.prototype.findMinZIndex = function() {
    for (var t = -1, e = !1, i = 0; i < this.objects.length; i++)
        0 == i && (t = this.objects[i].zIndex,
        e = 0),
        this.objects[i].zIndex < t && (t = this.objects[i].zIndex,
        e = i);
    return {
        index: e,
        zIndex: t
    }
}
,
DisplayObjectContainer.prototype.addChild = function(t) {
    var e = this.findMaxZIndex()
      , i = t.zIndex;
    return !1 !== e.index ? t.zIndex = e.zIndex + 1 : t.zIndex = 0,
    this.objectsCounter++,
    t.uid = this.objectsCounter,
    t.parent = this,
    t.setStage(this.stage),
    this.objects.push(t),
    0 != i && this.setChildZIndex(t, ~~i),
    t.hasEventListener("add") && t.dispatchEvent("add", {
        target: t
    }),
    t
}
,
DisplayObjectContainer.prototype.addChildAt = function(t, e) {
    return this.addChild(t),
    this.setChildZIndex(t, ~~e),
    t
}
,
DisplayObjectContainer.prototype.contains = function(t, e) {
    for (var i = 0; i < this.objects.length; i++) {
        if (this.objects[i] == t)
            return !0;
        if (e && this.objects[i].contains(t, e))
            return !0
    }
    return !1
}
,
DisplayObjectContainer.prototype.setStage = function(t) {
    this.stage = t;
    for (var e = 0; e < this.objects.length; e++)
        this.objects[e].setStage(t)
}
,
DisplayObjectContainer.prototype.removeChild = function(t) {
    t && 0 <= this.objects.indexOf(t) && (t.stage && t.stage.clearObjectTweens(t),
    t.clear(),
    t.hasEventListener("remove") && t.dispatchEvent("remove", {
        target: t
    }),
    t.removeAllEventListeners(),
    t.parent = null,
    t.stage = null,
    this.objects = Utils.removeFromArray(this.objects, t))
}
,
DisplayObjectContainer.prototype.setChildZIndex = function(t, e) {
    t.zIndex = e,
    this.objects = this.objects.sort(function(t, e) {
        return t.zIndex == e.zIndex ? t.uid > e.uid ? 1 : -1 : t.zIndex > e.zIndex ? 1 : -1
    })
}
,
DisplayObjectContainer.prototype.getHitArea = function() {
    return this.hitArea ? (this.hitArea.rotation || (this.hitArea.rotation = 0),
    this.hitArea) : {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        rotation: 0
    }
}
,
DisplayObjectContainer.prototype.hitTest = function(t, e) {
    if (e || (e = this),
    0 == t.getAbsoluteRotation() && 0 == e.getAbsoluteRotation()) {
        var i = t.getCenter()
          , s = e.getCenter()
          , a = t.width * Math.abs(t.getAbsoluteScaleX())
          , o = t.height * Math.abs(t.getAbsoluteScaleY())
          , n = e.width * Math.abs(e.getAbsoluteScaleX())
          , r = e.height * Math.abs(e.getAbsoluteScaleY())
          , h = i.x - a / 2
          , d = i.y - o / 2
          , l = s.x - n / 2
          , f = s.y - r / 2
          , c = Math.max(d, f)
          , g = Math.max(h, l)
          , p = Math.min(h + a, l + n)
          , x = Math.min(d + o, f + r);
        return 0 < p - g && 0 < x - c
    }
    var y = t.getDrawRectangle()
      , u = e.getDrawRectangle();
    return y.hitTestRectangle(u)
}
,
DisplayObjectContainer.prototype.hitTestPointObject = function(t, e, i, s, a) {
    var o, n, r, h, d, l, f;
    "boolean" == typeof t.pixelCheck && (s = t.pixelCheck);
    var c = t.getHitArea();
    r = c.width * Math.abs(t.getAbsoluteScaleX()),
    h = c.height * Math.abs(t.getAbsoluteScaleY());
    var g = t.getAbsoluteCenter();
    if (o = g.x + c.x - r / 2,
    n = g.y + c.y - h / 2,
    d = e,
    l = i,
    t.ignoreViewport || (d += this.stage.viewport.x,
    l += this.stage.viewport.y),
    f = !1,
    t.getAbsoluteRotation() + c.rotation == 0 ? o <= d && n <= l && d <= o + r && l <= n + h && (f = !0) : t.getHitAreaRectangle().hitTestPoint(new Vector(d,l)) && (f = !0),
    f && s) {
        this.stage.buffer.width = this.stage.canvas.width,
        this.stage.buffer.height = this.stage.canvas.height,
        this.stage.clearScreen(this.stage.buffer);
        var p = t.getTransformProps()
          , x = t.parent
          , y = t.getAbsolutePosition();
        t.x = y.x,
        t.y = y.y,
        t.scaleX = t.getAbsoluteScaleX(),
        t.scaleY = t.getAbsoluteScaleY(),
        t.skewX = t.getAbsoluteSkewX(),
        t.skewY = t.getAbsoluteSkewY(),
        t.rotation = t.getAbsoluteRotation(),
        t.parent = null,
        t.render(this.stage.buffer, t.static, 0);
        var u = Math.floor(e * Utils.globalScale)
          , m = Math.floor(i * Utils.globalScale);
        0 == this.stage.buffer.getContext("2d").getImageData(u, m, 1, 1).data[3] && (f = !1),
        t.setTransformProps(p),
        t.parent = x
    }
    return !f && a && t.dragged && (f = !0),
    f
}
,
DisplayObjectContainer.prototype.getObjectsStackByCoord = function(t, e, i, s) {
    for (var a, o = [], n = this.objects.length - 1; 0 <= n; n--)
        this.objects[n].visible && ((a = this.objects[n]).objects && a.objects.length && (o = o.concat(a.getObjectsStackByCoord(t, e, i, s))),
        this.hitTestPointObject(a, t, e, i, s) && o.push(a));
    return o
}
,
DisplayObjectContainer.prototype.getObjectsUnderPoint = function(t, e, i) {
    var s = this.getAbsolutePosition();
    return this.getObjectsStackByCoord(s.x + t, s.y + e, !!i)
}
,
DisplayObjectContainer.prototype.getObjectUnderPoint = function(t, e, i) {
    return this.getObjectsUnderPoint(t, e, i)[0]
}
,
DisplayObjectContainer.prototype.doDrag = function(t, e) {
    for (var i = 0; i < this.objects.length; i++)
        this.objects[i].doDrag(t, e);
    if (this.dragged) {
        var s = t
          , a = e;
        this.ignoreViewport || (s += this.stage.viewport.x,
        a += this.stage.viewport.y),
        s -= this.dragX,
        a -= this.dragY;
        var o = this.parent.globalToLocal(s, a);
        this.x = o.x,
        this.y = o.y
    }
}
,
DisplayObjectContainer.prototype.checkMouseOut = function(t, e) {
    for (var i = this.objects.length - 1; 0 <= i; i--)
        if (!1 === this.objects[i].checkMouseOut(t, e))
            return;
    if (this.mouseOn && t.indexOf(this) < 0) {
        this.mouseOn = !1;
        var s = this.stage.finalizeMouseCoords(this, e);
        return this.dispatchEvent("mouseout", {
            target: this,
            x: s.x,
            y: s.y
        })
    }
}
,
DisplayObjectContainer.prototype.getMaxZIndexInStack = function(t) {
    for (var e = -1, i = 0, s = 0; s < t.length; s++)
        t[s].zIndex > e && (e = t[s].zIndex,
        i = s);
    return i
}
,
DisplayObjectContainer.prototype.sortStack = function(t, i) {
    return t.sort(function(t, e) {
        return t.zIndex == e.zIndex ? i ? t.uid < e.uid ? 1 : -1 : t.uid > e.uid ? 1 : -1 : i ? t.zIndex < e.zIndex ? 1 : -1 : t.zIndex > e.zIndex ? 1 : -1
    })
}
,
DisplayObjectContainer.prototype.clear = function() {
    for (; this.objects.length; )
        this.removeChild(this.objects[0])
}
,
DisplayObjectContainer.prototype.getFillStyle = function(t) {
    var e, i = null;
    if (this.fillLinearGradient) {
        e = t.getContext("2d").createLinearGradient(this.fillLinearGradient.x0 * Utils.globalScale, this.fillLinearGradient.y0 * Utils.globalScale, this.fillLinearGradient.x1 * Utils.globalScale, this.fillLinearGradient.y1 * Utils.globalScale);
        for (var s = 0; s < this.fillLinearGradient.points.length; s++)
            e.addColorStop(this.fillLinearGradient.points[s].point, this.fillLinearGradient.points[s].color);
        i = e
    } else if (this.fillRadialGradient) {
        for (e = t.getContext("2d").createRadialGradient(this.fillRadialGradient.x0 * Utils.globalScale, this.fillRadialGradient.y0 * Utils.globalScale, this.fillRadialGradient.r0 * Utils.globalScale, this.fillRadialGradient.x1 * Utils.globalScale, this.fillRadialGradient.y1 * Utils.globalScale, this.fillRadialGradient.r1 * Utils.globalScale),
        s = 0; s < this.fillRadialGradient.points.length; s++)
            e.addColorStop(this.fillRadialGradient.points[s].point, this.fillRadialGradient.points[s].color);
        i = e
    } else
        i = this.fillPattern ? t.getContext("2d").createPattern(this.fillPattern.img, this.fillPattern.repeat) : this.fillColor;
    return i
}
,
DisplayObjectContainer.prototype.set = function(t) {
    for (var e in t)
        this[e] = t[e]
}
,
DisplayObjectContainer.ANCHOR_ALIGN_LEFT = -1,
DisplayObjectContainer.ANCHOR_ALIGN_CENTER = 0,
DisplayObjectContainer.ANCHOR_ALIGN_RIGHT = 1,
DisplayObjectContainer.ANCHOR_VALIGN_TOP = -1,
DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE = 0,
DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM = 1;
var ANCHOR_ALIGN_LEFT = DisplayObjectContainer.ANCHOR_ALIGN_LEFT
  , ANCHOR_ALIGN_CENTER = DisplayObjectContainer.ANCHOR_ALIGN_CENTER
  , ANCHOR_ALIGN_RIGHT = DisplayObjectContainer.ANCHOR_ALIGN_RIGHT
  , ANCHOR_VALIGN_TOP = DisplayObjectContainer.ANCHOR_VALIGN_TOP
  , ANCHOR_VALIGN_MIDDLE = DisplayObjectContainer.ANCHOR_VALIGN_MIDDLE
  , ANCHOR_VALIGN_BOTTOM = DisplayObjectContainer.ANCHOR_VALIGN_BOTTOM;
function DisplayObject() {
    Utils.callSuperConstructor(DisplayObject, this)
}
function Graphics() {
    Utils.callSuperConstructor(Graphics, this)
}
Utils.extend(DisplayObject, DisplayObjectContainer),
DisplayObject.prototype.uid = 0,
DisplayObject.prototype.stage = null,
DisplayObject.prototype.shadowColor = null,
DisplayObject.prototype.shadowOffsetX = 0,
DisplayObject.prototype.shadowOffsetY = 0,
DisplayObject.prototype.shadowBlur = 0,
DisplayObject.prototype.zIndex = 0,
DisplayObject.prototype.visible = !0,
DisplayObject.prototype.static = !1,
DisplayObject.prototype.ignoreViewport = !1,
DisplayObject.prototype.destroy = !1,
DisplayObject.prototype.dragged = !1,
DisplayObject.prototype.dragX = 0,
DisplayObject.prototype.dragY = 0,
DisplayObject.prototype.mouseOn = !1,
DisplayObject.prototype.allowDebugDrawing = !0,
DisplayObject.prototype.pixelCheck = null,
DisplayObject.prototype.onmouseover = null,
DisplayObject.prototype.onmouseout = null,
DisplayObject.prototype.onmousedown = null,
DisplayObject.prototype.onmouseup = null,
DisplayObject.prototype.onclick = null,
DisplayObject.prototype.oncontextmenu = null,
DisplayObject.prototype.onmousemove = null,
DisplayObject.prototype.onprerender = null,
DisplayObject.prototype.onenterframe = null,
DisplayObject.prototype.onrender = null,
DisplayObject.prototype.onadd = null,
DisplayObject.prototype.onremove = null,
DisplayObject.prototype.onbox2dsync = null,
DisplayObject.prototype.setStatic = function(t, e) {
    if (t = Boolean(t),
    !e)
        for (var i = 0; i < this.objects.length; i++)
            this.objects[i].setStatic(t);
    return this.static != t && (this.static = t,
    this.stage && this.stage.refreshBackground(),
    !0)
}
,
DisplayObject.prototype.startDrag = function(t, e) {
    this.dragged = !0,
    this.dragX = t,
    this.dragY = e
}
,
DisplayObject.prototype.stopDrag = function() {
    this.dragged = !1,
    this.dragX = 0,
    this.dragY = 0
}
,
DisplayObject.prototype.removeTweens = function() {
    this.stage && this.stage.clearObjectTweens(this)
}
,
DisplayObject.prototype.addTween = function(t, e, i, s, a, o) {
    if (!this.stage)
        return null;
    var n = this[t];
    if (isNaN(n))
        return null;
    var r = this.stage.createTween(this, t, n, e, i, s);
    return r.onchange = o,
    r.onfinish = a,
    r
}
,
DisplayObject.prototype.moveTo = function(t, e, i, s, a, o) {
    if ((i = ~~i) <= 0)
        return this.setPosition(t, e),
        a && a({
            target: new Tween(this,"y",e,e,i,s)
        }),
        this;
    var n, r = [];
    this.x != t && (n = this.addTween("x", t, i, s)) && r.push(n),
    this.y != e && (n = this.addTween("y", e, i, s)) && r.push(n);
    var h = r.length;
    if (0 < h) {
        r[h - 1].onchange = o,
        r[h - 1].onfinish = a;
        for (var d = 0; d < h; d++)
            r[d].play()
    } else
        a && a({
            target: new Tween(this,"y",e,e,i,s)
        });
    return this
}
,
DisplayObject.prototype.moveBy = function(t, e, i, s, a, o) {
    return this.moveTo(this.x + t, this.y + e, i, s, a, o)
}
,
DisplayObject.prototype.fadeTo = function(t, e, i, s, a) {
    var o = null;
    return (e = ~~e) <= 0 ? this.opacity = t : this.opacity != t && (o = this.addTween("opacity", t, e, i, s, a)) && o.play(),
    !o && s && s({
        target: new Tween(this,"opacity",t,t,e,i)
    }),
    this
}
,
DisplayObject.prototype.fadeBy = function(t, e, i, s, a) {
    var o = Math.max(0, Math.min(1, this.opacity + t));
    return this.fadeTo(o, e, i, s, a)
}
,
DisplayObject.prototype.rotateTo = function(t, e, i, s, a) {
    var o = null;
    return (e = ~~e) <= 0 ? this.rotation = t : (o = this.addTween("rotation", t, e, i, s, a)) && o.play(),
    !o && s && s({
        target: new Tween(this,"rotation",t,t,e,i)
    }),
    this
}
,
DisplayObject.prototype.rotateBy = function(t, e, i, s, a) {
    return this.rotateTo(this.rotation + t, e, i, s, a)
}
,
DisplayObject.prototype.skewXTo = function(t, e, i, s, a) {
    var o = null;
    return (e = ~~e) <= 0 ? this.skewX = t : (o = this.addTween("skewX", t, e, i, s, a)) && o.play(),
    !o && s && s({
        target: new Tween(this,"skewX",t,t,e,i)
    }),
    this
}
,
DisplayObject.prototype.skewXBy = function(t, e, i, s, a) {
    return this.skewXTo(this.skewX + t, e, i, s, a)
}
,
DisplayObject.prototype.skewYTo = function(t, e, i, s, a) {
    var o = null;
    return (e = ~~e) <= 0 ? this.skewY = t : (o = this.addTween("skewY", t, e, i, s, a)) && o.play(),
    !o && s && s({
        target: new Tween(this,"skewY",t,t,e,i)
    }),
    this
}
,
DisplayObject.prototype.skewYBy = function(t, e, i, s, a) {
    return this.skewYTo(this.skewY + t, e, i, s, a)
}
,
DisplayObject.prototype.scaleTo = function(t, e, i, s, a) {
    if ((e = ~~e) <= 0)
        return this.scaleX = this.scaleY = t,
        s && s({
            target: new Tween(this,"scaleY",t,t,e,i)
        }),
        this;
    var o, n = [];
    this.scaleX != t && (o = this.addTween("scaleX", t, e, i)) && n.push(o),
    this.scaleY != t && (o = this.addTween("scaleY", t, e, i)) && n.push(o);
    var r = n.length;
    if (0 < r) {
        n[r - 1].onchange = a,
        n[r - 1].onfinish = s;
        for (var h = 0; h < r; h++)
            n[h].play()
    } else
        s && s({
            target: new Tween(this,"scaleY",t,t,e,i)
        });
    return this
}
,
DisplayObject.prototype.setZIndex = function(t) {
    this.zIndex = ~~t,
    this.parent && this.parent.setChildZIndex(this, this.zIndex)
}
,
DisplayObject.prototype.hitTestPoint = function(t, e, i, s) {
    return !!this.stage && this.stage.hitTestPointObject(this, t, e, i, s)
}
,
DisplayObject.prototype.setRelativePosition = function(t, e, i, s) {
    switch (t = t || 0,
    e = e || 0,
    i) {
    case "right":
        t = this.stage.screenWidth - t;
        break;
    case "left":
        break;
    default:
        t = this.stage.screenWidth / 2 + t
    }
    switch (s) {
    case "bottom":
        e = this.stage.screenHeight - e;
        break;
    case "top":
        break;
    default:
        e = this.stage.screenHeight / 2 + e
    }
    this.setPosition(t, e)
}
,
DisplayObject.prototype.debugDraw = function() {
    if (this.visible && this.allowDebugDrawing) {
        var t = this.getAbsolutePosition()
          , e = this.getCenter()
          , i = this.getDrawRectangle()
          , s = this.getAABBRectangle();
        stage.drawCircle(t.x, t.y, 1, 1, "rgba(255,0,0,0.9)"),
        stage.drawCircle(e.x, e.y, 1, 1, "rgba(0,255,0,0.9)"),
        stage.drawLine(t.x, t.y, e.x, e.y, 1, "rgba(255,255,255,0.5)"),
        stage.drawPolygon(i.vertices, .5, "rgba(255,0,255,0.5)", 1),
        stage.drawLine(s.vertices[0].x, s.vertices[0].y, s.vertices[2].x, s.vertices[2].y, 1, "rgba(255,255,255,0.5)"),
        stage.drawLine(s.vertices[2].x, s.vertices[0].y, s.vertices[0].x, s.vertices[2].y, 1, "rgba(255,255,255,0.5)"),
        stage.drawPolygon(s.vertices, .5, "rgba(255,255,255,0.5)")
    }
}
,
DisplayObject.prototype.fixChildrenParent = function() {
    for (var t = 0; t < this.objects.length; t++)
        (this.objects[t].parent = this).objects[t].fixChildrenParent()
}
,
DisplayObject.prototype.clone = function() {
    var t = Utils.clone(this);
    return t.fixChildrenParent(),
    t
}
,
DisplayObject.prototype.safeRemove = function() {
    this.destroy = !0
}
,
Utils.extend(Graphics, DisplayObject),
Graphics.prototype.x = 0,
Graphics.prototype.y = 0,
Graphics.prototype.color = "#000",
Graphics.prototype.lineWidth = 1,
Graphics.prototype.lineDash = null,
Graphics.prototype.render = function(t, e, i) {
    !!this.static == !!e && this.hasEventListener("render") && this.dispatchEvent("render", {
        target: this,
        canvas: t,
        delta: i
    }),
    Utils.callSuperMethod(Graphics, this, "render", t, e, i)
}
,
Graphics.prototype.preparePath = function(t) {
    this.moveCanvasAnchor(t),
    this.prepareCanvasShadow(t);
    var e = t.getContext("2d");
    if (e.beginPath(),
    e.strokeStyle = 0 < this.lineWidth ? this.color : "transparent",
    e.lineWidth = this.lineWidth * Utils.globalScale,
    e.globalAlpha = this.getAbsoluteOpacity(),
    e.fillStyle = this.getFillStyle(t),
    this.lineDash && e.setLineDash) {
        for (var i = [], s = 0; s < this.lineDash.length; s++)
            i.push(this.lineDash[s] * Utils.globalScale);
        e.setLineDash(i)
    }
}
,
Graphics.prototype.removeShadow = function(t) {
    var e = t.getContext("2d");
    e.shadowColor = "",
    e.shadowBlur = 0,
    e.shadowOffsetX = 0,
    e.shadowOffsetY = 0
}
,
Graphics.prototype.finalizeCanvas = function(t) {
    var e = t.getContext("2d");
    (this.fillColor || this.fillLinearGradient || this.fillRadialGradient || this.fillPattern) && (e.fill(),
    this.color && this.lineWidth && this.removeShadow(t)),
    e.stroke(),
    this.restoreCanvasShadow(t),
    this.moveCanvasAnchor(t, !0)
}
,
Graphics.prototype.resetView = function() {
    this.color = "transparent",
    this.fillColor = null,
    this.fillLinearGradient = null,
    this.fillRadialGradient = null,
    this.fillPattern = null
}
,
Graphics.circle = function(t, e, i) {
    Utils.callSuperConstructor(Graphics.circle, this),
    this.x = t,
    this.y = e,
    this.radius = i,
    this.width = 2 * i,
    this.height = 2 * i
}
,
Utils.extend(Graphics.circle, Graphics),
Graphics.circle.prototype.render = function(t, e, i) {
    this.prepareCanvas(t),
    !!this.static == !!e && 0 != this.opacity && (this.preparePath(t),
    t.getContext("2d").arc(0, 0, this.radius * Utils.globalScale, 0, 2 * Math.PI),
    this.finalizeCanvas(t)),
    Utils.callSuperMethod(Graphics.circle, this, "render", t, e, i),
    this.restoreCanvas(t)
}
,
Graphics.line = function(t, e, i, s) {
    Utils.callSuperConstructor(Graphics.line, this),
    this.x1 = t,
    this.x2 = i,
    this.y1 = e,
    this.y2 = s
}
,
Utils.extend(Graphics.line, Graphics),
Graphics.line.prototype.render = function(t, e, i) {
    if (this.prepareCanvas(t),
    !!this.static == !!e && 0 != this.opacity) {
        this.preparePath(t);
        var s = t.getContext("2d");
        s.moveTo(this.x1 * Utils.globalScale, this.y1 * Utils.globalScale),
        s.lineTo(this.x2 * Utils.globalScale, this.y2 * Utils.globalScale),
        this.finalizeCanvas(t)
    }
    Utils.callSuperMethod(Graphics.line, this, "render", t, e, i),
    this.restoreCanvas(t)
}
,
Graphics.rectangle = function(t, e, i, s) {
    Utils.callSuperConstructor(Graphics.rectangle, this),
    this.x = t,
    this.y = e,
    this.width = i,
    this.height = s
}
,
Utils.extend(Graphics.rectangle, Graphics),
Graphics.rectangle.prototype.render = function(t, e, i) {
    this.prepareCanvas(t),
    !!this.static == !!e && 0 != this.opacity && (this.preparePath(t),
    t.getContext("2d").rect(-this.width / 2 * Utils.globalScale, -this.height / 2 * Utils.globalScale, this.width * Utils.globalScale, this.height * Utils.globalScale),
    this.finalizeCanvas(t)),
    Utils.callSuperMethod(Graphics.rectangle, this, "render", t, e, i),
    this.restoreCanvas(t)
}
,
Graphics.arc = function(t, e, i, s, a, o) {
    Utils.callSuperConstructor(Graphics.arc, this),
    this.x = t,
    this.y = e,
    this.radius = i,
    this.startAngle = s,
    this.endAngle = a,
    this.antiClockWise = o,
    this.width = 2 * i,
    this.height = 2 * i
}
,
Utils.extend(Graphics.arc, Graphics),
Graphics.arc.prototype.render = function(t, e, i) {
    this.prepareCanvas(t),
    !!this.static == !!e && 0 != this.opacity && (this.preparePath(t),
    t.getContext("2d").arc(0, 0, this.radius * Utils.globalScale, this.startAngle, this.endAngle, this.antiClockWise),
    this.finalizeCanvas(t)),
    Utils.callSuperMethod(Graphics.arc, this, "render", t, e, i),
    this.restoreCanvas(t)
}
,
Graphics.polygon = function(t) {
    if (!t || t.length < 2)
        throw Error("Invalid parameters");
    Utils.callSuperConstructor(Graphics.polygon, this),
    this.points = t;
    for (var e = Number.MAX_VALUE, i = Number.MAX_VALUE, s = Number.MIN_VALUE, a = Number.MIN_VALUE, o = 0; o < t.length; o++)
        t[o].x < e && (e = t[o].x),
        t[o].y < i && (i = t[o].y),
        t[o].x > s && (s = t[o].x),
        t[o].y > a && (a = t[o].y);
    this.width = s - e,
    this.height = a - i
}
,
Utils.extend(Graphics.polygon, Graphics),
Graphics.polygon.prototype.render = function(t, e, i) {
    if (this.prepareCanvas(t),
    !!this.static == !!e && 0 != this.opacity) {
        this.preparePath(t);
        var s = t.getContext("2d");
        s.moveTo(this.points[0].x * Utils.globalScale, this.points[0].y * Utils.globalScale);
        for (var a = 1; a < this.points.length; a++)
            s.lineTo(this.points[a].x * Utils.globalScale, this.points[a].y * Utils.globalScale);
        s.lineTo(this.points[0].x * Utils.globalScale, this.points[0].y * Utils.globalScale),
        this.finalizeCanvas(t)
    }
    Utils.callSuperMethod(Graphics.polygon, this, "render", t, e, i),
    this.restoreCanvas(t)
}
,
Graphics.text = function(t, e, i) {
    Utils.callSuperConstructor(Graphics.text, this),
    this.x = t,
    this.y = e,
    this.text = i,
    this.align = Graphics.text.ALIGN_LEFT,
    this.valign = Graphics.text.VALIGN_MIDDLE,
    this.style = "normal",
    this.size = 10,
    this.font = "sans-serif",
    this.lineHeight = 10,
    this.maxWidth = 0,
    this.maxWidthType = Graphics.text.MAX_WIDTH_WORD_WRAP,
    this.fitToParent = !1
}
,
Utils.extend(Graphics.text, Graphics),
Graphics.text.ALIGN_LEFT = "left",
Graphics.text.ALIGN_CENTER = "center",
Graphics.text.ALIGN_RIGHT = "right",
Graphics.text.VALIGN_TOP = "top",
Graphics.text.VALIGN_MIDDLE = "middle",
Graphics.text.VALIGN_BOTTOM = "bottom",
Graphics.text.MAX_WIDTH_WORD_WRAP = 0,
Graphics.text.MAX_WIDTH_FIT = 1,
Graphics.text.LINES_DELIMITER = "\n",
Graphics.text.prototype.preparePath = function(t) {
    Utils.callSuperMethod(Graphics.text, this, "preparePath", t);
    var e = t.getContext("2d");
    e.font = this.style + " " + Math.floor(this.size * Utils.globalScale) + "px " + this.font,
    e.textAlign = this.align,
    e.textBaseline = this.valign
}
,
Graphics.text.prototype.getRect = function(t, e, i) {
    i || (this.prepareCanvas(t),
    this.preparePath(t)),
    e || (e = this.text);
    var s = t.getContext("2d").measureText(e);
    return i || (this.finalizeCanvas(t),
    this.restoreCanvas(t)),
    s
}
,
Graphics.text.prototype.getLines = function(t) {
    var e, i, s, a, o, n, r = this.text + "", h = this.maxWidth;
    if (this.fitToParent && (0 == h || this.parent.width < h) && (h = this.parent.width),
    0 < h && this.maxWidthType == Graphics.text.MAX_WIDTH_WORD_WRAP) {
        for (a = r.split(Graphics.text.LINES_DELIMITER),
        o = [],
        n = [],
        i = 0; i < a.length; i++) {
            for (n = [(s = a[i].split(" "))[0]],
            e = 1; e < s.length; e++)
                this.getRect(t, n.join(" ") + " " + s[e], !0).width / Utils.globalScale > h ? (o.push(n.join(" ")),
                n = [s[e]]) : n.push(s[e]);
            o.push(n.join(" "))
        }
        r = o.join(Graphics.text.LINES_DELIMITER)
    }
    return o = r.split(Graphics.text.LINES_DELIMITER)
}
,
Graphics.text.prototype.render = function(t, e, i) {
    if (this.prepareCanvas(t),
    !!this.static == !!e && 0 != this.opacity && this.text) {
        this.preparePath(t);
        var s = this.getLines(t)
          , a = 0;
        this.valign == Graphics.text.VALIGN_MIDDLE && 1 < s.length && (a = -s.length * this.lineHeight / 2),
        this.valign == Graphics.text.VALIGN_BOTTOM && 1 < s.length && (a = -s.length * this.lineHeight),
        a *= Utils.globalScale;
        var o = 0;
        this.maxWidthType == Graphics.text.MAX_WIDTH_FIT && (o = this.maxWidth,
        this.fitToParent && (0 == o || this.parent.width < o) && (o = this.parent.width)),
        o *= Utils.globalScale;
        for (var n = 0; n < s.length; n++) {
            var r = t.getContext("2d");
            (this.fillColor || this.fillLinearGradient || this.fillRadialGradient || this.fillPattern) && (o ? r.fillText(s[n], 0, a + n * this.lineHeight * Utils.globalScale, o) : r.fillText(s[n], 0, a + n * this.lineHeight * Utils.globalScale)),
            this.color && 0 < this.lineWidth && (this.removeShadow(t),
            o ? r.strokeText(s[n], 0, a + n * this.lineHeight * Utils.globalScale, o) : r.strokeText(s[n], 0, a + n * this.lineHeight * Utils.globalScale),
            this.prepareCanvasShadow(t, !0))
        }
        this.finalizeCanvas(t)
    }
    Utils.callSuperMethod(Graphics.text, this, "render", t, e, i),
    this.restoreCanvas(t)
}
,
Graphics.free = function() {
    this.commands = [],
    Utils.callSuperConstructor(Graphics.free, this)
}
,
Utils.extend(Graphics.free, Graphics),
Graphics.free.prototype.clear = function() {
    this.commands = [],
    Utils.callSuperMethod(Graphics.free, this, "clear")
}
,
Graphics.free.prototype.beginPath = function() {
    return this.commands.push({
        command: "beginPath"
    }),
    this
}
,
Graphics.free.prototype.stroke = function() {
    return this.commands.push({
        command: "stroke"
    }),
    this
}
,
Graphics.free.prototype.setStrokeStyle = function(t) {
    return this.commands.push({
        command: "setStrokeStyle",
        style: t
    }),
    this
}
,
Graphics.free.prototype.setFillStyle = function(t) {
    return this.commands.push({
        command: "setFillStyle",
        style: t
    }),
    this
}
,
Graphics.free.prototype.fill = function() {
    return this.commands.push({
        command: "fill"
    }),
    this
}
,
Graphics.free.prototype.moveTo = function(t, e) {
    return this.commands.push({
        command: "moveTo",
        x: t,
        y: e
    }),
    this
}
,
Graphics.free.prototype.lineTo = function(t, e) {
    return this.commands.push({
        command: "lineTo",
        x: t,
        y: e
    }),
    this
}
,
Graphics.free.prototype.arc = function(t, e, i, s, a, o) {
    return this.commands.push({
        command: "arc",
        x: t,
        y: e,
        radius: i,
        startAngle: s,
        endAngle: a,
        antiClockWise: o
    }),
    this
}
,
Graphics.free.prototype.circle = function(t, e, i) {
    return this.commands.push({
        command: "circle",
        x: t,
        y: e,
        radius: i
    }),
    this
}
,
Graphics.free.prototype.rect = function(t, e, i, s) {
    return this.commands.push({
        command: "circle",
        x: t,
        y: e,
        width: i,
        height: s
    }),
    this
}
,
Graphics.free.prototype.polygon = function(t) {
    return this.commands.push({
        command: "polygon",
        points: t
    }),
    this
}
,
Graphics.free.prototype.executeCommand = function(t, e) {
    var i = t.getContext("2d");
    switch (e.command) {
    case "beginPath":
        i.beginPath();
        break;
    case "stroke":
        i.stroke();
        break;
    case "fill":
        i.fill();
        break;
    case "setStrokeStyle":
        i.strokeStyle = 0 < this.lineWidth ? e.style : "transparent";
        break;
    case "setFillStyle":
        i.fillStyle = e.style;
        break;
    case "moveTo":
        i.moveTo(e.x * Utils.globalScale, e.y * Utils.globalScale);
        break;
    case "lineTo":
        i.lineTo(e.x * Utils.globalScale, e.y * Utils.globalScale);
        break;
    case "arc":
        i.arc(e.x * Utils.globalScale, e.y * Utils.globalScale, e.radius * Utils.globalScale, e.startAngle, e.endAngle, e.antiClockWise);
        break;
    case "circle":
        i.arc(e.x * Utils.globalScale, e.y * Utils.globalScale, e.radius * Utils.globalScale, 0, 2 * Math.PI);
        break;
    case "rect":
        i.rect((e.x - e.width / 2) * Utils.globalScale, (e.y - e.height / 2) * Utils.globalScale, e.width * Utils.globalScale, e.height * Utils.globalScale);
        break;
    case "polygon":
        i.moveTo(e.points[0].x * Utils.globalScale, e.points[0].y * Utils.globalScale);
        for (var s = 1; s < e.points.length; s++)
            i.lineTo(e.points[s].x * Utils.globalScale, e.points[s].y * Utils.globalScale);
        i.lineTo(e.points[0].x * Utils.globalScale, e.points[0].y * Utils.globalScale)
    }
}
,
Graphics.free.prototype.executeCommands = function(t) {
    for (var e = 0; e < this.commands.length; e++)
        this.executeCommand(t, this.commands[e])
}
,
Graphics.free.prototype.render = function(t, e, i) {
    this.prepareCanvas(t),
    !!this.static == !!e && 0 != this.opacity && (this.preparePath(t),
    this.executeCommands(t),
    this.finalizeCanvas(t)),
    Utils.callSuperMethod(Graphics.free, this, "render", t, e, i),
    this.restoreCanvas(t)
}
;
var BitmapsCache = {
    bitmaps: {},
    cache: function(t) {
        if (!(t && t instanceof Image))
            return t;
        if (BitmapsCache.bitmaps[t.src])
            return BitmapsCache.bitmaps[t.src];
        var e = document.createElement("canvas");
        return e.width = t.width,
        e.height = t.height,
        e.getContext("2d").drawImage(t, 0, 0, t.width, t.height, 0, 0, t.width, t.height),
        BitmapsCache.bitmaps[t.src] = e
    }
}
  , ImageFilter = {};
function Sprite(t, e, i, s, a) {
    Utils.callSuperConstructor(Sprite, this),
    this.offset = {
        left: 0,
        top: 0
    },
    this.width = e,
    this.height = i,
    this.totalFrames = Math.max(1, ~~s),
    this.totalFrames <= 1 && (this.animated = !1),
    this.totalLayers = Math.max(1, ~~a),
    this.bitmap = t,
    this.changeFrameDelay = Sprite.CHANGE_FRAME_DELAY,
    this.cacheBitmap = Sprite.CACHE_BITMAPS
}
function TransformFilter(t) {
    if ("function" != typeof t)
        throw new Error("Invalid filter");
    this.filter = t,
    this.sprite = null
}
function StageTimer(t, e, i) {
    Utils.callSuperConstructor(StageTimer, this),
    this.repeat = i,
    this.initialTimeout = e,
    this.timeout = e,
    this.onend = t,
    this.destroy = !1,
    this.newly = !0,
    this.paused = !1
}
function Stage(t, e, i) {
    Utils.callSuperConstructor(Stage, this),
    this.canvas = null,
    t && (this.canvas = "string" == typeof t ? document.getElementById(t) : t),
    this.backgroundCanvas = null,
    this.needToRebuildBack = !1,
    this.screenWidth = e,
    this.screenHeight = i,
    this.viewport = {
        x: 0,
        y: 0
    },
    this.buffer = null,
    this.buffer = document.createElement("canvas"),
    this.buffer.width = e * Utils.globalScale,
    this.buffer.height = i * Utils.globalScale,
    this.transformBuffer = null,
    this.transformBuffer = document.createElement("canvas"),
    this.transformBuffer.width = e * Utils.globalScale,
    this.transformBuffer.height = i * Utils.globalScale,
    this.delay = 40,
    this.started = !1,
    this.fps = 0,
    this.lastFPS = 0,
    this.showFPS = !1,
    this.pixelClickEvent = !1,
    this.pixelMouseUpEvent = !1,
    this.pixelMouseDownEvent = !1,
    this.pixelMouseMoveEvent = !1,
    this.ceilSizes = !1,
    this.tmMain = null,
    this.tmFPS = null,
    this.clearLock = !1,
    this.allowDebugDrawing = !1,
    this.allowStaticDebugDrawing = !1,
    this.drawBackAlways = Utils.mobileCheckBrokenAndroid() || !Utils.detectMobileBrowser() && Utils.isChrome(),
    this.tweens = [],
    this.timers = [],
    this.eventsListeners = [],
    this.lastTick = 0,
    this.inputController = null,
    this.inputListeners = null,
    this.onpretick = null,
    this.onprerender = null,
    this.onposttick = null,
    this.onmousedown = null,
    this.onmouseup = null,
    this.onclick = null,
    this.oncontextmenu = null,
    this.onmousemove = null,
    this.canvas && this.addInputListeners(this.canvas),
    this.tick = Utils.proxy(this.tick, this),
    this.clearFPS = Utils.proxy(this.clearFPS, this),
    (this.stage = this).drawScene = this.render
}
ImageFilter.cache = {},
ImageFilter.getFromCache = function(t, e, i) {
    if (!(e instanceof Image))
        return null;
    if (!ImageFilter.cache[t])
        return null;
    for (var s = ImageFilter.cache[t], a = 0; a < s.length; a++) {
        var o = s[a];
        if (o.src == e.src) {
            for (var n = !0, r = 0; r < i.length; r++)
                if (i[r] != o.args[r]) {
                    n = !1;
                    break
                }
            if (n)
                return o.cns
        }
    }
    return null
}
,
ImageFilter.putToCache = function(t, e, i, s) {
    if (e instanceof Image && "string" == typeof t) {
        var a = {
            src: e.src,
            args: i,
            cns: s
        };
        ImageFilter.cache[t] || (ImageFilter.cache[t] = []),
        ImageFilter.cache[t].push(a)
    }
}
,
ImageFilter.apply = function(t, e) {
    if (!(t instanceof Image || t instanceof HTMLImageElement || t instanceof HTMLCanvasElement))
        throw new Error("Incorrect bitmap. Must be Image or Canvas.");
    var i = e;
    if ("string" == typeof e && (i = ImageFilter.filter[e]),
    "function" != typeof i)
        throw new Error("Incorrect filter " + e);
    for (var s = [], a = 2; a < arguments.length; a++)
        s.push(arguments[a]);
    var o = ImageFilter.getFromCache(e, t, s);
    if (o)
        return o;
    var n = document.createElement("canvas");
    n.width = t.width,
    n.height = t.height;
    var r = n.getContext("2d");
    r.drawImage(t, 0, 0, t.width, t.height, 0, 0, t.width, t.height);
    var h = i.apply(ImageFilter.filter[e], [r.getImageData(0, 0, n.width, n.height)].concat(s));
    return r.putImageData(h, 0, 0),
    ImageFilter.putToCache(e, t, s, n),
    n
}
,
ImageFilter.clearCache = function() {
    ImageFilter.cache = {}
}
,
ImageFilter.filter = {},
ImageFilter.filter.grayscale = function(t) {
    for (var e = 0; e < t.data.length; e += 4) {
        var i = .2126 * t.data[e] + .7152 * t.data[e + 1] + .0722 * t.data[e + 2];
        t.data[e] = i,
        t.data[e + 1] = i,
        t.data[e + 2] = i
    }
    return t
}
,
ImageFilter.filter.discolor = function(t) {
    for (var e = 0; e < t.data.length; e += 4) {
        var i = (t.data[e] + t.data[e + 1] + t.data[e + 2]) / 2;
        t.data[e] = i,
        t.data[e + 1] = i,
        t.data[e + 2] = i
    }
    return t
}
,
ImageFilter.filter.brightness = function(t, e) {
    e *= 255;
    for (var i = 0; i < t.data.length; i += 4)
        t.data[i] = Math.min(t.data[i] + e, 255),
        t.data[i + 1] = Math.min(t.data[i + 1] + e, 255),
        t.data[i + 2] = Math.min(t.data[i + 2] + e, 255);
    return t
}
,
ImageFilter.filter.tint = function(t, e, i, s) {
    for (var a = 0; a < t.data.length; a += 4)
        t.data[a] + 3 && (t.data[a] = e,
        t.data[a + 1] = i,
        t.data[a + 2] = s);
    return t
}
,
ImageFilter.filter.invert = function(t) {
    for (var e = 0; e < t.data.length; e += 4)
        t.data[e] = 255 - t.data[e],
        t.data[e + 1] = 255 - t.data[e + 1],
        t.data[e + 2] = 255 - t.data[e + 2];
    return t
}
,
ImageFilter.filter.multiply = function(t, e, i, s) {
    for (var a = 0; a < t.data.length; a += 4)
        t.data[a] = t.data[a] * e / 255,
        t.data[a + 1] = t.data[a + 1] * i / 255,
        t.data[a + 2] = t.data[a + 2] * s / 255;
    return t
}
,
ImageFilter.filter.sepia = function(t) {
    for (var e = 0; e < t.data.length; e += 4) {
        var i = .3 * t.data[e] + .59 * t.data[e + 1] + .11 * t.data[e + 2];
        t.data[e] = 100 + i,
        t.data[e + 1] = 50 + i,
        t.data[e + 2] = 255 + i
    }
    return t
}
,
ImageFilter.filter.sepia2 = function(t) {
    for (var e = 0; e < t.data.length; e += 4) {
        var i = t.data[e]
          , s = t.data[e + 1]
          , a = t.data[e + 2];
        t.data[e] = (.393 * i + .769 * s + .189 * a) / 1.351,
        t.data[e + 1] = (.349 * i + .686 * s + .168 * a) / 1.203,
        t.data[e + 2] = (.272 * i + .534 * s + .131 * a) / 2.14
    }
    return t
}
,
ImageFilter.filter.add = function(t, e, i, s) {
    for (var a = 0; a < t.data.length; a += 4)
        t.data[a] = Math.min(t.data[a] + e, 255),
        t.data[a + 1] = Math.min(t.data[a + 1] + i, 255),
        t.data[a + 2] = Math.min(t.data[a + 2] + s, 255);
    return t
}
,
ImageFilter.filter.screen = function(t, e, i, s) {
    for (var a = 0; a < t.data.length; a += 4)
        t.data[a] = 1 - (1 - t.data[a]) * (1 - e),
        t.data[a + 1] = 1 - (1 - t.data[a + 1]) * (1 - i),
        t.data[a + 2] = 1 - (1 - t.data[a + 2]) * (1 - s);
    return t
}
,
ImageFilter.filter.diff = function(t, e, i, s) {
    for (var a = 0; a < t.data.length; a += 4)
        t.data[a] = Math.abs(t.data[a] - e),
        t.data[a + 1] = Math.abs(t.data[a + 1] - i),
        t.data[a + 2] = Math.abs(t.data[a + 2] - s);
    return t
}
,
ImageFilter.filter.darken = function(t, e, i, s) {
    for (var a = 0; a < t.data.length; a += 4)
        t.data[a] = Math.min(t.data[a], e),
        t.data[a + 1] = Math.min(t.data[a + 1], i),
        t.data[a + 2] = Math.min(t.data[a + 2], s);
    return t
}
,
ImageFilter.filter.lighten = function(t, e, i, s) {
    for (var a = 0; a < t.data.length; a += 4)
        t.data[a] = Math.max(t.data[a], e),
        t.data[a + 1] = Math.max(t.data[a + 1], i),
        t.data[a + 2] = Math.max(t.data[a + 2], s);
    return t
}
,
ImageFilter.filter.subtract = function(t, e, i, s) {
    for (var a = 0; a < t.data.length; a += 4)
        t.data[a] = Math.max(t.data[a] - e, 0),
        t.data[a + 1] = Math.max(t.data[a + 1] - i, 0),
        t.data[a + 2] = Math.max(t.data[a + 2] - s, 0);
    return t
}
,
ImageFilter.filter.blur = function(t, e, i) {
    return e = e || 5,
    t = i ? ImageFilter.filter.blur.rgba(t, e) : ImageFilter.filter.blur.rgb(t, e)
}
,
ImageFilter.filter.blur.mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
ImageFilter.filter.blur.shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
ImageFilter.filter.blur.getStack = function() {
    return {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
        next: null
    }
}
,
ImageFilter.filter.blur.rgba = function(t, e) {
    var i, s, a, o, n, r, h, d, l, f, c, g, p, x, y, u, m, w, v, A, b, T, S, C, U = t.data, D = t.width, I = t.height, M = e + e + 1, B = D - 1, E = I - 1, P = e + 1, L = P * (P + 1) / 2, k = ImageFilter.filter.blur.getStack(), O = k;
    for (a = 1; a < M; a++)
        if (O = O.next = ImageFilter.filter.blur.getStack(),
        a == P)
            var F = O;
    O.next = k;
    var V = null
      , _ = null;
    h = r = 0;
    var R = ImageFilter.filter.blur.mulTable[e]
      , N = ImageFilter.filter.blur.shgTable[e];
    for (s = 0; s < I; s++) {
        for (u = m = w = v = d = l = f = c = 0,
        g = P * (A = U[r]),
        p = P * (b = U[r + 1]),
        x = P * (T = U[r + 2]),
        y = P * (S = U[r + 3]),
        d += L * A,
        l += L * b,
        f += L * T,
        c += L * S,
        O = k,
        a = 0; a < P; a++)
            O.r = A,
            O.g = b,
            O.b = T,
            O.a = S,
            O = O.next;
        for (a = 1; a < P; a++)
            o = r + ((B < a ? B : a) << 2),
            d += (O.r = A = U[o]) * (C = P - a),
            l += (O.g = b = U[o + 1]) * C,
            f += (O.b = T = U[o + 2]) * C,
            c += (O.a = S = U[o + 3]) * C,
            u += A,
            m += b,
            w += T,
            v += S,
            O = O.next;
        for (V = k,
        _ = F,
        i = 0; i < D; i++)
            U[r + 3] = S = c * R >> N,
            0 != S ? (S = 255 / S,
            U[r] = (d * R >> N) * S,
            U[r + 1] = (l * R >> N) * S,
            U[r + 2] = (f * R >> N) * S) : U[r] = U[r + 1] = U[r + 2] = 0,
            d -= g,
            l -= p,
            f -= x,
            c -= y,
            g -= V.r,
            p -= V.g,
            x -= V.b,
            y -= V.a,
            o = h + ((o = i + e + 1) < B ? o : B) << 2,
            d += u += V.r = U[o],
            l += m += V.g = U[o + 1],
            f += w += V.b = U[o + 2],
            c += v += V.a = U[o + 3],
            V = V.next,
            g += A = _.r,
            p += b = _.g,
            x += T = _.b,
            y += S = _.a,
            u -= A,
            m -= b,
            w -= T,
            v -= S,
            _ = _.next,
            r += 4;
        h += D
    }
    for (i = 0; i < D; i++) {
        for (m = w = v = u = l = f = c = d = 0,
        g = P * (A = U[r = i << 2]),
        p = P * (b = U[r + 1]),
        x = P * (T = U[r + 2]),
        y = P * (S = U[r + 3]),
        d += L * A,
        l += L * b,
        f += L * T,
        c += L * S,
        O = k,
        a = 0; a < P; a++)
            O.r = A,
            O.g = b,
            O.b = T,
            O.a = S,
            O = O.next;
        for (n = D,
        a = 1; a <= e; a++)
            r = n + i << 2,
            d += (O.r = A = U[r]) * (C = P - a),
            l += (O.g = b = U[r + 1]) * C,
            f += (O.b = T = U[r + 2]) * C,
            c += (O.a = S = U[r + 3]) * C,
            u += A,
            m += b,
            w += T,
            v += S,
            O = O.next,
            a < E && (n += D);
        for (r = i,
        V = k,
        _ = F,
        s = 0; s < I; s++)
            U[(o = r << 2) + 3] = S = c * R >> N,
            0 < S ? (S = 255 / S,
            U[o] = (d * R >> N) * S,
            U[o + 1] = (l * R >> N) * S,
            U[o + 2] = (f * R >> N) * S) : U[o] = U[o + 1] = U[o + 2] = 0,
            d -= g,
            l -= p,
            f -= x,
            c -= y,
            g -= V.r,
            p -= V.g,
            x -= V.b,
            y -= V.a,
            o = i + ((o = s + P) < E ? o : E) * D << 2,
            d += u += V.r = U[o],
            l += m += V.g = U[o + 1],
            f += w += V.b = U[o + 2],
            c += v += V.a = U[o + 3],
            V = V.next,
            g += A = _.r,
            p += b = _.g,
            x += T = _.b,
            y += S = _.a,
            u -= A,
            m -= b,
            w -= T,
            v -= S,
            _ = _.next,
            r += D
    }
    return t
}
,
ImageFilter.filter.blur.rgb = function(t, e) {
    var i, s, a, o, n, r, h, d, l, f, c, g, p, x, y, u, m, w, v, A, b = t.data, T = t.width, S = t.height, C = e + e + 1, U = T - 1, D = S - 1, I = e + 1, M = I * (I + 1) / 2, B = ImageFilter.filter.blur.getStack(), E = B;
    for (a = 1; a < C; a++)
        if (E = E.next = ImageFilter.filter.blur.getStack(),
        a == I)
            var P = E;
    E.next = B;
    var L = null
      , k = null;
    h = r = 0;
    var O = ImageFilter.filter.blur.mulTable[e]
      , F = ImageFilter.filter.blur.shgTable[e];
    for (s = 0; s < S; s++) {
        for (x = y = u = d = l = f = 0,
        c = I * (m = b[r]),
        g = I * (w = b[r + 1]),
        p = I * (v = b[r + 2]),
        d += M * m,
        l += M * w,
        f += M * v,
        E = B,
        a = 0; a < I; a++)
            E.r = m,
            E.g = w,
            E.b = v,
            E = E.next;
        for (a = 1; a < I; a++)
            o = r + ((U < a ? U : a) << 2),
            d += (E.r = m = b[o]) * (A = I - a),
            l += (E.g = w = b[o + 1]) * A,
            f += (E.b = v = b[o + 2]) * A,
            x += m,
            y += w,
            u += v,
            E = E.next;
        for (L = B,
        k = P,
        i = 0; i < T; i++)
            b[r] = d * O >> F,
            b[r + 1] = l * O >> F,
            b[r + 2] = f * O >> F,
            d -= c,
            l -= g,
            f -= p,
            c -= L.r,
            g -= L.g,
            p -= L.b,
            o = h + ((o = i + e + 1) < U ? o : U) << 2,
            d += x += L.r = b[o],
            l += y += L.g = b[o + 1],
            f += u += L.b = b[o + 2],
            L = L.next,
            c += m = k.r,
            g += w = k.g,
            p += v = k.b,
            x -= m,
            y -= w,
            u -= v,
            k = k.next,
            r += 4;
        h += T
    }
    for (i = 0; i < T; i++) {
        for (y = u = x = l = f = d = 0,
        c = I * (m = b[r = i << 2]),
        g = I * (w = b[r + 1]),
        p = I * (v = b[r + 2]),
        d += M * m,
        l += M * w,
        f += M * v,
        E = B,
        a = 0; a < I; a++)
            E.r = m,
            E.g = w,
            E.b = v,
            E = E.next;
        for (n = T,
        a = 1; a <= e; a++)
            r = n + i << 2,
            d += (E.r = m = b[r]) * (A = I - a),
            l += (E.g = w = b[r + 1]) * A,
            f += (E.b = v = b[r + 2]) * A,
            x += m,
            y += w,
            u += v,
            E = E.next,
            a < D && (n += T);
        for (r = i,
        L = B,
        k = P,
        s = 0; s < S; s++)
            b[o = r << 2] = d * O >> F,
            b[o + 1] = l * O >> F,
            b[o + 2] = f * O >> F,
            d -= c,
            l -= g,
            f -= p,
            c -= L.r,
            g -= L.g,
            p -= L.b,
            o = i + ((o = s + I) < D ? o : D) * T << 2,
            d += x += L.r = b[o],
            l += y += L.g = b[o + 1],
            f += u += L.b = b[o + 2],
            L = L.next,
            c += m = k.r,
            g += w = k.g,
            p += v = k.b,
            x -= m,
            y -= w,
            u -= v,
            k = k.next,
            r += T
    }
    return t
}
,
Utils.extend(Sprite, DisplayObject),
Sprite.prototype.animated = !0,
Sprite.prototype.animDirection = 1,
Sprite.prototype.currentFrame = 0,
Sprite.prototype.totalFrames = 1,
Sprite.prototype.currentLayer = 0,
Sprite.prototype.totalLayers = 1,
Sprite.prototype.bitmap = null,
Sprite.prototype.mask = null,
Sprite.prototype.isMask = !1,
Sprite.prototype.maskInvert = !1,
Sprite.prototype.animStep = 0,
Sprite.prototype.animDelay = 1,
Sprite.prototype.changeFrameDelay = 1e3 / 24,
Sprite.prototype.changeFrameTime = 0,
Sprite.prototype.onchangeframe = null,
Sprite.prototype.onanimend = null,
Sprite.prototype.cacheBitmap = !1,
Sprite.prototype.transformFilter = null,
Sprite.create = function(t, e) {
    if ("string" == typeof t) {
        if (!(e = e || window.library))
            throw new Error("Could not create sprite from asset '%s'. Library not found.",t);
        t = e.getAsset(t)
    }
    return new Sprite(t.bitmap,t.width || 1,t.height || 1,t.frames || 1,t.layers || 1)
}
,
Sprite.prototype.play = function(t) {
    this.animated = !0,
    void 0 !== t && (this.animDirection = t ? -1 : 1)
}
,
Sprite.prototype.stop = function() {
    this.animated = !1
}
,
Sprite.prototype.gotoAndStop = function(t) {
    this.currentFrame = t,
    this.stop()
}
,
Sprite.prototype.gotoAndPlay = function(t, e) {
    this.currentFrame = t,
    this.play(e)
}
,
Sprite.prototype.nextFrame = function(t) {
    this.hasEventListener("enterframe") && this.dispatchEvent("enterframe", {
        target: this,
        delta: t
    });
    var e = 1;
    if (Sprite.CHANGE_FRAME_TYPE == Sprite.CHANGE_FRAME_BY_TIME) {
        if (this.changeFrameTime += t,
        !(this.changeFrameTime >= this.changeFrameDelay * this.animDelay))
            return;
        e = Math.floor(this.changeFrameTime / (this.changeFrameDelay * this.animDelay)),
        this.changeFrameTime -= Math.abs(e) * this.changeFrameDelay * this.animDelay
    } else
        this.animStep++;
    if (this.animStep >= this.animDelay || Sprite.CHANGE_FRAME_TYPE == Sprite.CHANGE_FRAME_BY_TIME) {
        for (var i = 0; i < e; i++)
            this.animated && (this.currentFrame += this.animDirection),
            0 < this.animDirection && this.currentFrame >= this.totalFrames && (this.currentFrame = 0,
            this.hasEventListener("animend") && this.dispatchEvent("animend", {
                target: this,
                delta: t
            })),
            this.animDirection < 0 && this.currentFrame < 0 && (this.currentFrame = this.totalFrames - 1,
            this.hasEventListener("animend") && this.dispatchEvent("animend", {
                target: this,
                delta: t
            })),
            this.hasEventListener("changeframe") && this.dispatchEvent("changeframe", {
                target: this,
                delta: t
            });
        this.animStep = 0
    }
}
,
Sprite.prototype.setMask = function(t) {
    this.mask = t,
    this.mask.isMask = !0,
    this.mask.stage = this.stage
}
,
Sprite.prototype.renderBack = function(t, e, i, s) {
    if (e) {
        var a = 0
          , o = 0;
        this.fillPattern && this.fillPattern.offset && (a = this.fillPattern.offset.x * Utils.globalScale,
        o = this.fillPattern.offset.y * Utils.globalScale);
        var n = t.getContext("2d");
        n.save(),
        n.translate(-i / 2 + a, -s / 2 + o),
        n.fillStyle = e,
        n.strokeStyle = e,
        n.fillRect(-a, -o, i, s),
        n.restore()
    }
}
,
Sprite.prototype.renderBitmap = function(t, e, i, s) {
    if (this.bitmap) {
        var a = this.bitmap.width
          , o = this.bitmap.height
          , n = this.currentLayer * e + this.offset.left * Utils.globalScale
          , r = this.currentFrame * i + this.offset.top * Utils.globalScale;
        if (n < 0 && (n = 0),
        r < 0 && (r = 0),
        n < a && r < o) {
            var h = e
              , d = i;
            if (a < n + h && (h = a - n),
            o < r + d && (d = o - r),
            Sprite.FLOOR_VALUES_ON_RENDER && (n = ~~n,
            r = ~~r,
            h = ~~h,
            d = ~~d,
            e = ~~e,
            i = ~~i),
            0 < h && 0 < d && 0 < e && 0 < i && (this.transformFilter ? this.transformFilter.filter(t, this.cacheBitmap ? BitmapsCache.cache(this.bitmap) : this.bitmap, n, r, h, d, -e / 2, -i / 2, e, i) : t.getContext("2d").drawImage(this.cacheBitmap ? BitmapsCache.cache(this.bitmap) : this.bitmap, n, r, h, d, -e / 2, -i / 2, e, i)),
            s)
                return {
                    x: n,
                    y: r,
                    width: h,
                    height: d
                }
        }
    }
    if (s)
        return {
            x: 0,
            y: 0,
            width: e,
            height: i
        }
}
,
Sprite.prototype.render = function(t, e, i, s) {
    if (!this.isMask || s) {
        i || (i = 0);
        var a = !!this.static == !!e;
        if (a && this.nextFrame(i),
        this.stage && !this.destroy) {
            if (this.prepareCanvas(t),
            a && this.visible && 0 != this.opacity && (!this.hasEventListener("prerender") || !1 !== this.dispatchEvent("prerender", {
                target: this,
                canvas: t,
                delta: i
            }))) {
                this.moveCanvasAnchor(t);
                var o = this.width * Utils.globalScale
                  , n = this.height * Utils.globalScale
                  , r = this.getFillStyle(t);
                if (this.prepareCanvasShadow(t),
                this.stage.ceilSizes && (o = Math.ceil(o),
                n = Math.ceil(n)),
                this.mask) {
                    this.stage.buffer.width = this.stage.buffer.width;
                    var h = this.stage.buffer.getContext("2d");
                    h.save(),
                    h.translate(o / 2, n / 2),
                    this.renderBack(this.stage.buffer, r, o, n);
                    var d = this.renderBitmap(this.stage.buffer, o, n, !0);
                    h.globalCompositeOperation = this.maskInvert ? "destination-out" : "destination-in",
                    this.mask.render ? this.mask.render(this.stage.buffer, e, i, !0) : h.drawImage(this.mask, this.mask.x ? this.mask.x : 0, this.mask.y ? this.mask.y : 0),
                    Sprite.FLOOR_VALUES_ON_RENDER ? t.getContext("2d").drawImage(this.stage.buffer, 0, 0, d.width, d.height, -Math.floor(o / 2), -Math.floor(n / 2), ~~o, ~~n) : t.getContext("2d").drawImage(this.stage.buffer, 0, 0, d.width, d.height, -o / 2, -n / 2, o, n),
                    h.restore()
                } else
                    this.renderBack(t, r, o, n),
                    this.renderBitmap(t, o, n);
                this.stage.allowDebugDrawing && this.allowDebugDrawing && (!this.stage.allowStaticDebugDrawing && this.static || this.debugDraw()),
                this.hasEventListener("render") && this.dispatchEvent("render", {
                    target: this,
                    canvas: t,
                    delta: i
                }),
                this.restoreCanvasShadow(t),
                this.moveCanvasAnchor(t, !0)
            }
            Utils.callSuperMethod(Sprite, this, "render", t, e, i),
            this.restoreCanvas(t)
        }
    }
}
,
Sprite.prototype.resetView = function() {
    this.bitmap = null,
    this.fillColor = null,
    this.fillLinearGradient = null,
    this.fillRadialGradient = null,
    this.fillPattern = null;
    for (var t = 0; t < this.objects.length; t++)
        this.objects[t].resetView && this.objects[t].resetView()
}
,
Sprite.prototype.setTransformFilter = function(t) {
    (t.sprite = this).transformFilter = t
}
,
Sprite.prototype.removeTransformFilter = function() {
    this.transformFilter = null
}
,
Sprite.CHANGE_FRAME_BY_FRAME = 0,
Sprite.CHANGE_FRAME_BY_TIME = 1,
Sprite.CHANGE_FRAME_DELAY = 1e3 / 24,
Sprite.CHANGE_FRAME_TYPE = Sprite.CHANGE_FRAME_BY_FRAME,
Sprite.FLOOR_VALUES_ON_RENDER = !0,
Sprite.CACHE_BITMAPS = !1,
TransformFilter.prototype.animateTo = function(t, e, i, s, a) {
    if (this.sprite && this.sprite.stage) {
        var o = null;
        return (e = ~~e) <= 0 ? this.val = t : this.val != t && (o = this.sprite.stage.createTween(this, "val", this.val, t, e, i)) && (o.onfinish = s,
        o.onchange = a,
        o.play()),
        !o && s && s({
            target: new Tween(this,"val",t,t,e,i)
        }),
        this
    }
}
,
TransformFilter.prototype.animateBy = function(t, e, i, s, a) {
    if (this.sprite && this.sprite.stage) {
        var o = null;
        return (e = ~~e) <= 0 ? this.val += t : 0 != t && (o = this.sprite.stage.createTween(this, "val", this.val, this.val + t, e, i)) && (o.onfinish = s,
        o.onchange = a,
        o.play()),
        !o && s && s({
            target: new Tween(this,"val",this.val,this.val,e,i)
        }),
        this
    }
}
,
TransformFilter.noizeX = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.noizeX, this, this.apply),
    this.val = t || 1,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.noizeX, TransformFilter),
TransformFilter.noizeX.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = 0, f = d / o, c = 0; c < o; c += this.step) {
        var g = this.val * (l % 2 == 0 ? 1 : -1) * Utils.globalScale
          , p = Math.min(this.step, o - (s + c));
        t.getContext("2d").drawImage(e, i, s + c, a, p, n + g, r + c * f, h, p * f),
        l++
    }
}
,
TransformFilter.noizeY = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.noizeY, this, this.apply),
    this.val = t || 1,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.noizeY, TransformFilter),
TransformFilter.noizeY.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = 0, f = h / a, c = 0; c < a; c += this.step) {
        var g = this.val * (l % 2 == 0 ? 1 : -1) * Utils.globalScale
          , p = Math.min(this.step, a - (i + c));
        t.getContext("2d").drawImage(e, i + c, s, p, o, n + c * f, r + g, p * f, d),
        l++
    }
}
,
TransformFilter.waveX = function(t, e, i) {
    Utils.callSuperConstructor(TransformFilter.waveX, this, this.apply),
    this.val = t || 1,
    this.strength = e || 1,
    this.step = i || 1
}
,
Utils.extend(TransformFilter.waveX, TransformFilter),
TransformFilter.waveX.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = d / o, f = 0; f < o; f += this.step) {
        var c = Math.sin(this.val + f / this.strength) * Utils.globalScale
          , g = Math.min(this.step, o - (s + f));
        t.getContext("2d").drawImage(e, i, s + f, a, g, n + c, r + f * l, h, g * l),
        0
    }
}
,
TransformFilter.waveY = function(t, e, i) {
    Utils.callSuperConstructor(TransformFilter.waveY, this, this.apply),
    this.val = t || 1,
    this.strength = e || 1,
    this.step = i || 1
}
,
Utils.extend(TransformFilter.waveY, TransformFilter),
TransformFilter.waveY.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = h / a, f = 0; f < a; f += this.step) {
        var c = Math.sin(this.val + f / this.strength) * Utils.globalScale
          , g = Math.min(this.step, a - (i + f));
        t.getContext("2d").drawImage(e, i + f, s, g, o, n + f * l, r + c, g * l, d),
        0
    }
}
,
TransformFilter.scaleTop = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.scaleTop, this, this.apply),
    this.val = t || 1,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.scaleTop, TransformFilter),
TransformFilter.scaleTop.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = d / o, f = (1 - this.val) / o, c = 0; c < o; c += this.step) {
        var g = Math.min(this.step, o - (s + c))
          , p = h * (this.val + f * (c + g));
        t.getContext("2d").drawImage(e, i, s + c, a, g, n + (h - p) / 2, r + c * l, p, g * l)
    }
}
,
TransformFilter.scaleBottom = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.scaleBottom, this, this.apply),
    this.val = t || 1,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.scaleBottom, TransformFilter),
TransformFilter.scaleBottom.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = d / o, f = (this.val - 1) / o, c = 0; c < o; c += this.step) {
        var g = Math.min(this.step, o - (s + c))
          , p = h * (1 + f * (c + g));
        t.getContext("2d").drawImage(e, i, s + c, a, g, n + (h - p) / 2, r + c * l, p, g * l)
    }
}
,
TransformFilter.scaleLeft = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.scaleLeft, this, this.apply),
    this.val = t || 1,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.scaleLeft, TransformFilter),
TransformFilter.scaleLeft.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = h / a, f = (1 - this.val) / a, c = 0; c < a; c += this.step) {
        var g = Math.min(this.step, a - (i + c))
          , p = d * (this.val + f * (c + g));
        t.getContext("2d").drawImage(e, i + c, s, g, o, n + c * l, r + (d - p) / 2, g * l, p)
    }
}
,
TransformFilter.scaleRight = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.scaleRight, this, this.apply),
    this.val = t || 1,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.scaleRight, TransformFilter),
TransformFilter.scaleRight.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = h / a, f = (this.val - 1) / a, c = 0; c < a; c += this.step) {
        var g = Math.min(this.step, a - (i + c))
          , p = d * (1 + f * (c + g));
        t.getContext("2d").drawImage(e, i + c, s, g, o, n + c * l, r + (d - p) / 2, g * l, p)
    }
}
,
TransformFilter.trail = function(t, e, i, s, a, o, n) {
    Utils.callSuperConstructor(TransformFilter.trail, this, this.apply),
    this.val = t || 0,
    this.count = e || 3,
    this.distance = i || 20,
    this.startOpacity = void 0 === s ? .5 : s,
    this.endOpacity = void 0 === a ? .1 : a,
    this.startScale = void 0 === o ? 1 : o,
    this.endScale = void 0 === n ? 1 : n
}
,
Utils.extend(TransformFilter.trail, TransformFilter),
TransformFilter.trail.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    var l = t.getContext("2d");
    l.save();
    var f = this.distance / this.count * Utils.globalScale
      , c = l.globalAlpha
      , g = this.startOpacity * c
      , p = this.endOpacity * c
      , x = (g - p) / this.count
      , y = 1 + (this.startScale - this.endScale) / this.count;
    l.scale(this.endScale, this.endScale);
    for (var u = this.count; 0 < u; u--) {
        var m = n + h / 2 + Math.cos(this.val) * (u * f)
          , w = r + d / 2 + Math.sin(this.val) * (u * f);
        this.startScale;
        l.globalAlpha = g - u * x + p,
        l.scale(y, y),
        l.drawImage(e, i, s, a, o, m - h / 2, w - d / 2, h, d)
    }
    l.restore(),
    l.drawImage(e, i, s, a, o, n, r, h, d)
}
,
TransformFilter.composite = function(t) {
    Utils.callSuperConstructor(TransformFilter.composite, this, this.apply),
    this.val = t || "source-over"
}
,
Utils.extend(TransformFilter.composite, TransformFilter),
TransformFilter.composite.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    var l = t.getContext("2d")
      , f = l.globalCompositeOperation;
    l.globalCompositeOperation = this.val,
    l.drawImage(e, i, s, a, o, n, r, h, d),
    l.globalCompositeOperation = f
}
,
TransformFilter.lens = function(t, e, i, s, a) {
    Utils.callSuperConstructor(TransformFilter.lens, this, this.apply),
    this.val = t || 2,
    this.x = e || 0,
    this.y = i || 0,
    this.radius = s || 30,
    this.opacity = a || 1
}
,
Utils.extend(TransformFilter.lens, TransformFilter),
TransformFilter.lens.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    var l = t.getContext("2d");
    l.drawImage(e, i, s, a, o, n, r, h, d),
    l.save(),
    l.beginPath(),
    l.arc(this.x * Utils.globalScale, this.y * Utils.globalScale, this.radius * Utils.globalScale, 0, 2 * Math.PI),
    l.closePath(),
    l.clip(),
    l.globalAlpha = this.opacity,
    l.drawImage(e, i, s, a, o, n - (this.x * this.val - this.x) * Utils.globalScale - (h * this.val - h) / 2, r - (this.y * this.val - this.y) * Utils.globalScale - (d * this.val - d) / 2, h * this.val, d * this.val),
    l.restore()
}
,
TransformFilter.moveTop = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.moveTop, this, this.apply),
    this.val = t || 10,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.moveTop, TransformFilter),
TransformFilter.moveTop.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = d / o, f = this.val * Utils.globalScale / (o / this.step), c = 0; c < o; c += this.step) {
        var g = Math.min(this.step, o - (s + c))
          , p = (o - c) * f;
        t.getContext("2d").drawImage(e, i, s + c, a, g, n + p, r + c * l, h, g * l)
    }
}
,
TransformFilter.moveBottom = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.moveBottom, this, this.apply),
    this.val = t || 10,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.moveBottom, TransformFilter),
TransformFilter.moveBottom.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = d / o, f = this.val * Utils.globalScale / (o / this.step), c = 0; c < o; c += this.step) {
        var g = Math.min(this.step, o - (s + c))
          , p = c * f;
        t.getContext("2d").drawImage(e, i, s + c, a, g, n + p, r + c * l, h, g * l)
    }
}
,
TransformFilter.moveLeft = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.moveLeft, this, this.apply),
    this.val = t || 1,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.moveLeft, TransformFilter),
TransformFilter.moveLeft.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = h / a, f = this.val * Utils.globalScale / (a / this.step), c = 0; c < a; c += this.step) {
        var g = Math.min(this.step, a - (i + c))
          , p = (a - c) * f;
        t.getContext("2d").drawImage(e, i + c, s, g, o, n + c * l, r + p, g * l, d)
    }
}
,
TransformFilter.moveRight = function(t, e) {
    Utils.callSuperConstructor(TransformFilter.moveRight, this, this.apply),
    this.val = t || 1,
    this.step = e || 1
}
,
Utils.extend(TransformFilter.moveRight, TransformFilter),
TransformFilter.moveRight.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    for (var l = h / a, f = this.val * Utils.globalScale / (a / this.step), c = 0; c < a; c += this.step) {
        var g = Math.min(this.step, a - (i + c))
          , p = c * f;
        t.getContext("2d").drawImage(e, i + c, s, g, o, n + c * l, r + p, g * l, d)
    }
}
,
TransformFilter.dissolutionY = function(t, e, i) {
    Utils.callSuperConstructor(TransformFilter.dissolutionY, this, this.apply),
    this.val = void 0 === t ? 1 : t,
    this.step = void 0 === e ? 2 : e,
    this.revert = i || !1
}
,
Utils.extend(TransformFilter.dissolutionY, TransformFilter),
TransformFilter.dissolutionY.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    if (!(this.val >= this.step))
        if (this.val <= 0)
            t.getContext("2d").drawImage(e, i, s, a, o, n, r, h, d);
        else
            for (var l = h / a, f = -1, c = 0; c < o; c++)
                ++f > this.step * Utils.globalScale && (f = 0),
                this.revert == f > (this.step - this.val) * Utils.globalScale && t.getContext("2d").drawImage(e, i, s + c, a, 1, n, r + c * l, h, 1 * l)
}
,
TransformFilter.dissolutionX = function(t, e, i) {
    Utils.callSuperConstructor(TransformFilter.dissolutionX, this, this.apply),
    this.val = void 0 === t ? 1 : t,
    this.step = void 0 === e ? 2 : e,
    this.revert = i || !1
}
,
Utils.extend(TransformFilter.dissolutionX, TransformFilter),
TransformFilter.dissolutionX.prototype.apply = function(t, e, i, s, a, o, n, r, h, d) {
    if (!(this.val >= this.step))
        if (this.val <= 0)
            t.getContext("2d").drawImage(e, i, s, a, o, n, r, h, d);
        else
            for (var l = d / o, f = -1, c = 0; c < a; c++)
                ++f > this.step * Utils.globalScale && (f = 0),
                this.revert == f > (this.step - this.val) * Utils.globalScale && t.getContext("2d").drawImage(e, i + c, s, 1, o, n + c * l, r, 1 * l, d)
}
,
TransformFilter.filters = ["noizeX", "noizeY", "waveX", "waveY", "scaleTop", "scaleBottom", "scaleLeft", "scaleRight", "trail", "composite", "lens", "moveTop", "moveBottom", "moveLeft", "moveRight", "dissolutionX", "dissolutionY"],
Utils.extend(StageTimer, EventsProxy),
StageTimer.prototype.onend = null,
StageTimer.prototype.ontick = null,
StageTimer.prototype.update = function(delta) {
    if (this.destroy)
        return !0;
    if (this.paused)
        return !1;
    if (StageTimer.TIMEOUT_TYPE == StageTimer.TIMEOUT_BY_FRAME ? this.timeout-- : this.timeout -= delta,
    this.timeout <= 0) {
        if ("string" == typeof this.onend ? eval(this.onend) : this.hasEventListener("end") && this.dispatchEvent("end", {
            target: this
        }),
        !this.repeat)
            return !0;
        this.rewind()
    }
    return this.hasEventListener("tick") && this.dispatchEvent("tick", {
        target: this,
        delta: delta
    }),
    !1
}
,
StageTimer.prototype.rewind = function() {
    this.timeout = this.initialTimeout
}
,
StageTimer.prototype.resume = function() {
    this.paused = !1
}
,
StageTimer.prototype.pause = function() {
    this.paused = !0
}
,
StageTimer.TIMEOUT_BY_FRAME = 0,
StageTimer.TIMEOUT_BY_TIME = 1,
StageTimer.TIMEOUT_TYPE = StageTimer.TIMEOUT_BY_FRAME,
Utils.extend(Stage, DisplayObjectContainer),
Stage.prototype.refreshBackground = function() {
    this.needToRebuildBack = !0
}
,
Stage.prototype.setBackgroundCanvas = function(t) {
    t && (this.backgroundCanvas = "string" == typeof t ? document.getElementById(t) : t)
}
,
Stage.prototype.destroy = function() {
    clearTimeout(this.tmMain),
    clearTimeout(this.tmFPS),
    this.stop(),
    this.clear(),
    this.clearScreen(this.canvas),
    this.backgroundCanvas && this.clearScreen(this.backgroundCanvas),
    this.removeInputListeners(this.stage)
}
,
Stage.prototype.clearScreen = function(t) {
    this.clearLock || t.getContext("2d").clearRect(0, 0, Math.floor(t.width), Math.floor(t.height))
}
,
Stage.prototype.addChild = function(t) {
    return t.stage = this,
    Utils.callSuperMethod(Stage, this, "addChild", t)
}
,
Stage.prototype.setZIndex = function(t, e) {
    this.setChildZIndex(t, e)
}
,
Stage.prototype.finalizeMouseCoords = function(t, e) {
    if (!t)
        return e;
    var i = this.prepareMouseCoord(e.x)
      , s = this.prepareMouseCoord(e.y);
    t.getIgnoreViewport() || (i += this.viewport.x,
    s += this.viewport.y);
    var a = t.getAbsolutePosition();
    return {
        x: i -= a.x,
        y: s -= a.y
    }
}
,
Stage.prototype.prepareMouseCoord = function(t) {
    return t / Utils.globalScale / Utils.globalPixelScale
}
,
Stage.prototype.processMouseEvent = function(t, e, i) {
    for (var s, a, o = Utils.getMouseCoord(t, this.inputController), n = this.getObjectsStackByCoord(this.prepareMouseCoord(o.x), this.prepareMouseCoord(o.y), i, !1), r = 0; r < n.length; r++)
        if (a = this.finalizeMouseCoords(n[r], o),
        n[r].hasEventListener(e) && (s = n[r].dispatchEvent(e, {
            target: n[r],
            x: a.x,
            y: a.y
        })),
        !1 === s)
            return;
    this.hasEventListener(e) && this.dispatchEvent(e, {
        target: this,
        x: Math.floor(this.prepareMouseCoord(o.x)),
        y: Math.floor(this.prepareMouseCoord(o.y))
    })
}
,
Stage.prototype.checkClick = function(t) {
    this.processMouseEvent(t, "click", this.pixelClickEvent)
}
,
Stage.prototype.checkContextMenu = function(t) {
    this.processMouseEvent(t, "contextmenu", this.pixelClickEvent)
}
,
Stage.prototype.checkMouseMove = function(t) {
    var e = Utils.getMouseCoord(t, this.inputController);
    this.doDrag(this.prepareMouseCoord(e.x), this.prepareMouseCoord(e.y));
    var i, s, a, o = this.getObjectsStackByCoord(this.prepareMouseCoord(e.x), this.prepareMouseCoord(e.y), this.pixelMouseMoveEvent), n = [];
    if (0 < o.length) {
        for (i = 0; i < o.length && (n.push(o[i]),
        a = this.finalizeMouseCoords(o[i], e),
        o[i].hasEventListener("mousemove") && (s = o[i].dispatchEvent("mousemove", {
            target: o[i],
            x: a.x,
            y: a.y
        })),
        !1 !== s); i++)
            ;
        for (!1 !== s && this.hasEventListener("mousemove") && this.dispatchEvent("mousemove", {
            target: this,
            x: Math.floor(this.prepareMouseCoord(e.x)),
            y: Math.floor(this.prepareMouseCoord(e.y))
        }),
        s = !0,
        i = 0; i < n.length; i++)
            if (a = this.finalizeMouseCoords(n[i], e),
            !n[i].mouseOn && n[i].hasEventListener("mouseover") && (s = n[i].dispatchEvent("mouseover", {
                target: n[i],
                x: a.x,
                y: a.y
            })),
            !(n[i].mouseOn = !0) === s) {
                n = n.slice(0, i + 1);
                break
            }
    } else
        this.hasEventListener("mousemove") && this.dispatchEvent("mousemove", {
            target: this,
            x: Math.floor(this.prepareMouseCoord(e.x)),
            y: Math.floor(this.prepareMouseCoord(e.y))
        });
    this.checkMouseOut(n, e)
}
,
Stage.prototype.checkMouseDown = function(t) {
    this.processMouseEvent(t, "mousedown", this.pixelMouseDownEvent)
}
,
Stage.prototype.checkMouseUp = function(t) {
    this.processMouseEvent(t, "mouseup", this.pixelMouseUpEvent)
}
,
Stage.prototype.clear = function() {
    this.tweens = [],
    this.timers = [],
    this.eventsListeners = [],
    this.objectsCounter = 0,
    Utils.callSuperMethod(Stage, this, "clear")
}
,
Stage.prototype.getCenter = function() {
    return {
        x: this.screenWidth / 2,
        y: this.screenHeight / 2
    }
}
,
Stage.prototype.prepareCanvasToGraph = function(t) {
    var e = t.getContext("2d");
    e.save(),
    e.setTransform(1, 0, 0, 1, 0, 0),
    e.globalAlpha = 1
}
,
Stage.prototype.drawRectangle = function(t, e, i, s, a, o, n, r) {
    var h = this.canvas;
    this.prepareCanvasToGraph(h);
    var d = h.getContext("2d");
    d.globalAlpha = void 0 !== n ? n : 1,
    a || (a = "#000"),
    d.fillStyle = a,
    d.strokeStyle = a,
    r || (t -= this.viewport.x,
    e -= this.viewport.y),
    t *= Utils.globalScale,
    e *= Utils.globalScale,
    i *= Utils.globalScale,
    s *= Utils.globalScale,
    o ? d.fillRect(t - i / 2, e - s / 2, i, s) : d.strokeRect(t - i / 2, e - s / 2, i, s),
    d.restore()
}
,
Stage.prototype.drawCircle = function(t, e, i, s, a, o, n) {
    this.drawArc(t, e, i, 0, 2 * Math.PI, !1, s, a, o, n)
}
,
Stage.prototype.drawArc = function(t, e, i, s, a, o, n, r, h, d) {
    var l = this.canvas;
    this.prepareCanvasToGraph(l);
    var f = l.getContext("2d");
    void 0 === r && (r = "#000"),
    f.strokeStyle = r,
    void 0 === n && (n = 1),
    f.lineWidth = n * Utils.globalScale,
    void 0 === h && (h = 1),
    f.globalAlpha = h,
    d || (t -= this.viewport.x,
    e -= this.viewport.y),
    t *= Utils.globalScale,
    e *= Utils.globalScale,
    i *= Utils.globalScale,
    f.beginPath(),
    f.arc(t, e, i, s, a, o),
    f.stroke(),
    f.restore()
}
,
Stage.prototype.drawPolygon = function(t, e, i, s, a) {
    if ("object" == typeof t && t instanceof Array && !(t.length < 2)) {
        for (var o = 0; o < t.length - 1; o++)
            this.drawLine(t[o].x, t[o].y, t[o + 1].x, t[o + 1].y, e, i, s, a);
        this.drawLine(t[o].x, t[o].y, t[0].x, t[0].y, e, i, s, a)
    }
}
,
Stage.prototype.drawLine = function(t, e, i, s, a, o, n, r) {
    var h = this.canvas;
    this.prepareCanvasToGraph(h);
    var d = h.getContext("2d");
    d.strokeStyle = o || "#000",
    d.lineWidth = a ? a * Utils.globalScale : Utils.globalScale,
    d.globalAlpha = n || 1,
    r || (t -= this.viewport.x,
    e -= this.viewport.y,
    i -= this.viewport.x,
    s -= this.viewport.y),
    t *= Utils.globalScale,
    e *= Utils.globalScale,
    i *= Utils.globalScale,
    s *= Utils.globalScale,
    d.beginPath(),
    d.moveTo(t, e),
    d.lineTo(i, s),
    d.stroke(),
    d.restore()
}
,
Stage.prototype.start = function() {
    this.started || (this.started = !0,
    this.clearFPS(),
    this.tick())
}
,
Stage.prototype.forceRender = function() {
    this.started && this.tick()
}
,
Stage.prototype.stop = function() {
    this.started = !1
}
,
Stage.prototype.clearFPS = function() {
    this.lastFPS = this.fps,
    this.fps = 0,
    this.started && (this.tmFPS = setTimeout(this.clearFPS, 1e3))
}
,
Stage.prototype.setTextStyle = function(t, e, i, s, a, o) {
    var n = (o || this.canvas).getContext("2d");
    n.fillStyle = s,
    n.strokeStyle = a;
    var r = "";
    i && (r += i + " "),
    e && (r += Math.floor(e * Utils.globalScale) + "px "),
    t && (r += t),
    n.font = r
}
,
Stage.prototype.drawText = function(t, e, i, s, a, o, n) {
    var r = (n || this.canvas).getContext("2d");
    r.globalAlpha = void 0 === s ? 1 : s,
    a || (e -= this.viewport.x,
    i -= this.viewport.y),
    e *= Utils.globalScale,
    i *= Utils.globalScale,
    o && (e -= this.getTextWidth(t) / 2),
    r.fillText(t, e, i)
}
,
Stage.prototype.strokeText = function(t, e, i, s, a, o, n) {
    var r = (n || this.canvas).getContext("2d");
    r.globalAlpha = void 0 === s ? 1 : s,
    a || (e -= this.viewport.x,
    i -= this.viewport.y),
    e *= Utils.globalScale,
    i *= Utils.globalScale,
    o && (e -= this.getTextWidth(t) / 2),
    r.strokeText(t, e, i)
}
,
Stage.prototype.getTextWidth = function(t, e) {
    return (e || this.canvas).getContext("2d").measureText(t).width
}
,
Stage.prototype.render = function(t, e, i, s) {
    if (t) {
        s || (s = 0);
        var a = t.getContext("2d");
        if (a.setTransform(1, 0, 0, 1, 0, 0),
        !i) {
            var o = this.getFillStyle(t);
            o ? (a.fillStyle = o,
            a.fillRect(0, 0, t.width, t.height)) : this.clearLock || this.clearScreen(t)
        }
        this.prepareCanvas(t),
        this.moveCanvasAnchor(t),
        this.prepareCanvasShadow(t),
        Utils.callSuperMethod(Stage, this, "render", t, e, s),
        this.restoreCanvasShadow(t),
        this.moveCanvasAnchor(t, !0),
        this.restoreCanvas(t)
    }
}
,
Stage.prototype.createTween = function(t, e, i, s, a, o) {
    var n = new Tween(t,e,i,s,a,o);
    return this.tweens.push(n),
    n
}
,
Stage.prototype.removeTween = function(t) {
    var e = null;
    if (isNaN(t)) {
        for (var i = 0; i < this.tweens.length; i++)
            if (this.tweens[i] === t) {
                e = i;
                break
            }
    } else
        e = t;
    return isNaN(e) || (this.tweens[e] && this.tweens[e].pause(),
    this.tweens.splice(e, 1)),
    e
}
,
Stage.prototype.clearObjectTweens = function(t) {
    for (var e = 0; e < this.tweens.length; e++)
        this.tweens[e].obj === t && (this.tweens[e].destroy = !0)
}
,
Stage.prototype.updateTweens = function(t) {
    for (var e, i = 0; i < this.tweens.length; i++)
        (e = this.tweens[i]).destroy && (i = this.removeTween(i),
        i--);
    for (i = 0; i < this.tweens.length; i++)
        !(e = this.tweens[i]).newly && e.tick(t) && (e.destroy = !0),
        e.newly = !1
}
,
Stage.prototype.setTimeout = function(t, e) {
    var i = new StageTimer(t,e);
    return this.timers.push(i),
    i
}
,
Stage.prototype.clearTimeout = function(t) {
    t && (t.destroy = !0)
}
,
Stage.prototype.setInterval = function(t, e) {
    var i = new StageTimer(t,e,!0);
    return this.timers.push(i),
    i
}
,
Stage.prototype.clearInterval = function(t) {
    this.clearTimeout(t)
}
,
Stage.prototype.removeTimer = function(t) {
    this.timers = Utils.removeFromArray(this.timers, t)
}
,
Stage.prototype.updateTimers = function(t) {
    for (var e, i = 0; i < this.timers.length; i++)
        (e = this.timers[i]).destroy && (this.removeTimer(e),
        i--);
    for (i = 0; i < this.timers.length; i++)
        !(e = this.timers[i]).newly && e.update(t) && (e.destroy = !0),
        e.newly = !1
}
,
Stage.prototype.tick = function() {
    var t;
    if (Stage.TIMER_MODE == Stage.TIMER_MODE_FRAME && clearTimeout(this.tmMain),
    Utils.isWindowHidden)
        this.lastTick = 0,
        t = this.delay;
    else {
        var e = (new Date).getTime()
          , i = Math.min(Stage.MIN_DELTA, e - this.lastTick);
        if (this.lastTick = e,
        this.hasEventListener("pretick") && this.dispatchEvent("pretick", {
            target: this,
            delta: i
        }),
        !this.started)
            return void (this.lastTick = 0);
        if (this.updateTweens(i),
        !this.started)
            return void (this.lastTick = 0);
        if (this.updateTimers(i),
        !this.started)
            return void (this.lastTick = 0);
        this.hasEventListener("prerender") && this.dispatchEvent("prerender", {
            target: this,
            delta: i
        }),
        this.needToRebuildBack && (this.needToRebuildBack = !1,
        this.backgroundCanvas && this.render(this.backgroundCanvas, !0));
        var s = !1;
        if (this.drawBackAlways && (this.render(this.canvas, !0, !1, i),
        s = !0),
        this.render(this.canvas, !1, s, i),
        this.showFPS) {
            var a = this.canvas.getContext("2d");
            a.save(),
            this.setTextStyle("sans-serif", 10, "bold", "#fff"),
            a.shadowColor = "#000",
            a.shadowBlur = 4 * Utils.globalScale,
            this.drawText("FPS: " + this.lastFPS, 2, 10, 1, !0),
            a.restore()
        }
        this.hasEventListener("posttick") && this.dispatchEvent("posttick", {
            target: this,
            delta: i
        }),
        t = (new Date).getTime() - e,
        (t = this.delay - t) < 1 && (t = 1),
        this.fps++
    }
    this.started ? Stage.TIMER_MODE == Stage.TIMER_MODE_FRAME ? this.tmMain = setTimeout(this.tick, t) : requestAnimationFrame(this.tick) : this.lastTick = 0
}
,
Stage.prototype.box2dSync = function(t) {
    for (var e, i = t.m_bodyList; i; i = i.m_next)
        i.sprite && (i.sprite.rotation = i.GetRotation(),
        e = i.GetPosition(),
        i.sprite.x = e.x,
        i.sprite.y = e.y,
        i.sprite.hasEventListener("box2dsync") && i.sprite.dispatchEvent("box2dsync", {
            target: i.sprite
        }))
}
,
Stage.prototype.processTouchEvent = function(t, e) {
    var i = t.length;
    !Stage.MULTITOUCH_ENABLED && 1 < i && (i = 1);
    for (var s = 0; s < i; s++) {
        var a = {
            clientX: t[s].clientX,
            clientY: t[s].clientY
        };
        this[e](a)
    }
}
,
Stage.prototype.prepareEventTouches = function(t, e) {
    return t[e] || (t[e] = [{
        clientX: t.clientX,
        clientY: t.clientY
    }]),
    t[e]
}
,
Stage.prototype.restoreFocus = function() {
    this.inputController && (window.focus && window.focus(),
    document.body.focus && document.body.focus(),
    this.inputController.focus && this.inputController.focus())
}
,
Stage.prototype.inputListeners = null,
Stage.prototype.addInputListeners = function(t) {
    if (t = t || this.inputController || this.canvas,
    this.removeInputListeners(),
    this.inputController = t,
    !this.inputController)
        return !1;
    for (var e in this.inputListeners = {},
    this.inputListeners[Utils.getTouchStartEvent()] = Utils.proxy(function(t) {
        if (Utils.touchScreen)
            return this.restoreFocus(),
            this.processTouchEvent(this.prepareEventTouches(t, "changedTouches"), "checkMouseDown"),
            this.processTouchEvent(this.prepareEventTouches(t, "changedTouches"), "checkClick"),
            Utils.preventEvent(t)
    }, this),
    this.inputListeners[Utils.getTouchMoveEvent()] = Utils.proxy(function(t) {
        if (Utils.touchScreen)
            return this.processTouchEvent(this.prepareEventTouches(t, "changedTouches"), "checkMouseMove"),
            Utils.preventEvent(t)
    }, this),
    this.inputListeners[Utils.getTouchEndEvent()] = Utils.proxy(function(t) {
        if (Utils.touchScreen)
            return this.processTouchEvent(this.prepareEventTouches(t, "changedTouches"), "checkMouseUp"),
            Utils.preventEvent(t)
    }, this),
    this.inputListeners.click = Utils.proxy(function(t) {
        if (!Utils.touchScreen)
            return this.restoreFocus(),
            this.checkClick(t),
            Utils.preventEvent(t)
    }, this),
    this.inputListeners.mousemove = Utils.proxy(function(t) {
        if (!Utils.touchScreen)
            return this.checkMouseMove(t),
            Utils.preventEvent(t)
    }, this),
    this.inputListeners.mousedown = Utils.proxy(function(t) {
        if (!Utils.touchScreen)
            return this.restoreFocus(),
            0 == t.button && this.checkMouseDown(t),
            Utils.preventEvent(t)
    }, this),
    this.inputListeners.mouseup = Utils.proxy(function(t) {
        if (!Utils.touchScreen)
            return 0 == t.button && this.checkMouseUp(t),
            Utils.preventEvent(t)
    }, this),
    this.inputListeners.contextmenu = Utils.proxy(function(t) {
        if (!Utils.touchScreen)
            return this.restoreFocus(),
            this.checkContextMenu(t),
            Utils.preventEvent(t)
    }, this),
    this.inputListeners)
        Utils.bindEvent(this.inputController, e, this.inputListeners[e])
}
,
Stage.prototype.removeInputListeners = function() {
    if (this.inputController && this.inputListeners)
        for (var t in this.inputListeners)
            Utils.unbindEvent(this.inputController, t, this.inputListeners[t]);
    this.inputListeners = null
}
,
Stage.MIN_DELTA = 500,
Stage.TIMER_MODE_FRAME = 0,
Stage.TIMER_MODE_TIME = 1,
Stage.TIMER_MODE = Stage.TIMER_MODE_FRAME,
Stage.MULTITOUCH_ENABLED = !0,
function() {
    function t(t) {
        setTimeout(t, 1e3 / 60)
    }
    var e = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || t;
    if (Utils.detectMobileBrowser()) {
        var i = !1;
        !Utils.isAndroid() || Utils.isChrome() || Utils.isFirefox() || (i = !0),
        i && (e = t)
    }
    window.requestAnimationFrame = e
}();
var ExternalAPI = {
    type: "coolmath",
    init: function() {
        var t = window.location.hostname || window.location.host;
        if (["localhost", "192.168.1.41", "spy.games235.com", "toydefense.github.io", "playtomax.com", "portal.playtomax.com", "adm.playtomax.com", "coolmath-games.com", "coolmathgames.com", "www.coolmath-games.com", "www.coolmathgames.com", "m.coolmathgames.com", "m.coolmath-games.com", "m-stage.coolmathgames.com", "m-stage.coolmath-games.com", "edit.coolmath-games.com", "edit.coolmathgames.com", "www.stage.coolmath-games.com", "www.stage.coolmathgames.com", "stage.coolmath-games.com", "stage.coolmathgames.com", "edit-stage.coolmath-games.com", "edit-stage.coolmathgames.com", "dev.coolmathgames.com", "dev.coolmath-games.com"].indexOf(t) < 0)
            throw Error("Host error");
        window.addEventListener("keydown", ExternalAPI.preventKeyScroll, !1),
        document.body.addEventListener("keydown", ExternalAPI.preventKeyScroll, !1)
    },
    exec: function() {
        var t = arguments[0];
        if ("exec" != t && "function" == typeof ExternalAPI[t])
            return ExternalAPI[t].apply(ExternalAPI, Utils.getFunctionArguments(arguments, 1))
    },
    check: function() {
        return !0
    },
    getMoreGamesURL: function() {
        return ""
    },
    getPreloaderURL: function() {
        return ""
    },
    getMoreGamesButtonDisable: function() {
        return !0
    },
    showCompanyLogo: function(t) {
        var e = Utils.getWindowRect()
          , i = "";
        i = e.width > e.height ? ExternalAPI.splashLandscaleSrc : ExternalAPI.splashPortraitScr;
        var s = document.createElement("div");
        return s.style.position = "absolute",
        s.style.left = "0px",
        s.style.top = "0px",
        s.style.bottom = "0px",
        s.style.right = "0px",
        s.style.zIndex = "200000",
        s.style.backgroundColor = "#000",
        s.style.backgroundImage = "url(" + i + ")",
        s.style.backgroundRepeat = "no-repeat",
        s.style.backgroundPosition = "center center",
        document.body.appendChild(s),
        setTimeout(function() {
            document.body.removeChild(s),
            t && t()
        }, 2e3),
        !0
    },
    preventKeyScroll: function(t) {
        var e = t.keyCode || t.which;
        37 <= e && e <= 40 && t.preventDefault()
    },
    trackGameEvent: function(t, e) {
        var i = ""
          , s = "";
        "StartGame" == t && (i = "start"),
        "LevelAttempt" == t && (i = "start",
        s = e + ""),
        "LevelRestart" == t && (i = "replay",
        s = e + ""),
        window.parent.cmgGameEvent && (s ? window.parent.cmgGameEvent(i, s) : window.parent.cmgGameEvent(i))
    },
    splashLandscaleSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAMAAAACDyzWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NjcyOSwgMjAxMi8wNS8wMy0xMzo0MDowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIEVsZW1lbnRzIDEyLjAgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxQTIwQUZFNzk5REIxMUU1QTU5OUJCQjc5RDhDMzE4OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxQTIwQUZFODk5REIxMUU1QTU5OUJCQjc5RDhDMzE4OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFBMjBBRkU1OTlEQjExRTVBNTk5QkJCNzlEOEMzMTg5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFBMjBBRkU2OTlEQjExRTVBNTk5QkJCNzlEOEMzMTg5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ricn9AAAAwBQTFRF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",
    splashPortraitScr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAJYCAMAAACjPuSwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QjgyMjdFRjE3MTgxMUU3QjIxNEFDQjE1NUVDNjgzOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QjgyMjdGMDE3MTgxMUU3QjIxNEFDQjE1NUVDNjgzOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVCODIyN0VEMTcxODExRTdCMjE0QUNCMTU1RUM2ODM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVCODIyN0VFMTcxODExRTdCMjE0QUNCMTU1RUM2ODM5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7PvCUgAAAX1QTFRF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"
}
  , TTLoader = {
    endCallback: null,
    loadedData: null,
    landscapeMode: !1,
    skipPlayButton: !1,
    completed: !1,
    create: function(t, e, i, s) {
        TTLoader.endCallback = t,
        TTLoader.landscapeMode = e,
        TTLoader.skipPlayButton = i,
        document.getElementById("progress_container").style.background = "#fff",
        document.getElementById("progress_container").style.zIndex = "1000";
        var a = document.getElementById("progress");
        a.setAttribute("valign", "top"),
        a.style.verticalAlign = "top",
        a.style.background = "#fff";
        var o = document.createElement("div")
          , n = document.createElement("a");
        n.setAttribute("id", "tt_load_logo_c");
        var r = window.ExternalAPI ? ExternalAPI.exec("getPreloaderURL") : "http://playtomax.com/";
        if (!s && r) {
            var h = "click";
            Utils.touchScreen && !Utils.isWindowsPhone() && (h = Utils.getTouchStartEvent()),
            Utils.bindEvent(n, h, function() {
                var t = window.open(r, "_blank");
                t ? t.focus() : window.location.href = href
            })
        }
        n.setAttribute("href", "javascript:void(0)"),
        n.setAttribute("target", "");
        var d = new Image;
        d.setAttribute("id", "tt_load_logo"),
        d.setAttribute("border", ""),
        d.src = TTLoader.logoSrc,
        d.style.cursor = "pointer",
        n.appendChild(d),
        o.appendChild(n),
        a.appendChild(o),
        (o = document.createElement("div")).setAttribute("id", "tt_load_progress_cont"),
        o.setAttribute("align", "left"),
        o.style.margin = "auto",
        o.setAttribute("style", "padding: 1px; border: 2px solid #e44d26; background: #fff; position: relative; margin: auto");
        var l = document.createElement("div");
        l.setAttribute("id", "tt_load_progress"),
        l.setAttribute("style", "width: 0px; background: #e44d26;"),
        l.innerHTML = "&nbsp;",
        o.appendChild(l),
        a.appendChild(o),
        (o = document.createElement("div")).setAttribute("id", "tt_load_play");
        var f = new Image;
        f.setAttribute("id", "tt_load_button"),
        f.src = TTLoader.buttonDisabledSrc,
        f.style.visibility = TTLoader.skipPlayButton ? "hidden" : "visible",
        f.style.margin = "auto",
        o.appendChild(f),
        a.appendChild(o),
        Utils.addEventListener("fitlayout", TTLoader.setSizes),
        TTLoader.setSizes()
    },
    setSizes: function() {
        var t = Utils.getWindowRect();
        document.getElementById("progress_container").style.width = t.width + "px",
        document.getElementById("progress_container").style.height = t.height + "px";
        var e = Utils.globalScale * Utils.globalPixelScale;
        TTLoader.landscapeMode || (document.getElementById("progress").style.paddingTop = Math.floor(80 * e) + "px"),
        document.getElementById("tt_load_progress_cont").style.width = Math.floor(200 * e) + "px",
        document.getElementById("tt_load_progress").style.height = Math.floor(12 * e) + "px",
        document.getElementById("tt_load_progress").style.width = e * TTLoader.progressVal * 2 + "px",
        document.getElementById("tt_load_logo").style.marginTop = Math.floor(80 * e) + "px",
        document.getElementById("tt_load_logo").setAttribute("width", Math.floor(300 * e) + "px"),
        document.getElementById("tt_load_logo").setAttribute("height", Math.floor(65 * e) + "px"),
        document.getElementById("tt_load_button").setAttribute("width", Math.floor(65 * e) + "px"),
        document.getElementById("tt_load_button").setAttribute("height", Math.floor(29 * e) + "px"),
        document.getElementById("tt_load_button").style.marginTop = Math.floor(30 * e) + "px"
    },
    progressVal: 0,
    showLoadProgress: function(t) {
        t < 0 && (t = 0),
        100 < t && (t = 100),
        TTLoader.progressVal = t,
        TTLoader.setSizes()
    },
    loadComplete: function(t) {
        TTLoader.showLoadProgress(100),
        TTLoader.loadedData = t;
        var e = document.getElementById("tt_load_button");
        Utils.bindEvent(e, "click", TTLoader.close),
        Utils.bindEvent(e, Utils.getTouchEndEvent(), TTLoader.close),
        e.style.cursor = "pointer",
        e.src = TTLoader.buttonSrc,
        (e = document.getElementById("tt_load_progress")).style.background = "transparent",
        (e = document.getElementById("tt_load_progress_cont")).style.border = "2px solid transparent",
        e.style.background = "transparent",
        document.getElementById("tt_load_button").style.display = "block",
        TTLoader.skipPlayButton && TTLoader.close()
    },
    close: function(t) {
        TTLoader.completed || (TTLoader.completed = !0,
        ExternalAPI.exec("trackGameEvent", "StartGame"),
        clearTimeout(TTLoader.animateTimeout),
        TTLoader.endCallback(TTLoader.loadedData))
    },
    logoSrc: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJGMEE3ODFBRDlFQTExRTNCQzlFRkU2NDEyNEFGQjIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJGMEE3ODFCRDlFQTExRTNCQzlFRkU2NDEyNEFGQjIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkYwQTc4MThEOUVBMTFFM0JDOUVGRTY0MTI0QUZCMjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkYwQTc4MTlEOUVBMTFFM0JDOUVGRTY0MTI0QUZCMjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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",
    buttonDisabledSrc: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGOTNDRkRBRDlFQjExRTNCODI2OTVDQ0I1QjQ3QTUzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGOTNDRkRCRDlFQjExRTNCODI2OTVDQ0I1QjQ3QTUzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEY5M0NGRDhEOUVCMTFFM0I4MjY5NUNDQjVCNDdBNTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEY5M0NGRDlEOUVCMTFFM0I4MjY5NUNDQjVCNDdBNTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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",
    buttonSrc: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ0MkY2NjRBRDlFQjExRTNBNzU1REY3NjZERUJEODBBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ0MkY2NjRCRDlFQjExRTNBNzU1REY3NjZERUJEODBBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDQyRjY2NDhEOUVCMTFFM0E3NTVERjc2NkRFQkQ4MEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDQyRjY2NDlEOUVCMTFFM0E3NTVERjc2NkRFQkQ4MEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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"
};
function TilesSprite(t, e, i, s, a, o) {
    TilesSprite.superclass.constructor.call(this, t, e, i, a, o),
    this.framesCount = s,
    this.animated = 1 < s,
    this.addEventListener("changeframe", TilesSprite.changeStep),
    this.addEventListener("prerender", TilesSprite.sync)
}
function BitmapText(t, e) {
    this.font = Utils.isArray(t) ? t : [t],
    this.charMap = e,
    this.sprites = [],
    this.lines = [],
    this.stage = window.stage,
    this.parent = window.stage
}
function AudioPlayer() {
    this.volume = 1,
    this.disabled = !1,
    this.basePath = "",
    this.mp3Support = !0,
    this.delayPlay = !1,
    this.audioWrapper = null,
    this.locked = !1,
    this.busy = !1,
    this.startPlayTime = 0,
    this.onend = null,
    this.controlPlay = Utils.proxy(this.controlPlay, this)
}
function AudioMixer(t, e) {
    this.singleChannelMode = !1,
    this.channels = [],
    this.init(t, e)
}
Utils.extend(TilesSprite, Sprite),
TilesSprite.prototype.currentFrameX = 0,
TilesSprite.create = function(t, e) {
    if ("string" == typeof t) {
        if (!(e = e || window.library))
            throw new Error("Could not create sprite from asset '%s'. Library not found.",t);
        t = e.getAsset(t)
    }
    return new TilesSprite(t.bitmap,t.width || 1,t.height || 1,t.framesCount || (t.frames || 1) * (t.layers || 1),t.frames || 1,t.layers || 1)
}
,
TilesSprite.prototype.gotoAndStop = function(t) {
    this.currentFrameX = t,
    this.stop()
}
,
TilesSprite.prototype.gotoAndPlay = function(t, e) {
    this.currentFrameX = t,
    this.play(e)
}
,
TilesSprite.prototype.dispatchEvent = function(t, e) {
    if ("animend" == t) {
        if (!e.fromTileSprite)
            return;
        delete e.fromTileSprite
    }
    return EventsManager.dispatchEvent(this, t, e)
}
,
TilesSprite.changeStep = function(t) {
    var e = t.target;
    e.animated && (e.currentFrameX += e.animDirection,
    0 < e.animDirection && e.currentFrameX >= e.framesCount && (e.currentFrameX = 0,
    e.hasEventListener("animend") && e.dispatchEvent("animend", {
        target: e,
        delta: t.delta,
        fromTileSprite: !0
    })),
    e.animDirection < 0 && e.currentFrameX < 0 && (e.currentFrameX = e.framesCount - 1,
    e.hasEventListener("animend") && e.dispatchEvent("animend", {
        target: e,
        delta: t.delta,
        fromTileSprite: !0
    })))
}
,
TilesSprite.sync = function(t) {
    var e = t.target;
    e.currentLayer = Math.floor(e.currentFrameX / e.totalFrames),
    e.currentFrame = e.currentFrameX - e.currentLayer * e.totalFrames
}
,
BitmapText.ALIGN_LEFT = 0,
BitmapText.ALIGN_RIGHT = 1,
BitmapText.ALIGN_CENTER = 2,
BitmapText.VALIGN_TOP = 0,
BitmapText.VALIGN_MIDDLE = 1,
BitmapText.VALIGN_BOTTOM = 2,
BitmapText.spriteClass = Sprite,
BitmapText.LINES_DELIMITER = "\n",
BitmapText.prototype.x = 0,
BitmapText.prototype.y = 0,
BitmapText.prototype.align = BitmapText.ALIGN_LEFT,
BitmapText.prototype.valign = BitmapText.VALIGN_TOP,
BitmapText.prototype.rotation = 0,
BitmapText.prototype.charSpacing = 0,
BitmapText.prototype.lineSpacing = 0,
BitmapText.prototype.lineHeight = null,
BitmapText.prototype.maxWidth = 0,
BitmapText.prototype.scale = 1,
BitmapText.prototype.opacity = 1,
BitmapText.prototype.static = !1,
BitmapText.prototype.text = "",
this.ignoreViewport = !1,
this.zIndex = void 0,
BitmapText.prototype.manageSprites = function(t) {
    if (this.parent) {
        var e, i, s = t.length, a = this.sprites.length;
        if (a < s)
            for (e = 0; e < s - a; e++)
                i = new BitmapText.spriteClass(null,0,0),
                this.sprites.push(i),
                this.parent.addChild(i);
        if (s < a) {
            for (e = 0; e < a - s; e++)
                this.parent.removeChild(this.sprites[e]);
            this.sprites.splice(0, a - s)
        }
    }
}
,
BitmapText.prototype.getChar = function(t) {
    for (var e = t.charCodeAt(0), i = 0; i < this.charMap.length; i++)
        if (this.charMap[i].id == e)
            return this.charMap[i];
    return console.log("Char not found", t, e, this.text),
    {
        id: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        xoffset: 0,
        yoffset: 0,
        page: 0,
        xadvance: 0
    }
}
,
BitmapText.prototype.getWidth = function() {
    for (var t = 0, e = 0; e < this.lines.length; e++) {
        for (var i = 0, s = 0; s < this.lines[e].length; s++)
            i += this.getChar(this.lines[e].substr(s, 1)).xadvance + this.charSpacing;
        t < i && (t = i)
    }
    return t
}
,
BitmapText.prototype.getRealWidth = function() {
    return this.getWidth() * this.scale
}
,
BitmapText.prototype.getWidthOfLine = function(t) {
    for (var e = 0, i = 0; i < this.lines[t].length; i++)
        e += this.getChar(this.lines[t].substr(i, 1)).xadvance + this.charSpacing;
    return e
}
,
BitmapText.prototype.getHeight = function() {
    for (var t = 0, e = 0; e < this.lines.length; e++)
        t += this.getHeightOfLine(e) + this.lineSpacing;
    return t
}
,
BitmapText.prototype.getRealHeight = function() {
    return this.getHeight() * this.scale
}
,
BitmapText.prototype.getHeightOfLine = function(t) {
    if (this.lineHeight)
        return this.lineHeight;
    for (var e, i = 0, s = 0; s < this.lines[t].length; s++)
        (e = this.getChar(this.lines[t].substr(s, 1))).height + e.yoffset > i && (i = e.height + e.yoffset);
    return i
}
,
BitmapText.prototype.setScaleToFitContainer = function(t, e, i) {
    var s = t / this.getWidth();
    e && s < e ? s = e : i && i < s && (s = i),
    this.scale = s
}
,
BitmapText.prototype.write = function(t) {
    var e, i, s, a, o, n, r, h, d;
    if (t += "",
    0 < this.maxWidth) {
        for (var l, f = t.split(BitmapText.LINES_DELIMITER), c = [], g = [], p = 0; p < f.length; p++) {
            g = [(l = f[p].split(" "))[0]];
            for (var x = 1; x < l.length; x++)
                this.lines = [g.join(" ") + " " + l[x]],
                this.getWidthOfLine(0) > this.maxWidth ? (c.push(g.join(" ")),
                g = [l[x]]) : g.push(l[x]);
            c.push(g.join(" "))
        }
        t = c.join(BitmapText.LINES_DELIMITER)
    }
    this.text = t,
    this.lines = t.split(BitmapText.LINES_DELIMITER),
    this.manageSprites(t),
    s = this.x,
    a = this.y,
    o = this.y,
    h = this.getHeight(),
    this.valign == BitmapText.VALIGN_MIDDLE && (o = this.y - h / 2 * this.scale),
    this.valign == BitmapText.VALIGN_BOTTOM && (o = this.y - h * this.scale);
    var y = 0
      , u = 0;
    for (x = 0; x < this.lines.length; x++) {
        d = this.getHeightOfLine(x),
        this.align == BitmapText.ALIGN_CENTER && (s = this.x - this.getWidthOfLine(x) / 2 * this.scale),
        this.align == BitmapText.ALIGN_RIGHT && (s = this.x - this.getWidthOfLine(x) * this.scale),
        (n = new Vector(s - this.x,o - this.y + u)).rotate(-this.rotation),
        s = n.x + this.x,
        a = n.y + this.y,
        u += (d + this.lineSpacing) * this.scale,
        n = new Vector(0,0);
        for (var m = 0; m < this.lines[x].length; m++)
            i = this.sprites[y],
            y++,
            i.visible = !0,
            (e = this.getChar(this.lines[x].substr(m, 1))) ? (i.bitmap = this.font[e.page ? e.page : 0],
            i.width = e.width,
            i.height = e.height,
            i.offset.left = e.x,
            i.offset.top = e.y,
            i.anchor.x = -e.width / 2,
            i.anchor.y = -e.height / 2,
            (r = n.clone()).x += e.xoffset * this.scale,
            r.y += (e.yoffset - d / 2) * this.scale,
            r.rotate(-this.rotation),
            i.x = r.x + s,
            i.y = r.y + a,
            i.scaleX = i.scaleY = this.scale,
            i.rotation = this.rotation,
            i.setStatic(this.static),
            i.ignoreViewport = this.ignoreViewport,
            i.opacity = this.opacity,
            i.gx = i.x,
            i.gy = i.y,
            i.gscaleX = i.scaleX,
            i.gscaleY = i.scaleY,
            i.grotation = i.rotation,
            i.gopacity = i.opacity,
            n.x += (e.xadvance + this.charSpacing) * this.scale,
            "number" == typeof this.zIndex && i.zIndex != this.zIndex && i.setZIndex(this.zIndex)) : i.visible = !1
    }
}
,
BitmapText.prototype.setStatic = function(t) {
    t = !!t,
    this.static != t && (this.static = t,
    this.refresh())
}
,
BitmapText.prototype.setZIndex = function(t) {
    this.zIndex = t;
    for (var e = 0; e < this.sprites.length; e++)
        this.sprites[e].setZIndex(t)
}
,
BitmapText.prototype.addToGroup = function(t) {
    for (var e = 0; e < this.sprites.length; e++)
        this.sprites[e].gx = this.sprites[e].x / 2,
        this.sprites[e].gy = this.sprites[e].y,
        t.addChild(this.sprites[e], !1)
}
,
BitmapText.prototype.putToGroup = function(t) {
    for (var e = 0; e < this.sprites.length; e++)
        this.sprites[e].gx = this.sprites[e].x,
        this.sprites[e].gy = this.sprites[e].y,
        t.addChild(this.sprites[e], !1)
}
,
BitmapText.prototype.refresh = function() {
    this.write(this.text)
}
,
BitmapText.prototype.refreshOnTween = function(t) {
    t.target.obj.refresh()
}
,
BitmapText.prototype.setPosition = function(t, e) {
    this.x = t,
    this.y = e,
    this.refresh()
}
,
BitmapText.prototype.removeTweens = function() {
    var t = this.parent && this.parent.stage ? this.parent.stage : this.stage;
    t && t.clearObjectTweens(this)
}
,
BitmapText.prototype.addTween = function(t, e, i, s, a, o) {
    var n = this.parent && this.parent.stage ? this.parent.stage : this.stage;
    if (n) {
        var r = this[t];
        if (!isNaN(r)) {
            var h = n.createTween(this, t, r, e, i, s);
            return h.onchange = o,
            h.onfinish = a,
            h
        }
    }
}
,
BitmapText.prototype.moveTo = function(t, e, i, s, a, o) {
    if ((i = ~~i) <= 0)
        this.setPosition(t, e);
    else {
        var n = this.addTween("x", t, i, s, a, o);
        n && (n.addEventListener("change", this.refreshOnTween),
        n.addEventListener("finish", this.refreshOnTween),
        n.play());
        var r = this.addTween("y", e, i, s, n ? null : a, n ? null : o);
        r && (r.addEventListener("change", this.refreshOnTween),
        r.addEventListener("finish", this.refreshOnTween),
        r.play())
    }
    return this
}
,
BitmapText.prototype.moveBy = function(t, e, i, s, a, o) {
    return this.moveTo(this.x + t, this.y + e, i, s, a, o)
}
,
BitmapText.prototype.fadeTo = function(t, e, i, s, a) {
    if ((e = ~~e) <= 0)
        this.opacity = t;
    else {
        var o = this.addTween("opacity", t, e, i, s, a);
        o && (o.play(),
        o.addEventListener("change", this.refreshOnTween),
        o.addEventListener("finish", this.refreshOnTween))
    }
    return this
}
,
BitmapText.prototype.fadeBy = function(t, e, i, s, a) {
    var o = Math.max(0, Math.min(1, this.opacity + t));
    return this.fadeTo(o, e, i, s, a)
}
,
BitmapText.prototype.rotateTo = function(t, e, i, s, a) {
    if ((e = ~~e) <= 0)
        this.rotation = t;
    else {
        var o = this.addTween("rotation", t, e, i, s, a);
        o && (o.play(),
        o.addEventListener("change", this.refreshOnTween),
        o.addEventListener("finish", this.refreshOnTween))
    }
    return this
}
,
BitmapText.prototype.rotateBy = function(t, e, i, s, a) {
    return this.rotateTo(this.rotation + t, e, i, s, a)
}
,
BitmapText.prototype.scaleTo = function(t, e, i, s, a) {
    if ((e = ~~e) <= 0)
        this.scale = t;
    else {
        var o = this.addTween("scale", t, e, i, s, a);
        o && (o.play(),
        o.addEventListener("change", this.refreshOnTween),
        o.addEventListener("finish", this.refreshOnTween))
    }
    return this
}
,
AudioPlayer.prototype.createNewAudio = function() {
    if (AudioMixer.isWebAudioSupport()) {
        this.gainNode = AudioMixer.waContext.createGainNode ? AudioMixer.waContext.createGainNode() : AudioMixer.waContext.createGain();
        var t = AudioMixer.waContext.createBufferSource();
        return t.connect(this.gainNode),
        this.gainNode.connect(AudioMixer.waContext.destination),
        t
    }
    return document.createElement("audio")
}
,
AudioPlayer.prototype.isMp3Support = function() {
    return "" != document.createElement("audio").canPlayType("audio/mpeg")
}
,
AudioPlayer.prototype.init = function(t) {
    return this.basePath = t || "",
    this.delayPlay = "ontouchstart"in window,
    this.audioWrapper = this.createNewAudio(),
    this.mp3Support = this.isMp3Support(),
    !0
}
,
AudioPlayer.prototype.play = function(t, e) {
    if (this.disabled)
        return !1;
    var i = this.basePath + "/" + t + (this.mp3Support ? ".mp3" : ".ogg");
    if (this.stop(),
    this.audioWrapper = this.createNewAudio(),
    this.audioWrapper.doLoop = !!e,
    this.audioWrapper.fileName = t,
    AudioMixer.isWebAudioSupport()) {
        var s = this;
        this.loadSound(i, function(t) {
            s.audioWrapper.buffer || (s.audioWrapper.buffer = t,
            s.audioWrapper.noteOn ? s.audioWrapper.noteOn(0) : s.audioWrapper.start(0),
            s.startPlayTime = (new Date).getTime(),
            s.audioWrapper.loop = e,
            void 0 !== s.audioWrapper.playbackState ? s.waCheckInterval = setInterval(function() {
                s.audioWrapper ? s.audioWrapper.playbackState == s.audioWrapper.FINISHED_STATE && s.controlPlay() : clearInterval(s.waCheckInterval)
            }, 100) : s.audioWrapper.onended = s.controlPlay)
        })
    } else
        this.audioWrapper.src = i,
        this.audioWrapper.type = this.mp3Support ? "audio/mpeg" : "audio/ogg",
        this.audioWrapper.loop = !1,
        this.audioWrapper.preload = "auto",
        this.audioWrapper.load(),
        this.delayPlay ? (this.audioWrapper.addEventListener("canplay", this.readyToPlay),
        this.audioWrapper.addEventListener("canplaythrough", this.readyToPlay)) : this.audioWrapper.play(),
        this.audioWrapper.addEventListener("ended", this.controlPlay, !1);
    this.busy = !0,
    this.startPlayTime = (new Date).getTime()
}
,
AudioPlayer.prototype.loadSound = function(e, i) {
    if (AudioMixer.buffer[e])
        i && i(AudioMixer.buffer[e]);
    else {
        var t = null;
        (t = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")).open("GET", e, !0),
        t.responseType = "arraybuffer",
        t.onreadystatechange = function() {
            4 != this.readyState || 200 != this.status && 0 != this.status || AudioMixer.waContext.decodeAudioData(this.response, function(t) {
                AudioMixer.buffer[e] = t,
                i && i(t)
            })
        }
        ,
        t.send()
    }
}
,
AudioPlayer.prototype.readyToPlay = function(t) {
    t.currentTarget.alreadyLoaded || (t.currentTarget.alreadyLoaded = !0,
    t.currentTarget.play())
}
,
AudioPlayer.prototype.stop = function() {
    if (this.busy && (this.busy = !1,
    this.audioWrapper)) {
        try {
            AudioMixer.isWebAudioSupport() ? this.audioWrapper.noteOff ? this.audioWrapper.noteOff(0) : this.audioWrapper.stop(0) : (this.audioWrapper.currentTime = 0,
            this.audioWrapper.pause(),
            this.audioWrapper.removeEventListener("canplay", this.readyToPlay),
            this.audioWrapper.removeEventListener("canplaythrough", this.readyToPlay))
        } catch (t) {}
        this.audioWrapper = null
    }
}
,
AudioPlayer.prototype.pause = function() {
    AudioMixer.isWebAudioSupport() ? this.audioWrapper && this.audioWrapper.disconnect() : this.audioWrapper && this.audioWrapper.pause()
}
,
AudioPlayer.prototype.resume = function() {
    if (AudioMixer.isWebAudioSupport()) {
        if (this.audioWrapper)
            try {
                this.audioWrapper.connect(this.gainNode)
            } catch (t) {}
    } else
        this.audioWrapper && this.audioWrapper.play()
}
,
AudioPlayer.prototype.controlPlay = function() {
    this.audioWrapper && (this.audioWrapper.doLoop ? AudioMixer.isWebAudioSupport() || (Utils.isFirefox() ? this.play(this.audioWrapper.fileName, !0) : (this.audioWrapper.currentTime = 0,
    this.audioWrapper.play())) : (this.busy = !1,
    "function" == typeof this.onend && this.onend(),
    this.waCheckInterval && clearInterval(this.waCheckInterval)))
}
,
AudioPlayer.prototype.getPosition = function() {
    if (AudioMixer.isWebAudioSupport()) {
        if (!this.startPlayTime)
            return 0;
        var t = this.getDuration();
        if (!t)
            return 0;
        var e = ((new Date).getTime() - this.startPlayTime) / 1e3;
        return e <= t ? e : this.audioWrapper.doLoop ? e - Math.floor(e / t) * t : t
    }
    return this.audioWrapper.currentTime ? this.audioWrapper.currentTime : 0
}
,
AudioPlayer.prototype.getDuration = function() {
    return AudioMixer.isWebAudioSupport() ? this.audioWrapper.buffer ? this.audioWrapper.buffer.duration : 0 : this.audioWrapper.duration ? this.audioWrapper.duration : 0
}
,
AudioPlayer.prototype.setVolume = function(t) {
    this.volume = t,
    this.volume < 0 && (this.volume = 0),
    1 < this.volume && (this.volume = 1),
    AudioMixer.isWebAudioSupport() ? this.gainNode.gain.value = this.volume : this.audioWrapper.volume = this.volume
}
,
AudioPlayer.prototype.getVolume = function() {
    return this.volume
}
,
AudioMixer.prototype.init = function(t, e) {
    if (AudioMixer.isWebAudioSupport()) {
        AudioMixer.waContext = new window.AudioContext;
        var i = AudioMixer.waContext.createBuffer(1, 1, 22050)
          , s = AudioMixer.waContext.createBufferSource();
        s.buffer = i,
        s.connect(AudioMixer.waContext.destination),
        s.noteOn ? s.noteOn(0) : s.start(0)
    }
    AudioMixer.isWebAudioSupport() || -1 == navigator.userAgent.toLowerCase().indexOf("mac") || (this.singleChannelMode = !0,
    e = 1),
    this.path = t,
    this.channels = [];
    for (var a = 0; a < e; a++)
        this.channels[a] = new AudioPlayer,
        this.channels[a].init(t);
    Utils.addEventListener("hidewindow", Utils.proxy(this.pauseOnHide, this)),
    Utils.addEventListener("showwindow", Utils.proxy(this.resumeOnShow, this))
}
,
AudioMixer.prototype.pauseOnHide = function() {
    if (AudioMixer.AUTO_PAUSE_ON_TAB_HIDE)
        for (var t = 0; t < this.channels.length; t++)
            this.channels[t].pause()
}
,
AudioMixer.prototype.resumeOnShow = function() {
    if (AudioMixer.AUTO_PAUSE_ON_TAB_HIDE)
        for (var t = 0; t < this.channels.length; t++)
            this.channels[t].resume()
}
,
AudioMixer.prototype.play = function(t, e, i, s) {
    var a = -1;
    return 0 <= (a = "number" == typeof s ? s : this.getFreeChannel(i)) && a < this.channels.length && (this.channels[a].stop(),
    this.channels[a].play(t, e)),
    this.channels[a]
}
,
AudioMixer.prototype.stop = function(t) {
    0 <= t && t < this.channels.length && this.channels[t].stop()
}
,
AudioMixer.prototype.getFreeChannel = function(t) {
    for (var e = -1, i = [], s = -1, a = -1, o = 0, n = 0; n < this.channels.length; n++)
        this.channels[n].locked || (this.channels[n].busy ? (o = (new Date).getTime(),
        a < (o -= this.channels[n].startPlayTime) && (a = o,
        s = n)) : i.push(n));
    return 0 == i.length ? !t && 0 <= s && (e = s) : e = i[0],
    e
}
,
AudioMixer.isWebAudioSupport = function() {
    return Boolean(window.AudioContext)
}
,
window.AudioContext = window.AudioContext || window.webkitAudioContext,
AudioMixer.buffer = {},
AudioMixer.waContext = null,
AudioMixer.AUTO_PAUSE_ON_TAB_HIDE = !0;
var ParticleSystem = {
    Utils: {}
};
ParticleSystem.Utils.isIE = -1 < navigator.userAgent.indexOf("MSIE"),
ParticleSystem.Utils.toRad = function(t) {
    return Math.PI * t / 180
}
,
ParticleSystem.Utils.isNumber = function(t) {
    return "number" == typeof t
}
,
ParticleSystem.Utils.isInteger = function(t) {
    return t === (0 | t)
}
,
ParticleSystem.Utils.random = function(t, e, i) {
    i = i || !1;
    var s = this.isNumber(e) ? t : 0
      , a = this.isNumber(e) ? e : t
      , o = a - s
      , n = Math.random() * o + s;
    return this.isInteger(s) && this.isInteger(a) && !i ? Math.floor(n) : n
}
,
ParticleSystem.Utils.random11 = function() {
    return this.random(-1, 1, !0)
}
,
ParticleSystem.Utils.extend = function(t, e) {
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i])
}
,
ParticleSystem.Utils.recursiveExtend = function(t, e, i) {
    for (var s in i = i || [],
    e)
        e.hasOwnProperty(s) && (-1 < i.indexOf(s) ? t[s] = e[s] : this.isArray(e[s]) ? t[s] = this.deepClone(e[s]) : "object" == typeof e[s] ? this.recursiveExtend(t[s], e[s], i) : t[s] = e[s])
}
,
ParticleSystem.Utils.clone = function(t) {
    var e = {};
    return this.extend(e, t),
    e
}
,
ParticleSystem.Utils.isArray = function(t) {
    return "[object Array]" === Object.prototype.toString.call(t)
}
,
ParticleSystem.Utils.deepClone = function(t, e) {
    if (e = e || [],
    "object" != typeof t)
        return t;
    if (this.isArray(t)) {
        for (var i = [], s = 0; s < t.length; ++s)
            i.push(this.deepClone(t[s], e));
        return i
    }
    var a = {};
    for (var o in t)
        -1 < e.indexOf(o) ? a[o] = t[o] : a[o] = this.deepClone(t[o], e);
    return a
}
,
ParticleSystem.Utils.colorArrayToString = function(t, e) {
    return "rgba(" + (0 | t[0]) + ", " + (0 | t[1]) + ", " + (0 | t[2]) + ", " + (e || (4 == t.length ? t[3] : 1)) + ")"
}
,
ParticleSystem.Utils.normalize = function(t) {
    var e = Math.sqrt(t.x * t.x + t.y * t.y);
    t.x /= e,
    t.y /= e
}
,
ParticleSystem.Emitter = function(t, e, i) {
    if (i ? this.displayObjects = Utils.isArray(i) ? i : [i] : i = [],
    t && "string" != typeof t)
        this._predefinedSystemName = "";
    else {
        var s = ParticleSystem.PredefinedSystems.getSystem(t);
        this._predefinedSystemName = s.name,
        t = s.system
    }
    this._position = e,
    this._baseSystem = ParticleSystem.Utils.clone(t, ["texture"]),
    this.reconfigure(t)
}
,
ParticleSystem.Emitter.prototype.overlay = function(t) {
    ParticleSystem.Utils.extend(this, t),
    this.restart()
}
,
ParticleSystem.Emitter.prototype.resetTexture = function() {}
,
ParticleSystem.Emitter.prototype.getPathLen = function() {
    for (var t, e, i = 0, s = 0; s < this.path._points.length - 1; s++)
        t = this.path._points[s].x - this.path._points[s + 1].x,
        e = this.path._points[s].y - this.path._points[s + 1].y,
        i += Math.sqrt(t * t + e * e);
    return i
}
,
ParticleSystem.Emitter.prototype.getPoint = function(t) {
    for (var e, i, s = 0, a = 0, o = 0, n = this.path._points[0].x, r = this.path._points[0].y; ; ) {
        if (++o >= this.path._points.length)
            return {
                x: this.path._points[this.path._points.length - 1].x,
                y: this.path._points[this.path._points.length - 1].y
            };
        if (e = n - this.path._points[o].x,
        i = r - this.path._points[o].y,
        t <= a + (s = Math.sqrt(e * e + i * i))) {
            var h = Math.atan2(this.path._points[o].y - r, this.path._points[o].x - n);
            return s = t - a,
            {
                x: n += Math.cos(h) * s,
                y: r += Math.sin(h) * s
            }
        }
        a += s,
        n = this.path._points[o].x,
        r = this.path._points[o].y
    }
}
,
ParticleSystem.Emitter.prototype.reconfigure = function(t) {
    this.delay = 0,
    this._startDelay = 0,
    this._totalParticles = 0,
    this.emissionRate = 0,
    this.paused = !1,
    this.active = !1,
    this.duration = 0,
    this.emissionDuration = 0,
    this.pos = this.pos || {},
    this.pos.x = 0,
    this.pos.y = 0,
    this.posVar = this.posVar || {},
    this.posVar.x = 0,
    this.posVar.y = 0,
    this.speed = 0,
    this.speedVar = 0,
    this.angle = 0,
    this.angleVar = 0,
    this.life = 1,
    this.lifeVar = 0,
    this.radius = 1,
    this.radiusVar = 0,
    this.texture = null,
    this.textureEnabled = !1,
    this.textureAdditive = !1,
    this.startScale = 1,
    this.startScaleVar = 0,
    this.endScale = 1,
    this.endScaleVar = 0,
    this.startColor = this.startColor || [],
    this.startColor[0] = 0,
    this.startColor[1] = 0,
    this.startColor[2] = 0,
    this.startColor[3] = 1,
    this.startColorVar = this.startColorVar || [],
    this.startColorVar[0] = 0,
    this.startColorVar[1] = 0,
    this.startColorVar[2] = 0,
    this.startColorVar[3] = 0,
    this.endColor = this.endColor || [],
    this.endColor[0] = 0,
    this.endColor[1] = 0,
    this.endColor[2] = 0,
    this.endColor[3] = 1,
    this.endColorVar = this.endColorVar || [],
    this.endColorVar[0] = 0,
    this.endColorVar[1] = 0,
    this.endColorVar[2] = 0,
    this.endColorVar[3] = 0,
    this.gravity = this.gravity || {},
    this.gravity.x = 0,
    this.gravity.y = 0,
    this.radialAccel = 0,
    this.radialAccelVar = 0,
    this.tangentialAccel = 0,
    this.tangentialAccelVar = 0,
    this.startRotation = 0,
    this.startRotationVar = 0,
    this.rotationCoef = 0,
    this.rotationCoefVar = 0,
    this.rotationSpeed = 0,
    this.rotationSpeedVar = 0,
    this.path = {
        points: []
    },
    ParticleSystem.Utils.recursiveExtend(this, t, ["texture"]),
    this.duration || (this.duration = 1 / 0),
    this.emissionDuration || (this.emissionDuration = 1 / 0),
    this._startDelay = this.delay,
    this.pos = this._position,
    this.path && (this.path.isBezier ? this.path._points = Utils.getBezierCurve(this.path.points) : this.path._points = this.path.points,
    this.path._ease = this.path.ease,
    this._pathLen = this.getPathLen(),
    this._pathPassedTime = 0,
    this._pathStartDelay = this.path.delay),
    this.restart()
}
,
ParticleSystem.Emitter.prototype.restart = function() {
    this._particlePool = [];
    for (var t = 0; t < this.totalParticles; ++t)
        this._particlePool.push(new ParticleSystem.Particle);
    this._particleCount = 0,
    this._particleIndex = 0,
    this._elapsed = 0,
    this._emitCounter = 0
}
,
ParticleSystem.Emitter.prototype.reset = function() {
    this.reconfigure(this._baseSystem)
}
,
ParticleSystem.Emitter.prototype._isFull = function() {
    return this._particleCount === this.totalParticles
}
,
ParticleSystem.Emitter.prototype._getDisplayObject = function() {
    return this.displayObjects ? 0 == this.displayObjects.length ? null : this.displayObjects[Math.floor(Math.random() * this.displayObjects.length)] : null
}
,
ParticleSystem.Emitter.prototype._addParticle = function() {
    if (this._isFull())
        return !1;
    var t = this._particlePool[this._particleCount];
    return this._initParticle(t),
    ++this._particleCount,
    !0
}
,
ParticleSystem.Emitter.prototype.setStatic = function(t) {
    t = !!t;
    for (var e = 0; e < this._particlePool.length; e++)
        this._particlePool[e].displayObject && this._particlePool[e].displayObject.setStatic(t)
}
,
ParticleSystem.Emitter.prototype._initParticle = function(t) {
    t.texture = this.texture,
    t.textureEnabled = this.textureEnabled,
    t.textureAdditive = this.textureAdditive;
    var e = this._getDisplayObject();
    e && ((e = e.clone()).stage = null,
    t.displayObject = e);
    var i = {
        x: this.posVar.x * ParticleSystem.Utils.random11(),
        y: this.posVar.y * ParticleSystem.Utils.random11()
    };
    this.posVarTransformFn && (i = this.posVarTransformFn(i, ParticleSystem.Utils)),
    t.pos.x = this.pos.x + i.x,
    t.pos.y = this.pos.y + i.y;
    var s = this.angle + this.angleVar * ParticleSystem.Utils.random11()
      , a = this.speed + this.speedVar * ParticleSystem.Utils.random11();
    t.setVelocity(s, a),
    t.radialAccel = this.radialAccel + this.radialAccelVar * ParticleSystem.Utils.random11() || 0,
    t.tangentialAccel = this.tangentialAccel + this.tangentialAccelVar * ParticleSystem.Utils.random11() || 0;
    var o = this.life + this.lifeVar * ParticleSystem.Utils.random11() || 0;
    t.life = Math.max(0, o),
    t.scale = ParticleSystem.Utils.isNumber(this.startScale) ? this.startScale : 1,
    t.scale += ParticleSystem.Utils.isNumber(this.startScaleVar) ? this.startScaleVar * ParticleSystem.Utils.random11() : 0;
    var n = ParticleSystem.Utils.isNumber(this.endScale) ? this.endScale : 1;
    if (n += ParticleSystem.Utils.isNumber(this.endScaleVar) ? this.endScaleVar * ParticleSystem.Utils.random11() : 0,
    t.deltaScale = n - this.startScale,
    t.deltaScale /= t.life,
    t.radius = ParticleSystem.Utils.isNumber(this.radius) ? this.radius + (this.radiusVar || 0) * ParticleSystem.Utils.random11() : 0,
    t.rotation = ParticleSystem.Utils.isNumber(this.startRotation) ? this.startRotation : 0,
    t.rotation += ParticleSystem.Utils.isNumber(this.startRotationVar) ? this.startRotationVar * ParticleSystem.Utils.random11() : 0,
    t.rotationSpeed = ParticleSystem.Utils.isNumber(this.rotationSpeed) ? this.rotationSpeed : 0,
    t.rotationSpeed += ParticleSystem.Utils.isNumber(this.rotationSpeedVar) ? this.rotationSpeedVar * ParticleSystem.Utils.random11() : 0,
    t.rotationCoef = ParticleSystem.Utils.isNumber(this.rotationCoef) ? this.rotationCoef : 0,
    t.rotationCoef += ParticleSystem.Utils.isNumber(this.rotationCoefVar) ? this.rotationCoefVar * ParticleSystem.Utils.random11() : 0,
    this.startColor) {
        var r = [this.startColor[0] + this.startColorVar[0] * ParticleSystem.Utils.random11(), this.startColor[1] + this.startColorVar[1] * ParticleSystem.Utils.random11(), this.startColor[2] + this.startColorVar[2] * ParticleSystem.Utils.random11(), this.startColor[3] + this.startColorVar[3] * ParticleSystem.Utils.random11()]
          , h = r;
        this.endColor && (h = [this.endColor[0] + this.endColorVar[0] * ParticleSystem.Utils.random11(), this.endColor[1] + this.endColorVar[1] * ParticleSystem.Utils.random11(), this.endColor[2] + this.endColorVar[2] * ParticleSystem.Utils.random11(), this.endColor[3] + this.endColorVar[3] * ParticleSystem.Utils.random11()]),
        t.color = r,
        t.deltaColor = [(h[0] - r[0]) / t.life, (h[1] - r[1]) / t.life, (h[2] - r[2]) / t.life, (h[3] - r[3]) / t.life]
    }
    t.displayObject && t.displayObject.dispatchEvent && t.displayObject.dispatchEvent("particleInit", {
        type: "particleInit",
        target: t.displayObject,
        particle: t
    })
}
,
ParticleSystem.Emitter.prototype._updateParticle = function(t, e, i) {
    if (0 < t.life) {
        t.forces = t.forces || {
            x: 0,
            y: 0
        },
        t.forces.x = 0,
        t.forces.y = 0,
        t.radial = t.radial || {
            x: 0,
            y: 0
        },
        t.radial.x = 0,
        t.radial.y = 0,
        t.pos.x === this.pos.x && t.pos.y === this.pos.y || !t.radialAccel && !t.tangentialAccel || (t.radial.x = t.pos.x - this.pos.x,
        t.radial.y = t.pos.y - this.pos.y,
        ParticleSystem.Utils.normalize(t.radial)),
        t.tangential = t.tangential || {
            x: 0,
            y: 0
        },
        t.tangential.x = t.radial.x,
        t.tangential.y = t.radial.y,
        t.radial.x *= t.radialAccel,
        t.radial.y *= t.radialAccel;
        var s = t.tangential.x;
        if (t.tangential.x = -t.tangential.y,
        t.tangential.y = s,
        t.tangential.x *= t.tangentialAccel,
        t.tangential.y *= t.tangentialAccel,
        t.forces.x = t.radial.x + t.tangential.x + this.gravity.x,
        t.forces.y = t.radial.y + t.tangential.y + this.gravity.y,
        t.forces.x *= e,
        t.forces.y *= e,
        t.vel.x += t.forces.x,
        t.vel.y += t.forces.y,
        t.pos.x += t.vel.x * e,
        t.pos.y += t.vel.y * e,
        t.life -= e,
        t.scale += t.deltaScale * e,
        t.rotationSpeed += t.rotationCoef * e,
        t.rotation += t.rotationSpeed,
        t.color && (t.color[0] += t.deltaColor[0] * e,
        t.color[1] += t.deltaColor[1] * e,
        t.color[2] += t.deltaColor[2] * e,
        t.color[3] += t.deltaColor[3] * e),
        t.displayObject && t.displayObject.dispatchEvent) {
            var a = 0 < t.life ? "particleUpdate" : "particleDestroy";
            t.displayObject.dispatchEvent(a, {
                type: a,
                target: t.displayObject,
                particle: t,
                delta: e
            })
        }
        ++this._particleIndex
    } else {
        var o = this._particlePool[i];
        this._particlePool[i] = this._particlePool[this._particleCount - 1],
        this._particlePool[this._particleCount - 1] = o,
        --this._particleCount
    }
}
,
ParticleSystem.Emitter.prototype.stop = function() {
    this.paused = !0
}
,
ParticleSystem.Emitter.prototype.play = function() {
    this.paused = !1
}
,
ParticleSystem.Emitter.prototype.clear = function() {
    for (var t = 0; t < this._particlePool.length; t++)
        this._particlePool[t].displayObject && (this._particlePool[t].displayObject.destroy = !0);
    this._particlePool = [],
    this._particleCount = 0,
    this._particleIndex = 0,
    this._elapsed = 0,
    this._emitCounter = 0
}
,
ParticleSystem.Emitter.prototype.update = function(t) {
    if (!this.paused && (0 < this._startDelay && (this._startDelay -= t),
    !(0 < this._startDelay) && (t /= 1e3,
    this._elapsed += t,
    this.active = this._elapsed < this.duration,
    this._elapsed >= this.emissionDuration && (this.emissionRate = 0),
    this.active))) {
        if (this.path && (0 < this._pathStartDelay && (this._pathStartDelay -= 1e3 * t),
        this._pathStartDelay <= 0)) {
            if (this._pathPassedTime += 1e3 * t,
            this._pathPassedTime > this.path.duration && (this.path.loop ? this._pathPassedTime -= Math.floor(this._pathPassedTime / this.path.duration) * this.path.duration : this._pathPassedTime = this.path.duration),
            "string" == typeof this.path._ease)
                if ("null" == this.path._ease)
                    this.path._ease = null;
                else {
                    for (var e = this.path._ease.split("."), i = "Easing" == e[0] ? window : Easing; e.length; )
                        if (!(i = i[e.shift()])) {
                            i = null;
                            break
                        }
                    this.path._ease = i
                }
            var s = (this.path._ease ? this.path._ease : Easing.linear.easeIn)(this._pathPassedTime, 0, this._pathLen, this.path.duration)
              , a = this.getPoint(s);
            this.pos = {
                x: a.x,
                y: a.y
            }
        }
        if (this.emissionRate) {
            var o = 1 / this.emissionRate;
            for (this._emitCounter += t; !this._isFull() && this._emitCounter > o; )
                this._addParticle(),
                this._emitCounter -= o
        }
        for (this._particleIndex = 0; this._particleIndex < this._particleCount; ) {
            a = this._particlePool[this._particleIndex];
            this._updateParticle(a, t, this._particleIndex)
        }
    }
}
,
Object.defineProperty(ParticleSystem.Emitter.prototype, "particles", {
    get: function() {
        return this._particlePool
    }
}),
Object.defineProperty(ParticleSystem.Emitter.prototype, "totalParticles", {
    get: function() {
        return this._totalParticles
    },
    set: function(t) {
        (t |= 0) !== this._totalParticles && (this._totalParticles = t,
        this.restart())
    }
}),
Object.defineProperty(ParticleSystem.Emitter.prototype, "transformFn", {
    get: function() {
        return this._transformFnSrc || ""
    },
    set: function(t) {
        this._transformFnSrc = t;
        try {
            this.posVarTransformFn = new Function("value","util",t)
        } catch (t) {
            this.posVarTransformFn = null
        }
    }
}),
Object.defineProperty(ParticleSystem.Emitter.prototype, "predefinedSystem", {
    get: function() {
        return this._predefinedSystemName
    },
    set: function(t) {
        this._predefinedSystemName !== t && (this._predefinedSystemName = t,
        this._baseSystem = ParticleSystem.PredefinedSystems.getSystem(t).system,
        this.reset())
    }
}),
Object.defineProperty(ParticleSystem.Emitter.prototype, "textureFile", {
    get: function() {
        return this._file && this._file.name || ""
    },
    set: function(t) {
        try {
            TextureLoader.load(this, "texture", t),
            this._file = t
        } catch (t) {}
    }
}),
ParticleSystem.Particle = function() {
    this.pos = {
        x: 0,
        y: 0
    },
    this.setVelocity(0, 0),
    this.life = 0,
    this.displayObject = null
}
,
ParticleSystem.Particle.prototype.setVelocity = function(t, e) {
    this.vel = {
        x: Math.cos(t) * e,
        y: -Math.sin(t) * e
    }
}
,
ParticleSystem.PredefinedSystems = {},
ParticleSystem.PredefinedSystems.posFuncs = {
    center: function(t) {
        return {
            x: t.width / 2 | 0,
            y: t.height / 2 | 0
        }
    },
    centerBottom: function(t) {
        return {
            x: t.width / 2 | 0,
            y: 2 * t.height / 3 | 0
        }
    },
    centerOffBottom: function(t) {
        return {
            x: t.width / 2 | 0,
            y: t.height + 20
        }
    },
    centerAboveTop: function(t) {
        return {
            x: t.width / 2 | 0,
            y: 0
        }
    },
    bottomLeft: function(t) {
        return {
            x: 0,
            y: t.height + 5
        }
    }
},
ParticleSystem.PredefinedSystems.getSystem = function(t) {
    for (var e = this.systems[0], i = 0; i < this.systems.length; ++i) {
        var s = this.systems[i];
        if (s.name === t) {
            e = s;
            break
        }
    }
    return ParticleSystem.Utils.deepClone(e, ["texture"])
}
,
ParticleSystem.PredefinedSystems.positionSystems = function(t) {
    for (var e = 0; e < this.systems.length; ++e) {
        var i = this.systems[e].system.pos;
        this.systems[e].system.pos = ParticleSystem.PredefinedSystems.posFuncs[i](t)
    }
}
,
ParticleSystem.PredefinedSystems.setTexture = function(t) {
    for (var e = 0; e < this.systems.length; ++e)
        this.systems[e].system.texture = t
}
,
ParticleSystem.PredefinedSystems.deleteSystem = function(t) {
    for (var e = 0; e < this.systems.length; ++e)
        if (this.systems[e].name === t)
            return void this.systems.splice(e, 1)
}
,
ParticleSystem.PredefinedSystems.systems = [{
    name: "meteor",
    system: {
        totalParticles: 30,
        emissionRate: 75,
        pos: "center",
        gravity: {
            x: -200,
            y: -200
        },
        angle: Math.PI / 2,
        angleVar: 2 * Math.PI,
        speed: 15,
        speedVar: 5,
        life: 2,
        lifeVar: 1,
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        textureEnabled: !0,
        textureAdditive: !0,
        radius: 12,
        radiusVar: 2,
        startScale: 1,
        endScale: 1,
        startColor: [51, 102, 178.5, 1],
        startColorVar: [0, 0, 51, .1],
        endColor: [0, 0, 0, 1],
        active: !0,
        duration: 1 / 0
    }
}, {
    name: "fireworks",
    system: {
        totalParticles: 50,
        emissionRate: 1500 / 3.5,
        pos: "centerBottom",
        angle: Math.PI / 2,
        angleVar: Utils.grad2radian(20),
        gravity: {
            x: 0,
            y: -90
        },
        speed: 180,
        speedVar: 50,
        life: 3.5,
        lifeVar: 1,
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        radius: 8,
        radiusVar: 2,
        startScale: 1,
        endScale: 1,
        startColor: [127.5, 127.5, 127.5, 1],
        startColorVar: [127.5, 127.5, 127.5, 0],
        endColor: [25.5, 25.5, 25.5, .2],
        endColorVar: [25.5, 25.5, 25.5, .2],
        active: !0,
        duration: 1 / 0
    }
}, {
    name: "fire",
    system: {
        totalParticles: 250,
        emissionRate: 250 / 7,
        pos: "centerBottom",
        posVar: {
            x: 40,
            y: 20
        },
        angle: Math.PI / 2,
        angleVar: Utils.grad2radian(10),
        speed: 60,
        speedVar: 20,
        life: 7,
        lifeVar: 4,
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        textureEnabled: !0,
        textureAdditive: !0,
        radius: 10,
        radiusVar: 1,
        startScale: 1,
        endScale: 1,
        startColor: [193.8, 63.75, 30.6, 1],
        endColor: [0, 0, 0, 0],
        active: !0,
        duration: 1 / 0
    }
}, {
    name: "galaxy",
    system: {
        totalParticles: 50,
        emissionRate: 50,
        pos: "center",
        angle: Math.PI / 2,
        angleVar: 2 * Math.PI,
        speed: 60,
        speedVar: 10,
        life: 4,
        lifeVar: 1,
        radialAccel: -80,
        radialAccelVar: 0,
        tangentialAccel: 80,
        tangentialAccelVar: 0,
        textureEnabled: !0,
        textureAdditive: !0,
        radius: 10,
        radiusVar: 2,
        startScale: 1,
        endScale: 1,
        startRotation: 0,
        startRotationVar: 2 * Math.PI,
        rotationSpeed: .1,
        rotationSpeedVar: .1,
        rotationCoef: 1.005,
        rotationCoefVar: .005,
        startColor: [30.6, 63.75, 193.8, 1],
        endColor: [0, 0, 0, .3],
        active: !0,
        duration: 1 / 0
    }
}, {
    name: "snow",
    system: {
        totalParticles: 50,
        emissionRate: 10,
        pos: "centerAboveTop",
        posVar: {
            x: 175,
            y: 0
        },
        gravity: {
            x: 0,
            y: 8
        },
        angle: -Math.PI / 2,
        angleVar: Utils.grad2radian(10),
        speed: 9,
        speedVar: 1,
        life: 45,
        lifeVar: 15,
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        textureEnabled: !1,
        textureAdditive: !1,
        radius: 3,
        radiusVar: 2,
        startScale: 1,
        endScale: .3,
        startColor: [255, 255, 255, 1],
        endColor: [255, 255, 255, 0],
        active: !0,
        duration: 1 / 0
    }
}, {
    name: "bubbles",
    system: {
        totalParticles: 50,
        emissionRate: 200,
        active: !0,
        duration: 1 / 0,
        pos: "centerOffBottom",
        posVar: {
            x: 150,
            y: 0
        },
        angle: Math.PI / 2,
        angleVar: Utils.grad2radian(20),
        life: 3.5,
        lifeVar: 1,
        radius: 8,
        radiusVar: 2,
        textureEnabled: !1,
        textureAdditive: !0,
        startScale: 1,
        startScaleVar: 0,
        endScale: 1,
        endScaleVar: 0,
        startColor: [198.9, 198.9, 255, 1],
        startColorVar: [0, 0, 38, .1],
        endColor: [25.5, 25.5, 25.5, .2],
        endColorVar: [25.5, 25.5, 25.5, .2],
        gravity: {
            x: 0,
            y: -90
        },
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        speed: 180,
        speedVar: 50
    }
}, {
    name: "watergeyser",
    system: {
        totalParticles: 50,
        emissionRate: 100,
        active: !0,
        duration: 1 / 0,
        pos: "centerBottom",
        posVar: {
            x: 0,
            y: 0
        },
        angle: Math.PI / 2,
        angleVar: Utils.grad2radian(10),
        life: 2.5,
        lifeVar: 1,
        radius: 5,
        radiusVar: 3,
        textureEnabled: !1,
        textureAdditive: !1,
        startScale: 1,
        startScaleVar: 0,
        endScale: 1,
        endScaleVar: 0,
        startColor: [19.89, 59.93, 255, 1],
        startColorVar: [0, 0, 48, .3],
        endColor: [198.9, 198.9, 255, 0],
        endColorVar: [0, 0, 0, 0],
        gravity: {
            x: 0,
            y: 150
        },
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        speed: 180,
        speedVar: 50
    }
}, {
    name: "ribbon",
    system: {
        totalParticles: 200,
        emissionRate: 40,
        active: !0,
        duration: 1 / 0,
        pos: "bottomLeft",
        posVar: {
            x: 30,
            y: 0
        },
        angle: Utils.grad2radian(55),
        angleVar: 0,
        life: 2.5,
        lifeVar: 0,
        radius: 10,
        radiusVar: 5,
        textureEnabled: !1,
        textureAdditive: !1,
        startScale: 1,
        startScaleVar: 0,
        endScale: 1,
        endScaleVar: 0,
        startColor: [255, 0, 0, 1],
        startColorVar: [0, 0, 0, 0],
        endColor: [0, 0, 255, 1],
        endColorVar: [0, 0, 0, 0],
        gravity: {
            x: 0,
            y: -45
        },
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 60,
        tangentialAccelVar: 0,
        speed: 180,
        speedVar: 50
    }
}, {
    name: "ringoffire",
    system: {
        totalParticles: 400,
        emissionRate: 180,
        active: !0,
        duration: 1 / 0,
        pos: "center",
        posVar: {
            x: 180,
            y: 20
        },
        angle: 90,
        angleVar: 10,
        life: 1,
        lifeVar: 1,
        radius: 10,
        radiusVar: 1,
        textureEnabled: !0,
        textureAdditive: !0,
        startScale: 1,
        startScaleVar: 0,
        endScale: 1,
        endScaleVar: 0,
        startColor: [193.8, 63.75, 30.6, 1],
        endColor: [0, 0, 0, 0],
        gravity: {
            x: 0,
            y: 0
        },
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        speed: 60,
        speedVar: 20
    }
}],
ParticleSystem.Renderer = {},
ParticleSystem.Renderer.render = function(t, e) {
    for (var i = 0; i < e.length; ++i) {
        var s = e[i];
        0 < s.life && (s.color || s.displayObject) ? s.displayObject && (s.displayObject.stage || t.addChild(s.displayObject),
        s.displayObject.setPosition(s.pos.x, s.pos.y),
        s.displayObject.scaleX = s.displayObject.scaleY = s.scale,
        s.displayObject.rotation = s.rotation,
        s.displayObject instanceof Graphics && (s.displayObject.color = ParticleSystem.Utils.colorArrayToString(s.color, 1),
        s.displayObject.fillColor = s.displayObject.color),
        s.displayObject.opacity = s.color[3]) : s.displayObject && (s.displayObject.destroy = !0)
    }
}
;
var DataCache = {
    cache: {},
    load: function(e, i, t, s, a) {
        DataCache.cache[e] ? i && i(DataCache.cache[e]) : (t || (t = "json"),
        s || (s = {}),
        a || (a = "get"),
        Utils.ajax(e, a, s, t, function(t) {
            DataCache.cache[e] = t,
            i && i(t)
        }))
    },
    clear: function(t) {
        t ? DataCache.cache[t] = null : DataCache.cache = {}
    },
    batch: function(t, i) {
        for (var e, s = t.length, a = 0, o = 0; o < s; o++)
            e = t[o],
            DataCache.load(e.url, function(e) {
                return function(t) {
                    e && e(t),
                    s <= ++a && i && i()
                }
            }(e.callback), e.dataType, e.params, e.method)
    }
}
  , LinksProcessor = {};
function Path() {
    this.m_id = -1,
    this.m_base_index = 0,
    this.m_base = [],
    this.m_path = []
}
LinksProcessor.get = function(t) {
    var e = t.split(".")
      , i = e[e.length - 1];
    return "xml" == i && (i = "json"),
    "wav" == i && (i = "mp3"),
    e[e.length - 1] = i,
    t = e.join("."),
    "json" == i && (t = "data/" + t),
    "mp3" != i && "ogg" != i || (t = "sounds/" + t),
    "jpg" != i && "jpeg" != i && "png" != i || (t = "images/" + Utils.globalScale + "/" + t),
    t
}
,
Path.prototype.clear = function() {
    this.m_base = [],
    this.m_path = []
}
,
Path.prototype.addPoint = function(t) {
    this.m_base.push(t)
}
,
Path.prototype.insertPoint = function(t) {
    for (var e = 999999999999, i = -1, s = 0; s < this.m_base.length; s++) {
        var a = this.m_base[s].x - t.x
          , o = this.m_base[s].y - t.y
          , n = Math.sqrt(a * a + o * o);
        n < e && (e = n,
        i = s)
    }
    return -1 != i ? (this.m_base.splice(i + 1, 0, t),
    i + 1) : (this.addPoint(t),
    this.m_base.length - 1)
}
,
Path.prototype.deleteBasePoint = function(t) {
    t < 0 || t >= this.m_base.length || this.m_base.splice(t, 1)
}
,
Path.prototype.changeBasePointPosition = function(t, e) {
    t < 0 || t >= this.m_base.length || (this.m_base[t] = e)
}
,
Path.prototype.makePath = function() {
    var t = this.m_base.length;
    if (3 <= t) {
        var e = this.m_base[0]
          , i = this.m_base[1]
          , s = {
            x: 2 * e.x - i.x,
            y: 2 * e.y - i.y
        }
          , a = this.m_base[t - 1]
          , o = this.m_base[t - 2]
          , n = {
            x: 2 * a.x - o.x,
            y: 2 * a.y - o.y
        };
        this.m_base.splice(0, 0, s),
        this.m_base.push(n)
    }
    if (t = this.m_base.length,
    this.m_path = [],
    4 <= t) {
        for (var r = 0; r < t - 3; r++)
            for (var h = 0; h <= 1; h += .05) {
                var d = this.bSpline(r, h)
                  , l = this.m_path.length;
                (0 == l || .5 <= Math.abs(this.m_path[l - 1].x - d.x) || .5 <= Math.abs(this.m_path[l - 1].y - d.y)) && this.m_path.push(d)
            }
        return !0
    }
    return console.log("** Path should contain 4 or more base points!"),
    !0
}
,
Path.prototype.makePathWithoutAddingTwoBorderBasePoints = function() {
    var t = this.m_base;
    this.m_path = [];
    var e = this.makePath();
    return this.m_base = t,
    e
}
,
Path.prototype.getLength = function() {
    return this.m_path.length
}
,
Path.prototype.getBaseLength = function() {
    return this.m_base.length
}
,
Path.PATH_SMOOTH = !1,
Path.prototype.getPoint = function(t) {
    var e = Math.floor(t);
    if (e < this.getLength()) {
        var i;
        if (Path.PATH_SMOOTH) {
            var s = t - Math.floor(t)
              , a = e + 1;
            a >= this.m_path.length && (a = e);
            var o = this.m_path[e];
            i = o + (this.m_path[a] - o) * s
        } else
            i = m_path[e];
        return i
    }
    return !1
}
,
Path.prototype.bSpline = function(t, e) {
    var i = {}
      , s = 1 - e
      , a = e * e
      , o = a * e
      , n = s * s * s * this.m_base[t].x
      , r = s * s * s * this.m_base[t].y
      , h = (3 * o - 6 * a + 4) * this.m_base[t + 1].x
      , d = (3 * o - 6 * a + 4) * this.m_base[t + 1].y
      , l = (-3 * o + 3 * a + 3 * e + 1) * this.m_base[t + 2].x
      , f = (-3 * o + 3 * a + 3 * e + 1) * this.m_base[t + 2].y
      , c = o * this.m_base[t + 3].x
      , g = o * this.m_base[t + 3].y;
    return i.x = (n + h + l + c) / 6,
    i.y = (r + d + f + g) / 6,
    i
}
;
var TD = {
    stage: null,
    gameField: null,
    onReady: null,
    gameData: {},
    currentLevel: 0,
    currentWorld: 0,
    currentWorldData: null,
    levelPreloader: null,
    currentWindow: null,
    configs: {},
    ui: {},
    ADDITIONAL_SLOT_PRICE: 500,
    WORLDS_COUNT: 4,
    LEVELS_ON_CHAPTER: 24,
    nowTimestamp: 0,
    init: function(t, e) {
        TD.stage = t,
        DataCache.load("data/game/worlds.json", function(t) {
            TD.configs.worlds = t,
            e && e()
        })
    },
    clear: function() {
        TD.currentWindow = null,
        TD.stage.clear(),
        TD.gameField && (TD.gameField.pause(),
        TD.gameField.destroy = !0,
        TD.gameField = null),
        TD.ui = {},
        TD.stage.refreshBackground()
    },
    getWorldConfig: function(t) {
        for (var e = TD.configs.worlds.worlds.world, i = 0; i < e.length; i++)
            if (TD.getAttr(e[i], "world_number") == t)
                return e[i];
        return null
    },
    startLevel: function(t, i) {
        TD.gameData.levelResults && TD.gameData.levelResults[t] && TD.gameData.levelResults[t][i - 1] ? ExternalAPI.exec("trackGameEvent", "LevelRestart", 24 * t + i) : ExternalAPI.exec("trackGameEvent", "LevelAttempt", 24 * t + i),
        TD.clear(),
        TD.ui.preloader = new LevelPreloader,
        TD.stage.addChild(TD.ui.preloader),
        TD.currentWorld = t,
        TD.currentLevel = i;
        var s, a, e = TD.getWorldConfig(t);
        if (!e)
            throw Error("World " + t + " not found");
        var o = [{
            url: LinksProcessor.get(TD.getAttr(e, "path")),
            callback: function(t) {
                s = t
            }
        }, {
            url: LinksProcessor.get(TD.getAttr(e, "units_path")),
            callback: function(t) {
                a = t
            }
        }, {
            url: "data/game/towers.json",
            callback: function(t) {
                TD.configs.towers = t
            }
        }, {
            url: "data/game/towers_bar.json",
            callback: function(t) {
                TD.configs.towersBar = t
            }
        }, {
            url: "data/game/bullets.json",
            callback: function(t) {
                TD.configs.bullets = t
            }
        }];
        DataCache.batch(o, function() {
            TD.ui.preloader.showProgress(20),
            TD.currentWorldData = s,
            UI.assetsLibrary.addAssets(Utils.clone(GAME_ASSETS)),
            UI.assetsLibrary.load(function() {
                TD.ui.preloader.showProgress(50),
                TD.gameField = new GameField,
                TD.gameField.visible = !0,
                TD.stage.addChild(TD.gameField),
                TD.gameField.setPosition((stage.screenWidth - MIN_LAYOUT_WIDTH) / 2, 0),
                TD.gameField.addEventListener("ready", TD.createUI),
                TD.gameField.init(s.mission[i - 1], a);
                var t = TD.getAttr(s, "sound");
                if (t ? SoundsManager.play(t, !0) : SoundsManager.pauseMusic(),
                "funtomic" != ExternalAPI.type) {
                    var e = ExternalAPI.exec("addLogo", stage.screenWidth / 2 + 50, 20, !0, TD.gameField) || ExternalAPI.exec("addKiz10Logo", stage.screenWidth / 2, 20, TD.gameField) || ExternalAPI.exec("addMiniclipLogo", stage.screenWidth / 2, 20, TD.gameField);
                    "Spilgames" == ExternalAPI.type && e.setRelativePosition(160, 20, "left", "top")
                }
                ExternalAPI.exec("levelStarted")
            }, TD.ui.preloader.showProgress, 20, 50)
        })
    },
    restartLevel: function() {
        TD.startLevel(TD.currentWorld, TD.currentLevel)
    },
    startNextLevel: function() {
        TD.currentWorldData.mission[TD.currentLevel] ? TD.startLevel(TD.currentWorld, TD.currentLevel + 1) : TD.showChapterSelect()
    },
    getTowerButtonConfig: function(t, e, i) {
        if (t < 0)
            return {
                costX: 0,
                costY: 0
            };
        var s = 0
          , a = TD.configs.towersBar.slots;
        for (var o in a) {
            if (s == t)
                return pos = TD.parsePositionString(TD.getAttr(a[o].price, "position")),
                {
                    texture: TD.getAttr(a[o].button.out, "texture"),
                    disabledTexture: TD.getAttr(a[o].button.disabled, "texture"),
                    cost: TowersHierarchy.get(s, 0).getCost(0),
                    experience: i,
                    towerId: s,
                    opened: !0,
                    costX: pos.x,
                    costY: pos.y
                };
            s++
        }
    },
    createUI: function() {
        TD.ui.preloader.destroy = !0,
        TD.gameField.pause(),
        TD.ui.towersBar = new Sprite(null,1,1);
        var t, e, i = TD.configs.towersBar.slots, s = 0;
        for (var a in i)
            (t = new TowerButton({
                towerId: s,
                experience: 0,
                opened: !0,
                stored: !1
            })).addEventListener("mousedown", TD.startSelectTower),
            TD.ui.towersBar.addChild(t),
            t.setPosition(60 * (3 - s), 60),
            s++;
        TD.ui.towersBar.setPosition(270, 260),
        TD.gameField.addChild(TD.ui.towersBar),
        TD.ui.savedTowersBar = new Sprite(null,1,1);
        for (a = 0; a < 4; a++) {
            (t = new TowerButton((e = TD.gameData.savedTowers[a]) ? {
                towerId: e.id,
                experience: e.experience,
                opened: !0,
                stored: !0
            } : {
                towerId: -1,
                experience: 0,
                opened: a < 3 || TD.gameData.additionalSaveSlot,
                stored: !0
            })).setPosition(60 * a, 60),
            t.addEventListener("mousedown", TD.startSelectTower),
            TD.ui.savedTowersBar.addChild(t)
        }
        TD.gameData.savedTowers && TD.gameData.savedTowers.length && Hint.show(Hint.USE_SAVED_HINT),
        TD.ui.savedTowersBar.setPosition(5, 260),
        TD.gameField.addChild(TD.ui.savedTowersBar),
        "funtomic" == ExternalAPI.type ? (TD.ui.lifeView = new UITextNumbers(8,22,""),
        TD.ui.lifeView.textPrefix = "_",
        TD.ui.lifeView.view.charSpacing = 2,
        TD.ui.lifeView.view.scale = .8,
        TD.gameField.addChild(TD.ui.lifeView),
        TD.ui.moveyView = new UITextNumbersSmall(18,50,""),
        TD.ui.moveyView.textPrefix = "@",
        TD.ui.moveyView.view.charSpacing = 2,
        TD.gameField.addChild(TD.ui.moveyView)) : (TD.ui.moveyView = new UITextNumbers(8,22,""),
        TD.ui.moveyView.textPrefix = "@",
        TD.ui.moveyView.view.scale = .8,
        TD.ui.moveyView.view.charSpacing = 2,
        TD.gameField.addChild(TD.ui.moveyView),
        TD.ui.lifeView = new UITextNumbersSmall(18,50,""),
        TD.ui.lifeView.textPrefix = "_",
        TD.ui.lifeView.view.charSpacing = 2,
        TD.gameField.addChild(TD.ui.lifeView)),
        TD.ui.nextWave = new NextWaveView,
        TD.ui.nextWave.setPosition(240, 20),
        TD.gameField.addChild(TD.ui.nextWave),
        TD.gameField.addEventListener("startwave", TD.updateNextWave),
        TD.gameField.addEventListener("wavefinished", TD.clearWaveIcons),
        TD.gameField.addEventListener("towerselect", TD.onTowerSelected),
        TD.gameField.addEventListener("levelcomplete", TD.onLevelComplete),
        TD.gameField.addEventListener("levelloose", TD.onLevelLoose),
        TD.gameField.gameViews.back.addEventListener("click", TD.hideTowerMenu),
        TD.updateNextWave(),
        TD.ui.shopButton = UI.assetsLibrary.getSprite("game/infobar/infobar_4"),
        TD.ui.shopButton.setPosition(372, 22),
        TD.ui.shopButton.onclick = TD.showInGameShop,
        TD.ui.shopButton.addEventListener("click", SoundsManager.click),
        TD.gameField.addChild(TD.ui.shopButton),
        "funtomic" != ExternalAPI.type && ExternalAPI.paymentsEnabled || (TD.ui.shopButton.visible = !1),
        TD.ui.optionsButton = UI.assetsLibrary.getSprite("game/infobar/infobar_3"),
        TD.ui.optionsButton.setPosition(410, 20),
        TD.ui.optionsButton.onclick = TD.showInGameMenu,
        TD.ui.optionsButton.addEventListener("click", SoundsManager.click),
        TD.gameField.addChild(TD.ui.optionsButton),
        TD.ui.speedScaleButton = UI.assetsLibrary.getSprite("game/infobar/infobar_7"),
        TD.ui.speedScaleButton.setPosition(450, 20),
        TD.ui.speedScaleButton.onclick = TD.speedScale,
        TD.ui.speedScaleButton.addEventListener("click", SoundsManager.click),
        TD.gameField.addChild(TD.ui.speedScaleButton),
        TD.ui.playPauseButton = UI.assetsLibrary.getSprite("game/infobar/infobar_6"),
        TD.ui.playPauseButton.setPosition(490, 20),
        TD.ui.playPauseButton.onclick = TD.toggleGame,
        TD.ui.playPauseButton.addEventListener("click", SoundsManager.click),
        TD.gameField.addChild(TD.ui.playPauseButton),
        TD.ui.bonusesPanel = new Sprite(null,1,1),
        TD.ui.bonusesPanel.setPosition(480, 70);
        var o, n = 0;
        for (a in TD.configs.bonuses)
            (o = new BonusButton(a)).setPosition(0, 45 * n),
            TD.ui.bonusesPanel.addChild(o),
            n++;
        TD.gameField.addChild(TD.ui.bonusesPanel),
        Hint.show(Hint.BUILD_HINT)
    },
    isBonusEnabled: function(t) {
        return TD.gameData.bonuses[t].unlocked || TD.gameData.levelResults[0][TD.configs.bonuses[t].unlock_level - 1]
    },
    speedScale: function() {
        var t;
        TD.gameField.ended || (1 == TD.gameField.speedScale ? (t = UI.assetsLibrary.getAsset("game/infobar/infobar_8"),
        TD.gameField.setSpeedScale(4)) : (t = UI.assetsLibrary.getAsset("game/infobar/infobar_7"),
        TD.gameField.setSpeedScale(1)),
        TD.ui.speedScaleButton.bitmap = t.bitmap,
        TD.ui.speedScaleButton.width = t.width,
        TD.ui.speedScaleButton.height = t.height,
        TD.gameField.paused && TD.toggleGame())
    },
    toggleGame: function() {
        TD.gameField && !TD.gameField.ended && (TD.gameField.paused ? TD.resumeGame() : TD.pauseGame())
    },
    pauseGame: function() {
        if (TD.gameField && !TD.gameField.ended) {
            var t = UI.assetsLibrary.getAsset("game/infobar/infobar_6");
            TD.ui.playPauseButton.bitmap = t.bitmap,
            TD.ui.playPauseButton.width = t.width,
            TD.ui.playPauseButton.height = t.height,
            TD.gameField.pause()
        }
    },
    resumeGame: function() {
        if (TD.gameField && !TD.gameField.ended) {
            var t = UI.assetsLibrary.getAsset("game/infobar/infobar_5");
            TD.ui.playPauseButton.bitmap = t.bitmap,
            TD.ui.playPauseButton.width = t.width,
            TD.ui.playPauseButton.height = t.height,
            TD.gameField.resume()
        }
    },
    clearWaveIcons: function() {
        if (TD.ui.waveIcons)
            for (var t = 0; t < TD.ui.waveIcons.length; t++)
                TD.ui.waveIcons[t].destroy = !0;
        TD.ui.waveIcons = []
    },
    updateNextWave: function() {
        TD.ui.nextWave.setWave(TD.gameField.currentWave, TD.gameField.currentWaveId, TD.gameField.wavesCount),
        TD.clearWaveIcons();
        for (var t, e = TD.gameField.getActivePathes(), i = 0; i < e.length; i++)
            t = new WaveIcon(e[i]),
            TD.gameField.addChild(t),
            TD.ui.waveIcons.push(t)
    },
    updateTowersBar: function() {
        var t, e;
        if (TD.ui.towersBar.visible)
            for (var i = 0; i < TD.ui.towersBar.objects.length; i++)
                (t = TD.ui.towersBar.objects[i])instanceof TowerButton && t.setEnabled(t.config.cost <= TD.gameField.money);
        if (TD.ui.savedTowersBar.visible)
            for (i = e = 0; i < TD.ui.savedTowersBar.objects.length; i++)
                (t = TD.ui.savedTowersBar.objects[i])instanceof TowerButton && (t.setEnabled(t.config.cost <= TD.gameField.money || !t.config.opened),
                t.visible = TD.gameField.ended || 0 <= t.config.towerId,
                t.visible && (t.x = e,
                e += 60,
                t.showBack = TD.gameField.ended,
                t.refresh()))
    },
    startSelectTower: function(t) {
        TD.hideTowerMenu();
        var e = t.target;
        if (e.config.opened) {
            if (e.config.towerId < 0)
                return !1;
            var i = t.target.getAbsolutePosition();
            i.x -= TD.gameField.x,
            i.y -= TD.gameField.y;
            var s = e.config;
            e.oldConfig = Utils.clone(e.config);
            var a = new TowerPlace({
                id: s.towerId,
                level: 0,
                experience: s.experience,
                cost: s.cost,
                from: e
            });
            a.setPosition(t.x + i.x, t.y + i.y),
            TD.gameField.addChild(a),
            a.startDrag(0, 0),
            a.onplace = TD.onTowerPlace,
            s.stored && (s.towerId = -1),
            TD.stage.clearObjectTweens(TD.ui.towersBar),
            TD.stage.clearObjectTweens(TD.ui.savedTowersBar),
            TD.ui.towersBar.moveTo(TD.ui.towersBar.x, stageProps.height - 50, 500),
            TD.ui.savedTowersBar.moveTo(TD.ui.savedTowersBar.x, stageProps.height - 50, 500),
            TD.gameField.highLightSpots(!0)
        } else
            TD.buyAdditionalSaveSlot()
    },
    buyAdditionalSaveSlot: function() {
        if (TD.gameData.stars >= TD.ADDITIONAL_SLOT_PRICE) {
            var t = I18.f("Желаете приобрести/nдополнительный слот за %d©?/nУ вас всего %d©.", TD.ADDITIONAL_SLOT_PRICE, TD.gameData.stars);
            Alert.create(t, TD.processBuyAdditionalSaveSlot, !0)
        } else
            Alert.create(I18.f("У вас недостаточное количество ©. Требуется %d©", TD.ADDITIONAL_SLOT_PRICE))
    },
    processBuyAdditionalSaveSlot: function(t) {
        t && (TD.gameData.additionalSaveSlot = !0,
        TD.gameData.stars -= TD.ADDITIONAL_SLOT_PRICE,
        TD.save(),
        TD.ui.savedTowersBar.objects[3].config.opened = !0)
    },
    onTowerPlace: function(t, e) {
        if (TD.stage.clearObjectTweens(TD.ui.towersBar),
        TD.stage.clearObjectTweens(TD.ui.savedTowersBar),
        TD.ui.towersBar.moveTo(TD.ui.towersBar.x, 260, 500),
        TD.ui.savedTowersBar.moveTo(TD.ui.savedTowersBar.x, 260, 500),
        e.forSave)
            t ? (t.config.towerId = e.from.id,
            t.config.experience = e.from.experience,
            TD.gameField.removeTower(e.from)) : e.from.visible = !0;
        else {
            if (TD.gameField.highLightSpots(!1),
            t && TD.gameField.money >= e.cost) {
                var i = TD.gameField.addTower(t, e.id, 0, 0);
                i.experience = e.experience,
                i.updateUpIcon(),
                TD.gameField.spentMoney(e.cost)
            }
            !t && e.from.config.stored && (e.from.config.towerId = e.from.oldConfig.towerId)
        }
        Hint.show(Hint.PLAY_BUTTON)
    },
    getStoreGameId: function() {
        return "playtomax_" + Utils.getGameID() + "_data"
    },
    save: function() {
        "y8" === ExternalAPI.type && ExternalAPI.submitScore(TD.gameData.stars),
        ExternalAPI.exec("getStorageSupport") && ExternalAPI.exec("saveGameData", JSON.stringify(TD.gameData)) || (ExternalAPI.externalStorage ? ExternalAPI.userId ? ExternalAPI.exec("store", "save", {
            data: JSON.stringify(TD.gameData)
        }) : ExternalAPI.exec("saveUserData", TD.gameData) : Utils.setCookie(TD.getStoreGameId(), JSON.stringify(TD.gameData)))
    },
    getDefaultGameData: function(t) {
        return {
            complexity: t || 0,
            stars: 0,
            savedTowers: [],
            additionalSaveSlot: !1,
            levelResults: [[], [], [], []],
            openedWorlds: [!0],
            upgrades: [[0], [0], [0], [0]],
            achievements: [],
            soundsDisabled: !1,
            musicDisabled: !1,
            comixViewed: !1,
            viewedHints: [],
            bonuses: {
                autorepairs: {
                    unlocked: !1,
                    count: 0
                },
                ressurections: {
                    unlocked: !1,
                    count: 0
                },
                securitystrikes: {
                    unlocked: !1,
                    count: 0
                },
                godhands: {
                    unlocked: !1,
                    count: 0
                }
            },
            language: "en"
        }
    },
    load: function(e) {
        if (!ExternalAPI.exec("getStorageSupport") || !ExternalAPI.exec("loadGameData", function(t) {
            (t = JSON.parse(t)) || (t = TD.getDefaultGameData()),
            TD.loadComplete(t, e)
        }))
            if (ExternalAPI.externalStorage)
                ExternalAPI.userId ? ExternalAPI.exec("load", function(t) {
                    TD.loadComplete(t, e)
                }) : ExternalAPI.exec("loadUserData", function(t) {
                    t || (t = TD.getDefaultGameData()),
                    TD.loadComplete(t, e)
                });
            else {
                var t = Utils.getCookie(TD.getStoreGameId())
                  , i = null;
                t && (i = JSON.parse(t)),
                i || (i = TD.getDefaultGameData()),
                TD.loadComplete(i, e)
            }
    },
    validateGameData: function(t, e) {
        for (var i in t = t ? Utils.clone(t) : {},
        e)
            e.hasOwnProperty(i) && ("object" == typeof e[i] ? Utils.isArray(e[i]) ? Utils.isArray(t[i]) && t[i].length || (t[i] = e[i]) : t[i] = TD.validateGameData(t[i], e[i]) : t[i] || (t[i] = e[i]));
        return t
    },
    refreshGameData: function(t) {
        t.now && (TD.nowTimestamp = t.now),
        TD.gameData = t
    },
    loadComplete: function(t, e) {
        t = TD.validateGameData(t, TD.getDefaultGameData()),
        TD.refreshGameData(t),
        e && e()
    },
    hideTowerMenu: function() {
        TD.ui.towerMenu && !TD.ui.towerMenu.newly && (TD.ui.towerMenu.destroy = !0,
        TD.ui.towerMenu.visible = !1,
        TD.ui.towerMenu = null)
    },
    showTowerMenu: function(t) {
        TD.ui.towerMenu = new TowerMenu(t),
        TD.ui.towerMenu.setPosition(t.x, t.y),
        TD.gameField.addChild(TD.ui.towerMenu)
    },
    onTowerSelected: function(t) {
        TD.hideTowerMenu();
        var e = t.target;
        if (TD.gameField.ended) {
            var i = t.target.getAbsolutePosition();
            i.x -= TD.gameField.x,
            i.y -= TD.gameField.y;
            var s = new TowerPlace({
                id: e.id,
                level: e.level,
                experience: e.experience,
                cost: 0,
                from: e,
                forSave: !0
            });
            s.setPosition(t.x + i.x, t.y + i.y),
            TD.gameField.addChild(s),
            s.startDrag(0, 0),
            s.onplace = TD.onTowerPlace,
            e.visible = !1
        } else
            TD.showTowerMenu(e);
        return !1
    },
    showWin1Banner: function() {
        if (TD.gameField) {
            var t = new LevelBanner("collect_hero_towers_0",I18.f("ПОБЕДА!"),TD.showWin2Banner);
            t.setPosition(256, 192),
            TD.gameField.addChild(t)
        }
    },
    showWin2Banner: function() {
        if (TD.gameField) {
            var t = new LevelBanner("collect_hero_towers_2",I18.f("СОХРАНЕНИЕ/nГЕРОЕВ!"));
            t.setPosition(256, 192),
            TD.gameField.addChild(t),
            TD.gameField.towers[0] && Hint.show(Hint.SAVE_HINT, TD.gameField.towers[0])
        }
    },
    onLevelComplete: function() {
        TD.clearWaveIcons(),
        TD.hideTowerMenu(),
        TD.showWin1Banner(),
        AchievementsManager.event(AchievementsManager.EVENT_LEVEL_COMPLETE);
        var t = new CommonButton("button_medium_square","next");
        t.setPosition(480, 355),
        TD.gameField.addChild(t),
        t.onclick = TD.afterLevelComleted,
        TD.ui.levelCompleteButton = t,
        TD.ui.towersBar.visible = !1
    },
    afterLevelComleted: function() {
        for (var t = TD.ui.savedTowersBar.objects, e = [], i = 0, s = 0, a = 0; a < t.length; a++)
            0 <= t[a].config.towerId && (e[a] = {
                id: t[a].config.towerId,
                experience: t[a].config.experience
            },
            i++),
            t[a].config.opened && s++;
        s <= i || !TD.gameField.towers.length ? TD.processLevelComlete(e) : Alert.create(I18.f("Вы уверены, что не хотите/nсохранить геройские башни?"), function(t) {
            t && TD.processLevelComlete(e)
        }, !0)
    },
    processLevelComlete: function(t) {
        TD.gameData.savedTowers = t || [],
        TD.save(),
        TD.ui.levelCompleteButton.destroy = !0,
        TD.ui.savedTowersBar.visible = !1,
        TD.showLevelWinWindow();
        var e = TD.gameData.levelResults[TD.currentWorld][TD.currentLevel - 1];
        ExternalAPI.exec("submitScores", e.score)
    },
    onLevelLoose: function() {
        TD.clearWaveIcons(),
        TD.hideTowerMenu(),
        TD.ui.savedTowersBar.visible = !1,
        TD.ui.towersBar.visible = !1,
        TD.showLevelLooseWindow()
    },
    updateTowerMenu: function() {
        TD.ui.towerMenu && (TD.ui.towerMenu.tower.health <= 0 || !TD.ui.towerMenu.tower.parent ? TD.hideTowerMenu() : TD.ui.towerMenu.update())
    },
    showInGameShop: function() {
        if (TD.gameField && !TD.gameField.ended) {
            TD.pauseGame(),
            TD.gameField.visible = !1;
            var t = new InGameShop(function() {
                TD.gameField.visible = !0,
                TD.stage.refreshBackground()
            }
            );
            TD.stage.addChild(t),
            t.setRelativePosition(0, 0),
            TD.stage.refreshBackground(),
            ExternalAPI.exec("addLogo", 0, stage.screenHeight / 2 - 25, !0, t),
            ExternalAPI.exec("addKiz10Logo", 0, stage.screenHeight / 2 - 25, t),
            ExternalAPI.exec("addMiniclipLogo", 0, stage.screenHeight / 2 - 25, t)
        }
    },
    refreshCurrentWindow: function(t) {
        t && (t.isEmpty || (TD.gameData = t),
        t.now && (TD.nowTimestamp = t.now)),
        TD.currentWindow && TD.currentWindow.forceRefresh && TD.currentWindow.forceRefresh()
    },
    showMainMenu: function() {
        TD.clear();
        var t = new MainMenu;
        TD.stage.addChild(t),
        t.setRelativePosition(0, 0),
        TD.currentWindow = t,
        ExternalAPI.exec("addLogo", 0, -stage.screenHeight / 2 + 25, !0, t),
        ExternalAPI.exec("addKiz10Logo", 0, -stage.screenHeight / 2 + 25, t),
        ExternalAPI.exec("addMiniclipLogo", 0, -stage.screenHeight / 2 + 25, t)
    },
    showChapterSelect: function() {
        TD.clear();
        var t = new ChapterSelect;
        TD.stage.addChild(t),
        t.setRelativePosition(0, 0),
        TD.currentWindow = t,
        ExternalAPI.exec("addLogo", 0, -stage.screenHeight / 2 + 25, !0, t),
        ExternalAPI.exec("addKiz10Logo", 0, -stage.screenHeight / 2 + 25, t),
        ExternalAPI.exec("addMiniclipLogo", 0, -stage.screenHeight / 2 + 25, t)
    },
    showLevelSelect: function(t) {
        TD.clear();
        var e = new LevelSelect(t);
        TD.stage.addChild(e),
        e.setRelativePosition(0, 0),
        TD.currentWindow = e,
        ExternalAPI.exec("addLogo", 0, -stage.screenHeight / 2 + 25, !0, e),
        ExternalAPI.exec("addKiz10Logo", 0, -stage.screenHeight / 2 + 25, e),
        ExternalAPI.exec("addMiniclipLogo", 0, -stage.screenHeight / 2 + 25, e)
    },
    showLevelSelectInCurrentChapter: function() {
        TD.showLevelSelect(TD.currentWorld)
    },
    showLevelWinWindow: function() {
        var t = new LevelWin;
        TD.stage.addChild(t),
        t.setRelativePosition(0, 0)
    },
    showLevelLooseWindow: function() {
        var t = new LevelLoose;
        TD.stage.addChild(t),
        t.setRelativePosition(0, 0)
    },
    showShop: function(t) {
        TD.gameField && !t ? (TD.pauseGame(),
        TD.gameField.visible = !1) : TD.clear();
        var e = new Shop;
        return e.setPosition(stage.screenWidth / 2, stage.screenHeight / 2),
        TD.currentWindow = e,
        ExternalAPI.exec("addLogo", 0, stage.screenHeight / 2 - 25, !0, e),
        ExternalAPI.exec("addKiz10Logo", 0, stage.screenHeight / 2 - 25, e),
        ExternalAPI.exec("addMiniclipLogo", 0, stage.screenHeight / 2 - 25, e),
        UI.moreAssetsLoader ? (TD.showLockScreen(function() {
            TD.stage.addChild(e)
        }),
        e) : TD.stage.addChild(e)
    },
    showLockScreen: function(t) {
        if (!TD.isScreenLocked) {
            TD.isScreenLocked = !0;
            function e() {
                return !1
            }
            var i = new Sprite(null,stage.screenWidth,stage.screenHeight);
            i.fillColor = "rgba(0,0,0,0.5)",
            i.addChild(UI.assetsLibrary.getSprite("hourglass")),
            i.addEventListener("touchstart", e),
            i.addEventListener("mousedown", e),
            i.addEventListener("click", e),
            i.addEventListener("touchend", e),
            i.addEventListener("mouseup", e),
            i.addEventListener("mousemove", e),
            stage.addChild(i),
            i.setRelativePosition(),
            UI.moreAssetsLoader && (UI.moreAssetsLoader.loadFinish = function() {
                TD.isScreenLocked = !1,
                i.safeRemove(),
                "function" == typeof t && t()
            }
            )
        }
    },
    showAchievements: function() {
        var t = new Achievements(stage.screenWidth / 2,stage.screenHeight / 2);
        return TD.stage.addChild(t),
        t
    },
    showOptions: function() {
        var t = new Options;
        return TD.stage.addChild(t),
        t.setRelativePosition(0, 0),
        t
    },
    showLanguageSelection: function() {
        var t = new LanguageSelection;
        return TD.stage.addChild(t),
        t.setRelativePosition(0, 0),
        t
    },
    showInGameMenu: function() {
        TD.pauseGame();
        var t = new InGameMenu;
        return TD.stage.addChild(t),
        t.setRelativePosition(0, 0),
        t
    },
    showComics: function() {
        TD.clear();
        var t = new Comics;
        TD.stage.addChild(t),
        t.setRelativePosition(0, 0),
        TD.currentWindow = t
    },
    showStarsShop: function(t) {
        var e = new StarsShop;
        TD.stage.addChild(e),
        e.setRelativePosition(0, 0),
        e.closeCallback = t,
        TD.currentWindow = e
    },
    resizeImages: function(t, e, i) {
        var s, a, o = e * Utils.globalScale, n = i * Utils.globalScale;
        for (var r in t)
            a = t[r],
            (s = document.createElement("canvas")).width = o,
            s.height = n,
            s.getContext("2d").drawImage(a, 0, 0, a.width, a.height, 0, 0, o, n),
            t[r] = s;
        return t
    },
    parseRectString: function(t) {
        t || (t = "");
        for (var e = TD.parseNumbersString(t), i = 0; i < 4; i++)
            e[i] || (e[i] = 0);
        var s = {};
        return s.left = Math.round(e[0] * TD.metrics.scale),
        s.top = Math.round(e[1] * TD.metrics.scale),
        s.right = Math.round(e[2] * TD.metrics.scale),
        s.bottom = Math.round(e[3] * TD.metrics.scale),
        s.width = Math.abs(s.right - s.left),
        s.height = Math.abs(s.bottom - s.top),
        s
    },
    parsePositionString: function(t) {
        t || (t = "");
        for (var e = TD.parseNumbersString(t), i = 0; i < 2; i++)
            e[i] || (e[i] = 0);
        var s = {};
        return s.x = Math.round(e[0] * TD.metrics.scale),
        s.y = Math.round(e[1] * TD.metrics.scale),
        s
    },
    getValFromString: function(t, e) {
        var i = TD.parseNumbersString(t);
        return void 0 === i[e] ? i[0] : i[e]
    },
    parseNumbersString: function(t) {
        t || (t = "");
        for (var e = t.split(" "), i = 0; i < e.length; i++)
            e[i] *= 1;
        return e
    },
    getAttr: function(t, e, i) {
        if (t && t["@attributes"]) {
            var s = t["@attributes"][e];
            return i && (s || (s = 0),
            s *= 1),
            s
        }
        return null
    },
    tickBonuses: function(t) {
        for (var e = 0; e < TD.ui.bonusesPanel.objects.length; e++)
            TD.ui.bonusesPanel.objects[e]instanceof BonusButton && TD.ui.bonusesPanel.objects[e].tick(t)
    },
    restoreBonusButtons: function() {
        for (var t = 0; t < TD.ui.bonusesPanel.objects.length; t++)
            TD.ui.bonusesPanel.objects[t]instanceof BonusButton && (TD.ui.bonusesPanel.objects[t].setActive(!1),
            TD.ui.bonusesPanel.objects[t].update())
    },
    updateBonusButtons: function() {
        for (var t = 0; t < TD.ui.bonusesPanel.objects.length; t++)
            TD.ui.bonusesPanel.objects[t]instanceof BonusButton && TD.ui.bonusesPanel.objects[t].update()
    },
    spendBonus: function(t) {
        0 < TD.gameData.bonuses[t].count && (TD.gameData.bonuses[t].count--,
        TD.save())
    },
    useBonus: function(t) {
        0 < TD.gameData.bonuses[t].count && TD.gameField.useBonus(t)
    },
    endBonus: function(t) {
        TD.gameField.endBonus(t)
    },
    tick: function(t) {
        TD.nowTimestamp && (TD.nowTimestamp += t / 1e3),
        TD.gameField && TD.gameField.ready && (TD.gameField.ended || TD.gameField.paused || (TD.gameField.tick(t),
        TD.tickBonuses(t * TD.gameField.speedScale)),
        TD.updateTowerMenu(),
        TD.updateTowersBar(),
        "" == TD.ui.moveyView.text ? TD.ui.moveyView.update(TD.gameField.money) : TD.ui.moveyView.animatedNumericUpdate(TD.gameField.money),
        "" == TD.ui.lifeView.text ? TD.ui.lifeView.update(TD.gameField.life) : TD.ui.lifeView.animatedNumericUpdate(TD.gameField.life))
    },
    postTick: function() {
        TD.gameField && TD.gameField.ended
    },
    normalizeAngle: function(t) {
        for (; t < 0; )
            t += 2 * Math.PI;
        for (; t > 2 * Math.PI; )
            t -= 2 * Math.PI;
        return t
    },
    setHotSpot: function(t, e) {
        var i = TD.parsePositionString(e);
        t.anchor.x = i.x - t.width / 2,
        t.anchor.y = i.y - t.height / 2
    },
    getPerk: function(t) {
        for (var e = TD.configs.perks.perks.perk, i = 0; i < e.length; i++)
            if (TD.getAttr(e[i], "name") == t)
                return e[i];
        return null
    },
    getNow: function() {
        return TD.nowTimestamp ? Math.floor(TD.nowTimestamp) : Math.floor((new Date).getTime() / 1e3)
    },
    getDateStr: function(t, e, i) {
        var s = [];
        return void 0 !== i && s.push(i < 10 ? "0" + i : i),
        void 0 !== e && s.push(e < 10 ? "0" + e : e),
        void 0 !== t && s.push(t < 10 ? "0" + t : t),
        s.join(":")
    },
    getDayRemainStr: function() {
        var t = new Date(1e3 * TD.getNow())
          , e = 3600 * t.getHours() + 60 * t.getMinutes() + t.getSeconds()
          , i = 86400 - e
          , s = Math.floor(i / 3600)
          , a = Math.floor((i - 3600 * s) / 60);
        return e = i - 3600 * s - 60 * a,
        TD.getDateStr(e, a, s)
    },
    showSavingHeroesHint: function() {
        TD.gameData.viewedHints[Hint.SAVE_HINT] = 0,
        Hint.show(Hint.SAVE_HINT, TD.gameField.towers[0])
    },
    metrics: {}
};
TD.metrics.scale = .5;
var Complexity = {};
function GameField() {
    Utils.callSuperConstructor(GameField, this, null, 1, 1),
    this.zIndex = 2,
    this.ready = !1,
    this.paused = !1,
    this.ended = !1,
    this.levelData = null,
    this.speedScale = 1,
    this.mission = null,
    this.unitsConfigs = null,
    this.gameViews = {},
    this.pathes = [],
    this.separator = null,
    this.spots = [],
    this.towers = [],
    this.mobs = [],
    this.bullets = [],
    this.mobsPortals = [],
    this.waves = [],
    this.wavesCount = 0,
    this.currentWave = null,
    this.currentWaveId = 0,
    this.money = 0,
    this.startLife = 0,
    this.life = 0,
    this.isWin = !1,
    this.activeBonuses = {},
    this.stats = {
        killed: 0,
        built: 0,
        spent: 0
    },
    this.onBulletHit = Utils.proxy(this.onBulletHit, this),
    this.onTowerSelect = Utils.proxy(this.onTowerSelect, this),
    this.onSpotClick = Utils.proxy(this.onSpotClick, this),
    this.onMobClick = Utils.proxy(this.onMobClick, this)
}
function ProgressBarView(t) {
    Utils.callSuperConstructor(ProgressBarView, this, null, 18, 3),
    this.fillColor = "#f00",
    this.visible = !1,
    this.maxVal = t,
    this.val = 0,
    this.progressView = new Sprite(null,0,3),
    this.progressView.fillColor = "#fff",
    this.addChild(this.progressView)
}
function Spot(t) {
    this.state = t || Spot.STATE_NORMAL;
    var e = UI.assetsLibrary.getAsset("game/worlds/cell_0");
    Utils.callSuperConstructor(Spot, this, e.bitmap, e.width, e.height, e.frames, e.layers),
    this.stop(),
    this.currentLayer = this.state,
    this.zIndex = 10,
    this.tower = null,
    this.radiusView = null,
    this.ripView = UI.assetsLibrary.getSprite("game/towers/dead_tower_small2"),
    this.addChild(this.ripView),
    this.showRip(!1),
    this.setStatic(!0)
}
function Mob(t, e, i) {
    Utils.callSuperConstructor(Mob, this, null, 20, 20),
    this.config = {
        missionConfig: t,
        unitConfig: e
    },
    this.pathId = 0,
    this.internalId = Mob.getInternalId(TD.getAttr(t, "enemy_id")),
    this.money = TD.getAttr(e, "money", !0),
    this.subLevel = 0,
    this.path = i,
    this.position = null,
    this.prevPosition = null,
    this.distance = 0;
    var s = TD.getAttr(e, "shoot_period");
    s || (s = 1),
    this.selfRadius = TD.getAttr(e, "self_radius", !0) * TD.metrics.scale,
    Mob.shootPeriod[this.internalId] || (Mob.shootPeriod[this.internalId] = 0),
    this.canShoot = Mob.shootPeriod[this.internalId] % s == 0,
    Mob.shootPeriod[this.internalId]++,
    this.stopTimeBeforeShoot = 1e3 * TD.getAttr(e, "time_stop_before_shoot", !0),
    this.stopBeforeShootDelay = 0,
    this.health = TD.getAttr(e, "health") * this.getFactor(t, "factor_health"),
    this.health *= Complexity.getFactorHealth(),
    this.factorHitPower = this.getFactor(t, "factor_hit_power"),
    this.factorHitPower *= Complexity.getFactorHitPower(),
    this.factorSpeedAttack = this.getFactor(t, "factor_speed_attack"),
    this.factorSpeedAttack *= Complexity.getFactorSpeedAttack(),
    this.setPosition(i.m_path[0].x, i.m_path[0].y),
    this.dx = Math.floor(10 * Math.random()) - 5,
    this.dy = Math.floor(10 * Math.random()) - 5,
    this.speed = TD.getAttr(e, "speed", !0) * this.getFactor(t, "factor_speed_move") * TD.metrics.scale,
    this.speed *= Complexity.getFactorSpeedMove(),
    this.slowCoef = 1,
    this.slowTime = 0,
    this.defenseCoef = 1,
    this.defenseTime = 0,
    this.aircraft = !!e.aircraft,
    this.zIndex = this.aircraft ? 150 : 50;
    var a = UI.getAssetByTexture(TD.getAttr(e.base, "texture"))
      , o = TD.getAttr(e.base, "frames", !0);
    if (o || (o = 1),
    this.baseView = new TilesSprite(a.bitmap,a.width,a.height,o,1,o),
    this.baseView.changeFrameDelay = 1e3 / TD.getAttr(e.base, "fps", !0),
    this.baseView.zIndex = 5,
    this.addChild(this.baseView),
    TD.setHotSpot(this.baseView, TD.getAttr(e.base, "hotspot")),
    this.shadow = null,
    this.aircraft) {
        var n = TD.getAttr(e.base, "texture").split(".");
        n[n.length - 2] = n[n.length - 2] + "_shadow";
        a = UI.getAssetByTexture(n.join("."));
        this.altitude = TD.getAttr(e.aircraft, "altitude", !0) * TD.metrics.scale,
        this.altitudeHigher = this.altitude,
        this.altitudeLower = TD.getAttr(e.aircraft, "altitude_lower", !0) * TD.metrics.scale,
        this.shadow = new TilesSprite(a.bitmap,a.width,a.height,o,1,o),
        this.shadow.changeFrameDelay = 1e3 / TD.getAttr(e.base, "fps", !0),
        this.shadow.zIndex = 1,
        this.shadow.setPosition(0, this.altitude),
        this.addChild(this.shadow)
    }
    if (this.cannons = [],
    e.cannons)
        for (var r, h = Utils.isArray(e.cannons.cannon) ? e.cannons.cannon : [e.cannons.cannon], d = 0; d < h.length; d++)
            (r = new Cannon(h[d])).canShoot = this.canShoot,
            r.attackSpeed *= this.factorSpeedAttack,
            this.baseView.addChild(r),
            this.cannons.push(r);
    if (this.animations = [],
    e.animations) {
        var l, f;
        Utils.isArray(e.animations.animation) || (e.animations.animation = [e.animations.animation]);
        for (d = 0; d < e.animations.animation.length; d++) {
            l = e.animations.animation[d],
            a = UI.getAssetByTexture(TD.getAttr(l, "texture")),
            o = TD.getAttr(l, "frames", !0),
            (f = new TilesSprite(a.bitmap,a.width,a.height,o,1,o)).changeFrameDelay = 1e3 / TD.getAttr(l, "fps", !0);
            var c = TD.parsePositionString(TD.getAttr(l, "position"));
            f.setPosition(c.x, c.y),
            TD.setHotSpot(f, TD.getAttr(l, "hotspot")),
            this.baseView.addChild(f),
            this.animations.push(f)
        }
    }
    this.healthView = new MobHealthView(this.health);
    var g = TD.parseNumbersString(TD.getAttr(e, "health_delta"));
    this.healthView.x = g[0] * TD.metrics.scale,
    this.healthView.y = g[1] * TD.metrics.scale,
    this.healthView.zIndex = 100,
    this.addChild(this.healthView)
}
function Cannon(t) {
    var e = {
        bitmap: null,
        width: 1,
        height: 1,
        frames: 1,
        layers: 1
    };
    TD.getAttr(t, "texture") && (e = UI.getAssetByTexture(TD.getAttr(t, "texture"))),
    Utils.callSuperConstructor(Cannon, this, e.bitmap, e.width, e.height, e.frames, e.layers),
    e.bitmap || (this.visible = !1);
    var i = TD.parsePositionString(TD.getAttr(t, "position"));
    this.setPosition(i.x, i.y),
    TD.setHotSpot(this, TD.getAttr(t, "hotspot")),
    this.attackRadius = TD.getAttr(t, "attack_radius", !0) * TD.metrics.scale,
    this.attackSpeed = 1 / TD.getAttr(t, "attack_speed", !0) * 1e3,
    this.attackDelay = 0,
    this.bulletName = TD.getAttr(t, "bullet_name"),
    this.rotationSpeed = TD.getAttr(t, "rotation_speed", !0),
    this.rotationSpeed || (this.rotationSpeed = 10),
    this.rotationSpeed = this.rotationSpeed / 180 * Math.PI * 16,
    this.canShoot = !1,
    this.shootDelay = 0,
    this.shootState = !1,
    this.target = null
}
function MobHealthView(t) {
    Utils.callSuperConstructor(MobHealthView, this, t)
}
function Tower(t, e, i) {
    Utils.callSuperConstructor(Tower, this, null, 20, 20),
    this.config = {
        baseConfig: Tower.getByIdAndLevel(t, e),
        levelConfig: TowersHierarchy.get(t, e)
    },
    this.spot = null,
    this.internalId = 0,
    this.platform = null,
    this.head = null,
    this.guns = [],
    this.id = t,
    this.level = e,
    this.subLevel = i,
    this.radius = 0,
    this.attackSpeed = 0,
    this.experience = 0,
    this.prevExperience = 0,
    this.nextExperience = 0,
    this.health = 0,
    this.maxHealth = 0,
    this.cost = 0,
    this.costShop = 0,
    this.selfRadius = 0,
    this.hitCoefficient = [],
    this.levelIcon = null,
    this.healthView = new TowerHealthView(this.health),
    this.healthView.y = 11,
    this.healthView.zIndex = 3,
    this.addChild(this.healthView),
    this.upIcon = UI.assetsLibrary.getSprite("game/towers/towers_6"),
    this.upIcon.setPosition(0, -14),
    this.addChild(this.upIcon),
    this.upIcon.visible = !1,
    this.reconfigure(),
    this.health = this.maxHealth
}
function TowerHealthView(t) {
    Utils.callSuperConstructor(TowerHealthView, this, t),
    this.fillColor = "#0f0"
}
function TowerExpView(t) {
    Utils.callSuperConstructor(TowerExpView, this, t),
    this.fillColor = "#66f"
}
function Gun(t) {
    var e = UI.getAssetByTexture(TD.getAttr(t, "texture"));
    Utils.callSuperConstructor(Gun, this, e.bitmap, e.width, e.height, e.frames, e.layers),
    TD.setHotSpot(this, TD.getAttr(t, "hotspot")),
    this.flamethrower = !!TD.getAttr(t, "flamethrower"),
    this.flameView = null,
    this.flamethrower && (this.flameView = UI.assetsLibrary.getSprite("game/towers/flamethrower"),
    this.flameView.visible = !1,
    this.flameView.rotation = -Math.PI / 2,
    this.flameView.setPosition(24, 0),
    this.addChild(this.flameView)),
    this.fireShotView = null,
    this.target = null,
    this.rotationSpeed = TD.getAttr(t, "rotation_speed") * Math.PI / 180,
    this.rotationSpeed *= 10,
    this.attackDelay = 0,
    this.bulletName = TD.getAttr(t, "bullet_name"),
    this.fireName = TD.getAttr(t, "fire_name")
}
function TowerPlace(t) {
    this.config = t;
    var e = TowersHierarchy.get(t.id, t.level).getAttackRadius(0) * TD.metrics.scale;
    Utils.callSuperConstructor(TowerPlace, this, null, 2 * e, 2 * e),
    this.radiusView = new Graphics.circle(0,0,e),
    this.radiusView.lineWidth = 0,
    this.addChild(this.radiusView),
    this.addEventListener("mouseup", Utils.proxy(this.place, this)),
    this.addEventListener("mousemove", Utils.proxy(this.checkPlace, this)),
    this.onclick = UI.preventEvent,
    this.onplace = null,
    this.valid = !1,
    this.selectedTarget = null,
    this.pointer = new Sprite(null,3,3),
    this.addChild(this.pointer),
    this.addChild(new Tower(t.id,0,0)),
    this.update()
}
function Bullet(t, e, i) {
    this.config = Bullet.getConfigById(t),
    i || (i = 0),
    this.subLevel = i,
    Utils.callSuperConstructor(Bullet, this, null, 1, 1),
    this.hitCoefficient = e;
    var s = TD.getAttr(this.config.bullet, "texture");
    if (s) {
        var a = UI.getAssetByTexture(s);
        this.bitmap = a.bitmap,
        this.width = a.width,
        this.height = a.height,
        this.frames = a.frames,
        this.layers = a.layers
    }
    TD.setHotSpot(this, TD.getAttr(this.config.bullet, "hotspot")),
    this.rotateSpeed = TD.getAttr(this.config.bullet, "rotate_speed", !0),
    this.rotateSpeed ? (this.rotation = Math.random() * Math.PI * 2,
    this.rotateSpeed = this.rotateSpeed * Math.PI) : this.rotateSpeed = 0,
    this.scaleMax = TD.getAttr(this.config.bullet, "scale_max", !0),
    this.scaleMax || (this.scaleMax = 0),
    this.scaleMin = TD.getAttr(this.config.bullet, "scale_min", !0),
    this.scaleMin || (this.scaleMin = 0),
    this.target = null,
    this.fromX = 0,
    this.fromY = 0,
    this.toX = 0,
    this.toY = 0,
    this.speed = TD.getValFromString(TD.getAttr(this.config, "speed"), this.subLevel),
    this.power = TD.getValFromString(TD.getAttr(this.config, "power"), this.subLevel),
    this.range = TD.getValFromString(TD.getAttr(this.config, "range"), this.subLevel) * TD.metrics.scale / 2,
    this.range < 1 && (this.range = 1),
    this.flame = !!this.config.flame,
    this.sound = TD.getAttr(this.config.sound, "name"),
    this.pathLen = 0,
    this.pathTraversed = 0,
    this.pathAngle = 0,
    this.config.sound && 1 != TD.getAttr(this.config.sound, "sound_at_end") && SoundsManager.play(TD.getAttr(this.config.sound, "name"))
}
function TowersHierarchy(t, e) {
    for (var i in this.parent = t,
    this.children = [],
    this.attackRadius = TD.parseNumbersString(TD.getAttr(e, "attack_radius")),
    this.attackSpeed = TD.parseNumbersString(TD.getAttr(e, "attack_speed")),
    this.experience = TD.parseNumbersString(TD.getAttr(e, "experience")),
    this.health = TD.parseNumbersString(TD.getAttr(e, "health")),
    this.hitCoefficient = TD.parseNumbersString(TD.getAttr(e, "hit_coefficient")),
    this.iconName = TD.getAttr(e, "icon_name"),
    this.price = TD.parseNumbersString(TD.getAttr(e, "price")),
    this.priceShop = TD.parseNumbersString(TD.getAttr(e, "price_shop")),
    this.repair = TD.parseNumbersString(TD.getAttr(e, "repair")),
    this.sell = TD.parseNumbersString(TD.getAttr(e, "sell")),
    this.towerName = TD.getAttr(e, "tower_name"),
    this.slow = TD.parseNumbersString(TD.getAttr(e, "slow")),
    this.slowProbability = TD.parseNumbersString(TD.getAttr(e, "slow_probability")),
    this.slowTime = TD.parseNumbersString(TD.getAttr(e, "slow_time")),
    this.slowUnitId = TD.parseNumbersString(TD.getAttr(e, "slow_unit_id")),
    this.defense = TD.parseNumbersString(TD.getAttr(e, "defense")),
    this.defenseTime = TD.parseNumbersString(TD.getAttr(e, "defense_time")),
    this.level = 1 * this.towerName.replace("level_", ""),
    e)
        "@attributes" != i && "comment" != i && this.children.push(new TowersHierarchy(this,e[i]))
}
function MobsPortal(t) {
    this.config = t,
    this.pathId = 0,
    this.pathPos = {};
    var e = UI.getAssetByTexture(TD.getAttr(t.base_destroyed.enemy, "texture"));
    Utils.callSuperConstructor(MobsPortal, this, e.bitmap, e.width, e.height),
    this.spawnBaseDelay = 1e3 * TD.getAttr(t, "delta_time", !0),
    this.spawnDelay = this.spawnBaseDelay,
    this.mobsId = TD.getAttr(t, "contain_id"),
    this.mobsCount = TD.getAttr(t, "count", !0)
}
Complexity.getFactor = function(t) {
    var e = Complexity.params[TD.gameData.complexity];
    return e ? e[t] : 1
}
,
Complexity.getFactorHealth = function() {
    return Complexity.getFactor("factorHealth")
}
,
Complexity.getFactorHitPower = function() {
    return Complexity.getFactor("factorHitPower")
}
,
Complexity.getFactorSpeedAttack = function() {
    return Complexity.getFactor("factorSpeedAttack")
}
,
Complexity.getFactorSpeedMove = function() {
    return Complexity.getFactor("factorSpeedMove")
}
,
Complexity.params = [{
    factorHealth: .6,
    factorHitPower: .3,
    factorSpeedAttack: .8,
    factorSpeedMove: .7
}, {
    factorHealth: .9,
    factorHitPower: 1,
    factorSpeedAttack: 1,
    factorSpeedMove: 1
}],
Utils.extend(GameField, Sprite),
GameField.prototype.pause = function() {
    this.paused = !0;
    for (var t = 0; t < this.towers.length; t++)
        this.towers[t].stop();
    for (t = 0; t < this.mobs.length; t++)
        this.mobs[t].stop()
}
,
GameField.prototype.resume = function() {
    this.paused = !1;
    for (var t = 0; t < this.mobs.length; t++)
        this.mobs[t].play()
}
,
GameField.prototype.toggle = function() {
    this.ended || (this.paused ? this.resume() : this.pause())
}
,
GameField.prototype.setSpeedScale = function(t) {
    this.speedScale != t && (this.speedScale = t)
}
,
GameField.prototype.spentMoney = function(t) {
    this.money -= t,
    this.stats.spent += t
}
,
GameField.prototype.getImage = function(t) {
    var e = TD.getAttr(t, "texture");
    if (e)
        return {
            name: e,
            src: LinksProcessor.get(e),
            rect: TD.getAttr(t, "rect"),
            position: TD.getAttr(t, "position"),
            fps: TD.getAttr(t, "fps"),
            frames: TD.getAttr(t, "frames"),
            use_filter: TD.getAttr(t, "use_filter")
        };
    throw console.log(t),
    Error("Image not found")
}
,
GameField.prototype.init = function(t, e) {
    for (var i in this.mission = t,
    this.unitsConfigs = e,
    this.money = TD.getAttr(this.mission, "money_start", !0),
    "funtomic" == ExternalAPI.type && 0 == TD.currentWorld && TD.currentLevel <= 2 && (this.money = 60),
    this.startLife = TD.getAttr(this.mission, "lives", !0),
    this.life = this.startLife,
    Mob.reset(),
    e.units)
        "comment" != i && Mob.typeNames.push(i);
    var s = new ImagesPreloader;
    this.gameViews = {},
    this.gameViews.back = this.getImage(this.mission.background.background);
    var d = this.mission.background.base ? this.mission.background.base : this.mission.background.bases.base_01;
    this.gameViews.base = this.getImage(d.box),
    this.gameViews.overlay = this.getImage(d.overlay),
    this.gameViews.ruins = this.getImage(d.ruins);
    var l = [this.gameViews.back, this.gameViews.base, this.gameViews.ruins, this.gameViews.overlay];
    if (this.mission.background.bases)
        for (var a in i = 0,
        this.mission.background.bases)
            0 < i && l.push(this.getImage(this.mission.background.bases[a].box)),
            i++;
    var o = this.mission.background.objects;
    Utils.isArray(o) || (o = [o.object]);
    var n = this.mission.background.objectslist;
    Utils.isArray(n) || (n = [n.object]);
    for (i = 0; i < o.length; i++) {
        var r = this.getImage(n[i]);
        r.position = TD.getAttr(o[i], "position"),
        l.push(r)
    }
    s.minProgressVal = 70,
    s.maxProgressVal = 30,
    s.load(l, Utils.proxy(function(t) {
        var e, i, s;
        TD.ui.preloader.showProgress(100);
        for (var a = 0; a < l.length; a++) {
            var o = l[a];
            i = TD.parseRectString(o.rect),
            s = TD.parsePositionString(o.position),
            o == this.gameViews.back && (i.width = 683,
            s.x = -86),
            "game/worlds/flag_anim_0.png" == o.name && 1.5 == Utils.globalScale && (i.width = 43.33),
            (e = new TilesSprite(t[o.name],i.width,i.height,0 < o.frames ? o.frames : 1,1,0 < o.frames ? o.frames : 1)).alignAnchor(DisplayObjectContainer.ANCHOR_ALIGN_LEFT, DisplayObjectContainer.ANCHOR_VALIGN_TOP),
            e.setPosition(s.x, s.y),
            0 < o.fps && (e.changeFrameDelay = 1e3 / o.fps),
            e.zIndex = 100,
            o == this.gameViews.back && (e.setStatic(!0),
            e.zIndex = 1,
            this.gameViews.back = e),
            o == this.gameViews.base && (TD.setHotSpot(e, TD.getAttr(d.box, "hotspot")),
            this.gameViews.base = e),
            o == this.gameViews.ruins && (e.visible = !1,
            this.gameViews.ruins = e),
            o == this.gameViews.overlay && (TD.setHotSpot(e, TD.getAttr(d.overlay, "hotspot")),
            e.visible = !1,
            this.gameViews.overlay = e),
            this.addChild(e)
        }
        this.spots = [];
        for (var n = TD.getAttr(this.mission.background, "mask"), r = 0; r < 20; r++)
            for (var h = 0; h < 26; h++) {
                "1" == n.substr(26 * r + h, 1) && ((e = new Spot).setPosition(h * e.width + 6, r * e.height + 2),
                this.addChild(e),
                e.onclick = this.onSpotClick,
                this.spots.push(e))
            }
        this.buildPathes(),
        this.waves = Utils.clone(this.mission.waves.wave),
        this.wavesCount = this.waves.length,
        this.startNextWave(),
        this.ready = !0,
        this.dispatchEvent("ready"),
        TD.stage.refreshBackground()
    }, this), TD.ui.preloader.showProgress)
}
,
GameField.prototype.onSpotClick = function(t) {
    var e = t.target;
    if (e.tower && e.tower.health <= 0 && this.activeBonuses.ressurections) {
        this.towers.push(e.tower),
        e.tower.health = e.tower.maxHealth,
        e.tower.healthView.update(e.tower.health),
        e.tower.visible = !0,
        e.showRip(!1),
        TD.spendBonus("ressurections"),
        TD.restoreBonusButtons();
        var i = {
            x: e.tower.x,
            y: e.tower.y
        };
        return i.x -= e.tower.anchor.x,
        i.y -= e.tower.anchor.y,
        UI.playEffect("particles/resurrect", i.x, i.y, this),
        !1
    }
}
,
GameField.prototype.buildPathes = function() {
    var t = TD.gameField.mission.background.pathes.path;
    Utils.isArray(t) || (t = [t]),
    this.pathes = [];
    for (var e = 0; e < t.length; e++) {
        var i = t[e]
          , s = new Path;
        s.m_id = 1 * TD.getAttr(i, "id");
        for (var a = 0; a < i.point.length; a++)
            s.addPoint(TD.parsePositionString(TD.getAttr(i.point[a], "point")));
        s.makePath(),
        this.pathes.push(s)
    }
    this.separator = new Path;
    var o = this.mission.background.separator.point;
    for (e = 0; e < o.length; e++)
        this.separator.addPoint(TD.parsePositionString(TD.getAttr(o[e], "point")));
    this.separator.makePath()
}
,
GameField.prototype.startNextWave = function() {
    if (this.waves.length) {
        this.currentWave = this.waves.shift(),
        this.currentWaveId++;
        var t, e = new WaveCounterView(this.currentWaveId);
        e.setPosition(256, 192),
        e.zIndex = 1e3,
        this.addChild(e),
        e.startAnimation(),
        Utils.isArray(this.currentWave.enemies.enemy) || (this.currentWave.enemies.enemy = [this.currentWave.enemies.enemy]);
        for (var i = 0; i < this.currentWave.enemies.enemy.length; i++)
            (t = this.currentWave.enemies.enemy[i]).spawnDelta = 1e3 * TD.getAttr(t, "start_time"),
            t.spawnCount = 0,
            t.finished = !1;
        return this.dispatchEvent("startwave"),
        !0
    }
    return this.ended = !0,
    this.dispatchEvent("end"),
    !1
}
,
GameField.prototype.tickWave = function(t) {
    if (this.currentWave) {
        for (var e, i = !0, s = 0; s < this.currentWave.enemies.enemy.length; s++)
            (e = this.currentWave.enemies.enemy[s]).spawnCount < 1 * TD.getAttr(e, "count") && (e.spawnDelta -= t * this.speedScale,
            e.spawnDelta <= 0 && (e.spawnCount++,
            e.spawnDelta += 1e3 * TD.getAttr(e, "delta_time"),
            this.addMob(e)),
            i = !1);
        return i
    }
}
,
GameField.prototype.getActivePathes = function() {
    for (var t, e, i = [], s = 0; s < this.currentWave.enemies.enemy.length; s++)
        t = this.currentWave.enemies.enemy[s],
        e = TD.getAttr(t, "path_id"),
        i.indexOf(e) < 0 && i.push(e);
    for (s = 0; s < i.length; s++)
        i[s] = this.getPathById(i[s]);
    return i
}
,
GameField.prototype.getPathById = function(t) {
    for (var e = 0; e < this.pathes.length; e++)
        if (this.pathes[e].m_id == t)
            return this.pathes[e];
    return null
}
,
GameField.prototype.addMob = function(t) {
    var e = TD.getAttr(t, "enemy_id")
      , i = this.unitsConfigs.units[e]
      , s = TD.getAttr(t, "path_id", !0)
      , a = new Mob(t,i,this.getPathById(s));
    return a.pathId = s,
    a.changeFrameDelay /= this.speedScale,
    a.zIndex = a.aircraft ? 150 : 5,
    this.mobs.push(a),
    this.addChild(a),
    a.playStartSound(),
    a.baseView.onclick = this.onMobClick,
    a
}
,
GameField.prototype.onMobClick = function(t) {
    if (!this.paused && !this.ended) {
        var e = t.target.parent;
        this.activeBonuses.godhands && 0 < e.health && (e.applyDamage(TD.configs.bonuses.godhands.power),
        e.health <= 0 && this.killMob(e))
    }
}
,
GameField.prototype.hitBaseByMob = function(t) {
    this.life -= 1,
    this.gameViews.overlay.removeTweens(),
    this.gameViews.overlay.visible = !0,
    this.gameViews.overlay.opacity = 1,
    this.gameViews.overlay.fadeTo(0, 1e3),
    this.life <= 0 && (this.life = 0,
    this.loose())
}
,
GameField.prototype.highLightSpots = function(t) {
    for (var e = t ? Spot.STATE_HIGHLIGHT : Spot.STATE_NORMAL, i = 0; i < this.spots.length; i++)
        this.spots[i].state != Spot.STATE_FAILED && (!this.spots[i].tower || this.spots[i].tower.health <= 0) && this.spots[i].setState(e)
}
,
GameField.prototype.addTower = function(t, e, i, s) {
    this.stats.built++;
    var a = new Tower(e,i,s);
    return this.towers.push(a),
    a.zIndex = 10,
    this.addChild(a),
    a.setPosition(t.x, t.y),
    a.onmousedown = this.onTowerSelect,
    ((t.tower = a).spot = t).showRip(!1),
    a.updateLevelIcon(),
    AchievementsManager.event(AchievementsManager.EVENT_BUILD_TOWER, e),
    SoundsManager.play("build_tower"),
    a
}
,
GameField.prototype.onTowerSelect = function(t) {
    return this.dispatchEvent("towerselect", t),
    !1
}
,
GameField.prototype.addBullet = function(t, e, i, s) {
    var a = Bullet.create(t, s, e.subLevel);
    return a.setProps(e.x, e.y, i.x, i.y),
    a.target = i,
    a.zIndex = 11,
    this.addChild(a),
    this.bullets.push(a),
    a
}
,
GameField.prototype.onBulletHit = function(t) {
    var e, i = [t.target];
    if (1 < t.range) {
        var s, a, o;
        t.target instanceof Mob && (s = this.mobs),
        t.target instanceof Tower && (s = this.towers);
        for (var n = 0; n < s.length; n++)
            i.indexOf(s[n]) < 0 && (a = s[n].x - t.x,
            o = s[n].y - t.y,
            Math.sqrt(a * a + o * o) <= t.range && i.push(s[n]))
    }
    for (n = 0; n < i.length; n++)
        0 < (e = i[n]).health && (e instanceof Tower && this.activeBonuses.autorepairs || e.applyDamageFromBullet(t),
        e.health <= 0 && (t.target instanceof Mob && this.killMob(e),
        t.target instanceof Tower && this.destroyTower(e)))
}
,
GameField.prototype.addMobsPortalFromMob = function(t) {
    var e = new MobsPortal(t.config.unitConfig.troop_carrier);
    e.pathId = t.pathId,
    e.pathPos = Utils.clone(t.position),
    e.rotation = t.baseView.rotation,
    e.setPosition(t.x, t.y),
    e.zIndex = 2,
    this.mobsPortals.push(e),
    this.addChild(e)
}
,
GameField.prototype.removeMobsPortal = function(t) {
    t.destroy = !0,
    this.mobsPortals = Utils.removeFromArray(this.mobsPortals, t)
}
,
GameField.prototype.killMob = function(t) {
    this.stats.killed++,
    this.money += t.money,
    t.config.unitConfig.troop_carrier && this.addMobsPortalFromMob(t),
    this.mobs = Utils.removeFromArray(this.mobs, t),
    t.destroy = !0,
    t.playKillSound();
    var e = new CostView(t.money);
    e.setPosition(t.x, t.y - 10),
    this.addChild(e),
    e.bubble(),
    AchievementsManager.event(AchievementsManager.EVENT_MOB_KILL)
}
,
GameField.prototype.destroyTower = function(t) {
    this.towers = Utils.removeFromArray(this.towers, t),
    t.spot.showRip(!0),
    t.visible = !1,
    SoundsManager.play("explode_tower")
}
,
GameField.prototype.removeTower = function(t) {
    this.towers = Utils.removeFromArray(this.towers, t),
    t.spot.tower = null,
    t.destroy = !0
}
,
GameField.prototype.tickChildren = function(t, e, s) {
    for (i = 0; i < this[t].length; i++)
        if (this[t][i].tick(e, this.speedScale),
        this.ended)
            return;
    for (i = 0; i < this[t].length; i++)
        if (this[t][i].destroy && (s && s(this[t][i]),
        this[t] = Utils.removeFromArray(this[t], this[t][i]),
        i--),
        this.ended)
            return
}
,
GameField.prototype.clearBullets = function() {
    for (var t = 0; t < this.bullets.length; t++)
        this.bullets[t].destroy = !0;
    this.bullets = []
}
,
GameField.prototype.win = function() {
    this.ended = !0,
    this.isWin = !0,
    this.clearBullets(),
    this.pause(),
    this.dispatchEvent("levelcomplete"),
    SoundsManager.play("mission_completed")
}
,
GameField.prototype.loose = function() {
    this.gameViews.base.visible = !1,
    this.gameViews.ruins.visible = !0,
    this.ended = !0,
    this.isWin = !1,
    this.clearBullets(),
    this.pause(),
    this.dispatchEvent("levelloose"),
    SoundsManager.play("game_over")
}
,
GameField.prototype.useBonus = function(t) {
    if (this.activeBonuses[t] = !0,
    "autorepairs" == t) {
        for (var e, i = 0; i < this.towers.length; i++)
            (e = this.towers[i]).health < e.maxHealth && (e.health = e.maxHealth,
            e.healthView.update(e.health),
            (s = {
                x: e.x,
                y: e.y
            }).x -= e.anchor.x,
            s.y -= e.anchor.y,
            UI.playEffect("particles/heal", s.x, s.y, this));
        SoundsManager.play("repair_tower")
    }
    if ("securitystrikes" == t) {
        var s, a;
        (s = {
            x: this.gameViews.base.x,
            y: this.gameViews.base.y
        }).x -= this.gameViews.base.anchor.x,
        s.y -= this.gameViews.base.anchor.y;
        for (i = 0; i < this.mobs.length; i++)
            (a = this.mobs[i]) && 0 < a.health && GameField.isTargetInRadius(s, a, TD.configs.bonuses.securitystrikes.radius) && (a.applyDamage(TD.configs.bonuses.securitystrikes.power),
            a.health <= 0 && (this.killMob(a),
            i--));
        UI.playEffect("particles/base_explosion", s.x, s.y, this, 3)
    }
}
,
GameField.prototype.endBonus = function(t) {
    this.activeBonuses[t] = !1
}
,
GameField.prototype.tick = function(t) {
    !this.ready || this.ended || this.paused || (!this.tickWave(t) || (this.dispatchEvent("wavefinished"),
    this.mobs.length || this.mobsPortals.length || this.startNextWave()) ? (this.tickChildren("mobsPortals", t),
    this.tickChildren("mobs", t),
    this.tickChildren("towers", t),
    this.tickChildren("bullets", t, this.onBulletHit)) : this.win())
}
,
GameField.prototype.debugDraw = function() {
    for (var t = ["#f33", "#33f", "#f3f", "#990", "#393", "ff3", "#fff", "#000"], e = 0; e < this.pathes.length; e++) {
        for (var i = 0; i < this.pathes[e].m_path.length - 1; i++)
            stage.drawLine(this.x + this.pathes[e].m_path[i].x, this.y + this.pathes[e].m_path[i].y, this.x + this.pathes[e].m_path[i + 1].x, this.y + this.pathes[e].m_path[i + 1].y, 1, t[e]);
        for (i = 0; i < this.pathes[e].m_base.length; i++)
            stage.drawCircle(this.x + this.pathes[e].m_base[i].x, this.y + this.pathes[e].m_base[i].y, 2, 1, t[e])
    }
    if (this.separator) {
        for (i = 0; i < this.separator.m_path.length - 1; i++)
            stage.drawLine(this.x + this.separator.m_path[i].x, this.y + this.separator.m_path[i].y, this.x + this.separator.m_path[i + 1].x, this.y + this.separator.m_path[i + 1].y, 1, "#fff");
        for (i = 0; i < this.separator.m_base.length; i++)
            stage.drawCircle(this.x + this.separator.m_base[i].x, this.y + this.separator.m_base[i].y, 2, 1, "#fff")
    }
}
,
GameField.isTargetInRadius = function(t, e, i) {
    if (t.x - i > e.x || t.x + i < e.x || t.y - i > e.y || t.y + i < e.y)
        return !1;
    var s = t.x - e.x
      , a = t.y - e.y;
    return Math.sqrt(s * s + a * a) <= i
}
,
Utils.extend(ProgressBarView, Sprite),
ProgressBarView.prototype.update = function(t) {
    this.val = t
}
,
ProgressBarView.prototype.render = function(t, e, i) {
    this.progressView.width = this.width - this.width * (Math.min(this.val, this.maxVal) / this.maxVal),
    this.progressView.x = this.width / 2 - this.progressView.width / 2,
    Utils.callSuperMethod(ProgressBarView, this, "render", t, e, i)
}
,
Utils.extend(Spot, Sprite),
Spot.STATE_HIGHLIGHT = 0,
Spot.STATE_FAILED = 1,
Spot.STATE_NORMAL = 2,
Spot.prototype.setState = function(t) {
    this.state = t,
    this.currentLayer = this.state,
    this.stage && this.stage.refreshBackground()
}
,
Spot.prototype.showRip = function(t) {
    this.ripView.visible = !!t,
    this.stage && this.stage.refreshBackground()
}
,
Utils.extend(Mob, Sprite),
Mob.prototype.getFactor = function(t, e) {
    var i = 1 * TD.getAttr(t, e);
    return i || (i = 1),
    i
}
,
Mob.prototype.setSlow = function(t) {
    !t || 0 < this.slowTime || (this.slowCoef = t.val,
    this.slowTime = 1e3 * t.time)
}
,
Mob.prototype.setDefense = function(t) {
    !t || 0 < this.defenseTime || (this.defenseCoef = t.val,
    this.defenseTime = 1e3 * t.time)
}
,
Mob.prototype.getSpeed = function() {
    return this.speed * this.slowCoef
}
,
Mob.prototype.getWalkStepLength = function(t) {
    return this.getSpeed() / 1e3 * t
}
,
Mob.prototype.getNextPosition = function(t) {
    if (!this.position)
        return this.position = {
            id: 0,
            x: this.path.m_path[0].x,
            y: this.path.m_path[0].y,
            ended: !1
        },
        void (this.prevPosition = {
            x: this.position.x,
            y: this.position.y
        });
    if (!(t <= 0)) {
        this.prevPosition.x = this.position.x,
        this.prevPosition.y = this.position.y;
        for (var e = this.getWalkStepLength(t), i = {
            id: this.position.id,
            x: this.position.x,
            y: this.position.y
        }, s = 0, a = !0, o = 0, n = 0, r = 0; a; )
            if (i.id++,
            i.id >= this.path.m_path.length)
                i.id--,
                this.position.x = this.path.m_path[i.id].x,
                this.position.y = this.path.m_path[i.id].y,
                this.position.id = i.id,
                a = !(this.position.ended = !0);
            else if (n = i.x - this.path.m_path[i.id].x,
            r = i.y - this.path.m_path[i.id].y,
            e <= s + (o = Math.sqrt(n * n + r * r))) {
                var h = Math.atan2(this.path.m_path[i.id].y - i.y, this.path.m_path[i.id].x - i.x);
                o = e - s,
                i.x += Math.cos(h) * o,
                i.y += Math.sin(h) * o,
                i.id--,
                this.position.x = i.x,
                this.position.y = i.y,
                this.position.id = i.id,
                a = !1
            } else
                s += o,
                i.x = this.path.m_path[i.id].x,
                i.y = this.path.m_path[i.id].y;
        return this.position
    }
}
,
Mob.prototype.getRadius = function() {
    return this.radius
}
,
Mob.prototype.applyDamageFromBullet = function(t) {
    var e = t.power * (t.hitCoefficient[this.internalId] ? t.hitCoefficient[this.internalId] : 0);
    e /= 0 < this.defenseTime ? this.defenseCoef : 1,
    this.applyDamage(e)
}
,
Mob.prototype.applyDamage = function(t) {
    this.health -= t,
    this.health < 0 && (this.health = 0),
    this.healthView.update(this.health)
}
,
Mob.prototype.startShoot = function(t) {
    this.stopBeforeShootDelay = this.stopTimeBeforeShoot,
    t.shootDelay = this.stopTimeBeforeShoot
}
,
Mob.prototype.addBulletFromCannon = function(t) {
    this.internalId != Mob.ENEMY_TYPE_TANK_LIGHT && this.internalId != Mob.ENEMY_TYPE_TANK_HEAVY || SoundsManager.play("fire_unit_tank_hit"),
    this.parent.addBullet(t.bulletName, this, t.target, this.factorHitPower)
}
,
Mob.prototype.stop = function() {
    for (var t = 0; t < this.animations.length; t++)
        this.animations[t].stop();
    this.baseView.stop(),
    this.shadow && this.shadow.stop(),
    Utils.callSuperMethod(Mob, this, "stop")
}
,
Mob.prototype.play = function() {
    for (var t = 0; t < this.animations.length; t++)
        this.animations[t].play();
    this.baseView.play(),
    this.shadow && this.shadow.play(),
    Utils.callSuperMethod(Mob, this, "play")
}
,
Mob.prototype.playKillSound = function() {
    var t = [];
    switch (this.internalId) {
    case Mob.ENEMY_TYPE_SOLDIER:
        t.push("explode_unit_soldier_bonus0");
        break;
    case Mob.ENEMY_TYPE_TRUCK:
        t.push("explode_unit_ground"),
        t.push("explode_unit_truck_bonus");
        break;
    case Mob.ENEMY_TYPE_CAR:
    case Mob.ENEMY_TYPE_TANK_LIGHT:
    case Mob.ENEMY_TYPE_TANK_HEAVY:
    case Mob.ENEMY_TYPE_TROOPCARRIER:
        t.push("explode_unit_ground");
        break;
    case Mob.ENEMY_TYPE_FIGHTER:
    case Mob.ENEMY_TYPE_AIRSHIP:
    case Mob.ENEMY_TYPE_BOMBER:
        t.push("explode_unit_air")
    }
    for (var e = 0; e < t.length; e++)
        SoundsManager.play(t[e])
}
,
Mob.prototype.playStartSound = function() {
    var t = "";
    switch (this.internalId) {
    case Mob.ENEMY_TYPE_SOLDIER:
        t = "unit_soldier_step";
        break;
    case Mob.ENEMY_TYPE_TRUCK:
        t = "unit_machine_engine_2";
        break;
    case Mob.ENEMY_TYPE_CAR:
        t = "unit_machine_engine_1";
        break;
    case Mob.ENEMY_TYPE_TANK_LIGHT:
        t = "unit_tank_light_engine";
        break;
    case Mob.ENEMY_TYPE_TANK_HEAVY:
    case Mob.ENEMY_TYPE_TROOPCARRIER:
        t = "unit_tank_heavy_engine";
        break;
    case Mob.ENEMY_TYPE_FIGHTER:
        t = "unit_aircraft_engine"
    }
    t && SoundsManager.play(t)
}
,
Mob.prototype.tick = function(t, e) {
    for (var i = 0; i < this.cannons.length; i++)
        this.cannons[i].tick(t, e);
    if (t *= e || 1,
    0 < this.slowTime && (this.slowTime -= t),
    0 < this.defenseTime && (this.defenseTime -= t),
    0 < this.stopBeforeShootDelay && (this.stopBeforeShootDelay -= t),
    0 < this.stopBeforeShootDelay)
        this.baseView.gotoAndStop(0);
    else {
        this.stopBeforeShootDelay = 0,
        this.baseView.play();
        if (this.getNextPosition(1 * t),
        this.distance += this.getWalkStepLength(1 * t),
        this.setPosition(this.position.x + this.dx, this.position.y + this.dy),
        this.prevPosition.x != this.position.x || this.prevPosition.y != this.position.y) {
            var s = this.prevPosition.x - this.position.x
              , a = this.prevPosition.y - this.position.y
              , o = Math.atan2(a, s) + Math.PI;
            this.baseView.rotation = o,
            this.shadow && (this.shadow.rotation = o)
        }
        this.position.ended && (this.destroy = !0,
        this.health = 0,
        this.parent.hitBaseByMob(this))
    }
}
,
Mob.ENEMY_TYPE_SOLDIER = 0,
Mob.ENEMY_TYPE_TRUCK = 1,
Mob.ENEMY_TYPE_CAR = 2,
Mob.ENEMY_TYPE_TANK_LIGHT = 3,
Mob.ENEMY_TYPE_TANK_HEAVY = 4,
Mob.ENEMY_TYPE_TROOPCARRIER = 5,
Mob.ENEMY_TYPE_FIGHTER = 6,
Mob.ENEMY_TYPE_AIRSHIP = 7,
Mob.ENEMY_TYPE_BOMBER = 8,
Mob.ENEMY_TYPE_PRIZE_BOX = 9,
Mob.typeNames = [],
Mob.shootPeriod = [],
Mob.reset = function() {
    Mob.typeNames = [],
    Mob.shootPeriod = []
}
,
Mob.getInternalId = function(t) {
    return Mob.typeNames.indexOf(t)
}
,
Utils.extend(Cannon, Sprite),
Cannon.prototype.getAttackRadius = function() {
    return this.attackRadius
}
,
Cannon.prototype.checkTarget = function() {
    return this.target && 0 < this.target.health && GameField.isTargetInRadius(this.parent.parent, this.target, this.getAttackRadius())
}
,
Cannon.prototype.findTarget = function() {
    for (var t = this.parent.parent, e = t.parent, i = [], s = 0; s < t.cannons.length; s++)
        t.cannons[s] != this && t.cannons[s].target && i.push(t.cannons[s].target);
    var a, o = null;
    for (s = 0; s < e.towers.length; s++)
        if (a = e.towers[s],
        i.indexOf(a) < 0 && 0 < a.health && GameField.isTargetInRadius(t, a, this.getAttackRadius())) {
            o = a;
            break
        }
    return o
}
,
Cannon.prototype.tick = function(t, e) {
    t *= e || 1,
    0 <= this.attackDelay && (this.attackDelay -= t),
    this.checkTarget() || (this.target = this.findTarget());
    var i = this.parent.parent
      , s = 0;
    this.target && (s = TD.normalizeAngle(Math.atan2(this.target.y - i.y, this.target.x - i.x) - this.parent.rotation)),
    this.rotation = TD.normalizeAngle(this.rotation);
    var a = s - this.rotation
      , o = 0 < a ? a : 2 * Math.PI - this.rotation + s
      , n = a < 0 ? -a : this.rotation + 2 * Math.PI - s;
    a = Math.abs(a) * (o < n ? 1 : -1);
    var r = this.rotationSpeed * (t / 1e3) * Utils.sign(a);
    Math.abs(r) > Math.abs(a) && (r = a),
    this.rotation += r,
    this.target && this.canShoot && this.rotation == s && this.attackDelay <= 0 && (this.shootState ? (this.shootDelay -= t,
    this.shootDelay <= 0 && (this.attackDelay = this.attackSpeed,
    this.shootDelay = 0,
    this.shootState = !1,
    i.addBulletFromCannon(this))) : (this.shootState = !0,
    i.startShoot(this))),
    this.target || (this.shootState = !1,
    this.shootDelay = 0)
}
,
Utils.extend(MobHealthView, ProgressBarView),
MobHealthView.prototype.update = function(t) {
    Utils.callSuperMethod(MobHealthView, this, "update", t),
    this.visible = this.val < this.maxVal
}
,
Utils.extend(Tower, Sprite),
Tower.prototype.reconfigure = function() {
    this.selfRadius = TD.getAttr(this.config.baseConfig, "self_radius", !0) * TD.metrics.scale,
    this.radius = this.config.levelConfig.getAttackRadius(this.subLevel) * TD.metrics.scale,
    this.attackSpeed = 1 / this.config.levelConfig.getAttackSpeed(this.subLevel) * 1e3,
    this.nextExperience = this.config.levelConfig.getExperience(this.subLevel),
    this.maxHealth = this.config.levelConfig.getHealth(this.subLevel),
    this.health = this.maxHealth,
    this.cost = this.config.levelConfig.getPlainCost(this.subLevel),
    this.costShop = this.config.levelConfig.getCostShop(this.subLevel),
    this.hitCoefficient = this.config.levelConfig.hitCoefficient,
    this.platform && (this.platform.destroy = !0),
    this.head && (this.head.destroy = !0);
    for (var t = [], e = 0; e < this.guns.length; e++)
        t[e] = this.guns[e].rotation,
        this.guns[e].destroy = !0;
    this.platform = null,
    this.head = null,
    this.guns = [],
    this.config.baseConfig.platform && (this.platform = UI.getSpriteByTexture(TD.getAttr(this.config.baseConfig.platform, "texture")),
    this.addChild(this.platform));
    var i, s = 0, a = Utils.isArray(this.config.baseConfig.guns.gun) ? this.config.baseConfig.guns.gun : [this.config.baseConfig.guns.gun];
    for (e = 0; e < a.length; e++)
        i = new Gun(a[e]),
        t[e] ? i.rotation = t[e] : i.rotation = s,
        this.guns.push(i),
        this.addChild(i),
        s += Math.PI / 2;
    this.config.baseConfig.head && (this.head = UI.getSpriteByTexture(TD.getAttr(this.config.baseConfig.head, "texture")),
    this.addChild(this.head)),
    this.healthView.maxVal = this.maxHealth
}
,
Tower.prototype.stop = function() {
    Utils.callSuperMethod(Tower, this, "stop");
    for (var t = 0; t < this.guns.length; t++)
        this.guns[t].flameView && (this.guns[t].flameView.visible = !1)
}
,
Tower.prototype.updateLevelIcon = function() {
    this.levelIcon && (this.levelIcon.destroy = !0);
    var t = TD.getPerk(this.config.levelConfig.iconName);
    this.levelIcon = UI.getSpriteByTexture(TD.getAttr(t.icon_rank, "texture")),
    this.levelIcon.setPosition(8, -8),
    this.levelIcon.currentLayer = this.subLevel,
    this.addChild(this.levelIcon)
}
,
Tower.prototype.getSlowEffect = function(t) {
    return this.config.levelConfig.getSlowEffect(this.subLevel, t)
}
,
Tower.prototype.getDefenseEffect = function() {
    return this.config.levelConfig.getDefenseEffect(this.subLevel)
}
,
Tower.prototype.getSellCost = function() {
    return Math.floor(this.config.levelConfig.getSellCost(this.subLevel) * (this.health / this.maxHealth))
}
,
Tower.prototype.getRepairCost = function() {
    var t = Math.round(this.config.levelConfig.getRepairCost(this.subLevel) * (1 - this.health / this.maxHealth));
    return this.health < this.maxHealth && t <= 0 && (t = 1),
    t
}
,
Tower.prototype.repair = function() {
    var t = this.getRepairCost();
    this.parent.money >= t && (this.health = this.maxHealth,
    this.healthView.update(this.health),
    this.parent.money -= t,
    SoundsManager.play("repair_tower"))
}
,
Tower.prototype.sell = function() {
    this.parent.money += this.getSellCost(),
    this.parent.removeTower(this),
    SoundsManager.play("sell_tower")
}
,
Tower.prototype.isUpOpened = function(t, e) {
    return UpgradesManager.check(this.id, t, e)
}
,
Tower.prototype.isReadyToUp = function() {
    return this.experience >= this.nextExperience && this.getNextLevelProps().length
}
,
Tower.prototype.getNextLevelProps = function() {
    var t = this.level
      , e = this.subLevel;
    if (this.subLevel < 2)
        return this.isUpOpened(t, e + 1) ? [{
            level: t,
            subLevel: e + 1
        }] : [];
    var i = [];
    return this.config.levelConfig.children[0] && this.isUpOpened(this.config.levelConfig.children[0].level, 0) && i.push({
        level: this.config.levelConfig.children[0].level,
        subLevel: 0
    }),
    this.config.levelConfig.children[1] && this.isUpOpened(this.config.levelConfig.children[1].level, 0) && i.push({
        level: this.config.levelConfig.children[1].level,
        subLevel: 0
    }),
    i
}
,
Tower.prototype.getUpgradeCost = function(t) {
    var e = this.getNextLevelProps();
    return TowersHierarchy.get(this.id, e[t].level).getPlainCost(e[t].subLevel) + this.getRepairCost()
}
,
Tower.prototype.upgrade = function(t) {
    this.parent.spentMoney(this.getUpgradeCost(t));
    var e = this.getNextLevelProps();
    this.level = e[t].level,
    this.subLevel = e[t].subLevel,
    this.config.baseConfig = Tower.getByIdAndLevel(this.id, this.level),
    this.config.levelConfig = TowersHierarchy.get(this.id, this.level),
    this.prevExperience = this.nextExperience,
    this.reconfigure(),
    this.updateLevelIcon(),
    this.updateUpIcon(),
    this.healthView.update(this.health),
    SoundsManager.play("upgrade_tower")
}
,
Tower.prototype.getRadius = function() {
    return this.radius
}
,
Tower.prototype.applyDamageFromBullet = function(t) {
    this.applyDamage(t.power * t.hitCoefficient)
}
,
Tower.prototype.applyDamage = function(t) {
    this.health -= t,
    this.health < 0 && (this.health = 0),
    this.healthView.update(this.health),
    Hint.show(Hint.REPAIR_HINT, this, function(t) {
        Hint.show(Hint.REPAIR_HINT2, t.targetObject, TD.resumeGame)
    }) && TD.pauseGame()
}
,
Tower.prototype.addBulletFromGun = function(t) {
    var e = this.parent.addBullet(t.bulletName, this, t.target, this.hitCoefficient);
    this.addExperience(e.power)
}
,
Tower.prototype.addExperience = function(t) {
    this.experience < this.nextExperience && (this.experience += t),
    this.updateUpIcon()
}
,
Tower.prototype.updateUpIcon = function() {
    this.upIcon.visible = this.isReadyToUp(),
    this.upIcon.visible && Hint.show(Hint.UPGRADE_HINT, this, function(t) {
        Hint.show(Hint.UPGRADE_HINT2, t.targetObject, TD.resumeGame)
    }) && TD.pauseGame()
}
,
Tower.prototype.tick = function(t, e) {
    for (var i = 0; i < this.guns.length; i++)
        this.guns[i].tick(t, e)
}
,
Tower.getByIdAndLevel = function(t, e) {
    var i = null;
    return 0 == t && (i = TD.configs.towers.towers.tower_a["level_" + e]),
    1 == t && (i = TD.configs.towers.towers.tower_b["level_" + e]),
    2 == t && (i = TD.configs.towers.towers.tower_c["level_" + e]),
    3 == t && (i = TD.configs.towers.towers.tower_d["level_" + e]),
    i
}
,
Utils.extend(TowerHealthView, ProgressBarView),
TowerHealthView.prototype.update = function(t) {
    Utils.callSuperMethod(TowerHealthView, this, "update", t),
    this.visible = this.val < this.maxVal
}
,
Utils.extend(TowerExpView, ProgressBarView),
Utils.extend(Gun, Sprite),
Gun.prototype.checkTarget = function() {
    return this.target && 0 < this.target.health && GameField.isTargetInRadius(this.parent, this.target, this.parent.getRadius())
}
,
Gun.prototype.findTarget = function() {
    for (var t, e = [], i = [], s = 0; s < this.parent.parent.mobs.length; s++)
        t = this.parent.parent.mobs[s],
        GameField.isTargetInRadius(this.parent, t, this.parent.getRadius()) && 0 < this.parent.hitCoefficient[t.internalId] && 0 < t.health && e.push(t);
    for (s = 0; s < this.parent.guns.length; s++)
        this.parent.guns[s] != this && this.parent.guns[s].target && i.push(this.parent.guns[s].target);
    var a = null
      , o = -1;
    for (s = 0; s < e.length; s++)
        t = e[s],
        i.indexOf(t) < 0 && t.position.id > o && (o = (a = t).position.id);
    return a
}
,
Gun.prototype.tick = function(t, e) {
    if (t *= e || 1,
    0 <= this.attackDelay && (this.attackDelay -= t),
    this.flamethrower && this.flameView.visible && this.attackDelay <= 0 && (this.flameView.visible = !1),
    this.checkTarget() || (this.target = this.findTarget()),
    this.target) {
        var i = TD.normalizeAngle(Math.atan2(this.target.y - this.parent.y, this.target.x - this.parent.x));
        this.rotation = TD.normalizeAngle(this.rotation);
        var s = i - this.rotation
          , a = 0 < s ? s : 2 * Math.PI - this.rotation + i
          , o = s < 0 ? -s : this.rotation + 2 * Math.PI - i;
        s = Math.abs(s) * (a < o ? 1 : -1);
        var n = this.rotationSpeed * (t / 1e3) * Utils.sign(s);
        Math.abs(n) > Math.abs(s) && (n = s),
        this.rotation += n,
        this.rotation == i && this.attackDelay <= 0 && (this.attackDelay += this.parent.attackSpeed,
        this.flamethrower ? this.flameView.visible = !0 : this.fireShotView && !this.fireShotView.destroy || (this.fireShotView = new GunFire,
        this.fireShotView.setPosition(17, 0),
        this.fireShotView.rotation = Math.PI / 2,
        this.addChild(this.fireShotView)),
        this.parent.addBulletFromGun(this),
        this.target.setSlow(this.parent.getSlowEffect(this.target.internalId)),
        this.target.setDefense(this.parent.getDefenseEffect()))
    }
}
,
Utils.extend(TowerPlace, Sprite),
TowerPlace.prototype.place = function() {
    return this.stopDrag(),
    this.onplace && this.onplace(this.selectedTarget, this.config),
    !(this.destroy = !0)
}
,
TowerPlace.prototype.checkPlace = function() {
    if (this.valid = !1,
    this.selectedTarget = null,
    this.config.forSave) {
        for (var t = TD.ui.savedTowersBar.objects, e = 0; e < t.length; e++)
            if (t[e].config.towerId < 0 && t[e].config.opened && this.pointer.hitTest(t[e])) {
                this.valid = !0,
                this.selectedTarget = t[e];
                break
            }
    } else {
        var i = this.parent.spots;
        for (e = 0; e < i.length; e++)
            if (i[e].state != Spot.STATE_FAILED && (!i[e].tower || i[e].tower.health <= 0) && this.pointer.hitTest(i[e])) {
                this.valid = !0,
                this.selectedTarget = i[e];
                break
            }
    }
    this.update()
}
,
TowerPlace.prototype.update = function() {
    this.radiusView.fillColor = this.valid ? "rgba(0,255,0,0.5)" : "rgba(255,0,0,0.5)"
}
,
Utils.extend(Bullet, Sprite),
Bullet.prototype.setProps = function(t, e, i, s) {
    this.fromX = t,
    this.fromY = e,
    this.toX = i,
    this.toY = s;
    var a = this.toX - this.fromX
      , o = this.toY - this.fromY;
    this.pathLen = Math.sqrt(a * a + o * o),
    this.pathAngle = Math.atan2(o, a),
    this.rotation = this.pathAngle,
    this.setPosition(this.fromX, this.fromY)
}
,
Bullet.prototype.tick = function(t, e) {
    var i = (t *= e || 1) / 1e3 * this.speed;
    return this.pathTraversed += i,
    this.pathTraversed >= this.pathLen ? (this.setPosition(this.toX, this.toY),
    this.destroy = !0,
    this.config.sound && 1 == TD.getAttr(this.config.sound, "sound_at_end") && SoundsManager.play(TD.getAttr(this.config.sound, "name")),
    !0) : (0 < this.scaleMax && (this.scaleX = this.scaleY = this.scaleMin + Math.sin(Math.PI * (this.pathTraversed / this.pathLen)) * this.scaleMax),
    this.setPosition(this.x + Math.cos(this.pathAngle) * i, this.y + Math.sin(this.pathAngle) * i),
    this.rotation += t / 1e3 * this.rotateSpeed,
    !1)
}
,
Bullet.create = function(t, e, i) {
    return new Bullet(t,e,i)
}
,
Bullet.getConfigById = function(t) {
    for (var e in TD.configs.bullets)
        if (e == t)
            return TD.configs.bullets[e];
    throw Error("Bullet config [id=" + t + "] not found")
}
,
TowersHierarchy.prototype.getSlowEffect = function(t, e) {
    return 0 < this.slowTime[t] && this.slowUnitId[e] && Math.random() <= this.slowProbability[t] ? {
        val: this.slow[t],
        time: this.slowTime[t]
    } : null
}
,
TowersHierarchy.prototype.getDefenseEffect = function(t) {
    return this.defenseTime[t] ? {
        val: this.defense[t],
        time: this.defenseTime[t]
    } : null
}
,
TowersHierarchy.prototype.get = function(t) {
    var e = null;
    if (this.level == t)
        e = this;
    else
        for (var i = 0; i < this.children.length && !(e = this.children[i].get(t)); i++)
            ;
    return e
}
,
TowersHierarchy.prototype.getCost = function(t) {
    for (var e = 0, i = 0; i <= t; i++)
        e += this.price[i];
    return this.parent && (e += this.parent.getCost(2)),
    e
}
,
TowersHierarchy.prototype.getSellCost = function(t) {
    return Math.floor(this.getCost(t) * TowersHierarchy.sellCoefficient)
}
,
TowersHierarchy.prototype.getRepairCost = function(t) {
    return Math.floor(this.getCost(t) * TowersHierarchy.repairCoefficient)
}
,
TowersHierarchy.prototype.getVal = function(t, e) {
    return this[t] && this[t][e] ? this[t][e] : 0
}
,
TowersHierarchy.prototype.getAttackRadius = function(t) {
    return this.getVal("attackRadius", t)
}
,
TowersHierarchy.prototype.getAttackSpeed = function(t) {
    return this.getVal("attackSpeed", t)
}
,
TowersHierarchy.prototype.getExperience = function(t) {
    return this.getVal("experience", t)
}
,
TowersHierarchy.prototype.getHealth = function(t) {
    return this.getVal("health", t)
}
,
TowersHierarchy.prototype.getPlainCost = function(t) {
    return this.getVal("price", t)
}
,
TowersHierarchy.prototype.getCostShop = function(t) {
    return this.getVal("priceShop", t)
}
,
TowersHierarchy.heroTowerPriceCoefficient = 1,
TowersHierarchy.repairCoefficient = 1,
TowersHierarchy.sellCoefficient = 1,
TowersHierarchy.towers = [],
TowersHierarchy.load = function(t) {
    TowersHierarchy.heroTowerPriceCoefficient = TD.getAttr(t.towers, "hero_tower_price_coefficient", !0),
    TowersHierarchy.repairCoefficient = TD.getAttr(t.towers, "repair_coefficient", !0),
    TowersHierarchy.sellCoefficient = TD.getAttr(t.towers, "sell_coefficient", !0),
    TowersHierarchy.towers = [];
    var e = t.towers.level_0;
    for (var i in e)
        TowersHierarchy.towers.push(new TowersHierarchy(null,e[i]))
}
,
TowersHierarchy.get = function(t, e) {
    return TowersHierarchy.towers[t].get(e)
}
,
Utils.extend(MobsPortal, Sprite),
MobsPortal.prototype.tick = function(t, e) {
    if (t *= e || 1,
    this.spawnDelay -= t,
    this.spawnDelay <= 0) {
        this.spawnDelay += this.spawnBaseDelay;
        var i = {
            "@attributes": {
                enemy_id: this.mobsId,
                path_id: this.pathId,
                factor_health: 1,
                factor_hit_power: 1,
                factor_speed_attack: 1,
                factor_speed_move: 1
            }
        }
          , s = this.parent.addMob(i);
        s.position = Utils.clone(this.pathPos),
        s.prevPosition = {
            x: s.position.x,
            y: s.position.y
        },
        this.mobsCount--,
        this.mobsCount <= 0 && this.parent.removeMobsPortal(this)
    }
}
;
var UpgradesManager = {
    check: function(t, e, i) {
        var s = TD.gameData.upgrades[t];
        if (!s)
            return !1;
        var a = s[e];
        return null != a && void 0 !== a && i <= a
    },
    getSubLevel: function(t, e) {
        var i = TD.gameData.upgrades[t];
        if (!i)
            return -1;
        var s = i[e];
        return null == s || void 0 === s ? -1 : s
    },
    open: function(t, e, i) {
        TD.gameData.upgrades[t] || (TD.gameData.upgrades[t] = []),
        TD.gameData.upgrades[t][e] = i
    },
    checkComplete: function(t, e) {
        if (!UpgradesManager.check(t, e, 2))
            return !1;
        for (var i = TowersHierarchy.get(t, e), s = 0; s < i.children.length; s++)
            if (!UpgradesManager.checkComplete(t, i.children[s].level))
                return !1;
        return !0
    },
    isComplete: function(t) {
        return UpgradesManager.checkComplete(t, 0)
    }
}
  , AchievementsManager = {
    ENEMY_WILL_BE_HELD: 0,
    GREEN_BERET: 1,
    CONQUEST_OF_SNOW: 2,
    WAR_IN_THE_SANDBOX: 3,
    TOTAL_SWEEP: 4,
    UNDER_THE_COVER_OF_SNOWFALL: 5,
    STORM_IN_THE_SANDBOX: 6,
    ELITE_GUNNERS: 7,
    ELITE_FLAMETHROWER: 8,
    ELITE_ARTILLERY: 9,
    ELITE_ANTIAIRCRAFT_GUNNERS: 10,
    INCREDIBLE_ARMY: 11,
    SOLDIERS_AFTER: 12,
    BIG_BARRELS: 13,
    NO_CHANCE_TO_THE_ENEMY: 14,
    PERFECTION: 15
};
AchievementsManager.ALL_ACHIEVEMENTS = [AchievementsManager.ENEMY_WILL_BE_HELD, AchievementsManager.GREEN_BERET, AchievementsManager.CONQUEST_OF_SNOW, AchievementsManager.WAR_IN_THE_SANDBOX, AchievementsManager.TOTAL_SWEEP, AchievementsManager.UNDER_THE_COVER_OF_SNOWFALL, AchievementsManager.STORM_IN_THE_SANDBOX, AchievementsManager.ELITE_GUNNERS, AchievementsManager.ELITE_FLAMETHROWER, AchievementsManager.ELITE_ARTILLERY, AchievementsManager.ELITE_ANTIAIRCRAFT_GUNNERS, AchievementsManager.INCREDIBLE_ARMY, AchievementsManager.SOLDIERS_AFTER, AchievementsManager.BIG_BARRELS, AchievementsManager.NO_CHANCE_TO_THE_ENEMY, AchievementsManager.PERFECTION],
AchievementsManager.EVENT_LEVEL_COMPLETE = 0,
AchievementsManager.EVENT_MOB_KILL = 1,
AchievementsManager.EVENT_BUILD_TOWER = 2,
AchievementsManager.EVENT_BUY_UP = 3,
AchievementsManager.event = function(t, e) {
    var i = null;
    if (t == AchievementsManager.EVENT_LEVEL_COMPLETE) {
        TD.gameField.life >= TD.gameField.startLife && AchievementsManager.complete(AchievementsManager.ENEMY_WILL_BE_HELD);
        for (var s = [0, 0, 0, 0], a = [0, 0, 0, 0], o = 0; o < 4; o++)
            for (var n = 0; n < TD.gameData.levelResults[o].length; n++)
                s[o]++,
                TD.gameData.levelResults[o][n] && 2 <= TD.gameData.levelResults[o][n].award && a[o]++;
        if (s[0] >= TD.LEVELS_ON_CHAPTER && AchievementsManager.complete(AchievementsManager.GREEN_BERET),
        s[1] >= TD.LEVELS_ON_CHAPTER && AchievementsManager.complete(AchievementsManager.CONQUEST_OF_SNOW),
        s[2] >= TD.LEVELS_ON_CHAPTER && AchievementsManager.complete(AchievementsManager.WAR_IN_THE_SANDBOX),
        a[0] >= TD.LEVELS_ON_CHAPTER && AchievementsManager.complete(AchievementsManager.TOTAL_SWEEP),
        a[1] >= TD.LEVELS_ON_CHAPTER && AchievementsManager.complete(AchievementsManager.UNDER_THE_COVER_OF_SNOWFALL),
        a[2] >= TD.LEVELS_ON_CHAPTER && AchievementsManager.complete(AchievementsManager.STORM_IN_THE_SANDBOX),
        !(i = AchievementsManager.get(AchievementsManager.NO_CHANCE_TO_THE_ENEMY)).completed) {
            var r = TD.gameField.towers;
            if (r.length) {
                var h = 0;
                for (o = 0; o < r.length; o++)
                    2 <= r[o].subLevel && (TowersHierarchy.get(r[o].id, r[o].level).children.length || h++);
                7 <= h && AchievementsManager.complete(AchievementsManager.NO_CHANCE_TO_THE_ENEMY)
            }
        }
    }
    t == AchievementsManager.EVENT_MOB_KILL && ((i = AchievementsManager.get(AchievementsManager.SOLDIERS_AFTER)).completed || (AchievementsManager.update(AchievementsManager.SOLDIERS_AFTER),
    1e3 <= i.counter && AchievementsManager.complete(AchievementsManager.SOLDIERS_AFTER))),
    t == AchievementsManager.EVENT_BUILD_TOWER && 3 == e && ((i = AchievementsManager.get(AchievementsManager.BIG_BARRELS)).completed || (AchievementsManager.update(AchievementsManager.BIG_BARRELS),
    50 <= i.counter && AchievementsManager.complete(AchievementsManager.BIG_BARRELS))),
    t == AchievementsManager.EVENT_BUY_UP && (0 == e && UpgradesManager.isComplete(e) && AchievementsManager.complete(AchievementsManager.ELITE_GUNNERS),
    1 == e && UpgradesManager.isComplete(e) && AchievementsManager.complete(AchievementsManager.ELITE_FLAMETHROWER),
    2 == e && UpgradesManager.isComplete(e) && AchievementsManager.complete(AchievementsManager.ELITE_ARTILLERY),
    3 == e && UpgradesManager.isComplete(e) && AchievementsManager.complete(AchievementsManager.ELITE_ANTIAIRCRAFT_GUNNERS),
    UpgradesManager.isComplete(0) && UpgradesManager.isComplete(1) && UpgradesManager.isComplete(2) && UpgradesManager.isComplete(3) && AchievementsManager.complete(AchievementsManager.INCREDIBLE_ARMY));
    for (h = 0,
    o = 0; o < AchievementsManager.ALL_ACHIEVEMENTS.length; o++)
        AchievementsManager.ALL_ACHIEVEMENTS[o] != AchievementsManager.PERFECTION && (i = AchievementsManager.get(AchievementsManager.ALL_ACHIEVEMENTS[o])).completed && h++;
    h >= AchievementsManager.ALL_ACHIEVEMENTS.length - 1 && AchievementsManager.complete(AchievementsManager.PERFECTION)
}
,
AchievementsManager.get = function(t) {
    return TD.gameData.achievements[t] || AchievementsManager.register(t),
    TD.gameData.achievements[t]
}
,
AchievementsManager.check = function(t) {
    return AchievementsManager.get(t).completed
}
,
AchievementsManager.update = function(t) {
    var e = AchievementsManager.get(t);
    e.completed || (e.counter++,
    TD.save())
}
,
AchievementsManager.complete = function(t) {
    var e = AchievementsManager.get(t);
    e.completed || (e.completed = !0,
    TD.save(),
    Notification.show(t),
    ExternalAPI.exec("submitAward", t))
}
,
AchievementsManager.register = function(t) {
    TD.gameData.achievements[t] = {
        counter: 0,
        completed: !1
    }
}
;
var SoundsManager = {
    mixer: null,
    playedMusicFile: null,
    lastMusicFile: null,
    soundsPath: "sounds",
    config: null,
    load: function(t, e, i, s, a) {
        var o = new SoundsPreloader;
        o.minProgressVal = void 0 === s ? 0 : s,
        o.maxProgressVal = void 0 === a ? 100 : a,
        o.load(t, e, i)
    },
    start: function(t) {
        t && (SoundsManager.config = t),
        SoundsManager.mixer = new AudioMixer("sounds",15),
        SoundsManager.mixer.channels[0].locked = !0,
        ExternalAPI.exec("setMixer", SoundsManager.mixer)
    },
    click: function() {
        SoundsManager.play("sounds/ui_button_click.mp3")
    },
    getSoundConfig: function(t) {
        for (var e = 0; e < SoundsManager.config.length; e++)
            if (TD.getAttr(SoundsManager.config[e], "name") == t)
                return SoundsManager.config[e]
    },
    getSoundName: function(t) {
        return (t = (t = t.replace("sounds/", "")).split(".")).pop(),
        t.join(".")
    },
    play: function(t, e) {
        if ((!e || SoundsManager.playedMusicFile != t) && (e && (SoundsManager.lastMusicFile = t),
        (!e || !TD.gameData.musicDisabled) && (e || !TD.gameData.soundsDisabled) && (e || AudioMixer.isWebAudioSupport()))) {
            e && (SoundsManager.playedMusicFile = t);
            var i = t
              , s = SoundsManager.getSoundConfig(t);
            if (s && (i = TD.getAttr(s, "filename"),
            s.sound)) {
                var a = Math.floor(Math.random() * s.sound.length);
                1 < a && (i = TD.getAttr(s.sound[a], "filename"))
            }
            i = SoundsManager.getSoundName(i);
            if (s) {
                var o = TD.getAttr(s, "max_count", !0);
                if (0 < o) {
                    for (var n = 0, r = 0; r < SoundsManager.mixer.channels.length; r++)
                        SoundsManager.mixer.channels[r].busy && SoundsManager.mixer.channels[r].playedFileName == i && n++;
                    if (o <= n)
                        return
                }
                TD.getAttr(s, "timeout", !0)
            }
            var h = SoundsManager.mixer.play(i, e, !0, e ? 0 : null);
            h && (h.playedFileName = i)
        }
    },
    pauseMusic: function() {
        SoundsManager.mixer.channels[0].stop(),
        SoundsManager.playedMusicFile = null
    },
    resumeMusic: function() {
        !SoundsManager.playedMusicFile && SoundsManager.lastMusicFile && SoundsManager.play(SoundsManager.lastMusicFile, !0),
        SoundsManager.mixer.channels[0].resume()
    },
    stopAllSounds: function() {
        for (var t = 1; t < SoundsManager.mixer.channels.length; t++)
            SoundsManager.mixer.channels[t].stop()
    }
}
  , UI = {};
function CommonButton(t, e) {
    var i = UI.assetsLibrary.getAsset("common/buttons/" + t);
    Utils.callSuperConstructor(CommonButton, this, i.bitmap, i.width, i.height),
    this.icon = null,
    e && (this.icon = UI.assetsLibrary.getSprite("common/icons/" + e),
    this.icon.setPosition(-1, -1),
    this.addChild(this.icon)),
    this.addEventListener("click", SoundsManager.click)
}
function TextButton(t, e, i) {
    var s = UI.assetsLibrary.getAsset("common/buttons/" + t);
    Utils.callSuperConstructor(TextButton, this, s.bitmap, s.width, s.height),
    i || (i = "UITextRed"),
    this.textView = new window[i](0,0,e,!0),
    this.addChild(this.textView),
    this.addEventListener("click", SoundsManager.click)
}
function CheckBox(t) {
    var e = UI.assetsLibrary.getSprite("common/checkbox");
    Utils.callSuperConstructor(CheckBox, this, e.bitmap, e.width, e.height, 2),
    this.checked = !!t,
    this.onchange = null,
    this.addEventListener("click", Utils.proxy(this.handleClick, this)),
    this.update()
}
function ScrollBar(t, e) {
    Utils.callSuperConstructor(ScrollBar, this, null, 1, 1),
    this.min = t,
    this.pos = 0,
    this.max = e,
    this.pointer = null,
    this.lastPoinerY = 0,
    this.ochange = null,
    this.startScroll = Utils.proxy(this.startScroll, this),
    this.endScroll = Utils.proxy(this.endScroll, this),
    this.onadd = this.createChildren
}
function Alert(t, e) {
    Utils.callSuperConstructor(Alert, this, null, 1, 1),
    this.onadd = this.createChildren,
    this.text = t,
    this.confirmMode = e,
    this.callback = null,
    this.onYesClick = Utils.proxy(this.onYesClick, this),
    this.onNoClick = Utils.proxy(this.onNoClick, this)
}
function TowerButton(t) {
    this.config = t,
    this.oldConfig = t,
    Utils.callSuperConstructor(TowerButton, this, null, 50, 50),
    this.enabled = !0,
    this.showBack = !1,
    this.costView = new UITextSmall(0,0,"",!0),
    this.addChild(this.costView),
    this.checkEvent = Utils.proxy(this.checkEvent, this),
    this.addEventListener("click", this.checkEvent),
    this.addEventListener("mousedown", this.checkEvent),
    this.addEventListener("mouseup", this.checkEvent),
    this.back = new Sprite(null,1,1),
    this.back.setPosition(29, 44),
    this.addChild(this.back),
    this.alignAnchor(DisplayObjectContainer.ANCHOR_ALIGN_LEFT, DisplayObjectContainer.ANCHOR_VALIGN_TOP),
    this.refresh()
}
function CostView(t) {
    Utils.callSuperConstructor(CostView, this, null, 1, 1),
    this.textView = new UITextNumbersSmall(0,0,"",!0),
    this.textView.view.scale = .75,
    this.addChild(this.textView),
    this.update(t)
}
function NextWaveView() {
    Utils.callSuperConstructor(NextWaveView, this, null, 1, 1),
    this.icons = [],
    this.icons.push(UI.assetsLibrary.getSprite("game/infobar/infobar_9")),
    this.icons.push(UI.assetsLibrary.getSprite("game/infobar/infobar_10")),
    this.icons.push(UI.assetsLibrary.getSprite("game/infobar/infobar_11"));
    for (var t = 0; t < this.icons.length; t++)
        this.icons[t].visible = !1,
        this.addChild(this.icons[t]);
    this.text = new UITextNumbers(0,20,"",!0),
    this.text.view.scale = .35,
    this.addChild(this.text)
}
function WaveIcon(t) {
    var e, i = UI.assetsLibrary.getAsset("game/infobar/infobar_2");
    Utils.callSuperConstructor(WaveIcon, this, i.bitmap, i.width, i.height);
    for (var s = 0; s < t.m_path.length; s++)
        if (0 <= (e = t.m_path[s]).x && 0 <= e.y && e.x <= 512 && e.y <= 384) {
            this.setPosition(e.x, e.y);
            break
        }
    this.x < 24 && (this.x = 24),
    488 < this.x && (this.x = 488),
    this.y < 24 && (this.y = 24),
    360 < this.y && (this.y = 360);
    var a = UI.assetsLibrary.getSprite("game/infobar/infobar_0")
      , o = Math.atan2(e.y - this.y, e.x - this.x);
    a.rotation = o,
    a.setPosition(18 * Math.cos(o), 18 * Math.sin(o)),
    this.addChild(a),
    this.onadd = this.startAnimation
}
function TowerMenu(t) {
    Utils.callSuperConstructor(TowerMenu, this, null, 1, 1),
    this.tower = t,
    this.shader = new Graphics.circle(0,0,70),
    this.shader.fillColor = "rgba(255,255,255,0.5)",
    this.shader.color = "#fff",
    this.shader.lineWidth = 1,
    this.checkMouseEvent = Utils.proxy(this.checkMouseEvent, this),
    this.shader.onmousedown = this.checkMouseEvent,
    this.shader.onmouseup = this.checkMouseEvent,
    this.shader.onclick = this.checkMouseEvent,
    this.addChild(this.shader),
    this.buttons = [],
    this.addButton(new TowerMenuSellButton(t), Math.PI / 4 * 3, Utils.proxy(this.sell, this)),
    this.addButton(new TowerMenuRepairButton(t), Math.PI / 4, Utils.proxy(this.repair, this)),
    this.upButton1 = this.addButton(new TowerMenuUpgradeButton(t,0), Math.PI / 4 * 5, Utils.proxy(this.upgrade, this)),
    this.upButton2 = this.addButton(new TowerMenuUpgradeButton(t,1), Math.PI / 4 * 7, Utils.proxy(this.upgrade, this)),
    this.expView = new TowerExpView(t.nextExperience - t.prevExperience),
    this.expView.visible = !0,
    this.expView.setPosition(0, 16),
    this.addChild(this.expView)
}
function TowerMenuButton(t, e, i) {
    Utils.callSuperConstructor(TowerMenuButton, this, null, 45, 45),
    this.icon = new Sprite(null,1,1),
    this.icon.setPosition(0, -3),
    this.addChild(this.icon),
    i && this.updateIcon(i),
    this.normalTexture = UI.assetsLibrary.getSprite("game/infobar/" + t),
    this.addChild(this.normalTexture),
    this.disabledTexture = UI.assetsLibrary.getSprite("game/infobar/" + e),
    this.addChild(this.disabledTexture),
    this.disabledTexture.visible = !1,
    this.costView = new UITextSmall(1,6,"",!0),
    this.addChild(this.costView),
    this.enabled = !0,
    this.onclick = Utils.proxy(this.controlEvents, this)
}
function TowerMenuSellButton(t) {
    Utils.callSuperConstructor(TowerMenuSellButton, this, "tower_button_26", "tower_button_28"),
    this.tower = t,
    this.costView.y = 7
}
function TowerMenuRepairButton(t) {
    Utils.callSuperConstructor(TowerMenuRepairButton, this, "tower_button_23", "tower_button_25"),
    this.tower = t
}
function TowerMenuUpgradeButton(t, e) {
    this.tower = t,
    this.ix = e,
    Utils.callSuperConstructor(TowerMenuUpgradeButton, this, "tower_button_21", "tower_button_22"),
    this.costView.x = -1.5,
    this.costView.y = 14
}
function WaveCounterView(t) {
    Utils.callSuperConstructor(WaveCounterView, this, null, 1, 1),
    t += "";
    for (var e, i = [], s = 0, a = 0; a < t.length; a++)
        e = UI.assetsLibrary.getSprite("game/digits/digits_0_9_" + t.substr(a, 1)),
        i.push(e),
        s += e.width;
    var o = -s / 2;
    for (a = 0; a < i.length; a++)
        (e = i[a]).setPosition(o + e.width / 2, 0),
        this.addChild(e),
        o += e.width;
    this.scaleX = this.scaleY = .3
}
function ScreenScroller(t) {
    t || (t = 2),
    Utils.callSuperConstructor(ScreenScroller, this, null, 512, 384),
    this.scroller = new Sprite(null,512 * (t + 1),384),
    this.addChild(this.scroller),
    this.currentPage = 0,
    this.pages = t,
    this.startScrollX = 0,
    this.scroller.onmousedown = Utils.proxy(this.startScroll, this),
    this.scroller.onmouseup = Utils.proxy(this.stopScroll, this),
    this.scroller.onmousemove = Utils.proxy(this.contollScroll, this),
    this.pagesDots = [];
    for (var e, i = -16 * t / 2 + 8, s = 0; s < t; s++)
        (e = UI.assetsLibrary.getSprite("missionselector/dots_0")).currentLayer = 0 == s ? 0 : 1,
        e.setPosition(i, 180),
        this.addChild(e),
        this.pagesDots.push(e),
        i += 16;
    this.pageWidth = 512
}
function MainMenu() {
    Utils.callSuperConstructor(MainMenu, this, null, 1, 1),
    this.particlesLayer = null,
    this.particlesEmitters = [],
    this.onadd = this.createChildren
}
function ChapterSelect() {
    Utils.callSuperConstructor(ChapterSelect, this, null, 1, 1),
    this.onadd = this.createChildren,
    this.onChapterSelect = Utils.proxy(this.onChapterSelect, this),
    this.onShowStarsShop = Utils.proxy(this.onShowStarsShop, this)
}
function ChapterIcon(t) {
    Utils.callSuperConstructor(ChapterIcon, this, null, 230, 200),
    this.world = t,
    this.worldId = TD.getAttr(t, "world_number", !0);
    var e = UI.getSpriteByTexture(TD.getAttr(t.icon, "texture"));
    this.addChild(e);
    var i = new UITextGold2(0,-75,"",!0);
    if (i.view.scale = .7,
    i.update(I18.f(TD.getAttr(t.title, "string"))),
    this.addChild(i),
    this.enabled = !!TD.gameData.openedWorlds[this.worldId],
    !this.enabled) {
        var s = UI.assetsLibrary.getSprite("missionselector/worlds_icons_3");
        this.addChild(s)
    }
    this.onadd = this.loadData
}
function LevelSelect(t) {
    Utils.callSuperConstructor(LevelSelect, this, null, 1, 1),
    void 0 === t && (t = LevelSelect.lastChapter),
    this.chapter = t,
    LevelSelect.lastChapter = t,
    this.world = null;
    for (var e, i = TD.configs.worlds.worlds.world, s = 0; s < i.length; s++)
        if (e = i[s],
        TD.getAttr(e, "world_number", !0) == t) {
            this.world = e;
            break
        }
    this.onadd = this.createChildren,
    this.startLevel = Utils.proxy(this.startLevel, this),
    this.onShowStarsShop = Utils.proxy(this.onShowStarsShop, this)
}
function LevelButton(t, e, i) {
    var s = UI.assetsLibrary.getAsset("missionselector/background_2");
    if (Utils.callSuperConstructor(LevelButton, this, s.bitmap, s.width, s.height),
    this.levelId = t,
    this.enabled = e,
    this.enabled) {
        var a = new UITextGold2(0,0,"",!0);
        a.view.scale = .5,
        a.update(this.levelId),
        this.addChild(a),
        this.currentLayer = i ? i.award + 2 : 1
    } else
        this.currentLayer = 0;
    switch (this.currentLayer) {
    case 1:
    case 2:
        a.x = -2.5;
        break;
    case 3:
        a.x = -4;
        break;
    case 4:
        a.x = -4.5
    }
    this.addEventListener("click", SoundsManager.click)
}
function LevelWin() {
    var t = UI.assetsLibrary.getSprite("dialogs/win");
    Utils.callSuperConstructor(LevelWin, this, t.bitmap, t.width, t.height),
    this.onadd = this.createChildren,
    this.valsToAnimate = [],
    this.currentAnimatedVal = -1,
    this.animateVals = Utils.proxy(this.animateVals, this)
}
function LevelLoose() {
    var t = UI.assetsLibrary.getAsset("dialogs/loose");
    Utils.callSuperConstructor(LevelLoose, this, t.bitmap, t.width, t.height),
    this.onShowShop = Utils.proxy(this.onShowShop, this),
    this.onadd = this.createChildren
}
function LanguageSelection() {
    Utils.callSuperConstructor(LanguageSelection, this, null, 1, 1),
    this.onadd = this.createChildren,
    this.onSelect = Utils.proxy(this.onSelect, this)
}
function Notification(t) {
    var e = UI.assetsLibrary.getAsset("dialogs/notification");
    Utils.callSuperConstructor(Notification, this, e.bitmap, e.width, e.height),
    this.startMoveOut = Utils.proxy(this.startMoveOut, this),
    this.moveOut = Utils.proxy(this.moveOut, this),
    this.moveEnd = Utils.proxy(this.moveEnd, this),
    this.createChildren = Utils.proxy(this.createChildren, this),
    this.id = t,
    this.setPosition(-1024, -1024),
    this.onadd = this.loadConfig
}
function Shop() {
    Utils.callSuperConstructor(Shop, this, null, 1, 1),
    this.config = null,
    this.pages = [],
    this.closeCallback = null,
    this.onTowerButtonClick = Utils.proxy(this.onTowerButtonClick, this),
    this.shopPanel = null,
    this.shopBonusPanel = null,
    this.bonusesPage = null,
    this.nextButtonNeedAdd = !1,
    this.buyButton = null,
    this.onadd = this.loadConfig,
    this.selectFrame = null,
    this.selectBonusFrame = null
}
function ShopTowersPage(t, e, s) {
    Utils.callSuperConstructor(ShopTowersPage, this, null, 1, 1),
    this.active = !0,
    this.back = UI.getSpriteByTexture(TD.getAttr(t.background, "texture"));
    var a, o = TD.parsePositionString(TD.getAttr(t.background, "position"));
    for (i in this.back.setPosition(o.x - .5, o.y - (1 == e ? .5 : 0)),
    TD.setHotSpot(this.back, TD.getAttr(t.background, "hotspot")),
    this.back.setStatic(!0),
    this.addChild(this.back),
    this.buttons = [],
    ix = 0,
    t.towers)
        a = new ShopTowerButton(t.towers[i],e,ix),
        this.addChild(a),
        this.buttons.push(a),
        a.onclick = s,
        ix++;
    this.isVisible = !1,
    this.update()
}
function ShopTowerButton(t, e, i) {
    this.config = t,
    this.towerId = e,
    this.towerLevel = i,
    Utils.callSuperConstructor(ShopTowerButton, this, null, 1, 1);
    var s, a = TowersHierarchy.get(e, i), o = TD.getPerk(a.iconName);
    this.icon = UI.getSpriteByTexture(TD.getAttr(o.icon_shop, "texture")),
    this.addChild(this.icon),
    this.setPosition(TD.parsePositionString(TD.getAttr(this.config.button.out, "position"))),
    this.arrow = null,
    t.arrow && (this.arrow = UI.getSpriteByTexture(TD.getAttr(t.arrow, "texture")),
    this.arrow.setPosition(0, 0),
    TD.setHotSpot(this.arrow, TD.getAttr(t.arrow, "hotspot")),
    this.addChild(this.arrow)),
    this.frame = new Sprite(null,1,1),
    this.addChild(this.frame),
    this.subLevelIcons = [];
    for (var n = 0; n < 3; n++)
        (s = UI.getSpriteByTexture(TD.getAttr(o.icon_rank_big, "texture"))).setPosition(10 * n - 14, 26),
        s.setPropScale(.6),
        s.currentLayer = n,
        this.addChild(s),
        this.subLevelIcons.push(s);
    this.updateSublevels(),
    this.setStatic(!0),
    this.enabled = null,
    this.setEnabled(!0),
    this.addEventListener("click", SoundsManager.click)
}
function ShopPanel() {
    Utils.callSuperConstructor(ShopPanel, this, null, 154, 190),
    this.abilityIcons = [],
    this.title = null,
    this.description = null,
    this.errorText = null,
    this.rankIcon = null,
    this.buyButton = null,
    this.stars = null,
    this.source = null,
    this.subLevel = -1,
    this.price = 0,
    this.onBuy = Utils.proxy(this.onBuy, this)
}
function Achievements(t, e) {
    Utils.callSuperConstructor(Achievements, this, null, 1, 1),
    this.createChildren = Utils.proxy(this.createChildren, this),
    this.update = Utils.proxy(this.update, this),
    this.itemsView = null,
    this.scrollBar = null,
    this.x = t,
    this.y = e,
    this.onadd = this.loadConfig
}
function AchievementItem(t, e) {
    if (Utils.callSuperConstructor(AchievementItem, this, null, 350, 34),
    t) {
        if (t.image) {
            var i = UI.getSpriteByTexture(TD.getAttr(t.image, "texture"));
            i.setPosition(-160, 0),
            this.addChild(i)
        }
        if (t.title)
            (s = new UITextColor(-140,-8,I18.f(TD.getAttr(t.title, "string")),e ? UITextColor.defaultColor : "#aaa")).view.setScaleToFitContainer(285, .2, .7),
            s.view.refresh(),
            this.addChild(s);
        if (t.message) {
            var s = new UITextColor(-140,3,I18.f(TD.getAttr(t.message, "string")),e ? UITextColor.defaultColor : "#aaa");
            this.addChild(s),
            s.view.maxWidth = 600,
            s.view.lineSpacing = -8,
            s.view.setScaleToFitContainer(285, .1, .5),
            s.view.refresh()
        }
    }
    e || (this.opacity = .6)
}
function Options() {
    Utils.callSuperConstructor(Options, this, null, 1, 1),
    this.onadd = this.createChildren
}
function LevelBanner(t, e, i) {
    var s = UI.assetsLibrary.getAsset("game/infobar/" + t);
    Utils.callSuperConstructor(LevelBanner, this, s.bitmap, s.width, s.height);
    var a = new UITextGold(0,3,e,!0);
    a.view.valign = BitmapText.VALIGN_MIDDLE,
    a.view.lineSpacing = -8,
    a.setScale(.8),
    this.addChild(a),
    this.callback = i,
    this.opacity = 0,
    this.onadd = Utils.proxy(this.startAnimation, this)
}
function InGameMenu() {
    Utils.callSuperConstructor(InGameMenu, this, null, 1, 1),
    this.onadd = this.createChildren
}
function NewGame() {
    Utils.callSuperConstructor(NewGame, this, null, 1, 1),
    this.onadd = this.createChildren,
    this.checkBoxEasy = null,
    this.checkBoxHard = null,
    this.changeComplexity = Utils.proxy(this.changeComplexity, this),
    this.complexity = TD.gameData.complexity
}
function Hint(t) {
    Utils.callSuperConstructor(Hint, this, null, 1, 1),
    this.hintId = 0,
    this.text = t,
    this.back = null,
    this.arrow = null,
    this.shader = null,
    this.towerView = null,
    this.towerViewFromX = 0,
    this.towerViewFromY = 0,
    this.towerViewToX = 0,
    this.towerViewToY = 0,
    this.handView = null,
    this.closeCallback = null,
    this.targetObject = null,
    this.playTowerAnimation = Utils.proxy(this.playTowerAnimation, this),
    this.replayTowerAnimation = Utils.proxy(this.replayTowerAnimation, this),
    this.moveHandFrom = Utils.proxy(this.moveHandFrom, this),
    this.moveHandTo = Utils.proxy(this.moveHandTo, this),
    this.mouseControl = Utils.proxy(this.mouseControl, this),
    this.onadd = this.createChildren
}
function Comics() {
    var t = UI.assetsLibrary.getSprite("comics/back");
    Utils.callSuperConstructor(Comics, this, t.bitmap, t.width, t.height);
    var e = UI.assetsLibrary.getSprite("comics/anim");
    e.setPosition(98, -18),
    e.rotation = -.18,
    e.play(),
    e.changeFrameDelay = 500,
    this.addChild(e),
    this.onclick = TD.showChapterSelect,
    this.onadd = Utils.proxy(this.startAnimation, this)
}
function LevelPreloader() {
    Utils.callSuperConstructor(LevelPreloader, this, null, 1, 1),
    this.showProgress = Utils.proxy(this.showProgress, this),
    this.onadd = this.createChildren
}
function GunFire() {
    var t = UI.assetsLibrary.getAsset("game/enemies/animation/fire_shot");
    Utils.callSuperConstructor(GunFire, this, t.bitmap, t.width, t.height, t.frames, t.layers),
    this.setPropScale(.5),
    this.onenterframe = GunFire.controlAnimation
}
function StarsShop() {
    Utils.callSuperConstructor(StarsShop, this, null, 1, 1),
    this.closeCallback = null,
    this.stars = null,
    this.actionText = null,
    this.purchase = Utils.proxy(this.purchase, this),
    this.onadd = this.createChildren,
    this.onenterframe = Utils.proxy(this.tickAction, this)
}
function ShopBonusPage(t, e) {
    Utils.callSuperConstructor(ShopBonusPage, this, null, 1, 1),
    this.active = !0,
    this.back = UI.getSpriteByTexture(TD.getAttr(t.background, "texture"));
    var s, a = TD.parsePositionString(TD.getAttr(t.background, "position"));
    for (i in this.back.setPosition(a.x - .5, a.y - .5),
    TD.setHotSpot(this.back, TD.getAttr(t.background, "hotspot")),
    this.back.setStatic(!0),
    this.addChild(this.back),
    this.buttons = [],
    s = UI.getSpriteByTexture(TD.getAttr(t.icon, "texture")),
    a = TD.parsePositionString(TD.getAttr(t.icon, "position")),
    this.addChild(s),
    s.onclick = function(t) {
        SoundsManager.click(),
        e(t)
    }
    ,
    s.setPosition(a),
    this.buttons.push(s),
    t.bonuses)
        s = new ShopBonusButton(t.bonuses[i]),
        this.addChild(s),
        this.buttons.push(s),
        s.onclick = e;
    this.isVisible = !1,
    this.update()
}
function ShopBonusButton(t) {
    this.config = t;
    var e = UI.getAssetByTexture(TD.getAttr(this.config.button.out, "texture"));
    Utils.callSuperConstructor(ShopTowerButton, this, e.bitmap, e.width, e.height),
    this.setPosition(TD.parsePositionString(TD.getAttr(this.config.button.out, "position"))),
    this.costText = new UITextRed(2,22,TD.getAttr(this.config, "price"),!0),
    this.addChild(this.costText),
    this.costText.setScale(.5),
    this.countText = new UITextRed(20,-17.5,"",!0),
    this.addChild(this.countText),
    this.countText.setScale(.5),
    this.enabled = null,
    this.setEnabled(!0),
    this.addEventListener("click", SoundsManager.click)
}
function ShopBonusPanel() {
    Utils.callSuperConstructor(ShopBonusPanel, this, null, 154, 190),
    this.title = null,
    this.description = null,
    this.errorText = null,
    this.unlockText = null,
    this.unlockButton = null,
    this.unlockCountText = null,
    this.buyButton1 = null,
    this.buyButton2 = null,
    this.countText1 = null,
    this.countText2 = null,
    this.stars = null,
    this.source = null,
    this.onBuy1 = Utils.proxy(this.onBuy1, this),
    this.onBuy2 = Utils.proxy(this.onBuy2, this),
    this.onUnlock = Utils.proxy(this.onUnlock, this)
}
function BonusButton(t) {
    this.id = t,
    this.config = TD.configs.bonuses[t],
    Utils.callSuperConstructor(BonusButton, this, null, 40, 40),
    this.enabled = TD.isBonusEnabled(t),
    this.busyTimeout = 0,
    this.baseTimeout = 1e3 * TD.configs.bonuses[t].timeout,
    this.icon = null,
    this.countBox = null,
    this.countText = null,
    this.coolDownView = null,
    this.lockIcon = null,
    this.active = !1,
    this.createChildren(),
    this.update(),
    this.onclick = Utils.proxy(this.use, this),
    this.fadeIn = Utils.proxy(this.fadeIn, this),
    this.fadeOut = Utils.proxy(this.fadeOut, this)
}
function ShopButton() {
    Utils.callSuperConstructor(ShopButton, this, "button_medium_square", "action"),
    this.icon.setPosition(-1, 7),
    this.actionText = new UITextRed(-2,-10,"",!0),
    this.addChild(this.actionText),
    this.actionText.setScale(.45),
    this.onenterframe = Utils.proxy(this.update, this)
}
function InGameShop(t) {
    Utils.callSuperConstructor(InGameShop, this, null, 1, 1),
    this.onadd = this.createChildren,
    this.lifeText = null,
    this.starsText = null,
    this.moneyText = null,
    this.buttons = [],
    this.closeCallback = t,
    this.buy = Utils.proxy(this.buy, this),
    this.onShowStarsShop = Utils.proxy(this.onShowStarsShop, this)
}
function UIText(t, e, i, s, a, o) {
    Utils.callSuperConstructor(UIText, this, null, 1, 1),
    this.view = new BitmapText(a,o),
    (this.view.parent = this).setPosition(t, e),
    s && (this.view.align = BitmapText.ALIGN_CENTER),
    this.textTo = "",
    this.animateTween = null,
    this.onAnimateFinish = null,
    this.maxWidth = 0,
    this.verticalAlignMiddle = !0,
    this.skin = "default",
    this.textPrefix = "",
    this.text = "",
    this.update(i)
}
function UITextNumbers(t, e, i, s) {
    Utils.callSuperConstructor(UITextNumbers, this, t, e, i, s, UI.assetsLibrary.getBitmap("fonts/number_font"), UI.fonts.number_font)
}
function UITextNumbersSmall(t, e, i, s) {
    Utils.callSuperConstructor(UITextNumbersSmall, this, t, e, i, s, UI.assetsLibrary.getBitmap("fonts/number_font_small"), UI.fonts.number_font_small)
}
function UITextSmall(t, e, i, s) {
    Utils.callSuperConstructor(UITextSmall, this, t, e, i, s, UI.assetsLibrary.getBitmap("fonts/font_shilda1"), UI.fonts.font_shilda1)
}
function UITextSmallBlack(t, e, i, s) {
    Utils.callSuperConstructor(UITextSmallBlack, this, t, e, i, s, UI.assetsLibrary.getBitmap("fonts/font_shilda"), UI.fonts.font_shilda)
}
function UITextGold(t, e, i, s) {
    Utils.callSuperConstructor(UITextGold, this, t, e, i, s, UI.assetsLibrary.getBitmap("fonts/soldier_font3"), UI.fonts.soldier_font3)
}
function UITextGold2(t, e, i, s) {
    Utils.callSuperConstructor(UITextGold2, this, t, e, i, s, UI.assetsLibrary.getBitmap("fonts/soldier_font4"), UI.fonts.soldier_font4)
}
function UITextColor(t, e, i, s, a) {
    Utils.callSuperConstructor(UITextColor, this, t, e, i, a, UITextColor.getBitmap(s), UI.fonts.soldier_font5),
    this.view.lineSpacing = -4,
    this.view.refresh()
}
function UITextRed(t, e, i, s) {
    Utils.callSuperConstructor(UITextRed, this, t, e, i, s, UI.assetsLibrary.getBitmap("fonts/soldier_font1"), UI.fonts.soldier_font1)
}
function UITextYellow(t, e, i, s) {
    Utils.callSuperConstructor(UITextYellow, this, t, e, i, s, UI.assetsLibrary.getBitmap("fonts/soldier_font6"), UI.fonts.soldier_font6)
}
UI.assetsLibrary = null,
UI.fonts = {},
UI.init = function(t, e, i, s) {
    BitmapText.LINES_DELIMITER = "/n";
    for (var a = []; ASSETS.length && (!SPLIT_LOADING || 1 != ASSETS.length); )
        a = a.concat(ASSETS.shift());
    UI.assetsLibrary = new AssetsLibrary("images",Utils.globalScale,a),
    UI.assetsLibrary.load(t, e, i, s)
}
,
UI.loadMoreAssets = function() {
    for (var t = []; ASSETS.length; )
        t = t.concat(ASSETS.shift());
    t.length && (UI.moreAssetsLoader = new AssetsLibrary("images",Utils.globalScale,t),
    UI.moreAssetsLoader.load(UI.finishLoadMoreAssets))
}
,
UI.finishLoadMoreAssets = function(t) {
    for (var e in t)
        UI.assetsLibrary.items[e] = t[e];
    "function" == typeof UI.moreAssetsLoader.loadFinish && UI.moreAssetsLoader.loadFinish(),
    UI.moreAssetsLoader = null
}
,
UI.getAssetByTexture = function(t) {
    var e = t.split(".");
    return e.pop(),
    UI.assetsLibrary.getAsset(e.join("."))
}
,
UI.getSpriteByTexture = function(t) {
    var e = t.split(".");
    return e.pop(),
    UI.assetsLibrary.getSprite(e.join("."))
}
,
UI.preventEvent = function() {
    return !1
}
,
UI.preventAllEvents = function(t) {
    t.onclick = UI.preventEvent,
    t.onmousedown = UI.preventEvent,
    t.onmouseup = UI.preventEvent,
    t.onmousemove = UI.preventEvent
}
,
UI.playSimpleSound = function() {}
,
UI.playEffect = function(t, e, i, s, a) {
    void 0 === a && (a = 1);
    var o = UI.assetsLibrary.getSprite(t);
    o.setPosition(e, i),
    o.setPropScale(a),
    s.addChild(o),
    o.addEventListener("changeframe", function() {
        o.currentFrameX >= o.framesCount - 1 && (o.destroy = !0)
    })
}
,
Utils.extend(CommonButton, Sprite),
Utils.extend(TextButton, Sprite),
TextButton.prototype.update = function(t) {
    this.textView.update(t)
}
,
Utils.extend(CheckBox, Sprite),
CheckBox.prototype.setChecked = function(t) {
    this.checked = !!t,
    this.update(),
    this.dispatchEvent("change", {
        target: this
    })
}
,
CheckBox.prototype.handleClick = function() {
    this.checked = !this.checked,
    this.update(),
    this.dispatchEvent("change", {
        target: this
    }),
    SoundsManager.click()
}
,
CheckBox.prototype.update = function() {
    this.gotoAndStop(this.checked ? 1 : 0),
    this.static && this.stage && this.stage.refreshBackground()
}
,
Utils.extend(ScrollBar, Sprite),
ScrollBar.prototype.createChildren = function() {
    var t = UI.assetsLibrary.getSprite("common/scroll_bg");
    t.onclick = this.onBarClick,
    this.addChild(t),
    this.pointer = UI.assetsLibrary.getSprite("common/scroll_point"),
    this.pointer.onmousedown = this.startScroll,
    this.pointer.onenterframe = this.alignScroll,
    this.pointer.onmouseup = this.endScroll,
    this.addChild(this.pointer),
    this.setPointerPosition(this.pos)
}
,
ScrollBar.prototype.onBarClick = function(t) {
    var e = t.y;
    t.target.parent.pointer.y = e,
    t.target.parent.alignScroll({
        target: t.target.parent.pointer
    })
}
,
ScrollBar.prototype.setPointerPosition = function(t) {
    t < this.min && (t = this.min),
    t > this.max && (t = this.max);
    var e = this.max - this.min
      , i = e ? t / e : 0
      , s = (ScrollBar.MAX_POINER_POS - ScrollBar.MIN_POINER_POS) * i + ScrollBar.MIN_POINER_POS;
    this.pos = i,
    this.lastPoinerY = s,
    this.pointer.setPosition(0, s)
}
,
ScrollBar.prototype.startScroll = function(t) {
    return this.pointer.startDrag(t.x, t.y),
    !1
}
,
ScrollBar.prototype.endScroll = function(t) {
    return this.pointer.stopDrag(),
    !1
}
,
ScrollBar.prototype.alignScroll = function(t) {
    var e = t.target
      , i = t.target.parent;
    if (e.y > ScrollBar.MAX_POINER_POS && (e.y = ScrollBar.MAX_POINER_POS),
    e.y < ScrollBar.MIN_POINER_POS && (e.y = ScrollBar.MIN_POINER_POS),
    e.x = 0,
    i.lastPoinerY != e.y) {
        var s = e.y - ScrollBar.MIN_POINER_POS;
        s /= ScrollBar.MAX_POINER_POS - ScrollBar.MIN_POINER_POS,
        i.pos = s,
        i.onchange && i.onchange({
            target: i,
            pos: s
        }),
        i.lastPoinerY = e.y
    }
}
,
ScrollBar.MIN_POINER_POS = -72,
ScrollBar.MAX_POINER_POS = 72,
Utils.extend(Alert, Sprite),
Alert.prototype.createChildren = function() {
    this.setRelativePosition(0, 0);
    var t = new Sprite(null,this.stage.screenWidth,this.stage.screenHeight);
    t.fillColor = "rgba(0,0,0,0.7)",
    UI.preventAllEvents(t),
    this.addChild(t);
    var e = UI.assetsLibrary.getSprite("dialogs/message");
    this.addChild(e);
    var i = new UITextColor(0,-12,this.text,UITextColor.defaultColor,!0);
    i.view.maxWidth = 280,
    i.view.valign = BitmapText.VALIGN_MIDDLE,
    i.setScale(.6),
    this.addChild(i);
    var s = new CommonButton("button_confirm_no","ico_yes_red");
    if (s.setPosition(this.confirmMode ? 80 : 0, 32),
    s.onclick = this.onYesClick,
    this.addChild(s),
    this.confirmMode) {
        var a = new CommonButton("button_confirm_no","ico_no");
        a.setPosition(-80, 32),
        a.onclick = this.onNoClick,
        this.addChild(a)
    }
}
,
Alert.prototype.onYesClick = function() {
    SoundsManager.click(),
    this.callback && this.callback(!0),
    this.destroy = !0
}
,
Alert.prototype.onNoClick = function() {
    this.callback && this.callback(!1),
    this.destroy = !0,
    this.dispatchEvent("noclicked", {
        target: this
    })
}
,
Alert.create = function(t, e, i) {
    var s = new Alert(t,i);
    return s.callback = e,
    TD.stage.addChild(s),
    s
}
,
Utils.extend(TowerButton, Sprite),
TowerButton.prototype.checkEvent = function() {
    return this.enabled
}
,
TowerButton.prototype.setEnabled = function(t) {
    this.enabled != t && (this.enabled = t,
    this.refresh())
}
,
TowerButton.prototype.getTowerConfig = function() {
    var t = 0;
    for (var e in TD.configs.towersBar.slots) {
        if (t == this.config.towerId)
            return TD.configs.towersBar.slots[e];
        t++
    }
}
,
TowerButton.prototype.refresh = function() {
    if (this.config.towerId < 0) {
        this.setBitmap(null),
        this.costView.visible = !1;
        var t = UI.assetsLibrary.getAsset(this.config.opened ? "game/infobar/infobar_12" : "game/infobar/infobar_13");
        this.back.bitmap = t.bitmap,
        this.back.width = t.width,
        this.back.height = t.height,
        this.back.visible = this.showBack
    } else {
        var e = this.getTowerConfig()
          , i = TD.parsePositionString(TD.getAttr(e.price, "position"));
        this.costView.setPosition(i.x + 1, i.y - 7),
        this.config.cost = TowersHierarchy.get(this.config.towerId, 0).getCost(0),
        this.config.stored && (this.config.cost = Math.round(this.config.cost * TowersHierarchy.heroTowerPriceCoefficient)),
        this.costView.update(this.config.cost),
        this.costView.setSkin(this.enabled ? "" : "disabled"),
        this.setBitmap(this.enabled ? TD.getAttr(e.button.out, "texture") : TD.getAttr(e.button.disabled, "texture")),
        this.costView.visible = !0,
        this.back.visible = !1
    }
}
,
TowerButton.prototype.setBitmap = function(t) {
    if (t) {
        var e = UI.getAssetByTexture(t);
        this.bitmap = e.bitmap,
        this.width = e.width,
        this.height = e.height,
        this.frames = e.frames,
        this.layers = e.layers,
        this.alignAnchor(DisplayObjectContainer.ANCHOR_ALIGN_LEFT, DisplayObjectContainer.ANCHOR_VALIGN_TOP)
    } else
        this.bitmap = null
}
,
Utils.extend(CostView, Sprite),
CostView.prototype.update = function(t) {
    this.value = t,
    this.textView.update("@" + this.value)
}
,
CostView.prototype.bubble = function() {
    this.moveTo(this.x, this.y - 20, 1e3, Easing.cubic.easeOut, this.endBubbleMove)
}
,
CostView.prototype.endBubbleMove = function(t) {
    t.target.obj.fadeTo(0, 200, null, t.target.obj.endBubbleShow)
}
,
CostView.prototype.endBubbleShow = function(t) {
    t.target.obj.destroy = !0
}
,
Utils.extend(NextWaveView, Sprite),
NextWaveView.prototype.setWave = function(t, e, i) {
    for (var s = 0; s < this.icons.length; s++)
        this.icons[s].visible = !1;
    var a, o, n = 0;
    for (s = 0; s < t.enemies.enemy.length; s++)
        a = t.enemies.enemy[s],
        "soldier" != (o = TD.getAttr(a, "enemy_id")) && 0 == n && (n = 1),
        "fighter" != o && "airship" != o && "bomber" != o || (n = 2);
    this.icons[n].visible = !0,
    2 == n && SoundsManager.play("wave_start_aircraft"),
    this.text.update(e + "/" + i)
}
,
Utils.extend(WaveIcon, Sprite),
WaveIcon.prototype.startAnimation = function(t) {
    t.target.fadeOut()
}
,
WaveIcon.prototype.fadeOut = function(t) {
    var e = t ? t.target.obj : this;
    e.fadeTo(0, 1e3, null, e.fadeIn)
}
,
WaveIcon.prototype.fadeIn = function(t) {
    var e = t ? t.target.obj : this;
    e.fadeTo(1, 1e3, null, e.fadeOut)
}
,
Utils.extend(TowerMenu, Sprite),
TowerMenu.prototype.checkMouseEvent = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y) > this.shader.radius
}
,
TowerMenu.prototype.addButton = function(t, e, i) {
    return this.setButtonPosition(t, e),
    this.addChild(t),
    i && t.addEventListener("click", i),
    this.buttons.push(t),
    t
}
,
TowerMenu.prototype.setButtonPosition = function(t, e) {
    t.setPosition(48 * Math.cos(e), 48 * Math.sin(e))
}
,
TowerMenu.prototype.update = function() {
    for (var t = 0; t < this.buttons.length; t++)
        this.buttons[t].update();
    var e = 0;
    this.upButton1.visible && e++,
    this.upButton2.visible && e++,
    2 == e && (this.setButtonPosition(this.upButton1, Math.PI / 4 * 5),
    this.setButtonPosition(this.upButton2, Math.PI / 4 * 7)),
    1 == e && (this.upButton1.visible && this.setButtonPosition(this.upButton1, Math.PI / 4 * 6),
    this.upButton2.visible && this.setButtonPosition(this.upButton2, Math.PI / 4 * 6)),
    this.expView.maxVal = this.tower.nextExperience - this.tower.prevExperience,
    this.expView.update(this.tower.experience - this.tower.prevExperience)
}
,
TowerMenu.prototype.sell = function() {
    var e = TD.gameField.paused;
    TD.pauseGame(),
    Alert.create(I18.f("Вы уверены,/nчто хотите продать башню?"), Utils.proxy(function(t) {
        t && (this.tower.sell(),
        TD.hideTowerMenu()),
        e || TD.resumeGame()
    }, this), !0)
}
,
TowerMenu.prototype.repair = function() {
    this.tower.repair(),
    TD.hideTowerMenu()
}
,
TowerMenu.prototype.upgrade = function(t) {
    this.tower.upgrade(t.target.ix),
    TD.hideTowerMenu()
}
,
Utils.extend(TowerMenuButton, Sprite),
TowerMenuButton.prototype.controlEvents = function() {
    return this.enabled
}
,
TowerMenuButton.prototype.update = function(t, e) {
    this.enabled != e && (this.normalTexture.visible = e,
    this.disabledTexture.visible = !e,
    this.icon && 1 < this.icon.totalLayers && (this.icon.currentLayer = e ? 0 : 1),
    this.costView.setSkin(e ? "normal" : "disabled"),
    this.enabled = e),
    this.costView.update(t)
}
,
TowerMenuButton.prototype.updateIcon = function(t) {
    var e = UI.getAssetByTexture(t);
    this.icon.bitmap = e.bitmap,
    this.icon.width = e.width,
    this.icon.height = e.height,
    this.icon.totalFrames = e.frames,
    this.icon.totalLayers = e.layers
}
,
Utils.extend(TowerMenuSellButton, TowerMenuButton),
TowerMenuSellButton.prototype.update = function() {
    var t = this.tower.getSellCost();
    Utils.callSuperMethod(TowerMenuSellButton, this, "update", t, 0 < t)
}
,
Utils.extend(TowerMenuRepairButton, TowerMenuButton),
TowerMenuRepairButton.prototype.update = function() {
    var t = this.tower.getRepairCost();
    Utils.callSuperMethod(TowerMenuSellButton, this, "update", t, 0 < t && this.tower.parent.money >= t)
}
,
Utils.extend(TowerMenuUpgradeButton, TowerMenuButton),
TowerMenuUpgradeButton.prototype.update = function() {
    var t = this.tower.getNextLevelProps();
    if (t[this.ix] && this.tower.isReadyToUp()) {
        this.visible = !0;
        var e = TowersHierarchy.get(this.tower.id, t[this.ix].level)
          , i = TD.getPerk(e.iconName);
        this.updateIcon(TD.getAttr(i.icon_game, "texture"));
        var s = this.tower.getUpgradeCost(this.ix);
        Utils.callSuperMethod(TowerMenuUpgradeButton, this, "update", s, this.tower.parent.money >= s)
    } else
        this.visible = !1
}
,
Utils.extend(WaveCounterView, Sprite),
WaveCounterView.prototype.startAnimation = function() {
    this.scaleTo(1, 250, null, this.fadeOut)
}
,
WaveCounterView.prototype.fadeOut = function(t) {
    t.target.obj.fadeTo(0, 750, null, t.target.obj.endEnimation)
}
,
WaveCounterView.prototype.endEnimation = function(t) {
    t.target.obj.destroy = !0
}
,
Utils.extend(ScreenScroller, Sprite),
ScreenScroller.prototype.addItem = function(t) {
    this.scroller.addChild(t)
}
,
ScreenScroller.prototype.startScroll = function(t) {
    this.startScrollX = this.scroller.x,
    this.scroller.startDrag(t.x, t.y)
}
,
ScreenScroller.prototype.contollScroll = function() {
    this.scroller.y = 0
}
,
ScreenScroller.prototype.setPage = function(t) {
    this.currentPage = t,
    this.scroller.x = -t * this.pageWidth,
    this.updateDots()
}
,
ScreenScroller.prototype.updateDots = function() {
    for (var t = 0; t < this.pages; t++)
        this.pagesDots[t].currentLayer = this.currentPage == t ? 0 : 1
}
,
ScreenScroller.prototype.stopScroll = function() {
    this.scroller.stopDrag();
    var t = 0
      , e = this.startScrollX - this.scroller.x;
    50 <= Math.abs(e) ? ((t = this.currentPage + Utils.sign(e)) < 0 && (t = 0),
    t >= this.pages && (t = this.pages - 1)) : t = this.currentPage,
    this.currentPage = t,
    this.updateDots(),
    this.scroller.moveTo(-t * this.pageWidth, 0, 300)
}
,
Utils.extend(MainMenu, Sprite),
MainMenu.prototype.createChildren = function() {
    var t = UI.assetsLibrary.getSprite("mainmenu/background_0");
    this.addChild(t),
    t.setStatic(!0),
    this.particlesLayer = new Sprite(null,1,1),
    this.addChild(this.particlesLayer),
    this.showEffects();
    var e = UI.assetsLibrary.getSprite("mainmenu/logo_btns_0");
    e.setPosition(0, -20),
    this.addChild(e);
    var i = UI.assetsLibrary.getSprite("mainmenu/logo_text");
    i.setPosition(0, 10),
    this.addChild(i);
    var s = UI.assetsLibrary.getSprite("mainmenu/main_button_0");
    s.setPosition(0, 148),
    s.addEventListener("click", SoundsManager.click),
    s.addEventListener("click", this.onPlayClick),
    this.addChild(s);
    var a = new UITextGold(0,0,I18.f("ИГРАТЬ"),!0);
    s.addChild(a),
    "y8" === ExternalAPI.type ? ((s = new CommonButton("button_medium_square","button_leaders_ico")).setPosition(-165, 150),
    this.addChild(s),
    s.onclick = ExternalAPI.showHighScores) : ((s = new CommonButton("button_medium_square","more_games")).setPosition(-165, 150),
    this.addChild(s),
    1 == ExternalAPI.exec("getMoreGamesButtonDisable") ? s.opacity = .5 : s.onclick = showMoreGames),
    (s = new CommonButton("button_medium_square","options")).setPosition(-100, 150),
    s.onclick = TD.showOptions,
    this.addChild(s),
    (s = new CommonButton("button_medium_square","achievements")).setPosition(100, 150),
    s.onclick = TD.showAchievements,
    this.addChild(s),
    (s = new CommonButton("button_medium_square","fullscreen")).setPosition(165, 150),
    s.onclick = function() {
        Utils.toggleFullScreen()
    }
    ,
    this.addChild(s),
    Utils.isFullScreenEnabled() && "coolmath" !== ExternalAPI.type || (s.visible = !1),
    SoundsManager.play("music_menu", !0);
    var o = ExternalAPI.exec("showCopyright");
    if (o && (o.y += 7),
    1 < I18.supportedLanguage.length) {
        var n = UI.assetsLibrary.getSprite("flags/" + I18.currentLocale);
        n.setPropScale(1.5),
        n.setPosition(200, -140),
        n.onclick = TD.showLanguageSelection,
        this.addChild(n)
    }
    ExternalAPI.exec("addY8Logos", 50, 40, stage.screenWidth - 50, 40)
}
,
MainMenu.prototype.onPlayClick = function() {
    launchLoadScreen(function() {
        TD.gameData.comixViewed ? TD.showChapterSelect() : (TD.showComics(),
        TD.gameData.comixViewed = !0,
        TD.save())
    })
}
,
MainMenu.prototype.addEffect = function(t, e) {
    var i = new ParticleSystem.Emitter(t,{
        x: t._position.x,
        y: t._position.y
    },UI.assetsLibrary.getSprite(e));
    this.particlesEmitters.push(i)
}
,
MainMenu.prototype.showEffects = function() {
    var t = {
        delay: 0,
        _position: {
            x: 0,
            y: 0
        },
        posVar: {
            x: 90,
            y: 13
        },
        life: 2,
        lifeVar: 1,
        totalParticles: 30,
        emissionRate: 75,
        startColor: [51, 102, 178.5, .77],
        startColorVar: [0, 0, 51, .1],
        endColor: [0, 0, 0, .01],
        endColorVar: [0, 0, 0, 0],
        radius: 12,
        radiusVar: 2,
        speed: 15,
        speedVar: 5,
        angle: 1.5707963267949,
        angleVar: 6.2831853071796,
        gravity: {
            x: 0,
            y: -40
        },
        radialAccel: 0,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        startScale: 2.6,
        startScaleVar: .5,
        endScale: .01,
        endScaleVar: 0,
        startRotation: 0,
        startRotationVar: 0,
        rotationSpeed: 0,
        rotationSpeedVar: 0,
        rotationCoef: 0,
        rotationCoefVar: 0
    };
    this.addEffect(t, "particles/fire"),
    t = {
        delay: 0,
        _position: {
            x: -1,
            y: -31
        },
        posVar: {
            x: 0,
            y: 0
        },
        life: 7,
        lifeVar: 1.7,
        totalParticles: 42,
        emissionRate: 75,
        startColor: [51, 102, 178.5, .23],
        startColorVar: [0, 0, 51, .1],
        endColor: [0, 0, 0, .01],
        endColorVar: [0, 0, 0, 0],
        radius: 12,
        radiusVar: 2,
        speed: 15,
        speedVar: 5,
        angle: 1.5707963267949,
        angleVar: 6.2831853071796,
        gravity: {
            x: 0,
            y: -10
        },
        radialAccel: 8,
        radialAccelVar: 0,
        tangentialAccel: 0,
        tangentialAccelVar: 0,
        startScale: .48,
        startScaleVar: .04,
        endScale: .1,
        endScaleVar: 0,
        startRotation: 0,
        startRotationVar: 0,
        rotationSpeed: 0,
        rotationSpeedVar: 0,
        rotationCoef: 0,
        rotationCoefVar: 0
    },
    this.addEffect(t, "particles/back_glow"),
    this.onenterframe = Utils.proxy(this.updateParticles, this)
}
,
MainMenu.prototype.updateParticles = function(t) {
    for (var e = 0; e < this.particlesEmitters.length; e++)
        this.particlesEmitters[e].update(t.delta),
        ParticleSystem.Renderer.render(this.particlesLayer, this.particlesEmitters[e].particles)
}
,
Utils.extend(ChapterSelect, Sprite),
ChapterSelect.worldsToDisplay = [0, 1, 2, 3],
ChapterSelect.prototype.createChildren = function() {
    var t = UI.assetsLibrary.getSprite("missionselector/background_1");
    this.addChild(t),
    t.setStatic(!0);
    var e = new ScreenScroller(2);
    this.addChild(e);
    for (var i, s = TD.configs.worlds.worlds.world, a = [], o = 0; o < s.length; o++)
        i = s[o],
        0 <= ChapterSelect.worldsToDisplay.indexOf(TD.getAttr(i, "world_number", !0)) && a.push(i);
    var n = -1;
    for (o = 0; o < a.length; o++) {
        var r = new ChapterIcon(a[o]);
        r.setPosition(240 * o - 120, 0),
        e.addItem(r),
        r.enabled && n++,
        r.addEventListener("click", this.onChapterSelect)
    }
    e.setPage(Math.floor(n / 2));
    var h = new CommonButton("button_medium_square","back");
    h.setStatic(!0),
    h.setPosition(-220, 160),
    h.addEventListener("click", TD.showMainMenu),
    this.addChild(h),
    (h = new CommonButton("button_medium_square","shop")).setStatic(!0),
    h.setPosition(220, 160),
    h.addEventListener("click", this.onShowShop),
    this.addChild(h),
    ExternalAPI.paymentsEnabled && ((h = new ShopButton).setPosition(160, 160),
    h.addEventListener("click", this.onShowStarsShop),
    this.addChild(h)),
    SoundsManager.play("music_menu", !0),
    ExternalAPI.exec("addY8Logos", 50, 40, stage.screenWidth - 50, 40)
}
,
ChapterSelect.prototype.onShowStarsShop = function() {
    this.visible = !1,
    this.stage.refreshBackground();
    var t = this;
    TD.showStarsShop(function() {
        t.visible = !0,
        t.stage.refreshBackground()
    })
}
,
ChapterSelect.prototype.onShowShop = function() {
    TD.showShop().closeCallback = TD.showChapterSelect
}
,
ChapterSelect.prototype.onChapterSelect = function(t) {
    var e = t.target;
    e.enabled && (TD.showLevelSelect(e.worldId),
    SoundsManager.click()),
    ExternalAPI.exec("showAds")
}
,
Utils.extend(ChapterIcon, Sprite),
ChapterIcon.prototype.loadData = function() {
    DataCache.load(LinksProcessor.get(TD.getAttr(this.world, "path")), Utils.proxy(this.displayStars, this))
}
,
ChapterIcon.prototype.displayStars = function(t) {
    for (var e, i = 0, s = 0; s < t.mission.length; s++)
        e = t.mission[s],
        i += TD.getValFromString(TD.getAttr(e, "money_finish"), 0);
    var a = 0
      , o = TD.gameData.levelResults[this.worldId];
    if (o)
        for (s = 0; s < o.length; s++)
            o[s] && (a += o[s].stars);
    var n = new UITextGold2(0,75,"",!0);
    n.view.scale = .7,
    n.update(a + "/" + i + " ©"),
    this.addChild(n);
    var r = document.createElement("canvas");
    r.width = this.width * Utils.globalScale,
    r.height = this.height * Utils.globalScale;
    var h = this.x
      , d = this.y
      , l = this.parent;
    this.parent = null,
    this.x = this.width / 2,
    this.y = this.height / 2,
    this.render(r),
    this.bitmap = r,
    this.x = h,
    this.y = d,
    this.parent = l,
    this.clear()
}
,
Utils.extend(LevelSelect, Sprite),
LevelSelect.lastChapter = 0,
LevelSelect.prototype.createChildren = function() {
    var t = UI.assetsLibrary.getSprite("missionselector/background_1");
    this.addChild(t),
    t.setStatic(!0);
    var e = new UITextGold2(0,-120,"",!0);
    e.view.scale = .7,
    e.update(I18.f(TD.getAttr(this.world.title, "string"))),
    this.addChild(e);
    var i = new CommonButton("button_medium_square","back");
    i.setPosition(-220, 160),
    i.addEventListener("click", TD.showChapterSelect),
    this.addChild(i),
    (i = new CommonButton("button_medium_square","shop")).setPosition(220, 160),
    i.addEventListener("click", this.onShowShop),
    this.addChild(i),
    ExternalAPI.paymentsEnabled && ((i = new ShopButton).setPosition(160, 160),
    i.addEventListener("click", this.onShowStarsShop),
    this.addChild(i)),
    DataCache.load(LinksProcessor.get(TD.getAttr(this.world, "path")), Utils.proxy(this.showWorldUI, this)),
    SoundsManager.play("music_menu", !0),
    ExternalAPI.exec("addY8Logos", 50, 40, stage.screenWidth - 50, 40)
}
,
LevelSelect.prototype.onShowStarsShop = function() {
    this.visible = !1,
    this.stage.refreshBackground();
    var t = this;
    TD.showStarsShop(function() {
        t.visible = !0,
        t.stage.refreshBackground()
    })
}
,
LevelSelect.prototype.onShowShop = function() {
    TD.showShop().closeCallback = TD.showLevelSelect
}
,
LevelSelect.prototype.showWorldUI = function(t) {
    var e = TD.gameData.levelResults[this.chapter];
    e || (e = []);
    for (var i = e.length, s = 0, a = 0, o = 0, n = 0, r = 0, h = null, d = 0; d < t.mission.length; d++) {
        var l = new LevelButton(d + 1,d <= i,e[d]);
        l.setPosition(70 * s - 180, 60 * a - 80),
        this.addChild(l),
        l.addEventListener("click", this.startLevel),
        6 <= ++s && (s = 0,
        a++),
        e[d] && (o += e[d].score,
        n += e[d].stars),
        r += TD.getValFromString(TD.getAttr(t.mission[d], "money_finish"), 0)
    }
    (h = new UITextGold2(-80,160,"",!0)).view.scale = .6,
    h.update(n + "/" + r + " ©"),
    this.addChild(h),
    (h = new UITextGold2(80,160,"",!0)).view.scale = .6,
    h.update(I18.f("СЧЕТ:") + o),
    this.addChild(h)
}
,
LevelSelect.prototype.startLevel = function(t) {
    t.target.enabled && TD.startLevel(this.chapter, t.target.levelId)
}
,
Utils.extend(LevelButton, Sprite),
Utils.extend(LevelWin, Sprite),
LevelWin.prototype.createChildren = function() {
    var t = TD.gameField
      , e = t.stats.built + t.stats.killed + t.stats.spent + t.money;
    TD.gameData.levelResults[TD.currentWorld] || (TD.gameData.levelResults[TD.currentWorld] = []);
    var i = TD.gameData.levelResults[TD.currentWorld][TD.currentLevel - 1];
    i || (i = {
        award: -1,
        stars: 0,
        score: 0
    });
    var s = TD.gameField.life / TD.gameField.startLife
      , a = 0;
    1 <= s ? a = 2 : .45 <= s && (a = 1);
    var o = 0
      , n = 0;
    a > i.award && (n = (o = TD.getValFromString(TD.getAttr(t.mission, "money_finish"), 2 - a)) - i.stars,
    i.stars += n,
    i.award = a,
    TD.gameData.stars += n),
    e > i.score && (i.score = e),
    TD.gameData.levelResults[TD.currentWorld][TD.currentLevel - 1] = i,
    TD.currentLevel >= TD.LEVELS_ON_CHAPTER && TD.currentWorld < TD.WORLDS_COUNT - 1 && (TD.gameData.openedWorlds[TD.currentWorld + 1] = !0),
    TD.save();
    var r = new LevelButton(TD.currentLevel,!0,{
        award: a
    });
    r.setPosition(-110, -30),
    r.scaleX = r.scaleY = 1.3,
    this.addChild(r);
    var h = new UITextGold2(0,-107,I18.f("ПОБЕДА!"),!0);
    this.addChild(h),
    this.addCaption(-30, -81, I18.f("УБИТО")),
    this.addValue(110, -81, t.stats.killed),
    this.addCaption(-30, -66, I18.f("ПОСТРОЕНО")),
    this.addValue(110, -66, t.stats.built),
    this.addCaption(-30, -51, I18.f("ПОТРАЧЕНО")),
    this.addValue(110, -51, t.stats.spent),
    this.addCaption(-30, -35, I18.f("СЭКОНОМЛЕНО")),
    this.addValue(110, -35, t.money),
    this.addCaption(140, -19, I18.f("СЧЕТ:"), !0),
    this.addCaption(-30, -4, I18.f("МИССИЯ")),
    this.addValue(110, -4, e),
    this.addCaption(-30, 11, I18.f("МИР"));
    for (var d = TD.gameData.levelResults[TD.currentWorld], l = 0, f = 0; f < d.length; f++)
        d[f] && (l += d[f].score);
    this.addValue(110, 11, l),
    this.addCaption(140, 27, I18.f("НАГРАДА:"), !0);
    var c = this.addValue(135, 47, n, "©");
    c.view.scale = .8,
    c.view.align = BitmapText.ALIGN_RIGHT,
    c.update(o),
    this.animateVals(),
    this.addButtons()
}
,
LevelWin.prototype.addButtons = function() {
    var t = new CommonButton("button_medium_square","restart");
    t.setPosition(-50, 95),
    t.addEventListener("click", TD.restartLevel),
    this.addChild(t),
    (t = new CommonButton("button_medium_square","main_menu")).setPosition(10, 95),
    t.addEventListener("click", TD.showMainMenu),
    this.addChild(t),
    (t = new CommonButton("button_medium_square","ch_mission")).setPosition(70, 95),
    t.addEventListener("click", TD.showLevelSelectInCurrentChapter),
    this.addChild(t),
    (t = new CommonButton("button_medium_square","next")).setPosition(130, 95),
    t.addEventListener("click", Utils.proxy(this.next, this)),
    this.addChild(t)
}
,
LevelWin.prototype.addCaption = function(t, e, i, s) {
    var a = new UITextGold2(t,e,"");
    a.view.scale = .5,
    s && (a.view.align = BitmapText.ALIGN_RIGHT),
    a.update(i),
    this.addChild(a)
}
,
LevelWin.prototype.addValue = function(t, e, i, s) {
    var a = new UITextGold2(t,e,"",!0);
    return a.view.scale = .5,
    a.valToAnimate = i,
    s && (a.textPrefix = s),
    a.update("0"),
    this.addChild(a),
    this.valsToAnimate.push(a),
    a
}
,
LevelWin.prototype.animateVals = function() {
    if (this.currentAnimatedVal++,
    6 == this.currentAnimatedVal ? SoundsManager.play("next_mission_final_effect") : SoundsManager.play("next_mission_count_effect"),
    !(this.currentAnimatedVal >= this.valsToAnimate.length)) {
        var t = this.valsToAnimate[this.currentAnimatedVal];
        t.animatedNumericUpdate(t.valToAnimate, this.animateVals)
    }
}
,
LevelWin.prototype.next = function() {
    var t = TD.showShop(!0);
    t.closeCallback = TD.startNextLevel,
    t.addNextButton(),
    this.destroy = !0
}
,
Utils.extend(LevelLoose, Sprite),
LevelLoose.prototype.createChildren = function() {
    var t = new LevelButton(TD.currentLevel,!0,null);
    t.setPosition(0, -10),
    t.scaleX = t.scaleY = 1.3,
    this.addChild(t);
    var e = new UITextGold2(0,-75,I18.f("ПОРАЖЕНИЕ!"),!0);
    this.addChild(e);
    var i = new CommonButton("button_medium_square","restart");
    i.setPosition(-85, 65),
    i.addEventListener("click", TD.restartLevel),
    this.addChild(i),
    (i = new CommonButton("button_medium_square","main_menu")).setPosition(-25, 65),
    i.addEventListener("click", TD.showMainMenu),
    this.addChild(i),
    (i = new CommonButton("button_medium_square","ch_mission")).setPosition(35, 65),
    i.addEventListener("click", TD.showLevelSelectInCurrentChapter),
    this.addChild(i),
    (i = new CommonButton("button_medium_square","shop")).setPosition(95, 65),
    i.addEventListener("click", this.onShowShop),
    this.addChild(i)
}
,
LevelLoose.prototype.onShowShop = function() {
    var t = TD.showShop()
      , e = this;
    this.visible = !1,
    t.closeCallback = function() {
        TD.gameField.visible = !0,
        e.visible = !0,
        TD.stage.refreshBackground()
    }
}
,
Utils.extend(LanguageSelection, Sprite),
LanguageSelection.prototype.close = function() {
    this.safeRemove()
}
,
LanguageSelection.prototype.createChildren = function() {
    var t = new Sprite(null,this.stage.screenWidth,this.stage.screenHeight);
    t.fillColor = "rgba(0,0,0,0.7)",
    UI.preventAllEvents(t),
    this.addChild(t);
    for (var e = this.addChild(UI.assetsLibrary.getSprite("dialogs/loose")), i = 0; i < I18.supportedLanguage.length; i++) {
        var s = I18.supportedLanguage[i]
          , a = UI.assetsLibrary.getSprite("flags/" + s);
        a.language = s,
        a.setPosition(i % 4 * 60 - 90, 50 * Math.floor(i / 4) - 70),
        a.setPropScale(1.5),
        a.onclick = this.onSelect,
        e.addChild(a)
    }
    var o = UI.assetsLibrary.getSprite("common/buttons/button_shop_small");
    o.onclick = Utils.proxy(this.close, this),
    o.setPosition(0, 75);
    var n = new UITextGold(-4,0,"OK",!0);
    o.addChild(n),
    e.addChild(o)
}
,
LanguageSelection.prototype.onSelect = function(t) {
    var e = t.target.language;
    return TD.gameData.language = e,
    TD.save(),
    I18.init(e, TD.showMainMenu),
    !1
}
,
Utils.extend(Notification, Sprite),
Notification.prototype.loadConfig = function() {
    DataCache.load("data/game/notifications.json", this.createChildren)
}
,
Notification.prototype.createChildren = function(t) {
    if (this.setPosition(this.stage.screenWidth / 2, -25),
    "number" == typeof this.id)
        for (var e = 0; e < t.achievements.a.length; e++)
            if (TD.getAttr(t.achievements.a[e], "id", !0) == this.id) {
                this.id = TD.getAttr(t.achievements.a[e], "name");
                break
            }
    var i = null;
    for (e = 0; e < t.items.item.length; e++)
        if (TD.getAttr(t.items.item[e], "name") == this.id) {
            i = t.items.item[e];
            break
        }
    if (i) {
        if (i.image) {
            var s = UI.getSpriteByTexture(TD.getAttr(i.image, "texture"));
            s.setPosition(-90, 0),
            this.addChild(s)
        }
        var a;
        if (i.title)
            (a = new UITextColor(-70,-12,I18.f(TD.getAttr(i.title, "string")),UITextColor.defaultColor)).setScale(.7),
            this.addChild(a);
        if (i.message)
            (a = new UITextColor(-70,0,I18.f(TD.getAttr(i.message, "string")),UITextColor.defaultColor)).view.maxWidth = 340,
            this.addChild(a),
            a.setScale(.5)
    }
    this.moveTo(this.x, 25, 500, null, this.startMoveOut)
}
,
Notification.prototype.startMoveOut = function() {
    this.stage.setTimeout(this.moveOut, 2e3)
}
,
Notification.prototype.moveOut = function() {
    this.moveTo(this.x, -25, 500, null, this.moveEnd)
}
,
Notification.prototype.moveEnd = function() {
    this.destroy = !0
}
,
Notification.show = function(t) {
    var e = new Notification(t);
    TD.stage.addChild(e)
}
,
Utils.extend(Shop, Sprite),
Shop.prototype.loadConfig = function() {
    DataCache.load("data/shop/shop.json", Utils.proxy(this.configLoaded, this))
}
,
Shop.prototype.configLoaded = function(t) {
    this.config = t,
    this.createChildren()
}
,
Shop.prototype.createChildren = function() {
    var t = UI.getSpriteByTexture(TD.getAttr(this.config.background, "texture"));
    this.addChild(t),
    t.setStatic(!0),
    this.selectFrame = UI.assetsLibrary.getSprite("shop/panel_towers_9"),
    this.addChild(this.selectFrame),
    this.selectBonusFrame = UI.assetsLibrary.getSprite("shop/panel_towers_33"),
    this.addChild(this.selectBonusFrame);
    var e = UI.assetsLibrary.getSprite("common/buttons/button_close");
    e.setPosition(220, -139),
    e.onclick = Utils.proxy(this.close, this),
    this.addChild(e),
    this.pagesContainer = new Sprite(null,1,1),
    this.addChild(this.pagesContainer);
    var i = new UITextGold2(0,-125,"",!0);
    i.view.scale = .75,
    i.view.static = !0,
    i.update(I18.f("МАГАЗИН УЛУЧШЕНИЙ")),
    this.addChild(i),
    this.shopPanel = new ShopPanel,
    this.shopPanel.setPosition(147, -2),
    this.addChild(this.shopPanel),
    this.shopBonusPanel = new ShopBonusPanel,
    this.shopBonusPanel.setPosition(147, -2),
    this.addChild(this.shopBonusPanel);
    var s = new TextButton("button_shop_small","КУПИТЬ ©");
    s.textView.setScale(.7),
    s.setPosition(176, 126),
    this.addChild(s),
    s.onclick = Utils.proxy(this.onBuyStars, this),
    s.visible = ExternalAPI.paymentsEnabled,
    this.buyButton = s,
    this.nextButtonNeedAdd && this.addNextButton();
    for (var a = 0; a < 4; a++)
        this.addTowerPage(a);
    var o = new ShopBonusPage(this.config.page_towers.page_bonus,Utils.proxy(this.onBonusButtonClick, this));
    this.addChild(o),
    this.pages.push(o),
    this.bonusesPage = o,
    this.onTowerButtonClick({
        target: this.pages[0].buttons[0]
    });
    for (a = 0; a < 4; a++)
        AchievementsManager.event(AchievementsManager.EVENT_BUY_UP, a);
    ExternalAPI.exec("addY8Logos", 50, 40, stage.screenWidth - 50, 40)
}
,
Shop.prototype.onBuyStars = function() {
    return this.visible = !1,
    TD.showStarsShop(Utils.proxy(function() {
        this.visible = !0,
        this.shopPanel.update(),
        TD.stage.refreshBackground()
    }, this)),
    !1
}
,
Shop.prototype.addNextButton = function() {
    if (this.config) {
        var t = new CommonButton("button_medium_square","next");
        t.setPosition(200, 126),
        t.addEventListener("click", Utils.proxy(this.close, this)),
        this.addChild(t),
        this.buyButton && (this.buyButton.x = 118)
    } else
        this.nextButtonNeedAdd = !0
}
,
Shop.prototype.close = function() {
    return this.closeCallback && this.closeCallback(),
    this.destroy = !0,
    SoundsManager.click(),
    !1
}
,
Shop.prototype.getPageConfig = function(t) {
    var e = 0
      , i = null;
    for (var s in this.config.page_towers.pages) {
        if (e == t) {
            i = this.config.page_towers.pages[s];
            break
        }
        e++
    }
    return i
}
,
Shop.prototype.addTowerPage = function(t) {
    var e = new ShopTowersPage(this.getPageConfig(t),t,this.onTowerButtonClick);
    this.addChild(e),
    this.pages[t] = e
}
,
Shop.prototype.hideAllPages = function() {
    for (var t = 0; t < this.pages.length; t++)
        this.pages[t].setVisible(!1)
}
,
Shop.prototype.showPage = function(t) {
    this.pages[t].isVisible || (this.hideAllPages(),
    this.pages[t].setVisible(!0))
}
,
Shop.prototype.onTowerButtonClick = function(t) {
    var e = t.target;
    this.showPage(e.towerId),
    this.shopPanel.update(e),
    this.shopPanel.visible = !0,
    this.shopBonusPanel.visible = !1;
    var i = this.getPageConfig(e.towerId);
    this.shopPanel.updateAbilityIcons(i.tower_type.icon);
    var s = e.getAbsolutePosition();
    s.x -= this.x,
    s.y -= this.y,
    this.selectFrame.setPosition(s),
    this.selectBonusFrame.visible = !1
}
,
Shop.prototype.onBonusButtonClick = function(t) {
    this.showPage(4),
    this.shopPanel.visible = !1,
    this.shopBonusPanel.visible = !0;
    var e = t.target.parent.buttons[0]
      , i = e.getAbsolutePosition();
    i.x -= this.x,
    i.y -= this.y,
    this.selectFrame.setPosition(i),
    this.selectBonusFrame.visible = !0,
    (i = (e = t.target.config ? t.target : t.target.parent.buttons[1]).getAbsolutePosition()).x -= this.x + 3,
    i.y -= this.y + 3,
    this.selectBonusFrame.setPosition(i),
    this.shopBonusPanel.update(e)
}
,
Shop.prototype.buy = function(t, e, i, s) {
    s > TD.gameData.stars || (UpgradesManager.open(t, e, i),
    TD.gameData.stars -= s,
    TD.save(),
    this.pages[t].update(),
    this.shopPanel.refresh(),
    AchievementsManager.event(AchievementsManager.EVENT_BUY_UP, t))
}
,
Shop.prototype.refreshBonusesPage = function() {
    this.bonusesPage.update()
}
,
Utils.extend(ShopTowersPage, Sprite),
ShopTowersPage.prototype.setVisible = function(t) {
    t = !!t,
    this.isVisible = t;
    for (var e = 1; e < this.buttons.length; e++)
        this.buttons[e].visible = t;
    this.buttons[0].arrow.visible = t,
    this.back.visible = t,
    this.stage.refreshBackground()
}
,
ShopTowersPage.prototype.update = function() {
    for (var t = 0; t < this.buttons.length; t++)
        this.buttons[t].update()
}
,
Utils.extend(ShopTowerButton, Sprite),
ShopTowerButton.prototype.showArrow = function(t) {
    this.arrow && (this.arrow.visible = !!t),
    this.stage.refreshBackground()
}
,
ShopTowerButton.prototype.setEnabled = function(t) {
    if (this.enabled !== !!t) {
        this.enabled = !!t;
        var e = TD.getAttr(this.config.button.out, "texture");
        e = e.split(".").shift(),
        this.enabled || (e += "_d");
        var i = UI.assetsLibrary.getAsset(e);
        this.frame.bitmap = i.bitmap,
        this.frame.width = i.width,
        this.frame.height = i.height,
        this.width = i.width,
        this.height = i.height,
        this.setArrowEnabled(t),
        !this.enabled && 1 < this.icon.totalLayers ? this.icon.currentLayer = 1 : this.icon.currentLayer = 0
    }
}
,
ShopTowerButton.prototype.setArrowEnabled = function(t) {
    if (this.arrow) {
        var e = TD.getAttr(this.config.arrow, "texture");
        e = e.split(".").shift(),
        t || (e += "_d"),
        asset = UI.assetsLibrary.getAsset(e),
        this.arrow.bitmap = asset.bitmap,
        this.arrow.width = asset.width,
        this.arrow.height = asset.height
    }
}
,
ShopTowerButton.prototype.updateSublevels = function() {
    for (var t = UpgradesManager.getSubLevel(this.towerId, this.towerLevel), e = 0; e < 3; e++)
        this.subLevelIcons[e].visible = e <= t
}
,
ShopTowerButton.prototype.update = function() {
    var t = UpgradesManager.check(this.towerId, this.towerLevel, 0);
    if (!t) {
        var e = TowersHierarchy.get(this.towerId, this.towerLevel);
        t = e.parent && UpgradesManager.check(this.towerId, e.parent.level, 2)
    }
    this.setEnabled(t),
    this.setArrowEnabled(UpgradesManager.check(this.towerId, this.towerLevel, 2)),
    this.updateSublevels()
}
,
Utils.extend(ShopPanel, Sprite),
ShopPanel.prototype.update = function(t) {
    t && (this.source = t),
    this.title && (this.title.destroy = !0),
    this.description && (this.description.destroy = !0),
    this.errorText && (this.errorText.destroy = !0),
    this.rankIcon && (this.rankIcon.destroy = !0),
    this.buyButton && (this.buyButton.destroy = !0),
    this.stars && (this.stars.destroy = !0),
    this.title = new UITextColor(-75,-68,I18.f(TD.getAttr(this.source.config, "title")),UITextColor.defaultColor,!1),
    this.title.setScale(.7),
    this.title.view.setScaleToFitContainer(150, .1, .7),
    this.title.view.refresh(),
    this.title.view.static = !0,
    this.addChild(this.title);
    var e = UpgradesManager.getSubLevel(this.source.towerId, this.source.towerLevel) + 1;
    2 < e && (e = 2);
    var i = "description";
    1 == e && (i = "description_1"),
    2 == e && (i = "description_2"),
    this.subLevel = e,
    this.description = new UITextColor(-75,-50,"",UITextColor.defaultColor,!1),
    this.description.view.maxWidth = 300,
    this.description.view.static = !0,
    this.description.setScale(.5),
    this.addChild(this.description),
    this.description.update(I18.f(TD.getAttr(this.source.config, i))),
    this.stars = new UITextGold2(70,86,"©" + TD.gameData.stars),
    this.addChild(this.stars),
    this.stars.view.align = BitmapText.ALIGN_RIGHT,
    this.stars.view.refresh();
    var s = TowersHierarchy.get(this.source.towerId, this.source.towerLevel)
      , a = TD.getPerk(s.iconName);
    this.rankIcon = UI.getSpriteByTexture(TD.getAttr(a.icon_rank_big, "texture")),
    this.rankIcon.currentLayer = e,
    this.rankIcon.setStatic(!0),
    this.rankIcon.setPosition(-47, 45),
    this.addChild(this.rankIcon);
    var o = TowersHierarchy.get(this.source.towerId, this.source.towerLevel)
      , n = !o.parent || 2 <= UpgradesManager.getSubLevel(this.source.towerId, o.parent.level);
    if (n || (this.errorText = new UITextColor(-75,10,I18.f("Требуется купить предыдущие улучшения"),"#ff5050",!1),
    this.errorText.view.maxWidth = 300,
    this.errorText.view.static = !0,
    this.errorText.setScale(.5),
    this.addChild(this.errorText)),
    UpgradesManager.getSubLevel(this.source.towerId, this.source.towerLevel) < 2) {
        var r = TowersHierarchy.get(this.source.towerId, this.source.towerLevel);
        this.price = r.priceShop[e],
        this.buyButton = new TextButton("button_shop_small","©" + this.price),
        this.buyButton.setPosition(29, 45),
        this.addChild(this.buyButton),
        this.buyButton.setStatic(!0),
        this.buyButton.onclick = this.onBuy,
        TD.gameData.stars < this.price ? this.buyButton.enabled = !1 : this.buyButton.enabled = n,
        this.buyButton.opacity = this.buyButton.enabled ? 1 : .5,
        Hint.show(Hint.SHOP_HINT, this.buyButton)
    }
    this.stage.refreshBackground()
}
,
ShopPanel.prototype.updateAbilityIcons = function(t) {
    Utils.isArray(t) || (t = [t]);
    for (var e = 0; e < this.abilityIcons.length; e++)
        this.abilityIcons[e].destroy = !0;
    for (this.abilityIcons = [],
    e = 0; e < t.length; e++) {
        var i = UI.getSpriteByTexture(TD.getAttr(t[e], "texture"));
        i.setPosition(18 * e - 65, -85),
        this.addChild(i),
        i.setStatic(!0),
        this.abilityIcons.push(i)
    }
    this.stage.refreshBackground()
}
,
ShopPanel.prototype.refresh = function() {
    this.update(this.source)
}
,
ShopPanel.prototype.onBuy = function() {
    this.price > TD.gameData.stars || !this.buyButton.enabled || this.parent.buy(this.source.towerId, this.source.towerLevel, this.subLevel, this.price)
}
,
Utils.extend(Achievements, Sprite),
Achievements.prototype.loadConfig = function() {
    DataCache.load("data/game/notifications.json", this.createChildren)
}
,
Achievements.prototype.getConfigById = function(t, e) {
    for (var i = 0; i < t.achievements.a.length; i++)
        if (TD.getAttr(t.achievements.a[i], "id", !0) == e) {
            e = TD.getAttr(t.achievements.a[i], "name");
            break
        }
    for (i = 0; i < t.items.item.length; i++)
        if (TD.getAttr(t.items.item[i], "name") == e)
            return t.items.item[i]
}
,
Achievements.prototype.createChildren = function(t) {
    var e = new Sprite(null,this.stage.screenWidth,this.stage.screenHeight);
    e.fillColor = "rgba(0,0,0,0.7)",
    UI.preventAllEvents(e),
    this.addChild(e),
    this.addChild(UI.assetsLibrary.getSprite("dialogs/achives"));
    var i = UI.assetsLibrary.getSprite("common/buttons/button_close");
    i.setPosition(180, -100),
    i.onclick = Utils.proxy(this.close, this),
    this.addChild(i);
    var s = new UITextGold2(0,-92,I18.f("НАГРАДЫ"),!0);
    this.addChild(s);
    for (var a, o = new Sprite(null,1,1), n = 0; n < AchievementsManager.ALL_ACHIEVEMENTS.length; n++)
        (a = new AchievementItem(this.getConfigById(t, AchievementsManager.ALL_ACHIEVEMENTS[n]),AchievementsManager.check(AchievementsManager.ALL_ACHIEVEMENTS[n]))).setPosition(175, n * a.height + 15),
        o.addChild(a);
    stage.addChild(o);
    var r = a.width
      , h = AchievementsManager.ALL_ACHIEVEMENTS.length * a.height;
    this.itemsView = new Sprite(o.cacheAsBitmap(),r,h),
    this.itemsView.setPosition(0, 10),
    this.itemsView._height = h,
    this.addChild(this.itemsView),
    this.scrollBar = new ScrollBar(0,h),
    this.scrollBar.setPosition(160, 12),
    this.scrollBar.onchange = this.update,
    this.addChild(this.scrollBar),
    e.onmouseup = this.scrollBar.endScroll,
    this.update(),
    o.destroy = !0
}
,
Achievements.prototype.update = function() {
    var t = (this.itemsView._height - 168) * this.scrollBar.pos;
    this.itemsView.height = 168,
    this.itemsView.offset.top = t
}
,
Achievements.prototype.close = function() {
    this.destroy = !0,
    this.stage.refreshBackground(),
    SoundsManager.click()
}
,
Utils.extend(AchievementItem, Sprite),
Utils.extend(Options, Sprite),
Options.prototype.createChildren = function() {
    var t = new Sprite(null,this.stage.screenWidth,this.stage.screenHeight);
    t.fillColor = "rgba(0,0,0,0.7)",
    UI.preventAllEvents(t),
    this.addChild(t),
    this.addChild(UI.assetsLibrary.getSprite("dialogs/options"));
    var e = UI.assetsLibrary.getSprite("common/buttons/button_close");
    e.setPosition(162, -78),
    e.addEventListener("click", Utils.proxy(this.close, this)),
    this.addChild(e);
    var i = new UITextGold2(-120,-34,I18.f("Музыка:"));
    this.addChild(i);
    var s = new CheckBox(!TD.gameData.musicDisabled);
    if (s.setPosition(100, -34),
    s.onchange = Utils.proxy(this.toggleMusic, this),
    this.addChild(s),
    i = new UITextGold2(-120,10,I18.f("Звуки:")),
    this.addChild(i),
    (s = new CheckBox(!TD.gameData.soundsDisabled)).setPosition(100, 10),
    s.onchange = Utils.proxy(this.toggleSounds, this),
    this.addChild(s),
    "coolmath" != ExternalAPI.type) {
        var a = new TextButton("button_medium_long",I18.f("Играть снова"));
        a.textView.view.setScaleToFitContainer(120, .2, .8),
        a.textView.view.refresh(),
        a.textView.y = -2,
        a.setPosition(0, 67),
        a.onclick = Utils.proxy(this.onNewGame, this),
        this.addChild(a)
    }
}
,
Options.prototype.close = function() {
    this.destroy = !0,
    SoundsManager.click()
}
,
Options.prototype.toggleMusic = function(t) {
    TD.gameData.musicDisabled = !t.target.checked,
    TD.save(),
    TD.gameData.musicDisabled ? SoundsManager.pauseMusic() : TD.gameField || SoundsManager.resumeMusic()
}
,
Options.prototype.toggleSounds = function(t) {
    TD.gameData.soundsDisabled = !t.target.checked,
    TD.save()
}
,
Options.prototype.onNewGame = function() {
    var t = new NewGame;
    this.stage.addChild(t)
}
,
Utils.extend(LevelBanner, Sprite),
LevelBanner.prototype.startAnimation = function() {
    this.fadeTo(1, 1e3, null, Utils.proxy(this.wait, this))
}
,
LevelBanner.prototype.wait = function() {
    this.stage.setTimeout(Utils.proxy(this.hide, this), 1e3)
}
,
LevelBanner.prototype.hide = function() {
    this.fadeTo(0, 1e3, null, Utils.proxy(this.endAnimation, this))
}
,
LevelBanner.prototype.endAnimation = function() {
    this.callback && this.callback(),
    this.destroy = !0
}
,
Utils.extend(InGameMenu, Sprite),
InGameMenu.prototype.createChildren = function() {
    var t = new Sprite(null,this.stage.screenWidth,this.stage.screenHeight);
    t.fillColor = "rgba(0,0,0,0.7)",
    UI.preventAllEvents(t),
    this.addChild(t),
    this.addChild(UI.assetsLibrary.getSprite("dialogs/ingame"));
    var e = UI.assetsLibrary.getSprite("common/buttons/button_close");
    e.setPosition(166, -44),
    e.addEventListener("click", Utils.proxy(this.close, this)),
    this.addChild(e),
    (i = new CommonButton("button_medium_square","main_menu")).setPosition(-117, 20),
    i.addEventListener("click", Utils.proxy(this.onExit, this)),
    this.addChild(i);
    var i = new CommonButton("button_medium_square","restart");
    i.setPosition(-57, 20),
    i.addEventListener("click", Utils.proxy(this.onRestartLevel, this)),
    this.addChild(i),
    (i = new CommonButton("button_medium_square","ch_mission")).setPosition(3, 20),
    i.addEventListener("click", Utils.proxy(this.onLevelSelect, this)),
    this.addChild(i),
    (i = new CommonButton("button_medium_square","options")).setPosition(63, 20),
    i.onclick = TD.showOptions,
    this.addChild(i),
    (i = new CommonButton("button_medium_square","shop")).setPosition(123, 20),
    i.onclick = Utils.proxy(this.onShowShop, this),
    this.addChild(i)
}
,
InGameMenu.prototype.onExit = function() {
    Alert.create(I18.f("Вы уверены,/nчто хотите покинуть игру?"), this.processExit, !0)
}
,
InGameMenu.prototype.processExit = function(t) {
    t && TD.showMainMenu()
}
,
InGameMenu.prototype.onRestartLevel = function() {
    Alert.create(I18.f("Вы уверены,что/nхотите начать миссию заново?"), this.processRestartLevel, !0)
}
,
InGameMenu.prototype.processRestartLevel = function(t) {
    t && TD.restartLevel()
}
,
InGameMenu.prototype.onLevelSelect = function() {
    Alert.create(I18.f("Вы уверены,/nчто хотите покинуть игру?"), this.processLevelSelect, !0)
}
,
InGameMenu.prototype.processLevelSelect = function(t) {
    t && TD.showLevelSelectInCurrentChapter()
}
,
InGameMenu.prototype.close = function() {
    this.destroy = !0,
    SoundsManager.click()
}
,
InGameMenu.prototype.onShowShop = function() {
    var t = TD.showShop()
      , e = this;
    this.visible = !1,
    t.closeCallback = function() {
        TD.gameField.visible = !0,
        e.visible = !0,
        TD.updateBonusButtons(),
        TD.stage.refreshBackground()
    }
}
,
Utils.extend(NewGame, Sprite),
NewGame.prototype.createChildren = function() {
    this.setRelativePosition(0, 0);
    var t = new Sprite(null,this.stage.screenWidth,this.stage.screenHeight);
    t.fillColor = "rgba(0,0,0,0.7)",
    UI.preventAllEvents(t),
    this.addChild(t);
    var e = UI.assetsLibrary.getSprite("dialogs/new_game");
    this.addChild(e);
    var i, s = new UITextColor(0,-52,I18.f("Начать заново? Весь прогресс будет утерян."),UITextColor.defaultColor,!0);
    s.view.maxWidth = 280,
    s.view.valign = BitmapText.VALIGN_MIDDLE,
    s.setScale(.7),
    this.addChild(s),
    (s = new UITextColor(0,-20,I18.f("Выберите режим сложности"),UITextColor.defaultColor,!0)).view.maxWidth = 280,
    s.setScale(.7),
    this.addChild(s),
    (s = new UITextColor(-10,5,I18.f("Легкий"),UITextColor.defaultColor)).view.align = BitmapText.ALIGN_RIGHT,
    s.setScale(.7),
    this.addChild(s),
    (s = new UITextColor(-10,35,I18.f("Сложный"),UITextColor.defaultColor)).view.align = BitmapText.ALIGN_RIGHT,
    s.setScale(.7),
    this.addChild(s),
    (i = new CheckBox(0 == this.complexity)).setPosition(30, 5),
    i.addEventListener("click", this.changeComplexity),
    this.addChild(i),
    this.checkBoxEasy = i,
    (i = new CheckBox(1 == this.complexity)).setPosition(30, 35),
    i.addEventListener("click", this.changeComplexity),
    this.addChild(i),
    this.checkBoxHard = i;
    var a = new CommonButton("button_confirm_no","ico_yes_red");
    a.setPosition(80, 75),
    a.onclick = Utils.proxy(this.onYesClick, this),
    this.addChild(a);
    var o = new CommonButton("button_confirm_no","ico_no");
    o.setPosition(-80, 75),
    o.onclick = Utils.proxy(this.onNoClick, this),
    this.addChild(o)
}
,
NewGame.prototype.onYesClick = function() {
    this.destroy = !0,
    TD.gameData = TD.getDefaultGameData(this.complexity),
    TD.save(),
    TD.showMainMenu()
}
,
NewGame.prototype.onNoClick = function() {
    this.destroy = !0
}
,
NewGame.prototype.changeComplexity = function(t) {
    t.target == this.checkBoxEasy && (this.checkBoxEasy.setChecked(!0),
    this.checkBoxHard.setChecked(!1),
    this.complexity = 0),
    t.target == this.checkBoxHard && (this.checkBoxEasy.setChecked(!1),
    this.checkBoxHard.setChecked(!0),
    this.complexity = 1)
}
,
Utils.extend(Hint, Sprite),
Hint.SHOP_HINT = 2,
Hint.UPGRADE_HINT = 3,
Hint.REPAIR_HINT = 4,
Hint.SAVE_HINT = 5,
Hint.USE_SAVED_HINT = 7,
Hint.BUILD_HINT = 10,
Hint.PLAY_BUTTON = 11,
Hint.REPAIR_HINT2 = 12,
Hint.UPGRADE_HINT2 = 13,
Hint.prototype.createChildren = function() {
    this.setRelativePosition(0, 0);
    var t = new Sprite(null,this.stage.screenWidth,this.stage.screenHeight);
    if (setTimeout(Utils.proxy(function() {
        t.onmousedown = this.mouseControl,
        t.onmouseup = this.mouseControl,
        t.onclick = this.mouseControl
    }, this), 300),
    this.addChild(t),
    this.shader = t,
    this.text) {
        this.back = UI.assetsLibrary.getSprite("dialogs/tooltip"),
        this.addChild(this.back);
        var e = new UITextColor(2,5,this.text,"#b00e06",!0);
        e.view.valign = BitmapText.VALIGN_MIDDLE,
        e.view.maxWidth = 310,
        e.setScale(.6),
        this.back.addChild(e),
        this.arrow = UI.assetsLibrary.getSprite("common/hint_arrow"),
        this.arrow.setPosition(0, -38),
        this.back.addChild(this.arrow)
    }
}
,
Hint.prototype.setBackPosition = function(t, e) {
    this.back && this.back.setPosition(t, e)
}
,
Hint.prototype.setArrowPosition = function(t, e) {
    this.back && (this.arrow.x = t,
    "top" == e ? (this.arrow.scaleY = 1,
    this.arrow.y = -38) : (this.arrow.scaleY = -1,
    this.arrow.y = 38))
}
,
Hint.prototype.addTowerAnimation = function(t, e, i, s) {
    this.towerView = UI.assetsLibrary.getSprite("common/tower_hint"),
    this.addChild(this.towerView),
    this.towerViewFromX = t,
    this.towerViewFromY = e,
    this.towerViewToX = i,
    this.towerViewToY = s,
    this.playTowerAnimation()
}
,
Hint.prototype.playTowerAnimation = function() {
    this.towerView.setPosition(this.towerViewFromX, this.towerViewFromY),
    this.towerView.moveTo(this.towerViewToX, this.towerViewToY, 1e3, null, this.replayTowerAnimation)
}
,
Hint.prototype.replayTowerAnimation = function() {
    this.stage && this.stage.setTimeout(this.playTowerAnimation, 500)
}
,
Hint.prototype.mouseControl = function(t) {
    if (!this.destroy) {
        if (this.handView) {
            var e = t.x - this.handView.pointerX
              , i = t.y - this.handView.pointerY;
            if (20 < Math.sqrt(e * e + i * i))
                return !1
        }
        this.close()
    }
}
,
Hint.prototype.close = function() {
    this.closeCallback && this.closeCallback(this),
    this.destroy = !0
}
,
Hint.prototype.addHand = function(t, e, i) {
    this.shader.fillColor = "rgba(0,0,0,0.3)",
    this.handView = UI.assetsLibrary.getSprite("common/hint_hand"),
    this.addChild(this.handView),
    this.handView.scaleY = i,
    this.handView.setPosition(t, e),
    this.handView.pointerX = t,
    this.handView.pointerY = e,
    this.moveHandFrom()
}
,
Hint.prototype.moveHandFrom = function() {
    this.handView.moveTo(this.handView.x, this.handView.y + 10 * this.handView.scaleY, 500, null, this.moveHandTo)
}
,
Hint.prototype.moveHandTo = function() {
    this.handView.moveTo(this.handView.x, this.handView.y + 10 * this.handView.scaleY * -1, 500, null, this.moveHandFrom)
}
,
Hint.show = function(a, o, n) {
    return !TD.gameData.viewedHints[a] && (DataCache.load("data/game/tooltip.json", function(t) {
        var e = t.tips.tip[a]
          , i = new Hint(e ? I18.f(TD.getAttr(e, "text")) : "");
        i.hintId = a,
        TD.stage.addChild(i);
        var s = {};
        o && ((s = o.getAbsoluteCenter()).x -= this.stage.screenWidth / 2,
        s.y -= this.stage.screenHeight / 2 - 6,
        i.targetObject = o),
        a != Hint.REPAIR_HINT && a != Hint.UPGRADE_HINT || (i.setBackPosition(s.x, s.y - 60),
        i.setArrowPosition(0, "bottom"),
        i.addHand(s.x, s.y, 1)),
        a == Hint.REPAIR_HINT2 && i.addHand(s.x + 32, s.y + 34, 1),
        a == Hint.UPGRADE_HINT2 && i.addHand(s.x, s.y - 50, 1),
        a == Hint.SHOP_HINT && (i.setBackPosition(s.x - 40, s.y - 70),
        i.setArrowPosition(40, "bottom")),
        a == Hint.USE_SAVED_HINT && (i.setBackPosition(-150, 90),
        i.setArrowPosition(-70, "bottom")),
        a == Hint.SAVE_HINT && (i.addTowerAnimation(s.x, s.y, -222, 172),
        i.setBackPosition(-150, 110),
        i.setArrowPosition(-70, "bottom")),
        a == Hint.BUILD_HINT && i.addTowerAnimation(225, 172, 30, -42),
        a == Hint.PLAY_BUTTON && i.addHand(230, -165, 1),
        i.closeCallback = n
    }),
    TD.gameData.viewedHints[a] = 1,
    TD.save(),
    !0)
}
,
Utils.extend(Comics, Sprite),
Comics.prototype.startAnimation = function() {
    this.stage.setTimeout(Utils.proxy(this.fadeComics, this), 1e3)
}
,
Comics.prototype.fadeComics = function() {
    this.fadeTo(0, 1e3, null, TD.showChapterSelect)
}
,
Utils.extend(LevelPreloader, Sprite),
LevelPreloader.prototype.createChildren = function() {
    var t = UI.assetsLibrary.getSprite("mainmenu/background_0");
    this.addChild(t),
    t.setStatic(!0);
    var e = UI.assetsLibrary.getSprite("mainmenu/logo_btns_0");
    e.setPosition(0, -20),
    this.addChild(e),
    e.setStatic(!0);
    var i = UI.assetsLibrary.getSprite("mainmenu/logo_text");
    i.setPosition(0, 10),
    this.addChild(i),
    i.setStatic(!0);
    var s = "#fee57c"
      , a = new Graphics.rectangle(0,130,300,20);
    a.color = s,
    this.addChild(a),
    this.bar = new Graphics.rectangle(0,130,0,16),
    this.bar.color = s,
    this.bar.fillColor = s,
    this.addChild(this.bar),
    this.setRelativePosition(0, 0),
    this.showProgress(0)
}
,
LevelPreloader.prototype.showProgress = function(t) {
    t < 0 && (t = 0),
    100 < t && (t = 100),
    this.bar.width = t / 100 * 296,
    this.bar.x = this.bar.width / 2 - 148
}
,
Utils.extend(GunFire, Sprite),
GunFire.controlAnimation = function(t) {
    4 == t.target.currentFrame && (t.target.destroy = !0)
}
,
Utils.extend(StarsShop, Sprite),
StarsShop.prototype.createChildren = function() {
    var t = UI.assetsLibrary.getSprite("stars_shop/background_0");
    this.addChild(t),
    t.setStatic(!0);
    var e = UI.assetsLibrary.getSprite("stars_shop/banner");
    e.setPosition(-112, -129),
    this.addChild(e),
    e.setStatic(!0);
    var i = new UITextGold2(-144,-138,I18.f("Акция") + " +30%",!0);
    this.addChild(i),
    i.setScale(.5),
    i.setStatic(!0),
    this.actionText = new UITextGold2(-144,-122,"1235648",!0),
    this.addChild(this.actionText),
    this.actionText.setScale(.5),
    this.stars = new UITextGold2(112,-129,"©" + TD.gameData.stars,!0),
    this.addChild(this.stars);
    var s = UI.assetsLibrary.getSprite("common/buttons/button_close");
    s.setPosition(220, -139),
    s.onclick = Utils.proxy(this.close, this),
    this.addChild(s),
    ExternalAPI.exec("loadPurchases", Utils.proxy(this.showPurchases, this)),
    TD.stage.refreshBackground()
}
,
StarsShop.prototype.tickAction = function() {
    this.actionText.update(TD.getDayRemainStr())
}
,
StarsShop.prototype.showPurchases = function(t) {
    t.sort(function(t, e) {
        return t.value == e.value ? 0 : 1 * t.value > 1 * e.value ? 1 : -1
    });
    for (var e, i, s, a, o = 0, n = 0, r = 0; r < t.length; r++)
        (e = UI.assetsLibrary.getSprite("stars_shop/plate")).setPosition(150 * o - 150, 130 * n - 43),
        (i = UI.assetsLibrary.getSprite("stars_shop/icons/" + (r + 1))).setPosition(0, -5),
        e.addChild(i),
        (s = new UITextGold(0,-50,t[r].value + (t[r].bonus ? " +" + t[r].bonus : ""),!0)).setScale(.5),
        e.addChild(s),
        (a = new UITextGold(0,50,t[r].cost + " " + ExternalAPI.exec("getCurrencyName", t[r].cost, I18.currentLocale),!0)).setScale(.5),
        e.addChild(a),
        e.purchase = t[r],
        e.onclick = this.purchase,
        this.addChild(e),
        e.setStatic(!0),
        3 <= ++o && (n++,
        o = 0);
    TD.stage.refreshBackground()
}
,
StarsShop.prototype.close = function() {
    SoundsManager.click(),
    this.destroy = !0,
    this.closeCallback ? this.closeCallback() : TD.showMainMenu(),
    TD.stage.refreshBackground()
}
,
StarsShop.prototype.forceRefresh = function() {
    this.stars.update("©" + TD.gameData.stars)
}
,
StarsShop.prototype.purchase = function(t) {
    SoundsManager.click();
    var e = t.target.purchase
      , i = {
        name: ExternalAPI.embedMode ? t.target.purchaseName : "stars",
        description: I18.f("Купить") + " " + (1 * e.value + 1 * e.bonus),
        code: e.code,
        publisher_id: e.publisher_id,
        cost: e.cost,
        value: e.value,
        bonus: e.bonus,
        lang: I18.currentLocale
    };
    ExternalAPI.clientPayment && (StarsShop.lastClientPayment = i,
    ExternalAPI.clientPaymentCallback = StarsShop.clientPaymentSuccess),
    ExternalAPI.exec("purchase", i);
    var s = new Sprite(null,TD.stage.screenWidth,TD.stage.screenHeight);
    s.fillColor = "rgba(0,0,0,0.65)",
    UI.preventAllEvents(s),
    this.addChild(s);
    var a = UI.assetsLibrary.getSprite("hourglass");
    s.addChild(a),
    ExternalAPI.onEndServerRequest = function() {
        s.destroy = !0,
        ExternalAPI.onEndServerRequest = null
    }
}
,
StarsShop.lastClientPayment = null,
StarsShop.clientPaymentSuccess = function() {
    TD.gameData.stars += 1 * StarsShop.lastClientPayment.value + 1 * StarsShop.lastClientPayment.bonus,
    TD.save(),
    TD.refreshCurrentWindow(),
    StarsShop.lastClientPayment = null
}
,
Utils.extend(ShopBonusPage, Sprite),
ShopBonusPage.prototype.setVisible = function(t) {
    t = !!t,
    this.isVisible = t;
    for (var e = 1; e < this.buttons.length; e++)
        this.buttons[e].visible = t;
    this.back.visible = t,
    this.stage.refreshBackground()
}
,
ShopBonusPage.prototype.update = function() {
    for (var t = 1; t < this.buttons.length; t++)
        this.buttons[t].update()
}
,
Utils.extend(ShopBonusButton, Sprite),
ShopBonusButton.prototype.setEnabled = function(t) {
    var e;
    this.enabled !== !!t && (this.enabled = !!t,
    e = this.enabled ? UI.getAssetByTexture(TD.getAttr(this.config.button.out, "texture")) : UI.getAssetByTexture(TD.getAttr(this.config.button.grayed, "texture")),
    this.bitmap = e.bitmap,
    this.width = e.width,
    this.height = e.height,
    this.costText.visible = this.enabled)
}
,
ShopBonusButton.prototype.update = function() {
    var t = TD.getAttr(this.config, "id");
    this.setEnabled(TD.isBonusEnabled(t)),
    this.countText.update(TD.gameData.bonuses[t].count)
}
,
Utils.extend(ShopBonusPanel, Sprite),
ShopBonusPanel.prototype.update = function(t) {
    if (t && (this.source = t),
    this.clear(),
    this.title = new UITextColor(-75,-85,I18.f(TD.getAttr(this.source.config, "title")),UITextColor.defaultColor,!1),
    this.title.setScale(.7),
    this.title.view.static = !0,
    this.addChild(this.title),
    this.description = new UITextColor(-75,-63,I18.f(TD.getAttr(this.source.config, "description")),UITextColor.defaultColor,!1),
    this.description.view.maxWidth = 300,
    this.description.view.static = !0,
    this.description.setScale(.5),
    this.addChild(this.description),
    this.stars = new UITextGold2(70,86,"©" + TD.gameData.stars),
    this.addChild(this.stars),
    this.stars.view.align = BitmapText.ALIGN_RIGHT,
    this.stars.view.refresh(),
    this.source.enabled) {
        var e = 1 * TD.getAttr(this.source.config, "pack")
          , i = 1 * TD.getAttr(this.source.config, "price");
        this.countText1 = new UITextColor(-75,45,"+" + e,UITextColor.defaultColor,!1),
        this.countText1.view.static = !0,
        this.addChild(this.countText1),
        this.buyButton1 = new TextButton("button_shop_small","©" + i),
        this.buyButton1.setPosition(29, 45),
        this.addChild(this.buyButton1),
        this.buyButton1.setStatic(!0),
        this.buyButton1.onclick = this.onBuy1,
        this.buyButton1.enabled = TD.gameData.stars >= i,
        this.buyButton1.opacity = this.buyButton1.enabled ? 1 : .5,
        e = 1 * TD.getAttr(this.source.config, "pack_2"),
        i = 1 * TD.getAttr(this.source.config, "price_2"),
        this.countText2 = new UITextColor(-75,0,"+" + e,UITextColor.defaultColor,!1),
        this.countText2.view.static = !0,
        this.addChild(this.countText2),
        this.buyButton2 = new TextButton("button_shop_small","©" + i),
        this.buyButton2.setPosition(29, 0),
        this.addChild(this.buyButton2),
        this.buyButton2.setStatic(!0),
        this.buyButton2.onclick = this.onBuy2,
        this.buyButton2.enabled = TD.gameData.stars >= i,
        this.buyButton2.opacity = this.buyButton2.enabled ? 1 : .5
    } else {
        var s = TD.getAttr(this.source.config, "id");
        this.errorText = new UITextColor(-75,-20,I18.f("Будет доступно с %d уровня", TD.configs.bonuses[s].unlock_level),"#ff5050",!1),
        this.errorText.view.maxWidth = 300,
        this.errorText.view.static = !0,
        this.errorText.setScale(.5),
        this.addChild(this.errorText);
        var a = TD.configs.bonuses[s].unlock_price
          , o = TD.configs.bonuses[s].unlock_count;
        this.unlockText = new UITextColor(-75,1,I18.f("Открыть сейчас за %d звёзд и получить %d заряда?", a, o),UITextColor.defaultColor,!1),
        this.unlockText.view.maxWidth = 300,
        this.unlockText.view.static = !0,
        this.unlockText.setScale(.5),
        this.addChild(this.unlockText),
        this.unlockCountText = new UITextColor(-65,45,"+" + o,UITextColor.defaultColor,!1),
        this.unlockCountText.view.static = !0,
        this.addChild(this.unlockCountText),
        this.unlockButton = new TextButton("button_shop_small","©" + a),
        this.unlockButton.setPosition(29, 45),
        this.addChild(this.unlockButton),
        this.unlockButton.setStatic(!0),
        this.unlockButton.onclick = this.onUnlock,
        this.unlockButton.enabled = TD.gameData.stars >= a,
        this.unlockButton.opacity = this.unlockButton.enabled ? 1 : .5
    }
    this.stage.refreshBackground()
}
,
ShopBonusPanel.prototype.refresh = function() {
    this.update(this.source)
}
,
ShopBonusPanel.prototype.onUnlock = function(t) {
    if (t.target.enabled) {
        var e = TD.getAttr(this.source.config, "id")
          , i = TD.configs.bonuses[e].unlock_price;
        if (!(i > TD.gameData.stars)) {
            TD.gameData.stars -= i;
            var s = TD.gameData.bonuses[e];
            s.unlocked = !0,
            s.count += TD.configs.bonuses[e].unlock_count,
            TD.save(),
            this.parent.refreshBonusesPage(),
            this.update(),
            SoundsManager.click()
        }
    }
}
,
ShopBonusPanel.prototype.onBuy1 = function(t) {
    t.target.enabled && this.buy(1 * TD.getAttr(this.source.config, "price"), 1 * TD.getAttr(this.source.config, "pack"))
}
,
ShopBonusPanel.prototype.onBuy2 = function(t) {
    t.target.enabled && this.buy(1 * TD.getAttr(this.source.config, "price_2"), 1 * TD.getAttr(this.source.config, "pack_2"))
}
,
ShopBonusPanel.prototype.buy = function(t, e) {
    t > TD.gameData.stars || (TD.gameData.stars -= t,
    TD.gameData.bonuses[TD.getAttr(this.source.config, "id")].count += e,
    TD.save(),
    this.parent.refreshBonusesPage(),
    this.update(),
    SoundsManager.click())
}
,
Utils.extend(BonusButton, Sprite),
BonusButton.prototype.createChildren = function() {
    this.icon = new Sprite(null,1,1),
    this.addChild(this.icon),
    this.coolDownView = new Graphics.arc(0,0,28,0,2 * Math.PI),
    this.coolDownView.color = "#3a3",
    this.coolDownView.lineWidth = 5,
    this.coolDownView.rotation = -Math.PI / 2,
    this.addChild(this.coolDownView),
    this.countBox = UI.assetsLibrary.getSprite("game/infobar/price_back_0"),
    this.countBox.setPosition(22, -16),
    this.addChild(this.countBox),
    this.countText = new UITextRed(0,.5,"",!0),
    this.countBox.addChild(this.countText),
    this.countText.setScale(.5),
    this.lockIcon = UI.assetsLibrary.getSprite("game/infobar/lock_big"),
    this.lockIcon.setPosition(22, 16),
    this.addChild(this.lockIcon),
    this.setPropScale(.65)
}
,
BonusButton.prototype.update = function(t) {
    var e = UI.assetsLibrary.getSprite(this.busyTimeout ? TD.configs.bonuses[this.id].asset_busy : TD.configs.bonuses[this.id].asset);
    this.icon.bitmap = e.bitmap,
    this.icon.width = e.width,
    this.icon.height = e.height,
    this.countText.update(TD.gameData.bonuses[this.id].count),
    this.lockIcon.visible = !this.enabled,
    this.coolDownView.visible = 0 < this.busyTimeout
}
,
BonusButton.prototype.use = function() {
    SoundsManager.click(),
    this.enabled && (this.busyTimeout || TD.gameData.bonuses[this.id].count <= 0 || (this.busyTimeout = this.baseTimeout,
    "ressurections" == this.id ? this.setActive(!this.active) : (TD.useBonus(this.id),
    TD.spendBonus(this.id)),
    this.update()))
}
,
BonusButton.prototype.setActive = function(t) {
    this.active = !!t,
    this.active ? (this.startBlink(),
    TD.useBonus(this.id)) : (this.stopBlink(),
    TD.endBonus(this.id))
}
,
BonusButton.prototype.startBlink = function() {
    this.stopBlink(),
    this.fadeOut()
}
,
BonusButton.prototype.fadeOut = function() {
    this.fadeTo(0, 500, null, this.fadeIn)
}
,
BonusButton.prototype.fadeIn = function() {
    this.fadeTo(1, 500, null, this.fadeOut)
}
,
BonusButton.prototype.stopBlink = function() {
    this.removeTweens(),
    this.opacity = 1
}
,
BonusButton.prototype.tick = function(t) {
    0 < this.busyTimeout && (this.busyTimeout -= t,
    this.busyTimeout <= 0 ? (this.busyTimeout = 0,
    this.update(),
    TD.endBonus(this.id)) : this.coolDownView.startAngle = 2 * Math.PI * (1 - this.busyTimeout / this.baseTimeout))
}
,
Utils.extend(ShopButton, CommonButton),
ShopButton.prototype.update = function() {
    this.actionText.update(TD.getDayRemainStr())
}
,
Utils.extend(InGameShop, Sprite),
InGameShop.prototype.close = function() {
    this.destroy = !0,
    this.stage.refreshBackground(),
    this.closeCallback && this.closeCallback(),
    SoundsManager.click()
}
,
InGameShop.prototype.createChildren = function() {
    var t = UI.assetsLibrary.getSprite("in_game_shop/background");
    this.addChild(t),
    t.setStatic(!0),
    UI.preventAllEvents(t);
    var e = UI.assetsLibrary.getSprite("common/buttons/button_close");
    e.setPosition(220, -139),
    e.onclick = Utils.proxy(this.close, this),
    this.addChild(e);
    var i, s = new UITextGold2(0,-132,I18.f("БАНК"),!0);
    this.addChild(s),
    s.setStatic(!0),
    this.lifeText = new UITextYellow(-76,92,""),
    this.lifeText.view.align = BitmapText.ALIGN_RIGHT,
    this.addChild(this.lifeText),
    this.lifeText.setStatic(!0),
    this.starsText = new UITextYellow(48,92,""),
    this.starsText.view.align = BitmapText.ALIGN_RIGHT,
    this.addChild(this.starsText),
    this.starsText.setStatic(!0),
    this.moneyText = new UITextYellow(172,92,""),
    this.moneyText.view.align = BitmapText.ALIGN_RIGHT,
    this.addChild(this.moneyText),
    this.moneyText.setStatic(!0);
    for (var a = 0; a < InGameShop.lifePacks.length; a++)
        (i = new TextButton("button_medium_long","©" + InGameShop.lifePacks[a].cost + " > ⇒" + InGameShop.lifePacks[a].value)).setPosition(-100, 40 * a - 83),
        this.addChild(i),
        i.textView.setScale(.8),
        i.config = InGameShop.lifePacks[a],
        this.buttons.push(i),
        i.setStatic(!0),
        i.onclick = this.buy;
    for (a = 0; a < InGameShop.moneyPacks.length; a++)
        (i = new TextButton("button_medium_long","©" + InGameShop.moneyPacks[a].cost + " > ®" + InGameShop.moneyPacks[a].value)).setPosition(103, 40 * a - 83),
        this.addChild(i),
        i.textView.setScale(.8),
        i.config = InGameShop.moneyPacks[a],
        this.buttons.push(i),
        i.setStatic(!0),
        i.onclick = this.buy;
    ExternalAPI.paymentsEnabled && ((i = new TextButton("button_medium_long",I18.f("Купить ©"))).setPosition(0, 132),
    this.addChild(i),
    i.textView.setScale(.9),
    i.setStatic(!0),
    i.onclick = this.onShowStarsShop),
    this.update(),
    ExternalAPI.exec("addY8Logos", -stage.screenWidth / 2 + 50, -stage.screenHeight / 2 + 40, stage.screenWidth / 2 - 50, -stage.screenHeight / 2 + 40, this)
}
,
InGameShop.prototype.update = function() {
    var t;
    this.lifeText.update("© " + TD.gameField.life),
    this.starsText.update("_ " + TD.gameData.stars),
    this.moneyText.update("@ " + TD.gameField.money);
    for (var e = 0; e < this.buttons.length; e++)
        (t = this.buttons[e]).enabled = t.config.cost <= TD.gameData.stars,
        t.opacity = t.enabled ? 1 : .5;
    this.stage.refreshBackground()
}
,
InGameShop.prototype.buy = function(t) {
    var e = t.target.config;
    e.cost > TD.gameData.stars || (TD.gameData.stars -= e.cost,
    TD.save(),
    "life" == e.result && (TD.gameField.life += e.value),
    "money" == e.result && (TD.gameField.money += e.value),
    this.update())
}
,
InGameShop.prototype.onShowStarsShop = function() {
    this.visible = !1,
    TD.showStarsShop(Utils.proxy(function() {
        this.visible = !0,
        this.update(),
        this.stage.refreshBackground()
    }, this)),
    this.stage.refreshBackground()
}
,
InGameShop.lifePacks = [{
    result: "life",
    cost: 25,
    value: 1
}, {
    result: "life",
    cost: 50,
    value: 10
}, {
    result: "life",
    cost: 100,
    value: 50
}, {
    result: "life",
    cost: 250,
    value: 100
}],
InGameShop.moneyPacks = [{
    result: "money",
    cost: 5,
    value: 50
}, {
    result: "money",
    cost: 20,
    value: 200
}, {
    result: "money",
    cost: 50,
    value: 500
}, {
    result: "money",
    cost: 100,
    value: 1e3
}],
Utils.extend(UIText, Sprite),
UIText.prototype.update = function(t) {
    this.text !== t && (this.text = t,
    this.view.write(this.textPrefix + t))
}
,
UIText.prototype.setScale = function(t) {
    this.view.scale = t,
    this.view.refresh()
}
,
UIText.prototype.animatedNumericUpdate = function(t, e) {
    if (this.text !== t && this.textTo !== t) {
        var i = Math.abs(1 * t - 1 * this.text);
        this.animateTween && (this.animateTween.pause(),
        this.animateTween.destroy = !0,
        this.onAnimateFinish && this.onAnimateFinish(),
        this.text = this.textTo),
        this.textTo = t,
        this.onAnimateFinish = e,
        this.animateTween = this.stage.createTween(this, "text", 1 * this.text, 1 * t, 2 * i, null),
        this.animateTween.onchange = this.updateOnTween,
        this.animateTween.onfinish = this.updateOnTweenFinish,
        this.animateTween.play()
    }
}
,
UIText.prototype.updateOnTween = function(t) {
    t.target.obj.text = Math.floor(t.target.obj.text),
    t.target.obj.view.write(t.target.obj.textPrefix + t.target.obj.text)
}
,
UIText.prototype.updateOnTweenFinish = function(t) {
    t.target.obj.updateOnTween(t),
    t.target.obj.onAnimateFinish && t.target.obj.onAnimateFinish()
}
,
UIText.prototype.setStatic = function(t) {
    Utils.callSuperMethod(UIText, this, "setStatic", t),
    this.view.static = t
}
,
UIText.prototype.setSkin = function(t) {}
,
UIText.prototype.cacheAsBitmap = function() {
    Number.MAX_VALUE,
    Number.MAX_VALUE,
    Number.MIN_VALUE,
    Number.MIN_VALUE
}
,
Utils.extend(UITextNumbers, UIText),
Utils.extend(UITextNumbersSmall, UIText),
Utils.extend(UITextSmall, UIText),
UITextSmall.prototype.setSkin = function(t) {
    var e = "fonts/font_shilda1";
    "disabled" == t && (e = "fonts/font_shilda1_disabled");
    var i = UI.assetsLibrary.getBitmap(e);
    this.view.font = [i],
    this.view.write(this.text)
}
,
Utils.extend(UITextSmallBlack, UIText),
Utils.extend(UITextGold, UIText),
Utils.extend(UITextGold2, UIText),
Utils.extend(UITextColor, UIText),
UITextColor.defaultColor = "#eecd6e",
UITextColor.bitmapsCahce = {},
UITextColor.getBitmap = function(t) {
    if (UITextColor.bitmapsCahce[t])
        return UITextColor.bitmapsCahce[t];
    var e = UI.assetsLibrary.getBitmap("fonts/soldier_font5")
      , i = document.createElement("canvas");
    i.width = e.width,
    i.height = e.height;
    var s = i.getContext("2d");
    return s.drawImage(e, 0, 0),
    s.globalCompositeOperation = "source-in",
    s.fillStyle = t,
    s.fillRect(0, 0, e.width, e.height),
    s.globalCompositeOperation = "source-over",
    e = UI.assetsLibrary.getBitmap("fonts/soldier_font5_rect"),
    s.drawImage(e, 0, 0),
    UITextColor.bitmapsCahce[t] = i
}
,
Utils.extend(UITextRed, UIText),
Utils.extend(UITextYellow, UIText),
UI.fonts.font_shilda = [{
    id: 37,
    x: 0,
    y: 0,
    width: 18,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 48,
    x: 18.5,
    y: 0,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 49,
    x: 33.5,
    y: 0,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 50,
    x: 48.5,
    y: 0,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 51,
    x: 0,
    y: 15,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 52,
    x: 15,
    y: 15,
    width: 15,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 53,
    x: 30.5,
    y: 15,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 54,
    x: 45.5,
    y: 15,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 55,
    x: 0,
    y: 30,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 56,
    x: 15,
    y: 30,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 57,
    x: 30,
    y: 30,
    width: 14.5,
    height: 14.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}],
UI.fonts.font_shilda1 = [{
    id: 37,
    x: 0,
    y: 0,
    width: 13.5,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 48,
    x: 14,
    y: 0,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 49,
    x: 24.5,
    y: 0,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 50,
    x: 35,
    y: 0,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 51,
    x: 45.5,
    y: 0,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 52,
    x: 0,
    y: 13.5,
    width: 10.5,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 53,
    x: 11,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 54,
    x: 21.5,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 55,
    x: 32,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 56,
    x: 42.5,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 57,
    x: 53,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}],
UI.fonts.font_shilda1_disabled = [{
    id: 37,
    x: 0,
    y: 0,
    width: 13.5,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 48,
    x: 14,
    y: 0,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 49,
    x: 24.5,
    y: 0,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 50,
    x: 35,
    y: 0,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 51,
    x: 45.5,
    y: 0,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 52,
    x: 0,
    y: 13.5,
    width: 10.5,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 53,
    x: 11,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 54,
    x: 21.5,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 55,
    x: 32,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 56,
    x: 42.5,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 57,
    x: 53,
    y: 13.5,
    width: 10,
    height: 13,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}],
UI.fonts.number_font = [{
    id: 43,
    x: 153.5,
    y: 56.5,
    width: 34,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 27.5
}, {
    id: 45,
    x: 188,
    y: 56.5,
    width: 26.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21.5
}, {
    id: 47,
    x: 215,
    y: 56.5,
    width: 26.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21.5
}, {
    id: 48,
    x: 0,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 49,
    x: 34.5,
    y: 113,
    width: 26,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 50,
    x: 32,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 51,
    x: 64,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 52,
    x: 96,
    y: 0,
    width: 32.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 26
}, {
    id: 53,
    x: 129,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 54,
    x: 161,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 55,
    x: 193,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 56,
    x: 0,
    y: 56.5,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 57,
    x: 32,
    y: 56.5,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 61,
    x: 0,
    y: 113,
    width: 34,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 27.5
}, {
    id: 64,
    x: 64,
    y: 56.5,
    width: 46,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 37
}, {
    id: 95,
    x: 110.5,
    y: 56.5,
    width: 42.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 34
}],
UI.fonts.number_font_small = [{
    id: 43,
    x: 153.5,
    y: 56.5,
    width: 34,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 27.5
}, {
    id: 45,
    x: 188,
    y: 56.5,
    width: 26.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21.5
}, {
    id: 47,
    x: 215,
    y: 56.5,
    width: 26.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21.5
}, {
    id: 48,
    x: 0,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 49,
    x: 34.5,
    y: 113,
    width: 26,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 50,
    x: 32,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 51,
    x: 64,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 52,
    x: 96,
    y: 0,
    width: 32.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 26
}, {
    id: 53,
    x: 129,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 54,
    x: 161,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 55,
    x: 193,
    y: 0,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 56,
    x: 0,
    y: 56.5,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 57,
    x: 32,
    y: 56.5,
    width: 31.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 61,
    x: 0,
    y: 113,
    width: 34,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 27.5
}, {
    id: 64,
    x: 64,
    y: 56.5,
    width: 46,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 37
}, {
    id: 95,
    x: 110.5,
    y: 56.5,
    width: 42.5,
    height: 56,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 34
}],
function() {
    var t, e = UI.fonts.number_font_small;
    for (var i in e)
        (t = e[i]).x /= 2,
        t.y /= 2,
        t.width /= 2,
        t.height /= 2,
        t.xoffset /= 2,
        t.yoffset /= 2,
        t.xadvance /= 2
}(),
UI.fonts.soldier_font1 = [{
    id: 32,
    x: 241,
    y: 150,
    width: 7.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 33,
    x: 249,
    y: 150,
    width: 9.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 34,
    x: 259,
    y: 150,
    width: 9,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 35,
    x: 268.5,
    y: 150,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 36,
    x: 282.5,
    y: 150,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 37,
    x: 296.5,
    y: 150,
    width: 19,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 38,
    x: 316,
    y: 150,
    width: 19,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 39,
    x: 335.5,
    y: 150,
    width: 6.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6
}, {
    id: 40,
    x: 342.5,
    y: 150,
    width: 8,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 41,
    x: 351,
    y: 150,
    width: 8,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 42,
    x: 359.5,
    y: 150,
    width: 11,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 43,
    x: 371,
    y: 150,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 44,
    x: 386,
    y: 150,
    width: 8,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 45,
    x: 394.5,
    y: 150,
    width: 11.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 46,
    x: 406.5,
    y: 150,
    width: 8,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 47,
    x: 415,
    y: 150,
    width: 11.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 48,
    x: 220.5,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 49,
    x: 235.5,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 50,
    x: 250.5,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 51,
    x: 265.5,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 52,
    x: 280.5,
    y: 210,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 53,
    x: 296,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 54,
    x: 311,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 55,
    x: 326,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 56,
    x: 341,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 57,
    x: 356,
    y: 210,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 58,
    x: 427,
    y: 150,
    width: 8,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 59,
    x: 435.5,
    y: 150,
    width: 8,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 60,
    x: 444,
    y: 150,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 61,
    x: 459,
    y: 150,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 62,
    x: 474,
    y: 150,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 63,
    x: 489,
    y: 150,
    width: 11.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 64,
    x: 0,
    y: 180,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 65,
    x: 0,
    y: 0,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 66,
    x: 18.5,
    y: 0,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 67,
    x: 34,
    y: 0,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 68,
    x: 51,
    y: 0,
    width: 17,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 69,
    x: 68.5,
    y: 0,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 70,
    x: 82.5,
    y: 0,
    width: 12,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 71,
    x: 95,
    y: 0,
    width: 16,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 72,
    x: 111.5,
    y: 0,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 73,
    x: 128.5,
    y: 0,
    width: 9.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 74,
    x: 138.5,
    y: 0,
    width: 9.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 75,
    x: 148.5,
    y: 0,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 76,
    x: 165.5,
    y: 0,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 77,
    x: 179.5,
    y: 0,
    width: 21,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 78,
    x: 201,
    y: 0,
    width: 17.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 79,
    x: 219,
    y: 0,
    width: 19,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 80,
    x: 238.5,
    y: 0,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 81,
    x: 433,
    y: 210,
    width: 21,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 82,
    x: 253,
    y: 0,
    width: 16,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 83,
    x: 269.5,
    y: 0,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 84,
    x: 284,
    y: 0,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 85,
    x: 298,
    y: 0,
    width: 17,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 86,
    x: 315.5,
    y: 0,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 87,
    x: 332.5,
    y: 0,
    width: 23.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 88,
    x: 356.5,
    y: 0,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 89,
    x: 373.5,
    y: 0,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 90,
    x: 388.5,
    y: 0,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 91,
    x: 18.5,
    y: 180,
    width: 8.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 92,
    x: 27.5,
    y: 180,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 93,
    x: 42,
    y: 180,
    width: 8.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 94,
    x: 51,
    y: 180,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 95,
    x: 66,
    y: 180,
    width: 17.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 96,
    x: 84,
    y: 180,
    width: 11,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 97,
    x: 404.5,
    y: 0,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 98,
    x: 419,
    y: 0,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 99,
    x: 435,
    y: 0,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 100,
    x: 449,
    y: 0,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 101,
    x: 465,
    y: 0,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 102,
    x: 480,
    y: 0,
    width: 10.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 103,
    x: 491,
    y: 0,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 104,
    x: 0,
    y: 30,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 105,
    x: 15.5,
    y: 30,
    width: 9,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 106,
    x: 25,
    y: 30,
    width: 8.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 107,
    x: 34,
    y: 30,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 108,
    x: 233.5,
    y: 150,
    width: 7,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 5
}, {
    id: 109,
    x: 49,
    y: 30,
    width: 21,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 110,
    x: 70.5,
    y: 30,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 111,
    x: 86,
    y: 30,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 112,
    x: 101.5,
    y: 30,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 113,
    x: 117.5,
    y: 30,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 114,
    x: 133.5,
    y: 30,
    width: 11.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 115,
    x: 145.5,
    y: 30,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 116,
    x: 159,
    y: 30,
    width: 10.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 117,
    x: 170,
    y: 30,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 118,
    x: 185.5,
    y: 30,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 119,
    x: 198.5,
    y: 30,
    width: 19.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 120,
    x: 218.5,
    y: 30,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 121,
    x: 233,
    y: 30,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 122,
    x: 246.5,
    y: 30,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 123,
    x: 95.5,
    y: 180,
    width: 8.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 124,
    x: 104.5,
    y: 180,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 125,
    x: 119.5,
    y: 180,
    width: 8.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 126,
    x: 128.5,
    y: 180,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 161,
    x: 143.5,
    y: 180,
    width: 9.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 162,
    x: 153.5,
    y: 180,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 163,
    x: 167.5,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 164,
    x: 180.5,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 165,
    x: 193.5,
    y: 180,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 166,
    x: 209,
    y: 180,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 167,
    x: 224,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 168,
    x: 237,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 169,
    x: 371,
    y: 210,
    width: 20,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 170,
    x: 250,
    y: 180,
    width: 10,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 171,
    x: 260.5,
    y: 180,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 172,
    x: 274,
    y: 180,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 173,
    x: 289,
    y: 180,
    width: 11.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 174,
    x: 391.5,
    y: 210,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 175,
    x: 301,
    y: 180,
    width: 12,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 176,
    x: 313.5,
    y: 180,
    width: 9,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 177,
    x: 323,
    y: 180,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 180,
    x: 338,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 181,
    x: 351,
    y: 180,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 187,
    x: 365.5,
    y: 180,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 191,
    x: 379,
    y: 180,
    width: 11,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 192,
    x: 260,
    y: 30,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 193,
    x: 278.5,
    y: 30,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 194,
    x: 297,
    y: 30,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 195,
    x: 315.5,
    y: 30,
    width: 17.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 196,
    x: 333.5,
    y: 30,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 197,
    x: 352,
    y: 30,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 198,
    x: 370.5,
    y: 30,
    width: 23.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 199,
    x: 394.5,
    y: 30,
    width: 16,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 200,
    x: 411,
    y: 30,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 201,
    x: 424.5,
    y: 30,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 202,
    x: 438.5,
    y: 30,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 203,
    x: 452.5,
    y: 30,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 204,
    x: 466,
    y: 30,
    width: 9.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 205,
    x: 476,
    y: 30,
    width: 10,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 206,
    x: 486.5,
    y: 30,
    width: 11,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 207,
    x: 498,
    y: 30,
    width: 10,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 209,
    x: 0,
    y: 60,
    width: 17.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 210,
    x: 18,
    y: 60,
    width: 19,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 211,
    x: 37.5,
    y: 60,
    width: 18.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 212,
    x: 56.5,
    y: 60,
    width: 18.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 213,
    x: 75.5,
    y: 60,
    width: 19.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 214,
    x: 95.5,
    y: 60,
    width: 19,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 215,
    x: 390.5,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 217,
    x: 115,
    y: 60,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 218,
    x: 132,
    y: 60,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 219,
    x: 149,
    y: 60,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 220,
    x: 166,
    y: 60,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 223,
    x: 183,
    y: 60,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 224,
    x: 198,
    y: 60,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 225,
    x: 212.5,
    y: 60,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 226,
    x: 227.5,
    y: 60,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 227,
    x: 242.5,
    y: 60,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 228,
    x: 258,
    y: 60,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 229,
    x: 273,
    y: 60,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 230,
    x: 288,
    y: 60,
    width: 21.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 231,
    x: 310,
    y: 60,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 232,
    x: 323.5,
    y: 60,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 233,
    x: 337,
    y: 60,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 234,
    x: 351,
    y: 60,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 235,
    x: 365,
    y: 60,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 236,
    x: 380,
    y: 60,
    width: 8.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 237,
    x: 389,
    y: 60,
    width: 9.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 238,
    x: 399,
    y: 60,
    width: 11,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 239,
    x: 410.5,
    y: 60,
    width: 10,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 241,
    x: 421,
    y: 60,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 242,
    x: 436.5,
    y: 60,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 243,
    x: 451,
    y: 60,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 244,
    x: 465.5,
    y: 60,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 245,
    x: 480,
    y: 60,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 246,
    x: 495.5,
    y: 60,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 247,
    x: 403.5,
    y: 180,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 248,
    x: 0,
    y: 90,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 249,
    x: 14.5,
    y: 90,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 250,
    x: 29.5,
    y: 90,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 251,
    x: 44,
    y: 90,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 252,
    x: 58.5,
    y: 90,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 255,
    x: 73.5,
    y: 90,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 338,
    x: 88,
    y: 90,
    width: 22,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 339,
    x: 110.5,
    y: 90,
    width: 22.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 376,
    x: 133.5,
    y: 90,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1040,
    x: 149,
    y: 90,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1041,
    x: 167.5,
    y: 90,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1042,
    x: 183,
    y: 90,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1043,
    x: 198.5,
    y: 90,
    width: 12,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1044,
    x: 211,
    y: 90,
    width: 17,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 1045,
    x: 228.5,
    y: 90,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1046,
    x: 242.5,
    y: 90,
    width: 23.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1047,
    x: 266.5,
    y: 90,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1048,
    x: 281.5,
    y: 90,
    width: 17,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 1049,
    x: 299,
    y: 90,
    width: 17,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 1050,
    x: 316.5,
    y: 90,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1051,
    x: 333.5,
    y: 90,
    width: 17,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 1052,
    x: 351,
    y: 90,
    width: 21,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1053,
    x: 372.5,
    y: 90,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1054,
    x: 389.5,
    y: 90,
    width: 19,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1055,
    x: 409,
    y: 90,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1056,
    x: 426,
    y: 90,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1057,
    x: 440.5,
    y: 90,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1058,
    x: 457.5,
    y: 90,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1059,
    x: 471.5,
    y: 90,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1060,
    x: 488.5,
    y: 90,
    width: 19,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1061,
    x: 0,
    y: 120,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1062,
    x: 17,
    y: 120,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1063,
    x: 34,
    y: 120,
    width: 16,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1064,
    x: 50.5,
    y: 120,
    width: 22,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1065,
    x: 73,
    y: 120,
    width: 22,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1066,
    x: 95.5,
    y: 120,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1067,
    x: 111.5,
    y: 120,
    width: 20,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1068,
    x: 132,
    y: 120,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1069,
    x: 146.5,
    y: 120,
    width: 16.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1070,
    x: 163.5,
    y: 120,
    width: 24.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1071,
    x: 188.5,
    y: 120,
    width: 16,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1072,
    x: 205,
    y: 120,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1073,
    x: 219.5,
    y: 120,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1074,
    x: 235,
    y: 120,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1075,
    x: 250,
    y: 120,
    width: 11.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 1076,
    x: 262,
    y: 120,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1077,
    x: 277,
    y: 120,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1078,
    x: 292,
    y: 120,
    width: 20,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1079,
    x: 312.5,
    y: 120,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1080,
    x: 325.5,
    y: 120,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1081,
    x: 341.5,
    y: 120,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1082,
    x: 357.5,
    y: 120,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1083,
    x: 372.5,
    y: 120,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1084,
    x: 387,
    y: 120,
    width: 18,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1085,
    x: 405.5,
    y: 120,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1086,
    x: 421,
    y: 120,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1087,
    x: 436.5,
    y: 120,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1088,
    x: 452,
    y: 120,
    width: 15.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1089,
    x: 468,
    y: 120,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1090,
    x: 482,
    y: 120,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1091,
    x: 495.5,
    y: 120,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1092,
    x: 0,
    y: 150,
    width: 21.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1093,
    x: 22,
    y: 150,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1094,
    x: 36.5,
    y: 150,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1095,
    x: 52,
    y: 150,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1096,
    x: 67,
    y: 150,
    width: 19.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1097,
    x: 87,
    y: 150,
    width: 19.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1098,
    x: 107,
    y: 150,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1099,
    x: 121.5,
    y: 150,
    width: 19,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1100,
    x: 141,
    y: 150,
    width: 13,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1101,
    x: 154.5,
    y: 150,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1102,
    x: 168.5,
    y: 150,
    width: 20,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1103,
    x: 189,
    y: 150,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1104,
    x: 204,
    y: 150,
    width: 14,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1105,
    x: 218.5,
    y: 150,
    width: 14.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 8211,
    x: 417.5,
    y: 180,
    width: 13.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 8212,
    x: 431.5,
    y: 180,
    width: 22.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 8217,
    x: 454.5,
    y: 180,
    width: 8,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 8220,
    x: 463,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 8221,
    x: 476,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 8222,
    x: 489,
    y: 180,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 8226,
    x: 0,
    y: 210,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 8230,
    x: 13,
    y: 210,
    width: 22.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 8232,
    x: 36,
    y: 210,
    width: 12,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 8364,
    x: 48.5,
    y: 210,
    width: 12.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 8470,
    x: 61.5,
    y: 210,
    width: 24,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 8658,
    x: 410,
    y: 210,
    width: 22.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 12289,
    x: 86,
    y: 210,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 65281,
    x: 101.5,
    y: 210,
    width: 21.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 65286,
    x: 123.5,
    y: 210,
    width: 21.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 65288,
    x: 145.5,
    y: 210,
    width: 12,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 65289,
    x: 158,
    y: 210,
    width: 12,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 65292,
    x: 170.5,
    y: 210,
    width: 15,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 65306,
    x: 186,
    y: 210,
    width: 12,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 65311,
    x: 198.5,
    y: 210,
    width: 21.5,
    height: 29.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}],
UI.fonts.soldier_font3 = [{
    id: 32,
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 33,
    x: 73.5,
    y: 252,
    width: 12.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 34,
    x: 86.5,
    y: 252,
    width: 12,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 37,
    x: 99,
    y: 252,
    width: 25,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 39,
    x: 124.5,
    y: 252,
    width: 9,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 40,
    x: 134,
    y: 252,
    width: 11,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 41,
    x: 145.5,
    y: 252,
    width: 11,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 43,
    x: 157,
    y: 252,
    width: 19.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 44,
    x: 177,
    y: 252,
    width: 11,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 45,
    x: 188.5,
    y: 252,
    width: 15,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 46,
    x: 204,
    y: 252,
    width: 11,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 47,
    x: 215.5,
    y: 252,
    width: 15,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 48,
    x: 0,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 49,
    x: 23,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 50,
    x: 46,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 51,
    x: 69,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 52,
    x: 92,
    y: 0,
    width: 23,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 53,
    x: 115.5,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 54,
    x: 138.5,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 55,
    x: 161.5,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 56,
    x: 184.5,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 57,
    x: 207.5,
    y: 0,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 58,
    x: 231,
    y: 252,
    width: 11,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 59,
    x: 242.5,
    y: 252,
    width: 11,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 63,
    x: 254,
    y: 252,
    width: 15.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 64,
    x: 131,
    y: 288,
    width: 31,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 31.5
}, {
    id: 65,
    x: 230.5,
    y: 0,
    width: 26.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 66,
    x: 257.5,
    y: 0,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 67,
    x: 280,
    y: 0,
    width: 24.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 68,
    x: 305,
    y: 0,
    width: 24.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 69,
    x: 330,
    y: 0,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 70,
    x: 351,
    y: 0,
    width: 18,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 71,
    x: 369.5,
    y: 0,
    width: 23,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 72,
    x: 393,
    y: 0,
    width: 24,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 73,
    x: 417.5,
    y: 0,
    width: 14.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 74,
    x: 432.5,
    y: 0,
    width: 15,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 75,
    x: 448,
    y: 0,
    width: 24.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 76,
    x: 473,
    y: 0,
    width: 20,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 77,
    x: 0,
    y: 36,
    width: 29.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 78,
    x: 30,
    y: 36,
    width: 25,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 79,
    x: 55.5,
    y: 36,
    width: 27,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 80,
    x: 83,
    y: 36,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 81,
    x: 104,
    y: 36,
    width: 25.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 82,
    x: 130,
    y: 36,
    width: 23.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 83,
    x: 154,
    y: 36,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 84,
    x: 175,
    y: 36,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 85,
    x: 196,
    y: 36,
    width: 24.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 86,
    x: 221,
    y: 36,
    width: 24,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 87,
    x: 245.5,
    y: 36,
    width: 32,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22.5
}, {
    id: 88,
    x: 278,
    y: 36,
    width: 25,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 89,
    x: 303.5,
    y: 36,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 90,
    x: 326.5,
    y: 36,
    width: 23.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 92,
    x: 270,
    y: 252,
    width: 19,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 97,
    x: 350.5,
    y: 36,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 98,
    x: 372.5,
    y: 36,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 99,
    x: 395,
    y: 36,
    width: 19.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 100,
    x: 415,
    y: 36,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 101,
    x: 437.5,
    y: 36,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 102,
    x: 458.5,
    y: 36,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 103,
    x: 475.5,
    y: 36,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 104,
    x: 0,
    y: 72,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 105,
    x: 22.5,
    y: 72,
    width: 14,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 106,
    x: 37,
    y: 72,
    width: 13.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 107,
    x: 51,
    y: 72,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 108,
    x: 73,
    y: 72,
    width: 14,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 109,
    x: 87.5,
    y: 72,
    width: 28.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 110,
    x: 116.5,
    y: 72,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 111,
    x: 138.5,
    y: 72,
    width: 21,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 112,
    x: 160,
    y: 72,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 113,
    x: 182.5,
    y: 72,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 114,
    x: 205,
    y: 72,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 115,
    x: 222,
    y: 72,
    width: 19,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 116,
    x: 241.5,
    y: 72,
    width: 16,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 117,
    x: 258,
    y: 72,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 118,
    x: 280.5,
    y: 72,
    width: 19.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 119,
    x: 300.5,
    y: 72,
    width: 27.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 120,
    x: 328.5,
    y: 72,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 121,
    x: 350.5,
    y: 72,
    width: 20,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 122,
    x: 371,
    y: 72,
    width: 20,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 126,
    x: 289.5,
    y: 252,
    width: 19.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 160,
    x: 309.5,
    y: 252,
    width: 11.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 161,
    x: 321.5,
    y: 252,
    width: 12.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 169,
    x: 162.5,
    y: 288,
    width: 29.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 30
}, {
    id: 171,
    x: 334.5,
    y: 252,
    width: 17.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 174,
    x: 192.5,
    y: 288,
    width: 29.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 30
}, {
    id: 187,
    x: 352.5,
    y: 252,
    width: 17.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 191,
    x: 370.5,
    y: 252,
    width: 15.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 193,
    x: 391.5,
    y: 72,
    width: 26.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 195,
    x: 418.5,
    y: 72,
    width: 26.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 196,
    x: 445.5,
    y: 72,
    width: 27.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 197,
    x: 473.5,
    y: 72,
    width: 26.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 201,
    x: 0,
    y: 108,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 202,
    x: 21,
    y: 108,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 203,
    x: 42,
    y: 108,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 209,
    x: 63,
    y: 108,
    width: 25.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 211,
    x: 89,
    y: 108,
    width: 27,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 214,
    x: 116.5,
    y: 108,
    width: 27.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 217,
    x: 144.5,
    y: 108,
    width: 24.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 223,
    x: 169.5,
    y: 108,
    width: 23.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 224,
    x: 193.5,
    y: 108,
    width: 21,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 225,
    x: 215,
    y: 108,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 226,
    x: 237.5,
    y: 108,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 227,
    x: 260,
    y: 108,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 228,
    x: 283,
    y: 108,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 229,
    x: 305.5,
    y: 108,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 231,
    x: 328,
    y: 108,
    width: 20,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 232,
    x: 348.5,
    y: 108,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 233,
    x: 369.5,
    y: 108,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 234,
    x: 390.5,
    y: 108,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 235,
    x: 411.5,
    y: 108,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 237,
    x: 434,
    y: 108,
    width: 15.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 238,
    x: 450,
    y: 108,
    width: 17.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 241,
    x: 468,
    y: 108,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 243,
    x: 0,
    y: 144,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 245,
    x: 22,
    y: 144,
    width: 22.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 246,
    x: 45,
    y: 144,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 249,
    x: 67,
    y: 144,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 251,
    x: 89.5,
    y: 144,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 252,
    x: 111.5,
    y: 144,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1040,
    x: 134,
    y: 144,
    width: 26,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 1041,
    x: 160.5,
    y: 144,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1042,
    x: 183,
    y: 144,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1043,
    x: 205.5,
    y: 144,
    width: 18,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1044,
    x: 224,
    y: 144,
    width: 25.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1045,
    x: 250,
    y: 144,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1046,
    x: 271,
    y: 144,
    width: 34,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 24
}, {
    id: 1047,
    x: 305.5,
    y: 144,
    width: 21,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1048,
    x: 327,
    y: 144,
    width: 25,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 1049,
    x: 352.5,
    y: 144,
    width: 25,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 1050,
    x: 378,
    y: 144,
    width: 24,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1051,
    x: 402.5,
    y: 144,
    width: 25.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1052,
    x: 428.5,
    y: 144,
    width: 30.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21.5
}, {
    id: 1053,
    x: 459.5,
    y: 144,
    width: 24,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1054,
    x: 484,
    y: 144,
    width: 27,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1055,
    x: 0,
    y: 180,
    width: 25,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 1056,
    x: 25.5,
    y: 180,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1057,
    x: 47.5,
    y: 180,
    width: 24.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 1058,
    x: 72.5,
    y: 180,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1059,
    x: 93.5,
    y: 180,
    width: 24.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 1061,
    x: 118.5,
    y: 180,
    width: 25,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 1063,
    x: 144,
    y: 180,
    width: 23,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1064,
    x: 167.5,
    y: 180,
    width: 32,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22.5
}, {
    id: 1065,
    x: 200,
    y: 180,
    width: 32,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22.5
}, {
    id: 1067,
    x: 232.5,
    y: 180,
    width: 29,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20.5
}, {
    id: 1068,
    x: 262,
    y: 180,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1069,
    x: 283,
    y: 180,
    width: 24,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1071,
    x: 307.5,
    y: 180,
    width: 24,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1072,
    x: 332,
    y: 180,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1073,
    x: 354,
    y: 180,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1074,
    x: 376,
    y: 180,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1075,
    x: 397,
    y: 180,
    width: 17,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1076,
    x: 414.5,
    y: 180,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1077,
    x: 437,
    y: 180,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1078,
    x: 458,
    y: 180,
    width: 29,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20.5
}, {
    id: 1079,
    x: 487.5,
    y: 180,
    width: 18,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1080,
    x: 0,
    y: 216,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1081,
    x: 22.5,
    y: 216,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1082,
    x: 45,
    y: 216,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1083,
    x: 67,
    y: 216,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1084,
    x: 89,
    y: 216,
    width: 25.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1085,
    x: 115,
    y: 216,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1086,
    x: 137,
    y: 216,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1087,
    x: 159,
    y: 216,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1088,
    x: 181,
    y: 216,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1089,
    x: 203.5,
    y: 216,
    width: 19.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1090,
    x: 223.5,
    y: 216,
    width: 20,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1091,
    x: 244,
    y: 216,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1092,
    x: 266,
    y: 216,
    width: 29.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 1093,
    x: 296,
    y: 216,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1094,
    x: 318,
    y: 216,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1095,
    x: 340.5,
    y: 216,
    width: 21.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1096,
    x: 362.5,
    y: 216,
    width: 27,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1097,
    x: 390,
    y: 216,
    width: 27.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 1099,
    x: 418,
    y: 216,
    width: 27,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1100,
    x: 445.5,
    y: 216,
    width: 20,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1101,
    x: 466,
    y: 216,
    width: 20,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1102,
    x: 0,
    y: 252,
    width: 28,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 1103,
    x: 28.5,
    y: 252,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1105,
    x: 51,
    y: 252,
    width: 22,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 8211,
    x: 386.5,
    y: 252,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 8220,
    x: 403.5,
    y: 252,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 8221,
    x: 420.5,
    y: 252,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 8222,
    x: 437.5,
    y: 252,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 8232,
    x: 454.5,
    y: 252,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 65281,
    x: 471.5,
    y: 252,
    width: 29,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 29.5
}, {
    id: 65286,
    x: 0,
    y: 288,
    width: 29,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 29.5
}, {
    id: 65288,
    x: 29.5,
    y: 288,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 65289,
    x: 46.5,
    y: 288,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 65292,
    x: 63.5,
    y: 288,
    width: 20.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 65306,
    x: 84.5,
    y: 288,
    width: 16.5,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 65311,
    x: 101.5,
    y: 288,
    width: 29,
    height: 35.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 29.5
}],
UI.fonts.soldier_font4 = [{
    id: 32,
    x: 0,
    y: 0,
    width: 10,
    height: 0,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 33,
    x: 80,
    y: 300,
    width: 13,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 34,
    x: 93.5,
    y: 300,
    width: 12.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 35,
    x: 106.5,
    y: 300,
    width: 19,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 36,
    x: 126,
    y: 300,
    width: 19,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 37,
    x: 145.5,
    y: 300,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21.5
}, {
    id: 38,
    x: 172.5,
    y: 300,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21.5
}, {
    id: 39,
    x: 199.5,
    y: 300,
    width: 9,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 40,
    x: 209,
    y: 300,
    width: 11.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 41,
    x: 221,
    y: 300,
    width: 11.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 42,
    x: 233,
    y: 300,
    width: 15.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 43,
    x: 249,
    y: 300,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 44,
    x: 270,
    y: 300,
    width: 11.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 45,
    x: 282,
    y: 300,
    width: 16,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 46,
    x: 298.5,
    y: 300,
    width: 11.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 47,
    x: 310.5,
    y: 300,
    width: 16,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 48,
    x: 0,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 49,
    x: 25,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 50,
    x: 50,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 51,
    x: 75,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 52,
    x: 100,
    y: 0,
    width: 25,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 53,
    x: 125.5,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 54,
    x: 150.5,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 55,
    x: 175.5,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 56,
    x: 200.5,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 57,
    x: 225.5,
    y: 0,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 58,
    x: 327,
    y: 300,
    width: 11.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 59,
    x: 339,
    y: 300,
    width: 11.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 60,
    x: 351,
    y: 300,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 61,
    x: 372,
    y: 300,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 62,
    x: 393,
    y: 300,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 63,
    x: 414,
    y: 300,
    width: 16.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 64,
    x: 426,
    y: 375,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21.5
}, {
    id: 65,
    x: 250.5,
    y: 0,
    width: 29,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 66,
    x: 280,
    y: 0,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 67,
    x: 304.5,
    y: 0,
    width: 27,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 68,
    x: 332,
    y: 0,
    width: 27,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 69,
    x: 359.5,
    y: 0,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 70,
    x: 382.5,
    y: 0,
    width: 20,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 71,
    x: 403,
    y: 0,
    width: 25.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 72,
    x: 429,
    y: 0,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 73,
    x: 456,
    y: 0,
    width: 16.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 74,
    x: 473,
    y: 0,
    width: 17,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 75,
    x: 0,
    y: 37.5,
    width: 27,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 76,
    x: 27.5,
    y: 37.5,
    width: 22,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 77,
    x: 50,
    y: 37.5,
    width: 32.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22
}, {
    id: 78,
    x: 83,
    y: 37.5,
    width: 27.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 79,
    x: 111,
    y: 37.5,
    width: 29.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 80,
    x: 141,
    y: 37.5,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 81,
    x: 164.5,
    y: 37.5,
    width: 28,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 82,
    x: 193,
    y: 37.5,
    width: 25.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 83,
    x: 219,
    y: 37.5,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 84,
    x: 242.5,
    y: 37.5,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 85,
    x: 266,
    y: 37.5,
    width: 27,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 86,
    x: 293.5,
    y: 37.5,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 87,
    x: 320.5,
    y: 37.5,
    width: 35,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 24
}, {
    id: 88,
    x: 356,
    y: 37.5,
    width: 27.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 89,
    x: 384,
    y: 37.5,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 90,
    x: 409,
    y: 37.5,
    width: 26,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 91,
    x: 431,
    y: 300,
    width: 12,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 92,
    x: 443.5,
    y: 300,
    width: 19.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 93,
    x: 463.5,
    y: 300,
    width: 12,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 94,
    x: 476,
    y: 300,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 95,
    x: 0,
    y: 337.5,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 96,
    x: 24.5,
    y: 337.5,
    width: 15.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 97,
    x: 435.5,
    y: 37.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 98,
    x: 459.5,
    y: 37.5,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 99,
    x: 484,
    y: 37.5,
    width: 21.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 100,
    x: 0,
    y: 75,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 101,
    x: 25,
    y: 75,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 102,
    x: 48,
    y: 75,
    width: 18.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 103,
    x: 67,
    y: 75,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 104,
    x: 91,
    y: 75,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 105,
    x: 115.5,
    y: 75,
    width: 15.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 106,
    x: 131.5,
    y: 75,
    width: 15.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 107,
    x: 147.5,
    y: 75,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 108,
    x: 172,
    y: 75,
    width: 16,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 109,
    x: 188.5,
    y: 75,
    width: 31,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 110,
    x: 220,
    y: 75,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 111,
    x: 244.5,
    y: 75,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 112,
    x: 268.5,
    y: 75,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 113,
    x: 293.5,
    y: 75,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 114,
    x: 318.5,
    y: 75,
    width: 18.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 115,
    x: 337.5,
    y: 75,
    width: 21.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 116,
    x: 359.5,
    y: 75,
    width: 18,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 117,
    x: 378,
    y: 75,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 118,
    x: 402.5,
    y: 75,
    width: 22,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 119,
    x: 425,
    y: 75,
    width: 30,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20.5
}, {
    id: 120,
    x: 455.5,
    y: 75,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 121,
    x: 479.5,
    y: 75,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 122,
    x: 0,
    y: 112.5,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 123,
    x: 40.5,
    y: 337.5,
    width: 12,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 124,
    x: 53,
    y: 337.5,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 125,
    x: 74,
    y: 337.5,
    width: 12,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 126,
    x: 86.5,
    y: 337.5,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 160,
    x: 107.5,
    y: 337.5,
    width: 10.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 161,
    x: 118.5,
    y: 337.5,
    width: 13,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 162,
    x: 132,
    y: 337.5,
    width: 19,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 163,
    x: 151.5,
    y: 337.5,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 164,
    x: 169.5,
    y: 337.5,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 165,
    x: 187.5,
    y: 337.5,
    width: 21,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 166,
    x: 209,
    y: 337.5,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 167,
    x: 230,
    y: 337.5,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 168,
    x: 248,
    y: 337.5,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 169,
    x: 453,
    y: 375,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 170,
    x: 266,
    y: 337.5,
    width: 14,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 171,
    x: 280.5,
    y: 337.5,
    width: 18,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 172,
    x: 299,
    y: 337.5,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 173,
    x: 320,
    y: 337.5,
    width: 16,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 175,
    x: 336.5,
    y: 337.5,
    width: 16.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 176,
    x: 353.5,
    y: 337.5,
    width: 12.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 177,
    x: 366.5,
    y: 337.5,
    width: 20.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 180,
    x: 387.5,
    y: 337.5,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 181,
    x: 405.5,
    y: 337.5,
    width: 19.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 187,
    x: 425.5,
    y: 337.5,
    width: 18,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 191,
    x: 444,
    y: 337.5,
    width: 15,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 193,
    x: 23,
    y: 112.5,
    width: 29,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 195,
    x: 52.5,
    y: 112.5,
    width: 29,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 196,
    x: 82,
    y: 112.5,
    width: 30.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 197,
    x: 113,
    y: 112.5,
    width: 29,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 201,
    x: 142.5,
    y: 112.5,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 202,
    x: 165.5,
    y: 112.5,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 203,
    x: 189,
    y: 112.5,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 209,
    x: 212,
    y: 112.5,
    width: 28.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 211,
    x: 241,
    y: 112.5,
    width: 30,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20.5
}, {
    id: 214,
    x: 271.5,
    y: 112.5,
    width: 30.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 215,
    x: 459.5,
    y: 337.5,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 217,
    x: 302.5,
    y: 112.5,
    width: 27,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 223,
    x: 330,
    y: 112.5,
    width: 26,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 224,
    x: 356.5,
    y: 112.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 225,
    x: 380.5,
    y: 112.5,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 226,
    x: 405,
    y: 112.5,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 227,
    x: 429.5,
    y: 112.5,
    width: 25,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 228,
    x: 455,
    y: 112.5,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 229,
    x: 479.5,
    y: 112.5,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 231,
    x: 0,
    y: 150,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 232,
    x: 23,
    y: 150,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 233,
    x: 46.5,
    y: 150,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 234,
    x: 70,
    y: 150,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 235,
    x: 93,
    y: 150,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 237,
    x: 117.5,
    y: 150,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 238,
    x: 135.5,
    y: 150,
    width: 19.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 241,
    x: 155.5,
    y: 150,
    width: 25,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 243,
    x: 181,
    y: 150,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 245,
    x: 205,
    y: 150,
    width: 25,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 246,
    x: 230.5,
    y: 150,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 247,
    x: 477.5,
    y: 337.5,
    width: 18.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 249,
    x: 254.5,
    y: 150,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 251,
    x: 279,
    y: 150,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 252,
    x: 303.5,
    y: 150,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1040,
    x: 328,
    y: 150,
    width: 28.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 1041,
    x: 357,
    y: 150,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1042,
    x: 382,
    y: 150,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1043,
    x: 406.5,
    y: 150,
    width: 20,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 1044,
    x: 427,
    y: 150,
    width: 28,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1045,
    x: 455.5,
    y: 150,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1046,
    x: 0,
    y: 187.5,
    width: 37,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 1047,
    x: 37.5,
    y: 187.5,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1048,
    x: 61,
    y: 187.5,
    width: 27.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1049,
    x: 89,
    y: 187.5,
    width: 27.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1050,
    x: 117,
    y: 187.5,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1051,
    x: 144,
    y: 187.5,
    width: 28,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1052,
    x: 172.5,
    y: 187.5,
    width: 33,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22.5
}, {
    id: 1053,
    x: 206,
    y: 187.5,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1054,
    x: 233,
    y: 187.5,
    width: 29.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 1055,
    x: 263,
    y: 187.5,
    width: 27.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1056,
    x: 291,
    y: 187.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1057,
    x: 315,
    y: 187.5,
    width: 27,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 1058,
    x: 342.5,
    y: 187.5,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1059,
    x: 366,
    y: 187.5,
    width: 27,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 1060,
    x: 393.5,
    y: 187.5,
    width: 30.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 1061,
    x: 424.5,
    y: 187.5,
    width: 27.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1062,
    x: 452.5,
    y: 187.5,
    width: 27.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1063,
    x: 480.5,
    y: 187.5,
    width: 25.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 1064,
    x: 0,
    y: 225,
    width: 35,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 24
}, {
    id: 1065,
    x: 35.5,
    y: 225,
    width: 35,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 24
}, {
    id: 1066,
    x: 71,
    y: 225,
    width: 26,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1067,
    x: 97.5,
    y: 225,
    width: 32,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22
}, {
    id: 1068,
    x: 130,
    y: 225,
    width: 23,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1069,
    x: 153.5,
    y: 225,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1070,
    x: 180.5,
    y: 225,
    width: 37.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 1071,
    x: 218.5,
    y: 225,
    width: 26.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 1072,
    x: 245.5,
    y: 225,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1073,
    x: 269.5,
    y: 225,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1074,
    x: 293.5,
    y: 225,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1075,
    x: 316.5,
    y: 225,
    width: 19,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 1076,
    x: 336,
    y: 225,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1077,
    x: 360.5,
    y: 225,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1078,
    x: 383.5,
    y: 225,
    width: 32,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22
}, {
    id: 1079,
    x: 416,
    y: 225,
    width: 20,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 1080,
    x: 436.5,
    y: 225,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1081,
    x: 461.5,
    y: 225,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1082,
    x: 486.5,
    y: 225,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1083,
    x: 0,
    y: 262.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1084,
    x: 24,
    y: 262.5,
    width: 28,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 1085,
    x: 52.5,
    y: 262.5,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1086,
    x: 77,
    y: 262.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1087,
    x: 101,
    y: 262.5,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1088,
    x: 125.5,
    y: 262.5,
    width: 24.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1089,
    x: 150.5,
    y: 262.5,
    width: 22,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1090,
    x: 173,
    y: 262.5,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1091,
    x: 196,
    y: 262.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1092,
    x: 220,
    y: 262.5,
    width: 32.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22
}, {
    id: 1093,
    x: 253,
    y: 262.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1094,
    x: 277,
    y: 262.5,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1095,
    x: 301.5,
    y: 262.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1096,
    x: 325.5,
    y: 262.5,
    width: 30,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20.5
}, {
    id: 1097,
    x: 356,
    y: 262.5,
    width: 30,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20.5
}, {
    id: 1098,
    x: 386.5,
    y: 262.5,
    width: 23.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1099,
    x: 410.5,
    y: 262.5,
    width: 29.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 20
}, {
    id: 1100,
    x: 440.5,
    y: 262.5,
    width: 22.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1101,
    x: 463.5,
    y: 262.5,
    width: 22,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1102,
    x: 0,
    y: 300,
    width: 30.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 21
}, {
    id: 1103,
    x: 31,
    y: 300,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 1105,
    x: 55.5,
    y: 300,
    width: 24,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 8211,
    x: 0,
    y: 375,
    width: 18.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 8212,
    x: 19,
    y: 375,
    width: 31.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 8217,
    x: 51,
    y: 375,
    width: 11.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 8220,
    x: 63,
    y: 375,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 8221,
    x: 81,
    y: 375,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 8222,
    x: 99,
    y: 375,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 8226,
    x: 117,
    y: 375,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 8230,
    x: 135,
    y: 375,
    width: 31.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 25.5
}, {
    id: 8232,
    x: 167,
    y: 375,
    width: 17,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 8364,
    x: 184.5,
    y: 375,
    width: 17.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 8470,
    x: 202.5,
    y: 375,
    width: 33.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 27
}, {
    id: 12289,
    x: 236.5,
    y: 375,
    width: 21.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 65281,
    x: 258.5,
    y: 375,
    width: 30.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 24.5
}, {
    id: 65286,
    x: 289.5,
    y: 375,
    width: 30.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 24.5
}, {
    id: 65288,
    x: 320.5,
    y: 375,
    width: 17,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 65289,
    x: 338,
    y: 375,
    width: 17,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 65292,
    x: 355.5,
    y: 375,
    width: 21.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17.5
}, {
    id: 65306,
    x: 377.5,
    y: 375,
    width: 17,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 65311,
    x: 395,
    y: 375,
    width: 30.5,
    height: 37,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 24.5
}],
UI.fonts.soldier_font4_small = [{
    id: 33,
    x: 167,
    y: 180,
    width: 6.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 5.5
}, {
    id: 34,
    x: 174,
    y: 180,
    width: 6.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 5.5
}, {
    id: 37,
    x: 181,
    y: 180,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 39,
    x: 195.5,
    y: 180,
    width: 4.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4
}, {
    id: 40,
    x: 200.5,
    y: 180,
    width: 5.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4.5
}, {
    id: 41,
    x: 206.5,
    y: 180,
    width: 5.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4.5
}, {
    id: 42,
    x: 212.5,
    y: 180,
    width: 8,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 43,
    x: 221,
    y: 180,
    width: 10.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 44,
    x: 232,
    y: 180,
    width: 5.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4.5
}, {
    id: 45,
    x: 238,
    y: 180,
    width: 8,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 46,
    x: 246.5,
    y: 180,
    width: 5.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4.5
}, {
    id: 47,
    x: 0,
    y: 202.5,
    width: 8,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 48,
    x: 0,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 49,
    x: 13.5,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 50,
    x: 27,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 51,
    x: 40.5,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 52,
    x: 54,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 53,
    x: 67.5,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 54,
    x: 81,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 55,
    x: 94.5,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 56,
    x: 108,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 57,
    x: 121.5,
    y: 0,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 58,
    x: 8.5,
    y: 202.5,
    width: 5.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4.5
}, {
    id: 59,
    x: 14.5,
    y: 202.5,
    width: 5.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4.5
}, {
    id: 61,
    x: 20.5,
    y: 202.5,
    width: 10.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 63,
    x: 31.5,
    y: 202.5,
    width: 8.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 64,
    x: 240,
    y: 202.5,
    width: 15,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 65,
    x: 135,
    y: 0,
    width: 15.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 66,
    x: 151,
    y: 0,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 67,
    x: 164,
    y: 0,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 68,
    x: 178.5,
    y: 0,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 69,
    x: 193,
    y: 0,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 70,
    x: 205.5,
    y: 0,
    width: 10.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 71,
    x: 216.5,
    y: 0,
    width: 13.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 72,
    x: 230.5,
    y: 0,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 73,
    x: 245,
    y: 0,
    width: 8.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6
}, {
    id: 74,
    x: 0,
    y: 22.5,
    width: 8.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6
}, {
    id: 75,
    x: 9,
    y: 22.5,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 76,
    x: 23.5,
    y: 22.5,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 77,
    x: 35.5,
    y: 22.5,
    width: 17,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 78,
    x: 53,
    y: 22.5,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 79,
    x: 68,
    y: 22.5,
    width: 15.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 80,
    x: 84,
    y: 22.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 81,
    x: 96.5,
    y: 22.5,
    width: 15,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 82,
    x: 112,
    y: 22.5,
    width: 13.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 83,
    x: 126,
    y: 22.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 84,
    x: 138.5,
    y: 22.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 85,
    x: 151,
    y: 22.5,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 86,
    x: 165.5,
    y: 22.5,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 87,
    x: 180,
    y: 22.5,
    width: 18.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 88,
    x: 199,
    y: 22.5,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 89,
    x: 214,
    y: 22.5,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 90,
    x: 227.5,
    y: 22.5,
    width: 13.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 92,
    x: 40.5,
    y: 202.5,
    width: 10,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 97,
    x: 241.5,
    y: 22.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 98,
    x: 0,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 99,
    x: 13,
    y: 45,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 100,
    x: 25,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 101,
    x: 38,
    y: 45,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 102,
    x: 50.5,
    y: 45,
    width: 9.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 103,
    x: 60.5,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 104,
    x: 73.5,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 105,
    x: 86.5,
    y: 45,
    width: 8,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 5.5
}, {
    id: 106,
    x: 95,
    y: 45,
    width: 8,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 5.5
}, {
    id: 107,
    x: 103.5,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 108,
    x: 116.5,
    y: 45,
    width: 8,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 5.5
}, {
    id: 109,
    x: 125,
    y: 45,
    width: 16.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 110,
    x: 142,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 111,
    x: 155,
    y: 45,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 112,
    x: 167.5,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 113,
    x: 180.5,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 114,
    x: 193.5,
    y: 45,
    width: 9.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 115,
    x: 203.5,
    y: 45,
    width: 11,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 116,
    x: 215,
    y: 45,
    width: 9.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 117,
    x: 225,
    y: 45,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 118,
    x: 238,
    y: 45,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 119,
    x: 0,
    y: 67.5,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 120,
    x: 16.5,
    y: 67.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 121,
    x: 29.5,
    y: 67.5,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 122,
    x: 41.5,
    y: 67.5,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 126,
    x: 51,
    y: 202.5,
    width: 10.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 160,
    x: 62,
    y: 202.5,
    width: 5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4
}, {
    id: 161,
    x: 67.5,
    y: 202.5,
    width: 6.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 5.5
}, {
    id: 169,
    x: 0,
    y: 225,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 171,
    x: 74.5,
    y: 202.5,
    width: 9.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 187,
    x: 84.5,
    y: 202.5,
    width: 9.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 191,
    x: 94.5,
    y: 202.5,
    width: 7.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6
}, {
    id: 193,
    x: 53.5,
    y: 67.5,
    width: 15,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 195,
    x: 69,
    y: 67.5,
    width: 15,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 196,
    x: 84.5,
    y: 67.5,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 197,
    x: 101,
    y: 67.5,
    width: 15.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 201,
    x: 117,
    y: 67.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 202,
    x: 129.5,
    y: 67.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 203,
    x: 142,
    y: 67.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 209,
    x: 154.5,
    y: 67.5,
    width: 15,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 211,
    x: 170,
    y: 67.5,
    width: 15.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 214,
    x: 186,
    y: 67.5,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 217,
    x: 202.5,
    y: 67.5,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 223,
    x: 217,
    y: 67.5,
    width: 13.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 224,
    x: 231,
    y: 67.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 225,
    x: 0,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 226,
    x: 13,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 227,
    x: 26,
    y: 90,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 228,
    x: 39.5,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 229,
    x: 52.5,
    y: 90,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 231,
    x: 66,
    y: 90,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 232,
    x: 78,
    y: 90,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 233,
    x: 90.5,
    y: 90,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 234,
    x: 103,
    y: 90,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 235,
    x: 115.5,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 237,
    x: 128.5,
    y: 90,
    width: 9,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6
}, {
    id: 238,
    x: 138,
    y: 90,
    width: 10,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 241,
    x: 148.5,
    y: 90,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 243,
    x: 162,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 245,
    x: 175,
    y: 90,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 246,
    x: 188.5,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 249,
    x: 201.5,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 251,
    x: 214.5,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 252,
    x: 227.5,
    y: 90,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1040,
    x: 240.5,
    y: 90,
    width: 15,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1041,
    x: 0,
    y: 112.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1042,
    x: 13,
    y: 112.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1043,
    x: 26,
    y: 112.5,
    width: 10.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 1044,
    x: 37,
    y: 112.5,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1045,
    x: 52,
    y: 112.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1046,
    x: 64.5,
    y: 112.5,
    width: 19.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 1047,
    x: 84.5,
    y: 112.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1048,
    x: 97,
    y: 112.5,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1049,
    x: 112,
    y: 112.5,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1050,
    x: 127,
    y: 112.5,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1051,
    x: 141.5,
    y: 112.5,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1052,
    x: 156.5,
    y: 112.5,
    width: 17.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1053,
    x: 174.5,
    y: 112.5,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1054,
    x: 189,
    y: 112.5,
    width: 15.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1055,
    x: 205,
    y: 112.5,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1056,
    x: 220,
    y: 112.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1057,
    x: 233,
    y: 112.5,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1058,
    x: 0,
    y: 135,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1059,
    x: 12.5,
    y: 135,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1060,
    x: 27,
    y: 135,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1061,
    x: 43.5,
    y: 135,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1062,
    x: 58.5,
    y: 135,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1063,
    x: 73.5,
    y: 135,
    width: 13,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 1064,
    x: 87,
    y: 135,
    width: 18.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1065,
    x: 106,
    y: 135,
    width: 18.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1066,
    x: 125,
    y: 135,
    width: 13.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1067,
    x: 139,
    y: 135,
    width: 17,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1068,
    x: 156.5,
    y: 135,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1069,
    x: 169,
    y: 135,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1070,
    x: 183.5,
    y: 135,
    width: 20,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 1071,
    x: 204,
    y: 135,
    width: 14,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1072,
    x: 218.5,
    y: 135,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1073,
    x: 231.5,
    y: 135,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1074,
    x: 0,
    y: 157.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1075,
    x: 12.5,
    y: 157.5,
    width: 9.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 1076,
    x: 22.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1077,
    x: 35.5,
    y: 157.5,
    width: 12,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1078,
    x: 48,
    y: 157.5,
    width: 17,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1079,
    x: 65.5,
    y: 157.5,
    width: 10.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 1080,
    x: 76.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1081,
    x: 89.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1082,
    x: 102.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1083,
    x: 115.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1084,
    x: 128.5,
    y: 157.5,
    width: 14.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1085,
    x: 143.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1086,
    x: 156.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1087,
    x: 169.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1088,
    x: 182.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1089,
    x: 195.5,
    y: 157.5,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 1090,
    x: 207.5,
    y: 157.5,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 1091,
    x: 219.5,
    y: 157.5,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1092,
    x: 232.5,
    y: 157.5,
    width: 17,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1093,
    x: 0,
    y: 180,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1094,
    x: 13,
    y: 180,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1095,
    x: 26,
    y: 180,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1096,
    x: 39,
    y: 180,
    width: 15.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1097,
    x: 55,
    y: 180,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1098,
    x: 71.5,
    y: 180,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1099,
    x: 84.5,
    y: 180,
    width: 15.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1100,
    x: 100.5,
    y: 180,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 1101,
    x: 112.5,
    y: 180,
    width: 11.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 1102,
    x: 124.5,
    y: 180,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1103,
    x: 141,
    y: 180,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1105,
    x: 154,
    y: 180,
    width: 12.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 8211,
    x: 102.5,
    y: 202.5,
    width: 9.5,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 8220,
    x: 112.5,
    y: 202.5,
    width: 9,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 8221,
    x: 122,
    y: 202.5,
    width: 9,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 8222,
    x: 131.5,
    y: 202.5,
    width: 9,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 8232,
    x: 141,
    y: 202.5,
    width: 9,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 65281,
    x: 150.5,
    y: 202.5,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 65286,
    x: 167,
    y: 202.5,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 65288,
    x: 183.5,
    y: 202.5,
    width: 9,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 65289,
    x: 193,
    y: 202.5,
    width: 9,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 65292,
    x: 202.5,
    y: 202.5,
    width: 11,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 65306,
    x: 214,
    y: 202.5,
    width: 9,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 65311,
    x: 223.5,
    y: 202.5,
    width: 16,
    height: 22,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}],
UI.fonts.soldier_font5 = [{
    id: 32,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 33,
    x: 386.5,
    y: 159,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 34,
    x: 397,
    y: 159,
    width: 9.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 35,
    x: 407,
    y: 159,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 36,
    x: 211,
    y: 212,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 37,
    x: 421.5,
    y: 159,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 38,
    x: 440.5,
    y: 159,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 39,
    x: 459.5,
    y: 159,
    width: 7.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 40,
    x: 467.5,
    y: 159,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 41,
    x: 477,
    y: 159,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 42,
    x: 486.5,
    y: 159,
    width: 11.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 43,
    x: 0,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 44,
    x: 15,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 45,
    x: 24.5,
    y: 185.5,
    width: 11.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 46,
    x: 36.5,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 47,
    x: 46,
    y: 185.5,
    width: 11.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 48,
    x: 346,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 49,
    x: 485.5,
    y: 212,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 50,
    x: 361.5,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 51,
    x: 377,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 52,
    x: 392.5,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 53,
    x: 408,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 54,
    x: 423.5,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 55,
    x: 439,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 56,
    x: 454.5,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 57,
    x: 470,
    y: 212,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 58,
    x: 58,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 59,
    x: 67.5,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 60,
    x: 77,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 61,
    x: 92,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 62,
    x: 107,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 63,
    x: 122,
    y: 185.5,
    width: 12,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 64,
    x: 241.5,
    y: 212,
    width: 19.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 65,
    x: 0,
    y: 0,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 66,
    x: 18,
    y: 0,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 67,
    x: 33.5,
    y: 0,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 68,
    x: 50.5,
    y: 0,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 69,
    x: 68,
    y: 0,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 70,
    x: 82.5,
    y: 0,
    width: 12.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 71,
    x: 95.5,
    y: 0,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 72,
    x: 112,
    y: 0,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 73,
    x: 129,
    y: 0,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 74,
    x: 139.5,
    y: 0,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 75,
    x: 150,
    y: 0,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 76,
    x: 167,
    y: 0,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 77,
    x: 181.5,
    y: 0,
    width: 20.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 78,
    x: 202.5,
    y: 0,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 79,
    x: 220,
    y: 0,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 80,
    x: 239,
    y: 0,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 81,
    x: 327,
    y: 212,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 82,
    x: 253.5,
    y: 0,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 83,
    x: 270,
    y: 0,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 84,
    x: 284.5,
    y: 0,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 85,
    x: 299,
    y: 0,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 86,
    x: 316.5,
    y: 0,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 87,
    x: 333,
    y: 0,
    width: 22.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 88,
    x: 356,
    y: 0,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 89,
    x: 373,
    y: 0,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 90,
    x: 388.5,
    y: 0,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 91,
    x: 134.5,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 92,
    x: 144,
    y: 185.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 93,
    x: 158.5,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 94,
    x: 168,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 95,
    x: 183,
    y: 185.5,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 96,
    x: 200.5,
    y: 185.5,
    width: 11.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 97,
    x: 404.5,
    y: 0,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 98,
    x: 419,
    y: 0,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 99,
    x: 435,
    y: 0,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 100,
    x: 449.5,
    y: 0,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 101,
    x: 465.5,
    y: 0,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 102,
    x: 480.5,
    y: 0,
    width: 11,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 103,
    x: 492,
    y: 0,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 104,
    x: 0,
    y: 26.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 105,
    x: 15.5,
    y: 26.5,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 106,
    x: 26,
    y: 26.5,
    width: 9.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 107,
    x: 36,
    y: 26.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 108,
    x: 51.5,
    y: 26.5,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 109,
    x: 62,
    y: 26.5,
    width: 20.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 110,
    x: 83,
    y: 26.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 111,
    x: 98.5,
    y: 26.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 112,
    x: 114,
    y: 26.5,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 113,
    x: 130,
    y: 26.5,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 114,
    x: 146,
    y: 26.5,
    width: 12,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 115,
    x: 158.5,
    y: 26.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 116,
    x: 172.5,
    y: 26.5,
    width: 11,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 117,
    x: 184,
    y: 26.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 118,
    x: 199.5,
    y: 26.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 119,
    x: 213,
    y: 26.5,
    width: 19,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 120,
    x: 232.5,
    y: 26.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 121,
    x: 247,
    y: 26.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 122,
    x: 261,
    y: 26.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 123,
    x: 212.5,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 124,
    x: 222,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 125,
    x: 237,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 126,
    x: 246.5,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 160,
    x: 275,
    y: 26.5,
    width: 9.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 161,
    x: 261.5,
    y: 185.5,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 162,
    x: 285,
    y: 26.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 164,
    x: 272,
    y: 185.5,
    width: 12.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 166,
    x: 285,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 167,
    x: 300,
    y: 185.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 169,
    x: 261.5,
    y: 212,
    width: 20.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18.5
}, {
    id: 170,
    x: 313.5,
    y: 185.5,
    width: 10.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 171,
    x: 324.5,
    y: 185.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 172,
    x: 338,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 174,
    x: 282.5,
    y: 212,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 176,
    x: 353,
    y: 185.5,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 177,
    x: 363.5,
    y: 185.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 180,
    x: 378.5,
    y: 185.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 187,
    x: 392,
    y: 185.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 191,
    x: 405.5,
    y: 185.5,
    width: 11,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 192,
    x: 300,
    y: 26.5,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 193,
    x: 318,
    y: 26.5,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 194,
    x: 336,
    y: 26.5,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 195,
    x: 354,
    y: 26.5,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 196,
    x: 372,
    y: 26.5,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 197,
    x: 390,
    y: 26.5,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 198,
    x: 408,
    y: 26.5,
    width: 22.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 199,
    x: 431,
    y: 26.5,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 200,
    x: 447.5,
    y: 26.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 201,
    x: 461.5,
    y: 26.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 202,
    x: 475.5,
    y: 26.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 203,
    x: 489.5,
    y: 26.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 204,
    x: 0,
    y: 53,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 205,
    x: 10.5,
    y: 53,
    width: 11,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 206,
    x: 22,
    y: 53,
    width: 11.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 207,
    x: 34,
    y: 53,
    width: 11,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 209,
    x: 45.5,
    y: 53,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 210,
    x: 63,
    y: 53,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 211,
    x: 82,
    y: 53,
    width: 18,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 212,
    x: 100.5,
    y: 53,
    width: 18,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 213,
    x: 119,
    y: 53,
    width: 19,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 214,
    x: 138.5,
    y: 53,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 215,
    x: 417,
    y: 185.5,
    width: 12.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 216,
    x: 157.5,
    y: 53,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 217,
    x: 176.5,
    y: 53,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 218,
    x: 193,
    y: 53,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 219,
    x: 210,
    y: 53,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 220,
    x: 226.5,
    y: 53,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 221,
    x: 243.5,
    y: 53,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 223,
    x: 259,
    y: 53,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 224,
    x: 274,
    y: 53,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 225,
    x: 289,
    y: 53,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 226,
    x: 304,
    y: 53,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 227,
    x: 319,
    y: 53,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 228,
    x: 334.5,
    y: 53,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 229,
    x: 349.5,
    y: 53,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 230,
    x: 364.5,
    y: 53,
    width: 20.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 231,
    x: 385.5,
    y: 53,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 232,
    x: 399.5,
    y: 53,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 233,
    x: 413.5,
    y: 53,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 234,
    x: 427.5,
    y: 53,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 235,
    x: 441.5,
    y: 53,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 236,
    x: 456.5,
    y: 53,
    width: 9.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 237,
    x: 466.5,
    y: 53,
    width: 10.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 238,
    x: 477.5,
    y: 53,
    width: 11.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 239,
    x: 489.5,
    y: 53,
    width: 11,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 241,
    x: 0,
    y: 79.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 242,
    x: 15.5,
    y: 79.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 243,
    x: 30,
    y: 79.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 244,
    x: 44.5,
    y: 79.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 245,
    x: 59,
    y: 79.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 246,
    x: 74.5,
    y: 79.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 248,
    x: 89,
    y: 79.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 249,
    x: 104,
    y: 79.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 250,
    x: 119,
    y: 79.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 251,
    x: 134,
    y: 79.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 252,
    x: 149,
    y: 79.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 253,
    x: 164,
    y: 79.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 255,
    x: 178.5,
    y: 79.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 258,
    x: 193,
    y: 79.5,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 260,
    x: 211,
    y: 79.5,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 261,
    x: 229,
    y: 79.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 262,
    x: 244,
    y: 79.5,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 263,
    x: 260.5,
    y: 79.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 268,
    x: 274,
    y: 79.5,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 269,
    x: 290.5,
    y: 79.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 270,
    x: 304,
    y: 79.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 271,
    x: 321,
    y: 79.5,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 280,
    x: 338.5,
    y: 79.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 281,
    x: 352.5,
    y: 79.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 313,
    x: 366.5,
    y: 79.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 314,
    x: 380.5,
    y: 79.5,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 323,
    x: 391,
    y: 79.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 324,
    x: 408,
    y: 79.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 327,
    x: 423.5,
    y: 79.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 328,
    x: 440.5,
    y: 79.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 336,
    x: 456,
    y: 79.5,
    width: 18,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 337,
    x: 474.5,
    y: 79.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 338,
    x: 489,
    y: 79.5,
    width: 21,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 339,
    x: 0,
    y: 106,
    width: 21.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 340,
    x: 22,
    y: 106,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 341,
    x: 38.5,
    y: 106,
    width: 11.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 346,
    x: 50.5,
    y: 106,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 347,
    x: 65,
    y: 106,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 350,
    x: 78.5,
    y: 106,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 352,
    x: 93,
    y: 106,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 353,
    x: 107.5,
    y: 106,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 354,
    x: 121,
    y: 106,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 356,
    x: 135.5,
    y: 106,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 357,
    x: 150,
    y: 106,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 368,
    x: 165,
    y: 106,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 369,
    x: 181.5,
    y: 106,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 376,
    x: 196.5,
    y: 106,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 377,
    x: 212,
    y: 106,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 378,
    x: 228,
    y: 106,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 379,
    x: 242,
    y: 106,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 380,
    x: 258,
    y: 106,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 381,
    x: 272,
    y: 106,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 382,
    x: 288,
    y: 106,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1025,
    x: 302,
    y: 106,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1040,
    x: 316.5,
    y: 106,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1041,
    x: 334.5,
    y: 106,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1042,
    x: 350,
    y: 106,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1043,
    x: 365.5,
    y: 106,
    width: 12.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 1044,
    x: 378.5,
    y: 106,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1045,
    x: 396,
    y: 106,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1046,
    x: 410.5,
    y: 106,
    width: 22.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1047,
    x: 433.5,
    y: 106,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1048,
    x: 448.5,
    y: 106,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1049,
    x: 466,
    y: 106,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1050,
    x: 483.5,
    y: 106,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1051,
    x: 0,
    y: 132.5,
    width: 17,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1052,
    x: 17.5,
    y: 132.5,
    width: 20.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1053,
    x: 38.5,
    y: 132.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1054,
    x: 55.5,
    y: 132.5,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 1055,
    x: 74.5,
    y: 132.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1056,
    x: 91.5,
    y: 132.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1057,
    x: 106,
    y: 132.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1058,
    x: 123,
    y: 132.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1059,
    x: 137.5,
    y: 132.5,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1060,
    x: 154,
    y: 132.5,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 1061,
    x: 173,
    y: 132.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1062,
    x: 190,
    y: 132.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1063,
    x: 207,
    y: 132.5,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1064,
    x: 223.5,
    y: 132.5,
    width: 21,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1065,
    x: 245,
    y: 132.5,
    width: 21,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15
}, {
    id: 1066,
    x: 266.5,
    y: 132.5,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1067,
    x: 282.5,
    y: 132.5,
    width: 19.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1068,
    x: 302.5,
    y: 132.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1069,
    x: 317,
    y: 132.5,
    width: 16.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1070,
    x: 334,
    y: 132.5,
    width: 23,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1071,
    x: 357.5,
    y: 132.5,
    width: 16,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1072,
    x: 374,
    y: 132.5,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1073,
    x: 388.5,
    y: 132.5,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1074,
    x: 404,
    y: 132.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1075,
    x: 419,
    y: 132.5,
    width: 12,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 1076,
    x: 431.5,
    y: 132.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1077,
    x: 446.5,
    y: 132.5,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1078,
    x: 461.5,
    y: 132.5,
    width: 19.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1079,
    x: 481.5,
    y: 132.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 1080,
    x: 495,
    y: 132.5,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1081,
    x: 0,
    y: 159,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1082,
    x: 16,
    y: 159,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1083,
    x: 31.5,
    y: 159,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1084,
    x: 46,
    y: 159,
    width: 17.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1085,
    x: 64,
    y: 159,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1086,
    x: 79.5,
    y: 159,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1087,
    x: 95,
    y: 159,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1088,
    x: 110.5,
    y: 159,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1089,
    x: 126.5,
    y: 159,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1090,
    x: 141,
    y: 159,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1091,
    x: 155,
    y: 159,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1092,
    x: 169,
    y: 159,
    width: 20.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1093,
    x: 190,
    y: 159,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1094,
    x: 204.5,
    y: 159,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1095,
    x: 220,
    y: 159,
    width: 15,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1096,
    x: 235.5,
    y: 159,
    width: 19,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 1097,
    x: 255,
    y: 159,
    width: 19,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 1098,
    x: 274.5,
    y: 159,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1099,
    x: 289,
    y: 159,
    width: 18.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 1100,
    x: 308,
    y: 159,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1101,
    x: 322,
    y: 159,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1102,
    x: 336.5,
    y: 159,
    width: 19.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1103,
    x: 356.5,
    y: 159,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1105,
    x: 371.5,
    y: 159,
    width: 14.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1523,
    x: 430,
    y: 185.5,
    width: 7,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 1524,
    x: 437.5,
    y: 185.5,
    width: 10,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 8211,
    x: 448,
    y: 185.5,
    width: 13.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 8212,
    x: 462,
    y: 185.5,
    width: 21.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 8217,
    x: 484,
    y: 185.5,
    width: 9,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 8220,
    x: 493.5,
    y: 185.5,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 8221,
    x: 0,
    y: 212,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 8222,
    x: 13.5,
    y: 212,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 8226,
    x: 27,
    y: 212,
    width: 13,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 8230,
    x: 40.5,
    y: 212,
    width: 21.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19.5
}, {
    id: 8232,
    x: 62.5,
    y: 212,
    width: 12.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 8364,
    x: 227,
    y: 212,
    width: 14,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 8470,
    x: 301.5,
    y: 212,
    width: 25,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 22.5
}, {
    id: 12289,
    x: 75.5,
    y: 212,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 65281,
    x: 91.5,
    y: 212,
    width: 21,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 65286,
    x: 113,
    y: 212,
    width: 21,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}, {
    id: 65288,
    x: 134.5,
    y: 212,
    width: 12.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 65289,
    x: 147.5,
    y: 212,
    width: 12.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 65292,
    x: 160.5,
    y: 212,
    width: 15.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 65306,
    x: 176.5,
    y: 212,
    width: 12.5,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 65311,
    x: 189.5,
    y: 212,
    width: 21,
    height: 26,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 19
}],
UI.fonts.soldier_font6 = [{
    id: 32,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 4
}, {
    id: 33,
    x: 0,
    y: 0,
    width: 12.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 34,
    x: 13,
    y: 0,
    width: 12,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8
}, {
    id: 35,
    x: 25.5,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 36,
    x: 42.5,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 37,
    x: 59.5,
    y: 0,
    width: 22,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 38,
    x: 82,
    y: 0,
    width: 22,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 39,
    x: 104.5,
    y: 0,
    width: 9.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 6.5
}, {
    id: 40,
    x: 114.5,
    y: 0,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 41,
    x: 126,
    y: 0,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 42,
    x: 137.5,
    y: 0,
    width: 14,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 43,
    x: 152,
    y: 0,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 44,
    x: 170,
    y: 0,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 45,
    x: 181.5,
    y: 0,
    width: 14.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 46,
    x: 196.5,
    y: 0,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 47,
    x: 208,
    y: 0,
    width: 14.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 48,
    x: 223,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 49,
    x: 240,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 50,
    x: 257,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 51,
    x: 274,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 52,
    x: 291,
    y: 0,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 53,
    x: 308.5,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 54,
    x: 325.5,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 55,
    x: 342.5,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 56,
    x: 359.5,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 57,
    x: 376.5,
    y: 0,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 58,
    x: 393.5,
    y: 0,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 59,
    x: 405,
    y: 0,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 60,
    x: 416.5,
    y: 0,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 61,
    x: 434.5,
    y: 0,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 62,
    x: 452.5,
    y: 0,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 63,
    x: 470.5,
    y: 0,
    width: 14.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 64,
    x: 485.5,
    y: 0,
    width: 21,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 65,
    x: 0,
    y: 28,
    width: 20,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 66,
    x: 20.5,
    y: 28,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 67,
    x: 38,
    y: 28,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 68,
    x: 57,
    y: 28,
    width: 19,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 69,
    x: 76.5,
    y: 28,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 70,
    x: 92.5,
    y: 28,
    width: 14,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 71,
    x: 107,
    y: 28,
    width: 18,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 72,
    x: 125.5,
    y: 28,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 73,
    x: 144.5,
    y: 28,
    width: 11.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 74,
    x: 156.5,
    y: 28,
    width: 11.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 75,
    x: 168.5,
    y: 28,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 76,
    x: 187.5,
    y: 28,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 77,
    x: 203.5,
    y: 28,
    width: 23,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 78,
    x: 227,
    y: 28,
    width: 19.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 79,
    x: 247,
    y: 28,
    width: 21,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 80,
    x: 268.5,
    y: 28,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 81,
    x: 285,
    y: 28,
    width: 20,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 82,
    x: 305.5,
    y: 28,
    width: 18,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 83,
    x: 324,
    y: 28,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 84,
    x: 340.5,
    y: 28,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 85,
    x: 356.5,
    y: 28,
    width: 19,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 86,
    x: 376,
    y: 28,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 87,
    x: 395,
    y: 28,
    width: 25.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 88,
    x: 421,
    y: 28,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 89,
    x: 440,
    y: 28,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 90,
    x: 457,
    y: 28,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 91,
    x: 475,
    y: 28,
    width: 11.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 92,
    x: 487,
    y: 28,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 93,
    x: 0,
    y: 56,
    width: 11.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 94,
    x: 12,
    y: 56,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 95,
    x: 30,
    y: 56,
    width: 20.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 97,
    x: 51,
    y: 56,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 98,
    x: 67.5,
    y: 56,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 99,
    x: 85.5,
    y: 56,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 100,
    x: 101.5,
    y: 56,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 101,
    x: 119.5,
    y: 56,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 102,
    x: 136.5,
    y: 56,
    width: 12.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 103,
    x: 149.5,
    y: 56,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 104,
    x: 166,
    y: 56,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 105,
    x: 183.5,
    y: 56,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 106,
    x: 195,
    y: 56,
    width: 10.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 107,
    x: 206,
    y: 56,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 108,
    x: 223,
    y: 56,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 109,
    x: 234.5,
    y: 56,
    width: 23,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 110,
    x: 258,
    y: 56,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 111,
    x: 275.5,
    y: 56,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 112,
    x: 293,
    y: 56,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 113,
    x: 311,
    y: 56,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 114,
    x: 329,
    y: 56,
    width: 13.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 115,
    x: 343,
    y: 56,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 116,
    x: 358.5,
    y: 56,
    width: 12.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 117,
    x: 371.5,
    y: 56,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 118,
    x: 389,
    y: 56,
    width: 14.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 119,
    x: 404,
    y: 56,
    width: 21.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 120,
    x: 426,
    y: 56,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 121,
    x: 442.5,
    y: 56,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 122,
    x: 458,
    y: 56,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 123,
    x: 473.5,
    y: 56,
    width: 11.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 125,
    x: 485.5,
    y: 56,
    width: 11.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 126,
    x: 0,
    y: 84,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 160,
    x: 18,
    y: 84,
    width: 10.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7
}, {
    id: 161,
    x: 29,
    y: 84,
    width: 12.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 162,
    x: 42,
    y: 84,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 169,
    x: 59,
    y: 84,
    width: 22,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 171,
    x: 81.5,
    y: 84,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 173,
    x: 98,
    y: 84,
    width: 14.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 174,
    x: 113,
    y: 84,
    width: 20,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 177,
    x: 133.5,
    y: 84,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 180,
    x: 151.5,
    y: 84,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 181,
    x: 167.5,
    y: 84,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 187,
    x: 185,
    y: 84,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 191,
    x: 201.5,
    y: 84,
    width: 14,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 193,
    x: 216,
    y: 84,
    width: 20,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 195,
    x: 236.5,
    y: 84,
    width: 19.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 196,
    x: 256.5,
    y: 84,
    width: 20,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 197,
    x: 277,
    y: 84,
    width: 20,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 201,
    x: 297.5,
    y: 84,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 202,
    x: 313.5,
    y: 84,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 203,
    x: 329.5,
    y: 84,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 209,
    x: 345,
    y: 84,
    width: 19.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13
}, {
    id: 211,
    x: 365,
    y: 84,
    width: 20.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 214,
    x: 386,
    y: 84,
    width: 21,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 217,
    x: 407.5,
    y: 84,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 223,
    x: 426.5,
    y: 84,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 224,
    x: 443.5,
    y: 84,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 225,
    x: 460,
    y: 84,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 226,
    x: 477,
    y: 84,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 227,
    x: 494,
    y: 84,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 228,
    x: 0,
    y: 112,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 229,
    x: 17,
    y: 112,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 231,
    x: 34,
    y: 112,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 232,
    x: 49.5,
    y: 112,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 233,
    x: 65,
    y: 112,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 234,
    x: 81,
    y: 112,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 235,
    x: 97,
    y: 112,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 237,
    x: 114,
    y: 112,
    width: 11.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 238,
    x: 126,
    y: 112,
    width: 13,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 8.5
}, {
    id: 241,
    x: 139.5,
    y: 112,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 243,
    x: 157,
    y: 112,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 245,
    x: 173.5,
    y: 112,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 246,
    x: 191,
    y: 112,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 249,
    x: 207.5,
    y: 112,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 251,
    x: 224.5,
    y: 112,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 252,
    x: 241,
    y: 112,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1040,
    x: 258,
    y: 112,
    width: 20,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 1041,
    x: 278.5,
    y: 112,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1042,
    x: 296,
    y: 112,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1043,
    x: 313.5,
    y: 112,
    width: 14,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1044,
    x: 328,
    y: 112,
    width: 19,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1045,
    x: 347.5,
    y: 112,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1046,
    x: 363.5,
    y: 112,
    width: 25.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 1047,
    x: 389.5,
    y: 112,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1048,
    x: 406.5,
    y: 112,
    width: 19,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1049,
    x: 426,
    y: 112,
    width: 19,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1050,
    x: 445.5,
    y: 112,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1051,
    x: 464.5,
    y: 112,
    width: 19,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1052,
    x: 484,
    y: 112,
    width: 23,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1053,
    x: 0,
    y: 140,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1054,
    x: 19,
    y: 140,
    width: 21,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1055,
    x: 40.5,
    y: 140,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1056,
    x: 59.5,
    y: 140,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1057,
    x: 76,
    y: 140,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1058,
    x: 95,
    y: 140,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1059,
    x: 111,
    y: 140,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1061,
    x: 130,
    y: 140,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1063,
    x: 149,
    y: 140,
    width: 18,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1064,
    x: 167.5,
    y: 140,
    width: 24,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1065,
    x: 192,
    y: 140,
    width: 24,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16
}, {
    id: 1067,
    x: 216.5,
    y: 140,
    width: 22,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1068,
    x: 239,
    y: 140,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1069,
    x: 255.5,
    y: 140,
    width: 18.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12.5
}, {
    id: 1071,
    x: 274.5,
    y: 140,
    width: 18,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 1072,
    x: 293,
    y: 140,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1073,
    x: 309.5,
    y: 140,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1074,
    x: 327,
    y: 140,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1075,
    x: 344,
    y: 140,
    width: 13.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9
}, {
    id: 1076,
    x: 358,
    y: 140,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1077,
    x: 375,
    y: 140,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1078,
    x: 392,
    y: 140,
    width: 22,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1079,
    x: 414.5,
    y: 140,
    width: 14.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 9.5
}, {
    id: 1080,
    x: 429.5,
    y: 140,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1081,
    x: 447.5,
    y: 140,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1082,
    x: 465.5,
    y: 140,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1083,
    x: 482.5,
    y: 140,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1084,
    x: 0,
    y: 168,
    width: 20,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 13.5
}, {
    id: 1085,
    x: 20.5,
    y: 168,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1086,
    x: 38,
    y: 168,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1087,
    x: 55.5,
    y: 168,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1088,
    x: 73,
    y: 168,
    width: 17.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1089,
    x: 91,
    y: 168,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1090,
    x: 107,
    y: 168,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1091,
    x: 122.5,
    y: 168,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1092,
    x: 138,
    y: 168,
    width: 23.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 15.5
}, {
    id: 1093,
    x: 162,
    y: 168,
    width: 16,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1094,
    x: 178.5,
    y: 168,
    width: 17,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11.5
}, {
    id: 1095,
    x: 196,
    y: 168,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1096,
    x: 213,
    y: 168,
    width: 21.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1097,
    x: 235,
    y: 168,
    width: 21.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1099,
    x: 257,
    y: 168,
    width: 21,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14
}, {
    id: 1100,
    x: 278.5,
    y: 168,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 1101,
    x: 294,
    y: 168,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 1102,
    x: 310,
    y: 168,
    width: 22,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 14.5
}, {
    id: 1103,
    x: 332.5,
    y: 168,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 1105,
    x: 349.5,
    y: 168,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 8211,
    x: 366.5,
    y: 168,
    width: 16.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 11
}, {
    id: 8212,
    x: 383.5,
    y: 168,
    width: 25.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 17
}, {
    id: 8217,
    x: 409.5,
    y: 168,
    width: 11,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 7.5
}, {
    id: 8220,
    x: 421,
    y: 168,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 8221,
    x: 437,
    y: 168,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 8222,
    x: 453,
    y: 168,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 8226,
    x: 469,
    y: 168,
    width: 15.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10.5
}, {
    id: 8232,
    x: 485,
    y: 168,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 8470,
    x: 0,
    y: 196,
    width: 27,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 18
}, {
    id: 12289,
    x: 27.5,
    y: 196,
    width: 18,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 65281,
    x: 46,
    y: 196,
    width: 24.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 65286,
    x: 71,
    y: 196,
    width: 24.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}, {
    id: 65288,
    x: 96,
    y: 196,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 65289,
    x: 111.5,
    y: 196,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 65292,
    x: 127,
    y: 196,
    width: 18,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 12
}, {
    id: 65306,
    x: 145.5,
    y: 196,
    width: 15,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 10
}, {
    id: 65311,
    x: 161,
    y: 196,
    width: 24.5,
    height: 27.5,
    xoffset: 0,
    yoffset: 0,
    page: 0,
    xadvance: 16.5
}];
var ASSETS = [[{
    name: "hourglass",
    src: "hourglass.png",
    frames: 1,
    layers: 1,
    width: 100,
    height: 150
}], [{
    name: "fonts/font_shilda",
    src: "fonts/font_shilda.png",
    frames: 1,
    layers: 1,
    width: 64,
    height: 64
}, {
    name: "fonts/font_shilda1",
    src: "fonts/font_shilda1.png",
    frames: 1,
    layers: 1,
    width: 64,
    height: 64
}, {
    name: "fonts/font_shilda1_disabled",
    src: "fonts/font_shilda1_disabled.png",
    frames: 1,
    layers: 1,
    width: 64,
    height: 64
}, {
    name: "fonts/number_font",
    src: "fonts/number_font.png",
    frames: 1,
    layers: 1,
    width: 256,
    height: 256
}, {
    name: "fonts/number_font_small",
    src: "fonts/number_font_small.png",
    frames: 1,
    layers: 1,
    width: 128,
    height: 128
}, {
    name: "fonts/soldier_font1",
    src: "fonts/soldier_font1.png",
    frames: 1,
    layers: 1,
    width: 512,
    height: 256
}, {
    name: "fonts/soldier_font3",
    src: "fonts/soldier_font3.png",
    frames: 1,
    layers: 1,
    width: 512,
    height: 512
}, {
    name: "fonts/soldier_font4",
    src: "fonts/soldier_font4.png",
    frames: 1,
    layers: 1,
    width: 512,
    height: 512
}, {
    name: "fonts/soldier_font4_small",
    src: "fonts/soldier_font4_small.png",
    frames: 1,
    layers: 1,
    width: 256,
    height: 256
}, {
    name: "fonts/soldier_font5",
    src: "fonts/soldier_font5.png",
    frames: 1,
    layers: 1,
    width: 512,
    height: 256
}, {
    name: "fonts/soldier_font5_rect",
    src: "fonts/soldier_font5_rect.png",
    frames: 1,
    layers: 1,
    width: 512,
    height: 256
}, {
    name: "fonts/soldier_font6",
    src: "fonts/soldier_font6.png",
    frames: 1,
    layers: 1,
    width: 512,
    height: 256
}], [{
    name: "comics/anim",
    src: "comics/anim.png",
    frames: 2,
    layers: 1,
    width: 152,
    height: 123
}, {
    name: "comics/back",
    src: "comics/back.jpg",
    frames: 1,
    layers: 1,
    width: 683,
    height: 384
}], [{
    name: "particles/back_glow",
    src: "particles/back_glow.png",
    frames: 9,
    layers: 9,
    width: 70,
    height: 70
}, {
    name: "particles/fire",
    src: "particles/fire.png",
    frames: 9,
    layers: 9,
    width: 70,
    height: 70
}], [{
    name: "mainmenu/background_0",
    src: "mainmenu/background_0.png",
    frames: 1,
    layers: 1,
    width: 683,
    height: 384
}, {
    name: "mainmenu/logo_btns_0",
    src: "mainmenu/logo_btns_0.png",
    frames: 1,
    layers: 1,
    width: 440,
    height: 230
}, {
    name: "mainmenu/main_button_0",
    src: "mainmenu/main_button_0.png",
    frames: 1,
    layers: 1,
    width: 121,
    height: 51
}, {
    name: "mainmenu/logo_text",
    src: "mainmenu/logo_text.png",
    frames: 1,
    layers: 1,
    width: 175,
    height: 61
}], [{
    name: "missionselector/background_1",
    src: "missionselector/background_1.png",
    frames: 1,
    layers: 1,
    width: 683,
    height: 384
}, {
    name: "missionselector/background_2",
    src: "missionselector/background_2.png",
    frames: 1,
    layers: 5,
    width: 67,
    height: 64
}, {
    name: "missionselector/dots_0",
    src: "missionselector/dots_0.png",
    frames: 1,
    layers: 2,
    width: 15,
    height: 15
}, {
    name: "missionselector/worlds_icons_0",
    src: "missionselector/worlds_icons_0.png",
    frames: 1,
    layers: 1,
    width: 128,
    height: 128
}, {
    name: "missionselector/worlds_icons_1",
    src: "missionselector/worlds_icons_1.png",
    frames: 1,
    layers: 1,
    width: 128,
    height: 128
}, {
    name: "missionselector/worlds_icons_2",
    src: "missionselector/worlds_icons_2.png",
    frames: 1,
    layers: 1,
    width: 128,
    height: 128
}, {
    name: "missionselector/worlds_icons_3",
    src: "missionselector/worlds_icons_3.png",
    frames: 1,
    layers: 1,
    width: 128,
    height: 128
}, {
    name: "missionselector/worlds_icons_8",
    src: "missionselector/worlds_icons_8.png",
    frames: 1,
    layers: 1,
    width: 128,
    height: 128
}], [{
    name: "common/buttons/button_close",
    src: "common/buttons/button_close.png",
    frames: 1,
    layers: 1,
    width: 41,
    height: 42
}, {
    name: "common/buttons/button_confirm_no",
    src: "common/buttons/button_confirm_no.png",
    frames: 1,
    layers: 1,
    width: 50,
    height: 36
}, {
    name: "common/buttons/button_medium_long",
    src: "common/buttons/button_medium_long.png",
    frames: 1,
    layers: 1,
    width: 144,
    height: 37
}, {
    name: "common/buttons/button_medium_square",
    src: "common/buttons/button_medium_square.png",
    frames: 1,
    layers: 1,
    width: 55,
    height: 55
}, {
    name: "common/buttons/button_shop_small",
    src: "common/buttons/button_shop_small.png",
    frames: 1,
    layers: 1,
    width: 99,
    height: 37
}, {
    name: "common/scroll_bg",
    src: "common/scroll_bg.png",
    frames: 1,
    layers: 1,
    width: 19,
    height: 166
}, {
    name: "common/scroll_point",
    src: "common/scroll_point.png",
    frames: 1,
    layers: 1,
    width: 23,
    height: 24
}, {
    name: "common/checkbox",
    src: "common/checkbox.png",
    frames: 2,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "common/tower_hint",
    src: "common/tower_hint.png",
    frames: 1,
    layers: 1,
    width: 27,
    height: 35
}, {
    name: "common/hint_arrow",
    src: "common/hint_arrow.png",
    frames: 1,
    layers: 1,
    width: 13,
    height: 17
}, {
    name: "common/hint_hand",
    src: "common/hint_hand.png",
    frames: 1,
    layers: 1,
    width: 27,
    height: 35
}, {
    name: "dialogs/achives",
    src: "dialogs/achives.png",
    frames: 1,
    layers: 1,
    width: 387,
    height: 229
}, {
    name: "dialogs/loose",
    src: "dialogs/loose.png",
    frames: 1,
    layers: 1,
    width: 279,
    height: 199
}, {
    name: "dialogs/message",
    src: "dialogs/message.png",
    frames: 1,
    layers: 1,
    width: 225,
    height: 114
}, {
    name: "dialogs/options",
    src: "dialogs/options.png",
    frames: 1,
    layers: 1,
    width: 350,
    height: 188
}, {
    name: "dialogs/win",
    src: "dialogs/win.png",
    frames: 1,
    layers: 1,
    width: 329,
    height: 258
}, {
    name: "dialogs/notification",
    src: "dialogs/notification.png",
    frames: 1,
    layers: 1,
    width: 230,
    height: 49
}, {
    name: "dialogs/ingame",
    src: "dialogs/ingame.png",
    frames: 1,
    layers: 1,
    width: 360,
    height: 119
}, {
    name: "dialogs/new_game",
    src: "dialogs/new_game.png",
    frames: 1,
    layers: 1,
    width: 225,
    height: 195
}, {
    name: "dialogs/tooltip",
    src: "dialogs/tooltip.png",
    frames: 1,
    layers: 1,
    width: 190,
    height: 67
}, {
    name: "common/icons/achievements",
    src: "common/icons/achievements.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/back",
    src: "common/icons/back.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/ch_mission",
    src: "common/icons/ch_mission.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/credits_big",
    src: "common/icons/credits_big.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/ico_no",
    src: "common/icons/ico_no.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "common/icons/ico_yes_red",
    src: "common/icons/ico_yes_red.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "common/icons/main_menu",
    src: "common/icons/main_menu.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/more_games",
    src: "common/icons/more_games.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/next",
    src: "common/icons/next.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/options",
    src: "common/icons/options.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/restart",
    src: "common/icons/restart.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/shop",
    src: "common/icons/shop.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/fullscreen",
    src: "common/icons/fullscreen.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "common/icons/action",
    src: "common/icons/action.png",
    frames: 1,
    layers: 1,
    width: 19,
    height: 24
}, {
    name: "common/icons/button_leaders_ico",
    src: "common/icons/button_leaders_ico.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}], [{
    name: "stars_shop/background_0",
    src: "stars_shop/background_0.jpg",
    frames: 1,
    layers: 1,
    width: 683,
    height: 384
}, {
    name: "stars_shop/banner",
    src: "stars_shop/banner.png",
    frames: 1,
    layers: 1,
    width: 243,
    height: 48
}, {
    name: "stars_shop/icons/1",
    src: "stars_shop/icons/1.png",
    frames: 1,
    layers: 1,
    width: 120,
    height: 90
}, {
    name: "stars_shop/icons/2",
    src: "stars_shop/icons/2.png",
    frames: 1,
    layers: 1,
    width: 120,
    height: 90
}, {
    name: "stars_shop/icons/3",
    src: "stars_shop/icons/3.png",
    frames: 1,
    layers: 1,
    width: 120,
    height: 90
}, {
    name: "stars_shop/icons/4",
    src: "stars_shop/icons/4.png",
    frames: 1,
    layers: 1,
    width: 120,
    height: 90
}, {
    name: "stars_shop/icons/5",
    src: "stars_shop/icons/5.png",
    frames: 1,
    layers: 1,
    width: 120,
    height: 90
}, {
    name: "stars_shop/icons/6",
    src: "stars_shop/icons/6.png",
    frames: 1,
    layers: 1,
    width: 120,
    height: 90
}, {
    name: "stars_shop/plate",
    src: "stars_shop/plate.png",
    frames: 1,
    layers: 1,
    width: 124,
    height: 124
}, {
    name: "stars_shop/tape_big",
    src: "stars_shop/tape_big.png",
    frames: 1,
    layers: 1,
    width: 157,
    height: 30
}], [{
    name: "flags/cz",
    src: "flags/cz.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/de",
    src: "flags/de.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/en",
    src: "flags/en.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/es",
    src: "flags/es.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/fr",
    src: "flags/fr.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/it",
    src: "flags/it.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/nl",
    src: "flags/nl.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/pt",
    src: "flags/pt.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/ru",
    src: "flags/ru.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/sv",
    src: "flags/sv.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "flags/tr",
    src: "flags/tr.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}], [{
    name: "shop/background_0",
    src: "shop/background_0.png",
    frames: 1,
    layers: 1,
    width: 683,
    height: 384
}, {
    name: "shop/panel_towers_0",
    src: "shop/panel_towers_0.png",
    frames: 1,
    layers: 3,
    width: 15,
    height: 17
}, {
    name: "shop/panel_towers_1",
    src: "shop/panel_towers_1.png",
    frames: 1,
    layers: 3,
    width: 18,
    height: 22
}, {
    name: "shop/panel_towers_10",
    src: "shop/panel_towers_10.png",
    frames: 1,
    layers: 1,
    width: 20,
    height: 20
}, {
    name: "shop/panel_towers_11",
    src: "shop/panel_towers_11.png",
    frames: 1,
    layers: 1,
    width: 20,
    height: 20
}, {
    name: "shop/panel_towers_12",
    src: "shop/panel_towers_12.png",
    frames: 1,
    layers: 1,
    width: 20,
    height: 20
}, {
    name: "shop/panel_towers_13",
    src: "shop/panel_towers_13.png",
    frames: 1,
    layers: 1,
    width: 51,
    height: 120
}, {
    name: "shop/panel_towers_14",
    src: "shop/panel_towers_14.png",
    frames: 1,
    layers: 1,
    width: 44,
    height: 44
}, {
    name: "shop/panel_towers_15",
    src: "shop/panel_towers_15.png",
    frames: 1,
    layers: 1,
    width: 44,
    height: 44
}, {
    name: "shop/panel_towers_16",
    src: "shop/panel_towers_16.png",
    frames: 1,
    layers: 1,
    width: 35,
    height: 16
}, {
    name: "shop/panel_towers_17",
    src: "shop/panel_towers_17.png",
    frames: 1,
    layers: 1,
    width: 34,
    height: 103
}, {
    name: "shop/panel_towers_19",
    src: "shop/panel_towers_19.png",
    frames: 1,
    layers: 1,
    width: 51,
    height: 110
}, {
    name: "shop/panel_towers_2",
    src: "shop/panel_towers_2.png",
    frames: 1,
    layers: 3,
    width: 15,
    height: 17
}, {
    name: "shop/panel_towers_20",
    src: "shop/panel_towers_20.png",
    frames: 1,
    layers: 1,
    width: 52,
    height: 75
}, {
    name: "shop/panel_towers_21",
    src: "shop/panel_towers_21.png",
    frames: 1,
    layers: 1,
    width: 34,
    height: 104
}, {
    name: "shop/panel_towers_22",
    src: "shop/panel_towers_22.png",
    frames: 1,
    layers: 1,
    width: 35,
    height: 16
}, {
    name: "shop/panel_towers_23",
    src: "shop/panel_towers_23.png",
    frames: 1,
    layers: 1,
    width: 51,
    height: 125
}, {
    name: "shop/panel_towers_3",
    src: "shop/panel_towers_3.png",
    frames: 1,
    layers: 3,
    width: 18,
    height: 22
}, {
    name: "shop/panel_towers_35",
    src: "shop/panel_towers_35.png",
    frames: 1,
    layers: 1,
    width: 110,
    height: 260
}, {
    name: "shop/panel_towers_36",
    src: "shop/panel_towers_36.png",
    frames: 1,
    layers: 1,
    width: 110,
    height: 230
}, {
    name: "shop/panel_towers_37",
    src: "shop/panel_towers_37.png",
    frames: 1,
    layers: 1,
    width: 110,
    height: 270
}, {
    name: "shop/panel_towers_38",
    src: "shop/panel_towers_38.png",
    frames: 1,
    layers: 1,
    width: 110,
    height: 230
}, {
    name: "shop/panel_towers_39",
    src: "shop/panel_towers_39.png",
    frames: 1,
    layers: 1,
    width: 110,
    height: 220
}, {
    name: "shop/panel_towers_4",
    src: "shop/panel_towers_4.png",
    frames: 1,
    layers: 3,
    width: 15,
    height: 17
}, {
    name: "shop/panel_towers_5",
    src: "shop/panel_towers_5.png",
    frames: 1,
    layers: 3,
    width: 18,
    height: 22
}, {
    name: "shop/panel_towers_6",
    src: "shop/panel_towers_6.png",
    frames: 1,
    layers: 3,
    width: 15,
    height: 17
}, {
    name: "shop/panel_towers_7",
    src: "shop/panel_towers_7.png",
    frames: 1,
    layers: 3,
    width: 18,
    height: 22
}, {
    name: "shop/panel_towers_9",
    src: "shop/panel_towers_9.png",
    frames: 1,
    layers: 1,
    width: 50,
    height: 50
}, {
    name: "shop/panel_towers_13_d",
    src: "shop/panel_towers_13_d.png",
    frames: 1,
    layers: 1,
    width: 51,
    height: 120
}, {
    name: "shop/panel_towers_14_d",
    src: "shop/panel_towers_14_d.png",
    frames: 1,
    layers: 1,
    width: 44,
    height: 44
}, {
    name: "shop/panel_towers_16_d",
    src: "shop/panel_towers_16_d.png",
    frames: 1,
    layers: 1,
    width: 35,
    height: 16
}, {
    name: "shop/panel_towers_17_d",
    src: "shop/panel_towers_17_d.png",
    frames: 1,
    layers: 1,
    width: 34,
    height: 103
}, {
    name: "shop/panel_towers_19_d",
    src: "shop/panel_towers_19_d.png",
    frames: 1,
    layers: 1,
    width: 51,
    height: 110
}, {
    name: "shop/panel_towers_20_d",
    src: "shop/panel_towers_20_d.png",
    frames: 1,
    layers: 1,
    width: 52,
    height: 75
}, {
    name: "shop/panel_towers_21_d",
    src: "shop/panel_towers_21_d.png",
    frames: 1,
    layers: 1,
    width: 34,
    height: 104
}, {
    name: "shop/panel_towers_22_d",
    src: "shop/panel_towers_22_d.png",
    frames: 1,
    layers: 1,
    width: 35,
    height: 16
}, {
    name: "shop/panel_towers_23_d",
    src: "shop/panel_towers_23_d.png",
    frames: 1,
    layers: 1,
    width: 51,
    height: 125
}, {
    name: "shop/panel_towers_24",
    src: "shop/panel_towers_24.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "shop/panel_towers_26",
    src: "shop/panel_towers_26.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "shop/panel_towers_29",
    src: "shop/panel_towers_29.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "shop/panel_towers_31",
    src: "shop/panel_towers_31.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "shop/panel_towers_40",
    src: "shop/panel_towers_40.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "shop/panel_towers_41",
    src: "shop/panel_towers_41.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "shop/panel_towers_42",
    src: "shop/panel_towers_42.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "shop/panel_towers_43",
    src: "shop/panel_towers_43.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "shop/panel_towers_33",
    src: "shop/panel_towers_33.png",
    frames: 1,
    layers: 1,
    width: 70,
    height: 70
}, {
    name: "in_game_shop/background",
    src: "in_game_shop/background.jpg",
    frames: 1,
    layers: 1,
    width: 683,
    height: 384
}, {
    name: "common/icons_perks_0",
    src: "common/icons_perks_0.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_1",
    src: "common/icons_perks_1.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_10",
    src: "common/icons_perks_10.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_11",
    src: "common/icons_perks_11.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_12",
    src: "common/icons_perks_12.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_13",
    src: "common/icons_perks_13.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_14",
    src: "common/icons_perks_14.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_15",
    src: "common/icons_perks_15.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_16",
    src: "common/icons_perks_16.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_17",
    src: "common/icons_perks_17.png",
    frames: 1,
    layers: 1,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_18",
    src: "common/icons_perks_18.png",
    frames: 1,
    layers: 1,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_19",
    src: "common/icons_perks_19.png",
    frames: 1,
    layers: 1,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_2",
    src: "common/icons_perks_2.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_20",
    src: "common/icons_perks_20.png",
    frames: 1,
    layers: 1,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_21",
    src: "common/icons_perks_21.png",
    frames: 1,
    layers: 1,
    width: 44,
    height: 44
}, {
    name: "common/icons_perks_3",
    src: "common/icons_perks_3.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_4",
    src: "common/icons_perks_4.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_5",
    src: "common/icons_perks_5.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_6",
    src: "common/icons_perks_6.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_7",
    src: "common/icons_perks_7.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_8",
    src: "common/icons_perks_8.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/icons_perks_9",
    src: "common/icons_perks_9.png",
    frames: 1,
    layers: 2,
    width: 39,
    height: 39
}, {
    name: "common/notifications_10",
    src: "common/notifications_10.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_11",
    src: "common/notifications_11.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_12",
    src: "common/notifications_12.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_13",
    src: "common/notifications_13.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_14",
    src: "common/notifications_14.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_15",
    src: "common/notifications_15.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_16",
    src: "common/notifications_16.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_17",
    src: "common/notifications_17.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_18",
    src: "common/notifications_18.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_3",
    src: "common/notifications_3.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_4",
    src: "common/notifications_4.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_5",
    src: "common/notifications_5.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_6",
    src: "common/notifications_6.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_7",
    src: "common/notifications_7.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_8",
    src: "common/notifications_8.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}, {
    name: "common/notifications_9",
    src: "common/notifications_9.png",
    frames: 1,
    layers: 1,
    width: 31,
    height: 31
}], [{
    name: "main_menu_popup_window/main_menu_btn",
    src: "main_menu_popup_window/main_menu_btn.png",
    frames: 1,
    layers: 1,
    width: 1,
    height: 1
}, {
    name: "main_menu_popup_window/main_menu_btn_close",
    src: "main_menu_popup_window/main_menu_btn_close.png",
    frames: 1,
    layers: 1,
    width: 1,
    height: 1
}, {
    name: "main_menu_popup_window/main_menu_popup",
    src: "main_menu_popup_window/main_menu_popup.png",
    frames: 1,
    layers: 1,
    width: 1,
    height: 1
}]]
  , GAME_ASSETS = [{
    name: "game/worlds/cell_0",
    src: "game/worlds/cell_0.png",
    frames: 1,
    layers: 3,
    width: 20,
    height: 20
}, {
    name: "game/enemies/enemies_0",
    src: "game/enemies/enemies_0.png",
    frames: 1,
    layers: 1,
    width: 15,
    height: 15
}, {
    name: "game/enemies/enemies_1",
    src: "game/enemies/enemies_1.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 25
}, {
    name: "game/enemies/enemies_10",
    src: "game/enemies/enemies_10.png",
    frames: 1,
    layers: 1,
    width: 42,
    height: 20
}, {
    name: "game/enemies/enemies_11",
    src: "game/enemies/enemies_11.png",
    frames: 1,
    layers: 8,
    width: 21,
    height: 21
}, {
    name: "game/enemies/enemies_12",
    src: "game/enemies/enemies_12.png",
    frames: 1,
    layers: 1,
    width: 39,
    height: 20
}, {
    name: "game/enemies/enemies_13",
    src: "game/enemies/enemies_13.png",
    frames: 1,
    layers: 1,
    width: 18,
    height: 15
}, {
    name: "game/enemies/enemies_14",
    src: "game/enemies/enemies_14.png",
    frames: 1,
    layers: 8,
    width: 21,
    height: 21
}, {
    name: "game/enemies/enemies_15",
    src: "game/enemies/enemies_15.png",
    frames: 1,
    layers: 4,
    width: 30,
    height: 33
}, {
    name: "game/enemies/enemies_16",
    src: "game/enemies/enemies_16.png",
    frames: 1,
    layers: 1,
    width: 18,
    height: 9
}, {
    name: "game/enemies/enemies_17",
    src: "game/enemies/enemies_17.png",
    frames: 1,
    layers: 8,
    width: 21,
    height: 21
}, {
    name: "game/enemies/enemies_18",
    src: "game/enemies/enemies_18.png",
    frames: 1,
    layers: 4,
    width: 40,
    height: 39
}, {
    name: "game/enemies/enemies_19",
    src: "game/enemies/enemies_19.png",
    frames: 1,
    layers: 1,
    width: 3,
    height: 3
}, {
    name: "game/enemies/enemies_2",
    src: "game/enemies/enemies_2.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/enemies/enemies_20",
    src: "game/enemies/enemies_20.png",
    frames: 1,
    layers: 1,
    width: 13,
    height: 9
}, {
    name: "game/enemies/enemies_21",
    src: "game/enemies/enemies_21.png",
    frames: 1,
    layers: 1,
    width: 48,
    height: 25
}, {
    name: "game/enemies/enemies_22",
    src: "game/enemies/enemies_22.png",
    frames: 1,
    layers: 8,
    width: 60,
    height: 60
}, {
    name: "game/enemies/enemies_23",
    src: "game/enemies/enemies_23.png",
    frames: 1,
    layers: 8,
    width: 21,
    height: 21
}, {
    name: "game/enemies/enemies_24",
    src: "game/enemies/enemies_24.png",
    frames: 1,
    layers: 1,
    width: 90,
    height: 32
}, {
    name: "game/enemies/enemies_25",
    src: "game/enemies/enemies_25.png",
    frames: 1,
    layers: 1,
    width: 5,
    height: 2
}, {
    name: "game/enemies/enemies_26",
    src: "game/enemies/enemies_26.png",
    frames: 1,
    layers: 1,
    width: 73,
    height: 78
}, {
    name: "game/enemies/enemies_27",
    src: "game/enemies/enemies_27.png",
    frames: 1,
    layers: 1,
    width: 5,
    height: 2
}, {
    name: "game/enemies/enemies_28",
    src: "game/enemies/enemies_28.png",
    frames: 1,
    layers: 8,
    width: 21,
    height: 21
}, {
    name: "game/enemies/enemies_29",
    src: "game/enemies/enemies_29.png",
    frames: 1,
    layers: 1,
    width: 17,
    height: 5
}, {
    name: "game/enemies/enemies_3",
    src: "game/enemies/enemies_3.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/enemies/enemies_30",
    src: "game/enemies/enemies_30.png",
    frames: 1,
    layers: 1,
    width: 17,
    height: 5
}, {
    name: "game/enemies/enemies_4",
    src: "game/enemies/enemies_4.png",
    frames: 1,
    layers: 1,
    width: 15,
    height: 15
}, {
    name: "game/enemies/enemies_5",
    src: "game/enemies/enemies_5.png",
    frames: 1,
    layers: 1,
    width: 35,
    height: 24
}, {
    name: "game/enemies/enemies_6",
    src: "game/enemies/enemies_6.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/enemies/enemies_7",
    src: "game/enemies/enemies_7.png",
    frames: 1,
    layers: 1,
    width: 33,
    height: 33
}, {
    name: "game/enemies/enemies_8",
    src: "game/enemies/enemies_8.png",
    frames: 1,
    layers: 1,
    width: 53,
    height: 38
}, {
    name: "game/enemies/enemies_9",
    src: "game/enemies/enemies_9.png",
    frames: 1,
    layers: 21,
    width: 28,
    height: 28
}, {
    name: "game/enemies/enemies_22_shadow",
    src: "game/enemies/enemies_22_shadow.png",
    frames: 1,
    layers: 8,
    width: 60,
    height: 60
}, {
    name: "game/enemies/enemies_24_shadow",
    src: "game/enemies/enemies_24_shadow.png",
    frames: 1,
    layers: 1,
    width: 90,
    height: 32
}, {
    name: "game/enemies/enemies_26_shadow",
    src: "game/enemies/enemies_26_shadow.png",
    frames: 1,
    layers: 1,
    width: 73,
    height: 78
}, {
    name: "game/enemies/animation/fire_shot",
    src: "game/enemies/animation/fire_shot.png",
    frames: 6,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/bullets/bullets_0",
    src: "game/bullets/bullets_0.png",
    frames: 1,
    layers: 1,
    width: 16,
    height: 16
}, {
    name: "game/bullets/bullets_1",
    src: "game/bullets/bullets_1.png",
    frames: 1,
    layers: 1,
    width: 4,
    height: 1
}, {
    name: "game/bullets/bullets_2",
    src: "game/bullets/bullets_2.png",
    frames: 1,
    layers: 1,
    width: 16,
    height: 4
}, {
    name: "game/bullets/bullets_3",
    src: "game/bullets/bullets_3.png",
    frames: 1,
    layers: 1,
    width: 9,
    height: 4
}, {
    name: "game/bullets/bullets_4",
    src: "game/bullets/bullets_4.png",
    frames: 1,
    layers: 1,
    width: 16,
    height: 3
}, {
    name: "game/bullets/bullets_5",
    src: "game/bullets/bullets_5.png",
    frames: 1,
    layers: 1,
    width: 16,
    height: 16
}, {
    name: "game/digits/digits_0_9_0",
    src: "game/digits/digits_0_9_0.png",
    frames: 1,
    layers: 1,
    width: 89,
    height: 110
}, {
    name: "game/digits/digits_0_9_1",
    src: "game/digits/digits_0_9_1.png",
    frames: 1,
    layers: 1,
    width: 62,
    height: 110
}, {
    name: "game/digits/digits_0_9_2",
    src: "game/digits/digits_0_9_2.png",
    frames: 1,
    layers: 1,
    width: 86,
    height: 110
}, {
    name: "game/digits/digits_0_9_3",
    src: "game/digits/digits_0_9_3.png",
    frames: 1,
    layers: 1,
    width: 82,
    height: 110
}, {
    name: "game/digits/digits_0_9_4",
    src: "game/digits/digits_0_9_4.png",
    frames: 1,
    layers: 1,
    width: 95,
    height: 110
}, {
    name: "game/digits/digits_0_9_5",
    src: "game/digits/digits_0_9_5.png",
    frames: 1,
    layers: 1,
    width: 83,
    height: 110
}, {
    name: "game/digits/digits_0_9_6",
    src: "game/digits/digits_0_9_6.png",
    frames: 1,
    layers: 1,
    width: 90,
    height: 110
}, {
    name: "game/digits/digits_0_9_7",
    src: "game/digits/digits_0_9_7.png",
    frames: 1,
    layers: 1,
    width: 88,
    height: 110
}, {
    name: "game/digits/digits_0_9_8",
    src: "game/digits/digits_0_9_8.png",
    frames: 1,
    layers: 1,
    width: 91,
    height: 110
}, {
    name: "game/digits/digits_0_9_9",
    src: "game/digits/digits_0_9_9.png",
    frames: 1,
    layers: 1,
    width: 89,
    height: 110
}, {
    name: "game/infobar/collect_hero_towers_0",
    src: "game/infobar/collect_hero_towers_0.png",
    frames: 1,
    layers: 1,
    width: 330,
    height: 88
}, {
    name: "game/infobar/collect_hero_towers_2",
    src: "game/infobar/collect_hero_towers_2.png",
    frames: 1,
    layers: 1,
    width: 272,
    height: 108
}, {
    name: "game/infobar/icons_hero_0",
    src: "game/infobar/icons_hero_0.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_1",
    src: "game/infobar/icons_hero_1.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_10",
    src: "game/infobar/icons_hero_10.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_11",
    src: "game/infobar/icons_hero_11.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_12",
    src: "game/infobar/icons_hero_12.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_13",
    src: "game/infobar/icons_hero_13.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_14",
    src: "game/infobar/icons_hero_14.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_15",
    src: "game/infobar/icons_hero_15.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_16",
    src: "game/infobar/icons_hero_16.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_2",
    src: "game/infobar/icons_hero_2.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_3",
    src: "game/infobar/icons_hero_3.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_4",
    src: "game/infobar/icons_hero_4.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_5",
    src: "game/infobar/icons_hero_5.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_6",
    src: "game/infobar/icons_hero_6.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_7",
    src: "game/infobar/icons_hero_7.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_8",
    src: "game/infobar/icons_hero_8.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/icons_hero_9",
    src: "game/infobar/icons_hero_9.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/infobar_10",
    src: "game/infobar/infobar_10.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/infobar_11",
    src: "game/infobar/infobar_11.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/infobar_12",
    src: "game/infobar/infobar_12.png",
    frames: 1,
    layers: 1,
    width: 55,
    height: 38
}, {
    name: "game/infobar/infobar_13",
    src: "game/infobar/infobar_13.png",
    frames: 1,
    layers: 1,
    width: 57,
    height: 42
}, {
    name: "game/infobar/infobar_14",
    src: "game/infobar/infobar_14.png",
    frames: 1,
    layers: 1,
    width: 61,
    height: 60
}, {
    name: "game/infobar/infobar_15",
    src: "game/infobar/infobar_15.png",
    frames: 1,
    layers: 1,
    width: 61,
    height: 60
}, {
    name: "game/infobar/infobar_16",
    src: "game/infobar/infobar_16.png",
    frames: 1,
    layers: 1,
    width: 61,
    height: 60
}, {
    name: "game/infobar/infobar_17",
    src: "game/infobar/infobar_17.png",
    frames: 1,
    layers: 1,
    width: 61,
    height: 60
}, {
    name: "game/infobar/infobar_18",
    src: "game/infobar/infobar_18.png",
    frames: 1,
    layers: 1,
    width: 61,
    height: 60
}, {
    name: "game/infobar/infobar_19",
    src: "game/infobar/infobar_19.png",
    frames: 1,
    layers: 1,
    width: 61,
    height: 60
}, {
    name: "game/infobar/infobar_2",
    src: "game/infobar/infobar_2.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/infobar/infobar_20",
    src: "game/infobar/infobar_20.png",
    frames: 1,
    layers: 1,
    width: 61,
    height: 60
}, {
    name: "game/infobar/infobar_21",
    src: "game/infobar/infobar_21.png",
    frames: 1,
    layers: 1,
    width: 61,
    height: 60
}, {
    name: "game/infobar/infobar_23",
    src: "game/infobar/infobar_23.png",
    frames: 1,
    layers: 1,
    width: 40,
    height: 40
}, {
    name: "game/infobar/infobar_3",
    src: "game/infobar/infobar_3.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 34
}, {
    name: "game/infobar/infobar_35_0",
    src: "game/infobar/infobar_35_0.png",
    frames: 1,
    layers: 1,
    width: 65,
    height: 65
}, {
    name: "game/infobar/infobar_35_1",
    src: "game/infobar/infobar_35_1.png",
    frames: 1,
    layers: 1,
    width: 65,
    height: 65
}, {
    name: "game/infobar/infobar_36_0",
    src: "game/infobar/infobar_36_0.png",
    frames: 1,
    layers: 1,
    width: 65,
    height: 65
}, {
    name: "game/infobar/infobar_36_1",
    src: "game/infobar/infobar_36_1.png",
    frames: 1,
    layers: 1,
    width: 65,
    height: 65
}, {
    name: "game/infobar/infobar_37_0",
    src: "game/infobar/infobar_37_0.png",
    frames: 1,
    layers: 1,
    width: 65,
    height: 65
}, {
    name: "game/infobar/infobar_37_1",
    src: "game/infobar/infobar_37_1.png",
    frames: 1,
    layers: 1,
    width: 65,
    height: 65
}, {
    name: "game/infobar/infobar_38_0",
    src: "game/infobar/infobar_38_0.png",
    frames: 1,
    layers: 1,
    width: 65,
    height: 65
}, {
    name: "game/infobar/infobar_38_1",
    src: "game/infobar/infobar_38_1.png",
    frames: 1,
    layers: 1,
    width: 65,
    height: 65
}, {
    name: "game/infobar/infobar_39",
    src: "game/infobar/infobar_39.png",
    frames: 1,
    layers: 1,
    width: 16,
    height: 14
}, {
    name: "game/infobar/infobar_4",
    src: "game/infobar/infobar_4.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/infobar/infobar_5",
    src: "game/infobar/infobar_5.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 34
}, {
    name: "game/infobar/infobar_6",
    src: "game/infobar/infobar_6.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 34
}, {
    name: "game/infobar/infobar_7",
    src: "game/infobar/infobar_7.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 34
}, {
    name: "game/infobar/infobar_8",
    src: "game/infobar/infobar_8.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 34
}, {
    name: "game/infobar/infobar_9",
    src: "game/infobar/infobar_9.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 25
}, {
    name: "game/infobar/next_mission_0",
    src: "game/infobar/next_mission_0.png",
    frames: 1,
    layers: 1,
    width: 100,
    height: 100
}, {
    name: "game/infobar/next_mission_1",
    src: "game/infobar/next_mission_1.png",
    frames: 1,
    layers: 1,
    width: 100,
    height: 100
}, {
    name: "game/infobar/next_mission_2",
    src: "game/infobar/next_mission_2.png",
    frames: 1,
    layers: 1,
    width: 100,
    height: 100
}, {
    name: "game/infobar/tower_button_0",
    src: "game/infobar/tower_button_0.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_1",
    src: "game/infobar/tower_button_1.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_10",
    src: "game/infobar/tower_button_10.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_11",
    src: "game/infobar/tower_button_11.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_12",
    src: "game/infobar/tower_button_12.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_13",
    src: "game/infobar/tower_button_13.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_14",
    src: "game/infobar/tower_button_14.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_15",
    src: "game/infobar/tower_button_15.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_16",
    src: "game/infobar/tower_button_16.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_17",
    src: "game/infobar/tower_button_17.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_18",
    src: "game/infobar/tower_button_18.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_19",
    src: "game/infobar/tower_button_19.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_2",
    src: "game/infobar/tower_button_2.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_20",
    src: "game/infobar/tower_button_20.png",
    frames: 1,
    layers: 1,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_21",
    src: "game/infobar/tower_button_21.png",
    frames: 1,
    layers: 1,
    width: 36,
    height: 42
}, {
    name: "game/infobar/tower_button_22",
    src: "game/infobar/tower_button_22.png",
    frames: 1,
    layers: 1,
    width: 36,
    height: 42
}, {
    name: "game/infobar/tower_button_23",
    src: "game/infobar/tower_button_23.png",
    frames: 1,
    layers: 1,
    width: 43,
    height: 37
}, {
    name: "game/infobar/tower_button_24",
    src: "game/infobar/tower_button_24.png",
    frames: 1,
    layers: 1,
    width: 43,
    height: 37
}, {
    name: "game/infobar/tower_button_25",
    src: "game/infobar/tower_button_25.png",
    frames: 1,
    layers: 1,
    width: 43,
    height: 37
}, {
    name: "game/infobar/tower_button_26",
    src: "game/infobar/tower_button_26.png",
    frames: 1,
    layers: 1,
    width: 43,
    height: 37
}, {
    name: "game/infobar/tower_button_27",
    src: "game/infobar/tower_button_27.png",
    frames: 1,
    layers: 1,
    width: 43,
    height: 37
}, {
    name: "game/infobar/tower_button_28",
    src: "game/infobar/tower_button_28.png",
    frames: 1,
    layers: 1,
    width: 43,
    height: 37
}, {
    name: "game/infobar/tower_button_3",
    src: "game/infobar/tower_button_3.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_4",
    src: "game/infobar/tower_button_4.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_5",
    src: "game/infobar/tower_button_5.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_6",
    src: "game/infobar/tower_button_6.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_7",
    src: "game/infobar/tower_button_7.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_8",
    src: "game/infobar/tower_button_8.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_9",
    src: "game/infobar/tower_button_9.png",
    frames: 1,
    layers: 2,
    width: 32,
    height: 32
}, {
    name: "game/infobar/tower_button_31",
    src: "game/infobar/tower_button_31.png",
    frames: 1,
    layers: 1,
    width: 50,
    height: 44
}, {
    name: "game/infobar/lock_big",
    src: "game/infobar/lock_big.png",
    frames: 1,
    layers: 1,
    width: 36,
    height: 36
}, {
    name: "game/infobar/price_back_0",
    src: "game/infobar/price_back_0.png",
    frames: 1,
    layers: 1,
    width: 34,
    height: 18
}, {
    name: "game/towers/towers_0",
    src: "game/towers/towers_0.png",
    frames: 1,
    layers: 3,
    width: 10,
    height: 9
}, {
    name: "game/towers/towers_1",
    src: "game/towers/towers_1.png",
    frames: 1,
    layers: 3,
    width: 10,
    height: 9
}, {
    name: "game/towers/towers_10",
    src: "game/towers/towers_10.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_11",
    src: "game/towers/towers_11.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_12",
    src: "game/towers/towers_12.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_13",
    src: "game/towers/towers_13.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_14",
    src: "game/towers/towers_14.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_15",
    src: "game/towers/towers_15.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_16",
    src: "game/towers/towers_16.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_17",
    src: "game/towers/towers_17.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_18",
    src: "game/towers/towers_18.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_19",
    src: "game/towers/towers_19.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_2",
    src: "game/towers/towers_2.png",
    frames: 1,
    layers: 3,
    width: 10,
    height: 9
}, {
    name: "game/towers/towers_20",
    src: "game/towers/towers_20.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_21",
    src: "game/towers/towers_21.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_22",
    src: "game/towers/towers_22.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_23",
    src: "game/towers/towers_23.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_24",
    src: "game/towers/towers_24.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_25",
    src: "game/towers/towers_25.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_26",
    src: "game/towers/towers_26.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_27",
    src: "game/towers/towers_27.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_28",
    src: "game/towers/towers_28.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_29",
    src: "game/towers/towers_29.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_3",
    src: "game/towers/towers_3.png",
    frames: 1,
    layers: 3,
    width: 9,
    height: 9
}, {
    name: "game/towers/towers_30",
    src: "game/towers/towers_30.png",
    frames: 1,
    layers: 1,
    width: 25,
    height: 30
}, {
    name: "game/towers/towers_31",
    src: "game/towers/towers_31.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_32",
    src: "game/towers/towers_32.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_33",
    src: "game/towers/towers_33.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_34",
    src: "game/towers/towers_34.png",
    frames: 1,
    layers: 1,
    width: 30,
    height: 30
}, {
    name: "game/towers/towers_6",
    src: "game/towers/towers_6.png",
    frames: 1,
    layers: 1,
    width: 15,
    height: 15
}, {
    name: "game/towers/towers_9",
    src: "game/towers/towers_9.png",
    frames: 1,
    layers: 1,
    width: 20,
    height: 20
}, {
    name: "game/towers/flamethrower",
    src: "game/towers/flamethrower.png",
    frames: 10,
    layers: 10,
    width: 15,
    height: 45
}, {
    name: "game/towers/dead_tower_small2",
    src: "game/towers/dead_tower_small2.png",
    frames: 1,
    layers: 1,
    width: 20,
    height: 20
}, {
    name: "particles/base_explosion",
    src: "particles/base_explosion.png",
    frames: 10,
    layers: 5,
    width: 96,
    height: 96,
    spriteClass: "TilesSprite"
}, {
    name: "particles/heal",
    src: "particles/heal.png",
    frames: 10,
    layers: 5,
    width: 41,
    height: 50,
    spriteClass: "TilesSprite"
}, {
    name: "particles/resurrect",
    src: "particles/resurrect.png",
    frames: 10,
    layers: 8,
    width: 41,
    height: 50,
    spriteClass: "TilesSprite"
}]
  , I18 = {
    currentLocale: "en",
    supportedLanguage: ["en", "en_coolmath", "ru", "fr", "it", "pt", "tr", "cz", "de", "nl", "es", "sv"],
    strings: {},
    init: function(t, a) {
        var e = window.navigator.userLanguage || window.navigator.language || "";
        t || (t = e.substr(0, 2)),
        I18.supportedLanguage.indexOf(t) < 0 && (t = I18.supportedLanguage[0]),
        I18.currentLocale = t,
        Utils.get("language/" + t + ".json?v=" + (new Date).getTime(), null, "json", function(t) {
            for (var e = {}, i = t.s, s = 0; s < i.length; s++)
                e[I18.trim(i[s].text)] = I18.trim(i[s].translation);
            I18.setup(e),
            a && a()
        })
    },
    setup: function(t) {
        I18.strings = t
    },
    trim: function(t) {
        return t ? t.replace(/^\s+|\s+$/gm, "") : ""
    },
    arrayAntidot: function(t) {
        if (t)
            return 0 < t.length && Utils.isArray(t[0]) ? t[0] : t
    },
    getString: function(t, e) {
        void 0 === e && (e = null);
        var i = I18.getStringOrNull(t, e);
        return null == i ? "{" + t + "}" : i
    },
    getStringOrNull: function(t, e) {
        void 0 === e && (e = null);
        var i = I18.strings[t];
        return void 0 === i && (i = null),
        null == e || null == i ? i : (e = [i].concat(I18.arrayAntidot(e)),
        I18.sprintf.apply(I18, e))
    },
    f: function(t) {
        var e = I18.arrayAntidot(Array.prototype.slice.call(arguments, 1));
        return Utils.isArray(e) || (e = [e]),
        I18.getString(t, e)
    },
    s: function(t, e, i) {
        return Utils.isArray(i) || (i = [i]),
        I18.getString(t + "_" + e, I18.arrayAntidot(i))
    },
    sf: function(t, e, i) {
        return I18.getString(t + "_" + e, I18.arrayAntidot(i))
    },
    psf: function(t, e, i, s, a) {
        return I18.getString(t + "_" + e + "_" + i, I18.arrayAntidot(s))
    },
    sprintf: function() {
        function w(t, e, i, s) {
            i || (i = " ");
            var a = t.length >= e ? "" : new Array(1 + e - t.length >>> 0).join(i);
            return s ? t + a : a + t
        }
        function v(t, e, i, s, a, o) {
            var n = s - t.length;
            return 0 < n && (t = i || !a ? w(t, s, o, i) : t.slice(0, e.length) + w("", n, "0", !0) + t.slice(e.length)),
            t
        }
        function A(t, e, i, s, a, o, n) {
            var r = t >>> 0;
            return t = (i = i && r && {
                2: "0b",
                8: "0",
                16: "0x"
            }[e] || "") + w(r.toString(e), o || 0, "0", !1),
            v(t, i, s, a, n)
        }
        function b(t, e, i, s, a, o) {
            return null != s && (t = t.slice(0, s)),
            v(t, "", e, i, a, o)
        }
        var T = arguments
          , S = 0
          , t = T[S++];
        return t.replace(/%%|%(\d+\$)?([-+\'#0]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g, function(t, e, i, s, a, o, n) {
            var r, h, d, l, f;
            if ("%%" === t)
                return "%";
            for (var c = !1, g = "", p = !1, x = !1, y = " ", u = i.length, m = 0; i && m < u; m++)
                switch (i.charAt(m)) {
                case " ":
                    g = " ";
                    break;
                case "+":
                    g = "+";
                    break;
                case "-":
                    c = !0;
                    break;
                case "'":
                    y = i.charAt(m + 1);
                    break;
                case "0":
                    p = !0,
                    y = "0";
                    break;
                case "#":
                    x = !0
                }
            if ((s = s ? "*" === s ? +T[S++] : "*" == s.charAt(0) ? +T[s.slice(1, -1)] : +s : 0) < 0 && (s = -s,
            c = !0),
            !isFinite(s))
                throw new Error("sprintf: (minimum-)width must be finite");
            switch (o = o ? "*" === o ? +T[S++] : "*" == o.charAt(0) ? +T[o.slice(1, -1)] : +o : -1 < "fFeE".indexOf(n) ? 6 : "d" === n ? 0 : void 0,
            f = e ? T[e.slice(0, -1)] : T[S++],
            n) {
            case "s":
                return b(String(f), c, s, o, p, y);
            case "c":
                return b(String.fromCharCode(+f), c, s, o, p);
            case "b":
                return A(f, 2, x, c, s, o, p);
            case "o":
                return A(f, 8, x, c, s, o, p);
            case "x":
                return A(f, 16, x, c, s, o, p);
            case "X":
                return A(f, 16, x, c, s, o, p).toUpperCase();
            case "u":
                return A(f, 10, x, c, s, o, p);
            case "i":
            case "d":
                return r = +f || 0,
                f = (h = (r = Math.round(r - r % 1)) < 0 ? "-" : g) + w(String(Math.abs(r)), o, "0", !1),
                v(f, h, c, s, p);
            case "e":
            case "E":
            case "f":
            case "F":
            case "g":
            case "G":
                return h = (r = +f) < 0 ? "-" : g,
                d = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(n.toLowerCase())],
                l = ["toString", "toUpperCase"]["eEfFgG".indexOf(n) % 2],
                f = h + Math.abs(r)[d](o),
                v(f, h, c, s, p)[l]();
            default:
                return t
            }
        })
    }
}
  , GAME_ID = "toy_defense"
  , stage = null
  , fps = 60
  , GET = {}
  , SPLIT_LOADING = !1
  , LANDSCAPE_MODE = !0
  , STATE_LOAD = 0
  , STATE_LOGO = 1
  , STATE_MENU = 2
  , STATE_GAME = 3
  , gameState = STATE_LOAD
  , MIN_LAYOUT_WIDTH = 512
  , MIN_LAYOUT_HEIGHT = 384
  , MAX_LAYOUT_WIDTH = 683
  , MAX_LAYOUT_HEIGHT = 384
  , stageProps = {
    width: 480,
    height: 320
}
  , SERVER_GAME_ID = 21
  , SERVER_GAME_URL = "//gameserver.playtomax.com/toy_defense/";
function startLoad() {
    var t = Utils.getWindowRect()
      , e = Math.max(t.width, t.height) / Utils.globalScale
      , i = Math.min(t.width, t.height) / Utils.globalScale
      , s = {}
      , a = window.devicePixelRatio ? window.devicePixelRatio : 1
      , o = Math.max(window.screen.height * a, document.documentElement.clientHeight, window.innerHeight);
    s.scale = 768 <= o ? 2 : 576 <= o ? 1.5 : 1,
    (1 == GET.debug || Utils.isFirefox() && Utils.detectMobileBrowser()) && (s = Utils.getScaleScreenResolution(1, LANDSCAPE_MODE)),
    "funtomic" == ExternalAPI.type && (s = Utils.getScaleScreenResolution(2, LANDSCAPE_MODE)),
    Utils.globalScale = s.scale,
    s.height = MIN_LAYOUT_HEIGHT,
    s.width = Math.floor(s.height * (e / i)),
    s.width > MAX_LAYOUT_WIDTH && (s.width = MAX_LAYOUT_WIDTH),
    s.width < MIN_LAYOUT_WIDTH && (s.width = MIN_LAYOUT_WIDTH),
    stageProps.width = s.width,
    stageProps.height = s.height,
    s.width = Math.floor(s.width * Utils.globalScale),
    s.height = Math.floor(s.height * Utils.globalScale),
    Utils.createLayout(document.getElementById(Utils.DOMMainContainerId), s),
    setCSSBack(null, "#140501"),
    Utils.addEventListener("fitlayout", function() {
        stage && (stage.drawScene(stage.canvas),
        stage.drawScene(stage.backgroundCanvas, !0)),
        resizeCSSBack()
    }),
    Utils.addEventListener("lockscreen", function() {
        stage && stage.started && stage.stop()
    }),
    Utils.addEventListener("unlockscreen", function() {
        stage && !stage.started && stage.start()
    }),
    Utils.mobileHideAddressBar(),
    GET.debug || Utils.checkOrientation(LANDSCAPE_MODE),
    TTLoader.create(preloadComplete, !0, !1),
    UI.init(loadImagesEnd, TTLoader.showLoadProgress)
}
function loadImagesEnd() {
    SoundsManager.load([], loadSoundsEnd, TTLoader.showLoadProgress, 40, 50)
}
function loadSoundsEnd() {
    TD.load();
    var t = TD.gameData.language;
    "coolmath" === ExternalAPI.type && "en" === t && (t = "en_coolmath"),
    I18.init(t, loadLocalizationEnd)
}
function loadLocalizationEnd() {
    var t = [{
        url: "data/game/towers_hierarchy.json",
        callback: TowersHierarchy.load
    }, {
        url: "data/game/perks.json",
        callback: function(t) {
            TD.configs.perks = t
        }
    }, {
        url: "data/game/bonuses.json",
        callback: function(t) {
            TD.configs.bonuses = t
        }
    }, {
        url: "data/game/soundmanager.json",
        callback: function(t) {
            SoundsManager.config = t.sounds.sound
        }
    }];
    DataCache.batch(t, TTLoader.loadComplete)
}
function preloadComplete() {
    SoundsManager.start(),
    Utils.showMainLayoutContent(),
    ExternalAPI.exec("showCompanyLogo", mainStart) || mainStart()
}
window.onload = function() {
    GET = Utils.parseGet(),
    Utils.addMobileListeners(LANDSCAPE_MODE, !0),
    Utils.mobileCorrectPixelRatio(),
    Utils.addFitLayoutListeners(),
    Utils.switchToTimeMode(1e3 / 24),
    Sprite.FLOOR_VALUES_ON_RENDER = !1,
    Sprite.CACHE_BITMAPS = Utils.isIOS(),
    ExternalAPI.onrefresh = TD.refreshCurrentWindow,
    !0 !== ExternalAPI.init({
        noSplashScreen: !0,
        serverGameId: SERVER_GAME_ID,
        serverUrl: SERVER_GAME_URL,
        checkSiteLock: !0,
        moreGamesUrl: "https://www.actiongame.com"
    }, startLoad) && setTimeout(startLoad, 500)
}
;
var backgroundImage = null;
function setCSSBack(t, e) {
    var i = document.getElementById(Utils.DOMScreenBackgroundContainerId);
    t && (backgroundImage = t,
    i.style.backgroundImage = "url(" + t.src + ")"),
    e && (i.style.backgroundColor = e),
    i.style.backgroundPosition = "center top",
    i.style.backgroundRepeat = "no-repeat",
    resizeCSSBack()
}
function resizeCSSBack() {
    if (backgroundImage) {
        var t = Utils.getWindowRect().height / backgroundImage.height
          , e = Math.floor(backgroundImage.width * t)
          , i = Math.floor(backgroundImage.height * t);
        document.getElementById(Utils.DOMScreenBackgroundContainerId).style.backgroundSize = e + "px " + i + "px"
    }
}
function createStage() {
    stage && (stage.destroy(),
    stage.stop()),
    (stage = new Stage("screen",stageProps.width,stageProps.height,!1)).setBackgroundCanvas("screen_background"),
    stage.delay = 1e3 / fps,
    stage.onpretick = preTick,
    stage.onposttick = postTick,
    stage.ceilSizes = !0,
    stage.showFPS = !1
}
function mainStart() {
    createStage(),
    TD.init(stage, function() {
        TD.showMainMenu(),
        stage.start(),
        stage.refreshBackground(),
        UI.loadMoreAssets()
    })
}
function launchLoadScreen(e) {
    ExternalAPI.exec("showWelcomeScreen", stage, {
        windowBack: UI.assetsLibrary.getBitmap("main_menu_popup_window/main_menu_popup"),
        buttonBack: UI.assetsLibrary.getBitmap("main_menu_popup_window/main_menu_btn"),
        headerColor: "rgb(255,254,4)",
        headerStroke: "rgb(139,70,32)",
        textColor: "rgb(255,255,255)",
        textStroke: "rgb(139,70,32)",
        buttonColor: "rgb(255,255,255)",
        buttonStroke: "rgb(0,0,0)",
        onSelect: function(t) {
            t.target.safeRemove(),
            TD.load(e)
        }
    }) || e()
}
function getGameDataId() {
    return "playtomax_" + GAME_ID + "_data"
}
function showMoreGames() {
    if (!ExternalAPI.exec("showMoreGames") && !ExternalAPI.exec("customMoreGames")) {
        var t = ExternalAPI.exec("getMoreGamesURL")
          , e = window.open(t, "_blank");
        e ? e.focus() : window.location.href = t
    }
}
function preTick(t) {
    TD.tick(t.delta)
}
function postTick(t) {
    TD.postTick()
}
