"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const envVarsSchema = joi_1.default
    .object({
    GOOGLE_CLOUD_PROJECT: joi_1.default.string().required(),
    GCLOUD_BUCKET: joi_1.default.string().required(),
    DATASTORE_NAMESPACE: joi_1.default.string()
})
    .unknown();
const { error, value: envVars } = joi_1.default.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.config = {
    projectId: envVars.GOOGLE_CLOUD_PROJECT,
    datastore: {
        namespace: envVars.DATASTORE_NAMESPACE
    },
    storage: {
        bucket: envVars.GCLOUD_BUCKET
    }
};
//# sourceMappingURL=gcloud.js.map