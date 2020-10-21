const { requestInstance, removeInstance, checkStatus } = require('../useCases')

const commandHandlers = {
  REQUEST_RSTUDIO: requestInstance,
  GET_STATUS: checkStatus,
  DELETE: removeInstance,
}

const getCommandHandler = (body) => {
  const { command } = body
  return command ? commandHandlers[command] : false
}

exports.handler = async (event = {}) => {
  console.log("event", event)
  const { body = '' } = event
  console.log(body)
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
