require('dotenv/config')

module.exports = {
  PORT: process.env.PORT || 8000,
  DEFAULT_URL: process.env.DEFAULT_URL,
  SERVICE_URL: process.env.SERVICE_URL,
  ROUTE_TO_REPLACE: process.env.ROUTE_TO_REPLACE,
  STRING_TO_REPLACE: process.env.STRING_TO_REPLACE,
  TIMEOUT_INSTANCE: process.env.TIMEOUT_INSTANCE,
  MAX_INSTANCES: process.env.MAX_INSTANCES,
  PROXY_KEY: process.env.PROXY_KEY,
}
