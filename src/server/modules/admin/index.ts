import { Router } from "express"
import initRoutes from "./admin.routes"
import initRoutesHandlers from "./admin.routes-handlers"
import { Context, Modules } from "./models"
export interface AdminModule {
  webRouter: Router
}
export default (context: Context, { blog, images }: Modules) => {
  const routesHandlers = initRoutesHandlers(context, { blog })
  return {
    webRouter: initRoutes(context, routesHandlers, { images })
  }
}