/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
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
        model: 'client',
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
      type: DataTypes.STRING(10),
      allowNull: true
    },
    doc_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    doc_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dt_begin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dt_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    userm_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    dtm: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'category'
  });
};
