import initUtilsModule from './modules/utils'
import initAdminModule from './modules/admin'
import initBlogModule from './modules/blog'
import initImagesModule from './modules/images'
import { Context, AppModules } from './models'

export default (context: Context): AppModules => {

  const images = initImagesModule()
  const utils = initUtilsModule()
  const blog = initBlogModule(context, { utils, images })
  const admin = initAdminModule(context, { blog, images })

  return {
    utils,
    images,
    blog,
    admin
  }
}
