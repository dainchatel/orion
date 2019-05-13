"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    NODE_ENV: joi_1.default
        .string()
        .valid(["development", "production", "test"])
        .required()
})
    .unknown();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.config = {
    env: envVars.NODE_ENV,
    isTest: envVars.NODE_ENV === "test",
    isDevelopment: envVars.NODE_ENV === "development",
    apiBase: "/api/v1"
};
//# sourceMappingURL=common.js.map