"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked_1 = __importDefault(require("marked"));
const boom_1 = __importDefault(require("boom"));
exports.default = (context, { blogPostDB }) => {
    return {
        /**
         * Get a list of BlogPosts
         */
        getPosts(options = {}) {
            return blogPostDB.getPosts(options);
        },
        /**
         * Get a BlogPost
         * @param {*} id Id of the BlogPost to fetch
         * @param {*} dataloader optional. A Dataloader instance
         */
        async getPost(id, dataloader) {
            id = +id;
            if (isNaN(id)) {
                throw new Error("BlogPost id must be an integer");
            }
            let post;
            try {
                post = (await blogPostDB.getPost(id, dataloader));
            }
            catch (err) {
                throw err;
            }
            if (post && post.content) {
                // Convert markdown to Html
                post.contentToHtml = marked_1.default(post.content);
            }
            return post;
        },
        /**
         * Create a BlogPost
         * @param {*} data BlogPost entity data
         * @param {*} dataloader optional Dataloader instance
         */
        createPost(data, dataloader) {
            return blogPostDB.createPost(data, dataloader);
        },
        /**
         * Update a BlogPost entity in the Datastore
         * @param {number} id Id of the BlogPost to update
         * @param {*} data BlogPost entity data
         * @param {Dataloader} dataloader optional Dataloader instance
         * @param {boolean} overwrite overwrite the entity in Datastore
         */
        updatePost(id, data, dataloader, overwrite = false) {
            id = +id;
            if (isNaN(id)) {
                throw new boom_1.default("BlogPost id must be an integer", {
                    statusCode: 400
                });
            }
            return blogPostDB.updatePost(id, data, dataloader, overwrite);
        },
        /**
         * Delete a BlogPost entity in the Datastore
         * @param {number} id Id of the BlogPost to delete
         */
        deletePost(id) {
            return blogPostDB.deletePost(+id);
        }
    };
};
//# sourceMappingURL=blog-post.domain.js.map