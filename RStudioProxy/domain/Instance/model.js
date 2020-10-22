const { commands } = require('../../infrastructure')

const getInstance = async ({ instanceId, userId }) => {
  const { data } = await commands.sendCommand({
    command: commands.instanceCommands.getInstanceStatus({ instanceId, userId }),
  })
  const { instance } = data
  return instance
}

let instancesChached = []
let lastCall = new Date(0)
const minutesCacheToLive = 1
const millisecondsCacheToLive = minutesCacheToLive * 60 * 1000
const isCacheExpired = () => lastCall.getTime() + millisecondsCacheToLive < new Date().getTime()

const getInstancesIds = async () => {
  if (isCacheExpired()) {
    const { data } = await commands.sendCommand({ command: commands.instanceCommands.getStatus() })
    const { instances } = data
    lastCall = new Date()
    instancesChached = [...(instances || [])]
    return instances
  }
  return instancesChached
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
