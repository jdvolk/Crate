// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import SubscriptionType from './types'
// import subscription type
import { getAll, getByUser, get } from './resolvers'
// import resolver methods
// add updateDelivery method to line 6

// Subscriptions All
export const subscriptions = {
  type: new GraphQLList(SubscriptionType),
  resolve: getAll
  // subscriptions query for resolver to getAll subscripitons
}

// Subscriptions Update Delivery
// export const subscriptionUpdate = {
//   type: new GraphQLList(SubscriptionType),
//   resolve: updateDelivery
// }

// Subscriptions by user
export const subscriptionsByUser = {
  // subscriptionsByUser method creation
  type: new GraphQLList(SubscriptionType),
  // set type to SubscriptionType
  resolve: getByUser
  // resolver method getByUser
}

// Subscription By id
export const subscription = {
  // subscription method creation
  type: SubscriptionType,
  // set type to SubscriptionType
  args: {
    id: { type: GraphQLInt }
  },
  // pass in Subscription Id
  resolve: get
  //resovles get method for resolver
}
