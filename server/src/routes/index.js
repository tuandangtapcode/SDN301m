import ComicRoute from './comic.route.js'
import CommentRoute from './comment.route.js'
import GenreRoute from './gene.route.js'
import ImageRoute from './image.route.js'
import UserRoute from './user.route.js'


const routes = (app) => {
  app.use('/commic', ComicRoute)
  app.use('/comment', CommentRoute)
  app.use('/gene', GenreRoute)
  app.use('/image', ImageRoute)
  app.use('/user', UserRoute)
}

export default routes