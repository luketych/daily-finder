export const path = 'orderProcedures'

export const methods = ['find', 'get', 'create', 'patch', 'update', 'remove']

export const client = (client) => {
  const connection = client.get('connection')

  client.use(path, connection.service(path), {
    methods: methods
  })
}