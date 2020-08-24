module.exports = {
  up: (queryInterface, Sequelize) => {
    // when creating the database with the 'up' command
    return queryInterface.createTable('subscriptions', {
      //create the subscriptions table
      id: {
        // set the first attribute in the table to 'id'
        allowNull: false,
        // sets validations to require this field for the object to be created
        autoIncrement: true,
        // for each object created, increment the id by 1 in the database
        primaryKey: true,
        //state that this is the unique identifier for this table (this tells the table that this is the id attribute)
        type: Sequelize.INTEGER
        // set type to integer
      },
      userId: {
        //name of this attribute is userId
        type: Sequelize.INTEGER,
        // integer type
        references: {
          model: 'users',
          key: 'id'
          // reference the user model that has the key of this id
        },
        allowNull: false
        // sets validations to require this field for the object to be created
      },
      crateId: {
        type: Sequelize.INTEGER,
        // integer type
        references: {
          model: 'crates',
          key: 'id'
          // reference the crate model that has the key of this crates id
        },
        allowNull: false
        // sets validations to require this field for the object to be created
      },
      // We will need to add in an attribute for expected delivery date
      //  expected_delivery: {
      //     type: Sequelize.DATE
      //   },
      createdAt: {
        allowNull: false,
        // sets validations to require this field for the object to be created
        type: Sequelize.DATE
        // sets type to DATE
      },
      updatedAt: {
        allowNull: false,
        // sets validations to require this field for the object to be created
        type: Sequelize.DATE
        //sets type to DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subscriptions');
  }
}
