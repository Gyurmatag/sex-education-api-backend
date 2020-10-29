const expect = require('expect')
const { request, login, testUser } = require('../../utils/test')

const testSeason = {
  number: 1,
  releaseDate: '2019-01-17'
}

const createSeason = ({ number, releaseDate }, returnValues = `{
  id
  number
  releaseDate
}`) => {
  return request({
    query: `
          mutation {
            createSeason(
              number: ${number},
              releaseDate: "${releaseDate}"
            ) ${returnValues}
          }
        `
  })
}

describe('seasons', () => {
  let seasonResponse = null
  describe('createSeason', () => {
    let loginResponse = null
    before(async () => {
      await login(testUser)
        .expect(res => {
          expect(res.body).toHaveProperty('data.login.token')
          loginResponse = res.body
        })
        .expect(200)
    })
    it('should create a new season', () => {
      const token = loginResponse.data.login.token
      return createSeason(testSeason)
        .set('x-token', token)
        .expect(res => {
          expect(res.body).toHaveProperty('data.createSeason.id')
          expect(res.body).toHaveProperty('data.createSeason.number')
          expect(res.body).toHaveProperty('data.createSeason.releaseDate')
          seasonResponse = res.body
        })
        .expect(200)
    })
  })
})
