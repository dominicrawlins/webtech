module.exports = (sequelize, DataTypes) =>
  sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    points: {
      type: DataTypes.INTEGER
    }
  })
