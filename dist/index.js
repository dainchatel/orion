"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const db_1 = __importDefault(require("./db"));
const app_1 = __importDefault(require("./app"));
const storage_1 = __importDefault(require("./storage"));
const modules_1 = __importDefault(require("./modules"));
const logger = logger_1.default({ config: config_1.default.logger });
const gstore = db_1.default({ config: config_1.default.gcloud, logger });
const storage = storage_1.default({ config: config_1.default.gcloud });
const context = { gstore, logger, storage, config: config_1.default };
const modules = modules_1.default(context);
const app = app_1.default(context, modules);
logger.info("Starting server...");
logger.info(`Environment: "${config_1.default.common.env}"`);
app.listen(config_1.default.server.port, (error) => {
    if (error) {
        logger.error('app unable to listen', error);
        process.exit(10);
    }
    logger.info(`application listening on port ${config_1.default.server.port}`);
});
//# sourceMappingURL=index.js.map