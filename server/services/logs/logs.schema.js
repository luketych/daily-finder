// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
// articleID: '${articleID}',
// href: e.target.href,
// text: e.target.text,
// hrefs: hrefs,
// dtISO: new Date().toISOString(),
// url: window.location.href,
// userAgent: window.navigator.userAgent,
// ip: ip
export const logsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    articleID: Type.String(),
    href: Type.String(),
    text: Type.String(),
    hrefs: Type.Array(Type.String()),
    dtISO: Type.String(),
    url: Type.String(),
    userAgent: Type.String(),
    ip: Type.String(),
  },
  { $id: 'Logs', additionalProperties: false }
)
export const logsValidator = getValidator(logsSchema, dataValidator)
export const logsResolver = resolve({})

export const logsExternalResolver = resolve({})

// Schema for creating new entries
export const logsDataSchema = Type.Pick(logsSchema, [
  '_id',
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
