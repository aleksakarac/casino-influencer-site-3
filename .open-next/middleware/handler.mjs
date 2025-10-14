
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.8.4";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = parse3;
    exports.serialize = serialize;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parse3(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = str.indexOf("=", index);
        if (eqIdx === -1)
          break;
        const colonIdx = str.indexOf(";", index);
        const endIdx = colonIdx === -1 ? len : colonIdx;
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const keyStartIdx = startIndex(str, index, eqIdx);
        const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        const key = str.slice(keyStartIdx, keyEndIdx);
        if (obj[key] === void 0) {
          let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          let valEndIdx = endIndex(str, endIdx, valStartIdx);
          const value = dec(str.slice(valStartIdx, valEndIdx));
          obj[key] = value;
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        const code = str.charCodeAt(index);
        if (code !== 32 && code !== 9)
          return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        const code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9)
          return index + 1;
      }
      return min;
    }
    function serialize(name, val, options) {
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError(`argument name is invalid: ${name}`);
      }
      const value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${val}`);
      }
      let str = name + "=" + value;
      if (!options)
        return str;
      if (options.maxAge !== void 0) {
        if (!Number.isInteger(options.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
        }
        str += "; Max-Age=" + options.maxAge;
      }
      if (options.domain) {
        if (!domainValueRegExp.test(options.domain)) {
          throw new TypeError(`option domain is invalid: ${options.domain}`);
        }
        str += "; Domain=" + options.domain;
      }
      if (options.path) {
        if (!pathValueRegExp.test(options.path)) {
          throw new TypeError(`option path is invalid: ${options.path}`);
        }
        str += "; Path=" + options.path;
      }
      if (options.expires) {
        if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${options.expires}`);
        }
        str += "; Expires=" + options.expires.toUTCString();
      }
      if (options.httpOnly) {
        str += "; HttpOnly";
      }
      if (options.secure) {
        str += "; Secure";
      }
      if (options.partitioned) {
        str += "; Partitioned";
      }
      if (options.priority) {
        const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${options.priority}`);
        }
      }
      if (options.sameSite) {
        const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
        }
      }
      return str;
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/logger.js
var init_logger2 = __esm({
  "node_modules/@opennextjs/aws/dist/logger.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger2();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var a = {}, b = {};
      function c(d) {
        var e = b[d];
        if (void 0 !== e) return e.exports;
        var f = b[d] = { exports: {} }, g = true;
        try {
          a[d](f, f.exports, c), g = false;
        } finally {
          g && delete b[d];
        }
        return f.exports;
      }
      c.m = a, c.amdO = {}, (() => {
        var a2 = [];
        c.O = (b2, d, e, f) => {
          if (d) {
            f = f || 0;
            for (var g = a2.length; g > 0 && a2[g - 1][2] > f; g--) a2[g] = a2[g - 1];
            a2[g] = [d, e, f];
            return;
          }
          for (var h = 1 / 0, g = 0; g < a2.length; g++) {
            for (var [d, e, f] = a2[g], i = true, j = 0; j < d.length; j++) (false & f || h >= f) && Object.keys(c.O).every((a3) => c.O[a3](d[j])) ? d.splice(j--, 1) : (i = false, f < h && (h = f));
            if (i) {
              a2.splice(g--, 1);
              var k = e();
              void 0 !== k && (b2 = k);
            }
          }
          return b2;
        };
      })(), c.n = (a2) => {
        var b2 = a2 && a2.__esModule ? () => a2.default : () => a2;
        return c.d(b2, { a: b2 }), b2;
      }, (() => {
        var a2, b2 = Object.getPrototypeOf ? (a3) => Object.getPrototypeOf(a3) : (a3) => a3.__proto__;
        c.t = function(d, e) {
          if (1 & e && (d = this(d)), 8 & e || "object" == typeof d && d && (4 & e && d.__esModule || 16 & e && "function" == typeof d.then)) return d;
          var f = /* @__PURE__ */ Object.create(null);
          c.r(f);
          var g = {};
          a2 = a2 || [null, b2({}), b2([]), b2(b2)];
          for (var h = 2 & e && d; "object" == typeof h && !~a2.indexOf(h); h = b2(h)) Object.getOwnPropertyNames(h).forEach((a3) => g[a3] = () => d[a3]);
          return g.default = () => d, c.d(f, g), f;
        };
      })(), c.d = (a2, b2) => {
        for (var d in b2) c.o(b2, d) && !c.o(a2, d) && Object.defineProperty(a2, d, { enumerable: true, get: b2[d] });
      }, c.e = () => Promise.resolve(), c.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || Function("return this")();
        } catch (a2) {
          if ("object" == typeof window) return window;
        }
      }(), c.o = (a2, b2) => Object.prototype.hasOwnProperty.call(a2, b2), c.r = (a2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(a2, "__esModule", { value: true });
      }, (() => {
        var a2 = { 149: 0 };
        c.O.j = (b3) => 0 === a2[b3];
        var b2 = (b3, d2) => {
          var e, f, [g, h, i] = d2, j = 0;
          if (g.some((b4) => 0 !== a2[b4])) {
            for (e in h) c.o(h, e) && (c.m[e] = h[e]);
            if (i) var k = i(c);
          }
          for (b3 && b3(d2); j < g.length; j++) f = g[j], c.o(a2, f) && a2[f] && a2[f][0](), a2[f] = 0;
          return c.O(k);
        }, d = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        d.forEach(b2.bind(null, 0)), d.push = b2.bind(null, d.push.bind(d));
      })();
    })();
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/middleware.js
var require_middleware = __commonJS({
  ".next/server/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[751], { 20: (a) => {
      "use strict";
      a.exports = JSON.parse('{"Header":{"logoAlt":"Aca Jankovic"},"Hero":{"title":"Premium Slots Experience","subtitle":"Discover exclusive bonuses and tournaments"},"MiddleBar":{"getBonus":"Get Bonus","leaderboard":"Top Viewer List","tournaments":"Tournaments","social":"Social"},"FeaturedGames":{"title":"Featured Games","subtitle":"Experience premium casino gaming","viewAll":"View All Games","players":"Players","prize":"Prize Pool","hot":"HOT"},"Tournaments":{"title":"Featured Tournament","subtitle":"Join the ultimate gaming competition","players":"Players","buyIn":"Buy-in","winner":"Winner","tableType":"Table Type","endsIn":"Tournament ends in","days":"Days","hours":"Hrs","minutes":"Min","seconds":"Sec","joinTournament":"Join Tournament","ended":"Tournament Ended"},"Footer":{"joinCommunity":"Join Our Community","communitySubtitle":"Connect with fellow players and stay updated with the latest news","kick":"Kick","instagram":"Instagram","telegram":"Telegram","discord":"Discord","copyright":"All rights reserved","privacy":"Privacy Policy","terms":"Terms and Conditions","support":"Support","disclaimer":"Play responsibly. Must be 18+ to participate."},"Leaderboard":{"defaultTitle":"\u{1F3C6} Top Viewers Tournament","defaultSubtitle":"Most dedicated viewers of Aca Jankovic \u2022 Updated regularly","prizesTitle":"Tournament Prizes","leaderboardTitle":"Top 10 Leaderboard","error":"Error","errorMessage":"Failed to load leaderboard data. Please try again later.","noEntries":"No leaderboard entries yet. Check back soon!","howToWinTitle":"How to Win Prizes","howToWinText1":"Watch","howToWinText1Bold":"Aca Jankovic","howToWinText1Rest":"live on","howToWinText1Kick":"Kick","howToWinText1End":"to earn watch time","howToWinText2":"The","howToWinText2Bold":"Top 10 viewers","howToWinText2Rest":"with the most watch time will win exclusive prizes based on their rank","howToWinText3":"Keep watching to climb the leaderboard and win amazing rewards!","watchButton":"Watch Aca on Kick","exclusivePrizesTitle":"Exclusive Prizes","exclusivePrizesSubtitle":"Top 4 viewers will receive these amazing rewards","wantToSeeYourName":"Want to see your name here?"}}');
    }, 58: (a, b, c) => {
      "use strict";
      c.d(b, { xl: () => g });
      let d = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class e {
        disable() {
          throw d;
        }
        getStore() {
        }
        run() {
          throw d;
        }
        exit() {
          throw d;
        }
        enterWith() {
          throw d;
        }
        static bind(a2) {
          return a2;
        }
      }
      let f = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function g() {
        return f ? new f() : new e();
      }
    }, 66: (a, b, c) => {
      "use strict";
      c.d(b, { RM: () => f, s8: () => e });
      let d = new Set(Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 })), e = "NEXT_HTTP_ERROR_FALLBACK";
      function f(a2) {
        if ("object" != typeof a2 || null === a2 || !("digest" in a2) || "string" != typeof a2.digest) return false;
        let [b2, c2] = a2.digest.split(";");
        return b2 === e && d.has(Number(c2));
      }
    }, 107: (a, b, c) => {
      "use strict";
      c.d(b, { I3: () => k, Ui: () => i, xI: () => g, Pk: () => h });
      var d = c(814), e = c(159);
      c(979), c(128), c(379), c(770), c(340), c(809);
      let f = "function" == typeof d.unstable_postpone;
      function g(a2, b2, c2) {
        let d2 = Object.defineProperty(new e.F(`Route ${b2.route} couldn't be rendered statically because it used \`${a2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", { value: "E558", enumerable: false, configurable: true });
        throw c2.revalidate = 0, b2.dynamicUsageDescription = a2, b2.dynamicUsageStack = d2.stack, d2;
      }
      function h(a2) {
        switch (a2.type) {
          case "cache":
          case "unstable-cache":
          case "private-cache":
            return;
        }
      }
      function i(a2, b2, c2) {
        (function() {
          if (!f) throw Object.defineProperty(Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E224", enumerable: false, configurable: true });
        })(), c2 && c2.dynamicAccesses.push({ stack: c2.isDebugDynamicAccesses ? Error().stack : void 0, expression: b2 }), d.unstable_postpone(j(a2, b2));
      }
      function j(a2, b2) {
        return `Route ${a2} needs to bail out of prerendering at this point because it used ${b2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function k(a2) {
        return "object" == typeof a2 && null !== a2 && "string" == typeof a2.message && l(a2.message);
      }
      function l(a2) {
        return a2.includes("needs to bail out of prerendering at this point because it used") && a2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (false === l(j("%%%", "^^^"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)`), RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 128: (a, b, c) => {
      "use strict";
      c.d(b, { M1: () => e, FP: () => d });
      let d = (0, c(58).xl)();
      function e(a2) {
        throw Object.defineProperty(Error(`\`${a2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", { value: "E251", enumerable: false, configurable: true });
      }
    }, 134: (a, b, c) => {
      "use strict";
      let d;
      c.r(b), c.d(b, { default: () => cL });
      var e, f, g = {};
      async function h() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      c.r(g), c.d(g, { config: () => cH, default: () => cG });
      let i = null;
      async function j() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        i || (i = h());
        let a10 = await i;
        if (null == a10 ? void 0 : a10.register) try {
          await a10.register();
        } catch (a11) {
          throw a11.message = `An error occurred while loading instrumentation hook: ${a11.message}`, a11;
        }
      }
      async function k(...a10) {
        let b10 = await h();
        try {
          var c2;
          await (null == b10 || null == (c2 = b10.onRequestError) ? void 0 : c2.call(b10, ...a10));
        } catch (a11) {
          console.error("Error in instrumentation.onRequestError:", a11);
        }
      }
      let l = null;
      function m() {
        return l || (l = j()), l;
      }
      function n(a10) {
        return `The edge runtime does not support Node.js '${a10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== c.g.process && (process.env = c.g.process.env, c.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(a10) {
          let b10 = new Proxy(function() {
          }, { get(b11, c2) {
            if ("then" === c2) return {};
            throw Object.defineProperty(Error(n(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(n(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(c2, d2, e2) {
            if ("function" == typeof e2[0]) return e2[0](b10);
            throw Object.defineProperty(Error(n(a10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => b10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      m();
      class o extends Error {
        constructor({ page: a10 }) {
          super(`The middleware "${a10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class p extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class q extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let r = "_N_T_", s = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function t(a10) {
        var b10, c2, d2, e2, f2, g2 = [], h2 = 0;
        function i2() {
          for (; h2 < a10.length && /\s/.test(a10.charAt(h2)); ) h2 += 1;
          return h2 < a10.length;
        }
        for (; h2 < a10.length; ) {
          for (b10 = h2, f2 = false; i2(); ) if ("," === (c2 = a10.charAt(h2))) {
            for (d2 = h2, h2 += 1, i2(), e2 = h2; h2 < a10.length && "=" !== (c2 = a10.charAt(h2)) && ";" !== c2 && "," !== c2; ) h2 += 1;
            h2 < a10.length && "=" === a10.charAt(h2) ? (f2 = true, h2 = e2, g2.push(a10.substring(b10, d2)), b10 = h2) : h2 = d2 + 1;
          } else h2 += 1;
          (!f2 || h2 >= a10.length) && g2.push(a10.substring(b10, a10.length));
        }
        return g2;
      }
      function u(a10) {
        let b10 = {}, c2 = [];
        if (a10) for (let [d2, e2] of a10.entries()) "set-cookie" === d2.toLowerCase() ? (c2.push(...t(e2)), b10[d2] = 1 === c2.length ? c2[0] : c2) : b10[d2] = e2;
        return b10;
      }
      function v(a10) {
        try {
          return String(new URL(String(a10)));
        } catch (b10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(a10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: b10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...s, GROUP: { builtinReact: [s.reactServerComponents, s.actionBrowser], serverOnly: [s.reactServerComponents, s.actionBrowser, s.instrument, s.middleware], neutralTarget: [s.apiNode, s.apiEdge], clientOnly: [s.serverSideRendering, s.appPagesBrowser], bundled: [s.reactServerComponents, s.actionBrowser, s.serverSideRendering, s.appPagesBrowser, s.shared, s.instrument, s.middleware], appPages: [s.reactServerComponents, s.serverSideRendering, s.appPagesBrowser, s.actionBrowser] } });
      let w = Symbol("response"), x = Symbol("passThrough"), y = Symbol("waitUntil");
      class z {
        constructor(a10, b10) {
          this[x] = false, this[y] = b10 ? { kind: "external", function: b10 } : { kind: "internal", promises: [] };
        }
        respondWith(a10) {
          this[w] || (this[w] = Promise.resolve(a10));
        }
        passThroughOnException() {
          this[x] = true;
        }
        waitUntil(a10) {
          if ("external" === this[y].kind) return (0, this[y].function)(a10);
          this[y].promises.push(a10);
        }
      }
      class A extends z {
        constructor(a10) {
          var b10;
          super(a10.request, null == (b10 = a10.context) ? void 0 : b10.waitUntil), this.sourcePage = a10.page;
        }
        get request() {
          throw Object.defineProperty(new o({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new o({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function B(a10) {
        return a10.replace(/\/$/, "") || "/";
      }
      function C(a10) {
        let b10 = a10.indexOf("#"), c2 = a10.indexOf("?"), d2 = c2 > -1 && (b10 < 0 || c2 < b10);
        return d2 || b10 > -1 ? { pathname: a10.substring(0, d2 ? c2 : b10), query: d2 ? a10.substring(c2, b10 > -1 ? b10 : void 0) : "", hash: b10 > -1 ? a10.slice(b10) : "" } : { pathname: a10, query: "", hash: "" };
      }
      function D(a10, b10) {
        if (!a10.startsWith("/") || !b10) return a10;
        let { pathname: c2, query: d2, hash: e2 } = C(a10);
        return "" + b10 + c2 + d2 + e2;
      }
      function E(a10, b10) {
        if (!a10.startsWith("/") || !b10) return a10;
        let { pathname: c2, query: d2, hash: e2 } = C(a10);
        return "" + c2 + b10 + d2 + e2;
      }
      function F(a10, b10) {
        if ("string" != typeof a10) return false;
        let { pathname: c2 } = C(a10);
        return c2 === b10 || c2.startsWith(b10 + "/");
      }
      let G = /* @__PURE__ */ new WeakMap();
      function H(a10, b10) {
        let c2;
        if (!b10) return { pathname: a10 };
        let d2 = G.get(b10);
        d2 || (d2 = b10.map((a11) => a11.toLowerCase()), G.set(b10, d2));
        let e2 = a10.split("/", 2);
        if (!e2[1]) return { pathname: a10 };
        let f2 = e2[1].toLowerCase(), g2 = d2.indexOf(f2);
        return g2 < 0 ? { pathname: a10 } : (c2 = b10[g2], { pathname: a10 = a10.slice(c2.length + 1) || "/", detectedLocale: c2 });
      }
      let I = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function J(a10, b10) {
        return new URL(String(a10).replace(I, "localhost"), b10 && String(b10).replace(I, "localhost"));
      }
      let K = Symbol("NextURLInternal");
      class L {
        constructor(a10, b10, c2) {
          let d2, e2;
          "object" == typeof b10 && "pathname" in b10 || "string" == typeof b10 ? (d2 = b10, e2 = c2 || {}) : e2 = c2 || b10 || {}, this[K] = { url: J(a10, d2 ?? e2.base), options: e2, basePath: "" }, this.analyze();
        }
        analyze() {
          var a10, b10, c2, d2, e2;
          let f2 = function(a11, b11) {
            var c3, d3;
            let { basePath: e3, i18n: f3, trailingSlash: g3 } = null != (c3 = b11.nextConfig) ? c3 : {}, h3 = { pathname: a11, trailingSlash: "/" !== a11 ? a11.endsWith("/") : g3 };
            e3 && F(h3.pathname, e3) && (h3.pathname = function(a12, b12) {
              if (!F(a12, b12)) return a12;
              let c4 = a12.slice(b12.length);
              return c4.startsWith("/") ? c4 : "/" + c4;
            }(h3.pathname, e3), h3.basePath = e3);
            let i2 = h3.pathname;
            if (h3.pathname.startsWith("/_next/data/") && h3.pathname.endsWith(".json")) {
              let a12 = h3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              h3.buildId = a12[0], i2 = "index" !== a12[1] ? "/" + a12.slice(1).join("/") : "/", true === b11.parseData && (h3.pathname = i2);
            }
            if (f3) {
              let a12 = b11.i18nProvider ? b11.i18nProvider.analyze(h3.pathname) : H(h3.pathname, f3.locales);
              h3.locale = a12.detectedLocale, h3.pathname = null != (d3 = a12.pathname) ? d3 : h3.pathname, !a12.detectedLocale && h3.buildId && (a12 = b11.i18nProvider ? b11.i18nProvider.analyze(i2) : H(i2, f3.locales)).detectedLocale && (h3.locale = a12.detectedLocale);
            }
            return h3;
          }(this[K].url.pathname, { nextConfig: this[K].options.nextConfig, parseData: true, i18nProvider: this[K].options.i18nProvider }), g2 = function(a11, b11) {
            let c3;
            if ((null == b11 ? void 0 : b11.host) && !Array.isArray(b11.host)) c3 = b11.host.toString().split(":", 1)[0];
            else {
              if (!a11.hostname) return;
              c3 = a11.hostname;
            }
            return c3.toLowerCase();
          }(this[K].url, this[K].options.headers);
          this[K].domainLocale = this[K].options.i18nProvider ? this[K].options.i18nProvider.detectDomainLocale(g2) : function(a11, b11, c3) {
            if (a11) for (let f3 of (c3 && (c3 = c3.toLowerCase()), a11)) {
              var d3, e3;
              if (b11 === (null == (d3 = f3.domain) ? void 0 : d3.split(":", 1)[0].toLowerCase()) || c3 === f3.defaultLocale.toLowerCase() || (null == (e3 = f3.locales) ? void 0 : e3.some((a12) => a12.toLowerCase() === c3))) return f3;
            }
          }(null == (b10 = this[K].options.nextConfig) || null == (a10 = b10.i18n) ? void 0 : a10.domains, g2);
          let h2 = (null == (c2 = this[K].domainLocale) ? void 0 : c2.defaultLocale) || (null == (e2 = this[K].options.nextConfig) || null == (d2 = e2.i18n) ? void 0 : d2.defaultLocale);
          this[K].url.pathname = f2.pathname, this[K].defaultLocale = h2, this[K].basePath = f2.basePath ?? "", this[K].buildId = f2.buildId, this[K].locale = f2.locale ?? h2, this[K].trailingSlash = f2.trailingSlash;
        }
        formatPathname() {
          var a10;
          let b10;
          return b10 = function(a11, b11, c2, d2) {
            if (!b11 || b11 === c2) return a11;
            let e2 = a11.toLowerCase();
            return !d2 && (F(e2, "/api") || F(e2, "/" + b11.toLowerCase())) ? a11 : D(a11, "/" + b11);
          }((a10 = { basePath: this[K].basePath, buildId: this[K].buildId, defaultLocale: this[K].options.forceLocale ? void 0 : this[K].defaultLocale, locale: this[K].locale, pathname: this[K].url.pathname, trailingSlash: this[K].trailingSlash }).pathname, a10.locale, a10.buildId ? void 0 : a10.defaultLocale, a10.ignorePrefix), (a10.buildId || !a10.trailingSlash) && (b10 = B(b10)), a10.buildId && (b10 = E(D(b10, "/_next/data/" + a10.buildId), "/" === a10.pathname ? "index.json" : ".json")), b10 = D(b10, a10.basePath), !a10.buildId && a10.trailingSlash ? b10.endsWith("/") ? b10 : E(b10, "/") : B(b10);
        }
        formatSearch() {
          return this[K].url.search;
        }
        get buildId() {
          return this[K].buildId;
        }
        set buildId(a10) {
          this[K].buildId = a10;
        }
        get locale() {
          return this[K].locale ?? "";
        }
        set locale(a10) {
          var b10, c2;
          if (!this[K].locale || !(null == (c2 = this[K].options.nextConfig) || null == (b10 = c2.i18n) ? void 0 : b10.locales.includes(a10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${a10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[K].locale = a10;
        }
        get defaultLocale() {
          return this[K].defaultLocale;
        }
        get domainLocale() {
          return this[K].domainLocale;
        }
        get searchParams() {
          return this[K].url.searchParams;
        }
        get host() {
          return this[K].url.host;
        }
        set host(a10) {
          this[K].url.host = a10;
        }
        get hostname() {
          return this[K].url.hostname;
        }
        set hostname(a10) {
          this[K].url.hostname = a10;
        }
        get port() {
          return this[K].url.port;
        }
        set port(a10) {
          this[K].url.port = a10;
        }
        get protocol() {
          return this[K].url.protocol;
        }
        set protocol(a10) {
          this[K].url.protocol = a10;
        }
        get href() {
          let a10 = this.formatPathname(), b10 = this.formatSearch();
          return `${this.protocol}//${this.host}${a10}${b10}${this.hash}`;
        }
        set href(a10) {
          this[K].url = J(a10), this.analyze();
        }
        get origin() {
          return this[K].url.origin;
        }
        get pathname() {
          return this[K].url.pathname;
        }
        set pathname(a10) {
          this[K].url.pathname = a10;
        }
        get hash() {
          return this[K].url.hash;
        }
        set hash(a10) {
          this[K].url.hash = a10;
        }
        get search() {
          return this[K].url.search;
        }
        set search(a10) {
          this[K].url.search = a10;
        }
        get password() {
          return this[K].url.password;
        }
        set password(a10) {
          this[K].url.password = a10;
        }
        get username() {
          return this[K].url.username;
        }
        set username(a10) {
          this[K].url.username = a10;
        }
        get basePath() {
          return this[K].basePath;
        }
        set basePath(a10) {
          this[K].basePath = a10.startsWith("/") ? a10 : `/${a10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new L(String(this), this[K].options);
        }
      }
      var M = c(443);
      let N = Symbol("internal request");
      class O extends Request {
        constructor(a10, b10 = {}) {
          let c2 = "string" != typeof a10 && "url" in a10 ? a10.url : String(a10);
          v(c2), a10 instanceof Request ? super(a10, b10) : super(c2, b10);
          let d2 = new L(c2, { headers: u(this.headers), nextConfig: b10.nextConfig });
          this[N] = { cookies: new M.RequestCookies(this.headers), nextUrl: d2, url: d2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[N].cookies;
        }
        get nextUrl() {
          return this[N].nextUrl;
        }
        get page() {
          throw new p();
        }
        get ua() {
          throw new q();
        }
        get url() {
          return this[N].url;
        }
      }
      class P {
        static get(a10, b10, c2) {
          let d2 = Reflect.get(a10, b10, c2);
          return "function" == typeof d2 ? d2.bind(a10) : d2;
        }
        static set(a10, b10, c2, d2) {
          return Reflect.set(a10, b10, c2, d2);
        }
        static has(a10, b10) {
          return Reflect.has(a10, b10);
        }
        static deleteProperty(a10, b10) {
          return Reflect.deleteProperty(a10, b10);
        }
      }
      let Q = Symbol("internal response"), R = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function S(a10, b10) {
        var c2;
        if (null == a10 || null == (c2 = a10.request) ? void 0 : c2.headers) {
          if (!(a10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let c3 = [];
          for (let [d2, e2] of a10.request.headers) b10.set("x-middleware-request-" + d2, e2), c3.push(d2);
          b10.set("x-middleware-override-headers", c3.join(","));
        }
      }
      class T extends Response {
        constructor(a10, b10 = {}) {
          super(a10, b10);
          let c2 = this.headers, d2 = new Proxy(new M.ResponseCookies(c2), { get(a11, d3, e2) {
            switch (d3) {
              case "delete":
              case "set":
                return (...e3) => {
                  let f2 = Reflect.apply(a11[d3], a11, e3), g2 = new Headers(c2);
                  return f2 instanceof M.ResponseCookies && c2.set("x-middleware-set-cookie", f2.getAll().map((a12) => (0, M.stringifyCookie)(a12)).join(",")), S(b10, g2), f2;
                };
              default:
                return P.get(a11, d3, e2);
            }
          } });
          this[Q] = { cookies: d2, url: b10.url ? new L(b10.url, { headers: u(c2), nextConfig: b10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[Q].cookies;
        }
        static json(a10, b10) {
          let c2 = Response.json(a10, b10);
          return new T(c2.body, c2);
        }
        static redirect(a10, b10) {
          let c2 = "number" == typeof b10 ? b10 : (null == b10 ? void 0 : b10.status) ?? 307;
          if (!R.has(c2)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let d2 = "object" == typeof b10 ? b10 : {}, e2 = new Headers(null == d2 ? void 0 : d2.headers);
          return e2.set("Location", v(a10)), new T(null, { ...d2, headers: e2, status: c2 });
        }
        static rewrite(a10, b10) {
          let c2 = new Headers(null == b10 ? void 0 : b10.headers);
          return c2.set("x-middleware-rewrite", v(a10)), S(b10, c2), new T(null, { ...b10, headers: c2 });
        }
        static next(a10) {
          let b10 = new Headers(null == a10 ? void 0 : a10.headers);
          return b10.set("x-middleware-next", "1"), S(a10, b10), new T(null, { ...a10, headers: b10 });
        }
      }
      function U(a10, b10) {
        let c2 = "string" == typeof b10 ? new URL(b10) : b10, d2 = new URL(a10, b10), e2 = d2.origin === c2.origin;
        return { url: e2 ? d2.toString().slice(c2.origin.length) : d2.toString(), isRelative: e2 };
      }
      let V = "next-router-prefetch", W = ["rsc", "next-router-state-tree", V, "next-hmr-refresh", "next-router-segment-prefetch"], X = "_rsc";
      class Y extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new Y();
        }
      }
      class Z extends Headers {
        constructor(a10) {
          super(), this.headers = new Proxy(a10, { get(b10, c2, d2) {
            if ("symbol" == typeof c2) return P.get(b10, c2, d2);
            let e2 = c2.toLowerCase(), f2 = Object.keys(a10).find((a11) => a11.toLowerCase() === e2);
            if (void 0 !== f2) return P.get(b10, f2, d2);
          }, set(b10, c2, d2, e2) {
            if ("symbol" == typeof c2) return P.set(b10, c2, d2, e2);
            let f2 = c2.toLowerCase(), g2 = Object.keys(a10).find((a11) => a11.toLowerCase() === f2);
            return P.set(b10, g2 ?? c2, d2, e2);
          }, has(b10, c2) {
            if ("symbol" == typeof c2) return P.has(b10, c2);
            let d2 = c2.toLowerCase(), e2 = Object.keys(a10).find((a11) => a11.toLowerCase() === d2);
            return void 0 !== e2 && P.has(b10, e2);
          }, deleteProperty(b10, c2) {
            if ("symbol" == typeof c2) return P.deleteProperty(b10, c2);
            let d2 = c2.toLowerCase(), e2 = Object.keys(a10).find((a11) => a11.toLowerCase() === d2);
            return void 0 === e2 || P.deleteProperty(b10, e2);
          } });
        }
        static seal(a10) {
          return new Proxy(a10, { get(a11, b10, c2) {
            switch (b10) {
              case "append":
              case "delete":
              case "set":
                return Y.callable;
              default:
                return P.get(a11, b10, c2);
            }
          } });
        }
        merge(a10) {
          return Array.isArray(a10) ? a10.join(", ") : a10;
        }
        static from(a10) {
          return a10 instanceof Headers ? a10 : new Z(a10);
        }
        append(a10, b10) {
          let c2 = this.headers[a10];
          "string" == typeof c2 ? this.headers[a10] = [c2, b10] : Array.isArray(c2) ? c2.push(b10) : this.headers[a10] = b10;
        }
        delete(a10) {
          delete this.headers[a10];
        }
        get(a10) {
          let b10 = this.headers[a10];
          return void 0 !== b10 ? this.merge(b10) : null;
        }
        has(a10) {
          return void 0 !== this.headers[a10];
        }
        set(a10, b10) {
          this.headers[a10] = b10;
        }
        forEach(a10, b10) {
          for (let [c2, d2] of this.entries()) a10.call(b10, d2, c2, this);
        }
        *entries() {
          for (let a10 of Object.keys(this.headers)) {
            let b10 = a10.toLowerCase(), c2 = this.get(b10);
            yield [b10, c2];
          }
        }
        *keys() {
          for (let a10 of Object.keys(this.headers)) {
            let b10 = a10.toLowerCase();
            yield b10;
          }
        }
        *values() {
          for (let a10 of Object.keys(this.headers)) {
            let b10 = this.get(a10);
            yield b10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var $ = c(379);
      class _ extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new _();
        }
      }
      class aa {
        static seal(a10) {
          return new Proxy(a10, { get(a11, b10, c2) {
            switch (b10) {
              case "clear":
              case "delete":
              case "set":
                return _.callable;
              default:
                return P.get(a11, b10, c2);
            }
          } });
        }
      }
      let ab = Symbol.for("next.mutated.cookies");
      class ac {
        static wrap(a10, b10) {
          let c2 = new M.ResponseCookies(new Headers());
          for (let b11 of a10.getAll()) c2.set(b11);
          let d2 = [], e2 = /* @__PURE__ */ new Set(), f2 = () => {
            let a11 = $.J.getStore();
            if (a11 && (a11.pathWasRevalidated = true), d2 = c2.getAll().filter((a12) => e2.has(a12.name)), b10) {
              let a12 = [];
              for (let b11 of d2) {
                let c3 = new M.ResponseCookies(new Headers());
                c3.set(b11), a12.push(c3.toString());
              }
              b10(a12);
            }
          }, g2 = new Proxy(c2, { get(a11, b11, c3) {
            switch (b11) {
              case ab:
                return d2;
              case "delete":
                return function(...b12) {
                  e2.add("string" == typeof b12[0] ? b12[0] : b12[0].name);
                  try {
                    return a11.delete(...b12), g2;
                  } finally {
                    f2();
                  }
                };
              case "set":
                return function(...b12) {
                  e2.add("string" == typeof b12[0] ? b12[0] : b12[0].name);
                  try {
                    return a11.set(...b12), g2;
                  } finally {
                    f2();
                  }
                };
              default:
                return P.get(a11, b11, c3);
            }
          } });
          return g2;
        }
      }
      function ad(a10, b10) {
        if ("action" !== a10.phase) throw new _();
      }
      var ae = function(a10) {
        return a10.handleRequest = "BaseServer.handleRequest", a10.run = "BaseServer.run", a10.pipe = "BaseServer.pipe", a10.getStaticHTML = "BaseServer.getStaticHTML", a10.render = "BaseServer.render", a10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", a10.renderToResponse = "BaseServer.renderToResponse", a10.renderToHTML = "BaseServer.renderToHTML", a10.renderError = "BaseServer.renderError", a10.renderErrorToResponse = "BaseServer.renderErrorToResponse", a10.renderErrorToHTML = "BaseServer.renderErrorToHTML", a10.render404 = "BaseServer.render404", a10;
      }(ae || {}), af = function(a10) {
        return a10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", a10.loadComponents = "LoadComponents.loadComponents", a10;
      }(af || {}), ag = function(a10) {
        return a10.getRequestHandler = "NextServer.getRequestHandler", a10.getServer = "NextServer.getServer", a10.getServerRequestHandler = "NextServer.getServerRequestHandler", a10.createServer = "createServer.createServer", a10;
      }(ag || {}), ah = function(a10) {
        return a10.compression = "NextNodeServer.compression", a10.getBuildId = "NextNodeServer.getBuildId", a10.createComponentTree = "NextNodeServer.createComponentTree", a10.clientComponentLoading = "NextNodeServer.clientComponentLoading", a10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", a10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", a10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", a10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", a10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", a10.sendRenderResult = "NextNodeServer.sendRenderResult", a10.proxyRequest = "NextNodeServer.proxyRequest", a10.runApi = "NextNodeServer.runApi", a10.render = "NextNodeServer.render", a10.renderHTML = "NextNodeServer.renderHTML", a10.imageOptimizer = "NextNodeServer.imageOptimizer", a10.getPagePath = "NextNodeServer.getPagePath", a10.getRoutesManifest = "NextNodeServer.getRoutesManifest", a10.findPageComponents = "NextNodeServer.findPageComponents", a10.getFontManifest = "NextNodeServer.getFontManifest", a10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", a10.getRequestHandler = "NextNodeServer.getRequestHandler", a10.renderToHTML = "NextNodeServer.renderToHTML", a10.renderError = "NextNodeServer.renderError", a10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", a10.render404 = "NextNodeServer.render404", a10.startResponse = "NextNodeServer.startResponse", a10.route = "route", a10.onProxyReq = "onProxyReq", a10.apiResolver = "apiResolver", a10.internalFetch = "internalFetch", a10;
      }(ah || {}), ai = function(a10) {
        return a10.startServer = "startServer.startServer", a10;
      }(ai || {}), aj = function(a10) {
        return a10.getServerSideProps = "Render.getServerSideProps", a10.getStaticProps = "Render.getStaticProps", a10.renderToString = "Render.renderToString", a10.renderDocument = "Render.renderDocument", a10.createBodyResult = "Render.createBodyResult", a10;
      }(aj || {}), ak = function(a10) {
        return a10.renderToString = "AppRender.renderToString", a10.renderToReadableStream = "AppRender.renderToReadableStream", a10.getBodyResult = "AppRender.getBodyResult", a10.fetch = "AppRender.fetch", a10;
      }(ak || {}), al = function(a10) {
        return a10.executeRoute = "Router.executeRoute", a10;
      }(al || {}), am = function(a10) {
        return a10.runHandler = "Node.runHandler", a10;
      }(am || {}), an = function(a10) {
        return a10.runHandler = "AppRouteRouteHandlers.runHandler", a10;
      }(an || {}), ao = function(a10) {
        return a10.generateMetadata = "ResolveMetadata.generateMetadata", a10.generateViewport = "ResolveMetadata.generateViewport", a10;
      }(ao || {}), ap = function(a10) {
        return a10.execute = "Middleware.execute", a10;
      }(ap || {});
      let aq = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], ar = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function as(a10) {
        return null !== a10 && "object" == typeof a10 && "then" in a10 && "function" == typeof a10.then;
      }
      let { context: at, propagation: au, trace: av, SpanStatusCode: aw, SpanKind: ax, ROOT_CONTEXT: ay } = d = c(817);
      class az extends Error {
        constructor(a10, b10) {
          super(), this.bubble = a10, this.result = b10;
        }
      }
      let aA = (a10, b10) => {
        (function(a11) {
          return "object" == typeof a11 && null !== a11 && a11 instanceof az;
        })(b10) && b10.bubble ? a10.setAttribute("next.bubble", true) : (b10 && (a10.recordException(b10), a10.setAttribute("error.type", b10.name)), a10.setStatus({ code: aw.ERROR, message: null == b10 ? void 0 : b10.message })), a10.end();
      }, aB = /* @__PURE__ */ new Map(), aC = d.createContextKey("next.rootSpanId"), aD = 0, aE = { set(a10, b10, c2) {
        a10.push({ key: b10, value: c2 });
      } };
      class aF {
        getTracerInstance() {
          return av.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return at;
        }
        getTracePropagationData() {
          let a10 = at.active(), b10 = [];
          return au.inject(a10, b10, aE), b10;
        }
        getActiveScopeSpan() {
          return av.getSpan(null == at ? void 0 : at.active());
        }
        withPropagatedContext(a10, b10, c2) {
          let d2 = at.active();
          if (av.getSpanContext(d2)) return b10();
          let e2 = au.extract(d2, a10, c2);
          return at.with(e2, b10);
        }
        trace(...a10) {
          var b10;
          let [c2, d2, e2] = a10, { fn: f2, options: g2 } = "function" == typeof d2 ? { fn: d2, options: {} } : { fn: e2, options: { ...d2 } }, h2 = g2.spanName ?? c2;
          if (!aq.includes(c2) && "1" !== process.env.NEXT_OTEL_VERBOSE || g2.hideSpan) return f2();
          let i2 = this.getSpanContext((null == g2 ? void 0 : g2.parentSpan) ?? this.getActiveScopeSpan()), j2 = false;
          i2 ? (null == (b10 = av.getSpanContext(i2)) ? void 0 : b10.isRemote) && (j2 = true) : (i2 = (null == at ? void 0 : at.active()) ?? ay, j2 = true);
          let k2 = aD++;
          return g2.attributes = { "next.span_name": h2, "next.span_type": c2, ...g2.attributes }, at.with(i2.setValue(aC, k2), () => this.getTracerInstance().startActiveSpan(h2, g2, (a11) => {
            let b11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, d3 = () => {
              aB.delete(k2), b11 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && ar.includes(c2 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(c2.split(".").pop() || "").replace(/[A-Z]/g, (a12) => "-" + a12.toLowerCase())}`, { start: b11, end: performance.now() });
            };
            j2 && aB.set(k2, new Map(Object.entries(g2.attributes ?? {})));
            try {
              if (f2.length > 1) return f2(a11, (b13) => aA(a11, b13));
              let b12 = f2(a11);
              if (as(b12)) return b12.then((b13) => (a11.end(), b13)).catch((b13) => {
                throw aA(a11, b13), b13;
              }).finally(d3);
              return a11.end(), d3(), b12;
            } catch (b12) {
              throw aA(a11, b12), d3(), b12;
            }
          }));
        }
        wrap(...a10) {
          let b10 = this, [c2, d2, e2] = 3 === a10.length ? a10 : [a10[0], {}, a10[1]];
          return aq.includes(c2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let a11 = d2;
            "function" == typeof a11 && "function" == typeof e2 && (a11 = a11.apply(this, arguments));
            let f2 = arguments.length - 1, g2 = arguments[f2];
            if ("function" != typeof g2) return b10.trace(c2, a11, () => e2.apply(this, arguments));
            {
              let d3 = b10.getContext().bind(at.active(), g2);
              return b10.trace(c2, a11, (a12, b11) => (arguments[f2] = function(a13) {
                return null == b11 || b11(a13), d3.apply(this, arguments);
              }, e2.apply(this, arguments)));
            }
          } : e2;
        }
        startSpan(...a10) {
          let [b10, c2] = a10, d2 = this.getSpanContext((null == c2 ? void 0 : c2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(b10, c2, d2);
        }
        getSpanContext(a10) {
          return a10 ? av.setSpan(at.active(), a10) : void 0;
        }
        getRootSpanAttributes() {
          let a10 = at.active().getValue(aC);
          return aB.get(a10);
        }
        setRootSpanAttribute(a10, b10) {
          let c2 = at.active().getValue(aC), d2 = aB.get(c2);
          d2 && d2.set(a10, b10);
        }
      }
      let aG = (() => {
        let a10 = new aF();
        return () => a10;
      })(), aH = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(aH);
      class aI {
        constructor(a10, b10, c2, d2) {
          var e2;
          let f2 = a10 && function(a11, b11) {
            let c3 = Z.from(a11.headers);
            return { isOnDemandRevalidate: c3.get("x-prerender-revalidate") === b11.previewModeId, revalidateOnlyGenerated: c3.has("x-prerender-revalidate-if-generated") };
          }(b10, a10).isOnDemandRevalidate, g2 = null == (e2 = c2.get(aH)) ? void 0 : e2.value;
          this._isEnabled = !!(!f2 && g2 && a10 && g2 === a10.previewModeId), this._previewModeId = null == a10 ? void 0 : a10.previewModeId, this._mutableCookies = d2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: aH, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: aH, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function aJ(a10, b10) {
        if ("x-middleware-set-cookie" in a10.headers && "string" == typeof a10.headers["x-middleware-set-cookie"]) {
          let c2 = a10.headers["x-middleware-set-cookie"], d2 = new Headers();
          for (let a11 of t(c2)) d2.append("set-cookie", a11);
          for (let a11 of new M.ResponseCookies(d2).getAll()) b10.set(a11);
        }
      }
      var aK = c(128), aL = c(213), aM = c.n(aL), aN = c(809);
      class aO {
        constructor(a10, b10, c2) {
          this.prev = null, this.next = null, this.key = a10, this.data = b10, this.size = c2;
        }
      }
      class aP {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class aQ {
        constructor(a10, b10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = a10, this.calculateSize = b10, this.head = new aP(), this.tail = new aP(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(a10) {
          a10.prev = this.head, a10.next = this.head.next, this.head.next.prev = a10, this.head.next = a10;
        }
        removeNode(a10) {
          a10.prev.next = a10.next, a10.next.prev = a10.prev;
        }
        moveToHead(a10) {
          this.removeNode(a10), this.addToHead(a10);
        }
        removeTail() {
          let a10 = this.tail.prev;
          return this.removeNode(a10), a10;
        }
        set(a10, b10) {
          let c2 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, b10)) ?? 1;
          if (c2 > this.maxSize) return void console.warn("Single item size exceeds maxSize");
          let d2 = this.cache.get(a10);
          if (d2) d2.data = b10, this.totalSize = this.totalSize - d2.size + c2, d2.size = c2, this.moveToHead(d2);
          else {
            let d3 = new aO(a10, b10, c2);
            this.cache.set(a10, d3), this.addToHead(d3), this.totalSize += c2;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let a11 = this.removeTail();
            this.cache.delete(a11.key), this.totalSize -= a11.size;
          }
        }
        has(a10) {
          return this.cache.has(a10);
        }
        get(a10) {
          let b10 = this.cache.get(a10);
          if (b10) return this.moveToHead(b10), b10.data;
        }
        *[Symbol.iterator]() {
          let a10 = this.head.next;
          for (; a10 && a10 !== this.tail; ) {
            let b10 = a10;
            yield [b10.key, b10.data], a10 = a10.next;
          }
        }
        remove(a10) {
          let b10 = this.cache.get(a10);
          b10 && (this.removeNode(b10), this.cache.delete(a10), this.totalSize -= b10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      c(356).Buffer, new aQ(52428800, (a10) => a10.size), process.env.NEXT_PRIVATE_DEBUG_CACHE && console.debug.bind(console, "DefaultCacheHandler:"), process.env.NEXT_PRIVATE_DEBUG_CACHE && ((a10, ...b10) => {
        console.log(`use-cache: ${a10}`, ...b10);
      }), Symbol.for("@next/cache-handlers");
      let aR = Symbol.for("@next/cache-handlers-map"), aS = Symbol.for("@next/cache-handlers-set"), aT = globalThis;
      function aU() {
        if (aT[aR]) return aT[aR].entries();
      }
      async function aV(a10, b10) {
        if (!a10) return b10();
        let c2 = aW(a10);
        try {
          return await b10();
        } finally {
          let b11 = function(a11, b12) {
            let c3 = new Set(a11.pendingRevalidatedTags), d2 = new Set(a11.pendingRevalidateWrites);
            return { pendingRevalidatedTags: b12.pendingRevalidatedTags.filter((a12) => !c3.has(a12)), pendingRevalidates: Object.fromEntries(Object.entries(b12.pendingRevalidates).filter(([b13]) => !(b13 in a11.pendingRevalidates))), pendingRevalidateWrites: b12.pendingRevalidateWrites.filter((a12) => !d2.has(a12)) };
          }(c2, aW(a10));
          await aY(a10, b11);
        }
      }
      function aW(a10) {
        return { pendingRevalidatedTags: a10.pendingRevalidatedTags ? [...a10.pendingRevalidatedTags] : [], pendingRevalidates: { ...a10.pendingRevalidates }, pendingRevalidateWrites: a10.pendingRevalidateWrites ? [...a10.pendingRevalidateWrites] : [] };
      }
      async function aX(a10, b10) {
        if (0 === a10.length) return;
        let c2 = [];
        b10 && c2.push(b10.revalidateTag(a10));
        let d2 = function() {
          if (aT[aS]) return aT[aS].values();
        }();
        if (d2) for (let b11 of d2) c2.push(b11.expireTags(...a10));
        await Promise.all(c2);
      }
      async function aY(a10, b10) {
        let c2 = (null == b10 ? void 0 : b10.pendingRevalidatedTags) ?? a10.pendingRevalidatedTags ?? [], d2 = (null == b10 ? void 0 : b10.pendingRevalidates) ?? a10.pendingRevalidates ?? {}, e2 = (null == b10 ? void 0 : b10.pendingRevalidateWrites) ?? a10.pendingRevalidateWrites ?? [];
        return Promise.all([aX(c2, a10.incrementalCache), ...Object.values(d2), ...e2]);
      }
      let aZ = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class a$ {
        disable() {
          throw aZ;
        }
        getStore() {
        }
        run() {
          throw aZ;
        }
        exit() {
          throw aZ;
        }
        enterWith() {
          throw aZ;
        }
        static bind(a10) {
          return a10;
        }
      }
      let a_ = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage, a0 = a_ ? new a_() : new a$();
      class a1 {
        constructor({ waitUntil: a10, onClose: b10, onTaskError: c2 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = a10, this.onClose = b10, this.onTaskError = c2, this.callbackQueue = new (aM())(), this.callbackQueue.pause();
        }
        after(a10) {
          if (as(a10)) this.waitUntil || a2(), this.waitUntil(a10.catch((a11) => this.reportTaskError("promise", a11)));
          else if ("function" == typeof a10) this.addCallback(a10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(a10) {
          var b10;
          this.waitUntil || a2();
          let c2 = aK.FP.getStore();
          c2 && this.workUnitStores.add(c2);
          let d2 = a0.getStore(), e2 = d2 ? d2.rootTaskSpawnPhase : null == c2 ? void 0 : c2.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let f2 = (b10 = async () => {
            try {
              await a0.run({ rootTaskSpawnPhase: e2 }, () => a10());
            } catch (a11) {
              this.reportTaskError("function", a11);
            }
          }, a_ ? a_.bind(b10) : a$.bind(b10));
          this.callbackQueue.add(f2);
        }
        async runCallbacksOnClose() {
          return await new Promise((a10) => this.onClose(a10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let a11 of this.workUnitStores) a11.phase = "after";
          let a10 = $.J.getStore();
          if (!a10) throw Object.defineProperty(new aN.z("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return aV(a10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(a10, b10) {
          if (console.error("promise" === a10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", b10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, b10);
          } catch (a11) {
            console.error(Object.defineProperty(new aN.z("`onTaskError` threw while handling an error thrown from an `after` task", { cause: a11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function a2() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function a3(a10) {
        let b10, c2 = { then: (d2, e2) => (b10 || (b10 = a10()), b10.then((a11) => {
          c2.value = a11;
        }).catch(() => {
        }), b10.then(d2, e2)) };
        return c2;
      }
      class a4 {
        onClose(a10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", a10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function a5() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let a6 = Symbol.for("@next/request-context");
      async function a7(a10, b10, c2) {
        let d2 = [], e2 = c2 && c2.size > 0;
        for (let b11 of ((a11) => {
          let b12 = ["/layout"];
          if (a11.startsWith("/")) {
            let c3 = a11.split("/");
            for (let a12 = 1; a12 < c3.length + 1; a12++) {
              let d3 = c3.slice(0, a12).join("/");
              d3 && (d3.endsWith("/page") || d3.endsWith("/route") || (d3 = `${d3}${!d3.endsWith("/") ? "/" : ""}layout`), b12.push(d3));
            }
          }
          return b12;
        })(a10)) b11 = `${r}${b11}`, d2.push(b11);
        if (b10.pathname && !e2) {
          let a11 = `${r}${b10.pathname}`;
          d2.push(a11);
        }
        return { tags: d2, expirationsByCacheKind: function(a11) {
          let b11 = /* @__PURE__ */ new Map(), c3 = aU();
          if (c3) for (let [d3, e3] of c3) "getExpiration" in e3 && b11.set(d3, a3(async () => e3.getExpiration(...a11)));
          return b11;
        }(d2) };
      }
      class a8 extends O {
        constructor(a10) {
          super(a10.input, a10.init), this.sourcePage = a10.page;
        }
        get request() {
          throw Object.defineProperty(new o({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new o({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new o({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let a9 = { keys: (a10) => Array.from(a10.keys()), get: (a10, b10) => a10.get(b10) ?? void 0 }, ba = (a10, b10) => aG().withPropagatedContext(a10.headers, b10, a9), bb = false;
      async function bc(a10) {
        var b10;
        let d2, e2;
        if (!bb && (bb = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
          let { interceptTestApis: a11, wrapRequestHandler: b11 } = c(720);
          a11(), ba = b11(ba);
        }
        await m();
        let f2 = void 0 !== globalThis.__BUILD_MANIFEST;
        a10.request.url = a10.request.url.replace(/\.rsc($|\?)/, "$1");
        let g2 = a10.bypassNextUrl ? new URL(a10.request.url) : new L(a10.request.url, { headers: a10.request.headers, nextConfig: a10.request.nextConfig });
        for (let a11 of [...g2.searchParams.keys()]) {
          let b11 = g2.searchParams.getAll(a11), c2 = function(a12) {
            for (let b12 of ["nxtP", "nxtI"]) if (a12 !== b12 && a12.startsWith(b12)) return a12.substring(b12.length);
            return null;
          }(a11);
          if (c2) {
            for (let a12 of (g2.searchParams.delete(c2), b11)) g2.searchParams.append(c2, a12);
            g2.searchParams.delete(a11);
          }
        }
        let h2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in g2 && (h2 = g2.buildId || "", g2.buildId = "");
        let i2 = function(a11) {
          let b11 = new Headers();
          for (let [c2, d3] of Object.entries(a11)) for (let a12 of Array.isArray(d3) ? d3 : [d3]) void 0 !== a12 && ("number" == typeof a12 && (a12 = a12.toString()), b11.append(c2, a12));
          return b11;
        }(a10.request.headers), j2 = i2.has("x-nextjs-data"), k2 = "1" === i2.get("rsc");
        j2 && "/index" === g2.pathname && (g2.pathname = "/");
        let l2 = /* @__PURE__ */ new Map();
        if (!f2) for (let a11 of W) {
          let b11 = i2.get(a11);
          null !== b11 && (l2.set(a11, b11), i2.delete(a11));
        }
        let n2 = g2.searchParams.get(X), o2 = new a8({ page: a10.page, input: function(a11) {
          let b11 = "string" == typeof a11, c2 = b11 ? new URL(a11) : a11;
          return c2.searchParams.delete(X), b11 ? c2.toString() : c2;
        }(g2).toString(), init: { body: a10.request.body, headers: i2, method: a10.request.method, nextConfig: a10.request.nextConfig, signal: a10.request.signal } });
        j2 && Object.defineProperty(o2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && a10.IncrementalCache && (globalThis.__incrementalCache = new a10.IncrementalCache({ CurCacheHandler: a10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: a10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: a5() }) }));
        let p2 = a10.request.waitUntil ?? (null == (b10 = function() {
          let a11 = globalThis[a6];
          return null == a11 ? void 0 : a11.get();
        }()) ? void 0 : b10.waitUntil), q2 = new A({ request: o2, page: a10.page, context: p2 ? { waitUntil: p2 } : void 0 });
        if ((d2 = await ba(o2, () => {
          if ("/middleware" === a10.page || "/src/middleware" === a10.page) {
            let b11 = q2.waitUntil.bind(q2), c2 = new a4();
            return aG().trace(ap.execute, { spanName: `middleware ${o2.method} ${o2.nextUrl.pathname}`, attributes: { "http.target": o2.nextUrl.pathname, "http.method": o2.method } }, async () => {
              try {
                var d3, f3, g3, i3, j3, k3;
                let l3 = a5(), m2 = await a7("/", o2.nextUrl, null), n3 = (j3 = o2.nextUrl, k3 = (a11) => {
                  e2 = a11;
                }, function(a11, b12, c3, d4, e3, f4, g4, h3, i4, j4, k4, l4) {
                  function m3(a12) {
                    c3 && c3.setHeader("Set-Cookie", a12);
                  }
                  let n4 = {};
                  return { type: "request", phase: a11, implicitTags: f4, url: { pathname: d4.pathname, search: d4.search ?? "" }, rootParams: e3, get headers() {
                    return n4.headers || (n4.headers = function(a12) {
                      let b13 = Z.from(a12);
                      for (let a13 of W) b13.delete(a13);
                      return Z.seal(b13);
                    }(b12.headers)), n4.headers;
                  }, get cookies() {
                    if (!n4.cookies) {
                      let a12 = new M.RequestCookies(Z.from(b12.headers));
                      aJ(b12, a12), n4.cookies = aa.seal(a12);
                    }
                    return n4.cookies;
                  }, set cookies(value) {
                    n4.cookies = value;
                  }, get mutableCookies() {
                    if (!n4.mutableCookies) {
                      let a12 = function(a13, b13) {
                        let c4 = new M.RequestCookies(Z.from(a13));
                        return ac.wrap(c4, b13);
                      }(b12.headers, g4 || (c3 ? m3 : void 0));
                      aJ(b12, a12), n4.mutableCookies = a12;
                    }
                    return n4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    return n4.userspaceMutableCookies || (n4.userspaceMutableCookies = function(a12) {
                      let b13 = new Proxy(a12.mutableCookies, { get(c4, d5, e4) {
                        switch (d5) {
                          case "delete":
                            return function(...d6) {
                              return ad(a12, "cookies().delete"), c4.delete(...d6), b13;
                            };
                          case "set":
                            return function(...d6) {
                              return ad(a12, "cookies().set"), c4.set(...d6), b13;
                            };
                          default:
                            return P.get(c4, d5, e4);
                        }
                      } });
                      return b13;
                    }(this)), n4.userspaceMutableCookies;
                  }, get draftMode() {
                    return n4.draftMode || (n4.draftMode = new aI(i4, b12, this.cookies, this.mutableCookies)), n4.draftMode;
                  }, renderResumeDataCache: h3 ?? null, isHmrRefresh: j4, serverComponentsHmrCache: k4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", o2, void 0, j3, {}, m2, k3, void 0, l3, false, void 0, null)), p3 = function({ page: a11, renderOpts: b12, isPrefetchRequest: c3, buildId: d4, previouslyRevalidatedTags: e3 }) {
                  var f4;
                  let g4 = !b12.shouldWaitOnAllReady && !b12.supportsDynamicResponse && !b12.isDraftMode && !b12.isPossibleServerAction, h3 = b12.dev ?? false, i4 = h3 || g4 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), j4 = { isStaticGeneration: g4, page: a11, route: (f4 = a11.split("/").reduce((a12, b13, c4, d5) => b13 ? "(" === b13[0] && b13.endsWith(")") || "@" === b13[0] || ("page" === b13 || "route" === b13) && c4 === d5.length - 1 ? a12 : a12 + "/" + b13 : a12, "")).startsWith("/") ? f4 : "/" + f4, incrementalCache: b12.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: b12.cacheLifeProfiles, isRevalidate: b12.isRevalidate, isBuildTimePrerendering: b12.nextExport, hasReadableErrorStacks: b12.hasReadableErrorStacks, fetchCache: b12.fetchCache, isOnDemandRevalidate: b12.isOnDemandRevalidate, isDraftMode: b12.isDraftMode, isPrefetchRequest: c3, buildId: d4, reactLoadableManifest: (null == b12 ? void 0 : b12.reactLoadableManifest) || {}, assetPrefix: (null == b12 ? void 0 : b12.assetPrefix) || "", afterContext: function(a12) {
                    let { waitUntil: b13, onClose: c4, onAfterTaskError: d5 } = a12;
                    return new a1({ waitUntil: b13, onClose: c4, onTaskError: d5 });
                  }(b12), cacheComponentsEnabled: b12.experimental.cacheComponents, dev: h3, previouslyRevalidatedTags: e3, refreshTagsByCacheKind: function() {
                    let a12 = /* @__PURE__ */ new Map(), b13 = aU();
                    if (b13) for (let [c4, d5] of b13) "refreshTags" in d5 && a12.set(c4, a3(async () => d5.refreshTags()));
                    return a12;
                  }(), runInCleanSnapshot: a_ ? a_.snapshot() : function(a12, ...b13) {
                    return a12(...b13);
                  }, shouldTrackFetchMetrics: i4 };
                  return b12.store = j4, j4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (f3 = a10.request.nextConfig) || null == (d3 = f3.experimental) ? void 0 : d3.cacheLife, experimental: { isRoutePPREnabled: false, cacheComponents: false, authInterrupts: !!(null == (i3 = a10.request.nextConfig) || null == (g3 = i3.experimental) ? void 0 : g3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: b11, onClose: c2.onClose.bind(c2), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === o2.headers.get(V), buildId: h2 ?? "", previouslyRevalidatedTags: [] });
                return await $.J.run(p3, () => aK.FP.run(n3, a10.handler, o2, q2));
              } finally {
                setTimeout(() => {
                  c2.dispatchClose();
                }, 0);
              }
            });
          }
          return a10.handler(o2, q2);
        })) && !(d2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        d2 && e2 && d2.headers.set("set-cookie", e2);
        let r2 = null == d2 ? void 0 : d2.headers.get("x-middleware-rewrite");
        if (d2 && r2 && (k2 || !f2)) {
          let b11 = new L(r2, { forceLocale: true, headers: a10.request.headers, nextConfig: a10.request.nextConfig });
          f2 || b11.host !== o2.nextUrl.host || (b11.buildId = h2 || b11.buildId, d2.headers.set("x-middleware-rewrite", String(b11)));
          let { url: c2, isRelative: e3 } = U(b11.toString(), g2.toString());
          !f2 && j2 && d2.headers.set("x-nextjs-rewrite", c2), k2 && e3 && (g2.pathname !== b11.pathname && d2.headers.set("x-nextjs-rewritten-path", b11.pathname), g2.search !== b11.search && d2.headers.set("x-nextjs-rewritten-query", b11.search.slice(1)));
        }
        if (d2 && r2 && k2 && n2) {
          let a11 = new URL(r2);
          a11.searchParams.has(X) || (a11.searchParams.set(X, n2), d2.headers.set("x-middleware-rewrite", a11.toString()));
        }
        let s2 = null == d2 ? void 0 : d2.headers.get("Location");
        if (d2 && s2 && !f2) {
          let b11 = new L(s2, { forceLocale: false, headers: a10.request.headers, nextConfig: a10.request.nextConfig });
          d2 = new Response(d2.body, d2), b11.host === g2.host && (b11.buildId = h2 || b11.buildId, d2.headers.set("Location", b11.toString())), j2 && (d2.headers.delete("Location"), d2.headers.set("x-nextjs-redirect", U(b11.toString(), g2.toString()).url));
        }
        let t2 = d2 || T.next(), u2 = t2.headers.get("x-middleware-override-headers"), v2 = [];
        if (u2) {
          for (let [a11, b11] of l2) t2.headers.set(`x-middleware-request-${a11}`, b11), v2.push(a11);
          v2.length > 0 && t2.headers.set("x-middleware-override-headers", u2 + "," + v2.join(","));
        }
        return { response: t2, waitUntil: ("internal" === q2[y].kind ? Promise.all(q2[y].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: o2.fetchMetrics };
      }
      c(449), "undefined" == typeof URLPattern || URLPattern;
      var bd = c(107), be = c(979), bf = c(770);
      c(918);
      let { env: bg, stdout: bh } = (null == (e = globalThis) ? void 0 : e.process) ?? {}, bi = bg && !bg.NO_COLOR && (bg.FORCE_COLOR || (null == bh ? void 0 : bh.isTTY) && !bg.CI && "dumb" !== bg.TERM), bj = (a10, b10, c2, d2) => {
        let e2 = a10.substring(0, d2) + c2, f2 = a10.substring(d2 + b10.length), g2 = f2.indexOf(b10);
        return ~g2 ? e2 + bj(f2, b10, c2, g2) : e2 + f2;
      }, bk = (a10, b10, c2 = a10) => bi ? (d2) => {
        let e2 = "" + d2, f2 = e2.indexOf(b10, a10.length);
        return ~f2 ? a10 + bj(e2, b10, c2, f2) + b10 : a10 + e2 + b10;
      } : String, bl = bk("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      bk("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), bk("\x1B[3m", "\x1B[23m"), bk("\x1B[4m", "\x1B[24m"), bk("\x1B[7m", "\x1B[27m"), bk("\x1B[8m", "\x1B[28m"), bk("\x1B[9m", "\x1B[29m"), bk("\x1B[30m", "\x1B[39m");
      let bm = bk("\x1B[31m", "\x1B[39m"), bn = bk("\x1B[32m", "\x1B[39m"), bo = bk("\x1B[33m", "\x1B[39m");
      bk("\x1B[34m", "\x1B[39m");
      let bp = bk("\x1B[35m", "\x1B[39m");
      bk("\x1B[38;2;173;127;168m", "\x1B[39m"), bk("\x1B[36m", "\x1B[39m");
      let bq = bk("\x1B[37m", "\x1B[39m");
      function br(a10) {
        var b10, c2;
        return { ...a10, localePrefix: "object" == typeof (c2 = a10.localePrefix) ? c2 : { mode: c2 || "always" }, localeCookie: !!((b10 = a10.localeCookie) ?? 1) && { name: "NEXT_LOCALE", sameSite: "lax", ..."object" == typeof b10 && b10 }, localeDetection: a10.localeDetection ?? true, alternateLinks: a10.alternateLinks ?? true };
      }
      bk("\x1B[90m", "\x1B[39m"), bk("\x1B[40m", "\x1B[49m"), bk("\x1B[41m", "\x1B[49m"), bk("\x1B[42m", "\x1B[49m"), bk("\x1B[43m", "\x1B[49m"), bk("\x1B[44m", "\x1B[49m"), bk("\x1B[45m", "\x1B[49m"), bk("\x1B[46m", "\x1B[49m"), bk("\x1B[47m", "\x1B[49m"), bq(bl("\u25CB")), bm(bl("\u2A2F")), bo(bl("\u26A0")), bq(bl(" ")), bn(bl("\u2713")), bp(bl("\xBB")), new aQ(1e4, (a10) => a10.length), /* @__PURE__ */ new WeakMap();
      let bs = "X-NEXT-INTL-LOCALE";
      function bt(a10) {
        return ("object" == typeof a10 ? null == a10.host && null == a10.hostname : !/^[a-z]+:/i.test(a10)) && !function(a11) {
          let b10 = "object" == typeof a11 ? a11.pathname : a11;
          return null != b10 && !b10.startsWith("/");
        }(a10);
      }
      function bu(a10, b10) {
        let c2 = a10;
        return /^\/(\?.*)?$/.test(b10) && (b10 = b10.slice(1)), c2 += b10;
      }
      function bv(a10, b10, c2) {
        return "string" == typeof a10 ? a10 : a10[b10] || c2;
      }
      function bw(a10) {
        let b10 = function() {
          try {
            return "true" === process.env._next_intl_trailing_slash;
          } catch {
            return false;
          }
        }(), [c2, ...d2] = a10.split("#"), e2 = d2.join("#"), f2 = c2;
        if ("/" !== f2) {
          let a11 = f2.endsWith("/");
          b10 && !a11 ? f2 += "/" : !b10 && a11 && (f2 = f2.slice(0, -1));
        }
        return e2 && (f2 += "#" + e2), f2;
      }
      function bx(a10, b10) {
        let c2 = bw(a10), d2 = bw(b10);
        return bz(c2).test(d2);
      }
      function by(a10, b10) {
        return "never" !== b10.mode && b10.prefixes?.[a10] || "/" + a10;
      }
      function bz(a10) {
        let b10 = a10.replace(/\[\[(\.\.\.[^\]]+)\]\]/g, "?(.*)").replace(/\[(\.\.\.[^\]]+)\]/g, "(.+)").replace(/\[([^\]]+)\]/g, "([^/]+)");
        return RegExp(`^${b10}$`);
      }
      function bA(a10) {
        return a10.includes("[[...");
      }
      function bB(a10) {
        return a10.includes("[...");
      }
      function bC(a10) {
        return a10.includes("[");
      }
      function bD(a10, b10) {
        let c2 = a10.split("/"), d2 = b10.split("/"), e2 = Math.max(c2.length, d2.length);
        for (let a11 = 0; a11 < e2; a11++) {
          let b11 = c2[a11], e3 = d2[a11];
          if (!b11 && e3) return -1;
          if (b11 && !e3) return 1;
          if (b11 || e3) {
            if (!bC(b11) && bC(e3)) return -1;
            if (bC(b11) && !bC(e3)) return 1;
            if (!bB(b11) && bB(e3)) return -1;
            if (bB(b11) && !bB(e3)) return 1;
            if (!bA(b11) && bA(e3)) return -1;
            if (bA(b11) && !bA(e3)) return 1;
          }
        }
        return 0;
      }
      function bE(a10) {
        return "function" == typeof a10.then;
      }
      function bF(a10, b10, c2, d2) {
        let e2 = "";
        return e2 += function(a11, b11) {
          if (!b11) return a11;
          let c3 = a11 = a11.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
          return Object.entries(b11).forEach(([a12, b12]) => {
            c3 = c3.replace(`[${a12}]`, b12);
          }), c3;
        }(c2, function(a11, b11) {
          let c3 = bw(b11), d3 = bw(a11), e3 = bz(d3).exec(c3);
          if (!e3) return;
          let f2 = {};
          for (let a12 = 1; a12 < e3.length; a12++) {
            let b12 = d3.match(/\[([^\]]+)\]/g)?.[a12 - 1].replace(/[[\]]/g, "");
            b12 && (f2[b12] = e3[a12]);
          }
          return f2;
        }(b10, a10)), e2 = bw(e2);
      }
      function bG(a10, b10, c2) {
        a10.endsWith("/") || (a10 += "/");
        let d2 = bH(b10, c2), e2 = RegExp(`^(${d2.map(([, a11]) => a11.replaceAll("/", "\\/")).join("|")})/(.*)`, "i"), f2 = a10.match(e2), g2 = f2 ? "/" + f2[2] : a10;
        return "/" !== g2 && (g2 = bw(g2)), g2;
      }
      function bH(a10, b10, c2 = true) {
        let d2 = a10.map((a11) => [a11, by(a11, b10)]);
        return c2 && d2.sort((a11, b11) => b11[1].length - a11[1].length), d2;
      }
      function bI(a10, b10, c2, d2) {
        let e2 = bH(b10, c2);
        for (let [b11, c3] of (d2 && e2.sort(([a11], [b12]) => {
          if (a11 === d2.defaultLocale) return -1;
          if (b12 === d2.defaultLocale) return 1;
          let c4 = d2.locales.includes(a11), e3 = d2.locales.includes(b12);
          return c4 && !e3 ? -1 : !c4 && e3 ? 1 : 0;
        }), e2)) {
          let d3, e3;
          if (a10 === c3 || a10.startsWith(c3 + "/")) d3 = e3 = true;
          else {
            let b12 = a10.toLowerCase(), f2 = c3.toLowerCase();
            (b12 === f2 || b12.startsWith(f2 + "/")) && (d3 = false, e3 = true);
          }
          if (e3) return { locale: b11, prefix: c3, matchedPrefix: a10.slice(0, c3.length), exact: d3 };
        }
      }
      function bJ(a10, b10, c2) {
        let d2 = a10;
        return b10 && (d2 = bu(b10, d2)), c2 && (d2 += c2), d2;
      }
      function bK(a10) {
        return a10.get("x-forwarded-host") ?? a10.get("host") ?? void 0;
      }
      function bL(a10, b10) {
        return b10.defaultLocale === a10 || b10.locales.includes(a10);
      }
      function bM(a10, b10, c2) {
        let d2;
        return a10 && bL(b10, a10) && (d2 = a10), d2 || (d2 = c2.find((a11) => a11.defaultLocale === b10)), d2 || (d2 = c2.find((a11) => a11.locales.includes(b10))), d2;
      }
      Object.create;
      function bN(a10, b10, c2) {
        if (c2 || 2 == arguments.length) for (var d2, e2 = 0, f2 = b10.length; e2 < f2; e2++) !d2 && e2 in b10 || (d2 || (d2 = Array.prototype.slice.call(b10, 0, e2)), d2[e2] = b10[e2]);
        return a10.concat(d2 || Array.prototype.slice.call(b10));
      }
      Object.create;
      var bO = ("function" == typeof SuppressedError && SuppressedError, { supplemental: { languageMatching: { "written-new": [{ paradigmLocales: { _locales: "en en_GB es es_419 pt_BR pt_PT" } }, { $enUS: { _value: "AS+CA+GU+MH+MP+PH+PR+UM+US+VI" } }, { $cnsar: { _value: "HK+MO" } }, { $americas: { _value: "019" } }, { $maghreb: { _value: "MA+DZ+TN+LY+MR+EH" } }, { no: { _desired: "nb", _distance: "1" } }, { bs: { _desired: "hr", _distance: "4" } }, { bs: { _desired: "sh", _distance: "4" } }, { hr: { _desired: "sh", _distance: "4" } }, { sr: { _desired: "sh", _distance: "4" } }, { aa: { _desired: "ssy", _distance: "4" } }, { de: { _desired: "gsw", _distance: "4", _oneway: "true" } }, { de: { _desired: "lb", _distance: "4", _oneway: "true" } }, { no: { _desired: "da", _distance: "8" } }, { nb: { _desired: "da", _distance: "8" } }, { ru: { _desired: "ab", _distance: "30", _oneway: "true" } }, { en: { _desired: "ach", _distance: "30", _oneway: "true" } }, { nl: { _desired: "af", _distance: "20", _oneway: "true" } }, { en: { _desired: "ak", _distance: "30", _oneway: "true" } }, { en: { _desired: "am", _distance: "30", _oneway: "true" } }, { es: { _desired: "ay", _distance: "20", _oneway: "true" } }, { ru: { _desired: "az", _distance: "30", _oneway: "true" } }, { ur: { _desired: "bal", _distance: "20", _oneway: "true" } }, { ru: { _desired: "be", _distance: "20", _oneway: "true" } }, { en: { _desired: "bem", _distance: "30", _oneway: "true" } }, { hi: { _desired: "bh", _distance: "30", _oneway: "true" } }, { en: { _desired: "bn", _distance: "30", _oneway: "true" } }, { zh: { _desired: "bo", _distance: "20", _oneway: "true" } }, { fr: { _desired: "br", _distance: "20", _oneway: "true" } }, { es: { _desired: "ca", _distance: "20", _oneway: "true" } }, { fil: { _desired: "ceb", _distance: "30", _oneway: "true" } }, { en: { _desired: "chr", _distance: "20", _oneway: "true" } }, { ar: { _desired: "ckb", _distance: "30", _oneway: "true" } }, { fr: { _desired: "co", _distance: "20", _oneway: "true" } }, { fr: { _desired: "crs", _distance: "20", _oneway: "true" } }, { sk: { _desired: "cs", _distance: "20" } }, { en: { _desired: "cy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ee", _distance: "30", _oneway: "true" } }, { en: { _desired: "eo", _distance: "30", _oneway: "true" } }, { es: { _desired: "eu", _distance: "20", _oneway: "true" } }, { da: { _desired: "fo", _distance: "20", _oneway: "true" } }, { nl: { _desired: "fy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ga", _distance: "20", _oneway: "true" } }, { en: { _desired: "gaa", _distance: "30", _oneway: "true" } }, { en: { _desired: "gd", _distance: "20", _oneway: "true" } }, { es: { _desired: "gl", _distance: "20", _oneway: "true" } }, { es: { _desired: "gn", _distance: "20", _oneway: "true" } }, { hi: { _desired: "gu", _distance: "30", _oneway: "true" } }, { en: { _desired: "ha", _distance: "30", _oneway: "true" } }, { en: { _desired: "haw", _distance: "20", _oneway: "true" } }, { fr: { _desired: "ht", _distance: "20", _oneway: "true" } }, { ru: { _desired: "hy", _distance: "30", _oneway: "true" } }, { en: { _desired: "ia", _distance: "30", _oneway: "true" } }, { en: { _desired: "ig", _distance: "30", _oneway: "true" } }, { en: { _desired: "is", _distance: "20", _oneway: "true" } }, { id: { _desired: "jv", _distance: "20", _oneway: "true" } }, { en: { _desired: "ka", _distance: "30", _oneway: "true" } }, { fr: { _desired: "kg", _distance: "30", _oneway: "true" } }, { ru: { _desired: "kk", _distance: "30", _oneway: "true" } }, { en: { _desired: "km", _distance: "30", _oneway: "true" } }, { en: { _desired: "kn", _distance: "30", _oneway: "true" } }, { en: { _desired: "kri", _distance: "30", _oneway: "true" } }, { tr: { _desired: "ku", _distance: "30", _oneway: "true" } }, { ru: { _desired: "ky", _distance: "30", _oneway: "true" } }, { it: { _desired: "la", _distance: "20", _oneway: "true" } }, { en: { _desired: "lg", _distance: "30", _oneway: "true" } }, { fr: { _desired: "ln", _distance: "30", _oneway: "true" } }, { en: { _desired: "lo", _distance: "30", _oneway: "true" } }, { en: { _desired: "loz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "lua", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mai", _distance: "20", _oneway: "true" } }, { en: { _desired: "mfe", _distance: "30", _oneway: "true" } }, { fr: { _desired: "mg", _distance: "30", _oneway: "true" } }, { en: { _desired: "mi", _distance: "20", _oneway: "true" } }, { en: { _desired: "ml", _distance: "30", _oneway: "true" } }, { ru: { _desired: "mn", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mr", _distance: "30", _oneway: "true" } }, { id: { _desired: "ms", _distance: "30", _oneway: "true" } }, { en: { _desired: "mt", _distance: "30", _oneway: "true" } }, { en: { _desired: "my", _distance: "30", _oneway: "true" } }, { en: { _desired: "ne", _distance: "30", _oneway: "true" } }, { nb: { _desired: "nn", _distance: "20" } }, { no: { _desired: "nn", _distance: "20" } }, { en: { _desired: "nso", _distance: "30", _oneway: "true" } }, { en: { _desired: "ny", _distance: "30", _oneway: "true" } }, { en: { _desired: "nyn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "oc", _distance: "20", _oneway: "true" } }, { en: { _desired: "om", _distance: "30", _oneway: "true" } }, { en: { _desired: "or", _distance: "30", _oneway: "true" } }, { en: { _desired: "pa", _distance: "30", _oneway: "true" } }, { en: { _desired: "pcm", _distance: "20", _oneway: "true" } }, { en: { _desired: "ps", _distance: "30", _oneway: "true" } }, { es: { _desired: "qu", _distance: "30", _oneway: "true" } }, { de: { _desired: "rm", _distance: "20", _oneway: "true" } }, { en: { _desired: "rn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "rw", _distance: "30", _oneway: "true" } }, { hi: { _desired: "sa", _distance: "30", _oneway: "true" } }, { en: { _desired: "sd", _distance: "30", _oneway: "true" } }, { en: { _desired: "si", _distance: "30", _oneway: "true" } }, { en: { _desired: "sn", _distance: "30", _oneway: "true" } }, { en: { _desired: "so", _distance: "30", _oneway: "true" } }, { en: { _desired: "sq", _distance: "30", _oneway: "true" } }, { en: { _desired: "st", _distance: "30", _oneway: "true" } }, { id: { _desired: "su", _distance: "20", _oneway: "true" } }, { en: { _desired: "sw", _distance: "30", _oneway: "true" } }, { en: { _desired: "ta", _distance: "30", _oneway: "true" } }, { en: { _desired: "te", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tg", _distance: "30", _oneway: "true" } }, { en: { _desired: "ti", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tk", _distance: "30", _oneway: "true" } }, { en: { _desired: "tlh", _distance: "30", _oneway: "true" } }, { en: { _desired: "tn", _distance: "30", _oneway: "true" } }, { en: { _desired: "to", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tt", _distance: "30", _oneway: "true" } }, { en: { _desired: "tum", _distance: "30", _oneway: "true" } }, { zh: { _desired: "ug", _distance: "20", _oneway: "true" } }, { ru: { _desired: "uk", _distance: "20", _oneway: "true" } }, { en: { _desired: "ur", _distance: "30", _oneway: "true" } }, { ru: { _desired: "uz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "wo", _distance: "30", _oneway: "true" } }, { en: { _desired: "xh", _distance: "30", _oneway: "true" } }, { en: { _desired: "yi", _distance: "30", _oneway: "true" } }, { en: { _desired: "yo", _distance: "30", _oneway: "true" } }, { zh: { _desired: "za", _distance: "20", _oneway: "true" } }, { en: { _desired: "zu", _distance: "30", _oneway: "true" } }, { ar: { _desired: "aao", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abv", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acm", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acw", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acx", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acy", _distance: "10", _oneway: "true" } }, { ar: { _desired: "adf", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aeb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aec", _distance: "10", _oneway: "true" } }, { ar: { _desired: "afb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ajp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apc", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apd", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ars", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ary", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "auz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "avl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayn", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "bbz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "pga", _distance: "10", _oneway: "true" } }, { ar: { _desired: "shu", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ssh", _distance: "10", _oneway: "true" } }, { az: { _desired: "azb", _distance: "10", _oneway: "true" } }, { et: { _desired: "vro", _distance: "10", _oneway: "true" } }, { ff: { _desired: "ffm", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fub", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fue", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuf", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuh", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fui", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuq", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuv", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gnw", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gui", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gun", _distance: "10", _oneway: "true" } }, { gn: { _desired: "nhd", _distance: "10", _oneway: "true" } }, { iu: { _desired: "ikt", _distance: "10", _oneway: "true" } }, { kln: { _desired: "enb", _distance: "10", _oneway: "true" } }, { kln: { _desired: "eyo", _distance: "10", _oneway: "true" } }, { kln: { _desired: "niq", _distance: "10", _oneway: "true" } }, { kln: { _desired: "oki", _distance: "10", _oneway: "true" } }, { kln: { _desired: "pko", _distance: "10", _oneway: "true" } }, { kln: { _desired: "sgc", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tec", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tuy", _distance: "10", _oneway: "true" } }, { kok: { _desired: "gom", _distance: "10", _oneway: "true" } }, { kpe: { _desired: "gkp", _distance: "10", _oneway: "true" } }, { luy: { _desired: "ida", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lkb", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lko", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lks", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lri", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lrm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lsm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lto", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lts", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lwg", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nle", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nyd", _distance: "10", _oneway: "true" } }, { luy: { _desired: "rag", _distance: "10", _oneway: "true" } }, { lv: { _desired: "ltg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bhr", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bjq", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bmm", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bzc", _distance: "10", _oneway: "true" } }, { mg: { _desired: "msh", _distance: "10", _oneway: "true" } }, { mg: { _desired: "skg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tdx", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tkg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "txy", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmv", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmw", _distance: "10", _oneway: "true" } }, { mn: { _desired: "mvf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bjn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "btj", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bve", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bvu", _distance: "10", _oneway: "true" } }, { ms: { _desired: "coa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "dup", _distance: "10", _oneway: "true" } }, { ms: { _desired: "hji", _distance: "10", _oneway: "true" } }, { ms: { _desired: "id", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jak", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jax", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvr", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kxd", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lce", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lcf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "liw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "max", _distance: "10", _oneway: "true" } }, { ms: { _desired: "meo", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "min", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mqg", _distance: "10", _oneway: "true" } }, { ms: { _desired: "msi", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mui", _distance: "10", _oneway: "true" } }, { ms: { _desired: "orn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "ors", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pel", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pse", _distance: "10", _oneway: "true" } }, { ms: { _desired: "tmw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "urk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkt", _distance: "10", _oneway: "true" } }, { ms: { _desired: "xmm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zlm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zmi", _distance: "10", _oneway: "true" } }, { ne: { _desired: "dty", _distance: "10", _oneway: "true" } }, { om: { _desired: "gax", _distance: "10", _oneway: "true" } }, { om: { _desired: "hae", _distance: "10", _oneway: "true" } }, { om: { _desired: "orc", _distance: "10", _oneway: "true" } }, { or: { _desired: "spv", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pbt", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pst", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qub", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qud", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quf", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qug", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quk", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qul", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qup", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qur", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qus", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qux", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quy", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qva", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qve", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvi", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvj", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvm", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvs", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvz", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qws", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxr", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxt", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxu", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxw", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdc", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdn", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sro", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aae", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aat", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aln", _distance: "10", _oneway: "true" } }, { syr: { _desired: "aii", _distance: "10", _oneway: "true" } }, { uz: { _desired: "uzs", _distance: "10", _oneway: "true" } }, { yi: { _desired: "yih", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cdo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cjy", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cpx", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "gan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hak", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hsn", _distance: "10", _oneway: "true" } }, { zh: { _desired: "lzh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "mnp", _distance: "10", _oneway: "true" } }, { zh: { _desired: "nan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "wuu", _distance: "10", _oneway: "true" } }, { zh: { _desired: "yue", _distance: "10", _oneway: "true" } }, { "*": { _desired: "*", _distance: "80" } }, { "en-Latn": { _desired: "am-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "az-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "bn-Beng", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "bo-Tibt", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "hy-Armn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ka-Geor", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "km-Khmr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "kn-Knda", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "lo-Laoo", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ml-Mlym", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "my-Mymr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ne-Deva", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "or-Orya", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "pa-Guru", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ps-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "sd-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "si-Sinh", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ta-Taml", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "te-Telu", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ti-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "tk-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ur-Arab", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "uz-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "yi-Hebr", _distance: "10", _oneway: "true" } }, { "sr-Cyrl": { _desired: "sr-Latn", _distance: "5" } }, { "zh-Hans": { _desired: "za-Latn", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "zh-Hant": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "ar-Arab": { _desired: "ar-Latn", _distance: "20", _oneway: "true" } }, { "bn-Beng": { _desired: "bn-Latn", _distance: "20", _oneway: "true" } }, { "gu-Gujr": { _desired: "gu-Latn", _distance: "20", _oneway: "true" } }, { "hi-Deva": { _desired: "hi-Latn", _distance: "20", _oneway: "true" } }, { "kn-Knda": { _desired: "kn-Latn", _distance: "20", _oneway: "true" } }, { "ml-Mlym": { _desired: "ml-Latn", _distance: "20", _oneway: "true" } }, { "mr-Deva": { _desired: "mr-Latn", _distance: "20", _oneway: "true" } }, { "ta-Taml": { _desired: "ta-Latn", _distance: "20", _oneway: "true" } }, { "te-Telu": { _desired: "te-Latn", _distance: "20", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Latn", _distance: "20", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Latn", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hani", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hrkt", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hani", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hang", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "ko-Hang": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "*-*": { _desired: "*-*", _distance: "50" } }, { "ar-*-$maghreb": { _desired: "ar-*-$maghreb", _distance: "4" } }, { "ar-*-$!maghreb": { _desired: "ar-*-$!maghreb", _distance: "4" } }, { "ar-*-*": { _desired: "ar-*-*", _distance: "5" } }, { "en-*-$enUS": { _desired: "en-*-$enUS", _distance: "4" } }, { "en-*-GB": { _desired: "en-*-$!enUS", _distance: "3" } }, { "en-*-$!enUS": { _desired: "en-*-$!enUS", _distance: "4" } }, { "en-*-*": { _desired: "en-*-*", _distance: "5" } }, { "es-*-$americas": { _desired: "es-*-$americas", _distance: "4" } }, { "es-*-$!americas": { _desired: "es-*-$!americas", _distance: "4" } }, { "es-*-*": { _desired: "es-*-*", _distance: "5" } }, { "pt-*-$americas": { _desired: "pt-*-$americas", _distance: "4" } }, { "pt-*-$!americas": { _desired: "pt-*-$!americas", _distance: "4" } }, { "pt-*-*": { _desired: "pt-*-*", _distance: "5" } }, { "zh-Hant-$cnsar": { _desired: "zh-Hant-$cnsar", _distance: "4" } }, { "zh-Hant-$!cnsar": { _desired: "zh-Hant-$!cnsar", _distance: "4" } }, { "zh-Hant-*": { _desired: "zh-Hant-*", _distance: "5" } }, { "*-*-*": { _desired: "*-*-*", _distance: "4" } }] } } }), bP = { "001": ["001", "001-status-grouping", "002", "005", "009", "011", "013", "014", "015", "017", "018", "019", "021", "029", "030", "034", "035", "039", "053", "054", "057", "061", "142", "143", "145", "150", "151", "154", "155", "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DG", "DJ", "DK", "DM", "DO", "DZ", "EA", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "EU", "EZ", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "IC", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "QO", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UN", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"], "002": ["002", "002-status-grouping", "011", "014", "015", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "DZ", "EA", "EG", "EH", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IC", "IO", "KE", "KM", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SD", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TN", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], "003": ["003", "013", "021", "029", "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CA", "CR", "CU", "CW", "DM", "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PM", "PR", "SV", "SX", "TC", "TT", "US", "VC", "VG", "VI"], "005": ["005", "AR", "BO", "BR", "BV", "CL", "CO", "EC", "FK", "GF", "GS", "GY", "PE", "PY", "SR", "UY", "VE"], "009": ["009", "053", "054", "057", "061", "AC", "AQ", "AS", "AU", "CC", "CK", "CP", "CX", "DG", "FJ", "FM", "GU", "HM", "KI", "MH", "MP", "NC", "NF", "NR", "NU", "NZ", "PF", "PG", "PN", "PW", "QO", "SB", "TA", "TK", "TO", "TV", "UM", "VU", "WF", "WS"], "011": ["011", "BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG"], "013": ["013", "BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"], "014": ["014", "BI", "DJ", "ER", "ET", "IO", "KE", "KM", "MG", "MU", "MW", "MZ", "RE", "RW", "SC", "SO", "SS", "TF", "TZ", "UG", "YT", "ZM", "ZW"], "015": ["015", "DZ", "EA", "EG", "EH", "IC", "LY", "MA", "SD", "TN"], "017": ["017", "AO", "CD", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"], "018": ["018", "BW", "LS", "NA", "SZ", "ZA"], "019": ["003", "005", "013", "019", "019-status-grouping", "021", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BM", "BO", "BQ", "BR", "BS", "BV", "BZ", "CA", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GL", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PM", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "US", "UY", "VC", "VE", "VG", "VI"], "021": ["021", "BM", "CA", "GL", "PM", "US"], "029": ["029", "AG", "AI", "AW", "BB", "BL", "BQ", "BS", "CU", "CW", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "030": ["030", "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"], "034": ["034", "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"], "035": ["035", "BN", "ID", "KH", "LA", "MM", "MY", "PH", "SG", "TH", "TL", "VN"], "039": ["039", "AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "PT", "RS", "SI", "SM", "VA", "XK"], "053": ["053", "AU", "CC", "CX", "HM", "NF", "NZ"], "054": ["054", "FJ", "NC", "PG", "SB", "VU"], "057": ["057", "FM", "GU", "KI", "MH", "MP", "NR", "PW", "UM"], "061": ["061", "AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"], 142: ["030", "034", "035", "142", "143", "145", "AE", "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CN", "CY", "GE", "HK", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MO", "MV", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SG", "SY", "TH", "TJ", "TL", "TM", "TR", "TW", "UZ", "VN", "YE"], 143: ["143", "KG", "KZ", "TJ", "TM", "UZ"], 145: ["145", "AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "YE"], 150: ["039", "150", "151", "154", "155", "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CQ", "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ", "SK", "SM", "UA", "VA", "XK"], 151: ["151", "BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"], 154: ["154", "AX", "CQ", "DK", "EE", "FI", "FO", "GB", "GG", "IE", "IM", "IS", "JE", "LT", "LV", "NO", "SE", "SJ"], 155: ["155", "AT", "BE", "CH", "DE", "FR", "LI", "LU", "MC", "NL"], 202: ["011", "014", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IO", "KE", "KM", "LR", "LS", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], 419: ["005", "013", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BO", "BQ", "BR", "BS", "BV", "BZ", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "UY", "VC", "VE", "VG", "VI"], EU: ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "EU", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"], EZ: ["AT", "BE", "CY", "DE", "EE", "ES", "EZ", "FI", "FR", "GR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"], QO: ["AC", "AQ", "CP", "DG", "QO", "TA"], UN: ["AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ER", "ES", "ET", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TD", "TG", "TH", "TJ", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TZ", "UA", "UG", "UN", "US", "UY", "UZ", "VC", "VE", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"] }, bQ = /-u(?:-[0-9a-z]{2,8})+/gi;
      function bR(a10, b10, c2) {
        if (void 0 === c2 && (c2 = Error), !a10) throw new c2(b10);
      }
      function bS(a10, b10, c2) {
        var d2 = b10.split("-"), e2 = d2[0], f2 = d2[1], g2 = d2[2], h2 = true;
        if (g2 && "$" === g2[0]) {
          var i2 = "!" !== g2[1], j2 = (i2 ? c2[g2.slice(1)] : c2[g2.slice(2)]).map(function(a11) {
            return bP[a11] || [a11];
          }).reduce(function(a11, b11) {
            return bN(bN([], a11, true), b11, true);
          }, []);
          h2 && (h2 = j2.indexOf(a10.region || "") > 1 == i2);
        } else h2 && (h2 = !a10.region || "*" === g2 || g2 === a10.region);
        return h2 && (h2 = !a10.script || "*" === f2 || f2 === a10.script), h2 && (h2 = !a10.language || "*" === e2 || e2 === a10.language), h2;
      }
      function bT(a10) {
        return [a10.language, a10.script, a10.region].filter(Boolean).join("-");
      }
      function bU(a10, b10, c2) {
        for (var d2 = 0, e2 = c2.matches; d2 < e2.length; d2++) {
          var f2 = e2[d2], g2 = bS(a10, f2.desired, c2.matchVariables) && bS(b10, f2.supported, c2.matchVariables);
          if (f2.oneway || g2 || (g2 = bS(a10, f2.supported, c2.matchVariables) && bS(b10, f2.desired, c2.matchVariables)), g2) {
            var h2 = 10 * f2.distance;
            if (c2.paradigmLocales.indexOf(bT(a10)) > -1 != c2.paradigmLocales.indexOf(bT(b10)) > -1) return h2 - 1;
            return h2;
          }
        }
        throw Error("No matching distance found");
      }
      function bV(a10) {
        return Intl.getCanonicalLocales(a10)[0];
      }
      var bW = c(366);
      function bX(a10, b10, c2) {
        let d2, e2 = new bW({ headers: { "accept-language": a10.get("accept-language") || void 0 } }).languages();
        try {
          let a11 = b10.slice().sort((a12, b11) => b11.length - a12.length);
          d2 = function(a12, b11, c3, d3, e3, g2) {
            "lookup" === c3.localeMatcher ? i2 = function(a13, b12, c4) {
              for (var d4 = { locale: "" }, e4 = 0; e4 < b12.length; e4++) {
                var f2 = b12[e4], g3 = f2.replace(bQ, ""), h3 = function(a14, b13) {
                  for (var c5 = b13; ; ) {
                    if (a14.indexOf(c5) > -1) return c5;
                    var d5 = c5.lastIndexOf("-");
                    if (!~d5) return;
                    d5 >= 2 && "-" === c5[d5 - 2] && (d5 -= 2), c5 = c5.slice(0, d5);
                  }
                }(a13, g3);
                if (h3) return d4.locale = h3, f2 !== g3 && (d4.extension = f2.slice(g3.length, f2.length)), d4;
              }
              return d4.locale = c4(), d4;
            }(Array.from(a12), b11, g2) : (k2 = Array.from(a12), n2 = [], o2 = b11.reduce(function(a13, b12) {
              var c4 = b12.replace(bQ, "");
              return n2.push(c4), a13[c4] = b12, a13;
            }, {}), (void 0 === p2 && (p2 = 838), q2 = 1 / 0, r2 = { matchedDesiredLocale: "", distances: {} }, n2.forEach(function(a13, b12) {
              r2.distances[a13] || (r2.distances[a13] = {}), k2.forEach(function(c4) {
                var d4, e4, g3, h3, i3, j3, k3 = (d4 = new Intl.Locale(a13).maximize(), e4 = new Intl.Locale(c4).maximize(), g3 = { language: d4.language, script: d4.script || "", region: d4.region || "" }, h3 = { language: e4.language, script: e4.script || "", region: e4.region || "" }, i3 = 0, j3 = function() {
                  var a14, b13;
                  if (!f) {
                    var c5 = null == (b13 = null == (a14 = bO.supplemental.languageMatching["written-new"][0]) ? void 0 : a14.paradigmLocales) ? void 0 : b13._locales.split(" "), d5 = bO.supplemental.languageMatching["written-new"].slice(1, 5);
                    f = { matches: bO.supplemental.languageMatching["written-new"].slice(5).map(function(a15) {
                      var b14 = Object.keys(a15)[0], c6 = a15[b14];
                      return { supported: b14, desired: c6._desired, distance: +c6._distance, oneway: "true" === c6.oneway };
                    }, {}), matchVariables: d5.reduce(function(a15, b14) {
                      var c6 = Object.keys(b14)[0], d6 = b14[c6];
                      return a15[c6.slice(1)] = d6._value.split("+"), a15;
                    }, {}), paradigmLocales: bN(bN([], c5, true), c5.map(function(a15) {
                      return new Intl.Locale(a15.replace(/_/g, "-")).maximize().toString();
                    }), true) };
                  }
                  return f;
                }(), g3.language !== h3.language && (i3 += bU({ language: d4.language, script: "", region: "" }, { language: e4.language, script: "", region: "" }, j3)), g3.script !== h3.script && (i3 += bU({ language: d4.language, script: g3.script, region: "" }, { language: e4.language, script: g3.script, region: "" }, j3)), g3.region !== h3.region && (i3 += bU(g3, h3, j3)), i3 + 0 + 40 * b12);
                r2.distances[a13][c4] = k3, k3 < q2 && (q2 = k3, r2.matchedDesiredLocale = a13, r2.matchedSupportedLocale = c4);
              });
            }), q2 >= p2 && (r2.matchedDesiredLocale = void 0, r2.matchedSupportedLocale = void 0), s2 = r2).matchedSupportedLocale && s2.matchedDesiredLocale && (l2 = s2.matchedSupportedLocale, m2 = o2[s2.matchedDesiredLocale].slice(s2.matchedDesiredLocale.length) || void 0), i2 = l2 ? { locale: l2, extension: m2 } : { locale: g2() }), null == i2 && (i2 = { locale: g2(), extension: "" });
            var h2, i2, j2, k2, l2, m2, n2, o2, p2, q2, r2, s2, t2 = i2.locale, u2 = e3[t2], v2 = { locale: "en", dataLocale: t2 };
            j2 = i2.extension ? function(a13) {
              bR(a13 === a13.toLowerCase(), "Expected extension to be lowercase"), bR("-u-" === a13.slice(0, 3), "Expected extension to be a Unicode locale extension");
              for (var b12, c4 = [], d4 = [], e4 = a13.length, f2 = 3; f2 < e4; ) {
                var g3 = a13.indexOf("-", f2), h3 = void 0;
                h3 = -1 === g3 ? e4 - f2 : g3 - f2;
                var i3 = a13.slice(f2, f2 + h3);
                bR(h3 >= 2, "Expected a subtag to have at least 2 characters"), void 0 === b12 && 2 != h3 ? -1 === c4.indexOf(i3) && c4.push(i3) : 2 === h3 ? (b12 = { key: i3, value: "" }, void 0 === d4.find(function(a14) {
                  return a14.key === (null == b12 ? void 0 : b12.key);
                }) && d4.push(b12)) : (null == b12 ? void 0 : b12.value) === "" ? b12.value = i3 : (bR(void 0 !== b12, "Expected keyword to be defined"), b12.value += "-" + i3), f2 += h3 + 1;
              }
              return { attributes: c4, keywords: d4 };
            }(i2.extension).keywords : [];
            for (var w2 = [], x2 = function(a13) {
              var b12, d4, e4 = null != (h2 = null == u2 ? void 0 : u2[a13]) ? h2 : [];
              bR(Array.isArray(e4), "keyLocaleData for ".concat(a13, " must be an array"));
              var f2 = e4[0];
              bR(void 0 === f2 || "string" == typeof f2, "value must be a string or undefined");
              var g3 = void 0, i3 = j2.find(function(b13) {
                return b13.key === a13;
              });
              if (i3) {
                var k3 = i3.value;
                "" !== k3 ? e4.indexOf(k3) > -1 && (g3 = { key: a13, value: f2 = k3 }) : e4.indexOf("true") > -1 && (g3 = { key: a13, value: f2 = "true" });
              }
              var l3 = c3[a13];
              bR(null == l3 || "string" == typeof l3, "optionsValue must be a string or undefined"), "string" == typeof l3 && (b12 = a13.toLowerCase(), d4 = l3.toLowerCase(), bR(void 0 !== b12, "ukey must be defined"), "" === (l3 = d4) && (l3 = "true")), l3 !== f2 && e4.indexOf(l3) > -1 && (f2 = l3, g3 = void 0), g3 && w2.push(g3), v2[a13] = f2;
            }, y2 = 0; y2 < d3.length; y2++) x2(d3[y2]);
            return w2.length > 0 && (t2 = function(a13, b12, c4) {
              bR(-1 === a13.indexOf("-u-"), "Expected locale to not have a Unicode locale extension");
              for (var d4, e4 = "-u", f2 = 0; f2 < b12.length; f2++) {
                var g3 = b12[f2];
                e4 += "-".concat(g3);
              }
              for (var h3 = 0; h3 < c4.length; h3++) {
                var i3 = c4[h3], j3 = i3.key, k3 = i3.value;
                e4 += "-".concat(j3), "" !== k3 && (e4 += "-".concat(k3));
              }
              if ("-u" === e4) return bV(a13);
              var l3 = a13.indexOf("-x-");
              return bV(-1 === l3 ? a13 + e4 : a13.slice(0, l3) + e4 + a13.slice(l3));
            }(t2, [], w2)), v2.locale = t2, v2;
          }(a11, Intl.getCanonicalLocales(e2), { localeMatcher: "best fit" }, [], {}, function() {
            return c2;
          }).locale;
        } catch {
        }
        return d2;
      }
      function bY(a10, b10) {
        if (a10.localeCookie && b10.has(a10.localeCookie.name)) {
          let c2 = b10.get(a10.localeCookie.name)?.value;
          if (c2 && a10.locales.includes(c2)) return c2;
        }
      }
      function bZ(a10, b10, c2, d2) {
        let e2;
        return d2 && (e2 = bI(d2, a10.locales, a10.localePrefix)?.locale), !e2 && a10.localeDetection && (e2 = bY(a10, c2)), !e2 && a10.localeDetection && (e2 = bX(b10, a10.locales, a10.defaultLocale)), e2 || (e2 = a10.defaultLocale), e2;
      }
      var b$ = c(378), b_ = c(944);
      let b0 = c(918).s;
      function b1(a10, b10, c2) {
        void 0 === c2 && (c2 = b$.Q.TemporaryRedirect);
        let d2 = Object.defineProperty(Error(b_.oJ), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        return d2.digest = b_.oJ + ";" + b10 + ";" + a10 + ";" + c2 + ";", d2;
      }
      function b2(a10, b10) {
        var c2;
        throw null != b10 || (b10 = (null == b0 || null == (c2 = b0.getStore()) ? void 0 : c2.isAction) ? b_.zB.push : b_.zB.replace), b1(a10, b10, b$.Q.TemporaryRedirect);
      }
      function b3(a10, b10) {
        throw void 0 === b10 && (b10 = b_.zB.replace), b1(a10, b10, b$.Q.PermanentRedirect);
      }
      var b4 = c(66);
      b4.s8, b4.s8, b4.s8, c(515).X;
      var b5 = c(814), b6 = c.t(b5, 2)["use".trim()];
      let b7 = (0, c(637).YR)(function() {
        throw Error(`Attempted to call the default export of "C:\\\\Users\\\\Aleksa\\\\Documents\\\\Projects\\\\Website\\\\casinohub-influencer\\\\node_modules\\\\next-intl\\\\dist\\\\esm\\\\production\\\\navigation\\\\shared\\\\BaseLink.js" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.`);
      }, "C:\\Users\\Aleksa\\Documents\\Projects\\Website\\casinohub-influencer\\node_modules\\next-intl\\dist\\esm\\production\\navigation\\shared\\BaseLink.js", "default");
      function b8(a10) {
        let b10 = new URLSearchParams();
        for (let [c2, d2] of Object.entries(a10)) Array.isArray(d2) ? d2.forEach((a11) => {
          b10.append(c2, String(a11));
        }) : b10.set(c2, String(d2));
        return "?" + b10.toString();
      }
      var b9 = c(149);
      function ca(a10, b10, c2, d2) {
        var e2 = null == d2 || "number" == typeof d2 || "boolean" == typeof d2 ? d2 : c2(d2), f2 = b10.get(e2);
        return void 0 === f2 && (f2 = a10.call(this, d2), b10.set(e2, f2)), f2;
      }
      function cb(a10, b10, c2) {
        var d2 = Array.prototype.slice.call(arguments, 3), e2 = c2(d2), f2 = b10.get(e2);
        return void 0 === f2 && (f2 = a10.apply(this, d2), b10.set(e2, f2)), f2;
      }
      var cc = function() {
        return JSON.stringify(arguments);
      }, cd = function() {
        function a10() {
          this.cache = /* @__PURE__ */ Object.create(null);
        }
        return a10.prototype.get = function(a11) {
          return this.cache[a11];
        }, a10.prototype.set = function(a11, b10) {
          this.cache[a11] = b10;
        }, a10;
      }(), ce = { create: function() {
        return new cd();
      } }, cf = { variadic: function(a10, b10) {
        var c2, d2;
        return c2 = b10.cache.create(), d2 = b10.serializer, cb.bind(this, a10, c2, d2);
      }, monadic: function(a10, b10) {
        var c2, d2;
        return c2 = b10.cache.create(), d2 = b10.serializer, ca.bind(this, a10, c2, d2);
      } }, cg = function(a10) {
        return a10.MISSING_MESSAGE = "MISSING_MESSAGE", a10.MISSING_FORMAT = "MISSING_FORMAT", a10.ENVIRONMENT_FALLBACK = "ENVIRONMENT_FALLBACK", a10.INSUFFICIENT_PATH = "INSUFFICIENT_PATH", a10.INVALID_MESSAGE = "INVALID_MESSAGE", a10.INVALID_KEY = "INVALID_KEY", a10.FORMATTING_ERROR = "FORMATTING_ERROR", a10;
      }(cg || {});
      function ch(a10) {
        return function(...a11) {
          return a11.filter(Boolean).join(".");
        }(a10.namespace, a10.key);
      }
      function ci(a10) {
        console.error(a10);
      }
      function cj(a10, b10) {
        return function(a11, b11) {
          var c2, d2, e2;
          return d2 = (c2 = { cache: { create: () => ({ get: (a12) => b11[a12], set(a12, c3) {
            b11[a12] = c3;
          } }) }, strategy: cf.variadic }).cache ? c2.cache : ce, e2 = c2 && c2.serializer ? c2.serializer : cc, (c2 && c2.strategy ? c2.strategy : function(a12, b12) {
            var c3, d3, e3 = 1 === a12.length ? ca : cb;
            return c3 = b12.cache.create(), d3 = b12.serializer, e3.bind(this, a12, c3, d3);
          })(a11, { cache: d2, serializer: e2 });
        }((...b11) => new a10(...b11), b10);
      }
      let ck = { current: null }, cl = "function" == typeof b5.cache ? b5.cache : (a10) => a10, cm = console.warn;
      function cn(a10) {
        return function(...b10) {
          cm(a10(...b10));
        };
      }
      cl((a10) => {
        try {
          cm(ck.current);
        } finally {
          ck.current = null;
        }
      }), /* @__PURE__ */ new WeakMap(), cn(function(a10, b10) {
        let c2 = a10 ? `Route "${a10}" ` : "This route ";
        return Object.defineProperty(Error(`${c2}used ${b10}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E223", enumerable: false, configurable: true });
      });
      let co = /* @__PURE__ */ new WeakMap();
      function cp(a10) {
        let b10 = co.get(a10);
        if (b10) return b10;
        let c2 = Promise.resolve(a10);
        return co.set(a10, c2), Object.defineProperties(c2, { append: { value: a10.append.bind(a10) }, delete: { value: a10.delete.bind(a10) }, get: { value: a10.get.bind(a10) }, has: { value: a10.has.bind(a10) }, set: { value: a10.set.bind(a10) }, getSetCookie: { value: a10.getSetCookie.bind(a10) }, forEach: { value: a10.forEach.bind(a10) }, keys: { value: a10.keys.bind(a10) }, values: { value: a10.values.bind(a10) }, entries: { value: a10.entries.bind(a10) }, [Symbol.iterator]: { value: a10[Symbol.iterator].bind(a10) } }), c2;
      }
      cn(function(a10, b10) {
        let c2 = a10 ? `Route "${a10}" ` : "This route ";
        return Object.defineProperty(Error(`${c2}used ${b10}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E277", enumerable: false, configurable: true });
      }), c(159), /* @__PURE__ */ new WeakMap(), cn(function(a10, b10) {
        let c2 = a10 ? `Route "${a10}" ` : "This route ";
        return Object.defineProperty(Error(`${c2}used ${b10}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", { value: "E377", enumerable: false, configurable: true });
      });
      let cq = (0, b5.cache)(function() {
        return { locale: void 0 };
      }), cr = (0, b5.cache)(async function() {
        let a10 = function a11() {
          let b10 = "headers", c2 = $.J.getStore(), d2 = aK.FP.getStore();
          if (c2) {
            if (d2 && "after" === d2.phase && !function() {
              let a12 = a0.getStore();
              return (null == a12 ? void 0 : a12.rootTaskSpawnPhase) === "action";
            }()) throw Object.defineProperty(Error(`Route ${c2.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", { value: "E367", enumerable: false, configurable: true });
            if (c2.forceStatic) return cp(Z.seal(new Headers({})));
            if (d2) switch (d2.type) {
              case "cache": {
                let b11 = Object.defineProperty(Error(`Route ${c2.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E304", enumerable: false, configurable: true });
                throw Error.captureStackTrace(b11, a11), c2.invalidDynamicUsageError ??= b11, b11;
              }
              case "private-cache": {
                let b11 = Object.defineProperty(Error(`Route ${c2.route} used "headers" inside "use cache: private". Accessing "headers" inside a private cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", { value: "E742", enumerable: false, configurable: true });
                throw Error.captureStackTrace(b11, a11), c2.invalidDynamicUsageError ??= b11, b11;
              }
              case "unstable-cache":
                throw Object.defineProperty(Error(`Route ${c2.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", { value: "E127", enumerable: false, configurable: true });
            }
            if (c2.dynamicShouldError) throw Object.defineProperty(new be.f(`Route ${c2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", { value: "E525", enumerable: false, configurable: true });
            if (d2) switch (d2.type) {
              case "prerender":
              case "prerender-runtime":
                var e2 = c2, f2 = d2;
                let g2 = co.get(f2);
                if (g2) return g2;
                let h2 = (0, bf.W5)(f2.renderSignal, e2.route, "`headers()`");
                return co.set(f2, h2), h2;
              case "prerender-client":
                let i2 = "`headers`";
                throw Object.defineProperty(new aN.z(`${i2} must not be used within a client component. Next.js should be preventing ${i2} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", { value: "E693", enumerable: false, configurable: true });
              case "prerender-ppr":
                return (0, bd.Ui)(c2.route, b10, d2.dynamicTracking);
              case "prerender-legacy":
                return (0, bd.xI)(b10, c2, d2);
              case "request":
                return (0, bd.Pk)(d2), cp(d2.headers);
            }
          }
          (0, aK.M1)(b10);
        }();
        return bE(a10) ? await a10 : a10;
      }), cs = (0, b5.cache)(async function() {
        let a10;
        try {
          a10 = (await cr()).get(bs) || void 0;
        } catch (a11) {
          if (a11 instanceof Error && "DYNAMIC_SERVER_USAGE" === a11.digest) {
            let b10 = Error("Usage of next-intl APIs in Server Components currently opts into dynamic rendering. This limitation will eventually be lifted, but as a stopgap solution, you can use the `setRequestLocale` API to enable static rendering, see https://next-intl.dev/docs/routing/setup#static-rendering", { cause: a11 });
            throw b10.digest = a11.digest, b10;
          }
          throw a11;
        }
        return a10;
      });
      async function ct() {
        return cq().locale || await cs();
      }
      let cu = async ({ requestLocale: a10 }) => {
        let b10 = await a10;
        return b10 && cB.locales.includes(b10) || (b10 = cB.defaultLocale), { locale: b10, messages: (await c(691)(`./${b10}.json`)).default };
      }, cv = (0, b5.cache)(function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }), cw = (0, b5.cache)(async function(a10, b10) {
        let c2 = a10({ locale: b10, get requestLocale() {
          return b10 ? Promise.resolve(b10) : ct();
        } });
        if (bE(c2) && (c2 = await c2), !c2.locale) throw Error("No locale was returned from `getRequestConfig`.\n\nSee https://next-intl.dev/docs/usage/configuration#i18n-request");
        return c2;
      }), cx = (0, b5.cache)(function(a10) {
        return { getDateTimeFormat: cj(Intl.DateTimeFormat, a10.dateTime), getNumberFormat: cj(Intl.NumberFormat, a10.number), getPluralRules: cj(Intl.PluralRules, a10.pluralRules), getRelativeTimeFormat: cj(Intl.RelativeTimeFormat, a10.relativeTime), getListFormat: cj(Intl.ListFormat, a10.list), getDisplayNames: cj(Intl.DisplayNames, a10.displayNames) };
      }), cy = (0, b5.cache)(function() {
        return { dateTime: {}, number: {}, message: {}, relativeTime: {}, pluralRules: {}, list: {}, displayNames: {} };
      }), cz = (0, b5.cache)(async function(a10) {
        let b10 = await cw(cu, a10);
        return { ...function({ formats: a11, getMessageFallback: b11, messages: c2, onError: d2, ...e2 }) {
          return { ...e2, formats: a11 || void 0, messages: c2 || void 0, onError: d2 || ci, getMessageFallback: b11 || ch };
        }(b10), _formatters: cx(cy()), timeZone: b10.timeZone || cv() };
      });
      async function cA() {
        return (await cz()).locale;
      }
      let cB = { locales: ["en", "sr"], defaultLocale: "en" }, { Link: cC, redirect: cD, usePathname: cE, useRouter: cF } = function(a10) {
        let { config: b10, ...c2 } = function(a11, b11) {
          let c3 = br(b11 || {}), d3 = c3.pathnames, e2 = (0, b5.forwardRef)(function({ href: b12, locale: e3, ...g3 }, h2) {
            let i2, j2;
            "object" == typeof b12 ? (i2 = b12.pathname, j2 = b12.params) : i2 = b12;
            let k2 = bt(b12), l2 = a11(), m2 = bE(l2) ? b6(l2) : l2, n2 = k2 ? f2({ locale: e3 || m2, href: null == d3 ? i2 : { pathname: i2, params: j2 }, forcePrefix: null != e3 || void 0 }) : i2;
            return (0, b9.jsx)(b7, { ref: h2, href: "object" == typeof b12 ? { ...b12, pathname: n2 } : n2, locale: e3, localeCookie: c3.localeCookie, ...g3 });
          });
          function f2(a12) {
            let b12, { forcePrefix: e3, href: f3, locale: g3 } = a12;
            return null == d3 ? "object" == typeof f3 ? (b12 = f3.pathname, f3.query && (b12 += b8(f3.query))) : b12 = f3 : b12 = function({ pathname: a13, locale: b13, params: c4, pathnames: d4, query: e4 }) {
              function f4(a14) {
                let f5, g4 = d4[a14];
                return g4 ? (f5 = bv(g4, b13, a14), c4 && Object.entries(c4).forEach(([a15, b14]) => {
                  let c5, d5;
                  Array.isArray(b14) ? (c5 = `(\\[)?\\[...${a15}\\](\\])?`, d5 = b14.map((a16) => String(a16)).join("/")) : (c5 = `\\[${a15}\\]`, d5 = String(b14)), f5 = f5.replace(RegExp(c5, "g"), d5);
                }), f5 = new URL(f5 = f5.replace(/\[\[\.\.\..+\]\]/g, ""), "http://l").pathname) : f5 = a14, f5 = bw(f5), e4 && (f5 += b8(e4)), f5;
              }
              if ("string" == typeof a13) return f4(a13);
              {
                let { pathname: b14, ...c5 } = a13;
                return { ...c5, pathname: f4(b14) };
              }
            }({ locale: g3, ..."string" == typeof f3 ? { pathname: f3 } : f3, pathnames: c3.pathnames }), function(a13, b13, c4, d4) {
              let e4, { mode: f4 } = c4.localePrefix;
              return void 0 !== d4 ? e4 = d4 : bt(a13) && ("always" === f4 ? e4 = true : "as-needed" === f4 && (e4 = c4.domains ? !c4.domains.some((a14) => a14.defaultLocale === b13) : b13 !== c4.defaultLocale)), e4 ? bu(by(b13, c4.localePrefix), a13) : a13;
            }(b12, g3, c3, e3);
          }
          function g2(a12) {
            return function(b12, ...c4) {
              return a12(f2(b12), ...c4);
            };
          }
          return { config: c3, Link: e2, redirect: g2(b2), permanentRedirect: g2(b3), getPathname: f2 };
        }(cA, a10);
        function d2(a11) {
          return () => {
            throw Error(`\`${a11}\` is not supported in Server Components. You can use this hook if you convert the calling component to a Client Component.`);
          };
        }
        return { ...c2, usePathname: d2("usePathname"), useRouter: d2("useRouter") };
      }(cB), cG = function(a10) {
        let b10 = br(a10);
        return function(a11) {
          var c2, d2;
          let e2;
          try {
            e2 = decodeURI(a11.nextUrl.pathname);
          } catch {
            return T.next();
          }
          let f2 = e2.replace(/\\/g, "%5C").replace(/\/+/g, "/"), { domain: g2, locale: h2 } = (c2 = a11.headers, d2 = a11.cookies, b10.domains ? function(a12, b11, c3, d3) {
            let e3, f3 = function(a13, b12) {
              let c4 = bK(a13);
              if (c4) return b12.find((a14) => a14.domain === c4);
            }(b11, a12.domains);
            if (!f3) return { locale: bZ(a12, b11, c3, d3) };
            if (d3) {
              let b12 = bI(d3, a12.locales, a12.localePrefix, f3)?.locale;
              if (b12) {
                if (!bL(b12, f3)) return { locale: b12, domain: f3 };
                e3 = b12;
              }
            }
            if (!e3 && a12.localeDetection) {
              let b12 = bY(a12, c3);
              b12 && bL(b12, f3) && (e3 = b12);
            }
            if (!e3 && a12.localeDetection) {
              let a13 = bX(b11, f3.locales, f3.defaultLocale);
              a13 && (e3 = a13);
            }
            return e3 || (e3 = f3.defaultLocale), { locale: e3, domain: f3 };
          }(b10, c2, d2, f2) : { locale: bZ(b10, c2, d2, f2) }), i2 = g2 ? g2.defaultLocale === h2 : h2 === b10.defaultLocale, j2 = b10.domains?.filter((a12) => bL(h2, a12)) || [], k2 = null != b10.domains && !g2;
          function l2(b11) {
            var c3;
            let d3 = new URL(b11, a11.url);
            a11.nextUrl.basePath && (c3 = d3.pathname, d3.pathname = bw(a11.nextUrl.basePath + c3));
            let e3 = new Headers(a11.headers);
            return e3.set(bs, h2), bw(a11.nextUrl.pathname) !== bw(d3.pathname) ? T.rewrite(d3, { request: { headers: e3 } }) : T.next({ request: { headers: e3 } });
          }
          function m2(c3, d3) {
            var e3;
            let f3 = new URL(c3, a11.url);
            if (f3.pathname = bw(f3.pathname), j2.length > 0 && !d3 && g2) {
              let a12 = bM(g2, h2, j2);
              a12 && (d3 = a12.domain, a12.defaultLocale === h2 && "as-needed" === b10.localePrefix.mode && (f3.pathname = bG(f3.pathname, b10.locales, b10.localePrefix)));
            }
            return d3 && (f3.host = d3, a11.headers.get("x-forwarded-host")) && (f3.protocol = a11.headers.get("x-forwarded-proto") ?? a11.nextUrl.protocol, f3.port = d3.split(":")[1] ?? a11.headers.get("x-forwarded-port") ?? ""), a11.nextUrl.basePath && (e3 = f3.pathname, f3.pathname = bw(a11.nextUrl.basePath + e3)), t2 = true, T.redirect(f3.toString());
          }
          let n2 = bG(f2, b10.locales, b10.localePrefix), o2 = bI(f2, b10.locales, b10.localePrefix, g2), p2 = null != o2, q2 = "never" === b10.localePrefix.mode || i2 && "as-needed" === b10.localePrefix.mode, r2, s2, t2, u2 = n2, v2 = b10.pathnames;
          if (v2) {
            let c3;
            if ([c3, s2] = function(a12, b11, c4) {
              for (let d3 of Object.keys(a12).sort(bD)) {
                let e3 = a12[d3];
                if ("string" == typeof e3) {
                  if (bx(e3, b11)) return [void 0, d3];
                } else {
                  let f3 = Object.entries(e3), g3 = f3.findIndex(([a13]) => a13 === c4);
                  for (let [c5] of (g3 > 0 && f3.unshift(f3.splice(g3, 1)[0]), f3)) if (bx(bv(a12[d3], c5, d3), b11)) return [c5, d3];
                }
              }
              for (let c5 of Object.keys(a12)) if (bx(c5, b11)) return [void 0, c5];
              return [void 0, void 0];
            }(v2, n2, h2), s2) {
              let d3 = v2[s2], e3 = bv(d3, h2, s2);
              if (bx(e3, n2)) u2 = bF(n2, e3, s2);
              else {
                let f3;
                f3 = c3 ? bv(d3, c3, s2) : s2;
                let g3 = q2 ? void 0 : by(h2, b10.localePrefix);
                r2 = m2(bJ(bF(n2, f3, e3), g3, a11.nextUrl.search));
              }
            }
          }
          if (!r2) if ("/" !== u2 || p2) {
            let c3 = bJ(u2, `/${h2}`, a11.nextUrl.search);
            if (p2) {
              let d3 = bJ(n2, o2.prefix, a11.nextUrl.search);
              if ("never" === b10.localePrefix.mode) r2 = m2(bJ(n2, void 0, a11.nextUrl.search));
              else if (o2.exact) if (i2 && q2) r2 = m2(bJ(n2, void 0, a11.nextUrl.search));
              else if (b10.domains) {
                let a12 = bM(g2, o2.locale, j2);
                r2 = g2?.domain === a12?.domain || k2 ? l2(c3) : m2(d3, a12?.domain);
              } else r2 = l2(c3);
              else r2 = m2(d3);
            } else r2 = q2 ? l2(c3) : m2(bJ(n2, by(h2, b10.localePrefix), a11.nextUrl.search));
          } else r2 = q2 ? l2(bJ(u2, `/${h2}`, a11.nextUrl.search)) : m2(bJ(n2, by(h2, b10.localePrefix), a11.nextUrl.search));
          return function(a12, b11, c3, d3, e3) {
            if (!d3.localeCookie) return;
            let { name: f3, ...g3 } = d3.localeCookie, h3 = bX(a12.headers, e3?.locales || d3.locales, d3.defaultLocale), i3 = a12.cookies.has(f3), j3 = i3 && a12.cookies.get(f3)?.value !== c3;
            (i3 ? j3 : h3 !== c3) && b11.cookies.set(f3, c3, { path: a12.nextUrl.basePath || void 0, ...g3 });
          }(a11, r2, h2, b10, g2), !t2 && "never" !== b10.localePrefix.mode && b10.alternateLinks && b10.locales.length > 1 && r2.headers.set("Link", function({ internalTemplateName: a12, localizedPathnames: b11, request: c3, resolvedLocale: d3, routing: e3 }) {
            let f3 = c3.nextUrl.clone(), g3 = bK(c3.headers);
            function h3(a13, b12) {
              var d4;
              return a13.pathname = bw(a13.pathname), c3.nextUrl.basePath && ((a13 = new URL(a13)).pathname = (d4 = a13.pathname, bw(c3.nextUrl.basePath + d4))), `<${a13.toString()}>; rel="alternate"; hreflang="${b12}"`;
            }
            function i3(c4, e4) {
              return b11 && "object" == typeof b11 ? bF(c4, b11[d3] ?? a12, b11[e4] ?? a12) : c4;
            }
            g3 && (f3.port = "", f3.host = g3), f3.protocol = c3.headers.get("x-forwarded-proto") ?? f3.protocol, f3.pathname = bG(f3.pathname, e3.locales, e3.localePrefix);
            let j3 = bH(e3.locales, e3.localePrefix, false).flatMap(([a13, c4]) => {
              let d4;
              function g4(a14) {
                return "/" === a14 ? c4 : c4 + a14;
              }
              if (e3.domains) return e3.domains.filter((b12) => bL(a13, b12)).map((b12) => ((d4 = new URL(f3)).port = "", d4.host = b12.domain, d4.pathname = i3(f3.pathname, a13), a13 === b12.defaultLocale && "always" !== e3.localePrefix.mode || (d4.pathname = g4(d4.pathname)), h3(d4, a13)));
              {
                let c5;
                c5 = b11 && "object" == typeof b11 ? i3(f3.pathname, a13) : f3.pathname, a13 === e3.defaultLocale && "always" !== e3.localePrefix.mode || (c5 = g4(c5)), d4 = new URL(c5, f3);
              }
              return h3(d4, a13);
            });
            if (!e3.domains || 0 === e3.domains.length) {
              let a13 = i3(f3.pathname, e3.defaultLocale);
              if (a13) {
                let b12 = new URL(a13, f3);
                j3.push(h3(b12, "x-default"));
              }
            }
            return j3.join(", ");
          }({ routing: b10, internalTemplateName: s2, localizedPathnames: null != s2 && v2 ? v2[s2] : void 0, request: a11, resolvedLocale: h2 })), r2;
        };
      }(cB), cH = { matcher: ["/", "/((?!api|studio|_next|_vercel|.*\\..*).*)"] };
      c(747);
      let cI = { ...g }, cJ = cI.middleware || cI.default, cK = "/middleware";
      if ("function" != typeof cJ) throw Object.defineProperty(Error(`The Middleware "${cK}" must export a \`middleware\` or a \`default\` function`), "__NEXT_ERROR_CODE", { value: "E120", enumerable: false, configurable: true });
      function cL(a10) {
        return bc({ ...a10, page: cK, handler: async (...a11) => {
          try {
            return await cJ(...a11);
          } catch (e2) {
            let b10 = a11[0], c2 = new URL(b10.url), d2 = c2.pathname + c2.search;
            throw await k(e2, { path: d2, method: b10.method, headers: Object.fromEntries(b10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), e2;
          }
        } });
      }
    }, 149: (a, b, c) => {
      "use strict";
      a.exports = c(863);
    }, 159: (a, b, c) => {
      "use strict";
      c.d(b, { F: () => e, h: () => f });
      let d = "DYNAMIC_SERVER_USAGE";
      class e extends Error {
        constructor(a2) {
          super("Dynamic server usage: " + a2), this.description = a2, this.digest = d;
        }
      }
      function f(a2) {
        return "object" == typeof a2 && null !== a2 && "digest" in a2 && "string" == typeof a2.digest && a2.digest === d;
      }
    }, 165: (a, b, c) => {
      "use strict";
      var d = c(356).Buffer;
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { handleFetch: function() {
        return h;
      }, interceptFetch: function() {
        return i;
      }, reader: function() {
        return f;
      } });
      let e = c(392), f = { url: (a2) => a2.url, header: (a2, b2) => a2.headers.get(b2) };
      async function g(a2, b2) {
        let { url: c2, method: e2, headers: f2, body: g2, cache: h2, credentials: i2, integrity: j, mode: k, redirect: l, referrer: m, referrerPolicy: n } = b2;
        return { testData: a2, api: "fetch", request: { url: c2, method: e2, headers: [...Array.from(f2), ["next-test-stack", function() {
          let a3 = (Error().stack ?? "").split("\n");
          for (let b3 = 1; b3 < a3.length; b3++) if (a3[b3].length > 0) {
            a3 = a3.slice(b3);
            break;
          }
          return (a3 = (a3 = (a3 = a3.filter((a4) => !a4.includes("/next/dist/"))).slice(0, 5)).map((a4) => a4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: g2 ? d.from(await b2.arrayBuffer()).toString("base64") : null, cache: h2, credentials: i2, integrity: j, mode: k, redirect: l, referrer: m, referrerPolicy: n } };
      }
      async function h(a2, b2) {
        let c2 = (0, e.getTestReqInfo)(b2, f);
        if (!c2) return a2(b2);
        let { testData: h2, proxyPort: i2 } = c2, j = await g(h2, b2), k = await a2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(j), next: { internal: true } });
        if (!k.ok) throw Object.defineProperty(Error(`Proxy request failed: ${k.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let l = await k.json(), { api: m } = l;
        switch (m) {
          case "continue":
            return a2(b2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${b2.method} ${b2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            let { status: n, headers: o, body: p } = l.response;
            return new Response(p ? d.from(p, "base64") : null, { status: n, headers: new Headers(o) });
          default:
            return m;
        }
      }
      function i(a2) {
        return c.g.fetch = function(b2, c2) {
          var d2;
          return (null == c2 || null == (d2 = c2.next) ? void 0 : d2.internal) ? a2(b2, c2) : h(a2, new Request(b2, c2));
        }, () => {
          c.g.fetch = a2;
        };
      }
    }, 194: (a) => {
      "use strict";
      a.exports = c, a.exports.preferredCharsets = c;
      var b = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function c(a2, c2) {
        var g = function(a3) {
          for (var c3 = a3.split(","), d2 = 0, e2 = 0; d2 < c3.length; d2++) {
            var f2 = function(a4, c4) {
              var d3 = b.exec(a4);
              if (!d3) return null;
              var e3 = d3[1], f3 = 1;
              if (d3[2]) for (var g2 = d3[2].split(";"), h2 = 0; h2 < g2.length; h2++) {
                var i = g2[h2].trim().split("=");
                if ("q" === i[0]) {
                  f3 = parseFloat(i[1]);
                  break;
                }
              }
              return { charset: e3, q: f3, i: c4 };
            }(c3[d2].trim(), d2);
            f2 && (c3[e2++] = f2);
          }
          return c3.length = e2, c3;
        }(void 0 === a2 ? "*" : a2 || "");
        if (!c2) return g.filter(f).sort(d).map(e);
        var h = c2.map(function(a3, b2) {
          for (var c3 = { o: -1, q: 0, s: 0 }, d2 = 0; d2 < g.length; d2++) {
            var e2 = function(a4, b3, c4) {
              var d3 = 0;
              if (b3.charset.toLowerCase() === a4.toLowerCase()) d3 |= 1;
              else if ("*" !== b3.charset) return null;
              return { i: c4, o: b3.i, q: b3.q, s: d3 };
            }(a3, g[d2], b2);
            e2 && 0 > (c3.s - e2.s || c3.q - e2.q || c3.o - e2.o) && (c3 = e2);
          }
          return c3;
        });
        return h.filter(f).sort(d).map(function(a3) {
          return c2[h.indexOf(a3)];
        });
      }
      function d(a2, b2) {
        return b2.q - a2.q || b2.s - a2.s || a2.o - b2.o || a2.i - b2.i || 0;
      }
      function e(a2) {
        return a2.charset;
      }
      function f(a2) {
        return a2.q > 0;
      }
    }, 213: (a) => {
      (() => {
        "use strict";
        var b = { 993: (a2) => {
          var b2 = Object.prototype.hasOwnProperty, c2 = "~";
          function d2() {
          }
          function e2(a3, b3, c3) {
            this.fn = a3, this.context = b3, this.once = c3 || false;
          }
          function f(a3, b3, d3, f2, g2) {
            if ("function" != typeof d3) throw TypeError("The listener must be a function");
            var h2 = new e2(d3, f2 || a3, g2), i = c2 ? c2 + b3 : b3;
            return a3._events[i] ? a3._events[i].fn ? a3._events[i] = [a3._events[i], h2] : a3._events[i].push(h2) : (a3._events[i] = h2, a3._eventsCount++), a3;
          }
          function g(a3, b3) {
            0 == --a3._eventsCount ? a3._events = new d2() : delete a3._events[b3];
          }
          function h() {
            this._events = new d2(), this._eventsCount = 0;
          }
          Object.create && (d2.prototype = /* @__PURE__ */ Object.create(null), new d2().__proto__ || (c2 = false)), h.prototype.eventNames = function() {
            var a3, d3, e3 = [];
            if (0 === this._eventsCount) return e3;
            for (d3 in a3 = this._events) b2.call(a3, d3) && e3.push(c2 ? d3.slice(1) : d3);
            return Object.getOwnPropertySymbols ? e3.concat(Object.getOwnPropertySymbols(a3)) : e3;
          }, h.prototype.listeners = function(a3) {
            var b3 = c2 ? c2 + a3 : a3, d3 = this._events[b3];
            if (!d3) return [];
            if (d3.fn) return [d3.fn];
            for (var e3 = 0, f2 = d3.length, g2 = Array(f2); e3 < f2; e3++) g2[e3] = d3[e3].fn;
            return g2;
          }, h.prototype.listenerCount = function(a3) {
            var b3 = c2 ? c2 + a3 : a3, d3 = this._events[b3];
            return d3 ? d3.fn ? 1 : d3.length : 0;
          }, h.prototype.emit = function(a3, b3, d3, e3, f2, g2) {
            var h2 = c2 ? c2 + a3 : a3;
            if (!this._events[h2]) return false;
            var i, j, k = this._events[h2], l = arguments.length;
            if (k.fn) {
              switch (k.once && this.removeListener(a3, k.fn, void 0, true), l) {
                case 1:
                  return k.fn.call(k.context), true;
                case 2:
                  return k.fn.call(k.context, b3), true;
                case 3:
                  return k.fn.call(k.context, b3, d3), true;
                case 4:
                  return k.fn.call(k.context, b3, d3, e3), true;
                case 5:
                  return k.fn.call(k.context, b3, d3, e3, f2), true;
                case 6:
                  return k.fn.call(k.context, b3, d3, e3, f2, g2), true;
              }
              for (j = 1, i = Array(l - 1); j < l; j++) i[j - 1] = arguments[j];
              k.fn.apply(k.context, i);
            } else {
              var m, n = k.length;
              for (j = 0; j < n; j++) switch (k[j].once && this.removeListener(a3, k[j].fn, void 0, true), l) {
                case 1:
                  k[j].fn.call(k[j].context);
                  break;
                case 2:
                  k[j].fn.call(k[j].context, b3);
                  break;
                case 3:
                  k[j].fn.call(k[j].context, b3, d3);
                  break;
                case 4:
                  k[j].fn.call(k[j].context, b3, d3, e3);
                  break;
                default:
                  if (!i) for (m = 1, i = Array(l - 1); m < l; m++) i[m - 1] = arguments[m];
                  k[j].fn.apply(k[j].context, i);
              }
            }
            return true;
          }, h.prototype.on = function(a3, b3, c3) {
            return f(this, a3, b3, c3, false);
          }, h.prototype.once = function(a3, b3, c3) {
            return f(this, a3, b3, c3, true);
          }, h.prototype.removeListener = function(a3, b3, d3, e3) {
            var f2 = c2 ? c2 + a3 : a3;
            if (!this._events[f2]) return this;
            if (!b3) return g(this, f2), this;
            var h2 = this._events[f2];
            if (h2.fn) h2.fn !== b3 || e3 && !h2.once || d3 && h2.context !== d3 || g(this, f2);
            else {
              for (var i = 0, j = [], k = h2.length; i < k; i++) (h2[i].fn !== b3 || e3 && !h2[i].once || d3 && h2[i].context !== d3) && j.push(h2[i]);
              j.length ? this._events[f2] = 1 === j.length ? j[0] : j : g(this, f2);
            }
            return this;
          }, h.prototype.removeAllListeners = function(a3) {
            var b3;
            return a3 ? (b3 = c2 ? c2 + a3 : a3, this._events[b3] && g(this, b3)) : (this._events = new d2(), this._eventsCount = 0), this;
          }, h.prototype.off = h.prototype.removeListener, h.prototype.addListener = h.prototype.on, h.prefixed = c2, h.EventEmitter = h, a2.exports = h;
        }, 213: (a2) => {
          a2.exports = (a3, b2) => (b2 = b2 || (() => {
          }), a3.then((a4) => new Promise((a5) => {
            a5(b2());
          }).then(() => a4), (a4) => new Promise((a5) => {
            a5(b2());
          }).then(() => {
            throw a4;
          })));
        }, 574: (a2, b2) => {
          Object.defineProperty(b2, "__esModule", { value: true }), b2.default = function(a3, b3, c2) {
            let d2 = 0, e2 = a3.length;
            for (; e2 > 0; ) {
              let f = e2 / 2 | 0, g = d2 + f;
              0 >= c2(a3[g], b3) ? (d2 = ++g, e2 -= f + 1) : e2 = f;
            }
            return d2;
          };
        }, 821: (a2, b2, c2) => {
          Object.defineProperty(b2, "__esModule", { value: true });
          let d2 = c2(574);
          class e2 {
            constructor() {
              this._queue = [];
            }
            enqueue(a3, b3) {
              let c3 = { priority: (b3 = Object.assign({ priority: 0 }, b3)).priority, run: a3 };
              if (this.size && this._queue[this.size - 1].priority >= b3.priority) return void this._queue.push(c3);
              let e3 = d2.default(this._queue, c3, (a4, b4) => b4.priority - a4.priority);
              this._queue.splice(e3, 0, c3);
            }
            dequeue() {
              let a3 = this._queue.shift();
              return null == a3 ? void 0 : a3.run;
            }
            filter(a3) {
              return this._queue.filter((b3) => b3.priority === a3.priority).map((a4) => a4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          b2.default = e2;
        }, 816: (a2, b2, c2) => {
          let d2 = c2(213);
          class e2 extends Error {
            constructor(a3) {
              super(a3), this.name = "TimeoutError";
            }
          }
          let f = (a3, b3, c3) => new Promise((f2, g) => {
            if ("number" != typeof b3 || b3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (b3 === 1 / 0) return void f2(a3);
            let h = setTimeout(() => {
              if ("function" == typeof c3) {
                try {
                  f2(c3());
                } catch (a4) {
                  g(a4);
                }
                return;
              }
              let d3 = "string" == typeof c3 ? c3 : `Promise timed out after ${b3} milliseconds`, h2 = c3 instanceof Error ? c3 : new e2(d3);
              "function" == typeof a3.cancel && a3.cancel(), g(h2);
            }, b3);
            d2(a3.then(f2, g), () => {
              clearTimeout(h);
            });
          });
          a2.exports = f, a2.exports.default = f, a2.exports.TimeoutError = e2;
        } }, c = {};
        function d(a2) {
          var e2 = c[a2];
          if (void 0 !== e2) return e2.exports;
          var f = c[a2] = { exports: {} }, g = true;
          try {
            b[a2](f, f.exports, d), g = false;
          } finally {
            g && delete c[a2];
          }
          return f.exports;
        }
        d.ab = "//";
        var e = {};
        (() => {
          Object.defineProperty(e, "__esModule", { value: true });
          let a2 = d(993), b2 = d(816), c2 = d(821), f = () => {
          }, g = new b2.TimeoutError();
          class h extends a2 {
            constructor(a3) {
              var b3, d2, e2, g2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = f, this._resolveIdle = f, !("number" == typeof (a3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: c2.default }, a3)).intervalCap && a3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (d2 = null == (b3 = a3.intervalCap) ? void 0 : b3.toString()) ? d2 : ""}\` (${typeof a3.intervalCap})`);
              if (void 0 === a3.interval || !(Number.isFinite(a3.interval) && a3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (g2 = null == (e2 = a3.interval) ? void 0 : e2.toString()) ? g2 : ""}\` (${typeof a3.interval})`);
              this._carryoverConcurrencyCount = a3.carryoverConcurrencyCount, this._isIntervalIgnored = a3.intervalCap === 1 / 0 || 0 === a3.interval, this._intervalCap = a3.intervalCap, this._interval = a3.interval, this._queue = new a3.queueClass(), this._queueClass = a3.queueClass, this.concurrency = a3.concurrency, this._timeout = a3.timeout, this._throwOnTimeout = true === a3.throwOnTimeout, this._isPaused = false === a3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = f, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = f, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let a3 = Date.now();
              if (void 0 === this._intervalId) {
                let b3 = this._intervalEnd - a3;
                if (!(b3 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                  this._onResumeInterval();
                }, b3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let a3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let b3 = this._queue.dequeue();
                  return !!b3 && (this.emit("active"), b3(), a3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); ) ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(a3) {
              if (!("number" == typeof a3 && a3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${a3}\` (${typeof a3})`);
              this._concurrency = a3, this._processQueue();
            }
            async add(a3, c3 = {}) {
              return new Promise((d2, e2) => {
                let f2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let f3 = void 0 === this._timeout && void 0 === c3.timeout ? a3() : b2.default(Promise.resolve(a3()), void 0 === c3.timeout ? this._timeout : c3.timeout, () => {
                      (void 0 === c3.throwOnTimeout ? this._throwOnTimeout : c3.throwOnTimeout) && e2(g);
                    });
                    d2(await f3);
                  } catch (a4) {
                    e2(a4);
                  }
                  this._next();
                };
                this._queue.enqueue(f2, c3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(a3, b3) {
              return Promise.all(a3.map(async (a4) => this.add(a4, b3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size) return new Promise((a3) => {
                let b3 = this._resolveEmpty;
                this._resolveEmpty = () => {
                  b3(), a3();
                };
              });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((a3) => {
                let b3 = this._resolveIdle;
                this._resolveIdle = () => {
                  b3(), a3();
                };
              });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(a3) {
              return this._queue.filter(a3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(a3) {
              this._timeout = a3;
            }
          }
          e.default = h;
        })(), a.exports = e;
      })();
    }, 238: (a) => {
      "use strict";
      a.exports = d, a.exports.preferredMediaTypes = d;
      var b = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
      function c(a2, c2) {
        var d2 = b.exec(a2);
        if (!d2) return null;
        var e2 = /* @__PURE__ */ Object.create(null), f2 = 1, g2 = d2[2], j = d2[1];
        if (d2[3]) for (var k = function(a3) {
          for (var b2 = a3.split(";"), c3 = 1, d3 = 0; c3 < b2.length; c3++) h(b2[d3]) % 2 == 0 ? b2[++d3] = b2[c3] : b2[d3] += ";" + b2[c3];
          b2.length = d3 + 1;
          for (var c3 = 0; c3 < b2.length; c3++) b2[c3] = b2[c3].trim();
          return b2;
        }(d2[3]).map(i), l = 0; l < k.length; l++) {
          var m = k[l], n = m[0].toLowerCase(), o = m[1], p = o && '"' === o[0] && '"' === o[o.length - 1] ? o.slice(1, -1) : o;
          if ("q" === n) {
            f2 = parseFloat(p);
            break;
          }
          e2[n] = p;
        }
        return { type: j, subtype: g2, params: e2, q: f2, i: c2 };
      }
      function d(a2, b2) {
        var d2 = function(a3) {
          for (var b3 = function(a4) {
            for (var b4 = a4.split(","), c2 = 1, d4 = 0; c2 < b4.length; c2++) h(b4[d4]) % 2 == 0 ? b4[++d4] = b4[c2] : b4[d4] += "," + b4[c2];
            return b4.length = d4 + 1, b4;
          }(a3), d3 = 0, e2 = 0; d3 < b3.length; d3++) {
            var f2 = c(b3[d3].trim(), d3);
            f2 && (b3[e2++] = f2);
          }
          return b3.length = e2, b3;
        }(void 0 === a2 ? "*/*" : a2 || "");
        if (!b2) return d2.filter(g).sort(e).map(f);
        var i2 = b2.map(function(a3, b3) {
          for (var e2 = { o: -1, q: 0, s: 0 }, f2 = 0; f2 < d2.length; f2++) {
            var g2 = function(a4, b4, d3) {
              var e3 = c(a4), f3 = 0;
              if (!e3) return null;
              if (b4.type.toLowerCase() == e3.type.toLowerCase()) f3 |= 4;
              else if ("*" != b4.type) return null;
              if (b4.subtype.toLowerCase() == e3.subtype.toLowerCase()) f3 |= 2;
              else if ("*" != b4.subtype) return null;
              var g3 = Object.keys(b4.params);
              if (g3.length > 0) if (!g3.every(function(a5) {
                return "*" == b4.params[a5] || (b4.params[a5] || "").toLowerCase() == (e3.params[a5] || "").toLowerCase();
              })) return null;
              else f3 |= 1;
              return { i: d3, o: b4.i, q: b4.q, s: f3 };
            }(a3, d2[f2], b3);
            g2 && 0 > (e2.s - g2.s || e2.q - g2.q || e2.o - g2.o) && (e2 = g2);
          }
          return e2;
        });
        return i2.filter(g).sort(e).map(function(a3) {
          return b2[i2.indexOf(a3)];
        });
      }
      function e(a2, b2) {
        return b2.q - a2.q || b2.s - a2.s || a2.o - b2.o || a2.i - b2.i || 0;
      }
      function f(a2) {
        return a2.type + "/" + a2.subtype;
      }
      function g(a2) {
        return a2.q > 0;
      }
      function h(a2) {
        for (var b2 = 0, c2 = 0; -1 !== (c2 = a2.indexOf('"', c2)); ) b2++, c2++;
        return b2;
      }
      function i(a2) {
        var b2, c2, d2 = a2.indexOf("=");
        return -1 === d2 ? b2 = a2 : (b2 = a2.slice(0, d2), c2 = a2.slice(d2 + 1)), [b2, c2];
      }
    }, 318: (a) => {
      "use strict";
      a.exports = JSON.parse('{"Header":{"logoAlt":"Aca Jankovic"},"Hero":{"title":"Premium Slot Iskustvo","subtitle":"Otkrijte ekskluzivne bonuse i turnire"},"MiddleBar":{"getBonus":"Pokupi bonuse","leaderboard":"Rang lista","tournaments":"Turniri","social":"Social"},"FeaturedGames":{"title":"Istaknute Igre","subtitle":"Do\u017Eivite vrhunsko kazino iskustvo","viewAll":"Prika\u017Ei Sve Igre","players":"Igra\u010Di","prize":"Nagradni Fond","hot":"VRELO"},"Tournaments":{"title":"Istaknuti Turnir","subtitle":"Pridru\u017Eite se vrhunskoj gaming konkurenciji","players":"Igra\u010Di","buyIn":"Ulaznica","winner":"Pobednik","tableType":"Tip Stola","endsIn":"Turnir se zavr\u0161ava za","days":"Dana","hours":"Sati","minutes":"Min","seconds":"Sek","joinTournament":"Pridru\u017Ei Se Turniru","ended":"Turnir Zavr\u0161en"},"Footer":{"joinCommunity":"Pridru\u017Eite Se Na\u0161oj Zajednici","communitySubtitle":"Pove\u017Eite se sa drugim igra\u010Dima i budite u toku sa najnovijim vestima","kick":"Kick","instagram":"Instagram","telegram":"Telegram","discord":"Discord","copyright":"Sva prava zadr\u017Eana","privacy":"Politika Privatnosti","terms":"Uslovi Kori\u0161\u0107enja","support":"Podr\u0161ka","disclaimer":"Igrajte odgovorno. Morate imati 18+ godina da biste u\u010Destvovali."},"Leaderboard":{"defaultTitle":"\u{1F3C6} Turnir Najboljih Gledalaca","defaultSubtitle":"Najposve\u0107eniji gledaoci Ace Jankovi\u0107a \u2022 Redovno a\u017Eurirano","prizesTitle":"Nagrade Turnira","leaderboardTitle":"Top 10 Rang Lista","error":"Gre\u0161ka","errorMessage":"Neuspe\u0161no u\u010Ditavanje podataka rang liste. Poku\u0161ajte ponovo kasnije.","noEntries":"Jo\u0161 nema unosa na rang listi. Proverite uskoro!","howToWinTitle":"Kako Osvojiti Nagrade","howToWinText1":"Gledajte","howToWinText1Bold":"Acu Jankovi\u0107a","howToWinText1Rest":"u\u017Eivo na","howToWinText1Kick":"Kicku","howToWinText1End":"da biste zara\u0111ivali vreme gledanja","howToWinText2":"Top","howToWinText2Bold":"10 gledalaca","howToWinText2Rest":"sa najvi\u0161e vremena gledanja \u0107e osvojiti ekskluzivne nagrade na osnovu njihovog ranga","howToWinText3":"Nastavite da gledate kako biste se popeli na rang listi i osvojili neverovatne nagrade!","watchButton":"Gledaj Acu na Kicku","exclusivePrizesTitle":"Ekskluzivne Nagrade","exclusivePrizesSubtitle":"Top 4 gledaoca \u0107e dobiti ove neverovatne nagrade","wantToSeeYourName":"\u017Delite li da vidite svoje ime ovde?"}}');
    }, 340: (a, b, c) => {
      "use strict";
      function d(a2) {
        return "object" == typeof a2 && null !== a2 && "digest" in a2 && "BAILOUT_TO_CLIENT_SIDE_RENDERING" === a2.digest;
      }
      c.d(b, { C: () => d });
    }, 356: (a) => {
      "use strict";
      a.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 366: (a, b, c) => {
      "use strict";
      var d = c(194), e = c(931), f = c(862), g = c(238);
      function h(a2) {
        if (!(this instanceof h)) return new h(a2);
        this.request = a2;
      }
      a.exports = h, a.exports.Negotiator = h, h.prototype.charset = function(a2) {
        var b2 = this.charsets(a2);
        return b2 && b2[0];
      }, h.prototype.charsets = function(a2) {
        return d(this.request.headers["accept-charset"], a2);
      }, h.prototype.encoding = function(a2, b2) {
        var c2 = this.encodings(a2, b2);
        return c2 && c2[0];
      }, h.prototype.encodings = function(a2, b2) {
        return e(this.request.headers["accept-encoding"], a2, (b2 || {}).preferred);
      }, h.prototype.language = function(a2) {
        var b2 = this.languages(a2);
        return b2 && b2[0];
      }, h.prototype.languages = function(a2) {
        return f(this.request.headers["accept-language"], a2);
      }, h.prototype.mediaType = function(a2) {
        var b2 = this.mediaTypes(a2);
        return b2 && b2[0];
      }, h.prototype.mediaTypes = function(a2) {
        return g(this.request.headers.accept, a2);
      }, h.prototype.preferredCharset = h.prototype.charset, h.prototype.preferredCharsets = h.prototype.charsets, h.prototype.preferredEncoding = h.prototype.encoding, h.prototype.preferredEncodings = h.prototype.encodings, h.prototype.preferredLanguage = h.prototype.language, h.prototype.preferredLanguages = h.prototype.languages, h.prototype.preferredMediaType = h.prototype.mediaType, h.prototype.preferredMediaTypes = h.prototype.mediaTypes;
    }, 378: (a, b, c) => {
      "use strict";
      c.d(b, { Q: () => d });
      var d = function(a2) {
        return a2[a2.SeeOther = 303] = "SeeOther", a2[a2.TemporaryRedirect = 307] = "TemporaryRedirect", a2[a2.PermanentRedirect = 308] = "PermanentRedirect", a2;
      }({});
    }, 379: (a, b, c) => {
      "use strict";
      c.d(b, { J: () => d });
      let d = (0, c(58).xl)();
    }, 392: (a, b, c) => {
      "use strict";
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { getTestReqInfo: function() {
        return g;
      }, withRequest: function() {
        return f;
      } });
      let d = new (c(521)).AsyncLocalStorage();
      function e(a2, b2) {
        let c2 = b2.header(a2, "next-test-proxy-port");
        if (!c2) return;
        let d2 = b2.url(a2);
        return { url: d2, proxyPort: Number(c2), testData: b2.header(a2, "next-test-data") || "" };
      }
      function f(a2, b2, c2) {
        let f2 = e(a2, b2);
        return f2 ? d.run(f2, c2) : c2();
      }
      function g(a2, b2) {
        let c2 = d.getStore();
        return c2 || (a2 && b2 ? e(a2, b2) : void 0);
      }
    }, 440: (a, b) => {
      "use strict";
      var c = { H: null, A: null };
      function d(a2) {
        var b2 = "https://react.dev/errors/" + a2;
        if (1 < arguments.length) {
          b2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var c2 = 2; c2 < arguments.length; c2++) b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
        }
        return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var e = Array.isArray;
      function f() {
      }
      var g = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.memo"), o = Symbol.for("react.lazy"), p = Symbol.iterator, q = Object.prototype.hasOwnProperty, r = Object.assign;
      function s(a2, b2, c2) {
        var d2 = c2.ref;
        return { $$typeof: g, type: a2, key: b2, ref: void 0 !== d2 ? d2 : null, props: c2 };
      }
      function t(a2) {
        return "object" == typeof a2 && null !== a2 && a2.$$typeof === g;
      }
      var u = /\/+/g;
      function v(a2, b2) {
        var c2, d2;
        return "object" == typeof a2 && null !== a2 && null != a2.key ? (c2 = "" + a2.key, d2 = { "=": "=0", ":": "=2" }, "$" + c2.replace(/[=:]/g, function(a3) {
          return d2[a3];
        })) : b2.toString(36);
      }
      function w(a2, b2, c2) {
        if (null == a2) return a2;
        var i2 = [], j2 = 0;
        return !function a3(b3, c3, i3, j3, k2) {
          var l2, m2, n2, q2 = typeof b3;
          ("undefined" === q2 || "boolean" === q2) && (b3 = null);
          var r2 = false;
          if (null === b3) r2 = true;
          else switch (q2) {
            case "bigint":
            case "string":
            case "number":
              r2 = true;
              break;
            case "object":
              switch (b3.$$typeof) {
                case g:
                case h:
                  r2 = true;
                  break;
                case o:
                  return a3((r2 = b3._init)(b3._payload), c3, i3, j3, k2);
              }
          }
          if (r2) return k2 = k2(b3), r2 = "" === j3 ? "." + v(b3, 0) : j3, e(k2) ? (i3 = "", null != r2 && (i3 = r2.replace(u, "$&/") + "/"), a3(k2, c3, i3, "", function(a4) {
            return a4;
          })) : null != k2 && (t(k2) && (l2 = k2, m2 = i3 + (null == k2.key || b3 && b3.key === k2.key ? "" : ("" + k2.key).replace(u, "$&/") + "/") + r2, k2 = s(l2.type, m2, l2.props)), c3.push(k2)), 1;
          r2 = 0;
          var w2 = "" === j3 ? "." : j3 + ":";
          if (e(b3)) for (var x2 = 0; x2 < b3.length; x2++) q2 = w2 + v(j3 = b3[x2], x2), r2 += a3(j3, c3, i3, q2, k2);
          else if ("function" == typeof (x2 = null === (n2 = b3) || "object" != typeof n2 ? null : "function" == typeof (n2 = p && n2[p] || n2["@@iterator"]) ? n2 : null)) for (b3 = x2.call(b3), x2 = 0; !(j3 = b3.next()).done; ) q2 = w2 + v(j3 = j3.value, x2++), r2 += a3(j3, c3, i3, q2, k2);
          else if ("object" === q2) {
            if ("function" == typeof b3.then) return a3(function(a4) {
              switch (a4.status) {
                case "fulfilled":
                  return a4.value;
                case "rejected":
                  throw a4.reason;
                default:
                  switch ("string" == typeof a4.status ? a4.then(f, f) : (a4.status = "pending", a4.then(function(b4) {
                    "pending" === a4.status && (a4.status = "fulfilled", a4.value = b4);
                  }, function(b4) {
                    "pending" === a4.status && (a4.status = "rejected", a4.reason = b4);
                  })), a4.status) {
                    case "fulfilled":
                      return a4.value;
                    case "rejected":
                      throw a4.reason;
                  }
              }
              throw a4;
            }(b3), c3, i3, j3, k2);
            throw Error(d(31, "[object Object]" === (c3 = String(b3)) ? "object with keys {" + Object.keys(b3).join(", ") + "}" : c3));
          }
          return r2;
        }(a2, i2, "", "", function(a3) {
          return b2.call(c2, a3, j2++);
        }), i2;
      }
      function x(a2) {
        if (-1 === a2._status) {
          var b2 = a2._result;
          (b2 = b2()).then(function(b3) {
            (0 === a2._status || -1 === a2._status) && (a2._status = 1, a2._result = b3);
          }, function(b3) {
            (0 === a2._status || -1 === a2._status) && (a2._status = 2, a2._result = b3);
          }), -1 === a2._status && (a2._status = 0, a2._result = b2);
        }
        if (1 === a2._status) return a2._result.default;
        throw a2._result;
      }
      function y() {
        return /* @__PURE__ */ new WeakMap();
      }
      function z() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      b.Children = { map: w, forEach: function(a2, b2, c2) {
        w(a2, function() {
          b2.apply(this, arguments);
        }, c2);
      }, count: function(a2) {
        var b2 = 0;
        return w(a2, function() {
          b2++;
        }), b2;
      }, toArray: function(a2) {
        return w(a2, function(a3) {
          return a3;
        }) || [];
      }, only: function(a2) {
        if (!t(a2)) throw Error(d(143));
        return a2;
      } }, b.Fragment = i, b.Profiler = k, b.StrictMode = j, b.Suspense = m, b.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, b.cache = function(a2) {
        return function() {
          var b2 = c.A;
          if (!b2) return a2.apply(null, arguments);
          var d2 = b2.getCacheForType(y);
          void 0 === (b2 = d2.get(a2)) && (b2 = z(), d2.set(a2, b2)), d2 = 0;
          for (var e2 = arguments.length; d2 < e2; d2++) {
            var f2 = arguments[d2];
            if ("function" == typeof f2 || "object" == typeof f2 && null !== f2) {
              var g2 = b2.o;
              null === g2 && (b2.o = g2 = /* @__PURE__ */ new WeakMap()), void 0 === (b2 = g2.get(f2)) && (b2 = z(), g2.set(f2, b2));
            } else null === (g2 = b2.p) && (b2.p = g2 = /* @__PURE__ */ new Map()), void 0 === (b2 = g2.get(f2)) && (b2 = z(), g2.set(f2, b2));
          }
          if (1 === b2.s) return b2.v;
          if (2 === b2.s) throw b2.v;
          try {
            var h2 = a2.apply(null, arguments);
            return (d2 = b2).s = 1, d2.v = h2;
          } catch (a3) {
            throw (h2 = b2).s = 2, h2.v = a3, a3;
          }
        };
      }, b.cacheSignal = function() {
        var a2 = c.A;
        return a2 ? a2.cacheSignal() : null;
      }, b.captureOwnerStack = function() {
        return null;
      }, b.cloneElement = function(a2, b2, c2) {
        if (null == a2) throw Error(d(267, a2));
        var e2 = r({}, a2.props), f2 = a2.key;
        if (null != b2) for (g2 in void 0 !== b2.key && (f2 = "" + b2.key), b2) q.call(b2, g2) && "key" !== g2 && "__self" !== g2 && "__source" !== g2 && ("ref" !== g2 || void 0 !== b2.ref) && (e2[g2] = b2[g2]);
        var g2 = arguments.length - 2;
        if (1 === g2) e2.children = c2;
        else if (1 < g2) {
          for (var h2 = Array(g2), i2 = 0; i2 < g2; i2++) h2[i2] = arguments[i2 + 2];
          e2.children = h2;
        }
        return s(a2.type, f2, e2);
      }, b.createElement = function(a2, b2, c2) {
        var d2, e2 = {}, f2 = null;
        if (null != b2) for (d2 in void 0 !== b2.key && (f2 = "" + b2.key), b2) q.call(b2, d2) && "key" !== d2 && "__self" !== d2 && "__source" !== d2 && (e2[d2] = b2[d2]);
        var g2 = arguments.length - 2;
        if (1 === g2) e2.children = c2;
        else if (1 < g2) {
          for (var h2 = Array(g2), i2 = 0; i2 < g2; i2++) h2[i2] = arguments[i2 + 2];
          e2.children = h2;
        }
        if (a2 && a2.defaultProps) for (d2 in g2 = a2.defaultProps) void 0 === e2[d2] && (e2[d2] = g2[d2]);
        return s(a2, f2, e2);
      }, b.createRef = function() {
        return { current: null };
      }, b.forwardRef = function(a2) {
        return { $$typeof: l, render: a2 };
      }, b.isValidElement = t, b.lazy = function(a2) {
        return { $$typeof: o, _payload: { _status: -1, _result: a2 }, _init: x };
      }, b.memo = function(a2, b2) {
        return { $$typeof: n, type: a2, compare: void 0 === b2 ? null : b2 };
      }, b.use = function(a2) {
        return c.H.use(a2);
      }, b.useCallback = function(a2, b2) {
        return c.H.useCallback(a2, b2);
      }, b.useDebugValue = function() {
      }, b.useId = function() {
        return c.H.useId();
      }, b.useMemo = function(a2, b2) {
        return c.H.useMemo(a2, b2);
      }, b.version = "19.2.0-canary-0bdb9206-20250818";
    }, 443: (a) => {
      "use strict";
      var b = Object.defineProperty, c = Object.getOwnPropertyDescriptor, d = Object.getOwnPropertyNames, e = Object.prototype.hasOwnProperty, f = {};
      function g(a2) {
        var b2;
        let c2 = ["path" in a2 && a2.path && `Path=${a2.path}`, "expires" in a2 && (a2.expires || 0 === a2.expires) && `Expires=${("number" == typeof a2.expires ? new Date(a2.expires) : a2.expires).toUTCString()}`, "maxAge" in a2 && "number" == typeof a2.maxAge && `Max-Age=${a2.maxAge}`, "domain" in a2 && a2.domain && `Domain=${a2.domain}`, "secure" in a2 && a2.secure && "Secure", "httpOnly" in a2 && a2.httpOnly && "HttpOnly", "sameSite" in a2 && a2.sameSite && `SameSite=${a2.sameSite}`, "partitioned" in a2 && a2.partitioned && "Partitioned", "priority" in a2 && a2.priority && `Priority=${a2.priority}`].filter(Boolean), d2 = `${a2.name}=${encodeURIComponent(null != (b2 = a2.value) ? b2 : "")}`;
        return 0 === c2.length ? d2 : `${d2}; ${c2.join("; ")}`;
      }
      function h(a2) {
        let b2 = /* @__PURE__ */ new Map();
        for (let c2 of a2.split(/; */)) {
          if (!c2) continue;
          let a3 = c2.indexOf("=");
          if (-1 === a3) {
            b2.set(c2, "true");
            continue;
          }
          let [d2, e2] = [c2.slice(0, a3), c2.slice(a3 + 1)];
          try {
            b2.set(d2, decodeURIComponent(null != e2 ? e2 : "true"));
          } catch {
          }
        }
        return b2;
      }
      function i(a2) {
        if (!a2) return;
        let [[b2, c2], ...d2] = h(a2), { domain: e2, expires: f2, httponly: g2, maxage: i2, path: l2, samesite: m2, secure: n, partitioned: o, priority: p } = Object.fromEntries(d2.map(([a3, b3]) => [a3.toLowerCase().replace(/-/g, ""), b3]));
        {
          var q, r, s = { name: b2, value: decodeURIComponent(c2), domain: e2, ...f2 && { expires: new Date(f2) }, ...g2 && { httpOnly: true }, ..."string" == typeof i2 && { maxAge: Number(i2) }, path: l2, ...m2 && { sameSite: j.includes(q = (q = m2).toLowerCase()) ? q : void 0 }, ...n && { secure: true }, ...p && { priority: k.includes(r = (r = p).toLowerCase()) ? r : void 0 }, ...o && { partitioned: true } };
          let a3 = {};
          for (let b3 in s) s[b3] && (a3[b3] = s[b3]);
          return a3;
        }
      }
      ((a2, c2) => {
        for (var d2 in c2) b(a2, d2, { get: c2[d2], enumerable: true });
      })(f, { RequestCookies: () => l, ResponseCookies: () => m, parseCookie: () => h, parseSetCookie: () => i, stringifyCookie: () => g }), a.exports = ((a2, f2, g2, h2) => {
        if (f2 && "object" == typeof f2 || "function" == typeof f2) for (let i2 of d(f2)) e.call(a2, i2) || i2 === g2 || b(a2, i2, { get: () => f2[i2], enumerable: !(h2 = c(f2, i2)) || h2.enumerable });
        return a2;
      })(b({}, "__esModule", { value: true }), f);
      var j = ["strict", "lax", "none"], k = ["low", "medium", "high"], l = class {
        constructor(a2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = a2;
          let b2 = a2.get("cookie");
          if (b2) for (let [a3, c2] of h(b2)) this._parsed.set(a3, { name: a3, value: c2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...a2) {
          let b2 = "string" == typeof a2[0] ? a2[0] : a2[0].name;
          return this._parsed.get(b2);
        }
        getAll(...a2) {
          var b2;
          let c2 = Array.from(this._parsed);
          if (!a2.length) return c2.map(([a3, b3]) => b3);
          let d2 = "string" == typeof a2[0] ? a2[0] : null == (b2 = a2[0]) ? void 0 : b2.name;
          return c2.filter(([a3]) => a3 === d2).map(([a3, b3]) => b3);
        }
        has(a2) {
          return this._parsed.has(a2);
        }
        set(...a2) {
          let [b2, c2] = 1 === a2.length ? [a2[0].name, a2[0].value] : a2, d2 = this._parsed;
          return d2.set(b2, { name: b2, value: c2 }), this._headers.set("cookie", Array.from(d2).map(([a3, b3]) => g(b3)).join("; ")), this;
        }
        delete(a2) {
          let b2 = this._parsed, c2 = Array.isArray(a2) ? a2.map((a3) => b2.delete(a3)) : b2.delete(a2);
          return this._headers.set("cookie", Array.from(b2).map(([a3, b3]) => g(b3)).join("; ")), c2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((a2) => `${a2.name}=${encodeURIComponent(a2.value)}`).join("; ");
        }
      }, m = class {
        constructor(a2) {
          var b2, c2, d2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = a2;
          let e2 = null != (d2 = null != (c2 = null == (b2 = a2.getSetCookie) ? void 0 : b2.call(a2)) ? c2 : a2.get("set-cookie")) ? d2 : [];
          for (let a3 of Array.isArray(e2) ? e2 : function(a4) {
            if (!a4) return [];
            var b3, c3, d3, e3, f2, g2 = [], h2 = 0;
            function i2() {
              for (; h2 < a4.length && /\s/.test(a4.charAt(h2)); ) h2 += 1;
              return h2 < a4.length;
            }
            for (; h2 < a4.length; ) {
              for (b3 = h2, f2 = false; i2(); ) if ("," === (c3 = a4.charAt(h2))) {
                for (d3 = h2, h2 += 1, i2(), e3 = h2; h2 < a4.length && "=" !== (c3 = a4.charAt(h2)) && ";" !== c3 && "," !== c3; ) h2 += 1;
                h2 < a4.length && "=" === a4.charAt(h2) ? (f2 = true, h2 = e3, g2.push(a4.substring(b3, d3)), b3 = h2) : h2 = d3 + 1;
              } else h2 += 1;
              (!f2 || h2 >= a4.length) && g2.push(a4.substring(b3, a4.length));
            }
            return g2;
          }(e2)) {
            let b3 = i(a3);
            b3 && this._parsed.set(b3.name, b3);
          }
        }
        get(...a2) {
          let b2 = "string" == typeof a2[0] ? a2[0] : a2[0].name;
          return this._parsed.get(b2);
        }
        getAll(...a2) {
          var b2;
          let c2 = Array.from(this._parsed.values());
          if (!a2.length) return c2;
          let d2 = "string" == typeof a2[0] ? a2[0] : null == (b2 = a2[0]) ? void 0 : b2.name;
          return c2.filter((a3) => a3.name === d2);
        }
        has(a2) {
          return this._parsed.has(a2);
        }
        set(...a2) {
          let [b2, c2, d2] = 1 === a2.length ? [a2[0].name, a2[0].value, a2[0]] : a2, e2 = this._parsed;
          return e2.set(b2, function(a3 = { name: "", value: "" }) {
            return "number" == typeof a3.expires && (a3.expires = new Date(a3.expires)), a3.maxAge && (a3.expires = new Date(Date.now() + 1e3 * a3.maxAge)), (null === a3.path || void 0 === a3.path) && (a3.path = "/"), a3;
          }({ name: b2, value: c2, ...d2 })), function(a3, b3) {
            for (let [, c3] of (b3.delete("set-cookie"), a3)) {
              let a4 = g(c3);
              b3.append("set-cookie", a4);
            }
          }(e2, this._headers), this;
        }
        delete(...a2) {
          let [b2, c2] = "string" == typeof a2[0] ? [a2[0]] : [a2[0].name, a2[0]];
          return this.set({ ...c2, name: b2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(g).join("; ");
        }
      };
    }, 449: (a, b, c) => {
      var d;
      (() => {
        var e = { 226: function(e2, f2) {
          !function(g2, h) {
            "use strict";
            var i = "function", j = "undefined", k = "object", l = "string", m = "major", n = "model", o = "name", p = "type", q = "vendor", r = "version", s = "architecture", t = "console", u = "mobile", v = "tablet", w = "smarttv", x = "wearable", y = "embedded", z = "Amazon", A = "Apple", B = "ASUS", C = "BlackBerry", D = "Browser", E = "Chrome", F = "Firefox", G = "Google", H = "Huawei", I = "Microsoft", J = "Motorola", K = "Opera", L = "Samsung", M = "Sharp", N = "Sony", O = "Xiaomi", P = "Zebra", Q = "Facebook", R = "Chromium OS", S = "Mac OS", T = function(a2, b2) {
              var c2 = {};
              for (var d2 in a2) b2[d2] && b2[d2].length % 2 == 0 ? c2[d2] = b2[d2].concat(a2[d2]) : c2[d2] = a2[d2];
              return c2;
            }, U = function(a2) {
              for (var b2 = {}, c2 = 0; c2 < a2.length; c2++) b2[a2[c2].toUpperCase()] = a2[c2];
              return b2;
            }, V = function(a2, b2) {
              return typeof a2 === l && -1 !== W(b2).indexOf(W(a2));
            }, W = function(a2) {
              return a2.toLowerCase();
            }, X = function(a2, b2) {
              if (typeof a2 === l) return a2 = a2.replace(/^\s\s*/, ""), typeof b2 === j ? a2 : a2.substring(0, 350);
            }, Y = function(a2, b2) {
              for (var c2, d2, e3, f3, g3, j2, l2 = 0; l2 < b2.length && !g3; ) {
                var m2 = b2[l2], n2 = b2[l2 + 1];
                for (c2 = d2 = 0; c2 < m2.length && !g3 && m2[c2]; ) if (g3 = m2[c2++].exec(a2)) for (e3 = 0; e3 < n2.length; e3++) j2 = g3[++d2], typeof (f3 = n2[e3]) === k && f3.length > 0 ? 2 === f3.length ? typeof f3[1] == i ? this[f3[0]] = f3[1].call(this, j2) : this[f3[0]] = f3[1] : 3 === f3.length ? typeof f3[1] !== i || f3[1].exec && f3[1].test ? this[f3[0]] = j2 ? j2.replace(f3[1], f3[2]) : void 0 : this[f3[0]] = j2 ? f3[1].call(this, j2, f3[2]) : void 0 : 4 === f3.length && (this[f3[0]] = j2 ? f3[3].call(this, j2.replace(f3[1], f3[2])) : h) : this[f3] = j2 || h;
                l2 += 2;
              }
            }, Z = function(a2, b2) {
              for (var c2 in b2) if (typeof b2[c2] === k && b2[c2].length > 0) {
                for (var d2 = 0; d2 < b2[c2].length; d2++) if (V(b2[c2][d2], a2)) return "?" === c2 ? h : c2;
              } else if (V(b2[c2], a2)) return "?" === c2 ? h : c2;
              return a2;
            }, $ = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, _ = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [r, [o, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [r, [o, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [o, r], [/opios[\/ ]+([\w\.]+)/i], [r, [o, K + " Mini"]], [/\bopr\/([\w\.]+)/i], [r, [o, K]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [o, r], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [r, [o, "UC" + D]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [r, [o, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [r, [o, "WeChat"]], [/konqueror\/([\w\.]+)/i], [r, [o, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [r, [o, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [r, [o, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[o, /(.+)/, "$1 Secure " + D], r], [/\bfocus\/([\w\.]+)/i], [r, [o, F + " Focus"]], [/\bopt\/([\w\.]+)/i], [r, [o, K + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [r, [o, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [r, [o, "Dolphin"]], [/coast\/([\w\.]+)/i], [r, [o, K + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [r, [o, "MIUI " + D]], [/fxios\/([-\w\.]+)/i], [r, [o, F]], [/\bqihu|(qi?ho?o?|360)browser/i], [[o, "360 " + D]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[o, /(.+)/, "$1 " + D], r], [/(comodo_dragon)\/([\w\.]+)/i], [[o, /_/g, " "], r], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [o, r], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [o], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[o, Q], r], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [o, r], [/\bgsa\/([\w\.]+) .*safari\//i], [r, [o, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [r, [o, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [r, [o, E + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[o, E + " WebView"], r], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [r, [o, "Android " + D]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [o, r], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [r, [o, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [r, o], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [o, [r, Z, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [o, r], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[o, "Netscape"], r], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [r, [o, F + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [o, r], [/(cobalt)\/([\w\.]+)/i], [o, [r, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[s, "amd64"]], [/(ia32(?=;))/i], [[s, W]], [/((?:i[346]|x)86)[;\)]/i], [[s, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[s, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[s, "armhf"]], [/windows (ce|mobile); ppc;/i], [[s, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[s, /ower/, "", W]], [/(sun4\w)[;\)]/i], [[s, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[s, W]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [n, [q, L], [p, v]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [n, [q, L], [p, u]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [n, [q, A], [p, u]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [n, [q, A], [p, v]], [/(macintosh);/i], [n, [q, A]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [n, [q, M], [p, u]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [n, [q, H], [p, v]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [n, [q, H], [p, u]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[n, /_/g, " "], [q, O], [p, u]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[n, /_/g, " "], [q, O], [p, v]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [n, [q, "OPPO"], [p, u]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [n, [q, "Vivo"], [p, u]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [n, [q, "Realme"], [p, u]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [n, [q, J], [p, u]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [n, [q, J], [p, v]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [n, [q, "LG"], [p, v]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [n, [q, "LG"], [p, u]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [n, [q, "Lenovo"], [p, v]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[n, /_/g, " "], [q, "Nokia"], [p, u]], [/(pixel c)\b/i], [n, [q, G], [p, v]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [n, [q, G], [p, u]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [n, [q, N], [p, u]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[n, "Xperia Tablet"], [q, N], [p, v]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [n, [q, "OnePlus"], [p, u]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [n, [q, z], [p, v]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[n, /(.+)/g, "Fire Phone $1"], [q, z], [p, u]], [/(playbook);[-\w\),; ]+(rim)/i], [n, q, [p, v]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [n, [q, C], [p, u]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [n, [q, B], [p, v]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [n, [q, B], [p, u]], [/(nexus 9)/i], [n, [q, "HTC"], [p, v]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [q, [n, /_/g, " "], [p, u]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [n, [q, "Acer"], [p, v]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [n, [q, "Meizu"], [p, u]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [q, n, [p, u]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [q, n, [p, v]], [/(surface duo)/i], [n, [q, I], [p, v]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [n, [q, "Fairphone"], [p, u]], [/(u304aa)/i], [n, [q, "AT&T"], [p, u]], [/\bsie-(\w*)/i], [n, [q, "Siemens"], [p, u]], [/\b(rct\w+) b/i], [n, [q, "RCA"], [p, v]], [/\b(venue[\d ]{2,7}) b/i], [n, [q, "Dell"], [p, v]], [/\b(q(?:mv|ta)\w+) b/i], [n, [q, "Verizon"], [p, v]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [n, [q, "Barnes & Noble"], [p, v]], [/\b(tm\d{3}\w+) b/i], [n, [q, "NuVision"], [p, v]], [/\b(k88) b/i], [n, [q, "ZTE"], [p, v]], [/\b(nx\d{3}j) b/i], [n, [q, "ZTE"], [p, u]], [/\b(gen\d{3}) b.+49h/i], [n, [q, "Swiss"], [p, u]], [/\b(zur\d{3}) b/i], [n, [q, "Swiss"], [p, v]], [/\b((zeki)?tb.*\b) b/i], [n, [q, "Zeki"], [p, v]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[q, "Dragon Touch"], n, [p, v]], [/\b(ns-?\w{0,9}) b/i], [n, [q, "Insignia"], [p, v]], [/\b((nxa|next)-?\w{0,9}) b/i], [n, [q, "NextBook"], [p, v]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[q, "Voice"], n, [p, u]], [/\b(lvtel\-)?(v1[12]) b/i], [[q, "LvTel"], n, [p, u]], [/\b(ph-1) /i], [n, [q, "Essential"], [p, u]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [n, [q, "Envizen"], [p, v]], [/\b(trio[-\w\. ]+) b/i], [n, [q, "MachSpeed"], [p, v]], [/\btu_(1491) b/i], [n, [q, "Rotor"], [p, v]], [/(shield[\w ]+) b/i], [n, [q, "Nvidia"], [p, v]], [/(sprint) (\w+)/i], [q, n, [p, u]], [/(kin\.[onetw]{3})/i], [[n, /\./g, " "], [q, I], [p, u]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [n, [q, P], [p, v]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [n, [q, P], [p, u]], [/smart-tv.+(samsung)/i], [q, [p, w]], [/hbbtv.+maple;(\d+)/i], [[n, /^/, "SmartTV"], [q, L], [p, w]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[q, "LG"], [p, w]], [/(apple) ?tv/i], [q, [n, A + " TV"], [p, w]], [/crkey/i], [[n, E + "cast"], [q, G], [p, w]], [/droid.+aft(\w)( bui|\))/i], [n, [q, z], [p, w]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [n, [q, M], [p, w]], [/(bravia[\w ]+)( bui|\))/i], [n, [q, N], [p, w]], [/(mitv-\w{5}) bui/i], [n, [q, O], [p, w]], [/Hbbtv.*(technisat) (.*);/i], [q, n, [p, w]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[q, X], [n, X], [p, w]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[p, w]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [q, n, [p, t]], [/droid.+; (shield) bui/i], [n, [q, "Nvidia"], [p, t]], [/(playstation [345portablevi]+)/i], [n, [q, N], [p, t]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [n, [q, I], [p, t]], [/((pebble))app/i], [q, n, [p, x]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [n, [q, A], [p, x]], [/droid.+; (glass) \d/i], [n, [q, G], [p, x]], [/droid.+; (wt63?0{2,3})\)/i], [n, [q, P], [p, x]], [/(quest( 2| pro)?)/i], [n, [q, Q], [p, x]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [q, [p, y]], [/(aeobc)\b/i], [n, [q, z], [p, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [n, [p, u]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [n, [p, v]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[p, v]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[p, u]], [/(android[-\w\. ]{0,9});.+buil/i], [n, [q, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [r, [o, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [r, [o, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [o, r], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [r, o]], os: [[/microsoft (windows) (vista|xp)/i], [o, r], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [o, [r, Z, $]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[o, "Windows"], [r, Z, $]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[r, /_/g, "."], [o, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[o, S], [r, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [r, o], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [o, r], [/\(bb(10);/i], [r, [o, C]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [r, [o, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [r, [o, F + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [r, [o, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [r, [o, "watchOS"]], [/crkey\/([\d\.]+)/i], [r, [o, E + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[o, R], r], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [o, r], [/(sunos) ?([\w\.\d]*)/i], [[o, "Solaris"], r], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [o, r]] }, aa = function(a2, b2) {
              if (typeof a2 === k && (b2 = a2, a2 = h), !(this instanceof aa)) return new aa(a2, b2).getResult();
              var c2 = typeof g2 !== j && g2.navigator ? g2.navigator : h, d2 = a2 || (c2 && c2.userAgent ? c2.userAgent : ""), e3 = c2 && c2.userAgentData ? c2.userAgentData : h, f3 = b2 ? T(_, b2) : _, t2 = c2 && c2.userAgent == d2;
              return this.getBrowser = function() {
                var a3, b3 = {};
                return b3[o] = h, b3[r] = h, Y.call(b3, d2, f3.browser), b3[m] = typeof (a3 = b3[r]) === l ? a3.replace(/[^\d\.]/g, "").split(".")[0] : h, t2 && c2 && c2.brave && typeof c2.brave.isBrave == i && (b3[o] = "Brave"), b3;
              }, this.getCPU = function() {
                var a3 = {};
                return a3[s] = h, Y.call(a3, d2, f3.cpu), a3;
              }, this.getDevice = function() {
                var a3 = {};
                return a3[q] = h, a3[n] = h, a3[p] = h, Y.call(a3, d2, f3.device), t2 && !a3[p] && e3 && e3.mobile && (a3[p] = u), t2 && "Macintosh" == a3[n] && c2 && typeof c2.standalone !== j && c2.maxTouchPoints && c2.maxTouchPoints > 2 && (a3[n] = "iPad", a3[p] = v), a3;
              }, this.getEngine = function() {
                var a3 = {};
                return a3[o] = h, a3[r] = h, Y.call(a3, d2, f3.engine), a3;
              }, this.getOS = function() {
                var a3 = {};
                return a3[o] = h, a3[r] = h, Y.call(a3, d2, f3.os), t2 && !a3[o] && e3 && "Unknown" != e3.platform && (a3[o] = e3.platform.replace(/chrome os/i, R).replace(/macos/i, S)), a3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return d2;
              }, this.setUA = function(a3) {
                return d2 = typeof a3 === l && a3.length > 350 ? X(a3, 350) : a3, this;
              }, this.setUA(d2), this;
            };
            aa.VERSION = "1.0.35", aa.BROWSER = U([o, r, m]), aa.CPU = U([s]), aa.DEVICE = U([n, q, p, t, u, w, v, x, y]), aa.ENGINE = aa.OS = U([o, r]), typeof f2 !== j ? (e2.exports && (f2 = e2.exports = aa), f2.UAParser = aa) : c.amdO ? void 0 === (d = function() {
              return aa;
            }.call(b, c, b, a)) || (a.exports = d) : typeof g2 !== j && (g2.UAParser = aa);
            var ab = typeof g2 !== j && (g2.jQuery || g2.Zepto);
            if (ab && !ab.ua) {
              var ac = new aa();
              ab.ua = ac.getResult(), ab.ua.get = function() {
                return ac.getUA();
              }, ab.ua.set = function(a2) {
                ac.setUA(a2);
                var b2 = ac.getResult();
                for (var c2 in b2) ab.ua[c2] = b2[c2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, f = {};
        function g(a2) {
          var b2 = f[a2];
          if (void 0 !== b2) return b2.exports;
          var c2 = f[a2] = { exports: {} }, d2 = true;
          try {
            e[a2].call(c2.exports, c2, c2.exports, g), d2 = false;
          } finally {
            d2 && delete f[a2];
          }
          return c2.exports;
        }
        g.ab = "//", a.exports = g(226);
      })();
    }, 515: (a, b, c) => {
      "use strict";
      c.d(b, { X: () => function a2(b2) {
        if ((0, g.p)(b2) || (0, f.C)(b2) || (0, i.h)(b2) || (0, h.I3)(b2) || "object" == typeof b2 && null !== b2 && b2.$$typeof === e || (0, d.Ts)(b2)) throw b2;
        b2 instanceof Error && "cause" in b2 && a2(b2.cause);
      } });
      var d = c(770);
      let e = Symbol.for("react.postpone");
      var f = c(340), g = c(747), h = c(107), i = c(159);
    }, 521: (a) => {
      "use strict";
      a.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 586: (a, b, c) => {
      "use strict";
      a.exports = c(744);
    }, 637: (a, b, c) => {
      "use strict";
      var d;
      (d = c(754)).renderToReadableStream, d.decodeReply, d.decodeReplyFromAsyncIterable, d.decodeAction, d.decodeFormState, d.registerServerReference, b.YR = d.registerClientReference, d.createClientModuleProxy, d.createTemporaryReferenceSet;
    }, 663: (a) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var b = {};
        (() => {
          b.parse = function(b2, c2) {
            if ("string" != typeof b2) throw TypeError("argument str must be a string");
            for (var e2 = {}, f = b2.split(d), g = (c2 || {}).decode || a2, h = 0; h < f.length; h++) {
              var i = f[h], j = i.indexOf("=");
              if (!(j < 0)) {
                var k = i.substr(0, j).trim(), l = i.substr(++j, i.length).trim();
                '"' == l[0] && (l = l.slice(1, -1)), void 0 == e2[k] && (e2[k] = function(a3, b3) {
                  try {
                    return b3(a3);
                  } catch (b4) {
                    return a3;
                  }
                }(l, g));
              }
            }
            return e2;
          }, b.serialize = function(a3, b2, d2) {
            var f = d2 || {}, g = f.encode || c;
            if ("function" != typeof g) throw TypeError("option encode is invalid");
            if (!e.test(a3)) throw TypeError("argument name is invalid");
            var h = g(b2);
            if (h && !e.test(h)) throw TypeError("argument val is invalid");
            var i = a3 + "=" + h;
            if (null != f.maxAge) {
              var j = f.maxAge - 0;
              if (isNaN(j) || !isFinite(j)) throw TypeError("option maxAge is invalid");
              i += "; Max-Age=" + Math.floor(j);
            }
            if (f.domain) {
              if (!e.test(f.domain)) throw TypeError("option domain is invalid");
              i += "; Domain=" + f.domain;
            }
            if (f.path) {
              if (!e.test(f.path)) throw TypeError("option path is invalid");
              i += "; Path=" + f.path;
            }
            if (f.expires) {
              if ("function" != typeof f.expires.toUTCString) throw TypeError("option expires is invalid");
              i += "; Expires=" + f.expires.toUTCString();
            }
            if (f.httpOnly && (i += "; HttpOnly"), f.secure && (i += "; Secure"), f.sameSite) switch ("string" == typeof f.sameSite ? f.sameSite.toLowerCase() : f.sameSite) {
              case true:
              case "strict":
                i += "; SameSite=Strict";
                break;
              case "lax":
                i += "; SameSite=Lax";
                break;
              case "none":
                i += "; SameSite=None";
                break;
              default:
                throw TypeError("option sameSite is invalid");
            }
            return i;
          };
          var a2 = decodeURIComponent, c = encodeURIComponent, d = /; */, e = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), a.exports = b;
      })();
    }, 691: (a, b, c) => {
      var d = { "./en.json": 20, "./sr.json": 318 };
      function e(a2) {
        return Promise.resolve().then(() => {
          if (!c.o(d, a2)) {
            var b2 = Error("Cannot find module '" + a2 + "'");
            throw b2.code = "MODULE_NOT_FOUND", b2;
          }
          var e2 = d[a2];
          return c.t(e2, 19);
        });
      }
      e.keys = () => Object.keys(d), e.id = 691, a.exports = e;
    }, 720: (a, b, c) => {
      "use strict";
      Object.defineProperty(b, "__esModule", { value: true }), !function(a2, b2) {
        for (var c2 in b2) Object.defineProperty(a2, c2, { enumerable: true, get: b2[c2] });
      }(b, { interceptTestApis: function() {
        return f;
      }, wrapRequestHandler: function() {
        return g;
      } });
      let d = c(392), e = c(165);
      function f() {
        return (0, e.interceptFetch)(c.g.fetch);
      }
      function g(a2) {
        return (b2, c2) => (0, d.withRequest)(b2, e.reader, () => a2(b2, c2));
      }
    }, 744: (a, b, c) => {
      "use strict";
      var d = c(814);
      function e() {
      }
      var f = { d: { f: e, r: function() {
        throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
      }, D: e, C: e, L: e, m: e, X: e, S: e, M: e }, p: 0, findDOMNode: null };
      if (!d.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      function g(a2, b2) {
        return "font" === a2 ? "" : "string" == typeof b2 ? "use-credentials" === b2 ? b2 : "" : void 0;
      }
      b.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, b.preconnect = function(a2, b2) {
        "string" == typeof a2 && (b2 = b2 ? "string" == typeof (b2 = b2.crossOrigin) ? "use-credentials" === b2 ? b2 : "" : void 0 : null, f.d.C(a2, b2));
      }, b.prefetchDNS = function(a2) {
        "string" == typeof a2 && f.d.D(a2);
      }, b.preinit = function(a2, b2) {
        if ("string" == typeof a2 && b2 && "string" == typeof b2.as) {
          var c2 = b2.as, d2 = g(c2, b2.crossOrigin), e2 = "string" == typeof b2.integrity ? b2.integrity : void 0, h = "string" == typeof b2.fetchPriority ? b2.fetchPriority : void 0;
          "style" === c2 ? f.d.S(a2, "string" == typeof b2.precedence ? b2.precedence : void 0, { crossOrigin: d2, integrity: e2, fetchPriority: h }) : "script" === c2 && f.d.X(a2, { crossOrigin: d2, integrity: e2, fetchPriority: h, nonce: "string" == typeof b2.nonce ? b2.nonce : void 0 });
        }
      }, b.preinitModule = function(a2, b2) {
        if ("string" == typeof a2) if ("object" == typeof b2 && null !== b2) {
          if (null == b2.as || "script" === b2.as) {
            var c2 = g(b2.as, b2.crossOrigin);
            f.d.M(a2, { crossOrigin: c2, integrity: "string" == typeof b2.integrity ? b2.integrity : void 0, nonce: "string" == typeof b2.nonce ? b2.nonce : void 0 });
          }
        } else null == b2 && f.d.M(a2);
      }, b.preload = function(a2, b2) {
        if ("string" == typeof a2 && "object" == typeof b2 && null !== b2 && "string" == typeof b2.as) {
          var c2 = b2.as, d2 = g(c2, b2.crossOrigin);
          f.d.L(a2, c2, { crossOrigin: d2, integrity: "string" == typeof b2.integrity ? b2.integrity : void 0, nonce: "string" == typeof b2.nonce ? b2.nonce : void 0, type: "string" == typeof b2.type ? b2.type : void 0, fetchPriority: "string" == typeof b2.fetchPriority ? b2.fetchPriority : void 0, referrerPolicy: "string" == typeof b2.referrerPolicy ? b2.referrerPolicy : void 0, imageSrcSet: "string" == typeof b2.imageSrcSet ? b2.imageSrcSet : void 0, imageSizes: "string" == typeof b2.imageSizes ? b2.imageSizes : void 0, media: "string" == typeof b2.media ? b2.media : void 0 });
        }
      }, b.preloadModule = function(a2, b2) {
        if ("string" == typeof a2) if (b2) {
          var c2 = g(b2.as, b2.crossOrigin);
          f.d.m(a2, { as: "string" == typeof b2.as && "script" !== b2.as ? b2.as : void 0, crossOrigin: c2, integrity: "string" == typeof b2.integrity ? b2.integrity : void 0 });
        } else f.d.m(a2);
      }, b.version = "19.2.0-canary-0bdb9206-20250818";
    }, 747: (a, b, c) => {
      "use strict";
      c.d(b, { p: () => f });
      var d = c(66), e = c(944);
      function f(a2) {
        return (0, e.nJ)(a2) || (0, d.RM)(a2);
      }
    }, 754: (a, b, c) => {
      "use strict";
      var d = c(586), e = c(814), f = Symbol.for("react.element"), g = Symbol.for("react.transitional.element"), h = Symbol.for("react.fragment"), i = Symbol.for("react.context"), j = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), n = Symbol.for("react.lazy"), o = Symbol.for("react.memo_cache_sentinel");
      Symbol.for("react.postpone");
      var p = Symbol.iterator;
      function q(a10) {
        return null === a10 || "object" != typeof a10 ? null : "function" == typeof (a10 = p && a10[p] || a10["@@iterator"]) ? a10 : null;
      }
      var r = Symbol.asyncIterator;
      function s(a10) {
        setTimeout(function() {
          throw a10;
        });
      }
      var t = Promise, u = "function" == typeof queueMicrotask ? queueMicrotask : function(a10) {
        t.resolve(null).then(a10).catch(s);
      }, v = null, w = 0;
      function x(a10, b2) {
        if (0 !== b2.byteLength) if (2048 < b2.byteLength) 0 < w && (a10.enqueue(new Uint8Array(v.buffer, 0, w)), v = new Uint8Array(2048), w = 0), a10.enqueue(b2);
        else {
          var c2 = v.length - w;
          c2 < b2.byteLength && (0 === c2 ? a10.enqueue(v) : (v.set(b2.subarray(0, c2), w), a10.enqueue(v), b2 = b2.subarray(c2)), v = new Uint8Array(2048), w = 0), v.set(b2, w), w += b2.byteLength;
        }
        return true;
      }
      var y = new TextEncoder();
      function z(a10) {
        return y.encode(a10);
      }
      function A(a10) {
        return a10.byteLength;
      }
      function B(a10, b2) {
        "function" == typeof a10.error ? a10.error(b2) : a10.close();
      }
      var C = Symbol.for("react.client.reference"), D = Symbol.for("react.server.reference");
      function E(a10, b2, c2) {
        return Object.defineProperties(a10, { $$typeof: { value: C }, $$id: { value: b2 }, $$async: { value: c2 } });
      }
      var F = Function.prototype.bind, G = Array.prototype.slice;
      function H() {
        var a10 = F.apply(this, arguments);
        if (this.$$typeof === D) {
          var b2 = G.call(arguments, 1);
          return Object.defineProperties(a10, { $$typeof: { value: D }, $$id: { value: this.$$id }, $$bound: b2 = { value: this.$$bound ? this.$$bound.concat(b2) : b2 }, bind: { value: H, configurable: true } });
        }
        return a10;
      }
      var I = Promise.prototype, J = { get: function(a10, b2) {
        switch (b2) {
          case "$$typeof":
            return a10.$$typeof;
          case "$$id":
            return a10.$$id;
          case "$$async":
            return a10.$$async;
          case "name":
            return a10.name;
          case "displayName":
          case "defaultProps":
          case "_debugInfo":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
          case "then":
            throw Error("Cannot await or return from a thenable. You cannot await a client module from a server component.");
        }
        throw Error("Cannot access " + String(a10.name) + "." + String(b2) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
      }, set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      } };
      function K(a10, b2) {
        switch (b2) {
          case "$$typeof":
            return a10.$$typeof;
          case "$$id":
            return a10.$$id;
          case "$$async":
            return a10.$$async;
          case "name":
            return a10.name;
          case "defaultProps":
          case "_debugInfo":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "__esModule":
            var c2 = a10.$$id;
            return a10.default = E(function() {
              throw Error("Attempted to call the default export of " + c2 + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
            }, a10.$$id + "#", a10.$$async), true;
          case "then":
            if (a10.then) return a10.then;
            if (a10.$$async) return;
            var d2 = E({}, a10.$$id, true), e2 = new Proxy(d2, L);
            return a10.status = "fulfilled", a10.value = e2, a10.then = E(function(a11) {
              return Promise.resolve(a11(e2));
            }, a10.$$id + "#then", false);
        }
        if ("symbol" == typeof b2) throw Error("Cannot read Symbol exports. Only named exports are supported on a client module imported on the server.");
        return (d2 = a10[b2]) || (Object.defineProperty(d2 = E(function() {
          throw Error("Attempted to call " + String(b2) + "() from the server but " + String(b2) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, a10.$$id + "#" + b2, a10.$$async), "name", { value: b2 }), d2 = a10[b2] = new Proxy(d2, J)), d2;
      }
      var L = { get: function(a10, b2) {
        return K(a10, b2);
      }, getOwnPropertyDescriptor: function(a10, b2) {
        var c2 = Object.getOwnPropertyDescriptor(a10, b2);
        return c2 || (c2 = { value: K(a10, b2), writable: false, configurable: false, enumerable: false }, Object.defineProperty(a10, b2, c2)), c2;
      }, getPrototypeOf: function() {
        return I;
      }, set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      } }, M = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, N = M.d;
      function O(a10) {
        if (null == a10) return null;
        var b2, c2 = false, d2 = {};
        for (b2 in a10) null != a10[b2] && (c2 = true, d2[b2] = a10[b2]);
        return c2 ? d2 : null;
      }
      M.d = { f: N.f, r: N.r, D: function(a10) {
        if ("string" == typeof a10 && a10) {
          var b2 = ar();
          if (b2) {
            var c2 = b2.hints, d2 = "D|" + a10;
            c2.has(d2) || (c2.add(d2), at(b2, "D", a10));
          } else N.D(a10);
        }
      }, C: function(a10, b2) {
        if ("string" == typeof a10) {
          var c2 = ar();
          if (c2) {
            var d2 = c2.hints, e2 = "C|" + (null == b2 ? "null" : b2) + "|" + a10;
            d2.has(e2) || (d2.add(e2), "string" == typeof b2 ? at(c2, "C", [a10, b2]) : at(c2, "C", a10));
          } else N.C(a10, b2);
        }
      }, L: function(a10, b2, c2) {
        if ("string" == typeof a10) {
          var d2 = ar();
          if (d2) {
            var e2 = d2.hints, f2 = "L";
            if ("image" === b2 && c2) {
              var g2 = c2.imageSrcSet, h2 = c2.imageSizes, i2 = "";
              "string" == typeof g2 && "" !== g2 ? (i2 += "[" + g2 + "]", "string" == typeof h2 && (i2 += "[" + h2 + "]")) : i2 += "[][]" + a10, f2 += "[image]" + i2;
            } else f2 += "[" + b2 + "]" + a10;
            e2.has(f2) || (e2.add(f2), (c2 = O(c2)) ? at(d2, "L", [a10, b2, c2]) : at(d2, "L", [a10, b2]));
          } else N.L(a10, b2, c2);
        }
      }, m: function(a10, b2) {
        if ("string" == typeof a10) {
          var c2 = ar();
          if (c2) {
            var d2 = c2.hints, e2 = "m|" + a10;
            if (d2.has(e2)) return;
            return d2.add(e2), (b2 = O(b2)) ? at(c2, "m", [a10, b2]) : at(c2, "m", a10);
          }
          N.m(a10, b2);
        }
      }, X: function(a10, b2) {
        if ("string" == typeof a10) {
          var c2 = ar();
          if (c2) {
            var d2 = c2.hints, e2 = "X|" + a10;
            if (d2.has(e2)) return;
            return d2.add(e2), (b2 = O(b2)) ? at(c2, "X", [a10, b2]) : at(c2, "X", a10);
          }
          N.X(a10, b2);
        }
      }, S: function(a10, b2, c2) {
        if ("string" == typeof a10) {
          var d2 = ar();
          if (d2) {
            var e2 = d2.hints, f2 = "S|" + a10;
            if (e2.has(f2)) return;
            return e2.add(f2), (c2 = O(c2)) ? at(d2, "S", [a10, "string" == typeof b2 ? b2 : 0, c2]) : "string" == typeof b2 ? at(d2, "S", [a10, b2]) : at(d2, "S", a10);
          }
          N.S(a10, b2, c2);
        }
      }, M: function(a10, b2) {
        if ("string" == typeof a10) {
          var c2 = ar();
          if (c2) {
            var d2 = c2.hints, e2 = "M|" + a10;
            if (d2.has(e2)) return;
            return d2.add(e2), (b2 = O(b2)) ? at(c2, "M", [a10, b2]) : at(c2, "M", a10);
          }
          N.M(a10, b2);
        }
      } };
      var P = "function" == typeof AsyncLocalStorage, Q = P ? new AsyncLocalStorage() : null, R = Symbol.for("react.temporary.reference"), S = { get: function(a10, b2) {
        switch (b2) {
          case "$$typeof":
            return a10.$$typeof;
          case "name":
          case "displayName":
          case "defaultProps":
          case "_debugInfo":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
          case "then":
            return;
        }
        throw Error("Cannot access " + String(b2) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
      }, set: function() {
        throw Error("Cannot assign to a temporary client reference from a server module.");
      } };
      function T() {
      }
      var U = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), V = null;
      function W() {
        if (null === V) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
        var a10 = V;
        return V = null, a10;
      }
      var X = null, Y = 0, Z = null;
      function $() {
        var a10 = Z || [];
        return Z = null, a10;
      }
      var _ = { readContext: ac, use: function(a10) {
        if (null !== a10 && "object" == typeof a10 || "function" == typeof a10) {
          if ("function" == typeof a10.then) {
            var b2 = Y;
            Y += 1, null === Z && (Z = []);
            var c2 = Z, d2 = a10, e2 = b2;
            switch (void 0 === (e2 = c2[e2]) ? c2.push(d2) : e2 !== d2 && (d2.then(T, T), d2 = e2), d2.status) {
              case "fulfilled":
                return d2.value;
              case "rejected":
                throw d2.reason;
              default:
                switch ("string" == typeof d2.status ? d2.then(T, T) : ((c2 = d2).status = "pending", c2.then(function(a11) {
                  if ("pending" === d2.status) {
                    var b3 = d2;
                    b3.status = "fulfilled", b3.value = a11;
                  }
                }, function(a11) {
                  if ("pending" === d2.status) {
                    var b3 = d2;
                    b3.status = "rejected", b3.reason = a11;
                  }
                })), d2.status) {
                  case "fulfilled":
                    return d2.value;
                  case "rejected":
                    throw d2.reason;
                }
                throw V = d2, U;
            }
          }
          a10.$$typeof === i && ac();
        }
        if (a10.$$typeof === C) {
          if (null != a10.value && a10.value.$$typeof === i) throw Error("Cannot read a Client Context from a Server Component.");
          throw Error("Cannot use() an already resolved Client Reference.");
        }
        throw Error("An unsupported type was passed to use(): " + String(a10));
      }, useCallback: function(a10) {
        return a10;
      }, useContext: ac, useEffect: aa, useImperativeHandle: aa, useLayoutEffect: aa, useInsertionEffect: aa, useMemo: function(a10) {
        return a10();
      }, useReducer: aa, useRef: aa, useState: aa, useDebugValue: function() {
      }, useDeferredValue: aa, useTransition: aa, useSyncExternalStore: aa, useId: function() {
        if (null === X) throw Error("useId can only be used while React is rendering");
        var a10 = X.identifierCount++;
        return "_" + X.identifierPrefix + "S_" + a10.toString(32) + "_";
      }, useHostTransitionStatus: aa, useFormState: aa, useActionState: aa, useOptimistic: aa, useMemoCache: function(a10) {
        for (var b2 = Array(a10), c2 = 0; c2 < a10; c2++) b2[c2] = o;
        return b2;
      }, useCacheRefresh: function() {
        return ab;
      } };
      function aa() {
        throw Error("This Hook is not supported in Server Components.");
      }
      function ab() {
        throw Error("Refreshing the cache is not supported in Server Components.");
      }
      function ac() {
        throw Error("Cannot read a Client Context from a Server Component.");
      }
      var ad = { getCacheForType: function(a10) {
        var b2 = (b2 = ar()) ? b2.cache : /* @__PURE__ */ new Map(), c2 = b2.get(a10);
        return void 0 === c2 && (c2 = a10(), b2.set(a10, c2)), c2;
      }, cacheSignal: function() {
        var a10 = ar();
        return a10 ? a10.cacheController.signal : null;
      } }, ae = e.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      if (!ae) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      var af = Array.isArray, ag = Object.getPrototypeOf;
      function ah(a10) {
        return (a10 = Object.prototype.toString.call(a10)).slice(8, a10.length - 1);
      }
      function ai(a10) {
        switch (typeof a10) {
          case "string":
            return JSON.stringify(10 >= a10.length ? a10 : a10.slice(0, 10) + "...");
          case "object":
            if (af(a10)) return "[...]";
            if (null !== a10 && a10.$$typeof === aj) return "client";
            return "Object" === (a10 = ah(a10)) ? "{...}" : a10;
          case "function":
            return a10.$$typeof === aj ? "client" : (a10 = a10.displayName || a10.name) ? "function " + a10 : "function";
          default:
            return String(a10);
        }
      }
      var aj = Symbol.for("react.client.reference");
      function ak(a10, b2) {
        var c2 = ah(a10);
        if ("Object" !== c2 && "Array" !== c2) return c2;
        c2 = -1;
        var d2 = 0;
        if (af(a10)) {
          for (var e2 = "[", f2 = 0; f2 < a10.length; f2++) {
            0 < f2 && (e2 += ", ");
            var h2 = a10[f2];
            h2 = "object" == typeof h2 && null !== h2 ? ak(h2) : ai(h2), "" + f2 === b2 ? (c2 = e2.length, d2 = h2.length, e2 += h2) : e2 = 10 > h2.length && 40 > e2.length + h2.length ? e2 + h2 : e2 + "...";
          }
          e2 += "]";
        } else if (a10.$$typeof === g) e2 = "<" + function a11(b3) {
          if ("string" == typeof b3) return b3;
          switch (b3) {
            case k:
              return "Suspense";
            case l:
              return "SuspenseList";
          }
          if ("object" == typeof b3) switch (b3.$$typeof) {
            case j:
              return a11(b3.render);
            case m:
              return a11(b3.type);
            case n:
              var c3 = b3._payload;
              b3 = b3._init;
              try {
                return a11(b3(c3));
              } catch (a12) {
              }
          }
          return "";
        }(a10.type) + "/>";
        else {
          if (a10.$$typeof === aj) return "client";
          for (h2 = 0, e2 = "{", f2 = Object.keys(a10); h2 < f2.length; h2++) {
            0 < h2 && (e2 += ", ");
            var i2 = f2[h2], o2 = JSON.stringify(i2);
            e2 += ('"' + i2 + '"' === o2 ? i2 : o2) + ": ", o2 = "object" == typeof (o2 = a10[i2]) && null !== o2 ? ak(o2) : ai(o2), i2 === b2 ? (c2 = e2.length, d2 = o2.length, e2 += o2) : e2 = 10 > o2.length && 40 > e2.length + o2.length ? e2 + o2 : e2 + "...";
          }
          e2 += "}";
        }
        return void 0 === b2 ? e2 : -1 < c2 && 0 < d2 ? "\n  " + e2 + "\n  " + (a10 = " ".repeat(c2) + "^".repeat(d2)) : "\n  " + e2;
      }
      var al = Object.prototype.hasOwnProperty, am = Object.prototype, an = JSON.stringify;
      function ao(a10) {
        console.error(a10);
      }
      function ap(a10, b2, c2, d2, e2, f2, g2, h2, i2) {
        if (null !== ae.A && ae.A !== ad) throw Error("Currently React only supports one RSC renderer at a time.");
        ae.A = ad;
        var j2 = /* @__PURE__ */ new Set(), k2 = [], l2 = /* @__PURE__ */ new Set();
        this.type = a10, this.status = 10, this.flushScheduled = false, this.destination = this.fatalError = null, this.bundlerConfig = c2, this.cache = /* @__PURE__ */ new Map(), this.cacheController = new AbortController(), this.pendingChunks = this.nextChunkId = 0, this.hints = l2, this.abortableTasks = j2, this.pingedTasks = k2, this.completedImportChunks = [], this.completedHintChunks = [], this.completedRegularChunks = [], this.completedErrorChunks = [], this.writtenSymbols = /* @__PURE__ */ new Map(), this.writtenClientReferences = /* @__PURE__ */ new Map(), this.writtenServerReferences = /* @__PURE__ */ new Map(), this.writtenObjects = /* @__PURE__ */ new WeakMap(), this.temporaryReferences = i2, this.identifierPrefix = h2 || "", this.identifierCount = 1, this.taintCleanupQueue = [], this.onError = void 0 === d2 ? ao : d2, this.onPostpone = void 0 === e2 ? T : e2, this.onAllReady = f2, this.onFatalError = g2, k2.push(a10 = aB(this, b2, null, false, j2));
      }
      var aq = null;
      function ar() {
        if (aq) return aq;
        if (P) {
          var a10 = Q.getStore();
          if (a10) return a10;
        }
        return null;
      }
      function as(a10, b2, c2) {
        var d2 = aB(a10, c2, b2.keyPath, b2.implicitSlot, a10.abortableTasks);
        switch (c2.status) {
          case "fulfilled":
            return d2.model = c2.value, aA(a10, d2), d2.id;
          case "rejected":
            return aQ(a10, d2, c2.reason), d2.id;
          default:
            if (12 === a10.status) return a10.abortableTasks.delete(d2), b2 = a10.fatalError, aV(d2), aW(d2, a10, b2), d2.id;
            "string" != typeof c2.status && (c2.status = "pending", c2.then(function(a11) {
              "pending" === c2.status && (c2.status = "fulfilled", c2.value = a11);
            }, function(a11) {
              "pending" === c2.status && (c2.status = "rejected", c2.reason = a11);
            }));
        }
        return c2.then(function(b3) {
          d2.model = b3, aA(a10, d2);
        }, function(b3) {
          0 === d2.status && (aQ(a10, d2, b3), aZ(a10));
        }), d2.id;
      }
      function at(a10, b2, c2) {
        b2 = z(":H" + b2 + (c2 = an(c2)) + "\n"), a10.completedHintChunks.push(b2), aZ(a10);
      }
      function au(a10) {
        if ("fulfilled" === a10.status) return a10.value;
        if ("rejected" === a10.status) throw a10.reason;
        throw a10;
      }
      function av() {
      }
      function aw(a10, b2, c2, d2, e2) {
        var f2 = b2.thenableState;
        if (b2.thenableState = null, Y = 0, Z = f2, e2 = d2(e2, void 0), 12 === a10.status) throw "object" == typeof e2 && null !== e2 && "function" == typeof e2.then && e2.$$typeof !== C && e2.then(av, av), null;
        return e2 = function(a11, b3, c3, d3) {
          if ("object" != typeof d3 || null === d3 || d3.$$typeof === C) return d3;
          if ("function" == typeof d3.then) {
            switch (d3.status) {
              case "fulfilled":
                return d3.value;
              case "rejected":
                break;
              default:
                "string" != typeof d3.status && (d3.status = "pending", d3.then(function(a12) {
                  "pending" === d3.status && (d3.status = "fulfilled", d3.value = a12);
                }, function(a12) {
                  "pending" === d3.status && (d3.status = "rejected", d3.reason = a12);
                }));
            }
            return { $$typeof: n, _payload: d3, _init: au };
          }
          var e3 = q(d3);
          return e3 ? ((a11 = {})[Symbol.iterator] = function() {
            return e3.call(d3);
          }, a11) : "function" != typeof d3[r] || "function" == typeof ReadableStream && d3 instanceof ReadableStream ? d3 : ((a11 = {})[r] = function() {
            return d3[r]();
          }, a11);
        }(a10, 0, 0, e2), d2 = b2.keyPath, f2 = b2.implicitSlot, null !== c2 ? b2.keyPath = null === d2 ? c2 : d2 + "," + c2 : null === d2 && (b2.implicitSlot = true), a10 = aI(a10, b2, aR, "", e2), b2.keyPath = d2, b2.implicitSlot = f2, a10;
      }
      function ax(a10, b2, c2) {
        return null !== b2.keyPath ? (a10 = [g, h, b2.keyPath, { children: c2 }], b2.implicitSlot ? [a10] : a10) : c2;
      }
      var ay = 0;
      function az(a10, b2) {
        return b2 = aB(a10, b2.model, b2.keyPath, b2.implicitSlot, a10.abortableTasks), aA(a10, b2), "$L" + b2.id.toString(16);
      }
      function aA(a10, b2) {
        var c2 = a10.pingedTasks;
        c2.push(b2), 1 === c2.length && (a10.flushScheduled = null !== a10.destination, 21 === a10.type || 10 === a10.status ? u(function() {
          return aU(a10);
        }) : setTimeout(function() {
          return aU(a10);
        }, 0));
      }
      function aB(a10, b2, c2, d2, e2) {
        a10.pendingChunks++;
        var f2 = a10.nextChunkId++;
        "object" != typeof b2 || null === b2 || null !== c2 || d2 || a10.writtenObjects.set(b2, aC(f2));
        var h2 = { id: f2, status: 0, model: b2, keyPath: c2, implicitSlot: d2, ping: function() {
          return aA(a10, h2);
        }, toJSON: function(b3, c3) {
          ay += b3.length;
          var d3 = h2.keyPath, e3 = h2.implicitSlot;
          try {
            var f3 = aI(a10, h2, this, b3, c3);
          } catch (j2) {
            if (b3 = "object" == typeof (b3 = h2.model) && null !== b3 && (b3.$$typeof === g || b3.$$typeof === n), 12 === a10.status) h2.status = 3, d3 = a10.fatalError, f3 = b3 ? "$L" + d3.toString(16) : aC(d3);
            else if ("object" == typeof (c3 = j2 === U ? W() : j2) && null !== c3 && "function" == typeof c3.then) {
              var i2 = (f3 = aB(a10, h2.model, h2.keyPath, h2.implicitSlot, a10.abortableTasks)).ping;
              c3.then(i2, i2), f3.thenableState = $(), h2.keyPath = d3, h2.implicitSlot = e3, f3 = b3 ? "$L" + f3.id.toString(16) : aC(f3.id);
            } else h2.keyPath = d3, h2.implicitSlot = e3, a10.pendingChunks++, d3 = a10.nextChunkId++, e3 = aJ(a10, c3, h2), aL(a10, d3, e3), f3 = b3 ? "$L" + d3.toString(16) : aC(d3);
          }
          return f3;
        }, thenableState: null };
        return e2.add(h2), h2;
      }
      function aC(a10) {
        return "$" + a10.toString(16);
      }
      function aD(a10, b2, c2) {
        return a10 = an(c2), z(b2 = b2.toString(16) + ":" + a10 + "\n");
      }
      function aE(a10, b2, c2, d2) {
        var e2 = d2.$$async ? d2.$$id + "#async" : d2.$$id, f2 = a10.writtenClientReferences, h2 = f2.get(e2);
        if (void 0 !== h2) return b2[0] === g && "1" === c2 ? "$L" + h2.toString(16) : aC(h2);
        try {
          var i2 = a10.bundlerConfig, j2 = d2.$$id;
          h2 = "";
          var k2 = i2[j2];
          if (k2) h2 = k2.name;
          else {
            var l2 = j2.lastIndexOf("#");
            if (-1 !== l2 && (h2 = j2.slice(l2 + 1), k2 = i2[j2.slice(0, l2)]), !k2) throw Error('Could not find the module "' + j2 + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.');
          }
          if (true === k2.async && true === d2.$$async) throw Error('The module "' + j2 + '" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.');
          var m2 = true === k2.async || true === d2.$$async ? [k2.id, k2.chunks, h2, 1] : [k2.id, k2.chunks, h2];
          a10.pendingChunks++;
          var n2 = a10.nextChunkId++, o2 = an(m2), p2 = n2.toString(16) + ":I" + o2 + "\n", q2 = z(p2);
          return a10.completedImportChunks.push(q2), f2.set(e2, n2), b2[0] === g && "1" === c2 ? "$L" + n2.toString(16) : aC(n2);
        } catch (d3) {
          return a10.pendingChunks++, b2 = a10.nextChunkId++, c2 = aJ(a10, d3, null), aL(a10, b2, c2), aC(b2);
        }
      }
      function aF(a10, b2) {
        return b2 = aB(a10, b2, null, false, a10.abortableTasks), aS(a10, b2), b2.id;
      }
      function aG(a10, b2, c2) {
        a10.pendingChunks++;
        var d2 = a10.nextChunkId++;
        return aN(a10, d2, b2, c2, false), aC(d2);
      }
      var aH = false;
      function aI(a10, b2, c2, d2, e2) {
        if (b2.model = e2, e2 === g) return "$";
        if (null === e2) return null;
        if ("object" == typeof e2) {
          switch (e2.$$typeof) {
            case g:
              var i2 = null, k2 = a10.writtenObjects;
              if (null === b2.keyPath && !b2.implicitSlot) {
                var l2 = k2.get(e2);
                if (void 0 !== l2) if (aH !== e2) return l2;
                else aH = null;
                else -1 === d2.indexOf(":") && void 0 !== (c2 = k2.get(c2)) && (i2 = c2 + ":" + d2, k2.set(e2, i2));
              }
              if (3200 < ay) return az(a10, b2);
              return c2 = (d2 = e2.props).ref, "object" == typeof (a10 = function a11(b3, c3, d3, e3, f2, i3) {
                if (null != f2) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
                if ("function" == typeof d3 && d3.$$typeof !== C && d3.$$typeof !== R) return aw(b3, c3, e3, d3, i3);
                if (d3 === h && null === e3) return d3 = c3.implicitSlot, null === c3.keyPath && (c3.implicitSlot = true), i3 = aI(b3, c3, aR, "", i3.children), c3.implicitSlot = d3, i3;
                if (null != d3 && "object" == typeof d3 && d3.$$typeof !== C) switch (d3.$$typeof) {
                  case n:
                    if (d3 = (0, d3._init)(d3._payload), 12 === b3.status) throw null;
                    return a11(b3, c3, d3, e3, f2, i3);
                  case j:
                    return aw(b3, c3, e3, d3.render, i3);
                  case m:
                    return a11(b3, c3, d3.type, e3, f2, i3);
                }
                return b3 = e3, e3 = c3.keyPath, null === b3 ? b3 = e3 : null !== e3 && (b3 = e3 + "," + b3), i3 = [g, d3, b3, i3], c3 = c3.implicitSlot && null !== b3 ? [i3] : i3;
              }(a10, b2, e2.type, e2.key, void 0 !== c2 ? c2 : null, d2)) && null !== a10 && null !== i2 && (k2.has(a10) || k2.set(a10, i2)), a10;
            case n:
              if (3200 < ay) return az(a10, b2);
              if (b2.thenableState = null, e2 = (d2 = e2._init)(e2._payload), 12 === a10.status) throw null;
              return aI(a10, b2, aR, "", e2);
            case f:
              throw Error('A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.');
          }
          if (e2.$$typeof === C) return aE(a10, c2, d2, e2);
          if (void 0 !== a10.temporaryReferences && void 0 !== (i2 = a10.temporaryReferences.get(e2))) return "$T" + i2;
          if (k2 = (i2 = a10.writtenObjects).get(e2), "function" == typeof e2.then) {
            if (void 0 !== k2) {
              if (null !== b2.keyPath || b2.implicitSlot) return "$@" + as(a10, b2, e2).toString(16);
              if (aH !== e2) return k2;
              aH = null;
            }
            return a10 = "$@" + as(a10, b2, e2).toString(16), i2.set(e2, a10), a10;
          }
          if (void 0 !== k2) if (aH !== e2) return k2;
          else {
            if (k2 !== aC(b2.id)) return k2;
            aH = null;
          }
          else if (-1 === d2.indexOf(":") && void 0 !== (k2 = i2.get(c2))) {
            if (l2 = d2, af(c2) && c2[0] === g) switch (d2) {
              case "1":
                l2 = "type";
                break;
              case "2":
                l2 = "key";
                break;
              case "3":
                l2 = "props";
                break;
              case "4":
                l2 = "_owner";
            }
            i2.set(e2, k2 + ":" + l2);
          }
          if (af(e2)) return ax(a10, b2, e2);
          if (e2 instanceof Map) return "$Q" + aF(a10, e2 = Array.from(e2)).toString(16);
          if (e2 instanceof Set) return "$W" + aF(a10, e2 = Array.from(e2)).toString(16);
          if ("function" == typeof FormData && e2 instanceof FormData) return "$K" + aF(a10, e2 = Array.from(e2.entries())).toString(16);
          if (e2 instanceof Error) return "$Z";
          if (e2 instanceof ArrayBuffer) return aG(a10, "A", new Uint8Array(e2));
          if (e2 instanceof Int8Array) return aG(a10, "O", e2);
          if (e2 instanceof Uint8Array) return aG(a10, "o", e2);
          if (e2 instanceof Uint8ClampedArray) return aG(a10, "U", e2);
          if (e2 instanceof Int16Array) return aG(a10, "S", e2);
          if (e2 instanceof Uint16Array) return aG(a10, "s", e2);
          if (e2 instanceof Int32Array) return aG(a10, "L", e2);
          if (e2 instanceof Uint32Array) return aG(a10, "l", e2);
          if (e2 instanceof Float32Array) return aG(a10, "G", e2);
          if (e2 instanceof Float64Array) return aG(a10, "g", e2);
          if (e2 instanceof BigInt64Array) return aG(a10, "M", e2);
          if (e2 instanceof BigUint64Array) return aG(a10, "m", e2);
          if (e2 instanceof DataView) return aG(a10, "V", e2);
          if ("function" == typeof Blob && e2 instanceof Blob) return function(a11, b3) {
            function c3(b4) {
              0 === f2.status && (a11.cacheController.signal.removeEventListener("abort", d3), aQ(a11, f2, b4), aZ(a11), g2.cancel(b4).then(c3, c3));
            }
            function d3() {
              if (0 === f2.status) {
                var b4 = a11.cacheController.signal;
                b4.removeEventListener("abort", d3), aQ(a11, f2, b4 = b4.reason), aZ(a11), g2.cancel(b4).then(c3, c3);
              }
            }
            var e3 = [b3.type], f2 = aB(a11, e3, null, false, a11.abortableTasks), g2 = b3.stream().getReader();
            return a11.cacheController.signal.addEventListener("abort", d3), g2.read().then(function b4(h2) {
              if (0 === f2.status) if (!h2.done) return e3.push(h2.value), g2.read().then(b4).catch(c3);
              else a11.cacheController.signal.removeEventListener("abort", d3), aA(a11, f2);
            }).catch(c3), "$B" + f2.id.toString(16);
          }(a10, e2);
          if (i2 = q(e2)) return (d2 = i2.call(e2)) === e2 ? "$i" + aF(a10, Array.from(d2)).toString(16) : ax(a10, b2, Array.from(d2));
          if ("function" == typeof ReadableStream && e2 instanceof ReadableStream) return function(a11, b3, c3) {
            function d3(b4) {
              0 === h2.status && (a11.cacheController.signal.removeEventListener("abort", e3), aQ(a11, h2, b4), aZ(a11), g2.cancel(b4).then(d3, d3));
            }
            function e3() {
              if (0 === h2.status) {
                var b4 = a11.cacheController.signal;
                b4.removeEventListener("abort", e3), aQ(a11, h2, b4 = b4.reason), aZ(a11), g2.cancel(b4).then(d3, d3);
              }
            }
            var f2 = c3.supportsBYOB;
            if (void 0 === f2) try {
              c3.getReader({ mode: "byob" }).releaseLock(), f2 = true;
            } catch (a12) {
              f2 = false;
            }
            var g2 = c3.getReader(), h2 = aB(a11, b3.model, b3.keyPath, b3.implicitSlot, a11.abortableTasks);
            return a11.pendingChunks++, b3 = h2.id.toString(16) + ":" + (f2 ? "r" : "R") + "\n", a11.completedRegularChunks.push(z(b3)), a11.cacheController.signal.addEventListener("abort", e3), g2.read().then(function b4(c4) {
              if (0 === h2.status) if (c4.done) h2.status = 1, c4 = h2.id.toString(16) + ":C\n", a11.completedRegularChunks.push(z(c4)), a11.abortableTasks.delete(h2), a11.cacheController.signal.removeEventListener("abort", e3), aZ(a11), a$(a11);
              else try {
                h2.model = c4.value, a11.pendingChunks++, aT(a11, h2), aZ(a11), g2.read().then(b4, d3);
              } catch (a12) {
                d3(a12);
              }
            }, d3), aC(h2.id);
          }(a10, b2, e2);
          if ("function" == typeof (i2 = e2[r])) return null !== b2.keyPath ? (a10 = [g, h, b2.keyPath, { children: e2 }], a10 = b2.implicitSlot ? [a10] : a10) : (d2 = i2.call(e2), a10 = function(a11, b3, c3, d3) {
            function e3(b4) {
              0 === g2.status && (a11.cacheController.signal.removeEventListener("abort", f2), aQ(a11, g2, b4), aZ(a11), "function" == typeof d3.throw && d3.throw(b4).then(e3, e3));
            }
            function f2() {
              if (0 === g2.status) {
                var b4 = a11.cacheController.signal;
                b4.removeEventListener("abort", f2);
                var c4 = b4.reason;
                aQ(a11, g2, b4.reason), aZ(a11), "function" == typeof d3.throw && d3.throw(c4).then(e3, e3);
              }
            }
            c3 = c3 === d3;
            var g2 = aB(a11, b3.model, b3.keyPath, b3.implicitSlot, a11.abortableTasks);
            return a11.pendingChunks++, b3 = g2.id.toString(16) + ":" + (c3 ? "x" : "X") + "\n", a11.completedRegularChunks.push(z(b3)), a11.cacheController.signal.addEventListener("abort", f2), d3.next().then(function b4(c4) {
              if (0 === g2.status) if (c4.done) {
                if (g2.status = 1, void 0 === c4.value) var h2 = g2.id.toString(16) + ":C\n";
                else try {
                  var i3 = aF(a11, c4.value);
                  h2 = g2.id.toString(16) + ":C" + an(aC(i3)) + "\n";
                } catch (a12) {
                  e3(a12);
                  return;
                }
                a11.completedRegularChunks.push(z(h2)), a11.abortableTasks.delete(g2), a11.cacheController.signal.removeEventListener("abort", f2), aZ(a11), a$(a11);
              } else try {
                g2.model = c4.value, a11.pendingChunks++, aT(a11, g2), aZ(a11), d3.next().then(b4, e3);
              } catch (a12) {
                e3(a12);
              }
            }, e3), aC(g2.id);
          }(a10, b2, e2, d2)), a10;
          if (e2 instanceof Date) return "$D" + e2.toJSON();
          if ((a10 = ag(e2)) !== am && (null === a10 || null !== ag(a10))) throw Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + ak(c2, d2));
          return e2;
        }
        if ("string" == typeof e2) return (ay += e2.length, "Z" === e2[e2.length - 1] && c2[d2] instanceof Date) ? "$D" + e2 : 1024 <= e2.length && null !== A ? (a10.pendingChunks++, b2 = a10.nextChunkId++, aO(a10, b2, e2, false), aC(b2)) : a10 = "$" === e2[0] ? "$" + e2 : e2;
        if ("boolean" == typeof e2) return e2;
        if ("number" == typeof e2) return Number.isFinite(e2) ? 0 === e2 && -1 / 0 == 1 / e2 ? "$-0" : e2 : 1 / 0 === e2 ? "$Infinity" : -1 / 0 === e2 ? "$-Infinity" : "$NaN";
        if (void 0 === e2) return "$undefined";
        if ("function" == typeof e2) {
          if (e2.$$typeof === C) return aE(a10, c2, d2, e2);
          if (e2.$$typeof === D) return void 0 !== (d2 = (b2 = a10.writtenServerReferences).get(e2)) ? a10 = "$F" + d2.toString(16) : (d2 = null === (d2 = e2.$$bound) ? null : Promise.resolve(d2), a10 = aF(a10, { id: e2.$$id, bound: d2 }), b2.set(e2, a10), a10 = "$F" + a10.toString(16)), a10;
          if (void 0 !== a10.temporaryReferences && void 0 !== (a10 = a10.temporaryReferences.get(e2))) return "$T" + a10;
          if (e2.$$typeof === R) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
          if (/^on[A-Z]/.test(d2)) throw Error("Event handlers cannot be passed to Client Component props." + ak(c2, d2) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
          throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + ak(c2, d2));
        }
        if ("symbol" == typeof e2) {
          if (void 0 !== (i2 = (b2 = a10.writtenSymbols).get(e2))) return aC(i2);
          if (Symbol.for(i2 = e2.description) !== e2) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + e2.description + ") cannot be found among global symbols." + ak(c2, d2));
          return a10.pendingChunks++, d2 = a10.nextChunkId++, c2 = aD(a10, d2, "$S" + i2), a10.completedImportChunks.push(c2), b2.set(e2, d2), aC(d2);
        }
        if ("bigint" == typeof e2) return "$n" + e2.toString(10);
        throw Error("Type " + typeof e2 + " is not supported in Client Component props." + ak(c2, d2));
      }
      function aJ(a10, b2) {
        var c2 = aq;
        aq = null;
        try {
          var d2 = a10.onError, e2 = P ? Q.run(void 0, d2, b2) : d2(b2);
        } finally {
          aq = c2;
        }
        if (null != e2 && "string" != typeof e2) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof e2 + '" instead');
        return e2 || "";
      }
      function aK(a10, b2) {
        (0, a10.onFatalError)(b2), null !== a10.destination ? (a10.status = 14, B(a10.destination, b2)) : (a10.status = 13, a10.fatalError = b2), a10.cacheController.abort(Error("The render was aborted due to a fatal error.", { cause: b2 }));
      }
      function aL(a10, b2, c2) {
        c2 = { digest: c2 }, b2 = z(b2 = b2.toString(16) + ":E" + an(c2) + "\n"), a10.completedErrorChunks.push(b2);
      }
      function aM(a10, b2, c2) {
        b2 = z(b2 = b2.toString(16) + ":" + c2 + "\n"), a10.completedRegularChunks.push(b2);
      }
      function aN(a10, b2, c2, d2, e2) {
        e2 ? a10.pendingDebugChunks++ : a10.pendingChunks++, e2 = new Uint8Array(d2.buffer, d2.byteOffset, d2.byteLength), e2 = (d2 = 2048 < d2.byteLength ? e2.slice() : e2).byteLength, b2 = z(b2 = b2.toString(16) + ":" + c2 + e2.toString(16) + ","), a10.completedRegularChunks.push(b2, d2);
      }
      function aO(a10, b2, c2, d2) {
        if (null === A) throw Error("Existence of byteLengthOfChunk should have already been checked. This is a bug in React.");
        d2 ? a10.pendingDebugChunks++ : a10.pendingChunks++, d2 = (c2 = z(c2)).byteLength, b2 = z(b2 = b2.toString(16) + ":T" + d2.toString(16) + ","), a10.completedRegularChunks.push(b2, c2);
      }
      function aP(a10, b2, c2) {
        var d2 = b2.id;
        "string" == typeof c2 && null !== A ? aO(a10, d2, c2, false) : c2 instanceof ArrayBuffer ? aN(a10, d2, "A", new Uint8Array(c2), false) : c2 instanceof Int8Array ? aN(a10, d2, "O", c2, false) : c2 instanceof Uint8Array ? aN(a10, d2, "o", c2, false) : c2 instanceof Uint8ClampedArray ? aN(a10, d2, "U", c2, false) : c2 instanceof Int16Array ? aN(a10, d2, "S", c2, false) : c2 instanceof Uint16Array ? aN(a10, d2, "s", c2, false) : c2 instanceof Int32Array ? aN(a10, d2, "L", c2, false) : c2 instanceof Uint32Array ? aN(a10, d2, "l", c2, false) : c2 instanceof Float32Array ? aN(a10, d2, "G", c2, false) : c2 instanceof Float64Array ? aN(a10, d2, "g", c2, false) : c2 instanceof BigInt64Array ? aN(a10, d2, "M", c2, false) : c2 instanceof BigUint64Array ? aN(a10, d2, "m", c2, false) : c2 instanceof DataView ? aN(a10, d2, "V", c2, false) : (c2 = an(c2, b2.toJSON), aM(a10, b2.id, c2));
      }
      function aQ(a10, b2, c2) {
        b2.status = 4, c2 = aJ(a10, c2, b2), aL(a10, b2.id, c2), a10.abortableTasks.delete(b2), a$(a10);
      }
      var aR = {};
      function aS(a10, b2) {
        if (0 === b2.status) {
          b2.status = 5;
          var c2 = ay;
          try {
            aH = b2.model;
            var d2 = aI(a10, b2, aR, "", b2.model);
            if (aH = d2, b2.keyPath = null, b2.implicitSlot = false, "object" == typeof d2 && null !== d2) a10.writtenObjects.set(d2, aC(b2.id)), aP(a10, b2, d2);
            else {
              var e2 = an(d2);
              aM(a10, b2.id, e2);
            }
            b2.status = 1, a10.abortableTasks.delete(b2), a$(a10);
          } catch (c3) {
            if (12 === a10.status) {
              a10.abortableTasks.delete(b2), b2.status = 0;
              var f2 = a10.fatalError;
              aV(b2), aW(b2, a10, f2);
            } else {
              var g2 = c3 === U ? W() : c3;
              if ("object" == typeof g2 && null !== g2 && "function" == typeof g2.then) {
                b2.status = 0, b2.thenableState = $();
                var h2 = b2.ping;
                g2.then(h2, h2);
              } else aQ(a10, b2, g2);
            }
          } finally {
            ay = c2;
          }
        }
      }
      function aT(a10, b2) {
        var c2 = ay;
        try {
          aP(a10, b2, b2.model);
        } finally {
          ay = c2;
        }
      }
      function aU(a10) {
        var b2 = ae.H;
        ae.H = _;
        var c2 = aq;
        X = aq = a10;
        try {
          var d2 = a10.pingedTasks;
          a10.pingedTasks = [];
          for (var e2 = 0; e2 < d2.length; e2++) aS(a10, d2[e2]);
          aX(a10);
        } catch (b3) {
          aJ(a10, b3, null), aK(a10, b3);
        } finally {
          ae.H = b2, X = null, aq = c2;
        }
      }
      function aV(a10) {
        0 === a10.status && (a10.status = 3);
      }
      function aW(a10, b2, c2) {
        3 === a10.status && (c2 = aC(c2), a10 = aD(b2, a10.id, c2), b2.completedErrorChunks.push(a10));
      }
      function aX(a10) {
        var b2 = a10.destination;
        if (null !== b2) {
          v = new Uint8Array(2048), w = 0;
          try {
            for (var c2 = a10.completedImportChunks, d2 = 0; d2 < c2.length; d2++) a10.pendingChunks--, x(b2, c2[d2]);
            c2.splice(0, d2);
            var e2 = a10.completedHintChunks;
            for (d2 = 0; d2 < e2.length; d2++) x(b2, e2[d2]);
            e2.splice(0, d2);
            var f2 = a10.completedRegularChunks;
            for (d2 = 0; d2 < f2.length; d2++) a10.pendingChunks--, x(b2, f2[d2]);
            f2.splice(0, d2);
            var g2 = a10.completedErrorChunks;
            for (d2 = 0; d2 < g2.length; d2++) a10.pendingChunks--, x(b2, g2[d2]);
            g2.splice(0, d2);
          } finally {
            a10.flushScheduled = false, v && 0 < w && (b2.enqueue(new Uint8Array(v.buffer, 0, w)), v = null, w = 0);
          }
        }
        0 === a10.pendingChunks && (12 > a10.status && a10.cacheController.abort(Error("This render completed successfully. All cacheSignals are now aborted to allow clean up of any unused resources.")), null !== a10.destination && (a10.status = 14, a10.destination.close(), a10.destination = null));
      }
      function aY(a10) {
        a10.flushScheduled = null !== a10.destination, P ? u(function() {
          Q.run(a10, aU, a10);
        }) : u(function() {
          return aU(a10);
        }), setTimeout(function() {
          10 === a10.status && (a10.status = 11);
        }, 0);
      }
      function aZ(a10) {
        false === a10.flushScheduled && 0 === a10.pingedTasks.length && null !== a10.destination && (a10.flushScheduled = true, setTimeout(function() {
          a10.flushScheduled = false, aX(a10);
        }, 0));
      }
      function a$(a10) {
        0 === a10.abortableTasks.size && (a10 = a10.onAllReady)();
      }
      function a_(a10, b2) {
        if (13 === a10.status) a10.status = 14, B(b2, a10.fatalError);
        else if (14 !== a10.status && null === a10.destination) {
          a10.destination = b2;
          try {
            aX(a10);
          } catch (b3) {
            aJ(a10, b3, null), aK(a10, b3);
          }
        }
      }
      function a0(a10, b2) {
        if (!(11 < a10.status)) try {
          a10.status = 12, a10.cacheController.abort(b2);
          var c2 = a10.abortableTasks;
          if (0 < c2.size) {
            var d2 = void 0 === b2 ? Error("The render was aborted by the server without a reason.") : "object" == typeof b2 && null !== b2 && "function" == typeof b2.then ? Error("The render was aborted by the server with a promise.") : b2, e2 = aJ(a10, d2, null), f2 = a10.nextChunkId++;
            a10.fatalError = f2, a10.pendingChunks++, aL(a10, f2, e2, d2, false), c2.forEach(function(b3) {
              return aV(b3, a10, f2);
            }), setTimeout(function() {
              try {
                c2.forEach(function(b3) {
                  return aW(b3, a10, f2);
                }), (0, a10.onAllReady)(), aX(a10);
              } catch (b3) {
                aJ(a10, b3, null), aK(a10, b3);
              }
            }, 0);
          } else (0, a10.onAllReady)(), aX(a10);
        } catch (b3) {
          aJ(a10, b3, null), aK(a10, b3);
        }
      }
      function a1(a10, b2) {
        var c2 = "", d2 = a10[b2];
        if (d2) c2 = d2.name;
        else {
          var e2 = b2.lastIndexOf("#");
          if (-1 !== e2 && (c2 = b2.slice(e2 + 1), d2 = a10[b2.slice(0, e2)]), !d2) throw Error('Could not find the module "' + b2 + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.');
        }
        return d2.async ? [d2.id, d2.chunks, c2, 1] : [d2.id, d2.chunks, c2];
      }
      var a2 = /* @__PURE__ */ new Map();
      function a3(a10) {
        var b2 = globalThis.__next_require__(a10);
        return "function" != typeof b2.then || "fulfilled" === b2.status ? null : (b2.then(function(a11) {
          b2.status = "fulfilled", b2.value = a11;
        }, function(a11) {
          b2.status = "rejected", b2.reason = a11;
        }), b2);
      }
      function a4() {
      }
      function a5(a10) {
        for (var b2 = a10[1], d2 = [], e2 = 0; e2 < b2.length; ) {
          var f2 = b2[e2++];
          b2[e2++];
          var g2 = a2.get(f2);
          if (void 0 === g2) {
            g2 = c.e(f2), d2.push(g2);
            var h2 = a2.set.bind(a2, f2, null);
            g2.then(h2, a4), a2.set(f2, g2);
          } else null !== g2 && d2.push(g2);
        }
        return 4 === a10.length ? 0 === d2.length ? a3(a10[0]) : Promise.all(d2).then(function() {
          return a3(a10[0]);
        }) : 0 < d2.length ? Promise.all(d2) : null;
      }
      function a6(a10) {
        var b2 = globalThis.__next_require__(a10[0]);
        if (4 === a10.length && "function" == typeof b2.then) if ("fulfilled" === b2.status) b2 = b2.value;
        else throw b2.reason;
        return "*" === a10[2] ? b2 : "" === a10[2] ? b2.__esModule ? b2.default : b2 : b2[a10[2]];
      }
      function a7(a10, b2, c2, d2) {
        this.status = a10, this.value = b2, this.reason = c2, this._response = d2;
      }
      function a8(a10) {
        return new a7("pending", null, null, a10);
      }
      function a9(a10, b2) {
        for (var c2 = 0; c2 < a10.length; c2++) (0, a10[c2])(b2);
      }
      function ba(a10, b2) {
        if ("pending" !== a10.status && "blocked" !== a10.status) a10.reason.error(b2);
        else {
          var c2 = a10.reason;
          a10.status = "rejected", a10.reason = b2, null !== c2 && a9(c2, b2);
        }
      }
      function bb(a10, b2, c2) {
        if ("pending" !== a10.status) a10 = a10.reason, "C" === b2[0] ? a10.close("C" === b2 ? '"$undefined"' : b2.slice(1)) : a10.enqueueModel(b2);
        else {
          var d2 = a10.value, e2 = a10.reason;
          if (a10.status = "resolved_model", a10.value = b2, a10.reason = c2, null !== d2) switch (bg(a10), a10.status) {
            case "fulfilled":
              a9(d2, a10.value);
              break;
            case "pending":
            case "blocked":
            case "cyclic":
              if (a10.value) for (b2 = 0; b2 < d2.length; b2++) a10.value.push(d2[b2]);
              else a10.value = d2;
              if (a10.reason) {
                if (e2) for (b2 = 0; b2 < e2.length; b2++) a10.reason.push(e2[b2]);
              } else a10.reason = e2;
              break;
            case "rejected":
              e2 && a9(e2, a10.reason);
          }
        }
      }
      function bc(a10, b2, c2) {
        return new a7("resolved_model", (c2 ? '{"done":true,"value":' : '{"done":false,"value":') + b2 + "}", -1, a10);
      }
      function bd(a10, b2, c2) {
        bb(a10, (c2 ? '{"done":true,"value":' : '{"done":false,"value":') + b2 + "}", -1);
      }
      a7.prototype = Object.create(Promise.prototype), a7.prototype.then = function(a10, b2) {
        switch ("resolved_model" === this.status && bg(this), this.status) {
          case "fulfilled":
            a10(this.value);
            break;
          case "pending":
          case "blocked":
          case "cyclic":
            a10 && (null === this.value && (this.value = []), this.value.push(a10)), b2 && (null === this.reason && (this.reason = []), this.reason.push(b2));
            break;
          default:
            b2(this.reason);
        }
      };
      var be = null, bf = null;
      function bg(a10) {
        var b2 = be, c2 = bf;
        be = a10, bf = null;
        var d2 = -1 === a10.reason ? void 0 : a10.reason.toString(16), e2 = a10.value;
        a10.status = "cyclic", a10.value = null, a10.reason = null;
        try {
          var f2 = JSON.parse(e2), g2 = function a11(b3, c3, d3, e3, f3) {
            if ("string" == typeof e3) return function(a12, b4, c4, d4, e4) {
              if ("$" === d4[0]) {
                switch (d4[1]) {
                  case "$":
                    return d4.slice(1);
                  case "@":
                    return bi(a12, b4 = parseInt(d4.slice(2), 16));
                  case "F":
                    return d4 = bl(a12, d4 = d4.slice(2), b4, c4, bp), function(a13, b5, c5, d5, e5, f5) {
                      var g5 = a1(a13._bundlerConfig, b5);
                      if (b5 = a5(g5), c5) c5 = Promise.all([c5, b5]).then(function(a14) {
                        a14 = a14[0];
                        var b6 = a6(g5);
                        return b6.bind.apply(b6, [null].concat(a14));
                      });
                      else {
                        if (!b5) return a6(g5);
                        c5 = Promise.resolve(b5).then(function() {
                          return a6(g5);
                        });
                      }
                      return c5.then(bj(d5, e5, f5, false, a13, bp, []), bk(d5)), null;
                    }(a12, d4.id, d4.bound, be, b4, c4);
                  case "T":
                    var f4, g4;
                    if (void 0 === e4 || void 0 === a12._temporaryReferences) throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
                    return f4 = a12._temporaryReferences, g4 = new Proxy(g4 = Object.defineProperties(function() {
                      throw Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    }, { $$typeof: { value: R } }), S), f4.set(g4, e4), g4;
                  case "Q":
                    return bl(a12, d4 = d4.slice(2), b4, c4, bm);
                  case "W":
                    return bl(a12, d4 = d4.slice(2), b4, c4, bn);
                  case "K":
                    b4 = d4.slice(2);
                    var h3 = a12._prefix + b4 + "_", i2 = new FormData();
                    return a12._formData.forEach(function(a13, b5) {
                      b5.startsWith(h3) && i2.append(b5.slice(h3.length), a13);
                    }), i2;
                  case "i":
                    return bl(a12, d4 = d4.slice(2), b4, c4, bo);
                  case "I":
                    return 1 / 0;
                  case "-":
                    return "$-0" === d4 ? -0 : -1 / 0;
                  case "N":
                    return NaN;
                  case "u":
                    return;
                  case "D":
                    return new Date(Date.parse(d4.slice(2)));
                  case "n":
                    return BigInt(d4.slice(2));
                }
                switch (d4[1]) {
                  case "A":
                    return bq(a12, d4, ArrayBuffer, 1, b4, c4);
                  case "O":
                    return bq(a12, d4, Int8Array, 1, b4, c4);
                  case "o":
                    return bq(a12, d4, Uint8Array, 1, b4, c4);
                  case "U":
                    return bq(a12, d4, Uint8ClampedArray, 1, b4, c4);
                  case "S":
                    return bq(a12, d4, Int16Array, 2, b4, c4);
                  case "s":
                    return bq(a12, d4, Uint16Array, 2, b4, c4);
                  case "L":
                    return bq(a12, d4, Int32Array, 4, b4, c4);
                  case "l":
                    return bq(a12, d4, Uint32Array, 4, b4, c4);
                  case "G":
                    return bq(a12, d4, Float32Array, 4, b4, c4);
                  case "g":
                    return bq(a12, d4, Float64Array, 8, b4, c4);
                  case "M":
                    return bq(a12, d4, BigInt64Array, 8, b4, c4);
                  case "m":
                    return bq(a12, d4, BigUint64Array, 8, b4, c4);
                  case "V":
                    return bq(a12, d4, DataView, 1, b4, c4);
                  case "B":
                    return b4 = parseInt(d4.slice(2), 16), a12._formData.get(a12._prefix + b4);
                }
                switch (d4[1]) {
                  case "R":
                    return bs(a12, d4, void 0);
                  case "r":
                    return bs(a12, d4, "bytes");
                  case "X":
                    return bu(a12, d4, false);
                  case "x":
                    return bu(a12, d4, true);
                }
                return bl(a12, d4 = d4.slice(1), b4, c4, bp);
              }
              return d4;
            }(b3, c3, d3, e3, f3);
            if ("object" == typeof e3 && null !== e3) if (void 0 !== f3 && void 0 !== b3._temporaryReferences && b3._temporaryReferences.set(e3, f3), Array.isArray(e3)) for (var g3 = 0; g3 < e3.length; g3++) e3[g3] = a11(b3, e3, "" + g3, e3[g3], void 0 !== f3 ? f3 + ":" + g3 : void 0);
            else for (g3 in e3) al.call(e3, g3) && (c3 = void 0 !== f3 && -1 === g3.indexOf(":") ? f3 + ":" + g3 : void 0, void 0 !== (c3 = a11(b3, e3, g3, e3[g3], c3)) ? e3[g3] = c3 : delete e3[g3]);
            return e3;
          }(a10._response, { "": f2 }, "", f2, d2);
          if (null !== bf && 0 < bf.deps) bf.value = g2, a10.status = "blocked";
          else {
            var h2 = a10.value;
            a10.status = "fulfilled", a10.value = g2, null !== h2 && a9(h2, g2);
          }
        } catch (b3) {
          a10.status = "rejected", a10.reason = b3;
        } finally {
          be = b2, bf = c2;
        }
      }
      function bh(a10, b2) {
        a10._closed = true, a10._closedReason = b2, a10._chunks.forEach(function(a11) {
          "pending" === a11.status && ba(a11, b2);
        });
      }
      function bi(a10, b2) {
        var c2 = a10._chunks, d2 = c2.get(b2);
        return d2 || (d2 = null != (d2 = a10._formData.get(a10._prefix + b2)) ? new a7("resolved_model", d2, b2, a10) : a10._closed ? new a7("rejected", null, a10._closedReason, a10) : a8(a10), c2.set(b2, d2)), d2;
      }
      function bj(a10, b2, c2, d2, e2, f2, g2) {
        if (bf) {
          var h2 = bf;
          d2 || h2.deps++;
        } else h2 = bf = { deps: +!d2, value: null };
        return function(d3) {
          for (var i2 = 1; i2 < g2.length; i2++) d3 = d3[g2[i2]];
          b2[c2] = f2(e2, d3), "" === c2 && null === h2.value && (h2.value = b2[c2]), h2.deps--, 0 === h2.deps && "blocked" === a10.status && (d3 = a10.value, a10.status = "fulfilled", a10.value = h2.value, null !== d3 && a9(d3, h2.value));
        };
      }
      function bk(a10) {
        return function(b2) {
          return ba(a10, b2);
        };
      }
      function bl(a10, b2, c2, d2, e2) {
        var f2 = parseInt((b2 = b2.split(":"))[0], 16);
        switch ("resolved_model" === (f2 = bi(a10, f2)).status && bg(f2), f2.status) {
          case "fulfilled":
            for (d2 = 1, c2 = f2.value; d2 < b2.length; d2++) c2 = c2[b2[d2]];
            return e2(a10, c2);
          case "pending":
          case "blocked":
          case "cyclic":
            var g2 = be;
            return f2.then(bj(g2, c2, d2, "cyclic" === f2.status, a10, e2, b2), bk(g2)), null;
          default:
            throw f2.reason;
        }
      }
      function bm(a10, b2) {
        return new Map(b2);
      }
      function bn(a10, b2) {
        return new Set(b2);
      }
      function bo(a10, b2) {
        return b2[Symbol.iterator]();
      }
      function bp(a10, b2) {
        return b2;
      }
      function bq(a10, b2, c2, d2, e2, f2) {
        return b2 = parseInt(b2.slice(2), 16), b2 = a10._formData.get(a10._prefix + b2), b2 = c2 === ArrayBuffer ? b2.arrayBuffer() : b2.arrayBuffer().then(function(a11) {
          return new c2(a11);
        }), d2 = be, b2.then(bj(d2, e2, f2, false, a10, bp, []), bk(d2)), null;
      }
      function br(a10, b2, c2, d2) {
        var e2 = a10._chunks;
        for (c2 = new a7("fulfilled", c2, d2, a10), e2.set(b2, c2), a10 = a10._formData.getAll(a10._prefix + b2), b2 = 0; b2 < a10.length; b2++) "C" === (e2 = a10[b2])[0] ? d2.close("C" === e2 ? '"$undefined"' : e2.slice(1)) : d2.enqueueModel(e2);
      }
      function bs(a10, b2, c2) {
        b2 = parseInt(b2.slice(2), 16);
        var d2 = null;
        c2 = new ReadableStream({ type: c2, start: function(a11) {
          d2 = a11;
        } });
        var e2 = null;
        return br(a10, b2, c2, { enqueueModel: function(b3) {
          if (null === e2) {
            var c3 = new a7("resolved_model", b3, -1, a10);
            bg(c3), "fulfilled" === c3.status ? d2.enqueue(c3.value) : (c3.then(function(a11) {
              return d2.enqueue(a11);
            }, function(a11) {
              return d2.error(a11);
            }), e2 = c3);
          } else {
            c3 = e2;
            var f2 = a8(a10);
            f2.then(function(a11) {
              return d2.enqueue(a11);
            }, function(a11) {
              return d2.error(a11);
            }), e2 = f2, c3.then(function() {
              e2 === f2 && (e2 = null), bb(f2, b3, -1);
            });
          }
        }, close: function() {
          if (null === e2) d2.close();
          else {
            var a11 = e2;
            e2 = null, a11.then(function() {
              return d2.close();
            });
          }
        }, error: function(a11) {
          if (null === e2) d2.error(a11);
          else {
            var b3 = e2;
            e2 = null, b3.then(function() {
              return d2.error(a11);
            });
          }
        } }), c2;
      }
      function bt() {
        return this;
      }
      function bu(a10, b2, c2) {
        b2 = parseInt(b2.slice(2), 16);
        var d2 = [], e2 = false, f2 = 0, g2 = {};
        return g2[r] = function() {
          var b3, c3 = 0;
          return (b3 = { next: b3 = function(b4) {
            if (void 0 !== b4) throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
            if (c3 === d2.length) {
              if (e2) return new a7("fulfilled", { done: true, value: void 0 }, null, a10);
              d2[c3] = a8(a10);
            }
            return d2[c3++];
          } })[r] = bt, b3;
        }, br(a10, b2, c2 = c2 ? g2[r]() : g2, { enqueueModel: function(b3) {
          f2 === d2.length ? d2[f2] = bc(a10, b3, false) : bd(d2[f2], b3, false), f2++;
        }, close: function(b3) {
          for (e2 = true, f2 === d2.length ? d2[f2] = bc(a10, b3, true) : bd(d2[f2], b3, true), f2++; f2 < d2.length; ) bd(d2[f2++], '"$undefined"', true);
        }, error: function(b3) {
          for (e2 = true, f2 === d2.length && (d2[f2] = a8(a10)); f2 < d2.length; ) ba(d2[f2++], b3);
        } }), c2;
      }
      function bv(a10, b2, c2) {
        var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData();
        return { _bundlerConfig: a10, _prefix: b2, _formData: d2, _chunks: /* @__PURE__ */ new Map(), _closed: false, _closedReason: null, _temporaryReferences: c2 };
      }
      function bw(a10) {
        bh(a10, Error("Connection closed."));
      }
      function bx(a10, b2, c2) {
        var d2 = a1(a10, b2);
        return a10 = a5(d2), c2 ? Promise.all([c2, a10]).then(function(a11) {
          a11 = a11[0];
          var b3 = a6(d2);
          return b3.bind.apply(b3, [null].concat(a11));
        }) : a10 ? Promise.resolve(a10).then(function() {
          return a6(d2);
        }) : Promise.resolve(a6(d2));
      }
      function by(a10, b2, c2) {
        if (bw(a10 = bv(b2, c2, void 0, a10)), (a10 = bi(a10, 0)).then(function() {
        }), "fulfilled" !== a10.status) throw a10.reason;
        return a10.value;
      }
      b.createClientModuleProxy = function(a10) {
        return new Proxy(a10 = E({}, a10, false), L);
      }, b.createTemporaryReferenceSet = function() {
        return /* @__PURE__ */ new WeakMap();
      }, b.decodeAction = function(a10, b2) {
        var c2 = new FormData(), d2 = null;
        return a10.forEach(function(e2, f2) {
          f2.startsWith("$ACTION_") ? f2.startsWith("$ACTION_REF_") ? (e2 = by(a10, b2, e2 = "$ACTION_" + f2.slice(12) + ":"), d2 = bx(b2, e2.id, e2.bound)) : f2.startsWith("$ACTION_ID_") && (d2 = bx(b2, e2 = f2.slice(11), null)) : c2.append(f2, e2);
        }), null === d2 ? null : d2.then(function(a11) {
          return a11.bind(null, c2);
        });
      }, b.decodeFormState = function(a10, b2, c2) {
        var d2 = b2.get("$ACTION_KEY");
        if ("string" != typeof d2) return Promise.resolve(null);
        var e2 = null;
        if (b2.forEach(function(a11, d3) {
          d3.startsWith("$ACTION_REF_") && (e2 = by(b2, c2, "$ACTION_" + d3.slice(12) + ":"));
        }), null === e2) return Promise.resolve(null);
        var f2 = e2.id;
        return Promise.resolve(e2.bound).then(function(b3) {
          return null === b3 ? null : [a10, d2, f2, b3.length - 1];
        });
      }, b.decodeReply = function(a10, b2, c2) {
        if ("string" == typeof a10) {
          var d2 = new FormData();
          d2.append("0", a10), a10 = d2;
        }
        return b2 = bi(a10 = bv(b2, "", c2 ? c2.temporaryReferences : void 0, a10), 0), bw(a10), b2;
      }, b.decodeReplyFromAsyncIterable = function(a10, b2, c2) {
        function d2(a11) {
          bh(f2, a11), "function" == typeof e2.throw && e2.throw(a11).then(d2, d2);
        }
        var e2 = a10[r](), f2 = bv(b2, "", c2 ? c2.temporaryReferences : void 0);
        return e2.next().then(function a11(b3) {
          if (b3.done) bw(f2);
          else {
            var c3 = (b3 = b3.value)[0];
            if ("string" == typeof (b3 = b3[1])) {
              f2._formData.append(c3, b3);
              var g2 = f2._prefix;
              if (c3.startsWith(g2)) {
                var h2 = f2._chunks;
                c3 = +c3.slice(g2.length), (h2 = h2.get(c3)) && bb(h2, b3, c3);
              }
            } else f2._formData.append(c3, b3);
            e2.next().then(a11, d2);
          }
        }, d2), bi(f2, 0);
      }, b.registerClientReference = function(a10, b2, c2) {
        return E(a10, b2 + "#" + c2, false);
      }, b.registerServerReference = function(a10, b2, c2) {
        return Object.defineProperties(a10, { $$typeof: { value: D }, $$id: { value: null === c2 ? b2 : b2 + "#" + c2, configurable: true }, $$bound: { value: null, configurable: true }, bind: { value: H, configurable: true } });
      }, b.renderToReadableStream = function(a10, b2, c2) {
        var d2 = new ap(20, a10, b2, c2 ? c2.onError : void 0, c2 ? c2.onPostpone : void 0, T, T, c2 ? c2.identifierPrefix : void 0, c2 ? c2.temporaryReferences : void 0);
        if (c2 && c2.signal) {
          var e2 = c2.signal;
          if (e2.aborted) a0(d2, e2.reason);
          else {
            var f2 = function() {
              a0(d2, e2.reason), e2.removeEventListener("abort", f2);
            };
            e2.addEventListener("abort", f2);
          }
        }
        return new ReadableStream({ type: "bytes", start: function() {
          aY(d2);
        }, pull: function(a11) {
          a_(d2, a11);
        }, cancel: function(a11) {
          d2.destination = null, a0(d2, a11);
        } }, { highWaterMark: 0 });
      }, b.unstable_prerender = function(a10, b2, c2) {
        return new Promise(function(d2, e2) {
          var f2 = new ap(21, a10, b2, c2 ? c2.onError : void 0, c2 ? c2.onPostpone : void 0, function() {
            d2({ prelude: new ReadableStream({ type: "bytes", pull: function(a11) {
              a_(f2, a11);
            }, cancel: function(a11) {
              f2.destination = null, a0(f2, a11);
            } }, { highWaterMark: 0 }) });
          }, e2, c2 ? c2.identifierPrefix : void 0, c2 ? c2.temporaryReferences : void 0);
          if (c2 && c2.signal) {
            var g2 = c2.signal;
            if (g2.aborted) a0(f2, g2.reason);
            else {
              var h2 = function() {
                a0(f2, g2.reason), g2.removeEventListener("abort", h2);
              };
              g2.addEventListener("abort", h2);
            }
          }
          aY(f2);
        });
      };
    }, 770: (a, b, c) => {
      "use strict";
      function d(a2) {
        return "object" == typeof a2 && null !== a2 && "digest" in a2 && a2.digest === e;
      }
      c.d(b, { Ts: () => d, W5: () => h });
      let e = "HANGING_PROMISE_REJECTION";
      class f extends Error {
        constructor(a2, b2) {
          super(`During prerendering, ${b2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${b2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${a2}".`), this.route = a2, this.expression = b2, this.digest = e;
        }
      }
      let g = /* @__PURE__ */ new WeakMap();
      function h(a2, b2, c2) {
        if (a2.aborted) return Promise.reject(new f(b2, c2));
        {
          let d2 = new Promise((d3, e2) => {
            let h2 = e2.bind(null, new f(b2, c2)), i2 = g.get(a2);
            if (i2) i2.push(h2);
            else {
              let b3 = [h2];
              g.set(a2, b3), a2.addEventListener("abort", () => {
                for (let a3 = 0; a3 < b3.length; a3++) b3[a3]();
              }, { once: true });
            }
          });
          return d2.catch(i), d2;
        }
      }
      function i() {
      }
    }, 809: (a, b, c) => {
      "use strict";
      c.d(b, { z: () => d });
      class d extends Error {
        constructor(a2, b2) {
          super("Invariant: " + (a2.endsWith(".") ? a2 : a2 + ".") + " This is a bug in Next.js.", b2), this.name = "InvariantError";
        }
      }
    }, 814: (a, b, c) => {
      "use strict";
      a.exports = c(440);
    }, 817: (a, b, c) => {
      (() => {
        "use strict";
        var b2 = { 491: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ContextAPI = void 0;
          let d2 = c2(223), e2 = c2(172), f2 = c2(930), g = "context", h = new d2.NoopContextManager();
          class i {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new i()), this._instance;
            }
            setGlobalContextManager(a3) {
              return (0, e2.registerGlobal)(g, a3, f2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(a3, b4, c3, ...d3) {
              return this._getContextManager().with(a3, b4, c3, ...d3);
            }
            bind(a3, b4) {
              return this._getContextManager().bind(a3, b4);
            }
            _getContextManager() {
              return (0, e2.getGlobal)(g) || h;
            }
            disable() {
              this._getContextManager().disable(), (0, e2.unregisterGlobal)(g, f2.DiagAPI.instance());
            }
          }
          b3.ContextAPI = i;
        }, 930: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagAPI = void 0;
          let d2 = c2(56), e2 = c2(912), f2 = c2(957), g = c2(172);
          class h {
            constructor() {
              function a3(a4) {
                return function(...b5) {
                  let c3 = (0, g.getGlobal)("diag");
                  if (c3) return c3[a4](...b5);
                };
              }
              let b4 = this;
              b4.setLogger = (a4, c3 = { logLevel: f2.DiagLogLevel.INFO }) => {
                var d3, h2, i;
                if (a4 === b4) {
                  let a5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return b4.error(null != (d3 = a5.stack) ? d3 : a5.message), false;
                }
                "number" == typeof c3 && (c3 = { logLevel: c3 });
                let j = (0, g.getGlobal)("diag"), k = (0, e2.createLogLevelDiagLogger)(null != (h2 = c3.logLevel) ? h2 : f2.DiagLogLevel.INFO, a4);
                if (j && !c3.suppressOverrideMessage) {
                  let a5 = null != (i = Error().stack) ? i : "<failed to generate stacktrace>";
                  j.warn(`Current logger will be overwritten from ${a5}`), k.warn(`Current logger will overwrite one already registered from ${a5}`);
                }
                return (0, g.registerGlobal)("diag", k, b4, true);
              }, b4.disable = () => {
                (0, g.unregisterGlobal)("diag", b4);
              }, b4.createComponentLogger = (a4) => new d2.DiagComponentLogger(a4), b4.verbose = a3("verbose"), b4.debug = a3("debug"), b4.info = a3("info"), b4.warn = a3("warn"), b4.error = a3("error");
            }
            static instance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
          }
          b3.DiagAPI = h;
        }, 653: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.MetricsAPI = void 0;
          let d2 = c2(660), e2 = c2(172), f2 = c2(930), g = "metrics";
          class h {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new h()), this._instance;
            }
            setGlobalMeterProvider(a3) {
              return (0, e2.registerGlobal)(g, a3, f2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, e2.getGlobal)(g) || d2.NOOP_METER_PROVIDER;
            }
            getMeter(a3, b4, c3) {
              return this.getMeterProvider().getMeter(a3, b4, c3);
            }
            disable() {
              (0, e2.unregisterGlobal)(g, f2.DiagAPI.instance());
            }
          }
          b3.MetricsAPI = h;
        }, 181: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.PropagationAPI = void 0;
          let d2 = c2(172), e2 = c2(874), f2 = c2(194), g = c2(277), h = c2(369), i = c2(930), j = "propagation", k = new e2.NoopTextMapPropagator();
          class l {
            constructor() {
              this.createBaggage = h.createBaggage, this.getBaggage = g.getBaggage, this.getActiveBaggage = g.getActiveBaggage, this.setBaggage = g.setBaggage, this.deleteBaggage = g.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalPropagator(a3) {
              return (0, d2.registerGlobal)(j, a3, i.DiagAPI.instance());
            }
            inject(a3, b4, c3 = f2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(a3, b4, c3);
            }
            extract(a3, b4, c3 = f2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(a3, b4, c3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, d2.unregisterGlobal)(j, i.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, d2.getGlobal)(j) || k;
            }
          }
          b3.PropagationAPI = l;
        }, 997: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceAPI = void 0;
          let d2 = c2(172), e2 = c2(846), f2 = c2(139), g = c2(607), h = c2(930), i = "trace";
          class j {
            constructor() {
              this._proxyTracerProvider = new e2.ProxyTracerProvider(), this.wrapSpanContext = f2.wrapSpanContext, this.isSpanContextValid = f2.isSpanContextValid, this.deleteSpan = g.deleteSpan, this.getSpan = g.getSpan, this.getActiveSpan = g.getActiveSpan, this.getSpanContext = g.getSpanContext, this.setSpan = g.setSpan, this.setSpanContext = g.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new j()), this._instance;
            }
            setGlobalTracerProvider(a3) {
              let b4 = (0, d2.registerGlobal)(i, this._proxyTracerProvider, h.DiagAPI.instance());
              return b4 && this._proxyTracerProvider.setDelegate(a3), b4;
            }
            getTracerProvider() {
              return (0, d2.getGlobal)(i) || this._proxyTracerProvider;
            }
            getTracer(a3, b4) {
              return this.getTracerProvider().getTracer(a3, b4);
            }
            disable() {
              (0, d2.unregisterGlobal)(i, h.DiagAPI.instance()), this._proxyTracerProvider = new e2.ProxyTracerProvider();
            }
          }
          b3.TraceAPI = j;
        }, 277: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.deleteBaggage = b3.setBaggage = b3.getActiveBaggage = b3.getBaggage = void 0;
          let d2 = c2(491), e2 = (0, c2(780).createContextKey)("OpenTelemetry Baggage Key");
          function f2(a3) {
            return a3.getValue(e2) || void 0;
          }
          b3.getBaggage = f2, b3.getActiveBaggage = function() {
            return f2(d2.ContextAPI.getInstance().active());
          }, b3.setBaggage = function(a3, b4) {
            return a3.setValue(e2, b4);
          }, b3.deleteBaggage = function(a3) {
            return a3.deleteValue(e2);
          };
        }, 993: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.BaggageImpl = void 0;
          class c2 {
            constructor(a3) {
              this._entries = a3 ? new Map(a3) : /* @__PURE__ */ new Map();
            }
            getEntry(a3) {
              let b4 = this._entries.get(a3);
              if (b4) return Object.assign({}, b4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([a3, b4]) => [a3, b4]);
            }
            setEntry(a3, b4) {
              let d2 = new c2(this._entries);
              return d2._entries.set(a3, b4), d2;
            }
            removeEntry(a3) {
              let b4 = new c2(this._entries);
              return b4._entries.delete(a3), b4;
            }
            removeEntries(...a3) {
              let b4 = new c2(this._entries);
              for (let c3 of a3) b4._entries.delete(c3);
              return b4;
            }
            clear() {
              return new c2();
            }
          }
          b3.BaggageImpl = c2;
        }, 830: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.baggageEntryMetadataSymbol = void 0, b3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.baggageEntryMetadataFromString = b3.createBaggage = void 0;
          let d2 = c2(930), e2 = c2(993), f2 = c2(830), g = d2.DiagAPI.instance();
          b3.createBaggage = function(a3 = {}) {
            return new e2.BaggageImpl(new Map(Object.entries(a3)));
          }, b3.baggageEntryMetadataFromString = function(a3) {
            return "string" != typeof a3 && (g.error(`Cannot create baggage metadata from unknown type: ${typeof a3}`), a3 = ""), { __TYPE__: f2.baggageEntryMetadataSymbol, toString: () => a3 };
          };
        }, 67: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.context = void 0, b3.context = c2(491).ContextAPI.getInstance();
        }, 223: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopContextManager = void 0;
          let d2 = c2(780);
          class e2 {
            active() {
              return d2.ROOT_CONTEXT;
            }
            with(a3, b4, c3, ...d3) {
              return b4.call(c3, ...d3);
            }
            bind(a3, b4) {
              return b4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          b3.NoopContextManager = e2;
        }, 780: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ROOT_CONTEXT = b3.createContextKey = void 0, b3.createContextKey = function(a3) {
            return Symbol.for(a3);
          };
          class c2 {
            constructor(a3) {
              let b4 = this;
              b4._currentContext = a3 ? new Map(a3) : /* @__PURE__ */ new Map(), b4.getValue = (a4) => b4._currentContext.get(a4), b4.setValue = (a4, d2) => {
                let e2 = new c2(b4._currentContext);
                return e2._currentContext.set(a4, d2), e2;
              }, b4.deleteValue = (a4) => {
                let d2 = new c2(b4._currentContext);
                return d2._currentContext.delete(a4), d2;
              };
            }
          }
          b3.ROOT_CONTEXT = new c2();
        }, 506: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.diag = void 0, b3.diag = c2(930).DiagAPI.instance();
        }, 56: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagComponentLogger = void 0;
          let d2 = c2(172);
          class e2 {
            constructor(a3) {
              this._namespace = a3.namespace || "DiagComponentLogger";
            }
            debug(...a3) {
              return f2("debug", this._namespace, a3);
            }
            error(...a3) {
              return f2("error", this._namespace, a3);
            }
            info(...a3) {
              return f2("info", this._namespace, a3);
            }
            warn(...a3) {
              return f2("warn", this._namespace, a3);
            }
            verbose(...a3) {
              return f2("verbose", this._namespace, a3);
            }
          }
          function f2(a3, b4, c3) {
            let e3 = (0, d2.getGlobal)("diag");
            if (e3) return c3.unshift(b4), e3[a3](...c3);
          }
          b3.DiagComponentLogger = e2;
        }, 972: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagConsoleLogger = void 0;
          let c2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class d2 {
            constructor() {
              for (let a3 = 0; a3 < c2.length; a3++) this[c2[a3].n] = /* @__PURE__ */ function(a4) {
                return function(...b4) {
                  if (console) {
                    let c3 = console[a4];
                    if ("function" != typeof c3 && (c3 = console.log), "function" == typeof c3) return c3.apply(console, b4);
                  }
                };
              }(c2[a3].c);
            }
          }
          b3.DiagConsoleLogger = d2;
        }, 912: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createLogLevelDiagLogger = void 0;
          let d2 = c2(957);
          b3.createLogLevelDiagLogger = function(a3, b4) {
            function c3(c4, d3) {
              let e2 = b4[c4];
              return "function" == typeof e2 && a3 >= d3 ? e2.bind(b4) : function() {
              };
            }
            return a3 < d2.DiagLogLevel.NONE ? a3 = d2.DiagLogLevel.NONE : a3 > d2.DiagLogLevel.ALL && (a3 = d2.DiagLogLevel.ALL), b4 = b4 || {}, { error: c3("error", d2.DiagLogLevel.ERROR), warn: c3("warn", d2.DiagLogLevel.WARN), info: c3("info", d2.DiagLogLevel.INFO), debug: c3("debug", d2.DiagLogLevel.DEBUG), verbose: c3("verbose", d2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.DiagLogLevel = void 0, function(a3) {
            a3[a3.NONE = 0] = "NONE", a3[a3.ERROR = 30] = "ERROR", a3[a3.WARN = 50] = "WARN", a3[a3.INFO = 60] = "INFO", a3[a3.DEBUG = 70] = "DEBUG", a3[a3.VERBOSE = 80] = "VERBOSE", a3[a3.ALL = 9999] = "ALL";
          }(b3.DiagLogLevel || (b3.DiagLogLevel = {}));
        }, 172: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.unregisterGlobal = b3.getGlobal = b3.registerGlobal = void 0;
          let d2 = c2(200), e2 = c2(521), f2 = c2(130), g = e2.VERSION.split(".")[0], h = Symbol.for(`opentelemetry.js.api.${g}`), i = d2._globalThis;
          b3.registerGlobal = function(a3, b4, c3, d3 = false) {
            var f3;
            let g2 = i[h] = null != (f3 = i[h]) ? f3 : { version: e2.VERSION };
            if (!d3 && g2[a3]) {
              let b5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${a3}`);
              return c3.error(b5.stack || b5.message), false;
            }
            if (g2.version !== e2.VERSION) {
              let b5 = Error(`@opentelemetry/api: Registration of version v${g2.version} for ${a3} does not match previously registered API v${e2.VERSION}`);
              return c3.error(b5.stack || b5.message), false;
            }
            return g2[a3] = b4, c3.debug(`@opentelemetry/api: Registered a global for ${a3} v${e2.VERSION}.`), true;
          }, b3.getGlobal = function(a3) {
            var b4, c3;
            let d3 = null == (b4 = i[h]) ? void 0 : b4.version;
            if (d3 && (0, f2.isCompatible)(d3)) return null == (c3 = i[h]) ? void 0 : c3[a3];
          }, b3.unregisterGlobal = function(a3, b4) {
            b4.debug(`@opentelemetry/api: Unregistering a global for ${a3} v${e2.VERSION}.`);
            let c3 = i[h];
            c3 && delete c3[a3];
          };
        }, 130: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.isCompatible = b3._makeCompatibilityCheck = void 0;
          let d2 = c2(521), e2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function f2(a3) {
            let b4 = /* @__PURE__ */ new Set([a3]), c3 = /* @__PURE__ */ new Set(), d3 = a3.match(e2);
            if (!d3) return () => false;
            let f3 = { major: +d3[1], minor: +d3[2], patch: +d3[3], prerelease: d3[4] };
            if (null != f3.prerelease) return function(b5) {
              return b5 === a3;
            };
            function g(a4) {
              return c3.add(a4), false;
            }
            return function(a4) {
              if (b4.has(a4)) return true;
              if (c3.has(a4)) return false;
              let d4 = a4.match(e2);
              if (!d4) return g(a4);
              let h = { major: +d4[1], minor: +d4[2], patch: +d4[3], prerelease: d4[4] };
              if (null != h.prerelease || f3.major !== h.major) return g(a4);
              if (0 === f3.major) return f3.minor === h.minor && f3.patch <= h.patch ? (b4.add(a4), true) : g(a4);
              return f3.minor <= h.minor ? (b4.add(a4), true) : g(a4);
            };
          }
          b3._makeCompatibilityCheck = f2, b3.isCompatible = f2(d2.VERSION);
        }, 886: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.metrics = void 0, b3.metrics = c2(653).MetricsAPI.getInstance();
        }, 901: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ValueType = void 0, function(a3) {
            a3[a3.INT = 0] = "INT", a3[a3.DOUBLE = 1] = "DOUBLE";
          }(b3.ValueType || (b3.ValueType = {}));
        }, 102: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createNoopMeter = b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = b3.NOOP_OBSERVABLE_GAUGE_METRIC = b3.NOOP_OBSERVABLE_COUNTER_METRIC = b3.NOOP_UP_DOWN_COUNTER_METRIC = b3.NOOP_HISTOGRAM_METRIC = b3.NOOP_COUNTER_METRIC = b3.NOOP_METER = b3.NoopObservableUpDownCounterMetric = b3.NoopObservableGaugeMetric = b3.NoopObservableCounterMetric = b3.NoopObservableMetric = b3.NoopHistogramMetric = b3.NoopUpDownCounterMetric = b3.NoopCounterMetric = b3.NoopMetric = b3.NoopMeter = void 0;
          class c2 {
            constructor() {
            }
            createHistogram(a3, c3) {
              return b3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(a3, c3) {
              return b3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(a3, c3) {
              return b3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(a3, c3) {
              return b3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(a3, c3) {
              return b3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(a3, c3) {
              return b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(a3, b4) {
            }
            removeBatchObservableCallback(a3) {
            }
          }
          b3.NoopMeter = c2;
          class d2 {
          }
          b3.NoopMetric = d2;
          class e2 extends d2 {
            add(a3, b4) {
            }
          }
          b3.NoopCounterMetric = e2;
          class f2 extends d2 {
            add(a3, b4) {
            }
          }
          b3.NoopUpDownCounterMetric = f2;
          class g extends d2 {
            record(a3, b4) {
            }
          }
          b3.NoopHistogramMetric = g;
          class h {
            addCallback(a3) {
            }
            removeCallback(a3) {
            }
          }
          b3.NoopObservableMetric = h;
          class i extends h {
          }
          b3.NoopObservableCounterMetric = i;
          class j extends h {
          }
          b3.NoopObservableGaugeMetric = j;
          class k extends h {
          }
          b3.NoopObservableUpDownCounterMetric = k, b3.NOOP_METER = new c2(), b3.NOOP_COUNTER_METRIC = new e2(), b3.NOOP_HISTOGRAM_METRIC = new g(), b3.NOOP_UP_DOWN_COUNTER_METRIC = new f2(), b3.NOOP_OBSERVABLE_COUNTER_METRIC = new i(), b3.NOOP_OBSERVABLE_GAUGE_METRIC = new j(), b3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new k(), b3.createNoopMeter = function() {
            return b3.NOOP_METER;
          };
        }, 660: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NOOP_METER_PROVIDER = b3.NoopMeterProvider = void 0;
          let d2 = c2(102);
          class e2 {
            getMeter(a3, b4, c3) {
              return d2.NOOP_METER;
            }
          }
          b3.NoopMeterProvider = e2, b3.NOOP_METER_PROVIDER = new e2();
        }, 200: function(a2, b3, c2) {
          var d2 = this && this.__createBinding || (Object.create ? function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), Object.defineProperty(a3, d3, { enumerable: true, get: function() {
              return b4[c3];
            } });
          } : function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), a3[d3] = b4[c3];
          }), e2 = this && this.__exportStar || function(a3, b4) {
            for (var c3 in a3) "default" === c3 || Object.prototype.hasOwnProperty.call(b4, c3) || d2(b4, a3, c3);
          };
          Object.defineProperty(b3, "__esModule", { value: true }), e2(c2(46), b3);
        }, 651: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3._globalThis = void 0, b3._globalThis = "object" == typeof globalThis ? globalThis : c.g;
        }, 46: function(a2, b3, c2) {
          var d2 = this && this.__createBinding || (Object.create ? function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), Object.defineProperty(a3, d3, { enumerable: true, get: function() {
              return b4[c3];
            } });
          } : function(a3, b4, c3, d3) {
            void 0 === d3 && (d3 = c3), a3[d3] = b4[c3];
          }), e2 = this && this.__exportStar || function(a3, b4) {
            for (var c3 in a3) "default" === c3 || Object.prototype.hasOwnProperty.call(b4, c3) || d2(b4, a3, c3);
          };
          Object.defineProperty(b3, "__esModule", { value: true }), e2(c2(651), b3);
        }, 939: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.propagation = void 0, b3.propagation = c2(181).PropagationAPI.getInstance();
        }, 874: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTextMapPropagator = void 0;
          class c2 {
            inject(a3, b4) {
            }
            extract(a3, b4) {
              return a3;
            }
            fields() {
              return [];
            }
          }
          b3.NoopTextMapPropagator = c2;
        }, 194: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.defaultTextMapSetter = b3.defaultTextMapGetter = void 0, b3.defaultTextMapGetter = { get(a3, b4) {
            if (null != a3) return a3[b4];
          }, keys: (a3) => null == a3 ? [] : Object.keys(a3) }, b3.defaultTextMapSetter = { set(a3, b4, c2) {
            null != a3 && (a3[b4] = c2);
          } };
        }, 845: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.trace = void 0, b3.trace = c2(997).TraceAPI.getInstance();
        }, 403: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NonRecordingSpan = void 0;
          let d2 = c2(476);
          class e2 {
            constructor(a3 = d2.INVALID_SPAN_CONTEXT) {
              this._spanContext = a3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(a3, b4) {
              return this;
            }
            setAttributes(a3) {
              return this;
            }
            addEvent(a3, b4) {
              return this;
            }
            setStatus(a3) {
              return this;
            }
            updateName(a3) {
              return this;
            }
            end(a3) {
            }
            isRecording() {
              return false;
            }
            recordException(a3, b4) {
            }
          }
          b3.NonRecordingSpan = e2;
        }, 614: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTracer = void 0;
          let d2 = c2(491), e2 = c2(607), f2 = c2(403), g = c2(139), h = d2.ContextAPI.getInstance();
          class i {
            startSpan(a3, b4, c3 = h.active()) {
              var d3;
              if (null == b4 ? void 0 : b4.root) return new f2.NonRecordingSpan();
              let i2 = c3 && (0, e2.getSpanContext)(c3);
              return "object" == typeof (d3 = i2) && "string" == typeof d3.spanId && "string" == typeof d3.traceId && "number" == typeof d3.traceFlags && (0, g.isSpanContextValid)(i2) ? new f2.NonRecordingSpan(i2) : new f2.NonRecordingSpan();
            }
            startActiveSpan(a3, b4, c3, d3) {
              let f3, g2, i2;
              if (arguments.length < 2) return;
              2 == arguments.length ? i2 = b4 : 3 == arguments.length ? (f3 = b4, i2 = c3) : (f3 = b4, g2 = c3, i2 = d3);
              let j = null != g2 ? g2 : h.active(), k = this.startSpan(a3, f3, j), l = (0, e2.setSpan)(j, k);
              return h.with(l, i2, void 0, k);
            }
          }
          b3.NoopTracer = i;
        }, 124: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.NoopTracerProvider = void 0;
          let d2 = c2(614);
          class e2 {
            getTracer(a3, b4, c3) {
              return new d2.NoopTracer();
            }
          }
          b3.NoopTracerProvider = e2;
        }, 125: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ProxyTracer = void 0;
          let d2 = new (c2(614)).NoopTracer();
          class e2 {
            constructor(a3, b4, c3, d3) {
              this._provider = a3, this.name = b4, this.version = c3, this.options = d3;
            }
            startSpan(a3, b4, c3) {
              return this._getTracer().startSpan(a3, b4, c3);
            }
            startActiveSpan(a3, b4, c3, d3) {
              let e3 = this._getTracer();
              return Reflect.apply(e3.startActiveSpan, e3, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let a3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return a3 ? (this._delegate = a3, this._delegate) : d2;
            }
          }
          b3.ProxyTracer = e2;
        }, 846: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.ProxyTracerProvider = void 0;
          let d2 = c2(125), e2 = new (c2(124)).NoopTracerProvider();
          class f2 {
            getTracer(a3, b4, c3) {
              var e3;
              return null != (e3 = this.getDelegateTracer(a3, b4, c3)) ? e3 : new d2.ProxyTracer(this, a3, b4, c3);
            }
            getDelegate() {
              var a3;
              return null != (a3 = this._delegate) ? a3 : e2;
            }
            setDelegate(a3) {
              this._delegate = a3;
            }
            getDelegateTracer(a3, b4, c3) {
              var d3;
              return null == (d3 = this._delegate) ? void 0 : d3.getTracer(a3, b4, c3);
            }
          }
          b3.ProxyTracerProvider = f2;
        }, 996: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SamplingDecision = void 0, function(a3) {
            a3[a3.NOT_RECORD = 0] = "NOT_RECORD", a3[a3.RECORD = 1] = "RECORD", a3[a3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(b3.SamplingDecision || (b3.SamplingDecision = {}));
        }, 607: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.getSpanContext = b3.setSpanContext = b3.deleteSpan = b3.setSpan = b3.getActiveSpan = b3.getSpan = void 0;
          let d2 = c2(780), e2 = c2(403), f2 = c2(491), g = (0, d2.createContextKey)("OpenTelemetry Context Key SPAN");
          function h(a3) {
            return a3.getValue(g) || void 0;
          }
          function i(a3, b4) {
            return a3.setValue(g, b4);
          }
          b3.getSpan = h, b3.getActiveSpan = function() {
            return h(f2.ContextAPI.getInstance().active());
          }, b3.setSpan = i, b3.deleteSpan = function(a3) {
            return a3.deleteValue(g);
          }, b3.setSpanContext = function(a3, b4) {
            return i(a3, new e2.NonRecordingSpan(b4));
          }, b3.getSpanContext = function(a3) {
            var b4;
            return null == (b4 = h(a3)) ? void 0 : b4.spanContext();
          };
        }, 325: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceStateImpl = void 0;
          let d2 = c2(564);
          class e2 {
            constructor(a3) {
              this._internalState = /* @__PURE__ */ new Map(), a3 && this._parse(a3);
            }
            set(a3, b4) {
              let c3 = this._clone();
              return c3._internalState.has(a3) && c3._internalState.delete(a3), c3._internalState.set(a3, b4), c3;
            }
            unset(a3) {
              let b4 = this._clone();
              return b4._internalState.delete(a3), b4;
            }
            get(a3) {
              return this._internalState.get(a3);
            }
            serialize() {
              return this._keys().reduce((a3, b4) => (a3.push(b4 + "=" + this.get(b4)), a3), []).join(",");
            }
            _parse(a3) {
              !(a3.length > 512) && (this._internalState = a3.split(",").reverse().reduce((a4, b4) => {
                let c3 = b4.trim(), e3 = c3.indexOf("=");
                if (-1 !== e3) {
                  let f2 = c3.slice(0, e3), g = c3.slice(e3 + 1, b4.length);
                  (0, d2.validateKey)(f2) && (0, d2.validateValue)(g) && a4.set(f2, g);
                }
                return a4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let a3 = new e2();
              return a3._internalState = new Map(this._internalState), a3;
            }
          }
          b3.TraceStateImpl = e2;
        }, 564: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.validateValue = b3.validateKey = void 0;
          let c2 = "[_0-9a-z-*/]", d2 = `[a-z]${c2}{0,255}`, e2 = `[a-z0-9]${c2}{0,240}@[a-z]${c2}{0,13}`, f2 = RegExp(`^(?:${d2}|${e2})$`), g = /^[ -~]{0,255}[!-~]$/, h = /,|=/;
          b3.validateKey = function(a3) {
            return f2.test(a3);
          }, b3.validateValue = function(a3) {
            return g.test(a3) && !h.test(a3);
          };
        }, 98: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.createTraceState = void 0;
          let d2 = c2(325);
          b3.createTraceState = function(a3) {
            return new d2.TraceStateImpl(a3);
          };
        }, 476: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.INVALID_SPAN_CONTEXT = b3.INVALID_TRACEID = b3.INVALID_SPANID = void 0;
          let d2 = c2(475);
          b3.INVALID_SPANID = "0000000000000000", b3.INVALID_TRACEID = "00000000000000000000000000000000", b3.INVALID_SPAN_CONTEXT = { traceId: b3.INVALID_TRACEID, spanId: b3.INVALID_SPANID, traceFlags: d2.TraceFlags.NONE };
        }, 357: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SpanKind = void 0, function(a3) {
            a3[a3.INTERNAL = 0] = "INTERNAL", a3[a3.SERVER = 1] = "SERVER", a3[a3.CLIENT = 2] = "CLIENT", a3[a3.PRODUCER = 3] = "PRODUCER", a3[a3.CONSUMER = 4] = "CONSUMER";
          }(b3.SpanKind || (b3.SpanKind = {}));
        }, 139: (a2, b3, c2) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.wrapSpanContext = b3.isSpanContextValid = b3.isValidSpanId = b3.isValidTraceId = void 0;
          let d2 = c2(476), e2 = c2(403), f2 = /^([0-9a-f]{32})$/i, g = /^[0-9a-f]{16}$/i;
          function h(a3) {
            return f2.test(a3) && a3 !== d2.INVALID_TRACEID;
          }
          function i(a3) {
            return g.test(a3) && a3 !== d2.INVALID_SPANID;
          }
          b3.isValidTraceId = h, b3.isValidSpanId = i, b3.isSpanContextValid = function(a3) {
            return h(a3.traceId) && i(a3.spanId);
          }, b3.wrapSpanContext = function(a3) {
            return new e2.NonRecordingSpan(a3);
          };
        }, 847: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.SpanStatusCode = void 0, function(a3) {
            a3[a3.UNSET = 0] = "UNSET", a3[a3.OK = 1] = "OK", a3[a3.ERROR = 2] = "ERROR";
          }(b3.SpanStatusCode || (b3.SpanStatusCode = {}));
        }, 475: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.TraceFlags = void 0, function(a3) {
            a3[a3.NONE = 0] = "NONE", a3[a3.SAMPLED = 1] = "SAMPLED";
          }(b3.TraceFlags || (b3.TraceFlags = {}));
        }, 521: (a2, b3) => {
          Object.defineProperty(b3, "__esModule", { value: true }), b3.VERSION = void 0, b3.VERSION = "1.6.0";
        } }, d = {};
        function e(a2) {
          var c2 = d[a2];
          if (void 0 !== c2) return c2.exports;
          var f2 = d[a2] = { exports: {} }, g = true;
          try {
            b2[a2].call(f2.exports, f2, f2.exports, e), g = false;
          } finally {
            g && delete d[a2];
          }
          return f2.exports;
        }
        e.ab = "//";
        var f = {};
        (() => {
          Object.defineProperty(f, "__esModule", { value: true }), f.trace = f.propagation = f.metrics = f.diag = f.context = f.INVALID_SPAN_CONTEXT = f.INVALID_TRACEID = f.INVALID_SPANID = f.isValidSpanId = f.isValidTraceId = f.isSpanContextValid = f.createTraceState = f.TraceFlags = f.SpanStatusCode = f.SpanKind = f.SamplingDecision = f.ProxyTracerProvider = f.ProxyTracer = f.defaultTextMapSetter = f.defaultTextMapGetter = f.ValueType = f.createNoopMeter = f.DiagLogLevel = f.DiagConsoleLogger = f.ROOT_CONTEXT = f.createContextKey = f.baggageEntryMetadataFromString = void 0;
          var a2 = e(369);
          Object.defineProperty(f, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return a2.baggageEntryMetadataFromString;
          } });
          var b3 = e(780);
          Object.defineProperty(f, "createContextKey", { enumerable: true, get: function() {
            return b3.createContextKey;
          } }), Object.defineProperty(f, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return b3.ROOT_CONTEXT;
          } });
          var c2 = e(972);
          Object.defineProperty(f, "DiagConsoleLogger", { enumerable: true, get: function() {
            return c2.DiagConsoleLogger;
          } });
          var d2 = e(957);
          Object.defineProperty(f, "DiagLogLevel", { enumerable: true, get: function() {
            return d2.DiagLogLevel;
          } });
          var g = e(102);
          Object.defineProperty(f, "createNoopMeter", { enumerable: true, get: function() {
            return g.createNoopMeter;
          } });
          var h = e(901);
          Object.defineProperty(f, "ValueType", { enumerable: true, get: function() {
            return h.ValueType;
          } });
          var i = e(194);
          Object.defineProperty(f, "defaultTextMapGetter", { enumerable: true, get: function() {
            return i.defaultTextMapGetter;
          } }), Object.defineProperty(f, "defaultTextMapSetter", { enumerable: true, get: function() {
            return i.defaultTextMapSetter;
          } });
          var j = e(125);
          Object.defineProperty(f, "ProxyTracer", { enumerable: true, get: function() {
            return j.ProxyTracer;
          } });
          var k = e(846);
          Object.defineProperty(f, "ProxyTracerProvider", { enumerable: true, get: function() {
            return k.ProxyTracerProvider;
          } });
          var l = e(996);
          Object.defineProperty(f, "SamplingDecision", { enumerable: true, get: function() {
            return l.SamplingDecision;
          } });
          var m = e(357);
          Object.defineProperty(f, "SpanKind", { enumerable: true, get: function() {
            return m.SpanKind;
          } });
          var n = e(847);
          Object.defineProperty(f, "SpanStatusCode", { enumerable: true, get: function() {
            return n.SpanStatusCode;
          } });
          var o = e(475);
          Object.defineProperty(f, "TraceFlags", { enumerable: true, get: function() {
            return o.TraceFlags;
          } });
          var p = e(98);
          Object.defineProperty(f, "createTraceState", { enumerable: true, get: function() {
            return p.createTraceState;
          } });
          var q = e(139);
          Object.defineProperty(f, "isSpanContextValid", { enumerable: true, get: function() {
            return q.isSpanContextValid;
          } }), Object.defineProperty(f, "isValidTraceId", { enumerable: true, get: function() {
            return q.isValidTraceId;
          } }), Object.defineProperty(f, "isValidSpanId", { enumerable: true, get: function() {
            return q.isValidSpanId;
          } });
          var r = e(476);
          Object.defineProperty(f, "INVALID_SPANID", { enumerable: true, get: function() {
            return r.INVALID_SPANID;
          } }), Object.defineProperty(f, "INVALID_TRACEID", { enumerable: true, get: function() {
            return r.INVALID_TRACEID;
          } }), Object.defineProperty(f, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return r.INVALID_SPAN_CONTEXT;
          } });
          let s = e(67);
          Object.defineProperty(f, "context", { enumerable: true, get: function() {
            return s.context;
          } });
          let t = e(506);
          Object.defineProperty(f, "diag", { enumerable: true, get: function() {
            return t.diag;
          } });
          let u = e(886);
          Object.defineProperty(f, "metrics", { enumerable: true, get: function() {
            return u.metrics;
          } });
          let v = e(939);
          Object.defineProperty(f, "propagation", { enumerable: true, get: function() {
            return v.propagation;
          } });
          let w = e(845);
          Object.defineProperty(f, "trace", { enumerable: true, get: function() {
            return w.trace;
          } }), f.default = { context: s.context, diag: t.diag, metrics: u.metrics, propagation: v.propagation, trace: w.trace };
        })(), a.exports = f;
      })();
    }, 862: (a) => {
      "use strict";
      a.exports = d, a.exports.preferredLanguages = d;
      var b = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
      function c(a2, c2) {
        var d2 = b.exec(a2);
        if (!d2) return null;
        var e2 = d2[1], f2 = d2[2], g2 = e2;
        f2 && (g2 += "-" + f2);
        var h = 1;
        if (d2[3]) for (var i = d2[3].split(";"), j = 0; j < i.length; j++) {
          var k = i[j].split("=");
          "q" === k[0] && (h = parseFloat(k[1]));
        }
        return { prefix: e2, suffix: f2, q: h, i: c2, full: g2 };
      }
      function d(a2, b2) {
        var d2 = function(a3) {
          for (var b3 = a3.split(","), d3 = 0, e2 = 0; d3 < b3.length; d3++) {
            var f2 = c(b3[d3].trim(), d3);
            f2 && (b3[e2++] = f2);
          }
          return b3.length = e2, b3;
        }(void 0 === a2 ? "*" : a2 || "");
        if (!b2) return d2.filter(g).sort(e).map(f);
        var h = b2.map(function(a3, b3) {
          for (var e2 = { o: -1, q: 0, s: 0 }, f2 = 0; f2 < d2.length; f2++) {
            var g2 = function(a4, b4, d3) {
              var e3 = c(a4);
              if (!e3) return null;
              var f3 = 0;
              if (b4.full.toLowerCase() === e3.full.toLowerCase()) f3 |= 4;
              else if (b4.prefix.toLowerCase() === e3.full.toLowerCase()) f3 |= 2;
              else if (b4.full.toLowerCase() === e3.prefix.toLowerCase()) f3 |= 1;
              else if ("*" !== b4.full) return null;
              return { i: d3, o: b4.i, q: b4.q, s: f3 };
            }(a3, d2[f2], b3);
            g2 && 0 > (e2.s - g2.s || e2.q - g2.q || e2.o - g2.o) && (e2 = g2);
          }
          return e2;
        });
        return h.filter(g).sort(e).map(function(a3) {
          return b2[h.indexOf(a3)];
        });
      }
      function e(a2, b2) {
        return b2.q - a2.q || b2.s - a2.s || a2.o - b2.o || a2.i - b2.i || 0;
      }
      function f(a2) {
        return a2.full;
      }
      function g(a2) {
        return a2.q > 0;
      }
    }, 863: (a, b, c) => {
      "use strict";
      var d = c(814), e = Symbol.for("react.transitional.element");
      if (Symbol.for("react.fragment"), !d.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      b.jsx = function(a2, b2, c2) {
        var d2 = null;
        if (void 0 !== c2 && (d2 = "" + c2), void 0 !== b2.key && (d2 = "" + b2.key), "key" in b2) for (var f in c2 = {}, b2) "key" !== f && (c2[f] = b2[f]);
        else c2 = b2;
        return { $$typeof: e, type: a2, key: d2, ref: void 0 !== (b2 = c2.ref) ? b2 : null, props: c2 };
      };
    }, 918: (a, b, c) => {
      "use strict";
      c.d(b, { s: () => d });
      let d = (0, c(58).xl)();
    }, 931: (a) => {
      "use strict";
      a.exports = d, a.exports.preferredEncodings = d;
      var b = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function c(a2, b2, c2) {
        var d2 = 0;
        if (b2.encoding.toLowerCase() === a2.toLowerCase()) d2 |= 1;
        else if ("*" !== b2.encoding) return null;
        return { encoding: a2, i: c2, o: b2.i, q: b2.q, s: d2 };
      }
      function d(a2, d2, h) {
        var i = function(a3) {
          for (var d3 = a3.split(","), e2 = false, f2 = 1, g2 = 0, h2 = 0; g2 < d3.length; g2++) {
            var i2 = function(a4, c2) {
              var d4 = b.exec(a4);
              if (!d4) return null;
              var e3 = d4[1], f3 = 1;
              if (d4[2]) for (var g3 = d4[2].split(";"), h3 = 0; h3 < g3.length; h3++) {
                var i3 = g3[h3].trim().split("=");
                if ("q" === i3[0]) {
                  f3 = parseFloat(i3[1]);
                  break;
                }
              }
              return { encoding: e3, q: f3, i: c2 };
            }(d3[g2].trim(), g2);
            i2 && (d3[h2++] = i2, e2 = e2 || c("identity", i2), f2 = Math.min(f2, i2.q || 1));
          }
          return e2 || (d3[h2++] = { encoding: "identity", q: f2, i: g2 }), d3.length = h2, d3;
        }(a2 || ""), j = h ? function(a3, b2) {
          if (a3.q !== b2.q) return b2.q - a3.q;
          var c2 = h.indexOf(a3.encoding), d3 = h.indexOf(b2.encoding);
          return -1 === c2 && -1 === d3 ? b2.s - a3.s || a3.o - b2.o || a3.i - b2.i : -1 !== c2 && -1 !== d3 ? c2 - d3 : -1 === c2 ? 1 : -1;
        } : e;
        if (!d2) return i.filter(g).sort(j).map(f);
        var k = d2.map(function(a3, b2) {
          for (var d3 = { encoding: a3, o: -1, q: 0, s: 0 }, e2 = 0; e2 < i.length; e2++) {
            var f2 = c(a3, i[e2], b2);
            f2 && 0 > (d3.s - f2.s || d3.q - f2.q || d3.o - f2.o) && (d3 = f2);
          }
          return d3;
        });
        return k.filter(g).sort(j).map(function(a3) {
          return d2[k.indexOf(a3)];
        });
      }
      function e(a2, b2) {
        return b2.q - a2.q || b2.s - a2.s || a2.o - b2.o || a2.i - b2.i;
      }
      function f(a2) {
        return a2.encoding;
      }
      function g(a2) {
        return a2.q > 0;
      }
    }, 944: (a, b, c) => {
      "use strict";
      c.d(b, { nJ: () => g, oJ: () => e, zB: () => f });
      var d = c(378);
      let e = "NEXT_REDIRECT";
      var f = function(a2) {
        return a2.push = "push", a2.replace = "replace", a2;
      }({});
      function g(a2) {
        if ("object" != typeof a2 || null === a2 || !("digest" in a2) || "string" != typeof a2.digest) return false;
        let b2 = a2.digest.split(";"), [c2, f2] = b2, g2 = b2.slice(2, -2).join(";"), h = Number(b2.at(-2));
        return c2 === e && ("replace" === f2 || "push" === f2) && "string" == typeof g2 && !isNaN(h) && h in d.Q;
      }
    }, 979: (a, b, c) => {
      "use strict";
      c.d(b, { f: () => d });
      class d extends Error {
        constructor(...a2) {
          super(...a2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    } }, (a) => {
      var b = a(a.s = 134);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES).middleware_middleware = b;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(\\/?index|\\/?index\\.json))?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|studio|_next|_vercel|.*\\..*).*))(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [{ "protocol": "https", "hostname": "images.unsplash.com" }, { "protocol": "https", "hostname": "cdn.sanity.io" }], "unoptimized": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "C:\\Users\\Aleksa\\Documents\\Projects\\Website\\casinohub-influencer", "experimental": { "useSkewCookie": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "clientParamParsing": false, "dynamicOnHover": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "viewTransition": false, "routerBFCache": false, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "cacheComponents": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "devtoolSegmentExplorer": true, "browserDebugInfoInTerminal": false, "optimizeRouterScrolling": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "root": "C:\\Users\\Aleksa\\Documents\\Projects\\Website\\casinohub-influencer" } };
var BuildId = "75UsXbareyZoHeoBovKhr";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }], "dynamic": [{ "page": "/studio/[[...index]]", "regex": "^/studio(?:/(.+?))?(?:/)?$", "routeKeys": { "nxtPindex": "nxtPindex" }, "namedRegex": "^/studio(?:/(?<nxtPindex>.+?))?(?:/)?$" }, { "page": "/[locale]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)(?:/)?$" }, { "page": "/[locale]/leaderboard", "regex": "^/([^/]+?)/leaderboard(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/leaderboard(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "2f94e90b8d45941a66966f7f2d51620d", "previewModeSigningKey": "358228516ff41bf521f4a7446daffad5d3717c0003a73964380a934ce261b237", "previewModeEncryptionKey": "9457cdb8503640c5e45b4a75a592b1b4e17e8983a55fe27363b1e9ce6c20e346" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/middleware.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(\\/?index|\\/?index\\.json))?[\\/#\\?]?$", "originalSource": "/" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|studio|_next|_vercel|.*\\..*).*))(\\.json)?[\\/#\\?]?$", "originalSource": "/((?!api|studio|_next|_vercel|.*\\..*).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "75UsXbareyZoHeoBovKhr", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "7UyQZ5gaXLd5d5AFIARzkZQjgUE/gS1tY1Y7cDH2TTs=", "__NEXT_PREVIEW_MODE_ID": "2f94e90b8d45941a66966f7f2d51620d", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "358228516ff41bf521f4a7446daffad5d3717c0003a73964380a934ce261b237", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "9457cdb8503640c5e45b4a75a592b1b4e17e8983a55fe27363b1e9ce6c20e346" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/_not-found/page": "/_not-found", "/favicon.ico/route": "/favicon.ico", "/page": "/", "/[locale]/page": "/[locale]", "/[locale]/leaderboard/page": "/[locale]/leaderboard", "/studio/[[...index]]/page": "/studio/[[...index]]" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/_app": "pages/_app.js", "/_error": "pages/_error.js", "/_document": "pages/_document.js", "/404": "pages/404.html" };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath ?? "/") || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest.preview.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
