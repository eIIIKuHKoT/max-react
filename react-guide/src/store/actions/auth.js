import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (authData) => {
  console.log(authData)
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
};


export const auth = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const res = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT4FfW09Vti7y_uq8Qy0X85RrlxYn_eDY',
        {
          email, password, returnSecureToken: true
        });
      dispatch(authSuccess(res.data));
    } catch (err) {
      dispatch(authFail(err));
    }
  }
};
