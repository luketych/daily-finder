// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const logsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Logs', additionalProperties: false }
)
export const logsValidator = getValidator(logsSchema, dataValidator)
export const logsResolver = resolve({})

export const logsExternalResolver = resolve({})

// Schema for creating new entries
export const logsDataSchema = Type.Pick(logsSchema, ['text'], {
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
export const logsQueryProperties = Type.Pick(logsSchema, ['_id', 'text'])
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
