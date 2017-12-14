import axios from 'axios';
const ROOT_URL = 'http://localhost:3000';
import { AUTH_USER, AUTH_ERR, UNAUTH_USER } from './types';
export function signinUser({ email, password }, callback) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(() => {
        dispatch(authErr('Incorrect credentials'));
      });
  };
}
export function signupUser({ email, password }, callback) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(error => dispatch(authErr(error.response.data.error)));
  };
}

export function authErr(error) {
  return { type: AUTH_ERR, payload: error };
}
export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}
