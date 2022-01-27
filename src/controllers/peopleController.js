const connectToDatabase = require('../../db')
const traslateText = require("../traslate");
const axios = require('axios');
const URL_SWAPI = "https://swapi.py4e.com/api/";

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

module.exports.create = async (event) => {
  let data = JSON.parse(event.body)
  let { films, species, vehicles, starships } = data;

  try {

    const { People } = await connectToDatabase()
    /*========================================
    Convertimos a un sting cada uno de los arrays y lo asignamos.
    =========================================*/
    data["films"] = films.toString();
    data["species"] = species.toString();
    data["vehicles"] = vehicles.toString();
    data["starships"] = starships.toString();

    const people = await People.create(data)
    return {
      statusCode: 200,
      body: JSON.stringify(people)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: 'Could not create the people.'
    }
  }
}

module.exports.getOne = async (event) => {
  try {

    if(event.pathParameters.id < 5){
      try {
        const { data } = await axios.get(`${URL_SWAPI}people/${event.pathParameters.id}`);

        const textTraslate = traslateText([data])

        return {
          statusCode: 200,
          body: JSON.stringify(textTraslate)
        }

      } catch (error) {
        throw new HTTPError(404, `Film with id: ${event.pathParameters.id} was not found`)
      }
    }else{

      const { People } = await connectToDatabase()
      const people = await People.findByPk(event.pathParameters.id)
      if (!people) throw new HTTPError(404, `People with id: ${event.pathParameters.id} was not found`)
      /*============================================
      Convertimos el sting a un array
      ============================================*/
      people["films"] = people.films.split(',')
      people["species"] = people.species.split(',')
      people["vehicles"] = people.vehicles.split(',')
      people["starships"] = people.starships.split(',')

      const textTraslate = traslateText([people.dataValues])

      return {
        statusCode: 200,
        body: JSON.stringify(textTraslate[0])
      }

    }


  } catch (err) {

    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not fetch the People.'
    }
  }
}

module.exports.getAll = async () => {
  try {
    let listPeoples = [];

    const { data } = await axios.get(`${URL_SWAPI}people`);

    data.results.map(film => {
      listPeoples.push(film);
    })

    const { People } = await connectToDatabase()
    const peoples = await People.findAll();

    peoples.map(pp => {
      listPeoples.push({
        id: pp.id,
        name: pp.name,
        height: pp.height,
        mass: pp.mass,
        hair_color: pp.hair_color,
        skin_color: pp.skin_color,
        eye_color: pp.eye_color,
        birth_year: pp.birth_year,
        gender: pp.gender,
        homeworld: pp.homeworld,
        films: pp.films.split(','),
        species: pp.species.split(','),
        vehicles: pp.vehicles.split(','),
        starships: pp.starships.split(','),
        created: pp.created,
        edited: pp.edited,
        url: pp.url
      })
    })

    const textTraslate = traslateText(listPeoples)

    return {
      statusCode: 200,
      body: JSON.stringify(textTraslate)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the peoples.'
    }
  }
}

module.exports.update = async (event) => {
  try {
    const input = JSON.parse(event.body)
    const { People } = await connectToDatabase()
    const people = await People.findByPk(event.pathParameters.id)
    if (!people) throw new HTTPError(404, `People with id: ${event.pathParameters.id} was not found`)
    input.name && (people.name = input.name)
    input.height && (people.height = input.height)
    input.mass && (people.mass = input.mass)
    input.hair_color && (people.hair_color = input.hair_color)
    input.skin_color && (people.skin_color = input.skin_color)
    input.eye_color && (people.eye_color = input.eye_color)
    input.birth_year && (people.birth_year = input.birth_year)
    input.gender && (people.gender = input.gender)
    input.homeworld && (people.homeworld = input.homeworld)
    input.films && (people.films = input.films.toString())
    input.species && (people.species = input.species.toString())
    input.vehicles && (people.vehicles = input.vehicles.toString())
    input.starships && (people.starships = input.starships.toString())
    input.created && (people.created = input.created)
    input.edited && (people.edited = input.edited)
    input.url && (people.url = input.url)

    await people.save()
    return {
      statusCode: 200,
      body: JSON.stringify(people)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not update the People.'
    }
  }
}

module.exports.delete = async (event) => {
  try {
    const { People } = await connectToDatabase()
    const people = await People.findByPk(event.pathParameters.id)
    if (!people) throw new HTTPError(404, `People with id: ${event.pathParameters.id} was not found`)
    await people.destroy()
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'People delete successfully',
        data: people
      })
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could destroy fetch the People.'
    }
  }
}