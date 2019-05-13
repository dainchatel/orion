"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
exports.default = (context, modules) => {
    const app = express_1.default();
    app.use(compression_1.default());
    app.set("views", "./views");
    app.set("view engine", "pug");
    app.use("/public", express_1.default.static(path_1.default.join(__dirname, "..", "public"), {
        maxAge: "1 year"
    }));
    app.use(serve_favicon_1.default(path_1.default.join(__dirname, "..", "/public/favicon.png")));
    app.disable("x-powered-by");
    routes_1.default(context, { app, modules });
    return app;
};
//# sourceMappingURL=app.js.map