import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [filter, setFilter] = useState('');
  const inputRef = useRef();
  
  useEffect(() => {
    const fetchData = async (filter) => {
      let url = 'https://burger-builder-42c71.firebaseio.com/ingredients-hooks.json';
      const query = filter ? `?&orderBy="title"&equalTo="${filter}"` : '';
      const response = await fetch(url + query);
      const data = await response.json();
      const ingredients = [];
      for (let key in data) {
        ingredients.push({
          id: key,
          ...data[key]
        })
      }
      onLoadIngredients(ingredients);
    };
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        fetchData(filter);
      }
    }, 1000);
    // cleanup old timers, function executed before component unmount
    return () => {
      clearTimeout(timer);
    }
  }, [filter, onLoadIngredients, inputRef]);
  
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={filter}
                 onChange={event => setFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
