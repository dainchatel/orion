import "./env"
import { config as common, CommonConfig } from "./common"
import { config as gcloud, GcloudConfig } from "./gcloud"
import { config as logger, LoggerConfig } from "./logger"
import { config as server, ServerConfig } from "./server"


export type Config = {
  common: CommonConfig,
  gcloud: GcloudConfig,
  logger: LoggerConfig,
  server: ServerConfig
}

const config: Config = {
  common,
  gcloud,
  logger,
  server
}

export default config
