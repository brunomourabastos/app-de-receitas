import React, { useContext } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';
import FoodCards from '../cards/FoodCards';
import FoodCategories from '../components/FoodCategories';
import './foods.css';

function Foods() {
  const { filteredFood, food, globalRender } = useContext(MyContext);
  if (food === null) {
    return (
      <div>
        <Header pageName="Foods" needRender type="food" />
        <div>Receita não encontrada</div>
      </div>
    );
  }

  const MAX_RENDER = 12;
  if (food.length > MAX_RENDER) {
    food.length = 12;
  }
  return (
    <div>
      <Header pageName="Foods" needRender type="food" />
      <FoodCategories />
      <div>
        <div className="container-cards">
          {filteredFood
            && food.map((element, index) => (
              <div
                className="container-card-child"
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="card-img"
                  data-testid={ `${index}-card-img` }
                  src={ element.strMealThumb }
                  alt="food ilustration"
                />
                <p className="card-name" data-testid={ `${index}-card-name` }>
                  {element.strMeal}
                </p>
              </div>
            ))}
        </div>
        {globalRender
        && <FoodCards /> }
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
