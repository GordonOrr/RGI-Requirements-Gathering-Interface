const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Requirements extends Model {
  static upvote(body, models) {
    return models.ContributorLog.create({
      user_id: body.user_id,
      requirement_id: body.requirement_id
    }).then(() => {
      return Requirements.findOne({
        where: {
          requirement_id: body.requirement_id
        },
        attributes: [
          'requirement_id',
          'requirement_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(contribution_id) FROM ContributorLog group WHERE requirement.requirement_id = ContributorLog.requirement_id)'), 'contributor_count']
        ],
        include: [
          {
            model: models.Comment,
            attributes: ['comment_id', 'comment_text', 'requirement_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]
      });
    });
  }
}

// create fields/columns for Post model
Requirements.init(
  {
    requirement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requirement_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'requirement'
  }
);

module.exports = Requirements;
