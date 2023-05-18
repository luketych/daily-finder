import { user } from './users/users.js'

import { logs } from './logs/logs.js'

import { articles } from './articles/articles.js'

export const services = (app) => {
  app.configure(user)

  app.configure(logs)

  app.configure(articles)

  // All services will be registered here
}
