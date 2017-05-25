/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('street', {
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
    },
    socr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    post: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nda: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'street'
  });
};
