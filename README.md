# TSERSful HTTP Interpreter

Make HTTP requests from your applications in a TSERSful way.

[![Travis Build](https://img.shields.io/travis/tsers-js/http/master.svg?style=flat-square)](https://travis-ci.org/tsers-js/http)
[![Code Coverage](https://img.shields.io/codecov/c/github/tsers-js/http/master.svg?style=flat-square)](https://codecov.io/github/tsers-js/http)
[![NPM version](https://img.shields.io/npm/v/@tsers/http.svg?style=flat-square)](https://www.npmjs.com/package/@tsers/http)
[![Gitter](https://img.shields.io/gitter/room/tsers-js/chat.js.svg?style=flat-square)](https://gitter.im/tsers-js/chat)
[![GitHub issues](https://img.shields.io/badge/issues-%40tsers%2Fcore-blue.svg?style=flat-square)](https://github.com/tsers-js/core/issues)

## Usage

### Installation

```
npm i --save @tsers/http
``` 

### Using the interpreter

`@tsers/http` provides a factory function which can be used to construct the actual
interpreter. That factory function takes one optional parameter: `baseUrl` which
will be prepended to the all request urls. If `baseUrl` is not given, then request
URLs are used as they are.

```javascript
import TSERS from "@tsers/core"
import HTTP from "@tsers/http"
import main from "./YourApp"

TSERS(main, {
  HTTP: HTTP(),               // HTTP.request({url: "/foo"}) uses url "/foo"
  API: HTTP("/my/api/v1")     // API.request({url: "/foo"}) uses url "/my/api/v1/foo"
})
```

## API reference

### Signals

HTTP interpreter provides one signal transform function

#### `request :: req$ => res$$` 

Takes an input stream of request objects and returns a stream of **cold 
response streams** associated to the given request objects: one request 
object produces **exactly one** response stream. The actual response
is superagent's [response](https://visionmedia.github.io/superagent/#response-properties) 
object.

Request object can have the following params:

Parameter | Explanation | Default value |
----------|-------------|---------------
| **url** *[required]* | Request url, appended to driver's `baseUrl` | | 
| **method** *[required]* | Request method: `get`, `post`, `put` or `delete` | `get` | 
| **query** | Object of request query parameters, [docs](https://visionmedia.github.io/superagent/#get-requests) | `{}` |
| **send** | Payload for POST/PUT request, [docs](https://visionmedia.github.io/superagent/#post-/-put-requests) | `undefined`  |
| **headers** | Object of request headers (object key = header name) | `{}`  |
| **type** | Request content type, [docs](https://visionmedia.github.io/superagent/#setting-the-content-type) | `json`  |
| **accept** | Accepted response type, [docs](https://visionmedia.github.io/superagent/#setting-accept) | `undefined`  |
| **fields** | Object of form fields (key = field name) for multipart requests, [docs](https://visionmedia.github.io/superagent/#multipart-requests) | `{}` |
| **attachments** | Array of multipart request attachments (`{name, filename, path}` objects), [docs](https://visionmedia.github.io/superagent/#multipart-requests) | `[]`  |
| **auth** | Basic HTTP authentication (`{user, password}` object) | `undefined`  |
| **cors** | Enable CORS | `false`  |

In order to get a full control of the underlying `superagent`, one can pass a
function `fn :: superagent => req`  as a request object: the function receives
the `superagent` instance as a parameter and should return a superagent request 
object without `.end()` being called.

Examples:
```javascript
const simpleReq$ = O.just({url: "/api/foo", method: "post", send: {msg: "tsers!"}})
const simpleRes$$ = HTTP.request(simpleReq$)
const simpleRes$ = simpleRes$$.switch()

const advancedReq$ = O.just(agent => {
  const req = agent.get("/api/bar")
    .query({foo: "bar"})
    .query({sortBy: "title"})
    .set("X-Secret", "tsers")
  return req
})
const advancedRes$$ = HTTP.request(advancedReq$)
const advancedRes$ = advancedRes$$.switch()
```

### Output

HTTP interpreter doesn't expect any output signals from the application.

## License

MIT

