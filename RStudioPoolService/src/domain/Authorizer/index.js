const requestedByAuthorizedClient = (event = {}, authorizedKeys = []) => {
    const { headers = {} } = event
    const { Authorization } = headers
    return authorizedKeys.includes(Authorization)
  }

module.exports = requestedByAuthorizedClient