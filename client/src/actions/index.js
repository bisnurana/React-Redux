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

export function authErr(err) {
  return { type: AUTH_ERR, payload: err };
}
export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}
