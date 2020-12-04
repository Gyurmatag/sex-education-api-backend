const expect = require('expect')
const { testUser, request, login } = require('../../utils/test')

const signup = ({ email, password, username }, returnValues = `{
  id
  email
}`) => {
  return request({
    query: `
          mutation {
            signup(
              email: "${email}",
              password: "${password}",
              username: "${username}",
            ) ${returnValues}
          }
        `
  })
}
describe('auth', () => {
  describe('sign up', () => {
    it('should create a new user', () => {
      return signup(testUser)
        .expect(res => {
          expect(res.body).toHaveProperty('data.signup.id')
          expect(res.body).toHaveProperty('data.signup.email', testUser.email)
        })
        .expect(200)
    })
    it('should not create a new user when a password is missing', () => {
      return signup({
        ...testUser,
        password: null
      })
        .expect(res => {
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toBe(true)
        })
    })
    it('should not create a new user with the same email', () => {
      return signup(testUser)
        .expect(res => {
          expect(res.body).toHaveProperty('errors')
          expect(Array.isArray(res.body.errors)).toBe(true)
        })
    })
  })
  describe('login', () => {
    it('should successfully login and return a token', () => {
      return login(testUser)
        .expect(res => {
          expect(res.body).toHaveProperty('data.login.user.id')
          expect(res.body).toHaveProperty('data.login.accessToken')
          expect(res.body).toHaveProperty('data.login.accessTokenExpiration')
        })
        .expect(200)
    })
  })
  describe('me', () => {
    let loginResponse = null
    before(async () => {
      await login(testUser)
        .expect(res => {
          expect(res.body).toHaveProperty('data.login.user.id')
          expect(res.body).toHaveProperty('data.login.accessToken')
          expect(res.body).toHaveProperty('data.login.accessTokenExpiration')
          loginResponse = res.body
        })
        .expect(200)
    })
    it('should not return a profile when not logged in', () => {
      return request({
        query: `
                  query me {
                    me {
                      id
                      email
                      username
                    }
                  }
                `
      })
        .expect(res => {
          expect(res.body).toHaveProperty('errors')
          expect(res.body.data.me).toEqual(null)
          expect(Array.isArray(res.body.errors)).toBe(true)
        })
    })
    it('should successfully return the profile from me', () => {
      const token = loginResponse.data.login.accessToken
      return request({
        query: `
                  query me {
                    me {
                      id
                      email
                      username
                    }
                  }
                `
      })
        .set('x-access-token', token)
        .expect(res => {
          expect(res.body).toHaveProperty('data.me.id')
          expect(res.body).toHaveProperty('data.me.email', testUser.email)
          expect(res.body).toHaveProperty('data.me.username', testUser.username)
        })
        .expect(200)
    })
  })
})
