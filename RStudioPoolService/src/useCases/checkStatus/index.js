const { Instance } = require('../../domain')

const { Manager: InstanceManager, Model: InstanceModel } = Instance

const checkStatus = async (event, { payload = {} } = {}) => {
  const { instanceId, userId } = payload
  let responseData = {}
  if (instanceId && userId) {
    const instance = await InstanceManager.getInstanceById({ instanceId })
    const instenceUserId = InstanceModel.getUserId(instance)
    responseData = instenceUserId === userId ? { instance } : {}
  } else {
    const instances = await InstanceManager.getInstances()
    const usedInstances = instances.filter((instance) => !!InstanceModel.getUserId(instance)).map(InstanceModel.getId)
    responseData = { instances: usedInstances }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(responseData),
  }

  return response
}

module.exports = checkStatus
