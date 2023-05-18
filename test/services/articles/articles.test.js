// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../server/app.js'

describe('articles service', () => {
  it('registered the service', () => {
    const service = app.service('api/articles')

    assert.ok(service, 'Registered the service')
  })
})
