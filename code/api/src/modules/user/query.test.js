import request from 'supertest'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../setup/schema'

describe('user_queries', () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false,
      })
    )
  })

  it('returns all users', async () => {
    const response = await request(server)
    .get('/')
    .send({ query: '{ users { email name description} }'})
    .expect(200)

    expect(response.body.data.users.length).toEqual(2)
  })

  it('returns  can return a user', async () => {
    const response = await request(server)
    .get('/')
    .send({query: '{ user(id: 2) { email name}}'})
    .expect(200)

    expect(response.body.data.user.email).toEqual("user@crate.com")
    expect(response.body.data.user.name).toEqual("The User")
  })

  it('is_true', () => {
    expect(true).toBe(true)
  })
})
