'use strict';

const { DATE } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert(
 'user',[
  {
    id :1,
    name:"harsha",
    email:"harsha@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id :2,
    name:"Kousil",
    email:"kousil@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
 ],{}
 );
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('user', null, {});

  }
};
