const Sequelize = require('sequelize')
const dbConfig = require("./db.config");

const PeopleModel = require('./src/models/PeopleModel')
const FilmModel = require('./src/models/FilmModel')
const StarshipModel = require('./src/models/StarshipModel')
const VehicleModel = require('./src/models/VehicleModel')
const SpecieModel = require('./src/models/SpecieModel')
const PlanetModel = require('./src/models/PlanetModel')

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    dialect: dbConfig.DIALECT,
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    logging: false
  }
)

const People = PeopleModel(sequelize, Sequelize)
const Film = FilmModel(sequelize, Sequelize)
const Starship = StarshipModel(sequelize, Sequelize)
const Vehicle = VehicleModel(sequelize, Sequelize)
const Specie = SpecieModel(sequelize, Sequelize)
const Planet = PlanetModel(sequelize, Sequelize)

const Models = { People, Film, Starship, Vehicle, Specie, Planet }

const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.')
    return Models
  }

  await sequelize.sync()
  await sequelize.authenticate()
  connection.isConnected = true
  console.log('=> Created a new connection.')
  return Models
}