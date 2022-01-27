module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define('peoples', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mass: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hair_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skin_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eye_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birth_year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    homeworld: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    films: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    species: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vehicles: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    starships: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    edited: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{
    timestamps: false,
  })

  People.associate = (models) => {
    People.belongsToMany(models.Film, { through: 'films_peoples' })
  }

  return People
}