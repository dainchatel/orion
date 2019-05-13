"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.default = (context, { blogPost }) => {
    const webRouter = express_1.default.Router();
    webRouter.get("/", blogPost.routesHandlers.displayPosts);
    webRouter.get("/index", blogPost.routesHandlers.listPosts);
    webRouter.get("/phases/:id", blogPost.routesHandlers.detailPost);
    const apiRouter = express_1.default.Router();
    apiRouter.delete("/phases/:id", blogPost.routesHandlers.deletePost);
    return {
        webRouter,
        apiRouter
    };
};
//# sourceMappingURL=blog.routes.js.map