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
  // set in iniital loading state to false
  error: null,
  // no initial errors raised
  list: []
  // empty array for list
}

// State
export const subscriptions = (state = subscriptionsInitialState, action) => {
  // set state of subscriptions and connect it to the action
  switch (action.type) {
    // check action type
    case SUBSCRIPTIONS_GET_LIST_REQUEST:
    // if the case if get list request
      return {
        ...state,
        // spread the state
        isLoading: action.isLoading,
        // get the action for isLoading
        error: null
        // no error
      }

    case SUBSCRIPTIONS_GET_LIST_RESPONSE:
    // if the api method is get_list_response
      return {
        ...state,
        // spread the state
        isLoading: false,
        // set loading to false
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
        // setr iLoading to false
        error: action.error
        // raise action error
      }

    default:
      return state
      // return state if none of the cases are met 
  }
}

// Subscriptions list by user

// Initial State
const subscriptionsByUserInitialState = {
  // set default state of subscriptions
  isLoading: false,
  set is loading to false
  error: null,
  // set error to null
  list: []
  // initial list is empty array
}

// State
export const subscriptionsByUser = (state = subscriptionsByUserInitialState, action) => {
  switch (action.type) {
    // check action type
    case SUBSCRIPTIONS_GET_LIST_BY_USER_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        // set isLoading from action
        error: null
        // set errors to null
      }

    case SUBSCRIPTIONS_GET_LIST_BY_USER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        // set loading to false
        error: action.error,
        // raise error from action
        list: action.list
        //set state of list from action
      }

    case SUBSCRIPTIONS_GET_LIST_BY_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        // set isLoading to false
        error: action.error
        // set the state of the error
      }

    default:
      return state
      // return state if non of the cases are met
  }
}

// Single subscription

// Initial State
const subscriptionInitialState = {
  // sets inital state of a single subscription
  isLoading: false,
  error: null,
  item: {}
}

// State
export const subscription = (state = subscriptionInitialState, action) => {
  switch (action.type) {
    case SUBSCRIPTIONS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        // sett isLoading to loading action
        error: null
        // set state error to null
      }

    case SUBSCRIPTIONS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        // set idLoading to false
        error: action.error,
        // get state action from error
        item: action.item
        // get item from action
      }

    case SUBSCRIPTIONS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        // set isLoading to false
        error: action.error
        // set state action from error
      }

    default:
      return state
  }
}
