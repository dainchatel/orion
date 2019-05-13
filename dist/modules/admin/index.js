"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_routes_1 = __importDefault(require("./admin.routes"));
const admin_routes_handlers_1 = __importDefault(require("./admin.routes-handlers"));
exports.default = (context, { blog, images }) => {
    const routesHandlers = admin_routes_handlers_1.default(context, { blog });
    return {
        webRouter: admin_routes_1.default(context, routesHandlers, { images })
    };
};
//# sourceMappingURL=index.js.map