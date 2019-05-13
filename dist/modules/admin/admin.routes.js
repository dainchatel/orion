"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadInMemory = multer_1.default({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    },
    fileFilter: (req, file, cb) => {
        // Validate image type
        if (["image/jpeg", "image/png"].indexOf(file.mimetype) < 0) {
            const err = new Error(`File type not allowed: ${req.file.mimetype}`);
            return cb(err, false);
        }
        return cb(null, true);
    }
});
const verifyAdmin = (req, res, next) => {
    if (req.query.password !== process.env.ADMIN_PASSWORD)
        throw new Error('Unauthorized');
    next();
};
exports.default = (_, routesHandlers, { images }) => {
    const router = express_1.default.Router();
    router.get("/", verifyAdmin, routesHandlers.dashboard);
    router.get("/create-post", routesHandlers.createPost);
    router.get("/edit-post/:id", routesHandlers.editPost);
    router.post("/create-post", [uploadInMemory.single("image")], // middleware to parse form
    routesHandlers.createPost);
    router.post("/edit-post/:id", [uploadInMemory.single("image")], // middleware to parse form
    routesHandlers.editPost);
    return router;
};
//# sourceMappingURL=admin.routes.js.map