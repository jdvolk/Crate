// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const SUBSCRIPTIONS_GET_LIST_REQUEST = 'SUBSCRIPTIONS/GET_LIST_REQUEST'
export const SUBSCRIPTIONS_GET_LIST_RESPONSE = 'SUBSCRIPTIONS/GET_LIST_RESPONSE'
export const SUBSCRIPTIONS_GET_LIST_FAILURE = 'SUBSCRIPTIONS/GET_LIST_FAILURE'
export const SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST = 'SUBSCRIPTIONS/GET_LIST_BY_USER_REQUEST'
export const SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE = 'SUBSCRIPTIONS/GET_LIST_BY_USER_RESPONSE'
export const SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE = 'SUBSCRIPTIONS/GET_LIST_BY_USER_FAILURE'
export const SUBSCRIPTIONS_GET_REQUEST = 'SUBSCRIPTIONS/GET_REQUEST'
export const SUBSCRIPTIONS_GET_RESPONSE = 'SUBSCRIPTIONS/GET_RESPONSE'
export const SUBSCRIPTIONS_GET_FAILURE = 'SUBSCRIPTIONS/GET_FAILURE'

// Actions

// Get list of subscriptions
//sets loading to true
export function getList(isLoading = true) {
  //dispatches the action with the type SUBSCRIPTIONS_GET_LIST_REQUEST, error null, and loading true
  return dispatch => {
    dispatch({
      type: SUBSCRIPTIONS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    //returns a post request with the routes, starts building a query
    return axios.post(routeApi, query({
      //sets the name and fields of the query
      operation: 'subscriptions',
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
    }))
      .then(response => {
        //if the response is ok, dispatches the action same as the above
        if (response.status === 200) {
          dispatch({
            type: SUBSCRIPTIONS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.subscriptions
          })
          //if the response is not ok, logs an error in the console
        } else {
          console.error(response)
        }
      })
      //if there is an error, dispatches an action with an error
      .catch(error => {
        dispatch({
          type: SUBSCRIPTIONS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}


// Get list of subscriptions by user
export function getListByUser(isLoading = true) {
  //same as the above, dispatches an action with the type, error, and loading
  //this is identical to the above, but it handles the subscriptions for a specific user 
  //rather than all subscriptions (like in the above)
  return dispatch => {
    dispatch({
      type: SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'subscriptionsByUser',
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.subscriptionsByUser
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single subscription
export function get(slug, isLoading = true) {
  //this one is the same as the two above, but it returns only a single subscription
  //and it is a subscription that a user is subscribed to, i believe
  return dispatch => {
    dispatch({
      type: SUBSCRIPTIONS_GET_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'subscription',
      variables: { slug },
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
    }))
      .then(response => {
        dispatch({
          type: SUBSCRIPTIONS_GET_RESPONSE,
          error: null,
          isLoading: false,
          item: response.data.data.subscription
        })
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTIONS_GET_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Create subscription - this dispatches a post request to create a subscription 
//i think this is for when a user subscribes to a crate
export function create(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'subscriptionCreate',
      variables,
      fields: ['id']
    }))
  }
}

// Remove subscription - this dispatches a post request to remove a subscription
//it is for removing one that a user unsubscribes from, i believe
export function remove(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'subscriptionRemove',
      variables,
      fields: ['id']
    }))
  }
}
