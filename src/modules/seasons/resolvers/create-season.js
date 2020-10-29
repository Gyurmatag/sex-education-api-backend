const Season = require('../../../models/season')

const createSeason = async (_, {
  number,
  releaseDate
}) => {
  const newSeason = new Season({
    number,
    releaseDate
  })

  return newSeason.save()
}

module.exports = createSeason
