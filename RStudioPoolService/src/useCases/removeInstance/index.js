const { PROXY_KEY } = require('../../../config')
const { Instance, Authorizer} = require('../../domain')

const { Manager: InstanceManager } = Instance

const removeInstance = async (event, { payload = {}} = {}) => {
  const { instanceId } = payload

  if (!Authorizer(event, [PROXY_KEY])) {
    const response = {
      statusCode: 403,
      body: JSON.stringify({}),
    }
    return response
  }

  await InstanceManager.terminateInstance({ instanceId })

  const response = {
    statusCode: 200,
    body: JSON.stringify({ status: 'OK' }),
  }
  return response
}

module.exports = removeInstance