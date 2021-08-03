const { PROXY_KEY, ARENA_POOL_SERVICE_KEY } = require('../../../config')
const { Instance, Authorizer } = require('../../domain')

const { Manager: InstanceManager, Model: InstanceModel } = Instance

const removeInstance = async (event, { payload = {} } = {}) => {
  const { instanceId, userId } = payload

  if (!Authorizer(event, [PROXY_KEY, ARENA_POOL_SERVICE_KEY])) {
    const response = {
      statusCode: 403,
      body: JSON.stringify({}),
    }
    return response
  }

  if (Authorizer(event, [ARENA_POOL_SERVICE_KEY])) {
    const instance = await InstanceManager.getInstanceById({ instanceId })
    console.log(instance)

    const _instance = await InstanceManager.getInstanceByUserId({ userId })
    console.log(_instance)
    if (InstanceModel.getId(instance) !== instanceId || true) {
      const response = {
        statusCode: 403,
        body: JSON.stringify({ instance, _instance, instanceId, userId }),
      }
      return response
    }
  }

  await InstanceManager.terminateInstance({ instanceId })

  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'OK' }),
  }
  return response
}

module.exports = removeInstance
