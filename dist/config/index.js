"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./env");
const common_1 = require("./common");
const gcloud_1 = require("./gcloud");
const logger_1 = require("./logger");
const server_1 = require("./server");
const config = {
    common: common_1.config,
    gcloud: gcloud_1.config,
    logger: logger_1.config,
    server: server_1.config
};
exports.default = config;
//# sourceMappingURL=index.js.map