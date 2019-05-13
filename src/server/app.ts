import express from 'express'
import compression from 'compression'
import path from 'path'
import initRoutes from './routes'
import favicon from 'serve-favicon'

import { Context, AppModules } from './models'

export default (context: Context, modules: AppModules) => {
  const app = express()

  app.use(compression())
  app.set("views", "./views")
  app.set("view engine", "pug")
  app.use(
    "/public",
    express.static(path.join(__dirname, "..", "public"), {
      maxAge: "1 year"
    })
  )
  app.use(favicon(path.join(__dirname, "..", "/public/favicon.png")))
  app.disable("x-powered-by")

  initRoutes(context, { app, modules })

  return app
}
