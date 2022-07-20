// import all models
const Requirements = require('./Requirements');
const User = require('./User');
const ContributorLog = require('./ContributorLog');
const Comment = require('./Comment');

// create associations
User.hasMany(Requirements, {
  foreignKey: 'user_id'
});

Requirements.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Requirements, {
  through: ContributorLog,
  //NEED UP UPDATE VARIABLE NAMES
  as: 'voted_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Requirements.belongsToMany(User, {
  through: ContributorLog,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

ContributorLog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

ContributorLog.belongsTo(Requirements, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(ContributorLog, {
  foreignKey: 'user_id'
});

Requirements.hasMany(ContributorLog, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Requirements, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Requirements.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Requirements, ContributorLog, Comment };
