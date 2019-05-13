"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_post_routes_handlers_1 = __importDefault(require("./blog-post.routes-handlers"));
const blog_post_db_1 = __importDefault(require("./blog-post.db"));
const blog_post_domain_1 = __importDefault(require("./blog-post.domain"));
exports.default = (context, modules) => {
    const blogPostDB = blog_post_db_1.default(context, modules);
    const blogPostDomain = blog_post_domain_1.default(context, { blogPostDB });
    return {
        blogPostDomain,
        routesHandlers: blog_post_routes_handlers_1.default(context, { blogPostDomain })
    };
};
//# sourceMappingURL=index.js.map