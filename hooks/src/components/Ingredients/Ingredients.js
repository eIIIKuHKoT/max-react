import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

function Ingredients() {
  
  const [ingredients, setIngredients] = useState([]);
  
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
  
  useEffect( () => {
    console.log('Component Ingredients rendered', ingredients)
  }, [ingredients]);
  
  
  const filteredIngredientsHandler = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, []);
  
  
  const addIngredientHandler = async ingredient => {
    let response =  await fetch('https://burger-builder-42c71.firebaseio.com/ingredients-hooks.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type':'application/json'}
    });
    response = await response.json();
    setIngredients(prevIngs => [...prevIngs, {
      id: response.name,
      ...ingredient
    }]);
  };
  
  const removeIngredientHandler = async ingredientId => {
    await fetch(`https://burger-builder-42c71.firebaseio.com/ingredients-hooks/${ingredientId}.json`, {
      method: 'DELETE'
    });
    setIngredients(prevIngs => {
      return prevIngs.filter(i => i.id !== ingredientId);
    })
  };
  
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList onRemoveItem={removeIngredientHandler} ingredients={ingredients}/>
      </section>
    </div>
  );
}

export default Ingredients;
