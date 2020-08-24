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

// Initial State
const subscriptionsInitialState = {
  // set initial state of subscriptions
  isLoading: false,
  // set is loading to false 
  error: null,
  // set state of error to null
  list: []
  // set the list to empty array 
}

// State
export const subscriptions = (state = subscriptionsInitialState, action) => {
  // set state of subs and connect it to the action
  switch (action.type) {
    // check action type
    case SUBSCRIPTIONS_GET_LIST_REQUEST:
      // if the case is get list request
      return {
        ...state,
        // spread the state 
        isLoading: action.isLoading,
        // get is loading from the action
        error: null
        // set state of error to false 
      }

    case SUBSCRIPTIONS_GET_LIST_RESPONSE:
      // if the action is get list response
      return {
        ...state,
        // spread state
        isLoading: false,
        // set is loading to false
        error: action.error,
        // get error from action 
        list: action.list
        // set state of list from the action
      }

    case SUBSCRIPTIONS_GET_LIST_FAILURE:
      // if action is get list failure
      return {
        ...state,
        isLoading: false,
        // set is loading to false
        error: action.error
        // set state of error
      }

    default:
      return state
      // return state if none of the cases are met
  }
}

// Subscriptions list by user

// Initial State
const subscriptionsByUserInitialState = {
  // set default state of subs
  isLoading: false,
  error: null,
  list: []
}

// State
export const subscriptionsByUser = (state = subscriptionsByUserInitialState, action) => {
  switch (action.type) {
    // check action type
    case SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        // set is loading from action 
        error: null
        // set state of error 
      }

    case SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        // set is loading to false 
        error: action.error,
         // set state of error 
        list: action.list
        // set state of list from action 
      }

    case SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
          // set is loading to false
        error: action.error
          // set state of error 
      }

    default:
      return state
      // return state if none of the cases are met
  }
}

// Single subscription

// Initial State
const subscriptionInitialState = {
  // sets initial state of a single subscription
  isLoading: false,
  error: null,
  item: {}
}

// State
export const subscription = (state = subscriptionInitialState, action) => {
  switch (action.type) {
    // check action type
    case SUBSCRIPTIONS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        // get is loading from the action
        error: null
      }

    case SUBSCRIPTIONS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        // set is loading to false 
        error: action.error,
        // get error from the action
        item: action.item
        // set state of the item from the action data
      }

    case SUBSCRIPTIONS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
          // set is loading to false 
        error: action.error
          // set error from action 
      }

    default:
      return state
  }
}