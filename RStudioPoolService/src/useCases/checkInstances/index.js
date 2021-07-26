const { ARENA_PROXY_URL, ARENA_POOL_SERVICE_KEY } = require('../../../config')
const { Authorizer, Instance } = require('../../domain')

const { Manager: InstanceManager } = Instance

const checkInstances = async (event, { payload = {} } = {}) => {
  const { userId } = payload

  if (!userId || !Authorizer(event, [ARENA_POOL_SERVICE_KEY])) {
    return {
      statusCode: 403,
      body: JSON.stringify({}),
    }
  }

  const instance = await InstanceManager.getInstanceByUserId({ userId })

  return {
    statusCode: 200,
    body: JSON.stringify({ instance, rStudioProxyUrl: ARENA_PROXY_URL }),
  }
}

module.exports = checkInstances
