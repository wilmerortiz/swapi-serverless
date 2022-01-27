const VehicleModel = (sequelize, DataType) => {
  const Vehicle = sequelize.define('vehicles', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING
    },
    model: {
      type: DataType.STRING
    },
    manufacturer: {
      type: DataType.STRING
    },
    cost_in_credits: {
      type: DataType.DECIMAL(18, 2)
    },
    length: {
      type: DataType.DECIMAL(5, 2)
    },
    max_atmosphering_speed: {
      type: DataType.DECIMAL(5, 2)
    },
    crew: {
      type: DataType.DECIMAL(5, 2)
    },
    passengers: {
      type: DataType.INTEGER
    },
    cargo_capacity: {
      type: DataType.DECIMAL(10, 2)
    },
    consumables: {
      type: DataType.STRING
    },
    vehicle_class: {
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

  return Vehicle
}

module.exports = VehicleModel