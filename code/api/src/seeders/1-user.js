'use strict';

const bcrypt = require('bcrypt');
const config = require('../config/server.json');
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        description: "The admin profile",
        city: "Dallas",
        state: "TX",
        zip: "75287",
        shipping_address: "1042 N Flagstaff Ave",
        role: params.user.roles.admin,
        image: 'https://i.pinimg.com/originals/3d/e9/1a/3de91acba161633edafac2df468c3b6f.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The User',
        email: 'user@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        description: "The user profile",
        city: "Destin",
        state: "FL",
        zip: "32541",
        shipping_address: "1042 N Beach St",
        role: params.user.roles.user,
        image: 'https://i.pinimg.com/originals/20/0e/47/200e4762b3f505c959379bd56f0c06f4.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}
