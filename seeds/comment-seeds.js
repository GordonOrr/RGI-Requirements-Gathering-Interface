const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Include database of primary ingredients',
    user_id: 2,
    requirement_id: 1
  },
  {
    comment_text: 'Preferred source for each ingredient',
    user_id: 2,
    requirement_id: 1
  },
  {
    comment_text: 'Quantity of ingredients of 5 servings',
    user_id: 2,
    requirement_id: 1
  },
  {
    comment_text: 'Selection from available menu - starter, main, side, desert',
    user_id: 2,
    requirement_id: 2
  },
  {
    comment_text: 'Shows when(week) each item last served',
    user_id: 2,
    requirement_id: 2
  },
  {
    comment_text: 'Shows how many weeks served in last 12 months',
    user_id: 2,
    requirement_id: 2
  },
  {
    comment_text: 'Selection from available menu - starter, main, side, desert',
    user_id: 2,
    requirement_id: 3
  },
  {
    comment_text: 'Shows when(week) each item last served',
    user_id: 2,
    requirement_id: 3
  },
  {
    comment_text: 'Shows how many weeks served in last 12 months',
    user_id: 2,
    requirement_id: 3
  },
  {
    comment_text: 'Make daily sales projection for each available menu item - unit of 5',
    user_id: 2,
    requirement_id: 4
  },
  {
    comment_text: 'Shows history of sales by menu item over past 3 months',
    user_id: 2,
    requirement_id: 4
  },
  {
    comment_text: 'Shows history daily sales over past 3 months - number of main, starter, side, deserts per day',
    user_id: 2,
    requirement_id: 4
  },
  {
    comment_text: 'Sets grocery requirements for week',
    user_id: 2,
    requirement_id: 4
  },
  {
    comment_text: 'Make daily sales projection for each available menu item - unit of 5',
    user_id: 2,
    requirement_id: 5
  },
  {
    comment_text: 'Shows history of sales by menu item over past 3 months',
    user_id: 2,
    requirement_id: 5
  },
  {
    comment_text: 'Shows history daily sales over past 3 months - number of main, starter, side, deserts per day',
    user_id: 2,
    requirement_id: 5
  },
  {
    comment_text: 'Applies purchases by each menu item',
    user_id: 2,
    requirement_id: 6
  },
  {
    comment_text: 'Determines food cost by menu item',
    user_id: 2,
    requirement_id: 6
  },
  {
    comment_text: 'Set price of menu item',
    user_id: 2,
    requirement_id: 6
  },
  {
    comment_text: 'Replicate tile design throughout each tool',
    user_id: 1,
    requirement_id: 7
  },
  {
    comment_text: 'Optimize for both desktop and mobile(tablet)',
    user_id: 1,
    requirement_id: 7
  }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
