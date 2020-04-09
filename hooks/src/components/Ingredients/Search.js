import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [filter, setFilter] = useState('');
  const inputRef = useRef();
  const {loading, data, sendRequest, error} = useHttp();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        let url = 'https://burger-builder-42c71.firebaseio.com/ingredients-hooks.json';
        const query = filter ? `?&orderBy="title"&equalTo="${filter}"` : '';
        sendRequest(url + query)
      }
    }, 1000);
    // cleanup old timers, function executed before component unmount
    return () => {
      clearTimeout(timer);
    }
  }, [filter, inputRef, sendRequest]);
  
  useEffect(() => {
    if(!loading && data && !error) {
      const ingredients = [];
      for (let key in data) {
        ingredients.push({
          id: key,
          ...data[key]
        })
      }
      onLoadIngredients(ingredients);
    }
  }, [data, loading, error, onLoadIngredients])
  
  return (
    <section className="search">
      {error ? <ErrorModal>error</ErrorModal> : null}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading ? <label>loading...</label> : null}
          <input ref={inputRef} type="text" value={filter}
                 onChange={event => setFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
