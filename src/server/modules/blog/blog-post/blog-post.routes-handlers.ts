import { Request, Response } from "express"
import { Entity, QueryResult, DeleteResult } from 'gstore-node'
import { BlogPostType } from './models'
import { Context, Modules } from "../models"

export interface BlogPostRoutesHandlers {
  listPosts(req: Request, res: Response): any
  detailPost(req: Request, res: Response): any
  displayPosts(req: Request, res: Response): any
  deletePost(req: Request, res: Response): any
}

const compare = (a: any, b: any) => parseInt(a.title.split(' ')[1]) > parseInt(b.title.split(' ')[1]) ? 1 : -1

export default (
  { gstore, logger }: Context,
  { blogPostDomain }: Modules,
): BlogPostRoutesHandlers => {
  return {
    async displayPosts(_, res) {
      const template = "blog/display"
      let posts: QueryResult<BlogPostType>
      try {
        posts = await blogPostDomain.getPosts()
      } catch (error) {
        return res.render(template, {
          blogPosts: [],
          error
        })
      }
      res.render(template, {
        blogPosts: posts.entities.sort(compare),
        pageId: "home"
      })
    },
    async listPosts(_, res) {
      const template = "blog/index"
      let posts: QueryResult<BlogPostType>
      try {
        posts = await blogPostDomain.getPosts()
      } catch (error) {
        return res.render(template, {
          blogPosts: [],
          error
        })
      }
      res.render(template, {
        blogPosts: posts.entities.sort(compare),
        pageId: "home"
      })
    },
    async deletePost(req, res) {
      let result: DeleteResult;
      try {
        result = await blogPostDomain.deletePost(req.params.id);
      } catch (err) {
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
      const dataloader = gstore.createDataLoader()
      const template = "blog/detail"
      let blogPost: Entity<BlogPostType>
      try {
        blogPost = await blogPostDomain.getPost(
          req.params.id,
          dataloader
        )
      } catch (error) {
        if (error.code === "ERR_ENTITY_NOT_FOUND") {
          return res.redirect("/404")
        }
        return res.render(template, { post: null, error })
      }
      return res.render(template, {
        pageId: "blogpost-view",
        blogPost
      })
    }
  }
}