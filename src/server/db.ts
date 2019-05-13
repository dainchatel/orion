import Datastore from "@google-cloud/datastore"
import GstoreNode, { Gstore } from "gstore-node"
import { Logger } from "winston"
import { GcloudConfig } from "./config/gcloud"

export default ({
  config,
  logger
}: {
  config: GcloudConfig,
  logger: Logger
}): Gstore => {
  logger.info(
    `Instantiating Datastore instance for project "${
    config.projectId
    }"`
  )

  const datastore = new Datastore({
    projectId: config.projectId,
    namespace: config.datastore.namespace
  })

  const gstore = GstoreNode({ cache: true })

  logger.info("Connecting gstore-node to Datastore")
  gstore.connect(datastore)
  return gstore
}
