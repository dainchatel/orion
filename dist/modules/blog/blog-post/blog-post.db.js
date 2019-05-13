"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (context, modules) => {
    const { gstore } = context;
    const { Schema } = gstore;
    const schema = new Schema({
        title: { type: String },
        createdOn: {
            type: Date,
            default: gstore.defaultValues.NOW,
            read: false,
            write: false
        },
        modifiedOn: { type: Date, default: gstore.defaultValues.NOW },
        content: { type: String, excludeFromIndexes: true },
        excerpt: { type: String, excludeFromIndexes: true },
        posterUri: { type: String },
        cloudStorageObject: { type: String }
    });
    const ancestor = ['Blog', 'default'];
    /**
     * Configuration for our Model.list() query shortcut
     */
    schema.queries('list', {
        order: { property: 'modifiedOn', descending: true },
        ancestors: ancestor,
    });
    const BlogPost = gstore.model("BlogPost", schema);
    return {
        getPosts: BlogPost.list.bind(BlogPost),
        getPost(id, dataloader, format = "JSON") {
            return BlogPost.get(id, ancestor, null, null, {
                dataloader
            }).then(entity => {
                if (format === "JSON") {
                    // Transform the gstore "Entity" instance
                    // to a plain object (adding an "id" prop to it)
                    return entity.plain();
                }
                return entity;
            });
        },
        createPost(data, dataloader) {
            const post = new BlogPost(data, null, ancestor);
            // We add the DataLoader instance to our entity context
            // so it is available in our "pre" Hooks
            post.context.dataloader = dataloader;
            return post.save();
        },
        updatePost(id, data, dataloader, replace) {
            return BlogPost.update(id, data, ancestor, null, null, {
                dataloader,
                replace
            });
        },
        deletePost(id) {
            return BlogPost.delete(id, ancestor);
        },
    };
};
//# sourceMappingURL=blog-post.db.js.map