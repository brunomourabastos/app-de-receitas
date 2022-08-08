import React, { useContext, useState } from 'react';
// import { Button } from 'react-bootstrap';
import MyContext from '../context/MyContext';
import { fetchDrinkApi } from '../services/fetchApi';
import './categories.css';

function DrinkCategories() {
  const { drinkCategories, setAllDrink } = useContext(MyContext);
  const [toggle, setToggle] = useState('');
  const MAX_RENDER = 5;
  if (drinkCategories.length > MAX_RENDER) {
    drinkCategories.length = 5;
  }

  const selectAllDrink = async () => {
    const data = await fetchDrinkApi('fetchName', '');
    setAllDrink(data.drinks);
  };

  const applyCategoryFilter = async ({ target }, category) => {
    if (toggle !== target.name) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const data = await fetch(url);
      const { drinks } = await data.json();
      setAllDrink(drinks);
      setToggle(target.name);
    } else {
      selectAllDrink();
    }
  };

  return (
    <div className="container-categories">
      <button
        className="categories-btn"
        data-testid="All-category-filter"
        type="button"
        onClick={ selectAllDrink }
      >
        All
      </button>

      {drinkCategories.map(({ strCategory }, index) => (
        <div key={ index }>
          <button
            className="categories-btn"
            name={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            onClick={ (event) => applyCategoryFilter(event, strCategory) }
          >
            {strCategory}

          </button>
        </div>
      ))}
    </div>
  );
}

export default DrinkCategories;
