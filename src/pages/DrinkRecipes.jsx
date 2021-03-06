import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import RadioButtons from '../Components/RadioButtons';
import Footer from '../Components/Footer';
import FilterByCategories from '../Components/FilterByCategory';
import Recipes from '../Components/Recipes';
import firstFetch from '../helpers/firstFetch';
import recipesContext from '../Context/MyContext';
import Loading from '../Components/Loading';

function DrinkRecipes({ history }) {
  const {
    isFetching,
    setIsFetching,
    selectedIngredient,
    setSelectedIngredient,
    setRecipes,
  } = useContext(recipesContext);

  useEffect(() => {
    firstFetch('thecocktaildb', setRecipes, selectedIngredient, setIsFetching);
    return () => {
      setSelectedIngredient(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header title="Drinks" renderInput />
      <RadioButtons apiName="thecocktaildb" history={ history } />
      <FilterByCategories apiName="thecocktaildb" />
      {(!isFetching) ? (
        <Recipes history={ history } />
      ) : <Loading />}
      <Footer />
    </div>
  );
}

export default DrinkRecipes;

DrinkRecipes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
