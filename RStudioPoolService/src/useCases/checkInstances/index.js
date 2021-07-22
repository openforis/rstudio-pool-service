const { ARENA_PROXY_URL, ARENA_POOL_SERVICE_KEY } = require('../../../config')
const { Authorizer, Instance } = require('../../domain')

const { Manager: InstanceManager } = Instance

const checkInstances = async (event, { payload = {} } = {}) => {
  const { userId } = payload

  let responseData = {}

  if (!userId || !Authorizer(event, [ARENA_POOL_SERVICE_KEY])) {
    const response = {
      statusCode: 403,
      body: JSON.stringify(responseData),
    }
    return response
  }

  if (userId) {
    const instance = await InstanceManager.getInstanceByUserId({ userId })
    responseData = { instance, rStudioProxyUrl: ARENA_PROXY_URL }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(responseData),
  }

  return response
}

module.exports = checkInstances
