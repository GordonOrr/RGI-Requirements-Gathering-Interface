const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Working on this requirement.',
    user_id: 1,
    requirement_id: 1
  }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
