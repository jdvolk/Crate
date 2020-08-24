'use strict'

// Subscription
module.exports = function(sequelize, DataTypes) {
  let Subscription = sequelize.define('subscriptions', {
    // define subscriptions model as 'subscriptions'
    userId: {
      type: DataTypes.INTEGER
      // set userId datatype to integers
    },
    crateId: {
      type: DataTypes.INTEGER
      // set crateId datatype to integers

    }
    // this sets up the belongs_to relationships for subscriptions to attach to User models and crate models
    // saving the crate id and the user id to the subscription gives you easy access to its parent models
    // these are called one_to_many relationships a Subscription can only belong to one user,
    // but a user can have_many subscriptions

    // add in expectedDelivery attribute
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
  // return the Subscription model
}
