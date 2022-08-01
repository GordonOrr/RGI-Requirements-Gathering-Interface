const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ContributorLog extends Model {}

ContributorLog.init(
  {
    contribution_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    requirement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'requirement',
        key: 'requirement_id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ContributorLog'
  }
);

module.exports = ContributorLog;
