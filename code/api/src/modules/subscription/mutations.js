// Imports
import { GraphQLInt } from 'graphql'

// App Imports
import SubscriptionType from './types'
// import subscription type
import { create, remove } from './resolvers'
// import create and remove methods from resolvers file

// Subscription create
export const subscriptionCreate = {
  // subscriptionCreate method beginning
  type: SubscriptionType,
  // set type to SubscriptionType
  args: {
    crateId: {
      name: 'crateId',
      type: GraphQLInt
    }
    // pass args in for crate_id
  },
  resolve: create
  // resolver method 'create'
}

// Subscription update
// export const subscriptionUpdate = {
//   type: SubscriptionType,
//   args: {
//       Id: {
//       name: 'Id',
//       type: GraphQLInt
//           },
//        expected_delivery: {
//           name: 'expected_delivery',
//           type: GraphQLDate
//            }
//        },
//   resolve: update
// }
// not positive if the GraphQLDate is an actual GraphQl datatype or not



// Subscription remove
export const subscriptionRemove = {
  // subscriptionRemove method beginning
  type: SubscriptionType,
  // set type to SubscriptionType
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
    // pass args in for subscription_id to destroy the correct object from the database
  },
  resolve: remove
  // resolver method 'remove'
}
