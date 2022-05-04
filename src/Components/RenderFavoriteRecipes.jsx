import React from 'react';
import PropTypes from 'prop-types';
import shareImage from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RenderFavoriteRecipes({ filteredFavoriteRecipes }) {
  const share = (target, recipe) => {
    const number1 = 1;
    const url = window.location.href.split('/').slice(0, -number1).join('/');
    navigator.clipboard.writeText(`${url}/${recipe.type}s/${recipe.id}`);
    document.querySelectorAll('.link-copied').forEach((e) => { e.innerHTML = ''; });
    console.log();
    target.parentElement.querySelector('.link-copied').innerHTML = 'Link copied!';
  };

  return (
    <div className="favorite-recipes">
      {filteredFavoriteRecipes.map((e, index) => (
        <div key={ e.name }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ e.image }
            alt={ e.name }
            className="done-recipe-image"
          />
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {(e.type === 'food') ? (
              `${e.nationality} - ${e.category}`) : `${e.alcoholicOrNot}`}
          </h3>
          <h2 data-testid={ `${index}-horizontal-name` }>{e.name}</h2>
          <div>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareImage }
              alt="Share"
              onClick={ ({ target }) => share(target, e) }
              aria-hidden="true"
            />
            <span className="link-copied">{`${''}`}</span>
          </div>
          <div>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="Favorite_Image"
              // onClick={ favorite }
              // aria-hidden="true"
            />
            <span className="link-copied">{`${''}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderFavoriteRecipes;

RenderFavoriteRecipes.propTypes = {
  filteredFavoriteRecipes: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};
