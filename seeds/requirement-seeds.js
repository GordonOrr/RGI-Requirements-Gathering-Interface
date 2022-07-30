const { Requirements } = require('../models');

const requirementData = [
  {
    title: 'Create menu item tool (Chef)',
    requirement_url: '',
    user_id: 2
  },
  {
    title: 'Create weekly menu tool - restaurant (Chef)',
    requirement_url: '',
    user_id: 2
  },
  {
    title: 'Create weekly menu tool - food truck (Chef)',
    requirement_url: '',
    user_id: 2
  },
  {
    title: 'Create daily sales projection tool - restaurant (GM)',
    requirement_url: '',
    user_id: 2
  },
  {
    title: 'Create weekly sales projection tool - food truck (GM)',
    requirement_url: '',
    user_id: 2
  },
  {
    title: 'Assimilate weekly grocery purchases and apply by menu items (GM)',
    requirement_url: '',
    user_id: 2
  },
  {
    title: 'UX dashboard to include tiles for tool selection with secure access',
    requirement_url: '',
    user_id: 1
  }

];

const seedRequirements = () => Requirements.bulkCreate(requirementData);

module.exports = seedRequirements;
