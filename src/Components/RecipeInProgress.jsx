import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetailsInProgress from './RecipeDetailsInProgress';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import recipesContext from '../Context/MyContext';
import saveRecipeProgress from '../helpers/saveRecipeProgress';
import toFavoriteRecipeInProgress from '../helpers/toFavoriteRecipeInProgress';
import recipeObjectModel from '../helpers/recipeObjectModel';

function RecipeInProgress({ recipeId, apiName }) {
  const { isFetching, setIsFetching } = useContext(recipesContext);
  const [detailsRecipe, setDatailsRecipe] = useState(null);
  const [progress, setProgress] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const history = useHistory();

  const typeOfRecipe = () => {
    const { location: { pathname } } = history;
    return (pathname.includes('foods') ? 'Meal' : 'Drink');
  };

  const keyType = (history.location.pathname.includes('foods') ? 'meals' : 'cocktails');

  const recipesInProgressObject = () => {
    const inProgressRecipesFromStorage = getFromLocalStorage('inProgressRecipes', {});
    if (!inProgressRecipesFromStorage[keyType]) {
      inProgressRecipesFromStorage[keyType] = {};
    }
    return inProgressRecipesFromStorage[keyType];
  };

  useEffect(() => {
    const fetchDetailsRecipe = async () => {
      try {
        setIsFetching(true);
        const request = await fetch(`https://www.${apiName}.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const json = await request.json();
        const datailsRecipeObject = Object.values(json)[0][0];
        setDatailsRecipe(datailsRecipeObject);
      } catch (error) {
        global.alert('Oops, an error has occurred. Reload the page!');
      }
      setIsFetching(false);
    };
    fetchDetailsRecipe();
    setProgress(recipesInProgressObject());
    setFavoriteRecipes(getFromLocalStorage('favoriteRecipes', []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveProgress = ({ target: { id: nameRecipe, checked } }) => {
    const props = { recipeId, nameRecipe, checked, keyType, recipesInProgressObject };
    setProgress(saveRecipeProgress(props));
  };

  const share = ({ target }) => {
    const number1 = 1;
    let url = window.location.href.split('/');
    url = url.slice(0, -number1).join('/');
    navigator.clipboard.writeText(url);
    target.parentElement.querySelector('.link-copied').innerHTML = 'Link copied!';
  };

  const favorite = () => {
    const propsRecipeObjectModel = {
      detailsRecipe,
      typeOfRecipe: typeOfRecipe(),
      history,
    };
    const recipe = recipeObjectModel(propsRecipeObjectModel);
    const getFavoriteRecipes = toFavoriteRecipeInProgress(recipe);
    setFavoriteRecipes(getFavoriteRecipes);
  };

  return (
    <section className="recipe-in-progress-section">
      <h2>Recipe in progress</h2>
      {(!isFetching && detailsRecipe) && (
        <RecipeDetailsInProgress
          recipeId={ recipeId }
          detailsRecipe={ detailsRecipe }
          progress={ progress }
          favoriteRecipes={ favoriteRecipes }
          typeOfRecipe={ typeOfRecipe }
          share={ share }
          favorite={ favorite }
          saveProgress={ saveProgress }
        />
      )}
      {(isFetching) && <h2>Loading...</h2>}
    </section>
  );
}

export default RecipeInProgress;

RecipeInProgress.propTypes = {
  recipeId: PropTypes.string.isRequired,
  apiName: PropTypes.string.isRequired,
};
