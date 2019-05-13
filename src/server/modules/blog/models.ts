import { Gstore } from "gstore-node"
import { Logger } from "winston"
import { ImagesModule } from '../images/index'
import { UtilsModule } from '../utils/index'
import { BlogPostModule } from "./blog-post"
import { BlogPostDB } from "./blog-post/blog-post.db"
import { BlogPostDomain } from './blog-post/blog-post.domain'
export type Context = {
  gstore: Gstore,
  logger: Logger
};
export type Modules = {
  blogPost?: BlogPostModule
  blogPostDB?: BlogPostDB
  blogPostDomain?: BlogPostDomain
  images?: ImagesModule
  utils?: UtilsModule
};