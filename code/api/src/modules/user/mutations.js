// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove } from './resolvers'



// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
// ^^^^^
// front end data will post request when it hits
//the API (create or remove). Requires resolvers which requires the
//`setup/models` which finds out what resources to create.


// Add argumentss that a user will be able to update:shipping address and email address.

// Create an update action in resolvers file
