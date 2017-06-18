/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    mask: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    placeholder: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    style: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'type'
  });
};
