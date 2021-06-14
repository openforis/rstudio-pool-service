const { DEFAULT_URL, ROUTE_TO_REPLACE, STRING_TO_REPLACE } = require('../../config')

const customRouter = (req) => {
  const { instanceId, instance } = req
  if (instanceId && instance) {
    const instanceUrl = instance.url
    return ROUTE_TO_REPLACE.replace(STRING_TO_REPLACE, instanceUrl)
  }
  throw Error('error')
}

const rewriteFn = (path, req) => {
  const { instanceId, userId } = req
  const newPAth = (path || '').replace(`${instanceId}_${userId}`, '')
  return newPAth
}

const proxyConfig = {
  target: DEFAULT_URL,
  router: customRouter,
  changeOrigin: true,
  pathRewrite: rewriteFn,
}

module.exports = {
  proxyConfig,
}
