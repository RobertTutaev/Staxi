/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('firm', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firm_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'firm',
        key: 'id'
      }
    },
    territory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'territory',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'firm'
  });
};
