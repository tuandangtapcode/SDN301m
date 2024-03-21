import ComicRoute from './comic.route.js'
import CommentRoute from './comment.route.js'
import GenreRoute from './genre.route.js'
import ImageRoute from './image.route.js'
import UserRoute from './user.route.js'
import NotificaitonRoute from './notiffication.route.js'
import PackageRoute from './package.route.js'
import PaymentRoute from './payment.route.js'


const routes = (app) => {
  app.use('/comic', ComicRoute)
  app.use('/comment', CommentRoute)
  app.use('/genre', GenreRoute)
  app.use('/image', ImageRoute)
  app.use('/user', UserRoute)
  app.use('/notification', NotificaitonRoute)
  app.use('/package', PackageRoute)
  app.use('/payment', PaymentRoute)
}

export default routes