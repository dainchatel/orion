process.env.NODE_ENV = process.env.NODE_ENV || 'development'

import config from './config'
import initLogger from './logger'
import initDb from './db'
import initApp from './app'
import initStorage from './storage'
import initModules from './modules'

const logger = initLogger({ config: config.logger })
const gstore = initDb({ config: config.gcloud, logger })
const storage = initStorage({ config: config.gcloud })
const context = { gstore, logger, storage, config }
const modules = initModules(context)
const app = initApp(context, modules)

logger.info("Starting server...");
logger.info(`Environment: "${config.common.env}"`);

app.listen(config.server.port, (error: any) => {
  if (error) {
    logger.error('app unable to listen', error)
    process.exit(10)
  }

  logger.info(`application listening on port ${config.server.port}`)
})
