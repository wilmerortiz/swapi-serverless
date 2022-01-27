const PlanetModel = (sequelize, DataType) => {
  const Planet = sequelize.define('planets', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING
    },
    rotation_period: {
      type: DataType.INTEGER
    },
    orbital_period: {
      type: DataType.INTEGER
    },
    diameter: {
      type: DataType.DECIMAL(10, 2)
    },
    climate: {
      type: DataType.STRING
    },
    gravity: {
      type: DataType.STRING
    },
    terrain: {
      type: DataType.STRING
    },
    surface_water: {
      type: DataType.INTEGER
    },
    population: {
      type: DataType.DECIMAL(18, 2)
    },
    residents: {
      type: DataType.TEXT
    },
    films: {
      type: DataType.TEXT
    },
    created: {
      type: DataType.STRING
    },
    edited: {
      type: DataType.STRING
    },
    url: {
      type: DataType.STRING
    },
  },{
    timestamps: false,
  })

  return Planet
}

module.exports = PlanetModel