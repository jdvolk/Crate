// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'

// Actions

// Set a user after login or using localStorage token
export function setUser(token, user) {
  //create the function setUser and pass in the token and user object 
  if (token) {
  //check for user token in local storage
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // set the header to Bearer oAuth
    // this is global config for axios
  } else {
    delete axios.defaults.headers.common['Authorization'];
    //otherwise delete the default header for authorization 
  }

  return { type: SET_USER, user }
  // return an object  with the action SET_USER and the user object that was passed in 
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  // create the Login function
    // pass in userCredentuals, and set isLoading to true
  return dispatch => {
    // return the dispatch object
    dispatch({
      type: LOGIN_REQUEST,
      // dispatch action type to Login_Request
      isLoading
      // update state to isLoading (payload)
    })

    return axios.post(routeApi, query({
      // set up post request with the api route and and the graphQL query
      operation: 'userLogin',
      // builds the query name 
      variables: userCredentials,
      // these user credentials that are being passed into query
      fields: ['user {name, email, role}', 'token']
      // organization that scheme defined
    }))
      .then(response => {
        // now were waiting for the promise to be resolved 
        let error = ''
        // set the default error to an empty string 
        if (response.data.errors && response.data.errors.length > 0) {
          // if the response.data has errors and the length is longer than 0
          error = response.data.errors[0].message
          // reassigning the error variable to the 1st index of the the error message array
        } else if (response.data.data.userLogin.token !== '') {
          // or if the response data @ user login token is not equal to an empty string
          const token = response.data.data.userLogin.token
          // then assign the token to a variable
          const user = response.data.data.userLogin.user
          // then assign user data to a variable

          dispatch(setUser(token, user))
          // dispatch setUser action. This triggers a state change
          loginSetUserLocalStorageAndCookie(token, user)
          // invoking the function created later in the page. This Set user token and info in localStorage and cookie.
        }

        dispatch({
          type: LOGIN_RESPONSE,
          // dispatch action to login response. this will send if the login is correct.
          error
          // should be an empty string
        })
      })
      .catch(error => {
        // if there is an error
        dispatch({
          type: LOGIN_RESPONSE,
          // dispatch the action login response
          error: 'Please try again'
          // send the error to please try again 
        })
      })
  }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  // stores the token in local storage
  window.localStorage.setItem('user', JSON.stringify(user))
  // stores the user object in to local storage

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
  /*
  The set() method of the cookies API sets a cookie containing the specified cookie data. 
  This method is equivalent to issuing an HTTP Set-Cookie header during a request to a given URL.
  */
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      // make a post request with the routes and the mutation for the database 
      operation: 'userSignup',
      // name of the operation 
      variables: userDetails,
      // the user details 
      fields: ['id', 'name', 'email']
      // fields that are being sent 
    }))
  }
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()
    // invoke function that removes user from local storage and removes the cookie
    dispatch({
      type: LOGOUT
      // triggers state change to logout user
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      // returns a post request that gets the the user gender
      operation: 'userGenders',
      // builds the query name
      fields: ['id', 'name']
      // fields to be included in the query
    }))
  }
}
