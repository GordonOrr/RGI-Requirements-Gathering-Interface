const { ContributorLog } = require('../models');

const contributordata = [
];

const seedContributors = () => ContributorLog.bulkCreate(contributordata);

module.exports = seedContributors;
