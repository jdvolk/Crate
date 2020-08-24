'use strict'

// Product
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    }
  })

  // Product.associate = function(models) {
  //   Product.hasMany(models.Product, {
     // add a has_many association to crate_products so that crates can have many products
     // and products can have many crates
  //    through: 'CrateProducts',
     // through the new table crate_products
  //    as: 'crates'
     // named as: crates
  //  })
  // }
  // return Product
}
