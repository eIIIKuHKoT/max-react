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
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    default:
      return state;
  }
};
const purchaseInit = (state, action) => {
  return updateObject(state, {purchased: false});
};
const purchaseBurgerSuccess = (state, action) => {
  const order = updateObject(action.orderData, {id: action.orderId});
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(order),
    purchased: true
  });
};
const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchOrdersFail = (state, action) => {
  updateObject(state, {
    loading: false,
    error: action.error
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orders
  });
};


export default reducer;
