//const connectToDatabase = require('../../db')
//const { People, Planet, Specie, Vehicle, Starship } = connectToDatabase

const FilmModel = (sequelize, DataTypes) => {
  const Film = sequelize.define('films', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING
    },
    episode_id: {
      type: DataTypes.INTEGER
    },
    director: {
      type: DataTypes.STRING
    },
    producer: {
      type: DataTypes.STRING
    },
    release_date: {
      type: DataTypes.DATE
    },
    characters: {
      type: DataTypes.TEXT
    },
    planets: {
      type: DataTypes.TEXT
    },
    starships: {
      type: DataTypes.TEXT
    },
    vehicles: {
      type: DataTypes.TEXT
    },
    species: {
      type: DataTypes.TEXT
    },
    created: {
      type: DataTypes.STRING
    },
    edited: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
  },{
    timestamps: false,
  })

  /*================================
  Relations belongsToMany
  =================================*/

  Film.associate = (models) => {
    Film.belongsToMany(models.People, { through: 'films_peoples' })
  }
  /*People.belongsToMany(Film, { through: 'films_peoples' })

  Film.belongsToMany(Planet, { through: 'films_planets' })
  Planet.belongsToMany(Film, { through: 'films_planets' })

  Film.belongsToMany(Specie, { through: 'films_species' })
  Specie.belongsToMany(Film, { through: 'films_species' })

  Film.belongsToMany(Vehicle, { through: 'films_vehicles' })
  Vehicle.belongsToMany(Film, { through: 'films_vehicles' })

  Film.belongsToMany(Starship, { through: 'films_starships' })
  Starship.belongsToMany(Film, { through: 'films_starships' })

   */

  return Film;
}

module.exports = FilmModel