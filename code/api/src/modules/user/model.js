'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    shipping_address: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.TEXT
    },
    zip: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
