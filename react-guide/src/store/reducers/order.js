import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../utility';

const initialState = {
  orders: [],
  error: null,
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, {purchased: false});
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const order = updateObject(action.orderData, {id: action.orderId});
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat(order),
        purchased: true
      });
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error
      });
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {loading: true});
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, {loading: true});
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.error
      });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        loading: false,
        orders: action.orders
      });
    default:
      return state;
  }
};

export default reducer;
