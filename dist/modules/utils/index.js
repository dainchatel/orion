"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gstore_1 = __importDefault(require("./gstore"));
const string_1 = __importDefault(require("./string"));
const utilsModule = {
    gstore: gstore_1.default,
    string: string_1.default,
};
exports.default = () => utilsModule;
//# sourceMappingURL=index.js.map