import {Observable as O} from "rx"
import superagent from "superagent"

const isFun = x => x && typeof x === "function"
const isDef = x => typeof x !== "undefined"
const keys = x => x ? Object.keys(x) : []


function makeHTTPDriver(base = "") {
  function paramsToReq(params) {
    const {
      url,
      send,
      accept,
      query,
      fields,
      attachments,
      auth,
      cors = false,
      headers = {},
      type = "json",
      method = "get"
      } = params

    const m = (method || "").toLowerCase()
    const reqFactor = superagent[m === "delete" ? "del" : m]
    if (!isFun(reqFactor)) {
      throw new Error(`Invalid request method: ${m}`)
    }

    let req = reqFactor(base + url).type(type)
    isDef(send) && (req = req.send(send))
    isDef(accept) && (req = req.accept(accept))
    isDef(query) && (req = req.query(query))
    cors === true && (req = req.withCredentials())
    auth && isDef(auth.user) && isDef(auth.password) && (req = req.auth(auth.user, auth.password))
    keys(headers).forEach(h => req = req.set(h, headers[h]))
    keys(fields).forEach(f => req = req.field(f, fields[f]))
    keys(attachments).forEach(k => {
      const {name, path, filename} = attachments[k]
      req = req.attach(name, path, filename)
    })
    return req
  }

  function toRes$(req) {
    return O.create(o => {
      try {
        req.end((err, res) => {
          if (err) {
            o.onError(err)
          } else {
            o.onNext(res)
            o.onCompleted()
          }
        })
      } catch (err) {
        o.onNext(err)
      }
      return () => req.abort()
    })
  }

  function request(req$) {
    return req$.map(params => toRes$(isFun(params) ? params(superagent) : paramsToReq(params)))
  }

  return function HTTPDriver() {
    const Transducers = { request }
    const signal$ = null
    const executor = null
    return [Transducers, signal$, executor]
  }
}

module.exports = makeHTTPDriver
module.exports.default = makeHTTPDriver
