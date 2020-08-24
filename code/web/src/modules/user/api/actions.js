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
  //if there is a token (in localStorage),
  //sets the header Bearer oAuth
  //and if there is not, it deletes the default header for authroization
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  //returns an object with the type SET_USER and the user, 
  //presumably this is an action (loud snake case)
  return { type: SET_USER, user }
}

// Login a user using credentials - takes params of userCredentials and isLoading (default true)
export function login(userCredentials, isLoading = true) {
  //dispatches the action LOGIN_REQUEST with a payload of isLoading
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    //post request with the route and the graphql query
    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
    //if the response's data has errors or the errors length is greater than 0, 
    //set the error variable to the error
    //or if the response userLogin token is NOT an empty string,
    //set the token to that token and the user to that user
    //then dispatch the token and user using setUser
    //and set the localstorage and cookie to that user
    //and lastly, dispatch the login response with the error payload
      .then(response => {
        let error = ''

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      //if the call errors out, dispatch login response with the error payload
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token in localStorage to keep user logged in
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
export function register(userDetails) {
  //returns a dispatch of a post request mutation (not 100% on what that means)
  //it has three properties, looks like a graphql thing
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
export function logout() {
  //dispatches the LOGOUT action, to log out
  //and calls the function to remove the user from localstorage and cookie
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token from localstorage
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
export function getGenders() {
  //returns the post request to get the user's gender 
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
