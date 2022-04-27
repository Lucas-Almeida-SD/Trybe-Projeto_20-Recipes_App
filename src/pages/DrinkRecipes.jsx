import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

function DrinkRecipes({ history }) {
  return (
    <div>
      <Header title="Drinks" renderInput apiName="thecocktaildb" history={ history } />
      <h1>
        Drink Recipes
      </h1>
    </div>
  );
}

export default DrinkRecipes;

DrinkRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
