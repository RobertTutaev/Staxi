/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transportation', {
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
    car_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'car',
        key: 'id'
      }
    },
    punkt_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'punkt',
        key: 'id'
      }
    },
    a_street_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'street',
        key: 'id'
      }
    },
    a_dom: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    a_korp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    a_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    b_street_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'street',
        key: 'id'
      }
    },
    b_dom: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    b_korp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    b_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checked: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
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
    }
  }, {
    tableName: 'transportation'
  });
};