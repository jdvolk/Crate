'use strict'

// Subscription
module.exports = function(sequelize, DataTypes) {
  let Subscription = sequelize.define('subscriptions', {
    // define subscriptions model as 'subscriptions'
    userId: {
      type: DataTypes.INTEGER
      // set userId to integers
    },
    crateId: {
      type: DataTypes.INTEGER
      // set crateId to integers

    }
    // setting up the belongs_to relationships for subscriptions to attach to User models and crate models

//  expectedDelivery: {
//    type: DataTypes.DATE
//  }
  })

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User)
    // setting subscription belongs_to User relationship
    Subscription.belongsTo(models.Crate)
    // setting subscription belongs_to crate relationship
  }

  return Subscription
}
