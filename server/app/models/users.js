/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    inn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firm_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'firms',
        key: 'id'
      }
    },
    role0: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "1"
    },
    role1: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0"
    },
    role2: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0"
    },
    role3: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0"
    },
    role4: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0"
    },
    checked: {
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
    tableName: 'users'
  });
};
