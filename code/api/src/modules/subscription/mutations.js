// Imports
import { GraphQLInt } from 'graphql'

// App Imports
import SubscriptionType from './types'
import { create, remove } from './resolvers'

// Subscription create
export const subscriptionCreate = {
  type: SubscriptionType,
  args: {
    crateId: {
      name: 'crateId',
      type: GraphQLInt
    }
  },
  resolve: create
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
  type: SubscriptionType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}
