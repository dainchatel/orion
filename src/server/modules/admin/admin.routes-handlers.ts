import is from "is"
import { Request, Response } from "express"
import { Context, Modules } from "./models"
export interface AdminRoutesHandlers {
  dashboard(req: Request, res: Response): any
  createPost(req: Request, res: Response): any
  editPost(req: Request, res: Response): any
}

const compare = (a: any, b: any) => parseInt(a.title.split(' ')[1]) > parseInt(b.title.split(' ')[1]) ? 1 : -1

export default (
  { gstore }: Context,
  { blog }: Modules
): AdminRoutesHandlers => {
  const { blogPostDomain } = blog.blogPost
  return {
    async dashboard(req, res) {
      const template = "admin/dashboard"
      let posts
      try {
        posts = await blogPostDomain.getPosts({
          cache: req.query.cache !== "false"
        })
      } catch (error) {
        return res.render(template, {
          error,
          pageId: "admin-index"
        })
      }
      res.render(template, {
        posts: posts.entities.sort(compare),
        pageId: "admin-index",
      })
    },
    async createPost(req, res) {
      const template = "admin/edit"
      if (req.method === "POST") {
        const entityData = Object.assign({}, req.body, {
          file: req.file
        })
        // We use the gstore helper to create a Dataloader instance
        const dataloader = gstore.createDataLoader()
        try {
          await blogPostDomain.createPost(entityData, dataloader)
        } catch (err) {
          return res.render(template, {
            blogPost: entityData,
            error: is.object(err.message) ? err.message : err
          })
        }
        // After succesfully creating the post we got back
        // to the home page and disable the cache
        return res.redirect(`/admin?cache=false&password=${process.env.ADMIN_PASSWORD}`)
      }
      return res.render(template, {
        pageId: "blogpost-edit"
      })
    },
    async editPost(req, res) {
      const template = "admin/edit"
      const pageId = "blogpost-edit"
      const dataloader = gstore.createDataLoader()
      const { id } = req.params
      if (req.method === "POST") {
        const entityData = Object.assign({}, req.body, {
          file: req.file
        })
        try {
          await blogPostDomain.updatePost(
            id,
            entityData,
            dataloader,
            true
          )
        } catch (err) {
          return res.render(template, {
            post: Object.assign({}, entityData, { id }),
            pageId,
            error: is.object(err.message) ? err.message : err
          })
        }
        return res.redirect(`/admin?cache=false&password=${process.env.ADMIN_PASSWORD}`)
      }
      let post
      try {
        post = await blogPostDomain.getPost(id, dataloader)
      } catch (err) {
        return res.render(template, {
          post: {},
          pageId,
          error: is.object(err.message) ? err.message : err
        })
      }
      if (!post) {
        return res.redirect("/404")
      }
      res.render(template, {
        post,
        pageId
      })
    }
  }
}