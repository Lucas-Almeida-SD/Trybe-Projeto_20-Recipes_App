import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import recipesContext from '../Context/MyContext';

function Recipes({ history: { location } }) {
  const { recipes } = useContext(recipesContext);

  const typeOfRecipe = () => (
    (location.pathname.includes('foods') ? 'Meal' : 'Drink')
  );

  const number12 = 12;

  return (
    <div>
      {(recipes.length > 0) && (
        recipes.slice(0, number12).map((e, index) => (
          <Link
            to={ `${location.pathname}/${e[`id${typeOfRecipe()}`]}` }
            key={ `${index}-recipe-card` }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <h2
                data-testid={ `${index}-card-name` }
              >
                {e[`str${typeOfRecipe()}`]}
              </h2>
              <img
                data-testid={ `${index}-card-img` }
                src={ e[`str${typeOfRecipe()}Thumb`] }
                alt={ e[`str${typeOfRecipe()}`] }
              />
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};