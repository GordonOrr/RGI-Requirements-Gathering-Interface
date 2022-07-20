const { Requirements } = require('../models');

const requirementData = [
  {
    title: 'Need a professional Readme file.',
    requirement_url: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    user_id: 1
  }
];

const seedRequirements = () => Requirements.bulkCreate(requirementData);

module.exports = seedRequirements;
