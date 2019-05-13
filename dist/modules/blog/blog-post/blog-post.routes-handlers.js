"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compare = (a, b) => parseInt(a.title.split(' ')[1]) > parseInt(b.title.split(' ')[1]) ? 1 : -1;
exports.default = ({ gstore, logger }, { blogPostDomain }) => {
    return {
        async displayPosts(_, res) {
            const template = "blog/display";
            let posts;
            try {
                posts = await blogPostDomain.getPosts();
            }
            catch (error) {
                return res.render(template, {
                    blogPosts: [],
                    error
                });
            }
            res.render(template, {
                blogPosts: posts.entities.sort(compare),
                pageId: "home"
            });
        },
        async listPosts(_, res) {
            const template = "blog/index";
            let posts;
            try {
                posts = await blogPostDomain.getPosts();
            }
            catch (error) {
                return res.render(template, {
                    blogPosts: [],
                    error
                });
            }
            res.render(template, {
                blogPosts: posts.entities.sort(compare),
                pageId: "home"
            });
        },
        async deletePost(req, res) {
            let result;
            try {
                result = await blogPostDomain.deletePost(req.params.id);
            }
            catch (err) {
                return res.status(err.status || 401).end(err.message);
            }
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.json(result);
        },
        async detailPost(req, res) {
            /**
             * Create Dataloader instance, unique to this Http Request
             */
            const dataloader = gstore.createDataLoader();
            const template = "blog/detail";
            let blogPost;
            try {
                blogPost = await blogPostDomain.getPost(req.params.id, dataloader);
            }
            catch (error) {
                if (error.code === "ERR_ENTITY_NOT_FOUND") {
                    return res.redirect("/404");
                }
                return res.render(template, { post: null, error });
            }
            return res.render(template, {
                pageId: "blogpost-view",
                blogPost
            });
        }
    };
};
//# sourceMappingURL=blog-post.routes-handlers.js.map