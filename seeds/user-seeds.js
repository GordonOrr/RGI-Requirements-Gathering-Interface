const sequelize = require('../config/connection');
const { User, Requirements } = require('../models');

const userdata = [
  {
    username: 'UX_Design_A',
    email: 'andrew@test.com',
    password: 'passwordAndrew123'
  },
  {
    username: 'Business_Analyst_G',
    email: 'gordon@test.com',
    password: 'passwordGordon123'
  },
  {
    username: 'Solution_Architecture_C',
    email: 'carter@test.com',
    password: 'passwordCarter123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
