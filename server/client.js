// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'

import { client as articlesClient } from './services/articles/articles.shared.js'

import { client as logsClient } from './services/logs/logs.shared.js'

import { client as userClient } from './services/users/users.shared.js'

/**
 * Returns a  client for the feathers-new app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)

  client.configure(articlesClient)

  client.configure(logsClient)

  return client
}
