const StarshipModel = (sequelize, DataType) => {
  const Starship = sequelize.define('starships', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    model: {
      type: DataType.STRING
    },
    manufacturer: {
      type: DataType.STRING
    },
    cost_in_credits: {
      type: DataType.STRING
    },
    length: {
      type: DataType.STRING
    },
    max_atmosphering_speed: {
      type: DataType.STRING
    },
    crew: {
      type: DataType.STRING
    },
    passengers: {
      type: DataType.STRING
    },
    cargo_capacity: {
      type: DataType.STRING
    },
    consumables: {
      type: DataType.STRING
    },
    hyperdrive_rating: {
      type: DataType.STRING
    },
    MGLT: {
      type: DataType.STRING
    },
    starship_class: {
      type: DataType.STRING
    },
    pilots: {
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

  return Starship
}

module.exports = StarshipModel