const connectToDatabase = require('../../db')
const traslateText = require('../traslate');

function HTTPError (statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

module.exports.healthCheck = async () => {
  await connectToDatabase()
  console.log('Connection successful.')
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Connection successful.' })
  }
}

module.exports.addFilm = async (event) => {
  let data = JSON.parse(event.body)
  let { characters, planets, starships, vehicles, species } = data;

  try {
    const { Film } = await connectToDatabase()
    /*========================================
    Convertimos a un sting cada uno de los arrays y lo asignamos.
    =========================================*/
    data["characters"] = characters.toString();
    data["planets"] = planets.toString();
    data["starships"] = starships.toString();
    data["vehicles"] = vehicles.toString();
    data["species"] = species.toString();

    const film = await Film.create(data)
    return {
      statusCode: 200,
      body: JSON.stringify(film)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: 'Could not create the film.'
    }
  }
}

module.exports.getFilmOne = async (event) => {
  try {
    const { Film } = await connectToDatabase()
    const film = await Film.findByPk(event.pathParameters.id)
    if (!film) throw new HTTPError(404, `Film with id: ${event.pathParameters.id} was not found`)
    /*============================================
    Convertimos el sting a un array
    ============================================*/
    film["characters"] = film.characters.split(',')
    film["planets"] = film.planets.split(',')
    film["starships"] = film.starships.split(',')
    film["vehicles"] = film.vehicles.split(',')
    film["species"] = film.species.split(',')

    const textTraslate = traslateText([film.dataValues])

    return {
      statusCode: 200,
      body: JSON.stringify(textTraslate)
    }
  } catch (err) {

    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not fetch the Film.'
    }
  }
}

module.exports.getFilmAll = async () => {
  try {
    const { Film } = await connectToDatabase()
    const films = await Film.findAll();

    if (films.length === 0) throw new HTTPError(404, `Films was not found`)

    let listFilms = [];

    films.map(fl => {
      listFilms.push({
        id: fl.id,
        title: fl.title,
        episode_id: fl.episode_id,
        opening_crawl: fl.opening_crawl,
        director: fl.director,
        producer: fl.producer,
        release_date: fl.release_date,
        characters: fl.characters.split(','),
        planets: fl.planets.split(','),
        starships: fl.starships.split(','),
        vehicles: fl.vehicles.split(','),
        species: fl.species.split(','),
        created: fl.created,
        edited: fl.edited,
        url: fl.url,
        //traslate: textTraslate
      })
    })

    const textTraslate = traslateText(listFilms)
    //console.log('textTraslate', textTraslate);

    return {
      statusCode: 200,
      body: JSON.stringify(textTraslate)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the films.'
    }
  }
}

module.exports.editFilm = async (event) => {
  try {
    const input = JSON.parse(event.body)
    const { Film } = await connectToDatabase()
    const film = await Film.findByPk(event.pathParameters.id)
    if (!film) throw new HTTPError(404, `Film with id: ${event.pathParameters.id} was not found`)
    input.title && (film.title = input.title)
    input.episode_id && (film.episode_id = input.episode_id)
    input.opening_crawl && (film.opening_crawl = input.opening_crawl)
    input.director && (film.director = input.director)
    input.producer && (film.producer = input.producer)
    input.release_date && (film.release_date = input.release_date)
    input.characters && (film.characters = input.characters.toString())
    input.planets && (film.planets = input.planets.toString())
    input.starships && (film.starships = input.starships.toString())
    input.vehicles && (film.vehicles = input.vehicles.toString())
    input.species && (film.species = input.species.toString())
    input.created && (film.created = input.created)
    input.edited && (film.edited = input.edited)
    input.url && (film.url = input.url)

    await film.save()
    return {
      statusCode: 200,
      body: JSON.stringify(film)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not update the Film.'
    }
  }
}

module.exports.deleteFilm = async (event) => {
  try {
    const { Film } = await connectToDatabase()
    const film = await Film.findByPk(event.pathParameters.id)
    if (!film) throw new HTTPError(404, `Film with id: ${event.pathParameters.id} was not found`)
    await film.destroy()
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Film delete successfully',
        data: film
      })
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could destroy fetch the Film.'
    }
  }
}