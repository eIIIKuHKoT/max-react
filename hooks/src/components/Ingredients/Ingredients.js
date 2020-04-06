import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

function Ingredients() {
  
  const [ingredients, setIngredients] = useState([]);
  
  useEffect(async () => {
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
  
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList onRemoveItem={() => {}} ingredients={ingredients}/>
      </section>
    </div>
  );
}

export default Ingredients;
