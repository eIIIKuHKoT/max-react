import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  userId: null,
  error: null,
  token: null,
  authRedirectPath: '/'
}

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });
  it(`should store token upon login`, () => {
    const userId = 'some user id';
    const idToken = 'some token';
    expect(reducer(initialState,
      {
      type: actionTypes.AUTH_SUCCESS,
      idToken: userId,
      userId: userId
    })).toEqual({
      ...initialState,
      token: idToken,
      userId: userId
    })
  })
  
});
