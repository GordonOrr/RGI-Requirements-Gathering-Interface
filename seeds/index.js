const seedUsers = require('./user-seeds');
const seedRequirements = require('./requirement-seeds');
const seedComments = require('./comment-seeds');
const seedContributors = require('./contributor-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedRequirements();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  await seedContributors();
  console.log('--------------');

  process.exit(0);
};

seedAll();
