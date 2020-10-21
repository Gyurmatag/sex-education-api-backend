const request = require('supertest')
const app = require('../app')
const graphQLRequest = ({ query, variables = null }) => {
    return request(app)
        .post('/')
        .send({
            variables,
            query
        })
}
const testUser = {
    email: 'test-user@gmail.com',
    password: 'test1234',
    username: 'test',
}
const login = ({ email, password }, returnValues = `{
    user {
      id
    }
    token
    tokenExpiration
}`) => {
    return graphQLRequest({
        query: `
          mutation {
            login(
              email: "${email}",
              password: "${password}",
            ) ${returnValues}
          }
        `
    })
}
module.exports = {
    testUser,
    request: graphQLRequest,
    login
}
