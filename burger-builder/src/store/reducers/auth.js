import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
  loading: false,
  userId: null,
  error: null,
  token: null,
  authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {loading: true, error: null});
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {loading: false, error: action.error});
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        ...initialState
      });
    case actionTypes.SET_AUTH_REDIRECT:
      return updateObject(state, {authRedirectPath: action.path});
    default:
      return state;
  }
};


export default reducer;
