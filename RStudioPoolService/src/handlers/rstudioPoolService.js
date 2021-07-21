const { requestInstance, removeInstance, checkStatus, checkInstances } = require('../useCases')

const commandHandlers = {
  REQUEST_RSTUDIO: requestInstance,
  CHECK_INSTANCES: checkInstances,
  GET_STATUS: checkStatus,
  DELETE: removeInstance,
}

const getCommandHandler = (body) => {
  const { command } = body
  return command ? commandHandlers[command] : false
}

exports.handler = async (event = {}) => {
  const { body = '' } = event
  const bodyParsed = JSON.parse(body)
  const { payload = {} } = bodyParsed
  const commandHandler = getCommandHandler(bodyParsed)

  let response = {
    statusCode: 400,
    body: JSON.stringify({ status: event }),
  }
  if (commandHandler) {
    response = commandHandler(event, { payload })
  }
  return response
}
