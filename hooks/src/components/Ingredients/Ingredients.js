import React, {useReducer, useState, useEffect, useCallback, useMemo} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

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

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  
  const {loading, error, data, sendRequest, requestExtra, identifier, clear} = useHttp();
  
  useEffect(() => {
    if (!loading && !error && identifier === 'REMOVE_INGREDIENT') {
      dispatch({
        type: 'REMOVE',
        id: requestExtra
      })
    } else if (!error && !loading && identifier === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: {id: data.name, ...requestExtra}
      })
    }
  }, [data, requestExtra, identifier, loading, !error]);
  
  
  const filteredIngredientsHandler = useCallback((ingredients) => {
    dispatch({
      type: 'SET',
      ingredients
    });
  }, []);
  
  
  const addIngredientHandler = useCallback(async ingredient => {
    sendRequest(`https://burger-builder-42c71.firebaseio.com/ingredients-hooks.json`, 'POST',
      JSON.stringify(ingredient), ingredient, 'ADD_INGREDIENT')
  }, [sendRequest])
  
  const removeIngredientHandler = useCallback(id => {
    sendRequest(`https://burger-builder-42c71.firebaseio.com/ingredients-hooks/${id}.json`,
      'DELETE', null, id, 'REMOVE_INGREDIENT')
  }, [sendRequest])
  
  const ingredientsList = useMemo(() => {
    return <IngredientList onRemoveItem={removeIngredientHandler} ingredients={ingredients}/>
  }, [ingredients])
  
  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={loading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientsList}
      </section>
    </div>
  );
}

export default Ingredients;
