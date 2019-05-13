
import express, { Router } from "express"
import multer from 'multer'
import { Context, Modules } from "./models"
import { AdminRoutesHandlers } from "./admin.routes-handlers"
const uploadInMemory = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  },
  fileFilter: (req, file, cb) => {
    // Validate image type
    if (["image/jpeg", "image/png"].indexOf(file.mimetype) < 0) {
      const err = new Error(
        `File type not allowed: ${req.file.mimetype}`
      )
      return cb(err, false)
    }
    return cb(null, true)
  }
})

const verifyAdmin = (req: any, res: any, next: any) => {
  if (req.query.password !== process.env.ADMIN_PASSWORD) throw new Error('Unauthorized')
  next()
}

export default (
  _: Context,
  routesHandlers: AdminRoutesHandlers,
  { images }: Modules
): Router => {
  const router = express.Router()
  router.get("/", verifyAdmin, routesHandlers.dashboard)
  router.get("/create-post", routesHandlers.createPost)
  router.get("/edit-post/:id", routesHandlers.editPost)
  router.post(
    "/create-post",
    [uploadInMemory.single("image")], // middleware to parse form
    routesHandlers.createPost
  )
  router.post(
    "/edit-post/:id",
    [uploadInMemory.single("image")], // middleware to parse form
    routesHandlers.editPost
  )
  return router
}