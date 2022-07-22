const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Requirements extends Model {
  static upvote(body, user_id, models) {
    return models.ContributorLog.create({
      user_id: user_id,
      requirement_id: body.requirement_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.requirement_id
        },
        attributes: [
          'id',
          'requirement_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM ContributorLog WHERE requirement.requirement_id = ContributorLog.contribution_id)'), 'contributors_count']
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
