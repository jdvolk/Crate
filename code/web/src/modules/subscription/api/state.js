// Imports

// App Imports
import {
  SUBSCRIPTIONS_GET_LIST_REQUEST,
  SUBSCRIPTIONS_GET_LIST_RESPONSE,
  SUBSCRIPTIONS_GET_LIST_FAILURE,
  SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST,
  SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE,
  SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE,
  SUBSCRIPTIONS_GET_REQUEST,
  SUBSCRIPTIONS_GET_RESPONSE,
  SUBSCRIPTIONS_GET_FAILURE,
} from './actions'

// Subscriptions list

// Initial State of the subscriptions reducer
const subscriptionsInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State - reducer that handles actions for subscription component
//has initial state param in case state is not passed in,
//and what the action type is
export const subscriptions = (state = subscriptionsInitialState, action) => {
  switch (action.type) {
    //if the action is the get list request,
    //sets the state to loading and error to null
    case SUBSCRIPTIONS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

      //if it is reponse,
      //sets the state to not loading, and returns the error and list
    case SUBSCRIPTIONS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

        //if it is a failure,
        // returns the error and not loading
    case SUBSCRIPTIONS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

      //always returns the state
    default:
      return state
  }
}

// Subscriptions list by user

// Initial State - same as above, initial state for the reducer below
const subscriptionsByUserInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State - this does the exact same thing, but for the subscriptionsByUser, 
//so for specifically a user's subscriptions rather than all subscriptions
export const subscriptionsByUser = (state = subscriptionsByUserInitialState, action) => {
  switch (action.type) {
    case SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

// Single subscription

// Initial State - same as above
const subscriptionInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State - same as above, but only for one subscription
export const subscription = (state = subscriptionInitialState, action) => {
  switch (action.type) {
    case SUBSCRIPTIONS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case SUBSCRIPTIONS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case SUBSCRIPTIONS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}