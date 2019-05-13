"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = ({ logger, config }, { app, modules: { blog, admin } }) => {
    app.use("/", blog.webRouter);
    app.use("/admin", admin.webRouter);
    const { apiBase } = config.common;
    app.use(apiBase, blog.apiRouter);
    app.get("/404", (_, res) => {
        res.render(path_1.default.join(__dirname, "views", "404"));
    });
    // app.get("*", (_, res) => res.redirect("/blog"))
    app.use((err, _, res, next) => {
        const payload = (err.output && err.output.payload) || err;
        const statusCode = (err.output && err.output.statusCode) || 500;
        logger.error(payload);
        return res.status(statusCode).json(payload);
    });
};
//# sourceMappingURL=routes.js.map