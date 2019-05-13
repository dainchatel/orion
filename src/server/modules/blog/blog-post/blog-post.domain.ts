import marked from "marked"
import Boom from "boom"
import {
  Entity,
  QueryListOptions,
  QueryResult,
  DeleteResult
} from "gstore-node"
import { Context, Modules } from "../models"
import { BlogPostType } from "./models"
export interface BlogPostDomain {
  getPosts(
    options?: QueryListOptions
  ): Promise<QueryResult<BlogPostType>>
  getPost(
    id: number | string,
    dataLoader: any
  ): Promise<Entity<BlogPostType>>
  createPost(
    data: BlogPostType,
    dataLoader: any
  ): Promise<Entity<BlogPostType>>
  updatePost(
    id: string | number,
    data: BlogPostType,
    dataloader: any,
    overwrite?: boolean
  ): Promise<Entity<BlogPostType>>
  deletePost(id: string | number): Promise<DeleteResult>
}
export default (
  context: Context,
  { blogPostDB }: Modules
): BlogPostDomain => {
  return {
    /**
     * Get a list of BlogPosts
     */
    getPosts(options = {}) {
      return blogPostDB.getPosts(options)
    },
    /**
     * Get a BlogPost
     * @param {*} id Id of the BlogPost to fetch
     * @param {*} dataloader optional. A Dataloader instance
     */
    async getPost(id, dataloader) {
      id = +id
      if (isNaN(id)) {
        throw new Error("BlogPost id must be an integer")
      }
      let post: Entity<BlogPostType>
      try {
        post = <Entity<BlogPostType>>(
          await blogPostDB.getPost(id, dataloader)
        )
      } catch (err) {
        throw err
      }
      if (post && post.content) {
        // Convert markdown to Html
        post.contentToHtml = marked(post.content)
      }
      return post
    },
    /**
     * Create a BlogPost
     * @param {*} data BlogPost entity data
     * @param {*} dataloader optional Dataloader instance
     */
    createPost(data: BlogPostType, dataloader: any) {
      return blogPostDB.createPost(data, dataloader)
    },
    /**
     * Update a BlogPost entity in the Datastore
     * @param {number} id Id of the BlogPost to update
     * @param {*} data BlogPost entity data
     * @param {Dataloader} dataloader optional Dataloader instance
     * @param {boolean} overwrite overwrite the entity in Datastore
     */
    updatePost(id, data, dataloader, overwrite = false) {
      id = +id
      if (isNaN(id)) {
        throw new Boom("BlogPost id must be an integer", {
          statusCode: 400
        })
      }
      return blogPostDB.updatePost(id, data, dataloader, overwrite)
    },
    /**
     * Delete a BlogPost entity in the Datastore
     * @param {number} id Id of the BlogPost to delete
     */
    deletePost(id) {
      return blogPostDB.deletePost(+id)
    }
  }
}