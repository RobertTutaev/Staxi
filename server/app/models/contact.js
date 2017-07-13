/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contact', {
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
    type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'type',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
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
    dtm: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'contact'
  });
};
