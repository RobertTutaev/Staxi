/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('works', {
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
    a_raion_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'raion',
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
      type: DataTypes.STRING,
      allowNull: true
    },
    a_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    b_raion_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'raion',
        key: 'id'
      }
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
      type: DataTypes.STRING,
      allowNull: true
    },
    b_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checked: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0"
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    itog: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0"
    },
    dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'works'
  });
};
