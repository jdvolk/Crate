// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State for the user reducer
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State - reducer
export default (state = userInitialState, action) => {
  switch (action.type) {
    //if the action is SET_USER,
    //returns isAuthenticated if the action's user property is not empty (calls the isEmpty function on it)
    //also returns the action's user details
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }

      //if the type is LOGIN_REQUEST
      //returns error, null
      //and the loading property of the action
    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

      //if it is LOGIN_RESPONSE
      //return the error and loading: false
    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

      //if the case is LOGOUT
      //return no error, no loading, no authentication, and no user details
    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

      //always returns state
    default:
      return state
  }
}