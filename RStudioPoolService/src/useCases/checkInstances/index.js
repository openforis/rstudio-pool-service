const { Instance } = require('../../domain')

const { Manager: InstanceManager } = Instance

const checkInstances = async (event, { payload = {} } = {}) => {
  const { userId } = payload

  let responseData = {}
  if (userId) {
    const instance = await InstanceManager.getInstanceByUserId({ userId })
    responseData = { instance }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(responseData),
  }

  return response
}

module.exports = checkInstances
