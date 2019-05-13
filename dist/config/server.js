"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    PORT: joi_1.default.number().default(8080)
})
    .unknown();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.config = {
    port: Number(envVars.PORT)
};
//# sourceMappingURL=server.js.map