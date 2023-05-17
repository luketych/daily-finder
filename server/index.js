import { app } from './app.js'
import { logger } from './logger.js'

console.log('server/index.js')

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
