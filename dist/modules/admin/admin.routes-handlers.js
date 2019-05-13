"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = __importDefault(require("is"));
const compare = (a, b) => parseInt(a.title.split(' ')[1]) > parseInt(b.title.split(' ')[1]) ? 1 : -1;
exports.default = ({ gstore }, { blog }) => {
    const { blogPostDomain } = blog.blogPost;
    return {
        async dashboard(req, res) {
            const template = "admin/dashboard";
            let posts;
            try {
                posts = await blogPostDomain.getPosts({
                    cache: req.query.cache !== "false"
                });
            }
            catch (error) {
                return res.render(template, {
                    error,
                    pageId: "admin-index"
                });
            }
            res.render(template, {
                posts: posts.entities.sort(compare),
                pageId: "admin-index",
            });
        },
        async createPost(req, res) {
            const template = "admin/edit";
            if (req.method === "POST") {
                const entityData = Object.assign({}, req.body, {
                    file: req.file
                });
                // We use the gstore helper to create a Dataloader instance
                const dataloader = gstore.createDataLoader();
                try {
                    await blogPostDomain.createPost(entityData, dataloader);
                }
                catch (err) {
                    return res.render(template, {
                        blogPost: entityData,
                        error: is_1.default.object(err.message) ? err.message : err
                    });
                }
                // After succesfully creating the post we got back
                // to the home page and disable the cache
                return res.redirect(`/admin?cache=false&password=${process.env.ADMIN_PASSWORD}`);
            }
            return res.render(template, {
                pageId: "blogpost-edit"
            });
        },
        async editPost(req, res) {
            const template = "admin/edit";
            const pageId = "blogpost-edit";
            const dataloader = gstore.createDataLoader();
            const { id } = req.params;
            if (req.method === "POST") {
                const entityData = Object.assign({}, req.body, {
                    file: req.file
                });
                try {
                    await blogPostDomain.updatePost(id, entityData, dataloader, true);
                }
                catch (err) {
                    return res.render(template, {
                        post: Object.assign({}, entityData, { id }),
                        pageId,
                        error: is_1.default.object(err.message) ? err.message : err
                    });
                }
                return res.redirect(`/admin?cache=false&password=${process.env.ADMIN_PASSWORD}`);
            }
            let post;
            try {
                post = await blogPostDomain.getPost(id, dataloader);
            }
            catch (err) {
                return res.render(template, {
                    post: {},
                    pageId,
                    error: is_1.default.object(err.message) ? err.message : err
                });
            }
            if (!post) {
                return res.redirect("/404");
            }
            res.render(template, {
                post,
                pageId
            });
        }
    };
};
//# sourceMappingURL=admin.routes-handlers.js.map