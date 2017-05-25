/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('files', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    name_orig: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name_temp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'files'
  });
};
