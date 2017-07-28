/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gos_no: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    firm_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'firm',
        key: 'id'
      }
    },
    driver_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    driver_phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'car'
  });
};
