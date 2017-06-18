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
      type: DataTypes.STRING(100),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gos_no: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    territory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'territory',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'car'
  });
};
