/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kategs', {
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
    kateg_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'kateg',
        key: 'id'
      }
    },
    doc_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    doc_ser: {
      type: DataTypes.STRING,
      allowNull: true
    },
    doc_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    doc_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dt_begin: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dt_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'kategs'
  });
};
