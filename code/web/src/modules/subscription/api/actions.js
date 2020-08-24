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
export function getList(isLoading = true) {
  // set loading to true
  return dispatch => {
    // dispatch the action
    dispatch({
      type: SUBSCRIPTIONS_GET_LIST_REQUEST,
      // set type of action
      error: null,
      // set error to null
      isLoading
      // set isLoading to true
    })

    return axios.post(routeApi, query({
      // createsd a post request to the route and begins building a query
      operation: 'subscriptions',
      // set the name of the query
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
      // set the fields of the query. id, userdetails, the crate details, when it was created at
    }))
      .then(response => {
        if (response.status === 200) {
          // if request is successful,
          dispatch({
            type: SUBSCRIPTIONS_GET_LIST_RESPONSE,
            // set the type of action to get list response
            error: null,
            // set error to null
            isLoading: false,
            // set isLoading to false
            list: response.data.data.subscriptions
            // set the list of creates to what we get back from the response
          })
        } else {
          console.error(response)
          // if the status of the response is anything other than 200
         // pull up an error in the console with the entire response
        }
      })
      .catch(error => {
        // if there is an error
        dispatch({
          type: SUBSCRIPTIONS_GET_LIST_FAILURE,
          // dispatch the get list failure
          error: 'Some error occurred. Please try again.',
          // change the state error
          isLoading: false
          // set isLoading false
        })
      })
  }
}


// Get list of subscriptions by user
export function getListByUser(isLoading = true) {
  // set param name isLoading to true
  return dispatch => {
    dispatch({
      type: SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST,
      // create a dispatch and set action type
      error: null,
      isLoading
    })

    return axios.post(routeApi, query({
      // creatre post request and build query
      operation: 'subscriptionsByUser',
      //  name query
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
      // create query fields
    }))
      .then(response => {
        if (response.status === 200) {
          // if successful response
          dispatch({
            type: SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE,
            // dispatch action and set type
            error: null,
            // set sgtate aerror to null bc the response was successfull
            isLoading: false,
            // set loading state to false
            list: response.data.data.subscriptionsByUser
            // set state of the lisgt to the date from the response
          })
        } else {
          // or error it up
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

// Create subscription
export function create(variables) {
  // create a subscription
  return dispatch => {
    return axios.post(routeApi, mutation({
      // create a post reauest with a mutation query
      operation: 'subscriptionCreate',
      // names the operation
      variables,
      // pass through variables
      fields: ['id']
      // assign an id
    }))
  }
}

// Remove subscription
export function remove(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      // create a post request with a mutation to delete a sub
      operation: 'subscriptionRemove',
      // name the query
      variables,
      // pass through variables
      fields: ['id']
      // gives id
    }))
  }
}
