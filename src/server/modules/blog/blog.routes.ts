import express from "express"
import { Context, Modules } from "./models"
export default (context: Context, { blogPost }: Modules) => {

  const webRouter = express.Router()
  webRouter.get("/", blogPost.routesHandlers.displayPosts)
  webRouter.get("/index", blogPost.routesHandlers.listPosts)
  webRouter.get("/phases/:id", blogPost.routesHandlers.detailPost)

  const apiRouter = express.Router();
  apiRouter.delete(
    "/phases/:id",
    blogPost.routesHandlers.deletePost
  );
  return {
    webRouter,
    apiRouter
  }
}