// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
//import datatypes from GraphQl

// App Imports
import { UserType } from '../user/types'
import CrateType from '../crate/types'
//import user and crate types

// Subscription type
const SubscriptionType = new GraphQLObjectType({
  //set variable name to SubscriptionType
  name: 'subscription',
  description: 'Subscription Type',
  // name attributes for new GraphQl object

  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: UserType },
    crate: { type: CrateType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
    // pass in fields of actual subscription Object attributes
    // will need to pass in expecte3dDelivery as well
  })
})

export default SubscriptionType
//export variable named on line 11
