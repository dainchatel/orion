"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = __importDefault(require("@google-cloud/datastore"));
const gstore_node_1 = __importDefault(require("gstore-node"));
exports.default = ({ config, logger }) => {
    logger.info(`Instantiating Datastore instance for project "${config.projectId}"`);
    const datastore = new datastore_1.default({
        projectId: config.projectId,
        namespace: config.datastore.namespace
    });
    const gstore = gstore_node_1.default({ cache: true });
    logger.info("Connecting gstore-node to Datastore");
    gstore.connect(datastore);
    return gstore;
};
//# sourceMappingURL=db.js.map