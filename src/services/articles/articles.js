// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { ObjectId } from 'mongodb'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  articlesDataValidator,
  articlesPatchValidator,
  articlesQueryValidator,
  articlesResolver,
  articlesExternalResolver,
  articlesDataResolver,
  articlesPatchResolver,
  articlesQueryResolver
} from './articles.schema.js'
import { ArticlesService, getOptions } from './articles.class.js'

export const articlesPath = 'api/articles'
export const articlesMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './articles.class.js'
export * from './articles.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const articles = (app) => {
  // Register our service on the Feathers application
  app.use(articlesPath, new ArticlesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: articlesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(articlesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(articlesExternalResolver),
        schemaHooks.resolveResult(articlesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(articlesQueryValidator),
        schemaHooks.resolveQuery(articlesQueryResolver)
      ],
      find: [],
      get: [
        async ctx => {
          console.log(ctx.id)

          return ctx
        }
      ],
      create: [
        schemaHooks.validateData(articlesDataValidator),
        schemaHooks.resolveData(articlesDataResolver),
        async ctx => {
          ctx.data[0].createdAt = new Date().toISOString()
          ctx.data[0].updatedAt = new Date().toISOString()

          return ctx
        }
      ],
      patch: [
        schemaHooks.validateData(articlesPatchValidator),
        schemaHooks.resolveData(articlesPatchResolver),
        async ctx => {
          ctx.data.updatedAt = new Date().toISOString()

          return ctx
        }
      ],
      remove: []
    },
    after: {
      all: [
        ctx => {
          return ctx
        }
      ]
    },
    error: {
      all: [
        ctx => {
          return ctx
        }
      ]
    }
  })
}
