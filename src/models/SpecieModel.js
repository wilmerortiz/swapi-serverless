const SpecieModel = (sequelize, DataType) => {
  const Specie = sequelize.define('species', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING
    },
    classification: {
      type: DataType.STRING
    },
    designation: {
      type: DataType.STRING
    },
    average_height: {
      type: DataType.INTEGER
    },
    skin_colors: {
      type: DataType.STRING
    },
    hair_colors: {
      type: DataType.STRING
    },
    eye_colors: {
      type: DataType.STRING
    },
    average_lifespan: {
      type: DataType.STRING
    },
    homeworld: {
      type: DataType.STRING
    },
    language: {
      type: DataType.STRING
    },
    people: {
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

  return Specie
}

module.exports = SpecieModel