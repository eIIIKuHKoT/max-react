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

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
//  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // unnecessary logic, ingredients fetches on Search component
  /*useEffect( () => {
    const fetchData = async () => {
      const response = await fetch('https://burger-builder-42c71.firebaseio.com/ingredients-hooks.json');
      const data = await response.json();
      const ingredients = [];
      for (let key in data) {
        ingredients.push({
          id: key,
          ...data[key]
        })
      }
      setIngredients(ingredients);
    };
    fetchData();
    
  }, []);*/
  
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
      setLoading(true);
      let response = await fetch(
        'https://burger-builder-42c71.firebaseio.com/ingredients-hooks.json', {
          method: 'POST',
          body: JSON.stringify(ingredient),
          headers: {'Content-type': 'application/json'}
        });
      response = await response.json();
      setLoading(false);
      dispatch({
        type: 'ADD',
        ingredient: {
          id: response.name,
          ...ingredient
        }
      })
    } catch (error) {
      setError(error.method)
    }
    
  };
  
  const removeIngredientHandler = async id => {
    try {
      setLoading(true);
      await fetch(
        `https://burger-builder-42c71.firebaseio.com/ingredients-hooks/${id}.json`, {
          method: 'DELETE'
        });
      setLoading(false);
      dispatch({
        type: "REMOVE",
        id: id
      })
    } catch (error) {
      setError(error.message);
    }
    
  };
  
  const clearError = () => {
    setError(null);
    setLoading(false);
  }
  
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList onRemoveItem={removeIngredientHandler} ingredients={ingredients}/>
      </section>
    </div>
  );
}

export default Ingredients;
