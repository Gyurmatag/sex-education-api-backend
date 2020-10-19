const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI
const WORKERS = process.env.WORKERS
const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME
const JWT_SECRET = process.env.JWT_SECRET
module.exports = {
  PORT,
  MONGODB_URI,
  MONGODB_TEST_URI,
  WORKERS,
  JWT_LIFE_TIME,
  JWT_SECRET
}
