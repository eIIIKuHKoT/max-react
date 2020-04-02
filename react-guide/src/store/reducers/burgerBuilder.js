import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAIL
} from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 1.5,
  bacon: 0.8,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: return addIngredient(state, action);
    case REMOVE_INGREDIENT: return removeIngredient(state, action);
    case SET_INGREDIENTS: return setIngredients(state, action);
    case FETCH_INGREDIENTS_FAIL: return updateObject(state, {error: true});
    default: return state;
  }
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: initialState.totalPrice,
    error: false
  });
};

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    
  });
  return  updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
};

const removeIngredient = (state, action) => {
  const updatedIng = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  });
  return  updateObject(state, {
    ingredients: updatedIng,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
};

export default reducer;
