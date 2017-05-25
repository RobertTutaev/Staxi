/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('raion', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'raion'
  });
};
