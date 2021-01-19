// this works like a cache of cookies with instances
const instancesWithCookies = {}
const timeoutsMap = {}
const getInstanceByCookie = (req) => {
  const instanceValues = instancesWithCookies[req.headers.cookie]
  return instanceValues
}

const setTimer = async (cookie) =>
  new Promise((resolve) => {
    clearTimeout(timeoutsMap[cookie])

    const timer = setTimeout(async () => {
      instancesWithCookies[cookie] = null
    }, 30000)

    timeoutsMap[cookie] = timer
    resolve()
  })
const setInstanceBasedOnCookie = (req) => {
  const { instance, instanceId, userId } = req
  instancesWithCookies[req.headers.cookie] = { instance, instanceId, userId }
  setTimer(req.headers.cookie)
}

const getInstanceBasedOnCookieMiddleware = async (req, res, next) => {
  if (req.instance && req.instanceId && req.userId) {
    setInstanceBasedOnCookie(req)
    return next()
  }

  const instanceValues = getInstanceByCookie(req)
  if (instanceValues) {
    const { instance, instanceId, userId } = instanceValues
    if ((instance, instanceId, userId)) {
      req.instance = instance
      req.instanceId = instanceId
      req.userId = userId
    }
  }

  return next()
}

module.exports = getInstanceBasedOnCookieMiddleware
