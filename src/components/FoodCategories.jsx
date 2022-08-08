import React, { useContext, useState } from 'react';
// import { Button } from 'react-bootstrap';
import MyContext from '../context/MyContext';
import { fetchFoodApi } from '../services/fetchApi';
import './categories.css';

function FoodCategories() {
  const { foodCategories, setAllFood } = useContext(MyContext);
  const [toggle, setToggle] = useState('');
  const MAX_RENDER = 5;
  if (foodCategories.length > MAX_RENDER) {
    foodCategories.length = 5;
  }

  const selectAllFood = async () => {
    const data = await fetchFoodApi('fetchName', '');
    setAllFood(data.meals);
  };

  const applyCategoryFilter = async ({ target }, category) => {
    if (toggle !== target.name) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const data = await fetch(url);
      const { meals } = await data.json();
      setAllFood(meals);
      setToggle(target.name);
    } else {
      selectAllFood();
    }
  };

  return (
    <div className="container-categories">
      <button
        className="categories-btn"
        data-testid="All-category-filter"
        type="button"
        onClick={ selectAllFood }
      >
        All

      </button>
      {foodCategories.map(({ strCategory }, index) => (
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

export default FoodCategories;
