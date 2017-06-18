/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('street', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      type: DataTypes.STRING(200),
      allowNull: true
    },
    socr: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    post: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    nda: {
      type: DataTypes.STRING(15),
      allowNull: true
    }
  }, {
    tableName: 'street'
  });
};
