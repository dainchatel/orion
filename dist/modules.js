"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./modules/utils"));
const admin_1 = __importDefault(require("./modules/admin"));
const blog_1 = __importDefault(require("./modules/blog"));
const images_1 = __importDefault(require("./modules/images"));
exports.default = (context) => {
    const images = images_1.default();
    const utils = utils_1.default();
    const blog = blog_1.default(context, { utils, images });
    const admin = admin_1.default(context, { blog, images });
    return {
        utils,
        images,
        blog,
        admin
    };
};
//# sourceMappingURL=modules.js.map