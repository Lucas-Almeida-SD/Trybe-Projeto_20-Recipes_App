import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DrinkDetails from '../Components/DrinkDetails';
import recipesContext from '../Context/MyContext';
import Loading from '../Components/Loading';

function DetailsDrinkRecipes({ match }) {
  const [drinkDetails, setDrinkDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState();
  const { setId } = useContext(recipesContext);
  useEffect(() => {
    const getDrinkDetails = async () => {
      const { id } = match.params;
      setId(id);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      setDrinkDetails(result.drinks[0]);
    };
    const getFoods = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      const numberOfRecommendations = 6;
      const recommendation = result.meals.slice(0, numberOfRecommendations);
      setFoods(recommendation);
    };
    const fetchItens = async () => {
      await getDrinkDetails();
      await getFoods();
      setLoading(false);
    };
    fetchItens();
    // localStorage.clear();
  }, []);

  return (
    <div>
      {loading
        ? <Loading />
        : <DrinkDetails drinkDetails={ drinkDetails } recommendation={ foods } />}
    </div>
  );
}

DetailsDrinkRecipes.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailsDrinkRecipes;
