import { Router } from "express"
import initRoutes from "./blog.routes"
import initBlogPost, { BlogPostModule } from "./blog-post"
import { Context, Modules } from "./models"
export interface BlogModule {
  webRouter: Router,
  apiRouter: Router,
  blogPost: BlogPostModule
}
export default (context: Context, modules: Modules): BlogModule => {

  const blogPost = initBlogPost(context, {})
  const { webRouter, apiRouter } = initRoutes(context, { blogPost })
  return {
    webRouter,
    apiRouter,
    blogPost
  }
}