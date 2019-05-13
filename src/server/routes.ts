import path from "path"
import { Request, Response, NextFunction, Express } from "express"
import { Context, AppModules } from "./models"

export default (
  { logger, config }: Context,
  {
    app,
    modules: { blog, admin }
  }: { app: Express, modules: AppModules }
) => {

  app.use("/", blog.webRouter)
  app.use("/admin", admin.webRouter)

  const { apiBase } = config.common
  app.use(apiBase, blog.apiRouter)

  app.get("/404", (_, res) => {
    res.render(path.join(__dirname, "views", "404"))
  })

  // app.get("*", (_, res) => res.redirect("/blog"))

  app.use(
    (err: any, _: Request, res: Response, next: NextFunction) => {
      const payload = (err.output && err.output.payload) || err
      const statusCode =
        (err.output && err.output.statusCode) || 500
      logger.error(payload)
      return res.status(statusCode).json(payload)
    }
  )
}
