import { keywordObjectId } from '@feathersjs/mongodb'

// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import { Ajv, addFormats } from '@feathersjs/schema'

const formats = [
  'date-time',
  'iso-date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex'
]

export const dataValidator = addFormats(new Ajv({}), formats)

export const queryValidator = addFormats(
  new Ajv({
    coerceTypes: "array"
  }),
  formats
)

dataValidator.addKeyword(keywordObjectId)
queryValidator.addKeyword(keywordObjectId)
