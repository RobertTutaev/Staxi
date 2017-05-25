/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    inn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fam: {
      type: DataTypes.STRING,
      allowNull: true
    },
    im: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ot: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    raion_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'raion',
        key: 'id'
      }
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
      type: DataTypes.STRING,
      allowNull: true
    },
    kv: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'clients'
  });
};
