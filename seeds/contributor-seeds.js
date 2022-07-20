const { ContributorLog } = require('../models');

const contributordata = [
  {
    user_id: 1,
    post_id: 1
  }
];

const seedContributors = () => ContributorLog.bulkCreate(contributordata);

module.exports = seedContributors;
