import initRoutes, { BlogPostRoutesHandlers } from "./blog-post.routes-handlers"
import initDB from "./blog-post.db"
import initDomain, { BlogPostDomain } from "./blog-post.domain"
import { Context, Modules } from "../models"
export * from "./models"
export interface BlogPostModule {
  routesHandlers: BlogPostRoutesHandlers,
  blogPostDomain: BlogPostDomain
}
export default (
  context: Context,
  modules: Modules
): BlogPostModule => {
  const blogPostDB = initDB(context, modules)
  const blogPostDomain = initDomain(context, { blogPostDB })
  return {
    blogPostDomain,
    routesHandlers: initRoutes(context, { blogPostDomain })
  }
}