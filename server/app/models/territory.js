/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('territory', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    territory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'territory',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'territory'
  });
};
