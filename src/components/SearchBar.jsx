import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { fetchFoodApi, fetchDrinkApi } from '../services/fetchApi';
import './searchBar.css';

function SearchBar({ type }) {
  const { drink, setDrink, food,
    setFood, setFilteredFood, setFilteredDrink,
    globalRender, setGlobalRender } = useContext(MyContext);
  const history = useHistory();
  const [searchRadio, setSearchRadio] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    function verifyQuantity() {
      if (food.length === 1) {
        const { idMeal } = food[0];
        history.push(`/foods/${idMeal}`);
      }
      if (drink.length === 1) {
        const { idDrink } = drink[0];
        history.push(`/drinks/${idDrink}`);
      }
    }
    function renderFilteredFood() {
      if (food.length > 1) {
        setFilteredFood(true);
      }
      if (drink.length > 1) {
        setFilteredDrink(true);
      }
    }
    verifyQuantity();
    renderFilteredFood();
  }, [drink, food, history, setFilteredDrink, setFilteredFood]);

  const showAlert = () => global.alert(
    'Sorry, we haven\'t found any recipes for these filters.',
  );

  async function drinkApi() {
    if (searchRadio === 'ingredient') {
      const data = await fetchDrinkApi('fetchIngredient', searchValue);
      if (data.drinks === null) { showAlert(); }
      setDrink(data.drinks);
    }
    if (searchRadio === 'radioName') {
      const data = await fetchDrinkApi('fetchName', searchValue);
      if (data.drinks === null) { showAlert(); }
      setDrink(data.drinks);
    }
    if (searchRadio === 'firstLetter') {
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const data = await fetchDrinkApi('fetchFirstLetter', searchValue);
        if (data.drinks === null) { showAlert(); }
        setDrink(data.drinks);
      }
    }
  }

  async function foodApi() {
    if (searchRadio === 'ingredient') {
      const data = await fetchFoodApi('fetchIngredient', searchValue);
      if (data.meals === null) { showAlert(); }
      setFood(data.meals);
    }
    if (searchRadio === 'radioName') {
      const data = await fetchFoodApi('fetchName', searchValue);
      if (data.meals === null) { showAlert(); }
      setFood(data.meals);
    }
    if (searchRadio === 'firstLetter') {
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const data = await fetchFoodApi('fetchFirstLetter', searchValue);
        if (data.meals === null) { showAlert(); }
        setFood(data.meals);
      }
    }
  }

  const searchClick = async () => {
    if (type === 'food') {
      foodApi();
    } else {
      drinkApi();
    }
    setGlobalRender(!globalRender);
  };

  return (
    <div className="container-search">
      <div>
        <input
          className="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Buscar"
          value={ searchValue }
          onChange={ ({ target }) => setSearchValue(target.value) }
        />
      </div>
      <div>
        <button
          className="search-btn"
          data-testid="exec-search-btn"
          type="button"
          onClick={ searchClick }
        >
          Search

        </button>
      </div>
      <div className="container-radios">
        <label
          htmlFor="ingredient-radio"
          className="radio-input"
        >
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="search-radio"
            id="ingredient-radio"
            onChange={ () => setSearchRadio('ingredient') }
          />
          Ingredient
        </label>
        <label
          htmlFor="name-radio"
          className="radio-input"
        >
          <input
            data-testid="name-search-radio"
            type="radio"
            name="search-radio"
            id="name-radio"
            onChange={ () => setSearchRadio('radioName') }
          />
          Name
        </label>
        <label
          htmlFor="first-letter-radio"
          className="radio-input"
        >
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="search-radio"
            id="first-letter-radio"
            onChange={ () => setSearchRadio('firstLetter') }
          />
          First Letter
        </label>
      </div>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  needRender: PropTypes.bool,
}.isRequired;
