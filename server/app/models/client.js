/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    snils: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true
    },
    fam: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    im: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ot: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    street_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'street',
        key: 'id'
      }
    },
    dom: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    korp: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: ''
    },
    kv: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    reason_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'reason',
        key: 'id'
      }
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
    tableName: 'client'
  });
};
