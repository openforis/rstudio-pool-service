const { commands } = require('../../infrastructure')

const getInstance = async ({ instanceId, userId }) => {
  const { data } = await commands.sendCommand({ command: commands.instanceCommands.getInstanceStatus({ instanceId, userId }) })
  const { instance } = data
  return instance
}

const getInstancesIds = async () => {
  const { data } = await commands.sendCommand({ command: commands.instanceCommands.getStatus() })
  const { instances } = data
  return instances
}

const killInstance = async ({ instanceId, userId }) =>
  commands.sendCommand({ command: commands.instanceCommands.delete({ instanceId, userId }) })

const getInstanceIdByReferer = ({ instancesIds, referer }) =>
  instancesIds.find((instanceKey) => {
    const regex = new RegExp(`${instanceKey}$`)
    return regex.test(referer)
  })

const isAssigned = (instance) => !!instance.userId

module.exports = {
  getInstance,
  getInstancesIds,
  killInstance,
  getInstanceIdByReferer,
  isAssigned,
}
