// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

export const logsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    articleID: Type.Optional(Type.String()),
    href: Type.Optional(Type.String()),
    text: Type.Optional(Type.String()),
    hrefs: Type.Optional(Type.Array(Type.String())),
    dtISO: Type.Optional(Type.String()),
    url: Type.Optional(Type.String()),
    userAgent: Type.Optional(Type.String()),
    ip: Type.Optional(Type.String()),
  },
  { $id: 'Logs', additionalProperties: true }
)
export const logsValidator = getValidator(logsSchema, dataValidator)
export const logsResolver = resolve({})

export const logsExternalResolver = resolve({})

// Schema for creating new entries
export const logsDataSchema = Type.Pick(logsSchema, [
  'articleID',
  'href',
  'text',
  'hrefs',
  'dtISO',
  'url',
  'userAgent',
  'ip'
], {
  $id: 'LogsData'
})
export const logsDataValidator = getValidator(logsDataSchema, dataValidator)
export const logsDataResolver = resolve({})

// Schema for updating existing entries
export const logsPatchSchema = Type.Partial(logsSchema, {
  $id: 'LogsPatch'
})
export const logsPatchValidator = getValidator(logsPatchSchema, dataValidator)
export const logsPatchResolver = resolve({})

// Schema for allowed query properties
export const logsQueryProperties = Type.Pick(logsSchema, [
  '_id',
  'articleID',
  'href',
  'text',
  'hrefs',
  'dtISO',
  'url',
  'userAgent',
  'ip'
])
export const logsQuerySchema = Type.Intersect(
  [
    querySyntax(logsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const logsQueryValidator = getValidator(logsQuerySchema, queryValidator)
export const logsQueryResolver = resolve({})
