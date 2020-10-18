const Episode = require('../../../models/episode')

const createEpisode = async (_, {
  title,
  director,
  writer
}) => {
  const newEpisode = new Episode({
    title,
    director,
    writer
  })

  return newEpisode.save()
}

module.exports = createEpisode
