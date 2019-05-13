"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gstoreUtils = {
    initDynamicHooks(schema, logger) {
        const hooks = {
            pre: {
                save: [],
                delete: [],
            },
            post: {
                delete: [],
            },
        };
        const runHooks = (hook, method) => {
            return function runHooks(...args) {
                const hooksToRun = hooks[hook][method];
                return hooksToRun.reduce((prev, curr) => prev.then(curr.bind(this, ...args)).catch(err => {
                    logger.error(`BlogPost gstore hook error: ${err.message}`, err);
                }), Promise.resolve());
            };
        };
        schema.pre('save', runHooks('pre', 'save'));
        schema.pre('delete', runHooks('pre', 'delete'));
        schema.post('delete', runHooks('post', 'delete'));
        return {
            addPreSaveHook(handler) {
                if (Array.isArray(handler)) {
                    handler.forEach(h => hooks.pre.save.push(h));
                }
                else {
                    hooks.pre.save.push(handler);
                }
            },
            addPreDeleteHook(handler) {
                if (Array.isArray(handler)) {
                    handler.forEach(h => hooks.pre.delete.push(h));
                }
                else {
                    hooks.pre.delete.push(handler);
                }
            },
            addPostDeleteHook(handler) {
                if (Array.isArray(handler)) {
                    handler.forEach(h => hooks.post.delete.push(h));
                }
                else {
                    hooks.post.delete.push(handler);
                }
            },
        };
    },
};
exports.default = gstoreUtils;
//# sourceMappingURL=gstore.js.map