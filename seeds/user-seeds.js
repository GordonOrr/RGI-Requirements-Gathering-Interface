const sequelize = require('../config/connection');
const { User, Requirements } = require('../models');

const userdata = [
  {
    username: 'Andrew_Smith',
    email: 'andrew@test.com',
    password: 'passwordAndrew123'
  },
  {
    username: 'Gordon_Orr',
    email: 'gordon@test.com',
    password: 'passwordGordon123'
  },
  {
    username: 'Carter_Sheppard',
    email: 'carter@test.com',
    password: 'passwordCarter123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
