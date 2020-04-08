import React, {useReducer, useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'REMOVE':
      return currentIngredients.filter(i => i.id !== action.id);
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {loading: true, error: null,};
    case 'RESPONSE':
      return {...httpState, loading: false};
    case 'ERROR':
      return {loading: false, error: action.error};
    case 'CLEAR':
      return {loading: false, error: null,};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  
  useEffect(() => {
    console.log('Component Ingredients rendered', ingredients)
  }, [ingredients]);
  
  
  const filteredIngredientsHandler = useCallback((ingredients) => {
    dispatch({
      type: 'SET',
      ingredients
    });
  }, []);
  
  
  const addIngredientHandler = async ingredient => {
    try {
      dispatchHttp({type: 'SEND'});
      let response = await fetch(
        'https://burger-builder-42c71.firebaseio.com/ingredients-hooks.json', {
          method: 'POST',
          body: JSON.stringify(ingredient),
          headers: {'Content-type': 'application/json'}
        });
      response = await response.json();
      dispatchHttp({type: 'RESPONSE'});
      dispatch({
        type: 'ADD',
        ingredient: {
          id: response.name,
          ...ingredient
        }
      })
    } catch (error) {
      dispatchHttp({type: 'ERROR', error: error.message});
    }
    
  };
  
  const removeIngredientHandler = async id => {
    try {
      dispatchHttp({type: 'SEND'});
      await fetch(
        `https://burger-builder-42c71.firebaseio.com/ingredients-hooks/${id}.json`, {
          method: 'DELETE'
        });
      dispatchHttp({type: 'RESPONSE'});
      dispatch({
        type: "REMOVE",
        id: id
      })
    } catch (error) {
      dispatchHttp({type: 'ERROR', error: error.message});
    }
  };
  
  const clearError = () => dispatchHttp({type: 'CLEAR'});
  
  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList onRemoveItem={removeIngredientHandler} ingredients={ingredients}/>
      </section>
    </div>
  );
}

export default Ingredients;
