// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const articlesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    tags: Type.Array(Type.String()),
    title: Type.String(),
    text: Type.String(),

    // default and format doesn't work
    createdAt: Type.String({ default: () => new Date().toISOString(), /* format: 'iso-date-time' */ }),
    updatedAt: Type.String({ default: () => new Date().toISOString(), /* format: 'iso-date-time' */ })
  },
  { $id: 'Articles', additionalProperties: true }
)
export const articlesValidator = getValidator(articlesSchema, dataValidator)
export const articlesResolver = resolve({})

export const articlesExternalResolver = resolve({})

// Schema for creating new entries
export const articlesDataSchema = Type.Pick(articlesSchema, ['tags','title','text'], {
  $id: 'ArticlesData'
})
export const articlesDataValidator = getValidator(articlesDataSchema, dataValidator)
export const articlesDataResolver = resolve({})

// Schema for updating existing entries
export const articlesPatchSchema = Type.Partial(articlesSchema, {
  $id: 'ArticlesPatch'
})
export const articlesPatchValidator = getValidator(articlesPatchSchema, dataValidator)
export const articlesPatchResolver = resolve({})

// Schema for allowed query properties
export const articlesQueryProperties = Type.Pick(articlesSchema, ['_id', 'tags','title','text', '$sort'])
export const articlesQuerySchema = Type.Intersect(
  [
    querySyntax(articlesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export const articlesQueryValidator = getValidator(articlesQuerySchema, queryValidator)
export const articlesQueryResolver = resolve({})
