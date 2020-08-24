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
    dispatch({
      // dispatch the action 
      type: SUBSCRIPTIONS_GET_LIST_REQUEST,
      // set type of action
      error: null,
      // set error to null
      isLoading
      // set is loading to true 
    })

    return axios.post(routeApi, query({
      // create a post request with the routes and start building a query
      operation: 'subscriptions',
      // set the name of the query
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
      // set the fields of the query. id, userdetails, the crate details, when it was created at 
    }))
      .then(response => {
        if (response.status === 200) {
          // if the status of the response is OK (200)
          dispatch({
            type: SUBSCRIPTIONS_GET_LIST_RESPONSE,
            // set the type of the action to get list response
            error: null,
            // set error to null
            isLoading: false,
            // set is loading to false
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
        // if there is an actual error
        dispatch({
          type: SUBSCRIPTIONS_GET_LIST_FAILURE,
          // dispatch the get list failure
          error: 'Some error occurred. Please try again.',
          // change the state of the error
          isLoading: false
          // set state of is loading to false
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
      // set error to null
      isLoading
      // send is loading to state 
    })

    return axios.post(routeApi, query({
      // create post request and build query
      operation: 'subscriptionsByUser',
      // create the name of the query
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
      // create the fields for the query 
      // id, user details, crate details, created at
    }))
      .then(response => {
        if (response.status === 200) {
          // if the response is OK 
          dispatch({
            type: SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE,
            // dispatch action and set the type
            error: null,
            // set state error to null
            isLoading: false,
            // set state of is loading to false
            list: response.data.data.subscriptionsByUser
            // set state of the list the the data from the response 
          })
        } else {
          console.error(response)
          // if status of response is not 200, log response to the console
        }
      })
      .catch(error => {
        // if there is an actual error
        dispatch({
          type: SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE,
          // create a dispatch and set the type
          error: 'Some error occurred. Please try again.',
          // set state of the error to error text
          isLoading: false
          // set state of is loading to false
        })
      })
  }
}

// Get single subscription
export function get(slug, isLoading = true) {
  return dispatch => {
    dispatch({
      type: SUBSCRIPTIONS_GET_REQUEST,
      // create a dispatch and set the type
      isLoading
      // set state if is loading to false 
    })

    return axios.post(routeApi, query({
      // create the post request and build query
      operation: 'subscription',
      // set name of query
      variables: { slug },
      // need to do more research into slugggg
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'createdAt']
      // set fields of the query 
    }))
      .then(response => {
        dispatch({
          type: SUBSCRIPTIONS_GET_RESPONSE,
          // dispatch action and set type
          error: null,
          // set error to null
          isLoading: false,
          // set is loading to false
          item: response.data.data.subscription
          // set state of item to the response data
        })
      })
      .catch(error => {
        dispatch({
          type: SUBSCRIPTIONS_GET_FAILURE,
          // if there is an error set action type
          error: 'Some error occurred. Please try again.',
          // set state to error
          isLoading: false
          // set state of is loading to false
        })
      })
  }
}

// Create subscription
export function create(variables) {
  // create a subscription 
  return dispatch => {
    return axios.post(routeApi, mutation({
      // create a post request with a mutation query
      operation: 'subscriptionCreate',
      // name the operation 
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
      // give id
    }))
  }
}
