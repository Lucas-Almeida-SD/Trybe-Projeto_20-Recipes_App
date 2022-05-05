import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipesFilterButtons({ setFilter }) {
  return (
    <div className="done-recipes-filter-buttons">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

export default DoneRecipesFilterButtons;

DoneRecipesFilterButtons.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
