import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  
  const [ingredients, setIngredients] = useState([]);
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
    setIngredients(ingredients);
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
      setIngredients(prevIngs => [...prevIngs, {
        id: response.name,
        ...ingredient
      }]);
    } catch (error) {
      setError(error.method)
    }
    
  };
  
  const removeIngredientHandler = async ingredientId => {
    try {
      setLoading(true);
      await fetch(
        `https://burger-builder-42c71.firebaseio.com/ingredients-hooks/${ingredientId}.json`, {
          method: 'DELETE'
        });
      setLoading(false);
      setIngredients(prevIngs => {
        return prevIngs.filter(i => i.id !== ingredientId);
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
