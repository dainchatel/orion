"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
exports.default = ({ config }) => {
    const myFormat = printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    });
    const logger = winston_1.createLogger({
        level: config.level,
        format: combine(timestamp(), myFormat),
        transports: [
            new winston_1.transports.Console({ format: winston_1.format.simple() })
        ]
    });
    return logger;
};
//# sourceMappingURL=logger.js.map