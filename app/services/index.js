import { articles } from './articles/articles.js'

export const services = (app) => {
  app.configure(articles)

  // All services will be registered here
}
