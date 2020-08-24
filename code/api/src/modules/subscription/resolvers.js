// App Imports
import models from '../../setup/models'
// import all models

// Get subscription by ID
export async function get(parentValue, { id }) {
  // get method creation for resolvers (pass in id of subscription)
  return await models.Subscription.findOne({
    // findOne returns one model object that matches the id for this subscriptiuon
    where: { id },
    // Association to return the model where the id matches the id passed in
    include: [
      { model: models.User, as: 'user' },
      // include the attached models
      // subscription has a user and a crate Association
      // each subscription belongs_to a user
      { model: models.Crate, as: 'crate' },
      // it also belongs_to a crate
    ]
  })
}

// Get subscription by user
export async function getByUser(parentValue, {}, { auth }) {
  //import auth clarification, whether the user is authenticated or not
  if(auth.user && auth.user.id > 0) {
    // if the user exists
    return await models.Subscription.findAll({
      // return all of the subscriptions
      where: {
        userId: auth.user.id
        // associated with this logged in user
      },
      include: [
        {model: models.User, as: 'user'},
        // include the user model
        {model: models.Crate, as: 'crate'},
        // as well as the crate model
      ]
    })
  } else {
    // if the user is not logged in.....
    throw new Error('Please login to view your subscriptions.')
    ///throw this error
  }
}

// Get all subscriptions
export async function getAll() {
  // method getAll creation
  return await models.Subscription.findAll({
    //reutrn all subscri[ption models]
    include: [
      { model: models.User, as: 'user' },
      // and include their attached user model
      { model: models.Crate, as: 'crate' },
      //as well as the attached crate model
    ]
  })
}

// Create subscription
export async function create(parentValue, { crateId }, { auth }) {
  // create method creation
  if(auth.user && auth.user.id > 0) {
    // if the user is logged in
    return await models.Subscription.create({
      // create the subscription model
      crateId,
      // with the crateId passed in on line 63
      userId: auth.user.id
      // with the userid of the logged in user
      //add in expecteddelivery attribute
      // expectedDelivery: DateTime.now + 3 days
    })
  } else {
    // if the user is not logged in throw this error
    throw new Error('Please login to subscribe to this crate.')
  }
}

// Update
// export async function update(parentValue, { expected_delivery }) {
//   return await models.User.update({
 // expected_delivery},
 // {where: {user.id})
// }

// Delete subscription
export async function remove(parentValue, { id }, { auth }) {
  // remove fiunction creation
  if(auth.user && auth.user.id > 0) {
    // if the user is logged in
    return await models.Subscription.destroy({where: {id, userId: auth.user.id}})
    // delete the subscription object with the correct userid and crateId
  } else {
    //else throw this denied error
    throw new Error('Access denied.')
  }
}
