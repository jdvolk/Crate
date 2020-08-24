// App Imports
import { isEmpty } from '../../../setup/helpers'
// imports a function to check if something is empty and then creates an object 
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'
// imports actions

// Initial State
export const userInitialState = {
  // set default state
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
export default (state = userInitialState, action) => {
  // connects action to default state
  switch (action.type) {
    // checks the action type
    case SET_USER:
      // for the action type of set user
      return {
        ...state,
        // spread state into object 
        isAuthenticated: !isEmpty(action.user),
        // change state of is authenticated to check if the user object is empty (true)
        details: action.user,
        // set the details to the user object
      }

    case LOGIN_REQUEST:
      // for the action type of set user
      return {
        ...state,
        error: null,
        // set the error to null
        isLoading: action.isLoading
        // change state to is loading
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        // set state of the error to the error returned from the action 
        isLoading: false
        // change state of is loading to false 
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        // state of error back to default 
        isLoading: false,
        // state of loading back to default 
        isAuthenticated: false,
        // state of is authenticated
        details: null
        // set state of user details to null
      }

    default:
      return state
  }
}