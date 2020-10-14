const axios = require('axios')

const { SERVICE_URL, PROXY_KEY } = require('../config')

const sendCommand = async ({ command }) =>
  axios.post(SERVICE_URL, command, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: PROXY_KEY,
    },
  })

const instanceCommands = {
  delete: ({ instanceId }) => ({ command: 'DELETE', payload: { instanceId } }),
  getStatus: () => ({ command: 'GET_STATUS' }),
  getInstanceStatus: ({ instanceId, userId }) => ({ command: 'GET_STATUS', payload: { instanceId, userId } }),
}

module.exports = {
  instanceCommands,
  sendCommand,
}
