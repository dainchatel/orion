"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_routes_1 = __importDefault(require("./blog.routes"));
const blog_post_1 = __importDefault(require("./blog-post"));
exports.default = (context, modules) => {
    const blogPost = blog_post_1.default(context, {});
    const { webRouter, apiRouter } = blog_routes_1.default(context, { blogPost });
    return {
        webRouter,
        apiRouter,
        blogPost
    };
};
//# sourceMappingURL=index.js.map