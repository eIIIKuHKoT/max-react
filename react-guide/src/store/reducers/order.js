import {
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_START,
} from '../actions/actionTypes';


const initialState = {
  orders: [],
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PURCHASE_BURGER_SUCCESS:
      const order = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(order)
      };
    case PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
