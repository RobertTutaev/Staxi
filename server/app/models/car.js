/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gos_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0"
    }
  }, {
    tableName: 'car'
  });
};
