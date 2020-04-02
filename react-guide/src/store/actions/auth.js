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
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('logout');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
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
        const expDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expDate', expDate.toString());
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn))
      }).catch(error => {
      dispatch(authFail(error.response.data.error));
    });
    
  }
};


export const setAuthRedirect = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    path
  }
};

export const authCheckState = () => {
  return dispatch => {
    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      dispatch(logout());
    } else {
      const expDate = new Date(localStorage.getItem('expDate'));
      if (expDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expDate.getTime() - new Date().getTime() / 1000));
      }
      
    }
    
  }
};
