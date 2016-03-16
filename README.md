# TSERSful HTTP Driver

[![Travis Build](https://img.shields.io/travis/tsers-js/http/master.svg?style=flat-square)](https://travis-ci.org/tsers-js/http)
[![Code Coverage](https://img.shields.io/codecov/c/github/tsers-js/http/master.svg?style=flat-square)](https://codecov.io/github/tsers-js/http)
[![NPM version](https://img.shields.io/npm/v/@tsers/http.svg?style=flat-square)](https://www.npmjs.com/package/@tsers/http)
[![Gitter](https://img.shields.io/gitter/room/tsers-js/chat.js.svg?style=flat-square)](https://gitter.im/tsers-js/chat)
[![GitHub issues](https://img.shields.io/badge/issues-%40tsers%2Fcore-blue.svg?style=flat-square)](https://github.com/tsers-js/core/issues)

## Installation

```
npm i --save @tsers/http
``` 

## API reference

### Driver creation

TODO

### Input signals

HTTP driver doesn't emit any input signals.

### Transducers

HTTP driver provides one transducer function

#### `request :: req$ => res$$` 

Takes an input stream of request objects and returns a stream of **cold 
response streams** associated to the given request objects: one request 
object produces **exactly one** response stream.


### Output signals

HTTP driver doesn't take any output signals

## License

MIT

