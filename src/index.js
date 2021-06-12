import app from './app'
import logger from './logging/logger'

const BFF_PORT = process.env.PORT || 3001
const BFF_HOST = "localhost"

app.listen(BFF_PORT, () => {
  const url = `http://${BFF_HOST}:${BFF_PORT}`
  logger.info(`BFF server is ready at: ${url} 🔥🔥🔥`)
})
