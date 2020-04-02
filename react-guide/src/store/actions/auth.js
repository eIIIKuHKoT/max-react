import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() =>{
      dispatch(logout());
    }, expirationTime * 1000)
  }
};


export const auth = (email, password, isSighUp) => {
  return dispatch => {
    dispatch(authStart());
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT4FfW09Vti7y_uq8Qy0X85RrlxYn_eDY';
    if (!isSighUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAT4FfW09Vti7y_uq8Qy0X85RrlxYn_eDY'
    }
    axios.post(
      url,
      {
        email, password, returnSecureToken: true
      })
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn))
      }).catch(error => {
      dispatch(authFail(error.response.data.error));
    });
    
  }
};
