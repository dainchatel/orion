"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    LOGGER_LEVEL: joi_1.default
        .string()
        .allow(["error", "warn", "info", "verbose", "debug", "silly"])
        .default("info"),
    LOGGER_ENABLED: joi_1.default
        .boolean()
        .truthy("TRUE")
        .truthy("true")
        .falsy("FALSE")
        .falsy("false")
        .default(true)
})
    .unknown();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.config = {
    level: envVars.LOGGER_LEVEL,
    enabled: !!envVars.LOGGER_ENABLED
};
//# sourceMappingURL=logger.js.map